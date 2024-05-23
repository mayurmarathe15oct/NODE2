import express from "express";
import mysql from "mysql2";
import cors from 'cors';

const server = express();
server.use(express.json());
server.use(cors());

const db = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "jokesdb",
    connectionLimit: 10
})



server.listen(4300, function(){
    console.log("The server is now running in port 4300");
});

server.get('/jokes/GetAllJokes', function(req, res){
    let sqlQuery = "CALL `GetAllJokes`()";
    db.query(sqlQuery,function(error, data){
        if(error){
            res.json({message:error});
        }
        else{
            res.json(data);
        }
    });
})

server.post('/jokes', function(req, res){
    let sqlQuery = "CALL `CreateNewJoke`(?,?)";
    db.query(sqlQuery, [req.body.data.newjoke, req.body.data.categoryid], function(error, data){
        if(error){
            res.json({message:error});
        }
        else{
            res.json(data);
        }
    })
})

server.delete('/jokes/:jokeid', function(req, res){
    let sqlQuery = "CALL `DeleteJoke`(?)";
    db.query(sqlQuery, [req.params.jokeid], function(error, data){
        if(error){
            res.json({message: error});
        }
        else{
            res.json(data);
        }
    })
})