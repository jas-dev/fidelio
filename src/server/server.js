
const express = require('express'); //load the express library into the file

const mysql = require('mysql');

const mysqlcredentials = require('./mysqlcreds.js');

const cors = require('cors');

//using the credentials that we loaded, establish a prelim connection to the database
const db = mysql.createConnection(mysqlcredentials);

const server = express();

server.use(cors());
server.use(express.urlencoded({extended: false}));//have express pull body data that is urlencoded
server.use(express.json()); //used for things like axios

//make an endpoint to handle retrieving the grades of all students
server.get('/api/grades', (req, res) =>{
    //arguments are:
    //an object representing all of the data coming from the lcient to the server
    //an object representing all of the data going from the server to the client

    //establish the connection to the db, when server receives a request at 3001 at /api/grades, call the function below
    db.connect( ()=> {
        //create a query for our desired operation
        const query = "SELECT `id`, CONCAT(`givenname`,\" \",`surname`) AS `name`, `course`, `grade` FROM `grades`";
        //send the query to the database, and call the given callback function once the data is retrieved or an error happens
        db.query(query, (error, data)=>{
            //if error is null, no error occured
            //create an output object to be sent back to the client
            const output = {
                success: false,
            };
            //if error is null, send the data
            if(!error){
                //notify the client that we were successful
                output.success = true;
                //attach the data from the database to the output object
                output.data = data;
            }else{
                //an error occured, attach that error onto the output so we can see what happened
                output.error = error;
            }
            //send the data back to the client
            res.send(output)
        })
    })
});

server.post('/api/grades', (request, response)=>{
    //check the body object and see if any data was not sent
    if(request.body.name === undefined || request.body.course === undefined || request.body.grade === undefined){
        //respond to client with an appropriate error message
        response.send({
            success: false,
            error: 'invalid name, course, or grade'
        });

        return;
    }
    //connect to the database
    db.connect( ()=>{
        //split the name string into an array of strings based on the delimiter specified as a parameter-> " "
        const name = request.body.name.split(" ");
        //concat onto the query: use slice and join to copy the parts of the persons name together from the array into a new whole string

        const query = 'INSERT INTO `grades` SET `surname`="'+name.slice(1).join(' ')+'", `givenname`="'+name[0]+'", `course`="'+request.body.course+'", `grade`='+request.body.grade+', `added`=NOW()';

        db.query(query, (error, result)=>{
            if(!error){
                response.send({
                    success: true,
                    new_id: result.insertId
                })
            }else{
                response.send({
                    success: false,
                    error //es6 structuring of error:error
                })
            }
        })
    })
});

server.delete('/api/grades/:student_id', (request, response)=>{
    console.log(request.params);

    if(request.params.student_id === undefined){
        response.send({
            success: false,
            error: 'must provide a student id for delete'
        });
        return;
    }
    db.connect( ()=>{
        const query = "DELETE FROM `grades` WHERE `id`="+request.params.student_id;
        db.query(query, (error, result)=>{
            if(!error){
                response.send({
                    success: true
                })
            }else{
                response.send({
                    success: false,
                    error
                })
            }
        })
    })
});

server.listen(3001, ()=>{
    console.log('server is running-runnin, runnin-runnin on port 3001')
});