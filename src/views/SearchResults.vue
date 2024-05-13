<template>
    <NavBar></NavBar>
    <div class="wrapper">
        
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Courses from '@/components/Courses.vue'
import { tokenIsSet } from '@/validation';
import Tags from '@/components/Tags.vue';
import router from '@/router';

export default {
    name: 'SearchResults',
    components: {
        NavBar,
        Courses,
        Tags
    },
    methods: {

    }
}
</script>

<style>

</style>