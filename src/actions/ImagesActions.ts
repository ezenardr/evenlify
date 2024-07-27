"use server";
import { v4 as uuid } from "uuid";
import { database } from "@/database/databaseConnection";
import { images } from "@/database/schema";
import { revalidatePath } from "next/cache";
import { supabaseClient } from "@/lib/supabase";
import { eq } from "drizzle-orm";

export async function UploadImageUrl(
  image_url: string,
  field_id: string,
  image_name: string,
  field: string,
) {
  await database.insert(images).values({
    image_id: uuid(),
    field_id,
    image_url,
    image_name,
  });
  revalidatePath(`/admin/${field}/${field_id}`);
}

export async function DeleteUrl(
  image_id: string,
  image_name: string,
  field_id: string,
  field: string,
) {
  await supabaseClient.storage
    .from("images")
    .remove([`${field}/${field_id}/${image_name}`]);
  await database.delete(images).where(eq(images.image_id, image_id));
  revalidatePath(`/admin/${field}/${field_id}`);
}

export async function DeleteImages(field_id: string, field: string) {
  const list = await supabaseClient.storage
    .from("images")
    .list(`${field}/${field_id}`);
  const filesToRemove = list.data?.map(
    (file) => `${field}/${field_id}/${file.name}`,
  );
  filesToRemove &&
    (await supabaseClient.storage.from("images").remove(filesToRemove));
}
