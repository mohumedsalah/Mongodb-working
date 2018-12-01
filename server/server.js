var express =require('express')
var bodyparser = require('body-parser')
const _ = require('lodash');
const {ObjectID} = require('mongodb')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')


var app  = express();
app.use(bodyparser.json());

app.post('/adduser',(req,res)=>{
    console.log(req.body);
    var user = new User(req.body)
    user.save().then((data)=>{
        res.send(ret);
        console.log(ret);
    },(err)=>{
        res.status(400).send(err);
        console.log("err");
    })
})
app.get('/todos',(req, res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    })
})
app.get('/todos/:id',(req, res)=>{
    
    var id = req.params.id;
    //console.log(id);
    if(!ObjectID.isValid(id)){
       return res.status(404).send("id is not vaild");
    }
    
    Todo.findById(new ObjectID (id)).then((ret)=>{
        if(!ret){
            return res.status(404).send("Not found this id in database");
        }
        return res.send(ret);
    }, (err)=>{
        return res.status(400).send(err);
    })
    

})
app.patch('/todos/:id',(req, res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text', 'completed']);
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    if(_isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completed = null;
    }
    Todo.findByIdAndUpdate(id,{$set:body}, {new:true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send(todo);
    }).catch((e)=>{
        test.status(404).send();
    })
});
// post /users

app.post('/Users',(req,res)=>{
    var body = _.pick(req.body,['email', 'password']);
    var user  = new User(body);
    
    user.save().then(()=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch(e=>{
        res.status(400).send(e);
    })
})


app.listen(3000, ()=>{
    console.log("server run on port 3000");
})


module.exports ={
    app
}