const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const userModel = require('../models/user.model');
const doctorModel = require('../models/doctor.model');
const adminModel = require('../models/admin.model');

module.exports.authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
        }

        const isTokenExist = await blacklistTokenModel.findOne({ token });
        if (isTokenExist) {
            return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded._id)
        if (!user.$isEmpty()) {
            req.user = user;
            next();
        } else {
            return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
        }
    } catch (err) {
        return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
    }
}

module.exports.authDoctor = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
        }

        const isTokenExist = await blacklistTokenModel.findOne({ token });
        if (isTokenExist) {
            return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const doctor = await doctorModel.findById(decoded._id).select('+password');
        if (!doctor.$isEmpty()) {
            req.doctor = doctor;
            next();
        } else {
            console.log('Unauthorized');
            return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
        }
    } catch (err) {
        console.log(err)
        return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
    }
}

module.exports.authAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
        }

        const isTokenExist = await blacklistTokenModel.findOne({ token });
        if (isTokenExist) {
            return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await adminModel.findById(decoded._id).select('+password');
        if (!admin.$isEmpty()) {
            req.admin = admin;
            next();
        } else {
            return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
        }
    } catch (err) {
        return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
    }
}
