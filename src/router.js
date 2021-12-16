import Vue from 'vue';
import Router from 'vue-router';
import PageNotFound from '@/views/page-not-found';

Vue.use(Router);

const parseProps = r => ({ id: parseInt(r.params.id) });

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/planets',
    },
    {
      path: '/planets',
      name: 'planets',
      component: () =>
        import(/* webpackChunkName: "bundle.planets" */ './views/planets.vue'),
    },
    {
      path: '/planets/:id',
      name: 'planet-detail',
      // props: true,
      props: parseProps,
      component: () =>
        import(/* webpackChunkName: "bundle.planets" */ './views/planet-detail.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () =>
        import(/* webpackChunkName: "bundle.planets" */ './views/admin.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () =>
        import(/* webpackChunkName: "bundle.about" */ './views/about.vue'),
    },
    {
      path: '*',
      component: PageNotFound,
    },
  ],
});
