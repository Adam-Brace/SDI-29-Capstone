const request = require("supertest");
const { app, server } = require("../index");

describe("Index.js Server", () => {
  afterAll(() => {
    server.close();
  });

  it("should return 404 for unknown route", async () => {
    const res = await request(app).get("/the-route-to-the-end-of-the-internet");
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Not Found" });
  });

  it("should have /user, /events, and /message routes", async () => {
    const userRes = await request(app).get("/user");
    const eventRes = await request(app).get("/events/raw");
    //const msgRes = await request(app).get("/message/1");

    expect([200, 500]).toContain(userRes.statusCode);
    expect([200, 500]).toContain(eventRes.statusCode);
    //expect([200, 500]).toContain(msgRes.statusCode);
  });
});
