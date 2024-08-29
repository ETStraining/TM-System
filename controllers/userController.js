import UserModel from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import sendEmail from '../middlewares/sendEmail.js';
import jwt from 'jsonwebtoken';

// Sign Up Function
export const SignUp = async (req, res) => {
  try {
    const { FullName, Email, TelphoneNumber, Password, ConfirmPassword } = req.body;

    if (Password !== ConfirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const userExists = await UserModel.findOne({ Email: Email.toLowerCase() });
    if (userExists) {
      return res.status(401).json({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(Password, 10);

    const newUser = new UserModel({
      FullName,
      Email: Email.toLowerCase(),
      TelphoneNumber,
      Password: hashedPassword
    });

    const savedUser = await newUser.save();
    return res.status(200).json({ message: "Account created!", savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Log In Function
export const LogIn = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const user = await UserModel.findOne({ Email: Email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.Email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.status(200).json({ message: "Logged in successfully", user, token });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get Users Function
export const getUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find({});
    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({ message: "No users found!" });
    } else {
      res.status(200).json({ allUsers });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// Update User Function
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(201).json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
