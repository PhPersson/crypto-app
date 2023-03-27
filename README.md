# Crypto Chart
_This readme is also available in [english](README_ENG.md)_

En Vue.js-applikation som hämtar historiska priser för Bitcoin samt Ethereum :dollar: :credit_card: från Coingecko API och visar dem på ett linjediagram med hjälp av Chart.js.

## Installation
Klona detta repository.
* Kör nedan kommando i projektets katalog för att installera nödvändiga paket.
```javascript
npm install
``` 

* Kör sedan nedan kommando för att starta servern.
```javascript
npm run serve
```


# Användning
Välj tidsperioden från drop-down menyn.
Diagrammet uppdateras för att visa historiska priser för Bitcoin för den valda tidsperioden.

## Teknologier som används
* [Vue.js](https://vuejs.org/)
* [axios](https://github.com/axios/axios)
* [Chart.js](https://www.chartjs.org/)
* [Coingecko API](https://www.coingecko.com/en/api/documentation)


# Demo
Du hittar en live demo av applikationen på [Crypto Chart](https://exquisite-bavarois-73d29d.netlify.app/)

## Licens
Det här projektet är licensierat under Apache License 2.0. Se  [LICENSE](LICENSE) för mer information.

## Förbättringar

- [ ] Låta användaren söka efter en specifik kryptovaluta
- [X] Låta användaren ändra färgen på grafen
- [ ] Gör hela appliaktionen responsiv för mindre skärmar

