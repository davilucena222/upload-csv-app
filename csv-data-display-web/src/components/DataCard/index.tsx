import { useGlobalDataCsv } from "../../context/global-data-csv";
import { useEffect, useState } from "react";
import "./DataCard.scss";

interface FormattedCsvDataProps {
  id: string;
  name: string;
  city: string;
  country: string;
  favorite_sport: string;
}[]

export function DataCard() {
  const { csvData, getData } = useGlobalDataCsv();
  const [formattedCsvData, setFormattedCsvData] = useState<FormattedCsvDataProps[] | []>([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const formattedData = csvData.map((user) => {
      return {
        id: user.id,
        name: user.name,
        city: user.city,
        country: user.country,
        favorite_sport: user.favorite_sport,
      };
    });

    setFormattedCsvData(formattedData);
  }, [csvData]);

  return (
    <>
      {formattedCsvData.length === 0 ? (
        <div className="info">
          <p>
            Upload a CSV file or search again if you didn't find what you were looking for!
          </p>
        </div>
      ) : (
        <section className="container-data-card">
          {
            formattedCsvData.map((user: FormattedCsvDataProps) => (
              <ul className="data-card" key={user.id}>
                <li>Name: {user.name}</li>
                <li>City: {user.city}</li>
                <li>Country: {user.country}</li>
                <li>Favorite Sport: {user.favorite_sport}</li>
              </ul>
            ))
          }
        </section>
      )}
    </>
  )
}