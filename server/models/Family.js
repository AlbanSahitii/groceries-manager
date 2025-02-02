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

    Profile.associate = models => {
        Profile.belongsTo(models.User,{
            foreignKey: {
                allowNull: false
            }
        })   
    }
    
    return Family;
}