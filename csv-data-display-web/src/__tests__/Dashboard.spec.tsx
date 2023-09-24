import { DataCard } from "../components/DataCard";
import { render } from "@testing-library/react";

it("Should render DataCard component inside Dashboard component", () => {
  render(<DataCard />);
})