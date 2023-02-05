function isValidInput(input: string, type: string, setError: any): void {
  console.log('input:', input)
  console.log('type:', type)
    switch (type) {
      case "deliveryTime":
        if(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(input))
          setError(true)
          break;
      case "cartValue":
        if(!isNaN(parseFloat(input)) && isFinite(parseFloat(input)))
          setError(true)
          break;
      case "deliveyDistance":
        if(!isNaN(parseFloat(input)) && isFinite(parseFloat(input)))
          setError(true)
          break;
      case "numberOfItems":
        if(!isNaN(parseFloat(input)) && isFinite(parseFloat(input)))
          setError(true)
          break;
    }
  }

  export default isValidInput