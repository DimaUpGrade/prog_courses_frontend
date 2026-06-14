<template>
    <NavBar></NavBar>
    <div class="wrapper">
        <div id="user-courses-content">
            <div class="header-user-courses default-item-in-wrapper ">
                <h1>Курсы пользователя</h1>
            </div>
            <!-- <p v-if="user_courses != null"> {{ this.user_courses }}</p> -->

            <Courses v-bind:courses="user_courses" />
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Courses from '@/components/Courses.vue'
import { tokenIsSet } from '@/validation';
import { getUserCourses } from '@/network'
import Tags from '@/components/Tags.vue';
import router from '@/router';

export default {
    name: 'UserCourses',
    components: {
        NavBar,
        Courses,
        Tags
    },
    methods: {

    },
    data() {
        return {
            user_courses: null
        }
    },
    async created() {
        if (tokenIsSet()) {
            let user_courses_data;
            user_courses_data = await getUserCourses();
            this.user_courses = user_courses_data.results;
        }
        else {
            swal({
                title: "Ошибка!",
                text: "Страница пользовательских курсов доступна только для авторизованных пользователей!",
                type: "success"
            }).then(function () {
                router.back();
            });

        }
    }
}
</script>

<style>
.default-item-in-wrapper {
    background-color: var(--bright-background);
    color: white;
    width: 90%;
    border-radius: 5px;
    padding: 15px 2%;
    box-shadow:
        0 1px 1px hsl(0deg 0% 0% / 0.075),
        0 2px 2px hsl(0deg 0% 0% / 0.075),
        0 4px 4px hsl(0deg 0% 0% / 0.075),
        0 8px 8px hsl(0deg 0% 0% / 0.075),
        0 16px 16px hsl(0deg 0% 0% / 0.075);
}

.header-user-courses h1 {
    padding: 30px;
    text-align: center;
    margin: 0;
}

#user-courses-content {
    display: flex;
    gap: 15px;
    width: 99%;
    min-height: 800px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: var(--background-secondary);
}

</style>