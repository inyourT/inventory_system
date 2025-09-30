const express = require("express");
const { 
    getSuppliers, 
    createSupplier, 
    updateSupplier, 
    deleteSupplier,
    getOneSuppliers 
} = require("../controllers/supplierController");
const router = express.Router();


router.get("/", getSuppliers);
router.get("/:id", getOneSuppliers)
router.post("/", createSupplier);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

module.exports = router;