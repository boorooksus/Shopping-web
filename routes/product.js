var express = require('express');
var router = express.Router();
var sanitizeHtml = require('sanitize-html');

var template = require('../lib/template.js');
var auth = require('../lib/auth.js');
var db = require('../lib/db.js');

router.get('/', (request, response) => {
    var authStatusUi = auth.statusUi(request, response);
    var contents = `
    <div>
    <button class="btn btn-danger"><a href="/admin/add_product">상품 등록</a></button>
    </div>
    `;
    var html = template.html(authStatusUi, contents);
    response.send(html);
  });

// 글 상세보기 페이지
router.get('/:productId', function(request, response, next){
    var pid = request.params.productId;
    //var sanitizedTitle = sanitizeHtml(title);
    var authStatusUi = auth.statusUi(request, response);
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
                <p>${result[0].price}원</p> 
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