import React from "react";
import { useGlobleContext } from "./context";

const Search = () => {
  const { query, searchPost } = useGlobleContext();
  return (
    <>
      <h1>Programming News Website</h1>
      <form>
        <div>
          <input
            type="text"
            placeholder="Search Here"
            value={query}
            onChange={(e) => searchPost(e.target.value)}
          />
        </div>
      </form>
    </>
  );
};

export default Search;
