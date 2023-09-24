import { useRef } from "react";

import "./FileUpload.scss";
import { Upload } from "phosphor-react";
import { api } from "../../lib/axios";
import { useGlobalDataCsv } from "../../context/global-data-csv";

export function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { getData } = useGlobalDataCsv();

  async function handleFileInputChange() {
    if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
      const selectedFile = fileInputRef.current.files[0];
      const fileName = selectedFile.name.toLowerCase(); 


      if (!fileName.endsWith(".csv")) {
        alert("Only CSV Files are accepted!"); 
        return; 
      }

      const data = new FormData();
      data.append("file", selectedFile);

      uploadFile(data);
    }
  }

  async function uploadFile(file: FormData) {
    try {
      const response = await api.post("/api/files", file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      getData();

      return response.data;
    } catch (error) {
      return error;
    }
  }

  return (
    <>
      <div className="upload-area">
        <input 
          type="file"
          name="file"
          accept=".csv"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          placeholder="file-input"
          style={{ display: "none" }}
        />

        <button onClick={() => fileInputRef.current?.click()}>
          <Upload size={32} />
          Upload CSV
        </button>
      </div>
    </>
  );
}