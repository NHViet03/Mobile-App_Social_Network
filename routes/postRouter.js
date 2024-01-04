const router=require('express').Router();
const postCtrl=require('../controllers/postCtrl');
const auth=require('../middleware/auth');

router.post('/create_post',auth,postCtrl.createPost)

router.get('/posts',auth,postCtrl.getPosts)
router.get('/explore_posts',auth,postCtrl.getExplorePosts)

router.get('/user_posts/:id',auth,postCtrl.getUserPosts)
router.get('/saved_posts/:id',auth,postCtrl.getSavedPosts)
router.patch('/post', auth, postCtrl.updatePost)
router.patch('/post/like', auth, postCtrl.likePost)
router.patch('/post/unlike', auth, postCtrl.unlikePost)
router.delete('/delete_post/:id', auth, postCtrl.deletePost)
router.patch('/save_post/:id', auth, postCtrl.savePost)
router.patch('/unsave_post/:id', auth, postCtrl.unsavePost)

router.post("/report_post", auth, postCtrl.reportPost);


router.get('/post/:id',auth,postCtrl.getPost)
 

module.exports=router;