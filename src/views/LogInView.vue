<template>
    <NavBar></NavBar>
    <div class="wrapper">
        <div>
            <p>Логин:</p>
            <input id="login" type="text">
            <p>Пароль:</p>
            <input id="password" type="text">
            <div>
                <h2>{{ status }}</h2>
            </div>
            <input type="button" id="submit-button" @click="loginAccountMethod" value="Войти">
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