<template>
  <NavBar></NavBar>
  <div class="wrapper">
    
    <h1>Страница не найдена!</h1>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: "NotFoundView",
  components: {
    NavBar
  },

}
</script>

<style>
.wrapper {
    margin: 20px;
    padding: 20px;
    max-width: 100% - 40px;
    background-color: var(--background-secondary);
    text-align: left;
    box-shadow:
        0 1px 1px hsl(0deg 0% 0% / 0.075),
        0 2px 2px hsl(0deg 0% 0% / 0.075),
        0 4px 4px hsl(0deg 0% 0% / 0.075),
        0 8px 8px hsl(0deg 0% 0% / 0.075),
        0 16px 16px hsl(0deg 0% 0% / 0.075);

    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    color: var(--dark-text);
}

</style>