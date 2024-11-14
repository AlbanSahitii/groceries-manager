module.exports = (sequelize, DataTypes) => {
    const PurchasedGroceries = sequelize.define("PurchasedGroceries", {
        family_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'families',
                key: 'id'
              }
        },
        groceries_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'groceries',
                key: 'id'
              }
        }
    }, {
        tableName: 'purchased_groceries'
    });
    
    return PurchasedGroceries;
}