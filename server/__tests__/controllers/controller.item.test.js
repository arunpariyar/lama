const request = require("supertest"); 
const app = require("../../index"); 
const mongoose = require("../../models/index"); 


describe("Test for the item route", () => {

    beforeAll(async () => {
      await mongoose.connect(`mongodb://127.0.0.1:27017/lama_test`);
    });

    afterAll(async() => {
     await mongoose.connection.close();
    });

    test("tesing the post new item route", async ()=> {
        await request(app)
          .post("/item")
          .send({
            catId: "648b1790c6bbb6626513937b",
            title: "May I have this dance with you",
          })
          .expect(201); 
    })

    test("testing the get item route", async () => {
        await request(app).get("/item/6491eee7c523ce860053e0c0").expect(200)
    })

    

})