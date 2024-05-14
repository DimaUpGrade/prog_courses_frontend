<template>
    <NavBar></NavBar>
    <div class="wrapper info-default-wrapper">
        <div class="info-default-content">
            <h1>Правила сайта</h1>
            <p>1. Не использовать ненормативную лексику на сайте ни в каком виде.</p>
            <p>2. Не оскорблять пользователей сайта и администрацию. Все ошибки и жалобы можно изложить и отправить в специальном разделе.</p>
            <p>3. Предлагать курсы ТОЛЬКО по программированию и смежным тематикам, поскольку данный сайт посвящён именно этому.</p>
            <p>4. Не пытаться осуществлять "накрутку" отзвывов и/или комментариев.</p>
            <br>
            <p>За несоблюдение правил сайта может последовать блокировка аккаунта без права на восстановление.</p>
        </div>
        
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
    name: 'RulesView',
    components: {
        NavBar
    }
}
</script>

<style>
.info-default-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: flex-start;
    align-items: center;
}

.info-default-content {
    background-color: var(--bright-background);
    color: white;
    padding: 30px;
    width: 90%;
    border-radius: 5px;
    box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075),
        0 2px 2px hsl(0deg 0% 0% / 0.075),
        0 4px 4px hsl(0deg 0% 0% / 0.075),
        0 8px 8px hsl(0deg 0% 0% / 0.075),
        0 16px 16px hsl(0deg 0% 0% / 0.075);
}
</style>