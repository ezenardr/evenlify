ALTER TABLE "events" ALTER COLUMN "normal_price" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "normal_ticket_amount" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "vip_price" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "vip_ticket_amount" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "vip_ticket_amount" SET DEFAULT '0';