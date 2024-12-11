const FamilyServices = require('../../services/FamilyServices')

class FamilyController {
    static create = async (req,res) => {
        const result = await FamilyServices.createFamily(req,res)
        res.json(result)
    }
    static get = async (req,res) => {
        const result = await FamilyServices.getFamily(req,res)
        res.json(result)
    }
    static update = async (req,res) => {
        const result = await FamilyServices.updateFamily(req,res)
        res.json(result)
    }

    static delete = async (req,res) => {
        const result = await FamilyServices.deleteFamily(req,res)
        res.json(result)
    }
    static addUser = async (req,res) => {
        const result = await FamilyServices.addUserInFamily(req,res)
        res.json(result)
    }

    static getMembers = async (req,res) => {
        const result = await FamilyServices.getFamilyMembers(req,res)
        res.json(result)
    }

    static checkUser = async (req,res) => {
        const result = await FamilyServices.isUserInFamily(req,res)
        res.json(result)
    }

    static addFamilyMember = async (req,res) => {
        const result = await FamilyServices.inviteUserInFamily(req,res)
        res.json(result)
    }

    static acceptInvite = async (req,res) => {
        const result = await FamilyServices.acceptFamilyInvite(req,res) 
        res.json(result)
    }


}
module.exports = FamilyController