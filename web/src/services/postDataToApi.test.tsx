import postDataToApi, { FormData } from "./postDataToApi";

// Mocking fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({}),
  } as Response)
);

beforeEach(() => {
  (fetch as jest.Mock).mockClear();
});

describe("postDataToApi", () => {
  it("should post data to the API with correct parameters", async () => {
    const mockFormData: FormData = {
      sensorId: "sensor123",
      type: "temperature",
      value: 42,
    };

    await postDataToApi(mockFormData);

    expect(fetch).toHaveBeenCalledWith("http://localhost:3001/sensors/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockFormData),
    });
  });

  it("should throw an error when fetch fails", async () => {
    const mockFormData: FormData = {
      sensorId: "sensor123",
      type: "temperature",
      value: 42,
    };

    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error())
    );

    await expect(postDataToApi(mockFormData)).rejects.toThrow(Error);
  });
});
