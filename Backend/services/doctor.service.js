const doctorModel = require('../models/doctor.model');
const appointmentModel = require('../models/appointment.model');


module.exports.createDoctor = async (name, email,password, phone, specialization, experience, clinicAddress, consultationFee) => {
    if(!name || !email || !password|| !phone || !specialization || !experience || !clinicAddress || !consultationFee){
        throw new Error('All fields are required');
    }
    
    const doctor = new doctorModel({
        name,
        email,
        password,
        phone,
        specialization,
        experience,
        clinicAddress,
        consultationFee
    });
    await doctor.save();
    return doctor;
}

module.exports.findDoctor=async(email)=>{
    if(!email){
        throw new Error ('Email is required')
    }
    const doctor= await doctorModel.findOne({email}).select('+password');

    if(!doctor){
        throw new Error('Doctor not found')
    }
    return doctor
}

module.exports.getAppointment=async(doctor)=>{
    if(!doctor){
        throw new Error('Doctor is required')
    }
    const appointments= await appointmentModel.find({doctor:doctor._id}).populate('user');
    return appointments;
}

module.exports.cancelAppointment=async(doctor, id)=>{
    if(!doctor || !id){
        throw new Error('Doctor and id are required')
    }
    await appointmentModel.findOneAndDelete({_id:id, doctor:doctor._id});
}

module.exports.updateProfile = async (doctor, updateFields) => {
    if (!doctor) {
        throw new Error('Doctor is required');
    }
    try {
        const updatedDoctor = await doctorModel.findByIdAndUpdate(doctor._id, updateFields, { new: true });
        return updatedDoctor;
    } catch (error) {
        console.error(error);
        throw new Error('Server Error');
    }
}
