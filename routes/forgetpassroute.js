import express from "express";
import { resetpass,resetpassscreen } from "../controllers/forgetController.js";
import { verifyUser } from "../controllers/authController.js";
const router=express.Router();

router.post('/resetpass',resetpass)
router.post('/resetpass/:id/:token',resetpassscreen)
router.get('/verify/:tokenlink', verifyUser);



export default router;
