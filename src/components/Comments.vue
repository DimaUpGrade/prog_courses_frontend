<template>
    <div class="comments-list">
        <div class="comment-div" v-for="comment in comments" @loadComments="toParent()">
            <p class="user"><b>{{ comment.user.username }}</b></p>

            <p>{{ comment.commentary_text }}</p>
            <p><i>{{ getDate(comment.creation_date) }}</i></p>
            <div class="like-block">
                <button class="button-shadow like_button" v-bind:class="'like_button_' + comment.is_liked"
                    v-bind:id="'comment_likes_count_' + comment.id" @click="like(comment.id)">
                    <span v-bind:id="'comment_likes_count_span_' + comment.id">{{ comment.likes_count }}</span> <span
                        class="material-symbols-rounded">thumb_up</span>

                </button>
            </div>
        </div>
        <button id="more-comments-button" class="button-general shadow-button" v-if="more_comments !== null"
            @click="getComments()">Загрузить
            ещё</button>
    </div>

</template>

<script>
import { tokenIsSet, formatDate } from '../validation';
import { likeComment } from '../network';

export default {
    props: ['comments', 'more_comments'],
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
        async like(id) {
            await likeComment(id)
            // this.$emit("rerender")

            if (this.isAuth == true) {
                const name_button = '#comment_likes_count_' + id;
                const name_span = "#comment_likes_count_span_" + id;

                let likes = Number($(name_span).text());

                if ($(name_button).hasClass('like_button_true')) {
                    $(name_button).removeClass('like_button_true');
                    $(name_button).addClass('like_button_false');
                    likes -= 1;
                    const test = likes.toString()
                    $(name_span).html(test);
                }
                else {
                    $(name_button).removeClass('like_button_false');
                    $(name_button).addClass('like_button_true');
                    likes += 1;
                    const test = likes.toString()
                    $(name_span).html(test);
                }
            }
        },
        getDate(date) {
            return formatDate(date)
        },
        getComments() {
            this.$emit("loadComments")
        }
    }
}
</script>

<style scope>
.comments-list {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    width: 95%;
    height: 600px;
    align-items: center;
    gap: 10px;
    background-color: white;
    padding: 20px;
    margin: auto auto;
    /* margin-right: 20px; */
    border-radius: 5px;
    -webkit-box-shadow: -3px 3px 8px 0px rgba(34, 60, 80, 0.2) inset;
    -moz-box-shadow: -3px 3px 8px 0px rgba(34, 60, 80, 0.2) inset;
    box-shadow: -3px 3px 8px 0px rgba(34, 60, 80, 0.2) inset;
    overflow-y: scroll;
    overflow-x: hidden;
}

.comment-div {
    width: 96%;
    /* margin: 0 10px; */
    padding: 20px;
    background-color: var(--primary);
    border-radius: 5px;
}

/* .user-rating p {
    margin: 10px 5px;
} */

.user {
    margin-right: 80%;
    min-width: 10%;
    max-width: 20%;
    height: 20px;
}

.like_button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    letter-spacing: 6px;
    border: 1px solid var(--bright-background);
}

.like_button:hover {
    cursor: pointer;
}

/* 
.likes {
    
} */

.like_button_true {
    background-color: rgb(74, 255, 113);
    color: white;
}

#more-comments-button {
    padding: 20px;
    width: 30%;
    border: none;
    border-radius: 5px;
    box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075),
        0 2px 2px hsl(0deg 0% 0% / 0.075),
        0 4px 4px hsl(0deg 0% 0% / 0.075),
        0 8px 8px hsl(0deg 0% 0% / 0.075),
        0 16px 16px hsl(0deg 0% 0% / 0.075);
}

#more-comments-button:hover {
    color: white;
    background-color: var(--bright-background);
}
</style>