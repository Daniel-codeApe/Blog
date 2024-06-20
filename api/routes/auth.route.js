import { Router } from "express";
import { register } from "../controller/auth.controller.js";

const router = new Router();

router.get('/register', register);

export default router;