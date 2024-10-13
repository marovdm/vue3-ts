import AppLink from '@/components/Link.vue'
import { createApp } from 'vue'
import App from './App.vue'
import createAppRouter from './router'
import { createPinia } from 'pinia';
import createHttpPlugin from './plugins/http'
import 'bootstrap/dist/css/bootstrap.min.css'
import createApi, { ApiInjectKey } from './api'
import createStore, { StoreInjectKey } from './store';
import { initPagesAuthGuard } from './connectors/initPagesAuthGuard';
import { initHttpTokens } from './connectors/initHttpTokens';

async function getApp(){
	const app = createApp(App);
	const pinia = createPinia();
	const store = createStore(pinia);
	const router = createAppRouter();

	const http = createHttpPlugin('http://localhost:3000/');
	const api = createApi(http);

	if(!import.meta.env.SSR){
		initHttpTokens(http, localStorage);

		const authRes = await api.auth.check();

		if(authRes.auth){
			store.auth().setUser(authRes.user);
		}
	}


	initPagesAuthGuard(store, router);

	app.use(router)
	app.use(pinia)
	app.component('AppLink', AppLink)

	app.provide(ApiInjectKey, api);
	app.provide(StoreInjectKey, store);
	
	return { app, store }
}

getApp().then(({ app }) => {
	app.mount('#app')
})


