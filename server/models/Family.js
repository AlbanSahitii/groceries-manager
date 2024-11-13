module.exports = (sequelize, DataTypes) => {
    const Family = sequelize.define("Family", {
        family_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
  
        }

    }, {
        tableName: 'families'
    });
    
    return Family;
}