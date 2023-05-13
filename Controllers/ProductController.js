const product = require("../Models/Model_Product");

exports.Handel_New_product = async (req, res) => {
  const { name, description, quantity, price } = req.body;

  if (!name || !price || !quantity) {
    res.status(400).json({ message: "name , price and quantity required" });
  }
  const duplicate_product = await product.findOne({ name: name });

  if (duplicate_product) {
    // status(409) => conflict
    res.status(409).json({ message: " product exist in your product list " });
  }
  try {
    //hash password

    const New_product = new product({
      name: name,
      description: description,
      price: price,
      quantity: quantity,
    });

    await New_product.save();
    res.send({
      message: `product ${New_product.name} registered successfully`,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.Get_product_Id = async (req, res) => {
  try {
    const id = req.params.id;
    const Product = await product.findById({ _id: id });
    res.send(Product);
  } catch (error) {
    console.log(error);
  }
};

exports.Updat_product = async (req, res) => {
  try {
    const id = req.params.id;
    const product_changes_toInsert = req.body;
    const new_product = await product.findByIdAndUpdate(
      { _id: id },
      product_changes_toInsert
    );
    res.send(new_product);
  } catch (error) {
    console.log(error);
  }
};

exports.Delete_product = async (req, res) => {
  try {
    const id = req.params.id;
    const product_to_Delate = await product.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: `product ${product_to_Delate.name}  delatetd successfuly `,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.Get_All_product = async (req, res) => {
  try {
    all_product = await product.find();
    res.send(all_product);
  } catch (error) {
    res.status(400).send(error);
  }
};
