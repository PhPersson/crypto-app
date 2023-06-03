<template>

<div class="container">
    
  <div class="row justify-content-center">
    <h1 class="display-3">News for the last 7 days from {{ this.getLast30Days() }}</h1>
    <div class="col-md-6 col-lg-5 mb-4" v-for="article in articles" :key="article.title">
      <div class="bg-image hover-overlay ripple shadow-2-strong rounded-5" data-mdb-ripple-color="light">
        <img :src="article.urlToImage" class="img-fluid" />
        <a :href="article.url">
          <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
        </a>
      </div>
      <span class="badge bg-danger px-2 py-1 shadow-1-strong mb-3">News of the day</span>
      <h4><strong>{{ article.title }}</strong></h4>
      <p class="text-muted">{{ article.description }}</p>
      <a :href="article.url" target="_blank" rel="noopener noreferrer">
        <button type="button" class="btn btn-primary">Read more</button>
      </a>
    </div>
  </div>
</div>

</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            articles: [],
            loading: true,
            error: false,
        };
    },
    mounted() {
        this.fetchArticles();
    },
    methods: {
        fetchArticles() {
        const apiKey =  `${process.env.VUE_APP_API_KEY}`
        const apiUrl = `https://newsapi.org/v2/everything?q=crypto&from=${this.getLast30Days()}&sortBy=publishedAt&apiKey=${apiKey}`;

        axios
            .get(apiUrl)
            .then(response => {
            this.articles = response.data.articles;
            this.loading = false;
            })
            .catch(error => {
            console.error(error);
            this.error = true;
            this.loading = false;
            });
        },

        getLast30Days() {
            const currentDate = new Date();
            const pastDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
            return pastDate.toLocaleDateString();
        }
    },
    };
</script>
  
<style scoped>
</style>
  