import { useState } from "react";
import axios from "axios";

function AddImage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
console.log(formData)
    try {
      const response = await axios.post(
        "http://localhost:3002/api/food/add",
       
      );

      alert(`File uploaded: ${response.data.message}`);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Check console for details.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Upload a File</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" style={{ marginLeft: "10px" }}>
          Upload
        </button>
      </form>
    </div>
  );
}

export default AddImage;
