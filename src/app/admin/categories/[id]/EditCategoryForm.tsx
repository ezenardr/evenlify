"use client";
import React from "react";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CircleAlert, CircleX, Upload } from "lucide-react";
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
import type { Category, Image } from "@/database/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "@/components/Loader";
import { supabaseClient } from "@/lib/supabase";
import { DeleteUrl, UploadImageUrl } from "@/actions/ImagesActions";
import { toast } from "sonner";
import NextImage from "next/image";
import {
  AddCategorySchema,
  TAddCategorySchema,
} from "@/app/admin/categories/create/CreateCategoryForm";
import { UpdateCategory } from "@/actions/CategoriesActions";

function EditCategoryForm({
  categorieImages,
  category,
}: {
  category: Category;
  categorieImages: Image[];
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TAddCategorySchema>({
    defaultValues: {
      title: category.title,
      description: category.description,
    },
    resolver: zodResolver(AddCategorySchema),
  });
  const [isLoading, setIsLoading] = React.useState(false);

  async function uploadImage(file: File) {
    setIsLoading(true);
    const imageFile = file;
    try {
      const { data } = await supabaseClient.storage
        .from("images")
        .upload(
          `categories/${category.category_id}/${imageFile.name}`,
          imageFile,
        );
      if (data) {
        supabaseClient.storage
          .from("images")
          .createSignedUrl(data.path, 126227808)
          .then(({ data }) => {
            if (data) {
              UploadImageUrl(
                data.signedUrl,
                category.category_id,
                imageFile.name,
                "categories",
              ).catch((e) =>
                toast.error(`Une erreur est survenue : ${e.message}`),
              );
            }
          });
      }
    } catch (e: any) {
      toast.error(`Une erreur est survenue : ${e.message}`);
    }
    setIsLoading(false);
  }

  async function submitHandler(data: TAddCategorySchema) {
    setIsLoading(true);
    UpdateCategory(category.category_id, data).catch((e) =>
      toast.error(`Une erreur est survenue : ${e.message}`),
    );
    setIsLoading(false);
  }

  if (!category.title) {
    return (
      <div className={"flex flex-col items-center w-full"}>
        <CircleAlert />
        <p>Aucun résultat</p>
      </div>
    );
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      {isLoading && <Loader />}
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4"
      >
        <div className="flex items-center gap-4">
          <Link href={"/admin/categories"}>
            <Button variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Modifier la Categorie {category.title}
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
            <Button type={"submit"} disabled={isSubmitting} size="sm">
              Sauvegarder
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
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
                      maxLength={200}
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

          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Images de catégories</CardTitle>
                <CardDescription>
                  Chaque image reflète l&apos;ambiance et l&apos;énergie de vos
                  événements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {categorieImages.length > 0 ? (
                    <div className={"relative"}>
                      <NextImage
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src={categorieImages[0].image_url}
                        width="300"
                      />
                      <div
                        onClick={() => {
                          setIsLoading(true);
                          DeleteUrl(
                            categorieImages[0].image_id,
                            categorieImages[0].image_name,
                            categorieImages[0].field_id,
                            "categories",
                          ).then(() => setIsLoading(false));
                        }}
                        className={
                          "absolute -top-2 -right-2 bg-red-600 rounded-full p-1 hover:scale-110 transition-all cursor-pointer"
                        }
                      >
                        <CircleX color={"#fff"} />
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Upload</span>
                      <input
                        type={"file"}
                        accept={"image/*"}
                        className={
                          "absolute opacity-0 top-0 left-0 w-full h-full cursor-pointer"
                        }
                        onChange={(e) => {
                          if (e.target.files) {
                            uploadImage(e.target.files[0]).then(() =>
                              toast.success("Réussie"),
                            );
                          }
                        }}
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-2">
                    {categorieImages[1] && (
                      <div className={"relative"}>
                        <NextImage
                          alt="Product image"
                          className="aspect-square w-full rounded-md object-cover"
                          height="84"
                          src={categorieImages[1].image_url}
                          width="84"
                        />
                        <div
                          onClick={() => {
                            setIsLoading(true);
                            DeleteUrl(
                              categorieImages[1].image_id,
                              categorieImages[1].image_name,
                              categorieImages[1].field_id,
                              "categories",
                            ).then(() => setIsLoading(false));
                          }}
                          className={
                            "absolute -top-2 -right-2 bg-red-600 rounded-full p-1 hover:scale-110 transition-all cursor-pointer"
                          }
                        >
                          <CircleX color={"#fff"} />
                        </div>
                      </div>
                    )}
                    {categorieImages[2] && (
                      <div className={"relative"}>
                        <NextImage
                          alt="Product image"
                          className="aspect-square w-full rounded-md object-cover"
                          height="84"
                          src={categorieImages[2].image_url}
                          width="84"
                        />
                        <div
                          onClick={() => {
                            setIsLoading(true);
                            DeleteUrl(
                              categorieImages[2].image_id,
                              categorieImages[2].image_name,
                              categorieImages[2].field_id,
                              "categories",
                            ).then(() => setIsLoading(false));
                          }}
                          className={
                            "absolute -top-2 -right-2 bg-red-600 rounded-full p-1 hover:scale-110 transition-all cursor-pointer"
                          }
                        >
                          <CircleX color={"#fff"} />
                        </div>
                      </div>
                    )}
                    {categorieImages[3] && (
                      <div className={"relative"}>
                        <NextImage
                          alt="Product image"
                          className="aspect-square w-full rounded-md object-cover"
                          height="84"
                          src={categorieImages[3].image_url}
                          width="84"
                        />
                        <div
                          onClick={() => {
                            setIsLoading(true);
                            DeleteUrl(
                              categorieImages[3].image_id,
                              categorieImages[3].image_name,
                              categorieImages[3].field_id,
                              "categories",
                            ).then(() => setIsLoading(false));
                          }}
                          className={
                            "absolute -top-2 -right-2 bg-red-600 rounded-full p-1 hover:scale-110 transition-all cursor-pointer"
                          }
                        >
                          <CircleX color={"#fff"} />
                        </div>
                      </div>
                    )}
                    {categorieImages.length < 4 &&
                      categorieImages.length > 0 && (
                        <div className="relative flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span className="sr-only">Upload</span>
                          <input
                            type={"file"}
                            accept={"image/*"}
                            className={
                              "absolute opacity-0 top-0 left-0 w-full h-full cursor-pointer"
                            }
                            onChange={(e) => {
                              if (e.target.files) {
                                uploadImage(e.target.files[0]).then(() =>
                                  toast.success("Réussie"),
                                );
                              }
                            }}
                          />
                        </div>
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
          <Button type={"submit"} disabled={isSubmitting} size="sm">
            Sauvegarder
          </Button>
        </div>
      </form>
    </main>
  );
}

export default EditCategoryForm;
