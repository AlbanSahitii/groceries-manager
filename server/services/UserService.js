const {User} = require('../models')
const bcrypt = require('bcrypt')

class UserService {
    static registerUser = async (req,res) => {
        const {username, password,confirmPassword, email, fullName} = req.body
        const passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$"

        
        if(password !== confirmPassword) {
            return"Password dont match"
        }

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
            return "Username or password is incorrect"
        }

        const passwordCheck = await bcrypt.compare(password, user.password)
        
        if(!passwordCheck){
            return "Email or Password is incorrect"
        }



        // return token to know its logged in - TODO

        return "login succesfully"
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
        const {email} = req.body
        
    }

}

module.exports = UserService