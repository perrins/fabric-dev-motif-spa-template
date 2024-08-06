const { ModuleFederationPlugin } = require('webpack').container;
const { env } = process;
const path = require('path');
const CracoAlias = require('craco-alias');

module.exports = {
  style: {
    sass: {
      loaderOptions: (sassLoaderOptions, { env, paths }) => {
        sassLoaderOptions.sassOptions = {
          ...sassLoaderOptions.sassOptions,
          includePaths: [path.resolve(__dirname, 'node_modules/')]
        };

        return sassLoaderOptions;
      }
    }
  },
  webpack: {
    mode: 'extends',
    configure: {
      module: {
        rules: [
          {
            test: /\.js$/,
            enforce: 'pre',
            use: ['source-map-loader']
          }
        ]
      },
      ignoreWarnings: [/Failed to parse source map/],
      output: {
        publicPath: env.REACT_APP_NODE_ENV !== 'CODESPACE' ? `${env.REACT_APP_BASE_URL}/` : ''
      }
    },
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: 'mfe_host_app_template',
          filename: 'remoteEntry.js',
          remotes: {
            map_header: `map_header@${env.REACT_MFE_HEADER}/remoteEntry.js`,
            map_footer: `map_footer@${env.REACT_MFE_FOOTER}/remoteEntry.js`
          },
          exposes: {},
          shared: {
            react: { singleton: true },
            'react-dom': { singleton: true },
            'react-router-dom': { singleton: true },
            '@ey/mfe-ui-core': { singleton: true },
            '@azure/msal-browser': { singleton: true },
            '@azure/msal-react': { singleton: true }
          }
        })
      ]
    },
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@views': path.resolve(__dirname, 'src/views/')
    }
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./",
        tsConfigPath: "./tsconfig.paths.json"
      }
    }
  ]
};
