import express from "express"
const router=express.Router()

import { sendmail } from "../controllers/mailController.js"
router.post("/sendmail",sendmail)
export default router