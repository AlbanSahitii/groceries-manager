const GroceriesServices = require('../../services/GroceriesServices')

class GroceriesController {

    static get = async (req,res) => {
        const result = await GroceriesServices.getGrocerie(req,res)
        return res.json(result)
    }

    static create = async (req,res) => {
        const result = await GroceriesServices.createGrocerie(req,res)
        return res.json(result)
    }

    static update = async (req,res) => {
        const result = await GroceriesServices.updateGrocerie(req,res)
        return res.json(result)
    }

    static delete = async(req,res) => {
        const result = await GroceriesServices.deleteGrocerie(req,res)
        res.json(result)
    }

    static addGrocerieInList = async (req,res) => {
        const result = await GroceriesServices.addGrocerieInList(req,res)
        res.json(result)
    }


    static getFamilyGroceryList = async (req,res) => {
        const result = await GroceriesServices.getFamilyList(req,res)
        res.json(result)
    }

    static purchaseGrocery = async (req,res) => {
        const result = await GroceriesServices.purchaseGrocery(req,res)
        res.json(result)
    }

    static getLastTenGroceries = async (req,res) => {
        const result = await GroceriesServices.getLastTenGroceries(req,res)
        res.json(result)
    }
}


module.exports = GroceriesController
