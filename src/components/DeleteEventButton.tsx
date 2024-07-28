"use client";
import React from "react";
import { DeleteImages } from "@/actions/ImagesActions";
import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { DeleteEvent } from "@/actions/EventsActions";

function DeleteEventButton({ event_id }: { event_id: string }) {
  return (
    <AlertDialogAction
      className={"bg-[#d11a2a]"}
      onClick={() => {
        DeleteImages(event_id, "events").then(() =>
          toast.success("Images Supprimé"),
        );
        DeleteEvent(event_id).then(() => toast.success("Evénement Supprimé"));
      }}
    >
      Supprimer
    </AlertDialogAction>
  );
}

export default DeleteEventButton;
