const {User, FamilyUser, Family, sequelize} = require("../models");

const bcrypt = require("bcrypt");
const jwt = require("../utils/auth/JwtService");

class UserService {
  static registerUser = async (req, res) => {
    const {username, password, confirmPassword, email, fullName} = req.body;
    const passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[A-Za-zd]{8,}$";
    // empty body to do

    if (password !== confirmPassword) {
      return "Password dont match";
    }

    // for testing purpose its removed
    // if (!passwordRegex.match(password)) {
    //     return 'Password does not meet the criteria.'
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({
        username: username,
        password: hashedPassword,
        email: email,
        full_name: fullName,
      });

      return "User registered";
    } catch (error) {
      throw new Error(error);
    }
  };

  static loginUser = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) return "information missing";

    const user = await User.findOne({where: {username: username}});

    if (!user) {
      res.status(401).json({message: "User doesnt exist"});
      return;
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      res.status(401).json({message: "Invalid credentials"});
      return;
    }

    const userType = await this.getUserType(user.id);

    try {
      const payload = {user};

      const jwtToken = jwt.generateJwt(payload);
      res
        .status(200)
        .json({userId: user.id, jwt: jwtToken, userType: userType});
      return;
    } catch (error) {
      return error;
    }
  };

  static deleteUser = async (req, res) => {
    const {email} = req.body;

    const user = await User.destroy({where: {email: email}});
    if (!user) {
      return "user not found";
    }

    return `user - ${email} deleted succesfully`;
  };

  static getUser = async (req, res) => {
    const {id} = req.query;
    if (!id) return "information missing";
    try {
      const user = await User.findOne({where: {id: id}});
      if (user)
        return {
          user_id: user.id,
          username: user.username,
          email: user.email,
          isVerified: user.isVerified,
          fullName: user.full_name,
        };
    } catch (error) {
      return error.message;
    }
  };

  static updateUser = async (req, res) => {
    const {user_id, fullName, email, username, password, confirmPassword} =
      req.body;

    if (
      !user_id ||
      !fullName ||
      !email ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      return "Information missing";
    }
    // const passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$"
    // for testing purpose its removed
    // if (!passwordRegex.match(password)) {
    //     return 'Password does not meet the criteria.'
    // }

    try {
      const findUser = User.findOne({where: {id: user_id}});
      if (!findUser) "User doesnt exist";
    } catch (error) {
      return error;
    }

    if (password !== confirmPassword) return "Passwords dont match";
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const updateUser = await User.update(
        {
          full_name: fullName,
          email: email,
          password: hashedPassword,
          username: username,
        },
        {where: {id: user_id}}
      );
      return "Updated succesfully";
    } catch (error) {
      return error;
    }
  };

  static getUserType = async userId => {
    const getUser = await User.findOne({where: {id: userId}});
    if (!getUser) return "User doesnt exist";

    const owner = await sequelize.query(
      "SELECT * FROM users JOIN families ON users.id = families.owner_id where users.id = ?",
      {
        replacements: [userId],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (owner[0]) {
      return "Owner";
    } else {
      return "Member";
    }
  };

  static validateUser = async (req, res) => {
    const {username, jwtToken} = req.body;
    if (!username || !jwtToken) return "Information missing";

    const user = await User.findOne({where: {username: username}});
    if (!user) return "User doesnt exist";

    const validateJWT = await jwt.verifyJwt(jwtToken);
    if (!validateJWT) return "Invalid JWT token";
    if (username !== validateJWT.user.username) return "Information is invalid";

    return jwtToken;
  };
}

module.exports = UserService;
