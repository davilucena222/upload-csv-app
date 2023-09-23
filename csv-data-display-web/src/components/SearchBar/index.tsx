import { useState } from "react"
import { MagnifyingGlass } from "phosphor-react";

import "./SearchBar.scss"
import { FileUpload } from "../FileUpload";

export function SearchBar() {
  const [search, setSearch] = useState("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // send the research for the back-end to looking for the data
  }

  return (
    <div className="container-input-search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a data in the CSV file"
          value={search}
          onChange={handleInputChange}
        />

        <button type="submit" className="button-submit">
          <MagnifyingGlass size={20} weight="bold" />
          Search
        </button>
      </form>

      <FileUpload />
    </div>
  )
}