export default function TreatmentSkeleton() {
  return (
    <div className="animate-pulse space-y-12 py-20 px-8 max-w-7xl mx-auto">
      <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mx-auto w-80" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl shadow-lg" />
        ))}
      </div>
    </div>
  );
}