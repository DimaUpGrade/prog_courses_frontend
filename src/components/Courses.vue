<template>
    <div class="course-item default-item-in-wrapper" v-for="user_course in user_courses">
        <div class="course-item-content">
            <div class="course-item-header">
                <h2 class="course-item-title" @click="goToCourse(user_course.id)">{{ user_course.title }} (by {{
                    user_course.author.username
                    }})</h2>
            </div>

            <p>Теги: 
                <Tags v-bind:tags="user_course.tags" />
            </p>
            <br>
            <a v-bind:href="user_course.link" id="course-link" class="button-shadow button-general">Ссылка на
                курс</a>
        </div>
    </div>
</template>

<script>
import Tags from '@/components/Tags.vue';
import router from '@/router';

export default {
    components: {
        Tags
    },
    props: ['user_courses'],
    methods: {
        goToCourse(id_course) {
            router.push(`/courses/${id_course}/`);
        }
    }
}
</script>

<style>
.course-item-title {
    width: 95%;
}

.course-item-title:hover {
    text-decoration: underline;
    cursor: pointer;
}
</style>