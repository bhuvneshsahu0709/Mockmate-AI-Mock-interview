/** @type {import("drizzle-kit").Config} */
export default {
  schema: "./utils/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: "ep-little-morning-a4nni6l0-pooler.us-east-1.aws.neon.tech",
    port: 5432,
    user: "neondb_owner",
    password: "npg_w8Knv6ZuXoxD",
    database: "neondb",
    ssl: true
  },
};
