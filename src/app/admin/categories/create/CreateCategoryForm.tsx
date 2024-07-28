"use client";
import React, { useState } from "react";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCategory } from "@/actions/CategoriesActions";
import { toast } from "sonner";
import Loader from "@/components/Loader";

export const AddCategorySchema = z.object({
  title: z.string().min(2, { message: "Insérez 2 caractères minimum" }),
  description: z
    .string()
    .min(2, { message: "Insérez 2 caractères minimum" })
    .max(256, { message: "Limite de caractères atteinte (256)" }),
});

export type TAddCategorySchema = z.infer<typeof AddCategorySchema>;

function CreateCategoryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TAddCategorySchema>({ resolver: zodResolver(AddCategorySchema) });
  const [isLoading, setIsLoading] = useState(false);

  async function submitHandler(data: TAddCategorySchema) {
    setIsLoading(true);
    CreateCategory(data)
      .then((res) =>
        window.location.replace(`/admin/categories/${res?.replace(/"/g, "")}`),
      )
      .catch((e) => toast.error(`Une erreur est survenue: ${e.message}`))
      .finally(() => setIsLoading(false));
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      {isLoading && <Loader />}
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="mx-auto grid w-full flex-1 auto-rows-max gap-4"
      >
        <div className="flex items-center gap-4">
          <Link href={"/admin/categories"}>
            <Button variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Ajouter une Catégories
          </h1>
          <Badge variant="outline" className="ml-auto sm:ml-0">
            NEW !
          </Badge>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Link href={"/admin/categories"}>
              <Button variant="outline" size="sm">
                Annuler
              </Button>
            </Link>
            <Button type="submit" size="sm" disabled={isSubmitting}>
              Sauvegarder
            </Button>
          </div>
        </div>
        {/*<div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">*/}
        <div>
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader>
                <CardTitle>Détails de la Catégorie</CardTitle>
                <CardDescription>
                  Remplissez les informations ci-dessous avec soin pour garantir
                  une expérience optimale pour vos utilisateurs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Nom</Label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      placeholder={"Festival d'été"}
                      {...register("title")}
                    />
                    {errors.title && (
                      <span className="text-red-500 text-xs">
                        {errors.title.message}
                      </span>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder={
                        "Merci de fournir toutes les informations nécessaires pour que votre Catégorie soit un succès sur Evenlify. Si vous avez des questions ou avez besoin d'assistance, veuillez contacter notre équipe de support technique."
                      }
                      // maxLength={256}
                      className="min-h-32"
                      {...register("description")}
                    />
                    {errors.description && (
                      <span className="text-red-500 text-xs">
                        {errors.description.message}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Link href={"/admin/categories"}>
            <Button variant="outline" size="sm">
              Annuler
            </Button>
          </Link>
          <Button type="submit" size="sm" disabled={isSubmitting}>
            Sauvegarder
          </Button>
        </div>
      </form>
    </main>
  );
}

export default CreateCategoryForm;
