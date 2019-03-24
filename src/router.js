import Vue from 'vue';
import Router from 'vue-router';
import Welcome from './views/Welcome.vue';
import Sets from './views/Sets.vue';
import Tracks from './views/Tracks.vue';
import UserProjects from './views/UserProjects.vue';
import Scholarships from './views/Scholarships.vue';
import Skills from './views/Skills.vue';
// import Textbooks from './views/Textbooks.vue';
// import AddTextbooks from './views/AddTextbook.vue';
// import AddSubject from './views/AddSubject.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
    {
      path: '/',
      name: 'welcome',
      component: Welcome,
    },
    {
      path: '/sets',
      name: 'sets',
      component: Sets,
    },
    {
      path: '/tracks',
      name: 'tracks',
      component: Tracks,
    },
    {
      path: '/scholarships',
      name: 'scholarships',
      component: Scholarships,
    },
    {
      path: '/skills',
      name: 'skills',
      component: Skills,
    },
    {
      path: '/user-projects/:id',
      name: 'userProjects',
      component: UserProjects,
    },
  ],
});
