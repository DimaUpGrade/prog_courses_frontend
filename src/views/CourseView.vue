<template>
    <NavBar></NavBar>
    <div class="wrapper-course-view" v-if="course_info !== null">
        <div class="course-and-reviews">
            <div id="course-info-block">
                <div id="course-header">
                    <h1 id="course-title-h1">{{ course_info.title }}</h1>
                    <div id="to-favorite-div">
                        <img v-if="in_favorite === true" src="../assets/add_to_favorite_fill1.svg" alt="add to favorite"
                            class="favorite_icon" @click="toFavorite()" title="Убрать из избранного">
                        <img v-if="in_favorite === false" src="../assets/add_to_favorite_fill0.svg"
                            alt="add to favorite" class="favorite_icon" @click="toFavorite()"
                            title="Добавить в избранное">
                    </div>
                </div>
                <h3>by <a class="course_author_link" v-bind:href="course_info.author.link">{{ course_info.author.username
                        }}</a></h3>

                <Tags v-bind:tags="course_info.tags" />

                <h4>Платформа: {{ course_info.platform.title }}</h4>

                <h4 v-if="course_info.price !== 0">Стоимость: {{ course_info.price }}</h4>
                <h4 v-if="course_info.price === 0">Стоимость: Бесплатно</h4>

                <h4>Описание:</h4>
                <p>{{ course_info.description }}</p>

                <a v-bind:href="course_info.link" class="course-link button-shadow button-general">Ссылка на
                    курс</a>

                <h4>Опубликовал: <u>{{ course_info.publisher.username }}</u></h4>
            </div>
            <div id="reviews-block">
                <div class="review-block-header">
                    <div class="review-block-header-title">
                        <h1>Отзывы</h1>
                    </div>
                    <div v-if="course_info.rating == 0" class="review-block-header-rating">
                        <h2>–</h2>
                    </div>
                    <div v-if="course_info.rating != 0" v-bind:style="{'background-color': getColorForRating(course_info.rating)}" class="review-block-header-rating">
                        <h2 class="course-rating">{{ course_info.rating }}/10</h2>
                    </div>
                </div>
                <div id="reviews-content">
                    <Reviews @loadReviews="loadMoreReviews()" v-bind:reviews="course_reviews"
                        v-bind:more_reviews="more_reviews_link" v-if="course_reviews !== null" />
                    <button class="button-shadow button-general" id="open-review-form"
                        v-if="existing_review === false || isAuth === false" @click="goToReviewForm">Оставить
                        отзыв</button>
                    <h2 v-if="existing_review !== false && existing_review !== null">Спасибо за отзыв!</h2>
                </div>
            </div>
        </div>
        <div id="comments-block">
            <div id="comments-content">
                <h1>Комментарии</h1>
                <Comments @loadComments="loadMoreComments()" v-bind:comments="course_comments"
                    v-bind:more_comments="more_comments_link" v-if="course_comments !== null" />

                <p v-if="isAuth == false">Оставлять комментарии могут только авторизованные пользователи.</p>
                <div id="new-comment-form" v-if="isAuth == true">
                    <div id="new-comment-form-content">
                        <textarea name="" id="new-comment-textarea"></textarea>
                        <button class="button-shadow button-general" id="submit-new-comment"
                            @click="sendComment">Отправить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { getCourseInfo, getComments, getReviews, postComment, isReviewExists, loadMore, addCourseToFavorite } from '../network';
import router from '@/router';
import Tags from '@/components/Tags.vue';
import Reviews from '@/components/Reviews.vue';
import Comments from '@/components/Comments.vue';
import { tokenIsSet } from '@/validation';
import { getColorByValue } from '@/service';

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
        async loadMoreComments() {
            let new_data;
            new_data = await loadMore(this.more_comments_link)
            this.more_comments_link = new_data.data.next
            this.course_comments = this.course_comments.concat(new_data.data.results)
            // this.course_comments.concat(new_data.data.results);
        },
        async loadMoreReviews() {
            let new_data;
            new_data = await loadMore(this.more_reviews_link)
            this.more_reviews_link = new_data.data.next
            this.course_reviews = this.course_reviews.concat(new_data.data.results)
        },
        async sendComment() {
            let text = $('#new-comment-textarea').val();
            let result;
            result = await postComment(this.id, text);
            if (result.data == "Comment has been created") {
                $('#new-comment-textarea').val("");
                this.comments_data = await getComments(this.id);
                this.course_comments = this.comments_data.results;
                this.more_comments_link = this.comments_data.next;
            }
        },
        goToReviewForm() {
            if (this.isAuth == true) {
                router.push('new_review');
            }
            else {
                swal({
                    text: "Оставлять отзывы могут только авторизованные пользователи!",
                    type: "success"
                })
            }
        },
        async toFavorite() {
            if (this.isAuth) {
                this.in_favorite = !this.in_favorite;
                let result;
                result = await addCourseToFavorite(this.id);
            }
            else {
                swal('Авторизуйтесь, чтобы добавлять курсы в закладки!')
            }
        },
        getColorForRating(rating) {
            return getColorByValue(rating)
        }
    },
    data() {
        return {
            comments_data: null,
            reviews_data: null,
            course_info: null,
            course_reviews: null,
            course_comments: null,
            id: 0,
            more_comments_link: null,
            more_reviews_link: null,
            isAuth: false,
            existing_review: null,
            in_favorite: null
        }
    },
    async created() {
        const id = this.$route.params.id
        this.id = id

        if (tokenIsSet()) {
            this.isAuth = true;
        }

        if (Number.isInteger(+id)) {
            this.course_info = await getCourseInfo(id);
            if (this.course_info !== null) {
                this.comments_data = await getComments(id);
                this.course_comments = this.comments_data.results;
                this.more_comments_link = this.comments_data.next;

                this.reviews_data = await getReviews(id);
                this.course_reviews = this.reviews_data.results;
                this.more_reviews_link = this.reviews_data.next;

                this.in_favorite = this.course_info.in_favorite

                if (this.isAuth === true) {
                    this.existing_review = await isReviewExists(id);
                }
                else {
                    this.existing_review = false;
                }
            }
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

.review-block-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: 20%;
    margin: 10px 0 30px 0;
}

.review-block-header-rating {
    width: 30%;
    text-align: center;
    background-color: var(--primary);
    padding: 10px 20px;
    border-radius: 5px;
}

.review-block-header-rating h2 {
    margin: 0;
}

.review-block-header-title {
    width: 50%;
}

.review-block-header-title h1 {
    padding: 0;
    margin: 0;
}

.wrapper-course-view {
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

.button-shadow {
    -webkit-box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.48);
    -moz-box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.48);
    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.48);
}

.button-general {
    background-color: var(--primary);
    color: white;
}

.course-link {
    width: 150px;
    text-align: center;
    border-radius: 5px;
    padding: 5px 20px;
    text-decoration: none;
}

.button-general:hover {
    background-color: white;
    color: var(--primary);
    cursor: pointer;
}

#course-info-block {
    width: 69%;
    background-color: var(--bright-background);
    padding: 35px 20px 20px 30px;
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
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    gap: 20px;
}

.swal-text {
    background-color: #FEFAE3;
    padding: 17px;
    border: 1px solid #F0E1A1;
    display: block;
    margin: 22px;
    text-align: center;
    color: #61534e;
}

#new-comment-form {
    width: 100%;
    margin-bottom: 20px;
}

#new-comment-form-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
}

#new-comment-textarea {
    width: 98%;
    height: 200px;
    padding: 5px;
    border-radius: 5px;
    resize: none;
    font-size: 16px;
}

#submit-new-comment {
    width: 98%;
    height: 60px;
    border-radius: 5px;
    border: none;
    padding: 5px;
}

#open-review-form {
    border-radius: 5px;
    border: none;
    /* padding: 5px; */
    width: 98%;
    height: 50px;
}

#reviews-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
}

.button-default-border {
    border-radius: 5px;
    border: none;
    padding: 5px;
}

.white-color-font {
    color: white;
}

#course-header {
    display: flex;
    flex-direction: row;
}

#course-title-h1 {
    width: 95%;
}

#to-favorite-div {
    width: 5%;
    height: 50px;
    margin: auto auto;
    padding: 0;
    /* background-color: red; */
}

.favorite_icon {
    height: 2.5em;
}

.favorite_icon:hover {
    cursor: pointer;
}

/* .material-symbols-outlined {
    font-size: 50px;
} */

.course_author_link {
    color: white;
}

.defult_link {
    color: white;
}

.defult_link:visited {
    color: white;
}

/* .course-rating {
    -webkit-text-stroke: 1px var(--bright-background);
    color: rgb(138, 138, 138);
} */
</style>