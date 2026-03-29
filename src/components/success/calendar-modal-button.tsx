"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CALENDLY_EMBED_URL = process.env.NEXT_PUBLIC_CALENDLY_EMBED_URL;

interface CalendarModalButtonProps {
  buttonText: string;
  closeAriaLabel: string;
}

export function CalendarModalButton({
  buttonText,
  closeAriaLabel,
}: CalendarModalButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-primary px-10 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={buttonText}
        >
          <Calendar className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
          {buttonText}
        </button>
      </DialogTrigger>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0 border-none bg-[#FAFAFA]"
        closeAriaLabel={closeAriaLabel}
      >
        <DialogHeader className="p-6 pb-0 shrink-0">
          <DialogTitle className="text-xl font-semibold text-primary">
            {buttonText}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 min-h-0 overflow-hidden p-6 pt-4">
          {CALENDLY_EMBED_URL ? (
            <iframe
              src={CALENDLY_EMBED_URL}
              className="w-full h-[70vh] min-h-[400px] rounded-md border-0"
              title={closeAriaLabel}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-gray-600 font-light max-w-sm">
                Integración de calendario pendiente. Configure{" "}
                <code className="text-primary text-sm">
                  NEXT_PUBLIC_CALENDLY_EMBED_URL
                </code>{" "}
                en las variables de entorno.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
