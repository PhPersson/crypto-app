<template>
  <div class="app">
    <bitcoin-chart />
  </div>
</template>

<script>
import BitcoinChart from './components/BitcoinChart.vue';

export default {
  name: 'App',
  components: {
    BitcoinChart
  }
}
</script>

<style>
.app {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
