const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// importing Routes Folder
const usersRoutes = require("./routes/usersRoutes");
const getAllRoutes = require("./routes/getAllRoutes");
const connectDB = require("./database/db");
connectDB();

app.get("/", (req, res) =>{
    res.send("Hello World!");
})

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes Middleware
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/getAll", getAllRoutes);

app.listen(port, ()=>{
    console.log(`Server is Running on Port : http://localhost:${port}`)
})