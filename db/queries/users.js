import bcrypt from "bcrypt";
import db from "../client.js";

export const createUser = async ({ username, password }) => {
  const sql = `
  INSERT INTO users (username, password)
  VALUES ($1, $2)
  RETURNING *;
  `;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows: [user] } = await db.query(sql, [username, hashedPassword]);
    return user;
  } catch (err) {
    console.error('error in query: ', err);
    throw err;
  }
};

export const getUserById = async (userId) => {
  const sql = `
  SELECT * FROM users WHERE id = $1;
  `;
  try {
    const { rows: [user] } = await db.query(sql, [userId]);
    return user;
  } catch (err) {
    console.error('error in query: ', err);
    throw err;
  }
};


export const getUserByUsernamePassword = async ({ username, password }) => {
  /**
   * Use this function to validate that the correct password was used.
   **/
  const sql = `
  SELECT * FROM users WHERE username = $1;
  `;
  try {
    const { rows: [user] } = await db.query(sql, [username]);
    if (!user) {
      return null;
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return null;
    }

    return user;
  } catch (err) {
    console.error('error in query: ', err);
    throw err;
  }
};

export const createUserSettings = async ({ userId, defaultStartId, defaultEndId, defaultMode, avoidTolls }) => {
  const sql = `
  INSERT INTO user_settings (user_id, default_start_id, default_end_id, default_mode, avoid_tolls)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `;
  try {
    const { rows: [userSettings] } = await db.query(sql, [userId, defaultStartId, defaultEndId, defaultMode, avoidTolls]);
    return userSettings;
  } catch (err) {
    console.error('error in query: ', err);
    throw err;
  }
};
