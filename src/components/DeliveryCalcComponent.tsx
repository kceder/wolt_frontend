import React, { useState } from "react";
import "../App.css";
import DisplayFee from "./DisplayFee";
import InputCartValue from "./inputComponents/InputCartValue";
import InputDistance from "./inputComponents/InputDistance";
import InputItemCount from "./inputComponents/InputItemCount";
import InputTime from "./inputComponents/InputTime"
// interface for input values
export interface State {
  cartValue: number;
  deliveryDistance: number;
  numberOfItems: number;
  orderTime: string;
  deliveryFee: number;
}

// function to calculate distance fee
const calcDistanceFee = (state: State): number => {
  const additionalDistanceFee: number = 100;
  if (state.deliveryDistance > 1000) {
    const extraDistance: number = state.deliveryDistance - 1000;
    const extra500m: number = Math.ceil(extraDistance / 500);
    return extra500m * additionalDistanceFee;
  } else return 0;
};
// function to calculate additional items fee
const calcAdditionalItemFee = (state: State): number => {
  let extraItemsFee: number = 0;
  if (state.numberOfItems >= 5) {
    // add additional items fee if more than 4 items
    const extraItems: number = state.numberOfItems - 4;
    extraItemsFee += extraItems * 50; // 50 cents per item
    if (state.numberOfItems > 12) {
      // add bulk fee
      extraItemsFee += 120;
    }
  }
  return extraItemsFee;
};

// function to add rush fee if order is placed on Friday 3-7pm
const addRushFee = (state: State): number => {
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
export const calculateTotalFee = (state: State): number => {
  // prices are in cents. 100 = 1€
  const baseDeliveryFee: number = 200;
  const cartValueInCents: number = state.cartValue * 100; // turn cart value from € to cents
  let feeInCents: number = 0;

  if (cartValueInCents >= 10000)
    // if cart value is over 100€, delivery is free
    return 0;
  if (cartValueInCents < 1000)
    // add small order surcharge
    feeInCents = 1000 - cartValueInCents;

  feeInCents += baseDeliveryFee; // add base delivery fee
  feeInCents += calcDistanceFee(state); // count and add distance fee
  feeInCents += calcAdditionalItemFee(state); // count and add additional items fee
  feeInCents *= addRushFee(state); // add rush fee if Fri 3-7pm

  return Math.min(feeInCents, 1500) / 100; // return fee in €. Max fee is 15€
};

// handle all input changes
export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<State>>,
  state: State
) => {
  const { name, value } = e.target;
  setState({
    ...state,
    [name]: value,
  });
};

// Main component for calculator form and fee display
// if submitted, display fee with DisplayFee component
const DeliveryCalcComponent: React.FC = () => {
  const timeZonesOffset: number = new Date().getTimezoneOffset();
  const [submitted, setSubmitted] = useState(false); // state for conditional rendering
  const [state, setState] = useState<State>({
    // state for input values and delivery fee
    cartValue: 0,
    deliveryDistance: 0,
    numberOfItems: 0,
    // set order time to current time by default
    orderTime: new Date(Date.now() - timeZonesOffset * 60000)
      .toISOString()
      .slice(0, 16),
    deliveryFee: 0,
  });

  // handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = calculateTotalFee(state); // calculate delivery fee
    setState({
      // update state with delivery fee
      ...state,
      deliveryFee: result,
    });
    setSubmitted(true);
  };

  return (
    <>
      {submitted && ( // if submitted, display fee
        <div className="flex flex-col justify-center items-center">
          <DisplayFee
            deliveryFee={state.deliveryFee}
            setSubmitted={setSubmitted}
          />
        </div>
      )}
      {!submitted && ( // if not submitted, display form with inputs
        <form
          className="max-w-md mx-auto rounded px-8 my-24"
          onSubmit={handleSubmit}
        >
          <InputCartValue state={state} setState={setState} />
          <InputDistance state={state} setState={setState} />
          <InputItemCount state={state} setState={setState} />
          <InputTime state={state} setState={setState} />
          <br />
          <br />
          <button
            className="block border dark:border-white font-semibold hover:bg-[#44b1f4] rounded-lg text-sm mx-auto px-4 py-2 focus:outline-none dark:bg-[#121212] dark:text-white"
            type="submit"
          >
            Calculate
          </button>
        </form>
      )}
    </>
  );
};

export default DeliveryCalcComponent;
