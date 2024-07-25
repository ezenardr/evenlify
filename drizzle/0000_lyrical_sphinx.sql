CREATE TABLE IF NOT EXISTS "users" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"phone" varchar(256),
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"has_accepted" boolean DEFAULT false NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
