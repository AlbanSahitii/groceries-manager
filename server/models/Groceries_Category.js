module.exports = (sequelize, DataTypes) => {
    const GroceriesCategory = sequelize.define("GroceriesCategory", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: false,
          }        
    }, {
        tableName: 'groceries_category'
    });
    
    return GroceriesCategory;
}