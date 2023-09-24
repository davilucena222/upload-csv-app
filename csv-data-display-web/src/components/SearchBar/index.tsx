import { useState } from "react"
import "./SearchBar.scss"
import { FileUpload } from "../FileUpload";
import { useGlobalDataCsv } from "../../context/global-data-csv";

export function SearchBar() {
  const [search, setSearch] = useState<string | "">("");
  const { handleInputChange } = useGlobalDataCsv();
  
  function handleInputUserChange(event: React.ChangeEvent<HTMLInputElement>) {
    const valorDigitado = event.target.value;
    setSearch(valorDigitado);

    if (valorDigitado === "") {
      handleInputChange(""); 
    } else {
      handleInputChange(valorDigitado); 
    }
  }

  return (
    <>
      <form action="" className="container-form">
        <input 
          type="text" 
          placeholder="Search for a data in the CSV file" 
          value={search}
          onChange={handleInputUserChange}
        />
      </form>

      <FileUpload />
    </>
  )
}