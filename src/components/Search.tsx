import type React from "react";
import "./Search.css";

function Search({ filterBooks }: { filterBooks: (s: string) => void }) {
  const search = (e: React.ChangeEvent<HTMLInputElement>) =>
    filterBooks(e.target.value);

  return (
    <div className="search">
      <label htmlFor="search">Search: </label>
      <input id="search" onChange={search} />
    </div>
  );
}

export default Search;
