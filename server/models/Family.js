module.exports = (sequelize, DataTypes) => {
  const Family = sequelize.define(
    "Family",
    {
      family_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      tableName: "families",
    }
  );

  Family.associate = models => {
    Family.belongsTo(models.User, {
      foreignKey: "owner_id",
    });

    Family.hasMany(models.FamilyGroceries, {
      foreignKey: "family_id",
      onDelete: "cascade",
    });

    Family.hasMany(models.PurchasedGroceries, {
      foreignKey: "family_id",
      onDelete: "cascade",
    });

    Family.hasMany(models.FamilyUser, {
      foreignKey: "family_id",
      onDelete: "cascade",
    });

    Family.hasMany(models.FamilyInvites, {
      foreignKey: "family_id",
      onDelete: "cascade",
    });
  };

  return Family;
};
