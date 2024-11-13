module.exports = (sequelize, DataTypes) => {
    const User_Favorites = sequelize.define("User_Favorites", {
        groceries_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'groceries',
                key: 'id'
              }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
              }
        }
    }, {
        tableName: 'user_favorites'
    });
    
    return User_Favorites;
}