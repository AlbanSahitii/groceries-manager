const PurchasedGroceriesServices = require('../../services/PurchasedGroceriesServices') 

class PurchasedGroceriesController {

    static get = async (req,res) => {
        const result = await PurchasedGroceriesServices.getPurchasedGroceries(req,res)
        res.json(result)
    }
    static create = async (req,res) => {
        const result = await PurchasedGroceriesServices.createPurchasedGroceries(req,res)
        res.json(result)
    }
    static update = async (req,res) => {
        const result = await PurchasedGroceriesServices.updatePurchasedGroceries(req,res)
        res.json(result)
    }
    static delete = async (req,res) => {
        const result = await PurchasedGroceriesServices.deletePurchasedGroceries(req,res)
        res.json(result)
    }

    
}

module.exports = PurchasedGroceriesController