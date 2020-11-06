var express = require('express');
var router = express.Router();

var template = require('../lib/template.js');
var auth = require('../lib/auth.js');
var db = require('../lib/db.js');

// 전체 상품
router.get('/all/:pageNum', (request, response) => {
    var authStatusUi = auth.statusUi(request, response);
    var pageNum = request.params.pageNum;
    var contents = ` 
    <hr style="margin:2px">
    `;

    db.query(`SELECT * FROM product WHERE name IS NOT NULL ORDER BY id DESC`, (error, result) => {

      var list = '<div id="columns">';
      var cur = (pageNum - 1) * 20;
      var end = cur + 20;
      while(cur < end && cur < result.length){
        contents += `<div class="card-deck">`;
        for(var i=cur; i < cur + 4 && i < result.length; i++){
          contents += `
        <div class="card">
        <a href="/product/${result[i].id}">
        <img class="card-img-top" src="/images/${result[i].img_name}">
        </a>
          <div class="card-body">
            <h5 class="card-title">${result[i].name}</h5>
            <p class="card-text">
            ${result[i].price}
            </p>
          </div>
        </div>
      `;
        }
        contents += `</div>`;
        cur += 4;
      }

      var pagination = `<hr>
      <nav aria-label="...">
      <ul class="pagination justify-content-center">
      `;
      var i = 1;
      var end = 5;
      if(Number(pageNum) > 5){
        i = Number(pageNum) - 2;
        end = Number(pageNum) + 2;
      }
      while(i < (result.length / 20 + 1) && i <= end){
        if(i === Number(pageNum)){
          pagination += `<li class="page-item active">
          <span class="page-link">
            ${i}
            <span class="sr-only">(current)</span>
          </span>
        </li>`;
        }
        else{
          pagination += `<li class="page-item"><a class="page-link" href="/products/all/${i}">${i}</a></li>`;
            //pageList += `<li><a href="/topic/browsing/${i}">[${i}]</a></li>`;
        }
        i++;
      }
      pagination += `</ul></nav>`;

//       <nav aria-label="...">
//   <ul class="pagination">
//     <li class="page-item disabled">
//       <span class="page-link">Previous</span>
//     </li>
//     <li class="page-item"><a class="page-link" href="#">1</a></li>
//     <li class="page-item active">
//       <span class="page-link">
//         2
//         <span class="sr-only">(current)</span>
//       </span>
//     </li>
//     <li class="page-item"><a class="page-link" href="#">3</a></li>
//     <li class="page-item">
//       <a class="page-link" href="#">Next</a>
//     </li>
//   </ul>
// </nav>
      contents += pagination;
      var html = template.html(authStatusUi, contents);
      response.send(html);
  });
});

router.get('/top/:pageNum', (request, response) => {
  var authStatusUi = auth.statusUi(request, response);
  var contents = ``;
  
  var html = template.html(authStatusUi, contents);
  response.send(html);
});

// 상품 검색
router.post('/search/:pageNum', (request, response) => {
  var authStatusUi = auth.statusUi(request, response);
  var pageNum = request.params.pageNum;
  var post = request.body;
  var contents = ` 
  <hr style="margin:2px">
  `;

  db.query(`SELECT * FROM product WHERE name LIKE '%${post.term}%' OR description LIKE '%${post.term}%' ORDER BY id DESC`, (error, result) => {

    var list = '<div id="columns">';
    var cur = (pageNum - 1) * 20;
    var end = cur + 20;
    while(cur < end && cur < result.length){
      contents += `<div class="card-deck">`;
      for(var i=cur; i < cur + 4 && i < result.length; i++){
        contents += `
      <div class="card">
      <a href="/product/${result[i].id}">
      <img class="card-img-top" src="/images/${result[i].img_name}">
      </a>
        <div class="card-body">
          <h5 class="card-title">${result[i].name}</h5>
          <p class="card-text">
          ${result[i].price}
          </p>
        </div>
      </div>
    `;
      }
      contents += `</div>`;
      cur += 4;
    }

    var pagination = `<hr>
    <nav aria-label="...">
    <ul class="pagination justify-content-center">
    `;
    var i = 1;
    var end = 5;
    if(Number(pageNum) > 5){
      i = Number(pageNum) - 2;
      end = Number(pageNum) + 2;
    }
    while(i < (result.length / 20 + 1) && i <= end){
      if(i === Number(pageNum)){
        pagination += `<li class="page-item active">
        <span class="page-link">
          ${i}
          <span class="sr-only">(current)</span>
        </span>
      </li>`;
      }
      else{
        pagination += `<li class="page-item"><a class="page-link" href="/products/all/${i}">${i}</a></li>`;
      }
      i++;
    }
    pagination += `</ul></nav>`;
    contents += pagination;
    var html = template.html(authStatusUi, contents);
    response.send(html);
});
});
  
  module.exports = router;