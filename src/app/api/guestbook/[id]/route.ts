import { NextRequest, NextResponse } from "next/server";
import { guestbookEntries } from "@/data/guestbook";

interface RouteParams {
 params: Promise<{ id: string }>;
}

function validateGuestbookPayload(name: unknown, message: unknown) {
 if (typeof name !== "string") {
  return "Tên là bắt buộc";
 }

 if (name.trim().length < 2 || name.trim().length > 50) {
  return "Tên phải từ 2-50 ký tự";
 }

 if (typeof message !== "string") {
  return "Lời nhắn là bắt buộc";
 }

 if (message.trim().length < 1 || message.trim().length > 500) {
  return "Lời nhắn phải từ 1-500 ký tự";
 }

 return null;
}

// PUT /api/guestbook/[id] — Chỉnh sửa lời nhắn theo id
export async function PUT(request: NextRequest, { params }: RouteParams) {
 const { id } = await params;
 const index = guestbookEntries.findIndex((entry) => entry.id === id);

 if (index === -1) {
  return NextResponse.json(
   { error: "Không tìm thấy lời nhắn" },
   { status: 404 }
  );
 }

 const body = await request.json();
 const validationError = validateGuestbookPayload(body.name, body.message);

 if (validationError) {
  return NextResponse.json(
   { error: validationError },
   { status: 400 }
  );
 }

 const updated = {
  ...guestbookEntries[index],
  name: body.name.trim(),
  message: body.message.trim(),
 };

 guestbookEntries[index] = updated;

 return NextResponse.json(updated);
}

// DELETE /api/guestbook/[id] — Xóa lời nhắn theo id
export async function DELETE(request: NextRequest, { params }: RouteParams) {
 const { id } = await params;
 const index = guestbookEntries.findIndex((entry) => entry.id === id);

 if (index === -1) {
  return NextResponse.json(
   { error: "Không tìm thấy lời nhắn" },
   { status: 404 }
  );
 }

 const deleted = guestbookEntries.splice(index, 1)[0];
 return NextResponse.json(deleted);
}
