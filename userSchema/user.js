const mongo = require('mongoose');
const Schema = mongo.Schema;

const userSchema = new Schema({
    userID:String,
    name: String,
    email: {
        type:String,
        unique:true
    },
    phone:Number,
    password:String
});

module.exports = mongo.model('User', userSchema);