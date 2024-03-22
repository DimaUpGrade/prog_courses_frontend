import axios from 'axios';

const API_URL = "http://127.0.0.1:8000";
import router from '../router';

function login_account(username_, password_) {
    axios.post(API_URL + '/api/login/', {
        username_: username_,
        password_: password_
    })
        .then((response) => {
            localStorage.setItem("token", response.data['Token']);
            router.push({ path: '/' });
            localStorage.setItem("username", response.data['username_']);
        })
        .catch((error) => {

            console.log(error);
        });
}

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


export {
    API_URL,
    axios,
    login_account,
    registration_account
}