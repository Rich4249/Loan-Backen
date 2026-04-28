import express from "express";
import auth from "../middleware/auth.js";
import { submitLoan, getLoans } from "../controllers/loanController.js";

const router = express.Router();

router.post("/submit", auth, submitLoan);
router.get("/my-loans", auth, getLoans);

export default router;
