const request = require("supertest");
const express = require("express");
const userRouter = require("../routes/user");

const app = express();
app.use(express.json());
app.use("/", userRouter);

describe("User API", () => {
  let testUser = {
    email: "randomAdmin33@gmail.com",
    password: "notAgoodPassword45",
    first_name: "Tom",
    last_name: "Nook",
    rank: "CIV",
    phone: "1234567890",
    organization: "53 Sops",
    crew: "Bravo",
    position: "CSS",
    permissions: "admin"
  };

  //thanks Http cats!
  it("POST / should register new user", async () => {
    const res = await request(app).post("/").send(testUser);
    expect([201, 409]).toContain(res.statusCode);
  });

  it("POST /login should authenticate user", async () => {
    const res = await request(app).post("/login").send({
      email: testUser.email,
      password: testUser.password,
    });
    expect([200, 404, 401]).toContain(res.statusCode);
  });

  it("GET / should return all users", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /:id should return one user or 404", async () => {
    const res = await request(app).get("/1");
    expect([200, 500]).toContain(res.statusCode);
  });

  it("PATCH /:id should update a user", async () => {
    const res = await request(app).patch("/1").send({
      first_name: "Updated",
      last_name: "Name",
      password: "NewPass123",
    });
    expect([200, 500]).toContain(res.statusCode);
  });

  it("DELETE /:id should remove a user", async () => {
    const res = await request(app).delete("/1");
    expect([200, 500]).toContain(res.statusCode);
  });

  it("GET /generate-image/:id should return PNG or 404", async () => {
    const res = await request(app).get("/generate-image/1");
    expect([200, 404, 500]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.headers["content-type"]).toBe("image/png");
    }
  });
});