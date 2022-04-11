const express = require("express");
const res = require("express/lib/response");
const User = require("../schemas/user");
const router = express.Router();
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/seoul")




router.get('/searchfollow',(req,res)=>{
    const {userId} = req.body;
    const token = req.headers.cookie.split('=')[1];
    const decoded = 1
});





router.post('/searchFollow',async(req,res)=>{
    const {userId,friendId} = req.body;
    const existUser = await User.find({friendId});
    if(!existUser){
        return res.send({msg:"없는 유저입니다!"})
    }
    await User.updateOne({userId},{$addToSet:{friendList:`${friendId}`}})
    return res.send({msg:"추가완료"})
});




router.post('/addinfo', async(req,res)=>{
    


    const {userId,nickname,password,startTime,totalTime,connecting,friendList} = req.body

    await User.create({userId,nickname,password,startTime,totalTime,connecting,friendList})
    return res.status(200).send({msg:"완료!"});
})


router.post('/:userId/start',async(req,res)=>{
    const {userId} = req.body;
    console.log(userId)
    const startTime = new moment().format('YYYY-MM-DD HH:mm');
    
    await User.updateOne({userId},{$set:{startTime:startTime,connecting:true}});
    return res.status(200).send({msg:"완료!"});
   
})
// moment 상태로 데이터에 집어넣고 나중에 .format이용하면?

router.post('/:userId/end', async(req,res)=>{
    const {userId} = req.body;
    const userInfo = await User.find({userId})
    // db에 있는 startTime 꺼내오기
    const startTimeIndb = userInfo[0].startTime
    // string타입인 startTime moment object로 바꿔주기
    const startTime = moment(startTimeIndb,'YYYY-MM-DD HH:mm');
    // endTime 생성
    const endTime = new moment();
    // 시간차 계산
    const todayTime = moment.duration(endTime.diff(startTime)).asMinutes()
   
    
     // type : 누적시간 분으로 환산한 number
     // 총시간 계산
    const totalTime = userInfo[0].totalTime + todayTime
    // totalTime 데이터 추가, connecting false
    await User.updateOne({userId},{$set:{totalTime:totalTime, connecting:false}});
    return res.send({msg:"체크아웃완료!"})
    
})


module.exports = router;




// checkin
// {userid, startTime}
// db의 userinfo에 checkin time 기록,(array로 추가해서 새로운 array 만든다, slice(-7,0)  or 단순 업데이트 숫자만 변경)
// db의 userinfo checkout time 초기화, 
// 어제의 공부시간기록 누적시간 = checkOutTime - checkInTime