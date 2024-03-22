<template>
    <div class="navbar">
        <a href="#" id="logo_title">prog_courses</a>
        <div class="navbar_item_general">
            <button class="dropbtn">Курсы
                <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
                <a href="#">Ваши курсы</a>
                <a href="#">Поиск курсов</a>
                <a href="#">Предложить курс</a>
            </div>
        </div>
        <div class="navbar_item_general">
            <button class="dropbtn">О нас
                <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
                <a href="#">О проекте</a>
                <a href="#">Правила сайта</a>
                <a href="#">Поддержать проект</a>
            </div>
        </div>
        <div class="navbar_item_account">
                <p id="user_info">username</p>
                <!-- <p id="username_h2"><span id="username_span">Пользователь:</span> {{ username }}</p> -->
                <!-- <LogOutButton /> -->
                <p @click="toLogin" id="to_login">Войти</p>
        </div>
    </div>
    <!-- <header>
        <nav class="topnav">
            <a href="#" id="logo-title">prog_courses</a>
            <a href="#">Курсы</a>
            <a href="#">О нас</a>
        </nav>
    </header> -->
</template>

<script>
import router from '@/router';
import { tokenIsSet } from '../validation'

export default {
    methods: {
        toLogin() {
            router.push({path: '/login'})
        }
    },
    mounted() {
        
        if (tokenIsSet()) {
            const username = localStorage.getItem('username');
            $('#user_info').html(username);
            


        }
        else {
            $('#to_login').css("display", "flex");
            $('#user_info').css("display", "none");
        }
    }
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
}

.navbar a {
    float: left;
    font-size: 16px;
    color: white;
    text-align: center;
    padding: 25px 16px;
    text-decoration: none;
}

.navbar_item_account {
    float: right;
    overflow: hidden;
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

/* #user_info {
    
} */

#to_login {
    display: none;
}

.navbar_item_general{
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

.navbar_item_general:hover .dropdown-content {
    display: block;
}
</style>