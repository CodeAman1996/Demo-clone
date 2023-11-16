
module.exports = {
    "development": {
        "databases": { /** our database declarations from before**/}
    },
  
              "Database1": {
                  "database": process.env.DATABASE1,  //you should always save these values in environment variables
                  "username": process.env.USERNAME1,  //only for testing purposes you can also define the values here
                  "password": process.env.PASSWORD1,
                  "host": process.env.HOSTNAME1,
                  "port": process.env.PORT1,
                  "dialect": "mysql"  
              },

              "Database2": {
                  "database": process.env.DATABASE2,
                  "username": process.env.USERNAME2,  
                  "password":   process.env.PASSWORD2,
                  "host": process.env.HOSTNAME2,
                  "port": process.env.PORT2,
                  "dialect": "mysql" 
              },
          }
    