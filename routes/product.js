var express = require('express');
var router = express.Router();
var sanitizeHtml = require('sanitize-html');
var multer = require('multer');
var cookie = require('cookie');
var cookieParser = require('cookie-parser')

var template = require('../lib/template.js');
var auth = require('../lib/auth.js');
var db = require('../lib/db.js');

var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({storage: _storage})


// 상품 등록 페이지
router.get('/add_product', (request, response) => {
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
  <form action = "/product/add_product_process" method="post" enctype="multipart/form-data" id="add_product">
  <div class="form-group">
  상품명
    <input type="text" class="form-control" name="name" placeholder="Name">
  </div>

  <div class="form-group">
    상품 사진
    <input type="file" name="img" class="form-control-file">
  </div>

  <div class="form-group">
  카테고리
  <select class="form-control" name="category">
    <option value="top" selected>Top</option>
    <option value="outer">Outer</option>
    <option value="pants">Pants</option>
    <option value="acc">Acc</option>
  </select>
  </div>

  <div class="form-group">
    가격
    <input type="number" class="form-control" id="price" name="price" placeholder="Price" max=">
  </div>

  <div class="form-group">
    상품 설명
    <textarea class="form-control" id="description" name="description" placeholder="Description" rows="5"></textarea>
  </div>
  
  <input type="button" class="btn btn-primary" onclick="addCheck()" value="상품 등록">
  </form>

  <script type="text/javascript" src="/js/script-admin.js"></script>
  `;
  var html = template.html(authStatusUi, contents);
  response.send(html);
});

// 상품 등록 처리
router.post('/add_product_process',upload.single('img'), (request, response, next)=>{
  console.log("in processing");
  var post = request.body;

  console.log("========" + post.category + "=======");

  db.query(`
      INSERT INTO product (name, description, created, updated, img_name, price, category) VALUE(?, ?, NOW(), NOW(), ?, ?, ?)`, [post.name, post.description, request.file.originalname, post.price, post.category], (err, res) => {
        console.log("in db");
          if(err){
              throw err;
          }
          response.redirect(302, `/products/all/1`);
          
      }
  )
});
  
// 상품 수정 페이지
router.get('/update_product/:productId', (request, response) => {
  if(!auth.isAdmin(request, response)){
      response.send(`
          <script>alert('관리자만 접속 가능한 페이지입니다.')
          window.history.back();
          </script> 
      `);
      return;
  }
  var pid = request.params.productId;
  var authStatusUi = auth.statusUi(request, response);
  db.query(`SELECT * FROM product WHERE id=?`,[pid],function(error, result){
    var contents = `
  <form action = "/product/update_product_process" method="post" enctype="multipart/form-data" id="add_product">
  <input type="hidden" name="id" value="${pid}">
  <div class="form-group">
  상품명
    <input type="text" class="form-control" name="name" value=${result[0].name}>
  </div>

  <div class="form-group">
    상품 사진
    <input type="file" name="img" class="form-control-file">
  </div>

  <div class="form-group">
  카테고리
  <select class="form-control" name="category" value=${result[0].category}>
    <option value="top" selected>Top</option>
    <option value="outer">Outer</option>
    <option value="pants">Pants</option>
    <option value="acc">Acc</option>
  </select>
  </div>

  <div class="form-group">
    가격
    <input type="number" class="form-control" id="price" name="price" placeholder="Price" max="10000000" value=${result[0].price}>
  </div>

  <div class="form-group">
    상품 설명
    <textarea class="form-control" id="description" name="description" rows="5">${result[0].description}</textarea>
  </div>
  
  <input type="button" class="btn btn-warning" onclick="addCheck()" value="상품 수정">
  </form>

  <script type="text/javascript" src="/js/script-admin.js"></script>
  `;
  var html = template.html(authStatusUi, contents);
  response.send(html);
  });
});

// 상품 수정 처리
router.post('/update_product_process',upload.single('img'), (request, response, next)=>{
  console.log("in processing");
  var post = request.body;
  db.query(`
      UPDATE product SET name=?, description=?, updated=NOW(), img_name=?, price=?, category=? WHERE id=${post.id}`, [post.name, post.description, request.file.originalname, post.price, post.category], (err, res) => {
        console.log("in db");
          if(err){
              throw err;
          }
          response.redirect(302, `/admin`);
          
      }
  )
});

// 상품 삭제
router.get('/delete_product/:productId', (request, response)=>{
  if(!auth.isAdmin(request, response)){
    response.send(`
        <script>alert('관리자 이외에는 권한이 없습니다.')
        window.history.back();
        </script> 
    `);
    return;
}
var pid = request.params.productId;
  db.query(`DELETE FROM product WHERE id=?`, [pid], (err, res) => {
          if(err){
              throw err;
          }
          response.redirect(302, `/admin`);
          
      }
  )
});

// 글 상세보기 페이지
router.get('/:productId', function(request, response, next){
  var pid = request.params.productId;
  //var sanitizedTitle = sanitizeHtml(title);
  var authStatusUi = auth.statusUi(request, response);
  var authProductUi = auth.productUi(request, response, pid);
  //var filteredId = path.parse(request.params.pageId).base;
  db.query(`SELECT * FROM product WHERE id=${pid}`, function(err, result){
      var name = result[0].name;
      var description = result[0].description;
      var img_name = result[0].img_name;
      var sanitizedName = sanitizeHtml(name);
      var sanitizedDes = sanitizeHtml(description);
      var sanitizedImg = sanitizeHtml(img_name);
      var contents = `
      <div class = "container">
  <div class="row">
    <div class="col-md-5">
              <img src="/images/${sanitizedImg}" 
              style="width: 100%" />
    </div>
    <div class="col-md-6">
              <h3>${sanitizedName}</h3>
              <p><script>showPrice(${result[0].price})</script>원</p> 
              
              ${authProductUi}
              <hr>
              <p>${sanitizedDes}</p>
      
    </div>
  </div>
  <hr>
</div>
      `;
  var html = template.html(authStatusUi, contents);
  response.send(html);
  });

});

  module.exports = router;