import { calculateTotalFee } from "../components/DeliveryCalcComponent";
const inputs = {
  cartValue: 10,
  deliveryDistance: 1500,
  numberOfItems: 6,
  orderTime: "2023-01-01T12:00:00.000Z",
  deliveryFee: 0,
};

describe("calculateTotalFee", () => {
  describe("Different cart values", () => {
    it.each([
      [{ ...inputs, cartValue: 1 }, 13],
      [{ ...inputs, cartValue: 3 }, 11],
      [{ ...inputs, cartValue: 7 }, 7],
      [{ ...inputs, cartValue: 11 }, 4],
      [{ ...inputs, cartValue: 100 }, 0],
      [{ ...inputs, cartValue: 0.1 }, 13.9],
      [{ ...inputs, cartValue: 97.2 }, 4],
      [{ ...inputs, cartValue: 13243738932 }, 0],
    ])("should return the correct delivery fee", (input, expected) => {
      const result = calculateTotalFee(input);
      expect(result).toBe(expected);
    });
  });
  describe("Different delivery distances", () => {
    it.each([
      [{ ...inputs, deliveryDistance: 500 }, 3],
      [{ ...inputs, deliveryDistance: 1000 }, 3],
      [{ ...inputs, deliveryDistance: 2000 }, 5],
      [{ ...inputs, deliveryDistance: 3000 }, 7],
      [{ ...inputs, deliveryDistance: 10000 }, 15],
    ])("should return the correct delivery fee", (input, expected) => {
      const result = calculateTotalFee(input);
      expect(result).toBe(expected);
    });
  });
  describe("Different number of items", () => {
    it.each([
      [{ ...inputs, numberOfItems: 1 }, 3],
      [{ ...inputs, numberOfItems: 3 }, 3],
      [{ ...inputs, numberOfItems: 7 }, 4.5],
      [{ ...inputs, numberOfItems: 11 }, 6.5],
      [{ ...inputs, numberOfItems: 50 }, 15],
    ])("should return the correct delivery fee", (input, expected) => {
      const result = calculateTotalFee(input);
      expect(result).toBe(expected);
    });
  });
  describe("Different order times", () => {
    it.each([
      [{ ...inputs, orderTime: "2023-01-01T08:00:00.000Z" }, 4],
      [{ ...inputs, orderTime: "2023-01-02T10:00:00.000Z" }, 4],
      [{ ...inputs, orderTime: "2023-01-03T12:00:00.000Z" }, 4],
      [{ ...inputs, orderTime: "2023-01-04T14:00:00.000Z" }, 4],
      [{ ...inputs, orderTime: "2023-01-05T16:00:00.000Z" }, 4],
      [{ ...inputs, orderTime: "2023-01-06T15:00:00.000Z" }, 4.8],
      [{ ...inputs, orderTime: "2023-01-06T18:00:00.000Z" }, 4.8],
      [{ ...inputs, orderTime: "2023-01-06T19:00:01.000Z" }, 4],
    ])("should return the correct delivery fee", (input, expected) => {
      const result = calculateTotalFee(input);
      expect(result).toBe(expected);
    });
  });
});
