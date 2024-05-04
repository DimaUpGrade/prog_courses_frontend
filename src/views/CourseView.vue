<template>
    <NavBar></NavBar>
    <div class="wrapper-course-view" v-if="course_info !== null">
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

                <a v-bind:href="course_info.link" id="course-link" class="button-shadow button-general">Ссылка на
                    курс</a>

                <h4>Опубликовал: <u>{{ course_info.publisher.username }}</u></h4>
                <!-- <p>{{ course_info }}</p> -->
            </div>
            <div id="reviews-block" v-if="course_reviews !== null">
                <h1>Отзывы</h1>
                <div id="reviews-content">
                    <Reviews v-bind:reviews="course_reviews" />
                    <button class="button-shadow button-general" id="open-review-form">Оставить отзыв</button>
                    <h2>Спасибо за отзыв!</h2>
                </div>
            </div>
        </div>
        <div id="comments-block" v-if="course_comments !== null">
            <div id="comments-content">
                <h1>Комментарии</h1>
                <!-- <p>{{ course_comments }}</p> -->
                <div id="new-comment-form" v-if="isAuth == true">
                    <div id="new-comment-form-content">
                        <textarea name="" id="new-comment-textarea"></textarea>
                        <button class="button-shadow button-general" id="submit-new-comment" @click="sendComment">Отправить</button>
                    </div>
                </div>

                <Comments @loadComments="loadMoreComments()" v-bind:comments="course_comments"
                    v-bind:more_comments="more_comments_link" />
            </div>

            <!-- <p>{{ course_comments }}</p> -->
            <!-- <p>{{ comments_data.results }}</p> -->
        </div>
    </div>

</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { API_URL, axios, customGETRequest, getCourseInfo, getComments, getReviews, postComment } from '../network';
import router from '@/router';
import Tags from '@/components/Tags.vue';
import Reviews from '@/components/Reviews.vue';
import Comments from '@/components/Comments.vue';
import { tokenIsSet } from '@/validation';

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
        
        // async rerenderComments() {
        //     this.comments_data = await getComments(this.id);
        //     this.course_comments = comments_data.results;
        //     this.more_comments_link = comments_data.next;
        // },
        // async rerenderReviews() {
        //     this.reviews_data = await getReviews(this.id);
        //     // this.course_reviews = reviews_data.results;
        // },
        async loadMoreComments() {
            let new_data;
            // new_data = await customGETRequest(this.comments_data.next)

            // временное решение, связанное с промисами, 
            // желательно позже перенести данную реализацию в network
            if (this.isAuth) {
                new_data = await axios({
                    method: 'get',
                    url: `${this.more_comments_link}`,
                    headers: {
                        'Authorization': 'Token ' + localStorage.getItem("token")
                    }
                })
                    .then(response => new_data = response)
                    .catch((error) => {
                        alert(error.response.status)
                    })
            }
            else {
                new_data = await axios({
                    method: 'get',
                    url: `${this.comments_data.next}`,
                    headers: {}
                })
                    .then(response => new_data = response)
                    .catch((error) => {
                        alert(error.response.status)
                    })
            }

            this.more_comments_link = new_data.data.next
            this.course_comments = this.course_comments.concat(new_data.data.results)
            // this.course_comments.concat(new_data.data.results);
        },
        async sendComment() {
            let text =  $('#new-comment-textarea').val();
            let result;
            result = await postComment(this.id, text);

            

            if (result.data == "Comment has been created") {
                $('#new-comment-textarea').val("");
                this.comments_data = await getComments(this.id);
                this.course_comments = this.comments_data.results;
                this.more_comments_link = this.comments_data.next;
            }
            
            
        }
    },
    data() {
        return {
            comments_data: null,
            reviews_data: null,
            course_info: null,
            course_reviews: {},
            course_comments: {},
            id: 0,
            more_comments_link: null,
            isAuth: false
        };
    },
    async created() {
        const id = this.$route.params.id
        this.id = id

        if (tokenIsSet()) {
            this.isAuth = true;
        }

        if (Number.isInteger(+id)) {
            this.course_info = await getCourseInfo(id)

            this.comments_data = await getComments(id)
            this.course_comments = this.comments_data.results
            this.more_comments_link = this.comments_data.next;

            this.reviews_data = await getReviews(id)
            this.course_reviews = this.reviews_data.results
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

#course-link {
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

</style>