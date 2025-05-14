import { createWebHashHistory, createRouter } from 'vue-router'

export const routes = [
    {
        path: '/Sudoku',
        name: '宫格',
        component: () => import('@/views/Sudoku.vue')
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'root',
            component: () => import('@/views/Home.vue')
        },
        ...routes
    ]
})
