const express = require('express');
const axios = require('axios');
const router = require('./routes/router');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
