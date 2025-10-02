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
