"use client";
import React, { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MixerHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

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

const Tickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("./api/tickets/getTickets");
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []); // Leerer Dependency Array sorgt dafür, dass die Anfrage nur einmal gemacht wird

  return (
    <div>
      <Table className="border  shadow-lg dark:shadow-none dark:bg-transparent rounded-md p-24">
        <TableCaption>aktuelle dummy tickets aus poool.</TableCaption>
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
          {tickets.map((ticket) => {
            let bgStatus;

            switch (ticket.status) {
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
                bgStatus = "bg-red-100 dark:bg-transparent";
                break;
              default:
                bgStatus = "bg-transparent";
                break;
            }

            const datumFormatiert = convertDateString(ticket.termin);

            return (
              <TableRow className={`hover:shadow-md`} key={ticket._id}>
                <TableCell className="font-semibold  border-r">
                  {ticket.name}
                </TableCell>
                <TableCell>{ticket.project}</TableCell>
                <TableCell>{ticket.nummer}</TableCell>
                <TableCell>{datumFormatiert}</TableCell>
                <TableCell>{ticket.assignee}</TableCell>
                <TableCell className={bgStatus}>{ticket.status}</TableCell>
                <TableCell className="text-right flex flex-row"> </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Tickets;
