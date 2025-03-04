import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { SensorDataInput } from "../types";

type PropsFormComponent = {
  handleInput: (name: string, value: string) => void;
  handleSelect: (value: string) => void;
  handleSubmit: () => void;
  formData: SensorDataInput;
};

const FormComponent = (props: PropsFormComponent) => {
  const { handleInput, handleSelect, handleSubmit, formData } = props;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    handleInput(name, value);
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    handleSelect(event.target.value);
  };

  const handleSubmitPrep = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <Typography variant="h6" gutterBottom>
        Add new record
      </Typography>
      <form onSubmit={handleSubmitPrep}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          gap={2}
        >
          <TextField
            label="Sensor Id"
            variant="outlined"
            fullWidth
            name="sensorId"
            value={formData.sensorId}
            onChange={handleInputChange}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="option-label">Type of sensor</InputLabel>
            <Select
              labelId="option-label"
              id="type"
              value={formData.type}
              onChange={handleSelectChange}
              label="Type of sensor"
              defaultValue=""
            >
              <MenuItem value="humidity">Humidity</MenuItem>
              <MenuItem value="temperature">Temperature</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Value (...f.e: 34,5)"
            variant="outlined"
            fullWidth
            name="value"
            value={formData.value}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            type="submit"
            style={{
              backgroundColor: "#029688",
              width: "150px",
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FormComponent;
