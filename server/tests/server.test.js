const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo')
const todos = [{text:"first test"},{text:"second test"},{text:"third test"},{text:"4th test"}]
beforeEach((done) =>{
    Todo.remove({}).then(()=> {
        Todo.insertMany(todos);
    }).then(()=> done());
})

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
                    expect(todos.length).toBe(5);
                    expect(todos[4].text).toBe(text);
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
                expect(res.body.todos.length).toBe(4)
            }).end(done)
    })
})
