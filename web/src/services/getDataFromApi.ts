import { SensorData } from "../types";

type Record = {
  sensorId: string;
  type: string;
  value: number;
  date: string;
};

const getDataFromApi = async (): Promise<SensorData[]> => {
  try {
    const response = await fetch("http://localhost:3001/sensors/data");
    const result = await response.json();
    return result.message.map((record: Record) => {
      const { sensorId, type, value, date } = record;
      return { sensorId, type, value, date };
    });
  } catch (error) {
    console.error("Error in getDataFromApi", error);
    return [];
  }
};

export default getDataFromApi;
