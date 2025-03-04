export interface SensorData {
  sensorId: string;
  type: string;
  value: number;
  date: string;
}

export interface SensorDataInput {
  sensorId: string;
  type: string;
  value: string;
}
