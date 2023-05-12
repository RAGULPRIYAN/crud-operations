const express = require("express");
var mysql = require('mysql');
var cors = require('cors')
let app = express()
app.use(express.json())
app.use(cors())

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'RaGuL@08',
  database: 'portfolio'
});
connection.connect();

// res.set('Content-Type', 'applicatio/json');



app.get('/getusers/:id',(req,res)=>{

    connection.query(`select * from contact where id = ?`,[req.params.id], function (error, results) {

        if(error);

        console.log('results'+ JSON.stringify(results));


        res.end(JSON.stringify(results));

      });
    });
app.get('/getall', (req, res) => {
  res.set('Content-Type', 'applicatio/json');
  let sql =`select id,name,email,subject from contact where isdeleted = ?;`
  connection.query(sql,[0], function (error, results) {

    if (error) {

    } else {
      console.log('results' + JSON.stringify(results));
      
      res.end(JSON.stringify(results));

    }




  });
})

  app.post('/insert',(req,res)=>{
    console.log(req.body)
    connection.query(`insert into contact (name,email,subject,message)values (?,?,?,?)`,[req.body.name,req.body.email,req.body.subject,req.body.message], function (error, results) {

        if(error);
        console.log(error)
        console.log('results '+ JSON.stringify(results));



        res.end(JSON.stringify(results));

      });
    })

    app.put('/update',(req,res)=>{

      connection.query(`update  contact SET name=? ,email=?, subject=? ,message=? where id=?`,[req.body.name,req.body.email,req.body.subject,req.body.message,req.body.id], function (error, results) {

          if(error);
          console.log(error)
          console.log('results '+ JSON.stringify(results));


          res.end(JSON.stringify(results));

        });
      })
      app.put('/delete', (req, res) => {

        // Execute the DELETE statement with the specified ID
        
         let sql = `UPDATE contact SET isdeleted = ? WHERE id = ?;`;
        
        let id = req.body.id
        
        console.log('id.....', id)
        
        connection.query(sql, [1, id], (error, results) => {
        
          if (error) {

          } else {
            console.log('results' + JSON.stringify(results));
            
            res.end(JSON.stringify(results));
      
          }
        
        });
        
        });


  // console.log(req.query)
  // console.log("i am insde get")
  // res.send("hi welcome"+req.query["name"]+req.query["age"])
  // res.json([{name:req.query["name"],age:req.query["age"]}])


// let user=[{id:1,name:'ragul',age:'22'},
// {id:2,name:'saravana',age:'23'},
// {id:3,name:'ajai',age:'21'}]

// app.get('/user',(req,res)=>{
//     res.json(user)
// })
// app.get('/:name',(req,res)=>{
//     res.json(user.filter((e)=>e.name == req.params.name))
//     console.log(req.params)

//     res.json(user)
// })

app.listen(3000, () => {
  console.log("listening on  port 3000")
})