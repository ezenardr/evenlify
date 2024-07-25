import React from "react";
import type { Metadata } from "next";
import CreateCategoryForm from "@/app/admin/categories/create/CreateCategoryForm";

export const metadata: Metadata = {
  title: "Ajouter une Catégories - Evenlify",
};

function AdminCreateCategory() {
  return <CreateCategoryForm />;
}

export default AdminCreateCategory;
