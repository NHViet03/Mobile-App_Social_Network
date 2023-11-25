const router=require('express').Router();
const authControl=require('../controllers/authControl');

router.post('/register',authControl.register);
router.post('/login',authControl.login);
router.post('/refresh_token',authControl.generateAccessToken)
router.post('/logout',authControl.logout);

module.exports=router;