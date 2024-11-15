const { Family } = require('../models')
const {User} = require('../models')
class FamilyServices {

    static createFamily = async (req,res) => {
        // userID is the owner ID !!
        const {family_name, user_id} = req.body

        if(!family_name || !user_id) return 'information missing'

        const familyOwner = await Family.findOne({where: {owner_id: user_id}})
        const findUser = await User.findOne({where:{id:user_id}})

        if(familyOwner) return 'You are owner of an family.'

        if(!findUser) return 'User doesnt exits'

        try {
            await Family.create({family_name: family_name, owner_id: user_id})

        } catch (error) {
            return error.message
        }

        return 'family created'
    }

    static getFamily = async(req,res) => {
        const {family_name, user_id} = req.body

        const family = await Family.findOne({where: {owner_id: user_id, family_name: family_name}})
        return family
    }

    static updateFamily = async(req,res) => {
        const {family_id,family_name} = req.body

        const family = await Family.findOne({where: {id:family_id}})

        if (!family) {
            return "family not found"
                
        }

        if(family.id === family_id && family.family_name === family_name){
            return 'Cannot update same information'
        }

        try {
            const result = await Family.update(
                {family_name:family_name},
                {where: {id:family_id}})
                

            return 'Information updated'

        } catch (error) {
            return error
        }
    
        
    }
    
    static deleteFamily = async(req,res) => {
        const {family_id} = req.body

        try {
            const family = await Family.destroy({where: {id: family_id}})

            if (!family) {
                return "family not found"
            }
    
            return `family - ${family_id} deleted succesfully`
    
        } catch (error) {
            return error
        }
    }
    
    static addUserInFamily = async(req,res) => {
                //todo

        return 'adduserinfam'
    }


}

module.exports = FamilyServices