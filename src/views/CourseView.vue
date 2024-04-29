<template>
    <NavBar></NavBar>
    <div class="wrapper" v-if="course_info !== null">
        <div class="course-and-reviews">
            <div id="course-info-block">
                <h1>{{ course_info.title }}</h1>
                <h3>by {{ course_info.author.username }}</h3>
                <Tags v-bind:tags="course_info.tags" />
                <h4>Платформа: {{ course_info.platform.title }}</h4>
                <h4 v-if="course_info.cost !== null">Стоимость: {{ course_info.cost }}</h4>
                <h4 v-if="course_info.cost == null">Стоимость: не указано</h4>
                <h4>Описание:</h4>
                <p>{{ course_info.description }}</p>

                <div id="course-link" @click="openInNewTab(course_info.link)">
                    <p>Ссылка на курс</p>
                </div>

                <h4>Опубликовал: <u>{{ course_info.publisher.username }}</u></h4>
                <!-- <p>{{ course_info }}</p> -->
            </div>
            <div id="reviews-block" v-if="course_reviews !== null">
                <h1>Отзывы</h1>
                <Reviews @rerenderReviews="rerenderReviews()" v-bind:reviews="course_reviews" />
            </div>
        </div>
        <div id="comments-block" v-if="course_comments !== null">
            <div id="comments-content">
                <h1>Комментарии</h1>
                <Comments @rerender="rerenderComments()" v-bind:comments="course_comments" />
            </div>
        </div>
    </div>

</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { API_URL, axios, getCourseInfo, getComments, getReviews } from '../network';
import { tokenIsSet } from '../validation';
import router from '@/router';
import Tags from '@/components/Tags.vue';
import Reviews from '@/components/Reviews.vue';
import Comments from '@/components/Comments.vue';

export default {
    name: 'CourseView',
    components: {
        NavBar,
        Tags,
        Reviews,
        Comments
    },
    methods: {
        openInNewTab(url) {
            window.open(url, '_blank', 'noreferrer')
        },
        async rerenderComments() {
            this.course_comments = await getComments(this.id);
        },
        async rerenderReviews() {
            this.course_reviews = await getReviews(this.id);
        }
    },
    data() {
        return {
            course_info: null,
            course_reviews: {},
            course_comments: {},
            id: 0
        };
    },
    async created() {
        const id = this.$route.params.id
        this.id = id

        if (Number.isInteger(+id)) {
            this.course_info = await getCourseInfo(id)
            this.course_comments = await getComments(id)
            this.course_reviews = await getReviews(id)
        }
        else {
            router.replace({ path: '/page_not_found' })
        }
    }
}
</script>

<style>
h1 {
    margin-top: 0;
}

.wrapper {
    margin: 20px;
    padding: 20px;
    max-width: 100% - 40px;
    background-color: var(--background-secondary);
    text-align: left;
    box-shadow:
        0 1px 1px hsl(0deg 0% 0% / 0.075),
        0 2px 2px hsl(0deg 0% 0% / 0.075),
        0 4px 4px hsl(0deg 0% 0% / 0.075),
        0 8px 8px hsl(0deg 0% 0% / 0.075),
        0 16px 16px hsl(0deg 0% 0% / 0.075);

    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    color: var(--dark-text);
}

.course-and-reviews {
    display: flex;
    gap: 15px;
    width: 99%;
    flex-direction: row;
}

#course-link {
    background-color: var(--primary);
    color: white;
    width: 150px;
    text-align: center;
    border-radius: 5px;
}

div#course-link p {
    padding: 5px;
}

#course-link:hover {
    cursor: pointer;
}

#course-info-block {
    width: 69%;
    background-color: var(--bright-background);
    padding: 20px;
    border-radius: 5px;
    box-shadow:
        0 1px 1px hsl(0deg 0% 0% / 0.075),
        0 2px 2px hsl(0deg 0% 0% / 0.075),
        0 4px 4px hsl(0deg 0% 0% / 0.075),
        0 8px 8px hsl(0deg 0% 0% / 0.075),
        0 16px 16px hsl(0deg 0% 0% / 0.075);
    color: white;
}

#reviews-block {
    width: 30%;
    min-height: 500px;
    color: white;
    /* background-color: var(--additional-block-bg); */
    background-color: var(--bright-background);
    box-shadow:
        0 1px 1px hsl(0deg 0% 0% / 0.075),
        0 2px 2px hsl(0deg 0% 0% / 0.075),
        0 4px 4px hsl(0deg 0% 0% / 0.075),
        0 8px 8px hsl(0deg 0% 0% / 0.075),
        0 16px 16px hsl(0deg 0% 0% / 0.075);
    border-radius: 5px;
    /* border: 5px solid var(--primary); */
    padding: 20px;
}

#comments-block {
    display: flex;
    width: 99%;
    margin: 0;
    /* justify-content: center; */
    min-height: 600px;

    color: white;
    /* background-color: var(--additional-block-bg); */
    background-color: var(--bright-background);
    box-shadow:
        0 1px 1px hsl(0deg 0% 0% / 0.075),
        0 2px 2px hsl(0deg 0% 0% / 0.075),
        0 4px 4px hsl(0deg 0% 0% / 0.075),
        0 8px 8px hsl(0deg 0% 0% / 0.075),
        0 16px 16px hsl(0deg 0% 0% / 0.075);
    border-radius: 5px;
    /* border: 5px solid var(--primary); */
    /* padding-left: 20px; */
}

#comments-content {
    width: 100%;
    padding: 20px;
}
</style>