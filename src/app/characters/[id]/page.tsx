import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Character } from "@/types/character";

interface CharacterDetailPageProps {
  params: Promise<{ id: string }>;
}

async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 300 },
  });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Không thể tải chi tiết nhân vật.");
  }

  return res.json();
}

function getStatusVariant(status: Character["status"]): "default" | "secondary" | "destructive" {
  if (status === "Alive") {
    return "default";
  }
  if (status === "Dead") {
    return "destructive";
  }
  return "secondary";
}

export default async function CharacterDetailPage({ params }: CharacterDetailPageProps) {
  const { id } = await params;
  const character = await getCharacter(id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link href="/characters" className="text-blue-600 hover:underline text-sm inline-block mb-6">
        ← Quay lại danh sách
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-2 overflow-hidden">
          <Image
            src={character.image}
            alt={character.name}
            width={600}
            height={600}
            className="w-full h-auto"
          />
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-2xl">{character.name}</CardTitle>
              <Badge variant={getStatusVariant(character.status)}>{character.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <p><span className="font-semibold">ID:</span> {character.id}</p>
            <p><span className="font-semibold">Loài:</span> {character.species}</p>
            <p><span className="font-semibold">Giới tính:</span> {character.gender}</p>
            <p><span className="font-semibold">Kiểu:</span> {character.type || "Không có"}</p>
            <p><span className="font-semibold">Xuất hiện:</span> {character.episode.length} tập</p>
            <p><span className="font-semibold">Tạo lúc:</span> {new Date(character.created).toLocaleDateString("vi-VN")}</p>
            <p className="sm:col-span-2"><span className="font-semibold">Nguồn gốc:</span> {character.origin.name}</p>
            <p className="sm:col-span-2"><span className="font-semibold">Vị trí hiện tại:</span> {character.location.name}</p>
          </CardContent>
        </Card>
      </div>

      <Alert className="mt-6">
        <AlertTitle>Ghi chú dữ liệu</AlertTitle>
        <AlertDescription>
          Dữ liệu được lấy server-side từ Rick and Morty API và có revalidate mỗi 5 phút.
        </AlertDescription>
      </Alert>
    </div>
  );
}
