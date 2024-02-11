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
import { Label } from "@/components/ui/label";
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
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
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
          {tickets.map((ticket) => (
            <TableRow className="hover:shadow-md" key={ticket._id}>
              <TableCell className="font-semibold  border-r">
                {ticket.name}
              </TableCell>
              <TableCell>{ticket.project}</TableCell>
              <TableCell>{ticket.nummer}</TableCell>
              <TableCell>{ticket.termin}</TableCell>
              <TableCell>{ticket.assignee}</TableCell>
              <TableCell>{ticket.status}</TableCell>
              <TableCell className="text-right flex flex-row"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Tickets;
