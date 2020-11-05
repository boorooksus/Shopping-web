var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var template = require('../lib/template.js');
var auth = require('../lib/auth.js');
var db = require('../lib/db.js');

var isUserChecked;

// 로그인 페이지
router.get('/login', (request, response) => {
    var authStatusUi = auth.statusUi(request, response);
    var contents = `
    <form id="login" action="/auth/login_process" method="post">
    <div class="form-group">
      <label for="email">Email address</label>
      <input type="email" class="form-control" id="email" name="email" placeholder="Email">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" name="password" placeholder="Password">
    </div>
    <button type="submit" class="btn btn-primary">로그인</button>
    
    <button class="btn btn-outline-warning"><a href="/auth/find_email">이메일 찾기</a></button>
    <button class="btn btn-outline-danger"><a href="/auth/find_password">비밀번호 찾기</a></button>
    </form>
    `;
    
    var html = template.html(authStatusUi, contents);
    response.send(html);
});

// 비밀번호 찾기 페이지
router.get('/find_password', (request, response) => {
  var authStatusUi = auth.statusUi(request, response);
  var contents = `
  <form id="login" action="/auth/find_password_process" method="post">
  <div class="form-group">
    이메일
    <input type="email" class="form-control" name="email" id="email" placeholder="email">
  </div>
  <div class="form-group">
    이름
    <input type="text" class="form-control" name="name" id="name" placeholder="name">
  </div>
  <div class="form-group">
    생년월일
    <input type="date" class="form-control" name="birth" id="birth">
  </div>
  <button type="submit" class="btn btn-primary">비밀번호 찾기</button>
  `;
  
  var html = template.html(authStatusUi, contents);
  response.send(html);
});

// 비밀번호 찾기 처리
router.post('/find_password_process', (request, response)=>{
  var post = request.body;
  db.query(`SELECT * FROM user WHERE email = ? AND name = ? AND birth = ?`, [post.email, post.name, post.birth], function(err, res){
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
      } else{
        db.query(`
        UPDATE user SET password=? WHERE email=?`, ['0000', post.email], (err, res2) => {
            if(err){
                throw err;
            }
            response.send(`
          <script>
           alert('비밀번호가 0000 으로 초기화 되었습니다.')
           window.history.go(-2);
          </script> 
          `);
        });
      } 
   
  });
});

// 이메일 찾기 페이지
router.get('/find_email', (request, response) => {
  var authStatusUi = auth.statusUi(request, response);
  var contents = `
  <form id="login" action="/auth/find_email_process" method="post">
  <div class="form-group">
    이름
    <input type="text" class="form-control" name="name" id="name" placeholder="name">
  </div>
  <div class="form-group">
    생년월일
    <input type="date" class="form-control" name="birth" id="birth">
  </div>
  <button type="submit" class="btn btn-primary">이메일 찾기</button>
  `;
  
  var html = template.html(authStatusUi, contents);
  response.send(html);
});

// 이메일 찾기 처리
router.post('/find_email_process', (request, response)=>{
  var post = request.body;
  db.query(`SELECT * FROM user WHERE name = ? AND birth = ?`, [post.name, post.birth], function(err, res){
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
      } else{
        response.send(`
          <script>
           alert('회원님의 이메일은 ${res[0].email} 입니다.')
           window.history.go(-2);
          </script> 
          `);
      } 
   
  });
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
        } 
        bcrypt.compare(post.password, res[0].password).then(compare_result => {
          console.log('input: ' + post.password);
          console.log('db: ' + res[0].password);
          if(compare_result === true || res[0].password === post.password){
            request.session.is_logined = true;
            request.session.name = res[0].name;
            request.session.id = res[0].id;
            if(res[0].id === 1){
              request.session.is_admin = true;
            }
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
             alert('비밀번호가 올바르지 않습니다.')
             window.history.back();
            </script> 
            `);
          }
      });
        
    });
});

// 로그아웃 처리
router.get('/logout', (request, response) => {
    request.session.destroy(function(err){
        response.redirect('/');
    });
})

// 회원가입 페이지
router.get('/join', (request, response) => {
    isUserChecked = false;
    var authStatusUi = auth.statusUi(request, response);
    var contents = `
    <form id="join"  method="post">
    <div class="form-group">
    이메일
      <input type="email" class="form-control" id="email" name="email" placeholder="Email">
    </div>

    <div>
    <input type="button" class="btn btn-outline-dark" onclick="userCheck()" value="중복 체크">
    </div>

    <div class="form-group">
      비밀번호
      <input type="password" class="form-control" id="password" name="password" placeholder="Password">
    </div>
    <div class="form-group">
      비밀번호 확인
      <input type="password" class="form-control" id="password_confirm" name="password_confirm" placeholder="Password">
    </div>
    <div class="form-group">
      이름
      <input type="text" class="form-control" id="name" name="name">
    </div>
    <div class="form-group">
      생년월일
      <input type="date" class="form-control" id="birth" name="birth">
    </div>
    <input type="button" class="btn btn-primary" onclick="joinCheck()" value="Join">
    </form>
 
    <script type="text/javascript" src="/js/script-auth.js"></script>
    `;
    
    var html = template.html(authStatusUi, contents);
    response.send(html);
});

// 이메일 중복 체크
router.post('/userCheck', (request, response) => {
  var post = request.body;
  db.query(`SELECT * FROM user WHERE email=?`,[post.email],(err, res) => {
      if(err){
          throw err;
      }
      if(res.length !== 0){
         isUserChecked = false;
          response.send(`
          <script>alert("이미 가입된 회원입니다")
          self.close();
          </script> 
          `);
          return;
      } else{
          isUserChecked = true;
          response.send(`
          <script>alert("사용 가능한 이메일입니다")
          self.close();
          </script> 
          `);
          return;
      }
  });
})

// 회원가입 처리
router.post('/join_process', (request, response)=>{
  if(isUserChecked === false){
    response.send(`
      <script>alert("이메일 중복 체크를 확인해주세요")
      window.history.back();
      </script> 
    `);
    return;
  }

  var post = request.body;

  bcrypt.hash(post.password, 12, function(err, hash){
      db.query(`
      INSERT INTO user (email, password, name, birth) VALUE(?, ?, ?, ?)`, [post.email, hash, post.name, post.birth], (err, res) => {
          if(err){
              throw err;
          }
          response.redirect(302, `/auth/login`);
          
      }
      )
  });
});

module.exports = router;