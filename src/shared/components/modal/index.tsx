"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let frame: number;

    if (isOpen) {
      setMounted(true);

      frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShow(true);
        });
      });
    } else {
      setShow(false);

      timeout = setTimeout(() => {
        setMounted(false);
      }, 300);
    }

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const modal = (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center px-4 transition-all duration-300 ease-out ${
        show ? "bg-black/50 opacity-100" : "bg-black/0 opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 ease-out ${
          show
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-6 scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
