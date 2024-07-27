"use client";
import React from "react";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CircleX, Upload } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Category, type Event, Image } from "@/database/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { UpdateEvent } from "@/actions/EventsActions";
import Loader from "@/components/Loader";
import { supabaseClient } from "@/lib/supabase";
import { DeleteUrl, UploadImageUrl } from "@/actions/ImagesActions";
import { toast } from "sonner";
import NextImage from "next/image";

const AddEventSchema = z.object({
  title: z.string().min(8, { message: "Insérez 8 caractères minimum" }),
  description: z.string().min(8, { message: "Insérez 8 caractères minimum" }),
  location: z.string(),
  date: z.date(),
  normal_price: z.string(),
  normal_ticket_amount: z.string(),
  vip_price: z.string(),
  vip_ticket_amount: z.string(),
  category_id: z.string(),
  status: z.enum(["active", "archived"]),
});
export type TAddEventSchema = z.infer<typeof AddEventSchema>;

function CreateEventForm({
  categoryList,
  event,
  eventImages,
}: {
  categoryList: Category[];
  event: Event;
  eventImages: Image[];
}) {
  const form = useForm<TAddEventSchema>({
    resolver: zodResolver(AddEventSchema),
    defaultValues: {
      title: event.title,
      description: event.description,
      location: event.location,
      date: event.date,
      normal_price: event.normal_price,
      normal_ticket_amount: event.normal_ticket_amount,
      vip_price: event.vip_price,
      vip_ticket_amount: event.vip_ticket_amount,
      category_id: event.category_id,
      status: event.status,
    },
  });
  const [isLoading, setIsLoading] = React.useState(false);

  async function uploadImage(file: File) {
    setIsLoading(true);
    const imageFile = file;
    try {
      const { data } = await supabaseClient.storage
        .from("images")
        .upload(`events/${event.event_id}/${imageFile.name}`, imageFile);
      if (data) {
        supabaseClient.storage
          .from("images")
          .createSignedUrl(data.path, 126227808)
          .then(({ data }) => {
            if (data) {
              UploadImageUrl(
                data.signedUrl,
                event.event_id,
                imageFile.name,
                "events",
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

  async function submitHandler(data: TAddEventSchema) {
    setIsLoading(true);
    UpdateEvent(data, event.event_id).then(() => setIsLoading(false));
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      {isLoading && <Loader />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4"
        >
          <div className="flex items-center gap-4">
            <Link href={"/admin/events"}>
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Modifier l&apos;Événement {event.title}
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Link href={"/admin/events"}>
                <Button variant="outline" size="sm">
                  Annuler
                </Button>
              </Link>
              <Button type={"submit"} size="sm">
                Sauvegarder
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle>Détails de l&apos;Événement</CardTitle>
                  <CardDescription>
                    Remplissez les informations ci-dessous avec soin pour
                    garantir une expérience optimale pour vos utilisateurs.
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
                        placeholder={"Nom de votre Événement "}
                        {...form.register("title")}
                      />
                      {form.formState.errors.title && (
                        <span className="text-red-500 text-xs">
                          {form.formState.errors.title.message}
                        </span>
                      )}
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder={
                          "Merci de fournir toutes les informations nécessaires pour que votre événement soit un succès sur Evenlify. Si vous avez des questions ou avez besoin d'assistance, veuillez contacter notre équipe de support technique."
                        }
                        className="min-h-32"
                        {...form.register("description")}
                      />
                      {form.formState.errors.description && (
                        <span className="text-red-500 text-xs">
                          {form.formState.errors.description.message}
                        </span>
                      )}
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="location">Lieux</Label>
                      <Input
                        id="location"
                        type="text"
                        className="w-full"
                        placeholder={
                          "La Cretonne, Bourjolly 1, Rte Ntle 7 HT 8110 CY"
                        }
                        {...form.register("location")}
                      />
                      {form.formState.errors.location && (
                        <span className="text-red-500 text-xs">
                          {form.formState.errors.location.message}
                        </span>
                      )}
                    </div>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-[240px] pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                  <CardTitle>Ticket</CardTitle>
                  <CardDescription>
                    Définissez les types, les prix et le nombre de billets
                    disponibles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Stock</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="w-[100px]">Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Label htmlFor="stock-1" className="sr-only">
                            Stock
                          </Label>
                          <Input
                            id="stock-1"
                            type="number"
                            placeholder={"Quantité"}
                            {...form.register("normal_ticket_amount")}
                          />
                          {form.formState.errors.normal_ticket_amount && (
                            <span className="text-red-500 text-xs">
                              {
                                form.formState.errors.normal_ticket_amount
                                  .message
                              }
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Label htmlFor="price-1" className="sr-only">
                            Price
                          </Label>
                          <Input
                            id="price-1"
                            type="number"
                            placeholder={"Prix"}
                            {...form.register("normal_price")}
                          />
                          {form.formState.errors.normal_price && (
                            <span className="text-red-500 text-xs">
                              {form.formState.errors.normal_price.message}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="vip">Normal</Label>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Label htmlFor="stock-1" className="sr-only">
                            Stock
                          </Label>
                          <Input
                            id="stock-1"
                            type="number"
                            placeholder={"Quantité"}
                            {...form.register("vip_ticket_amount")}
                          />
                          {form.formState.errors.vip_ticket_amount && (
                            <span className="text-red-500 text-xs">
                              {form.formState.errors.vip_ticket_amount.message}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Label htmlFor="price-1" className="sr-only">
                            Price
                          </Label>
                          <Input
                            id="price-1"
                            type="number"
                            placeholder={"Prix"}
                            {...form.register("vip_price")}
                          />
                          {form.formState.errors.vip_price && (
                            <span className="text-red-500 text-xs">
                              {form.formState.errors.vip_price.message}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="vip">VIP</Label>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-2">
                <CardHeader>
                  <CardTitle>Catégorie de l&apos;Événement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <select
                        className={"border py-1 px-3 rounded-lg"}
                        {...form.register("category_id")}
                      >
                        {categoryList.map(({ category_id, title }) => {
                          return (
                            <option key={category_id} value={category_id}>
                              {title}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Status de l&apos;Événement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <select
                        className={"border py-1 px-3 rounded-lg"}
                        {...form.register("status")}
                      >
                        <option value={"active"}>Actif</option>
                        <option value={"archived"}>Archivé</option>
                      </select>
                      {form.formState.errors.status && (
                        <span className="text-red-500 text-xs">
                          {form.formState.errors.status.message}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Images de catégories</CardTitle>
                    <CardDescription>
                      Chaque image reflète l&apos;ambiance et l&apos;énergie de
                      vos événements.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      {eventImages.length > 0 ? (
                        <div className={"relative"}>
                          <NextImage
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="300"
                            src={eventImages[0].image_url}
                            width="300"
                          />
                          <div
                            onClick={() => {
                              setIsLoading(true);
                              DeleteUrl(
                                eventImages[0].image_id,
                                eventImages[0].image_name,
                                eventImages[0].field_id,
                                "events",
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
                        {eventImages[1] && (
                          <div className={"relative"}>
                            <NextImage
                              alt="Product image"
                              className="aspect-square w-full rounded-md object-cover"
                              height="84"
                              src={eventImages[1].image_url}
                              width="84"
                            />
                            <div
                              onClick={() => {
                                setIsLoading(true);
                                DeleteUrl(
                                  eventImages[1].image_id,
                                  eventImages[1].image_name,
                                  eventImages[1].field_id,
                                  "events",
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
                        {eventImages[2] && (
                          <div className={"relative"}>
                            <NextImage
                              alt="Product image"
                              className="aspect-square w-full rounded-md object-cover"
                              height="84"
                              src={eventImages[2].image_url}
                              width="84"
                            />
                            <div
                              onClick={() => {
                                setIsLoading(true);
                                DeleteUrl(
                                  eventImages[2].image_id,
                                  eventImages[2].image_name,
                                  eventImages[2].field_id,
                                  "events",
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
                        {eventImages[3] && (
                          <div className={"relative"}>
                            <NextImage
                              alt="Product image"
                              className="aspect-square w-full rounded-md object-cover"
                              height="84"
                              src={eventImages[3].image_url}
                              width="84"
                            />
                            <div
                              onClick={() => {
                                setIsLoading(true);
                                DeleteUrl(
                                  eventImages[3].image_id,
                                  eventImages[3].image_name,
                                  eventImages[3].field_id,
                                  "events",
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
                        {eventImages.length < 4 && eventImages.length > 0 && (
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
              {/*<Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">*/}
              {/*  <CardHeader>*/}
              {/*    <CardTitle>Images</CardTitle>*/}
              {/*    <CardDescription>*/}
              {/*      Téléchargez une image représentative de l&apos;événement*/}
              {/*    </CardDescription>*/}
              {/*  </CardHeader>*/}
              {/*  <CardContent>*/}
              {/*    <div className="grid gap-2 relative">*/}
              {/*      <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">*/}
              {/*        <Upload className="h-4 w-4 text-muted-foreground" />*/}
              {/*        <span className="sr-only">Upload</span>*/}
              {/*      </button>*/}
              {/*      <input*/}
              {/*        type={"file"}*/}
              {/*        className={*/}
              {/*          "absolute top-0 w-full h-full opacity-0 z-20 cursor-pointer"*/}
              {/*        }*/}
              {/*        accept="image/png"*/}
              {/*      />*/}
              {/*    </div>*/}
              {/*  </CardContent>*/}
              {/*</Card>*/}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <a href={"/admin/events"}>
              <Button variant="outline" size="sm">
                Annuler
              </Button>
            </a>
            <Button type={"submit"} size="sm">
              Sauvegarder
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}

export default CreateEventForm;
