const express=require('express')
const router=express.Router()
const {body}=require('express-validator')
const adminController=require('../controllers/admin.controller')
const authMiddleware=require('../middlewares/auth.middleware')



router.post('/register',[
    body("name").isString().isLength({min:3}).withMessage("Name should be atleast 3 characters long"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:6}).withMessage("Password should be atleast 6 characters long")
],adminController.registerAdmin)


router.post('/login',[
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isString().isLength({min:6}).withMessage("Password should be atleast 6 characters long")
],adminController.loginAdmin)

router.get('/profile',adminController.getAdminProfile)

router.get('/logout',authMiddleware.authAdmin,adminController.logoutAdmin)

router.get('/alldoctors',authMiddleware.authAdmin,adminController.getAllDoctors)

router.get('/allusers',authMiddleware.authAdmin,adminController.getAllUsers)

router.get('/allappointments',authMiddleware.authAdmin,adminController.getAllAppointments)

router.delete('/cancelappointment/:id',authMiddleware.authAdmin,adminController.cancelappointment)

router.delete('/deleteuser/:id',authMiddleware.authAdmin,adminController.deleteUser)

router.delete('/deletedoctor/:id',authMiddleware.authAdmin,adminController.deleteDoctor)

module.exports=router