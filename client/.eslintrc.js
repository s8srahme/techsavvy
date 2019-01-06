module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true
	},
	extends: ["eslint:recommended", "plugin:react/recommended"],
	parser: "babel-eslint",
	parserOptions: {
		allowImportExportEverywhere: false,
		codeFrame: false,
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true
		},
		sourceType: "module"
	},
	plugins: ["react", "import"],
	rules: {
		"constructor-super": 1,
		"import/default": 2,
		"import/export": 2,
		"import/named": 2,
		"import/namespace": 2,
		"import/no-unresolved": [
			2,
			{
				amd: true,
				commonjs: true
			}
		],
		indent: [
			1,
			"tab",
			{
				SwitchCase: 1
			}
		],
		"linebreak-style": ["error", "unix"],
		"no-console": 0,
		"no-const-assign": 1,
		"no-this-before-super": 1,
		"no-undef": 1,
		"no-unreachable": 1,
		"no-unused-vars": 1,
		quotes: ["error", "double"],
		"react/jsx-no-target-blank": ["warn"],
		"react/jsx-uses-react": "error",
		"react/jsx-uses-vars": "error",
		"react/no-deprecated": ["warn"],
		"react/prop-types": ["warn"],
		semi: ["error", "always"],
		strict: 1,
		"valid-typeof": 1
	},
	settings: {
		react: {
			version: "16.3.1"
		}
	}
};
