import { RouteRecordRaw } from "vue-router";

import Home from '@/views/Home.vue'
import PostsIndex from '@/views/Posts/Index.vue'
import PostsShow from '@/views/Posts/Show.vue'
import Login from '@/views/Auth/Login.vue'
import Office from '@/views/Office/Base.vue'
import OfficeDashboard from '@/views/Office/Dashboard.vue'
import OfficePostsIndex from '@/views/Office/Posts/Index.vue'
import OfficePostsShow from '@/views/Office/Posts/Show.vue'
import OfficePostsEdit from '@/views/Office/Posts/Edit.vue'
import OfficePostsCreate from '@/views/Office/Posts/Create.vue'
import OfficeLogout from '@/views/Office/Logout.vue'

import OfficePostsAltIndex from '@/views/Office/PostsAlt/Index.vue'
import OfficePostsAltItem from '@/views/Office/PostsAlt/Item.vue'
import OfficePostsAltShow from '@/views/Office/PostsAlt/Show.vue'
import OfficePostsAltEdit from '@/views/Office/PostsAlt/Edit.vue'

export default function initRoutes(){
	const routes = [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/posts',
			name: 'posts',
			component: PostsIndex
		},
		{
			path: '/posts/:id',
			name: 'post',
			component: PostsShow
		},
		{
			path: '/sample',
			redirect: '/'
		},
		{
			name: 'user.post',
			path: '/user/:uid/post/:pid/comment',
			redirect: '/'
		},
		{
			name: 'auth.login',
			path: '/auth/login',
			component: Login,
			meta: { guest: true }
		},
		{
			path: '/office',
			meta: { auth: true },
			component: Office,
			children: [
				{
					name: 'office.dashboard',
					path: 'dashboard',
					component: OfficeDashboard,
				},
				{
					name: 'office.posts.index',
					path: 'posts',
					component: OfficePostsIndex,
				},
				{
					name: 'office.posts.show',
					path: 'posts/:id',
					component: OfficePostsShow,
				},
				{
					name: 'office.posts.create',
					path: 'posts/create',
					component: OfficePostsCreate,
				},
				{
					name: 'office.posts.edit',
					path: 'posts/:id/edit',
					component: OfficePostsEdit,
				},
				{
					name: 'office.logout',
					path: 'logout',
					component: OfficeLogout,
				},
				{
					name: 'office.alt.index',
					path: 'alt',
					component: OfficePostsAltIndex,
				},
				{
					path: 'alt/:id',
					component: OfficePostsAltItem,
					children: [
						{
							name: 'office.alt.show',
							path: '',
							component: OfficePostsAltShow,
						},
						{
							name: 'office.alt.edit',
							path: 'edit',
							component: OfficePostsAltEdit,
						}
					]
				},
			]
		}
	] as const satisfies RouteRecordRaw[];

	return routes;	
}



