const Product = require("../Models/Model_Product");
const Order = require("../Models/Model_Order");
const mongoose = require("mongoose");

// Passer une commande
exports.Creat_Order = async (req, res) => {
  try {
    const { clientId, products } = req.body;

    // Vérifier l'existence des produits dans la base de données
    const orderedProducts = await Product.find({
      _id: { $in: products.map((p) => p.productId) },
    });

    // Vérifier si tous les produits existent
    const existingProductIds = orderedProducts.map((product) =>
      product._id.toString()
    );

    // Vérifier et diminuer les quantités des produits
    const updatedProducts = await Promise.all(
      orderedProducts.map(async (product) => {
        const orderedProduct = products.find((p) => p.productId == product._id);
        const orderedQuantity = orderedProduct.quantity;

        if (product.quantity < orderedQuantity) {
          return res.status(409).send({
            message: "Insufficient quantity for product " + product.name,
          });
        }

        await Product.updateOne(
          { _id: product._id },
          { $inc: { quantity: -orderedQuantity } }
        );

        return {
          ...product.toObject(),
          quantity: orderedQuantity,
        };
      })
    );

    // Calculer le prix total basé sur la demande du client
    const totalPrice = products.reduce((total, orderedProduct) => {
      const product = updatedProducts.find(
        (p) => p._id.toString() === orderedProduct.productId
      );
      return total + product.price * orderedProduct.quantity;
    }, 0);

    if (totalPrice < 0) {
      return res.status(400).json({ message: "Invalid total price" });
    }

    // Vérifier s'il existe déjà une commande pour ce client
    const existingOrder = await Order.findOne({ client: clientId });

    if (existingOrder) {
      // S'il existe déjà une commande, ajouter les produits à la commande existante
      existingOrder.products.push(...existingProductIds);
      existingOrder.totalSalePrice += totalPrice;
      await existingOrder.save();
      res.json({ message: "Order placed successfully", order: existingOrder });
    } else {
      // S'il n'existe pas de commande, créer une nouvelle commande
      const newOrder = new Order({
        totalSalePrice: totalPrice,
        client: clientId,
        products: existingProductIds,
      });

      const savedOrder = await newOrder.save();
      res.json({ message: "Order placed successfully", order: savedOrder });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir la liste de toutes les commandes
exports.Get_OrderList = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({ Total_Order_Number: orders.length, orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir les détails d'une commande spécifique
exports.Get_OrderDetails = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
