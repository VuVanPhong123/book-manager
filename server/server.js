const express = require("express");
const cors = require("cors");
require("dotenv").config();

const bookRoutes = require("./routes/booklist");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/books", bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
