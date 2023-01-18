import React, { useState } from 'react';
import '../App.css';
import DisplayFee from './DisplayFee';

// interface for input values
interface State {
    cartValue: number;
    deliveryDistance: number;
    numberOfItems: number;
    orderTime: string;
    deliveryFee: number;
}

// function to calculate delivery fee

const handleCalculate = ( state: State, setState: any ) => {

    // prices are in cents 100 = 1€

    console.log('HERE 1 ------------------');
    
    const baseDeliveryFee: number = 200;
    const additionalDistanceFee: number = 100;
    const cartValueInCents: number = state.cartValue * 100;
    let feeInCents: number = 0;

    console.log('------------------');
    console.log('calculating... ')
    console.log('cartValueInCents: ', cartValueInCents);
    if (cartValueInCents < 1000) {
        feeInCents = 1000 - cartValueInCents ;
    }
    const distanceFee: number = baseDeliveryFee;
    console.log('feeInCents before distance: ', feeInCents);
    if (state.deliveryDistance > 1000) {
        const extraDistance: number = state.deliveryDistance - 1000;
        console.log('extraDistance: ', extraDistance);
        const roundedExtraDistance: number = Math.ceil(extraDistance / 500) * 500;
        const extra500m: number = Math.ceil(extraDistance / 500);
        console.log('extra500m: ', extra500m);
        console.log('roundedExtraDistance: ', roundedExtraDistance);
        feeInCents += extra500m * additionalDistanceFee;
    }
    feeInCents += distanceFee;
    console.log('Distance fee:', distanceFee);
    console.log('feeInCents before extraItems: ', feeInCents);
    if (state.numberOfItems > 5) {
        const extraItems: number = state.numberOfItems - 5;
        console.log('extraItems: ', extraItems);
        feeInCents += extraItems * 50;
        if (state.numberOfItems > 12) {
            feeInCents += 120;
        }
    }
    console.log('feeInCents after extraItems: ', feeInCents);
    const orderDate = new Date(state.orderTime);
    console.log('orderDate: ', orderDate);
    console.log('orderDate.getUTCHours(): ', orderDate.getHours());
    console.log('orderDate.getDay(): ', orderDate.getDay());
    if (orderDate.getHours() >= 15 && orderDate.getHours() <= 18 && orderDate.getDay() === 5) {
        console.log('Friday 15-19!');
        feeInCents *= 1.2;
    }
    if (state.cartValue >= 10000) {
        feeInCents = 0;
    }
    const feeInEuros: number = Math.min(feeInCents, 1500) / 100;
    console.log('feeInEuros: ', feeInEuros);
    console.log('------------------');
    setState({
        ...state,
        deliveryFee: feeInEuros
    });
}
// component to calculate and display delivery fee
const DeliveryCalcComponent: React.FC = () => {

    // const [deliveryFee, setDeliveryFee] = useState<number>(0);
    const [state, setState] = useState<State>({
        cartValue: 0,
        deliveryDistance: 0,
        numberOfItems: 0,
        orderTime: new Date().toISOString().slice(0, 16),
        deliveryFee: 0
    });

    // handle input all input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
        // handleCalculate(state, setDeliveryFee);
        console.log('state: ', state);
    }

    // handle form submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleCalculate(state, setState);
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label>
                <br />
                <br />
                Cart Value (€):
                <input type="float" name="cartValue" onChange={handleInputChange} value={state.cartValue} min="0" />
            </label>
            <label>
                <br />
                <br />
                Delivery Distance (m):
                <input type="number" name="deliveryDistance" onChange={handleInputChange} value={state.deliveryDistance} min="0" />
            </label>
            <label>
                <br />
                <br />
                Number of Items:
                <input type="number" name="numberOfItems" onChange={handleInputChange} value={state.numberOfItems} min="0" />
            </label>
            <label>
                <br />
                <br />
                Order Time:
                <input type="datetime-local" name="orderTime" onChange={handleInputChange} value={state.orderTime} />
            </label>
            <br />
            <br />
            <button type="submit" onClick={() => handleCalculate(state, setState)}>Calculate Delivery Price</button>
        </form>
            <DisplayFee deliveryFee={state.deliveryFee} />
        </div>
    )
}

export default DeliveryCalcComponent;