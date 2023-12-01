const router=require('express').Router();
const postCtrl=require('../controllers/postCtrl');
const auth=require('../middleware/auth');

router.post('/create_post',auth,postCtrl.createPost)

router.get('/posts',auth,postCtrl.getPosts)
router.get('/explore_posts',auth,postCtrl.getExplorePosts)


module.exports=router;