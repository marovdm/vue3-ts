import { expect, test } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { provide } from 'vue';
import { ApiInjectKey } from '@/api';
import AppLink from '@/components/Link.vue'
import createAppRouter from '@/router';

const router = createAppRouter();

test('router page check', async () => {
	router.push('/posts')
	await router.isReady()

	const wrapper = mount({
		template: `<RouterView />`,
		setup(){
			provide(ApiInjectKey, {
				posts: {
					async all(){
						// todo next sample - wainting when .row is on page
						//await promiseTimeout(300);
						// https://github.com/vuejs/test-utils/issues/137
						// нет такого простого waitFor из коробки как в react test lib

						return [{
							"id":1,
							"url":"ytrytrytrytr",
							"title":"Hello World",
							"content":"dsfgds gddsfgds gddsfgds gddsfgds gd",
							"createdAt":"2024-09-02T19:07:38.660Z",
							"updatedAt":"2024-09-02T19:07:38.660Z",
							"UserId":1,
							"User":{"id":1,"login":"admin"}
						}];
					}
				}
			} as any)
		}
	}, {
		global: {
			components: {
				AppLink
			},
			plugins: [ router ]
		}
	}
);
	
	await flushPromises();
	expect(wrapper.text()).toContain('Hello World')

})
