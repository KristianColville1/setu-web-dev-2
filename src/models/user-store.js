import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { hashPassword, verifyPassword } from "../utils/password-utils.js";

const db = initStore("users");

export const userStore = {
  /**
   * Retrieves all users from the store.
   */
  async getAllUsers() {
    await db.read();
    return db.data.users;
  },

  /**
   * Adds a new user to the store and returns the user.
   * Password is hashed before storing.
   */
  async addUser(user) {
    await db.read();
    user._id = v4();
    user.password = hashPassword(user.password);
    db.data.users.push(user);
    await db.write();
    return user;
  },

  /**
   * Retrieves a user by their ID.
   */
  async getUserById(id) {
    await db.read();
    return db.data.users.find((user) => user._id === id);
  },

  /**
   * Retrieves a user by their email address.
   */
  async getUserByEmail(email) {
    await db.read();
    return db.data.users.find((user) => user.email === email);
  },

  /**
   * Deletes a user by their ID.
   */
  async deleteUserById(id) {
    await db.read();
    const index = db.data.users.findIndex((user) => user._id === id);
    db.data.users.splice(index, 1);
    await db.write();
  },

  /**
   * Updates an existing user's information.
   * If password is changed, hash it.
   */
  async updateUser(user) {
    await db.read();
    const index = db.data.users.findIndex((u) => u._id === user._id);
    if (index !== -1) {
      // Only hash if password is not already hashed (using ':')
      if (user.password && !user.password.includes(":")) {
        user.password = hashPassword(user.password);
      }
      db.data.users[index] = user;
      await db.write();
    }
  },

  /**
   * Deletes all users from the store.
   */
  async deleteAll() {
    db.data.users = [];
    await db.write();
  },

  /**
   * Verifies a user's password by email.
   */
  async verifyUserPassword(email, password) {
    await db.read();
    const user = db.data.users.find((u) => u.email === email);
    console.log("Verifying password for user:", user);
    if (!user) return false;
    // If the stored password does not contain ':', treat as plain text
    if (user.password && !user.password.includes(":")) {
      console.log("Treating password as plain text");
      return password === user.password;
    }
    return verifyPassword(password, user.password);
  },
};
