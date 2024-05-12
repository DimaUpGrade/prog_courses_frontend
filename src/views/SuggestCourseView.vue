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
                        <input type="text" id="title-course-input" placeholder="Введите название курса">
                        <p class="error-p" id="title-course-input-error-p"></p>

                        <input type="text" id="platform-course-input"
                            placeholder="Укажите платформу, на которой находится курс (YouTube, Stepik или др.)">
                        <p class="error-p" id="platform-course-input-error-p"></p>

                        <input type="text" id="link-course-course-input" placeholder="Вставьте ссылку на курс">
                        <p class="error-p" id="link-course-course-input-error-p"></p>

                        <input type="text" id="author-name-course-input"
                            placeholder="Укажите имя или никнейм автора курса">
                        <p class="error-p" id="author-name-course-input-error-p"></p>

                        <input type="text" id="author-link-course-input"
                            placeholder="Укажите ссылку на страницу автора курса">
                        <p class="error-p" id="author-link-course-input-error-p"></p>

                        <input type="text" id="cost-course-input"
                            placeholder='Укажите заявленную стоимость курса (или напишите "Бесплатно", если курс бесплатный)'>
                        <p class="error-p" id="cost-course-input-error-p"></p>

                        <textarea class="default-text-area" id="suggest-course-textarea"
                            placeholder="Укажите описание курса"></textarea>
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
import { tokenIsSet } from '@/validation';
import router from '@/router';

export default {
    name: 'SuggestCourseView',
    components: {
        NavBar
    },
    data() {
        isAuth: false;
    },
    methods: {
        sendCourse() {
            const title_element = $('#title-course-input');
            const platform_element = $('#platform-course-input');
            const course_link_element = $('#link-course-course-input');
            const author_name_element = $('#author-name-course-input');
            const author_link_element = $('#author-link-course-input');
            const description_element = $('#suggest-course-textarea');
            const cost_element = $('#cost-course-input');

            let title = title_element.val();
            let platform = platform_element.val();
            let course_link = course_link_element.val();
            let author_name = author_name_element.val();
            let author_link = author_link_element.val();
            let description = description_element.val();
            let cost = cost_element.val();

            const url_expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
            const url_regex = new RegExp(url_expression);

            let validation = true;

            function isFieldEmpty(element) {
                const id_element = element.attr('id');
                const id_p = `#${id_element}-error-p`;
                const error_p = $(id_p)

                if (element.val().trim() == "") {
                    element.css('border', '2px solid red')
                    error_p.html("Поле не может быть пустым!");
                    return false;
                }
                else {
                    error_p.html("");
                    element.css('border', '2px solid greenyellow');
                    return true;
                }
            }

            if (isFieldEmpty(title_element) == false) { validation = false }
            if (isFieldEmpty(platform_element) == false) { validation = false }
            if (isFieldEmpty(course_link_element) == false) { validation = false }
            if (isFieldEmpty(author_name_element) == false) { validation = false }
            if (isFieldEmpty(description_element) == false) { validation = false }
            if (isFieldEmpty(cost_element) == false) { validation = false }

            // //It doesn't work yet
            // validation = (
            //     isFieldEmpty(title_element) && 
            //     isFieldEmpty(platform_element) && 
            //     isFieldEmpty(course_link_element) && 
            //     isFieldEmpty(author_name_element) && 
            //     isFieldEmpty(description_element) && 
            //     isFieldEmpty(cost_element)
            // );

            // alert(validation);


            if (course_link.match(url_regex)) {
                course_link_element.css('border', '2px solid greenyellow');
                $('#link-course-course-input-error-p').html("");
            } else {
                course_link_element.css('border', '2px solid red');
                $('#link-course-course-input-error-p').html("Проверьте правильность ввода ссылки!");
                validation = false;
            }

            if (author_link.match(url_regex)) {
                $('#author-link-course-input-error-p').html("");
                author_link_element.css('border', '2px solid greenyellow');
            }
            else {
                author_link_element.css('border', '2px solid red');
                $('#author-link-course-input-error-p').html("Проверьте правильность ввода ссылки!");
                validation = false;
            }

            if (validation === true) {
                postCourse(title, platform, course_link, author_name, author_link, description, cost);
            }


            // postCourse(title, platform, course_link, author_name, author_link, description, cost);
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