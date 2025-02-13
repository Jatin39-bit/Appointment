const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const appointmentModel = require('../models/appointment.model');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


router.post('/register', [
    body('name').isString().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')],userController.registerUser
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],userController.loginUser)

router.get('/profile',authMiddleware.authUser, userController.getUserProfile);

router.post('/bookappointment',[
    body('time').isString().isLength({min:1}).withMessage('Timeslot is required'),
    body('doctorId').isMongoId().withMessage('Doctor Id is required'),
    body('date').isString().withMessage('Date is required')
],authMiddleware.authUser, userController.bookAppointment);

router.get('/getappointments',authMiddleware.authUser, userController.getAppointments);
router.delete('/cancelappointment/:id',authMiddleware.authUser, userController.cancelAppointment);

router.put('/updateprofile', [
    body('phone').optional().isMobilePhone().withMessage('Invalid Phone Number'),
    body('address').optional().isString().isLength({ min: 10 }).withMessage('Address must be at least 10 characters long'),
    body('gender').optional().isIn(['Male','Female','Other']).withMessage('Invalid gender'),
    body('birthday').optional().isISO8601().withMessage('Invalid date of birth')],
    authMiddleware.authUser,userController.updateProfile)

router.post('/create-checkout-session', authMiddleware.authUser, async (req, res) => {
    console.log("creating-checkout-session")
    const { appointmentId } = req.body;
    const realAppointment= await appointmentModel.findById(appointmentId).populate('doctor');
    const appointment = {
        price: realAppointment.doctor.consultationFee  * 100, // in cents
        currency: 'usd',
        description: `Appointment with ${realAppointment.doctor.name}`
    };

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: appointment.currency,
                product_data: {
                    name: appointment.description,
                },
                unit_amount: appointment.price,
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/success`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ id: session.id });
});

router.post('/update-appointment-status',[
    body('appointmentId').isMongoId().withMessage('Appointment Id is required'),
    body('status').isIn(['Paid','Failed']).withMessage('Invalid status')
],authMiddleware.authUser, userController.updateAppointmentStatus);

router.get('/logout', userController.logoutUser);


module.exports = router;