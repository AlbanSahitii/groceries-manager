module.exports = (sequelize, DataTypes) => {
  const PurchasedGroceries = sequelize.define(
    "PurchasedGroceries",
    {
      family_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "families",
          key: "id",
        },
      },
      groceries_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "groceries",
          key: "id",
        },
      },
    },
    {
      tableName: "purchased_groceries",
    }
  );

  PurchasedGroceries.associate = models => {
    PurchasedGroceries.belongsTo(models.Family, {
      foreignKey: "family_id",
      onDelete: "cascade",
    });

    PurchasedGroceries.belongsTo(models.Groceries, {
      foreignKey: "groceries_id",
      onDelete: "cascade",
    });
  };

  return PurchasedGroceries;
};
