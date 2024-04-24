import axios from 'axios';

const API_URL = "http://127.0.0.1:8000";
import router from '../router';

function login_account(username_, password_) {
    axios.post(API_URL + '/api/login/', {
        username: username_,
        password: password_
    })
        .then((response) => {
            localStorage.setItem("token", response.data['Token']);
            localStorage.setItem("username", username_);
            router.push({ path: '/' });
        })
        .catch((error) => {
            alert('ошибка')
            console.log(error);
        });
}

// WIP
function registration_account(username_, password_, email_) {
    axios.post(API_URL + '/api/registration/', {
        username: username_,
        password: password_,
        email: email_
    })
        .then((response) => {
            login_account(username_, password_)
        })
        .catch((error) => {
            if (error.response.status == '500') {
                this.status = "Неверные данные регистрации!";
            }
            console.log(error);
        });
}

function logout() {
    axios.post(API_URL + '/api/logout/', {}, {
        headers: {
            'Authorization': 'Token ' + localStorage.getItem("token")
        }
    })
        .then((response) => {
            alert("Успешный выход!");
            localStorage.removeItem("token");
            localStorage.removeItem("username")
            router.push({ path: '/' });

        })
        .catch((error) => {
            if (error.response.status) {
                router.push({ path: '/' });
                alert("Ошибка!");
            }
        });
}

function get_course_data(id) {
    const result =  axios
        .get(API_URL + '/api/courses/' + id + '/')
        .then(response => result = response)
    return result
}


export {
    API_URL,
    axios,
    login_account,
    registration_account,
    logout,
    get_course_data
}