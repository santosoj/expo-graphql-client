module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'import-graphql',
      ['module:react-native-dotenv', { path: 'appvars.env' }],
    ],
  }
}
