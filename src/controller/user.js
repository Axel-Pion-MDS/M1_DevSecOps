const { cryptPassword, verifyBothPasswords} = require("../utils/passwordHasher");

const db = require("../models");
const User = db.user;

const verifyIfUserExists = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (user !== null) return user;
  } catch (err) {
    throw new Error(err);
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send({ message: "Email and password can not be empty." });

  const userPassword = await cryptPassword(password);

  const user = {
    email,
    password: userPassword,
  }

  User
    .findOrCreate({ where: { email: email }, defaults: user})
    .then((data) => {
      // If user email already exists
      if (!data[1]) {
        return res.status(400).send({ message: "Something went wrong." });
      }
      res.status(200).send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something went wrong while trying to create the user."
      });
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send({ message: "Email and password can not be empty." });

  try {
    const doesUserExists = await verifyIfUserExists(email);

    if (!doesUserExists) return res.status(400).send({ message: "Connection refused." });

    const user = await User.findOne({ where: { email } });
    const isPasswordValid = await verifyBothPasswords(password, user.password);

    if (!isPasswordValid) return res.status(400).send({ message: "Connection refused!" });

    res.status(200).end();
  } catch (err) {
    console.error("Error while trying to log in. ", err);
    res.status(500).send({ message: "Internal Server Error." });
  }
};

module.exports = { register, login };
