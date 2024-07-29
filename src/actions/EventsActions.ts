// @ts-nocheck
"use server";
import { type TAddEventSchema } from "@/app/admin/events/create/CreateEventForm";
import { getServerSession } from "next-auth";
import auth from "@/lib/auth";
import { database } from "@/database/databaseConnection";
import { events, images } from "@/database/schema";
import { v4 as uuid } from "uuid";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function AddEvents(data: TAddEventSchema) {
  const session = await getServerSession(auth);
  if (session) {
    const newEvent = await database
      .insert(events)
      .values({
        event_id: uuid(),
        user_id: session?.user.user_id,
        title: data.title,
        description: data.description,
        location: data.location,
        category_id: data.category_id,
        date: data.date,
        normal_ticket_amount: data.normal_ticket_amount,
        normal_price: data.normal_price,
        vip_price: data.vip_price,
        vip_ticket_amount: data.vip_ticket_amount,
        status: data.status,
      })
      .returning({ event_id: events.event_id });
    revalidatePath("/admin/events");
    revalidatePath("/");
    revalidatePath("/events");
    revalidatePath(`/events/${newEvent[0].event_id}`);
    return JSON.stringify(newEvent[0].event_id);
  }
}

export async function UpdateEvent(data: TAddEventSchema, event_id: string) {
  await database
    .update(events)
    .set({
      title: data.title,
      description: data.description,
      location: data.location,
      category_id: data.category_id,
      date: data.date,
      normal_ticket_amount: data.normal_ticket_amount,
      normal_price: data.normal_price,
      vip_ticket_amount: data.vip_ticket_amount,
      vip_price: data.vip_price,
      status: data.status,
    })
    .where(eq(events.event_id, event_id));
  revalidatePath(`/admin/events/${event_id}`);
  revalidatePath("/admin/events");
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath(`/events/${event_id}`);
}

export async function DeleteEvent(event_id: string) {
  await database.delete(events).where(eq(events.event_id, event_id));
  await database.delete(images).where(eq(images.field_id, event_id));
  revalidatePath("/admin/events");
  revalidatePath("/");
  revalidatePath("/events");
}
