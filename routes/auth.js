var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var template = require('../lib/template.js');
var auth = require('../lib/auth.js');
var db = require('../lib/db.js');
var cookie = require('cookie');
var cookieParser = require('cookie-parser')

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
            request.session.user_id = res[0].id;
            if(res[0].isAdmin){
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
    <form id="join" method="post">
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
          window.close();
          </script> 
          `);
          return;
      } else{
          isUserChecked = true;
          response.send(`
          <script>
          alert("사용 가능한 이메일입니다")
          window.close();
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
      INSERT INTO user (email, password, name, birth, isAdmin, created) VALUE(?, ?, ?, ?,?, NOW())`, [post.email, hash, post.name, post.birth, false], (err, res) => {
          if(err){
              throw err;
          }
          response.redirect(302, `/auth/login`);
          
      }
      )
  });
});

// 회원 탈퇴
router.get('/leave/:id', (request, response)=>{
  var id = request.params.id;
  if(!auth.isAdmin(request, response) && request.session.user_id !== id){
    response.send(`
        <script>alert('권한이 없습니다.')
        window.history.back();
        </script> 
    `);
    return;
}
  db.query(`DELETE FROM user WHERE id=?`, [id], (err, res) => {
          if(err){
              throw err;
          }
          if(!auth.isAdmin(request, response)){
            request.session.destroy(function(err){
              response.redirect('/');
              return;
          });
          } else{
            response.redirect(302, `/admin`); 
            return;
          }    
      }
  )
});

// 회원 정보 수정 페이지
router.get('/update/:id', (request, response) => {
  var id = request.params.id;
  if(!auth.isAdmin(request, response) && request.session.user_id != id){
    response.send(`
        <script>alert('권한이 없습니다.')
        window.history.back();
        </script> 
    `);
    return;
}
  isUserChecked = false;
  var authStatusUi = auth.statusUi(request, response);
  db.query(`SELECT * FROM user WHERE id=?`,[id],function(error, result){
    var birth = new Date(result[0].birth);
    var birth_str = birth.getFullYear() + '-' + ('0' + (birth.getMonth() + 1)).slice(-2) + '-' + ('0' + birth.getDate()).slice(-2);
    console.log(birth_str);
    var contents = `
    <h4>회원 정보 수정</h4>
  <form id="join"  method="post">
  <div class="form-group">
  </div>
  <input type="hidden" class="form-control" name="id" value=${id}>
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
    <input type="text" class="form-control" value="${result[0].name}" name="name">
  </div>
  <div class="form-group">
    생년월일
    <input type="date" class="form-control" value="${birth_str}" name="birth">
  </div>
  <input type="button" class="btn btn-primary" onclick="updateCheck()" value="Update">
  </form>

  <script type="text/javascript" src="/js/script-auth.js"></script>
  `;
  
  var html = template.html(authStatusUi, contents);
  response.send(html);
  });
});

// 회원 정보 수정 처리
router.post('/update/update_process', (request, response)=>{
  var post = request.body;
  bcrypt.hash(post.password, 12, function(err, hash){
      db.query(`
      UPDATE user SET password=?, name=?, birth=? WHERE id=?`, [hash, post.name, post.birth, post.id], (err, res) => {
          if(err){
              throw err;
          }
          response.redirect(302, `/`);
          
      }
      )
  });
});

// 장바구니 추가
router.post('/add_cart', (request, response)=>{
  if(!auth.isLogined(request, response)){
    response.send(`
    <script>
    alert("로그인 후에 이용가능합니다.")
    window.close();
    </script> 
    `
    );
    return;
  }
  var post = request.body;
  console.log('start');
  console.log("coockie: " + request.cookies);
  if(request.cookies.cart) {
    var cart = request.cookies.cart;
  } else {
    var cart = {};
  }
  console.log('cart_id: ', Object.keys(cart));

  console.log('get lenth');
  //아직 값이 없을 경우
  if(!cart[post.id]){
    cart[post.id]= post.count;
  }
  else{
    cart[post.id] = parseInt(cart[post.id]) + parseInt(post.count);
  }

  var cart_keys = Object.keys(cart);

  for(var i = 0; i < cart_keys.length; i++){
    console.log(`cart[${cart_keys[i]}]: ` + cart[cart_keys[i]]);
  }


  response.cookie('cart', cart);

  response.send(`
    <script>
    alert("장바구니에 상품이 추가되었습니다.")
    window.close();
    </script> 
    `
);
});


// 장바구니
router.get('/cart', (request, response) => {
  var authStatusUi = auth.statusUi(request, response);
  var contents = `
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">상품</th>
      <th scope="col">수량</th>
      <th scope="col">가격</th>
    </tr>
  </thead>
  <tbody>
  `;

  if(request.cookies.cart) {
    var cart = request.cookies.cart;
  } else {
    contents += `
      </tbody>
      </table>
      장바구니 담긴 상품이 없습니다.
    `;
    var html = template.html(authStatusUi, contents);
    response.send(html);
    return;
  }
  var cart_keys = Object.keys(cart);
  var query = `
  SELECT * FROM product WHERE id=${cart_keys[0]}
  `;
  for(var i = 1; cart_keys && i < cart_keys.length; i++){
    query += `
    OR id=${cart_keys[i]} 
    `;
  }
  db.query(query, (error, result) => {
    if(!result){
      contents += `
      </tbody>
      </table>
      장바구니 담긴 상품이 없습니다.
    `;
    var html = template.html(authStatusUi, contents);
    response.send(html);
    return;
    }

    var total = 0;
    for(var i = 0; result && i < result.length; i++){
      contents += `
      <tr>
        <th scope="row">${i + 1}</th>
        <td>${result[i].name}</td>
        <td>${parseInt(cart[cart_keys[i]])}</td>
        <td><script>showPrice(${parseInt(result[i].price) * parseInt(cart[cart_keys[i]])})</script></td>
        <td><button class="btn btn-outline-danger" ><a href="/auth/delete_cart/${result[i].id}">상품 삭제</a></button></td>
      </tr>
      `;
      total += parseInt(result[i].price) * parseInt(cart[cart_keys[i]])
    }
    
    contents += `
    </tbody>
    </table>
    <h5>결제 금액: <script>showPrice(${total})</script>원</h5>
    <button class="btn btn-success" onclick="confirm('구매 하시겠습니까?')">구매하기</button>
    <button class="btn btn-danger" ><a href="/auth/clear_cart" onclick="return confirm('장바구니를 비우시겠습니까?')" >장바구니 비우기</a></button>
    `;
    var html = template.html(authStatusUi, contents);
    response.send(html);
  });
});

// 장바구니 삭제
router.get('/delete_cart/:productId', (request, response)=>{
  var pid = request.params.productId;
  console.log("pid: " + pid);
  if(request.cookies.cart) {
    var cart = request.cookies.cart;
  }

  if(cart[pid]){
    //response.clearCookie(`${cart[pid]}`);
    //cookies.set(`${cart[pid]}`, {maxAge: 0});
    //response.cookie(`${cart[pid]}`, '', {expire: Date.now()}); 
    delete cart[pid];
    //cart[pid] = null;
  }
  console.log("cart: " + cart[2]);
  
  response.cookie('cart', cart);

  response.redirect(302, `/auth/cart`);
});

// 장바구니 비우기
router.get('/clear_cart', (request, response)=>{
  if(request.cookies.cart) {
    var cart = request.cookies.cart;
    console.log("cart: " + cart);

    response.cookie('cart', '', {expire: Date.now()}); 
    console.log("==== after clear ");
  }
  response.redirect(302, `/auth/cart`);
});

module.exports = router;