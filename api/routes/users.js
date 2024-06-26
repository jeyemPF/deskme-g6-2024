import express from "express"
import { deleteUser,
        createAdminUser,
        deleteAllUser,
        createOfficeManager,
        uploadAvatar,
        updateProfile,
        toggleReservationEmailNotifications,
        toggleReservationEmailNotificationsForAllUsers,
        updateAllUsersEmailPreference,
        getSelf,
        countUsersRole,
        countNotUsers,
        countAllUsers,
        createAdminAndOfficeManager,
        
         }  from "../controllers/user.js";


import { verifySuperAdmin, verifyAdmin, verifyOfficeManager, verifyUser, protect, } from "../utils/verifyToken.js";
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


// //UPDATE the user information
// router.put("/:id", verifyAdmin, updateUser);

// Only super admins can delete users
router.delete("/:id", verifySuperAdmin, deleteUser);

// // Both admins and super admins can get a single user
// router.get("/:id", verifySuperAdmin);

// getself
router.get ('/self', protect, getSelf);

// get all users by superadmin
// router.get("/", verifyOfficeManager, getUsers);

router.delete('/delete-user/:userId', deleteUser);

// Only super admins can create admin users
router.post("/admin", verifySuperAdmin, createAdminUser);

// Only super admins can create Office Manager users
router.post("/office-manager", verifySuperAdmin, createOfficeManager);

// Create both admin and Office Manager
router.post("/authorized-user", createAdminAndOfficeManager);

// Bulk delete for all users 
router.delete("/", verifySuperAdmin, deleteAllUser);

// Upload avatars
router.patch("/self/avatar", protect, upload.single("avatar"), uploadAvatar);

// updating profile
router.put('/update-profile/:userId',protect, upload.single('avatar'), updateProfile);

// Update the receiving email of users
router.put("/email-preference", updateAllUsersEmailPreference);

// Update the user receiving email for reservation by id 
router.put("/toggle-reservation-emails/:userId", toggleReservationEmailNotifications);

// Update the all users email preferences
router.put("/toggle-reservation-emails-for-all-users",verifyOfficeManager, toggleReservationEmailNotificationsForAllUsers);


// COUNT 

// count all users
router.get("/count-user-role", countUsersRole);
router.get("/count-not-user", countNotUsers);
router.get("/all-users", countAllUsers);


export default router