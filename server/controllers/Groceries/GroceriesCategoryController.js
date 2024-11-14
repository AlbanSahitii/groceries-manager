const GroceriesCategoryServices = require('../../services/GroceriesCategoryServices')


class GroceriesCategoryController {

    static get = async (req,res) => {
        const result = await GroceriesCategoryServices.getGrocerieCategory(req,res)
        return res.json(result)
    }

    static create = async (req,res) => {
        const result = await GroceriesCategoryServices.createGrocerieCategory(req,res)
        return res.json(result)
    }

    static update = async (req,res) => {
        const result = await GroceriesCategoryServices.updateGrocerieCategory(req,res)
        return res.json(result)
    }

    static delete = async(req,res) => {
        const result = await GroceriesCategoryServices.deleteGrocerieCategory(req,res)
        res.json(result)
    }


}


module.exports = GroceriesCategoryController