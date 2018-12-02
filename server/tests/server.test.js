const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb')
const {app} = require('./../server');
const {Todo} = require('./../models/todo')
const {User} = require('./../models/user')
const {todos, populateTodos,users,populateUsers} = require('./seed/seed')

beforeEach(populateTodos)
beforeEach(populateUsers)

describe('POST /addtodo', ()=>{
    it('shold add new todo',(done)=>{
        var text = 'test todo test';
        request(app)
            .post('/addtodo')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            })
            .end((error, res)=>{
                if(error){
                    return done(error);
                }
                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2);
                    expect(todos[1].text).toBe(text);
                    done();            
                }).catch(e=>done(e))
            });
        
    })
})


describe('Get /todos',() =>{
    it('should return all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect(res =>{
                expect(res.body.todos.length).toBe(1)
            }).end(done)
    })
})

describe('Get /todos/:id',() =>{
    it('should return object by its id',(done)=>{
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect(res =>{
                expect(res.body.text).toBe(todos[0].text)
            })
            .end(done)
    })
})


describe('Get /users/me',()=>{
    it('should access auth user',(done)=>{
        request(app)
            .get('/users/me')
            .set('x-auth',users[0].tokens[0].token)
            .expect(200)
            .expect((res)=>{
                expect(res.body._id).toBe(users[0]._id.toHexString())
                expect(res.body.email).toBe(users[0].email)
            }).end(done)
    })
    it('should access not auth user',(done)=>{
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res)=>{
                expect(res.body).toEqual({})
            }).end(done)
    })
})


describe('/Users',()=>{
    it('should create new user',(done)=>{
        var email ="salahomar@gmail.com";
        var password = "abc123";
        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res)=>{
                expect(res.body.email).toBe(email)
                expect(res.body._id).toExist();
                expect(res.header['x-auth']).toExist;

            }).end((err)=>{
                if(err){
                    return done(err);
                }
                User.findOne({email}).then( (user)=>{
                    expect(user.password).toNotBe(password)
                    expect(user).toExist();
                    done();
                } ).catch(e => done(e))
            })
    })
})


describe('post /user/login',()=>{
    it("sould login user and return token",(done)=>{
        request(app)
            .post('/users/login')
            .send({
                email:users[1].email,
                password:users[1].password
            })
            .expect(200)
            .expect((res)=>{
                expect(res.header['x-auth']).toExist();
            }).end((err, res)=>{
                if(err){
                    return done(err);
                }
                User.findById(users[1]._id).then((user)=>{
                    expect(user.tokens[0]).toInclude({
                        access:'auth',
                        token:res.header['x-auth']
                    })
                    done();
                }).catch( (e)=>done(e));
            })
    })
    it("should return login faild",(done)=>{
        request(app)
            .post('/users/login')
            .send({
                email:users[1],
                password:users[1].password + 'a'
            })
            .expect(400)
            .expect((res)=>{
                expect(res.header['x-auth']).toNotExist();

            }).end(done)
    })
})