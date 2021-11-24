const User = require("../models/user");
const { Op } = require("sequelize");
const passwordHash = require("password-hash");
const Constants = require("../utils/Constants");
var jwt = require("jsonwebtoken");
require('dotenv').config();
function makeToken(username){
  return { token: jwt.sign({username}, Constants.JWT_KEY, { expiresIn: '1800s' }) }
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
    if (!user) {
      //check if exists some user in the database
      // count user on database
        let count = await User.count();
        if(count == 0){
            //create user
            user = await User.create({
                username: username,
                password: passwordHash.generate(password),
            });
        } else {
            //return error
            return res.status(401).json({
                message: "User not found",
            });

        }
    }


    if (user && passwordHash.verify(password, user.password)) {
        //return token

      return res.send(makeToken(username));
    }

    return res
      .status(403)
      .json({ status: "error",
      message: "Username or password is incorrect" });
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
