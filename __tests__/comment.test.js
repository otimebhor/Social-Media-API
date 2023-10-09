const app = require("../app");
const supertest = require("supertest");
const { db }= require("../db");
const { UserModel } = require("../User/userModel")



    let token;
    beforeAll(async()=> {
        await db.sync({ force: true })
    })
    beforeEach(async ()=> {
  
    // login user
    const response = await supertest(app)
    .post('/api/auth/login')
    .set('content-type', 'application/json')
    .send({
    email : "james@gmail.com",
     password: "123456"});

     token = response.body.token


    })

    afterAll(async () => {
      await db.close()
  })

  describe("POST /api/comments/:post_id", () => {
    it("should create a new comment ", async () => {
      const response = await supertest(app).post("/api/comments/32")
      .set('authorization', `Bearer ${token}`)
      .set('content-type', 'application/json')
      .send({
        content: "New comment",
      });
      expect(response.statusCode).toBe(201);
      expect(response.body.comment.content).toBe("New comment");
    });
  });

  
  describe("GET /api/comments/:post_id", () => {
    it('should return all comments on a post ', async () => {
      const response = await supertest(app).get(
        "/api/comments/32"
      );

      console.log(response)
      expect(response.statusCode).toBe(200);
     
    });
  });

  // before new running tests, kindly change the comment_id

  describe("PATCH /api/comments/edit-comment/:post_id/:comment_id", () => {
    it("should edit a comment on a post ", async () => {
      const response = await supertest(app)
      .patch("/api/comments/edit-comment/32/3") 
      .set('authorization', `Bearer ${token}`)
      .set('content-type', 'application/json')
      .send({content:"Updated comment"})
  
    
      expect(response.body).toHaveProperty( "message", "Comment updated successfully.")
      expect(response.statusCode).toBe(200);
  
    });
  });
    

  

describe("DELETE /api/comments/delete-comment/:post_id/:comment_id", () => {
      it('should be able to delete a comment', async()=> {
      const response = await supertest(app).delete("/api/comments/delete-comment/32/3")
      .set('authorization', `Bearer ${token}`)
      .set('content-type', 'application/json')
      console.log(response)
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty( "message", "Comment deleted successfully.")
    });

})

  
   
   
  
  
 
















