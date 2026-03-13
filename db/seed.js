import db from "./client.js";
import { locations, users, userSettings } from "./dummyData.js";
import { createUser, createUserSettings } from "./queries/users.js";
import { createLocation } from "./queries/locations.js";

const seed = async () => {
  for (const each of locations) {
    await createLocation(each);
  }

  for (const each of users) {
    await createUser(each);
  }

  for (const each of userSettings) {
    await createUserSettings(each);
  };
}


await db.connect();
console.log("Connected to database.");
await seed();
await db.end();
console.log("Database seeded.");

