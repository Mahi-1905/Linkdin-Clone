import { Router } from "express";
import multer from "multer";
import { 
    register, 
    login, 
    updateUserProfile, 
    getUserAndProfile, 
    updateUserProfileData, 
    getAllUserProfiles, 
    uploadProfilePicture, 
    downloadProfile, 
    sendConnectionRequest, 
    acceptConnectionRequest 
} from "../controllers/user.controller.js";

const router = Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Define routes
router.post("/register", register);
router.post("/login", login);
router.post("/user_update", updateUserProfile);
router.get("/get_user_and_profile", getUserAndProfile);
router.post("/update_profile_data", updateUserProfileData);
router.get("/user/get_all_user_profiles", getAllUserProfiles);
router.get("/user/download_resume", downloadProfile);
router.post("/update_profile_picture", upload.single("profile_picture"), uploadProfilePicture);
router.post("/user/send_connection_request", sendConnectionRequest);
router.post("/user/accept_connection_request", acceptConnectionRequest);

export default router;
