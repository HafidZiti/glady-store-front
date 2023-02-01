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

## Note

URL and shopId can be easily changed in the application from `calculator.service.ts` file
