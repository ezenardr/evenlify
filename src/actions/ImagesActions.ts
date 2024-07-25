"use server";
import { v4 as uuid } from "uuid";
import { database } from "@/database/databaseConnection";
import { images } from "@/database/schema";
import { revalidatePath } from "next/cache";
import { supabaseClient } from "@/lib/supabase";
import { eq } from "drizzle-orm";

export async function UploadCategoryImageUrl(
  image_url: string,
  field_id: string,
  image_name: string,
) {
  await database.insert(images).values({
    image_id: uuid(),
    field_id,
    image_url,
    image_name,
  });
  revalidatePath(`/admin/categories/${field_id}`);
}

export async function DeleteCategoryUrl(
  image_id: string,
  image_name: string,
  field_id: string,
) {
  await supabaseClient.storage
    .from("images")
    .remove([`categories/${field_id}/${image_name}`]);
  await database.delete(images).where(eq(images.image_id, image_id));
  revalidatePath(`/admin/categories/${field_id}`);
}

export async function DeleteCategoryImages(field_id: string) {
  const list = await supabaseClient.storage
    .from("images")
    .list(`categories/${field_id}`);
  const filesToRemove = list.data?.map(
    (file) => `categories/${field_id}/${file.name}`,
  );
  filesToRemove &&
    (await supabaseClient.storage.from("images").remove(filesToRemove));
}
