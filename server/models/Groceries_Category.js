module.exports = (sequelize, DataTypes) => {
    const GroceriesCategory = sequelize.define("Groceries_Category", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'groceries_category'
    });
    
    return GroceriesCategory;
}