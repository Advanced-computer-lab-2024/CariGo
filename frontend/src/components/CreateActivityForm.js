import React, { useState } from "react";
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Button as BaseButton } from '@mui/base/Button';
import SelectTags from "./SelectTags";
import SelectCategory from "./SelectCategory";
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Import the Dayjs adapter
import dayjs from 'dayjs';

export default function CreateActivityForm() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStart] = useState(null);
    const [end_date, setEnd] = useState(null);
    const [tags, setTags] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [error, setError] = useState(null);

    const handleCreate = async (e) => {
        e.preventDefault();

        const activity = {
            title,
            description,
            start_date: start_date ? start_date.format('YYYY-MM-DD') : null,
            end_date: end_date ? end_date.format('YYYY-MM-DD') : null,
            tags,
            location,
            price,
            discount,
        }

        const response = await fetch("http://localhost:4000/Carigo/Activity/createActivity", {
            method: 'POST',
            body: JSON.stringify(activity),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            // Reset fields
            setTitle('');
            setDescription('');
            setStart(null);
            setEnd(null);
            setTags('');
            setLocation('');
            setPrice(0);
            setDiscount(0);
            setError(null);
            console.log("Activity created");
            navigate('/activities');
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '560px',
                padding: '10px',
                color: '#ff4d4d',
                borderRadius: '15px',
                boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
                gap: '5px',
                margin: '20px',
                border: '2px solid #126782',
                paddingLeft: '30px',
            }}>
            <Box sx={{ marginLeft: '50px' }}>
                <h3 style={{ color: '#ff4d4d' }}>CREATE A NEW ACTIVITY</h3>
                <Box sx={{ width: '100%', padding: '5px', paddingBottom: '20px' }}>
                    <FormControl required sx={{ marginTop: '20px' }}>
                        <Label>TITLE</Label>
                        <StyledInput placeholder="Write your title here"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <HelperText />
                    </FormControl>

                    <FormControl required>
                        <Label>DESCRIPTION</Label>
                        <StyledInput placeholder="Brief description of your activity"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                        <HelperText />
                    </FormControl>

                    <FormControl required>
                        <Label>START DATE</Label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={start_date}
                                onChange={(newValue) => setStart(newValue)}
                                renderInput={(params) => <StyledInput {...params} />}
                            />
                        </LocalizationProvider>
                        <HelperText />
                    </FormControl>

                    <FormControl required>
                        <Label>END DATE</Label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={end_date}
                                onChange={(newValue) => setEnd(newValue)}
                                renderInput={(params) => <StyledInput {...params} />}
                            />
                        </LocalizationProvider>
                        <HelperText />
                    </FormControl>

                    <FormControl required>
                        <Label>LOCATION</Label>
                        <StyledInput placeholder="Activity location"
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                        />
                        <HelperText />
                    </FormControl>

                    <Label>Tags</Label>
                    <SelectTags />
                    <Label>Category</Label>
                    <SelectCategory />

                    <FormControl required>
                        <Label>PRICE</Label>
                        <StyledInput placeholder="Enter activity price"
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                        />
                        <HelperText />
                    </FormControl>

                    <FormControl>
                        <Label>DISCOUNT</Label>
                        <StyledInput placeholder="Enter any discounts"
                            type="number"
                            onChange={(e) => setDiscount(e.target.value)}
                            value={discount}
                        />
                        <HelperText />
                    </FormControl>
                </Box>
                <Button onClick={handleCreate}>CREATE</Button>
            </Box>
        </Box>
    );
}

const StyledInput = styled('input')(({ theme }) => `
    width: 400px;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? '#6B7A90' : '#B0B8C4'};
    background: ${theme.palette.mode === 'dark' ? '#303740' : '#fff'};
    color: ${theme.palette.mode === 'dark' ? '#C7D0DD' : '#1C2025'};
    &:focus {
        outline: 0;
        border-color: #3399FF;
    }
`);

const Button = styled(BaseButton)(({ theme }) => `
    background-color: #ff4d4d;
    color: white;
    padding: 6px 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 150ms ease;
    &:hover {
        background-color: #ff3333;
    }
`);

const Label = styled('label')`
    font-size: 0.875rem;
    margin-bottom: 4px;
    display: block;
`;

const HelperText = styled('p')`
    font-size: 0.75rem;
    color: red;
`;

