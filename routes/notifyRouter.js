const router = require('express').Router();
const notifyCtrl = require('../controllers/notifyCtrl')
const auth = require('../middleware/auth')

router.post('/notify', auth, notifyCtrl.createNotify)
router.delete('/notify', auth, notifyCtrl.removeNotify)
router.get('/notifies', auth, notifyCtrl.getNotifies)





module.exports = router;