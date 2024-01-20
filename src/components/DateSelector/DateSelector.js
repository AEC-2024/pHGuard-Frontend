import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// const baseURL = "http://localhost:5000/api/dates";

export default function DateSelector({ onSelection }) {
  const [dates, setDates] = useState(['1', '2']);
  const [date, setDate] = useState('');

  useEffect(() => {
    /*axios
      .get(baseURL)
      .then((response) => {
        setDates(response.data);
        if (dates.length > 0) {
          setDate(dates[0])
        }
      });*/
  }, []);

  const updateDate = (newDate) => {
    setDate(newDate);
    onSelection(newDate);
  }

  const handleChange = (event) => {
    updateDate(event.target.value)
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="date-selector-label">Date</InputLabel>
        <Select
          labelId="date-selector-label"
          id="date-selector"
          value={date}
          onChange={handleChange}
          label="Date"
        >
        {dates
        .map(d => (
          <MenuItem value={d}>{d}</MenuItem>
        ))}
        </Select>
      </FormControl>
    </div>
  );
}