module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false

        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    }, {
        tableName: 'users'
    });

    User.hasOne(sequelize.models.Family, { 
        foreignKey: "owner_id"
    });
    User.hasOne(sequelize.models.FamilyUser, { 
        foreignKey: "user_id"
    });

    return User;
}