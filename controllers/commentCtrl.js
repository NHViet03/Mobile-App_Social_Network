const Comments = require("../models/commentModel");
const Posts = require("../models/postModel");

const commentCtrl = {
  createComment: async (req, res) => {
    try {
      const { postId, content } = req.body;

      const newComment = Comments({
        user: req.user._id,
        content,
      });

      await Posts.findOneAndUpdate(
        { _id: postId },
        {
          $push: { comments: newComment._id },
        },
        { new: true }
      );

      await newComment.save();

      res.json({
        newComment,
      });
    } catch (err) {}
  },
  updateComment: async (req, res) => {
    try {
      const { content, _id } = req.body;

      await Comments.findOneAndUpdate(
        { _id: _id, user: req.user._id },
        {
          content,
        }
      );

      res.json({
        msg: "Update Success!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  likeComment: async (req, res) => {
    const { _id } = req.body;
    try {
      await Comments.findOneAndUpdate(
        { _id: _id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      res.json({
        msg: "Liked Comment!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unlikeComment: async (req, res) => {
    const { _id } = req.body;
    try {
      await Comments.findOneAndUpdate(
        { _id: _id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );

      res.json({
        msg: "UnLiked Comment!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteComment: async (req, res) => {
    const { id } = req.params;
    try {
      await Comments.findByIdAndDelete( id);
      console.log("ok")
      res.json({ msg: "Deleted Comment!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = commentCtrl;
