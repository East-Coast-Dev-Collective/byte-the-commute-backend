/**
 * Mock user data shape (in-memory only):
 * {
 *   userId: string,                  // unique user id from URL params
 *   name: string,                    // display name
 *   defaultFrom: string,             // default trip start location
 *   defaultTo: string,               // default trip destination
 *   savedLocations: string[],        // quick-select saved places
 *   recentRoutes: Array<{
 *     from: string,                  // route start
 *     to: string,                    // route end
 *     label: string                  // short UI label, ex: "Home -> Work"
 *   }>
 * }
 */

const mockUsers = [
  {
    userId: "1",
    name: "Test User",
    defaultFrom: "Home",
    defaultTo: "Work",
    savedLocations: ["Home", "Work", "Gym"],
    recentRoutes: [{ from: "Home", to: "Work", label: "Home -> Work" }],
  },
];

export default mockUsers;
