// // npm install bootstrap
// import "bootstrap/dist/css/bootstrap.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// createApp(App).use(router).mount('#app')
const app = createApp(App);
app.use(router);
app.mount("#app");
// import "bootstrap/dist/js/bootstrap.js";