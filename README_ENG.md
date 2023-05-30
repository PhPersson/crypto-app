# Crypto Chart
A Vue.js application that fetches historical prices for various cryptocurrencies :dollar: :credit_card: from Coingecko API and displays them on a line chart using Chart.js.

## Installation
Clone this repository.

* Run the below command in the project directory to install necessary packages.
```javascript
npm install
```
* Then run the below command to start the server.
```javascript
npm run serve
```

# Usage
Select the time period from the drop-down menu.
The chart updates to display the historical prices for Bitcoin for the selected time period.

## Technologies Used
* [Vue.js](https://vuejs.org/)
* [axios](https://github.com/axios/axios)
* [Chart.js](https://www.chartjs.org/)
* [Coingecko API](https://www.coingecko.com/en/api/documentation)
* [Bootstrap 5.2](https://getbootstrap.com/docs/5.2/getting-started/introduction/)

# Demo
You can find a live demo of the application at [Crypto Chart](https://exquisite-bavarois-73d29d.netlify.app/)



## Improvements
- [ ] ~~Allow the user to search for a specific cryptocurrency
  - Will not be implemented due to the structure of the API. The "id" used to search for a currency does not always match the currency name."
- [X] Make the entire application responsive for smaller screens.
- [X] Allow the user to change the color of the chart
- [X] Display better error messages than alerts.

## License
This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for more information.
