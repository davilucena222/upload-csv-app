import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../lib/axios";

interface GlobalDataCsvContextType {
  csvData: DataCsv[];
  getData: () => void;
  handleInputChange: (value: string) => void;
}

const initialContextValue: GlobalDataCsvContextType = {
  csvData: [],
  getData: () => {},
  handleInputChange: () => {},
};

export const GlobalDataCsvContext = createContext(initialContextValue);

interface GlobalDataCsvProps {
  children: ReactNode;
}

interface DataCsv {
  id: string;
  name: string;
  city: string;
  country: string;
  favorite_sport: string;
}[]

export const GlobalDataCsvProvider = ({ children }: GlobalDataCsvProps) => {
  const [csvData, setCsvData] = useState<DataCsv[] | []>([]);

  async function getData() {
    try {
      const response = await api.get("/api/users");

      if (response.data.error) {
        throw new Error(response.data.error);
      } else {
        setCsvData(response.data);
      }
    } catch (error) {
      throw new Error("Error fetching data!");
    }
  }
  
  async function handleInputChange(value: string) {
    const searchTerm = value;

    try {
      const response = await api.get(`/api/users?q=${searchTerm}`);
      setCsvData(response.data);
    } catch(error) {
      throw new Error("Error searching data!");
    }
  }

  return (
    <GlobalDataCsvContext.Provider 
      value={
        { csvData, 
          getData, 
          handleInputChange, 
        }
      }
    >
      {children}
    </GlobalDataCsvContext.Provider>
  );
};

export const useGlobalDataCsv = () => {
  return useContext(GlobalDataCsvContext);
};