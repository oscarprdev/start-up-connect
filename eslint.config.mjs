// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    'vue/html-self-closing': 'off',
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'vue/no-v-html': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/single-attribute-per-line': 'off',
  },
});
