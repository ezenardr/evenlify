"use server";

import { TAddCategorySchema } from "@/app/admin/categories/create/CreateCategoryForm";
import { database } from "@/database/databaseConnection";
import { categories, images } from "@/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import auth from "@/lib/auth";
import { v4 as uuid } from "uuid";

export async function CreateCategory(data: TAddCategorySchema) {
  const session = await getServerSession(auth);
  if (session) {
    const newCategory = await database
      .insert(categories)
      .values({
        user_id: session?.user.user_id,
        category_id: uuid(),
        title: data.title,
        description: data.description,
      })
      .returning({ category_id: categories.category_id });
    return JSON.stringify(newCategory[0].category_id);
  }
}

export async function UpdateCategory(
  category_id: string,
  data: TAddCategorySchema,
) {
  await database
    .update(categories)
    .set({
      title: data.title,
      description: data.description,
    })
    .where(eq(categories.category_id, category_id));
  revalidatePath(`/admin/categories/${category_id}`);
}

export async function DeleteCategory(category_id: string) {
  await database
    .delete(categories)
    .where(eq(categories.category_id, category_id));
  await database.delete(images).where(eq(images.field_id, category_id));
  revalidatePath("/admin/categories");
}
