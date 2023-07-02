const bcrypt = require("bcryptjs")

const saltRounds = 10;

const cryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    throw new Error(err);
  }
};

const verifyBothPasswords = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { cryptPassword, verifyBothPasswords }