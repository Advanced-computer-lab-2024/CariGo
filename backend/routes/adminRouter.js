const express = require("express");
const {
    addAdmin,
    deleteUser,
    addTourismGovernor,
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    createTag,
    getTags,
    updateTag,
    deleteTag,
    getUser
} = require("../controllers/adminController");
const authController = require("../controllers/authController");
const router = express.Router();

router.get("/getTags", getTags); 
router.get("/getCategories", getCategories); 

router.use(authController.protect);
router.post("/addAdmin",addAdmin);
//router.delete("/deleteUser",deleteUser);
router.post("/deleteUser",getUser);
router.post("/addTourismGovernor", addTourismGovernor);

router.post("/createCategory", createCategory);

router.put("/updateCategory/:id", updateCategory); 
router.delete("/deleteCategory/:id", deleteCategory);

router.post("/createTag", createTag);

router.put("/updateTag/:id", updateTag); 
router.delete("/deleteTag/:id", deleteTag);

module.exports = router;
