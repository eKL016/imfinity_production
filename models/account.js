var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String, //姓名
    gender: Boolean, //性別
    birthday: String, //生日
    password: String, //身份證字號
    pId: String,
    bloodType: String, //血型
    school: String, //學校
    grade: Number, //年級
    type: String, //類組
    vegan: Boolean, //葷素
    mSpecial: String, //特殊飲食習慣
    mSpecialText: String,
    sSpecial: String, //特殊疾病
    sSpecialText: String,
    size: String, //營服尺寸
    tel: String, //聯絡電話
    facebook: String, //FB
    email: String, //email
    emergencyContact: String, //緊急聯絡人
    emergenctRel: String, //關係
    emergencyTel: String, //電話
    selfIntro: String, //自介
    mot: String, //動機
    demand: String, //期許
    contactUs: String, //想說的話
    howToKnowUs: Array //如何得知本營隊
});

Account.plugin(passportMongoose, {
    usernameField: "email"
});

module.exports = mongoose.model('Account', Account);