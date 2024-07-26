import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CircleAlert, PlusCircle, SquarePen, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import login from "@/assets/images/login.webp";
import { Link } from "next-view-transitions";
import { type Metadata } from "next";
import { database } from "@/database/databaseConnection";
import { categories, images } from "@/database/schema";
import DeleteCategoryButton from "@/components/DeleteCategoryButton";

export const metadata: Metadata = {
  title: "Catégories - Evenlify",
};

async function AdminCategories() {
  const categoriesList = await database.select().from(categories);
  const categorieImages = await database.select().from(images);
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <div className="ml-auto flex items-center gap-2">
            {/*<Button size="sm" variant="outline" className="h-7 gap-1">*/}
            {/*  <File className="h-3.5 w-3.5" />*/}
            {/*  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">*/}
            {/*    Export*/}
            {/*  </span>*/}
            {/*</Button>*/}
            <Link href={"/admin/categories/create"}>
              <Button size="sm" className="h-7 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Ajouter une Catégories
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Catégories</CardTitle>
              <CardDescription>
                Gérez vos catégories et consultez leurs performances.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {categoriesList.length === 0 && (
                <div className={"flex flex-col items-center w-full"}>
                  <CircleAlert />
                  <p>Aucun résultat</p>
                </div>
              )}
              {categoriesList.length > 0 && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="sr-only">Edit</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categoriesList.map(
                      ({ category_id, title, description }, id) => {
                        const image = categorieImages.filter(
                          (one) => one.field_id === category_id,
                        );
                        return (
                          <TableRow key={id}>
                            <TableCell className="hidden sm:table-cell">
                              {image.length > 0 ? (
                                <Image
                                  alt="Product image"
                                  className="aspect-square rounded-md object-cover"
                                  height="64"
                                  src={image[0].image_url}
                                  width="64"
                                />
                              ) : (
                                <Image
                                  alt="Product image"
                                  className="aspect-square rounded-md object-cover"
                                  height="64"
                                  src={login}
                                  width="64"
                                />
                              )}
                            </TableCell>
                            <TableCell className="font-medium">
                              {title}
                            </TableCell>
                            <TableCell>{description}</TableCell>
                            <TableCell className="">
                              <Link href={`/admin/categories/${category_id}`}>
                                <SquarePen
                                  size={20}
                                  className={"cursor-pointer"}
                                />
                              </Link>
                            </TableCell>
                            <TableCell>
                              <div className={"flex gap-2"}>
                                <AlertDialog>
                                  <AlertDialogTrigger>
                                    <Trash
                                      size={20}
                                      className={
                                        "cursor-pointer text-[#d11a2a]"
                                      }
                                    />
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Etes vous sur de vouloir supprimer ?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Cette action ne peut pas être annulée.
                                        Cela supprimera définitivement la
                                        catégories et supprimez les données de
                                        nos serveurs.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <DeleteCategoryButton
                                        category_id={category_id}
                                      />
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      },
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default AdminCategories;
