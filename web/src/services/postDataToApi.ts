export type FormData = {
  sensorId: string;
  type: string;
  value: number;
};

const postDataToApi = async (formData: FormData): Promise<void> => {
  try {
    await fetch("http://localhost:3001/sensors/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  } catch (error) {
    console.error("Error in postDataToApi", error);
    throw new Error("Error in postDataToApi");
  }
};

export default postDataToApi;
