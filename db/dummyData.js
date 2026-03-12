
export const locations = [
  {
    id: 1,
    address_text: "1600 Pennsylvania Ave NW, Washington, DC 20500",
    label: "White House",
    google_place_id: "ChIJGVtI4by3t4kRr51d_Qm_x58",
    lat: 38.8977,
    lon: -77.0365
  },
  {
    id: 2,
    address_text: "2 15th St NW, Washington, DC 20024",
    label: "Washington Monument",
    google_place_id: "ChIJyX2K0e-3t4kR0Z0Z2Z6e0",
    lat: 38.8895,
    lon: -77.0353
  },
  {
    id: 3,
    address_text: "Lincoln Memorial Cir NW, Washington, DC 20002",
    label: "Lincoln Memorial",
    google_place_id: "ChIJVVVVVXe3t4kR0X8O7Jk9n3B",
    lat: 38.8893,
    lon: -77.0502
  },
  {
    id: 4,
    address_text: "600 Independence Ave SW, Washington, DC 20560",
    label: "National Air and Space Museum",
    google_place_id: "ChIJn8G3IBy3t4kRZ2lQ5d3m1sQ",
    lat: 38.8882,
    lon: -77.0199
  },
  {
    id: 5,
    address_text: "1 First St NE, Washington, DC 20543",
    label: "Supreme Court",
    google_place_id: "ChIJd5J5fFu3t4kRZ2D9gG6nX6E",
    lat: 38.8899,
    lon: -77.0047
  }
];

export const users = [
  {
    id: 1,
    username: "alice",
    password: "password_hash_alice"
  },
  {
    id: 2,
    username: "bob",
    password: "password_hash_bob"
  },
  {
    id: 3,
    username: "charlie",
    password: "password_hash_charlie"
  }
];

export const userSettings = [
  {
    user_id: 1,
    default_start_id: 1,
    default_end_id: 3,
    default_mode: "drive",
    avoid_tolls: true
  },
  {
    user_id: 2,
    default_start_id: 4,
    default_end_id: 2,
    default_mode: "bike",
    avoid_tolls: false
  },
  {
    user_id: 3,
    default_start_id: 5,
    default_end_id: 1,
    default_mode: "walk",
    avoid_tolls: false
  }
];
