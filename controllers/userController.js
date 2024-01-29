const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const  jwt  = require("jsonwebtoken");

//@desc register a new user
//@routes POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const requiredKeys = ["username", "email", "password"];
  const missingKeys = requiredKeys.filter((key) => !(key in req.body));
  const { username, email, password } = req.body;
  if (missingKeys.length > 0) {
    res.status(400);
    throw new Error(`Missing required keys: ${missingKeys.join(", ")}`);
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("Email already exist");
  }
  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const Users = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ _id: Users._id, email: Users.email });
  } catch (error) {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

//@desc login a registered user
//@routes POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const requiredKeys = ["email", "password"];
  const missingKeys = requiredKeys.filter((key) => !(key in req.body));
  const {email, password } = req.body;
  const token = process.env.ACCESS_TOKEN;
  if (missingKeys.length > 0) {
    res.status(400);
    throw new Error(`Missing required keys: ${missingKeys.join(", ")}`);
  }
  const user = await User.findOne({email})
  if(user && bcrypt.compare(password,user.password)){
    const accessToken = jwt.sign(
       { user:{
            username:user.username,
            email:user.email,
            _id:user.id
        },},
        token,{expiresIn:"15m"}
        
    )
res.status(200).json({accessToken})
  }else{
res.status(401)
throw new Error("password is not valid")
  }
 
});

//@desc get current user
//@routes GET /api/users/current
//@access private
const CurrentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  CurrentUser,
};
