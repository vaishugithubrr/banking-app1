import express from "express";
import {
  applyForLoan,
  getMyLoans,
  getLoanDetails,
  updateLoanStatus,
  getRepaymentSchedule,
  payLoanInstallment
} 
from "../controllers/loanController.js";
import {authMiddleware} from "../Middleware/auth.js";
import adminMiddleware from "../Middleware/adminMiddleWare.js";

const router = express.Router();

router.post("/apply", authMiddleware, applyForLoan);
router.get("/myloans", authMiddleware, getMyLoans); // Corrected endpoint for security
router.get("/:id", authMiddleware, getLoanDetails);
router.patch("/:id/status", authMiddleware, adminMiddleware, updateLoanStatus);
router.get("/:id/repayments", authMiddleware, getRepaymentSchedule);
// Add this new route
router.post("/:id/pay", authMiddleware, payLoanInstallment);

export default router;