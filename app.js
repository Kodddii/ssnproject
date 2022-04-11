const express = require("express");
const app = express();
const dbconnect = require("./schemas/index");
dbconnect();
const port = 8000;
const checkinRouter = require('./router/checkin');
// const cors = require("cors");
// app.use(cors());
const bodyparser = require("body-parser");


// 미들웨어 : 로그기록 , 요청들어온 url 출력하기 
const requestMiddleware = (req,res,next) =>{
    console.log("request url", req.originalUrl, " - ", new Date());
    next();
};


app.use(express.json());
app.use(requestMiddleware);
app.use("/api", checkinRouter);
app.listen(port,() => {
    console.log(port, "포트로 서버가 켜졌어요");
});