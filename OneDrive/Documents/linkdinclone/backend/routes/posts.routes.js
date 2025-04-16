import { Router } from "express";
import multer from "multer";
import { activeCheck } from "../controllers/posts.controller.js";

const router = Router();

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

router.route('/').get(activeCheck);

router.route("/post").post(upload.single('media'),createpost)
router.route("/posts").get(getAllpost)
router.route("/delete_post").post(deleetepost)
router.route("/comment").post(commentpost);
router.route("/get_comments").get(get_comments_by_post);
router.route("/delete_comment").delete(delete_comment_of_user);
router.route("/increment_post_likes").post(increment_likes);


export default router;
