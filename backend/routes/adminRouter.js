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
    deleteTag
} = require("../controllers/adminController");

const router = express.Router();

router.post("/addAdmin", addAdmin);
router.delete("/deleteUser", deleteUser);
router.post("/addTourismGovernor", addTourismGovernor);

router.post("/createCategory", createCategory);
router.get("/getCategories", getCategories); 
router.put("/updateCategory/:id", updateCategory); 
router.delete("/deleteCategory/:id", deleteCategory);

router.post("/createTag", createTag);
router.get("/getTags", getTags); 
router.put("/updateTag/:id", updateTag); 
router.delete("/deleteTag/:id", deleteTag);

module.exports = router;
