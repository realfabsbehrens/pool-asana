"use client";

import { getTasks } from "@/lib/mongo/tasks";

import { MixerHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DeleteButton from "@/components/deleteButton";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// datum zur anzeige umformatieren (asana speichert es  als yyyy-dd-mm)
function convertDateString(inputString: string): string {
  const dateObject = new Date(inputString);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  const formattedDateString = `${day < 10 ? "0" : ""}${day}.${
    month < 10 ? "0" : ""
  }${month}.${year}`;
  return formattedDateString;
}

async function fetchTasks() {
  const { tasks } = await getTasks();
  if (!tasks) throw new Error("Failed to fetch tasks!");
  return tasks;
}

export default async function table() {
  const tasks = await fetchTasks();

  return (
    <Table className="border  shadow-lg dark:shadow-none dark:bg-transparent rounded-md p-24">
      <TableCaption>
        {" "}
        beispiel tickets aus poool mit den relaventen infos.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=" border-r">titel</TableHead>
          <TableHead>kunde & projekt</TableHead>
          <TableHead>ticketnummer</TableHead>
          <TableHead>termin</TableHead>
          <TableHead className="">
            <p> verantwortlich </p>
          </TableHead>
          <TableHead>status</TableHead>
          <TableHead className="text-right w-fit"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => {
          let displayedAssignee;
          let bgStatus;

          /// verantowrtlichen im klarnamen den email adressen zuordnen
          switch (task.assignee) {
            case "moin@fabsbehrens.de":
              displayedAssignee = "fabian behrens";
              break;
            case "sg@teamiken.de":
              displayedAssignee = "sascha görke";
              break;
            case "vw@teamiken.de":
              displayedAssignee = "vincent görke";
              break;
            case "rb@teamiken.de":
              displayedAssignee = "rüdiger bode";
              break;
            default:
              displayedAssignee = task.assignee;
              break;
          }

          /// hintergrudnfarben zu ordnen zu versch. status der tickets
          switch (task.status) {
            case "Freigabe Projektleiter":
              bgStatus = "bg-green-100 dark:bg-transparent ";
              break;
            case "Offen":
              bgStatus = "bg-yellow-100 dark:bg-transparent ";
              break;
            case "In Arbeit":
              bgStatus = "bg-cyan-100 dark:bg-transparent ";
              break;
            case "On Hold":
              bgStatus = "bg-red-100  dark:bg-transparent";
              break;
            default:
              bgStatus = "bg-transparent";
              break;
          }

          //  datum umformatieren
          const datumFormatiert = convertDateString(task.termin);

          return (
            <TableRow className="hover:shadow-md" key={task._id}>
              <TableCell className="font-semibold  border-r">
                {task.name}
              </TableCell>
              <TableCell>{task.project}</TableCell>
              <TableCell>{task.nummer}</TableCell>
              <TableCell>{datumFormatiert}</TableCell>
              <TableCell>{displayedAssignee}</TableCell>
              <TableCell className={` ${bgStatus}`}>{task.status}</TableCell>
              <TableCell className="text-right flex flex-row">
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
                        hier können alle einstellungen des tickets geändert
                        werden.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <Label htmlFor="ticketname" className="">
                          Ticketname
                        </Label>
                        <Input id="ticketname" defaultValue={task.name} />
                      </div>
                      <div className="grid flex-3 gap-2">
                        <Label htmlFor="ticketnummer" className="">
                          Ticketnummer
                        </Label>
                        <Input
                          id="ticketnummer"
                          readOnly
                          defaultValue={task.nummer}
                        />
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

                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          schliessen
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <DeleteButton></DeleteButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
