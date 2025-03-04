import getDataFromApi from "./getDataFromApi";

const fixedDate = new Date("2024-05-17T13:21:35.019Z");

const expectedData = [
  {
    sensorId: "abc",
    type: "temperature",
    value: 100,
    date: fixedDate,
  },
  {
    sensorId: "123",
    type: "temperature",
    value: 42,
    date: fixedDate,
  },
];

const expectedResponse = {
  message: expectedData,
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve(expectedResponse),
  } as Response)
);

beforeEach(() => {
  (fetch as jest.Mock).mockClear();
});

describe("getDataFromApi", () => {
  it("should get data to the API with correct parameters", async () => {
    const data = await getDataFromApi();

    expect(fetch).toHaveBeenCalledWith("http://localhost:3001/sensors/data");
    expect(data).toEqual(expectedData);
  });

  it("should throw an error when fetch fails", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error())
    );

    const data = await getDataFromApi();
    expect(data).toEqual([]);
  });
});
