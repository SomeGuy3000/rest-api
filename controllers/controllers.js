const mysql = require("mysql");
const config =  require('../config.json');
const moment = require('moment');
var knex = require('knex')({
    client: 'mysql',
    connection: config
  });

exports.default = {

    // GET /titles/:id
    async getTitle(req, res){
      let ids = req.params['id'].split(',');

      knex('posts').whereIn('id', ids).then(function(projectNames){
          //do something here
          res.send(projectNames);
        });
      },

    // GET /titles
    async getTitles(req, res){
      knex('posts').select('*').then(function(projectNames){
          //do something here
          res.send(projectNames);
        });
      },

    // POST /titles
    async  createTitle(req, res){
      let mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

      knex('posts').insert([{
        title: req.body['title'], 
        lead: req.body['lead'],
        content: req.body['content'],
        createdAt: mysqlTimestamp, 
        updatedAt: 'NULL'}]).then(function(projectNames){
            //do something here
            res.send(projectNames);
          });
      },

    // PUT /titles/:id  
    async updateTitle(req, res){
      let mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

      knex('posts').where({'id': parseInt(req.params['id'])}).update({
        'title': req.body['title'], 
        'lead': req.body['lead'], 
        'content': req.body['content'],  
        'updatedAt': mysqlTimestamp
      }).then(function(projectNames){
          //do something here
          res.sendStatus(200);
        });
    },

    // DELETE /titles/:id
    async deleteTitle(req, res){
      let ids = req.params['id'].split(',');

      knex('posts').whereIn('id', ids).del().then(function(){
        //do something here
        res.sendStatus(200);
      });
    }
};



//create sql connection
var sqlConnection = mysql.createConnection(config);

sqlConnection.connect((err)=>{
    if(!err)
        console.log('DB connected');
    else
        console.log("DB error:" + JSON.stringify(err,undefined,2));
});

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
