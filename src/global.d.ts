import AppLink from '@/components/Link.vue'

declare module 'vue'{
	export interface GlobalComponents{
		AppLink: typeof AppLink
	}
}

/* declare module 'vue-router'{
	export interface TypesConfig{
		RouterLink: AppLink
	}
} */