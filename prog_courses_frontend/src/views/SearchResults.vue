<template>
    <NavBar></NavBar>
    <div class="wrapper" id="wrapper-search-results">
        <SearchBar v-bind:show_header="false"></SearchBar>
        <div class="tag" v-if="tag != ''" @click="removeTag()" title="Отключить фильтр по тегу">
            <p>{{ tag }}</p>
        </div>
        <Courses v-if="courses != null" v-bind:courses="courses" />
        <div v-if="courses != null">
            <h2 v-if="results_data.count == 0">Ничего не найдено</h2>
            <button v-if="more_link !== null" class="button-shadow button-general more-button" @click="getMoreCourses()">Загрузить ещё</button>
        </div>
        
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Courses from '@/components/Courses.vue'
import SearchBar from '@/components/SearchBar.vue';
import router from '@/router';
import { loadMore, searchCourses } from '@/network';
// import { tokenIsSet } from '@/validation';
// import Tags from '@/components/Tags.vue';
// import router from '@/router';

export default {
    name: 'SearchResults',
    components: {
        NavBar,
        Courses,
        SearchBar
    },
    data() {
        return {
            results_data: null,
            courses: null,
            tag: null,
            search_query: null,
            only_free: null,
            more_link: null,
            emptyObject: []
        }
    },
    watch: {

    },
    methods: {
        async rerenderResults() {
            this.search_query = this.$route.query.search_query;
            this.only_free = this.$route.query.only_free;
            this.tag = this.$route.query.tag;
            this.results_data = await searchCourses(this.search_query, this.only_free, this.tag);
            this.courses = this.results_data.results;
        },
        async getMoreCourses() {
            let new_data;
            new_data = await loadMore(this.more_link);
            this.more_link = new_data.data.next;
            this.courses = this.courses.concat(new_data.data.results);
        },
        removeTag() {
            this.tag = "";
            router.push({path:`/search/results/`, query:{search_query: this.search_query, only_free: this.only_free, tag: this.tag}});
        }
    },
    async created() {
        this.search_query = this.$route.query.search_query;
        this.only_free = this.$route.query.only_free;
        this.tag = this.$route.query.tag;
        this.results_data = await searchCourses(this.search_query, this.only_free, this.tag);
        this.courses = this.results_data.results;
        this.more_link = this.results_data.next;

        this.$watch(
            () => this.$route.params,
            () => {
                this.rerenderResults();
            },
            // fetch the data when the view is created and the data is
            // already being observed
            { immediate: true }
        )
    }
}
</script>

<style>
#wrapper-search-results {
    justify-content: flex-start;
}

.more-button {
    padding: 20px;
    width: 200px;
    /* height: 80px; */
    border: none;
    border-radius: 5px;
    box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075),
        0 2px 2px hsl(0deg 0% 0% / 0.075),
        0 4px 4px hsl(0deg 0% 0% / 0.075),
        0 8px 8px hsl(0deg 0% 0% / 0.075),
        0 16px 16px hsl(0deg 0% 0% / 0.075);
}

.more-button:hover {
    color: var(--bright-background);
    background-color: white;
}
</style>