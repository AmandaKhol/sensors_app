import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormComponent from "./FormComponent";
import { SensorDataInput } from "../types";

const mockHandleInput = jest.fn();
const mockHandleSelect = jest.fn();
const mockHandleSubmit = jest.fn();

const formData: SensorDataInput = {
  sensorId: "",
  type: "",
  value: "",
};

const setup = () => {
  return render(
    <FormComponent
      handleInput={mockHandleInput}
      handleSelect={mockHandleSelect}
      handleSubmit={mockHandleSubmit}
      formData={formData}
    />
  );
};

test("renders FormComponent with correct elements", () => {
  setup();

  expect(screen.getByText(/add new record/i)).toBeInTheDocument();

  expect(screen.getByLabelText(/sensor id/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/type of sensor/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/value/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
});

test("handles input changes", () => {
  setup();

  const sensorIdInput = screen.getByLabelText(/sensor id/i);
  const valueInput = screen.getByLabelText(/value/i);

  fireEvent.change(sensorIdInput, {
    target: { value: "123", name: "sensorId" },
  });
  expect(mockHandleInput).toHaveBeenCalledWith("sensorId", "123");

  fireEvent.change(valueInput, { target: { value: "45", name: "value" } });
  expect(mockHandleInput).toHaveBeenCalledWith("value", "45");
});

test("handles select changes", () => {
  setup();

  const typeSelect = screen.getByLabelText(/type of sensor/i);
  fireEvent.mouseDown(typeSelect);

  const option = screen.getByText(/temperature/i);
  fireEvent.click(option);

  expect(mockHandleSelect).toHaveBeenCalledWith("temperature");
});

test("handles form submission", () => {
  setup();

  const form = screen.getByRole("button", { name: /submit/i });
  fireEvent.submit(form!);
  expect(mockHandleSubmit).toHaveBeenCalled();
});
