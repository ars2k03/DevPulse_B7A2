import express from "express";
import { signup } from "../controller/auth.signup";
import { login } from "../controller/auth.login";
import { auth } from "../middleware/auth.middle";
import { createIssue } from "../modules/issue.createIssue";
import { getAllIssues } from "../modules/issue.getAllIssues";
import { getSingleIssue } from "../modules/issue.getSingleIssue";
import { updateIssue } from "../modules/issue.updateIssue";
import { deleteIssue } from "../modules/issue.deleteIssue";

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