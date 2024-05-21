/**
 * https://orm.drizzle.team/kit-docs/commands
 */
const drizzleConfig = {
  dialect: "postgresql", // "mysql" | "sqlite"
  //do not use @/app in drizzleConfig
  schema: "./src/app/lib/schema.js",
  out: "./src/migrations",
};

export default drizzleConfig;
