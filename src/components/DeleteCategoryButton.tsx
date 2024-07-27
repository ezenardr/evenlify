"use client";
import React from "react";
import { DeleteCategory } from "@/actions/CategoriesActions";
import { DeleteImages } from "@/actions/ImagesActions";
import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

function DeleteCategoryButton({ category_id }: { category_id: string }) {
  return (
    <AlertDialogAction
      className={"bg-[#d11a2a]"}
      onClick={() => {
        DeleteImages(category_id, "categories").then(() =>
          toast.success("Images Supprimé"),
        );
        DeleteCategory(category_id).then(() =>
          toast.success("Catégorie Supprimé"),
        );
      }}
    >
      Supprimer
    </AlertDialogAction>
  );
}

export default DeleteCategoryButton;
