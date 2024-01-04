const Notifies = require('../models/notifyModel')

const notifyCtrl = {
    createNotify: async (req, res) => {
      
      try {
        const {id, recipients, url, text, content, image} = req.body
        const notify = new Notifies({ id, recipients, url, text, content, image, user: req.user._id })
        await notify.save()
        return res.json({msg : 'success'})
      } catch (err) {
        return res.status(500).json({msg: err.message})
      }

    },
    removeNotify: async (req, res) => {
      try {
        const notify = await Notifies.findOneAndDelete({id: req.params.id, url: req.query.url})
        res.json(notify)
      } catch (err) {
        return res.status(500).json({msg: err.message})
      }
    },
    getNotifies: async (req, res) => {
      try {
        const notifies = await Notifies.find({recipients: req.user._id})
        .sort('-createdAt').populate('user', 'avatar username fullname' )

        console.log(notifies)
        res.json({notifies})
      } catch (err) {
        return res.status(500).json({msg: err.message})
      }
    },
}

module.exports = notifyCtrl