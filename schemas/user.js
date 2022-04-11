const mongoose = require("mongoose");
const moment = require("moment");
const schema = new mongoose.Schema({
  userId: String,
  nickname: String,
  password: String,
  startTime: String,
  totalTime:Number,
  connecting:Boolean,
  friedList:[],
});
// schema.virtual("userId").get(function () {
//   return this._id.toHexString();
// });
// schema.set("toJSON", {
//   virtuals: true,
// });

// const obje = {
//     userId : "test",
//     nickname : "testnick",
//     password : "test1234",
//     connecting: false,
//     friendList : []
// }

// const obje2 = {
//     userId : "test",
// }
module.exports = mongoose.model("User", schema);