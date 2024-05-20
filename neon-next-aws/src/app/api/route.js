import { NextResponse } from "next/server";
import { Config } from "sst/node/config";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const fetchCache = "force-no-store";
export const revalidate = 0;

/** This can be viewed in the browser at http://localhost:3000/api */
export async function GET(request) {
  const secretVal = Config.SECRET_VAL;
  const dbString = Config.DATABASE_URL;
  const stage = Config.STAGE;
  return NextResponse.json(
    { hello: "world", stage, dbString: `${dbString}`.slice(0, 25), secretVal },
    { status: 200 }
  );
}
