import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogInView from '@/views/LogInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import FormSuggestCourse from '@/views/FormSuggestCourse.vue'
import SearchCourses from '@/views/SearchCourses.vue'
import AboutView from '@/views/AboutView.vue'
import UserCourses from '@/views/UserCourses.vue'
import CourseView from '@/views/CourseView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/registration',
    name: 'registration',
    component: SignUpView
  },
  {
    path: '/login',
    name: 'login',
    component: LogInView
  },
  {
    path: '/suggest_course',
    name: 'suggest_course',
    component: FormSuggestCourse
  },
  {
    path: '/search',
    name: 'search',
    component: SearchCourses
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/user_courses',
    name: 'user_courses',
    component: UserCourses
  },
  {
    path: '/courses/:id',
    component: CourseView
  },
  {
    path: '/page_not_found',
    name: "page_not_found",
    component: NotFoundView
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
