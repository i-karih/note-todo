// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@pinia/nuxt'],
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },

	ssr: false,

	typescript: {
		strict: true,
	},

	css: [
		'@fontsource/golos-ui/400.css',
		'@fontsource/golos-ui/600.css',
		'@note-todo/ui/styles',
		'~/assets/css/main.scss',
	],

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "@note-todo/ui/mixins" as *;`,
				},
			},
		},
	},
})
