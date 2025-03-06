module.exports = (sequelize, DataTypes) => {
  const GroceriesCategory = sequelize.define(
    "GroceriesCategory",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      tableName: "groceries_category",
    }
  );

  GroceriesCategory.associate = models => {
    GroceriesCategory.hasMany(models.Groceries, {
      foreignKey: "category_id",
      onDelete: "cascade",
    });
  };

  return GroceriesCategory;
};
