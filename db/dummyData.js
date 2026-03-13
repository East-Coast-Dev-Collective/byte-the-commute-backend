
export const locations = [
  {
    id: 1,
    addressText: "1600 Pennsylvania Ave NW, Washington, DC 20500",
    label: "White House",
    googlePlaceId: "ChIJGVtI4by3t4kRr51d_Qm_x58",
    lat: 38.8977,
    lon: -77.0365
  },
  {
    id: 2,
    addressText: "2 15th St NW, Washington, DC 20024",
    label: "Washington Monument",
    googlePlaceId: "ChIJyX2K0e-3t4kR0Z0Z2Z6e0",
    lat: 38.8895,
    lon: -77.0353
  },
  {
    id: 3,
    addressText: "Lincoln Memorial Cir NW, Washington, DC 20002",
    label: "Lincoln Memorial",
    googlePlaceId: "ChIJVVVVVXe3t4kR0X8O7Jk9n3B",
    lat: 38.8893,
    lon: -77.0502
  },
  {
    id: 4,
    addressText: "600 Independence Ave SW, Washington, DC 20560",
    label: "National Air and Space Museum",
    googlePlaceId: "ChIJn8G3IBy3t4kRZ2lQ5d3m1sQ",
    lat: 38.8882,
    lon: -77.0199
  },
  {
    id: 5,
    addressText: "1 First St NE, Washington, DC 20543",
    label: "Supreme Court",
    googlePlaceId: "ChIJd5J5fFu3t4kRZ2D9gG6nX6E",
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
    userId: 1,
    defaultStartId: 1,
    defaultEndId: 3,
    defaultMode: "drive",
    avoidTolls: true
  },
  {
    userId: 2,
    defaultStartId: 4,
    defaultEndId: 2,
    defaultMode: "bike",
    avoidTolls: false
  },
  {
    userId: 3,
    defaultStartId: 5,
    defaultEndId: 1,
    defaultMode: "walk",
    avoidTolls: false
  }
];
