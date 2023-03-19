<template>
  <div class="app">
    <cryptoChart />
  </div>
</template>

<script>
import cryptoChart from './components/cryptoChart.vue';

export default {
  name: 'App',
  components: {
    cryptoChart
  }
}
</script>

<style>
.app {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
