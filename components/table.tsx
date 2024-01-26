"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { PersonIcon } from '@radix-ui/react-icons'


export default function table() {
    return (
<Table className="border  p-24">
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader >
    <TableRow>
      <TableHead>Kunde & Projekt</TableHead>
      <TableHead>Nummer</TableHead>
      <TableHead>Titel</TableHead>
      <TableHead>Termin</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right"><p> <PersonIcon className="inline-block mb-1" /> Verantwortlich </p></TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>

    <TableRow>
      <TableCell className="font-medium">Frage</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>


  </TableBody>
  </Table>
  )};