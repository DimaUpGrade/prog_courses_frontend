<template>
    <div id="search-options" @rerenderCourses="toParent()">
        <h1 v-if="show_header === true">Поиск курсов</h1>
        <div id="search-string">
            <!-- <p>{{ search_query }}</p> -->
            <!-- <p>{{ only_free }}</p> -->
            <input v-model="search_query" type="text" id="search-field" placeholder="Программирование на Python">
            <button class="button-shadow button-general button-default-border" id="search-button" @click="goToSearchResults()">Найти</button>
        </div>

        <label for="free-or-not-checkbox"><input v-model="only_free" type="checkbox" name="free-or-not-checkbox" id="free-or-not-checkbox">
            только бесплатные</label>
        <!-- <label for="verified-checkbox"><input type="checkbox" name="verified-checkbox" id="verified-checkbox" checked>
            только верифицированные</label> -->
    </div>
</template>

<script>

import router from '@/router';

export default {
    props: ['show_header'],
    data() {
        return {
            search_query: "",
            only_free: false,
            tag: ""
        }
    },
    methods: {
        goToSearchResults() {
            router.push({path:`/search/results/`, query:{search_query: this.search_query, only_free: this.only_free, tag: this.tag}});
        }
    }
}

</script>

<style>
#search-options {
    display: flex;
    background-color: var(--bright-background);
    /* padding: 30px; */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px 2%;
    gap: 20px;
    box-shadow:
        0 1px 1px hsl(0deg 0% 0% / 0.075),
        0 2px 2px hsl(0deg 0% 0% / 0.075),
        0 4px 4px hsl(0deg 0% 0% / 0.075),
        0 8px 8px hsl(0deg 0% 0% / 0.075),
        0 16px 16px hsl(0deg 0% 0% / 0.075);
    color: white;
    background-color: var(--bright-background);
    border-radius: 5px;
    margin: 0px;
    width: 90%;
}

#search-field {
    width: 50vw;
    padding: 5px;
}

#search-button {
    min-width: 150px;
    min-height: 30px;
}

#search-string {
    display: flex;
    flex-direction: row;
    gap: 15px;
}

</style>