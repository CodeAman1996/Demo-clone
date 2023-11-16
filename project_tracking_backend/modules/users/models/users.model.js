var { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("User", {
    userId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type:DataTypes.STRING,
      allowNull:false,
       },
    lastName:  {
      type:DataTypes.STRING,
       },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
       },
    email:{
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: true,
      },
      roleId:{
        type: Sequelize.UUID,
      }
    },
    resetLink:{
      type:DataTypes.STRING,
      
      },
    phone:{
      type: DataTypes.STRING
    },
    profileImage:{
      type: DataTypes.STRING
    }
  },{timestamps: true});
};