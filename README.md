# GladyStoreFront

This app was created in standalone mode, so it's normal if you don't see a NgModule

The `calculator` is an Angular component that enables the user to enter an amount and displays the list of cards needed to reach that amount. The component communicates with an API to retrieve the list of cards.

## Features

- Input field for the amount
- Search button to trigger the API call
- Display of the list of cards needed to reach the entered amount
- Handling of possible amounts returned by the API
- Buttons increase/decrease to help the user to reach the available amount
- Search button is disabled when the input is empty
- Increase button is disabled when higher amount is reached
- Decrease button is disabled when lower amount is reached
- Auto-correction of the typed amount based on the API response

## To lunch the application

Before you run the application, please make sur that the backend is already lunched locally.

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`.

Then you can play with it to test different cases

## Level-3

- Rework `CalculatorComponent`, by implementing the `ControlValueAccessor` interface and its methods.
- Move the `shopId` from `calculator.service` to a from entry, so it can be changed directly from the select box in the form.
- Make `shopId` as an input for the `CalculatorComponent`
- Since the available shop is only number 5, the `CalculatorComponent` is disabled when the selected store is another value rather than 5.
- Improve the display of card by adding `cardFormatPipe`
- Now, the `search` button is only enabled when the value of the input is changed, so the user cannot send multiple requests for the same amount.
- Rename same variables
- Change detection strategy of the `AppComponent` to OnPush.
- Some css changes
- Add `calculatorValidator` as a validator for the calculator form, so we're able to disabled the `buy` button when the parent form is not valid e.g: cards is empty `{value:5, cards:[]}`

## Note

URL can be easily changed in the application from `calculator.service.ts` file
