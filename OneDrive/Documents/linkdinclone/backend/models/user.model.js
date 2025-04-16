import mongoose,{Schema} from "mongoose";

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },

    username : {
        type:String,
        required:true,
        unique:true
    },

    email: {
        type:DOMStringList,
        required:true,
        unique:true
    },

    active: {
        type:String,
        required:true,
        unique: true
    },
    
    password: {
        type:String,
        required:true
    },
    profilePicture: {
        type:String,
        default: 'default.jpg'
    },
    createdAt: {
        type:Date,
        default:Date.now
    },
    token: {
        type:String,
        default: ''
    }


});

const User = mongoose.model("user2323",userSchema);

export default User;

