module.exports = (sequelize, DataTypes) => {
  const Groceries = sequelize.define(
    "Groceries",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "groceries_category",
          key: "id",
        },
      },
    },
    {
      tableName: "groceries",
    }
  );

  Groceries.associate = models => {
    Groceries.hasMany(models.UserFavorites, {
      foreignKey: "groceries_id",
      onDelete: "cascade",
    });

    Groceries.hasMany(models.PurchasedGroceries, {
      foreignKey: "groceries_id",
      onDelete: "cascade",
    });

    Groceries.hasOne(models.GroceriesCategory, {
      foreignKey: "id",
      onDelete: "cascade",
    });
  };

  return Groceries;
};
