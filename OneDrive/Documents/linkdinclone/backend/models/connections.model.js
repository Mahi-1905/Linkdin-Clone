//by which it is sending 
//and to which it is sending

import mongoose from "mongoose";

const connectionRequest = new mongoose.Schema({
    userId: {

         type:mongoose.Schema.Types.ObjectId,
         ref:'user'

    },

    connectionId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },

    status_accepted: {
        type: Boolean,
        default:null

    }

});

const ConnectionRequest = mongoose.model("connectionRequest",connectionRequest);

export default ConnectionRequest;