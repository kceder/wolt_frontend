import { handleCalculate } from "../components/DeliveryCalcComponent";
const inputs = {
  cartValue: 10,
  deliveryDistance: 1500,
  numberOfItems: 6,
  orderTime: "2021-01-01T12:00:00.000Z",
  deliveryFee: 0,
};

describe("handleCalculate", () => {
  it.each([
    [{ ...inputs, cartValue: 1 }, 13],
    [{ ...inputs, cartValue: 2 }, 12],
    [{ ...inputs, cartValue: 3 }, 11],
    [{ ...inputs, cartValue: 4 }, 10],
  ])("should return the correct delivery fee", (input, expected) => {
    const result = handleCalculate(input);
    expect(result).toBe(expected);
  });
});
