const router = require('express').Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/commentCtrl');

router.post('/comments', auth ,commentCtrl.createComment);
router.patch('/update_comment', auth, commentCtrl.updateComment);
router.patch('/like_comment', auth, commentCtrl.likeComment);
router.patch('/unlike_comment', auth, commentCtrl.unlikeComment);
router.delete('/delete_comment/:id', auth, commentCtrl.deleteComment);


module.exports = router;