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
            <div>
                <br />
                <p className="text-xl">Delivery Fee: {deliveryFee.deliveryFee}</p>
            </div>
        )
    }
}

export default DisplayFee;