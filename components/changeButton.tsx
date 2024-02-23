"use client";
import { MixerHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export default function changeButton({ ticket }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mr-4 ml-1" variant="outline" size="icon">
          <MixerHorizontalIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Ticket bearbeiten</DialogTitle>
          <DialogDescription>
            hier können alle einstellungen des tickets geändert werden.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="ticketnummer" className="">
              Ticketnummer
            </Label>

            <Input id="ticketnummer" readOnly defaultValue={ticket.nummer} />
          </div>

          <div className="grid flex-1 gap-2">
            <Label htmlFor="kunde" className="">
              Kunde
            </Label>

            <Input id="kunde" readOnly defaultValue={ticket.project} />
          </div>
        </div>

        <div className="flex items-center space-x-2"></div>

        <div className="flex items-center  border-b-2 space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="ticketname" className="">
              Ticketname
            </Label>
            <Input id="ticketname" defaultValue={ticket.name} />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="verantwortlicher" className="">
              Verantwortlicher
            </Label>
            <Input id="verantwortlicher" defaultValue={ticket.assignee} />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="tickettext" className="">
              tickettext
            </Label>
            <Textarea
              placeholder="Hier ist Platz für deinen tickettext."
              id="message"
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-start md:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              schliessen
            </Button>
          </DialogClose>
          <Button type="submit">Speichern</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
