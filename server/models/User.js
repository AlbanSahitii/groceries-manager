module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
        {
          unique: true,
          fields: ["username"],
        },
      ],
    }
  );

  User.associate = models => {
    User.hasOne(models.Family, {
      foreignKey: "owner_id",
      onDelete: "cascade",
    });

    User.hasOne(models.FamilyUser, {
      foreignKey: "user_id",
      onDelete: "cascade",
    });

    User.hasMany(models.FamilyGroceries, {
      foreignKey: "user_id",
      onDelete: "cascade",
    });

    User.hasMany(models.UserFavorites, {
      foreignKey: "user_id",
      onDelete: "cascade",
    });

    User.hasMany(models.FamilyInvites, {
      foreignKey: "user_id",
      onDelete: "cascade",
    });
  };

  return User;
};
