const {User, FamilyUser, Family, sequelize} = require('../models')

const bcrypt = require('bcrypt')
const jwt = require('../utils/auth/JwtService')

class UserService {
    static registerUser = async (req,res) => {
        const {username, password,confirmPassword, email, fullName} = req.body
        const passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$"
        // empty body to do
        
        if(password !== confirmPassword) {
            return"Password dont match"
        }
        
        // for testing purpose its removed
        // if (!passwordRegex.match(password)) {
        //     return 'Password does not meet the criteria.'
        // }
        
        const hashedPassword = await bcrypt.hash(password,10)

        try {
            const user = await User.create({username: username, password: hashedPassword, email: email, full_name: fullName})
        
            return "User registered"
        
        } catch (error) {

            throw new Error(error)
        }
    }

    static loginUser = async (req,res) => {
        const { username, password } = req.body;

        const user = await User.findOne({where: {username: username }})

        if(!user){
            res.status(401).json({ message: 'User doesnt exist' });
            return

        }

        const passwordCheck = await bcrypt.compare(password, user.password)
        
        if(!passwordCheck){
            res.status(401).json({ message: 'Invalid credentials' });
            return
        }

        const userType = await this.getUserType(user.id)


        try {
            const payload = {
                username: username,
                password:password
            }
    
            const jwtToken = jwt.generateJwt(payload)
            res.status(200).json({jwt:jwtToken, user_id: user.id, userType: userType})
            return
    
        } catch (error) {
            return error
        }
    }

    static deleteUser = async (req,res) =>{

        const {email} = req.body

        const user = await User.destroy({where: {email: email}})
        if (!user) {
            return "user not found"
            
        }

        return `user - ${email} deleted succesfully`
    }

    static getUser = async (req,res) => {
// todo        
    }

    static updateUser = async (req,res) => {
        //todo
        return 'update user'
    }



    
    static getUserType = async(userId) => {

        const getUser = await User.findOne({where: {id: userId}})
        if(!getUser) return 'User doesnt exist'


        const owner = await sequelize.query('SELECT * FROM users JOIN families ON users.id = families.owner_id where users.id = ?', {
            replacements: [userId],
            type: sequelize.QueryTypes.SELECT
        })


        if(owner[0]) {
            return 'Owner'
        } else { 
            return 'Member'
        }
        
    }

}

module.exports = UserService