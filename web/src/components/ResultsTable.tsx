import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { SensorData } from "../types";

interface ResultsTableProps {
  tableData: SensorData[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ tableData }) => {
  return (
    <Box sx={{ padding: "1rem" }}>
      <Typography variant="h6" gutterBottom>
        Results Table
      </Typography>

      <TableContainer
        style={{
          maxHeight: 300,
          overflowY: "auto",
        }}
      >
        <Table
          sx={{ minWidth: "300px" }}
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Sensor Id </TableCell>
              <TableCell>Type of measure</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.sensorId}
                </TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.value}</TableCell>
                <TableCell>{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ResultsTable;
