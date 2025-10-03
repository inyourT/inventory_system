const express = require("express");
const { getAllProduct,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct

} = require ("../controllers/productController");
const router = express.Router();

router.get("/", getAllProduct);
router.get("/:id", getOneProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct)


module.exports = router;