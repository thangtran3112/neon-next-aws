import { neon, neonConfig } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/postgres-js/driver";
import { drizzle } from "drizzle-orm/neon-http";
import { Config } from "sst/node/config";

import * as schema from "@/app/lib/schema";

/**
 * Apart from migration, we will use Http client for CRUD operations instead of websocket
 */
export async function dbClient(useSQLOnly) {
  neonConfig.fetchConnectionCache = true;
  const sql = neon(Config.DATABASE_URL);
  if (useSQLOnly) {
    //neon SQL client
    return sql;
  }
  // drizle ORM client
  return drizzle(sql);
}

export async function dbNow() {
  const sql = await dbClient(true);
  return sql`SELECT NOW()`;
}

/**
 * addLead will isert a row into database through drizzle client
 * We can also use neon client directly through dbClient(true)
 */
export async function addLead({ email }) {
  const db = await dbClient(false);

  //https://orm.drizzle.team/docs/insert
  const dbResult = await db
    .insert(schema.LeadTable)
    .values({ email: email })
    .returning({ timestamp: schema.LeadTable.createdAt });
  if (dbResult.length === 1) {
    return dbResult[0].timestamp;
  }
  return;
}
