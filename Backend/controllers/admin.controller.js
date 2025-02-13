const { validationResult } = require('express-validator');
const adminService = require('../services/admin.service.js');
const adminModel = require('../models/admin.model.js');
const blacklistTokenModel = require('../models/blacklistToken.model.js');
const appointmentModel = require('../models/appointment.model.js');
const userModel = require('../models/user.model.js');
const doctorModel = require('../models/doctor.model.js');


module.exports.registerAdmin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    console.log(name, email, password);

    const adminAlreadyExists = await adminModel.findOne({
        email
    });
    if (adminAlreadyExists) {
        return res.status(400).json({ message: 'Admin already exists' });
    }
    try {
        const hashedPassword = await adminModel.hashPassword(password);
        const admin = await adminService.createAdmin(name, email, hashedPassword);
        const token = await admin.generateJWT();
        res.status(201).json(token);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.loginAdmin = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
        const admin = await adminModel.findOne({ email }).select('+password')
        if (!admin) {
            return res.status(400).json({ message: "Admin does not exist" })
        }
        const isValid = await admin.isValidPassword(password)
        if (!isValid) {
            return res.status(400).json({ message: "Invalid Password" })
        }
        const token = await admin.generateJWT()
        res.status(200).json(token)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.logoutAdmin = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(400).json({ message: "No token found" })
    }
    res.clearCookie('token')
    await blacklistTokenModel.create({ token })
    res.status(200).json({ message: "Logged out successfully" })
}

module.exports.getAllDoctors = async (req, res) => {
    const doctors = await adminService.getAllDoctors();
    res.status(200).json(doctors);
}

module.exports.getAllUsers = async (req, res) => {
    const users = await adminService.getAllUsers();
    res.status(200).json(users);
}

module.exports.getAllAppointments = async (req, res) => {
    const appointments = await adminService.getAllAppointments();
    res.status(200).json(appointments);
}

module.exports.cancelappointment = async (req, res) => {
    const appointmentId = req.params.id;
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
        return res.status(400).json({ message: "Appointment does not exist" })
    }
    await appointmentModel.findByIdAndDelete(appointmentId);
    res.status(200).json({ message: "Appointment cancelled successfully" })
}

module.exports.getAdminProfile = async (req, res) => {
    res.status(200).json(req.admin)
}

module.exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    const user = await userModel.findById(userId);
    if (!user) {
        return res.status(400).json({ message: "User does not exist" })
    }
    await userModel.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" })
}

module.exports.deleteDoctor = async (req, res) => {
    const doctorId = req.params.id;
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
        return res.status(400).json({ message: "Doctor does not exist" })
    }
    await doctorModel.findByIdAndDelete(doctorId);
    res.status(200).json({ message: "Doctor deleted successfully" })
}