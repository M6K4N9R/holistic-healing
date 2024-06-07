import Router from "next/router";

export default function TreatmentDetailed() {
    const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR(`/api/jokes/${id}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <>
      <small>ID: {id}</small>
      <h1>{data.joke} </h1>
      
    </>
  );
}