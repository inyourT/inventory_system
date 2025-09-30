const prisma = require("../prismaClient");

// Get all suplaier
exports.getSuppliers = async (req,res) => {
    try {
        const supplaier = await prisma.supplier.findMany();
        res.json(supplaier);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Somthin went wrong"})
    }
}

// Get one supplier
exports.getOneSuppliers = async (req,res) => {
    try{
        const supplaier = await prisma.supplier.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });

        // validation
        if (!supplaier){
            return res.status(400).json({message:"Supplier not found"})
        }
        res.json(supplaier)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Somthing went wrong"})
    }
};

// Create new supplier
exports.createSupplier = async (req,res) => {
    try {
        const { name, contact, email, address} = req.body;

        if (!name) {
            return res.status(400).json({message:"Name is required"})
        }

        const supplier = await prisma.supplier.create({
            data: {
                name, contact, email, address
            },
        });

        const {id, ...rest} = supplier;
        res.status(201).json(supplier);

    }catch (error){
        if (error.code == "P2002"){
            return res.status(400).json({ message: "Email already exists" });
        }
        res.status(500).json({message: "Somthing went wrong"})
    }
};

// Update supplier
exports.updateSupplier = async (req,res) => {
    try{
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({message: "ID Invalid"})
        }

        // validasi supplaier
        const existingSupplier = await prisma.supplier.findUnique({
            where: { id }
        });

        if (!existingSupplier){
            return res.status(400).json({message: "Supplier not Found"})
        }

        // updated supplier
        const supplaier = await prisma.supplier.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: req.body
        });

        res.json(supplaier);

    }catch(error){
        if (error.code == "P2002"){
            return res.status(400).json({ message: "Email already exists" });
        }

        res.status(500).json({message: "Somthing went wrong"})
    }
};

// Deleted supplier
exports.deleteSupplier = async (req,res) => {
    try {
        const id = parseInt(req.params.id);

        if(isNaN(id)){
            return res.status(400).json({message: "ID Invalid"})
        }

        const supplier = await prisma.supplier.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.json({message: "Supplier deleted"});

    }catch(error){
        console.error(error);

        if(error.code == "P2025") {
            return res.status(404).json({message: "Supplier Not Found"})
        }
        res.status(500).json({message:"Something went wrong"})
    }
};