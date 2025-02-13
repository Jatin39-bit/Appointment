const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        Selection:true
    },
    phone: {
        type: Number,
        unique: true
    },
    gender:{
        type:String,
    },
    birthday:{
        type:Date
    },
    profilePicture:{
        type:String,
        default:"https://picsum.photos/200"
    },
    appointments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointment'
        }
    ]

})

userSchema.statics.hashPassword=async (password)=>{
    return await bcrypt.hash(password,10);
}

userSchema.methods.isValidPassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateJWT=async function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'1d'});
    return token;
}


module.exports = mongoose.model('User', userSchema);