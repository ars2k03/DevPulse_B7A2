import express from "express";
import { signup } from "../controller/auth.signup";
import { login } from "../controller/auth.login";
import { auth } from "../middleware/auth.middle";
import { createIssue, deleteIssue, getAllIssues, getSingleIssue, updateIssue } from "../controller/issue.controller";

const router = express.Router();

router.post('/auth/signup', signup);
router.post('/auth/login', login);
router.route('/issues')
.post( auth, createIssue)
.get(getAllIssues);

router.route('/issues/:id')
.get(getSingleIssue)
.patch( auth, updateIssue)
.delete(auth, deleteIssue);

export default router;