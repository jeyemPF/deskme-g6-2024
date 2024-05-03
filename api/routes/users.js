import express from "express"
import { deleteUser, getUser, getUsers, updateUser, createAdminUser, deleteAllUser, createOfficeManager, uploadAvatar, updateProfile, getSelf } from "../controllers/user.js";
import { verifySuperAdmin, verifyAdmin, verifyToken, } from "../utils/verifyToken.js";
import upload from "../middleware/multer.js";



const router = express.Router()

// router.get("/checkAuthentication", verifyToken, (req, res, next) =>{
//     res.send("Hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("Hello user, you are logged in");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Hello admin, you are logged in you can delete all user account but not super admin");
// });

// router.get("/checksuperadmin/:id", verifySuperAdmin, (req, res, next) => {
//     res.send("Hello super admin, you are logged in you can delete all user account even admin and you can create a admin and assigned role");
// });

// router.get("/checksuperadmin/:id", verifySuperAdmin, (req, res, next) => {
//     res.send("Hello super admin, you are logged in you can delete all user account even admin and you can create a admin and assigned role");
// });

// router.get("/checksuperandadminuser/:id", verifyAdminOrSuperAdmin, (req, res, next) => {
//     res.send("Hello super admin and super, you are logged in ");
// });

// router.get("/checkofficemanager/:id", verifyOfficeManager, (req, res,  ) => {
//     res.send("Hello Office Manager, you are logged in you can manage all bookings operations");
// });


//UPDATE the user information
router.put("/:id", verifyAdmin, updateUser);

// Only super admins can delete users
router.delete("/:id", verifySuperAdmin, deleteUser);

// Both admins and super admins can get a single user
router.get("/:id", verifyAdmin, getUser);

// getself
router.get ('/self', verifyToken, getSelf);

// get all users by superadmin
router.get("/", verifySuperAdmin, getUsers);

// Only super admins can create admin users
router.post("/admin", verifySuperAdmin, createAdminUser);

// Only super admins can create Office Manager users
router.post("/office-manager", verifySuperAdmin, createOfficeManager);

// DELETE ALL USERS EXCEPT SUPER ADMIN
router.delete("/", verifySuperAdmin, deleteAllUser);

// Upload avatars
router.patch("/self/avatar", verifyToken, upload.single("avatar"), uploadAvatar,);

// updating profile
router.put("/profile", updateProfile);



export default router