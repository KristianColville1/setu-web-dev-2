import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const HASH_ALGO = "sha256";
const SALT_LENGTH = 16;
const ITERATIONS = 100000;
const KEYLEN = 64;
const SECRET = process.env.PASSWORD_SECRET || "default_secret_key";

/**
 * Generates a salted hash for a password.
 */
export function hashPassword(password) {
  const salt = crypto.randomBytes(SALT_LENGTH).toString("hex");
  const hash = crypto.pbkdf2Sync(
    password + SECRET,
    salt,
    ITERATIONS,
    KEYLEN,
    HASH_ALGO
  ).toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Verifies a password against a salted hash.
 */
export function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  const hashVerify = crypto.pbkdf2Sync(
    password + SECRET,
    salt,
    ITERATIONS,
    KEYLEN,
    HASH_ALGO
  ).toString("hex");
  return hash === hashVerify;
}
