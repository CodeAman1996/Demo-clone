const express = require('express');
const app = express();
const tenantroutes = require('./routes/tenantroutes');
//const tenantmiddleware = require('./middlware/tenantmiddleware');

app.use('/',tenantroutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});