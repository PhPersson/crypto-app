<template>
<div class="container">
  <div class="row justify-content-center">
    <h1 class="display-3">News for the last 7 days from {{ this.getLast30Days() }}</h1>

    <div v-if="loading">
      <p>Loading...</p>
    </div>

    <div v-else-if="error">
      <p>Error occurred while fetching the articles. Please try again later.</p>
    </div>

    <div v-else>
        <div class="row justify-content-center">
            <div class="col-md-6 col-lg-5 mb-4" v-for="article in articles" :key="article.title">
            <div class="card">
                <div class="bg-image hover-overlay ripple shadow-2-strong rounded-5" data-mdb-ripple-color="light">
                <img :src="article.urlToImage" class="card-img-top" alt="Article Image" />
                <a :href="article.url"> </a>
                </div>
                <div class="card-body">
                <span class="badge bg-danger px-2 py-1 shadow-1-strong mb-3">News of the day</span>
                <h4 class="card-title"><strong>{{ article.title }}</strong></h4>
                <p class="card-text text-muted">{{ article.description }}</p>
                <a :href="article.url" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Read more</a>
                </div>
            </div>
            </div>
        </div>
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
        async fetchArticles() {
        const apiKey =  `${process.env.VUE_APP_API_KEY}`
        const apiUrl = `https://newsapi.org/v2/everything?q=crypto&pageSize=20&language=en&from=${this.getLast30Days()}&sortBy=publishedAt&apiKey=${apiKey}`;

        try {
            const response = await axios.get(apiUrl);
            this.articles = response.data.articles;
            this.loading = false;
        } catch (error) {
            console.error(error);
            this.error = true;
            this.loading = false;
        }
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

.display-3 {
    padding: 5%;
    text-align: center;
}
</style>
  