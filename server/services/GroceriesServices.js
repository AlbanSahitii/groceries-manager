const {Groceries, FamilyGroceries, User, Family} = require('../models')
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

    // below will be the logic of Family Groceries List

    static addGrocerieInList = async (req,res) => {
        const {user_id, family_id, groceries_id} = req.body
        if(!user_id || !family_id || !groceries_id) return 'Information missing'

        const user = await User.findOne({where: {id: user_id}})
        if(!user) return 'User doesnt exist'
        
        const family = await Family.findOne({where: {id: family_id}})
        if(!family) return 'Family doesnt exist'

        const grocerie = await Groceries.findOne({where: {id: groceries_id}})
        if(!grocerie) return 'Grocerie not found'

        try {
            const result = await FamilyGroceries.create({user_id: user_id, family_id: family_id, groceries_id: groceries_id})
            return result
        } catch (error) {
            return error.message
        }

    }

    static getFamilyList = async (req,res) => {
        const {family_id} = req.query  
        if(!family_id) return 'Infromation missing'

        const result = FamilyGroceries.findAll({where: {family_id: family_id}})

        return result
    }


}

module.exports = GroceriesServices