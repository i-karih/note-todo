export default {
	extends: ['stylelint-config-standard-scss', 'stylelint-config-html/vue'],
	rules: {
		// Отступы табами
		indentation: 'tab',
		// Разрешаем BEM нотацию
		'selector-class-pattern': [
			'^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$',
			{
				message: 'Expected class selector to be BEM (block__element--modifier)',
			},
		],
		// Разрешаем CSS переменные без fallback
		'custom-property-no-missing-var-function': null,
		// Разрешаем пустые блоки (для заглушек)
		'block-no-empty': null,
		// Отключаем проверку единиц для 0
		'length-zero-no-unit': null,
		// Разрешаем SCSS переменные в calc
		'scss/no-global-function-names': null,
		// Порядок свойств не проверяем (слишком строго)
		'declaration-block-no-redundant-longhand-properties': null,
	},
	ignoreFiles: ['node_modules/**', '.nuxt/**', '.output/**', 'dist/**'],
}
