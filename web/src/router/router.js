import * as vueRouter from 'vue-router';

const routes = [
    {
        path: '/final',
        name: 'Final',
        component: () => (import('../views/Final.vue')),
    },
    {
        path: '/box',
        name: 'Box',
        component: () => (import('../views/Box.vue')),
    },{
        path: '/:groupId?',
        name: 'Home',
        component: () => (import('../views/Home.vue')),
    },
 
   
];

const baseUrl = ''

const router = vueRouter.createRouter({
    history: vueRouter.createWebHistory(baseUrl),
    routes
});

router.beforeEach(() => {
    window.scrollTo(0, 0)
})

export default router;