<template>
    <NavBar></NavBar>
    <div class="wrapper" id="wrapper-search">
        <SearchBar v-bind:show_header="true"></SearchBar>
        <!-- <div id="search-options">
            <h1>Поиск курсов</h1>
            <div id="search-string">
                <input type="text" id="search-field" placeholder="Программирование на Python">
                <button class="button-shadow button-general button-default-border" id="search-button">Найти</button>
            </div>
            
            <label for="free-or-not-checkbox"><input type="checkbox" name="free-or-not-checkbox" id="free-or-not-checkbox"> только бесплатные</label>
        </div> -->
        <!-- <Courses v-bind:courses="courses" v-if="search_results != null"/> -->
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import SearchBar from '@/components/SearchBar.vue';
// import Courses from '@/components/Courses.vue';

export default {
    name: 'SearchCourses',
    components: {
        NavBar,
        SearchBar
    }
}
</script>

<style></style>