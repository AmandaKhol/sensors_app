import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ResultsTable from "./ResultsTable";

const mockData = [
  {
    sensorId: "Sensor1",
    type: "temperature",
    value: 22.5,
    date: "2024-05-17T13:21:35.019Z",
  },
  {
    sensorId: "Sensor2",
    type: "humidity",
    value: 55.2,
    date: "2024-05-17T14:21:35.019Z",
  },
];

test("renders the ResultsTable with correct data", () => {
  render(<ResultsTable tableData={mockData} />);

  const titleElement = screen.getByText(/results table/i);
  expect(titleElement).toBeInTheDocument();

  const sensorIdCells = screen.getAllByText(/Sensor1|Sensor2/);
  expect(sensorIdCells).toHaveLength(2);

  const typeCells = screen.getAllByText(/temperature|humidity/);
  expect(typeCells).toHaveLength(2);

  const valueCells = screen.getAllByText(/22.5|55.2/);
  expect(valueCells).toHaveLength(2);

  const dateCells = screen.getAllByText(
    /2024-05-17T13:21:35.019Z|2024-05-17T14:21:35.019Z/
  );
  expect(dateCells).toHaveLength(2);
});
