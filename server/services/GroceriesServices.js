const {Groceries} = require('../models')

class GroceriesServices {

    static getGrocerie = async (req,res) => {
        const {name} = req.query
        //todo
        return name
    }

    static createGrocerie = async (req,res) => {
        //todo


        return 'creategrocerie'
    }

    static updateGrocerie = async (req,res) => {

                //todo

        return 'updategrocerie'
    } 

    static deleteGrocerie = async (req,res) => {
                //todo

        return 'deletegrocerie'
    }



}

module.exports = GroceriesServices