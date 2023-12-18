const Users = require("../models/userModel");

const userCtrl = {
  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Users.findOne({ _id: id })
        .select("avatar username fullname followers following story")
        .lean();

      return res.json({ user });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getFollowers: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Users.findOne({ _id: id }).select("followers").lean();

      const followers = await Users.find({
        _id: { $in: user.followers },
      })
        .select("avatar username fullname")
        .lean();

      res.json({ followers });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getFollowing: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Users.findOne({ _id: id }).select("following").lean();

      const following = await Users.find({
        _id: { $in: user.following },
      })
        .select("avatar username fullname")
        .lean();

      res.json({ following });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deleteFollower: async (req, res) => {
    try {
      const { id } = req.params;

      await Users.findOneAndUpdate(
        { _id: id },
        {
          $pull: { following: req.user._id },
        }
      );

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { followers: id },
        }
      );

      return res.json({ msg: "Success" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  follow: async (req, res) => {
    try {
      const { id } = req.params;

      await Users.findOneAndUpdate(
        { _id: id },
        {
          $push: { followers: req.user._id },
        }
      );

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: { following: id },
        }
      );

      return res.json({ msg: "Success" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  unFollow: async (req, res) => {
    try {
      const { id } = req.params;

      await Users.findOneAndUpdate(
        { _id: id },
        {
          $pull: { followers: req.user._id },
        }
      );

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { following: id },
        }
      );

      return res.json({ msg: "Success" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  searchUsers: async (req, res) => {
    try {
      const { username } = req.query;

      const users = await Users.find({
        role: "user",
        $or: [
          { username: { $regex: username, $options: "i" } },
          { fullname: { $regex: username, $options: "i" } },
        ],
      })
        .select("avatar username fullname")
        .lean();

      res.json({ users });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = userCtrl;
