<template>
    <NavBar></NavBar>
    <div class="wrapper news-wrapper">
        <div class="news-content">
            <div class="news-header">
                <h1>Новости сайта</h1>
            </div>
            <News v-bind:posts="news_posts" />
            <button v-if="more_link != null" class="button-shadow button-general more-button"
                @click="loadMorePosts()">Загрузить ещё</button>
        </div>

    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { getNews, loadMore } from '../network';
import News from '@/components/News.vue'

export default {
    name: 'NewsView',
    components: {
        NavBar,
        News
    },
    data() {
        return {
            news_posts: null,
            more_link: null
        }
    },
    methods: {
        async loadMorePosts() {
            let new_data;
            new_data = await loadMore(this.more_link);
            this.news_posts = this.news_posts.concat(new_data.data.results);
            this.more_link = new_data.data.next;
        }
    },
    async created() {
        let news_data;
        news_data = await getNews();
        this.news_posts = news_data.results;
        this.more_link = news_data.next;
    }
}
</script>

<style>
.news-wrapper {
    justify-content: flex-start;
}

.news-header {
    background-color: var(--bright-background);
    color: white;
    text-align: center;
    padding: 2%;
    width: 90%;
    border-radius: 5px;
    box-shadow:
        0 1px 1px hsl(0deg 0% 0% / 0.075),
        0 2px 2px hsl(0deg 0% 0% / 0.075),
        0 4px 4px hsl(0deg 0% 0% / 0.075),
        0 8px 8px hsl(0deg 0% 0% / 0.075),
        0 16px 16px hsl(0deg 0% 0% / 0.075);
}

.news-header h1 {
    margin: 0;
}

.news-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    /* padding: 2%; */
    gap: 20px;
}
</style>