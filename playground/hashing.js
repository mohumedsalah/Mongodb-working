const {SHA256} =require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

var password = 'aaaaa'


bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,(err,hash)=>{
        console.log(hash);
    });
})

var hashed = "$2a$10$vPL5xM15aGs4XFMnmm0yO.BGStju9A8ptSNCC/l9dwHF7mQ9K";


bcrypt.compare(password, hashed,(err, res) =>{
    console.log(res);
})
// var data ={
//     id:10
// }


// var token = jwt.sign(data,'123abc')
// console.log(token);

// var decoded = jwt.verify(token  ,'123abc')
// console.log(decoded); 

// var message ="iam user number 3";

// var hash = SHA256(message).toString();

// console.log(hash);


// var data = {
//     id:4
// }
// var token ={
//     data,
//     hash:SHA256(JSON.stringify(data) + "somesecret").toString()
// }


// var resultHash = SHA256(JSON.stringify(token.data) + "somesecret").toString();

// //console.log(resultHash);
// //console.log(token.hash);


// if(resultHash === token.hash){
//     console.log('data correct');
// }else{
//     console.log('changed');
// }
