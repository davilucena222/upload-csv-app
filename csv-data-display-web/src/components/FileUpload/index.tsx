import { useRef } from "react";

import "./FileUpload.scss";
import { Upload } from "phosphor-react";
import { api } from "../../lib/axios";

export function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function handleFileInputChange() {
    if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
      const selectedFile = fileInputRef.current.files[0];
      
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

      return response.data;
    } catch (error) {
      return error;
    }
  }

  return (
    <div className="upload-area">
      <input 
        type="file"
        name="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      />

      <button onClick={() => fileInputRef.current?.click()}>
        <Upload size={32} />
        Upload CSV
      </button>
    </div>
  );
}