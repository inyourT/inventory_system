const express = require("express");
const { getAllProduct,
    getOneProduct,

} = require ("../controllers/productController");
const router = express.Router();

router.get("/", getAllProduct);
router.get("/:id", getOneProduct);


module.exports = router;