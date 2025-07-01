// Optional: PurgeCSS config for further optimization
module.exports = {
  content: [
    './templates/**/*.html',
    './src/**/*.ts'
  ],
  css: ['./templates/assets/dist/style.css'],
  safelist: [
    'is-open',
    'is-active',
    'color-scheme-auto',
    'color-scheme-light',
    'color-scheme-dark'
  ]
}