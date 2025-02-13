const doctorModel = require('../models/doctor.model');
const { validationResult } = require('express-validator');
const doctorService = require('../services/doctor.service');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerDoctor = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, specialization, experience, clinicAddress, consultationFee, password } = req.body;
    try {
        const doctorExists = await doctorModel.findOne({ email });
        if (doctorExists) {
            return res.status(400).json({ errors: [{ msg: 'Doctor already exists' }] });
        }
        const hashedPassword = await doctorModel.hashPassword(password)
        const doctor = await doctorService.createDoctor(name, email, hashedPassword, phone, specialization, experience, clinicAddress, consultationFee);
        const token = await doctor.generateJWT()
        res.status(200).json(token);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

module.exports.loginDoctor = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
        const doctor = await doctorService.findDoctor(email)
        const isValidPassword = await doctor.isValidPassword(password)
        if (!isValidPassword) {
            return res.status(400).json({ errors: [{ msg: 'Invalid password' }] })
        }
        const token = await doctor.generateJWT()
        return res.status(200).json(token)
    } catch (err) {
        return res.status(500).send('Server Error')
    }
}

module.exports.logoutDoctor = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ errors: [{ msg: "Unauthorized" }] })
    }
    res.clearCookie('token')
    await blacklistTokenModel.create({ token })
    res.status(200).json({ msg: 'Logged out successfully' });
}


module.exports.getDoctors = async (req, res) => {
    const { filter } = req.query;
    try {
        let doctors = [];
        if (filter === 'all') {
            doctors = await doctorModel.find({});
        } else if (filter) {
            doctors = (await doctorModel.find({ specialization: { $regex: filter, $options: 'i' } }));
        } else {
            return res.status(400).json({ errors: [{ msg: 'Invalid filter' }] })
        }
        return res.status(200).json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

module.exports.getDoctor = async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await doctorModel.findById(id).select(-"appointments");
        if (!doctor) {
            return res.status(404).json({ errors: [{ msg: 'Doctor not found' }] });
        }
        return res.status(200).json(doctor);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

module.exports.getAppointments = async (req, res) => {
    const doctor = req.doctor;
    const appointments = await doctorService.getAppointment(doctor);
    res.status(200).json(appointments);
}

module.exports.cancelAppointment = async (req, res) => {
    const doctor = req.doctor;
    const { id } = req.params;
    try {
        await doctorService.cancelAppointment(doctor, id);
        res.status(200).json({ msg: 'Appointment cancelled successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

module.exports.updateProfile = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { phone, address, gender, birthday, consultationFee, about } = req.body;

    const updateFields = {};
    if(phone) updateFields.phone = Number(phone);
    if (address) updateFields.address = address;
    if (gender) updateFields.gender = gender;
    if (birthday) updateFields.birthday = birthday;
    if (consultationFee) updateFields.consultationFee = consultationFee;
    if (about) updateFields.about = about;

    try { 
        const updatedDoctor = await doctorService.updateProfile(req.doctor,updateFields);
        res.status(200).json(updatedDoctor);
    } catch (err) {
        console.log(err)
        return res.status(500).send('Server Error')
    }
}

module.exports.getProfile = (req, res) => {
    const doctor = req.doctor;
    res.status(200).json(doctor);
}