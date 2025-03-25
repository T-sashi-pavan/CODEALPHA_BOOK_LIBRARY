require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express(); // ✅ Define app before using it

app.use(cors({ origin: "http://localhost:3000" })); // ✅ CORS should be after defining app
app.use(express.json()); // ✅ Important for handling JSON requests

const PORT = process.env.PORT || 5000;
const bookRoutes = require("./routes/bookRoutes");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error:", err));

app.use("/books", bookRoutes); // ✅ Ensure routes are defined after middleware

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
