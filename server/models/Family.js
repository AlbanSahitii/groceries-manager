module.exports = (sequelize, DataTypes) => {
    const Family = sequelize.define("Family", {
        family_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'users',
                key: 'id'
            }
  
        }

    }, {
        tableName: 'families'
    });

    // Family.belongsTo(sequelize.models.User, { 
    //     foreignKey: "owner_id", 
    // });
    // there is a problem with belong to. if needed in future fix it

    
    return Family;
}