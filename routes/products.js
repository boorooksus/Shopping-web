var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var auth = require('../lib/auth.js');

router.get('/:pageNum', (request, response) => {
    var authStatusUi = auth.statusUi(request, response);
    var contents = ``;
    for(var i = 0; i < 12; i += 4){
      contents += `<div class="card-deck">`;
      for(var j = i; j < i + 4; j++){
        contents += `

        <div class="card">
        <a href="#">
        <img class="card-img-top" src="/images/wall.jpg">
        </a>
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Item
              10,000won
            </p>
          </div>
        </div>

      `;
      }
      contents += `</div>`;
    }
    var html = template.html(authStatusUi, contents);
    response.send(html);
  });

  router.get('/top/:pageNum', (request, response) => {
    var authStatusUi = auth.statusUi(request, response);
    var contents = ``;
    
    var html = template.html(authStatusUi, contents);
    response.send(html);
  });
  
  module.exports = router;