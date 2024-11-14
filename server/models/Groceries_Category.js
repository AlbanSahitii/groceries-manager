module.exports = (sequelize, DataTypes) => {
    const GroceriesCategory = sequelize.define("GroceriesCategory", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'groceries_category'
    });
    
    return GroceriesCategory;
}