var mongoose = require('mongoose')
var validator = require('validator');
var jwt = require('jsonwebtoken');
const _ = require('lodash')
const bcrypt = require('bcryptjs')

var UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        minlength :1,
        trim :true,
        unique:true,
        validate: {
            validator: (v) => {
              return validator.isEmail(v);;
            },
            message: props => `${props.value} is not a valid email number!`
        }
    },
    password:{
        type :String,
        required:true,
        minlength:6
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
})

UserSchema.methods.toJSON= function(){
    var user=this;
    var userobj = user.toObject();
    return _.pick(userobj,['_id',"email"]);
}


UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth'
    var token = jwt.sign({_id:user._id.toHexString(), access}, 'abc123').toString();
    user.tokens = user.tokens.concat([{access, token}]);
    return user.save().then(()=>{
        return token;
    })
};
UserSchema.statics.findByToken =function(token){
    var User = this;
    var decoded ;


    try{
        decoded = jwt.verify(token , 'abc123')
        //console.log(decoded);
    }catch(e){
       return Promise.reject();
    }
    return User.findOne({
            '_id' :decoded._id,
            'tokens.access' :'auth',
            'tokens.token' : token
    })
}
UserSchema.statics.findByCredentials = function(email, password){
    var User = this;
    return User.findOne({email}).then((userdb)=>{
        //console.log('---------------------------------------------------------------', userdb);
        if(!userdb){
            return Promise.reject();
        }
        return new Promise((resolve, reject)=>{
            bcrypt.compare(password, userdb.password,(err, res)=>{
               // console.log(res, '-------------------------**************----------------')
                if(res){
                    resolve(userdb);
                }else{
                    reject();
                }
            })
        })  
    })
}
UserSchema.pre('save',function(next){

    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.password,salt,(err, hash)=>{
                user.password = hash;
                next();
            })
        })
    }else{
        next();
    }
})

var User = mongoose.model('User',UserSchema)


module.exports ={
    User
}
