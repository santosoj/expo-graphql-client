const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ['@ui-kitten/components'],
      },
    },
    argv
  )

  config.module.rules.push({
    test: /\.graphql$/,
    use: 'raw-loader',
  })

  return config
}
