module.exports = {
  plugins: {
    tailwindcss: {},
    'vue-cli-plugin-tailwind/purgecss': {
      whitelistPatterns: [/snack/, /top/, /bottom/, /left/, /right/]
    },
    autoprefixer: {}
  }
}
