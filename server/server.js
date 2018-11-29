var express =require('express')
var bodyparser = require('body-parser')



var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')


var app  = express();
app.use(bodyparser.json());

app.post('/addtodo',(req,res)=>{
    
    console.log(req.body);
    var todo = new Todo(req.body);
    todo.save()
    .then((ret)=>{
        res.send(ret);
        console.log(ret);
    },(err)=>{
        res.status(400).send(err);
        console.log("err");
    })
})
app.post('/adduser',(req,res)=>{
    console.log(req);
    var user = new User(req)
    user.save().then((data)=>{
        res.send(ret);
        console.log(ret);
    },(err)=>{
        res.status(400).send(err);
        console.log("err");
    })
})


app.listen(3000, ()=>{
    console.log("server run on port 3000");
})