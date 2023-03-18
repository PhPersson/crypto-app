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
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
  
export default {
    name: 'BitcoinChart',
    data() {
      return {
        chart: null,
        prices: [],
        days: "7",
      }
    },
    // mounted används för att göra något när applikationen har laddats klart
    // här så hämtas data från api:et och sedan genereras en tabell
    mounted() {
      this.fetchData();
    },

    methods: {
      fetchData() {
        const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=sek&days=${this.days}`;
  
        axios.get(url)
          .then(response => {
            this.prices = response.data.prices
          })
          .catch(error => {
            console.error(error);
            alert.error("Ojdå. Följande fel uppstod:" + error);
          });
      },
      renderChart() {
        const ctx = this.$refs.chart.getContext('2d');
        if (this.chart) {
          this.chart.destroy();
        }

        this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: 'Bitcoin',
              backgroundColor: '#f87979',
              data: this.prices
            }
          ]
        }
      });
      }
    },
}
</script>

<style>

</style>
