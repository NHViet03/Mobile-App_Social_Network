const Users = require("../models/userModel");
const bcrypt = require("bcrypt");

const userCtrl = {
  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Users.findOne({ _id: id })
        .select("avatar username fullname followers following story website")
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
  updateProfile: async (req, res) => {
    try {
      const { avatar, fullname, username, story, website, gender } = req.body;

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          avatar,
          fullname,
          username: username.toLowerCase().replace(/ /g, ""),
          story,
          website,
          gender,
        },
        {
          new: true,
        }
      );

      return res.json({ msg: "Success" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = await Users.findById(req.user._id).select("password");

      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Mật khẩu hiện tại không đúng." });
      }

      const newPasswordHash = await bcrypt.hash(newPassword, 12);

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          password: newPasswordHash,
        }
      );

      return res.json({ msg: "Thay đổi mật khẩu thành công." });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  suggestionsUser: async (req, res) => {
    try {
      const newArr = [...req.user.following, req.user._id]

      const num = req.query.num || 10

      const users = await Users.aggregate([
        {$match: {_id: {$nin: newArr}}},
        {$sample: {size: Number(num)}},
        {$lookup: {from: "users", localField: "followers", foreignField: "_id", as: "followers"}},
        {$lookup: {from: "users", localField: "following", foreignField: "_id", as: "following"}},
      ]).project("-password")

      return res.json ({
        users,
        result: users.length
      })

    }catch (err){
      return res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = userCtrl;
