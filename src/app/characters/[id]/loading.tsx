export default function CharacterDetailLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 h-96 bg-gray-200 rounded-xl animate-pulse" />

        <div className="lg:col-span-3 border rounded-xl p-6 space-y-4">
          <div className="h-8 w-2/3 bg-gray-200 rounded animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="h-4 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
