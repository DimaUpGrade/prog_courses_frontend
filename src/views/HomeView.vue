<template>
  <NavBar></NavBar>
  <div class="wrapper" id="home-view-wrapper">
    <div id="home-view-content">
      <div class="home-view-item default-home-item">
        <div id="home-view-item-welcome">
          <div id="home-view-item-welcome-logo">
            <h1 id="welcome-logo-text">prog_courses</h1>
          </div>
          <div id="home-view-item-welcome-text">
            <div>
              <h1 class="normal-spacing" v-if="username !== null">Добро пожаловать, {{ username }}!</h1>
              <h1 v-if="username == null">Добро пожаловать!</h1>
              <h3>Используйте панель навигации сверху для перемещения по страницам сайта.</h3>
              <h3 v-if="username == null"><router-link to="/login" class="defult_link">Войдите</router-link> или <router-link
                  to="/registration" class="defult_link">зарегистрируйтесь</router-link>, чтобы предлагать свои курсы, оставлять отзывы и
                комментарии!</h3>
            </div>
          </div>
        </div>
      </div>
      <SearchBar v-bind:show_header="true"></SearchBar>
      <div class="tag-search">
        <h1>Или попробуйте поиск по тегу (beta)</h1>
        <Tags v-if="tags !== null" v-bind:tags="tags_data" />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { getAllTags } from '@/network';
import { tokenIsSet } from '@/validation';
import SearchBar from '@/components/SearchBar.vue';
import Tags from '@/components/Tags.vue';

export default {
  name: 'HomeView',
  components: {
    NavBar,
    SearchBar,
    Tags
  },

  data() {
    return {
      isAuth: null,
      username: null,
      tags_data: null
    }
  },

  async created() {
    this.isAuth = tokenIsSet();
    if (this.isAuth == true) {
      this.username = localStorage.getItem('username');
    }
    let tags_data;
    tags_data = await getAllTags();
    this.tags_data = tags_data;
  }
}
</script>

<style>
/* DO NOT TOUCH THAT */
.wrapper {
  min-width: 80vw;
  min-height: 80vh;
}

.normal-spacing {
  padding: 0;
  margin: 0;
}

#home-view-wrapper {
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
}

#home-view-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.home-view-item {
  background-color: var(--bright-background);
  color: white;
  border-radius: 5px;
  box-shadow:
    0 1px 1px hsl(0deg 0% 0% / 0.075),
    0 2px 2px hsl(0deg 0% 0% / 0.075),
    0 4px 4px hsl(0deg 0% 0% / 0.075),
    0 8px 8px hsl(0deg 0% 0% / 0.075),
    0 16px 16px hsl(0deg 0% 0% / 0.075);
}

#home-view-item-welcome {
  padding: 50px;
  width: 90%;
}

.default-home-item {
  width: 90%;
  padding: 1% 2%;
}

#home-view-item-welcome {
  display: flex;
  width: 100%;
  height: 130px;
  margin: 0;
  padding: 40px 20px;
  flex-direction: row;
  gap: 40px;
}

#home-view-item-welcome-logo {
  display: flex;
  width: 30%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#home-view-item-welcome-text {
  width: 60%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  /* text-align: center; */
}

#welcome-logo-text {
  text-shadow: rgb(220, 220, 255) 1px 0 2px;
}

.tag-search {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  min-height: 200px;
  background-color: var(--bright-background);
  color: white;
  padding: 3% 2% 0 2%;
  border-radius: 5px;
  box-shadow:
    0 1px 1px hsl(0deg 0% 0% / 0.075),
    0 2px 2px hsl(0deg 0% 0% / 0.075),
    0 4px 4px hsl(0deg 0% 0% / 0.075),
    0 8px 8px hsl(0deg 0% 0% / 0.075),
    0 16px 16px hsl(0deg 0% 0% / 0.075);
}

</style>