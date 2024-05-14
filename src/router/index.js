import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogInView from '@/views/LogInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import SuggestCourseView from '@/views/SuggestCourseView.vue'
import SearchCourses from '@/views/SearchCourses.vue'
import AboutView from '@/views/AboutView.vue'
import UserCourses from '@/views/UserCourses.vue'
import CourseView from '@/views/CourseView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NewReviewView from '@/views/NewReviewView.vue'
import SearchResults from '@/views/SearchResults.vue'
import DonationView from '@/views/DonationView.vue'
import RulesView from '@/views/RulesView.vue'
import PartnershipView from '@/views/ParnershipView.vue'
import NewsView from '@/views/NewsView.vue'
import ReportView from '@/views/ReportView.vue'

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
    component: SuggestCourseView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchCourses
  },
  {
    path: '/search/results/',

    component: SearchResults
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/donation',
    name: 'donation',
    component: DonationView
  },
  {
    path: '/rules',
    name: 'rules',
    component: RulesView
  },
  {
    path: '/partnership',
    name: 'partnership',
    component: PartnershipView
  },
  {
    path: '/report',
    name: 'report',
    component: ReportView
  },
  {
    path: '/news',
    name: 'news',
    component: NewsView
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
  },
  {
    path: '/courses/:id/new_review',
    name: "new_review",
    component: NewReviewView
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
