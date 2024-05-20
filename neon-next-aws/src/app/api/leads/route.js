import { NextResponse } from "next/server";
import { z as zod } from "zod";
import { fromZodError } from "zod-validation-error";

import * as db from "@/app/lib/db";
import * as schema from "@/app/lib/schema";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function POST(request) {
  const contentType = request.headers.get("content-type");
  if (contentType !== "application/json") {
    return NextResponse.json({ message: "Invalid Request" }, { status: 415 });
  }
  const data = await request.json();
  let parsedData = {};
  try {
    parsedData = schema.insertLeadTableSchema.parse(data);
  } catch (error) {
    if (error instanceof zod.ZodError) {
      const validationError = fromZodError(error);
      return NextResponse.json({ errorList: validationError }, { status: 400 });
    }
    return NextResponse.json({ message: "Some Server Error" }, { status: 500 });
  }
  const email = parsedData.email;
  // const isValidEmail = validator.isEmail(email);
  if (!isValidEmail) {
    return NextResponse.json(
      { message: "A valid email is required" },
      { status: 400 }
    );
  }

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  const leadResult = await db.addLead({ email });
  const dbNow = await db.dbNow();
  // const leadResult = await addLead({ email: "abc123@abc123.com" });
  const resultData = { leadResult, dbNow: dbNow };

  return NextResponse.json(resultData, { status: 201 });
}
