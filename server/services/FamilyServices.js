const { Family } = require('../models')
const { User } = require('../models')
const {FamilyUser} = require('../models')
const {FamilyInvites} = require('../models')
const { sequelize } = require('../models');

class FamilyServices {

    static createFamily = async (req,res) => {
        // userID is the owner ID !!
        const {family_name, user_id} = req.body

        if(!family_name || !user_id) return 'information missing'

        const findUser = await User.findOne({where:{id:user_id}})
        if(!findUser) return 'User doesnt exits'
        
        const familyOwner = await Family.findOne({where: {owner_id: user_id}})
        if(familyOwner) return 'You are owner of an family.'
        
        const userInFamily = await FamilyUser.findOne({where: {user_id: user_id}})
        if(userInFamily) return 'You already belong in a family'

        try {
            const family = await Family.create({family_name: family_name, owner_id: user_id})
            await FamilyUser.create({family_id: family.id, user_id: user_id })

        } catch (error) {
            return error.message
        }

        return 'family created'
    }

    static getFamily = async(req,res) => {
        const {family_id} = req.query

        const family = await Family.findOne({where: {id:family_id}})
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
        // this api wont be used. invite logic below will
        const {family_id, user_id} = req.body
        
        if(!family_id || !user_id) return 'information missing'

        const userInFamily = await FamilyUser.findOne({where: {user_id:user_id}})

        if (userInFamily) return 'user already belongs in a family'

        const insertUser = await FamilyUser.create({family_id:family_id, user_id:user_id})


        return insertUser
    }

    static getFamilyMembers = async (req,res) => {
        const {family_id} = req.query

        if(!family_id) return 'Information missing'

        const familyMembers = await FamilyUser.findAll({where: {family_id:family_id}})
        
        return familyMembers
    }
    
    static isUserInFamily = async (req,res) => {
        const {user_id} = req.query 

        if(!user_id) return 'Information missing'
        
        const userFamily = await FamilyUser.findOne({where : {user_id: user_id}});

        if(userFamily) {
            return 'User has a family'
        } else {

            return 'User doesn`t have an family'
        }

    
    
    }

    static inviteUserInFamily = async (req,res) => {
        const {user_id, family_id} = req.body

        if(!user_id || !family_id) return 'Information missing'

        const checkInvites = await FamilyInvites.findOne({where: {user_id:user_id}})
        if(checkInvites) return 'User has an pending family invite'

        const checkFamily = await FamilyUser.findOne({where: {user_id: user_id}})
        if(checkFamily) return 'User is already in a family'


        try {
            const result = await FamilyInvites.create({user_id: user_id, family_id: family_id})
            return result
        } catch (error) {
            return error
        }


    }
    
    static acceptFamilyInvite = async (req,res) => {
        const {user_id, family_id} = req.body

        if(!user_id || !family_id) return 'Information missing'

        const invite = await FamilyInvites.findOne({where: {user_id:user_id}})
        if(!invite) return 'Invite doesnt exist'

        try {
            await sequelize.transaction(async (transaction) => {
                await Promise.all([
                  FamilyInvites.destroy({ where: { user_id: user_id }, transaction }),
                  FamilyUser.create({ user_id: user_id, family_id: family_id }, { transaction })
                ]);
              });

            return 'Invite Accepted'

        } catch (error) {
            return error
        }
        


    }


}

module.exports = FamilyServices