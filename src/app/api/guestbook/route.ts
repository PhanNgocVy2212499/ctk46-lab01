import { NextRequest, NextResponse } from "next/server";
import { guestbookEntries } from "@/data/guestbook";

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

// GET /api/guestbook — Lấy danh sách tất cả lời nhắn
export async function GET(request: NextRequest) {
 const { searchParams } = new URL(request.url);
 const limitParam = searchParams.get("limit");

 if (!limitParam) {
    return NextResponse.json(guestbookEntries);
 }

 const limit = Number.parseInt(limitParam, 10);

 if (!Number.isInteger(limit) || limit <= 0) {
    return NextResponse.json(
     { error: "limit phải là số nguyên dương" },
     { status: 400 }
    );
 }

 return NextResponse.json(guestbookEntries.slice(0, limit));
}

// POST /api/guestbook — Thêm lời nhắn mới
export async function POST(request: NextRequest) {
 const body = await request.json();

 const validationError = validateGuestbookPayload(body.name, body.message);
 if (validationError) {
  return NextResponse.json(
     { error: validationError },
   { status: 400 }
  );
 }

 // Tạo entry mới
 const newEntry = {
  id: Date.now().toString(),
    name: body.name.trim(),
    message: body.message.trim(),
  createdAt: new Date().toISOString(),
 };

 // Thêm vào đầu mảng (hiển thị mới nhất trước)
 guestbookEntries.unshift(newEntry);

 return NextResponse.json(newEntry, { status: 201 });
}
