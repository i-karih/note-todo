import pluginJs from '@eslint/js'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import {
	defineConfigWithVueTs,
	vueTsConfigs,
} from '@vue/eslint-config-typescript'
import gitignore from 'eslint-config-flat-gitignore'
import pluginJsdoc from 'eslint-plugin-jsdoc'
import perfectionist from 'eslint-plugin-perfectionist'
import pluginPrettier from 'eslint-plugin-prettier/recommended'
import pluginRegexp from 'eslint-plugin-regexp'
import pluginSonarjs from 'eslint-plugin-sonarjs'
import pluginUnicorn from 'eslint-plugin-unicorn'
import pluginVue from 'eslint-plugin-vue'
import { globalIgnores } from 'eslint/config'
import pluginTs from 'typescript-eslint'

// Nuxt/Vue auto-imports
const nuxtGlobals = {
	// Vue
	ref: 'readonly',
	computed: 'readonly',
	reactive: 'readonly',
	watch: 'readonly',
	watchEffect: 'readonly',
	onMounted: 'readonly',
	onUnmounted: 'readonly',
	onBeforeMount: 'readonly',
	onBeforeUnmount: 'readonly',
	toRef: 'readonly',
	toRefs: 'readonly',
	inject: 'readonly',
	provide: 'readonly',
	defineProps: 'readonly',
	defineEmits: 'readonly',
	defineExpose: 'readonly',
	defineModel: 'readonly',
	defineSlots: 'readonly',
	withDefaults: 'readonly',
	useId: 'readonly',
	nextTick: 'readonly',
	h: 'readonly',

	// Nuxt
	useRoute: 'readonly',
	useRouter: 'readonly',
	useHead: 'readonly',
	useFetch: 'readonly',
	useAsyncData: 'readonly',
	useLazyFetch: 'readonly',
	useLazyAsyncData: 'readonly',
	useNuxtApp: 'readonly',
	useRuntimeConfig: 'readonly',
	useState: 'readonly',
	useCookie: 'readonly',
	useColorMode: 'readonly',
	definePageMeta: 'readonly',
	defineNuxtConfig: 'readonly',
	navigateTo: 'readonly',
	abortNavigation: 'readonly',
	createError: 'readonly',
	showError: 'readonly',
	clearError: 'readonly',

	// Browser
	console: 'readonly',
}

export default defineConfigWithVueTs(
	{
		name: 'app/files-to-lint',
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
	},
	gitignore(),
	globalIgnores([
		'**/node_modules',
		'**/public',
		'**/vendor',
		'**/dist',
		'**/.nuxt',
		'**/.output',
		'**/coverage/',
	]),

	{
		rules: {
			camelcase: 'error',
			'no-console': 'warn',
			'no-debugger': 'warn',
			'no-else-return': 'warn',
			'prefer-const': 'error',
			'max-depth': ['error', 3],
			'max-params': ['error', 5],
		},
	},
	pluginJs.configs.recommended,
	pluginTs.configs.strict,
	pluginTs.configs.stylistic,
	{
		rules: {
			'@typescript-eslint/consistent-type-definitions': ['off', 'type'],
		},
	},
	pluginRegexp.configs['flat/recommended'],
	{
		...pluginJsdoc.configs['flat/recommended-typescript'],
		files: ['**/*.ts'],
		ignores: [
			'**/*.d.ts',
			'**/stores/**',
			'**/composables/**',
			'**/uses/**',
			'**/*.test.{js,ts,jsx,tsx}',
		],
	},
	{
		rules: {
			'jsdoc/check-alignment': 'off',
		},
	},

	pluginUnicorn.configs.recommended,
	{
		rules: {
			'unicorn/no-null': 'off',
			'unicorn/import-style': 'off',
			'unicorn/name-replacements': 'off',
			'unicorn/prefer-top-level-await': 'off',
			'unicorn/filename-case': [
				'error',
				{
					cases: {
						camelCase: true,
						kebabCase: true,
						pascalCase: true,
					},
					ignore: ['^UI$'],
				},
			],
		},
	},
	pluginSonarjs.configs.recommended,
	{
		rules: {
			'sonarjs/todo-tag': 'off',
		},
	},
	{
		plugins: {
			perfectionist,
		},
		rules: {
			'perfectionist/sort-imports': [
				'warn',
				{
					groups: [
						['builtin', 'external', 'type'],
						['type-internal', 'internal'],
						[
							'parent',
							'sibling',
							'index',
							'type-parent',
							'type-sibling',
							'type-index',
						],
						'ts-equals-import',
						'unknown',
					],
					newlinesBetween: 1,
					internalPattern: ['^~/.*', '^@/.*'],
				},
			],
		},
	},

	pluginVue.configs['flat/recommended'],
	vueTsConfigs.recommended,
	{
		rules: {
			'vue/multi-word-component-names': 'off',
		},
	},

	// Автоимпорты Nuxt: TypeScript сам проверяет необъявленные имена
	{
		languageOptions: {
			globals: nuxtGlobals,
		},
		rules: {
			'no-undef': 'off',
		},
	},

	skipFormatting,
	pluginPrettier
)