"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ui/toggle-mode";

export default function Nav() {
  return (
    <header>
      <nav>
        <ul className="flex items-center justify-between">
          <li>
            <p className="text-6xl font-bold bg-gradient-to-r from-pink-500 to-red-400 bg-clip-text text-transparent">
              {" "}
              pool x asana
            </p>
          </li>

          <li className="flex items-center justify-between gap-4">
            <Button variant={"secondary"}>Datenbank</Button>
            <Button variant={"secondary"}>Asana Board</Button>
            <ModeToggle></ModeToggle>
          </li>
        </ul>
      </nav>
    </header>
  );
}
