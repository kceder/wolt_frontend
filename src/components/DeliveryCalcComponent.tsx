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
    if (state.numberOfItems >= 5) {
        const extraItems: number = state.numberOfItems - 4;
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
    if (cartValueInCents >= 10000) {
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
        <div className='grid grid-cols-1 gap-4 p-4 mx-auto'>
        <form className='bg-white rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
            <label className='col-span-2 text-left max-w-xs'>
                <br />
                <br />
                <p className='text-xs text-slate-400 ml-3'>Cart value (€):</p>
                <input className='font-semibold text-lg w-full py-2 px-3 focus:outline-none ' placeholder='Cart Value' type="float" name="cartValue" onChange={handleInputChange} value={state.cartValue} min="0" />
                <hr />
            </label>
            <label className='col-span-2 text-left max-w-xs'>
                <br />
                <p className='text-xs text-slate-400 ml-3'>Delivery Distance (m):</p>
                <input className='font-semibold text-lg w-full py-2 px-3 focus:outline-none' placeholder='Delivery Distance' type="number" name="deliveryDistance" onChange={handleInputChange} value={state.deliveryDistance} min="0" />
                <hr />            
            </label>
            <label className='col-span-2 text-left max-w-xs'>
                <br />
                <br />
                <p className='text-xs text-slate-400 ml-3'>Number of Items:</p>
                <input className='font-semibold text-lg w-full py-2 px-3 focus:outline-none' placeholder='Number of Items' type="number" name="numberOfItems" onChange={handleInputChange} value={state.numberOfItems} min="0" />
                <hr />
            </label>
            <label className='col-span-2 text-left max-w-xs'>
                <br />
                <br />
                <p className='text-xs text-slate-400 ml-3'>Order Time:</p>
                <input className='font-semibold text-lg w-full py-2 px-3 focus:outline-none' type="datetime-local" name="orderTime" onChange={handleInputChange} value={state.orderTime} />
                <hr />
            </label>
            <br />
            <br />
            <button className='bg-white border font-semibold hover:bg-[#44b1f4] hover:scale-[1.1] focus:ring-4 focus:ring-[#44b1f4] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none' type="submit" onClick={() => handleCalculate(state, setState)}>Calculate</button>
            <DisplayFee deliveryFee={state.deliveryFee} />
        </form>
        </div>
    )
}

export default DeliveryCalcComponent;