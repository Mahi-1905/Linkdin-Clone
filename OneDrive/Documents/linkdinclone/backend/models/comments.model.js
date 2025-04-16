//connect with user id
//connect with post id


import mongoose from "mongoose";

const commmentSchema = new mongoose.Schema({

     userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
     },

     postId: {
         type: mongoose.Schema.Types.ObjectId,
         ref:'Post'
     },
     
     body: {
         type:String,
         required: true
     }
});

const comment = mongoose.model("comment",commentSchema);

export default comment;


