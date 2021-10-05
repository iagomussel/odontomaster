const User = require("../models/User");
const { Op } = require("sequelize");
const passwordHash = require("password-hash");
var jwt = require("jsonwebtoken");
require('dotenv').config();
function maketoken(username){
  return { token: jwt.sign({username:username}, process.env.JWT_KEY, { expiresIn: '1800s' }) }
}

module.exports = {
  async login(req, res) {
    const { username, password } = req.body;

    let user = await User.findOne({
      where: {
        username: {
          [Op.eq]: username,
        },
      },
    });

    if (user && passwordHash.verify(password, user.password)) {
      return res.send(maketoken(username));
    }

    return res
      .status(403)
      .send({ status: "error", message: "invalid credencials" });
  },
  async register(req, res) {
    const { username, password } = req.body;
    let encript_password = passwordHash.generate(password);

    let user = await User.create({
      username: username,
      password: encript_password,
    });

    return res.json(user);
  },
  async refreshtoken(req, res) {
    return res.json(maketoken(req.user.username))
  },


};
