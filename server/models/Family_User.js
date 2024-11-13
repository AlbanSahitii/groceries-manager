module.exports = (sequelize, DataTypes) => {
    const Family_User = sequelize.define("Family_User", {
        owner: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
              }
  
        },
        family_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'families',
                key: 'id'
              }
  
        }

    }, {
        tableName: 'family_user'
    });
    
    return Family_User;
}