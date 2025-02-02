const {Groceries, FamilyGroceries, User, Family, PurchasedGroceries, sequelize} = require('../models')
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

        const familyList = await FamilyGroceries.findOne({where: {family_id: family_id, groceries_id: groceries_id}})
        if(familyList) return 'Grocery found in list'


        const result = await FamilyGroceries.create({user_id: user_id, family_id: family_id, groceries_id: groceries_id})
        return result

    }

    static getFamilyList = async (req,res) => {
        const {family_id} = req.query  
        if(!family_id) return 'Infromation missing'

        const result = FamilyGroceries.findAll(
            {include: 
                [{model:Groceries, required:true}]
            },
            {where: 
                {family_id: family_id}
            }
        )

        return result
    }

    static purchaseGrocery = async (req,res) => {
        const {family_groceries_id} = req.body
        if(!family_groceries_id) return 'information missing'

        const familyListGrocery = await FamilyGroceries.findOne({where: {id: family_groceries_id}})
        if(!familyListGrocery) return 'Grocery not found in list. Please add groceries to your family list'

        const familyId = familyListGrocery.family_id
        const grocerieId = familyListGrocery.groceries_id


        const [purchasedGrocery] = await PurchasedGroceries.findAll({where: {family_id: familyId, groceries_id: grocerieId}})
       //there are 2 transactions, first one (purchasedgrocery) is when family already had bought before this type of grocery, !purchased is when they didnt buy before
        try {
            if(purchasedGrocery) {
                await sequelize.transaction(async (transaction) => {
                    await Promise.all([
                        PurchasedGroceries.update({ createdAt: new Date()},{where: {id: purchasedGrocery.id}}, {transaction }),
                        FamilyGroceries.destroy({where: {groceries_id: grocerieId, family_id: familyId}}, { transaction })
                    ]);
                });
                return 'Purchased successfully #1'

            } else if(!purchasedGrocery) {
                await sequelize.transaction(async (transaction) => {
                    await Promise.all([
                        PurchasedGroceries.create({family_id: familyId, groceries_id: grocerieId}, {transaction }),
                        FamilyGroceries.destroy({where: {groceries_id: grocerieId, family_id: familyId}}, { transaction })
                    ]);
                });
                return 'Purchased successfully #2'

            } else {
                return 'something else happend !! check'
            }
        } catch (error) {
            return error.message
        }
    }

    static getLastTenGroceries = async (req,res) => {
        const {family_id} = req.body
        if(!family_id) return 'information missing'

        const result = await PurchasedGroceries.findAll({order: [['createdAt', 'DESC']], limit: 10}, {where: {family_id:family_id}})

        return result


    }

}

module.exports = GroceriesServices