import Link from "next/link";

export default function CharacterNotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold mb-3">Không tìm thấy nhân vật</h2>
      <p className="text-gray-600 mb-6">
        Mã nhân vật không tồn tại hoặc đã bị xóa khỏi nguồn dữ liệu.
      </p>
      <Link href="/characters" className="text-blue-600 hover:underline">
        ← Quay lại danh sách nhân vật
      </Link>
    </div>
  );
}
