import "@testing-library/jest-dom";
import { jest, afterEach, beforeAll, afterAll } from "@jest/globals";

// Mock du window.matchMedia pour les tests
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () {},
    };
  };

// Reset tous les mocks après chaque test
afterEach(() => {
  jest.clearAllMocks();
});

// Supprime les warnings console pendant les tests
const originalError = console.error;
const originalWarn = console.warn;
const originalLog = console.log;

beforeAll(() => {
  console.error = jest.fn();
  console.warn = jest.fn();
  console.log = jest.fn();
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
  console.log = originalLog;
});
