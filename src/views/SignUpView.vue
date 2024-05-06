<template>
    <div>
        <p>Email:</p>
        <input id="email" type="text">
        <p>Логин:</p>
        <input id="login" type="text">
        <p>Пароль:</p>
        <input id="password" type="text">
        <button id="refistration-button" @click="registrationAccount">Зарегистрироваться</button>
    </div>
</template>

<script>

import { loginAccount, registration_account } from '../network';
import { tokenIsSet } from '../validation';
import router from '../router';

export default {
    data() {
        return {
            status: ""
        };
    },
    methods: {
        async registrationAccount() {
            await registration_account($('#login').val(), $('#password').val(), $('#email').val())
            loginAccount($('#login').val(), $('#password').val())
            router.replace({ path: '/' });
        }
    },
    mounted() {
        if (tokenIsSet()) {
            router.replace({ path: '/' });
        }
    }
}

</script>