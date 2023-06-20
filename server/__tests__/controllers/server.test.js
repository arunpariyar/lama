const request = require("supertest")
const app = require("../../index");
const mongoose = require("../../models/index") 


describe("Tests for the user route ", () => {
  beforeAll(async () => {
    await mongoose.connect(`mongodb://127.0.0.1:27017/lama_test`);
  });
  // happy case
  test("Test to ensure that /user returns a valid user", async () => {
    const response = await request(app).get("/user/648b0e29c6bbb6626513933b");
    expect(response.body.name).toBe("newlama");
    expect(response.body.email).toBe("newlama@dispostable.com");
    expect(response.body._id).toBe("648b0e29c6bbb6626513933b");
  });   
  //unhappy case
    test("Test to ensure error response for a non existant user", async () => {
      const response = await request(app).get("/user/wrongcall");
      expect(response.body.message).toBe(
        "user doesnot exist in the database"
      );
    }); 

    afterAll(async()=>{
     await  mongoose.connection.close()
    })
  });