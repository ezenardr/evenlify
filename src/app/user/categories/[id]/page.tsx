import React from "react";
import EditCategoryForm from "./EditCategoryForm";
import { database } from "@/database/databaseConnection";
import { categories, images } from "@/database/schema";
import { eq } from "drizzle-orm";
import { CircleAlert } from "lucide-react";

async function AdminEditCategory({ params }: { params: { id: string } }) {
  try {
    const category = await database
      .select()
      .from(categories)
      .where(eq(categories.category_id, params.id));
    const categorieImages = await database
      .select()
      .from(images)
      .where(eq(images.field_id, params.id));
    return (
      <EditCategoryForm
        category={category[0]}
        categorieImages={categorieImages}
      />
    );
  } catch (e) {
    return (
      <div className={"flex flex-col items-center w-full"}>
        <CircleAlert />
        <p>Aucun résultat</p>
      </div>
    );
  }
}

export default AdminEditCategory;
