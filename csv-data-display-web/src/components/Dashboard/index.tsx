import { DataCard } from "../DataCard";
import { SearchBar } from "../SearchBar";

import "./Dashboard.scss"

export function Dashboard() {
  return (
    <div className="container">
      <SearchBar />
      <DataCard />
    </div>
  )
}