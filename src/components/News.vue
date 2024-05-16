<template>
    <div class="post" v-for="post in posts">
        <h1>{{ post.header }}</h1>
        <p>{{ post.post_text }}</p>
        <br>
        <p><i>{{ post.user.username }}, {{ getDate(post.creation_date) }}</i></p>
    </div>
</template>

<script>
import { tokenIsSet, formatDate } from '@/validation';

export default {
    props: ['posts'],
    methods: {
        getDate(date) {
            return formatDate(date)
        }
    }
}
</script>

<style>

.post {
    color: white;
    background-color: var(--bright-background);
    min-height: 150px;
    border-radius: 5px;
    width: 90%;
    padding: 2%;
    box-shadow:
        0 1px 1px hsl(0deg 0% 0% / 0.075),
        0 2px 2px hsl(0deg 0% 0% / 0.075),
        0 4px 4px hsl(0deg 0% 0% / 0.075),
        0 8px 8px hsl(0deg 0% 0% / 0.075),
        0 16px 16px hsl(0deg 0% 0% / 0.075);
}

.post p {
    /* width: 90%; */
    word-break: break-all;
}

</style>