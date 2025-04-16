import mongoose from "mongoose";

const educationSchema = new  mongoose.Schema ({
    school: {
        type:String,
        default: '',
    },

    degree: {
        type:String,
        default:'',
    },
    fieldOfStudy: {
        type:String,
        default:'',
    },


});

const workschema = new mongoose.Schema({

    company: {
        type:String,
        default: '',
    },

    postion: {
        type:String,
        default: '',
    },

    years: {
         type:String,
         default: '',
    },
});

const profileSchema = new mongoose.Schema({
    userId: {
         
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'

    },

    bio: {

         type:String,
         default: '',

    },

    currentPost: {

        type: String,
        default: '',

    },

    pastWork: {

        type:[workschema],
        default: [],

    },

    education: {

        type:[educationSchema],
        default:[],

    }
});

const profiple = mongoose.model('profile',profileSchema);

export default profileSchema;

