const {MongoClient,ObjectID} = require('mongodb')


MongoClient.connect('mongodb://localhost:27017/Todoapp',(err, client )=> {
    if(err){
       return console.log('err',err);
    }
    const db = client.db('TodoApp')
    db.collection("Todos").find({_id:new ObjectID('5bfee0d530fe119b36e1df88')}).toArray()
    .then((result)=>{
        console.log(JSON.stringify(result, undefined, 2));
    },(err)=>{
        console.log("cannot fetch todos");
    })



    client.close();
});