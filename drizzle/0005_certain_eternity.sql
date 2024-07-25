CREATE TABLE IF NOT EXISTS "events" (
	"event_id" uuid PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"location" varchar NOT NULL,
	"date" timestamp NOT NULL,
	"normal_price" numeric NOT NULL,
	"vip_price" numeric NOT NULL,
	"user_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"status" varchar DEFAULT 'archived' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "events_event_id_unique" UNIQUE("event_id"),
	CONSTRAINT "events_title_unique" UNIQUE("title")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events" ADD CONSTRAINT "events_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events" ADD CONSTRAINT "events_category_id_categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("category_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
