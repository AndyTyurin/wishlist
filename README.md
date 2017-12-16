# Wishlist
*Node.js >= 8.x  
*****

### Project structure
```
|-- src                   # code sources  
  |-- client                 # front UI and game parts.  
    |-- action                  # redux action-creators and action-types.  
    |-- component               # react components, styles and test suites for each of component.  
    |-- font                    # font assets.  
    |-- logger                  # client side logger.  
    |-- service                 # service factories.  
    |-- reducer                 # redux reducers.  
    |-- store                   # store initialization.  
    | index.js                  # client-side initialization (webpack entry point).  
    | routes.jsx                # react-router's routes configuration.  
  |-- api                    # API server.  
    |-- index.js                # api initialization (webpack entry point).  
    |-- wishlist_api            # wishlist API.  
  |-- server                 # web server.  
    |-- api                     # REST API.  
    |-- mock                    # REST mocks.  
    | html.js                   # universal rendering markup generation.  
    | index.js                  # koa server initialization (webpack entrypoint).  
    | universal.jsx             # universal rendering.  
    | initial_state.js          # server side initial state.  
  |-- util                   # utility libraries.  
| .babelrc                # babel settings.  
| .eslintignore           # eslint ignore files.  
| .eslintrc               # eslint settings.  
| .gitignore              # git ignore.  
| .istanbul.yml           # test coverage configuration.  
| .sass-lint.yml          # sass linter settings.  
| jsconfig.json           # js settings (for IDE & editors such as vscode).  
| postcss.config.js       # postcss settings.  
| README.md               # you are here.  
| webpack.client.js       # webpack settings for client-side bundle.  
| webpack.server.js       # webpack settings for server-side budnle (web server).  
| webpack.mocha.js        # webpack settings for mocha test suites.  
| webpack.utils.js        # webpack utils and presets used along with webpack configuration.  
| webpack.base.js         # webpack common settings will be merged with client or server settings.  
| webpack.config.js       # webpack configuration initialization.  
| yarn.lock               # yarn lock file for version freeze.
```

### Setup

**Install dependencies by using Yarn package manager**
```
yarn install
```

### Development
Be *DRY.KISS.SOLID*.  
For development purposes there are three terminals necessary to use in same time (client-side, server-side, api).  

**Webpack client-side dev server**  
Run webpack client-side watcher & compiler.
```
yarn run webpack-client
```

**Webpack server-side dev server**  
Run webpack server-side watcher & compiler after client-side.
```
yarn run webpack-server
```

**Webpack API dev server**  
Run webpack api watcher.
```
yarn run webpack-api
```

*Note, webpack client-side must be compiled before server-side.*  

**Look to your project**  
Go to http://localhost:9091  

### Windows  
Project is not tested on windows, so please write if you got in trouble.  