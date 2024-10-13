import { expect, test } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Cmp from '@/views/Posts/Index.vue'
import { provide, nextTick } from 'vue';
import { ApiInjectKey } from '@/api';
import AppLink from '@/components/Link.vue'
import { createMemoryHistory, createRouter } from 'vue-router';

async function promiseTimeout(time: number){
	return new Promise(r => {
		setTimeout(r, time)
	});
}

const router = createRouter({
	routes: [{
		name: 'office.posts.show',
		path: '/:id',
		redirect: ''
	}],
	history: createMemoryHistory()
});

test('cmp simple check', async () => {
	const wrapper = mount({
		template: `<Cmp/>`,
		components: { Cmp },
		setup(){
			provide(ApiInjectKey, {
				posts: {
					async all(){
						// todo next sample - wainting when .row is on page
						//await promiseTimeout(300);

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
