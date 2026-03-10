"use client";

import { useState } from "react";
import { BookingModal } from "./BookingModal";

interface BookingButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export function BookingButton({ children = "Book Appointment", className = "" }: BookingButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
