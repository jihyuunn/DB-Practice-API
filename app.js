var express = require('express'); // 설치한 express module을 불러와서 변수(express)에 담습니다.
var mongoose = require("mongoose");
var app = express(); //express를 실행하여 app object를 초기화 합니다.
var path = require('path')
var bodyParser = require('body-parser')

// DB setting
mongoose.set('useNewUrlParser', true);    // 1
mongoose.set('useFindAndModify', false);  // 1
mongoose.set('useCreateIndex', true);     // 1
mongoose.connect('mongodb+srv://jihyun:dlwlgus%21@cluster0-fxgzx.mongodb.net/test?retryWrites=true&w=majority'); // 2
var db = mongoose.connection; // 3
// 4
db.once("open", function(){
  console.log("DB connected");
});
// 5
db.on("error", function(err){
  console.log("DB ERROR : ", err);
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "content-type");
    next()
})


app.use('/api/todolists', require('./api/todolists'))

app.listen(8000, function(){ //3000번 포트를 사용합니다.
  console.log('Server On!'); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
});