import Link from "next/link";

export default async function BookingConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ bookingId?: string }>;
}) {
  const params = await searchParams;
  const bookingId = params.bookingId;

  return (
    <div className="min-h-screen bg-surface py-20 px-4">
      <div className="max-w-2xl mx-auto text-center glass rounded-3xl p-10 shadow-2xl">
        <h1 className="text-4xl font-black text-primary mb-6">
          Booking Confirmed!
        </h1>
        <p className="text-xl text-on-surface mb-8">
          Your healing session is booked successfully.
        </p>
        {bookingId && (
          <div className="bg-primary-container text-on-primary-container p-6 rounded-2xl mb-8 font-mono text-sm">
            Booking ID: <strong>{bookingId}</strong>
          </div>
        )}
        <Link href="/treatments" className="btn-primary inline-flex gap-3">
          Book Another Session
        </Link>
      </div>
    </div>
  );
}
