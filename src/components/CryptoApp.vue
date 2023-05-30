<template>
  <div class="main-div">
    <ErrorComp :errorMessage="this.errorMessage" v-if="showAlert"/>
    <div class="picker-div">
      <!-- Radio buttons för att låta användaren ändra färgen på grafen -->
      <div class="color-picker">
        <form>
          <label>
            Välj färg:
          </label>
            <li>
              <input type="radio" class="form-check-input" name="color" value="#ff6384" v-model="chartColor" @change="updateChartColor"> Röd
              <span class="color-box" style="background-color: #ff6384;"></span>
            </li>

            <li>
            <input type="radio" class="form-check-input" name="color" value="#4bc0c0" v-model="chartColor" @change="updateChartColor"> Grön
            <span class="color-box" style="background-color: #4bc0c0;"></span>
            </li>
            <li>
            <input type="radio" class="form-check-input" name="color" value="#36a2eb" v-model="chartColor" @change="updateChartColor"> Blå
            <span class="color-box" style="background-color: #36a2eb;"></span>
            </li>
            <li>
            <input type=radio class="form-check-input" name="color" value=#ff9f40 v-model=chartColor @change=updateChartColor> Orange
            <span class="color-box" style="background-color: #ff9f40;"></span>
            </li>
        </form>
      </div>
      
      <!-- Radio buttons för att låta användaren välja vilken kryptovaluta som skall visas -->
      <div class="crypto-picker">
        <form>
          <label>
            Välj kryptovaluta:
          </label>
            <li>
            Bitcoin <input type="radio" class="form-check-input" name="currency" value="bitcoin" v-model="currency" @change="fetchData"> <Icon icon="logos:bitcoin"/>
            </li>
            <li>
            Dogecoin <input type="radio" class="form-check-input" name="currency" value="dogecoin" v-model="currency" @change="fetchData"> <Icon icon="simple-icons:dogecoin"/>
            </li>
            <li>
            Ethereum <input type="radio" class="form-check-input" name="currency" value="ethereum" v-model="currency" @change="fetchData"> <Icon icon="logos:ethereum-color"/>
            </li>
            <li>
            Tether <input type="radio" class="form-check-input" name="currency" value="tether" v-model="currency" @change="fetchData"> <Icon icon="tabler:brand-tether"/>
            </li>
        </form>
      </div>
    </div>
    
      <form>
        <label>
          Välj tidsperiod:
        </label>
          <select v-model="days" @change="fetchData">
            <option value="7">7 Dagar</option>
            <option value="30">30 Dagar</option>
            <option value="60">60 Dagar</option>
          </select>
      </form>

    <div class="crypto-chart-div">
      <canvas id="crypto-chart" width="900" height="450" ref="chart"></canvas>
    </div>
    <CryptoFooter/>
  </div>
</template>
  
<script>
import axios from 'axios';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import CryptoFooter from './CryptoFooter.vue';
import ErrorComp from './ErrorComp.vue';
import { Icon } from '@iconify/vue';

export default {
    name: 'CryptoApp',
    components: {
      CryptoFooter,
      ErrorComp,
      Icon
    },
    data() {
      return {
        chart: null,
        prices: [],
        labels: [],
        days: "7",
        chartColor: "#36a2eb",
        currency: "bitcoin",
        showAlert: false,
        errorMessage: "",
      }
    },
    // vue.js inbyggda funktionen mounted används för att göra något när applikationen har laddats klart
    // här så hämtas data från api:et och sedan genereras en graf
    mounted() {
      this.fetchData();
    },
    
    methods: {
      fetchData() {
        const url = `https://api.coingecko.com/api/v3/coins/${this.currency}/market_chart?vs_currency=sek&days=${this.days}`;
        axios.get(url, { timeout: 5000 })
          .then(response => { //När datan har hämtas från api:et så lägg alla priser i listan "prices". 
            this.prices = response.data.prices
            this.labels = response.data.prices.map(price => new Date(price[0]).toLocaleDateString()); //Gå igenom listan med priser och för varje pris så matchas det med datum i rätt tidzon och datum
            this.renderChart();
          })
          .catch(error => {
            if (error.code === 'ECONNABORTED') { // kontrollera om felmeddelandet är en timeout
              this.showAlert = true;
              this.errorMessage = "API-anropet tog för lång tid. Vänligen försök igen"; // Ett felmeddlande visas om anropet tar längre tid än 5sek
              console.log(error); 
            } else {
              this.showAlert = true;
              this.errorMessage = "Ojdå. Följande fel uppstod:" + error;
              console.error(error);
            }
          });
      },
    renderChart() {
      const ctx = this.$refs.chart.getContext('2d');

      if (this.chart) { //Om det redan finns en tabell, så ta bort tabellen och generera en ny
        this.chart.destroy();
      }
      this.chart = new Chart(ctx, {
        type: 'line', //Ett linjediagram passar bäst för denna typen av data. Annars väljs typen av diagram här. 
        data: {
          labels: this.labels,
          datasets: [
            {
              label: this.currency.charAt(0).toUpperCase() + this.currency.slice(1),
              backgroundColor: this.chartColor,
              data: this.prices,
              fill: true,
              pointBackgroundColor: 'grey',
              pointRadius: 1.5,
            }
          ]
        },
        options: {
          scales: {
            y: {
              ticks: {
                callback: (value) => {
                  if (value >= 1000) {
                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' kr';
                  }
                  return value.toFixed(2) + ' kr';
                },
              }
            },
          },
        },
    });
    },
    updateChartColor() {
      this.renderChart();
    }
  },
}
</script>

<style>

.main-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}


.color-box {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 1em;
}

.crypto-chart-div {
  margin-bottom: 30px;
}

.picker-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.color-picker {
  margin-right: 20px;
}



/* För mindre skärmar */
@media (max-width: 600px) {

  /* Anpassa chart-elementet */
  #crypto-chart {
    width: 80%;
    height: auto;
  }
}
</style>
