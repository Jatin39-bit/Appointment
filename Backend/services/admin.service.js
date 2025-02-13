const adminModel = require('../models/admin.model');
const doctorModel = require('../models/doctor.model');
const userModel = require('../models/user.model');
const appointmentModel = require('../models/appointment.model');

module.exports.createAdmin = async (name,email,password) => {
    const admin = new adminModel({
        name,
        email,
        password
    });
    await admin.save();
    return admin;
}

module.exports.getAllDoctors = async () => {
    const doctors = await doctorModel.find({}).select('-password');
    return doctors;
}

module.exports.getAllUsers = async () => {
    const users = await userModel.find({}).select('-password');
    return users;
}

module.exports.getAllAppointments = async () => {
    const appointments = await appointmentModel.find({}).populate('doctor').select('-password').populate('user').select('-password');
    return appointments;
}

