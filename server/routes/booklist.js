const express = require("express");
const router = express.Router();
const bookController = require("../controllers/booklist");

router.get("/", bookController.getBooks);
router.post("/", bookController.addBook);
router.put("/:asin", bookController.updateBook);
router.delete("/:asin", bookController.deleteBook);


module.exports = router;
