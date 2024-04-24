<template>
    <div>
        <p>Логин:</p>
        <input id="login" type="text">
        <p>Пароль:</p>
        <input id="password" type="text">
    </div>

    <div>
        <h2>{{ status }}</h2>
    </div>

    <input type="button" id="submit-button" @click="loginAccount" value="Войти">
</template>

<script>
import { login_account } from '../network';
import { tokenIsSet } from '../validation';
import router from '../router';

export default {
    data() {
        return {
            status: ""
        };
    },
    methods: {
        loginAccount() {
            login_account($('#login').val(), $('#password').val())
        }
    },
    mounted() {
        if (tokenIsSet()) {
            router.replace({ path: '/' });
        }
    }
}

</script>