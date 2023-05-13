const client = require("../Models/Model_Client");
const bcrypt = require("bcrypt");
exports.Handel_New_client = async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "email and passwor required" });
  }
  const duplicate_client = await client.findOne({ email: email });

  if (duplicate_client) {
    // status(409) => conflict
    res.status(409).json({ message: " email exist in your client list " });
  }
  try {
    //hash password
    const hash_Password = bcrypt.hashSync(password, 10);
    const client_With_Hashed_Password = new client({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hash_Password,
      role: role,
    });

    await client_With_Hashed_Password.save();
    res.send({
      message: `client ${client_With_Hashed_Password.firstName} registered successfully`,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.Get_Client_Id = async (req, res) => {
  try {
    const id = req.params.id;
    const Client = await client.findById({ _id: id });
    res.send(Client);
  } catch (error) {
    console.log(error);
  }
};

exports.Updat_client = async (req, res) => {
  try {
    const id = req.params.id;
    const client_changes_toInsert = req.body;
    const new_client = await client.findByIdAndUpdate(
      { _id: id },
      client_changes_toInsert
    );
    res.status(200).send(new_client);
  } catch (error) {
    console.log(error);
  }
};

exports.Delete_client = async (req, res) => {
  try {
    const id = req.params.id;
    const client_to_Delate = await client.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: `client ${client_to_Delate.firstName} with email : ${client_to_Delate.email} delatetd successfuly `,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.Get_All_client = async (req, res) => {
  try {
    all_client = await client.find();
    res.send(all_client);
  } catch (error) {
    res.status(400).send(error);
  }
};
