import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import TaskManager from '../components/TaskManager.vue';

const routes = [
    { path: '/', component: Login },
    { path: '/register', component: Register },
    { path: '/tasks', component: TaskManager},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;