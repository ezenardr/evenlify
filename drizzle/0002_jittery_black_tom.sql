CREATE TABLE IF NOT EXISTS "categories" (
	"category_id" uuid PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "categories_category_id_unique" UNIQUE("category_id"),
	CONSTRAINT "categories_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "images" (
	"image_id" uuid PRIMARY KEY NOT NULL,
	"field_id" uuid NOT NULL,
	"image_url" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "images_image_id_unique" UNIQUE("image_id"),
	CONSTRAINT "images_image_url_unique" UNIQUE("image_url")
);
