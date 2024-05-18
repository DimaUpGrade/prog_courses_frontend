<template>
    <NavBar></NavBar>
    <div class="wrapper">
        <div id="suggest-course-content" v-if="isAuth === true">
            <div class="center-div">
                <h1 class="white-color-font">Форма предложения курса</h1>
                <br>
                <div class="label-and-fields-block" id="label-fields-suggest-course">
                    <div class="data-labels" id="labels-suggest-course">
                        <h4 class="white-color-font">Название: </h4>
                        <h4 class="white-color-font">Платформа: </h4>
                        <h4 class="white-color-font">Ссылка: </h4>
                        <h4 class="white-color-font">Автор: </h4>
                        <h4 class="white-color-font">Ссылка на автора: </h4>
                        <h4 class="white-color-font">Стоимость: </h4>
                        <h4 class="white-color-font" id="description-label">Описание:</h4>
                    </div>
                    <div class="data-fields" id="fields-suggest-course">
                        <input type="text" id="title-course-input" placeholder="Введите название курса" v-model="title">
                        <p class="error-p" id="title-course-input-error-p"></p>

                        <input type="text" id="platform-course-input"
                            placeholder="Укажите платформу, на которой находится курс (YouTube, Stepik или др.)"
                            v-model="platform">
                        <p class="error-p" id="platform-course-input-error-p"></p>

                        <input type="text" id="link-course-course-input" placeholder="Вставьте ссылку на курс"
                            v-model="course_link">
                        <p class="error-p" id="link-course-course-input-error-p"></p>

                        <input type="text" id="author-name-course-input"
                            placeholder="Укажите имя или никнейм автора курса" v-model="author_username">
                        <p class="error-p" id="author-name-course-input-error-p"></p>

                        <input type="text" id="author-link-course-input"
                            placeholder="Укажите ссылку на страницу автора курса" v-model="author_link">
                        <p class="error-p" id="author-link-course-input-error-p"></p>

                        <input type="text" id="cost-course-input"
                            placeholder='Укажите заявленную стоимость курса (или напишите "Бесплатно", если курс бесплатный)'
                            v-model="cost">
                        <p class="error-p" id="cost-course-input-error-p"></p>

                        <textarea class="default-text-area" id="suggest-course-textarea"
                            placeholder="Укажите описание курса" v-model="description"></textarea>
                        <p class="error-p" id="suggest-course-textarea-error-p"></p>


                    </div>
                </div>
                <button class="button-shadow button-general button-default-border" id="suggest-course-button"
                    @click="sendCourse()">Предложить курс</button>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { postCourse } from '@/network'
import { tokenIsSet, isValueURL } from '@/validation';
import router from '@/router';

export default {
    name: 'SuggestCourseView',
    components: {
        NavBar
    },
    data() {
        return {
            isAuth: false,
            title: "",
            platform: "",
            course_link: "",
            author_username: "",
            author_link: "",
            description: "",
            cost: "",
            title_validation: false,
            platform_validation: false,
            author_username_validation: false,
            description_validation: false,
            cost_validation: false,
            course_link_validation: false,
            author_link_validation: false,
        }
    },
    methods: {
        sendCourse() {
            if (this.title_validation == true &&
                this.platform_validation == true &&
                this.author_username_validation == true &&
                this.description_validation == true &&
                this.cost_validation == true &&
                this.course_link_validation == true &&
                this.author_link_validation == true) {
                // alert('penis')
                postCourse(this.title, this.platform, this.course_link, this.author_username, this.author_link, this.description, this.cost);
            }
            else {
                swal({
                    title: "Ошибка!",
                    text: "Проверьте правильность ввода данных!"
                });
            }
        }
    },
    watch: {
        title(new_title) {
            if (new_title.trim().length > 4) {
                $('#title-course-input').css('border', '2px solid greenyellow');
                $('#title-course-input-error-p').html("");
                this.title_validation = true;
            }
            else {
                $('#title-course-input').css('border', '2px solid red');
                $('#title-course-input-error-p').html("Не менее 5 символов!");
                this.title_validation = false;
            }
        },
        platform(new_platform) {
            if (new_platform.trim().length > 0) {
                $('#platform-course-input').css('border', '2px solid greenyellow');
                $('#platform-course-input-error-p').html("");
                this.platform_validation = true;
            }
            else {
                $('#platform-course-input').css('border', '2px solid red');
                $('#platform-course-input-error-p').html("Поле не может быть пустым!");
                this.platform_validation = false;
            }
        },
        course_link(new_course_link) {
            if (new_course_link.trim().length > 0) {
                if (isValueURL(new_course_link)) {
                    $('#link-course-course-input').css('border', '2px solid greenyellow');
                    $('#link-course-course-input-error-p').html("");
                    this.course_link_validation = true;
                }
                else {
                    $('#link-course-course-input').css('border', '2px solid red')
                    $('#link-course-course-input-error-p').html("Введённое значение не является ссылкой!");
                    this.course_link_validation = false;
                }
            }
            else {
                $('#link-course-course-input').css('border', '2px solid red');
                $('#link-course-course-input-error-p').html("Поле не может быть пустым!");
                this.course_link_validation = false;
            }
        },
        author_username(new_author_username) {
            if (new_author_username.trim().length > 0) {
                $('#author-name-course-input').css('border', '2px solid greenyellow');
                $('#author-name-course-input-error-p').html("");
                this.author_username_validation = true;
            }
            else {
                $('#author-name-course-input').css('border', '2px solid red');
                $('#author-name-course-input-error-p').html("Введённое значение не является ссылкой!");
                this.author_username_validation = false;
            }
        },
        author_link(new_author_link) {
            if (new_author_link.trim().length > 0) {
                if (isValueURL(new_author_link)) {
                    $('#author-link-course-input').css('border', '2px solid greenyellow');
                    $('#author-link-course-input-error-p').html("");
                    this.author_link_validation = true;
                }
                else {
                    $('#author-link-course-input').css('border', '2px solid red');
                    $('#author-link-course-input-error-p').html("Введённое значение не является ссылкой!");
                    this.author_link_validation = false;
                }
            }
            else {
                $('#author-link-course-input').css('border', '2px solid red');
                $('#author-link-course-input-error-p').html("Поле не может быть пустым!");
                this.author_link_validation = false;
            }
        },
        description(new_description) {
            if (new_description.trim().length > 20) {
                $('#suggest-course-textarea').css('border', '2px solid greenyellow');
                $('#suggest-course-textarea-error-p').html("");
                this.description_validation = true;
            }
            else {
                $('#suggest-course-textarea').css('border', '2px solid red');
                $('#suggest-course-textarea-error-p').html("Не менее 20 символов!");
                this.description_validation = false;
            }
        },
        cost(new_cost) {
            if (new_cost.trim().length > 0) {
                $('#cost-course-input').css('border', '2px solid greenyellow');
                $('#cost-course-input-error-p').html("");
                this.cost_validation = true;
            }
            else {
                $('#cost-course-input').css('border', '2px solid red');
                $('#cost-course-input-error-p').html("Поле не может быть пустым!");
                this.cost_validation = false;
            }
        }
    },
    created() {
        if (tokenIsSet()) {
            this.isAuth = true;
        }
        else {
            swal({
                title: "Ошибка!",
                text: "Предлагать курсы могут только авторизованные пользователи!",
                type: "success"
            }).then(function () {
                router.back();
            });
        }
    }
}

</script>

<style>
#suggest-course-content {
    margin: 0px;
    /* padding: 0.7vw; */
    display: flex;
    flex-direction: column;
    width: 80vw;
    /* not working yet */
    /* height: 100%; */
    padding: 40px;
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

#description-label {
    margin-bottom: 22em;
}

#labels-suggest-course {
    /* padding: 0; */
    gap: 0;
    width: 15%
}

#label-fields-suggest-course {
    padding: 0;
    width: 80%;
}

#fields-suggest-course {
    /* gap: 3.3em; */
    width: 90%;
    gap: 0em;
}

#fields-suggest-course input {
    width: 90%;
}

#suggest-course-textarea {
    width: 90%;
    height: 320px;
}

#suggest-course-textarea-error-p {
    margin-bottom: 1.7em;
}

.margin-to-zero {
    margin: 0;
}

.center-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#suggest-course-button {
    width: 30em;
    padding: 10px;
    margin-top: 30px;
}

.error-p {
    color: rgb(255, 46, 46);
    margin: 8px 0;
    height: 18px;
}
</style>