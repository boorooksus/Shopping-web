const express = require('express');
const app = express();
const port = 3000;
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session')
var compression = require('compression');
var FileStore = require('session-file-store')(session);
var cookieParser = require('cookie-parser')

var indexRouter = require('./routes/index.js');
var productsRouter = require('./routes/products.js');
var productRouter = require('./routes/product.js');
var authRouter = require('./routes/auth.js');
var adminRouter = require('./routes/admin.js');

// const ngrok = require('ngrok');
// (async function() {
//   const url = await ngrok.connect(3000);
// })();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(compression());
app.use(cookieParser())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // session 추가되면 session 폴더 안에 파일로 저장
    store:new FileStore()
  }))

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/product', productRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);

app.use(function (err, req, res, next){
    console.error(err,stack)
    res.status(500).send('Someting broke!')
})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})