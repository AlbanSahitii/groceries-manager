module.exports = (sequelize, DataTypes) => {
    const Groceries_Category = sequelize.define("Groceries_Category", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'groceries_category'
    });
    
    return Groceries_Category;
}