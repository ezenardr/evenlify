import React from "react";
import { Button } from "@/components/ui/button";
import { File, PlusCircle, SquarePen, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { events } from "@/database/schema";

export const metadata: Metadata = {
  title: "Événements - Evenlify",
};

async function AdminEvents() {
  const eventsList = await database.select().from(events);
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
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Total Sales
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eventsList.map(
                    ({ event_id, title, status, normal_price }) => {
                      return (
                        <TableRow key={event_id}>
                          <TableCell className="hidden sm:table-cell">
                            <Image
                              alt="Product image"
                              className="aspect-square rounded-md object-cover"
                              height="64"
                              src={login}
                              width="64"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{title}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{status}</Badge>
                          </TableCell>
                          <TableCell>${normal_price}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            100
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-10-18 03:21 PM
                          </TableCell>
                          <TableCell>
                            <div className={"flex gap-2"}>
                              <Link href={`/admin/events/${event_id}`}>
                                <SquarePen
                                  size={20}
                                  className={"cursor-pointer"}
                                />
                              </Link>
                              <Trash
                                size={20}
                                className={"cursor-pointer text-[#d11a2a]"}
                              />
                            </div>
                            {/*<DropdownMenu>*/}
                            {/*  <DropdownMenuTrigger asChild>*/}
                            {/*    <Button aria-haspopup="true" size="icon" variant="ghost">*/}
                            {/*      <MoreHorizontal className="h-4 w-4" />*/}
                            {/*      <span className="sr-only">Toggle menu</span>*/}
                            {/*    </Button>*/}
                            {/*  </DropdownMenuTrigger>*/}
                            {/*  <DropdownMenuContent align="end">*/}
                            {/*    <DropdownMenuLabel>Actions</DropdownMenuLabel>*/}
                            {/*    <DropdownMenuItem>Edit</DropdownMenuItem>*/}
                            {/*    <DropdownMenuItem>Delete</DropdownMenuItem>*/}
                            {/*  </DropdownMenuContent>*/}
                            {/*</DropdownMenu>*/}
                          </TableCell>
                        </TableRow>
                      );
                    },
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default AdminEvents;
