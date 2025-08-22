const express = require("express");
const router = express.Router();
const bookController = require("../controllers/booklist");
const auth = require("../middleware/auth"); 

router.get("/", bookController.getBooks);            
router.get("/search", bookController.searchBooks);      

router.post("/", auth, bookController.addBook);
router.put("/:asin", auth, bookController.updateBook);
router.delete("/:asin", auth, bookController.deleteBook);

module.exports = router;
