const mongoClient = require('mongodb').MongoClient;


mongoClient.connect('mongodb://localhost:27017/Todoapp',(err, client )=> {
    if(err){
       return console.log('err',err);
    }
    const db = client.db('TodoApp')
    // db.collection('Todos').insertOne({
    //     text:"hello from the other side",
    //     complete:false
    // },(err, result)=>{
    //     if(err){
    //         return console.log('cannnot save collection');
    //     }
    //     console.log(`save success${JSON.stringify(result.ops, undefined,2)}`);
    // })
    console.log('connect success');
    db.collection("products").insertOne({
        Name:"product1",
        type:"type1"
    },(err, ret)=>{
        if(err){
            return console.log("not saved");
        }
        console.log(`saved success ${JSON.stringify(ret.ops, undefined,2)}`);
    })



    client.close();
});