import UserSchema from "../models/User.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      occupation,
      picturePath,
      friends,
      location,
    } = req.body;

    const saltPassword = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltPassword);

    const newUser = new UserSchema({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      occupation,
      picturePath,
      friends,
      location,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export default register;
