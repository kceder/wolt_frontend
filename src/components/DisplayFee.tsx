import '../App.css';

function DisplayFee(deliveryFee: any) {

    console.log('deliveryFee: ', deliveryFee);
    if (deliveryFee.deliveryFee === 0) {
        return (
            <div>
                <br />
                <p>Free</p>
            </div>
        )
    } else {
        return (
            <div className="col-span-2">
            <p className="text-l text-slate-400 ">Delivery Fee</p><p className="font-semibold">{deliveryFee.deliveryFee}€</p>
            </div>
        )
    }
}

export default DisplayFee;