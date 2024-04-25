<template>
    <div class="comments-list">
        <div class="comment-div" v-for="comment in comments">
            <div class="user-rating">
                <p class="user">{{ comment.user.username }}</p>
            </div>
            
            <p>{{ comment.commentary_text }}</p>
        </div>
    </div>

</template>

<script>
export default {
    props: ['comments'],
}
</script>

<style>

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

</style>