<template>
    <NavBar></NavBar>
    <div class="wrapper">
        <div class="registration-content">
            <h1>Регистрация</h1>
            <div class="label-and-fields-block">
                <div class="data-labels">
                    <p>Email:</p>
                    <p>Логин:</p>
                    <p>Пароль:</p>
                </div>
                <div class="data-fields">
                    <input id="email" type="text">
                    <input id="login" type="text">
                    <input id="password" type="text">
                </div>
            </div>
            <button class="button-shadow button-general button-default-border" id="refistration-button" @click="registrationAccount">Зарегистрироваться</button>
        </div>
    </div>

</template>

<script>

import { loginAccount, registration_account } from '../network';
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

<style>
.registration-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* width: 80%; */
    /* not working yet */
    /* height: 100%; */
    padding: 50px;
    gap: 5em;
    box-shadow:
        0 1px 1px hsl(0deg 0% 0% / 0.075),
        0 2px 2px hsl(0deg 0% 0% / 0.075),
        0 4px 4px hsl(0deg 0% 0% / 0.075),
        0 8px 8px hsl(0deg 0% 0% / 0.075),
        0 16px 16px hsl(0deg 0% 0% / 0.075);
    color: white;
    background-color: var(--bright-background);
    border-radius: 5px;
    margin: 0px;
    /* padding: 0px; */
}

.label-and-fields-block {
    display: flex;
    padding: 0 7em;
    width: 25em;
}

.data-labels {
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin: 0;
}
/* 
.data-labels p {
    
} */

.data-fields {
    margin: 1em;
    display: flex;
    flex-direction: column;
    gap: 2.2em;
    margin: 11px 20px;
}

.data-fields input {
    border-radius: 5px;
    padding: 5px;
    width: 22em;
}

#refistration-button {
    padding: 10px;
    margin-bottom: 7em;
    width: 30em;
}

</style>