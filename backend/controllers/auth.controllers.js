const authDatabase = require("../models/auth.models");
const sendToken = require("../utils/JwtToken");

const signUp = async (req, res) => {
  try {
    const { name, password, role, email, dashboard } = req.body;

    const user = await authDatabase.create({
      name,
      password,
      role,
      email,
      dashboard,
    });

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "please fill all the details",
      });
    }

    return sendToken(user, 201, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "please fill all the details",
      });
    }

    const user = await authDatabase.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not matched",
      });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(404).json({
        success: false,
        message: "password not matched",
      });
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

const updatePermission = async (req, res) => {
  try {
    const { email, dashboard } = req.body;

    // const newData = {
    //   dashboard: dashboard,
    //   role: role,
    // };

    if (!email || !dashboard) {
      return res.status(404).json({
        success: false,
        message: "please fill all the details",
      });
    }

    const user = await authDatabase.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const update = await authDatabase.findOneAndUpdate(
      { email: email },
      { dashboard: dashboard },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      message: "user permission updated successfully",
      update,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

module.exports = {
  signUp,
  signIn,
  updatePermission,
};
