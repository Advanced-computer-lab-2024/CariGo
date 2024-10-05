import React, { useState } from "react";
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import clsx from 'clsx';
import { Box, TextField, FormHelperText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Button as BaseButton } from '@mui/base/Button';
import SelectTags from "./SelectTags";
import SelectCategory from "./SelectCategory";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';




export default function UpdateActivityForm(){
    // const navigate = useNavigate();

    const navigate = useNavigate();

    const[title,setTitle]= useState('');
    const[description,setDescription]= useState('');
    const[start_date,setStart]= useState('');
    const[end_date,setEnd]= useState('');
    const[tags,setTags]= useState('');
    const[location,setLocation]= useState('');
    const[price,setPrice]= useState(0);
    const[discount,setDiscount]= useState(0);

    const[error,setError]= useState(null);
   
    const { id } = useParams();

    const handleUpdate = async (e) => {

        e.preventDefault();
    
        const activity = {
            title,
            description,
            start_date,
            end_date,
            tags,
            location,
            price,
            discount,
        };
    
        // Ensure the ID is correctly used in the URL.
        const response = await fetch(`http://localhost:4000/cariGO/activities/updateActivity/${id}`, // Fixed URL
            {
                method: 'PATCH', // Ensure the method is capitalized (PATCH)
                body: JSON.stringify(activity),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    
        const json = await response.json();
    
        if (!response.ok) {
            setError(json.error);
        } else { // Use else to check for success
            // Clear the form fields upon successful update
            setTitle('');
            setDescription('');
            setStart('');
            setEnd('');
            setTags('');
            setLocation('');
            setPrice(0);
            setDiscount(0);
    
            setError(null);
            console.log("Activity updated"); // Log the successful update
            navigate('/activities'); // Redirect after the update
        }
    };
    

    return(
        <Box  
        
        sx={{
            display: 'flex',
            flexDirection: 'column',
            width:'560px',
            //maxHeight: '100vh',
            padding: '10px',
            color: '#ff4d4d',
            borderRadius: '15px',
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
            gap:'5px',
            margin:'20px',
            border: '2px solid #126782',
            paddingLeft:'30px',  
        }}>
        <Box sx={{marginLeft:'50px'}}>
        <h3 sx={{color:'#ff4d4d', }}>UPDATE ACTIVITY</h3>
        {/*----FIELDS BOX---------------*/}

        <Box sx={{width:'100%',padding:'5px',paddingBottom:'20px'}}>
        <FormControl defaultValue=""  sx={{marginTop:'20px'} }>
        <Label sx={{marginLeft:"2px"}}>TITLE</Label>
        <StyledInput placeholder="Write your title here" 
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        />
        <HelperText />
        </FormControl>

        <FormControl defaultValue="" >
        <Label sx={{marginLeft:"2px"}}>DESCRIPTION</Label>
        <StyledInput placeholder="brief description of your activity" 
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        />
        <HelperText />
        </FormControl>

        <FormControl defaultValue="" >
        <Label sx={{marginLeft:"2px"}}>start date</Label>
        <StyledInput placeholder="date activity starts" 
        onChange={(e) => setStart(e.target.value)}
        value={start_date}
        />
        <HelperText />
        </FormControl>

        <FormControl defaultValue="" >
        <Label sx={{marginLeft:"2px"}}>end date</Label>
        <StyledInput placeholder="date activity ends" 
        onChange={(e) => setEnd(e.target.value)}
        value={end_date}
        />
        <HelperText />
        </FormControl>

        <FormControl defaultValue="" >
        <Label sx={{marginLeft:"2px"}}>location</Label>
        <StyledInput placeholder="activity location" 
        onChange={(e) => setLocation(e.target.value)}
        value={location}
        />
        <HelperText />
        </FormControl>

        <Label sx={{marginLeft:"10px"}}>Tags</Label>
        <SelectTags />
        <Label sx={{marginLeft:"10px"}}>Category</Label>
        <SelectCategory />

        <FormControl defaultValue="" >
        <Label sx={{marginLeft:"2px"}}>price</Label>
        <StyledInput placeholder="enter activity price" 
         type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        />
        <HelperText />
        </FormControl>

        <FormControl defaultValue="" >
        <Label sx={{marginLeft:"2px"}}>discount</Label>
        <StyledInput placeholder="enter any discounts" 
        type="number"
        onChange={(e) => setDiscount(e.target.value)}
        value ={discount}
        />
        <HelperText />
        </FormControl>


        </Box>
        <Button sx={{ marginLeft:'350px',marginBottom:'20px',}}
         onClick={handleUpdate} 
        >UPDATE</Button>
        
        </Box>
        </Box>

    );
}

const StyledInput = styled(Input)(
    ({ theme }) => `
  
    .${inputClasses.input} {
      width: 400px;
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 8px 12px;
      border-radius: 8px;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
      &:hover {
        border-color: ${blue[400]};
      }
  
      &:focus {
        outline: 0;
        border-color: ${blue[400]};
        box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
      }
    }
  `,
  );
  
const Button = styled(BaseButton)(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    background-color: ${'#ff4d4d'};
    padding: 6px 8px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    border: 1px solid #ff4d4d;
    box-shadow: 0 2px 1px ${
      theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
    }, inset 0 1.5px 1px ${'#ff3333'}, inset 0 -2px 1px ${'#ff3333'};
  
    &:hover {
      background-color: #ff3333;
    }
  
    &:active {
      background-color: #ff3333;
      box-shadow: none;
      transform: scale(0.99);
    }
  
    &:focus-visible {
      box-shadow: 0 0 0 4px #ff3333;
      outline: none;
    }
  
    &.base--disabled {
      background-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      color: ${theme.palette.mode === 'dark' ? grey[200] : grey[700]};
      border: 0;
      cursor: default;
      box-shadow: none;
      transform: scale(1);
    }
  `,
  );

  const Label = styled(({ children, className }) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);
  
    React.useEffect(() => {
      if (formControlContext?.filled) {
        setDirty(true);
      }
    }, [formControlContext]);
  
    if (formControlContext === undefined) {
      return <p>{children}</p>;
    }
  
    const { error, required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;
  
    return (
      <p className={clsx(className, error || showRequiredError ? 'invalid' : '')}>
        {children}
        {required ? ' *' : ''}
      </p>
    );
  })`
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    margin-bottom: 4px;
  
    &.invalid {
      color: red;
    }
  `;
  
  const HelperText = styled((props) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);
  
    React.useEffect(() => {
      if (formControlContext?.filled) {
        setDirty(true);
      }
    }, [formControlContext]);
  
    if (formControlContext === undefined) {
      return null;
    }
  
    const { required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;
  
    return showRequiredError ? <p {...props}>This field is required.</p> : null;
  })`
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
  `;

  
const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };
  
  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };