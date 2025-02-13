const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const doctorController = require('../controllers/doctor.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('name').isString().isLength({ min: 3 }).withMessage('Name must be atleast 3 characters long'),
    body('email').isEmail().withMessage('Invalid Email').withMessage('Email already exists'),
    body('password').isString().isLength({min:6}).withMessage("password must be atleast 6 characters long"),
    body('phone').isMobilePhone().withMessage('Invalid Phone Number'),
    body('specialization').isIn(['Cardiologist', 'Dentist', 'Dermatologist', 'ENT Specialist', 'Gynecologist', 'Neurologist', 'Orthopedic', 'Pediatrician', 'Psychiatrist', 'Surgeon']).withMessage('Invalid Specialization'),
    body('experience').isNumeric().withMessage('Experience must be a number'),
    body('clinicAddress').isString().isLength({ min: 10 }).withMessage('Clinic Address must be atleast 10 characters long'),
    body('consultationFee').isNumeric().withMessage('Consultation Fee must be a number'),
], doctorController.registerDoctor);

router.post('/login',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isString().isLength({min:6}).withMessage("password must be atleast 6 characters long")
],doctorController.loginDoctor
)

router.get('/profile',authMiddleware.authDoctor,doctorController.getProfile)

router.get('/getdoctors',doctorController.getDoctors)

router.get('/getdoctor/:id',doctorController.getDoctor)

router.get('/getappointments',authMiddleware.authDoctor,doctorController.getAppointments)

router.delete('/cancelappointment/:id',authMiddleware.authDoctor,doctorController.cancelAppointment)

router.put('/updateprofile', [
    body('phone').optional().isMobilePhone().withMessage('Invalid Phone Number'),
    body('address').optional().isString().isLength({ min: 10 }).withMessage('Address must be at least 10 characters long'),
    body('gender').optional().isIn(['Male', 'Female', 'Other']).withMessage('Invalid Gender'),
    body('birthday').optional().isISO8601().withMessage('Invalid Date of Birth'),
    body('consultationFee').optional().isNumeric().withMessage('Consultation Fee must be a number'),
    body('about').optional().isString().isLength({ min: 10 }).withMessage('About must be at least 10 characters long')
], authMiddleware.authDoctor, doctorController.updateProfile);


router.get('/logout',doctorController.logoutDoctor)

module.exports=router