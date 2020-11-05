var express = require('express');
var router = express.Router();
var multer = require('multer');

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
    <button class="btn btn-danger"><a href="/admin/add_product">상품 등록</a></button>
    </div>
    `;
    var html = template.html(authStatusUi, contents);
    response.send(html);
  });


  
  module.exports = router;