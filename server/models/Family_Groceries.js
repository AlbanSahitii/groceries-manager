module.exports = (sequelize, DataTypes) => {
    const FamilyGroceries = sequelize.define("FamilyGroceries", {
        family_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'families',
                key: 'id'
              }
        },
        groceries_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'groceries',
                key: 'id'
              }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
              }
        }

    }, {
        tableName: 'family_groceries'
    })
    
    FamilyGroceries.associate = models => {
        FamilyGroceries.belongsTo(models.User, {
            foreignKey: "user_id",
            onDelete: "cascade"
        })
        FamilyGroceries.belongsTo(models.Family, {
            foreignKey: "family_id",
            onDelete: "cascade"
        })
        FamilyGroceries.belongsTo(models.Groceries, {
            foreignKey: "groceries_id",
            onDelete: "cascade"
        })
    }

    return FamilyGroceries;
}