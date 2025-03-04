import React, { act } from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import App from "./App";
import getDataFromApi from "./services/getDataFromApi";
import postDataToApi from "./services/postDataToApi";

jest.mock("./services/getDataFromApi");
jest.mock("./services/postDataToApi");

jest.mock("./assets/plant.png", () => "test-file-stub");

const mockGetDataFromApi = getDataFromApi as jest.Mock;
const mockPostDataToApi = postDataToApi as jest.Mock;

const mockData = [
  {
    sensorId: "sensor1",
    type: "temperature",
    value: 22.5,
    date: "2024-05-17T13:21:35.019Z",
  },
  {
    sensorId: "sensor2",
    type: "humidity",
    value: 55.2,
    date: "2024-05-17T14:21:35.019Z",
  },
];

beforeEach(() => {
  jest.clearAllMocks();
});

test("renders App with correct elements", async () => {
  mockGetDataFromApi.mockResolvedValue(mockData);
  render(<App />);

  expect(screen.getByText(/Gardener/i)).toBeInTheDocument();
  expect(screen.getByAltText(/logo/i)).toBeInTheDocument();

  expect(screen.getByLabelText(/Sensor Id/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Type of sensor/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Value/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();

  await expect(screen.findByText("sensor1")).resolves.toBeInTheDocument();
  await expect(screen.findByText("sensor2")).resolves.toBeInTheDocument();
});

test("handles form input and submission", async () => {
  mockGetDataFromApi.mockResolvedValue([]);
  mockPostDataToApi.mockResolvedValue(undefined);

  render(<App />);

  const sensorIdInput = screen.getByLabelText(/Sensor Id/i);
  const typeSelect = screen.getByLabelText(/Type of sensor/i);
  const valueInput = screen.getByLabelText(/Value/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  fireEvent.change(sensorIdInput, { target: { value: "test123" } });
  fireEvent.mouseDown(typeSelect);
  fireEvent.click(screen.getByText(/temperature/i));
  fireEvent.change(valueInput, { target: { value: "45.5" } });

  await act(async () => {
    fireEvent.click(submitButton);
  });

  await waitFor(() => {
    expect(mockPostDataToApi).toHaveBeenCalledWith({
      sensorId: "test123",
      type: "temperature",
      value: 45.5,
    });
  });

  expect(sensorIdInput).toHaveValue("");
  expect(valueInput).toHaveValue("");
});

test("shows alert when form is incomplete", async () => {
  mockGetDataFromApi.mockResolvedValue([]);

  render(<App />);

  const submitButton = screen.getByRole("button", { name: /submit/i });

  window.alert = jest.fn();

  await act(async () => {
    fireEvent.click(submitButton);
  });

  expect(window.alert).toHaveBeenCalledWith("Please, fill all the data");
});

test("shows alert when value is not a valid number", async () => {
  mockGetDataFromApi.mockResolvedValue([]);

  render(<App />);
  await act(async () => {
    await getDataFromApi();
  });


  const sensorIdInput = screen.getByLabelText(/Sensor Id/i);
  const typeSelect = screen.getByLabelText(/Type of sensor/i);
  const valueInput = screen.getByLabelText(/Value/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  fireEvent.change(sensorIdInput, { target: { value: "test123" } });
  fireEvent.mouseDown(typeSelect);
  fireEvent.click(screen.getByText(/temperature/i));
  fireEvent.change(valueInput, { target: { value: "invalid number" } });

  window.alert = jest.fn();

  await act(async () => {
    fireEvent.click(submitButton);
  });

  expect(window.alert).toHaveBeenCalledWith(
    'The field "value" should be a number'
  );
});

test("shows alert when server has an issue", async () => {
  mockGetDataFromApi.mockResolvedValue([]);
  mockPostDataToApi.mockRejectedValue(new Error("Server error"));

  render(<App />);
  await act(async () => {
    await getDataFromApi();
  });

  const sensorIdInput = screen.getByLabelText(/Sensor Id/i);
  const typeSelect = screen.getByLabelText(/Type of sensor/i);
  const valueInput = screen.getByLabelText(/Value/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  fireEvent.change(sensorIdInput, { target: { value: "test123" } });
  fireEvent.mouseDown(typeSelect);
  fireEvent.click(screen.getByText(/temperature/i));
  fireEvent.change(valueInput, { target: { value: "45.5" } });

  window.alert = jest.fn();

  await act(async () => {
    fireEvent.click(submitButton);
  });

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith(
      `Our server is having problems, please, try later`
    );
  });
});
