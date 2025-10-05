const prisma = require("../prismaClient")


// Get all transaksi
exports.getAllTransaksi = async (req,res) => {
    try {
        const transaksi = await prisma.transactions.findMany({
            include: {
                product: true,
                user: true
            }
        })
        res.json(transaksi);
    }catch(error){
        console.error(error);
        return res.status(500).json({message: "Something went wrong"})
    }
};

// Post transaction
exports.createTransaction = async (req, res) => {
  try {
    const { type, quantity, productId, userId, note } = req.body;

    // Buat transaksi baru
    const transaksi = await prisma.transactions.create({
      data: {
        type,
        quantity,
        note,
        product: { connect: { id: productId } },
        user: userId ? { connect: { id: userId } } : undefined,
      },
    });

    // Update stok produk
    await prisma.product.update({
      where: { id: productId },
      data: {
        stock:
          type === "IN"
            ? { increment: quantity }   
            : { decrement: quantity }, 
      },
    });

    res.status(201).json(transaksi);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
