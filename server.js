const express = require("express")
const mysql = require('mysql')
const app = express();
const port = 3002;

//insert actual host, user, pass and db
let connection = mysql.createConnection({
    host: '172.17.0.2',
    user: 'user',
    password: '123',
    database: 'database'
})

function getAll(){
  try{
    return new Promise((resolve, reject) => {
      connection.query("SELECT * from demoTable", (err, result)=>{
        if(err){
          // The equivalent of throwing the error
          reject(err);
        } else {
          // The equivalent of returning a value for getAll
          resolve(result[-1].testValue);
        }
      })
    })
  }
  catch(err){
    throw 'error while querying database'
  }
}

app.listen(port, () => {
  console.log("server running on port", port);
});

app.get("/", async (req, res) => {
  console.log('received get request')
  try{
    const result = await getAll()
    res.send({
      test: result
    })
  }
  catch(err){
    const errorMsg = "some error ocurred" + err;
    res.send(
      errorMsg
    )
  }
});
