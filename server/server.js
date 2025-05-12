const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// importing Routes Folder
const usersRoutes = require("./routes/usersRoutes");
const getAllRoutes = require("./routes/getAllRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const adminRoutes = require("./routes/admin.routes");
const hospitalRoutes = require("./routes/hospitalRoutes");

// importing cors
const cors = require("cors");

// using cors
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// importing Database Connection
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
app.use("/api/v1/doctor", doctorRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/hospital", hospitalRoutes);


// Starting the server
app.listen(port, ()=>{
    console.log(`Server is Running on Port : http://localhost:${port}`)
})