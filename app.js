const express = require("express");
const app = express();
const userRoutes = require("./router/user");
const db = require("./database/db");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use("/api/v1", userRoutes);

const port = 3000;
// app.listen(port, () => {
//   console.log(`server listening at port ${port}`);
// });

db()
  .then(() => {
    // Start your Express server or perform other actions after the database is connected
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });
