const mongoose=require('mongoose');
const appointment=new mongoose.Schema({
    createdAt:{
        type:Date,
        default:Date.now
    },
    timeslot:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:String,
        enum:['Pending','Paid','Failed'],
        default:'Pending'
    }
})

module.exports=mongoose.model('Appointment',appointment);