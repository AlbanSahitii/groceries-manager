module.exports = (sequelize, DataTypes) => {
    const Purchased_Groceries = sequelize.define("Purchased_Groceries", {
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
    
    return Purchased_Groceries;
}