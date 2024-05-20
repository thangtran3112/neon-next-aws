import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";

import * as schema from "../lib/schema";
import getSecret from "../lib/secrets";

import ws from "ws";

/**
 * This Script file will be run individually with `tsx` under package.json
 * so we cannot use absolute import '@/app', which only for nextjs
 * */

async function performMigration() {
  // Alternatively, we can use Neon PoolConnection string instead for more concurrency
  const dbUrl = await getSecret("DATABASE_URL");
  if (!dbUrl) {
    return;
  }
  // connect to Neon via websocket
  // see https://github.com/neondatabase/serverless/blob/main/README.md#example-nodejs-with-poolconnect
  neonConfig.webSocketConstructor = ws;

  //see https://orm.drizzle.team/docs/get-started-postgresql#neon
  const pool = new Pool({ connectionString: dbUrl });
  pool.on("error", (err) => console.error(err)); // deal with e.g. re-connect

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const db = drizzle(client, { schema });
    await migrate(db, { migrationsFolder: "src/migrations" });
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }

  await pool.end();
}

if (require.main === module) {
  console.log("Running migrations");

  performMigration()
    .then((val) => {
      console.log("Migration performed successfully");
      process.exit(0);
    })
    .catch((err) => {
      console.log("err", err);
      process.exit(1);
    });
}

// Testing getSecret from AWS Parameter Store
// getSecret("DATABASE_URL")
//   .then((val) => {
//     console.log(`Database URL: ${val.slice(0, 25)}`);
//   })
//   .catch((err) => {
//     console.error(`error: ${err}`);
//   });
