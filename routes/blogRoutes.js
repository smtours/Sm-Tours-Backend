import express from "express";
const router =express.Router();
import { verifyToken,verifyAdmin } from "../middleware/authMiddleware.js";
import { addblog,deleteblog,getAllblogs,getsingleblog } from "../controllers/blogController.js";
router.post("/addblog",verifyToken,verifyAdmin,addblog)
router.delete("/deleteblog/:id",verifyToken,verifyAdmin,deleteblog)
router.get("/getallblogs",getAllblogs)
router.get("/getsingleblog/:id",getsingleblog)


 export default router