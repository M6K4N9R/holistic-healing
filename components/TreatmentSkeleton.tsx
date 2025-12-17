export default function TreatmentSkeleton() {
  return (
    <div className="animate-pulse space-y-8 p-8">
      <div className="h-12 bg-gray-200 rounded-full mx-auto w-64"></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
}
