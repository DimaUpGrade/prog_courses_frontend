import axios from 'axios';
import router from '../router';
import { tokenIsSet } from '@/validation';
import swal from 'sweetalert';
const API_URL = "http://127.0.0.1:8000";


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
            swal('ошибка')
            // console.log(error);
        });
}


// WIP
async function registration_account(username_, password_, email_) {
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
        .then((response) => {
            login_account(username_, password_)
        })
        .catch((error) => {
            if (error.response.status == '500') {
                swal("Неверные данные регистрации!");
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
            alert("Успешный выход!");
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            router.go();
        })
        .catch((error) => {
            if (error.response.status) {
                router.push({ path: '/' });
                swal("Ошибка!");
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
        alert('penis')
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


export {
    API_URL,
    axios,
    loginAccount,
    registration_account,
    logout,
    likeComment,
    likeReview,
    getCourseInfo,
    getComments,
    getReviews,
    customGETRequest,
    postComment
}