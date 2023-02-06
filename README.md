
# Delivery Fee Calculator

A delivery fee calculator built with TypeScript and React. Assignment for Wolt.
This was my first time using TypeScript and a great excuse to do so!
Creating dark mode, light mode and mobile layout was also nice little introduction to Tailwind.

## How to run?

To run the project, use the following command:

`npm start`

To run tests for the project, use the following command:

`npm run test`

## Overview of the app

Components:
+ DeliveryCalcComponent
+ DisplayFee
+ Header
+ Footer

The main component of the application is the `DeliveryCalcComponent`, which includes four input fields:
+ cart value
+ devivery distance
+ item count
+ felivery time

and a button to calculate the delivery fee. On button click `DisplayFee` component is rendered to show the final delivery fee.

Other components in the application include the `Header` and `Footer` components.

Styling for the application is done using Tailwind. The aim is to keep the application light and efficient.

## Functions

+ calculateTotalFee - Takes values of input fields and return the final delivery fee in euros (€).
+ calcDistanceFee - Returns 1€ additional fee for every starting 500m for distance over 1km (1000m).
+ calcAdditionalItemFee - For every item over 4 items, adds 50 cents to fee. Adds additional 1,20€ to orders of >= 12 items.
+ addRushFee - If delivery time is on Friday 3pm - 7pm returns 1.2 multiplier. Else returns 1.


## Contributing

If, for some reason, you would like to contribute to this project, feel free to reach out and I'll be happy to learn from your suggestions 🙂
