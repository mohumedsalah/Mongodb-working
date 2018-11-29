
var mongoose = require('mongoose');


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp')

var Todo = mongoose.model('Todo',{
    text:{
        type:String
    },
    complated:{
        type :Boolean
    },
    complatedAt:{
        type:Number
    }
})

// var newTodo = new Todo({
//     text:'dinner done'
// })
// newTodo.save().then((res)=>{
//     console.log("save todo",res);
// },(err)=>{
//     console.log("can't save obj");
// })

var newtask = new Todo({
    text:'wake salah at 7 am',
    complated:true,
    complatedAt:123
})

newtask.save().then((ret)=>{
    console.log(JSON.stringify(ret, undefined, 2));
},(err)=>{
    console.log("can't save obj");
})
