"use client";

import { Button } from "@/components/ui/button";

export default function CharactersError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-3">Không tải được danh sách nhân vật</h2>
      <p className="text-gray-600 mb-6">{error.message || "Đã xảy ra lỗi không mong muốn."}</p>
      <Button onClick={() => unstable_retry()}>Thử lại</Button>
    </div>
  );
}
