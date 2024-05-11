<template>
    <NavBar></NavBar>
    <div class="wrapper">
        <div class="content">
            <p>Курсы пользователя</p>
            <p v-if="user_courses != null"> {{ this.user_courses }}</p>
            <button @click="getFavoriteCourses()">test</button>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { } from '@/network'

export default {
    name: 'UserCourses',
    components: {
        NavBar
    },
    methods: {
        async getFavoriteCourses() {
            alert('test')
        }
    },
    data() {
        return {
            user_courses: null
        }
    }
}
</script>

<style>

</style>