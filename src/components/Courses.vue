<template>
    <div class="course-item default-item-in-wrapper" v-for="course in courses">
        <div class="course-item-content">
            <div class="course-item-header">
                <h2 class="course-item-title" @click="goToCourse(course.id)">{{ course.title }} (by {{
                    course.author.username
                    }})</h2>
            </div>

            <p>Теги: 
                <Tags v-bind:tags="course.tags" />
            </p>
            <br>
            <a v-bind:href="course.link" class="course-link button-shadow button-general">Ссылка на
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
    props: ['courses'],
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