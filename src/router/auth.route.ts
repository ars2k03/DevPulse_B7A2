import express from "express";
import { signup } from "../controller/auth.signup";
import { login } from "../controller/auth.login";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;