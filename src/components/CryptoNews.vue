<template>

<div class="container">
  <div class="row justify-content-center">
    <h1 class="display-3">News about crypto the last 30 days from <i>{{ this.getLast30Days() }}</i> </h1>

    <div v-if="loading">
      <p>Loading...</p>
    </div>

    <div class="error" v-else-if="error">
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
    <div v-if="statusCode === 426">
        <Popper :content="`Please note that this project's API can only be accessed from localhost. To run the project se the github for more info 💵 `">
            <button type="button" class="btn btn-light">No articles?</button>
         </Popper>
    </div>
  </div>
</div>


</template>

<script>
import axios from 'axios';
import Popper from "vue3-popper";
export default {
    components: {
      Popper
    },
    data() {
        return {
            articles: [],
            loading: true,
            error: false,
            statusCode: 0,
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
            this.statusCode = error.response.status;
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

.error {
    color: red;
    text-align: center;
}
</style>
  
