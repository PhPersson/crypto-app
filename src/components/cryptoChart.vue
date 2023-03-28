<template>
  <div class="main-container">
    <!-- Radio buttons för att låta användaren ändra färgen på grafen -->
    <div class="color-picker">
      <form>
        <label>
          Välj färg:
          <input type="radio" name="color" value="#ff6384" v-model="chartColor" @change="updateChartColor"> Röd
          <span class="color-box" style="background-color: #ff6384;"></span>
          <input type="radio" name="color" value="#4bc0c0" v-model="chartColor" @change="updateChartColor"> Grön
          <span class="color-box" style="background-color: #4bc0c0;"></span>
          <input type="radio" name="color" value="#36a2eb" v-model="chartColor" @change="updateChartColor"> Blå
          <span class="color-box" style="background-color: #36a2eb;"></span>
          <input type=radio name="color" value=#ff9f40 v-model=chartColor @change=updateChartColor> Orange
          <span class="color-box" style="background-color: #ff9f40;"></span>
        </label>
      </form>
    </div>
    <!-- Radio buttons för att låta användaren välja mellan Ethereum eller Bitcoin skall visas -->
    <div class="crypto-picker">
      <form>
        <label>
          Välj kryptovaluta:
          <br>
          Ethereum <input type="radio" name="currency" value="ethereum" v-model="currency" @change="fetchData"> <Icon icon="logos:ethereum-color"/>
          <br>
          Bitcoin <input type="radio" name="currency" value="bitcoin" v-model="currency" @change="fetchData"> <Icon icon="logos:bitcoin"/> 
        </label>
      </form>
    </div>

    <!-- Låter anvädaren välja vilket tidsspann som ska visa de historiska priserna -->
    <div class="crypto-chart">
      <form>
        <label>
          Välj tidsperiod:
          <select v-model="days" @change="fetchData">
            <option value="7">7 Dagar</option>
            <option value="30">30 Dagar</option>
            <option value="60">60 Dagar</option>
          </select>
        </label>
      </form>
      <canvas id="crypto-chart" width="800" height="400" ref="chart"></canvas>
    </div>

    <!-- Footer med länk till repository på github -->
  <div class="footer">
    <a href="https://github.com/PhPersson/Crypto-Chart" target="_blank">Källkod på Github <Icon icon="bytesize:github"/></a>
  </div>

  </div>
</template>
  
<script>
import axios from 'axios';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import { Icon } from '@iconify/vue';

export default {
    name: 'cryptoChart',
    components: {
      Icon,
      },
    data() {
      return {
        chart: null,
        prices: [],
        labels: [],
        days: "7",
        chartColor: "",
        currency: "bitcoin",
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
              alert("API-anropet tog för lång tid. Vänligen försök igen."); // Ett felmeddlande visas om anropet tar längre tid än 5sek
              console.log(error); 
            } else {
              console.error(error);
              alert("Ojdå. Följande fel uppstod:" + error);
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
            label: 
            this.currency,
            backgroundColor: this.chartColor,
            data: this.prices,
            fill: true,
            pointBackgroundColor: 'grey',
            pointRadius: 1.5,
          }
        ]
      },
      });
    },
    updateChartColor() {
      this.renderChart();
    }
    },
}
</script>

<style src="..\css\cryptoChart.css"> </style>
