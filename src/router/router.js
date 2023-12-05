import { createRouter, createWebHistory } from 'vue-router';
import Login from "../views/login.vue";
import Main from "../views/main.vue"
import Admin_Main from "../components/admin/main.vue"
import main_gameList from "../components/user/mian/main_gameList.vue";
import main_users from "../components/admin/main_users.vue";
import main_games from "../components/admin/main_games.vue";

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/main',
        name: 'Main',
        component: Main,
        children: [
            {
                path: '/gamelist',
                component: main_gameList
            }]
    },
    {
        path: '/admin/main',
        component: Admin_Main,
        children: [
            {
                path: '/users',
                component: main_users
            },
            {
                path: '/games',
                component: main_games
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;