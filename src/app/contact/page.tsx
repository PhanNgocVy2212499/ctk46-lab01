"use client";

import { useActionState, useState } from "react";
import { sendContactMessage, ContactFormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: ContactFormState = {
 success: false,
};

export default function ContactPage() {
 const [state, formAction, isPending] = useActionState(
  sendContactMessage,
  initialState
 );
 const [forceShowForm, setForceShowForm] = useState(false);
 const showSuccess = state.success && !forceShowForm;

 return (
  <div className="max-w-3xl mx-auto px-4 py-12">
   <h1 className="text-3xl font-bold mb-2">Liên hệ</h1>
   <p className="text-gray-500 mb-8">
    Bạn có câu hỏi hoặc muốn hợp tác? Hãy gửi tin nhắn cho tôi!
   </p>

   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Thông tin liên hệ */}
    <div className="space-y-4">
     <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold mb-1">Email</h3>
      <a
             href="mailto:2212499@sv.dlu.edu.vn"
       className="text-blue-600 hover:underline text-sm"
      >
             2212499@sv.dlu.edu.vn
      </a>
     </div>

     <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold mb-1">GitHub</h3>
      <a
        href="https://github.com/PhanNgocVyMSSV2212499"
       target="_blank"
       rel="noopener noreferrer"
       className="text-blue-600 hover:underline text-sm"
      >
        github.com/PhanNgocVyMSSV2212499
      </a>
     </div>

     <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold mb-1">Địa chỉ</h3>
      <p className="text-sm text-gray-600">
        Số 2, Phường Lâm Viên, Đà Lạt
      </p>
     </div>
    </div>

    {/* Form liên hệ */}
    <div className="md:col-span-2">
    {showSuccess ? (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
       <h3 className="text-green-700 font-semibold text-lg mb-2">
        Gửi thành công!
       </h3>
       <p className="text-green-600">
        Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi sớm nhất có thể.
       </p>
      <Button
        type="button"
        onClick={() => setForceShowForm(true)}
        className="mt-4 inline-flex items-center px-4 py-2 rounded-lg border border-green-300 text-green-700 hover:bg-green-100 transition-colors"
       >
        Gửi tin nhắn khác
      </Button>
      </div>
     ) : (
      <form
       action={formAction}
       onSubmitCapture={() => setForceShowForm(false)}
       className="space-y-4"
      >
       <div className="space-y-2">
        <Label htmlFor="name">Họ và tên</Label>
        <Input
         id="name"
         name="name"
         type="text"
         placeholder="Phan Ngọc Vỹ 2212499"
         required
        />
        {state.errors?.name && (
         <p className="text-red-500 text-sm">{state.errors.name[0]}</p>
        )}
       </div>

       <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
         id="email"
         name="email"
         type="email"
         placeholder="email@example.com"
         required
        />
        {state.errors?.email && (
         <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
        )}
       </div>

       <div className="space-y-2">
        <Label htmlFor="subject">Tiêu đề</Label>
        <Input
         id="subject"
         name="subject"
         type="text"
         placeholder="Chủ đề bạn muốn trao đổi"
         required
        />
        {state.errors?.subject && (
         <p className="text-red-500 text-sm">{state.errors.subject[0]}</p>
        )}
       </div>

       <div className="space-y-2">
        <Label htmlFor="message">Nội dung</Label>
        <Textarea
         id="message"
         name="message"
         placeholder="Viết nội dung tin nhắn..."
         required
         rows={5}
        />
        {state.errors?.message && (
         <p className="text-red-500 text-sm">{state.errors.message[0]}</p>
        )}
       </div>

       <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Đang gửi..." : "Gửi tin nhắn"}
       </Button>
      </form>
     )}
    </div>
   </div>
  </div>
 );
}
