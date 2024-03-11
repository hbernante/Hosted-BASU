import React from "react";
import { StaticTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Grid } from "@mui/material";

export default function Calendar() {
  return (
    <Grid container justifyContent="center">
        <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "20px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticTimePicker orientation="portrait" />
          </LocalizationProvider>
        </div>
    </Grid>
  );
}
