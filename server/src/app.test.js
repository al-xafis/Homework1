const { app } = require("./app");
const request = require("supertest");
const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.disconnect();
  await mongoose.connect("mongodb://localhost:27017/testhw");
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("app", () => {
  describe("POST /register", () => {
    describe("POST: when the all fields are provided", () => {
      it("should return user object", async () => {
        const resp = await request(app).post("/register").send({
          username: "Margaret",
          password: "sicko",
          age: 24,
          role: "ADMIN",
        });

        expect(resp.status).toBe(201);
        expect(resp.body).toMatchObject({
          username: "Margaret",
          password: expect.any(String),
          age: 24,
          role: "ADMIN",
        });
      });
    });
    describe("POST: when the all fields are provided", () => {
      it("should user object", async () => {
        const resp = await request(app).post("/register").send({
          username: "Margareto",
          password: "sicko",
          role: "ADMIN",
        });

        expect(resp.status).toBe(400);
        expect(resp.body._message).toEqual("User validation failed");
      });
    });
  });

  let token = null;

  describe("POST /login", () => {
    describe("POST: when the username and password is valid", () => {
      it("should return username and token", async () => {
        const resp = await request(app)
          .post("/login")
          .send({ username: "Margaret", password: "sicko" });

        expect(resp.status).toBe(200);
        expect(resp.body.username).toEqual("Margaret");
        expect(resp.body.token).toEqual(expect.any(String));
        token = resp.body.token;
      });
    });

    describe("POST: when the username or password is invalid", () => {
      it("should return error in login", async () => {
        const resp = await request(app)
          .post("/login")
          .send({ username: "Noexist", password: "sicko" });

        expect(resp.status).toBe(401);
        expect(resp.body.message).toEqual("Error in login");
      });
    });
  });

  describe("GET /users", () => {
    describe("GET: when the user role is ADMIN", () => {
      it("should list the users", async () => {
        const resp = await request(app)
          .get("/users")
          .set({ Authorization: token });

        expect(resp.status).toBe(200);
      });
    });

    describe("GET: when the user role is NOT ADMIN", () => {
      it("should return error", async () => {
        const resp = await request(app)
          .get("/users")
          .set({ Authorization: "5asdfo42kt0ka0g-4" });

        expect(resp.status).toBe(401);
      });
    });
  });
});
