<template>
    <div class="bitcoin-chart">
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
      <canvas id="bitcoin-chart" width="800" height="400" ref="chart"></canvas>
    </div>
</template>
  
<script>
import axios from 'axios';

  
  export default {
    name: 'BitcoinChart',
    data() {
      return {
        chart: null,
        prices: [],
        labels: [],
        days: "7",
      }
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=sek&days=${this.days}`;
  
        axios.get(url)
          .then(response => {
            console.log(response.data.prices);
            this.prices = response.data.prices;
            this.labels = response.data.prices.map(price => new Date(price[0]).toLocaleDateString("sv-SE"));
            console.log(response);
            console.log(this.labels);
          })
          .catch(error => {
            console.error(error);
          });
      }

  }
}
  </script>
