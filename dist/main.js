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
 * EPIC — Webflow custom code entry. Build: `npm run build` → one file `dist/main.js` (esbuild; `npm run dev` = Parcel + HMR).
 * Load: ScrollTrigger + SplitText (3.x) before this script.
 */ var _epicDebugJs = require("./epic-debug.js");
var _bodyIntroJs = require("./body-intro.js");
var _storyAnimJs = require("./story-anim.js");
(0, _epicDebugJs.attachEpicDebugToWindow)();
if ((0, _epicDebugJs.isEpicStoryDebug)()) try {
    (0, _epicDebugJs.epicStoryLog)("main: bootstraps starting", {
        href: window.location && window.location.href,
        hasGsap: typeof window.gsap !== "undefined",
        hasST: typeof window.ScrollTrigger !== "undefined"
    });
} catch (e0) {}
(0, _bodyIntroJs.bootstrapEpicBodyIntro)();
(0, _storyAnimJs.bootstrapEpicStoryAnim)();
if ((0, _epicDebugJs.isEpicStoryDebug)()) try {
    (0, _epicDebugJs.epicStoryLog)("main: bootstraps completed", {});
} catch (e1) {}

},{"./epic-debug.js":"iXhWq","./body-intro.js":"awVjY","./story-anim.js":"kad2H"}],"iXhWq":[function(require,module,exports,__globalThis) {
/**
 * Gated console helpers for the EPIC handoff. Enable in staging with any of:
 * - URL: any query/hash containing "epicDebug" (e.g. ?epicDebug=1) — logs scrub (bucketed ~5%), lifecycle, and timeline setup
 * - localStorage: epicDebugStory=1
 * - window.__EPIC_DEBUG_STORY = true
 * - In DevTools, run: `__epicEnableStoryDebug()` (defined in attachEpicDebugToWindow) then reload
 * Verbose (extra, e.g. onRefresh, velocity in scrub): "epicDebugVerbose" in URL/hash or localStorage epicDebugStoryVerbose=1
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isEpicStoryDebug", ()=>isEpicStoryDebug);
parcelHelpers.export(exports, "isEpicStoryDebugVerbose", ()=>isEpicStoryDebugVerbose);
parcelHelpers.export(exports, "epicStoryLog", ()=>epicStoryLog);
/** Exposes a single console command so URL/query issues do not block debugging. */ parcelHelpers.export(exports, "attachEpicDebugToWindow", ()=>attachEpicDebugToWindow);
parcelHelpers.export(exports, "br", ()=>br);
function urlStringForDebug() {
    if (typeof window === "undefined" || !window.location) return "";
    try {
        return (window.location.search || "") + (window.location.hash || "");
    } catch (e) {
        return "";
    }
}
function queryLooksLikeEpicDebugOn() {
    if (/epicDebug/i.test(urlStringForDebug())) return true;
    try {
        if (window.location && /epicDebug/i.test(String(window.location.href || ""))) return true;
    } catch (e) {}
    return false;
}
function isEpicStoryDebug() {
    if (typeof window === "undefined") return false;
    if (window.__EPIC_DEBUG_STORY === true) return true;
    try {
        if (window.localStorage && window.localStorage.getItem("epicDebugStory") === "1") return true;
    } catch (e) {}
    if (queryLooksLikeEpicDebugOn()) return true;
    return false;
}
function isEpicStoryDebugVerbose() {
    if (typeof window === "undefined") return false;
    if (window.__EPIC_DEBUG_STORY_VERBOSE === true) return true;
    try {
        if (window.localStorage && window.localStorage.getItem("epicDebugStoryVerbose") === "1") return true;
    } catch (e) {}
    try {
        if (/epicDebugVerbose/i.test(urlStringForDebug())) return true;
    } catch (e) {}
    return false;
}
function epicStoryLog(phase, data) {
    if (!isEpicStoryDebug() || typeof window === "undefined" || !window.console) return;
    var t = typeof performance !== "undefined" && typeof performance.now === "function" ? Math.round(performance.now()) : 0;
    try {
        if (data !== void 0) console.log("[epic-story]", t + "ms", String(phase || ""), data);
        else console.log("[epic-story]", t + "ms", String(phase || ""));
    } catch (e) {}
}
function attachEpicDebugToWindow() {
    if (typeof window === "undefined") return;
    try {
        window.__epicEnableStoryDebug = function() {
            try {
                window.__EPIC_DEBUG_STORY = true;
                if (window.localStorage) {
                    localStorage.setItem("epicDebugStory", "1");
                    localStorage.setItem("epicDebugStoryVerbose", "1");
                }
            } catch (e) {}
            try {
                if (window.console) console.info("[epic] Story debug + verbose enabled \u2014 reloading");
            } catch (e2) {}
            window.location.reload();
        };
    } catch (e) {}
}
function br(el) {
    if (!el || !el.getBoundingClientRect) return null;
    try {
        var r = el.getBoundingClientRect();
        return {
            left: Math.round(r.left * 10) / 10,
            top: Math.round(r.top * 10) / 10,
            w: Math.round(r.width * 10) / 10,
            h: Math.round(r.height * 10) / 10
        };
    } catch (e) {
        return null;
    }
}

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

},{}],"awVjY":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bootstrapEpicBodyIntro", ()=>bootstrapEpicBodyIntro);
var _epicConstantsJs = require("./epic-constants.js");
var _epicDebugJs = require("./epic-debug.js");
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
        (function removeEpicIntroBufferIfAny() {
            var legacy = document.getElementById("epic-intro-to-story-buffer");
            if (legacy && legacy.parentNode) try {
                legacy.parentNode.removeChild(legacy);
            } catch (eR) {}
        })();
        if (h2.dataset.valuePropInit === "1") return;
        h2.dataset.valuePropInit = "1";
        ensureStage(h2);
        /* `prefers-reduced-motion`: if you change this path, also review the REDUCED_MOTION block in `story-anim.js`. */ if (REDUCED_MOTION) {
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
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "#ffffff",
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
            if ((0, _epicDebugJs.isEpicStoryDebug)()) try {
                (0, _epicDebugJs.epicStoryLog)("body-intro onSplit \u2192 morph in DOM, __epicMorphDot set", {
                    bcr: (0, _epicDebugJs.br)(morphDot)
                });
            } catch (eD0) {}
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
                backgroundColor: "#0f33ff"
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
                backgroundColor: "#0f33ff"
            }, {
                autoAlpha: 1,
                left: "50vw",
                top: "50vh",
                xPercent: -50,
                yPercent: -50,
                width: 14,
                height: 14,
                borderRadius: "50%",
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
            /** True only after forward blue-wash commits (solid blue); enables iris reverse on scroll-up. */ var blueFieldCommitted = false;
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
                var handoff = typeof window !== "undefined" && window.__epicStoryHandoffActive;
                if (handoff && blueFieldCommitted) return;
                if (handoff && !blueFieldCommitted) {
                    removeBlueBurst();
                    reparentMorphDotToBody();
                    try {
                        gsap.set(morphDot, {
                            autoAlpha: 1,
                            pointerEvents: "none",
                            backgroundColor: "#ffffff",
                            zIndex: 30
                        });
                    } catch (eDot) {}
                    try {
                        gsap.set([
                            bodyIntro,
                            document.documentElement,
                            document.body
                        ], {
                            backgroundColor: "#0f33ff"
                        });
                    } catch (eBg) {}
                    blueFieldCommitted = true;
                    return;
                }
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
         * z-index: morph above .epic-blue-burst (see layout CSS). White dot on frame 0, surfaces blue
         * immediately so there is no long “all blue, no visible circle” beat while the burst expands.
         */ blueWashActiveTl.set(morphDot, {
                    backgroundColor: "#ffffff",
                    autoAlpha: 1,
                    zIndex: 30
                }, 0);
                blueWashActiveTl.set([
                    bodyIntro,
                    document.documentElement,
                    document.body
                ], {
                    backgroundColor: "#0f33ff"
                }, 0.01);
                blueWashActiveTl.to(burst, {
                    scale: 1,
                    duration: 0.88,
                    ease: "power2.out"
                });
                blueWashActiveTl.add(function commitBlueField() {
                    try {
                        gsap.set(morphDot, {
                            backgroundColor: "#ffffff",
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
                });
            }
            function playBlueWashReverse() {
                if (typeof window !== "undefined" && window.__epicStoryHandoffActive) return;
                if (blueWashActiveTl) {
                    blueWashActiveTl.kill();
                    blueWashActiveTl = null;
                }
                removeBlueBurst();
                blueWashReverseInProgress = true;
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
                    duration: 0.28,
                    ease: "power2.in"
                }, "-=0.28");
                blueWashActiveTl.add(function finishBlueWashReverse() {
                    removeBlueBurst();
                    gsap.set(morphDot, {
                        backgroundColor: "#0f33ff"
                    });
                    restoreMorphDotToStage();
                    blueFieldCommitted = false;
                    blueWashReverseInProgress = false;
                    blueWashActiveTl = null;
                });
            }
            function resetBlueWashVisuals() {
                if (typeof window !== "undefined" && window.__epicStoryHandoffActive) return;
                if (blueWashActiveTl) {
                    blueWashActiveTl.kill();
                    blueWashActiveTl = null;
                }
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
                    backgroundColor: "#0f33ff"
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

},{"./epic-constants.js":"4gmgO","./epic-debug.js":"iXhWq","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4gmgO":[function(require,module,exports,__globalThis) {
/**
 * Tuned together: body intro pin length vs #story scrub (ScrollTrigger `end: +=` multipliers).
 * pinStart: when the story pin begins (e.g. "top 80%" = when the section top hits 80% from viewport top; earlier in the document scroll than "top top").
 * scrub: `true` = playhead locked to scroll. A number (e.g. 0.1) = smooth "catch up" in seconds, which
 *   can desync st.progress vs timeline.progress during scrub (see H2 in debug-9fb82f.log). Optional small
 *   number only if you prefer eased lag over perfect sync.
 * scrub vh: scroll distance (px) for the full 0–1 ST progress; higher = more pixels per same timeline.
 * To sit the static service card row “higher” in the section, nudge in Webflow (e.g. margin on `.service-cards`, section padding) — the script measures the live layout.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "EPIC_INTRO_PIN_SCROLL_VH", ()=>EPIC_INTRO_PIN_SCROLL_VH);
parcelHelpers.export(exports, "EPIC_STORY_PIN_START", ()=>EPIC_STORY_PIN_START);
parcelHelpers.export(exports, "EPIC_STORY_SCRUB_SMOOTH", ()=>EPIC_STORY_SCRUB_SMOOTH);
parcelHelpers.export(exports, "EPIC_STORY_SCRUB_SCROLL_VH", ()=>EPIC_STORY_SCRUB_SCROLL_VH);
parcelHelpers.export(exports, "EPIC_SERVICE_FADE_ST_START", ()=>EPIC_SERVICE_FADE_ST_START);
parcelHelpers.export(exports, "EPIC_SERVICE_FADE_ST_END", ()=>EPIC_SERVICE_FADE_ST_END);
parcelHelpers.export(exports, "EPIC_SERVICE_FADE_SCRUB", ()=>EPIC_SERVICE_FADE_SCRUB);
var EPIC_INTRO_PIN_SCROLL_VH = 0.72;
var EPIC_STORY_PIN_START = "top 80%";
var EPIC_STORY_SCRUB_SMOOTH = true;
var EPIC_STORY_SCRUB_SCROLL_VH = 2.1;
var EPIC_SERVICE_FADE_ST_START = "top bottom";
var EPIC_SERVICE_FADE_ST_END = "top 50%";
var EPIC_SERVICE_FADE_SCRUB = 0.2;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kad2H":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bootstrapEpicStoryAnim", ()=>bootstrapEpicStoryAnim);
var _epicConstantsJs = require("./epic-constants.js");
var _epicDebugJs = require("./epic-debug.js");
function bootstrapEpicStoryAnim() {
    "use strict";
    if (typeof window.gsap === "undefined" || !window.ScrollTrigger) {
        try {
            console.warn("[epic] GSAP or ScrollTrigger is missing; #story (EPIC) is skipped. Load order in Webflow / body: ScrollTrigger (plugin after GSAP) \u2192 SplitText \u2192 this `dist/main.js` bundle.");
        } catch (e) {}
        return;
    }
    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    /**
   * Webflow / other bundles call `ScrollTrigger.refresh()` globally; that recalculates every ST and
   * can yank `scrollY` backward right after the epic #story pin releases. Wrap once: after any global
   * refresh, if we were already past `epic-story-scrub`’s numeric `end` and `scrollY` dropped a lot,
   * restore the pre-refresh position (H15 when it fires).
   */ if (!window.__epicScrollTriggerRefreshIsolation) {
        window.__epicScrollTriggerRefreshIsolation = true;
        (function epicPatchGlobalScrollRefresh(ST) {
            var orig = ST.refresh.bind(ST);
            var _epicGlobalRefreshDepth = 0;
            ST.refresh = function() {
                _epicGlobalRefreshDepth += 1;
                try {
                    if (_epicGlobalRefreshDepth > 1) return orig.apply(ST, arguments);
                    var storySt = null;
                    var endPx = null;
                    var y0 = 0;
                    try {
                        y0 = typeof window !== "undefined" ? window.scrollY : 0;
                        storySt = ST.getById("epic-story-scrub");
                        if (storySt && typeof storySt.end === "number" && isFinite(storySt.end)) endPx = storySt.end;
                    } catch (ePre) {}
                    var wasPastStoryEnd = endPx != null && isFinite(y0) && y0 >= endPx - 2;
                    orig.apply(ST, arguments);
                    if (!wasPastStoryEnd) return;
                    try {
                        var y1 = typeof window !== "undefined" ? window.scrollY : 0;
                        if (y1 < y0 - 60) {
                            try {
                                window.scrollTo(0, y0);
                            } catch (eTo) {}
                            if ((0, _epicDebugJs.isEpicStoryDebug)()) // #region agent log
                            try {
                                fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "X-Debug-Session-Id": "9fb82f"
                                    },
                                    body: JSON.stringify({
                                        sessionId: "9fb82f",
                                        runId: "st-refresh-guard",
                                        hypothesisId: "H15",
                                        location: "story-anim.js:ScrollTrigger.refresh.wrap",
                                        message: "restored scrollY after global refresh pulled user back toward #story",
                                        data: {
                                            y0: Math.round(y0 * 10) / 10,
                                            y1: Math.round(y1 * 10) / 10,
                                            endPx: Math.round(endPx * 10) / 10
                                        },
                                        timestamp: Date.now()
                                    })
                                }).catch(function() {});
                            } catch (eH15) {}
                        }
                    } catch (ePost) {}
                } finally{
                    _epicGlobalRefreshDepth -= 1;
                }
            };
        })(ScrollTrigger);
    }
    if ((0, _epicDebugJs.isEpicStoryDebug)()) try {
        (0, _epicDebugJs.epicStoryLog)("debug enabled", {
            url: window.location && window.location.href,
            verbose: (0, _epicDebugJs.isEpicStoryDebugVerbose)(),
            help: "epicDebug=1 enables scrub (bucketed) + lifecycle; add epicDebugVerbose=1 for onRefresh. localStorage: epicDebugStory, epicDebugStoryVerbose"
        });
    } catch (e0) {}
    /* If you change this block, also review the REDUCED_MOTION path in `body-intro.js`. */ var REDUCED_MOTION = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var STORY_SEL = "#story";
    function q(sel, root) {
        return (root || document).querySelector(sel);
    }
    function getSortedServiceCards(story) {
        var nodelist = story.querySelectorAll("[data-epic-service-index]");
        var list = [].map.call(nodelist, function(el) {
            return {
                el: el,
                idx: parseInt(String(el.getAttribute("data-epic-service-index") || "0"), 10) || 0
            };
        });
        list.sort(function(a, b) {
            return a.idx - b.idx;
        });
        return list.map(function(x) {
            return x.el;
        });
    }
    /**
   * Webflow often puts `data-epic="service-fade-block"` or `.service-container` on a *header* strip, while
   * `[data-epic-service-index]` cards sit in a sibling (e.g. 0/6 in debug-9fb82f H10) — we then fade the
   * wrong node and the handoff never reads. Prefer the query only if it actually wraps all cards; else
   * the innermost common ancestor of the card nodes (bounded by #story).
   */ function resolveServiceFadeBlockForEpic(storyRoot, fromQuery, cardEls) {
        if (!cardEls || !cardEls.length) return fromQuery || null;
        var c0 = cardEls[0];
        if (!c0) return fromQuery || null;
        if (fromQuery) {
            var jq;
            var fromOk = true;
            for(jq = 0; jq < cardEls.length; jq += 1)try {
                if (!fromQuery.contains(cardEls[jq])) {
                    fromOk = false;
                    break;
                }
            } catch (eC) {
                fromOk = false;
                break;
            }
            if (fromOk) return fromQuery;
        }
        var a;
        for(a = c0.parentElement; a; a = a.parentElement){
            if (a === document.documentElement) break;
            if (storyRoot) try {
                if (!storyRoot.contains(a) && a !== storyRoot) break;
            } catch (eB) {
                break;
            }
            var j;
            var all = true;
            for(j = 0; j < cardEls.length; j += 1)try {
                if (!a.contains(cardEls[j])) {
                    all = false;
                    break;
                }
            } catch (eA) {
                all = false;
                break;
            }
            if (all) return a;
        }
        return fromQuery || null;
    }
    /** One element for recompute, GSAP, and class hooks — prefer window.__epicMorphDot (set in body-intro.js) once SplitText has created the dot. */ function getEpicHandoffMorphDot() {
        try {
            var w = window.__epicMorphDot;
            if (w && typeof w.isConnected === "boolean" && w.isConnected) return w;
        } catch (e) {}
        try {
            return document.querySelector(".value-prop-morph-dot");
        } catch (e2) {
            return null;
        }
    }
    function ensureStoryStyles() {
        var id = "epic-story-anim-styles";
        if (document.getElementById(id)) return;
        var s = document.createElement("style");
        s.id = id;
        s.textContent = [
            "/* Story pin: prevent transparent top band (same as body intro pin) when trigger translates. */",
            "div.pin-spacer[class*=\"epic-story-scrub\"],",
            "div[class*=\"pin-spacer-epic-story-scrub\"] {",
            "  background: #0f33ff !important;",
            "}",
            "section#story,",
            "#story.story {",
            "  background-color: #0f33ff !important;",
            "}",
            "[data-epic=\"story-pin\"] {",
            "  position: relative !important;",
            "  z-index: 0;",
            "  overflow: visible !important;",
            "}",
            "[data-epic=\"connector-root\"] {",
            "  position: absolute !important;",
            "  left: 0; top: 0; right: 0; bottom: 0;",
            "  width: 100%;",
            "  height: 100%;",
            "  pointer-events: none;",
            "  z-index: 1;",
            "  overflow: visible !important;",
            "}",
            "[data-epic=\"connector-root\"] svg {",
            "  position: absolute; left: 0; top: 0; width: 100%; height: 100%; overflow: visible !important;",
            "}",
            "[data-epic=\"story-pin\"] .service-statement {",
            "  position: relative; z-index: 5;",
            "}",
            "[data-epic=\"story-pin\"] .service-cards_container,",
            "[data-epic=\"story-pin\"] .service-cards {",
            "  position: relative; z-index: 3;",
            "  overflow: visible !important;",
            "}",
            "#story [data-epic=\"story-pin\"] .service-card_top-line,",
            "section#story[data-epic=\"story-pin\"] .service-card_top-line {",
            "  display: none !important;",
            "}",
            ".value-prop-morph-dot.epic-below-service-statement {",
            "  z-index: 2 !important;",
            "}",
            ".epic-service-node-proxy {",
            "  box-sizing: border-box;",
            "  position: absolute !important;",
            "  z-index: 20 !important;",
            "}",
            "#story [data-epic-service-index], [data-epic=\"story-pin\"] [data-epic-service-index] {",
            "  isolation: isolate;",
            "}"
        ].join("\n");
        document.head.appendChild(s);
    }
    function buildConnectorPathD(trunkX, yStart, yBus, minX, maxX, cardCenters, cardTops) {
        var n = cardCenters.length;
        if (n < 1) return "";
        var parts = [];
        parts.push("M", trunkX, yStart, "L", trunkX, yBus, "L", minX, yBus, "L", maxX, yBus);
        for(var j = 0; j < n; j++)parts.push("M", cardCenters[j], yBus, "L", cardCenters[j], cardTops[j]);
        return parts.join(" ");
    }
    function init() {
        var story = q(STORY_SEL);
        if (!story) {
            if ((0, _epicDebugJs.isEpicStoryDebug)()) (0, _epicDebugJs.epicStoryLog)("init", {
                story: "missing",
                sel: STORY_SEL
            });
            return;
        }
        if (story.getAttribute("data-epic-story-anim") === "1") return;
        story.setAttribute("data-epic-story-anim", "1");
        /** [data-epic="story-pin"] may be on the section#story; querySelector does not match the root element. */ var storyPin = null;
        if (story && typeof story.matches === "function" && story.matches("[data-epic=\"story-pin\"]")) storyPin = story;
        else storyPin = q("[data-epic=\"story-pin\"]", story);
        var connectorRoot = q("[data-epic=\"connector-root\"]", story);
        var aboutBlock = q("[data-epic=\"about-block\"]", story);
        var serviceStatement = q(".service-statement", storyPin) || q(".service-statement", story);
        /** Add `data-epic="service-fade-block"` in Webflow, or we fall back to `.service-container` for 0→1 on scroll. */ var serviceFadeBlock = q("[data-epic=\"service-fade-block\"]", storyPin) || q("[data-epic=\"service-fade-block\"]", story) || q(".service-container", storyPin) || q(".service-container", story) || null;
        if (!storyPin || !connectorRoot) {
            if ((0, _epicDebugJs.isEpicStoryDebug)()) (0, _epicDebugJs.epicStoryLog)("init abort", {
                storyPin: !!storyPin,
                connectorRoot: !!connectorRoot
            });
            return;
        }
        var cards = getSortedServiceCards(story);
        if (cards.length < 1) {
            if ((0, _epicDebugJs.isEpicStoryDebug)()) (0, _epicDebugJs.epicStoryLog)("init abort", {
                reason: "no [data-epic-service-index] cards"
            });
            return;
        }
        serviceFadeBlock = resolveServiceFadeBlockForEpic(story, serviceFadeBlock, cards);
        if ((0, _epicDebugJs.isEpicStoryDebug)()) try {
            (0, _epicDebugJs.epicStoryLog)("service fade target", {
                nCards: cards.length,
                wrapInFade: function() {
                    if (!serviceFadeBlock) return null;
                    var wx;
                    for(wx = 0; wx < cards.length; wx += 1){
                        if (!serviceFadeBlock.contains(cards[wx])) return false;
                    }
                    return true;
                }()
            });
        } catch (eR2) {}
        ensureStoryStyles();
        if (REDUCED_MOTION) {
            if ((0, _epicDebugJs.isEpicStoryDebug)()) (0, _epicDebugJs.epicStoryLog)("init reduced motion \u2014 story static", {
                nCards: cards ? cards.length : 0
            });
            var mRm = getEpicHandoffMorphDot();
            if (mRm) gsap.set(mRm, {
                autoAlpha: 0,
                pointerEvents: "none"
            });
            if (serviceFadeBlock) gsap.set(serviceFadeBlock, {
                autoAlpha: 1
            });
            else if (serviceStatement) gsap.set(serviceStatement, {
                autoAlpha: 1
            });
            if (serviceStatement) try {
                gsap.set(serviceStatement, {
                    autoAlpha: 1,
                    visibility: "visible"
                });
            } catch (eRms) {}
            gsap.set(cards, {
                autoAlpha: 1
            });
            if (aboutBlock) gsap.set(aboutBlock, {
                autoAlpha: 1
            });
            return;
        }
        if ((0, _epicDebugJs.isEpicStoryDebug)()) try {
            (0, _epicDebugJs.epicStoryLog)("init", {
                nCards: cards.length,
                storyPin: storyPin && storyPin.tagName,
                morphNow: (0, _epicDebugJs.br)(getEpicHandoffMorphDot())
            });
        } catch (eI0) {}
        var nCards = cards.length;
        var proxies = [];
        var pidx;
        for(pidx = 0; pidx < nCards; pidx++){
            var pd = document.createElement("div");
            pd.className = "epic-service-node-proxy";
            pd.setAttribute("aria-hidden", "true");
            storyPin.appendChild(pd);
            proxies.push(pd);
            gsap.set(pd, {
                position: "absolute",
                left: 0,
                top: 0,
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                zIndex: 4,
                autoAlpha: 0,
                boxShadow: "0 0 0 1px rgba(0,0,0,0.04)",
                pointerEvents: "none",
                force3D: true
            });
        }
        try {
            gsap.set(cards, {
                autoAlpha: 0,
                position: "relative"
            });
        } catch (eCs0) {
            try {
                gsap.set(cards, {
                    autoAlpha: 0
                });
            } catch (eCs1) {}
        }
        if (serviceFadeBlock) try {
            gsap.set(serviceFadeBlock, {
                autoAlpha: 0
            });
        } catch (eF0) {}
        else if (serviceStatement) gsap.set(serviceStatement, {
            autoAlpha: 0
        });
        if (serviceStatement && serviceFadeBlock) try {
            if (!serviceFadeBlock.contains(serviceStatement)) /** Webflow: cards live in a resolved LCA, statement is often a *sibling* (H10 stmtInFade: false) — otherwise copy stays on during 0..tNodeSplit and “pops” again with the row = double show. */ gsap.set(serviceStatement, {
                autoAlpha: 0,
                visibility: "hidden"
            });
        } catch (eSib) {}
        if (aboutBlock) gsap.set(aboutBlock, {
            autoAlpha: 0
        });
        var pathEl = null;
        var svgEl = null;
        var lastPathLen = 0;
        var cachedLayout = null;
        var _epicDegenPathRetries = 0;
        var _epicLayoutPass = 0;
        /**
     * BCR for viewport ↔ pin-local (proxies: absolute in storyPin). Never use a “full viewport at (0,0)”
     * for pr: the pin is often inset; that mis-anchors the fixed intro dot vs. left/top. If the pin
     * box is degenerate, fall back to #story, then keep pin (or story) position and expand a minimal span.
     */ function resolveStoryPinBox() {
            var pin0;
            try {
                pin0 = storyPin.getBoundingClientRect();
            } catch (e) {
                pin0 = {
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0,
                    right: 0,
                    bottom: 0,
                    x: 0,
                    y: 0
                };
            }
            if (pin0 && pin0.width >= 2 && pin0.height >= 2) return {
                rect: pin0,
                source: "storyPin"
            };
            var s0 = null;
            try {
                s0 = story.getBoundingClientRect();
            } catch (e) {
                s0 = null;
            }
            if (s0 && s0.width >= 2 && s0.height >= 2) return {
                rect: s0,
                source: "story"
            };
            var pl = pin0 && isFinite(pin0.left) ? pin0.left : s0 && isFinite(s0.left) ? s0.left : 0;
            var pt = pin0 && isFinite(pin0.top) ? pin0.top : s0 && isFinite(s0.top) ? s0.top : 0;
            var w = 0;
            if (pin0 && isFinite(pin0.width) && pin0.width > 0) w = pin0.width;
            else if (s0 && isFinite(s0.width) && s0.width > 0) w = s0.width;
            else w = 80;
            var h = 0;
            if (pin0 && isFinite(pin0.height) && pin0.height > 0) h = pin0.height;
            else if (s0 && isFinite(s0.height) && s0.height > 0) h = s0.height;
            else h = 80;
            w = Math.max(80, w);
            h = Math.max(80, h);
            var vwi = typeof window !== "undefined" && window.innerWidth || 1200;
            var vhi = typeof window !== "undefined" && window.innerHeight || 800;
            w = Math.min(w, Math.max(1, vwi - pl + 0.1));
            h = Math.min(h, Math.max(1, vhi - pt + 0.1));
            var r = {
                left: pl,
                top: pt,
                width: w,
                height: h,
                right: pl + w,
                bottom: pt + h,
                x: pl,
                y: pt
            };
            return {
                rect: r,
                source: "pinOrStoryExpanded"
            };
        }
        function measureAndCache() {
            _epicLayoutPass += 1;
            var rpb0 = resolveStoryPinBox();
            var pr = rpb0.rect;
            var out = {
                pin: pr,
                rects: [],
                borderRadii: []
            };
            var j;
            for(j = 0; j < nCards; j++){
                var r = cards[j].getBoundingClientRect();
                var cs = window.getComputedStyle(cards[j]);
                out.rects.push({
                    relL: r.left - pr.left,
                    relT: r.top - pr.top,
                    width: r.width,
                    height: r.height
                });
                out.borderRadii.push(cs.borderRadius || "12px");
                if (r.width < 1 || r.height < 1) {
                    if ((0, _epicDebugJs.isEpicStoryDebug)()) try {
                        (0, _epicDebugJs.epicStoryLog)("measure card tiny box \u2014 will retry", {
                            j: j,
                            w: r.width,
                            h: r.height,
                            pass: _epicLayoutPass,
                            pinBoxSource: rpb0 && rpb0.source
                        });
                    } catch (eM0) {}
                }
            }
            var mM = getEpicHandoffMorphDot();
            if (mM) try {
                var mr = mM.getBoundingClientRect();
                if (mr && mr.width > 1 && mr.height > 1) out.morphRel = {
                    l: mr.left - pr.left,
                    t: mr.top - pr.top,
                    w: mr.width,
                    h: mr.height
                };
            } catch (eMr) {}
            if (serviceStatement) {
                var sb = serviceStatement.getBoundingClientRect();
                out.stmtBottom = sb.bottom;
            } else out.stmtBottom = pr.top + pr.height * 0.2;
            cachedLayout = out;
            return out;
        }
        function buildPathFromLayout(layout) {
            if (!layout) return 0;
            var pr = layout.pin;
            var w = pr.width;
            var h = pr.height;
            if (w < 2) return 0;
            if (!pathEl) {
                svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
                svgEl.setAttribute("viewBox", "0 0 " + Math.max(1, Math.round(w)) + " " + Math.max(1, Math.round(h)));
                svgEl.setAttribute("preserveAspectRatio", "xMidYMin meet");
                pathEl.setAttribute("fill", "none");
                pathEl.setAttribute("stroke", "#fde021");
                pathEl.setAttribute("stroke-width", "4");
                pathEl.setAttribute("stroke-linecap", "round");
                pathEl.setAttribute("stroke-linejoin", "round");
                svgEl.appendChild(pathEl);
                connectorRoot.appendChild(svgEl);
            } else svgEl.setAttribute("viewBox", "0 0 " + Math.max(1, Math.round(w)) + " " + Math.max(1, Math.round(h)));
            var cxs = [];
            var ytops = [];
            var j;
            for(j = 0; j < nCards; j++){
                var rr = layout.rects[j];
                cxs.push(rr.relL + rr.width / 2);
                ytops.push(rr.relT);
            }
            var minX = cxs[0];
            var maxX = cxs[0];
            for(j = 1; j < nCards; j++){
                minX = Math.min(minX, cxs[j]);
                maxX = Math.max(maxX, cxs[j]);
            }
            var yBus = ytops[0] - 32;
            for(j = 1; j < nCards; j++)yBus = Math.min(yBus, ytops[j] - 32);
            if (yBus < 0) yBus = 0;
            var yStart = Math.max(0.1 * h, (layout.stmtBottom - pr.top) * 0.35);
            yStart = Math.min(yStart, h * 0.5);
            var tx = w / 2;
            var xSpread = maxX - minX;
            /**
       * Single-column layout has minX===maxX: horizontal “bus” length 0, looks like a straight line.
       * On wide viewports, six cards in a row should not collapse to one X — that’s a first-paint
       * flex/measurement race; remeasure 1–2 frames. Narrow/mobile single-column: still draw line.
       */ if (nCards > 1 && xSpread < 0.5 && w > 520 && _epicDegenPathRetries < 3) {
                _epicDegenPathRetries += 1;
                if ((0, _epicDebugJs.isEpicStoryDebug)()) // #region agent log
                try {
                    fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Debug-Session-Id": "9fb82f"
                        },
                        body: JSON.stringify({
                            sessionId: "9fb82f",
                            runId: "degen-path",
                            hypothesisId: "H4",
                            location: "story-anim.js:buildPathFromLayout",
                            message: "wide row collapsed X \u2014 remeasure (deferred path)",
                            data: {
                                xSpread: xSpread,
                                cxs0: cxs[0],
                                cxsLast: cxs[nCards - 1],
                                pass: _epicLayoutPass,
                                w: w,
                                retry: _epicDegenPathRetries
                            },
                            timestamp: Date.now()
                        })
                    }).catch(function() {});
                } catch (eD0) {}
                requestAnimationFrame(function() {
                    requestAnimationFrame(function() {
                        refreshLayout();
                        epicStoryRefreshEpicPinsOnly("buildPath:degenRow");
                    });
                });
                lastPathLen = 0;
                return 0;
            }
            if (nCards > 1 && xSpread > 0.5) _epicDegenPathRetries = 0;
            var d = buildConnectorPathD(tx, yStart, yBus, minX, maxX, cxs, ytops);
            pathEl.setAttribute("d", d);
            var len = 0;
            try {
                len = pathEl.getTotalLength();
            } catch (e1) {
                len = 0;
            }
            if ((0, _epicDebugJs.isEpicStoryDebug)() && (0, _epicDebugJs.isEpicStoryDebugVerbose)()) try {
                var dAttr = pathEl.getAttribute("d");
                (0, _epicDebugJs.epicStoryLog)("SVG path d", {
                    len: len,
                    d: dAttr ? dAttr.slice(0, 160) : ""
                });
            } catch (ePd) {}
            lastPathLen = len;
            if (len > 0) gsap.set(pathEl, {
                strokeDasharray: len,
                strokeDashoffset: len
            });
            return len;
        }
        var _epicProxyMorphL = 0;
        var _epicProxyMorphT0 = 0;
        var _epicProxyMorphT1 = 0;
        var cardFromX = [];
        var cardFromY = [];
        var _storyMorphRisePx = 0;
        /**
     * Proxy handoff **start** (L/T1): same **screen** point as body-intro (`50vw` / `50vh` viewport center).
     * Pin-local: `vhi/2 - pr.top - 7` (and `plRef` from card0 + `relL` when available). Logs showed
     * `rawT` large **negative** while `prTopMinusPtRef:0` — pin top can sit **below** viewport center; old
     * `Math.max(rawT,4)` forced `T1:4` (H9). Allow negative `top`/`left` within wide bounds; pin CSS
     * `overflow:visible`.
     */ function recomputeNodeOriginsFromViewport(morphRisePx) {
            var mrp = Math.min(120, Math.round(0.12 * window.innerHeight));
            if (mrp < 24) mrp = 24;
            if (typeof morphRisePx === "number" && isFinite(morphRisePx)) {
                if (morphRisePx > 0) mrp = morphRisePx;
                else if (morphRisePx === 0) mrp = 0;
            }
            _epicProxyMorphL = 0;
            _epicProxyMorphT0 = 0;
            _epicProxyMorphT1 = 0;
            cardFromX = [];
            cardFromY = [];
            var j;
            var rpbP = resolveStoryPinBox();
            var pr = rpbP.rect;
            var prSource = rpbP.source;
            var rowACxP = 0;
            var rowACyP = 0;
            var nOkRow = 0;
            if ((0, _epicDebugJs.isEpicStoryDebug)()) // #region agent log
            try {
                fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Debug-Session-Id": "9fb82f"
                    },
                    body: JSON.stringify({
                        sessionId: "9fb82f",
                        runId: "morph-anch",
                        hypothesisId: "H7",
                        location: "story-anim.js:recomputeNodeOrigins:pinRect",
                        message: "pin/section rect for proxy L-T",
                        data: {
                            prSource: prSource,
                            w: Math.round(pr.width * 10) / 10,
                            h: Math.round(pr.height * 10) / 10,
                            l: Math.round(pr.left * 10) / 10,
                            t: Math.round(pr.top * 10) / 10
                        },
                        timestamp: Date.now()
                    })
                }).catch(function() {});
            } catch (eH7) {}
            /** Never gsap.set morph visibility here: `refreshLayout` runs on ST refresh, resize, rAF, and
       *  nodeSplit — forcing autoAlpha:1 each time **overwrites the story timeline** (fade at nodeSplit)
       *  and fights proxy handoff; log bursts (H7) were this path re-running every pass. */ var morphDot = getEpicHandoffMorphDot();
            if (cachedLayout && cachedLayout.rects && nCards) {
                rowACxP = 0;
                rowACyP = 0;
                nOkRow = 0;
                for(j = 0; j < nCards && j < cachedLayout.rects.length; j++){
                    var rr0 = cachedLayout.rects[j];
                    if (rr0 && (rr0.width > 0.5 || rr0.height > 0.5)) {
                        rowACxP += rr0.relL + rr0.width / 2;
                        rowACyP += rr0.relT + rr0.height / 2;
                        nOkRow += 1;
                    }
                }
                if (nOkRow) {
                    rowACxP /= nOkRow;
                    rowACyP /= nOkRow;
                }
            }
            var pw = pr.width > 8 ? pr.width : 800;
            var ph = pr.height > 8 ? pr.height : 600;
            var vwi = typeof window !== "undefined" ? window.innerWidth : 1200;
            var vhi = typeof window !== "undefined" ? window.innerHeight : 800;
            var plRef = pr.left;
            var ptRef = pr.top;
            if (cachedLayout && cachedLayout.rects[0] && cards[0]) try {
                var c0bInf = cards[0].getBoundingClientRect();
                var r0Inf = cachedLayout.rects[0];
                if (c0bInf && r0Inf && c0bInf.width > 0.5) {
                    plRef = c0bInf.left - r0Inf.relL;
                    ptRef = c0bInf.top - r0Inf.relT;
                }
            } catch (eInf) {}
            var originSource = "intro50vw_inferPin";
            var rawL = vwi / 2 - plRef - 7;
            var rawT = vhi / 2 - ptRef - 7;
            if (!(cachedLayout && cachedLayout.rects[0] && cards[0])) {
                originSource = "intro50vw_prBox";
                rawL = vwi / 2 - pr.left - 7;
                rawT = vhi / 2 - pr.top - 7;
            }
            /**
       * Viewport center → pin-local can be **negative** (pin’s BCR `top` is often *below* `vhi/2` while
       * the blue block + cards are visible). Clamping to `[4, ph-18]` forced `T1: 4` (H9: rawT≈-1900,
       * `prTopMinusPtRef:0`) — proxies stacked at the pin top, not at the intro circle.
       * Keep wide soft bounds only to avoid non-finite blowups.
       */ var pad = 24;
            var loL = -Math.max(vwi, pw) - pad;
            var hiL = Math.max(pw, vwi) + pad;
            var loT = -Math.max(vhi, ph) - pad;
            var hiT = Math.max(ph, vhi) + pad;
            _epicProxyMorphL = Math.min(Math.max(rawL, loL), hiL);
            _epicProxyMorphT1 = Math.min(Math.max(rawT, loT), hiT);
            var handCxV = vwi / 2;
            var handCyV = vhi / 2;
            for(j = 0; j < nCards; j++){
                var cB2;
                try {
                    cB2 = cards[j] ? cards[j].getBoundingClientRect() : null;
                } catch (eC2) {
                    cB2 = null;
                }
                if (!cB2 || cB2.width < 0.5) {
                    cardFromX.push(0);
                    cardFromY.push(0);
                    continue;
                }
                var ccxV2 = cB2.left + cB2.width / 2;
                var ccyV2 = cB2.top + cB2.height / 2;
                cardFromX.push(handCxV - ccxV2);
                cardFromY.push(handCyV - ccyV2);
            }
            if ((0, _epicDebugJs.isEpicStoryDebug)()) // #region agent log
            try {
                fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Debug-Session-Id": "9fb82f"
                    },
                    body: JSON.stringify({
                        sessionId: "9fb82f",
                        runId: "row-anch",
                        hypothesisId: "H9",
                        location: "story-anim.js:recompute:anchor",
                        message: "proxy L/T1 source",
                        data: {
                            anchor: "morph",
                            originSource: originSource,
                            rawL: Math.round(rawL * 10) / 10,
                            rawT: Math.round(rawT * 10) / 10,
                            prTopMinusPtRef: Math.round((pr.top - ptRef) * 10) / 10,
                            rowCy: nOkRow ? Math.round(rowACyP * 10) / 10 : null,
                            T1: _epicProxyMorphT1,
                            L: _epicProxyMorphL,
                            tClampedTo4: _epicProxyMorphT1 === 4 && Math.abs(rawT - 4) > 1
                        },
                        timestamp: Date.now()
                    })
                }).catch(function() {});
            } catch (eH9) {}
            if ((0, _epicDebugJs.isEpicStoryDebug)() && (0, _epicDebugJs.isEpicStoryDebugVerbose)()) try {
                var mD = morphDot;
                var brM = mD ? (0, _epicDebugJs.br)(mD) : null;
                (0, _epicDebugJs.epicStoryLog)("recomputeNodeOrigins", {
                    morphRiseUsed: mrp,
                    proxyT1: {
                        L: _epicProxyMorphL,
                        T: _epicProxyMorphT1
                    },
                    morph: brM,
                    card0From: nCards ? {
                        x: cardFromX[0],
                        y: cardFromY[0]
                    } : null,
                    pin: (0, _epicDebugJs.br)(storyPin)
                });
            } catch (eRq) {}
        }
        function refreshLayout() {
            measureAndCache();
            if (cachedLayout) buildPathFromLayout(cachedLayout);
            recomputeNodeOriginsFromViewport(_storyMorphRisePx);
        }
        var storyTlInstance = null;
        var storyLayoutTries = 0;
        var morphWaitTries = 0;
        var onStoryStRefreshBound = false;
        /** Fixed viewport center, same as intro merge; avoids first-scrub “jump” vs pin-relative re-measure. */ function snapHandoffMorphToIntroViewportCenter() {
            var m = getEpicHandoffMorphDot();
            if (!m) return;
            try {
                m.classList.add("value-prop-morph-dot--viewport");
                if (m.parentNode && m.parentNode !== document.body) try {
                    document.body.appendChild(m);
                } catch (eA) {}
                try {
                    window.__epicMorphDot = m;
                } catch (eW) {}
                gsap.set(m, {
                    position: "fixed",
                    left: "50vw",
                    top: "50vh",
                    xPercent: -50,
                    yPercent: -50,
                    x: 0,
                    y: 0,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    backgroundColor: "#ffffff",
                    zIndex: 30,
                    transformOrigin: "50% 50%"
                });
            } catch (eSnap) {}
        }
        function storyScrubEndPx() {
            return Math.max(Math.round(window.innerHeight * (0, _epicConstantsJs.EPIC_STORY_SCRUB_SCROLL_VH)), 1);
        }
        /**
     * Only refresh epic pins (`epic-body-intro-pin`, `epic-story-scrub`) — avoids a global
     * `ScrollTrigger.refresh()` that re-runs Webflow-inserted STs and fights pin-spacer math.
     * Global refresh from elsewhere is wrapped at bootstrap (H15 if we restore scroll).
     */ function epicStoryRefreshEpicPinsOnly(reason) {
            var y0 = typeof window !== "undefined" ? window.scrollY : 0;
            var sh0 = typeof document !== "undefined" && document.documentElement ? document.documentElement.scrollHeight : 0;
            var epicIds = [
                "epic-body-intro-pin",
                "epic-story-scrub"
            ];
            var ei;
            for(ei = 0; ei < epicIds.length; ei++){
                var stE = ScrollTrigger.getById(epicIds[ei]);
                if (stE && typeof stE.refresh === "function") try {
                    stE.refresh();
                } catch (eRfSt) {}
            }
            if (!(0, _epicDebugJs.isEpicStoryDebug)()) return;
            requestAnimationFrame(function() {
                try {
                    var y1 = typeof window !== "undefined" ? window.scrollY : 0;
                    var sh1 = typeof document !== "undefined" && document.documentElement ? document.documentElement.scrollHeight : 0;
                    // #region agent log
                    fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Debug-Session-Id": "9fb82f"
                        },
                        body: JSON.stringify({
                            sessionId: "9fb82f",
                            runId: "scroll-jump",
                            hypothesisId: "H12",
                            location: "story-anim.js:epicStoryRefreshEpicPinsOnly",
                            message: String(reason || "epicPinsRefresh"),
                            data: {
                                reason: String(reason || ""),
                                y0: Math.round(y0 * 10) / 10,
                                y1: Math.round(y1 * 10) / 10,
                                dy: Math.round((y1 - y0) * 10) / 10,
                                sh0: Math.round(sh0 * 10) / 10,
                                sh1: Math.round(sh1 * 10) / 10,
                                dsh: Math.round((sh1 - sh0) * 10) / 10
                            },
                            timestamp: Date.now()
                        })
                    }).catch(function() {});
                // #endregion
                } catch (eLg) {}
            });
        }
        function onStoryStRefreshRetry() {
            if (storyTlInstance) return;
            if (!onStoryStRefreshBound) return;
            storyLayoutTries = 0;
            refreshLayout();
            if (cachedLayout) {
                onStoryStRefreshBound = false;
                morphWaitTries = 0;
                try {
                    ScrollTrigger.removeEventListener("refresh", onStoryStRefreshRetry);
                } catch (eR3) {}
                startStoryTimeline();
                return;
            }
            onStoryStRefreshBound = false;
            try {
                ScrollTrigger.removeEventListener("refresh", onStoryStRefreshRetry);
            } catch (eR4) {}
            if (window.console) console.warn("[epic-story] Could not measure the story pin; check #story, [data-epic=\"story-pin\"], and service cards. Story scrub not started.");
        }
        function startStoryTimeline() {
            if (storyTlInstance) return;
            refreshLayout();
            if (!cachedLayout) {
                storyLayoutTries += 1;
                if (storyLayoutTries < 32) {
                    if (storyLayoutTries === 1) epicStoryRefreshEpicPinsOnly("startStoryTimeline:retryLayout");
                    requestAnimationFrame(startStoryTimeline);
                } else {
                    onStoryStRefreshBound = true;
                    try {
                        ScrollTrigger.addEventListener("refresh", onStoryStRefreshRetry);
                        epicStoryRefreshEpicPinsOnly("startStoryTimeline:refreshListener");
                    } catch (eR1) {}
                }
                return;
            }
            if (!getEpicHandoffMorphDot()) {
                morphWaitTries += 1;
                if (morphWaitTries === 1 && (0, _epicDebugJs.isEpicStoryDebug)()) (0, _epicDebugJs.epicStoryLog)("morph not ready, waiting (rAF)", {
                    try: 1,
                    max: 64
                });
                if (morphWaitTries < 64) {
                    if (morphWaitTries % 16 === 0 && (0, _epicDebugJs.isEpicStoryDebug)() && (0, _epicDebugJs.isEpicStoryDebugVerbose)()) (0, _epicDebugJs.epicStoryLog)("morph wait rAF", {
                        try: morphWaitTries,
                        __epicMorphDot: !!window.__epicMorphDot
                    });
                    requestAnimationFrame(startStoryTimeline);
                    return;
                }
                morphWaitTries = 0;
                if ((0, _epicDebugJs.isEpicStoryDebug)()) (0, _epicDebugJs.epicStoryLog)("morph still null after 64 rAF \u2014 building with fallback recompute", {});
            } else morphWaitTries = 0;
            if (onStoryStRefreshBound) {
                try {
                    ScrollTrigger.removeEventListener("refresh", onStoryStRefreshRetry);
                } catch (eR2) {}
                onStoryStRefreshBound = false;
            }
            buildStoryTimeline();
        }
        function buildStoryTimeline() {
            if (storyTlInstance) return;
            // #region agent log
            try {
                var h10d = {
                    runId: "h10-dom"
                };
                if (serviceFadeBlock) {
                    try {
                        h10d.fadeGsapOpacity = String(gsap.getProperty(serviceFadeBlock, "opacity"));
                    } catch (eH10a) {}
                    try {
                        h10d.fadeComputed = getComputedStyle(serviceFadeBlock).opacity;
                    } catch (eH10b) {}
                }
                if (serviceStatement && serviceFadeBlock) h10d.stmtInFade = serviceFadeBlock.contains(serviceStatement);
                if (serviceFadeBlock && cards && cards.length) {
                    var cik = 0;
                    for(var h10i = 0; h10i < cards.length; h10i += 1)if (serviceFadeBlock.contains(cards[h10i])) cik += 1;
                    h10d.cardsInFade = cik + "/" + cards.length;
                }
                fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Debug-Session-Id": "9fb82f"
                    },
                    body: JSON.stringify({
                        sessionId: "9fb82f",
                        runId: h10d.runId,
                        hypothesisId: "H10",
                        location: "story-anim.js:buildStoryTimeline:domH10",
                        message: "service fade DOM containment",
                        data: h10d,
                        timestamp: Date.now()
                    })
                }).catch(function() {});
            } catch (eH10) {}
            // #endregion
            /**
       * Pin scroll distance (px) for `end: +=…`: snapshot at timeline build + update on `resize` only.
       * Recomputing from `innerHeight` on every global refresh (fonts, subpixel vh) can move `end` and
       * nudge scroll when leaving the pin (“jerked back” toward #story).
       */ var epicStoryPinScrollPx = storyScrubEndPx();
            function pinLen() {
                return epicStoryPinScrollPx;
            }
            /** Story scroll: no upward nudge on the intro handoff dot — it stayed misaligned vs proxies (second “circle”). */ var morphRisePx = 0;
            _storyMorphRisePx = 0;
            snapHandoffMorphToIntroViewportCenter();
            recomputeNodeOriginsFromViewport(0);
            /** Distribute 0..1 across longer virtual seconds: node/path win more of the scroll; pair with EPIC_STORY_SCRUB_SCROLL_VH. */ var tMorphRise = 0.55;
            var tNodeSplit = tMorphRise;
            var moveDur = 1.05;
            /** 0 = all proxies move in parallel (horizontal fan from shared start); any &gt;0 reads as stagger / “swirl”. */ var nodeStg = 0;
            var tMoveEnd = tNodeSplit + moveDur + nodeStg * Math.max(0, nCards - 1);
            /** Start the connector *after* the handoff, not the same frame as nodeSplit (was tNodeSplit+0.04 → “already drawn”). */ var tPathIn = tNodeSplit + 0.5 * moveDur;
            var pathDur = 0.9;
            /**
       * Crossfade *after* the proxy fromTo completes. Old tCard = tProxyOut-0.08 (≈0.04s *before* tMoveEnd)
       * raised real cards on top of proxies (z3 vs z2) while the white “nodes” were still morphing, so
       * users only saw the real card shells + opacity — no visible proxy→card motion.
       */ var tProxyOut = tMoveEnd + 0.1;
            /** Real cards: opacity-only, overlapping proxy fade (no x/y; proxies already “landed” on BCRs). */ var _cardStg = 0.055;
            var cardOpacityDur = 0.4;
            var tCardCross = tMoveEnd + 0.1;
            if (tCardCross < tNodeSplit + 0.02) tCardCross = tNodeSplit + 0.02;
            var tCardIn = tCardCross;
            /** No stagger on real card opacity: stagger + autoAlpha = “ladder” on semi-transparent card shells. */ var cardCrossfadeStg = 0;
            var _cardsDoneT = tCardCross + cardOpacityDur + cardCrossfadeStg * Math.max(0, nCards - 1);
            var tAboutIn = _cardsDoneT + 0.15;
            var serviceFadeDur = Math.min(1.8, 0.35 + tMoveEnd * 0.38);
            // #region agent log
            try {
                fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Debug-Session-Id": "9fb82f"
                    },
                    body: JSON.stringify({
                        sessionId: "9fb82f",
                        runId: "pre-fix-2",
                        hypothesisId: "H3",
                        location: "story-anim.js:buildStoryTimeline:beats",
                        message: "story beat timings (0-1 = full pin scrub)",
                        data: {
                            tMorphRise: tMorphRise,
                            tMoveEnd: tMoveEnd,
                            tPathIn: tPathIn,
                            tProxyOut: tProxyOut,
                            tCardIn: tCardIn,
                            tCardCross: tCardCross,
                            _cardsDoneT: _cardsDoneT,
                            serviceFadeDur: serviceFadeDur,
                            cardOpacityDur: cardOpacityDur,
                            cardCrossfadeStg: cardCrossfadeStg,
                            serviceScrollFade: !!serviceFadeBlock,
                            serviceBlockOnStoryTl: !!serviceFadeBlock,
                            serviceBlockAtTNodeSplit: !!serviceFadeBlock,
                            tNodeSplit: tNodeSplit,
                            /** Which scrub mode (see `EPIC_STORY_SCRUB_SMOOTH`); post-H2 we use `true` for 1:1 scroll. */ epicScrub: (0, _epicConstantsJs.EPIC_STORY_SCRUB_SMOOTH),
                            pinEndPx: pinLen()
                        },
                        timestamp: Date.now()
                    })
                }).catch(function() {});
            } catch (eBe) {}
            // #endregion
            var handoffMorphEl = getEpicHandoffMorphDot();
            var _revealScrubbedPast = false;
            var _epicScrubLogBucket = -1;
            if ((0, _epicDebugJs.isEpicStoryDebug)()) try {
                (0, _epicDebugJs.epicStoryLog)("buildStoryTimeline", {
                    handoffMorph: !!handoffMorphEl,
                    handoffBcr: (0, _epicDebugJs.br)(handoffMorphEl),
                    morphRisePx: morphRisePx,
                    pinEndPx: pinLen(),
                    pathLen: lastPathLen,
                    nCards: nCards,
                    cardsDoneS: _cardsDoneT
                });
            } catch (eB) {}
            function applyHandoffRevealCleanup(cleanupReason) {
                if ((0, _epicDebugJs.isEpicStoryDebug)()) try {
                    (0, _epicDebugJs.epicStoryLog)("handoffCleanup", {
                        reason: String(cleanupReason || "")
                    });
                } catch (eL) {}
                var _fi;
                var _nl;
                try {
                    _nl = document.querySelectorAll(".value-prop-morph-dot");
                    for(_fi = 0; _fi < _nl.length; _fi++)_nl[_fi].classList.remove("epic-below-service-statement");
                } catch (eF) {}
                try {
                    gsap.set(cards, {
                        clearProps: "transform"
                    });
                } catch (eF2) {}
            }
            function setMorphDotVisibleForStory(props) {
                var mH = getEpicHandoffMorphDot();
                if (!mH) return;
                try {
                    gsap.set(mH, props);
                } catch (e) {}
            }
            /** Layout-first: document order + body-intro pin-spacer; #story should follow intro directly. */ var tl = gsap.timeline({
                defaults: {
                    ease: "none"
                },
                scrollTrigger: {
                    id: "epic-story-scrub",
                    trigger: storyPin,
                    start: (0, _epicConstantsJs.EPIC_STORY_PIN_START),
                    end: function() {
                        return "+=" + pinLen();
                    },
                    pin: true,
                    pinSpacing: true,
                    pinReparent: false,
                    scrub: (0, _epicConstantsJs.EPIC_STORY_SCRUB_SMOOTH),
                    anticipatePin: 0,
                    /** Run after body-intro pin (default 0) so pin-spacer math stays ordered. */ refreshPriority: -1,
                    invalidateOnRefresh: true,
                    onRefresh: function() {
                        if ((0, _epicDebugJs.isEpicStoryDebug)() && (0, _epicDebugJs.isEpicStoryDebugVerbose)()) (0, _epicDebugJs.epicStoryLog)("scrollTrigger onRefresh", {
                            storyPin: (0, _epicDebugJs.br)(storyPin)
                        });
                        refreshLayout();
                        if (storyTlInstance) try {
                            storyTlInstance.invalidate();
                        } catch (eInv) {}
                    },
                    onEnter: function(self) {
                        try {
                            window.__epicStoryHandoffActive = true;
                        } catch (eS0) {}
                        try {
                            gsap.set([
                                document.documentElement,
                                document.body
                            ], {
                                backgroundColor: "#0f33ff"
                            });
                        } catch (eBl) {}
                        if (self && self.progress < 0.2) snapHandoffMorphToIntroViewportCenter();
                        refreshLayout();
                        try {
                            tl.invalidate();
                        } catch (eInv0) {}
                        requestAnimationFrame(function() {
                            refreshLayout();
                            try {
                                tl.invalidate();
                            } catch (eInv1) {}
                        });
                        if (self && self.progress < 0.2) setMorphDotVisibleForStory({
                            autoAlpha: 1,
                            zIndex: 30,
                            visibility: "visible",
                            pointerEvents: "none"
                        });
                        try {
                            var mA = getEpicHandoffMorphDot();
                            if (mA) mA.classList.add("epic-below-service-statement");
                        } catch (e0) {}
                        if ((0, _epicDebugJs.isEpicStoryDebug)()) try {
                            (0, _epicDebugJs.epicStoryLog)("onEnter", {
                                stProgress: self && self.progress,
                                y: window.scrollY,
                                morph: (0, _epicDebugJs.br)(getEpicHandoffMorphDot())
                            });
                        } catch (eEn) {}
                    },
                    onEnterBack: function(self) {
                        try {
                            window.__epicStoryHandoffActive = true;
                        } catch (eS1) {}
                        if (self && self.progress < 0.2) snapHandoffMorphToIntroViewportCenter();
                        refreshLayout();
                        try {
                            tl.invalidate();
                        } catch (eInv0b) {}
                        requestAnimationFrame(function() {
                            refreshLayout();
                            try {
                                tl.invalidate();
                            } catch (eInv1b) {}
                        });
                        if (self && self.progress < 0.2) setMorphDotVisibleForStory({
                            autoAlpha: 1,
                            zIndex: 30,
                            visibility: "visible",
                            pointerEvents: "none"
                        });
                        try {
                            var mAb = getEpicHandoffMorphDot();
                            if (mAb) mAb.classList.add("epic-below-service-statement");
                        } catch (e0b) {}
                        if ((0, _epicDebugJs.isEpicStoryDebug)()) try {
                            (0, _epicDebugJs.epicStoryLog)("onEnterBack", {
                                stProgress: self && self.progress,
                                y: window.scrollY,
                                morph: (0, _epicDebugJs.br)(getEpicHandoffMorphDot())
                            });
                        } catch (eE2) {}
                    },
                    onLeaveBack: function() {
                        var _yLb = typeof window !== "undefined" ? window.scrollY : 0;
                        try {
                            window.__epicStoryHandoffActive = false;
                        } catch (eS2) {}
                        try {
                            gsap.set([
                                document.documentElement,
                                document.body
                            ], {
                                backgroundColor: "#fbfbfb"
                            });
                        } catch (eBg) {}
                        if ((0, _epicDebugJs.isEpicStoryDebug)()) {
                            try {
                                (0, _epicDebugJs.epicStoryLog)("onLeaveBack", {
                                    y: window.scrollY
                                });
                            } catch (eLb) {}
                            // #region agent log
                            try {
                                fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "X-Debug-Session-Id": "9fb82f"
                                    },
                                    body: JSON.stringify({
                                        sessionId: "9fb82f",
                                        runId: "pin-leave",
                                        hypothesisId: "H13",
                                        location: "story-anim.js:ST.onLeaveBack",
                                        message: "leave back (toward intro)",
                                        data: {
                                            y: Math.round(_yLb * 10) / 10
                                        },
                                        timestamp: Date.now()
                                    })
                                }).catch(function() {});
                            } catch (eH13a) {}
                        // #endregion
                        }
                        applyHandoffRevealCleanup("onLeaveBack");
                    },
                    onLeave: function(self) {
                        var pro = 1;
                        try {
                            pro = self && typeof self.progress === "number" && isFinite(self.progress) ? self.progress : 1;
                        } catch (ePr) {
                            pro = 1;
                        }
                        var _yLv = typeof window !== "undefined" ? window.scrollY : 0;
                        var _stE = self && typeof self.end === "number" ? self.end : null;
                        var _stS = self && typeof self.start === "number" ? self.start : null;
                        if (pro < 0.85) {
                            if ((0, _epicDebugJs.isEpicStoryDebug)()) // #region agent log
                            try {
                                fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "X-Debug-Session-Id": "9fb82f"
                                    },
                                    body: JSON.stringify({
                                        sessionId: "9fb82f",
                                        runId: "pin-leave",
                                        hypothesisId: "H14",
                                        location: "story-anim.js:ST.onLeave",
                                        message: "onLeave early exit pro<0.85",
                                        data: {
                                            pro: Math.round(pro * 1e3) / 1e3,
                                            y: Math.round(_yLv * 10) / 10,
                                            stStart: _stS,
                                            stEnd: _stE
                                        },
                                        timestamp: Date.now()
                                    })
                                }).catch(function() {});
                            } catch (eH14) {}
                            return;
                        }
                        try {
                            window.__epicStoryHandoffActive = false;
                        } catch (eH0) {}
                        setMorphDotVisibleForStory({
                            autoAlpha: 0,
                            pointerEvents: "none",
                            visibility: "hidden"
                        });
                        try {
                            gsap.set([
                                document.documentElement,
                                document.body
                            ], {
                                backgroundColor: "#fbfbfb"
                            });
                        } catch (eBgl) {}
                        if ((0, _epicDebugJs.isEpicStoryDebug)()) {
                            try {
                                (0, _epicDebugJs.epicStoryLog)("onLeave", {
                                    stProgress: pro,
                                    y: window.scrollY
                                });
                            } catch (eLv) {}
                            // #region agent log
                            try {
                                fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "X-Debug-Session-Id": "9fb82f"
                                    },
                                    body: JSON.stringify({
                                        sessionId: "9fb82f",
                                        runId: "pin-leave",
                                        hypothesisId: "H13",
                                        location: "story-anim.js:ST.onLeave",
                                        message: "leave forward (past story pin)",
                                        data: {
                                            pro: Math.round(pro * 1e3) / 1e3,
                                            y: Math.round(_yLv * 10) / 10,
                                            stStart: _stS,
                                            stEnd: _stE
                                        },
                                        timestamp: Date.now()
                                    })
                                }).catch(function() {});
                            } catch (eH13b) {}
                            requestAnimationFrame(function() {
                                try {
                                    var y1 = typeof window !== "undefined" ? window.scrollY : 0;
                                    if (Math.abs(y1 - _yLv) > 3) fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                            "X-Debug-Session-Id": "9fb82f"
                                        },
                                        body: JSON.stringify({
                                            sessionId: "9fb82f",
                                            runId: "pin-leave",
                                            hypothesisId: "H13",
                                            location: "story-anim.js:ST.onLeave+1rAF",
                                            message: "scroll delta after onLeave",
                                            data: {
                                                y0: Math.round(_yLv * 10) / 10,
                                                y1: Math.round(y1 * 10) / 10,
                                                dy: Math.round((y1 - _yLv) * 10) / 10
                                            },
                                            timestamp: Date.now()
                                        })
                                    }).catch(function() {});
                                } catch (eH13c) {}
                            });
                        // #endregion
                        }
                        applyHandoffRevealCleanup("onLeave");
                    },
                    onUpdate: function(stSelf) {
                        if ((0, _epicDebugJs.isEpicStoryDebug)() && stSelf) try {
                            var bu = Math.floor((stSelf.progress || 0) * 20);
                            if (bu !== _epicScrubLogBucket) {
                                _epicScrubLogBucket = bu;
                                var pRound = Math.round((stSelf.progress || 0) * 1000) / 1000;
                                var tlt = Math.round(tl.time() * 1000) / 1000;
                                var tlp = Math.round(tl.progress() * 1000) / 1000;
                                var scrubPayload = {
                                    stProgress: pRound,
                                    direction: stSelf.direction,
                                    v: (0, _epicDebugJs.isEpicStoryDebugVerbose)() && typeof stSelf.getVelocity === "function" ? stSelf.getVelocity() : void 0,
                                    tlTime: tlt,
                                    tlTotalDur: Math.round(tl.totalDuration() * 1000) / 1000,
                                    tlProgress: tlp,
                                    y: typeof window !== "undefined" && window.scrollY,
                                    /** scroll progress vs timeline progress (low = in sync; high = scrub catch-up) */ drift: Math.round(Math.abs(pRound - tlp) * 1e3) / 1e3
                                };
                                (0, _epicDebugJs.epicStoryLog)("scrub", scrubPayload);
                                // #region agent log
                                try {
                                    fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                            "X-Debug-Session-Id": "9fb82f"
                                        },
                                        body: JSON.stringify({
                                            sessionId: "9fb82f",
                                            runId: "post-fix-1",
                                            hypothesisId: "H2",
                                            location: "story-anim.js:ScrollTrigger.onUpdate",
                                            message: "scrub bucket",
                                            data: scrubPayload,
                                            timestamp: Date.now()
                                        })
                                    }).catch(function() {});
                                } catch (eFetch) {}
                            // #endregion
                            }
                        } catch (eU0) {}
                        var tlin = tl;
                        if (!tlin || tlin.labels == null) return;
                        var cd = tlin.labels["cardsDone"];
                        if (typeof cd !== "number") return;
                        if (tlin.time() < cd - 0.0001) {
                            _revealScrubbedPast = false;
                            return;
                        }
                        if (_revealScrubbedPast) return;
                        _revealScrubbedPast = true;
                        applyHandoffRevealCleanup("pastCardsDone");
                    }
                }
            });
            if (serviceStatement && !serviceFadeBlock) tl.fromTo(serviceStatement, {
                autoAlpha: 0,
                y: 40
            }, {
                autoAlpha: 1,
                y: 0,
                duration: serviceFadeDur,
                ease: "power1.out"
            }, 0);
            else if (serviceFadeBlock) {
                /**
       * On the *same* pin `tl` as the morph, but *not* at t=0: a 0.2–0.5s 0→1 on the full wrapper
       * (while proxies were still 0,0,autoAlpha:0 through the initial `tMorphRise` beat) made the *card row / shell* the
       * only visible “growth” in the first half of the story scrub — the proxy fromTo (starts at
       * nodeSplit) was never the star. Reveal the wrapper *with* the handoff at nodeSplit.
       * If `.service-statement` is a sibling of this wrapper, reveal it in the *same* instant (init
       * path above) to avoid a second “SERVICES / paragraph” flash.
       */ tl.set(serviceFadeBlock, {
                    autoAlpha: 1,
                    visibility: "visible"
                }, tNodeSplit);
                if (serviceStatement) try {
                    if (!serviceFadeBlock.contains(serviceStatement)) tl.set(serviceStatement, {
                        autoAlpha: 1,
                        visibility: "visible"
                    }, tNodeSplit);
                } catch (eRev) {}
            }
            /** Handoff dot: visible at y=0 (viewport center via CSS); no `y` tween so it matches proxy start. Scrub beat unchanged. */ if (handoffMorphEl) tl.set(handoffMorphEl, {
                autoAlpha: 1,
                y: 0,
                zIndex: 30,
                pointerEvents: "none",
                visibility: "visible"
            }, 0);
            var morphIntroHold = {};
            tl.to(morphIntroHold, {
                duration: tMorphRise
            }, 0);
            tl.addLabel("nodeSplit", tNodeSplit);
            /**
     * Re-measure and recompute *at* this time so L/T1 and `cachedLayout` match a pinned/resolved pin box.
     * The old `tl.set` with numbers baked in at first build and the `(0,0) → cards` when cache was null
     * were the “nodes from the top / off-screen” bug.
     */ tl.add(function onNodeSplitProxyAnchor() {
                refreshLayout();
                if ((0, _epicDebugJs.isEpicStoryDebug)()) {
                    // #region agent log
                    var a = -2;
                    if (handoffMorphEl) try {
                        a = parseFloat(gsap.getProperty(handoffMorphEl, "autoAlpha")) || 0;
                    } catch (eA) {
                        a = -1;
                    }
                    var clN = !cachedLayout;
                    var r0L = -99;
                    var r0T = -99;
                    if (cachedLayout && cachedLayout.rects && cachedLayout.rects[0]) {
                        r0L = Math.round(cachedLayout.rects[0].relL * 10) / 10;
                        r0T = Math.round(cachedLayout.rects[0].relT * 10) / 10;
                    }
                    try {
                        fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "X-Debug-Session-Id": "9fb82f"
                            },
                            body: JSON.stringify({
                                sessionId: "9fb82f",
                                runId: "nodeSplit-handoff",
                                hypothesisId: "H8",
                                location: "story-anim.js:buildStoryTimeline:nodeSplit",
                                message: "after refresh: cache, first card rel, L/T1, morphA",
                                data: {
                                    cachedLayoutNull: clN,
                                    rel0: {
                                        l: r0L,
                                        t: r0T
                                    },
                                    L: _epicProxyMorphL,
                                    T1: _epicProxyMorphT1,
                                    hasMorph: !!handoffMorphEl,
                                    morphAutoAlpha: a
                                },
                                timestamp: Date.now()
                            })
                        }).catch(function() {});
                    } catch (eH8) {}
                // #endregion
                }
                try {
                    gsap.set(proxies, {
                        autoAlpha: 1,
                        left: _epicProxyMorphL,
                        top: _epicProxyMorphT1,
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        zIndex: 200
                    });
                } catch (ePS) {}
            }, "nodeSplit");
            /** morph (z 30): quick fade so the ghost body circle is gone as the fan starts */ if (handoffMorphEl) {
                var morphHandoffHideDur = 0.05;
                tl.to(handoffMorphEl, {
                    autoAlpha: 0,
                    duration: morphHandoffHideDur,
                    ease: "power1.out"
                }, "nodeSplit");
                tl.set(handoffMorphEl, {
                    y: 0,
                    clearProps: "y",
                    pointerEvents: "none",
                    visibility: "hidden"
                }, "nodeSplit+=" + morphHandoffHideDur);
            }
            function proxyW(i) {
                if (!cachedLayout || !cachedLayout.rects[i]) return 14;
                return cachedLayout.rects[i].width;
            }
            function proxyH(i) {
                if (!cachedLayout || !cachedLayout.rects[i]) return 14;
                return cachedLayout.rects[i].height;
            }
            function proxyRelL(i) {
                if (!cachedLayout || !cachedLayout.rects[i]) return 0;
                return cachedLayout.rects[i].relL;
            }
            function proxyRelT(i) {
                if (!cachedLayout || !cachedLayout.rects[i]) return 0;
                return cachedLayout.rects[i].relT;
            }
            function proxyR(i) {
                if (!cachedLayout) return "12px";
                return cachedLayout.borderRadii[i] || "12px";
            }
            /**
     * fromTo: a bare `to()` at the same "nodeSplit" as the pre-tween set can pick up
     * the initial 0,0,autoAlpha:0 (build-time) and yield no visible move on scrub.
     * Nudge the tween after the callback; explicit "from" matches the row-circle handoff.
     */ var nodeSplitTAfter = 0.001;
            tl.fromTo(proxies, {
                zIndex: 200,
                autoAlpha: 1,
                xPercent: 0,
                yPercent: 0,
                left: function(i) {
                    return _epicProxyMorphL;
                },
                top: function(i) {
                    return _epicProxyMorphT1;
                },
                width: 14,
                height: 14,
                borderRadius: "50%",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                immediateRender: false
            }, {
                left: function(i) {
                    return proxyRelL(i);
                },
                top: function(i) {
                    return proxyRelT(i);
                },
                width: function(i) {
                    return proxyW(i);
                },
                height: function(i) {
                    return proxyH(i);
                },
                xPercent: 0,
                yPercent: 0,
                borderRadius: function(i) {
                    return proxyR(i);
                },
                zIndex: 200,
                boxShadow: "0 4px 22px rgba(0,0,0,0.12)",
                ease: "power1.inOut",
                duration: moveDur,
                stagger: nodeStg,
                immediateRender: false
            }, "nodeSplit+=" + nodeSplitTAfter);
            if (pathEl && lastPathLen > 0) tl.to(pathEl, {
                strokeDashoffset: 0,
                duration: pathDur,
                ease: "power1.inOut"
            }, tPathIn);
            tl.to(proxies, {
                autoAlpha: 0,
                duration: 0.14,
                ease: "power1.out",
                stagger: 0
            }, tProxyOut);
            /**
     * Real cards: opacity crossfade. Keep proxies above card shells (z 200 &gt; 3) so the white
     * “node” shell dissolves to reveal the real card beneath; the old 2/3 here sat cards on top while
     * proxi (still morphing) were under — looked like the DOM cards + opacity, not the proxy handoff.
     */ tl.set(cards, {
                x: 0,
                y: 0,
                transformOrigin: "50% 50%",
                zIndex: 3
            }, Math.max(0, tCardCross - 0.0001));
            tl.set(proxies, {
                zIndex: 200
            }, tCardCross);
            tl.to(cards, {
                autoAlpha: 1,
                duration: cardOpacityDur,
                ease: "power1.out",
                stagger: cardCrossfadeStg,
                onStart: function() {
                    if ((0, _epicDebugJs.isEpicStoryDebug)()) try {
                        (0, _epicDebugJs.epicStoryLog)("card crossfade onStart", {
                            n: nCards,
                            t: tCardCross
                        });
                    } catch (eOs) {}
                    try {
                        gsap.set(cards, {
                            position: "relative"
                        });
                    } catch (eZ) {}
                },
                onComplete: function() {
                    applyHandoffRevealCleanup("cardCrossfadeComplete");
                }
            }, tCardCross);
            tl.addLabel("cardsDone", _cardsDoneT);
            if (aboutBlock) tl.fromTo(aboutBlock, {
                autoAlpha: 0,
                y: 28
            }, {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            }, tAboutIn);
            (function setMorphGsapZAndHide() {
                var mE = getEpicHandoffMorphDot();
                var tMorphZClear = aboutBlock ? tAboutIn + 0.62 : tCardIn + 0.2;
                var tMorphHide = aboutBlock ? tAboutIn + 0.58 : tCardIn + 0.16;
                if (mE) {
                    try {
                        tl.set(mE, {
                            clearProps: "zIndex"
                        }, tMorphZClear);
                    } catch (e0) {}
                    try {
                        tl.set(mE, {
                            autoAlpha: 0,
                            pointerEvents: "none",
                            visibility: "hidden"
                        }, tMorphHide);
                    } catch (e1) {}
                }
            })();
            if (window.document && document.fonts) document.fonts.ready.then(function() {
                refreshLayout();
                try {
                    if (tl) tl.invalidate();
                } catch (eFon) {}
            /** Skip global `ScrollTrigger.refresh()` here — it often fires after pin release and can yank `scrollY` toward #story. */ });
            var resizeTick = 0;
            window.addEventListener("resize", function() {
                if (resizeTick) clearTimeout(resizeTick);
                resizeTick = setTimeout(function() {
                    epicStoryPinScrollPx = storyScrubEndPx();
                    refreshLayout();
                    try {
                        if (storyTlInstance) storyTlInstance.invalidate();
                    } catch (eRsz) {}
                    epicStoryRefreshEpicPinsOnly("resize");
                }, 100);
            }, {
                passive: true
            });
            requestAnimationFrame(function() {
                refreshLayout();
                try {
                    if (tl) tl.invalidate();
                } catch (eRaf) {}
                epicStoryRefreshEpicPinsOnly("buildStoryTimeline:postRaf");
            });
            storyTlInstance = tl;
            /** `serviceFadeBlock` reveal: see `else if (serviceFadeBlock)` on the story `tl` (t=0). */ if ((0, _epicDebugJs.isEpicStoryDebug)()) try {
                var stInst = ScrollTrigger.getById("epic-story-scrub");
                var lbl = tl.labels || {};
                var cpy = {};
                for(var lk in lbl)if (Object.prototype.hasOwnProperty.call(lbl, lk)) cpy[lk] = Math.round(lbl[lk] * 1e3) / 1e3;
                (0, _epicDebugJs.epicStoryLog)("timeline + ST ready", {
                    totalDuration: Math.round(tl.totalDuration() * 1e3) / 1e3,
                    nodeSplitSec: typeof lbl["nodeSplit"] === "number" ? lbl["nodeSplit"] : void 0,
                    cardsDoneSec: typeof lbl["cardsDone"] === "number" ? lbl["cardsDone"] : void 0,
                    allLabels: cpy
                });
                if (stInst) (function stDbg() {
                    var vs = stInst.vars || {};
                    var endVarStr;
                    try {
                        endVarStr = vs.end != null && typeof vs.end === "function" ? vs.end.call(stInst, stInst) : vs.end;
                    } catch (eEv) {
                        endVarStr = "error";
                    }
                    var s0 = stInst.start != null && typeof stInst.start === "function" ? stInst.start() : stInst.start;
                    var e0 = stInst.end != null && typeof stInst.end === "function" ? stInst.end() : stInst.end;
                    /** Numeric start/end are NaN/undefined until after layout; endVar is from vars. */ (0, _epicDebugJs.epicStoryLog)("ScrollTrigger", {
                        start: s0,
                        end: e0,
                        varsStart: vs.start,
                        endVar: endVarStr,
                        pin: stInst.pin
                    });
                    requestAnimationFrame(function() {
                        var st2 = ScrollTrigger.getById("epic-story-scrub");
                        if (!st2) return;
                        (0, _epicDebugJs.epicStoryLog)("ScrollTrigger (after rAF)", {
                            start: st2.start,
                            end: st2.end
                        });
                    });
                })();
                else (0, _epicDebugJs.epicStoryLog)("ScrollTrigger", {
                    note: "getById epic-story-scrub not found"
                });
            } catch (eST) {}
        }
        startStoryTimeline();
    }
    if (document.readyState === "complete" || document.readyState === "interactive") {
        if (document.fonts) document.fonts.ready.then(function() {
            init();
        });
        else init();
    } else document.addEventListener("DOMContentLoaded", function() {
        if (document.fonts) document.fonts.ready.then(function() {
            init();
        });
        else init();
    });
}

},{"./epic-constants.js":"4gmgO","./epic-debug.js":"iXhWq","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["loiGR","gLLPy"], "gLLPy", "parcelRequirebd98", {})

//# sourceMappingURL=main.js.map
