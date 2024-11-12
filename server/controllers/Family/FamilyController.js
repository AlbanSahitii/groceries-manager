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
}
module.exports = FamilyController