import React, { useState } from "react";
import PageComponent from "../components/PageComponent";
import {
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { postReservation } from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function InquireReservations() {
  const { currentUser } = useStateContext();
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    reason: "",
    description: "",
    location: "",
    landmark: "",
    status: "Pending",
    start_time: "",
    end_time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postReservation(formData);
      console.log("Reservation created:", response);
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        reason: "",
        description: "",
        location: "",
        landmark: "",
        start_time: "",
        end_time: "",
      });
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  return (
    <PageComponent>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Form fields */}
          {/* Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          {/* Reason */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Reason"
              name="reason"
              variant="outlined"
              value={formData.reason}
              onChange={handleChange}
            />
          </Grid>
          {/* Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              variant="outlined"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
          {/* Location */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              variant="outlined"
              value={formData.location}
              onChange={handleChange}
            />
          </Grid>
          {/* Landmark */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Landmark"
              name="landmark"
              variant="outlined"
              value={formData.landmark}
              onChange={handleChange}
            />
          </Grid>
          {/* Start Time */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Start Time"
              name="start_time"
              type="datetime-local"
              variant="outlined"
              value={formData.start_time}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          {/* End Time */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="End Time"
              name="end_time"
              type="datetime-local"
              variant="outlined"
              value={formData.end_time}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          {/* Submit button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </PageComponent>
  );
}
