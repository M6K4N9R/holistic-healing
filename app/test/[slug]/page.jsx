export default function DynamicPage({ params }) {
  console.log("Params: ", params);
  return <h2>Hello, Dynamic {params.slug}</h2>;
}
