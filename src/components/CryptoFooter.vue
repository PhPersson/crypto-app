<template>
    <footer class="text-center fixed-bottom">
      <a href="https://github.com/PhPersson/Crypto-Chart" target="_blank">
        Github
        <Icon icon="bytesize:github" />
      </a>
    </footer>
  </template>
  
<script>
import { Icon } from '@iconify/vue';
  export default {
    name: 'CryptoFooter',
    components: {
      Icon,
    },
  };

</script>