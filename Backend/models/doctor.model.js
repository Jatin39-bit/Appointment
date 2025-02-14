const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        select:false
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    specialization:{
        type:String,
        required:true,
        enum:['Cardiologist','Dentist','Dermatologist','ENT Specialist','Gynecologist','Neurologist','Orthopedic','Pediatrician','Psychiatrist','Surgeon'] 
    },
    experience:{
        type:Number,
        required:true
    },
    clinicAddress:{
        type:String,
        required:true
    },
    consultationFee:{
        type:Number,
        required:true
    },
    profilePicture:{
        type:String,
        default:"https://picsum.photos/200"
    },
    about:{
        type:String,
        default:""
    },
    appointments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointment'
        }
    ],
    gender:{
        type:String,
        enum:['Male','Female','Other'],
    },
    birthday:{
        type:Date
    }
})

doctorSchema.statics.hashPassword=async (password)=>{
    return await bcrypt.hash(password,10);
}


doctorSchema.methods.isValidPassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

doctorSchema.methods.generateJWT=async function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'1d'});
    return token;
}

module.exports = mongoose.model('Doctor', doctorSchema);