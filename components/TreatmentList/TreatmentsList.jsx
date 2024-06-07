const GetTreatments = async () => {
  try {
    const res = await fetch("api/about");

    if (!res.ok) {
      throw new Error("Failed to fetch treatments");
    }

    return res.json();
  } catch (error) {
    console.error("Error loading treatments: ", error);
    return [];
  }
};

export default async function TreatmentsList() {
  const { treatments } = await GetTreatments();

  if (!treatments || treatments.length === 0) {
    return <p>Failed to load treatments</p>;
  }

  console.log("Treatments: ", treatments);
  return (
    <ul>
      {treatments.map((treatment) => (
        <li key={treatment._id}>{treatment.name}</li>
      ))}
    </ul>
  );
}
