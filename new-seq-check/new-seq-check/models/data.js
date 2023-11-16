module.exports = (sequelize, DataTypes) => {
const Data = sequelize.define('data', {
  id:{
     type:DataTypes.INTEGER,
     autoIncrement:true,
     primaryKey:true,
     allowNull:false
  },
    f_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    l_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type:  DataTypes.INTEGER,
      allowNull: false,
    },
     address:{
      type:  DataTypes.INTEGER,
      allowNull: false,
    }
 
  })
};