var { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  return sequelize.define('users',{
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull:false
    },
    firstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    active : { 
      type: DataTypes.BOOLEAN,
      default:true 
    },
    email:DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  })
}