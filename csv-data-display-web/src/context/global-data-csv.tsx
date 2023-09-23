import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../lib/axios";

interface GlobalDataCsvContextType {
  csvData: DataCsv[];
  getData: () => void;
}

const initialContextValue: GlobalDataCsvContextType = {
  csvData: [],
  getData: () => {},
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
}

export const GlobalDataCsvProvider = ({ children }: GlobalDataCsvProps) => {
  const [csvData, setCsvData] = useState<DataCsv[]>([]);

  async function getData() {
    try {
      const response = await api.get("/api/users");

      if (response.data.error) {
        alert(response.data.error);
      } else {
        setCsvData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <GlobalDataCsvContext.Provider value={{ csvData, getData }}>
      {children}
    </GlobalDataCsvContext.Provider>
  );
};

export const useGlobalDataCsv = () => {
  return useContext(GlobalDataCsvContext);
};
