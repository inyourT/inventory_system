const express = require("express")
const { getAllTransaksi,
        createTransaction

 } = require ("../controllers/transactionController")

 const router = express.Router();

router.get("/", getAllTransaksi);
router.get("/", createTransaction);

module.exports = router;