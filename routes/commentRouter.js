const router = require('express').Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/commentCtrl');

router.post('/comments', auth ,commentCtrl.createComment);

module.exports = router;