<template>
    <NavBar></NavBar>
    <div class="wrapper">
        <div id="search-options">
            <h1>Поиск курсов</h1>
            <div id="search-string">
                <input type="text" id="search-field" placeholder="Программирование на Python">
                <button class="button-shadow button-general button-default-border" id="search-button">Найти</button>
            </div>
            
            <label for="free-or-not-checkbox"><input type="checkbox" name="free-or-not-checkbox" id="free-or-not-checkbox"> только бесплатные</label>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
    name: 'SearchCourses',
    components: {
        NavBar
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
    padding: 50px;
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