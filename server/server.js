const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

dotenv.config({ path: path.join(__dirname, ".env") });

if (!process.env.MONGODB_URI) {
  console.error("Missing MONGODB_URI in .env file");
  process.exit(1);
}

const bookRoutes = require("./routes/booklist");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.use((error, res) => {
  console.error(error);
  res.status(500).json({ message: "Something went wrong!" });
});


app.use((res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });
