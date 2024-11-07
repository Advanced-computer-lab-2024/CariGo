import * as React from 'react';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; // Import Button for submission
import avatar from "../../../assets/profilePic.png";

const PaymentContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: 375,
    padding: theme.spacing(3),
    borderRadius: `calc(${theme.shape.borderRadius}px + 4px)`,
    border: '1px solid ',
    borderColor: (theme.vars || theme).palette.divider,
    background:
      'linear-gradient(to bottom right, hsla(220, 35%, 97%, 0.3) 25%, hsla(220, 20%, 88%, 0.3) 100%)',
    boxShadow: '0px 4px 8px hsla(210, 0%, 0%, 0.05)',
    [theme.breakpoints.up('xs')]: {
      height: 300,
    },
    [theme.breakpoints.up('sm')]: {
      height: 350,
    },
    ...theme.applyStyles('dark', {
      background:
        'linear-gradient(to right bottom, hsla(220, 30%, 6%, 0.2) 25%, hsla(220, 20%, 25%, 0.2) 100%)',
      boxShadow: '0px 4px 8px hsl(220, 35%, 0%)',
    }),
  }));
  

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {
  const [postImage, setPostImage] = useState({ myFile: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    // createPost(postImage) or other submit logic
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };

  return (
    <PaymentContainer>
      <form onSubmit={handleSubmit}> {/* Wrap in form */}
        <Grid container spacing={3}>
          <FormGrid size={{ xs: 12, md: 12 }} style={{ marginLeft: "210px", marginTop: "-5px" }}>
            <label htmlFor="file-upload" className="custom-file-upload">
              <img src={postImage.myFile || avatar} alt="Uploaded avatar" />
            </label>
            <input
              type="file"
              name="myFile"
              id="file-upload"
              accept=".jpeg, .png, .jpg"
              onChange={handleFileUpload}
            />
          </FormGrid>
          <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel htmlFor="first-name">Username</FormLabel>
            <OutlinedInput
              id="first-name"
              name="first-name"
              placeholder="John"
              required
              size="small"
            />
          </FormGrid>
          <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel htmlFor="last-name">Password</FormLabel>
            <OutlinedInput
              id="last-name"
              name="last-name"
              type="password"
              placeholder="************"
              required
              size="small"
            />
          </FormGrid>
          <FormGrid size={{ xs: 12 }}>
            <FormLabel htmlFor="address1">Email</FormLabel>
            <OutlinedInput
              id="address1"
              name="address1"
              placeholder="example@domain.com"
              type='Email'
              required
              size="small"
            />
          </FormGrid>
          <FormGrid size={{ xs: 12 }}>
            <FormLabel htmlFor="address2">Address line 2</FormLabel>
            <OutlinedInput
              id="address2"
              name="address2"
              placeholder="Apartment, suite, unit, etc. (optional)"
              size="small"
            />
          </FormGrid>
          <FormGrid size={{ xs: 6 }}>
            <FormLabel htmlFor="city">City</FormLabel>
            <OutlinedInput
              id="city"
              name="city"
              placeholder="New York"
              required
              size="small"
            />
          </FormGrid>
          <FormGrid size={{ xs: 6 }}>
            <FormLabel htmlFor="state">State</FormLabel>
            <OutlinedInput
              id="state"
              name="state"
              placeholder="NY"
              required
              size="small"
            />
          </FormGrid>
          <FormGrid size={{ xs: 6 }}>
            <FormLabel htmlFor="zip">Zip / Postal code</FormLabel>
            <OutlinedInput
              id="zip"
              name="zip"
              placeholder="12345"
              required
              size="small"
            />
          </FormGrid>
          <FormGrid size={{ xs: 6 }}>
            <FormLabel htmlFor="country">Country</FormLabel>
            <OutlinedInput
              id="country"
              name="country"
              placeholder="United States"
              required
              size="small"
            />
          </FormGrid>
          <FormGrid size={{ xs: 12 }}>
            <FormControlLabel
              control={<Checkbox name="saveAddress" />}
              label="Use this address for payment details"
            />
          </FormGrid>
          {/* Submit button */}
          <FormGrid size={{ xs: 12 }}>
            <Button variant="contained" type="submit" fullWidth>
              Submit
            </Button>
          </FormGrid>
        </Grid>
      </form>
    </PaymentContainer>
  );
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (error) => reject(error);
  });
}
