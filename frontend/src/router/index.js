import {
	createRouter,
	createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import auth from '../store/modules/auth';

const routes = [{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/signup',
		name: 'Signup',
		meta: {
			layout: "auth",
			guest: true
		},
		component: () => import('../views/Auth/Signup.vue')
	},
	{
		path: '/login',
		name: 'Login',
		meta: {
			layout: "auth",
			guest: true
		},
		component: () => import('../views/Auth/Login.vue')
	},
	{
		path: '/logout',
		name: 'Logout',
		meta: {
			layout: "auth",
			requireAuth: true
		},
		component: () => import('../views/Auth/Logout.vue')
	},
	{
		path: '/confirmation/:id/:token',
		name: 'AccountActivated',
		meta: {
			layout: "auth",
		},
		component: () => import('../views/Auth/AccountActivated.vue')
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		meta: {
			layout: "auth",
			requireAuth: true
		},
		component: () => import('../views/Users/Dashboard.vue')
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})



router.beforeEach((to, from, next) => {

	const isAuthenticated = auth.state.logged;
	// * If the user is not authenticated and wants to access the content then he is redirected to the login page.
	if(to.matched.some((record) => record.meta.requireAuth)){
		 if(!isAuthenticated){
			  next('/login')
		 }else{
			 next();
		 }
	}// If he is authenticated and wants to access the Login || Register he is redirected to the dashboard page.
	else if(to.matched.some((record) => record.meta.guest)){
		if(isAuthenticated){
			next('/dashboard');
		}else{
			next();
		}
	}else{
		 next()
	}
})

export default router