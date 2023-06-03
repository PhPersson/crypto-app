<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <router-link to="/">Go back to Home</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 50px;
    text-align: center;
  }
  </style>
  