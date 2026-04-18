"use client";

import { useState } from "react";
import { deleteGuestbookEntry } from "@/app/guestbook/actions";
import { Button } from "@/components/ui/button";
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

export default function DeleteButton({ id }: { id: string }) {
 const [open, setOpen] = useState(false);
 const [isDeleting, setIsDeleting] = useState(false);

 async function handleDelete() {
    setIsDeleting(true);
    await deleteGuestbookEntry(id);
    setIsDeleting(false);
    setOpen(false);
 }

 return (
  <Dialog open={open} onOpenChange={setOpen}>
   <DialogTrigger className="text-xs text-red-400 hover:text-red-600 transition-colors cursor-pointer">
    Xóa
   </DialogTrigger>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Xác nhận xóa lời nhắn</DialogTitle>
     <DialogDescription>
      Hành động này không thể hoàn tác. Bạn có chắc muốn xóa lời nhắn này?
     </DialogDescription>
    </DialogHeader>
    <DialogFooter>
     <DialogClose render={<Button variant="outline" />}>Hủy</DialogClose>
     <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={isDeleting}
     >
      {isDeleting ? "Đang xóa..." : "Xóa"}
     </Button>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 );
}
