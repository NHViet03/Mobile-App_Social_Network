const Notifies = require("../models/notifyModel");

const notifyCtrl = {
  createNotify: async (req, res) => {
    try {
      const { id, recipients, url, text, content, image } = req.body;
      const notify = new Notifies({
        id,
        recipients,
        url,
        text,
        content,
        image,
        user: req.user._id,
      });
      await notify.save();

      res.json({
        msg: "Tạo thông báo thành công!",
        notify: {
          ...notify._doc,
          user: {
            _id: req.user._id,
            username: req.user.username,
            avatar: req.user.avatar,
            followers: req.user.followers,
            following: req.user.following,
          },
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  removeNotify: async (req, res) => {
    try {
      const notify = await Notifies.findOneAndDelete({
        id: req.params.id,
        url: req.query.url,
      });

      return res.json({ notify });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getNotifies: async (req, res) => {
    try {
      const notifies = await Notifies.find({ recipients: req.user._id })
        .sort("-createdAt")
        .populate("user", "avatar username fullname");
        
      res.json({ notifies });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteNotifies: async (req, res) => {
    try {
      await Notifies.deleteMany({ recipients: req.user._id });

      res.json({
        msg: "Xoá thành công",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = notifyCtrl;
