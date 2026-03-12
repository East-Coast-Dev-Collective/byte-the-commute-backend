import db from "./client.js";
import { locations, users, userSettings } from "./dummyData.js";
import { createUser, createUserSettings } from "./queries/users.js";
import { createLocation } from "./queries/locations.js";


await db.connect();
console.log("Connected to database.");
await seed();
await db.end();
console.log("Database seeded.");


const seed = async () => {
  locations.forEach((each) => {
    createLocation(each);
  });
  
  users.forEach((each) => {
    createUser(each);
  });
  
  userSettings.forEach((each) => {
    createUserSettings(each);
  });

}
