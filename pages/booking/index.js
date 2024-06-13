import useSWR from "swr";

const handleTreatmentClick = async (treatment) => {
  try {
    const treatmentData = { treatment: treatment.name };
    
    // Send the treatment data to the server
    const response = await fetch("/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(treatmentData),
    });
    
    if (response.ok) {
      console.log("Treatment booked successfully");
    } else {
      console.error("Failed to book treatment");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export default function BookingTreatmentsList() {
  const { data, isLoading } = useSWR("/api/booking");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

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
            <button onClick={() => handleTreatmentClick(treatment)}>
              {treatment.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
