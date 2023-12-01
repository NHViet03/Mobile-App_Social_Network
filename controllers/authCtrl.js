const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authCtrl = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, birthday } = req.body;
      let newUserName = username.toLowerCase().replace(/ /g, "");

      const user_name = await Users.findOne({ username: newUserName });
      if (user_name) {
        return res.status(400).json({
          msg: `Rất tiếc, tên người dùng ${newUserName} đã tồn tại. Bạn vui lòng chọn một tên người dùng khác.`,
        });
      }

      const user_email = await Users.findOne({ email });
      if (user_email) {
        return res.status(400).json({
          msg: `Rất tiếc, email ${email} đã được người dùng khác đăng ký. Bạn vui lòng chọn một email chưa được đăng ký.`,
        });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        fullname,
        username: newUserName,
        email,
        password: passwordHash,
        birthday,
      });

      await newUser.save();

      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, //30days
      });

      return res.json({
        msg: "Chúc mừng bạn đã tạo thành công tài khoản Dreamers của mình. Bạn đã chính thức gia nhập cộng đồng đầy màu sắc và sáng tạo này.",
        token:access_token,
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
        return res.status(400).json({
          msg: `Có vẻ email ${email} không thuộc về tài khoản nào cả. Vui lòng kiểm tra lại email và thử lại.`,
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          msg: `Mật khẩu cho tài khoản ${email} không chính xác. Vui lòng kiểm tra lại mật khẩu và thử lại.`,
        });
      }

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, //30days
      });

      return res.json({
        msg: "Đăng nhập thành công",
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refresh_token;
      if (!rf_token) {
        return res.status(400).json({
          msg: "Vui lòng đăng nhập hoặc đăng ký tài khoản để tiếp tục.",
        });
      }

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err)
            return res.status(400).json({
              msg: "Vui lòng đăng nhập hoặc đăng ký tài khoản để tiếp tục.",
            });

          const user = await Users.findById(result.id).populate(
            "followers following",
            "-password"
          );

          if (!user) {
            return res.status(400).json({
              msg: "Vui lòng đăng nhập hoặc đăng ký tài khoản để tiếp tục.",
            });
          }

          const access_token = createAccessToken({ id: result.id });
          return res.json({
            msg: "Đăng nhập thành công",
            access_token,
            user: {
              ...user._doc,
              password: "",
            },
          });
        }
      );
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout:async (req,res)=>{
    try {
      res.clearCookie('refresh_token',{path:'/api/refresh_token'})
      return res.json({msg:"Đăng xuất thành công"})
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = authCtrl;
