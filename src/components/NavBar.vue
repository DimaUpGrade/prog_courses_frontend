<template>
    <div class="navbar">
        <router-link to="/" id="logo_title">prog_courses</router-link>
        <div class="navbar_item_general">
            <button class="dropbtn">Курсы
                <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
                <router-link to="/user_courses">Ваши курсы</router-link>
                <router-link to="/search">Поиск курсов</router-link>
                <router-link to="/suggest_course">Предложить курс</router-link>
            </div>
        </div>
        <div class="navbar_item_general">
            <button class="dropbtn">О нас
                <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
                <router-link to="about">О проекте</router-link>
                <a href="#">Правила сайта</a>
                <a href="#">Поддержать проект</a>
            </div>
        </div>
        <div class="navbar_item_general">
            <button class="dropbtn">Новости сайта
            </button>
        </div>
        <div class="navbar_item_general" id="user_manage">
            <button class="dropbtn"> {{ username }}
                <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
                <p id="logout_text" @click="toLogOut">Выйти</p>
            </div>
        </div>
        <div class="navbar_item_account" id="login_button">
            <p @click="toLogin" id="to_login">Войти</p>
        </div>
        <div class="navbar_item_account" id="registration_button">
            <p @click="toRegistration" id="to_registration">Зарегистрироваться</p>
        </div>
    </div>
</template>

<script>
import router from '@/router';
import { tokenIsSet } from '../validation';
import { logout } from '../network';

export default {
    methods: {
        toLogin() {
            router.push({ path: '/login' });
        },
        toRegistration() {
            router.push({ path: '/registration' });
        },
        toLogOut() {
            logout();
        }

    },
    data() {
        return {
            username: 'username',
            isAuth: null
        }
    },
    created () {
        this.isAuth = tokenIsSet()
    },
    mounted() {
        if (tokenIsSet()) {
            this.username = localStorage.getItem('username');
            // $('#user_info').html(username);
            $('#registration_button').css("display", "none");
            $('#login_button').css("display", "none");


        }
        else {
            $('#user_manage').css("display", "none");
            // $('#registration_button').css("display", "none");
            // $('#login_button').css("display", "none");
        }
    },
    
}

</script>

<style scoped>
body {
    margin: 0;
}

#logo_title {
    font-family: 'artega';
    src: 'url(src/assets/fonts/artega.otf)';
}

.navbar {
    overflow: hidden;
    background-color: var(--background);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
}

.navbar a {
    float: left;
    font-size: 16px;
    color: white;
    text-align: center;
    padding: 22.5px 16px;
    text-decoration: none;
}

.navbar_item_account {
    float: right;
    overflow: hidden;
    cursor: pointer;
}

.navbar_item_account p {
    font-size: 16px;
    border: none;
    outline: none;
    color: white;
    padding: 25px 30px;
    background-color: inherit;
    font-family: inherit;
    margin: 0;
}

#user_manage {
    float: right;
    overflow: hidden;
    min-width: 200px;
    /* margin-right: 0px; */
}

#user_manage:hover {
    background-color: var(--primary);
}

#logout_text {
    margin: 0 0;
    padding: 10px 10px 10px 10px;
    
}

#logout_text:hover {
    background-color: #ddd;
}



#user_manage_droppdown {
    min-width: 118px;
}

/* #user_manage .dropbtn {
    
}

#logout_button {
    
}

#user_auth_div p {
    
}

#user_info {
    
}

#to_login {

} */

.navbar_item_general {
    float: left;
    overflow: hidden;
}

.navbar_item_general .dropbtn {
    font-size: 16px;
    border: none;
    outline: none;
    color: white;
    padding: 25px 30px;
    background-color: inherit;
    font-family: inherit;
    margin: 0;
}

.navbar a:hover,
.navbar_item_general:hover .dropbtn {
    background-color: var(--primary);
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    cursor: pointer;
}

.dropdown-content a {
    float: none;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
}

.dropdown-content a:hover {
    background-color: #ddd;
}

.navbar_item_account:hover {
    background-color: var(--primary);
}

.navbar_item_general:hover .dropdown-content {
    display: block;
}
</style>