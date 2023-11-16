'use strict';
const bcrypt = require('bcrypt');

const GETALL = async (Model,id) => {
    const lists = await Model.findAll(id);
    return lists;
   }

const GETBYID = async (Model,id) => {
    const list = await Model.findById(id);
    if(list === null) throw { error: "Id Not Found" };
    return list;
   }

const POST = async (data,Model) => {

    const salt = await bcrypt.genSalt(10);
    const { id, firstName, LastName, userName, password, createdAt, active, email, updatedAt} = data
    
    const lists = await Model.create({

        id,
        firstName,
        LastName,
        userName,
        password : await bcrypt.hash(password, salt),
        createdAt,
        active,
        email,
        updatedAt

    })

    return lists.toJSON();
}

const PUT = async (id, body,Model) => {
    const { firstName, LastName, userName, password, createdAt, active, email, updatedAt} = body

    try{
        const user = await Model.findByPk(id);
        if(user === null) throw { error: "Id Not Found" };

        return user.update({

            firstName,
            LastName,
            userName,
            password,
            createdAt,
            active,
            email ,
            updatedAt
        });
        
    } catch(e) {
        throw e;
    }
}

const DELETE = async (id,Model) => {
    try{
        const user = await Model.findByPk(id);
        if(user === null) throw { error: "Id Not Found" };
        user.destroy();
        return user.toJSON()
    } catch(e) {
        throw e;
    }
}
  
module.exports = { GETALL,GETBYID,POST,PUT,DELETE };