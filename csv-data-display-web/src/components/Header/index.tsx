import { FileCsv } from "phosphor-react";
import "./Header.scss";
import { SearchBar } from "../SearchBar";

export function Header() {
  return (
   <header className="header">
    <FileCsv size={32} />
    <h1>Upload CSV</h1>

    <SearchBar />
  </header>
  )
}