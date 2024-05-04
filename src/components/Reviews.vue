<template>
    <div class="review-list">
        <div class="review-div" v-for="review in reviews">
            <div class="user-rating">
                <p class="user"><b>{{ review.user.username }}</b></p>
                <p class="rating">{{ review.rating }}/10</p>
            </div>
            
            <p>{{ review.text_review }}</p>
            <p><i>{{ getDate(review.creation_date) }}</i></p>
            <div class="like-block">
                <button class="button-shadow like_button" v-bind:class="'like_button_' + review.is_liked"  v-bind:id="'review_likes_count_' + review.id" @click="likeR(review.id)">
                    {{ review.likes_count }} <span class="material-symbols-rounded">thumb_up</span>
                    
                </button>
            </div>
        </div>
    </div>

</template>

<script scope>
import { tokenIsSet, formatDate } from '@/validation';
import { likeReview } from '../network';

export default {
    props: ['reviews'],
    data() {
        return {
            isAuth: false
        }
    },
    created() {
        this.isAuth = tokenIsSet();
        // alert(this.isAuth)
    },
    methods: {
        async likeR(id) {
            await likeReview(id)
            // this.$emit("rerenderReviews")
        },
        getDate (date) {
            return formatDate(date)
        }
    }
}
</script>

<style scope>
.review-list {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    /* justify-content: center; */
    align-items: center;
    gap: 10px;
    background-color: white;
    padding: 10px;
    /* margin-right: 20px; */
    border-radius: 5px;
    -webkit-box-shadow: -3px 3px 8px 0px rgba(34, 60, 80, 0.2) inset;
    -moz-box-shadow: -3px 3px 8px 0px rgba(34, 60, 80, 0.2) inset;
    box-shadow: -3px 3px 8px 0px rgba(34, 60, 80, 0.2) inset;
}

.review-div {
    width: 95%;
    /* margin: 0 10px; */
    padding: 5px 10px;
    background-color: var(--primary);
    border-radius: 5px;
}

.user-rating {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 30px;
}

.user {
    width: 90%;
    padding-bottom: 0px;
    margin-bottom: 0px;
}

.rating {
    width: 10%;
}

</style>