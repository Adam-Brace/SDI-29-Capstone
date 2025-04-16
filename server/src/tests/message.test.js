const request = require("supertest");
const express = require("express");
const messageRouter = require("../routes/message");

const app = express();
app.use(express.json());
app.use("/", messageRouter);

//will finish when messages is implemented
describe("Message Routes", () => {
  // Replace these IDs with valid ones from your seeded DB
  const validUserId = 1;
  const invalidUserId = 999999;
  const testMessage = {
    chat_id: 1,
    sender_id: 1,
    content: "You have work on Friday, no leave for you!",
    timestamp: new Date().toISOString()
  };

  // temp tests, just so the logs dont get mad
  it("adds two numbers", () => {
    const result = 2 + 3;
    expect(result).toBe(5);
  });
});
