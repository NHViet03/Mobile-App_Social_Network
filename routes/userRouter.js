const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");

router.get("/user/:id", auth, userCtrl.getUser);
router.get("/user_followers/:id", auth, userCtrl.getFollowers);
router.get("/user_following/:id", auth, userCtrl.getFollowing);

router.patch("/delete_follower/:id", auth, userCtrl.deleteFollower);
router.patch("/follow/:id", auth, userCtrl.follow);
router.patch("/unfollow/:id", auth, userCtrl.unFollow);

router.get("/search_users", auth, userCtrl.searchUsers);

router.patch("/update_profile", auth, userCtrl.updateProfile);
router.patch("/change_password",auth, userCtrl.changePassword);
router.get("/suggestionsUser", auth, userCtrl.suggestionsUser);

module.exports = router;
