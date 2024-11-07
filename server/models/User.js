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
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    })
    
    return User;
}