const prisma = require("../prismaClient")

// Get All Product
exports.getAllProduct = async (req, res) => {
    try {
        const product = await prisma.product.findMany({
            include: {
                supplier: true,
                category: true,
                transactions: true
            }
        });
        res.json(product)
    }catch (error){
        console.error(error);
        res.status(500).json({message: "Something went wrong !"})
    }
};

// get one product
exports.getOneProduct = async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                supplier: true,
                category: true,
                transactions: true
            }
        });

        if(!product){
           return res.status(400).json({message:"Product Not Found"})
        }
        res.json(product)
    }catch(error){
        console.error(error)
        return res.status(500).json({message: "Something went wrong"})
    }
};

// create product
exports.createProduct = async (req, res) => {
    try {
        const { name, sku, stock, price, supplierId, categoryId } = req.body;

        if (!name) return res.status(400).json({ message: "Product name is required" });
        if (!sku) return res.status(400).json({ message: "SKU is required" });
        if (!price) return res.status(400).json({ message: "Price is required" });

        const product = await prisma.product.create({
            data: {
                name,
                sku,
                stock: stock || 0,
                price: parseFloat(price),
                supplierId: supplierId ? parseInt(supplierId) : null,
                categoryId: categoryId ? parseInt(categoryId) : null
            }
        });

        res.status(201).json(product);
    } catch (error) {
        console.error(error);

        if (error.code === "P2002") {
            return res.status(400).json({ message: "SKU must be unique" });
        }

        res.status(500).json({ message: "Something went wrong" });
    }
};


// Update supplier
exports.updateProduct = async (req,res) => {
    try{
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({message: "ID Invalid"})
        }

        // validasi
        const existingProduct = await prisma.product.findUnique({
            where: { id }
        });

        if (!existingProduct){
            return res.status(400).json({message: "Product not Found"})
        }

        // updated 
        const product = await prisma.product.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                ...(name !== undefined && {name}),
                ...(sku !== undefined && {sku}),
                ...(stock !== undefined &&{stok}),
                ...(price !== undefined && {prie: parseFloat(price)}),
                ...(supplierId !== undefined && { supplierId: parseInt(supplierId)}),
                ...(categoryId !== undefined && { categoryId: parseInt(categoryId)})
            }
        });

        res.json(product);

    }catch(error){
        if(error.code == "P2002") {
            return res.status(400).json({Message: "SKU must be unique"});
        }

        res.status(500).json({message: "Somthing went wrong"})
    }
};

// Deleted product
exports.deleteProduct = async (req,res) => {
    try {
        const id = parseInt(req.params.id);

        if(isNaN(id)){
            return res.status(400).json({message: "ID Invalid"})
        }

        const product = await prisma.product.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.json({message: "Product deleted"});

    }catch(error){
        console.error(error);

        if(error.code == "P2025") {
            return res.status(404).json({message: "Product Not Found"})
        }
        res.status(500).json({message:"Something went wrong"})
    }
};