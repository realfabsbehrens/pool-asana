// components/InfoButton.js
import React from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const ClientInfoButton = dynamic(() => import("./webhookInfo"), {
  ssr: false,
});

export function InfoButton() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" size="icon">
          <InfoCircledIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Status</SheetTitle>
          <SheetDescription>
            <ClientInfoButton />
            Hier siehst du den aktuellen Status der Webhooks von Asana.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
