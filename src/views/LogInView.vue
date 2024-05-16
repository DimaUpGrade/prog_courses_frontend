<template>
    <NavBar></NavBar>
    <div class="wrapper">
        <div class="registration-content">
            <h1>Авторзиация</h1>
            <div class="label-and-fields-block">
                <div class="data-labels">
                    <p>Логин:</p>
                    <p>Пароль:</p>
                </div>
                <div class="data-fields">
                    <input id="login" type="text">
                    <input id="password" type="password">
                </div>
            </div>
            <button class="button-shadow button-general button-default-border" id="submit-button" @click="loginAccountMethod">Войти</button>
        </div>
    </div>    
</template>

<script>
import { loginAccount } from '../network';
import { tokenIsSet } from '../validation';
import router from '../router';
import NavBar from '@/components/NavBar.vue';

export default {
    components: {
        NavBar
    },
    data() {
        return {
            status: ""
        };
    },
    methods: {
        loginAccountMethod() {
            loginAccount($('#login').val(), $('#password').val())
        }
    },
    mounted() {
        if (tokenIsSet()) {
            router.replace({ path: '/' });
        }
    }
}

</script>

<style>

#submit-button {
    padding: 10px;
    margin-bottom: 7em;
    width: 30em;
}

</style>