const prisma = require("../prismaClient");
const bcrypt = require("bcrypt")

// Get all user
exports.getAllUser = async (req,res) => {
    try {
        const user = await prisma.user.findMany();
        res.json(user)
    }catch(error){
        console.error(error);
        return res.status(500).json({message: "Something went Wrong"})
    }
};

// Get user Id
exports.getIdUser = async (req,res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });

        if(!user){
            return res.status(400).json({message: "User not found"})
        }
        res.json(user);
    }catch (error) {
        console.error(error)
        return res.status(500).json({message: "Somthing Went Wrong"})
    }
};

// create User
exports.createUser = async (req, res) => {
    try {

        const {username, password, role} = req.body;

        if(!username) {
            return res.status(400).json({message: "Username is required"})
        }

        if(!password) {
            return res.status(400).json({message: "password required"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {username, password: hashedPassword, role}

        });
         res.status(201).json(user);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Somthing went wrong"})
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if(isNaN(id)) {
            return res.status(400).json({message: "ID Invalid"})
        }

        const existingUser = await prisma.user.findUnique({
            where: { id }
        });

        if(!existingUser) {
            return res.status(400).json({message: "User not found"})
        }

        const user = await prisma.user.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: req.body
        });
        res.json(user)
    }catch(error){
        console.error(error)
        res.status(500).json({message: "Something went wrong"})
    }
};

// delete
exports.deleteUser = async (req,res) => {
    try {
        const id = parseInt(req.params.id);

         if(isNaN(id)) {
            return res.status(400).json({message: "ID Invalid"})
        }

        const user = await prisma.user.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.json({message: "Usere deleted"})
    }catch(error){
        console.error(error);

        if(error.code == "P2025") {
            return res.status(404).json({message: "Supplier Not Found"})
        }
        res.status(500).json({message:"Something went wrong"})
    }
}