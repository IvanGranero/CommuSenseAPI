const makeApp = require('./app');
const request = require('supertest');
const database = require('./database');

const app = makeApp(database);

describe('user API', ()=>{
    it('should run', ()=>{});
    it('POST /authenticate --> should return 404 when user is not in database', ()=>{
        return request(app).post("/authenticate")
        .send({
            username:"myNonUser",
            password:"pass"
        })
        .expect(404);
    });

    it('POST /authenticate --> should return user when user is in database', ()=> {
        return request(app).post("/authenticate")
        .send({
            username:"myUser",
            password:"pass"
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .then((response)=>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    username: expect.any(String),
                    password: expect.any(String),
                    number: expect.any(Number)
                })
            );
        });
    });
});