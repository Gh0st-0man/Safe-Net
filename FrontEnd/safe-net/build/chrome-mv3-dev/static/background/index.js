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
})({"kjh3j":[function(require,module,exports) {
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
    "verbose": "true",
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

},{}]},["kjh3j","8oeFb"], "8oeFb", "parcelRequiree7e9")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UTtnQkFDaEMsYUFBYTtvQkFDWDtvQkFDQSxHQUFJLFVBQ0E7d0JBQUUsU0FBUztvQkFBZSxJQUMxQjt3QkFBRSxPQUFPLE9BQU8sUUFBUSxXQUFXO29CQUFRLENBQUM7Z0JBQ2xEO1lBQ0Y7WUFDQSxPQUFPLE1BQU0sNkRBQTZEO1FBRTVFO1lBQ0UsYUFBYTtnQkFBRSxTQUFTO2dCQUFPLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUM7WUFBQztZQUNsRSxPQUFPLE9BQU8sdUJBQXVCO0lBQ3pDO0FBQ0YiLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGxhc21vaHErcGFyY2VsLXJ1bnRpbWVAMC4yNS4yL25vZGVfbW9kdWxlcy9AcGxhc21vaHEvcGFyY2VsLXJ1bnRpbWUvZGlzdC9ydW50aW1lLTcxODMzMThkMzM3NWI0ZmYuanMiLCIucGxhc21vL3N0YXRpYy9iYWNrZ3JvdW5kL2luZGV4LnRzIiwic3JjL2JhY2tncm91bmQvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIHU9Z2xvYmFsVGhpcy5wcm9jZXNzPy5hcmd2fHxbXTt2YXIgaD0oKT0+Z2xvYmFsVGhpcy5wcm9jZXNzPy5lbnZ8fHt9O3ZhciBCPW5ldyBTZXQodSksXz1lPT5CLmhhcyhlKSxHPXUuZmlsdGVyKGU9PmUuc3RhcnRzV2l0aChcIi0tXCIpJiZlLmluY2x1ZGVzKFwiPVwiKSkubWFwKGU9PmUuc3BsaXQoXCI9XCIpKS5yZWR1Y2UoKGUsW3Qsb10pPT4oZVt0XT1vLGUpLHt9KTt2YXIgVT1fKFwiLS1kcnktcnVuXCIpLGc9KCk9Pl8oXCItLXZlcmJvc2VcIil8fGgoKS5WRVJCT1NFPT09XCJ0cnVlXCIsTj1nKCk7dmFyIG09KGU9XCJcIiwuLi50KT0+Y29uc29sZS5sb2coZS5wYWRFbmQoOSksXCJ8XCIsLi4udCk7dmFyIHk9KC4uLmUpPT5jb25zb2xlLmVycm9yKFwiXFx1ezFGNTM0fSBFUlJPUlwiLnBhZEVuZCg5KSxcInxcIiwuLi5lKSx2PSguLi5lKT0+bShcIlxcdXsxRjUzNX0gSU5GT1wiLC4uLmUpLGY9KC4uLmUpPT5tKFwiXFx1ezFGN0UwfSBXQVJOXCIsLi4uZSksTT0wLGk9KC4uLmUpPT5nKCkmJm0oYFxcdXsxRjdFMX0gJHtNKyt9YCwuLi5lKTt2YXIgYj0oKT0+e2xldCBlPWdsb2JhbFRoaXMuYnJvd3Nlcj8ucnVudGltZXx8Z2xvYmFsVGhpcy5jaHJvbWU/LnJ1bnRpbWUsdD0oKT0+c2V0SW50ZXJ2YWwoZS5nZXRQbGF0Zm9ybUluZm8sMjRlMyk7ZS5vblN0YXJ0dXAuYWRkTGlzdGVuZXIodCksdCgpfTt2YXIgbj17XCJpc0NvbnRlbnRTY3JpcHRcIjpmYWxzZSxcImlzQmFja2dyb3VuZFwiOnRydWUsXCJpc1JlYWN0XCI6ZmFsc2UsXCJydW50aW1lc1wiOltcImJhY2tncm91bmQtc2VydmljZS1ydW50aW1lXCJdLFwiaG9zdFwiOlwibG9jYWxob3N0XCIsXCJwb3J0XCI6MTgxNSxcImVudHJ5RmlsZVBhdGhcIjpcIkI6XFxcXGdpdF9wcm9qZWN0c1xcXFxGYXN0YXBpXFxcXEZyb250RW5kXFxcXHNhZmUtbmV0XFxcXC5wbGFzbW9cXFxcc3RhdGljXFxcXGJhY2tncm91bmRcXFxcaW5kZXgudHNcIixcImJ1bmRsZUlkXCI6XCJjMzM4OTA4ZTcwNGM5MWYxXCIsXCJlbnZIYXNoXCI6XCJkOTlhNWZmYTU3YWNkNjM4XCIsXCJ2ZXJib3NlXCI6XCJ0cnVlXCIsXCJzZWN1cmVcIjpmYWxzZSxcInNlcnZlclBvcnRcIjoxMDEyfTttb2R1bGUuYnVuZGxlLkhNUl9CVU5ETEVfSUQ9bi5idW5kbGVJZDtnbG9iYWxUaGlzLnByb2Nlc3M9e2FyZ3Y6W10sZW52OntWRVJCT1NFOm4udmVyYm9zZX19O3ZhciBEPW1vZHVsZS5idW5kbGUuTW9kdWxlO2Z1bmN0aW9uIEgoZSl7RC5jYWxsKHRoaXMsZSksdGhpcy5ob3Q9e2RhdGE6bW9kdWxlLmJ1bmRsZS5ob3REYXRhW2VdLF9hY2NlcHRDYWxsYmFja3M6W10sX2Rpc3Bvc2VDYWxsYmFja3M6W10sYWNjZXB0OmZ1bmN0aW9uKHQpe3RoaXMuX2FjY2VwdENhbGxiYWNrcy5wdXNoKHR8fGZ1bmN0aW9uKCl7fSl9LGRpc3Bvc2U6ZnVuY3Rpb24odCl7dGhpcy5fZGlzcG9zZUNhbGxiYWNrcy5wdXNoKHQpfX0sbW9kdWxlLmJ1bmRsZS5ob3REYXRhW2VdPXZvaWQgMH1tb2R1bGUuYnVuZGxlLk1vZHVsZT1IO21vZHVsZS5idW5kbGUuaG90RGF0YT17fTt2YXIgYz1nbG9iYWxUaGlzLmJyb3dzZXJ8fGdsb2JhbFRoaXMuY2hyb21lfHxudWxsO2Z1bmN0aW9uIFIoKXtyZXR1cm4hbi5ob3N0fHxuLmhvc3Q9PT1cIjAuMC4wLjBcIj9sb2NhdGlvbi5wcm90b2NvbC5pbmRleE9mKFwiaHR0cFwiKT09PTA/bG9jYXRpb24uaG9zdG5hbWU6XCJsb2NhbGhvc3RcIjpuLmhvc3R9ZnVuY3Rpb24geCgpe3JldHVybiFuLmhvc3R8fG4uaG9zdD09PVwiMC4wLjAuMFwiP1wibG9jYWxob3N0XCI6bi5ob3N0fWZ1bmN0aW9uIGQoKXtyZXR1cm4gbi5wb3J0fHxsb2NhdGlvbi5wb3J0fXZhciBQPVwiX19wbGFzbW9fcnVudGltZV9wYWdlX1wiLFM9XCJfX3BsYXNtb19ydW50aW1lX3NjcmlwdF9cIjt2YXIgTz1gJHtuLnNlY3VyZT9cImh0dHBzXCI6XCJodHRwXCJ9Oi8vJHtSKCl9OiR7ZCgpfS9gO2FzeW5jIGZ1bmN0aW9uIGsoZT0xNDcwKXtmb3IoOzspdHJ5e2F3YWl0IGZldGNoKE8pO2JyZWFrfWNhdGNoe2F3YWl0IG5ldyBQcm9taXNlKG89PnNldFRpbWVvdXQobyxlKSl9fWlmKGMucnVudGltZS5nZXRNYW5pZmVzdCgpLm1hbmlmZXN0X3ZlcnNpb249PT0zKXtsZXQgZT1jLnJ1bnRpbWUuZ2V0VVJMKFwiL19fcGxhc21vX2htcl9wcm94eV9fP3VybD1cIik7Z2xvYmFsVGhpcy5hZGRFdmVudExpc3RlbmVyKFwiZmV0Y2hcIixmdW5jdGlvbih0KXtsZXQgbz10LnJlcXVlc3QudXJsO2lmKG8uc3RhcnRzV2l0aChlKSl7bGV0IHM9bmV3IFVSTChkZWNvZGVVUklDb21wb25lbnQoby5zbGljZShlLmxlbmd0aCkpKTtzLmhvc3RuYW1lPT09bi5ob3N0JiZzLnBvcnQ9PT1gJHtuLnBvcnR9YD8ocy5zZWFyY2hQYXJhbXMuc2V0KFwidFwiLERhdGUubm93KCkudG9TdHJpbmcoKSksdC5yZXNwb25kV2l0aChmZXRjaChzKS50aGVuKHI9Pm5ldyBSZXNwb25zZShyLmJvZHkse2hlYWRlcnM6e1wiQ29udGVudC1UeXBlXCI6ci5oZWFkZXJzLmdldChcIkNvbnRlbnQtVHlwZVwiKT8/XCJ0ZXh0L2phdmFzY3JpcHRcIn19KSkpKTp0LnJlc3BvbmRXaXRoKG5ldyBSZXNwb25zZShcIlBsYXNtbyBITVJcIix7c3RhdHVzOjIwMCxzdGF0dXNUZXh0OlwiVGVzdGluZ1wifSkpfX0pfWZ1bmN0aW9uIEUoZSx0KXtsZXR7bW9kdWxlczpvfT1lO3JldHVybiBvPyEhb1t0XTohMX1mdW5jdGlvbiBDKGU9ZCgpKXtsZXQgdD14KCk7cmV0dXJuYCR7bi5zZWN1cmV8fGxvY2F0aW9uLnByb3RvY29sPT09XCJodHRwczpcIiYmIS9sb2NhbGhvc3R8MTI3LjAuMC4xfDAuMC4wLjAvLnRlc3QodCk/XCJ3c3NcIjpcIndzXCJ9Oi8vJHt0fToke2V9L2B9ZnVuY3Rpb24gTChlKXt0eXBlb2YgZS5tZXNzYWdlPT1cInN0cmluZ1wiJiZ5KFwiW3BsYXNtby9wYXJjZWwtcnVudGltZV06IFwiK2UubWVzc2FnZSl9ZnVuY3Rpb24gVChlKXtpZih0eXBlb2YgZ2xvYmFsVGhpcy5XZWJTb2NrZXQ+XCJ1XCIpcmV0dXJuO2xldCB0PW5ldyBXZWJTb2NrZXQoQyhOdW1iZXIoZCgpKSsxKSk7cmV0dXJuIHQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixhc3luYyBmdW5jdGlvbihvKXtsZXQgcz1KU09OLnBhcnNlKG8uZGF0YSk7YXdhaXQgZShzKX0pLHQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsTCksdH1mdW5jdGlvbiBBKGUpe2lmKHR5cGVvZiBnbG9iYWxUaGlzLldlYlNvY2tldD5cInVcIilyZXR1cm47bGV0IHQ9bmV3IFdlYlNvY2tldChDKCkpO3JldHVybiB0LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsYXN5bmMgZnVuY3Rpb24obyl7bGV0IHM9SlNPTi5wYXJzZShvLmRhdGEpO2lmKHMudHlwZT09PVwidXBkYXRlXCImJmF3YWl0IGUocy5hc3NldHMpLHMudHlwZT09PVwiZXJyb3JcIilmb3IobGV0IHIgb2Ygcy5kaWFnbm9zdGljcy5hbnNpKXtsZXQgbD1yLmNvZGVmcmFtZXx8ci5zdGFjaztmKFwiW3BsYXNtby9wYXJjZWwtcnVudGltZV06IFwiK3IubWVzc2FnZStgXG5gK2wrYFxuXG5gK3IuaGludHMuam9pbihgXG5gKSl9fSksdC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixMKSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJvcGVuXCIsKCk9Pnt2KGBbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogQ29ubmVjdGVkIHRvIEhNUiBzZXJ2ZXIgZm9yICR7bi5lbnRyeUZpbGVQYXRofWApfSksdC5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIiwoKT0+e2YoYFtwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBDb25uZWN0aW9uIHRvIHRoZSBITVIgc2VydmVyIGlzIGNsb3NlZCBmb3IgJHtuLmVudHJ5RmlsZVBhdGh9YCl9KSx0fXZhciB3PW1vZHVsZS5idW5kbGUucGFyZW50LGE9e2J1aWxkUmVhZHk6ITEsYmdDaGFuZ2VkOiExLGNzQ2hhbmdlZDohMSxwYWdlQ2hhbmdlZDohMSxzY3JpcHRQb3J0czpuZXcgU2V0LHBhZ2VQb3J0czpuZXcgU2V0fTthc3luYyBmdW5jdGlvbiBwKGU9ITEpe2lmKGV8fGEuYnVpbGRSZWFkeSYmYS5wYWdlQ2hhbmdlZCl7aShcIkJHU1cgUnVudGltZSAtIHJlbG9hZGluZyBQYWdlXCIpO2ZvcihsZXQgdCBvZiBhLnBhZ2VQb3J0cyl0LnBvc3RNZXNzYWdlKG51bGwpfWlmKGV8fGEuYnVpbGRSZWFkeSYmKGEuYmdDaGFuZ2VkfHxhLmNzQ2hhbmdlZCkpe2koXCJCR1NXIFJ1bnRpbWUgLSByZWxvYWRpbmcgQ1NcIik7bGV0IHQ9YXdhaXQgYz8udGFicy5xdWVyeSh7YWN0aXZlOiEwfSk7Zm9yKGxldCBvIG9mIGEuc2NyaXB0UG9ydHMpe2xldCBzPXQuc29tZShyPT5yLmlkPT09by5zZW5kZXIudGFiPy5pZCk7by5wb3N0TWVzc2FnZSh7X19wbGFzbW9fY3NfYWN0aXZlX3RhYl9fOnN9KX1jLnJ1bnRpbWUucmVsb2FkKCl9fWlmKCF3fHwhdy5pc1BhcmNlbFJlcXVpcmUpe2IoKTtsZXQgZT1BKGFzeW5jIHQ9PntpKFwiQkdTVyBSdW50aW1lIC0gT24gSE1SIFVwZGF0ZVwiKSxhLmJnQ2hhbmdlZHx8PXQuZmlsdGVyKHM9PnMuZW52SGFzaD09PW4uZW52SGFzaCkuc29tZShzPT5FKG1vZHVsZS5idW5kbGUscy5pZCkpO2xldCBvPXQuZmluZChzPT5zLnR5cGU9PT1cImpzb25cIik7aWYobyl7bGV0IHM9bmV3IFNldCh0Lm1hcChsPT5sLmlkKSkscj1PYmplY3QudmFsdWVzKG8uZGVwc0J5QnVuZGxlKS5tYXAobD0+T2JqZWN0LnZhbHVlcyhsKSkuZmxhdCgpO2EuYmdDaGFuZ2VkfHw9ci5ldmVyeShsPT5zLmhhcyhsKSl9cCgpfSk7ZS5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLCgpPT57bGV0IHQ9c2V0SW50ZXJ2YWwoKCk9PmUuc2VuZChcInBpbmdcIiksMjRlMyk7ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIiwoKT0+Y2xlYXJJbnRlcnZhbCh0KSl9KSxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLGFzeW5jKCk9Pnthd2FpdCBrKCkscCghMCl9KX1UKGFzeW5jIGU9Pntzd2l0Y2goaShcIkJHU1cgUnVudGltZSAtIE9uIEJ1aWxkIFJlcGFja2FnZWRcIiksZS50eXBlKXtjYXNlXCJidWlsZF9yZWFkeVwiOnthLmJ1aWxkUmVhZHl8fD0hMCxwKCk7YnJlYWt9Y2FzZVwiY3NfY2hhbmdlZFwiOnthLmNzQ2hhbmdlZHx8PSEwLHAoKTticmVha319fSk7Yy5ydW50aW1lLm9uQ29ubmVjdC5hZGRMaXN0ZW5lcihmdW5jdGlvbihlKXtsZXQgdD1lLm5hbWUuc3RhcnRzV2l0aChQKSxvPWUubmFtZS5zdGFydHNXaXRoKFMpO2lmKHR8fG8pe2xldCBzPXQ/YS5wYWdlUG9ydHM6YS5zY3JpcHRQb3J0cztzLmFkZChlKSxlLm9uRGlzY29ubmVjdC5hZGRMaXN0ZW5lcigoKT0+e3MuZGVsZXRlKGUpfSksZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24ocil7aShcIkJHU1cgUnVudGltZSAtIE9uIHNvdXJjZSBjaGFuZ2VkXCIsciksci5fX3BsYXNtb19jc19jaGFuZ2VkX18mJihhLmNzQ2hhbmdlZHx8PSEwKSxyLl9fcGxhc21vX3BhZ2VfY2hhbmdlZF9fJiYoYS5wYWdlQ2hhbmdlZHx8PSEwKSxwKCl9KX19KTtjLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uKHQpe3JldHVybiB0Ll9fcGxhc21vX2Z1bGxfcmVsb2FkX18mJihpKFwiQkdTVyBSdW50aW1lIC0gT24gdG9wLWxldmVsIGNvZGUgY2hhbmdlZFwiKSxwKCkpLCEwfSk7XG4iLCJpbXBvcnQgXCIuLi8uLi8uLi9zcmMvYmFja2dyb3VuZC9pbmRleFwiIiwiLy8gIFNhZmVOZXQgQmFja2dyb3VuZCBTY3JpcHRcbmNsYXNzIEJhY2tlbmRDb25uZWN0b3Ige1xuICBcbiAgcHJpdmF0ZSBiYWNrZW5kVXJsID0gXCJodHRwOi8vMTI3LjAuMC4xOjUwMDBcIjtcbiAgcHJpdmF0ZSB0b2tlbjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBCYWNrZW5kQ29ubmVjdG9yO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgXG4gICAgLy90aGlzLmJhY2tlbmRVcmwgPSBcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMFwiOyAvLyBFeHBsaWNpdGx5IHNldCBkZWZhdWx0XG4gICAgdGhpcy5sb2FkU3RhdGUoKTtcbiAgICB0aGlzLmxpc3RlbkZvclN0b3JhZ2VDaGFuZ2VzKCk7XG4gIH1cblxuICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgcmV0dXJuICh0aGlzLmluc3RhbmNlIHx8PSBuZXcgQmFja2VuZENvbm5lY3RvcigpKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgbG9hZFN0YXRlKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGF1dGhUb2tlbiwgYWlCYWNrZW5kVXJsIH0gPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoW1xuICAgICAgICBcImF1dGhUb2tlblwiLFxuICAgICAgICBcImFpQmFja2VuZFVybFwiLFxuICAgICAgXSk7XG4gICAgICB0aGlzLnRva2VuID0gYXV0aFRva2VuIHx8IG51bGw7XG4gICAgIFxuICAgICAgdGhpcy5iYWNrZW5kVXJsID0gYWlCYWNrZW5kVXJsIHx8IHRoaXMuYmFja2VuZFVybDsgLy8gdGhpcy5iYWNrZW5kVXJsIGlzIG5vdyBcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMFwiXG5cbiAgICAgIGlmICghYWlCYWNrZW5kVXJsKSB7XG4gICAgICAgIC8vIE1PRElGSUVEOiBTYXZlIHRoZSBjb3JyZWN0IGRlZmF1bHQgaWYgaXQgd2Fzbid0IHRoZXJlXG4gICAgICAgIGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IGFpQmFja2VuZFVybDogdGhpcy5iYWNrZW5kVXJsIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBsb2FkaW5nIHN0YXRlOlwiLCBlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkZvclN0b3JhZ2VDaGFuZ2VzKCkge1xuICAgIGNocm9tZS5zdG9yYWdlLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcigoY2hhbmdlcywgbmFtZXNwYWNlKSA9PiB7XG4gICAgICBpZiAobmFtZXNwYWNlID09PSBcImxvY2FsXCIpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMuYXV0aFRva2VuKSB0aGlzLnRva2VuID0gY2hhbmdlcy5hdXRoVG9rZW4ubmV3VmFsdWUgfHwgbnVsbDtcbiAgICAgICAgaWYgKGNoYW5nZXMuYWlCYWNrZW5kVXJsKVxuICAgICAgICBcbiAgICAgICAgICB0aGlzLmJhY2tlbmRVcmwgPSBjaGFuZ2VzLmFpQmFja2VuZFVybC5uZXdWYWx1ZSB8fCBcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMFwiO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0QmFja2VuZFVybCgpIHtcbiAgICByZXR1cm4gdGhpcy5iYWNrZW5kVXJsLnRyaW0oKTtcbiAgfVxuICBpc0xvZ2dlZEluKCkge1xuICAgIHJldHVybiB0aGlzLnRva2VuICE9PSBudWxsO1xuICB9XG5cbiAgX3NldEJhY2tlbmRVcmxJbnRlcm5hbCh1cmw6IHN0cmluZykge1xuICAgIHRoaXMuYmFja2VuZFVybCA9IHVybC50cmltKCk7IFxuICB9XG5cbiAgYXN5bmMgY2hlY2tDb25uZWN0aW9uKHVybFRvVGVzdD86IHN0cmluZykge1xuICAgIGNvbnN0IHVybCA9ICh1cmxUb1Rlc3QgfHwgdGhpcy5nZXRCYWNrZW5kVXJsKCkpLnRyaW0oKTsgXG4gICAgaWYgKCF1cmw/Lm1hdGNoKC9eaHR0cHM/Oi8pKSB7XG4gICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiSW52YWxpZCBVUkxcIiwgdmVyaWZpZWRVcmw6IHVybCB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAvLyBNT0RJRklFRDogRW5kcG9pbnQgdG8gL2FwaS9zdGF0dXNcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7dXJsfS9hcGkvc3RhdHVzYCwge1xuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgIGhlYWRlcnM6IHsgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICBtb2RlOiBcImNvcnNcIixcbiAgICAgICAgY2FjaGU6IFwibm8tY2FjaGVcIixcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTsgLy8gRmFzdEFQSSByZXR1cm5zIHsgc3RhdHVzOiBcIm9ubGluZVwiLCBtb2RlbF9wYXRoOiBcIi4uLlwiIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgIHZlcmlmaWVkVXJsOiB1cmwsXG4gICAgICAgICAgLy8gTU9ESUZJRUQ6IFVzZSBkYXRhLm1vZGVsX3BhdGguIFVJIHNob3VsZCBpZGVhbGx5IGV4cGVjdCBtb2RlbF9wYXRoLlxuICAgICAgICAgIC8vIEZvciBjb21wYXRpYmlsaXR5LCBpZiBzb21ldGhpbmcgZG93bnN0cmVhbSBzdHJpY3RseSBleHBlY3RlZCBtb2RlbF9zdGF0dXM6XG4gICAgICAgICAgLy8gbW9kZWxfc3RhdHVzOiBkYXRhLm1vZGVsX3BhdGgsXG4gICAgICAgICAgLy8gQnV0IGl0J3MgYmV0dGVyIHRvIGJlIGFjY3VyYXRlOlxuICAgICAgICAgIG1vZGVsX3BhdGg6IGRhdGEubW9kZWxfcGF0aCxcbiAgICAgICAgICBhcGlfc3RhdHVzOiBkYXRhLnN0YXR1cywgLy8gS2VlcCBvcmlnaW5hbCBzdGF0dXMgaWYgbmVlZGVkXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGVycm9yTXNnID0gYXdhaXQgcmVzcG9uc2VcbiAgICAgICAgLmpzb24oKVxuICAgICAgICAvLyBNT0RJRklFRDogQ2hlY2sgZm9yIEZhc3RBUEkncyAnZGV0YWlsJyBmaWVsZFxuICAgICAgICAudGhlbigoZCkgPT4gZC5kZXRhaWwgfHwgZC5lcnJvciB8fCBkLm1lc3NhZ2UpXG4gICAgICAgIC5jYXRjaCgoKSA9PiBgU2VydmVyIGVycm9yICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBlcnJvck1zZywgdmVyaWZpZWRVcmw6IHVybCB9O1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCBcIk5ldHdvcmsgZXJyb3JcIixcbiAgICAgICAgdmVyaWZpZWRVcmw6IHVybCxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgbG9naW4oZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICAvLyBNT0RJRklFRDogRW5kcG9pbnQgdG8gL2F1dGgvbG9naW5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7dGhpcy5nZXRCYWNrZW5kVXJsKCl9L2F1dGgvbG9naW5gLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICBBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICB9LFxuICAgICAgICAvLyBGYXN0QVBJIFVzZXJMb2dpbiBzY2hlbWEgZXhwZWN0cyB7ZW1haWwsIHBhc3N3b3JkfSBpbiBKU09OIGJvZHlcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBlbWFpbCwgcGFzc3dvcmQgfSksXG4gICAgICAgIG1vZGU6IFwiY29yc1wiLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgLy8gTU9ESUZJRUQ6IENoZWNrIGZvciBGYXN0QVBJJ3MgJ2RldGFpbCcgZmllbGRcbiAgICAgICAgICBkYXRhLmRldGFpbCB8fCBkYXRhLmVycm9yIHx8IGRhdGEubXNnIHx8IGBMb2dpbiBmYWlsZWQ6ICR7cmVzcG9uc2Uuc3RhdHVzfWBcbiAgICAgICAgKTtcbiAgICAgIGlmICghZGF0YS5hY2Nlc3NfdG9rZW4pIHRocm93IG5ldyBFcnJvcihcIk5vIGFjY2VzcyB0b2tlbiByZWNlaXZlZFwiKTtcblxuICAgICAgdGhpcy50b2tlbiA9IGRhdGEuYWNjZXNzX3Rva2VuO1xuICAgICAgYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgYXV0aFRva2VuOiB0aGlzLnRva2VuIH0pO1xuICAgICAgcmV0dXJuIHsgdG9rZW46IHRoaXMudG9rZW4gfTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICB0aGlzLnRva2VuID0gbnVsbDtcbiAgICAgIGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLnJlbW92ZShcImF1dGhUb2tlblwiKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHJlZ2lzdGVyKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgLy8gTU9ESUZJRUQ6IEVuZHBvaW50IHRvIC9hdXRoL3JlZ2lzdGVyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3RoaXMuZ2V0QmFja2VuZFVybCgpfS9hdXRoL3JlZ2lzdGVyYCwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBlbWFpbCwgcGFzc3dvcmQgfSksXG4gICAgICAgIG1vZGU6IFwiY29yc1wiLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7IC8vIEZhc3RBUEkgcmV0dXJucyBVc2VyUHVibGljIG9uIHN1Y2Nlc3NcbiAgICAgIGlmICghcmVzcG9uc2Uub2spXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAvLyBNT0RJRklFRDogQ2hlY2sgZm9yIEZhc3RBUEkncyAnZGV0YWlsJyBmaWVsZFxuICAgICAgICAgIGRhdGEuZGV0YWlsIHx8IGRhdGEuZXJyb3IgfHwgZGF0YS5tc2cgfHwgYFJlZ2lzdHJhdGlvbiBmYWlsZWQ6ICR7cmVzcG9uc2Uuc3RhdHVzfWBcbiAgICAgICAgKTtcblxuICAgICAgLy8gTU9ESUZJRUQ6IEZhc3RBUEkgcmVnaXN0ZXIgcmV0dXJucyB0aGUgdXNlciBvYmplY3QuXG4gICAgICAvLyBBZGFwdCB0byByZXR1cm4gYSBzdWNjZXNzIHN0cnVjdHVyZSBjb21wYXRpYmxlIHdpdGggcHJldmlvdXMgZXhwZWN0YXRpb25zIGlmIG5lY2Vzc2FyeS5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6IGRhdGEuZW1haWwgPyBgVXNlciAke2RhdGEuZW1haWx9IHJlZ2lzdGVyZWQgc3VjY2Vzc2Z1bGx5LmAgOiBcIlJlZ2lzdHJhdGlvbiBzdWNjZXNzZnVsXCIsXG4gICAgICAgIHVzZXI6IGRhdGEsIC8vIE9wdGlvbmFsbHkgaW5jbHVkZSB0aGUgcmV0dXJuZWQgdXNlciBkYXRhXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGxvZ291dCgpIHtcbiAgICB0aGlzLnRva2VuID0gbnVsbDtcbiAgICBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5yZW1vdmUoXCJhdXRoVG9rZW5cIik7XG4gIH1cblxuICBhc3luYyBhbmFseXplVXJsQXBpKHVybDogc3RyaW5nKSB7XG4gICAgLy8gTU9ESUZJRUQ6IFBhc3MgL2FwaS9hcGkvYW5hbHl6ZSB0byBtYWtlQXV0aFJlcXVlc3RcbiAgICByZXR1cm4gdGhpcy5tYWtlQXV0aFJlcXVlc3QoXCIvYXBpL2FwaS9hbmFseXplXCIsIFwiUE9TVFwiLCB7IHVybCB9KTtcbiAgfVxuXG4gIGFzeW5jIG1ha2VBdXRoUmVxdWVzdChlbmRwb2ludDogc3RyaW5nLCBtZXRob2QgPSBcIkdFVFwiLCBib2R5OiBhbnkgPSBudWxsKSB7XG4gICAgaWYgKCF0aGlzLnRva2VuKSB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgYXV0aGVudGljYXRlZFwiKTtcblxuICAgIC8vIE1PRElGSUVEOiBFbmRwb2ludCBzaG91bGQgYWxyZWFkeSBpbmNsdWRlIHRoZSBwcmVmaXggKGUuZy4sIC9hcGkvYXBpL2FuYWx5emUpXG4gICAgY29uc3QgcmVxdWVzdFVybCA9IGAke3RoaXMuZ2V0QmFja2VuZFVybCgpfSR7ZW5kcG9pbnR9YDtcbiAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3RoaXMudG9rZW59YCxcbiAgICAgIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgfTtcbiAgICBpZiAoYm9keSkgaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdFVybCwge1xuICAgICAgICBtZXRob2QsXG4gICAgICAgIGhlYWRlcnMsXG4gICAgICAgIGJvZHk6IGJvZHkgPyBKU09OLnN0cmluZ2lmeShib2R5KSA6IG51bGwsXG4gICAgICAgIG1vZGU6IFwiY29yc1wiLFxuICAgICAgfSk7XG5cbiAgICAgIGxldCBkYXRhOiBhbnk7XG4gICAgICBjb25zdCBjb250ZW50VHlwZSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpO1xuXG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDQpIHsgLy8gTm8gQ29udGVudFxuICAgICAgICBkYXRhID0gbnVsbDtcbiAgICAgIH0gZWxzZSBpZiAoY29udGVudFR5cGU/LmluY2x1ZGVzKFwiYXBwbGljYXRpb24vanNvblwiKSkge1xuICAgICAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2VcbiAgICAgICAgICAuanNvbigpXG4gICAgICAgICAgLmNhdGNoKCgpID0+ICh7IGVycm9yOiBcIkludmFsaWQgSlNPTiByZXNwb25zZVwiIH0pKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGEgPSBhd2FpdCByZXNwb25zZS50ZXh0KCkuY2F0Y2goKCkgPT4gXCJcIik7IC8vIEhhbmRsZSBub24tSlNPTiByZXNwb25zZSBhcyB0ZXh0XG4gICAgICB9XG5cbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgY29uc3QgZXJyb3JNc2cgPVxuICAgICAgICAgIC8vIE1PRElGSUVEOiBDaGVjayBmb3IgRmFzdEFQSSdzICdkZXRhaWwnIGZpZWxkIGZpcnN0XG4gICAgICAgICAgZGF0YT8uZGV0YWlsIHx8XG4gICAgICAgICAgZGF0YT8uZXJyb3IgfHxcbiAgICAgICAgICBkYXRhPy5tc2cgfHxcbiAgICAgICAgICAodHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgJiYgZGF0YS5sZW5ndGggPiAwICYmIGRhdGEubGVuZ3RoIDwgNTAwIC8vIEhldXJpc3RpYyBmb3Igc2ltcGxlIHRleHQgZXJyb3JcbiAgICAgICAgICAgID8gZGF0YVxuICAgICAgICAgICAgOiBgUmVxdWVzdCBmYWlsZWQ6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmxvZ291dCgpO1xuICAgICAgICAgIC8vIE1PRElGSUVEOiBVc2UgRmFzdEFQSSdzIGRldGFpbCBtZXNzYWdlIGlmIGF2YWlsYWJsZSwgb3RoZXJ3aXNlIGEgZ2VuZXJpYyBvbmVcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YT8uZGV0YWlsIHx8IFwiQXV0aGVudGljYXRpb24gZXhwaXJlZC4gUGxlYXNlIGxvZyBpbiBhZ2Fpbi5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTXNnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgLy8gQ2F0Y2ggbmV0d29yayBlcnJvcnMgb3Igb3RoZXIgaXNzdWVzIGJlZm9yZSBmZXRjaCBldmVuIGNvbXBsZXRlc1xuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgVHlwZUVycm9yICYmIGVycm9yLm1lc3NhZ2UgPT09IFwiRmFpbGVkIHRvIGZldGNoXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5ldHdvcmsgZXJyb3I6IEZhaWxlZCB0byBjb25uZWN0IHRvICR7dGhpcy5nZXRCYWNrZW5kVXJsKCl9LiBQbGVhc2UgY2hlY2sgaWYgdGhlIHNlcnZlciBpcyBydW5uaW5nIGFuZCBhY2Nlc3NpYmxlLmApO1xuICAgICAgfVxuICAgICAgdGhyb3cgZXJyb3I7IC8vIFJlLXRocm93IG90aGVyIGVycm9yc1xuICAgIH1cbiAgfVxufVxuXG4vLyBDb29raWUgcmVtb3ZhbCBoZWxwZXIgKG5vIGNoYW5nZXMgbmVlZGVkIGZvciBBUEkgYWxpZ25tZW50KVxuYXN5bmMgZnVuY3Rpb24gcGVyZm9ybUNvb2tpZVJlbW92YWwoXG4gIGNvbW1hbmQ6IFwicmVtb3ZlVGhpcmRQYXJ0eVwiIHwgXCJjbGVhckFsbFNpdGVcIixcbiAgZG9tYWluOiBzdHJpbmdcbikge1xuICBpZiAoIWRvbWFpbilcbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBtZXNzYWdlOiBcIkRvbWFpbiByZXF1aXJlZFwiLFxuICAgICAgcmVtb3ZlZENvdW50OiAwLFxuICAgICAgZmFpbGVkQ291bnQ6IDAsXG4gICAgfTtcblxuICBjb25zdCBhbGxDb29raWVzID0gYXdhaXQgY2hyb21lLmNvb2tpZXMuZ2V0QWxsKHt9KTtcbiAgbGV0IGNvb2tpZXNUb1JlbW92ZTogY2hyb21lLmNvb2tpZXMuQ29va2llW10gPSBbXTtcblxuICBpZiAoY29tbWFuZCA9PT0gXCJyZW1vdmVUaGlyZFBhcnR5XCIpIHtcbiAgICBjb25zdCBzaXRlUm9vdCA9IGRvbWFpbi5zcGxpdChcIi5cIikuc2xpY2UoLTIpLmpvaW4oXCIuXCIpO1xuICAgIGNvb2tpZXNUb1JlbW92ZSA9IGFsbENvb2tpZXMuZmlsdGVyKChjb29raWUpID0+IHtcbiAgICAgIGNvbnN0IGNvb2tpZURvbWFpbiA9IGNvb2tpZS5kb21haW4uc3RhcnRzV2l0aChcIi5cIilcbiAgICAgICAgPyBjb29raWUuZG9tYWluLnN1YnN0cmluZygxKVxuICAgICAgICA6IGNvb2tpZS5kb21haW47XG4gICAgICBjb25zdCBjb29raWVSb290ID0gY29va2llRG9tYWluLnNwbGl0KFwiLlwiKS5zbGljZSgtMikuam9pbihcIi5cIik7XG4gICAgICBjb25zdCBpc0ZpcnN0UGFydHkgPVxuICAgICAgICBjb29raWVEb21haW4gPT09IGRvbWFpbiB8fFxuICAgICAgICBjb29raWVEb21haW4uZW5kc1dpdGgoYC4ke2RvbWFpbn1gKSB8fFxuICAgICAgICBkb21haW4uZW5kc1dpdGgoYC4ke2Nvb2tpZURvbWFpbn1gKTtcbiAgICAgIHJldHVybiAhaXNGaXJzdFBhcnR5ICYmIGNvb2tpZVJvb3QgIT09IHNpdGVSb290O1xuICAgIH0pO1xuICB9IGVsc2UgeyAvLyBjb21tYW5kID09PSBcImNsZWFyQWxsU2l0ZVwiXG4gICAgY29va2llc1RvUmVtb3ZlID0gYWxsQ29va2llcy5maWx0ZXIoKGNvb2tpZSkgPT4ge1xuICAgICAgY29uc3QgY29va2llRG9tYWluID0gY29va2llLmRvbWFpbi5zdGFydHNXaXRoKFwiLlwiKVxuICAgICAgICA/IGNvb2tpZS5kb21haW4uc3Vic3RyaW5nKDEpXG4gICAgICAgIDogY29va2llLmRvbWFpbjtcbiAgICAgIHJldHVybiBjb29raWVEb21haW4gPT09IGRvbWFpbiB8fCBjb29raWUuZG9tYWluID09PSBgLiR7ZG9tYWlufWA7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoIWNvb2tpZXNUb1JlbW92ZS5sZW5ndGgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIG1lc3NhZ2U6IFwiTm8gY29va2llcyB0byByZW1vdmVcIixcbiAgICAgIHJlbW92ZWRDb3VudDogMCxcbiAgICAgIGZhaWxlZENvdW50OiAwLFxuICAgIH07XG4gIH1cblxuICBsZXQgc3VjY2Vzc0NvdW50ID0gMCxcbiAgICBmYWlsQ291bnQgPSAwO1xuXG4gIGZvciAoY29uc3QgY29va2llIG9mIGNvb2tpZXNUb1JlbW92ZSkge1xuICAgIGNvbnN0IHVybCA9IGBodHRwJHtjb29raWUuc2VjdXJlID8gXCJzXCIgOiBcIlwifTovLyR7XG4gICAgICBjb29raWUuZG9tYWluLnN0YXJ0c1dpdGgoXCIuXCIpID8gY29va2llLmRvbWFpbi5zdWJzdHJpbmcoMSkgOiBjb29raWUuZG9tYWluXG4gICAgfSR7Y29va2llLnBhdGggfHwgXCIvXCJ9YDtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2hyb21lLmNvb2tpZXMucmVtb3ZlKHtcbiAgICAgICAgdXJsLFxuICAgICAgICBuYW1lOiBjb29raWUubmFtZSxcbiAgICAgICAgc3RvcmVJZDogY29va2llLnN0b3JlSWQsXG4gICAgICB9KTtcbiAgICAgIHJlc3VsdCA/IHN1Y2Nlc3NDb3VudCsrIDogZmFpbENvdW50Kys7XG4gICAgfSBjYXRjaCB7XG4gICAgICBmYWlsQ291bnQrKztcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN1Y2Nlc3M6IHN1Y2Nlc3NDb3VudCA+IDAsXG4gICAgbWVzc2FnZTogYFJlbW92ZWQgJHtzdWNjZXNzQ291bnR9LyR7Y29va2llc1RvUmVtb3ZlLmxlbmd0aH0gY29va2llcyR7XG4gICAgICBmYWlsQ291bnQgPiAwID8gYC4gJHtmYWlsQ291bnR9IGZhaWxlZGAgOiBcIlwiXG4gICAgfWAsXG4gICAgcmVtb3ZlZENvdW50OiBzdWNjZXNzQ291bnQsXG4gICAgZmFpbGVkQ291bnQ6IGZhaWxDb3VudCxcbiAgfTtcbn1cblxuLy8gSW5pdGlhbGl6ZVxuY29uc3QgYmFja2VuZENvbm5lY3RvciA9IEJhY2tlbmRDb25uZWN0b3IuZ2V0SW5zdGFuY2UoKTtcbmNvbnNvbGUubG9nKFwiU2FmZU5ldCBCYWNrZ3JvdW5kIFNlcnZpY2UgV29ya2VyIEluaXRpYWxpemVkLlwiKTtcblxuLy8gRXh0ZW5zaW9uIHNldHVwXG5jaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcihhc3luYyAoZGV0YWlscykgPT4ge1xuICBjb25zb2xlLmxvZyhcIlNhZmVOZXQgRXh0ZW5zaW9uIGluc3RhbGxlZC91cGRhdGVkOlwiLCBkZXRhaWxzLnJlYXNvbik7XG5cbiAgY29uc3QgeyBhaUJhY2tlbmRVcmwsIHRoZW1lIH0gPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoW1xuICAgIFwiYWlCYWNrZW5kVXJsXCIsXG4gICAgXCJ0aGVtZVwiLFxuICBdKTtcbiAgY29uc3QgZGVmYXVsdHM6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTtcblxuICAvLyBNT0RJRklFRDogRW5zdXJlIGRlZmF1bHQgYmFja2VuZCBVUkwgaXMgZnJvbSB0aGUgY29ubmVjdG9yIGluc3RhbmNlLFxuICAvLyB3aGljaCBub3cgY29ycmVjdGx5IGRlZmF1bHRzIHRvIFwiaHR0cDovLzEyNy4wLjAuMTo1MDAwXCJcbiAgaWYgKCFhaUJhY2tlbmRVcmwpIGRlZmF1bHRzLmFpQmFja2VuZFVybCA9IGJhY2tlbmRDb25uZWN0b3IuZ2V0QmFja2VuZFVybCgpO1xuICBpZiAoIXRoZW1lKSBkZWZhdWx0cy50aGVtZSA9IFwibGlnaHRcIjtcblxuICBpZiAoT2JqZWN0LmtleXMoZGVmYXVsdHMpLmxlbmd0aCkge1xuICAgIGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldChkZWZhdWx0cyk7XG4gICAgY29uc29sZS5sb2coXCJEZWZhdWx0IHNldHRpbmdzIGluaXRpYWxpemVkOlwiLCBkZWZhdWx0cyk7XG4gIH1cbn0pO1xuXG4vLyBNZXNzYWdlIGhhbmRsZXIgKG5vIGNoYW5nZXMgbmVlZGVkIGZvciBBUEkgYWxpZ25tZW50LCByZWxpZXMgb24gQmFja2VuZENvbm5lY3RvciBtZXRob2RzKVxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuICBpZiAoIW1lc3NhZ2U/LmFjdGlvbikge1xuICAgIHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJBY3Rpb24gbWlzc2luZ1wiIH0pO1xuICAgIHJldHVybiBmYWxzZTsgLy8gSW1wb3J0YW50IGZvciBhc3luYyBzZW5kUmVzcG9uc2VcbiAgfVxuXG4gIGNvbnN0IHsgYWN0aW9uLCBkYXRhIH0gPSBtZXNzYWdlO1xuICBjb25zdCBhc3luY0hhbmRsZXIgPSAocHJvbWlzZTogUHJvbWlzZTxhbnk+KSA9PiB7XG4gICAgcHJvbWlzZVxuICAgICAgLnRoZW4oc2VuZFJlc3BvbnNlKVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4gc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBlcnJvci5tZXNzYWdlIH0pKTtcbiAgICByZXR1cm4gdHJ1ZTsgLy8gSW5kaWNhdGUgYXN5bmMgcmVzcG9uc2VcbiAgfTtcblxuICBzd2l0Y2ggKGFjdGlvbikge1xuICAgIGNhc2UgXCJjaGVja0Nvbm5lY3Rpb25cIjpcbiAgICAgIHJldHVybiBhc3luY0hhbmRsZXIoYmFja2VuZENvbm5lY3Rvci5jaGVja0Nvbm5lY3Rpb24oZGF0YT8udXJsVG9UZXN0KSk7XG5cbiAgICBjYXNlIFwibG9naW5cIjpcbiAgICAgIGlmICghZGF0YT8uZW1haWwgfHwgIWRhdGE/LnBhc3N3b3JkKSB7XG4gICAgICAgIHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJFbWFpbCBhbmQgcGFzc3dvcmQgcmVxdWlyZWRcIiB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFzeW5jSGFuZGxlcihcbiAgICAgICAgYmFja2VuZENvbm5lY3RvclxuICAgICAgICAgIC5sb2dpbihkYXRhLmVtYWlsLCBkYXRhLnBhc3N3b3JkKVxuICAgICAgICAgIC50aGVuKChyZXMpID0+ICh7IHN1Y2Nlc3M6IHRydWUsIHRva2VuOiByZXMudG9rZW4gfSkpXG4gICAgICApO1xuXG4gICAgY2FzZSBcInJlZ2lzdGVyXCI6XG4gICAgICBpZiAoIWRhdGE/LmVtYWlsIHx8ICFkYXRhPy5wYXNzd29yZCkge1xuICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiRW1haWwgYW5kIHBhc3N3b3JkIHJlcXVpcmVkXCIgfSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIE1PRElGSUVEOiByZWdpc3RlciBub3cgcmV0dXJucyB7IHN1Y2Nlc3MsIG1lc3NhZ2UsIHVzZXIgfVxuICAgICAgcmV0dXJuIGFzeW5jSGFuZGxlcihiYWNrZW5kQ29ubmVjdG9yLnJlZ2lzdGVyKGRhdGEuZW1haWwsIGRhdGEucGFzc3dvcmQpKTtcblxuICAgIGNhc2UgXCJsb2dvdXRcIjpcbiAgICAgIHJldHVybiBhc3luY0hhbmRsZXIoXG4gICAgICAgIGJhY2tlbmRDb25uZWN0b3JcbiAgICAgICAgICAubG9nb3V0KClcbiAgICAgICAgICAudGhlbigoKSA9PiAoeyBzdWNjZXNzOiB0cnVlLCBtZXNzYWdlOiBcIkxvZ2dlZCBvdXRcIiB9KSlcbiAgICAgICk7XG5cbiAgICBjYXNlIFwiaXNMb2dnZWRJblwiOlxuICAgICAgc2VuZFJlc3BvbnNlKHtcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgaXNMb2dnZWRJbjogYmFja2VuZENvbm5lY3Rvci5pc0xvZ2dlZEluKCksXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmYWxzZTsgLy8gU3luY2hyb25vdXMgcmVzcG9uc2VcblxuICAgIGNhc2UgXCJhbmFseXplVXJsXCI6XG4gICAgICBpZiAoIWRhdGE/LnVybCkge1xuICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IFwiVVJMIHJlcXVpcmVkXCIgfSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhc3luY0hhbmRsZXIoXG4gICAgICAgIGJhY2tlbmRDb25uZWN0b3JcbiAgICAgICAgICAuYW5hbHl6ZVVybEFwaShkYXRhLnVybClcbiAgICAgICAgICAvLyBUaGUgcmVzdWx0IGZyb20gYW5hbHl6ZVVybEFwaSBpcyBkaXJlY3RseSB3aGF0IEZhc3RBUEkgcmV0dXJucy5cbiAgICAgICAgICAvLyBUaGUgVUkgKEFJQW5hbHl6ZXIudHN4KSBzaG91bGQgYmUgcmVzcG9uc2libGUgZm9yIHRyYW5zZm9ybWluZyB0aGlzLlxuICAgICAgICAgIC50aGVuKChyZXMpID0+ICh7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlcyB9KSlcbiAgICAgICk7XG5cbiAgICBjYXNlIFwiZ2V0QmFja2VuZFVybFwiOlxuICAgICAgc2VuZFJlc3BvbnNlKHtcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgYmFja2VuZFVybDogYmFja2VuZENvbm5lY3Rvci5nZXRCYWNrZW5kVXJsKCksXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmYWxzZTsgLy8gU3luY2hyb25vdXMgcmVzcG9uc2VcblxuICAgIGNhc2UgXCJzZXRCYWNrZW5kVXJsSW50ZXJuYWxcIjogLy8gVGhpcyBpcyBsaWtlbHkgZm9yIGRlYnVnZ2luZyBvciBhZHZhbmNlZCBzZXR0aW5nc1xuICAgICAgaWYgKCFkYXRhPy51cmwpIHtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIlVSTCByZXF1aXJlZFwiIH0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBiYWNrZW5kQ29ubmVjdG9yLl9zZXRCYWNrZW5kVXJsSW50ZXJuYWwoZGF0YS51cmwpO1xuICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSwgbmV3VXJsOiBkYXRhLnVybCB9KTtcbiAgICAgIHJldHVybiBmYWxzZTsgLy8gU3luY2hyb25vdXMgcmVzcG9uc2VcblxuICAgIGNhc2UgXCJjb29raWVBY3Rpb25cIjpcbiAgICAgIGlmICghZGF0YT8uY29tbWFuZCB8fCAhZGF0YT8uZG9tYWluKSB7XG4gICAgICAgIHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogXCJDb21tYW5kIGFuZCBkb21haW4gcmVxdWlyZWRcIiB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFzeW5jSGFuZGxlcihwZXJmb3JtQ29va2llUmVtb3ZhbChkYXRhLmNvbW1hbmQsIGRhdGEuZG9tYWluKSk7XG5cbiAgICBjYXNlIFwib3BlblNhZmVOZXRVSVwiOiAvLyBBc3N1bWluZyB0aGVzZSBhY3Rpb25zIG9wZW4gdGhlIHBvcHVwXG4gICAgY2FzZSBcIm9wZW5Qb3B1cFwiOlxuICAgICAgY2hyb21lLmFjdGlvbi5vcGVuUG9wdXAoKCkgPT4ge1xuICAgICAgICBjb25zdCBzdWNjZXNzID0gIWNocm9tZS5ydW50aW1lLmxhc3RFcnJvcjtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHtcbiAgICAgICAgICBzdWNjZXNzLFxuICAgICAgICAgIC4uLihzdWNjZXNzXG4gICAgICAgICAgICA/IHsgbWVzc2FnZTogXCJQb3B1cCBvcGVuZWRcIiB9XG4gICAgICAgICAgICA6IHsgZXJyb3I6IGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcj8ubWVzc2FnZSB9KSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cnVlOyAvLyBJbmRpY2F0ZSBhc3luYyByZXNwb25zZSAodGhvdWdoIG9wZW5Qb3B1cCBpcyB1c3VhbGx5IGZhc3QpXG5cbiAgICBkZWZhdWx0OlxuICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBgVW5rbm93biBhY3Rpb246ICR7YWN0aW9ufWAgfSk7XG4gICAgICByZXR1cm4gZmFsc2U7IC8vIFN5bmNocm9ub3VzIHJlc3BvbnNlXG4gIH1cbn0pOyJdLCJuYW1lcyI6W10sInZlcnNpb24iOjMsImZpbGUiOiJpbmRleC5qcy5tYXAifQ==
 globalThis.define=__define;  })(globalThis.define);