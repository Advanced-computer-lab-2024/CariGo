import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Button from '@mui/joy/Button';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));
export default function UploadDocumentsPage({onDocsSubmit}) {
  const [selectedFiles, setSelectedFiles] = useState({
    id: null,
    certificates: [],
    taxationRegistryCard: null,
  });
const userRole=localStorage.getItem("role");
console.log(userRole);
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
    console.log(formData)
    console.log(selectedFiles)
      onDocsSubmit(selectedFiles)
    
  };

  return (
    <main>
      <CssBaseline />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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

        
          {/* ID Document */}
          <FormControl>
            <FormLabel>ID Document</FormLabel>
            <input
              type="file"
              name="id"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf"
              required
              style={{
                padding: '10px',
                fontSize: '16px',
                width: '100%',
                boxSizing: 'border-box',
                display: 'block',         // Ensure the inputs are block elements
                visibility: 'visible',    // Force visibility in case they're hidden
              }}
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
              style={{
                padding: '10px',
                fontSize: '16px',
                width: '100%',
                boxSizing: 'border-box',
                display: 'block',         // Ensure the inputs are block elements
                visibility: 'visible',    // Force visibility in case they're hidden
              }}
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
              style={{
                padding: '10px',
                fontSize: '16px',
                width: '100%',
                boxSizing: 'border-box',
                display: 'block',         // Ensure the inputs are block elements
                visibility: 'visible',    // Force visibility in case they're hidden
              }}
            />
          </FormControl> 
           )}

          {/* <Button sx={{ mt: 2 }} type="submit" color="primary" variant="contained">
            Upload Documents
          </Button> */}
          
        
      </Sheet>
      <FormGrid size={{ xs: 12 }} style={{marginTop:"30px",marginLeft:"300px"}}>
            <Button variant="contained" type="submit" fullWidth
            endIcon={<ChevronRightRoundedIcon />}
            >
              NEXT
            </Button>
          </FormGrid>
      </form>
      
    </main>
  );
}