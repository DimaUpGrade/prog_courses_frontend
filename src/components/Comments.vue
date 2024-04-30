<template>
    <div class="comments-list">
        <div class="comment-div" v-for="comment in comments"  @rerender="toParent()">
                <p class="user">{{ comment.user.username }}</p>
            
            <p>{{ comment.commentary_text }}</p>
            <div class="like-block">
                <button class="like_button" v-bind:class="'like_button_' + comment.is_liked" v-bind:id="'comment_likes_count_' + comment.id" @click="like(comment.id)">
                    {{ comment.likes_count }} <span class="material-symbols-rounded">thumb_up</span>
                    
                </button>
            </div>
            
            <!-- <p class="likes">Нравится: {{ comment.likes_count }}</p> -->
            
        </div>
    </div>

</template>

<script scope>
import { tokenIsSet } from '../validation';
import { likeComment } from '../network';

export default {
    props: ['comments'],
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
            this.$emit("rerender")
        }
    }
}
</script>

<style scope>

.comments-list {
    display: flex;
    flex-direction: column;
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

.comment-div {
    width: 99%;
    /* margin: 0 10px; */
    padding: 5px 10px;
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
}
/* 
.likes {
    
} */

.like_button_true {
    background-color: rgb(74, 255, 113);
    color: white;
}

</style>