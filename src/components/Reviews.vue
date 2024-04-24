<template>
    <div class="review-list">
        <div class="review-div" v-for="review in reviews">
            <div class="user-rating">
                <p class="user">{{ review.user.username }}</p>
                <p class="rating">{{ review.rating }}/10</p>
            </div>
            
            <p>{{ review.text_review }}</p>
        </div>
    </div>

</template>

<script>
export default {
    props: ['reviews'],
}
</script>

<style scope>
.review-list {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    gap: 10px;
    background-color: white;
    padding: 10px;
    margin-right: 20px;
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
}

.user {
    width: 90%;
}

.rating {
    width: 5%;
}
</style>