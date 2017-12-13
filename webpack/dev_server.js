const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const proxy = require('koa-proxy');
const convert = require('koa-convert');
const webpack = require('webpack');
const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpackHotMiddleware = require('koa-webpack-hot-middleware');
const config = require('config');
const spawn = require('child_process').spawn;
const PassThrough = require('stream').PassThrough;
const http = require('http');
const Router = require('koa-router');

const webpackConfig = require('./../webpack.config');
const webpackUtils = require('./../webpack.utils');

/**
 * Get configuration.
 */
const webServerPort = config.get('webServer.port');
const clientWatcherPort = config.get('webpack.client.port');
const serverWatcherPort = config.get('webpack.server.port');

/**
 * Determine platform's specific configuration.
 */
const isClientPlatform = webpackUtils.PLATFORM === webpackUtils.CLIENT;
const isServerPlatform = webpackUtils.PLATFORM === webpackUtils.SERVER;

let port = clientWatcherPort;

/** Select appropriate port for watcher. */
if (isServerPlatform) {
  port = serverWatcherPort;
}

/**
 * Setup koa server and router.
 */
const app = new Koa();
const router = new Router();

/**
 * Temporary directory and path to built web server.
 */
const tmpDir = path.resolve(__dirname, 'tmp');
const assetsManifestFileName = 'assets-manifest.json';

/** Webpack compiler. */
const compiler = webpack(webpackConfig);

/** Webpack dev middleware. */
const devMiddlewareInstance = webpackDevMiddleware(compiler, {
  /** Display no info to console (only warnings and errors). */
  noInfo: false,

  /** Do not display verbose logs to console. */
  quiet: false,

  /** Do not recompile on each request. */
  lazy: false,

  watchOptions: {
    /** Time delay before next watcher detection. */
    aggregateDelay: 300
  },

  /** Public path which is similar to webpack configuration has. */
  publicPath: webpackConfig.output.publicPath,

  /** Headers should allow origin because of proxy to webpack client server. */
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': `http://localhost:${clientWatcherPort}`
  },

  /** Hot reload. */
  hot: true,

  /** Rainbow and ponies. */
  stats: {
    colors: true
  }
});

/** Server child process. */
let childProcess;

function writeFileToTmpDirectory(fileName, content) {
  const filePath = path.resolve(tmpDir, fileName);

  /** Create temporary directory if it not presents. */
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }

  /** Write web server's content to file. */
  fs.writeFileSync(filePath, content);

  console.log(`File '${filePath}' successfully written`);
}

/** Listen for assets changes and rebuild if it needed. */
app.use(convert(devMiddlewareInstance));

/** Client side development server only. */
if (isClientPlatform) {
  /** Setup hot middleware. */
  const hotMiddlewareInstance = webpackHotMiddleware(compiler);
  app.use(convert(hotMiddlewareInstance));
}

/** Kill web server when re-build starts. */
compiler.plugin('compile', () => {
  if (childProcess) {
    process.kill(-childProcess.pid);
  }
});

/** Raise web server when re-built. */
compiler.plugin('done', (stats) => {
  if (stats.compilation.errors && stats.compilation.errors.length) {
    console.log('Building failure.');
    if (childProcess) {
      console.log('Webserver has been closed till next source update');
      process.kill(-childProcess.pid);
    }
  }

  if (isServerPlatform) {
    const serverFileName = webpackConfig.output.filename;
    const serverFilePath = path.resolve(tmpDir, serverFileName);

    try {
      /** Read content of web server from webpack's memory. */
      const serverContent = devMiddlewareInstance.fileSystem.readFileSync(path.resolve(
        __dirname,
        '../',
        webpackUtils.BUILD_PATH,
        'server',
        serverFileName
      ));

      writeFileToTmpDirectory(serverFileName, serverContent);
    } catch (e) {
      console.error("Server content's can not be found or written.");
    }

    if (!childProcess) {
      /** Raise server as a child process. */
      childProcess = spawn('node', [serverFilePath], {
        detached: true,
        stdio: 'inherit'
      });
      childProcess.on('exit', () => {
        childProcess = null;
      });
    }
  } else if (isClientPlatform) {
    try {
      /** Read content of assets manifest from webpack's memory. */
      const assetsManifestContent = devMiddlewareInstance.fileSystem.readFileSync(path.resolve(
        __dirname,
        '../',
        webpackUtils.BUILD_PATH,
        'server',
        assetsManifestFileName
      ));

      writeFileToTmpDirectory(assetsManifestFileName, assetsManifestContent);
    } catch (e) {
      console.error(e);
      console.error("Assets manifest content's can not be found or written.");
    }
  }
});

/** Setup server-side development server configurations. */
if (isServerPlatform) {
  /** Proxy HMR requests to client-side server. */
  router.get('/__webpack_hmr', (ctx) => {
    let isStreamClosed = false;
    let req;
    const stream = new PassThrough();
    const send = (data) => {
      if (!isStreamClosed) {
        stream.write(data);
      } else if (req) {
        req.end();
      }
    };
    const close = () => {
      isStreamClosed = true;
      stream.end();
      ctx.res.statusCode = 200;
      ctx.res.end();
    };

    ctx.req.on('close', close);
    ctx.req.on('finish', close);
    ctx.req.on('error', close);

    ctx.type = 'text/event-stream';
    ctx.body = stream;

    req = http.get(
      `http://localhost:${clientWatcherPort}/__webpack_hmr`,
      (res) => {
        res.on('data', send);
      }
    );
  });

  /** Apply HMR route. */
  app.use(router.routes());

  /** Check web-server availability and proxy all requests to it. */
  app.use(async (ctx, next) => {
    const ping = (cb) => {
      setTimeout(() => {
        http
          .get(`http://localhost:${webServerPort}/health`, (res) => {
            if (childProcess && res.statusCode === 200) {
              cb();
            } else {
              ping(cb);
            }
          })
          .on('error', () => {
            ping(cb);
          });
      }, 100);
    };
    await new Promise((resolve) => {
      ping(() => {
        resolve(convert(proxy({
          host: `http://localhost:${webServerPort}`,
          followRedirect: false
        }))(ctx, next));
      });
    });
  });
}

/** Raise development server. */
app.listen(port, () => {
  console.log(`Webpack development server started on port :${port}`);
});

/** Close gracefully development server. */
const gracefullyClose = () => {
  if (childProcess) {
    process.kill(-childProcess.pid);
    console.log('\nSpawned web-server child process determinated');
  }
  process.exit();
};

/** Proceed gracefull exit. */
process.on('SIGINT', gracefullyClose);
process.on('uncaughtException', (err) => {
  console.error(err);
  gracefullyClose();
});
