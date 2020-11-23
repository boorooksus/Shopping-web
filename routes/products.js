var express = require('express');
var router = express.Router();

var template = require('../lib/template.js');
var auth = require('../lib/auth.js');
var db = require('../lib/db.js');

// 전체 또는 카테고리별 상품 목록
router.get('/:category/:pageNum', (request, response) => {
    var authStatusUi = auth.statusUi(request, response);
    var pageNum = request.params.pageNum;
    var category = request.params.category;
    var query = `SELECT * FROM product WHERE name IS NOT NULL AND category=? ORDER BY id DESC`;
    if(category === "all"){
      query = `SELECT * FROM product WHERE name IS NOT NULL ORDER BY id DESC`;
    }
    var contents = ` 
    <hr style="margin:2px">
    `;

    db.query(query, [category], (error, result) => {
      var cur = (pageNum - 1) * 12;
      var end = cur + 12;
      while(cur < end && cur < result.length){
        contents += `<div class="card-deck">`;
        for(var i=cur; i < cur + 4; i++){
          if(i < result.length){
            contents += `
              <div class="card">
              <a href="/product/${result[i].id}">
              <img class="card-img-top" src="/images/${result[i].img_name}">
              </a>
                <div class="card-body">
                  <h5 class="card-title"><a href="/product/${result[i].id}">${result[i].name}</a></h5>
                  <p class="card-text" >
                  <script>showPrice(${result[i].price})</script>
                  </p>
                </div>
              </div>
            `; 
          } else{
            contents += `
            <div class="card">
              <img class="card-img-top" src="/images/blank.jpg">
              <div class="card-body">
                  
              </div>
            </div>
            `;
          }
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
      if(Number(pageNum) > 4){
        i = Number(pageNum) - 2;
        end = Number(pageNum) + 2;
      }
      while(i < (result.length / 12 + 1) && i <= end){
        if(i === Number(pageNum)){
          pagination += `<li class="page-item active">
          <span class="page-link">
            ${i}
            <span class="sr-only">(current)</span>
          </span>
        </li>`;
        }
        else{
          pagination += `<li class="page-item"><a class="page-link" href="/products/${category}/${i}">${i}</a></li>`;
        }
        i++;
      }
      pagination += `</ul></nav>`;

      contents += pagination;
      var html = template.html(authStatusUi, contents);
      response.send(html);
  });
});


// 상품 검색 처리
router.post('/search_process', (request, response) => {
  var post = request.body;
  response.redirect(302, `/products/search/${post.term}/1`);
});

// 상품 검색
router.get('/search/:term/:pageNum', (request, response) => {
  var authStatusUi = auth.statusUi(request, response);
  var pageNum = request.params.pageNum;
  var term = request.params.term;
  var contents = ` 
  <hr style="margin:2px">
  `;

  db.query(`SELECT * FROM product WHERE name LIKE '%${term}%' OR description LIKE '%${term}%' ORDER BY id DESC`, (error, result) => {

    var list = '<div id="columns">';
    var cur = (pageNum - 1) * 12;
    var end = cur + 12;
    while(cur < end && cur < result.length){
      contents += `<div class="card-deck">`;
      for(var i=cur; i < cur + 4; i++){
        if(i < result.length){
          contents += `
      <div class="card">
      <a href="/product/${result[i].id}">
      <img class="card-img-top" src="/images/${result[i].img_name}">
      </a>
        <div class="card-body">
          <h5 class="card-title">${result[i].name}</h5>
          <p class="card-text">
          <script>showPrice(${result[i].price})</script>
          </p>
        </div>
      </div>
    `;
        } else{
          contents += `
          <div class="card">
            <img class="card-img-top" src="/images/blank.jpg">
            <div class="card-body">
                
            </div>
          </div>
          `;
        }
        
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
    if(Number(pageNum) > 4){
      i = Number(pageNum) - 2;
      end = Number(pageNum) + 2;
    }
    while(i < (result.length / 12 + 1) && i <= end){
      if(i === Number(pageNum)){
        pagination += `<li class="page-item active">
        <span class="page-link">
          ${i}
          <span class="sr-only">(current)</span>
        </span>
      </li>`;
      }
      else{
        pagination += `<li class="page-item"><a class="page-link" href="/products/search/${term}/${i}">${i}</a></li>`;
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