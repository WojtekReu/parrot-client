import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import(/* webpackChunkName: "account" */ '../views/user/CurrentUser.vue')
  },
  {
    path: '/books',
    name: 'books',
    component: () => import(/* webpackChunkName: "books" */ '../views/book/ListView.vue')
  },
  {
    path: '/book/add',
    name: 'addBook',
    component: () => import(/* webpackChunkName: "addBook" */ '../views/book/AddView.vue')
  },
  {
    path: '/account/books',
    name: 'accountBooks',
    component: () => import(/* webpackChunkName: "accountBooks" */ '../views/book/PrivateListView.vue')
  },
  {
    path: '/book/:id',
    name: 'book',
    component: () => import(/* webpackChunkName: "book" */ '../views/book/DetailView.vue'),
    props: true
  },
  {
    path: '/flashcard/:id',
    name: 'flashcard',
    component: () => import('../views/flashcard/DetailView.vue'),
    props: true
  },
  {
    path: '/flashcards',
    name: 'flashcards',
    component: () => import(/* webpackChunkName: "flashcards" */ '../views/flashcard/ListView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/user/LoginView.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import(/* webpackChunkName: "logout" */ '../views/user/LogoutView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/user/RegisterView.vue')
  },
  {
    path: '/words',
    name: 'words',
    component: () => import(/* webpackChunkName: "words" */ '../views/word/ListView.vue')
  },
  {
    path: '/words/search',
    name: 'wordsSearch',
    component: () => import(/* webpackChunkName: "words" */ '../views/word/SearchView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
