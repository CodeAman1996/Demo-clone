let API_KEY = 'X8QLN83WaShVTTxguWkD7sQZ5yd4tT'; 
const API_URL = 'https://crm.eg-paid.com/authadmin/login-with-otp';
const axios = require('axios');

exports.loginwithotp = async(req,res) =>{
    try {
        const { mobile, otp, mac_id } = req.body;
    
        const data = {
          mobile,
          otp,
          mac_id,
        };
    
        const headers = {
          apikey: API_KEY,
        };
    
        const apiResponse = await axios.post(API_URL, data, { headers });
    
        if (apiResponse.status === 200) {
          console.log("Login success:", apiResponse.data);
          return res.status(200).send(apiResponse.data);
        } else {
          console.error("API error", apiResponse.data);
          return res.status(apiResponse.status).send("Error from API");
        }
      } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
      }

}

exports.login= async(req,res)=>{
    API_KEY = 'X8QLN83WaShVTTxguWkD7sQZ5yd4tT'; 
    let LOGIN_URL = 'https://crm.eg-paid.com/authadmin/login'; 
  try {
    const { mobile, password, mac_id } = req.body;

    const data = {
      mobile,
      password,
      mac_id,
    };

    const headers = {
      apikey: API_KEY,
    };

    const apiResponse = await axios.post(LOGIN_URL, data, { headers });

    if (apiResponse.status === 200) {
      console.log("Login success:", apiResponse.data);
      return res.status(200).send(apiResponse.data);
    } else {
      console.error("API error", apiResponse.data);
      return res.status(apiResponse.status).send("Error from API");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }

}

exports.webnavigation= async(req,res)=>{
    API_KEY = 'X8QLN83WaShVTTxguWkD7sQZ5yd4tT'; 
    let WEB_NAVIGATION_URL = 'https://crm.eg-paid.com/admin/web_navigation'; 
    try {
        const headers = {
          apikey: API_KEY,
          Authorization: req.headers['authorization'],
        };
    
        const apiResponse = await axios.get(WEB_NAVIGATION_URL, { headers });
    
        if (apiResponse.status === 200) {
          console.log("Web navigation data:", apiResponse.data);
          return res.status(200).send(apiResponse.data);
        } else {
          console.error("API error", apiResponse.data);
          return res.status(apiResponse.status).send("Error from API");
        }
      } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
      }
}