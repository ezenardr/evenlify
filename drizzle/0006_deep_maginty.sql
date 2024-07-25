ALTER TABLE "events" ADD COLUMN "normal_ticket_amount" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "vip_ticket_amount" integer DEFAULT 0 NOT NULL;