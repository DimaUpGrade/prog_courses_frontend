<template>
    <NavBar></NavBar>
    <div class='wrapper' id="new-review-wrapper">
        <div id="new-review-content" v-if="isAuth !== false">
            <div id="rating">
                <span class="white-color-font">Укажите Вашу оценку: </span>
                <select name="" id="rating-select">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <textarea id="text-review-textarea" class="default-text-area" placeholder="Поделитесь своими впечатлениями от курса"></textarea>
            <button class="button-shadow button-general button-default-border" @click="sendReview"
                id="post-review-submit-button">Отправить</button>
        </div>

    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { postReview } from '../network';
import router from '@/router';
import { tokenIsSet } from '@/validation';

export default {
    name: 'NewReviewView',
    components: {
        NavBar
    },
    methods: {
        async sendReview() {
            let text_review = $('#text-review-textarea').val()
            let rating = $("#rating-select").val();
            let result;
            result = await postReview(this.id, text_review, rating)
        }
    },
    data() {
        return {
            id: 0,
            isAuth: false
        }
    },
    created() {
        const id = this.$route.params.id
        this.id = id

        if (!tokenIsSet()) {
            swal({
                    title: "Ошибка!",
                    text: "Оставлять отзывы могут только авторизованные пользователи!",
                    type: "success"
                }).then(function() {
                    router.replace({ path: `/courses/${id}/` });
                });
        }
        else {
            this.isAuth = true
        }
    },
}
</script>

<style>
#text-review-textarea {
    width: 100% - 20px;
    height: 500px;
}

.default-text-area {
    padding: 5px;
    border-radius: 5px;
    resize: none;
    font-size: 16px;
}

#post-review-submit-button {
    width: 100% - 20px;
    height: 40px;
    /* align-self: flex-end; */
    padding: 5px 0px;
}

#new-review-content {
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: column;
    width: 90%;
    /* not working yet */
    /* height: 100%; */
    padding: 50px;
    gap: 20px;
    background-color: var(--bright-background);
    border-radius: 5px;
    box-shadow:
        0 1px 1px hsl(0deg 0% 0% / 0.075),
        0 2px 2px hsl(0deg 0% 0% / 0.075),
        0 4px 4px hsl(0deg 0% 0% / 0.075),
        0 8px 8px hsl(0deg 0% 0% / 0.075),
        0 16px 16px hsl(0deg 0% 0% / 0.075);
}
</style>