ALTER TABLE "leads" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "first_name" varchar(150);--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "last_name" varchar(150);