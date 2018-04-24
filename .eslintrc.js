module.exports = {
	env: {
		es6: true,
		node: true,
		browser: true
	},
	extends: ["eslint:recommended", "react-app"],
	parser: "babel-eslint",
	parserOptions: {
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true
		},
		sourceType: "module",
		allowImportExportEverywhere: false,
		codeFrame: false
	},
	plugins: ["react", "import"],
	rules: {
		strict: 1,
		"no-const-assign": 1,
		"no-this-before-super": 1,
		"no-undef": 1,
		"no-unreachable": 1,
		"no-unused-vars": 1,
		"constructor-super": 1,
		"valid-typeof": 1,
		indent: ["error", "tab"],
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		indent: [1, "tab", { SwitchCase: 1 }],
		"no-console": 0,
		"react/jsx-uses-react": "error",
		"react/jsx-uses-vars": "error",
		"import/no-unresolved": [2, { commonjs: true, amd: true }],
		"import/named": 2,
		"import/namespace": 2,
		"import/default": 2,
		"import/export": 2
	}
};
