import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
  PaperProps: {
    style: {
    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    width: 150,  // Set width for the dropdown menu here
    maxWidth: 150,
    scale:0.75,
    paddingRight: -90,
    backgroundColor: 'rgba(233, 124, 255)',
    },
  },
};

const names = [
  'tag1',
  'tag2',
  'tag3',
  'tag4'
];

export default function SelectTags() {
  const [tag, setTag] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTag(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
    <FormControl sx={{ marginTop: '-18px', width: 300 , height: 50, marginLeft:"-40px" }}>  {/* Adjust margin and width */}
    <InputLabel id="demo-multiple-checkbox-label"
    sx={{ fontSize: '14px', marginLeft: '40px', marginTop: '2px'}}
    >Tag</InputLabel>
    <Select sx={{ scale: '0.65', borderRadius: '10px', marginLeft: '-15px'  }}
    labelId="demo-multiple-checkbox-label"
    id="demo-multiple-checkbox"
    multiple
    value={tag}
    onChange={handleChange}
    input={<OutlinedInput label="Tag" />}
    renderValue={(selected) => selected.join(', ')}
    //MenuProps={MenuProps}
    
    >
    {names.map((name) => (
      <MenuItem key={name} value={name}
      sx={{ height: '25px', 
        maxWidth: '150px', 
        color: '#126782', 
        
        paddingLeft: '0px',
        marginRight:"-20px",
    }} // Set minWidth here
    >
        <Checkbox checked={tag.includes(name)} />
        <ListItemText primary={name} />
      </MenuItem>
    ))}
  </Select>
</FormControl>

    </div>
  );
}
