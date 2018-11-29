const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')






// var id = "5bffd5b0b72ff11dd844007e";
// if(!ObjectID.isValid(id)){
//     console.log("id not vaild");
// }

// Todo.find({
//     _id : id
// }).then((todos)=>{
//     console.log("todos", todos);
// })


// Todo.findOne({
//     _id :id
// }).then((todo)=>{
//     console.log("todo", todo);
// })



// Todo.findById(id).then((todo)=>{
//     if(todo){
//         return console.log("this id not found in database");
//     }
//     console.log("todoby id", todo);
// })




var id = "5bffaf85fe9bbc279033576c"
if(!ObjectID.isValid(id)){
    console.log("not vaild id");
}
User.findById(id).then((ret)=>{
    if(!ret){
        return console.log("not find this id");
    }
    console.log(ret);
},(err)=>{
    console.log("can't find id");
})


