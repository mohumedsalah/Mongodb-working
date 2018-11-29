const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client)=>{
    if(err){
        return console.log("can't connect");
    }
    const db = client.db('TodoApp');
    //#region collection
    // db.collection('Todos')
    // .findOneAndUpdate(
    //     {_id:new ObjectID("5bfed15429f2d70eac323eda")},
    //     {
    //         $set:{
    //             complete:true
    //         }
    //     },{
    //         returnOriginal:false
    //     }
    // )
    // .then((ret)=>{
    //     console.log(ret);
    // })
    //#endregion
    
    db.collection('Users').findOneAndUpdate({
            _id:new ObjectID("5bfed9c83fb7b83be89834e8")
        },{
            $set:{
                address:"egypt",
                name:"salah",
                age:25
            }
        },{
            returnOriginal :false
        }
    ).then((ret)=>{
        console.log(ret);
    })


})