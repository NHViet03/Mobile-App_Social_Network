const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authControl = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, birthday } = req.body;
      let newUserName = username.toLowerCase().replace(/ /g, "");

      const user_name = await Users.findOne({ username:newUserName });
      if (user_name) {
        return res.status(400).json({ msg: `Rất tiếc, tên người dùng ${newUserName} đã tồn tại. Bạn vui lòng chọn một tên người dùng khác.` });
      }

      const user_email = await Users.findOne({ email });
      if (user_email) {
        return res.status(400).json({ msg: `Rất tiếc, email ${newUserName} đã được người dùng khác đăng ký. Bạn vui lòng chọn một email chưa được đăng ký.`});
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        fullname,
        username:newUserName,
        email,
        password:passwordHash,
        birthday,
      });

      await newUser.save();

      return res.json({
        msg: "Chúc mừng bạn đã tạo thành công tài khoản Dreamers của mình. Bạn đã chính thức gia nhập cộng đồng đầy màu sắc và sáng tạo này.",
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email }).populate(
        "followers following",
        "-password"
      );

      if (!user) {
        return res.status(400).json({msg:`Có vẻ email ${email} không thuộc về tài khoản nào cả. Vui lòng kiểm tra lại email và thử lại.`});
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ msg: `Mật khẩu cho tài khoản ${email} không chính xác. Vui lòng kiểm tra lại mật khẩu và thử lại.`});
      }

      return res.json({
        msg: "Đăng nhập thành công",
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = authControl;
