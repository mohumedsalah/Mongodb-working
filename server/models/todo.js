var mongoose = require('mongoose')


var Todo = mongoose.model('Todo',{
    text:{
        type:String,
        required:true,
        minlength :1,
        trim :true
    },
    complated:{
        type :Boolean,
        default :false
    },
    complatedAt:{
        type:Number,
        default :null
    }
})


module.exports ={
    Todo
}