var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var auth = require('../lib/auth.js');

router.get('/', (request, response) => {
    var authStatusUi = auth.statusUi(request, response);
    var contents = `
    <h1>Welcome to Shopping Mall</h1>
    `;
    var html = `
    <!DOCTYPE html>
<html>
    <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <title>Shopping Mall</title>
    <link rel="stylesheet" href="/css/style.css">
    <style>
        html, body{
            background-image: url('/images/wall.jpg');
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
        #content {
            text-align: center;
        }
        #content h1{
            padding-top: 200px;
            color: white;
            text-align: center;
        }
        #content p{
            color: white;
        }
        #content a{
            color: grey;
            font-size: 15px;
        }
        #menu{
            visibility: hidden;
        }
    </style>
    </head>
    <body>
    ${template.topbar(authStatusUi)}
    <div id="content">
        <h1>Welcome To Shopping Mall</h1>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <button type="button" class="btn btn-light"><a href="/products/1">쇼핑 시작</a></button>
    </div>
    </body>
</html>
    `;
    response.send(html);
  });
  
  module.exports = router;