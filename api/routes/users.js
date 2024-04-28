import express from "express"
import { deleteUser, getUser, getUsers, updateUser, createAdminUser } from "../controllers/user.js";
import { verifySuperAdmin, verifyAdminOrSuperAdmin, verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";


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


//UPDATE 
router.put("/:id", updateUser);

// DELETE
// Only super admins can delete users
router.delete("/:id", verifySuperAdmin, deleteUser);

// GET
// Both admins and super admins can get a single user
router.get("/:id", verifyAdmin, getUser);

// GET ALL
// Both admins and super admins can get all users
router.get("/", verifySuperAdmin, getUsers);

// CREATE ADMIN
// Only super admins can create admin users
router.post("/", verifySuperAdmin, createAdminUser);


export default router