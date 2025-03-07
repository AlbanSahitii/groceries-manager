const {User, FamilyUser, Family, sequelize} = require("../models");

const bcrypt = require("bcrypt");
const jwt = require("../utils/auth/JwtService");
const {userSchema} = require("../validation");

class UserService {
  static registerUser = async (req, res, next) => {
    const {username, password, confirmPassword, email, fullName} = req.body;
    const passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[A-Za-zd]{8,}$";
    // proper error check for empty body

    if (password !== confirmPassword) {
      throw new Error("Password dont match");
    }

    // for testing purpose its removed
    // if (!passwordRegex.match(password)) {
    //     throw new Error('Password does not meet the criteria.')
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username: username,
      password: hashedPassword,
      email: email,
      full_name: fullName,
    });

    return "User registered";
  };

  static loginUser = async (req, res, next) => {
    const {username, password} = req.body;

    const user = await User.findOne({where: {username: username}});
    if (!user) throw new Error("User doesnt exist");

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) throw new Error("Invalid credentials");

    const userType = await this.getUserType(user.id);

    const payload = {user};

    const jwtToken = jwt.generateJwt(payload);

    return {userId: user.id, jwt: jwtToken, userType: userType};
  };

  static deleteUser = async (req, res, next) => {
    const {email} = req.body;

    const user = await User.destroy({where: {email: email}});
    if (!user) throw new Error("user not found");

    return `user - ${email} deleted succesfully`;
  };

  static getUser = async (req, res, next) => {
    const {id} = req.query;

    const user = await User.findOne({where: {id: id}});

    if (!user) throw new Error("User doesnt exist");
    if (user) {
      return {
        user_id: user.id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        fullName: user.full_name,
      };
    }
  };

  static updateUser = async (req, res, next) => {
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
      throw new Error("Information missing");
    }
    // const passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$"
    // for testing purpose its removed
    // if (!passwordRegex.match(password)) {
    //     throw new Error('Password does not meet the criteria.')
    // }

    const findUser = User.findOne({where: {id: user_id}});
    if (!findUser) throw new Error("User doesnt exist");

    if (password !== confirmPassword) throw new Error("Passwords dont match");
    const hashedPassword = await bcrypt.hash(password, 10);

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
  };

  static getUserType = async userId => {
    const getUser = await User.findOne({where: {id: userId}});
    if (!getUser) throw new Error("User doesnt exist");

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

  static validateUser = async (req, res, next) => {
    const {username, jwtToken} = req.body;
    if (!username || !jwtToken) throw new Error("Information missing");

    const user = await User.findOne({where: {username: username}});
    if (!user) throw new Error("User doesnt exist");

    const validateJWT = await jwt.verifyJwt(jwtToken);
    if (!validateJWT) throw new Error("Invalid JWT token");
    if (username !== validateJWT.user.username)
      throw new Error("Information is invalid");

    return jwtToken;
  };
}

module.exports = UserService;
