import axios from 'axios';
import router from '../router';
import { tokenIsSet } from '@/validation';
import swal from 'sweetalert';
const API_URL = "http://127.0.0.1:8000";


function defaultErrorHandler() {
    swal({
        title: "Ошибка!",
        text: "Что-то пошло не так...",
        type: "success"
    }).then(function () {

    });
}


async function loginAccount(username_, password_) {
    let result;
    result = await axios({
        method: 'post',
        url: `${API_URL}/api/login/`,
        headers: {},
        data: {
            username: username_,
            password: password_
        }
    })
        .then((response) => {
            localStorage.setItem("token", response.data['Token']);
            localStorage.setItem("username", username_);
            router.back();
            // router.push({ path: '/' });
        })
        .catch((error) => {
            defaultErrorHandler()
            // swal('ошибка')
            // console.log(error);
        });
}


// WIP
async function registrationAccount(username_, password_, email_) {
    let result;
    result = await axios({
        method: 'post',
        url: `${API_URL}/api/registration/`,
        headers: {},
        data: {
            username: username_,
            password: password_,
            email: email_
        }
    })
        .then(async (response) => {
            await loginAccount(username_, password_);
        })
        .catch((error) => {
            if (error.response.status == '500') {
                swal({
                    title: "Ошибка!",
                    text: "Что-то пошло не так...",
                    type: "success"
                })
            }
            // console.log(error);
        });


    // axios.post(API_URL + '/api/registration/', {
    //     username: username_,
    //     password: password_,
    //     email: email_
    // })
    //     .then((response) => {
    //         login_account(username_, password_)
    //     })
    //     .catch((error) => {
    //         if (error.response.status == '500') {
    //             this.status = "Неверные данные регистрации!";
    //         }
    //         console.log(error);
    //     });
}


async function logout() {
    let result;

    result = await axios({
        method: 'post',
        url: `${API_URL}/api/logout/`,
        headers: {
            'Authorization': 'Token ' + localStorage.getItem("token")
        }
    })
        .then((response) => {
            // delete this
            swal({
                title: "Успешный выход!",
                text: "Вы вышли из аккаунта!",
                type: "success"
            }).then(function () {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                router.go();
            });
            // alert("Успешный выход!");

        })
        .catch((error) => {
            if (error) {
                swal({
                    title: "Произошла ошибка!",
                    text: "Что-то пошло не так...",
                    type: "success"
                }).then(function () {
                    router.push({ path: '/' });
                });
            }
        })
}


// function get_course_data(id) {
//     const result = axios
//         .get(API_URL + '/api/courses/' + id + '/')
//         .then(response => result = response)
//     return result
// }


async function likeComment(id) {
    let result;
    result = await axios
        .post(API_URL + '/api/comments/' + id + '/like_comment/', {}, {
            headers: {
                'Authorization': 'Token ' + localStorage.getItem("token")
            }
        })
        .then(response => result = response)
        .catch((error) => {
            // alert(error)
            switch (error.response.status) {
                case 401:
                    swal("Оценивать комментарии могут только авторизованные пользователи!")
            }
        })
}

async function likeReview(id) {
    let result;
    result = await axios
        .post(API_URL + '/api/reviews/' + id + '/like_review/', {}, {
            headers: {
                'Authorization': 'Token ' + localStorage.getItem("token")
            }
        })
        .then(response => result = response)
        .catch((error) => {
            // alert(error)
            switch (error.response.status) {
                case 401:
                    swal("Оценивать отзывы могут только авторизованные пользователи!");
                // alert("Оценивать отзывы могут только авторизованные пользователи!")
            }
        })
}


async function getCourseInfo(id) {
    let result;

    if (tokenIsSet()) {
        result = await axios({
            method: 'get',
            url: `${API_URL}/api/courses/${id}/`,
            headers: {
                'Authorization': 'Token ' + localStorage.getItem("token")
            }
        })
            .then(response => result = response)
            .catch((error) => {
                switch (error.response.status) {
                    case 404:
                        router.replace({ path: '/page_not_found' })
                }
            })
    }
    else {
        result = await axios({
            method: 'get',
            url: `${API_URL}/api/courses/${id}/`,
            headers: {}
        })
            .then(response => result = response)
            .catch((error) => {
                switch (error.response.status) {
                    case 404:
                        router.replace({ path: '/page_not_found' })
                }
            })
    }

    return result.data;
}


async function getComments(id) {
    let result;
    if (tokenIsSet()) {
        result = await axios({
            method: 'get',
            url: `${API_URL}/api/courses/${id}/comments/`,
            headers: {
                'Authorization': 'Token ' + localStorage.getItem("token")
            }
        })
            .then(response => result = response)
            .catch((error) => {
                swal(error.response.status);
            })
    }
    else {
        result = await axios({
            method: 'get',
            url: `${API_URL}/api/courses/${id}/comments/`,
            headers: {}
        })
            .then(response => result = response)
            .catch((error) => {
                swal(error.response.status);
            })
    }

    return result.data;
}


async function getReviews(id) {
    let result;
    if (tokenIsSet()) {
        result = await axios({
            method: 'get',
            url: `${API_URL}/api/courses/${id}/reviews/`,
            headers: {
                'Authorization': 'Token ' + localStorage.getItem("token")
            }
        })
            .then(response => result = response)
            .catch((error) => {
                swal(error.response.status);
            })
    }
    else {
        result = await axios({
            method: 'get',
            url: `${API_URL}/api/courses/${id}/reviews/`,
            headers: {}
        })
            .then(response => result = response)
            .catch((error) => {
                swal(error.response.status);
            })
    }

    return result.data;
}


async function customGETRequest(link) {
    let result;

    result = await axios({
        method: 'get',
        url: `${link}`,
        headers: {}
    })
        .then(response => result = response)
        .catch((error) => {
            alert(error.response.status)
        })

    return result.data;
}


async function postComment(id_course_, commentary_text_) {
    let result;

    if (tokenIsSet()) {
        result = await axios({
            method: 'post',
            url: `${API_URL}/api/comments/`,
            headers: {
                'Authorization': 'Token ' + localStorage.getItem("token")
            },
            data: {
                id_course: id_course_,
                commentary_text: commentary_text_
            }
        })
            .then(response => result = response)
            .catch((error) => {
                alert(error)
            })
    }
    else {
        swal('Оставлять комментарии могут только авторизованные пользователи!')
    }

    return result;
}


async function postReview(id_course_, text_review_, rating_) {
    let result;

    if (tokenIsSet) {
        result = await axios({
            method: 'post',
            url: `${API_URL}/api/reviews/`,
            headers: {
                'Authorization': 'Token ' + localStorage.getItem("token")
            },
            data: {
                id_course: id_course_,
                text_review: text_review_,
                rating: rating_
            }
        })
            .then(response => {
                result = response;
                swal({
                    title: "Спасибо за отзыв!",
                    text: "Ваш отзыв был опубликован!",
                    type: "success"
                }).then(function () {
                    router.back();
                });

            })
            .catch((error) => {
                alert(error)
            })
    }
    else {
        swal('Оставлять отзывы могут только авторизованные пользователи!')
    }

    return result;
}


async function postCourse(title_, platform_, course_link_, author_name_, author_link_, description_, cost_) {
    let result;

    if (tokenIsSet()) {
        result = await axios({
            method: 'post',
            url: `${API_URL}/api/courses/`,
            headers: {
                'Authorization': 'Token ' + localStorage.getItem("token")
            },
            data: {
                title: title_,
                platform: platform_,
                link: course_link_,
                author_username: author_name_,
                author_link: author_link_,
                description: description_,
                cost: cost_
            }
        })
            .then(response => {
                result = response;
                swal({
                    title: "Спасибо!",
                    text: "Данные о курсе записаны и будут проверены модерацией!",
                    type: "success"
                }).then(function () {
                    router.back();
                });

            })
            .catch((error) => {
                alert(error)
            })
    }
    else {
        alert('Предлагать курсы могут только авторизованные пользователи!');
    }

    if (result) {
        return result;
    }

    return null;
}


async function isReviewExists(id_course) {
    let result;

    result = await axios({
        method: 'get',
        url: `${API_URL}/api/courses/${id_course}/is_review_exists/`,
        headers: {
            'Authorization': 'Token ' + localStorage.getItem("token")
        }
    })
        .then(response => result = response)
        .catch((error) => {
            alert(error)
        })

    return result.data;
}


async function loadMore(link) {
    let new_data;
    new_data = await axios({
        method: 'get',
        url: `${link}`,
        headers: {}
    })
        .then(response => new_data = response)
        .catch((error) => {
            alert(error.response.status)
        })

    return new_data
}


async function getUserCourses() {
    let result;
    result = await axios({
        method: 'get',
        url: `${API_URL}/api/user_courses/`,
        headers: {
            'Authorization': 'Token ' + localStorage.getItem("token")
        }
    })
        .then(response => result = response)
        .catch((error) => {
            alert(error)
        })

    return result.data;
}


async function addCourseToFavorite(id_course) {
    let result;

    result = await axios({
        method: 'patch',
        url: `${API_URL}/api/courses/${id_course}/add_to_favorite/`,
        headers: {
            'Authorization': 'Token ' + localStorage.getItem("token")
        }
    })
        .then(response => result = response)
        .catch((error) => {
            alert(error)
        })

    return result.data;
}


async function searchCourses(search_string, is_free, tag) {
    let result;
    let url;

    if (tag == null) {
        tag = '';
    }

    if (search_string == null) {
        search_string = '';
    }

    if (is_free === true) {
        url = `${API_URL}/api/courses/?search_query=${search_string}&only_free=true&tag=${tag}`
    }
    else {
        url = `${API_URL}/api/courses/?search_query=${search_string}&tag=${tag}`
    }

    result = await axios({
        method: 'get',
        url: `${url}`,
        headers: {}
    })
        .then(response => result = response)
        .catch((error) => {
            swal(error.response.status);
        })

    return result.data;
}


async function getAllTags() {
    let result;
    result = await axios({
        method: 'get',
        url: `${API_URL}/api/tags/`,
        headers: {}
    })
        .then(response => result = response)
        .catch((error) => {
            swal({
                title: "Ошибка!",
                text: "Что-то пошло не так...",
                type: "success"
            }).then(function () {

            });
        })

    return result.data;
}


async function getNews() {
    let result;
    result = await axios({
        method: 'get',
        url: `${API_URL}/api/news_posts/`,
        headers: {}
    })
        .then(response => result = response)
        .catch((error) => {
            swal({
                title: "Ошибка!",
                text: "Что-то пошло не так...",
                type: "success"
            }).then(function () {

            });
        })

    return result.data;
}


async function sendReport(header_, text_) {
    let result;
    result = await axios({
        method: 'post',
        url: `${API_URL}/api/reports/`,
        headers: {},
        data: {
            header: header_,
            report_text: text_
        }
    })
        .then((response) => {
            result = response;
            swal({
                title: "Спасибо!!",
                text: "Ваш отчёт об ошибке был успешно отправлен!",
                type: "success"
            }).then(function () {
                router.back();
            });
        })
        .catch((error) => {
            swal({
                title: "Ошибка!",
                text: "Что-то пошло не так...",
                type: "success"
            }).then(function () {

            });
        })

    return result;
}


export {
    API_URL,
    axios,
    loginAccount,
    registrationAccount,
    logout,
    likeComment,
    likeReview,
    getCourseInfo,
    getComments,
    getReviews,
    customGETRequest,
    postComment,
    postReview,
    postCourse,
    isReviewExists,
    loadMore,
    getUserCourses,
    addCourseToFavorite,
    searchCourses,
    getAllTags,
    getNews,
    sendReport
}