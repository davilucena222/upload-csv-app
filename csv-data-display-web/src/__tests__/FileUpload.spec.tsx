import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { FileUpload } from "../components/FileUpload";

const mock = new MockAdapter(axios);

describe("FileUpload component", () => {
  it("should upload the file when the button is clicked", async () => {
    const formData = new FormData();
    const file = new File(["This is a CSV file"], "test.csv");
    formData.append("file", file);

    mock.onPost("/api/files").reply(200, { message: "File uploaded successfully!" });

    render(<FileUpload />);

    const fileInput = screen.getByPlaceholderText("file-input");
    const button = screen.getByText("Upload CSV");

    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.click(button);
  });

  global.alert = vitest.fn();

  it("should display an alert if the file is not a CSV file", async () => {
    const formData = new FormData();
    const file = new File(["This is not a CSV file"], "test.txt");
    formData.append("file", file);

    mock.onPost("/api/files").reply(200);

    render(<FileUpload />);

    const fileInput = screen.getByPlaceholderText("file-input");
    const button = screen.getByText("Upload CSV");

    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.click(button);

    expect(mock.history.post.length).toBe(0);
    expect(global.alert).toHaveBeenCalledWith("Only CSV Files are accepted!");
  });
});