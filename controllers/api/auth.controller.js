const User = require("../../models/User.model");
const bcryptjs = require("bcryptjs");
const { registerValidation, loginValidation } = require("../../validation");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

exports.register = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  // Validate Data
  const validation = registerValidation(req.body);
  if (validation.error) {
    return res.status(400).json({
      error: validation.error,
      statusCode: res.statusCode,
    });
  }

  try {
    // Check for existing User with the same email
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        error: "This email is already associated with another user!",
        statusCode: res.statusCode,
      });
    }

    // Check for existing User with the same username
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({
        error: "This username is already associated with another user!",
        statusCode: res.statusCode,
      });
    }

    // Create a new User
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = await jwt.sign({ id: savedUser.id }, keys.tokenSecret, {
      expiresIn: 3600,
    });

    return res.status(201).json({
      token: token,
      user: {
        id: savedUser._id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        username: savedUser.username,
        email: savedUser.email,
      },
      statusCode: res.statusCode,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error,
      statusCode: res.statusCode,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate Data
    const validation = loginValidation(req.body);
    if (validation.error) {
      return res.status(400).json({
        error: validation.error,
        statusCode: res.statusCode,
      });
    }

    // Check if a user exists with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "User doesn't exist!",
        statusCode: res.statusCode,
      });
    }

    // Validate password
    const isPassword = await bcryptjs.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        error: "The password you entered is wrong!",
        statusCode: res.statusCode,
      });
    }

    const token = await jwt.sign({ id: user.id }, keys.tokenSecret, {
      expiresIn: 3600,
    });

    return res.status(201).json({
      token: token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      },
      statusCode: res.statusCode,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error,
      statusCode: res.statusCode,
    });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      error: error,
      statusCode: res.statusCode,
    });
  }
};
