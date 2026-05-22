import express from "express";
import { signup } from "../controller/auth.signup";
import { login } from "../controller/auth.login";
import { auth } from "../middleware/auth.middle";
import { createIssue, getAllIssues } from "../controller/issue.controller";

const router = express.Router();

router.post('/auth/signup', signup);
router.post('/auth/login', login);
router.post('/issues', auth, createIssue);
router.get('/issues', getAllIssues);

export default router;