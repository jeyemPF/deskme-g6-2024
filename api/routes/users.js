import express from "express"
import { deleteUser, getUser, getUsers, updateUser, createAdminUser } from "../controllers/user.js";
import { verifySuperAdmin, verifyAdminOrSuperAdmin } from "../utils/verifyToken.js";


const router = express.Router()

// router.get("/checkAuthentication", verifyToken, (req, res, next) =>{
//     res.send("Hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("Hello user, you are logged in");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Hello admin, you are logged in and you can delete all accounts");
// });

// UPDATE
router.put("/:id", verifyAdminOrSuperAdmin, updateUser);

// DELETE
// Only super admins can delete users
router.delete("/:id", verifySuperAdmin, deleteUser);

// GET
// Both admins and super admins can get a single user
router.get("/:id", getUser);

// GET ALL
// Both admins and super admins can get all users
router.get("/", verifyAdminOrSuperAdmin, getUsers);

// CREATE ADMIN
// Only super admins can create admin users
router.post("/", verifySuperAdmin, createAdminUser);


export default router