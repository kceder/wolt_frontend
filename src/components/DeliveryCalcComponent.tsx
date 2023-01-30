import React, { useState } from "react";
import "../App.css";
import DisplayFee from "./DisplayFee";

// interface for input values
interface State {
  cartValue: number;
  deliveryDistance: number;
  numberOfItems: number;
  orderTime: string;
  deliveryFee: number;
}

// function to calculate distance fee
const calcDistanceFee = (state: State) => {
  const additionalDistanceFee: number = 100;
  if (state.deliveryDistance > 1000) {
    const extraDistance: number = state.deliveryDistance - 1000;
    const extra500m: number = Math.ceil(extraDistance / 500);
    return extra500m * additionalDistanceFee;
  }
  else
    return 0;
};
// function to calculate additional items fee
const calcAdditionalItemFee = (state: State) => {
  let extraItemsFee: number = 0;
  if (state.numberOfItems >= 5) { // add additional items fee if more than 4 items
    const extraItems: number = state.numberOfItems - 4;
    extraItemsFee += extraItems * 50; // 50 cents per item
    if (state.numberOfItems > 12) {    // add bulk fee
      extraItemsFee += 120;
    }
  }
  return extraItemsFee;
};

// function to add rush fee if order is placed on Friday 3-7pm
const addRushFee = (state: State) => {
  const orderDate = new Date(state.orderTime);
  if (
    orderDate.getUTCHours() >= 15 &&
    orderDate.getUTCHours() <= 18 &&
    orderDate.getUTCDay() === 5
  ) {
    return 1.2; // add 1.2x friday rush fee
  }
  return 1; // no rush fee added
};

// function to calculate total delivery fee
export const calculateTotalFee = (state: State) => {
  // prices are in cents. 100 = 1€
  const baseDeliveryFee: number = 200;
  const cartValueInCents: number = state.cartValue * 100; // turn cart value from € to cents
  let feeInCents: number  = 0;

  if (cartValueInCents >= 10000) // if cart value is over 100€, delivery is free
    return 0;
  if (cartValueInCents < 1000) // add small order surcharge
    feeInCents = 1000 - cartValueInCents;

  feeInCents += baseDeliveryFee; // add base delivery fee
  feeInCents += calcDistanceFee(state); // count and add distance fee
  feeInCents += calcAdditionalItemFee(state); // count and add additional items fee
  feeInCents *= addRushFee(state); // add rush fee if Fri 3-7pm

  return Math.min(feeInCents, 1500) / 100; // return fee in €. Max fee is 15€
};

// component to calculate and display delivery fee
const DeliveryCalcComponent: React.FC = () => {
  const timeZonesOffset: number = new Date().getTimezoneOffset();
  const [submitted, setSubmitted] = useState(false); // state for conditional rendering
  const [state, setState] = useState<State>({ // state for input values and delivery fee
    cartValue: 0,
    deliveryDistance: 0,
    numberOfItems: 0,
    orderTime: new Date(Date.now() - timeZonesOffset * 60000).toISOString().slice(0, 16),
    deliveryFee: 0,
  });

  // handle all input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  // handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check that all input values are valid
    const result = calculateTotalFee(state);
    setState({
      ...state,
      deliveryFee: result,
    });
    setSubmitted(true);
  };

  return (
    <>
      {submitted && (
        <div className="flex flex-col justify-center items-center">
          <DisplayFee
            deliveryFee={state.deliveryFee}
            setSubmitted={setSubmitted}
          />
        </div>
      )}
      {!submitted && (
        <form
          className="max-w-md mx-auto rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <br />
          <p className="ml-[2.55rem] text-xs text-slate-400 dark:text-white">
            Cart value (€)
          </p>
          <div className="group flex flex-row items-center text-left">
            <div className="mr-1">
              <svg
                className="transition ease-in-out group-hover:scale-125 h-6 w-6 text-[#00c8ff]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <div className="basis-[90%]">
              <input
                className="font-semibold text-sm w-full py-2 px-3 focus:outline-none dark:bg-black dark:text-gray-400"
                placeholder="Cart Value"
                type="number"
                step="0.01"
                name="cartValue"
                onChange={handleInputChange}
                min="0"
                required
              />
              <hr className="dark:border-gray-800" />
            </div>
          </div>
          <br />
          <p className="ml-[2.55rem] text-xs text-slate-400 dark:text-white">
            Delivery Distance (m)
          </p>
          <div className="group flex flex-row items-center text-left">
            <div className="mr-1">
              <svg
                className="transition ease-in-out group-hover:scale-125 h-6 w-6 text-[#00c8ff]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="6" cy="19" r="2" />
                <circle cx="18" cy="5" r="2" />
                <path d="M12 19h4.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h3.5" />
              </svg>
            </div>
            <div className="basis-[90%]">
              <input
                className="font-semibold text-sm w-full py-2 px-3 focus:outline-none dark:bg-black dark:text-gray-400"
                placeholder="Delivery Distance"
                type="number"
                name="deliveryDistance"
                onChange={handleInputChange}
                min="0"
                required
              />
              <hr className="dark:border-gray-800" />
            </div>
          </div>
          <br />
          <p className="ml-[2.55rem] text-xs text-slate-400 dark:text-white">
            Number of Items
          </p>
          <div className="group flex flex-row items-center text-left">
            <div className="mr-1">
              <svg
                className="transition ease-in-out group-hover:scale-125 h-6 w-6 text-[#00c8ff]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="12" y1="20" x2="12" y2="10" />
                <line x1="18" y1="20" x2="18" y2="4" />
                <line x1="6" y1="20" x2="6" y2="16" />
              </svg>
            </div>
            <div className="basis-[90%]">
              <input
                className="font-semibold text-sm w-full py-2 px-3 focus:outline-none dark:bg-black dark:text-gray-400"
                placeholder="Number of Items"
                type="number"
                name="numberOfItems"
                onChange={handleInputChange}
                min="0"
                required
              />
              <hr className="dark:border-gray-800" />
            </div>
          </div>
          <br />
          <p className="ml-[2.55rem] text-xs text-slate-400 dark:text-white">
            Order Time
          </p>
          <div className="group flex flex-row items-center text-left">
            <div className="mr-1">
              <svg
                className="transition ease-in-out group-hover:scale-125 h-6 w-6 text-[#00c8ff]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <polyline points="12 8 12 12 14 14" />
                <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
              </svg>
            </div>
            <div className="basis-[90%]">
              <input
                className="font-semibold text-sm py-2 px-3 focus:outline-none dark:bg-black dark:text-gray-400"
                type="datetime-local"
                name="orderTime"
                onChange={handleInputChange}
                value={state.orderTime}
                required
              />
              <hr className="dark:border-gray-800" />
            </div>
          </div>
          <br />
          <br />
          <button
            className="block border dark:border-white font-semibold hover:bg-[#44b1f4] rounded-lg text-sm mx-auto px-4 py-2 focus:outline-none dark:bg-black dark:text-white"
            type="submit"
            onClick={() => calculateTotalFee(state)}
          >
            Calculate
          </button>
        </form>
      )}
    </>
  );
};

export default DeliveryCalcComponent;
