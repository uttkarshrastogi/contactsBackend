const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbconnection");
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');

connectDb()
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
app.use(express.json())
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorHandler)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
