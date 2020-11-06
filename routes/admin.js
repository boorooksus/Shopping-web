var express = require('express');
var router = express.Router();

var template = require('../lib/template.js');
var auth = require('../lib/auth.js');
var db = require('../lib/db.js');

router.get('/', (request, response) => {
    if(!auth.isAdmin(request, response)){
        response.send(`
            <script>alert('관리자만 접속 가능한 페이지입니다.')
            window.history.back();
            </script> 
        `);
        return;
    }
    var authStatusUi = auth.statusUi(request, response);
    var contents = `
    <div>
    <button class="btn btn-danger"><a href="/product/add_product">상품 등록 &raquo;</a></button>
    </div>
    <hr>

    <div class="row">
    <div class="col-md">
    <h5>회원 정보</h5>
    <ul class="list-group">
    `;

    db.query(`SELECT * FROM user ORDER BY id DESC`, (error, result) => {
      for(var i = 0; i < result.length; i++){
        contents += `
        <li class="list-group-item">
        <div>
        ${result[i].name}님이 가입하였습니다.
        </div><div>
        <small class="text-muted">${result[i].created}</small></div>

        <button class="btn btn-outline-warning" ><a href="/auth/update/${result[i].id}">회원 정보 수정</a></button>
        <button class="btn btn-outline-danger" onclick="return confirm('Do you want to delete?')"><a href="/auth/leave/${result[i].id}">회원 탈퇴</a></button>
      </li>
        `;
      }

      contents += `</ul></div>
      <div class="col-md">
      <h5>상품 정보</h5>
      <ul class="list-group">`;

      db.query(`SELECT * FROM product ORDER BY updated DESC`, (error, result2) => {
        for(var i = 0; i < result2.length; i++){
          var created = new Date(result2[i].created);
          var updated = new Date(result2[i].updated);
          if(created.getDate() != updated.getDate() && created.getHours() != updated.getHours() && created.getMinutes() != updated.getMinutes()){
            contents += `
          <li class="list-group-item"><div>
           상품 ${result2[i].name}의 정보가 수정 되었습니다.</div>`;
          } else{
            contents += `
          <li class="list-group-item"><div>
           상품 ${result2[i].name}이/가 등록 되었습니다.</div>`;
          }
          contents += `
           <div>
          <small class="text-muted">${result2[i].updated}</small></div>
          <button class="btn btn-outline-success"><a href="/product/${result2[i].id}">상세보기</a></button>
          <button class="btn btn-outline-warning"><a href="/product/update_product/${result2[i].id}">정보 수정</a></button>
          <button class="btn btn-outline-danger" onclick="return confirm('Do you want to delete?')"><a href="/product/delete_product/${result2[i].id}">상품 삭제</a></button>
        </li>
          `;
        }
  
        contents += `</ul></div></div>`;
        var html = template.html(authStatusUi, contents);
        response.send(html);
      });
  });
  });

  module.exports = router;