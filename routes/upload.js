import express from "express";
import multer from "multer";
import auth from "../middleware/auth.js";
import { uploadDocument } from "../controllers/uploadController.js";

const router = express.Router();

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/document", auth, upload.single("file"), uploadDocument);

export default router;
