export default function BookingConfirmedPage({
  searchParams,
}: {
  searchParams: { bookingId?: string };
}) {
  const bookingId = searchParams.bookingId;

  return (
    <div className="min-h-screen bg-surface py-20 px-4">
      <div className="max-w-2xl mx-auto text-center glass rounded-3xl p-10">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Booking Confirmed
        </h2>
        <p className="text-on-surface-variant">
          Thank you for your booking{bookingId ? ` (ID: ${bookingId})` : ""}.
          You will receive a confirmation email shortly.
        </p>
      </div>
    </div>
  );
}
