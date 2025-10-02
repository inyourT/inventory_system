const prisma = require("../prismaClient")

// Get All Product
exports.getAllProduct = async (req, res) => {
    try {
        const product = await prisma.product.findMany();
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
exports.createProduct = async (req,res) => {
    try {

        const { name, sku, stock, price, supplierId, categoryId } = req.body;

        if(!name) {
            return res.status(400).json({message: "Product name is required"})
        }

        if(!sku) {
            return res.status(400).json({message: "SKU is required"})
        }

        if(!price) {
            return res.status(400).json({message: "Price is required"})
        }


        const product = await prisma.product.create({
            data: {
                name,
                sku,
                stock: stock || 0,
                price: parseFloat(price),
                supplierId: supplierId ? parseInt(supplierId): null,
                categoryId: categoryId ? parseInt(categoryId): null
            }
        });
        res.status(product)
    }catch (error){
        console.error(error)

        if(error.code == "P2002") {
            return res.status(400).json({Message: "SKU must be unique"});
        }
        res.status(500).json({message: "Somthing went wrong"})
    }
}