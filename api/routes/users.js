import express from "express"
import { deleteUser, getUser, getUsers, updateUser, createAdminUser } from "../controllers/user.js";
import { verifyAdmin, verifySuperAdmin } from "../utils/verifyToken.js";


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
router.put("/:id", verifyAdmin, updateUser);

// DELETE
router.delete("/:id", verifyAdmin, verifySuperAdmin,  deleteUser);

// GET
router.get("/:id", verifyAdmin, verifySuperAdmin, getUser );

// GET ALL
router.get("/", verifyAdmin,verifySuperAdmin, getUsers);

// CREATE ADMIN
router.post("/", verifySuperAdmin, createAdminUser );

export default router