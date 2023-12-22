const router = require("express").Router();
const messageCtrl = require("../controllers/messageCtrl");
const auth = require("../middleware/auth");

router.get("/conversations", auth, messageCtrl.getConversations);
router.get("/messages/:id", auth, messageCtrl.getMessages);

router.post("/create_message", auth, messageCtrl.createMessage);
router.delete("/delete_conversation/:id", auth, messageCtrl.deleteConversation);


module.exports = router;
