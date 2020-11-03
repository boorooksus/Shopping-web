var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var auth = require('../lib/auth.js');
var db = require('../lib/db.js');

// 로그인 페이지
router.get('/login', (request, response) => {
    var authStatusUi = auth.statusUi(request, response);
    var contents = `
    <form id="signIn" action="/auth/login_process" method="post">
    <div class="form-group">
      <label for="email">Email address</label>
      <input type="email" class="form-control" id="email" name="email" placeholder="Email">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" name="password" placeholder="Password">
    </div>
    <button type="submit" class="btn btn-primary">Login</button>
    </form>
    `;
    
    var html = template.html(authStatusUi, contents);
    response.send(html);
});

// 로그인 처리
router.post('/login_process', (request, response)=>{
    var post = request.body;
    db.query(`SELECT * FROM user WHERE email = ?`, [post.email], function(err, res){
        if(err){
            throw(err);
        }
        else if(res.length === 0){
            response.send(`
            <script>alert('회원 정보를 찾을 수 없습니다.')
            window.history.back();
            </script> 
            `);
            return
        } else if(res[0].password === post.password){
            request.session.is_logined = true;
            request.session.name = res[0].name;
            request.session.save(function(){
                response.redirect(302, `/`);
            //     response.send(`
            // <script>
            //     window.history.go(-2);
            // </script> 
            // `);
            });
        } else{
            console.log('===password is not correct===');
            console.log('password: ', res[0].password);
            console.log('input: ', post.password);
            response.send(`
            <script>
             alert('password is not correct')
             window.history.back();
            </script> 
            `);
        }
    });
});

// 로그아웃 처리
router.get('/logout', (request, response) => {
    request.session.destroy(function(err){
        response.redirect('/');
    });
})

module.exports = router;