import * as React from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const WarningText = styled(Typography)(() => ({
  color: "#FF683C",
  marginTop: "16px",
  marginBottom: "16px",
}));

export default function QuantityForm({ quantity, onQuantityChange, isTermsChecked, onCheckboxChange }) {
  const handleTicketChange = (event) => {
    const value = parseInt(event.target.value);
    onQuantityChange(isNaN(value) ? 1 : Math.max(1, value));
  };

  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="ticket-count" required>
          Number of Tickets
        </FormLabel>
        <OutlinedInput
          id="ticket-count"
          name="ticket-count"
          type="number"
          value={quantity}
          onChange={handleTicketChange}
          inputProps={{ min: 1 }}
          fullWidth
          required
          size="small"
        />
      </FormGrid>
      <Grid item xs={12}>
        <WarningText variant="body2">
          Be careful: You cannot cancel bookings when 48 hours have passed since the booking was made.
        </WarningText>
      </Grid>
      <FormGrid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              name="agreeToTerms"
              value="yes"
              checked={isTermsChecked}             // <--- Control checked value
              onChange={onCheckboxChange}          // <--- Trigger change handler
            />
          }
          label="I agree to the booking terms and conditions"
        />
      </FormGrid>
    </Grid>
  );
}