const app = require("../app");
const supertest = require("supertest");
const { db }= require("../db");
const { UserModel } = require("../User/userModel")




describe('Posts Route Test /api/posts', () => {
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

    // before eunning new tests kindly change post_id
    it("should create a post /api/posts/create-post", async () => {
      const response = await supertest(app).post("/api/posts/create-post")
      .set('authorization', `Bearer ${token}`)
      .set('content-type', 'application/json')
      .send({
        title: "Post title",
        content: "Post content",
      });
      expect(response.statusCode).toBe(201);
      expect(response.body.title).toBe("Post title");
    });
  
    it('should return a list of posts /api/posts/ ', async () => {
      const response = await supertest(app).get(
        "/api/posts/"
      );
    console.log(response)
      expect(response.statusCode).toBe(200);
     
    });

    it("should return a single post /api/posts/:id", async () => {
      const response = await supertest(app).get(
        "/api/posts/36"
      );
      console.log(response);
      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe("Post title");
    });

    
    it('should return 404 if post is not found, /api/posts/:id', async()=>{
      const response = await supertest(app)
      .post('/api/posts/199')
      .set('content-type', 'application/json')
      
      //expectations
          expect(response.status).toEqual(404);
       });
  

    it('should be able to edit(update) a post /api/posts/edit-post/:id', async()=> {
      const response = await supertest(app).patch("/api/posts/edit-post/36")
      .set('authorization', `Bearer ${token}`)
      .set('content-type', 'application/json')
      .send({  title: "Post title",
        content:"What a world"
      });
      expect(response.statusCode).toBe(200);
    
      expect(response.body).toHaveProperty( "message", "Post updated successfully.")
    });

    it('should be able to delete a post /api/posts/:id', async()=> {
      const response = await supertest(app).delete("/api/posts/36")
      .set('authorization', `Bearer ${token}`)
      .set('content-type', 'application/json')
      expect(response.statusCode).toBe(200);
    
      expect(response.body).toHaveProperty( "message", "Post deleted successfully.")
    });
   
   
    afterAll(async () => {
        await db.close()
    })
  
  });
















