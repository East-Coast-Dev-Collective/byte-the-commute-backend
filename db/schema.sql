DROP TABLE IF EXISTS user_settings;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS locations;


CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  address_text TEXT UNIQUE NOT NULL,
  label TEXT,
  google_place_id TEXT,
  lat FLOAT,
  lon FLOAT
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);


CREATE TABLE user_settings (
  user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  default_start_id INTEGER REFERENCES locations(id) ON DELETE SET NULL,
  default_end_id INTEGER REFERENCES locations(id) ON DELETE SET NULL,
  default_mode TEXT,
  avoid_tolls BOOLEAN
);
