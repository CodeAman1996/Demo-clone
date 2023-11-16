const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.listen(3000,()=>{
  console.log('Listening to port 3000');
})

app.get('/', async (req, res) => {
  const newreq = await req.body.data;
  console.log('GET request received',newreq);
  const arr = [1,2,3,4,5];
  console.log('arr',arr);

  const filteredArray = arr.filter((x)=>{
    return x>3;
  })

  console.log('filteredarr',filteredArray)
  res.send('This is a GET request response.');
});

