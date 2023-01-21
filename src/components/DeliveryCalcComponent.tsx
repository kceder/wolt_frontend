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
    
    const baseDeliveryFee: number = 200;
    const additionalDistanceFee: number = 100;
    const cartValueInCents: number = state.cartValue * 100;
    let feeInCents: number = 0;

    if (cartValueInCents < 1000) {
        feeInCents = 1000 - cartValueInCents ;
    }
    const distanceFee: number = baseDeliveryFee;
    if (state.deliveryDistance > 1000) {
        const extraDistance: number = state.deliveryDistance - 1000;
        const roundedExtraDistance: number = Math.ceil(extraDistance / 500) * 500;
        const extra500m: number = Math.ceil(extraDistance / 500);
        feeInCents += extra500m * additionalDistanceFee;
    }
    feeInCents += distanceFee;
    if (state.numberOfItems >= 5) {
        const extraItems: number = state.numberOfItems - 4;
        feeInCents += extraItems * 50;
        if (state.numberOfItems > 12) {
            feeInCents += 120;
        }
    }
    const orderDate = new Date(state.orderTime);
    if (orderDate.getHours() >= 15 && orderDate.getHours() <= 18 && orderDate.getDay() === 5) {
        feeInCents *= 1.2;
    }
    if (cartValueInCents >= 10000) {
        feeInCents = 0;
    }
    const feeInEuros: number = Math.min(feeInCents, 1500) / 100;
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
    }
    // handle form submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleCalculate(state, setState);
    }

    return (
        <form className='max-w-m bg-white rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
                <br />
                <p className='ml-[2.55rem] text-xs text-slate-400 ml-3'>Cart value (€)</p>
            <div className='flex flex-row items-center text-left'>
                <div className='mr-1'>
                    <svg className="h-6 w-6 text-blue-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"> 
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                </div>
                <div className='basis-[90%]'>
                    <input className='font-semibold text-sm w-full py-2 px-3 focus:outline-none ' placeholder='Cart Value' type="float" name="cartValue" onChange={handleInputChange} value={state.cartValue} min="0" />
                <hr />
                </div>
            </div>
                <br />
                <p className='ml-[2.55rem] text-xs text-slate-400 ml-3'>Delivery Distance (m)</p>
            <div className='flex flex-row items-center text-left'>
                <div className='mr-1'>
                    <svg className="h-6 w-6 text-blue-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> 
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <circle cx="6" cy="19" r="2" />
                        <circle cx="18" cy="5" r="2" />
                        <path d="M12 19h4.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h3.5" />
                    </svg>
                </div>
                <div className='basis-[90%]'>
                    <input className='font-semibold text-sm w-full py-2 px-3 focus:outline-none' placeholder='Delivery Distance' type="number" name="deliveryDistance" onChange={handleInputChange} value={state.deliveryDistance} min="0" />
                <hr />
                </div>
            </div>          
                <br />
                <p className='ml-[2.55rem] text-xs text-slate-400 ml-3'>Number of Items</p>
            <div className='flex flex-row items-center text-left'>
                <div className='mr-1'>
                    <svg className="h-6 w-6 text-blue-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
                    </svg>
                </div>
                <div className='basis-[90%]'>
                    <input className='font-semibold text-sm w-full py-2 px-3 focus:outline-none' placeholder='Number of Items' type="number" name="numberOfItems" onChange={handleInputChange} value={state.numberOfItems} min="0" />
                <hr />
                </div>
            </div>
                <br />
                <p className='ml-[2.55rem] text-xs text-slate-400 ml-3'>Order Time</p>
            <div className='flex flex-row items-center text-left'>
                <div className='mr-1'>
                    <svg className="h-6 w-6 text-blue-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <polyline points="12 8 12 12 14 14" /> 
                        <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
                    </svg>
                </div>
                <div className='basis-[90%]'>
                    <input className='font-semibold text-sm py-2 px-3 focus:outline-none' type="datetime-local" name="orderTime" onChange={handleInputChange} value={state.orderTime} />
                <hr />
                </div>
            </div>
            <br />
            <br />
            <button className='bg-white border font-semibold hover:bg-[#44b1f4] hover:scale-[1.1] focus:ring-4 focus:ring-[#44b1f4] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none' type="submit" onClick={() => handleCalculate(state, setState)}>Calculate</button>
            <DisplayFee deliveryFee={state.deliveryFee} />
        </form>
    )
}

export default DeliveryCalcComponent;