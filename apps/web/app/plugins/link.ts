import { LinkComponentKey } from '@note-todo/ui'
import { NuxtLink } from '#components'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.provide(LinkComponentKey, NuxtLink)
})