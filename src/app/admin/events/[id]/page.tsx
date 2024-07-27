import React from "react";
import { database } from "@/database/databaseConnection";
import { categories, events, images } from "@/database/schema";
import { eq } from "drizzle-orm";
import EditEventForm from "@/app/admin/events/[id]/EditEventForm";

async function Page({ params }: { params: { id: string } }) {
  const event = await database
    .select()
    .from(events)
    .where(eq(events.event_id, params.id));
  const categoryList = await database.select().from(categories);
  const eventImages = await database
    .select()
    .from(images)
    .where(eq(images.field_id, params.id));
  return (
    <EditEventForm
      categoryList={categoryList}
      event={event[0]}
      eventImages={eventImages}
    />
  );
}

export default Page;
