import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Button from '@mui/joy/Button';
import { useState } from 'react';

export default function UploadDocumentsPage() {
  const [selectedFiles, setSelectedFiles] = useState({
    id: null,
    certificates: [],
    taxationRegistryCard: null,
  });
const userRole=localStorage.getItem("role");
// const userRole = "Tour_Guide"; // Set this dynamically as needed
//   const [selectedFiles, setSelectedFiles] = useState({
//     id: null,
//     certificate: null,
//     taxationRegistryCard: null,
//   });

  // Handle file selection changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setSelectedFiles({
      ...selectedFiles,
      [name]: name === "certificates" ? Array.from(files) : files[0],
    // [name]: files[0], // Allow only single file for certificate
    });
  };

  // Submit the form data
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    // Append files to formData
    // if (selectedFiles.id) formData.append('id', selectedFiles.id);
    // selectedFiles.certificates.forEach((file, idx) =>
    //   formData.append(`certificates`, file)
    // );
    // if (selectedFiles.taxationRegistryCard) {
    //   formData.append('taxationRegistryCard', selectedFiles.taxationRegistryCard);
    // }
    // for (let [key, value] of formData.entries()) {
    //     console.log(key, value); // Logs each entry in formData
    //   }

    if (selectedFiles.id) formData.append('id', selectedFiles.id);
    if (userRole === "Tour_Guide" && selectedFiles.certificates.length > 0) {
    
        //   formData.append("certificates", selectedFiles.certificate); // Only one certificate allowed
    
        selectedFiles.certificates.forEach((file) => {
            formData.append("certificates", file); // Add each certificate file individually
      });
    }
    if ((userRole === "Advertiser" || userRole === "Seller") && selectedFiles.taxationRegistryCard) {
      formData.append("taxationRegistryCard", selectedFiles.taxationRegistryCard);
    }


    try {
    const token = localStorage.getItem("jwt"); // Retrieve the token
    
      const response = await fetch("http://localhost:4000/cariGo/users/upload-documents", {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
            // "Content-Type": "application/json",
          }


      });
      console.log("Response status:", response.status); // Logs the HTTP status

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      console.log("Upload successful:", data);
      alert("Documents uploaded successfully!");
    } 
    catch (error)
    {
      console.error("Upload failed:", error.message);
      alert("Document upload failed: " + error.message);
    }
  };

  return (
    <main>
      <CssBaseline />
      <Sheet
        sx={{
          width: 400,
          mx: 'auto',
          my: 4,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <Typography level="h4" component="h1">
          <b>Upload Documents</b>
        </Typography>
        <Typography level="body-sm">
          Upload your ID and additional documents based on your role.
        </Typography>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* ID Document */}
          <FormControl>
            <FormLabel>ID Document</FormLabel>
            <input
              type="file"
              name="id"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf"
              required
            />
          </FormControl>

          {/* Certificates (Tour Guide only) */}
          {userRole === "Tour_Guide" && (
          <FormControl>
            <FormLabel>Certificates (Tour Guide only)</FormLabel>
            <input
              type="file"
              name="certificates"
              multiple
              onChange={handleFileChange}
              accept=".pdf"
            />
          </FormControl>
          )}

          {/* Taxation Registry Card (Advertiser/Seller only) */}
          {(userRole === "Advertiser" || userRole === "Seller") && (
           <FormControl>
            <FormLabel>Taxation Registry Card (Advertiser/Seller only)</FormLabel>
            <input
              type="file"
              name="taxationRegistryCard"
              onChange={handleFileChange}
              accept=".pdf"
            />
          </FormControl> 
           )}

          <Button sx={{ mt: 2 }} type="submit" color="primary" variant="contained">
            Upload Documents
          </Button>
        </form>
      </Sheet>
    </main>
  );
}