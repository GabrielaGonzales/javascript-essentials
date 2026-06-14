import { Router } from "express";
import * as bookController from "../controllers/book.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import validateBook from "../middlewares/validateBook.middleware.js";

const router = Router();

router.get("/", bookController.getBooks);
router.get("/:id", bookController.getBookById);
router.post("/", authenticate, validateBook, bookController.createBook);
router.put("/:id", authenticate, validateBook, bookController.updateBook);
router.delete("/:id", authenticate, bookController.deleteBook);

export default router;
