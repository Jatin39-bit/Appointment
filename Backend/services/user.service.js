const userModel = require('../models/user.model');
const appointmentModel = require('../models/appointment.model');


module.exports.createUser = async (name, email, password) => {
    if(!name || !email || !password ){
        throw new Error('All fields are required');
    }
    const user = new userModel({
        name,
        email,
        password,
    });
    await user.save();
    return user;
}

module.exports.findUser = async (email) => {
    if(!email){
        throw new Error('Email is required');
    }
    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        return { error: 'User not found' };
    }
    return user;
}

module.exports.bookAppointment = async (user, time, doctorId, date) => {
    if(!user || !time || !doctorId || !date){
        throw new Error('All fields are required');
    }
    const appointment = await appointmentModel.create({
        timeslot:time,
        doctor:doctorId,
        user:user._id,
        date:date
    });
    return appointment;
}

module.exports.cancelAppointment = async (user, id) => {
    if(!user || !id){
        throw new Error('All fields are required');
    }
    await appointmentModel.deleteOne({_id:id,user:user._id});
}

module.exports.getAppointments = async (user) => {
    if(!user){
        throw new Error('User is required');
    }
    const appointments = await appointmentModel.find({user:user._id}).populate('doctor');
    return appointments;
}

module.exports.updateProfile = async (user, updateFields) => {
    if(!user){
        throw new Error('User is required');
    }
    try{
        const updatedUser = await userModel.findByIdAndUpdate(user._id, updateFields, {new:true});
        return updatedUser;
    }catch(err){
        console.log(err);
        throw new Error('Server Error');
    }
}

module.exports.updateAppointmentStatus = async (user, appointmentId, status) => {
    if(!user || !appointmentId || !status){
        throw new Error('All fields are required');
    }
    try{
        await appointmentModel.findByIdAndUpdate(appointmentId,{status});
    }catch(err){
        throw new Error('Server Error',err);
    }
}
