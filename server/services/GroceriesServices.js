const {Groceries} = require('../models')
const { Op } = require('sequelize');

class GroceriesServices {

    static getGrocerie = async (req,res) => {
        const {name} = req.query
        
        if(!name) return 'Information missing'

        const results = await Groceries.findAll({
            where: {
              name: {
                [Op.like]: `%${name}%`
              }
            }
          });
          
        return results
    }

    static createGrocerie = async (req,res) => {
        const {name, categoryId, unit} = req.body

        if(!name || !categoryId || !unit) return 'Information missing'

        
        try {
            const result = await Groceries.create({name: name, category_id: categoryId, unit: unit})
            return result
        
        } catch (error) {
            return error.message         
        }
    }

    static updateGrocerie = async (req,res) => {
        const {grocerieId, name, categoryId, unit} = req.body
        if(!grocerieId || !name || !categoryId || !unit) return 'Information missing'
            
        const result = await Groceries.update({name:name, category_id: categoryId, unit: unit}, {where: {id: grocerieId}})

        if(!result) return 'Something went wrong'

        return result
    } 

    static deleteGrocerie = async (req,res) => {
        const {id} = req.body
        if(!id) 'information missing'

        
        try {
            const result = await Groceries.destroy({where: {id: id}})
            return result
            
        } catch (error) {
            return error.message
        }

    }



}

module.exports = GroceriesServices