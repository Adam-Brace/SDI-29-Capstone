const request = require("supertest");
const express = require("express");
const eventsRouter = require("../routes/events");

const app = express();
app.use(express.json());
app.use("/", eventsRouter);

describe("Events API", () => {
  it("GET /raw returns all events", async () => {
    const res = await request(app).get("/raw");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /raw/:id returns a single event", async () => {
    const res = await request(app).get("/raw/1");
    expect([200, 404]).toContain(res.statusCode);
  });

  it("GET /schedule/ returns users with events", async () => {
    const res = await request(app).get("/schedule/");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /schedule/:id returns user schedule", async () => {
    const res = await request(app).get("/schedule/1");
    expect([200, 404]).toContain(res.statusCode);
  });

  it("PATCH /:id updates an event", async () => {
    const res = await request(app).patch("/1").send({
      startDate: "2025-04-15",
      endDate: "2025-04-21",
      title: "Sick Leave",
      description: "Leave",
      bgColor: "#00FF00",
      user_message: "It looks like I'm taking sick leave now!"
    });
    expect([200, 404]).toContain(res.statusCode);
  });

  it("DELETE /:id deletes an event", async () => {
    const res = await request(app).delete("/1");
    expect([200, 404]).toContain(res.statusCode);
  });

  it("POST /:id/user-message updates user message", async () => {
    const res = await request(app).post("/1/user-message").send({
      message: "I put something rude, now it's a nice message!",
    });
    expect([200, 404]).toContain(res.statusCode);
  });

  it("DELETE /:id/user-message clears user message", async () => {
    const res = await request(app).delete("/1/user-message");
    expect([200, 404]).toContain(res.statusCode);
  });
});
