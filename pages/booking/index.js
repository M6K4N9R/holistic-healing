import useSWR from "swr";

export default function BookingTreatmentsList() {
  const { data, isLoading } = useSWR("/api/treatments");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }
  console.log("Data of treatments", data);

  return (
    <>
      <h2 className="text-center mt-3 mb-3">Choose the treatment</h2>
      <ul className="p-2 mt-5">
        {data.map((treatment) => (
          <li
            key={treatment._id}
            className="rounded-lg bg-secondary/20 w-4/6 m-1
          p-1 text-center"
          >
            <button>{treatment.name}</button>
          </li>
        ))}
      </ul>
    </>
  );
}
