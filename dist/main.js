// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"loiGR":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "bed887d14d6bcbeb";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"gLLPy":[function(require,module,exports,__globalThis) {
/**
 * Webflow custom code entry. Build: `npm run build` → one file `dist/main.js` (esbuild; `npm run dev` = Parcel + HMR).
 * Load: GSAP core, Flip, ScrollTrigger + SplitText (3.x) before this script.
 * Service card scrub is installed from body-intro after the blue field commits (epic-service-cards-handoff).
 */ var _bodyIntroJs = require("./body-intro.js");
(0, _bodyIntroJs.bootstrapEpicBodyIntro)();

},{"./body-intro.js":"awVjY"}],"awVjY":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bootstrapEpicBodyIntro", ()=>bootstrapEpicBodyIntro);
var _epicServiceCardsHandoffJs = require("./epic-service-cards-handoff.js");
var _epicConstantsJs = require("./epic-constants.js");
function bootstrapEpicBodyIntro() {
    "use strict";
    if (typeof window.gsap === "undefined") {
        console.warn("[body-intro] gsap not found on window.");
        return;
    }
    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;
    var SplitText = window.SplitText;
    if (!ScrollTrigger || !SplitText) {
        console.warn("[body-intro] Load ScrollTrigger and SplitText before this script.");
        return;
    }
    gsap.registerPlugin(ScrollTrigger, SplitText);
    var REDUCED_MOTION = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var valuePropResizePatched = false;
    /** Expected: .body-intro > .body-intro__inner > .body-intro__stage > h2.value-prop (epic-gsap). */ var SELECTORS = {
        bodyIntro: ".body-intro",
        valueProp: "h2.value-prop",
        stage: ".body-intro__stage"
    };
    function qs(sel, root) {
        return (root || document).querySelector(sel);
    }
    /** Set window.__EPIC_DEBUG_VALUE_PROP = true, or ?epicDebug=1, or localStorage epicDebugValueProp=1 */ function isValuePropDebug() {
        if (typeof window !== "undefined" && window.__EPIC_DEBUG_VALUE_PROP === true) return true;
        try {
            if (window.localStorage && window.localStorage.getItem("epicDebugValueProp") === "1") return true;
        } catch (e) {}
        try {
            var search = window.location && window.location.search;
            if (search && (/\bepicDebug=1\b/.test(search) || /\bepicDebug=valueProp\b/.test(search))) return true;
        } catch (e) {}
        return false;
    }
    function _vpBox(el) {
        if (!el) return null;
        var r = el.getBoundingClientRect();
        return {
            tag: el.tagName,
            class: el.className && String(el.className).slice(0, 120) || "",
            w: Math.round(r.width * 100) / 100,
            h: Math.round(r.height * 100) / 100
        };
    }
    function logValuePropDebug(phase, data) {
        if (!isValuePropDebug()) return;
        var payload = data || {};
        try {
            window.__epicValuePropLastDebug = {
                phase: phase,
                at: new Date().toISOString(),
                data: payload
            };
        } catch (e) {}
        console.group("[epic body-intro] value-prop debug " + (phase || ""));
        console.log(payload);
        console.log("Read window.__epicValuePropLastDebug for the last snapshot.");
        console.groupEnd();
    }
    function gatherValuePropLayoutForDebug(h2, bodyIntro, split) {
        var inner = bodyIntro ? qs(".body-intro__inner", bodyIntro) : null;
        var stage = bodyIntro ? qs(SELECTORS.stage, bodyIntro) : null;
        var o = {
            viewInnerWidth: typeof window !== "undefined" ? window.innerWidth : 0,
            h2: _vpBox(h2),
            h2TextLen: h2 && h2.textContent ? h2.textContent.length : 0,
            h2ClientScroll: h2 ? {
                clientWidth: h2.clientWidth,
                scrollWidth: h2.scrollWidth
            } : null,
            bodyIntro: _vpBox(bodyIntro),
            inner: _vpBox(inner),
            stage: _vpBox(stage)
        };
        if (h2) {
            var cs = window.getComputedStyle(h2);
            o.h2Computed = {
                display: cs.display,
                whiteSpace: cs.whiteSpace,
                textWrap: cs.textWrap,
                width: cs.width,
                maxWidth: cs.maxWidth,
                minWidth: cs.minWidth
            };
        }
        if (h2 && h2.parentElement) {
            var pcs = window.getComputedStyle(h2.parentElement);
            o.h2Parent = {
                tag: h2.parentElement.tagName,
                class: h2.parentElement.className && String(h2.parentElement.className).slice(0, 80) || "",
                display: pcs.display,
                flexDirection: pcs.flexDirection,
                alignItems: pcs.alignItems,
                w: Math.round(h2.parentElement.getBoundingClientRect().width * 100) / 100
            };
        }
        if (split) {
            o.splitLines = split.lines ? split.lines.length : 0;
            o.splitWords = split.words ? split.words.length : 0;
            o.splitChars = split.chars ? split.chars.length : 0;
        }
        if (typeof SplitText !== "undefined" && SplitText.version) o.splitTextVersion = SplitText.version;
        o.fontsStatus = document.fonts && document.fonts.status ? document.fonts.status : "unknown";
        return o;
    }
    /** Required for Webflow JS-only: keeps end-of-line cursors on the same row as the text. */ function injectBodyIntroLayoutStyles() {
        var id = "epic-body-intro-layout-styles";
        if (document.getElementById(id)) return;
        var el = document.createElement("style");
        el.id = id;
        el.textContent = [
            "/* .body-intro__stage often shrink-wraps to the <h2>\u2019s text; then h2 width:100% is 100% of",
            "   that max-content and SplitText only sees one line. Stretch the stage in the flex chain. */",
            "/* Blue iris: burst is below the morph. Pin-spacer gets same blue as .body-intro so the",
            "   empty band above a translated pinned intro is not transparent (no fixed-hero \u201Chole\u201D). */",
            "div.pin-spacer[class*=\"epic-body-intro-pin\"],",
            "div[class*=\"pin-spacer-epic-body-intro-pin\"] {",
            "  background: #0f33ff !important;",
            "}",
            ".epic-blue-burst {",
            "  position: fixed !important;",
            "  pointer-events: none !important;",
            "  z-index: 1 !important;",
            "  background: #0f33ff !important;",
            "  border-radius: 50% !important;",
            "  mix-blend-mode: normal !important;",
            "}",
            "body .value-prop-morph-dot--viewport,",
            "body .value-prop-morph-dot--viewport.value-prop-morph-dot {",
            "  z-index: 30 !important;",
            "  position: fixed !important;",
            "}",
            "/* value-prop-morph is appended last on body: z-30 can paint over #story. During service-card burst,",
            "   body.epic-burst-below-morph (set in handoff) lowers the morph; #story + parent are lifted. */",
            "body.epic-burst-below-morph .value-prop-morph-dot--viewport,",
            "body.epic-burst-below-morph .value-prop-morph-dot--viewport.value-prop-morph-dot {",
            "  z-index: 1 !important;",
            "}",
            "/* During burst, force #story to fill the viewport and center its content. Without this,",
            "   the morph dot (viewport center) and the cards (stuck in document flow) are in different",
            "   Y bands: Flip can look off-screen or mostly vertical. See /demo/epic-service-cards-standalone.html */",
            "body.epic-burst-below-morph #story {",
            "  position: relative !important;",
            "  z-index: 2 !important;",
            "  isolation: isolate !important;",
            "  min-height: 100dvh !important;",
            "  min-height: 100vh !important;",
            "  display: flex !important;",
            "  flex-direction: column !important;",
            "  justify-content: center !important;",
            "  align-items: center !important;",
            "  box-sizing: border-box !important;",
            "}",
            ".value-prop-morph-dot {",
            "  box-sizing: border-box !important;",
            "}",
            "body .body-intro .body-intro__stage, .body-intro__stage {",
            "  display: block !important;",
            "  width: 100% !important;",
            "  min-width: 0 !important;",
            "  max-width: 100% !important;",
            "  align-self: stretch !important;",
            "  box-sizing: border-box !important;",
            "}",
            "/* Webflow: flex + align-items:center makes headings shrink to max-content; SplitText",
            "   then measures a single long line. Pin the heading to the full inner width. */",
            "/* With a wide inner (e.g. 66% of 1940px \u2248 1280px) + display type, a long <h2> can still",
            "   fit one visual line \u2014 h2 height ~1em, scrollWidth == clientWidth. That yields",
            "   splitLines:1. Cap line length so copy wraps; tune ch in Webflow if needed. */",
            "body .body-intro h2.value-prop, .body-intro__stage h2.value-prop,",
            "h2.value-prop, .value-prop {",
            "  display: block !important;",
            "  width: 100% !important;",
            "  min-width: 0 !important;",
            "  max-width: min(100%, 50ch) !important;",
            "  margin-left: auto !important;",
            "  margin-right: auto !important;",
            "  align-self: stretch !important;",
            "  white-space: normal !important;",
            "  box-sizing: border-box !important;",
            "  text-wrap: initial !important;",
            "  letter-spacing: normal !important;",
            "  line-height: 1.25 !important;",
            "}",
            "h2.value-prop .value-prop-line,",
            ".value-prop .value-prop-line {",
            "  display: block !important;",
            "  text-align: center !important;",
            "  white-space: nowrap !important;",
            "  overflow: visible !important;",
            "  width: 100%;",
            "  line-height: inherit !important;",
            "  min-height: 0;",
            "  box-sizing: border-box;",
            "}",
            "h2.value-prop .value-prop-line--empty,",
            ".value-prop .value-prop-line--empty {",
            "  display: none !important;",
            "}",
            "h2.value-prop .value-prop-word,",
            ".value-prop .value-prop-word {",
            "  display: inline-flex !important;",
            "  flex-direction: row !important;",
            "  flex-wrap: nowrap !important;",
            "  align-items: baseline !important;",
            "  flex-shrink: 0 !important;",
            "}",
            "h2.value-prop .value-prop-char,",
            ".value-prop .value-prop-char {",
            "  display: inline-flex !important;",
            "  align-items: baseline !important;",
            "  justify-content: flex-end;",
            "  overflow: hidden !important;",
            "  box-sizing: border-box !important;",
            "  flex-shrink: 0 !important;",
            "  flex-grow: 0 !important;",
            "}",
            "h2.value-prop .value-prop-cursor,",
            ".value-prop .value-prop-cursor {",
            "  flex-shrink: 0 !important;",
            "  display: inline-block !important;",
            "}",
            ".body-intro__inner, .body-intro__stage {",
            "  overflow: visible !important;",
            "}"
        ].join("\n");
        document.head.appendChild(el);
    }
    function ensureStage(h2) {
        var parent = h2.parentElement;
        if (!parent) return null;
        if (parent.classList && parent.classList.contains("body-intro__stage")) return parent;
        var wrap = document.createElement("div");
        wrap.className = "body-intro__stage";
        parent.insertBefore(wrap, h2);
        wrap.appendChild(h2);
        return wrap;
    }
    function isLineEmpty(line) {
        return !/\S/.test(line.textContent || "");
    }
    function markEmptyLinesAndGetContent(split) {
        var content = [];
        for(var i = 0; i < split.lines.length; i++){
            var line = split.lines[i];
            if (isLineEmpty(line)) {
                line.classList.add("value-prop-line--empty");
                continue;
            }
            content.push(line);
        }
        return content;
    }
    function injectCursors(lines) {
        var cursors = [];
        for(var i = 0; i < lines.length; i++){
            var line = lines[i];
            var c = document.createElement("span");
            c.className = "value-prop-cursor";
            c.setAttribute("aria-hidden", "true");
            line.appendChild(c);
            cursors.push(c);
        }
        return cursors;
    }
    function groupCharsByLine(lines, allChars) {
        var map = lines.map(function() {
            return [];
        });
        for(var i = 0; i < allChars.length; i++){
            var ch = allChars[i];
            for(var L = 0; L < lines.length; L++)if (lines[L].contains(ch)) {
                map[L].push(ch);
                break;
            }
        }
        return map;
    }
    function prepCharWidths(contentLines, allChars) {
        for(var i = 0; i < allChars.length; i++){
            var ch = allChars[i];
            var inContent = false;
            for(var L = 0; L < contentLines.length; L++)if (contentLines[L].contains(ch)) {
                inContent = true;
                break;
            }
            if (!inContent) continue;
            var txt = ch.textContent || "";
            var isWhitespace = !/\S/.test(txt);
            var fontPx = parseFloat(window.getComputedStyle(ch).fontSize) || 16;
            var w = Math.max(ch.getBoundingClientRect().width, ch.offsetWidth || 0);
            w = Math.ceil(w * 2) / 2;
            if (w < 0.5) w = 0.5;
            if (isWhitespace) w = Math.max(w, fontPx * 0.35);
            gsap.set(ch, {
                display: "inline-flex",
                alignItems: "baseline",
                justifyContent: isWhitespace ? "center" : "flex-end",
                overflow: "hidden",
                boxSizing: "border-box",
                verticalAlign: "baseline",
                flexShrink: 0,
                flexGrow: 0,
                minWidth: w,
                width: w,
                maxWidth: w
            });
        }
    }
    function cacheCursorCenterX(cursors) {
        var cx = window.innerWidth / 2;
        return cursors.map(function(c) {
            var r = c.getBoundingClientRect();
            return cx - (r.left + r.width / 2);
        });
    }
    /** Per-line translateY so each line-end cursor's vertical center lands on targetMidY (viewport px). */ function computeMeetLineYs(lines, cursors, targetMidY) {
        return lines.map(function(line, i) {
            var c = cursors[i];
            if (!c) return 0;
            var r = c.getBoundingClientRect();
            var mid = r.top + r.height / 2;
            return targetMidY - mid;
        });
    }
    function readUnionRect(cursors, store) {
        var r = null;
        for(var i = 0; i < cursors.length; i++){
            var br = cursors[i].getBoundingClientRect();
            if (br.width < 0.35 || br.height < 0.35) continue;
            if (!r) r = {
                left: br.left,
                top: br.top,
                right: br.right,
                bottom: br.bottom
            };
            else {
                r.left = Math.min(r.left, br.left);
                r.top = Math.min(r.top, br.top);
                r.right = Math.max(r.right, br.right);
                r.bottom = Math.max(r.bottom, br.bottom);
            }
        }
        if (!r) {
            if (store && store.last) return store.last;
            return {
                cx: window.innerWidth / 2,
                cy: window.innerHeight / 2,
                width: 7,
                height: 22
            };
        }
        var w = r.right - r.left;
        var h = r.bottom - r.top;
        var out = {
            left: r.left,
            top: r.top,
            width: w,
            height: h,
            cx: (r.left + r.right) / 2,
            cy: (r.top + r.bottom) / 2
        };
        if (store) store.last = out;
        return out;
    }
    function init() {
        var bodyIntro = qs(SELECTORS.bodyIntro);
        var h2 = qs(SELECTORS.valueProp, bodyIntro || document);
        if (!bodyIntro || !h2) return;
        injectBodyIntroLayoutStyles();
        if (h2.dataset.valuePropInit === "1") return;
        h2.dataset.valuePropInit = "1";
        ensureStage(h2);
        if (REDUCED_MOTION) {
            gsap.set(h2, {
                autoAlpha: 1,
                color: "#ffffff"
            });
            gsap.set(bodyIntro, {
                backgroundColor: "#0f33ff"
            });
            gsap.set(document.documentElement, {
                backgroundColor: "#0f33ff"
            });
            gsap.set(document.body, {
                backgroundColor: "#0f33ff"
            });
            var rmDot = document.createElement("div");
            rmDot.className = "value-prop-morph-dot value-prop-morph-dot--viewport value-prop-morph-dot--reduced-motion";
            rmDot.setAttribute("aria-hidden", "true");
            document.body.appendChild(rmDot);
            gsap.set(rmDot, {
                position: "fixed",
                left: "50vw",
                top: "50vh",
                xPercent: -50,
                yPercent: -50,
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                borderStyle: "solid",
                borderColor: "#4a69f8",
                borderWidth: 5,
                autoAlpha: 1,
                pointerEvents: "none"
            });
            return;
        }
        /**
     * Webflow (and some heading styles) use white-space: nowrap, which makes SplitText
     * see a single visual line. Force normal wrapping for measurement, then run split
     * on the next frames so max-width (e.g. 66% inner) is in effect.
     */ h2.style.setProperty("white-space", "normal", "important");
        h2.style.setProperty("width", "100%", "important");
        h2.style.setProperty("min-width", "0", "important");
        h2.style.setProperty("align-self", "stretch", "important");
        var stageShell = h2.parentElement;
        if (stageShell && stageShell.classList && stageShell.classList.contains("body-intro__stage")) {
            stageShell.style.setProperty("width", "100%", "important");
            stageShell.style.setProperty("min-width", "0", "important");
            stageShell.style.setProperty("max-width", "100%", "important");
            stageShell.style.setProperty("align-self", "stretch", "important");
        }
        var innerForChain = bodyIntro ? qs(".body-intro__inner", bodyIntro) : null;
        if (innerForChain) innerForChain.style.setProperty("min-width", "0", "important");
        /**
     * SplitText lines are fixed at split time. Per GSAP docs: use autoSplit + onSplit
     * so a reflow (fonts, Webflow layout, or width change) re-splits; return timelines
     * from onSplit so GSAP can revert/sync on re-split.
     */ function onSplitValueProp(split) {
            logValuePropDebug("onSplit (lines after SplitText)", gatherValuePropLayoutForDebug(h2, bodyIntro, split));
            if (isValuePropDebug() && split.lines && split.lines.length === 1) console.warn("[epic value-prop] SplitText reports 1 line. For long copy, the heading\u2019s used width is usually the whole paragraph width (no wrap). Check h2/stage/inner box widths in the pre-SplitText log, and Webflow for nowrap / narrow flex parent.");
            var contentLines = markEmptyLinesAndGetContent(split);
            var chars = split.chars;
            var cursors = injectCursors(contentLines);
            var charsByLine = groupCharsByLine(contentLines, chars);
            var stage = qs(SELECTORS.stage, bodyIntro) || bodyIntro;
            var morphDot = stage.querySelector(".value-prop-morph-dot");
            if (!morphDot) {
                morphDot = document.createElement("div");
                morphDot.className = "value-prop-morph-dot";
                morphDot.setAttribute("aria-hidden", "true");
                stage.appendChild(morphDot);
            }
            try {
                window.__epicMorphDot = morphDot;
            } catch (e) {}
            gsap.set(morphDot, {
                autoAlpha: 0,
                pointerEvents: "none"
            });
            prepCharWidths(contentLines, chars);
            gsap.set(h2, {
                autoAlpha: 0
            });
            gsap.set(cursors, {
                scaleX: 0,
                autoAlpha: 0,
                transformOrigin: "left center"
            });
            var cachedDx = [];
            var unionStore = {
                last: null
            };
            function refreshCursorDx() {
                cachedDx = cacheCursorCenterX(cursors);
                readUnionRect(cursors, unionStore);
            }
            /** Fade: start top 80% → end top top */ var fadeTl = gsap.timeline({
                scrollTrigger: {
                    trigger: bodyIntro,
                    start: "top 80%",
                    end: "top top",
                    scrub: 0.5
                }
            }).to(h2, {
                autoAlpha: 1,
                ease: "none"
            });
            /** Pinned scrub sequence (onUpdate wired after merge; holder avoids forward-ref). */ var pinBlueWashScroll = {
                onUpdate: null
            };
            /** True only after forward blue-wash commits. Must exist before `pinTl` onUpdate references it. */ var blueFieldCommitted = false;
            var pinTl = gsap.timeline({
                defaults: {
                    ease: "none"
                },
                scrollTrigger: {
                    id: "epic-body-intro-pin",
                    trigger: bodyIntro,
                    start: "top top",
                    end: function() {
                        return "+=" + Math.round(window.innerHeight * (0, _epicConstantsJs.EPIC_INTRO_PIN_SCROLL_VH));
                    },
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.55,
                    anticipatePin: 0,
                    invalidateOnRefresh: true,
                    onEnter: refreshCursorDx,
                    onEnterBack: refreshCursorDx,
                    onRefresh: function(self) {
                        if (self.progress > 0.001) refreshCursorDx();
                    },
                    onUpdate: function(self) {
                        if (typeof pinBlueWashScroll.onUpdate === "function") pinBlueWashScroll.onUpdate(self);
                    }
                }
            });
            refreshCursorDx();
            pinTl.addLabel("cursorsIn", 0);
            pinTl.to(cursors, {
                autoAlpha: 1,
                scaleX: 1,
                duration: 0.14,
                stagger: 0.05,
                ease: "power2.out"
            }, "cursorsIn");
            pinTl.addLabel("charsOut", ">");
            /** Near-instant per char so scrub reads as delete (not a sliding clip). Cursor follows via layout only. */ var innerDur = 0.001;
            var staggerEach = 0.012;
            var charBlockEnd = 0;
            for(var li = 0; li < charsByLine.length; li++){
                var row = charsByLine[li].slice();
                row.reverse();
                if (!row.length) continue;
                var rowSpan = innerDur + staggerEach * Math.max(0, row.length - 1);
                charBlockEnd = Math.max(charBlockEnd, rowSpan);
                pinTl.to(row, {
                    width: 0,
                    autoAlpha: 0,
                    duration: innerDur,
                    stagger: {
                        each: staggerEach
                    },
                    ease: "none"
                }, "charsOut");
            }
            var movePos = "charsOut+=" + charBlockEnd;
            pinTl.call(refreshCursorDx, null, movePos);
            pinTl.to(cursors, {
                duration: 0.22,
                x: function(i) {
                    return cachedDx[i] || 0;
                },
                ease: "power2.inOut"
            }, movePos);
            pinTl.addLabel("collapseMeet", ">");
            var meetMidY = function() {
                return window.innerHeight * 0.5;
            };
            pinTl.to(contentLines, {
                duration: 0.26,
                ease: "power2.inOut",
                y: function(i) {
                    return computeMeetLineYs(contentLines, cursors, meetMidY())[i] || 0;
                }
            }, "collapseMeet");
            pinTl.addLabel("mergeCircle", ">");
            pinTl.set(morphDot, {
                autoAlpha: 0,
                clearProps: "left,top,width,height,borderRadius,transform,xPercent,yPercent,backgroundColor"
            }, "<mergeCircle");
            pinTl.call(refreshCursorDx, null, "mergeCircle");
            var mergeUnion = {
                autoAlpha: 0,
                immediateRender: false,
                position: "fixed",
                left: function() {
                    return readUnionRect(cursors, unionStore).cx;
                },
                top: function() {
                    return readUnionRect(cursors, unionStore).cy;
                },
                xPercent: -50,
                yPercent: -50,
                width: function() {
                    return readUnionRect(cursors, unionStore).width;
                },
                height: function() {
                    return readUnionRect(cursors, unionStore).height;
                },
                borderRadius: 0,
                backgroundColor: "#0f33ff",
                borderWidth: 0,
                borderColor: "transparent",
                borderStyle: "solid"
            };
            var mergeTL = gsap.timeline();
            mergeTL.fromTo(morphDot, mergeUnion, {
                autoAlpha: 1,
                duration: 0.04,
                ease: "none"
            }, 0);
            mergeTL.to(cursors, {
                autoAlpha: 0,
                duration: 0.03,
                ease: "none"
            }, 0.01);
            mergeTL.fromTo(morphDot, {
                autoAlpha: 1,
                position: "fixed",
                left: function() {
                    return readUnionRect(cursors, unionStore).cx;
                },
                top: function() {
                    return readUnionRect(cursors, unionStore).cy;
                },
                xPercent: -50,
                yPercent: -50,
                width: function() {
                    return readUnionRect(cursors, unionStore).width;
                },
                height: function() {
                    return readUnionRect(cursors, unionStore).height;
                },
                borderRadius: 0,
                backgroundColor: "#0f33ff",
                borderWidth: 0,
                borderColor: "transparent",
                borderStyle: "solid"
            }, {
                autoAlpha: 1,
                left: "50vw",
                top: "50vh",
                xPercent: -50,
                yPercent: -50,
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                borderStyle: "solid",
                borderColor: "#4a69f8",
                borderWidth: 5,
                duration: 0.22,
                ease: "power2.inOut"
            }, 0.04);
            pinTl.add(mergeTL, "mergeCircle");
            /** After merge: lengthens pinTl  lowers mergeCompleteProgress (runtime ~0.83  target ~0.74–0.78) so blue+handoff aren’t the last 17% of intro scroll. */ pinTl.to({}, {
                duration: 0.5,
                ease: "none"
            }, ">");
            function mergeCompleteProgress() {
                var tMerge = pinTl.labels.mergeCircle + mergeTL.duration();
                var d = pinTl.duration();
                return d > 0 ? Math.min(1, tMerge / d) : 1;
            }
            function reparentMorphDotToBody() {
                if (!morphDot.parentNode || morphDot.parentNode === document.body) return;
                document.body.appendChild(morphDot);
                morphDot.classList.add("value-prop-morph-dot--viewport");
                try {
                    window.__epicMorphDot = morphDot;
                } catch (e) {}
            }
            function restoreMorphDotToStage() {
                if (morphDot.parentNode !== document.body) return;
                morphDot.classList.remove("value-prop-morph-dot--viewport");
                stage.appendChild(morphDot);
            }
            var blueWashReverseInProgress = false;
            var blueWashActiveTl = null;
            var blueBurstEl = null;
            var lastPinProgress = -1;
            function removeBlueBurst() {
                if (blueBurstEl && blueBurstEl.parentNode) blueBurstEl.parentNode.removeChild(blueBurstEl);
                blueBurstEl = null;
            }
            function playBlueWashOneShot() {
                if (blueWashActiveTl) {
                    blueWashActiveTl.kill();
                    blueWashActiveTl = null;
                }
                blueWashReverseInProgress = false;
                removeBlueBurst();
                var burst = document.createElement("div");
                burst.className = "epic-blue-burst";
                burst.setAttribute("aria-hidden", "true");
                document.body.appendChild(burst);
                blueBurstEl = burst;
                reparentMorphDotToBody();
                gsap.set(burst, {
                    left: "50%",
                    top: "50%",
                    xPercent: -50,
                    yPercent: -50,
                    width: "260vmax",
                    height: "260vmax",
                    scale: 0,
                    transformOrigin: "50% 50%",
                    force3D: true
                });
                blueWashActiveTl = gsap.timeline({
                    defaults: {
                        ease: "power2.out",
                        overwrite: "auto"
                    }
                });
                /**
         * Morph above .epic-blue-burst (layout CSS). Do not set html/body/intro blue until
         * commitBlueField — same color as the burst made the radial expand invisible on scroll down.
         */ blueWashActiveTl.set(morphDot, {
                    backgroundColor: "#ffffff",
                    borderStyle: "solid",
                    borderColor: "#4a69f8",
                    borderWidth: 5,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    autoAlpha: 1,
                    zIndex: 30
                }, 0);
                blueWashActiveTl.to(burst, {
                    scale: 1,
                    duration: 0.88,
                    ease: "power2.out"
                });
                blueWashActiveTl.add(function commitBlueField() {
                    try {
                        gsap.set(morphDot, {
                            backgroundColor: "#ffffff",
                            borderStyle: "solid",
                            borderColor: "#4a69f8",
                            borderWidth: 5,
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            autoAlpha: 1,
                            zIndex: 30
                        });
                    } catch (e0) {}
                    try {
                        gsap.set([
                            bodyIntro,
                            document.documentElement,
                            document.body
                        ], {
                            backgroundColor: "#0f33ff"
                        });
                    } catch (e1) {}
                    removeBlueBurst();
                    blueFieldCommitted = true;
                    try {
                        if (typeof window !== "undefined") window.__epicMorphCommitDone = true;
                    } catch (e3) {
                    /* */ }
                    requestAnimationFrame(function() {
                        // #region agent log
                        fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "X-Debug-Session-Id": "efd621"
                            },
                            body: JSON.stringify({
                                sessionId: "efd621",
                                hypothesisId: "H1",
                                runId: "pre-fix",
                                location: "body-intro:commitBlueField:rAF",
                                message: "calling_install",
                                data: {
                                    blueFieldCommitted: true,
                                    scrollY: window.pageYOffset,
                                    hasStory: !!document.getElementById("story")
                                },
                                timestamp: Date.now()
                            })
                        }).catch(function() {});
                        // #endregion
                        try {
                            (0, _epicServiceCardsHandoffJs.installScrubbedServiceCardsBurst)({
                                gsap: gsap,
                                ScrollTrigger: ScrollTrigger,
                                morphEl: morphDot,
                                scrubPx: (0, _epicConstantsJs.EPIC_STORY_CARDS_SCRUB_PX)
                            });
                        } catch (e2) {
                        /* */ }
                        requestAnimationFrame(function() {
                            try {
                                ScrollTrigger.refresh();
                            } catch (e4) {
                            /* */ }
                        });
                    });
                });
            }
            function playBlueWashReverse() {
                if (blueWashActiveTl) {
                    blueWashActiveTl.kill();
                    blueWashActiveTl = null;
                }
                removeBlueBurst();
                blueWashReverseInProgress = true;
                function startBlueIrisAndMorph() {
                    try {
                        (0, _epicServiceCardsHandoffJs.killScrubbedServiceCardsBurst)(ScrollTrigger);
                    } catch (eKill) {
                    /* */ }
                    gsap.set([
                        bodyIntro,
                        document.documentElement,
                        document.body
                    ], {
                        backgroundColor: "#fbfbfb"
                    });
                    var burst = document.createElement("div");
                    burst.className = "epic-blue-burst";
                    burst.setAttribute("aria-hidden", "true");
                    document.body.appendChild(burst);
                    blueBurstEl = burst;
                    reparentMorphDotToBody();
                    gsap.set(burst, {
                        left: "50%",
                        top: "50%",
                        xPercent: -50,
                        yPercent: -50,
                        width: "260vmax",
                        height: "260vmax",
                        scale: 1,
                        transformOrigin: "50% 50%",
                        force3D: true
                    });
                    blueWashActiveTl = gsap.timeline({
                        defaults: {
                            overwrite: "auto"
                        }
                    });
                    blueWashActiveTl.to(burst, {
                        scale: 0,
                        duration: 0.88,
                        ease: "power2.in"
                    });
                    blueWashActiveTl.to(morphDot, {
                        backgroundColor: "#0f33ff",
                        borderWidth: 0,
                        borderColor: "transparent",
                        duration: 0.28,
                        ease: "power2.in"
                    }, "-=0.28");
                    blueWashActiveTl.add(function finishBlueWashReverse() {
                        removeBlueBurst();
                        gsap.set(morphDot, {
                            backgroundColor: "#0f33ff",
                            borderWidth: 0,
                            borderColor: "transparent"
                        });
                        restoreMorphDotToStage();
                        blueFieldCommitted = false;
                        blueWashReverseInProgress = false;
                        blueWashActiveTl = null;
                    });
                }
                startBlueIrisAndMorph();
            }
            function resetBlueWashVisuals() {
                if (blueWashActiveTl) {
                    blueWashActiveTl.kill();
                    blueWashActiveTl = null;
                }
                try {
                    (0, _epicServiceCardsHandoffJs.killScrubbedServiceCardsBurst)(ScrollTrigger);
                } catch (eK) {
                /* */ }
                blueWashReverseInProgress = false;
                removeBlueBurst();
                gsap.set([
                    bodyIntro,
                    document.documentElement,
                    document.body
                ], {
                    backgroundColor: "#fbfbfb"
                });
                gsap.set(morphDot, {
                    backgroundColor: "#0f33ff",
                    borderWidth: 0,
                    borderColor: "transparent"
                });
                restoreMorphDotToStage();
                blueFieldCommitted = false;
            }
            pinBlueWashScroll.onUpdate = function(self) {
                var mcp = mergeCompleteProgress();
                var p = self.progress;
                var last = lastPinProgress;
                if (last < 0) {
                    if (p > mcp && (!blueFieldCommitted || blueWashReverseInProgress)) playBlueWashOneShot();
                    lastPinProgress = p;
                    return;
                }
                if (last <= mcp && p > mcp && (!blueFieldCommitted || blueWashReverseInProgress)) playBlueWashOneShot();
                else if (blueFieldCommitted && !blueWashReverseInProgress && last > mcp && p <= mcp) playBlueWashReverse();
                else if (!blueFieldCommitted && last > mcp && p <= mcp) resetBlueWashVisuals();
                lastPinProgress = p;
            };
            if (!valuePropResizePatched) {
                valuePropResizePatched = true;
                window.addEventListener("resize", function() {
                    ScrollTrigger.refresh();
                }, {
                    passive: true
                });
            }
            requestAnimationFrame(function() {
                ScrollTrigger.refresh();
            });
            return gsap.timeline().add(fadeTl, 0).add(pinTl, 0);
        }
        function startValuePropSplit() {
            (function ensureMeasureWidth() {
                if (h2.getBoundingClientRect().width >= 2) return;
                if (!bodyIntro) return;
                var inner = qs(".body-intro__inner", bodyIntro);
                var base = inner ? inner.getBoundingClientRect().width : bodyIntro.getBoundingClientRect().width;
                if (base > 0) h2.style.setProperty("width", Math.floor(base) + "px", "important");
            })();
            logValuePropDebug("pre-SplitText (h2 still plain text)", gatherValuePropLayoutForDebug(h2, bodyIntro, null));
            var stOpts = {
                type: "lines,words,chars",
                autoSplit: true,
                onSplit: onSplitValueProp,
                linesClass: "value-prop-line",
                wordsClass: "value-prop-word",
                charsClass: "value-prop-char",
                reduceWhiteSpace: false
            };
            if (typeof SplitText.create === "function") SplitText.create(h2, stOpts);
            else new SplitText(h2, stOpts);
        }
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                if (!h2.isConnected) {
                    h2.removeAttribute("data-value-prop-init");
                    return;
                }
                startValuePropSplit();
            });
        });
    }
    if (document.readyState === "complete" || document.readyState === "interactive") {
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(init).catch(init);
        else init();
    } else document.addEventListener("DOMContentLoaded", function() {
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(init).catch(init);
        else init();
    });
}

},{"./epic-constants.js":"4gmgO","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./epic-service-cards-handoff.js":"33DhV"}],"4gmgO":[function(require,module,exports,__globalThis) {
/**
 * Body intro: pinned section scroll length as a fraction of viewport height (`end: +=` on the intro pin).
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "EPIC_INTRO_PIN_SCROLL_VH", ()=>EPIC_INTRO_PIN_SCROLL_VH);
parcelHelpers.export(exports, "EPIC_STORY_CARDS_SCRUB_PX", ()=>EPIC_STORY_CARDS_SCRUB_PX);
var EPIC_INTRO_PIN_SCROLL_VH = 0.56;
var EPIC_STORY_CARDS_SCRUB_PX = 1600;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"33DhV":[function(require,module,exports,__globalThis) {
/**
 * Scrubbed Flip: morph dot (x ≈ screen center) → 6 .service-card elements in their Webflow layout,
 * scroll-scrubbed on #story. Cluster uses **x only** (y transform always 0) so motion reads as a
 * horizontal spread, not a large vertical shove (stacking y=circCy + y=0 would make every card
 * “jump” vertically to the dot). For “row vertically centered in the view”, pin #story and design
 * that section to center its content (e.g. min-h + flex) — the script does not re-layout the page.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * @param {object} opts
 * @param {object} [opts.gsap]
 * @param {object} [opts.ScrollTrigger]
 * @param {HTMLElement} opts.morphEl
 * @param {number} [opts.scrubPx]
 * @param {string} [opts.storyId]
 */ parcelHelpers.export(exports, "installScrubbedServiceCardsBurst", ()=>installScrubbedServiceCardsBurst);
/**
 * Reveal card inner copy (not in scrub timeline) once burst has mostly played — tied to rAF;
 * for a crisper look you can add these tweens to the same timeline once stable.
 */ parcelHelpers.export(exports, "killScrubbedServiceCardsBurst", ()=>killScrubbedServiceCardsBurst);
var _epicConstantsJs = require("./epic-constants.js");
var BURST_DUR = 0.75;
var ST_ID = "epic-service-cards-burst";
var _installed = false;
var _stackLiftEl = null;
function getCards() {
    return typeof window !== "undefined" && window.gsap ? window.gsap.utils.toArray("#story .service-card") : [];
}
function resetCardsDom() {
    var g = window.gsap;
    if (!g) return;
    var cards = getCards();
    if (cards.length) {
        g.set(cards, {
            x: 0,
            y: 0,
            clearProps: "transform"
        });
        g.set(cards, {
            opacity: 0,
            pointerEvents: "none"
        });
    }
    var inner = document.querySelectorAll("#story .service-card > *");
    if (inner && inner.length) g.set(inner, {
        opacity: 0
    });
}
function killById(ScrollTrigger) {
    if (!ScrollTrigger) return;
    var st = ScrollTrigger.getById && ScrollTrigger.getById(ST_ID);
    if (st) st.kill(true);
}
function installScrubbedServiceCardsBurst(opts) {
    "use strict";
    var gsap = opts && opts.gsap || typeof window !== "undefined" && window.gsap;
    var ScrollTrigger = opts && opts.ScrollTrigger || typeof window !== "undefined" && window.ScrollTrigger;
    var Flip = typeof window !== "undefined" && window.Flip;
    var morphEl = opts && opts.morphEl;
    var scrubPx = opts && opts.scrubPx || (0, _epicConstantsJs.EPIC_STORY_CARDS_SCRUB_PX);
    var storyId = opts && opts.storyId || "story";
    if (!gsap || !ScrollTrigger || !Flip) {
        // #region agent log
        fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Debug-Session-Id": "efd621"
            },
            body: JSON.stringify({
                sessionId: "efd621",
                hypothesisId: "H1",
                runId: "pre-fix",
                location: "epic-service-cards-handoff:install:early",
                message: "install_skip",
                data: {
                    reason: "plugins",
                    hasGsap: !!gsap,
                    hasST: !!ScrollTrigger,
                    hasFlip: !!Flip
                },
                timestamp: Date.now()
            })
        }).catch(function() {});
        // #endregion
        return;
    }
    if (!morphEl || !morphEl.getBoundingClientRect) {
        // #region agent log
        fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Debug-Session-Id": "efd621"
            },
            body: JSON.stringify({
                sessionId: "efd621",
                hypothesisId: "H1",
                runId: "pre-fix",
                location: "epic-service-cards-handoff:install:early",
                message: "install_skip",
                data: {
                    reason: "no_morph"
                },
                timestamp: Date.now()
            })
        }).catch(function() {});
        // #endregion
        return;
    }
    if (_installed) {
        // #region agent log
        fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Debug-Session-Id": "efd621"
            },
            body: JSON.stringify({
                sessionId: "efd621",
                hypothesisId: "H2",
                runId: "pre-fix",
                location: "epic-service-cards-handoff:install:early",
                message: "install_skip",
                data: {
                    reason: "already_installed"
                },
                timestamp: Date.now()
            })
        }).catch(function() {});
        // #endregion
        return;
    }
    var storyEl = document.getElementById(storyId);
    if (!storyEl) {
        // #region agent log
        fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Debug-Session-Id": "efd621"
            },
            body: JSON.stringify({
                sessionId: "efd621",
                hypothesisId: "H1",
                runId: "pre-fix",
                location: "epic-service-cards-handoff:install:early",
                message: "install_skip",
                data: {
                    reason: "no_story",
                    storyId: storyId
                },
                timestamp: Date.now()
            })
        }).catch(function() {});
        // #endregion
        return;
    }
    gsap.registerPlugin(ScrollTrigger, Flip);
    resetCardsDom();
    var cards = getCards();
    if (cards.length === 0) {
        // #region agent log
        fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Debug-Session-Id": "efd621"
            },
            body: JSON.stringify({
                sessionId: "efd621",
                hypothesisId: "H1",
                runId: "pre-fix",
                location: "epic-service-cards-handoff:install:early",
                message: "install_skip",
                data: {
                    reason: "no_cards"
                },
                timestamp: Date.now()
            })
        }).catch(function() {});
        // #endregion
        return;
    }
    _stackLiftEl = null;
    try {
        document.body.classList.add("epic-burst-below-morph");
        if (storyEl.parentNode && storyEl.parentNode !== document.body) {
            _stackLiftEl = storyEl.parentNode;
            gsap.set(_stackLiftEl, {
                position: "relative",
                zIndex: 35,
                force3D: false
            });
        }
    } catch (eStack) {
    /* */ }
    try {
        storyEl && storyEl.offsetHeight;
    } catch (e0) {
    /* */ }
    var circleRect = morphEl.getBoundingClientRect();
    var circCx = circleRect.left + circleRect.width * 0.5;
    // circCy intentionally unused for cluster: pairing y= circCy - cardCy made Flip tween mostly
    // vertical (dot is viewport-centered; cards are often much lower in #story). Horizontal-only: y:0.
    for(var i = 0; i < cards.length; i++){
        var el = cards[i];
        var br = el.getBoundingClientRect();
        var cardCx = br.left + br.width * 0.5;
        var dx = circCx - cardCx;
        gsap.set(el, {
            x: dx,
            y: 0,
            opacity: 1,
            pointerEvents: "auto"
        });
    }
    var state = Flip.getState(cards);
    gsap.set(cards, {
        x: 0,
        y: 0,
        clearProps: "transform"
    });
    var flipTl = Flip.from(state, {
        duration: BURST_DUR,
        ease: "none",
        stagger: 0.06,
        absolute: true,
        scale: true
    });
    var handoffMainTl = gsap.timeline({
        paused: true,
        defaults: {
            ease: "none"
        }
    });
    handoffMainTl.add(flipTl, 0);
    handoffMainTl.add(gsap.to("#" + storyId + " .service-card > *", {
        opacity: 1,
        duration: 0.28,
        stagger: 0.04,
        ease: "none"
    }), 0.45);
    handoffMainTl.to(morphEl, {
        autoAlpha: 0,
        scale: 0,
        duration: 0.2,
        ease: "none"
    }, 0.72);
    handoffMainTl.pause(0);
    var endAdd = Math.min(scrubPx, 1600);
    if (endAdd < 1) endAdd = 1;
    /**
   * "top bottom" in scroll Y = #story's top at viewport bottom. If commit fires after the user
   * has already passed that, progress would be >0 (logs showed ~0.26) and the dot → cluster is skipped.
   * `start: max(natural, scrollY)` (absolute pixels) so t=0 is at the later of: story entering, or "now" at install.
   */ var vh = window.innerHeight;
    var scrollY0 = (typeof window.pageYOffset === "number" ? window.pageYOffset : 0) || 0;
    var sr0 = storyEl.getBoundingClientRect();
    var storyTopDoc0 = sr0.top + scrollY0;
    var naturalStartY = storyTopDoc0 - vh;
    var startScrollY = Math.max(naturalStartY, scrollY0);
    if (startScrollY < 0) startScrollY = 0;
    var st = ScrollTrigger.create({
        id: ST_ID,
        trigger: storyEl,
        start: startScrollY,
        end: "+=" + endAdd,
        pin: true,
        pinSpacing: true,
        scrub: 0.55,
        animation: handoffMainTl,
        anticipatePin: 0,
        invalidateOnRefresh: true
    });
    // #region agent log
    fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Debug-Session-Id": "efd621"
        },
        body: JSON.stringify({
            sessionId: "efd621",
            hypothesisId: "H3",
            runId: "post-fix",
            location: "epic-service-cards-handoff:install:ok",
            message: "flip_st_created",
            data: {
                nCards: cards.length,
                endAdd: endAdd,
                naturalStartY: naturalStartY,
                startScrollY: startScrollY,
                scrollY0: scrollY0
            },
            timestamp: Date.now()
        })
    }).catch(function() {});
    // #endregion
    _installed = true;
    try {
        if (typeof window !== "undefined") {
            window.__epicServiceCardsStInstalled = true;
            window.__epicBurstStartScrollY = startScrollY;
        }
    } catch (e0) {
    /* */ }
    requestAnimationFrame(function() {
        if (typeof console !== "undefined" && console.info) {
            var st2 = ScrollTrigger.getById && ScrollTrigger.getById(ST_ID);
            console.info("[epic] service cards Flip + ScrollTrigger OK", {
                stProgress: st2 ? st2.progress : "\u2014",
                scroll: window.pageYOffset
            });
        }
        // #region agent log
        (function() {
            var st3 = ScrollTrigger.getById && ScrollTrigger.getById(ST_ID);
            var sy = typeof window.pageYOffset === "number" ? window.pageYOffset : 0;
            fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Debug-Session-Id": "efd621"
                },
                body: JSON.stringify({
                    sessionId: "efd621",
                    hypothesisId: "H3",
                    runId: "post-fix",
                    location: "epic-service-cards-handoff:install:afterRefresh",
                    message: "st_state",
                    data: {
                        progress: st3 ? st3.progress : null,
                        start: st3 && st3.start,
                        end: st3 && st3.end,
                        scrollY: sy,
                        nCards: cards.length,
                        expectT0: st3 && sy != null && st3.start != null && Math.abs(sy - st3.start) < 2
                    },
                    timestamp: Date.now()
                })
            }).catch(function() {});
        })();
        // #endregion
        try {
            ScrollTrigger.refresh();
        } catch (e1) {
        /* */ }
    });
}
function killScrubbedServiceCardsBurst(ScrollTrigger) {
    "use strict";
    killById(ScrollTrigger || typeof window !== "undefined" && window.ScrollTrigger);
    resetCardsDom();
    _installed = false;
    var g2 = typeof window !== "undefined" && window.gsap;
    try {
        document.body.classList.remove("epic-burst-below-morph");
    } catch (eBr) {
    /* */ }
    try {
        if (g2 && _stackLiftEl) g2.set(_stackLiftEl, {
            clearProps: "zIndex,position"
        });
    } catch (eLift) {
    /* */ }
    _stackLiftEl = null;
    try {
        if (typeof window !== "undefined") {
            window.__epicServiceCardsStInstalled = false;
            try {
                delete window.__epicBurstStartScrollY;
            } catch (e0) {
            /* */ }
        }
    } catch (e) {
    /* */ }
}
if (typeof window !== "undefined") {
    window.__epicInstallScrubbedServiceCardsBurst = installScrubbedServiceCardsBurst;
    window.__epicKillScrubbedServiceCardsBurst = function __epicKillScrub() {
        killScrubbedServiceCardsBurst(window.ScrollTrigger);
    };
    window.__epicServiceCardsStInstalled = false;
}

},{"./epic-constants.js":"4gmgO","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["loiGR","gLLPy"], "gLLPy", "parcelRequirebd98", {})

//# sourceMappingURL=main.js.map
