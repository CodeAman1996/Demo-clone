const tenantmiddleware = require('../middlware/tenantmiddleware');

exports.tc= (req,res,next)=>{
        //Get data from tenant's database
        
        req.tenantConnection.query('select * FROM data').then(data=>{
            res.json(data);
        })
}