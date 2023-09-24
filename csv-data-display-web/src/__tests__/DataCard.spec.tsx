import { render, screen } from "@testing-library/react";
import { DataCard } from "../components/DataCard";

interface FormattedCsvDataProps {
  id: string;
  name: string;
  city: string;
  country: string;
  favorite_sport: string;
}[]

describe("DataCard component", () => {
  it("should render a loading message when there is no data", () => {
    render(<DataCard />);

    expect(screen.getByText("Upload a CSV file or search again if you didn't find what you were looking for!")).toBeInTheDocument();
  });

  it("should render a list of users when there is data", async () => {
    const formattedCsvData = [
      {
        id: "1",
        name: "John Doe",
        city: "New York",
        country: "United States",
        favorite_sport: "Basketball",
      },
      {
        id: "2",
        name: "Jane Doe",
        city: "London",
        country: "United Kingdom",
        favorite_sport: "Football",
      },
    ] as FormattedCsvDataProps[];

    test("formattedCsvData should contain the following data in the way", () => {
      const expectedData = [
        {
          id: "1",
          name: "John Doe",
          city: "New York",
          country: "United States",
          favorite_sport: "Basketball",
        },
        {
          id: "2",
          name: "Jane Doe",
          city: "London",
          country: "United Kingdom",
          favorite_sport: "Football",
        },
      ];
    
      expect(formattedCsvData).toEqual(expectedData);
    });
  });
});