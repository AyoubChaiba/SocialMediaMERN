import mongoose from "mongoose";

let ProfileSchema = mongoose.Schema({
    username : {
        type : String ,
        required : true ,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String ,
        required : true,
    },
    avatar : {
        type : String ,
    },
    viewProfile :{
        type : Number,
        default : 0,
    },
    followers : {
        type : Array,
        default : [],
    },
    following : {
        type : Array,
        default : [],
    }
},{
    timestamps : true
}) ;

let Profile = mongoose.model('Profile', ProfileSchema);

export default Profile ;

