import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import E404OrCrit from '@/components/Errors/E404OrCritical.vue'

test('cmp simple check', async () => {
	const wrapper = mount(E404OrCrit, {
		props: {
			code: 400
		}
	})

	expect(wrapper.text()).toContain('Oopps, etc')

	const wrapper2 = mount(E404OrCrit, {
		props: {
			code: 404
		}
	})

	expect(wrapper2.text()).toContain('404')
})
