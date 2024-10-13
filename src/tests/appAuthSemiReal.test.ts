import { expect, test } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import App from '@/App.vue'
import { provide } from 'vue'
import createApi, { ApiInjectKey } from '@/api'
import createRouter from '@/router'
import { createPinia } from 'pinia'
import createRootStore, { StoreInjectKey } from '@/store'
import createHttp from '@/plugins/http'
import AppLink from '@/components/Link.vue'
import { initHttpTokens } from '@/connectors/initHttpTokens'

const pinia = createPinia();
const http = createHttp('http://localhost:3000');
const api = createApi(http);
const router = createRouter();
const store = createRootStore(pinia);

initHttpTokens(http, localStorage);

const PostsListWrapper = {
	components: {
		App
	},
	template: `<App/>`,
	setup(){
		provide(ApiInjectKey, api);
		provide(StoreInjectKey, store);
	}
}

test('appAuthSimple', async () => {

	const cmp = mount(PostsListWrapper, {
		global: {
			components: {
				AppLink
			},
			plugins: [ router, pinia ]
		}
	});

	router.push({ name: 'auth.login' });
	await router.isReady();
	await flushPromises();
	
	expect(cmp.find('.card-title').text()).toBe('Enter to site');

	const inpLogin = cmp.find('input[name=login]');
	expect(inpLogin.exists()).toBe(true);

	const inpPass = cmp.find('input[name=password]');
	expect(inpPass.exists()).toBe(true);

	await inpLogin.setValue('admin');
	await inpPass.setValue('qwerty');

	await cmp.find('button').trigger('click');
	await new Promise(r => setTimeout(r, 300));
	expect(cmp.text()).contain('wrong_credentials');

	await inpPass.setValue('password');
	await cmp.find('button').trigger('click');
	await new Promise(r => setTimeout(r, 3000));


	console.log(localStorage);
	expect(cmp.text()).contain('admin');

});