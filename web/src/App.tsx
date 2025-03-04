import { Box, Container, CssBaseline, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import FormComponent from "./components/FormComponent";
import ResultsTable from "./components/ResultsTable";
import logo from "./assets/plant.png";
import getDataFromApi from "./services/getDataFromApi";
import postDataToApi from "./services/postDataToApi";
import { SensorData, SensorDataInput } from "./types";

const App: React.FC = () => {
  const [tableData, setTableData] = useState<SensorData[]>([]);
  const [formData, setFormData] = useState<SensorDataInput>({
    sensorId: "",
    type: "",
    value: "",
  });
  const [update, setUpdate] = useState<boolean>(false);

  const fetchTableData = async () => {
    getDataFromApi().then((data) => {
      setTableData(data);
      return;
    });
  };

  const handleInput = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelect = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      type: value,
    }));
  };

  const handleSubmit = async () => {
    if (Object.values(formData).some((value) => !value)) {
      alert("Please, fill all the data");
      return;
    }

    const regex = /^[0-9.,]*$/;
    const floatValue = parseFloat(formData.value.replace(",", "."));
    if (isNaN(floatValue) || !regex.test(formData.value)) {
      alert('The field "value" should be a number');
      return;
    }
    const result = { ...formData, value: floatValue };
    try {
      await postDataToApi(result);
    } catch (error) {
      alert(`Our server is having problems, please, try later`);
    }
    setUpdate((prevState) => !prevState);
    setFormData({
      sensorId: "",
      type: "",
      value: "",
    });
  };

  useEffect(() => {
    fetchTableData();
    const intervalId = setInterval(() => {
      fetchTableData();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [update]);

  return (
    <Container>
      <CssBaseline />
      <Box
        maxWidth="1200px"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "space-between",
        }}
      >
        <Box display="flex" justifyContent={"center"} alignItems={"baseline"}>
          <Box mt={2} display="flex" justifyContent="center">
            <img
              src={logo}
              alt="logo"
              style={{ maxWidth: "60px", height: "auto" }}
            />
          </Box>
          <Typography variant="h2" marginLeft={"5px"}>
            Gardener
          </Typography>
        </Box>
        <FormComponent
          handleInput={handleInput}
          handleSelect={handleSelect}
          handleSubmit={handleSubmit}
          formData={formData}
        ></FormComponent>
        <Box>
          <ResultsTable tableData={tableData} />
        </Box>
        <Box display="flex" justifyContent={"center"} mt="20px">
          <Typography variant="body1">Amanda Khôl 2025</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default App;
