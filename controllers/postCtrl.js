const Posts = require("../models/postModel");
const Comments = require("../models/commentModel");
const Users = require("../models/userModel");
const Reports = require("../models/reportModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  paginating() {
    const limit = this.queryString.limit * 1 || 15;
    this.query = this.query.limit(limit);
    return this;
  }
}

const postCtrl = {
  createPost: async (req, res) => {
    try {
      const { content, images } = req.body;

      const post = new Posts({
        content,
        images,
        user: req.user._id,
      });

      await post.save();

      return res.json({
        msg: "Tạo bài viết thành công",
        post :{
          ...post._doc,
          user: req.user
        },
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getPosts: async (req, res) => {
    try {
      const users = [...req.user.following, req.user._id];

      const posts = await Posts.find({
        user: users,
      })
        .sort("-createdAt")
        .populate("user", "avatar username fullname followers")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });

      res.json({
        posts,
        result: posts.length,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getExplorePosts: async (req, res) => {
    try {
      const exceptArr = [...req.user.following, req.user._id];
      const features = new APIfeatures(
        Posts.find({
          user: { $nin: exceptArr },
        }),
        req.query
      ).paginating();

      const posts = await features.query
        .populate("user", "avatar username fullname")
        .populate({
          path: "comments",
          populate: {
            path: "user",
            select: "avatar username fullname",
          },
        })
        .sort("-createdAt");

      return res.json({
        posts,
        result: posts.length,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getUserPosts: async (req, res) => {
    try {
      const { id } = req.params;
      const features = new APIfeatures(
        Posts.find({
          user: id,
        }),
        req.query
      ).paginating();

      const posts = await features.query
        .populate("user", "avatar username fullname")
        .sort("-createdAt")
        .populate({
          path: "comments",
          populate: {
            path: "user",
            select: "avatar username fullname",
          },
        });

      return res.json({
        posts,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getSavedPosts: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await Users.findById(id).select("saved").lean();

      const features = new APIfeatures(
        Posts.find({
          _id: { $in: user.saved },
        }),
        req.query
      ).paginating();

      const posts = await features.query
        .populate("user", "avatar username fullname")
        .populate({
          path: "comments",
          populate: {
            path: "user",
            select: "avatar username fullname",
          },
        });

      return res.json({
        posts,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getPost: async (req, res) => {
    try {
      const { id } = req.params;

      const post = await Posts.findOne({ _id: id })
        .populate("user", "avatar fullname username")
        .populate({
          path: "comments",
          populate: {
            path: "user",
            select: "avatar username fullname",
          },
        });

      return res.json({
        post,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  updatePost: async (req, res) => {
    try {
      const { content, _id } = req.body;

      const post = await Posts.findOneAndUpdate(
        { _id: _id },
        { content },
        { new: true }
      )
        .populate("user", "avatar fullname username")
        .populate({
          path: "comments",
          populate: {
            path: "user",
            select: "avatar username fullname",
          },
        });

      return res.json({
        msg: "Cập nhật bài viết thành công",
        post,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  likePost: async (req, res) => {
    try {
      const { post, user } = req.body;
      (newPost = await Posts.findOneAndUpdate(
        { _id: post._id },
        { $push: { likes: user._id } },
        { new: true }
      )),
        res.json({
          msg: "Like thành công",
          newPost: newPost,
        });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  unlikePost: async (req, res) => {
    try {
      const { post, user } = req.body;
      (newPost = await Posts.findOneAndUpdate(
        { _id: post._id },
        { $pull: { likes: user._id } },
        { new: true }
      )),
        res.json({
          msg: "UnLike thành công",
          newPost: newPost,
        });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deletePost: async (req, res) => {
    const { id } = req.params;

    try {
      const post = await Posts.findById(id);
      await post.deleteOne();

      await Comments.deleteMany({ _id: { $in: post.comments } });

      console.log("oke");
      return res.json({
        msg: "Xóa bài viết thành công",
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  savePost: async (req, res) => {
    const { id } = req.params;
    const { user } = req.body;

    try {
      await Users.findOneAndUpdate(
        { _id: user._id },
        {
          $push: { saved: id },
        },
        { new: true }
      );
      return res.json({
        msg: "Lưu bài viết thành công",
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  unsavePost: async (req, res) => {
    const { id } = req.params;
    const { user } = req.body;

    try {
      await Users.findOneAndUpdate(
        { _id: user._id },
        {
          $pull: { saved: id },
        },
        { new: true }
      );
      return res.json({
        msg: "Bỏ lưu bài viết thành công",
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  reportPost: async (req, res) => {
    try {
      const { id, reason, reporter } = req.body;

      const newReport = new Reports({
        id,
        reason,
        reporter,
      });

      await newReport.save();

      res.json({
        msg: "Đã gửi báo cáo thành công",
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = postCtrl;
