import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Character, CharacterListResponse } from "@/types/character";

async function getCharacters(): Promise<Character[]> {
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("Không thể tải danh sách nhân vật.");
  }

  const data: CharacterListResponse = await res.json();
  return data.results;
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

export default async function CharactersPage() {
  const characters = await getCharacters();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Rick and Morty Characters</h1>
      <p className="text-gray-500 mb-8">
        Danh sách nhân vật từ public API Rick and Morty.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((character) => (
          <Link key={character.id} href={`/characters/${character.id}`}>
            <Card className="h-full overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <Image
                src={character.image}
                alt={character.name}
                width={300}
                height={300}
                className="h-52 w-full object-cover"
              />
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-lg">{character.name}</CardTitle>
                  <Badge variant={getStatusVariant(character.status)}>
                    {character.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-800">Loài:</span> {character.species}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Giới tính:</span> {character.gender}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
