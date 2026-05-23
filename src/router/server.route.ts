import express from "express";
import { signup } from "../controller/auth.signup";
import { login } from "../controller/auth.login";
import { auth } from "../middleware/auth.middle";
import { createIssue } from "../issues/issue.createIssue";
import { getAllIssues } from "../issues/issue.getAllIssues";
import { getSingleIssue } from "../issues/issue.getSingleIssue";
import { updateIssue } from "../issues/issue.updateIssue";
import { deleteIssue } from "../issues/issue.deleteIssue";

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