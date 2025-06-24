(function(define){var __define; typeof define === "function" && (__define=define,define=null);
// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
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

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
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
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

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

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"eHZW8":[function(require,module,exports) {
var u = globalThis.process?.argv || [];
var h = ()=>globalThis.process?.env || {};
var B = new Set(u), _ = (e)=>B.has(e), G = u.filter((e)=>e.startsWith("--") && e.includes("=")).map((e)=>e.split("=")).reduce((e, [t, o])=>(e[t] = o, e), {});
var U = _("--dry-run"), g = ()=>_("--verbose") || h().VERBOSE === "true", N = g();
var m = (e = "", ...t)=>console.log(e.padEnd(9), "|", ...t);
var y = (...e)=>console.error("\uD83D\uDD34 ERROR".padEnd(9), "|", ...e), v = (...e)=>m("\uD83D\uDD35 INFO", ...e), f = (...e)=>m("\uD83D\uDFE0 WARN", ...e), M = 0, i = (...e)=>g() && m(`\u{1F7E1} ${M++}`, ...e);
var b = ()=>{
    let e = globalThis.browser?.runtime || globalThis.chrome?.runtime, t = ()=>setInterval(e.getPlatformInfo, 24e3);
    e.onStartup.addListener(t), t();
};
var n = {
    "isContentScript": false,
    "isBackground": true,
    "isReact": false,
    "runtimes": [
        "background-service-runtime"
    ],
    "host": "localhost",
    "port": 1815,
    "entryFilePath": "B:\\git_projects\\Fastapi\\FrontEnd\\safe-net\\.plasmo\\static\\background\\index.ts",
    "bundleId": "c338908e704c91f1",
    "envHash": "d99a5ffa57acd638",
    "verbose": "false",
    "secure": false,
    "serverPort": 1012
};
module.bundle.HMR_BUNDLE_ID = n.bundleId;
globalThis.process = {
    argv: [],
    env: {
        VERBOSE: n.verbose
    }
};
var D = module.bundle.Module;
function H(e) {
    D.call(this, e), this.hot = {
        data: module.bundle.hotData[e],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(t) {
            this._acceptCallbacks.push(t || function() {});
        },
        dispose: function(t) {
            this._disposeCallbacks.push(t);
        }
    }, module.bundle.hotData[e] = void 0;
}
module.bundle.Module = H;
module.bundle.hotData = {};
var c = globalThis.browser || globalThis.chrome || null;
function R() {
    return !n.host || n.host === "0.0.0.0" ? location.protocol.indexOf("http") === 0 ? location.hostname : "localhost" : n.host;
}
function x() {
    return !n.host || n.host === "0.0.0.0" ? "localhost" : n.host;
}
function d() {
    return n.port || location.port;
}
var P = "__plasmo_runtime_page_", S = "__plasmo_runtime_script_";
var O = `${n.secure ? "https" : "http"}://${R()}:${d()}/`;
async function k(e = 1470) {
    for(;;)try {
        await fetch(O);
        break;
    } catch  {
        await new Promise((o)=>setTimeout(o, e));
    }
}
if (c.runtime.getManifest().manifest_version === 3) {
    let e = c.runtime.getURL("/__plasmo_hmr_proxy__?url=");
    globalThis.addEventListener("fetch", function(t) {
        let o = t.request.url;
        if (o.startsWith(e)) {
            let s = new URL(decodeURIComponent(o.slice(e.length)));
            s.hostname === n.host && s.port === `${n.port}` ? (s.searchParams.set("t", Date.now().toString()), t.respondWith(fetch(s).then((r)=>new Response(r.body, {
                    headers: {
                        "Content-Type": r.headers.get("Content-Type") ?? "text/javascript"
                    }
                })))) : t.respondWith(new Response("Plasmo HMR", {
                status: 200,
                statusText: "Testing"
            }));
        }
    });
}
function E(e, t) {
    let { modules: o } = e;
    return o ? !!o[t] : !1;
}
function C(e = d()) {
    let t = x();
    return `${n.secure || location.protocol === "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(t) ? "wss" : "ws"}://${t}:${e}/`;
}
function L(e) {
    typeof e.message == "string" && y("[plasmo/parcel-runtime]: " + e.message);
}
function T(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = new WebSocket(C(Number(d()) + 1));
    return t.addEventListener("message", async function(o) {
        let s = JSON.parse(o.data);
        await e(s);
    }), t.addEventListener("error", L), t;
}
function A(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = new WebSocket(C());
    return t.addEventListener("message", async function(o) {
        let s = JSON.parse(o.data);
        if (s.type === "update" && await e(s.assets), s.type === "error") for (let r of s.diagnostics.ansi){
            let l = r.codeframe || r.stack;
            f("[plasmo/parcel-runtime]: " + r.message + `
` + l + `

` + r.hints.join(`
`));
        }
    }), t.addEventListener("error", L), t.addEventListener("open", ()=>{
        v(`[plasmo/parcel-runtime]: Connected to HMR server for ${n.entryFilePath}`);
    }), t.addEventListener("close", ()=>{
        f(`[plasmo/parcel-runtime]: Connection to the HMR server is closed for ${n.entryFilePath}`);
    }), t;
}
var w = module.bundle.parent, a = {
    buildReady: !1,
    bgChanged: !1,
    csChanged: !1,
    pageChanged: !1,
    scriptPorts: new Set,
    pagePorts: new Set
};
async function p(e = !1) {
    if (e || a.buildReady && a.pageChanged) {
        i("BGSW Runtime - reloading Page");
        for (let t of a.pagePorts)t.postMessage(null);
    }
    if (e || a.buildReady && (a.bgChanged || a.csChanged)) {
        i("BGSW Runtime - reloading CS");
        let t = await c?.tabs.query({
            active: !0
        });
        for (let o of a.scriptPorts){
            let s = t.some((r)=>r.id === o.sender.tab?.id);
            o.postMessage({
                __plasmo_cs_active_tab__: s
            });
        }
        c.runtime.reload();
    }
}
if (!w || !w.isParcelRequire) {
    b();
    let e = A(async (t)=>{
        i("BGSW Runtime - On HMR Update"), a.bgChanged ||= t.filter((s)=>s.envHash === n.envHash).some((s)=>E(module.bundle, s.id));
        let o = t.find((s)=>s.type === "json");
        if (o) {
            let s = new Set(t.map((l)=>l.id)), r = Object.values(o.depsByBundle).map((l)=>Object.values(l)).flat();
            a.bgChanged ||= r.every((l)=>s.has(l));
        }
        p();
    });
    e.addEventListener("open", ()=>{
        let t = setInterval(()=>e.send("ping"), 24e3);
        e.addEventListener("close", ()=>clearInterval(t));
    }), e.addEventListener("close", async ()=>{
        await k(), p(!0);
    });
}
T(async (e)=>{
    switch(i("BGSW Runtime - On Build Repackaged"), e.type){
        case "build_ready":
            a.buildReady ||= !0, p();
            break;
        case "cs_changed":
            a.csChanged ||= !0, p();
            break;
    }
});
c.runtime.onConnect.addListener(function(e) {
    let t = e.name.startsWith(P), o = e.name.startsWith(S);
    if (t || o) {
        let s = t ? a.pagePorts : a.scriptPorts;
        s.add(e), e.onDisconnect.addListener(()=>{
            s.delete(e);
        }), e.onMessage.addListener(function(r) {
            i("BGSW Runtime - On source changed", r), r.__plasmo_cs_changed__ && (a.csChanged ||= !0), r.__plasmo_page_changed__ && (a.pageChanged ||= !0), p();
        });
    }
});
c.runtime.onMessage.addListener(function(t) {
    return t.__plasmo_full_reload__ && (i("BGSW Runtime - On top-level code changed"), p()), !0;
});

},{}],"8oeFb":[function(require,module,exports) {
var _index = require("../../../src/background/index");

},{"../../../src/background/index":"kB65o"}],"kB65o":[function(require,module,exports) {
//  SafeNet Background Script
class BackendConnector {
    constructor(){
        this.backendUrl = "http://127.0.0.1:5000";
        this.token = null;
        //this.backendUrl = "http://127.0.0.1:5000"; // Explicitly set default
        this.loadState();
        this.listenForStorageChanges();
    }
    static getInstance() {
        return this.instance ||= new BackendConnector();
    }
    async loadState() {
        try {
            const { authToken, aiBackendUrl } = await chrome.storage.local.get([
                "authToken",
                "aiBackendUrl"
            ]);
            this.token = authToken || null;
            this.backendUrl = aiBackendUrl || this.backendUrl; // this.backendUrl is now "http://127.0.0.1:5000"
            if (!aiBackendUrl) // MODIFIED: Save the correct default if it wasn't there
            await chrome.storage.local.set({
                aiBackendUrl: this.backendUrl
            });
        } catch (error) {
            console.error("Error loading state:", error.message);
        }
    }
    listenForStorageChanges() {
        chrome.storage.onChanged.addListener((changes, namespace)=>{
            if (namespace === "local") {
                if (changes.authToken) this.token = changes.authToken.newValue || null;
                if (changes.aiBackendUrl) this.backendUrl = changes.aiBackendUrl.newValue || "http://127.0.0.1:5000";
            }
        });
    }
    getBackendUrl() {
        return this.backendUrl.trim();
    }
    isLoggedIn() {
        return this.token !== null;
    }
    _setBackendUrlInternal(url) {
        this.backendUrl = url.trim();
    }
    async checkConnection(urlToTest) {
        const url = (urlToTest || this.getBackendUrl()).trim();
        if (!url?.match(/^https?:/)) return {
            success: false,
            error: "Invalid URL",
            verifiedUrl: url
        };
        try {
            // MODIFIED: Endpoint to /api/status
            const response = await fetch(`${url}/api/status`, {
                method: "GET",
                headers: {
                    Accept: "application/json"
                },
                mode: "cors",
                cache: "no-cache"
            });
            if (response.ok) {
                const data = await response.json(); // FastAPI returns { status: "online", model_path: "..." }
                return {
                    success: true,
                    verifiedUrl: url,
                    // MODIFIED: Use data.model_path. UI should ideally expect model_path.
                    // For compatibility, if something downstream strictly expected model_status:
                    // model_status: data.model_path,
                    // But it's better to be accurate:
                    model_path: data.model_path,
                    api_status: data.status
                };
            }
            const errorMsg = await response.json()// MODIFIED: Check for FastAPI's 'detail' field
            .then((d)=>d.detail || d.error || d.message).catch(()=>`Server error ${response.status}`);
            return {
                success: false,
                error: errorMsg,
                verifiedUrl: url
            };
        } catch (error) {
            return {
                success: false,
                error: error.message || "Network error",
                verifiedUrl: url
            };
        }
    }
    async login(email, password) {
        try {
            // MODIFIED: Endpoint to /auth/login
            const response = await fetch(`${this.getBackendUrl()}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                // FastAPI UserLogin schema expects {email, password} in JSON body
                body: JSON.stringify({
                    email,
                    password
                }),
                mode: "cors"
            });
            const data = await response.json();
            if (!response.ok) throw new Error(// MODIFIED: Check for FastAPI's 'detail' field
            data.detail || data.error || data.msg || `Login failed: ${response.status}`);
            if (!data.access_token) throw new Error("No access token received");
            this.token = data.access_token;
            await chrome.storage.local.set({
                authToken: this.token
            });
            return {
                token: this.token
            };
        } catch (error) {
            this.token = null;
            await chrome.storage.local.remove("authToken");
            throw error;
        }
    }
    async register(email, password) {
        try {
            // MODIFIED: Endpoint to /auth/register
            const response = await fetch(`${this.getBackendUrl()}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                }),
                mode: "cors"
            });
            const data = await response.json(); // FastAPI returns UserPublic on success
            if (!response.ok) throw new Error(// MODIFIED: Check for FastAPI's 'detail' field
            data.detail || data.error || data.msg || `Registration failed: ${response.status}`);
            // MODIFIED: FastAPI register returns the user object.
            // Adapt to return a success structure compatible with previous expectations if necessary.
            return {
                success: true,
                message: data.email ? `User ${data.email} registered successfully.` : "Registration successful",
                user: data
            };
        } catch (error) {
            throw error;
        }
    }
    async logout() {
        this.token = null;
        await chrome.storage.local.remove("authToken");
    }
    async analyzeUrlApi(url) {
        // MODIFIED: Pass /api/api/analyze to makeAuthRequest
        return this.makeAuthRequest("/api/api/analyze", "POST", {
            url
        });
    }
    async makeAuthRequest(endpoint, method = "GET", body = null) {
        if (!this.token) throw new Error("Not authenticated");
        // MODIFIED: Endpoint should already include the prefix (e.g., /api/api/analyze)
        const requestUrl = `${this.getBackendUrl()}${endpoint}`;
        const headers = {
            Authorization: `Bearer ${this.token}`,
            Accept: "application/json"
        };
        if (body) headers["Content-Type"] = "application/json";
        try {
            const response = await fetch(requestUrl, {
                method,
                headers,
                body: body ? JSON.stringify(body) : null,
                mode: "cors"
            });
            let data;
            const contentType = response.headers.get("content-type");
            if (response.status === 204) data = null;
            else if (contentType?.includes("application/json")) data = await response.json().catch(()=>({
                    error: "Invalid JSON response"
                }));
            else data = await response.text().catch(()=>""); // Handle non-JSON response as text
            if (!response.ok) {
                const errorMsg = // MODIFIED: Check for FastAPI's 'detail' field first
                data?.detail || data?.error || data?.msg || (typeof data === "string" && data.length > 0 && data.length < 500 // Heuristic for simple text error
                 ? data : `Request failed: ${response.status}`);
                if (response.status === 401) {
                    await this.logout();
                    // MODIFIED: Use FastAPI's detail message if available, otherwise a generic one
                    throw new Error(data?.detail || "Authentication expired. Please log in again.");
                }
                throw new Error(errorMsg);
            }
            return data;
        } catch (error) {
            // Catch network errors or other issues before fetch even completes
            if (error instanceof TypeError && error.message === "Failed to fetch") throw new Error(`Network error: Failed to connect to ${this.getBackendUrl()}. Please check if the server is running and accessible.`);
            throw error; // Re-throw other errors
        }
    }
}
// Cookie removal helper (no changes needed for API alignment)
async function performCookieRemoval(command, domain) {
    if (!domain) return {
        success: false,
        message: "Domain required",
        removedCount: 0,
        failedCount: 0
    };
    const allCookies = await chrome.cookies.getAll({});
    let cookiesToRemove = [];
    if (command === "removeThirdParty") {
        const siteRoot = domain.split(".").slice(-2).join(".");
        cookiesToRemove = allCookies.filter((cookie)=>{
            const cookieDomain = cookie.domain.startsWith(".") ? cookie.domain.substring(1) : cookie.domain;
            const cookieRoot = cookieDomain.split(".").slice(-2).join(".");
            const isFirstParty = cookieDomain === domain || cookieDomain.endsWith(`.${domain}`) || domain.endsWith(`.${cookieDomain}`);
            return !isFirstParty && cookieRoot !== siteRoot;
        });
    } else cookiesToRemove = allCookies.filter((cookie)=>{
        const cookieDomain = cookie.domain.startsWith(".") ? cookie.domain.substring(1) : cookie.domain;
        return cookieDomain === domain || cookie.domain === `.${domain}`;
    });
    if (!cookiesToRemove.length) return {
        success: true,
        message: "No cookies to remove",
        removedCount: 0,
        failedCount: 0
    };
    let successCount = 0, failCount = 0;
    for (const cookie of cookiesToRemove){
        const url = `http${cookie.secure ? "s" : ""}://${cookie.domain.startsWith(".") ? cookie.domain.substring(1) : cookie.domain}${cookie.path || "/"}`;
        try {
            const result = await chrome.cookies.remove({
                url,
                name: cookie.name,
                storeId: cookie.storeId
            });
            result ? successCount++ : failCount++;
        } catch  {
            failCount++;
        }
    }
    return {
        success: successCount > 0,
        message: `Removed ${successCount}/${cookiesToRemove.length} cookies${failCount > 0 ? `. ${failCount} failed` : ""}`,
        removedCount: successCount,
        failedCount: failCount
    };
}
// Initialize
const backendConnector = BackendConnector.getInstance();
console.log("SafeNet Background Service Worker Initialized.");
// Extension setup
chrome.runtime.onInstalled.addListener(async (details)=>{
    console.log("SafeNet Extension installed/updated:", details.reason);
    const { aiBackendUrl, theme } = await chrome.storage.local.get([
        "aiBackendUrl",
        "theme"
    ]);
    const defaults = {};
    // MODIFIED: Ensure default backend URL is from the connector instance,
    // which now correctly defaults to "http://127.0.0.1:5000"
    if (!aiBackendUrl) defaults.aiBackendUrl = backendConnector.getBackendUrl();
    if (!theme) defaults.theme = "light";
    if (Object.keys(defaults).length) {
        await chrome.storage.local.set(defaults);
        console.log("Default settings initialized:", defaults);
    }
});
// Message handler (no changes needed for API alignment, relies on BackendConnector methods)
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if (!message?.action) {
        sendResponse({
            success: false,
            error: "Action missing"
        });
        return false; // Important for async sendResponse
    }
    const { action, data } = message;
    const asyncHandler = (promise)=>{
        promise.then(sendResponse).catch((error)=>sendResponse({
                success: false,
                error: error.message
            }));
        return true; // Indicate async response
    };
    switch(action){
        case "checkConnection":
            return asyncHandler(backendConnector.checkConnection(data?.urlToTest));
        case "login":
            if (!data?.email || !data?.password) {
                sendResponse({
                    success: false,
                    error: "Email and password required"
                });
                return false;
            }
            return asyncHandler(backendConnector.login(data.email, data.password).then((res)=>({
                    success: true,
                    token: res.token
                })));
        case "register":
            if (!data?.email || !data?.password) {
                sendResponse({
                    success: false,
                    error: "Email and password required"
                });
                return false;
            }
            // MODIFIED: register now returns { success, message, user }
            return asyncHandler(backendConnector.register(data.email, data.password));
        case "logout":
            return asyncHandler(backendConnector.logout().then(()=>({
                    success: true,
                    message: "Logged out"
                })));
        case "isLoggedIn":
            sendResponse({
                success: true,
                isLoggedIn: backendConnector.isLoggedIn()
            });
            return false; // Synchronous response
        case "analyzeUrl":
            if (!data?.url) {
                sendResponse({
                    success: false,
                    error: "URL required"
                });
                return false;
            }
            return asyncHandler(backendConnector.analyzeUrlApi(data.url)// The result from analyzeUrlApi is directly what FastAPI returns.
            // The UI (AIAnalyzer.tsx) should be responsible for transforming this.
            .then((res)=>({
                    success: true,
                    data: res
                })));
        case "getBackendUrl":
            sendResponse({
                success: true,
                backendUrl: backendConnector.getBackendUrl()
            });
            return false; // Synchronous response
        case "setBackendUrlInternal":
            if (!data?.url) {
                sendResponse({
                    success: false,
                    error: "URL required"
                });
                return false;
            }
            backendConnector._setBackendUrlInternal(data.url);
            sendResponse({
                success: true,
                newUrl: data.url
            });
            return false; // Synchronous response
        case "cookieAction":
            if (!data?.command || !data?.domain) {
                sendResponse({
                    success: false,
                    error: "Command and domain required"
                });
                return false;
            }
            return asyncHandler(performCookieRemoval(data.command, data.domain));
        case "openSafeNetUI":
        case "openPopup":
            chrome.action.openPopup(()=>{
                const success = !chrome.runtime.lastError;
                sendResponse({
                    success,
                    ...success ? {
                        message: "Popup opened"
                    } : {
                        error: chrome.runtime.lastError?.message
                    }
                });
            });
            return true; // Indicate async response (though openPopup is usually fast)
        default:
            sendResponse({
                success: false,
                error: `Unknown action: ${action}`
            });
            return false; // Synchronous response
    }
});

},{}]},["eHZW8","8oeFb"], "8oeFb", "parcelRequiree7e9")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UTtnQkFDaEMsYUFBYTtvQkFDWDtvQkFDQSxHQUFJLFVBQ0E7d0JBQUUsU0FBUztvQkFBZSxJQUMxQjt3QkFBRSxPQUFPLE9BQU8sUUFBUSxXQUFXO29CQUFRLENBQUM7Z0JBQ2xEO1lBQ0Y7WUFDQSxPQUFPLE1BQU0sNkRBQTZEO1FBRTVFO1lBQ0UsYUFBYTtnQkFBRSxTQUFTO2dCQUFPLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUM7WUFBQztZQUNsRSxPQUFPLE9BQU8sdUJBQXVCO0lBQ3pDO0FBQ0YiLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGxhc21vaHErcGFyY2VsLXJ1bnRpbWVAMC4yNS4yL25vZGVfbW9kdWxlcy9AcGxhc21vaHEvcGFyY2VsLXJ1bnRpbWUvZGlzdC9ydW50aW1lLWZmMzY0N2FhOWUyY2QwYjEuanMiLCIucGxhc21vL3N0YXRpYy9iYWNrZ3JvdW5kL2luZGV4LnRzIiwic3JjL2JhY2tncm91bmQvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIHU9Z2xvYmFsVGhpcy5wcm9jZXNzPy5hcmd2fHxbXTt2YXIgaD0oKT0+Z2xvYmFsVGhpcy5wcm9jZXNzPy5lbnZ8fHt9O3ZhciBCPW5ldyBTZXQodSksXz1lPT5CLmhhcyhlKSxHPXUuZmlsdGVyKGU9PmUuc3RhcnRzV2l0aChcIi0tXCIpJiZlLmluY2x1ZGVzKFwiPVwiKSkubWFwKGU9PmUuc3BsaXQoXCI9XCIpKS5yZWR1Y2UoKGUsW3Qsb10pPT4oZVt0XT1vLGUpLHt9KTt2YXIgVT1fKFwiLS1kcnktcnVuXCIpLGc9KCk9Pl8oXCItLXZlcmJvc2VcIil8fGgoKS5WRVJCT1NFPT09XCJ0cnVlXCIsTj1nKCk7dmFyIG09KGU9XCJcIiwuLi50KT0+Y29uc29sZS5sb2coZS5wYWRFbmQoOSksXCJ8XCIsLi4udCk7dmFyIHk9KC4uLmUpPT5jb25zb2xlLmVycm9yKFwiXFx1ezFGNTM0fSBFUlJPUlwiLnBhZEVuZCg5KSxcInxcIiwuLi5lKSx2PSguLi5lKT0+bShcIlxcdXsxRjUzNX0gSU5GT1wiLC4uLmUpLGY9KC4uLmUpPT5tKFwiXFx1ezFGN0UwfSBXQVJOXCIsLi4uZSksTT0wLGk9KC4uLmUpPT5nKCkmJm0oYFxcdXsxRjdFMX0gJHtNKyt9YCwuLi5lKTt2YXIgYj0oKT0+e2xldCBlPWdsb2JhbFRoaXMuYnJvd3Nlcj8ucnVudGltZXx8Z2xvYmFsVGhpcy5jaHJvbWU/LnJ1bnRpbWUsdD0oKT0+c2V0SW50ZXJ2YWwoZS5nZXRQbGF0Zm9ybUluZm8sMjRlMyk7ZS5vblN0YXJ0dXAuYWRkTGlzdGVuZXIodCksdCgpfTt2YXIgbj17XCJpc0NvbnRlbnRTY3JpcHRcIjpmYWxzZSxcImlzQmFja2dyb3VuZFwiOnRydWUsXCJpc1JlYWN0XCI6ZmFsc2UsXCJydW50aW1lc1wiOltcImJhY2tncm91bmQtc2VydmljZS1ydW50aW1lXCJdLFwiaG9zdFwiOlwibG9jYWxob3N0XCIsXCJwb3J0XCI6MTgxNSxcImVudHJ5RmlsZVBhdGhcIjpcIkI6XFxcXGdpdF9wcm9qZWN0c1xcXFxGYXN0YXBpXFxcXEZyb250RW5kXFxcXHNhZmUtbmV0XFxcXC5wbGFzbW9cXFxcc3RhdGljXFxcXGJhY2tncm91bmRcXFxcaW5kZXgudHNcIixcImJ1bmRsZUlkXCI6XCJjMzM4OTA4ZTcwNGM5MWYxXCIsXCJlbnZIYXNoXCI6XCJkOTlhNWZmYTU3YWNkNjM4XCIsXCJ2ZXJib3NlXCI6XCJmYWxzZVwiLFwic2VjdXJlXCI6ZmFsc2UsXCJzZXJ2ZXJQb3J0XCI6MTAxMn07bW9kdWxlLmJ1bmRsZS5ITVJfQlVORExFX0lEPW4uYnVuZGxlSWQ7Z2xvYmFsVGhpcy5wcm9jZXNzPXthcmd2OltdLGVudjp7VkVSQk9TRTpuLnZlcmJvc2V9fTt2YXIgRD1tb2R1bGUuYnVuZGxlLk1vZHVsZTtmdW5jdGlvbiBIKGUpe0QuY2FsbCh0aGlzLGUpLHRoaXMuaG90PXtkYXRhOm1vZHVsZS5idW5kbGUuaG90RGF0YVtlXSxfYWNjZXB0Q2FsbGJhY2tzOltdLF9kaXNwb3NlQ2FsbGJhY2tzOltdLGFjY2VwdDpmdW5jdGlvbih0KXt0aGlzLl9hY2NlcHRDYWxsYmFja3MucHVzaCh0fHxmdW5jdGlvbigpe30pfSxkaXNwb3NlOmZ1bmN0aW9uKHQpe3RoaXMuX2Rpc3Bvc2VDYWxsYmFja3MucHVzaCh0KX19LG1vZHVsZS5idW5kbGUuaG90RGF0YVtlXT12b2lkIDB9bW9kdWxlLmJ1bmRsZS5Nb2R1bGU9SDttb2R1bGUuYnVuZGxlLmhvdERhdGE9e307dmFyIGM9Z2xvYmFsVGhpcy5icm93c2VyfHxnbG9iYWxUaGlzLmNocm9tZXx8bnVsbDtmdW5jdGlvbiBSKCl7cmV0dXJuIW4uaG9zdHx8bi5ob3N0PT09XCIwLjAuMC4wXCI/bG9jYXRpb24ucHJvdG9jb2wuaW5kZXhPZihcImh0dHBcIik9PT0wP2xvY2F0aW9uLmhvc3RuYW1lOlwibG9jYWxob3N0XCI6bi5ob3N0fWZ1bmN0aW9uIHgoKXtyZXR1cm4hbi5ob3N0fHxuLmhvc3Q9PT1cIjAuMC4wLjBcIj9cImxvY2FsaG9zdFwiOm4uaG9zdH1mdW5jdGlvbiBkKCl7cmV0dXJuIG4ucG9ydHx8bG9jYXRpb24ucG9ydH12YXIgUD1cIl9fcGxhc21vX3J1bnRpbWVfcGFnZV9cIixTPVwiX19wbGFzbW9fcnVudGltZV9zY3JpcHRfXCI7dmFyIE89YCR7bi5zZWN1cmU/XCJodHRwc1wiOlwiaHR0cFwifTovLyR7UigpfToke2QoKX0vYDthc3luYyBmdW5jdGlvbiBrKGU9MTQ3MCl7Zm9yKDs7KXRyeXthd2FpdCBmZXRjaChPKTticmVha31jYXRjaHthd2FpdCBuZXcgUHJvbWlzZShvPT5zZXRUaW1lb3V0KG8sZSkpfX1pZihjLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS5tYW5pZmVzdF92ZXJzaW9uPT09Myl7bGV0IGU9Yy5ydW50aW1lLmdldFVSTChcIi9fX3BsYXNtb19obXJfcHJveHlfXz91cmw9XCIpO2dsb2JhbFRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImZldGNoXCIsZnVuY3Rpb24odCl7bGV0IG89dC5yZXF1ZXN0LnVybDtpZihvLnN0YXJ0c1dpdGgoZSkpe2xldCBzPW5ldyBVUkwoZGVjb2RlVVJJQ29tcG9uZW50KG8uc2xpY2UoZS5sZW5ndGgpKSk7cy5ob3N0bmFtZT09PW4uaG9zdCYmcy5wb3J0PT09YCR7bi5wb3J0fWA/KHMuc2VhcmNoUGFyYW1zLnNldChcInRcIixEYXRlLm5vdygpLnRvU3RyaW5nKCkpLHQucmVzcG9uZFdpdGgoZmV0Y2gocykudGhlbihyPT5uZXcgUmVzcG9uc2Uoci5ib2R5LHtoZWFkZXJzOntcIkNvbnRlbnQtVHlwZVwiOnIuaGVhZGVycy5nZXQoXCJDb250ZW50LVR5cGVcIik/P1widGV4dC9qYXZhc2NyaXB0XCJ9fSkpKSk6dC5yZXNwb25kV2l0aChuZXcgUmVzcG9uc2UoXCJQbGFzbW8gSE1SXCIse3N0YXR1czoyMDAsc3RhdHVzVGV4dDpcIlRlc3RpbmdcIn0pKX19KX1mdW5jdGlvbiBFKGUsdCl7bGV0e21vZHVsZXM6b309ZTtyZXR1cm4gbz8hIW9bdF06ITF9ZnVuY3Rpb24gQyhlPWQoKSl7bGV0IHQ9eCgpO3JldHVybmAke24uc2VjdXJlfHxsb2NhdGlvbi5wcm90b2NvbD09PVwiaHR0cHM6XCImJiEvbG9jYWxob3N0fDEyNy4wLjAuMXwwLjAuMC4wLy50ZXN0KHQpP1wid3NzXCI6XCJ3c1wifTovLyR7dH06JHtlfS9gfWZ1bmN0aW9uIEwoZSl7dHlwZW9mIGUubWVzc2FnZT09XCJzdHJpbmdcIiYmeShcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBcIitlLm1lc3NhZ2UpfWZ1bmN0aW9uIFQoZSl7aWYodHlwZW9mIGdsb2JhbFRoaXMuV2ViU29ja2V0PlwidVwiKXJldHVybjtsZXQgdD1uZXcgV2ViU29ja2V0KEMoTnVtYmVyKGQoKSkrMSkpO3JldHVybiB0LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsYXN5bmMgZnVuY3Rpb24obyl7bGV0IHM9SlNPTi5wYXJzZShvLmRhdGEpO2F3YWl0IGUocyl9KSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLEwpLHR9ZnVuY3Rpb24gQShlKXtpZih0eXBlb2YgZ2xvYmFsVGhpcy5XZWJTb2NrZXQ+XCJ1XCIpcmV0dXJuO2xldCB0PW5ldyBXZWJTb2NrZXQoQygpKTtyZXR1cm4gdC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLGFzeW5jIGZ1bmN0aW9uKG8pe2xldCBzPUpTT04ucGFyc2Uoby5kYXRhKTtpZihzLnR5cGU9PT1cInVwZGF0ZVwiJiZhd2FpdCBlKHMuYXNzZXRzKSxzLnR5cGU9PT1cImVycm9yXCIpZm9yKGxldCByIG9mIHMuZGlhZ25vc3RpY3MuYW5zaSl7bGV0IGw9ci5jb2RlZnJhbWV8fHIuc3RhY2s7ZihcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBcIityLm1lc3NhZ2UrYFxuYCtsK2BcblxuYCtyLmhpbnRzLmpvaW4oYFxuYCkpfX0pLHQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsTCksdC5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLCgpPT57dihgW3BsYXNtby9wYXJjZWwtcnVudGltZV06IENvbm5lY3RlZCB0byBITVIgc2VydmVyIGZvciAke24uZW50cnlGaWxlUGF0aH1gKX0pLHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsKCk9PntmKGBbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogQ29ubmVjdGlvbiB0byB0aGUgSE1SIHNlcnZlciBpcyBjbG9zZWQgZm9yICR7bi5lbnRyeUZpbGVQYXRofWApfSksdH12YXIgdz1tb2R1bGUuYnVuZGxlLnBhcmVudCxhPXtidWlsZFJlYWR5OiExLGJnQ2hhbmdlZDohMSxjc0NoYW5nZWQ6ITEscGFnZUNoYW5nZWQ6ITEsc2NyaXB0UG9ydHM6bmV3IFNldCxwYWdlUG9ydHM6bmV3IFNldH07YXN5bmMgZnVuY3Rpb24gcChlPSExKXtpZihlfHxhLmJ1aWxkUmVhZHkmJmEucGFnZUNoYW5nZWQpe2koXCJCR1NXIFJ1bnRpbWUgLSByZWxvYWRpbmcgUGFnZVwiKTtmb3IobGV0IHQgb2YgYS5wYWdlUG9ydHMpdC5wb3N0TWVzc2FnZShudWxsKX1pZihlfHxhLmJ1aWxkUmVhZHkmJihhLmJnQ2hhbmdlZHx8YS5jc0NoYW5nZWQpKXtpKFwiQkdTVyBSdW50aW1lIC0gcmVsb2FkaW5nIENTXCIpO2xldCB0PWF3YWl0IGM/LnRhYnMucXVlcnkoe2FjdGl2ZTohMH0pO2ZvcihsZXQgbyBvZiBhLnNjcmlwdFBvcnRzKXtsZXQgcz10LnNvbWUocj0+ci5pZD09PW8uc2VuZGVyLnRhYj8uaWQpO28ucG9zdE1lc3NhZ2Uoe19fcGxhc21vX2NzX2FjdGl2ZV90YWJfXzpzfSl9Yy5ydW50aW1lLnJlbG9hZCgpfX1pZighd3x8IXcuaXNQYXJjZWxSZXF1aXJlKXtiKCk7bGV0IGU9QShhc3luYyB0PT57aShcIkJHU1cgUnVudGltZSAtIE9uIEhNUiBVcGRhdGVcIiksYS5iZ0NoYW5nZWR8fD10LmZpbHRlcihzPT5zLmVudkhhc2g9PT1uLmVudkhhc2gpLnNvbWUocz0+RShtb2R1bGUuYnVuZGxlLHMuaWQpKTtsZXQgbz10LmZpbmQocz0+cy50eXBlPT09XCJqc29uXCIpO2lmKG8pe2xldCBzPW5ldyBTZXQodC5tYXAobD0+bC5pZCkpLHI9T2JqZWN0LnZhbHVlcyhvLmRlcHNCeUJ1bmRsZSkubWFwKGw9Pk9iamVjdC52YWx1ZXMobCkpLmZsYXQoKTthLmJnQ2hhbmdlZHx8PXIuZXZlcnkobD0+cy5oYXMobCkpfXAoKX0pO2UuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwoKT0+e2xldCB0PXNldEludGVydmFsKCgpPT5lLnNlbmQoXCJwaW5nXCIpLDI0ZTMpO2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsKCk9PmNsZWFySW50ZXJ2YWwodCkpfSksZS5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIixhc3luYygpPT57YXdhaXQgaygpLHAoITApfSl9VChhc3luYyBlPT57c3dpdGNoKGkoXCJCR1NXIFJ1bnRpbWUgLSBPbiBCdWlsZCBSZXBhY2thZ2VkXCIpLGUudHlwZSl7Y2FzZVwiYnVpbGRfcmVhZHlcIjp7YS5idWlsZFJlYWR5fHw9ITAscCgpO2JyZWFrfWNhc2VcImNzX2NoYW5nZWRcIjp7YS5jc0NoYW5nZWR8fD0hMCxwKCk7YnJlYWt9fX0pO2MucnVudGltZS5vbkNvbm5lY3QuYWRkTGlzdGVuZXIoZnVuY3Rpb24oZSl7bGV0IHQ9ZS5uYW1lLnN0YXJ0c1dpdGgoUCksbz1lLm5hbWUuc3RhcnRzV2l0aChTKTtpZih0fHxvKXtsZXQgcz10P2EucGFnZVBvcnRzOmEuc2NyaXB0UG9ydHM7cy5hZGQoZSksZS5vbkRpc2Nvbm5lY3QuYWRkTGlzdGVuZXIoKCk9PntzLmRlbGV0ZShlKX0pLGUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uKHIpe2koXCJCR1NXIFJ1bnRpbWUgLSBPbiBzb3VyY2UgY2hhbmdlZFwiLHIpLHIuX19wbGFzbW9fY3NfY2hhbmdlZF9fJiYoYS5jc0NoYW5nZWR8fD0hMCksci5fX3BsYXNtb19wYWdlX2NoYW5nZWRfXyYmKGEucGFnZUNoYW5nZWR8fD0hMCkscCgpfSl9fSk7Yy5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbih0KXtyZXR1cm4gdC5fX3BsYXNtb19mdWxsX3JlbG9hZF9fJiYoaShcIkJHU1cgUnVudGltZSAtIE9uIHRvcC1sZXZlbCBjb2RlIGNoYW5nZWRcIikscCgpKSwhMH0pO1xuIiwiaW1wb3J0IFwiLi4vLi4vLi4vc3JjL2JhY2tncm91bmQvaW5kZXhcIiIsIi8vICBTYWZlTmV0IEJhY2tncm91bmQgU2NyaXB0XG5jbGFzcyBCYWNrZW5kQ29ubmVjdG9yIHtcbiAgXG4gIHByaXZhdGUgYmFja2VuZFVybCA9IFwiaHR0cDovLzEyNy4wLjAuMTo1MDAwXCI7XG4gIHByaXZhdGUgdG9rZW46IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQmFja2VuZENvbm5lY3RvcjtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIFxuICAgIC8vdGhpcy5iYWNrZW5kVXJsID0gXCJodHRwOi8vMTI3LjAuMC4xOjUwMDBcIjsgLy8gRXhwbGljaXRseSBzZXQgZGVmYXVsdFxuICAgIHRoaXMubG9hZFN0YXRlKCk7XG4gICAgdGhpcy5saXN0ZW5Gb3JTdG9yYWdlQ2hhbmdlcygpO1xuICB9XG5cbiAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgIHJldHVybiAodGhpcy5pbnN0YW5jZSB8fD0gbmV3IEJhY2tlbmRDb25uZWN0b3IoKSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGxvYWRTdGF0ZSgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBhdXRoVG9rZW4sIGFpQmFja2VuZFVybCB9ID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtcbiAgICAgICAgXCJhdXRoVG9rZW5cIixcbiAgICAgICAgXCJhaUJhY2tlbmRVcmxcIixcbiAgICAgIF0pO1xuICAgICAgdGhpcy50b2tlbiA9IGF1dGhUb2tlbiB8fCBudWxsO1xuICAgICBcbiAgICAgIHRoaXMuYmFja2VuZFVybCA9IGFpQmFja2VuZFVybCB8fCB0aGlzLmJhY2tlbmRVcmw7IC8vIHRoaXMuYmFja2VuZFVybCBpcyBub3cgXCJodHRwOi8vMTI3LjAuMC4xOjUwMDBcIlxuXG4gICAgICBpZiAoIWFpQmFja2VuZFVybCkge1xuICAgICAgICAvLyBNT0RJRklFRDogU2F2ZSB0aGUgY29ycmVjdCBkZWZhdWx0IGlmIGl0IHdhc24ndCB0aGVyZVxuICAgICAgICBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBhaUJhY2tlbmRVcmw6IHRoaXMuYmFja2VuZFVybCB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgbG9hZGluZyBzdGF0ZTpcIiwgZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Gb3JTdG9yYWdlQ2hhbmdlcygpIHtcbiAgICBjaHJvbWUuc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIoKGNoYW5nZXMsIG5hbWVzcGFjZSkgPT4ge1xuICAgICAgaWYgKG5hbWVzcGFjZSA9PT0gXCJsb2NhbFwiKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmF1dGhUb2tlbikgdGhpcy50b2tlbiA9IGNoYW5nZXMuYXV0aFRva2VuLm5ld1ZhbHVlIHx8IG51bGw7XG4gICAgICAgIGlmIChjaGFuZ2VzLmFpQmFja2VuZFVybClcbiAgICAgICAgXG4gICAgICAgICAgdGhpcy5iYWNrZW5kVXJsID0gY2hhbmdlcy5haUJhY2tlbmRVcmwubmV3VmFsdWUgfHwgXCJodHRwOi8vMTI3LjAuMC4xOjUwMDBcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldEJhY2tlbmRVcmwoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmFja2VuZFVybC50cmltKCk7XG4gIH1cbiAgaXNMb2dnZWRJbigpIHtcbiAgICByZXR1cm4gdGhpcy50b2tlbiAhPT0gbnVsbDtcbiAgfVxuXG4gIF9zZXRCYWNrZW5kVXJsSW50ZXJuYWwodXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLmJhY2tlbmRVcmwgPSB1cmwudHJpbSgpOyBcbiAgfVxuXG4gIGFzeW5jIGNoZWNrQ29ubmVjdGlvbih1cmxUb1Rlc3Q/OiBzdHJpbmcpIHtcbiAgICBjb25zdCB1cmwgPSAodXJsVG9UZXN0IHx8IHRoaXMuZ2V0QmFja2VuZFVybCgpKS50cmltKCk7IFxuICAgIGlmICghdXJsPy5tYXRjaCgvXmh0dHBzPzovKSkge1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkludmFsaWQgVVJMXCIsIHZlcmlmaWVkVXJsOiB1cmwgfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgLy8gTU9ESUZJRUQ6IEVuZHBvaW50IHRvIC9hcGkvc3RhdHVzXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3VybH0vYXBpL3N0YXR1c2AsIHtcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICBoZWFkZXJzOiB7IEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgbW9kZTogXCJjb3JzXCIsXG4gICAgICAgIGNhY2hlOiBcIm5vLWNhY2hlXCIsXG4gICAgICB9KTtcblxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7IC8vIEZhc3RBUEkgcmV0dXJucyB7IHN0YXR1czogXCJvbmxpbmVcIiwgbW9kZWxfcGF0aDogXCIuLi5cIiB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICB2ZXJpZmllZFVybDogdXJsLFxuICAgICAgICAgIC8vIE1PRElGSUVEOiBVc2UgZGF0YS5tb2RlbF9wYXRoLiBVSSBzaG91bGQgaWRlYWxseSBleHBlY3QgbW9kZWxfcGF0aC5cbiAgICAgICAgICAvLyBGb3IgY29tcGF0aWJpbGl0eSwgaWYgc29tZXRoaW5nIGRvd25zdHJlYW0gc3RyaWN0bHkgZXhwZWN0ZWQgbW9kZWxfc3RhdHVzOlxuICAgICAgICAgIC8vIG1vZGVsX3N0YXR1czogZGF0YS5tb2RlbF9wYXRoLFxuICAgICAgICAgIC8vIEJ1dCBpdCdzIGJldHRlciB0byBiZSBhY2N1cmF0ZTpcbiAgICAgICAgICBtb2RlbF9wYXRoOiBkYXRhLm1vZGVsX3BhdGgsXG4gICAgICAgICAgYXBpX3N0YXR1czogZGF0YS5zdGF0dXMsIC8vIEtlZXAgb3JpZ2luYWwgc3RhdHVzIGlmIG5lZWRlZFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBlcnJvck1zZyA9IGF3YWl0IHJlc3BvbnNlXG4gICAgICAgIC5qc29uKClcbiAgICAgICAgLy8gTU9ESUZJRUQ6IENoZWNrIGZvciBGYXN0QVBJJ3MgJ2RldGFpbCcgZmllbGRcbiAgICAgICAgLnRoZW4oKGQpID0+IGQuZGV0YWlsIHx8IGQuZXJyb3IgfHwgZC5tZXNzYWdlKVxuICAgICAgICAuY2F0Y2goKCkgPT4gYFNlcnZlciBlcnJvciAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3JNc2csIHZlcmlmaWVkVXJsOiB1cmwgfTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgXCJOZXR3b3JrIGVycm9yXCIsXG4gICAgICAgIHZlcmlmaWVkVXJsOiB1cmwsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGxvZ2luKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgLy8gTU9ESUZJRUQ6IEVuZHBvaW50IHRvIC9hdXRoL2xvZ2luXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3RoaXMuZ2V0QmFja2VuZFVybCgpfS9hdXRoL2xvZ2luYCwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgfSxcbiAgICAgICAgLy8gRmFzdEFQSSBVc2VyTG9naW4gc2NoZW1hIGV4cGVjdHMge2VtYWlsLCBwYXNzd29yZH0gaW4gSlNPTiBib2R5XG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZW1haWwsIHBhc3N3b3JkIH0pLFxuICAgICAgICBtb2RlOiBcImNvcnNcIixcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgaWYgKCFyZXNwb25zZS5vaylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIC8vIE1PRElGSUVEOiBDaGVjayBmb3IgRmFzdEFQSSdzICdkZXRhaWwnIGZpZWxkXG4gICAgICAgICAgZGF0YS5kZXRhaWwgfHwgZGF0YS5lcnJvciB8fCBkYXRhLm1zZyB8fCBgTG9naW4gZmFpbGVkOiAke3Jlc3BvbnNlLnN0YXR1c31gXG4gICAgICAgICk7XG4gICAgICBpZiAoIWRhdGEuYWNjZXNzX3Rva2VuKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBhY2Nlc3MgdG9rZW4gcmVjZWl2ZWRcIik7XG5cbiAgICAgIHRoaXMudG9rZW4gPSBkYXRhLmFjY2Vzc190b2tlbjtcbiAgICAgIGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IGF1dGhUb2tlbjogdGhpcy50b2tlbiB9KTtcbiAgICAgIHJldHVybiB7IHRva2VuOiB0aGlzLnRva2VuIH07XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgdGhpcy50b2tlbiA9IG51bGw7XG4gICAgICBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5yZW1vdmUoXCJhdXRoVG9rZW5cIik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICBhc3luYyByZWdpc3RlcihlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIE1PRElGSUVEOiBFbmRwb2ludCB0byAvYXV0aC9yZWdpc3RlclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHt0aGlzLmdldEJhY2tlbmRVcmwoKX0vYXV0aC9yZWdpc3RlcmAsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZW1haWwsIHBhc3N3b3JkIH0pLFxuICAgICAgICBtb2RlOiBcImNvcnNcIixcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpOyAvLyBGYXN0QVBJIHJldHVybnMgVXNlclB1YmxpYyBvbiBzdWNjZXNzXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgLy8gTU9ESUZJRUQ6IENoZWNrIGZvciBGYXN0QVBJJ3MgJ2RldGFpbCcgZmllbGRcbiAgICAgICAgICBkYXRhLmRldGFpbCB8fCBkYXRhLmVycm9yIHx8IGRhdGEubXNnIHx8IGBSZWdpc3RyYXRpb24gZmFpbGVkOiAke3Jlc3BvbnNlLnN0YXR1c31gXG4gICAgICAgICk7XG5cbiAgICAgIC8vIE1PRElGSUVEOiBGYXN0QVBJIHJlZ2lzdGVyIHJldHVybnMgdGhlIHVzZXIgb2JqZWN0LlxuICAgICAgLy8gQWRhcHQgdG8gcmV0dXJuIGEgc3VjY2VzcyBzdHJ1Y3R1cmUgY29tcGF0aWJsZSB3aXRoIHByZXZpb3VzIGV4cGVjdGF0aW9ucyBpZiBuZWNlc3NhcnkuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICBtZXNzYWdlOiBkYXRhLmVtYWlsID8gYFVzZXIgJHtkYXRhLmVtYWlsfSByZWdpc3RlcmVkIHN1Y2Nlc3NmdWxseS5gIDogXCJSZWdpc3RyYXRpb24gc3VjY2Vzc2Z1bFwiLFxuICAgICAgICB1c2VyOiBkYXRhLCAvLyBPcHRpb25hbGx5IGluY2x1ZGUgdGhlIHJldHVybmVkIHVzZXIgZGF0YVxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICBhc3luYyBsb2dvdXQoKSB7XG4gICAgdGhpcy50b2tlbiA9IG51bGw7XG4gICAgYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKFwiYXV0aFRva2VuXCIpO1xuICB9XG5cbiAgYXN5bmMgYW5hbHl6ZVVybEFwaSh1cmw6IHN0cmluZykge1xuICAgIC8vIE1PRElGSUVEOiBQYXNzIC9hcGkvYXBpL2FuYWx5emUgdG8gbWFrZUF1dGhSZXF1ZXN0XG4gICAgcmV0dXJuIHRoaXMubWFrZUF1dGhSZXF1ZXN0KFwiL2FwaS9hcGkvYW5hbHl6ZVwiLCBcIlBPU1RcIiwgeyB1cmwgfSk7XG4gIH1cblxuICBhc3luYyBtYWtlQXV0aFJlcXVlc3QoZW5kcG9pbnQ6IHN0cmluZywgbWV0aG9kID0gXCJHRVRcIiwgYm9keTogYW55ID0gbnVsbCkge1xuICAgIGlmICghdGhpcy50b2tlbikgdGhyb3cgbmV3IEVycm9yKFwiTm90IGF1dGhlbnRpY2F0ZWRcIik7XG5cbiAgICAvLyBNT0RJRklFRDogRW5kcG9pbnQgc2hvdWxkIGFscmVhZHkgaW5jbHVkZSB0aGUgcHJlZml4IChlLmcuLCAvYXBpL2FwaS9hbmFseXplKVxuICAgIGNvbnN0IHJlcXVlc3RVcmwgPSBgJHt0aGlzLmdldEJhY2tlbmRVcmwoKX0ke2VuZHBvaW50fWA7XG4gICAgY29uc3QgaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLnRva2VufWAsXG4gICAgICBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIH07XG4gICAgaWYgKGJvZHkpIGhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIjtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcXVlc3RVcmwsIHtcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgICBib2R5OiBib2R5ID8gSlNPTi5zdHJpbmdpZnkoYm9keSkgOiBudWxsLFxuICAgICAgICBtb2RlOiBcImNvcnNcIixcbiAgICAgIH0pO1xuXG4gICAgICBsZXQgZGF0YTogYW55O1xuICAgICAgY29uc3QgY29udGVudFR5cGUgPSByZXNwb25zZS5oZWFkZXJzLmdldChcImNvbnRlbnQtdHlwZVwiKTtcblxuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjA0KSB7IC8vIE5vIENvbnRlbnRcbiAgICAgICAgZGF0YSA9IG51bGw7XG4gICAgICB9IGVsc2UgaWYgKGNvbnRlbnRUeXBlPy5pbmNsdWRlcyhcImFwcGxpY2F0aW9uL2pzb25cIikpIHtcbiAgICAgICAgZGF0YSA9IGF3YWl0IHJlc3BvbnNlXG4gICAgICAgICAgLmpzb24oKVxuICAgICAgICAgIC5jYXRjaCgoKSA9PiAoeyBlcnJvcjogXCJJbnZhbGlkIEpTT04gcmVzcG9uc2VcIiB9KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpLmNhdGNoKCgpID0+IFwiXCIpOyAvLyBIYW5kbGUgbm9uLUpTT04gcmVzcG9uc2UgYXMgdGV4dFxuICAgICAgfVxuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIGNvbnN0IGVycm9yTXNnID1cbiAgICAgICAgICAvLyBNT0RJRklFRDogQ2hlY2sgZm9yIEZhc3RBUEkncyAnZGV0YWlsJyBmaWVsZCBmaXJzdFxuICAgICAgICAgIGRhdGE/LmRldGFpbCB8fFxuICAgICAgICAgIGRhdGE/LmVycm9yIHx8XG4gICAgICAgICAgZGF0YT8ubXNnIHx8XG4gICAgICAgICAgKHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiICYmIGRhdGEubGVuZ3RoID4gMCAmJiBkYXRhLmxlbmd0aCA8IDUwMCAvLyBIZXVyaXN0aWMgZm9yIHNpbXBsZSB0ZXh0IGVycm9yXG4gICAgICAgICAgICA/IGRhdGFcbiAgICAgICAgICAgIDogYFJlcXVlc3QgZmFpbGVkOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5sb2dvdXQoKTtcbiAgICAgICAgICAvLyBNT0RJRklFRDogVXNlIEZhc3RBUEkncyBkZXRhaWwgbWVzc2FnZSBpZiBhdmFpbGFibGUsIG90aGVyd2lzZSBhIGdlbmVyaWMgb25lXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRhdGE/LmRldGFpbCB8fCBcIkF1dGhlbnRpY2F0aW9uIGV4cGlyZWQuIFBsZWFzZSBsb2cgaW4gYWdhaW4uXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1zZyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIC8vIENhdGNoIG5ldHdvcmsgZXJyb3JzIG9yIG90aGVyIGlzc3VlcyBiZWZvcmUgZmV0Y2ggZXZlbiBjb21wbGV0ZXNcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFR5cGVFcnJvciAmJiBlcnJvci5tZXNzYWdlID09PSBcIkZhaWxlZCB0byBmZXRjaFwiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOZXR3b3JrIGVycm9yOiBGYWlsZWQgdG8gY29ubmVjdCB0byAke3RoaXMuZ2V0QmFja2VuZFVybCgpfS4gUGxlYXNlIGNoZWNrIGlmIHRoZSBzZXJ2ZXIgaXMgcnVubmluZyBhbmQgYWNjZXNzaWJsZS5gKTtcbiAgICAgIH1cbiAgICAgIHRocm93IGVycm9yOyAvLyBSZS10aHJvdyBvdGhlciBlcnJvcnNcbiAgICB9XG4gIH1cbn1cblxuLy8gQ29va2llIHJlbW92YWwgaGVscGVyIChubyBjaGFuZ2VzIG5lZWRlZCBmb3IgQVBJIGFsaWdubWVudClcbmFzeW5jIGZ1bmN0aW9uIHBlcmZvcm1Db29raWVSZW1vdmFsKFxuICBjb21tYW5kOiBcInJlbW92ZVRoaXJkUGFydHlcIiB8IFwiY2xlYXJBbGxTaXRlXCIsXG4gIGRvbWFpbjogc3RyaW5nXG4pIHtcbiAgaWYgKCFkb21haW4pXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgbWVzc2FnZTogXCJEb21haW4gcmVxdWlyZWRcIixcbiAgICAgIHJlbW92ZWRDb3VudDogMCxcbiAgICAgIGZhaWxlZENvdW50OiAwLFxuICAgIH07XG5cbiAgY29uc3QgYWxsQ29va2llcyA9IGF3YWl0IGNocm9tZS5jb29raWVzLmdldEFsbCh7fSk7XG4gIGxldCBjb29raWVzVG9SZW1vdmU6IGNocm9tZS5jb29raWVzLkNvb2tpZVtdID0gW107XG5cbiAgaWYgKGNvbW1hbmQgPT09IFwicmVtb3ZlVGhpcmRQYXJ0eVwiKSB7XG4gICAgY29uc3Qgc2l0ZVJvb3QgPSBkb21haW4uc3BsaXQoXCIuXCIpLnNsaWNlKC0yKS5qb2luKFwiLlwiKTtcbiAgICBjb29raWVzVG9SZW1vdmUgPSBhbGxDb29raWVzLmZpbHRlcigoY29va2llKSA9PiB7XG4gICAgICBjb25zdCBjb29raWVEb21haW4gPSBjb29raWUuZG9tYWluLnN0YXJ0c1dpdGgoXCIuXCIpXG4gICAgICAgID8gY29va2llLmRvbWFpbi5zdWJzdHJpbmcoMSlcbiAgICAgICAgOiBjb29raWUuZG9tYWluO1xuICAgICAgY29uc3QgY29va2llUm9vdCA9IGNvb2tpZURvbWFpbi5zcGxpdChcIi5cIikuc2xpY2UoLTIpLmpvaW4oXCIuXCIpO1xuICAgICAgY29uc3QgaXNGaXJzdFBhcnR5ID1cbiAgICAgICAgY29va2llRG9tYWluID09PSBkb21haW4gfHxcbiAgICAgICAgY29va2llRG9tYWluLmVuZHNXaXRoKGAuJHtkb21haW59YCkgfHxcbiAgICAgICAgZG9tYWluLmVuZHNXaXRoKGAuJHtjb29raWVEb21haW59YCk7XG4gICAgICByZXR1cm4gIWlzRmlyc3RQYXJ0eSAmJiBjb29raWVSb290ICE9PSBzaXRlUm9vdDtcbiAgICB9KTtcbiAgfSBlbHNlIHsgLy8gY29tbWFuZCA9PT0gXCJjbGVhckFsbFNpdGVcIlxuICAgIGNvb2tpZXNUb1JlbW92ZSA9IGFsbENvb2tpZXMuZmlsdGVyKChjb29raWUpID0+IHtcbiAgICAgIGNvbnN0IGNvb2tpZURvbWFpbiA9IGNvb2tpZS5kb21haW4uc3RhcnRzV2l0aChcIi5cIilcbiAgICAgICAgPyBjb29raWUuZG9tYWluLnN1YnN0cmluZygxKVxuICAgICAgICA6IGNvb2tpZS5kb21haW47XG4gICAgICByZXR1cm4gY29va2llRG9tYWluID09PSBkb21haW4gfHwgY29va2llLmRvbWFpbiA9PT0gYC4ke2RvbWFpbn1gO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKCFjb29raWVzVG9SZW1vdmUubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICBtZXNzYWdlOiBcIk5vIGNvb2tpZXMgdG8gcmVtb3ZlXCIsXG4gICAgICByZW1vdmVkQ291bnQ6IDAsXG4gICAgICBmYWlsZWRDb3VudDogMCxcbiAgICB9O1xuICB9XG5cbiAgbGV0IHN1Y2Nlc3NDb3VudCA9IDAsXG4gICAgZmFpbENvdW50ID0gMDtcblxuICBmb3IgKGNvbnN0IGNvb2tpZSBvZiBjb29raWVzVG9SZW1vdmUpIHtcbiAgICBjb25zdCB1cmwgPSBgaHR0cCR7Y29va2llLnNlY3VyZSA/IFwic1wiIDogXCJcIn06Ly8ke1xuICAgICAgY29va2llLmRvbWFpbi5zdGFydHNXaXRoKFwiLlwiKSA/IGNvb2tpZS5kb21haW4uc3Vic3RyaW5nKDEpIDogY29va2llLmRvbWFpblxuICAgIH0ke2Nvb2tpZS5wYXRoIHx8IFwiL1wifWA7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNocm9tZS5jb29raWVzLnJlbW92ZSh7XG4gICAgICAgIHVybCxcbiAgICAgICAgbmFtZTogY29va2llLm5hbWUsXG4gICAgICAgIHN0b3JlSWQ6IGNvb2tpZS5zdG9yZUlkLFxuICAgICAgfSk7XG4gICAgICByZXN1bHQgPyBzdWNjZXNzQ291bnQrKyA6IGZhaWxDb3VudCsrO1xuICAgIH0gY2F0Y2gge1xuICAgICAgZmFpbENvdW50Kys7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzdWNjZXNzOiBzdWNjZXNzQ291bnQgPiAwLFxuICAgIG1lc3NhZ2U6IGBSZW1vdmVkICR7c3VjY2Vzc0NvdW50fS8ke2Nvb2tpZXNUb1JlbW92ZS5sZW5ndGh9IGNvb2tpZXMke1xuICAgICAgZmFpbENvdW50ID4gMCA/IGAuICR7ZmFpbENvdW50fSBmYWlsZWRgIDogXCJcIlxuICAgIH1gLFxuICAgIHJlbW92ZWRDb3VudDogc3VjY2Vzc0NvdW50LFxuICAgIGZhaWxlZENvdW50OiBmYWlsQ291bnQsXG4gIH07XG59XG5cbi8vIEluaXRpYWxpemVcbmNvbnN0IGJhY2tlbmRDb25uZWN0b3IgPSBCYWNrZW5kQ29ubmVjdG9yLmdldEluc3RhbmNlKCk7XG5jb25zb2xlLmxvZyhcIlNhZmVOZXQgQmFja2dyb3VuZCBTZXJ2aWNlIFdvcmtlciBJbml0aWFsaXplZC5cIik7XG5cbi8vIEV4dGVuc2lvbiBzZXR1cFxuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoYXN5bmMgKGRldGFpbHMpID0+IHtcbiAgY29uc29sZS5sb2coXCJTYWZlTmV0IEV4dGVuc2lvbiBpbnN0YWxsZWQvdXBkYXRlZDpcIiwgZGV0YWlscy5yZWFzb24pO1xuXG4gIGNvbnN0IHsgYWlCYWNrZW5kVXJsLCB0aGVtZSB9ID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtcbiAgICBcImFpQmFja2VuZFVybFwiLFxuICAgIFwidGhlbWVcIixcbiAgXSk7XG4gIGNvbnN0IGRlZmF1bHRzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XG5cbiAgLy8gTU9ESUZJRUQ6IEVuc3VyZSBkZWZhdWx0IGJhY2tlbmQgVVJMIGlzIGZyb20gdGhlIGNvbm5lY3RvciBpbnN0YW5jZSxcbiAgLy8gd2hpY2ggbm93IGNvcnJlY3RseSBkZWZhdWx0cyB0byBcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMFwiXG4gIGlmICghYWlCYWNrZW5kVXJsKSBkZWZhdWx0cy5haUJhY2tlbmRVcmwgPSBiYWNrZW5kQ29ubmVjdG9yLmdldEJhY2tlbmRVcmwoKTtcbiAgaWYgKCF0aGVtZSkgZGVmYXVsdHMudGhlbWUgPSBcImxpZ2h0XCI7XG5cbiAgaWYgKE9iamVjdC5rZXlzKGRlZmF1bHRzKS5sZW5ndGgpIHtcbiAgICBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoZGVmYXVsdHMpO1xuICAgIGNvbnNvbGUubG9nKFwiRGVmYXVsdCBzZXR0aW5ncyBpbml0aWFsaXplZDpcIiwgZGVmYXVsdHMpO1xuICB9XG59KTtcblxuLy8gTWVzc2FnZSBoYW5kbGVyIChubyBjaGFuZ2VzIG5lZWRlZCBmb3IgQVBJIGFsaWdubWVudCwgcmVsaWVzIG9uIEJhY2tlbmRDb25uZWN0b3IgbWV0aG9kcylcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgaWYgKCFtZXNzYWdlPy5hY3Rpb24pIHtcbiAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQWN0aW9uIG1pc3NpbmdcIiB9KTtcbiAgICByZXR1cm4gZmFsc2U7IC8vIEltcG9ydGFudCBmb3IgYXN5bmMgc2VuZFJlc3BvbnNlXG4gIH1cblxuICBjb25zdCB7IGFjdGlvbiwgZGF0YSB9ID0gbWVzc2FnZTtcbiAgY29uc3QgYXN5bmNIYW5kbGVyID0gKHByb21pc2U6IFByb21pc2U8YW55PikgPT4ge1xuICAgIHByb21pc2VcbiAgICAgIC50aGVuKHNlbmRSZXNwb25zZSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9KSk7XG4gICAgcmV0dXJuIHRydWU7IC8vIEluZGljYXRlIGFzeW5jIHJlc3BvbnNlXG4gIH07XG5cbiAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICBjYXNlIFwiY2hlY2tDb25uZWN0aW9uXCI6XG4gICAgICByZXR1cm4gYXN5bmNIYW5kbGVyKGJhY2tlbmRDb25uZWN0b3IuY2hlY2tDb25uZWN0aW9uKGRhdGE/LnVybFRvVGVzdCkpO1xuXG4gICAgY2FzZSBcImxvZ2luXCI6XG4gICAgICBpZiAoIWRhdGE/LmVtYWlsIHx8ICFkYXRhPy5wYXNzd29yZCkge1xuICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRW1haWwgYW5kIHBhc3N3b3JkIHJlcXVpcmVkXCIgfSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhc3luY0hhbmRsZXIoXG4gICAgICAgIGJhY2tlbmRDb25uZWN0b3JcbiAgICAgICAgICAubG9naW4oZGF0YS5lbWFpbCwgZGF0YS5wYXNzd29yZClcbiAgICAgICAgICAudGhlbigocmVzKSA9PiAoeyBzdWNjZXNzOiB0cnVlLCB0b2tlbjogcmVzLnRva2VuIH0pKVxuICAgICAgKTtcblxuICAgIGNhc2UgXCJyZWdpc3RlclwiOlxuICAgICAgaWYgKCFkYXRhPy5lbWFpbCB8fCAhZGF0YT8ucGFzc3dvcmQpIHtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIkVtYWlsIGFuZCBwYXNzd29yZCByZXF1aXJlZFwiIH0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBNT0RJRklFRDogcmVnaXN0ZXIgbm93IHJldHVybnMgeyBzdWNjZXNzLCBtZXNzYWdlLCB1c2VyIH1cbiAgICAgIHJldHVybiBhc3luY0hhbmRsZXIoYmFja2VuZENvbm5lY3Rvci5yZWdpc3RlcihkYXRhLmVtYWlsLCBkYXRhLnBhc3N3b3JkKSk7XG5cbiAgICBjYXNlIFwibG9nb3V0XCI6XG4gICAgICByZXR1cm4gYXN5bmNIYW5kbGVyKFxuICAgICAgICBiYWNrZW5kQ29ubmVjdG9yXG4gICAgICAgICAgLmxvZ291dCgpXG4gICAgICAgICAgLnRoZW4oKCkgPT4gKHsgc3VjY2VzczogdHJ1ZSwgbWVzc2FnZTogXCJMb2dnZWQgb3V0XCIgfSkpXG4gICAgICApO1xuXG4gICAgY2FzZSBcImlzTG9nZ2VkSW5cIjpcbiAgICAgIHNlbmRSZXNwb25zZSh7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIGlzTG9nZ2VkSW46IGJhY2tlbmRDb25uZWN0b3IuaXNMb2dnZWRJbigpLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZmFsc2U7IC8vIFN5bmNocm9ub3VzIHJlc3BvbnNlXG5cbiAgICBjYXNlIFwiYW5hbHl6ZVVybFwiOlxuICAgICAgaWYgKCFkYXRhPy51cmwpIHtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVSTCByZXF1aXJlZFwiIH0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXN5bmNIYW5kbGVyKFxuICAgICAgICBiYWNrZW5kQ29ubmVjdG9yXG4gICAgICAgICAgLmFuYWx5emVVcmxBcGkoZGF0YS51cmwpXG4gICAgICAgICAgLy8gVGhlIHJlc3VsdCBmcm9tIGFuYWx5emVVcmxBcGkgaXMgZGlyZWN0bHkgd2hhdCBGYXN0QVBJIHJldHVybnMuXG4gICAgICAgICAgLy8gVGhlIFVJIChBSUFuYWx5emVyLnRzeCkgc2hvdWxkIGJlIHJlc3BvbnNpYmxlIGZvciB0cmFuc2Zvcm1pbmcgdGhpcy5cbiAgICAgICAgICAudGhlbigocmVzKSA9PiAoeyBzdWNjZXNzOiB0cnVlLCBkYXRhOiByZXMgfSkpXG4gICAgICApO1xuXG4gICAgY2FzZSBcImdldEJhY2tlbmRVcmxcIjpcbiAgICAgIHNlbmRSZXNwb25zZSh7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIGJhY2tlbmRVcmw6IGJhY2tlbmRDb25uZWN0b3IuZ2V0QmFja2VuZFVybCgpLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZmFsc2U7IC8vIFN5bmNocm9ub3VzIHJlc3BvbnNlXG5cbiAgICBjYXNlIFwic2V0QmFja2VuZFVybEludGVybmFsXCI6IC8vIFRoaXMgaXMgbGlrZWx5IGZvciBkZWJ1Z2dpbmcgb3IgYWR2YW5jZWQgc2V0dGluZ3NcbiAgICAgIGlmICghZGF0YT8udXJsKSB7XG4gICAgICAgIHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJVUkwgcmVxdWlyZWRcIiB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgYmFja2VuZENvbm5lY3Rvci5fc2V0QmFja2VuZFVybEludGVybmFsKGRhdGEudXJsKTtcbiAgICAgIHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IHRydWUsIG5ld1VybDogZGF0YS51cmwgfSk7XG4gICAgICByZXR1cm4gZmFsc2U7IC8vIFN5bmNocm9ub3VzIHJlc3BvbnNlXG5cbiAgICBjYXNlIFwiY29va2llQWN0aW9uXCI6XG4gICAgICBpZiAoIWRhdGE/LmNvbW1hbmQgfHwgIWRhdGE/LmRvbWFpbikge1xuICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiQ29tbWFuZCBhbmQgZG9tYWluIHJlcXVpcmVkXCIgfSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhc3luY0hhbmRsZXIocGVyZm9ybUNvb2tpZVJlbW92YWwoZGF0YS5jb21tYW5kLCBkYXRhLmRvbWFpbikpO1xuXG4gICAgY2FzZSBcIm9wZW5TYWZlTmV0VUlcIjogLy8gQXNzdW1pbmcgdGhlc2UgYWN0aW9ucyBvcGVuIHRoZSBwb3B1cFxuICAgIGNhc2UgXCJvcGVuUG9wdXBcIjpcbiAgICAgIGNocm9tZS5hY3Rpb24ub3BlblBvcHVwKCgpID0+IHtcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9ICFjaHJvbWUucnVudGltZS5sYXN0RXJyb3I7XG4gICAgICAgIHNlbmRSZXNwb25zZSh7XG4gICAgICAgICAgc3VjY2VzcyxcbiAgICAgICAgICAuLi4oc3VjY2Vzc1xuICAgICAgICAgICAgPyB7IG1lc3NhZ2U6IFwiUG9wdXAgb3BlbmVkXCIgfVxuICAgICAgICAgICAgOiB7IGVycm9yOiBjaHJvbWUucnVudGltZS5sYXN0RXJyb3I/Lm1lc3NhZ2UgfSksXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdHJ1ZTsgLy8gSW5kaWNhdGUgYXN5bmMgcmVzcG9uc2UgKHRob3VnaCBvcGVuUG9wdXAgaXMgdXN1YWxseSBmYXN0KVxuXG4gICAgZGVmYXVsdDpcbiAgICAgIHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogYFVua25vd24gYWN0aW9uOiAke2FjdGlvbn1gIH0pO1xuICAgICAgcmV0dXJuIGZhbHNlOyAvLyBTeW5jaHJvbm91cyByZXNwb25zZVxuICB9XG59KTsiXSwibmFtZXMiOltdLCJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMubWFwIn0=
 globalThis.define=__define;  })(globalThis.define);