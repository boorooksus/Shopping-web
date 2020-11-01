const express = require('express');
const app = express();
const port = 3000;
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session')
var compression = require('compression');
var FileStore = require('session-file-store')(session);
var indexRouter = require('./routes/index.js');
var productsRouter = require('./routes/products.js');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(compression());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // session 추가되면 session 폴더 안에 파일로 저장
    store:new FileStore()
  }))

app.use('/', indexRouter);
app.use('/products', productsRouter);

app.use(function (err, req, res, next){
    console.error(err,stack)
    res.status(500).send('Someting broke!')
})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})