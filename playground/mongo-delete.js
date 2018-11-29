const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,Clinet)=>{
    if(err){
        console.log("can't connect database");
    }
    const db = Clinet.db('TodoApp');
    // db.collection('Todos').deleteMany({text:'hello'}).then( (result)=>{
    //     console.log(result)
    // })
    db.collection('Todos')
    .findOneAndDelete({_id:ObjectID("5bfed141ce23260ba0604c5a")})
    .then((result)=>{
        console.log(result);
    })

    //db.close();
    



})