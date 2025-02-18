const userModel = require('../models/user.model');
const { validationResult } = require('express-validator');
const userSerive = require('../services/user.service');
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userSerive.createUser(name, email, hashedPassword);

    const token = await user.generateJWT();
    res.status(201).json(token);
}

module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await userSerive.findUser(email);
        if(!user || user.error){
        return res.status(400).json({ errors: [{ msg: 'User not found' }] });
    }else{
        console.log(user);
    }
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
        return res.status(400).json({ errors: [{ msg: 'Invalid password' }] });
    }
    const token = await user.generateJWT();
    res.status(200).json(token);
}

module.exports.getUserProfile = async (req, res) => {
    res.status(200).json(req.user);
}

module.exports.bookAppointment = async (req, res) => {
    const { time, doctorId, date } = req.body;
    const user = req.user;
    const appointment = await userSerive.bookAppointment(user, time, doctorId, date);
    res.status(201).json(appointment);
}

module.exports.getAppointments = async (req, res) => {
    const user = req.user;
    const appointments = await userSerive.getAppointments(user);
    res.status(200).json(appointments);
}

module.exports.cancelAppointment = async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    await userSerive.cancelAppointment(user, id);
    res.status(200).json({ msg: 'Appointment cancelled successfully' });
}

module.exports.logoutUser = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
    }
    res.clearCookie('token');
    await blacklistTokenModel.create({ token });
    res.status(200).json({ msg: 'Logged out successfully' });
}


module.exports.updateProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const user = req.user;
    const { phone, address, gender, birthday } = req.body;
    const updateFields = {}
    if (phone) updateFields.phone = Number(phone);
    if (address) updateFields.address = address;
    if (gender) updateFields.gender = gender;
    if (birthday) updateFields.birthday = birthday;
    try {
        const updatedUser = await userSerive.updateProfile(user, updateFields);
        res.status(200).json({ msg: 'Profile updated successfully', user: updatedUser });
    } catch (err) {
        res.status(500).send('Server Error');
    }
}


module.exports.updateAppointmentStatus = async (req, res) => {
    const user = req.user;
    const { appointmentId, status } = req.body;
    try {
        await userSerive.updateAppointmentStatus(user, appointmentId, status);
        res.status(200).json({ msg: 'Appointment updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}
