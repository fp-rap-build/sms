import { User } from "../../models/user.model";

import { Seeds } from "../../seeds/seeds";

import { MongoMemoryServer } from "mongodb-memory-server";

import mongoose from "mongoose";

beforeAll(async () => {
  let mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri());
});

beforeEach(async () => {
  await Seeds();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("findUserByEmailOrCreate", () => {
  describe("given the user does not exist", () => {
    it("should create a new user and return it", async () => {
      let user = await User.findOne({ email: "idontexist@gmail.com" });

      expect(user).toBeNull();

      let newUser = await User.findUserByEmailOrCreate("idontexist@gmail.com");

      // @ts-ignore
      expect(newUser.email).toBe("idontexist@gmail.com");
    });
  });

  describe("given the user does exist", () => {
    it("should find the user and return it", async () => {
      let existingUser = await User.findOne({ email: "guest@gmail.com" });

      expect(existingUser).toBeTruthy();

      let user = await User.findUserByEmailOrCreate("guest@gmail.com");

      expect(user).toEqual(existingUser);
    });
  });
});
