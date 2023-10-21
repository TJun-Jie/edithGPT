import React from "react";
import { firestore } from "../../../firebase";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const AddEventPage: React.FC = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [startDate, setStartDate] = React.useState(dayjs());
  const [endDate, setEndDate] = React.useState(dayjs());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(firestore, "event"), {
        title: title,
        description: description,
        startDate: {
          seconds: (startDate?.toDate().getTime() || 0) / 1000,
          nanoseconds: 0,
        },
        endDate: {
          seconds: (endDate?.toDate().getTime() || 0) / 1000,
          nanoseconds: 0,
        },
        location: location,
      });
      alert("Event added successfully!");
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div className="tw-h-screen">
      <Container maxWidth="sm">
        <Typography variant="h4" className="mb-4">
          Add Event
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                variant="outlined"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label="Start Date"
                value={startDate}
                onChange={(date, _context) => {
                  if (date) setStartDate(date);
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label="End Date"
                value={endDate}
                onChange={(date, _context) => {
                  if (date) setEndDate(date);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default AddEventPage;
