import Vue from 'vue';
import Router from 'vue-router';


import vIndex from './views/v-index';
import vHome from './views/v-home.vue';
import vRestricted from './views/v-restricted.vue';
import vCategoryItems from './views/v-categoryItems.vue';

import vInfoRequests from './views/v-infoRequests.vue';
import v404 from './views/v-404'
import vLogin from './views/v-login.vue';


import {Roles} from "./components/globalstate";





Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {path: '/', redirect:'/login'},
        {path: '/login', name: 'login', component: vLogin},
        {path: '/request-info', name: 'requestInfo', component: vIndex, meta: {role: 1}},
        {path: '/home', name: 'home', component: vHome},
        {path: '/item/:id', name: 'items', component: vCategoryItems, meta: {role: 1}},

        {path: '/info-requests', name: 'infoRequests', component: vInfoRequests, meta: {role: 1}},
        {path: '/restricted', name: 'restricted', component: vRestricted},

        /*  {
              path: '/about',
              name: 'about',
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import(/!* webpackChunkName: "about" *!/ './views/About.vue')
          }*/
        {path: '*', name: 'p404', component: v404}
    ]
})
