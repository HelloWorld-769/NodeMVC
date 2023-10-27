const mongoose = require("mongoose");

const dbUrl =
  "mongodb+srv://namanagg59:0GRLxscoido1wWPu@cluster0.5dvi5xl.mongodb.net/?retryWrites=true&w=majority";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true, // userNewParser should be useNewUrlParser
      useUnifiedTopology: true,
    });

    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

module.exports = connectToDatabase;
