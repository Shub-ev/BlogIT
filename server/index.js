const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectMongoose } = require("./config/db");
const router = require('./routes');

dotenv.config();

const PORT = process.env.PORT;

const app = express();

connectMongoose();

app.use(cors());
app.use(express.json());

app.use('/user/blogIT/', router);



app.listen(PORT, () => {
    console.log("Server Running at PORT "+PORT);
})