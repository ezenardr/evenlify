import React from "react";
import CreateEventForm from "@/app/admin/events/create/CreateEventForm";
import { type Metadata } from "next";
import { database } from "@/database/databaseConnection";
import { categories } from "@/database/schema";

export const metadata: Metadata = {
  title: "Ajouter un événements - Evenlify",
};

async function AdminCreateEvent() {
  const categoryList = await database.select().from(categories);
  return <CreateEventForm categoryList={categoryList} />;
}

export default AdminCreateEvent;
