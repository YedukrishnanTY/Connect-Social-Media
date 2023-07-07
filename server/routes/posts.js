import express from "express";
import { getFeedPosts, getUserPosts, likePost,deletePost,reportPost, createComment } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
/* CREATE */
router.post("/:id/comments", verifyToken, createComment);



/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/report", verifyToken, reportPost);


/* DELETE */
router.delete("/:id", verifyToken, deletePost);



export default router;
