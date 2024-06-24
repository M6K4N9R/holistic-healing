import { container, search } from "./SearchBar.module.css";

export default function SearchBar() {
  return (
    <section className={container}>
      <label htmlFor="email" className="text-base font-semibold">
        Search for symptoms
      </label>
      <input
        type="search"
        id="site-search"
        name="q"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      />
      <button className={search}>Search</button>
    </section>
  );
}
