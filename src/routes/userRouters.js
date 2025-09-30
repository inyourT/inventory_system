const express = require("express");

const { getAllUser,
        getIdUser,
        createUser,
        updateUser,
        deleteUser
 } = require("../controllers/userController");
const { route } = require("./supplierRoters");
const router = express.Router()

router.get("/", getAllUser);
router.get("/:id", getIdUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser)



module.exports = router;