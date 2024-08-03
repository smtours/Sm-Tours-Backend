import express from "express";
const router =express.Router();
import { verifyToken,verifyAdmin } from "../middleware/authMiddleware.js";
import { addblog,deleteblog,getAllblogs,getsingleblog ,updateblog} from "../controllers/blogController.js";
router.post("/addblog",verifyToken,verifyAdmin,addblog)
router.delete("/deleteblog/:id",verifyToken,verifyAdmin,deleteblog)
router.get("/getallblogs",getAllblogs)
router.get("/getsingleblog/:id",getsingleblog)
router.put("/updateblog/:id",verifyToken,verifyAdmin,updateblog)


 export default router