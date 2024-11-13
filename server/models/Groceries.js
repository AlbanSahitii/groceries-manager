module.exports = (sequelize, DataTypes) => {
    const Groceries = sequelize.define("Groceries", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false

        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'groceries_category',
                key: 'id'
              }
  
        }
    }, {
        tableName: 'groceries'
    });
    
    return Groceries;
}