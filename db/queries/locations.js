import db from "../client.js";

export const createLocation = async ({ addressText, label, lat, lon, googlePlaceId }) => {
  const sql = `
  INSERT INTO locations (address_text, label, lat, lon, google_place_id)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `;
  try {
    const { rows: [location] } = await db.query(sql, [addressText, label, lat, lon, googlePlaceId]);
    return location;
  } catch (err) {
    console.error('error in query: ', err);
    throw err;
  }
}

export const getLocationById = async (locationId) => {
  const sql = `
  SELECT * FROM locations WHERE id = $1;
  `;
  try {
    const { rows: [location] } = await db.query(sql, [locationId]);
    return location;
  } catch (err) {
    console.error('error in query: ', err);
    throw err;
  }
}
