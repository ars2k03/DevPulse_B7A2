import express from "express";
import { auth } from "../middleware/auth.middle";
import { createIssue } from "../controller/issue.controller";

const router = express.Router();

router.post('/', auth, createIssue)

export default router;