"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface FormSubmitButtonProps {
 children: ReactNode;
 pendingText?: string;
 className?: string;
 disabled?: boolean;
}

export default function FormSubmitButton({
 children,
 pendingText = "Đang xử lý...",
 className,
 disabled = false,
}: FormSubmitButtonProps) {
 const { pending } = useFormStatus();

 return (
  <button
   type="submit"
   disabled={pending || disabled}
   className={className}
  >
   {pending ? pendingText : children}
  </button>
 );
}
