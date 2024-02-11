"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DeleteButton({ asanaGID }) {
  const handleDeletePost = async () => {
    try {
      let response = await fetch("./api/tickets/delete?asanaGid=" + asanaGID, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      window.location.reload();
    } catch (error) {
      console.log("An error occurred while deleting ", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <TrashIcon className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>bist du dir sicher?</AlertDialogTitle>
          <AlertDialogDescription>
            wenn du auf löschen klickst wird die aufgabe endgültig gelöscht.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>abbrechen</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeletePost}>
            löschen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
