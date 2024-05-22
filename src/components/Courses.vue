<template>
    <div class="course-item default-item-in-wrapper" v-for="course in courses">
        <div class="course-item-content">
            <div class="course-item-header">
                <h2 class="course-item-header-title" @click="goToCourse(course.id)">{{ course.title }} (by {{
                    course.author.username
                    }})</h2>
                <div v-if="course.rating == 0" class="course-item-header-rating">
                        <h2>–</h2>
                    </div>
                <div v-if="course.rating != 0" v-bind:style="{'background-color': computeColor(course.rating)}" class="course-item-header-rating">
                    <h2>{{ course.rating }}/10</h2>
                </div>
            </div>
            <p>Теги: 
                <Tags v-bind:tags="course.tags" />
            </p>
            <p v-if="course.price !== 0">Стоимость: {{ course.price }}</p>
            <p v-if="course.price === 0">Стоимость: бесплатно</p>
            <br>
            <a v-bind:href="course.link" class="course-link button-shadow button-general">Ссылка на
                курс</a>
        </div>
    </div>
</template>

<script>
import Tags from '@/components/Tags.vue';
import router from '@/router';
import { getColorByValue } from '@/service';

export default {
    components: {
        Tags
    },
    props: ['courses'],
    data() {
        return {
            courses_props: this.courses
        }
    },
    methods: {
        goToCourse(id_course) {
            router.push(`/courses/${id_course}/`);
        },
        computeColor(rating) {
            return getColorByValue(rating)
        }
    },
    created() {
        // for (course_prop in this.courses_props) {
        //     $('#course-rating-'+course_prop['id']).style('background-color', 'green')
        // }
    }
}
</script>

<style>
.course-item-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    min-width: 300px;
}

.course-item-header-title {
    width: 90%;
    margin: 0;
}

.course-item-header-rating {
    width: 90px;
    text-align: center;
    background-color: var(--primary);
    padding: 10px 20px;
    border-radius: 5px;
}

.course-item-header-rating h2 {
    padding: 0;
    margin: 0;
}

.course-item-header-title:hover {
    text-decoration: underline;
    cursor: pointer;
}

.header-user-courses {
    height: 100px;
}

.course-item {
    padding: 1% 2%;
    width: 90%;
    min-height: 200px;
}

.course-item-content {
    padding: 10px 0px 20px 5px;
}
</style>