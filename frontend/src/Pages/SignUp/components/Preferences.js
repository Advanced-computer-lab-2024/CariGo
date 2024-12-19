import * as React from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Tag } from "primereact/tag";
import { styled } from "@mui/material/styles";
import {Button} from "@mui/material";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import SimCardRoundedIcon from "@mui/icons-material/SimCardRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { useEffect,useState } from "react";
import axios from "axios";
import TermsAndConditions from "./Review";
const Card = styled(MuiCard)(({ theme }) => ({
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  width: "100%",
  "&:hover": {
    background:
      "linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)",
    borderColor: "primary.light",
    boxShadow: "0px 2px 8px hsla(0, 0%, 0%, 0.1)",
    ...theme.applyStyles("dark", {
      background:
        "linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)",
      borderColor: "primary.dark",
      boxShadow: "0px 1px 8px hsla(210, 100%, 25%, 0.5) ",
    }),
  },
  [theme.breakpoints.up("md")]: {
    flexGrow: 1,
    maxWidth: `calc(50% - ${theme.spacing(1)})`,
  },
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        borderColor: (theme.vars || theme).palette.primary.light,
        ...theme.applyStyles("dark", {
          borderColor: (theme.vars || theme).palette.primary.dark,
        }),
      },
    },
  ],
}));

const PaymentContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  height: 375,
  padding: theme.spacing(3),
  borderRadius: `calc(${theme.shape.borderRadius}px + 4px)`,
  border: "1px solid ",
  borderColor: (theme.vars || theme).palette.divider,
  background:
    "linear-gradient(to bottom right, hsla(220, 35%, 97%, 0.3) 25%, hsla(220, 20%, 88%, 0.3) 100%)",
  boxShadow: "0px 4px 8px hsla(210, 0%, 0%, 0.05)",
  [theme.breakpoints.up("xs")]: {
    height: 300,
  },
  [theme.breakpoints.up("sm")]: {
    height: 350,
  },
  ...theme.applyStyles("dark", {
    background:
      "linear-gradient(to right bottom, hsla(220, 30%, 6%, 0.2) 25%, hsla(220, 20%, 25%, 0.2) 100%)",
    boxShadow: "0px 4px 8px hsl(220, 35%, 0%)",
  }),
}));

const FormGrid = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function Preferences({onPreferencesSubmit}) {
  const [paymentType, setPaymentType] = React.useState("creditCard");
  const [cardNumber, setCardNumber] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [expirationDate, setExpirationDate] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [tagName, setTagName] = React.useState([]);
  const colors = [
    "success",
    "warning",
    "danger",
    "info",
    "Primary",
    "Secondary",
  ];
  useEffect(() => {
    // Fetch tags from the backend
    const fetchTags = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Admin/getTags");
        if (response.data && Array.isArray(response.data)) {
          setTags(response.data);
          // console.log(response.data);
          setSelectedTags([])
          setTagName([]);
        } else {
          console.error("Unexpected response data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);
  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    if (value.length <= 16) {
      setCardNumber(formattedValue);
    }
  };

  const handleCvvChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCvv(value);
    }
  };
 const handlePrefs = async (event) => {
  event.preventDefault();
  console.log("baki "+selectedTags)
  onPreferencesSubmit(selectedTags)
};
  const handleExpirationDateChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, "$1/");
    if (value.length <= 4) {
      setExpirationDate(formattedValue);
    }
  };
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  //const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };
  const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];
  const handleRemoveTag = (option) => {
    setSelectedOptions((prev) => prev.filter((item) => item !== option));
    console.log(selectedOptions)
  };
  const handleTagClick = (tag) => {
    // Move selected tag from tags to selectedTags
    setTags(tags.filter((t) => t._id !== tag._id));
    setSelectedTags([...selectedTags, tag._id]); // Add selected tag to selectedTags
    setTagName([...tagName, tag]);
    console.log(selectedTags);
  };

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
     
     <div className="multi-select-container" style={{marginTop:"-100px",marginLeft:"-200px",width:"150px"}}>
      <div className="multi-select-dropdown" onClick={toggleDropdown}style={{marginTop:"100px",marginLeft:"-200px",width:"300px"}}>
        <div className="tags-container">
          {selectedOptions.map((option, index) => (
            <div className="tag" key={index}>
              {option}
              <span className="remove-tag" onClick={() => handleRemoveTag(option)}>
                ×
              </span>
            </div>
          ))}
        </div>
        <div className="placeholder">
          {selectedOptions.length === 0 ? "Select options..." : ""}
        </div>
        <div className="arrow">{isOpen ? "▲" : "▼"}</div>
      </div>
      {isOpen && (
        <ul className="dropdown-options" style={{marginTop:"50px",marginLeft:"-150px",width:"200px"}}>
          {tags.map((option, index) => (
            <li
              key={index}
              className={`dropdown-item ${
                selectedOptions.includes(option.title) ? "selected" : ""
              }`}
              onClick={() => handleOptionClick(option.title)}
            >
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </div>
    <div>
    <FormGrid size={{ xs: 6 }} style={{marginTop:"-140px",marginLeft:"0px",height:"500px"}}>
            <TermsAndConditions/>
          </FormGrid>
          </div>
      <FormGrid size={{ xs: 6 }} style={{marginTop:"40px",marginLeft:"420px",width:"100px"}}>
            <Button variant="contained" type="submit"
            endIcon={<ChevronRightRoundedIcon />}
            onClick={handlePrefs}
            >
              NEXT
            </Button>
          </FormGrid>
    </Stack>
  );
}
