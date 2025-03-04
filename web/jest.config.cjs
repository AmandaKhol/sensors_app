module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // Usa jsdom para entornos web
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
