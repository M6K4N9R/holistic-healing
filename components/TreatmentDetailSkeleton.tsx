export default function TreatmentDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-emerald-50 py-20 px-4 animate-pulse">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="h-96 md:h-[500px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl" />
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="h-12 w-4/5 bg-gray-200 rounded-2xl" />
            <div className="h-6 w-3/5 bg-gray-200 rounded-xl" />
          </div>
          <div className="bg-gray-100 rounded-3xl p-8">
            <div className="h-8 w-48 bg-gray-200 rounded-xl mb-6" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded-2xl" />
                ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="h-14 bg-gray-200 rounded-2xl flex-1" />
            <div className="h-14 bg-gray-200 rounded-2xl flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
