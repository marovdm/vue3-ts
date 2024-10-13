import { expect, test } from 'vitest'
import useForm from '@/composables/useForm'
import { AxiosError, AxiosResponse } from 'axios'

test('useForm simple check', async () => {
	const form = useForm(
		(data: { title: string, content: string }) => { 
			return new Promise<number>(r => setTimeout(() => r(1), 100))
		},
		{ title: '', content: '' },
		( x: number ) => {  }
	)

  expect(form.pending.value).toBe(false)
  expect(form.errors.value).toStrictEqual({})

  const pr = form.send();
  expect(form.pending.value).toBe(true)

  await pr;
  expect(form.pending.value).toBe(false)
})

test('useForm 422 check', async () => {
	const form = useForm(
		async (data: { title: string, content: string }) => { 
			throw new AxiosError('', '', undefined, undefined, { 
				status: 422,
				data: [[ 'title', 'null', [] ]]
			} as unknown as AxiosResponse<null, null>)
		},
		{ title: '', content: '' },
		( x: number ) => {  }
	)

	expect(form.errors.value).toStrictEqual({})
	await form.send();
	expect(form.errors.value).toStrictEqual({ title: "null" })
})