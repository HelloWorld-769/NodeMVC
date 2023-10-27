const bcrypt = require("bcrypt");
const User = require("../models/user");
const multer = require("multer");
const path = require("path");

creatingHashedPass = async (req, res) => {
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(req.body.password, salt);
  console.log(`Hashed Password : ${hash}`);
  return hash;
};

//Add a new user to database
const addUser = async (req, res) => {
  const hashPass = await creatingHashedPass(req, res);
  console.log(req.body);
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPass,
      contact: req.body.contact,
      age: req.body.age,
    });

    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//Get all users from the database
const getUser = async (req, res) => {
  try {
    const users = await User.findOne({});
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//Update User details in Database
const updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(userId, {
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      age: req.body.age,
    });
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
//Delete user from the database
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = User.findByIdAndDelete(userId);
    res.status(200).send(`User deleted is ${userId}`);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//Add image

const addImage = async (req, res) => {
  const userId = req.params.id;

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    // Get the path to the uploaded image
    const imagePath = path.join("/data", req.file.originalname); // Adjust the path as needed

    // Update the user's document with the image path
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.imagePath = imagePath;
    await user.save();

    res.status(200).json({ message: "Image uploaded and linked to the user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Image upload and update failed" });
  }
};

module.exports = { addUser, getUser, updateUser, deleteUser, addImage };
