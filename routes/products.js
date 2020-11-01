var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var auth = require('../lib/auth.js');

router.get('/:pageNum', (request, response) => {
    var authStatusUi = auth.statusUi(request, response);
    var contents = `
    hi
    `;
    var html = template.html(authStatusUi, contents);
    response.send(html);
  });

  router.get('/top/:pageNum', (request, response) => {
    var authStatusUi = auth.statusUi(request, response);
    var contents = `
    hi
    `;
    var html = template.html(authStatusUi, contents);
    response.send(html);
  });
  
  module.exports = router;