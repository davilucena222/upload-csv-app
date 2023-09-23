import { useRef } from "react";

import "./FileUpload.scss";
import { Upload } from "phosphor-react";

export function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleFileInputChange() {
    if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
      const selectedFile = fileInputRef.current.files[0];
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const target = event.target as FileReader;

        if (target && target.result) {
          const csvData = target.result as string;
          console.log(csvData);
        }
      };

      reader.readAsText(selectedFile);
    }
  }

  return (
    <div className="upload-area">
      <input 
        type="file"
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