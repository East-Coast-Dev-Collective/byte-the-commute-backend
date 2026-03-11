DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS locations;


CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  location TEXT UNIQUE NOT NULL
)

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  default_start_id INTEGER REFERENCES locations(id),
  default_end_id INTEGER REFERENCES locations(id)
);

