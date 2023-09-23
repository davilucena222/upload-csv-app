import "./DataCard.scss";
import { useGlobalDataCsv } from "../../context/global-data-csv";
import { useEffect, useState } from "react";

export function DataCard() {
  const { csvData, getData } = useGlobalDataCsv()
  const [formattedCsvData, setFormattedCsvData] = useState<any[]>([]);

  useEffect(() => {
    getData();
  }, []);
  
  useEffect(() => {
    const formattedData = csvData.map((user) => {
      return {
        name: user.name,
        city: user.city,
        country: user.country,
        favorite_sport: user.favorite_sport,
      };
    });

    setFormattedCsvData(formattedData);
  }, [csvData]);

  return (
    <div className="container-data-card">
      {formattedCsvData.map((user) => (
        <ul className="data-card" key={user.id}>
          <li>name: {user.name}</li>
          <li>city: {user.city}</li>
          <li>country: {user.country}</li>
          <li>favorite_sport: {user.favorite_sport}</li>
        </ul>
      ))}
    </div>
  )
}