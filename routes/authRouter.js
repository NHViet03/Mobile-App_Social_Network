const router=require('express').Router();
const authControl=require('../controllers/authControl');

router.post('/register',authControl.register);
router.post('/login',authControl.login);

module.exports=router;