module.exports = {
  pwa: {
    name: 'Neotab',
    themeColor: '#B8E986',
    msTileColor: '#B8E986',
    manifestOptions: {
      background_color: '#212121',
      icons: [
        { 'src': './img/icons/android-chrome-192x192.png', 'sizes': '192x192', 'type': 'image/png' },
        { 'src': './img/icons/android-chrome-512x512.png', 'sizes': '512x512', 'type': 'image/png' },
      ]
    }
  },

  productionSourceMap: false
}