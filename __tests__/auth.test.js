const app = require("../app");
const supertest = require("supertest");
const { db }= require("../db");
const { UserModel } = require("../User/userModel");

// Test suite
describe('Authentication Route Tests', () => {
    beforeAll(async ()=> {
        await db.sync({ force: true });
        
    })

   

    const userData = {
            
        first_name : "James",
        last_name: "Doe",
        username : "jon",
        email : "james@gmail.com",
        phone_number: "08090605680",
        password: "123456",
        date_of_birth: "08/05/1998",
        gender: "male"
   
}
    //test case
    it('should successfully register a user', async () => {
        const response = await supertest(app)
        .post('/api/auth/signup')
        .set('content-type', 'application/json')
        .send(userData)

        // expectations
    const user = await UserModel.findOne({ where: { username: 'jon' } });
        // expect(response.statusCode).toEqual(201);

    expect(user).toBeTruthy(); // User should exist in the databaseS
    // Verify that the password is hashed
    expect(user.password).not.toBe(userData.password);
   
    })

    it('should successfully login a user', async() => {
        
        const response = await supertest(app)
        .post('/api/auth/login')
        .set('content-type', 'application/json')
        .send({
        email : "james@gmail.com",
         password: "123456"});


         //expectations
            expect(response.status).toEqual(200);
            expect(response.body).toHaveProperty('message', 'Login successful')

            expect(response.body.user.first_name).toEqual('James');
            expect(response.body.user.email).toEqual('james@gmail.com');

    })

    it('should not successfully login a user, when user does not exist', async()=>{
        const response = await supertest(app)
        .post('/api/auth/login')
        .set('content-type', 'application/json')
        .send({
        email : "jas@gmail.com",
         password: "123456"});


         //expectations
            expect(response.status).toEqual(404);
            expect(response.body).toHaveProperty( 'msg', 'user does not exist')

        
    })

    afterAll(async ()=> {
        await db.close()
    })


});