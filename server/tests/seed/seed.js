const {Todo} = require('./../../models/todo')
const {User} = require('./../../models/user')

const {ObjectID} = require('mongodb')
const jwt  = require('jsonwebtoken')
const UserOneId = new ObjectID()
const UserTwoId = new ObjectID()
const users = [{
      _id : UserOneId,
      email : 'mohumed.s.omar@gmail.com',
      password : 'mohamedebnomar',
      tokens:[{
         access:'auth',
         token: jwt.sign( {_id:UserOneId.toHexString(), access:'auth'},"abc123").toString()
      }]
    },
    {
        _id : UserTwoId,
        email : 'mohamedebnomar@gmail.com',
        password : 'mohamedebnomar',
  
    }
]

const todos = [
    {_id:new ObjectID(),text:"first test"}
]



const populateTodos = (done) =>{
    Todo.deleteMany({}).then(()=> {
        Todo.insertMany(todos);
    }).then(()=> done());
}
const populateUsers = (done) =>{
    User.deleteMany({}).then(()=>{
        var UserOne = new User(users[0]).save();
        var UserTwo = new User(users[1]).save();
        return Promise.all([UserOne,UserTwo])  
    }).then(() => done())
}


module.exports ={
    todos,populateTodos,populateUsers,users
}