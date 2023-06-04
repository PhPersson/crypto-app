# CryptoApp
CryptoApp is a Vue.js application that allows users to fetch and display historical prices of various cryptocurrencies using the Coingecko API. :dollar: :credit_card: It also provides news articles related to cryptocurrency. :newspaper: The application utilizes Chart.js to visualize the price data on a line chart.



## Installation
To install CryptoApp, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory in the terminal.
3. Run the following command to install the required packages:

```javascript
npm install
``` 
4. Create a .env.local file in the root directory of the project.
5. Obtain an API key from [News API](https://newsapi.org/register) by signing up for an account.
6. In the .env.local file, add the following line and replace YOUR_NEWSAPI_KEY with your actual News API key:
```javascript
VUE_APP_NEWS_API_KEY=YOUR_NEWSAPI_KEY
```

7. Once the packages are installed, start the server by running the command:
```javascript
npm run serve
```
8. The application will be accessible at http://localhost:8080 in your browser.

# Usage
After installing and running CryptoApp, follow these steps to use the application:

1. Select a time period from the dropdown menu to view the historical prices of Bitcoin for the chosen duration.
2. The line chart will automatically update to display the price data based on your selection.
3. Browse the news section to find and read articles related to cryptocurrency.

## Technologies Used
* [Vue.js](https://vuejs.org/)
* [axios](https://github.com/axios/axios)
* [Chart.js](https://www.chartjs.org/)
* [Coingecko API](https://www.coingecko.com/en/api/documentation)
* [NewsApi](https://newsapi.org/docs)
* [Bootstrap 5.2](https://getbootstrap.com/docs/5.2/getting-started/introduction/)


# Demo
A live demo of the CryptoApp application can be found at [Crypto Chart](cryptchartapp.netlify.app). Please note that the news articles feature is not functional in the demo due to [API limitations](https://answers.netlify.com/t/getting-error-426-from-newsapi-org/16101)

![News page](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDU5M2FkNmU1ODZlN2MyMDlkMjk3ZDFiMDRjNDliNjgxZmM2MzIzZCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/kgnjhTshlmH2ktFTGe/giphy.gif)



## Future Improvements
- [ ] ~~Allow the user to search for a specific cryptocurrency~~
  - Will not be implemented due to the structure of the API. The "id" used to search for a currency does not always match the currency name.
- [X] Make the entire application responsive for smaller screens.
- [X] Allow the user to change the color of the chart
- [X] Display better error messages than alerts.

## Licens
This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for more information.

