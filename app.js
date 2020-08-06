//import data
const mysql = require("mysql");
const express = require('express');
const bodyParser = require('body-parser');
const config =  require('./config.json');
const path = require('path');
const moment = require('moment');


//create sql connection
var sqlConnection = mysql.createConnection(config);

sqlConnection.connect((err)=>{
    if(!err)
        console.log('DB connected');
    else
        console.log("DB error:" + JSON.stringify(err,undefined,2));
});

//set up express
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/titles', sendRequest());

// errors handling
app.use(notFound);
//app.use(catchErrors);

app.listen(3000, () => console.log('Express is running on port: 3000'));

//requests 

function sendRequest(){
    var api = express.Router()
    // GET /titles/:id
    api.get('/:id', function (req, res) {

        //let id = req.params.split(',');
        let query = `SELECT * FROM posts WHERE ID=${req.params['id']}`;
        return executeQuery(query, req, res);
      });

    // GET /titles
    api.get('/', function (req, res) {

        let query = `SELECT * FROM posts`;
        return executeQuery(query, req, res);
      });

    // POST /titles 
    api.post('/', function (req, res) {

        let mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

        let query = `INSERT INTO posts (title, lead, content, createdAt, updatedAt) VALUES ( '${req.body['title']}' , '${req.body['lead']}' , '${req.body['content']}' , '${mysqlTimestamp}', NULL)`;
        return executeQuery(query, req, res);
      });

    // PUT /titles/:id
    api.put('/:id', function (req, res) {

        let mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

        let query = `UPDATE posts SET title='${req.body['title']}' , lead='${req.body['lead']}' , content='${req.body['content']}', updatedAt='${mysqlTimestamp}' WHERE ID=${req.params['id']}`;
        return executeQuery(query, req, res);
      });

    // DELETE /titles/:id
    api.delete('/:id', function (req, res) {

        let query = `DELETE FROM posts WHERE ID=${req.params['id']}`;
        return executeQuery(query, req, res);
      });

    return api;
}



//executing queny function
function executeQuery(query, req, res){
    sqlConnection.query(query , (err, rows, fields)=>{

        if(!err){
            
            console.log("Query executed successfully !");

            return res.send(rows);
        }
        else{
            console.log("Query error: "+err);
        }
            
    })
}



function notFound(req, res, next) {
    const err = new Error('404 page not found');
    err.status = 404;
    next(err);
}