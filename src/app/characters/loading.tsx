import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CharactersLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="h-8 w-72 bg-gray-200 rounded animate-pulse mb-3" />
      <div className="h-5 w-96 bg-gray-200 rounded animate-pulse mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card key={item} className="overflow-hidden">
            <div className="h-52 w-full bg-gray-200 animate-pulse" />
            <CardHeader>
              <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
