import { createRouter, createWebHistory } from 'vue-router';
import Login from "../views/login.vue";
import Main from "../views/main.vue"

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/main',
        name: 'Main',
        component: Main
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;