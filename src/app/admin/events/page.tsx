import React from "react";
import { Button } from "@/components/ui/button";
import { File, PlusCircle, SquarePen, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import login from "@/assets/images/login.webp";
import { Link } from "next-view-transitions";
import type { Metadata } from "next";
import { database } from "@/database/databaseConnection";
import { events, images } from "@/database/schema";
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
import DeleteEventButton from "@/components/DeleteEventButton";
import currencyConverter from "@/lib/currencyConverter";

export const metadata: Metadata = {
  title: "Événements - Evenlify",
};

async function AdminEvents() {
  const eventsList = await database.select().from(events);
  const eventsImages = await database.select().from(images);
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Archived
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-7 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Link href={"/admin/events/create"}>
              <Button size="sm" className="h-7 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Ajouter un Événement
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Événements</CardTitle>
              <CardDescription>
                Gérez vos événements et consultez leurs performances de vente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Status
                    </TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>
                      <span className="sr-only">Edit</span>
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Delete</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eventsList.map(
                    ({ event_id, title, date, status, normal_price }) => {
                      const image = eventsImages.filter(
                        (one) => one.field_id === event_id,
                      );
                      return (
                        <TableRow key={event_id}>
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
                          <TableCell className="font-medium">{title}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge variant="outline">{status}</Badge>
                          </TableCell>
                          <TableCell>
                            {currencyConverter(normal_price)}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {date.toDateString()}
                          </TableCell>
                          <TableCell>
                            <Link href={`/admin/events/${event_id}`}>
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
                                    className={"cursor-pointer text-[#d11a2a]"}
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
                                      catégories et supprimez les données de nos
                                      serveurs.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <DeleteEventButton event_id={event_id} />
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default AdminEvents;
