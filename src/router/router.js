import { createRouter, createWebHistory } from 'vue-router';
import Login from "../views/login.vue";
import Main from "../views/main.vue"
import main_users from "../components/admin/main_users.vue";
import main_games from "../components/admin/main_games.vue";
import freeGames from "../components/user/freeGames.vue";
import payGames from "../components/user/payGames.vue";
import allGames from "../components/user/allGames.vue";
import admin from "../views/admin.vue";
import adminMain from "../components/admin/adminMain.vue";

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
                path: '/allGames',
                component: allGames
            },
            {
                path: '/freeGames',
                component: freeGames
            },
            {
                path: '/payGames',
                component: payGames
            }
            ]
    },
    {
        path: '/admin',
        component: admin,
        children: [
            {
                path: '/admin/main',
                component: adminMain
            },
            {
                path: '/admin/users',
                component: main_users
            },
            {
                path: '/admin/games',
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