(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 4));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 14));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 17));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 18));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 19));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 23);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 24));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // ??????atob??????????????????????????????????????????`const Base64 = {atob};Base64.atob('xxxx')`??????????????????
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = tt.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('?????????????????????????????????????????????????????????' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function noop() {}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}
function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}
function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}
function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}
function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}
function isPromise(obj) {
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context????????????
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// ??????????????????
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
var CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name) || !isFn(api)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var _tt$getSystemInfoSync = tt.getSystemInfoSync(),
    platform = _tt$getSystemInfoSync.platform,
    pixelRatio = _tt$getSystemInfoSync.pixelRatio,
    windowWidth = _tt$getSystemInfoSync.windowWidth; // uni=>tt runtime ??????????????? uni ???????????????????????????????????? uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
var locale;
{
  locale = normalizeLocale(tt.getSystemInfoSync().language) || LOCALE_EN;
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // ?????????
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // ???????????? $locale
  if (isFn(getApp)) {
    var app = getApp({
      allowDefault: true
    });
    if (app && app.$vm) {
      return app.$vm.$locale;
    }
  }
  return normalizeLocale(tt.getSystemInfoSync().language) || LOCALE_EN;
}
function setLocale$1(locale) {
  var app = isFn(getApp) ? getApp() : false;
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
var EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {
    var _this2 = this;
    (0, _classCallCheck2.default)(this, EventChannel);
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(function (name) {
        _this2.on(name, events[name]);
      });
    }
  }
  (0, _createClass2.default)(EventChannel, [{
    key: "emit",
    value: function emit(eventName) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      var fns = this.listener[eventName];
      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }
      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {
        return opt.type !== 'once';
      });
    }
  }, {
    key: "on",
    value: function on(eventName, fn) {
      this._addListener(eventName, 'on', fn);
      this._clearCache(eventName);
    }
  }, {
    key: "once",
    value: function once(eventName, fn) {
      this._addListener(eventName, 'once', fn);
      this._clearCache(eventName);
    }
  }, {
    key: "off",
    value: function off(eventName, fn) {
      var fns = this.listener[eventName];
      if (!fns) {
        return;
      }
      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }
          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    }
  }, {
    key: "_clearCache",
    value: function _clearCache(eventName) {
      var cacheArgs = this.emitCache[eventName];
      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    }
  }, {
    key: "_addListener",
    value: function _addListener(eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type
      });
    }
  }]);
  return EventChannel;
}();
var eventChannels = {};
var eventChannelStack = [];
var id = 0;
function initEventChannel(events) {
  var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }
  return eventChannel;
}
function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}
var navigateTo = {
  args: function args(fromArgs, toArgs) {
    var id = initEventChannel(fromArgs.events).id;
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue: function returnValue(fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  }
};
function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}
var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || tt.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    tt.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}
function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-toutiao".indexOf('quickapp-webview') !== -1

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // ??? ?????? ?????? ??????

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__A928E0B",
    appName: "nianmao-tiktok",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.6.18",
    uniRuntimeVersion: "3.6.18",
    uniPlatform: undefined || "mp-toutiao",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined
  };
  Object.assign(result, parameters);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = "mp-toutiao".split('-')[1];
  var _hostName = result.hostName || _platform; // mp-jd
  {
    _hostName = result.appName;
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var oName = 'getUserInfo';
var nName = 'getUserProfile';
var getUserProfile = {
  name: tt.canIUse(nName) ? nName : oName
};

// ???????????? API ??????
var todos = ['preloadPage', 'unPreloadPage', 'loadSubPackage'
// 'createCameraContext',
// 'createLivePlayerContext',
// 'getSavedFileInfo',
// 'createMapContext',
// 'onMemoryWarning',
// 'onGyroscopeChange',
// 'startGyroscope',
// 'stopGyroscope',
// 'setScreenBrightness',
// 'getScreenBrightness',
// 'addPhoneContact',
// 'openBluetoothAdapter',
// 'startBluetoothDevicesDiscovery',
// 'onBluetoothDeviceFound',
// 'stopBluetoothDevicesDiscovery',
// 'onBluetoothAdapterStateChange',
// 'getConnectedBluetoothDevices',
// 'getBluetoothDevices',
// 'getBluetoothAdapterState',
// 'closeBluetoothAdapter',
// 'writeBLECharacteristicValue',
// 'readBLECharacteristicValue',
// 'onBLEConnectionStateChange',
// 'onBLECharacteristicValueChange',
// 'notifyBLECharacteristicValueChange',
// 'getBLEDeviceServices',
// 'getBLEDeviceCharacteristics',
// 'createBLEConnection',
// 'closeBLEConnection',
// 'onBeaconServiceChange',
// 'onBeaconUpdate',
// 'getBeacons',
// 'startBeaconDiscovery',
// 'stopBeaconDiscovery',
// 'showNavigationBarLoading',
// 'hideNavigationBarLoading',
// 'setTabBarItem',
// 'setTabBarStyle',
// 'hideTabBar',
// 'showTabBar',
// 'setTabBarBadge',
// 'removeTabBarBadge',
// 'showTabBarRedDot',
// 'hideTabBarRedDot',
// 'setBackgroundColor',
// 'setBackgroundTextStyle',
// 'chooseInvoiceTitle',
// 'addTemplate',
// 'deleteTemplate',
// 'getTemplateLibraryById',
// 'getTemplateLibraryList',
// 'getTemplateList',
// 'sendTemplateMessage',
// 'setEnableDebug',
// 'onWindowResize',
// 'offWindowResize',
// 'createOffscreenCanvas',
// 'vibrate'
];

// ?????????????????? API ??????
// ??????????????????1.35.0+??????canIUses
var canIUses = [
  // 'createIntersectionObserver',
  // 'getSavedFileList',
  // 'removeSavedFile',
  // 'hideKeyboard',
  // 'getImageInfo',
  // 'createVideoContext',
  // 'onSocketOpen',
  // 'onSocketError',
  // 'sendSocketMessage',
  // 'onSocketMessage',
  // 'closeSocket',
  // 'onSocketClose',
  // 'getExtConfig',
  // 'getExtConfigSync',
  // 'navigateToMiniProgram',
  // 'navigateBackMiniProgram',
  // 'compressImage',
  // 'chooseLocation',
  // 'openDocument',
  // 'onUserCaptureScreen',
  // 'getBackgroundAudioManager',
  // 'setNavigationBarColor',
];

// ?????????????????? API ??????
var protocols = {
  chooseImage: {
    args: {
      sizeType: false
    }
  },
  navigateTo: navigateTo,
  redirectTo: redirectTo,
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  getUserProfile: getUserProfile,
  connectSocket: {
    args: {
      method: false
    }
  },
  chooseVideo: {
    args: {
      camera: false
    }
  },
  scanCode: {
    args: {
      onlyFromCamera: false,
      scanType: false
    }
  },
  startAccelerometer: {
    args: {
      interval: false
    }
  },
  showToast: {
    args: {
      image: false,
      mask: false
    }
  },
  showLoading: {
    args: {
      mask: false
    }
  },
  showModal: {
    args: {
      cancelColor: false,
      confirmColor: false
    }
  },
  showActionSheet: {
    args: {
      itemColor: false
    }
  },
  login: {
    args: {
      scopes: false,
      timeout: false
    }
  },
  getUserInfo: {
    args: {
      lang: false,
      timeout: false
    }
  },
  requestPayment: {
    name: tt.pay ? 'pay' : 'requestPayment',
    args: {
      orderInfo: tt.pay ? 'orderInfo' : 'data'
    }
  },
  getFileInfo: {
    args: {
      digestAlgorithm: false
    }
  }
};
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // ?????? api ???????????????
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue ??? false ???????????????????????????????????????????????????????????????????????????
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {
          // ??????????????????
          console.warn("The '".concat(methodName, "' method of platform '\u5934\u6761\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // ???????????? key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}????????????????????? key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // ???????????? returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // ??????????????? api
      return function () {
        console.error("Platform '\u5934\u6761\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // ?????? api ??????????????????
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = tt[methodName].apply(tt, args);
      if (isSyncApi(methodName)) {
        // ?????? api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}
TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['toutiao'],
  share: ['toutiao'],
  payment: ['toutiao'],
  push: ['toutiao']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();
function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}
function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}
var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});
function createMediaQueryObserver() {
  var mediaQueryObserver = {};
  var _tt$getSystemInfoSync2 = tt.getSystemInfoSync(),
    windowWidth = _tt$getSystemInfoSync2.windowWidth,
    windowHeight = _tt$getSystemInfoSync2.windowHeight;
  var orientation = windowWidth < windowHeight ? 'portrait' : 'landscape';
  mediaQueryObserver.observe = function (options, callback) {
    var matches = true;
    for (var item in options) {
      var itemValue = item === 'orientation' ? options[item] : Number(options[item]);
      if (options[item] !== '') {
        if (item === 'width') {
          if (itemValue === windowWidth) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'minWidth') {
          if (windowWidth >= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'maxWidth') {
          if (windowWidth <= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'height') {
          if (itemValue === windowHeight) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'minHeight') {
          if (windowHeight >= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'maxHeight') {
          if (windowHeight <= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'orientation') {
          if (options[item] === orientation) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
      }
    }
    callback(matches);
    return matches;
  };
  mediaQueryObserver.disconnect = function () {};
  return mediaQueryObserver;
}

/**
 * ????????? try-catch
 */
/**
 * ????????? try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // ?????????????????????
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// ????????? defineOnApi ?????????????????? defineOnApi ?????? UniServiceJSBridge ????????????????????????????????????????????????????????????
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  createMediaQueryObserver: createMediaQueryObserver,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback
});
function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // ??????????????????(????????????:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // ??????????????????
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function initBehavior(options) {
  return Behavior(options);
}
function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO ???????????? for ?????? scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail ?????????,value ?????????(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // ??? Vue ???????????????????????????
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // ????????? @vue/composition-api ??????
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    // ???????????????????????????????????????????????????????????? vue ???????????????????????? vue ???????????????
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    }
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // ??????????????? triggerEvent ?????????
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  {
    // fix by Lxh ?????????????????????Component????????????????????????created???????????????????????????lifetimes??????created
    isComponent && options.lifetimes && options.lifetimes[name] && (options = options.lifetimes);
  }
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options, true);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}
function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }
  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }
  vueOptions = vueOptions.default || vueOptions;
  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}
function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}
function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}
function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}
function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;
  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}
function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};
  if (typeof data === 'function') {
    try {
      data = data.call(context); // ?????? Vue.prototype ???????????????
    } catch (e) {
      if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"nianmao-tiktok","VUE_APP_PLATFORM":"mp-toutiao","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('?????? Vue ??? data ???????????????????????? data ???????????????????????? data ?????????????????? vm ??????????????????????????????????????????????????????', data);
      }
    }
  } else {
    try {
      // ??? data ?????????
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }
  if (!isPlainObject(data)) {
    data = {};
  }
  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}
var PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // ????????????????????? render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "tt".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }
  return behaviors;
}
function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    {
      // ?????????????????????????????????????????????
      properties.generic = {
        type: Object,
        value: null
      };
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // ??????????????????????????? $slots ??? props??????????????? vueSlots ????????? $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties;
}
function wrapper$1(event) {
  // TODO ???????????? mpvue ??? mp ??????
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}
  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};
  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }
  if (hasOwn(event, 'markerId')) {
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }
  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }
  return event;
}
function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }
      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for ???????????????????????????', vFor);
        }
      }
      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}
function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};
  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }
  return extraObj;
}
function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent ????????????????????? event ??????

  // fixed ?????????????????? mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // ???????????????
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // ???????????????????????? event ??? detail ??????
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent ?????????????????????
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}
var ONCE = '~';
var CUSTOM = '^';
function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // ???????????? scoped slots ??????????????????????????????????????????
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this3 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('?????????????????????');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // ????????? web-view ?????? dataset ?????????
  if (!eventOpts) {
    return console.warn('?????????????????????');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;
    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this3.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao ?????????????????? scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this3.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this3.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this3.route || _this3.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this3.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
          params = Array.isArray(params) ? params : [];
          // ??????????????????????????????????????????????????????????????????????????????
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
function initEventChannel$1() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__;
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };
  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };
  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel$1();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-toutiao";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // ?????????????????????????????????????????????????????? onShow ??? onLaunch ??????
        return;
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm ???????????? globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // ??????????????? globalData
  appOptions.globalData = vm.$options.globalData || {};
  // ??? methods ?????????????????? getApp() ???
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, normalizeLocale(tt.getSystemInfoSync().language) || LOCALE_EN);
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
var mocks = ['__route__', '__webviewId__', '__nodeid__', '__nodeId__'];
function isPage() {
  return this.__nodeid__ === 0 || this.__nodeId__ === 0;
}
function initRefs$1(vm) {
  var mpInstance = vm.$scope;
  /* eslint-disable no-undef */
  var minorVersion = parseInt(tt.getSystemInfoSync().SDKVersion.split('.')[1]);
  if (minorVersion > 16) {
    initRefs(vm);
  } else {
    mpInstance.selectAllComponents('.vue-ref', function (components) {
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        vm.$refs[ref] = component.$vm || toSkip(component);
      });
    });
    mpInstance.selectAllComponents('.vue-ref-in-for', function (forComponents) {
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!vm.$refs[ref]) {
          vm.$refs[ref] = [];
        }
        vm.$refs[ref].push(component.$vm || toSkip(component));
      });
    });
  }
}
var instances = Object.create(null);
var components = Object.create(null);
function initRelation(_ref5) {
  var vuePid = _ref5.vuePid,
    mpInstance = _ref5.mpInstance;
  // ?????? triggerEvent ???????????????????????????????????????????????? ready ??????
  var nodeId = (mpInstance.__nodeId__ || mpInstance.__nodeid__) + '';
  var webviewId = mpInstance.__webviewId__ + '';
  instances[webviewId + '_' + nodeId] = mpInstance.$vm;
  this.triggerEvent('__l', {
    vuePid: vuePid,
    nodeId: nodeId,
    webviewId: webviewId
  });
}
function handleLink$1(_ref6) {
  var _ref6$detail = _ref6.detail,
    vuePid = _ref6$detail.vuePid,
    nodeId = _ref6$detail.nodeId,
    webviewId = _ref6$detail.webviewId;
  var vm = instances[webviewId + '_' + nodeId];
  if (!vm) {
    return;
  }
  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vm.$parent = parentVm;
  vm.$root = parentVm.$root;
  parentVm.$children.push(vm);
  vm.__call_hook('created');
  vm.__call_hook('beforeMount');
  vm._isMounted = true;
  vm.__call_hook('mounted');
  vm.__call_hook('onReady');
}
function parseApp(vm) {
  _vue.default.prototype._$fallback = true; // ?????????????????? vue ??????????????????????????? created???beforeMount,inject,provide???

  _vue.default.mixin({
    created: function created() {
      // ?????? injections,?????? triggerEvent ????????????????????????????????????????????? relation ??????
      if (this.mpType !== 'app') {
        if (this.mpType === 'page' && !this.$scope.route && this.$scope.__route__) {
          this.$scope.route = this.$scope.__route__;
        }
        initRefs$1(this);
        this.__init_injections(this);
        this.__init_provide(this);
      }
    }
  });
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: function initRefs() {} // attached ????????????????????????
  });
}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (val === undefined) {
      return '';
    }
    if (val === null) {
      return encodeStr(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }
    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref7.isPage,
    initRelation = _ref7.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true
  }, vueOptions.options || {});
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // ??????????????????
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // ????????? vue ??????
        this.$vm = new VueComponent(options);

        // ??????$slots,$scopedSlots???????????????????????????$slots???
        initSlots(this.$vm, properties.vueSlots);

        // ???????????? setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // ????????? props ???????????? true????????????????????? false ????????? created,ready ??????, ??? attached ?????????
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }
  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function currentComponents(mpInstance, callback) {
  var webviewId = mpInstance.__webviewId__;
  var currentComponents = components[webviewId];
  if (currentComponents) {
    callback(currentComponents);
  }
}
function parseComponent(vueComponentOptions, needVueOptions) {
  var _parseBaseComponent = parseBaseComponent(vueComponentOptions, {
      isPage: isPage,
      initRelation: initRelation
    }, true),
    _parseBaseComponent2 = (0, _slicedToArray2.default)(_parseBaseComponent, 3),
    componentOptions = _parseBaseComponent2[0],
    vueOptions = _parseBaseComponent2[1],
    VueComponent = _parseBaseComponent2[2];
  var lifetimes = componentOptions.lifetimes;

  // ????????? 2.0 ?????? attached ????????????????????? created ??????????????????
  lifetimes.created = function created() {
    var _this4 = this;
    currentComponents(this, function (components) {
      components.push(_this4);
    });
  };
  lifetimes.attached = function attached() {
    var _this5 = this;
    this.__lifetimes_attached = function () {
      var properties = this.properties;
      var options = {
        mpType: isPage.call(this) ? 'page' : 'component',
        mpInstance: this,
        propsData: properties
      };
      initVueIds(properties.vueId, this);

      // ????????? vue ??????
      this.$vm = new VueComponent(options);

      // ??????$slots,$scopedSlots???????????????????????????$slots???
      initSlots(this.$vm, properties.vueSlots);

      // ??????????????????
      initRelation.call(this, {
        vuePid: this._$vuePid,
        mpInstance: this
      });

      // ???????????? setData
      this.$vm.$mount();
    };
    currentComponents(this, function (components) {
      var component = _this5;
      while (component && component.__lifetimes_attached && components[0] && component === components[0]) {
        components.shift();
        component.__lifetimes_attached();
        delete component.__lifetimes_attached;
        component = components[0];
      }
    });
  };
  var oldDetached = lifetimes.detached;
  lifetimes.detached = function detached() {
    var _this6 = this;
    if (typeof oldDetached === 'function') {
      oldDetached.call(this);
    }
    currentComponents(this, function (components) {
      var index = components.indexOf(_this6);
      if (index >= 0) {
        components.splice(index, 1);
      }
    });
  };

  // ready ??? handleLink ?????????????????????????????? handleLink ???
  delete lifetimes.ready;
  componentOptions.methods.__l = handleLink$1;
  return needVueOptions ? [componentOptions, vueOptions] : componentOptions;
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent = parseComponent(vuePageOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    pageOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // ?????? mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  var pageOptions = parseBasePage(vuePageOptions);
  var lifetimes = pageOptions.lifetimes;
  var oldCreated = lifetimes.created;
  lifetimes.created = function created() {
    var webviewId = this.__webviewId__;
    components[webviewId] = [];
    if (typeof oldCreated === 'function') {
      oldCreated.call(this);
    }
  };
  // ??????????????? ready ?????????????????????????????? handleLink ?????????
  lifetimes.ready = function ready() {
    if (this.$vm && this.$vm.mpType === 'page') {
      this.$vm.__call_hook('created');
      this.$vm.__call_hook('beforeMount');
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted');
      this.$vm.__call_hook('onReady');
    } else {
      this.is && console.warn(this.is + ' is not ready');
    }
  };
  var oldDetached = lifetimes.detached;
  lifetimes.detached = function detached() {
    if (typeof oldDetached === 'function') {
      oldDetached.call(this);
    }
    // ??????
    var webviewId = this.__webviewId__;
    webviewId && Object.keys(instances).forEach(function (key) {
      if (key.indexOf(webviewId + '_') === 0) {
        delete instances[key];
      }
    });
    delete components[webviewId];
  };
  return pageOptions;
}
function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}
function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}
function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && tt.onAppShow) {
    tt.onAppShow(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && tt.onAppHide) {
    tt.onAppHide(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = tt.getLaunchOptionsSync && tt.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && tt.onAppShow) {
    tt.onAppShow(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && tt.onAppHide) {
    tt.onAppHide(function () {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = tt.getLaunchOptionsSync && tt.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!tt.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};
if (typeof Proxy !== 'undefined' && "mp-toutiao" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      return promisify(name, wrapper(name, tt[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(tt).forEach(function (name) {
    if (hasOwn(tt, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, tt[name]));
    }
  });
}
tt.createApp = createApp;
tt.createPage = createPage;
tt.createComponent = createComponent;
tt.createSubpackageApp = createSubpackageApp;
tt.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 2 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 4 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 5);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 6);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 7);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 9);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 5 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 6 */
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 7 */
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 8);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 8 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 9 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 10 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 11);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 11 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 12)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 13);
function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 12 */
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 13 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 12)["default"];
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 14 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 15);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 16);
function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
  return _construct.apply(null, arguments);
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 15 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 16 */
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 17 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 18 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 11);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 19 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 20);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 21);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 7);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 22);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 20 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 8);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 21 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 22 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 23 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 4));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 17));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 18));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
var isArray = Array.isArray;
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // ???????????????????????????
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // ???????????????????????????
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // ???????????? watch ??????????????????????????????
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // ??????????????????uni ??? uni-i18n ????????????????????????????????? uni????????? global ????????? getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // ?????????????????????
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // ????????????????????????uni-i18n ??? uni ????????????????????????????????? uni ????????? undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // ??????$vm????????????????????????????????????????????????????????????????????????props???default????????????t()????????????uni-goods-nav????????????app???????????????
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // ???????????????
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // ???????????????
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // ????????????????????????
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 24 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx ????????????????????? plugins ???????????????????????????????????????????????????????????????????????? copyAugment ??????
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue &&
    !value.__v_isMPComponent
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // ?????? externalClass ????????????(????????? externalClass ????????????????????????)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx ?????? hack ??? uni-app ???????????? name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//??????????????????????????? observer ??? setData callback ?????????????????????????????? warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field ????????????
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"nianmao-tiktok","VUE_APP_PLATFORM":"mp-toutiao","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick ?????? ??? setData ??? setData ??????????????????
    //2.nextTick ???????????? render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"nianmao-tiktok","VUE_APP_PLATFORM":"mp-toutiao","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"nianmao-tiktok","VUE_APP_PLATFORM":"mp-toutiao","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function clearInstance(key, value) {
  // ???????????? Vue ????????????????????????
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

function cloneWithData(vm) {
  // ???????????? vm ?????????????????????
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO ??????????????????????????????????????? list=>l0 ??? list ??????????????????????????????????????????
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret, clearInstance))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //????????? data ???????????????
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"nianmao-tiktok","VUE_APP_PLATFORM":"mp-toutiao","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']????????????',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js ?????? new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay ???????????? selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // ????????????????????????
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // ????????????????????????
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO ???????????? string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // ??????????????????????????????????????????
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // ???????????????????????????????????????
    'onPageShow',
    'onPageHide',
    'onPageResize',
    'onUploadDouyinVideo'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 25 */
/*!************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/pages.json ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/*!********************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/api.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vipList = exports.tenface = exports.resultFace = exports.payPal = exports.login = exports.likeStatusGet = exports.likeList = exports.info = exports.imageAtion = exports.hsearch = exports.getOppenId = exports.createFaceTask = exports.collectFace = exports.classify = void 0;
var _request = _interopRequireDefault(__webpack_require__(/*! ./utils/request.js */ 30));
var _operate = _interopRequireDefault(__webpack_require__(/*! ./common/operate.js */ 31));
var request = new _request.default().http;

//??????oppenid?????????
var getOppenId = function getOppenId(data) {
  return request({
    url: "/api/v6.dysmall/getOpenid",
    method: "POST",
    data: data || ''
  });
};
//????????????
exports.getOppenId = getOppenId;
var login = function login(data) {
  return request({
    url: '/api/v1.user/login',
    method: 'POST',
    data: data || ''
  });
};

//?????????????????????
exports.login = login;
var info = function info(data) {
  return request({
    url: "/api/v1.user/info",
    method: "POST",
    data: data || ""
  });
};

//??????????????????
exports.info = info;
var classify = function classify(data) {
  return request({
    url: "/api/v3.template/tenfacetype",
    method: "POST",
    data: data || ''
  });
};

//??????????????????
exports.classify = classify;
var tenface = function tenface(data) {
  return request({
    url: "/api/v3.template/tenface",
    method: "POST",
    data: data || ''
  });
};

//??????????????????
exports.tenface = tenface;
var vipList = function vipList(data) {
  return request({
    url: "/api/v1.combos/index",
    method: "POST",
    data: data || ''
  });
};

//???????????????????????????
exports.vipList = vipList;
var collectFace = function collectFace(data) {
  return request({
    url: "/api/v4.tenface/like",
    method: "POST",
    data: data || ''
  });
};

//???????????????????????????
exports.collectFace = collectFace;
var likeStatusGet = function likeStatusGet(data) {
  return request({
    url: "/api/v4.tenface/likeStatusGet",
    method: "POST",
    data: data || ''
  });
};

//??????????????????
exports.likeStatusGet = likeStatusGet;
var likeList = function likeList(data) {
  return request({
    url: "/api/v4.tenface/likeList",
    method: "POST",
    data: data || ''
  });
};

//????????????
exports.likeList = likeList;
var payPal = function payPal(data) {
  return request({
    url: "/api/v6.wxorder/create",
    method: "POST",
    data: data || ''
  });
};

//?????????????????????
exports.payPal = payPal;
var hsearch = function hsearch(data) {
  return request({
    url: "/api/v3.draft/hsearch",
    method: "POST",
    data: data || ''
  });
};

//??????????????????
exports.hsearch = hsearch;
var createFaceTask = function createFaceTask(data) {
  return request({
    url: "/api/v4.tenface/createFaceTask",
    method: "POST",
    data: data || ""
  });
};

//??????????????????
exports.createFaceTask = createFaceTask;
var imageAtion = function imageAtion(data) {
  return request({
    url: "/api/v5.faceai/imageAtion",
    method: "POST",
    data: data || ""
  });
};
exports.imageAtion = imageAtion;
var resultFace = function resultFace(data) {
  return request({
    url: "/api/v4.tenface/resultFace",
    method: "POST",
    data: data || ''
  });
};
exports.resultFace = resultFace;

/***/ }),
/* 30 */
/*!******************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/utils/request.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 17));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 18));
var _operate = _interopRequireDefault(__webpack_require__(/*! ../common/operate.js */ 31));
var _md = _interopRequireDefault(__webpack_require__(/*! md5 */ 32));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Request = /*#__PURE__*/function () {
  function Request() {
    (0, _classCallCheck2.default)(this, Request);
  }
  (0, _createClass2.default)(Request, [{
    key: "http",
    value: function http(param) {
      // ?????????key????????????
      var ksort = function ksort(params) {
        var keys = Object.keys(params).sort();
        var newParams = {};
        keys.forEach(function (key) {
          newParams[key] = params[key];
        });
        return newParams;
      };

      // ?????????????????????URL??????
      var obj2strUrl = function obj2strUrl(obj) {
        var str = "";
        for (var key in obj) {
          str = "".concat(str).concat(key, "=").concat(obj[key], "&");
        }
        ;
        str = str.substring(0, str.length - 1);
        return str;
      };
      var plat = uni.getStorageSync('platform');
      var openId = uni.getStorageSync('openId');
      var info = uni.getStorageSync('info');
      var form = {
        app_id: '70000',
        channel: 'douyin',
        version: '1.1.0',
        versionCode: '110',
        timestamp: new Date().getTime(),
        imei_zt: openId.openid || '',
        imei: openId.openid || '',
        idfa: openId.openid || '',
        platform: plat,
        uuid: info.uuid || '',
        token: info.token || ''
      };

      // ????????????
      var url = param.url,
        method = param.method,
        header = {},
        data = _objectSpread(_objectSpread({}, form), param.data) || _objectSpread({}, form),
        hideLoading = param.hideLoading || false;
      //????????????????????????
      var requestUrl = _operate.default.api + url;
      var ksort_obj = ksort(data); // ???????????????
      var obj2strUrl_temp = obj2strUrl(ksort_obj) + '&123456ABCDEFGHIJKL{(&#!,.&*)}MNOPQRSTUVWXYZ789070000';

      // ???????????????URL????????????????????????+secret
      data.sign = (0, _md.default)(obj2strUrl_temp); // ??????md5??????
      if (method) {
        method = method.toUpperCase(); //??????????????????
        if (method == "POST") {
          header = {
            'content-type': "application/json"
          };
        } else {
          header = {
            'content-type': "application/json"
          };
        }
      }

      //?????????
      if (!hideLoading) {
        uni.showLoading({
          title: '?????????...'
        });
      }

      // ??????promise
      return new Promise(function (resolve, reject) {
        // ??????
        uni.request({
          url: requestUrl,
          data: data,
          method: method,
          header: header,
          success: function success(res) {
            // ?????? ??????api ??????????????????
            if (res.statusCode && res.statusCode != 200) {
              uni.showToast({
                title: "api??????" + res.errMsg,
                icon: 'none'
              });
              return;
            }
            // ???????????????
            resolve(res.data);
          },
          //????????????
          fail: function fail(e) {
            uni.showToast({
              // title: "" + e.data.msg,
              title: "" + e.data,
              icon: 'none'
            });
            resolve(e.data);
          },
          //????????????
          complete: function complete() {
            //????????????
            if (!hideLoading) {
              uni.hideLoading();
            }
            resolve();
            return;
          }
        });
      });
    }
  }]);
  return Request;
}();
exports.default = Request;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),
/* 31 */
/*!*******************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/common/operate.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  api: "http://cat.fwyouni.com"
};
exports.default = _default;

/***/ }),
/* 32 */
/*!*************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/md5/md5.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function () {
  var crypt = __webpack_require__(/*! crypt */ 33),
    utf8 = __webpack_require__(/*! charenc */ 34).utf8,
    isBuffer = __webpack_require__(/*! is-buffer */ 35),
    bin = __webpack_require__(/*! charenc */ 34).bin,
    // The core
    md5 = function md5(message, options) {
      // Convert to byte array
      if (message.constructor == String) {
        if (options && options.encoding === 'binary') message = bin.stringToBytes(message);else message = utf8.stringToBytes(message);
      } else if (isBuffer(message)) message = Array.prototype.slice.call(message, 0);else if (!Array.isArray(message) && message.constructor !== Uint8Array) message = message.toString();
      // else, assume byte array already

      var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a = 1732584193,
        b = -271733879,
        c = -1732584194,
        d = 271733878;

      // Swap endian
      for (var i = 0; i < m.length; i++) {
        m[i] = (m[i] << 8 | m[i] >>> 24) & 0x00FF00FF | (m[i] << 24 | m[i] >>> 8) & 0xFF00FF00;
      }

      // Padding
      m[l >>> 5] |= 0x80 << l % 32;
      m[(l + 64 >>> 9 << 4) + 14] = l;

      // Method shortcuts
      var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;
      for (var i = 0; i < m.length; i += 16) {
        var aa = a,
          bb = b,
          cc = c,
          dd = d;
        a = FF(a, b, c, d, m[i + 0], 7, -680876936);
        d = FF(d, a, b, c, m[i + 1], 12, -389564586);
        c = FF(c, d, a, b, m[i + 2], 17, 606105819);
        b = FF(b, c, d, a, m[i + 3], 22, -1044525330);
        a = FF(a, b, c, d, m[i + 4], 7, -176418897);
        d = FF(d, a, b, c, m[i + 5], 12, 1200080426);
        c = FF(c, d, a, b, m[i + 6], 17, -1473231341);
        b = FF(b, c, d, a, m[i + 7], 22, -45705983);
        a = FF(a, b, c, d, m[i + 8], 7, 1770035416);
        d = FF(d, a, b, c, m[i + 9], 12, -1958414417);
        c = FF(c, d, a, b, m[i + 10], 17, -42063);
        b = FF(b, c, d, a, m[i + 11], 22, -1990404162);
        a = FF(a, b, c, d, m[i + 12], 7, 1804603682);
        d = FF(d, a, b, c, m[i + 13], 12, -40341101);
        c = FF(c, d, a, b, m[i + 14], 17, -1502002290);
        b = FF(b, c, d, a, m[i + 15], 22, 1236535329);
        a = GG(a, b, c, d, m[i + 1], 5, -165796510);
        d = GG(d, a, b, c, m[i + 6], 9, -1069501632);
        c = GG(c, d, a, b, m[i + 11], 14, 643717713);
        b = GG(b, c, d, a, m[i + 0], 20, -373897302);
        a = GG(a, b, c, d, m[i + 5], 5, -701558691);
        d = GG(d, a, b, c, m[i + 10], 9, 38016083);
        c = GG(c, d, a, b, m[i + 15], 14, -660478335);
        b = GG(b, c, d, a, m[i + 4], 20, -405537848);
        a = GG(a, b, c, d, m[i + 9], 5, 568446438);
        d = GG(d, a, b, c, m[i + 14], 9, -1019803690);
        c = GG(c, d, a, b, m[i + 3], 14, -187363961);
        b = GG(b, c, d, a, m[i + 8], 20, 1163531501);
        a = GG(a, b, c, d, m[i + 13], 5, -1444681467);
        d = GG(d, a, b, c, m[i + 2], 9, -51403784);
        c = GG(c, d, a, b, m[i + 7], 14, 1735328473);
        b = GG(b, c, d, a, m[i + 12], 20, -1926607734);
        a = HH(a, b, c, d, m[i + 5], 4, -378558);
        d = HH(d, a, b, c, m[i + 8], 11, -2022574463);
        c = HH(c, d, a, b, m[i + 11], 16, 1839030562);
        b = HH(b, c, d, a, m[i + 14], 23, -35309556);
        a = HH(a, b, c, d, m[i + 1], 4, -1530992060);
        d = HH(d, a, b, c, m[i + 4], 11, 1272893353);
        c = HH(c, d, a, b, m[i + 7], 16, -155497632);
        b = HH(b, c, d, a, m[i + 10], 23, -1094730640);
        a = HH(a, b, c, d, m[i + 13], 4, 681279174);
        d = HH(d, a, b, c, m[i + 0], 11, -358537222);
        c = HH(c, d, a, b, m[i + 3], 16, -722521979);
        b = HH(b, c, d, a, m[i + 6], 23, 76029189);
        a = HH(a, b, c, d, m[i + 9], 4, -640364487);
        d = HH(d, a, b, c, m[i + 12], 11, -421815835);
        c = HH(c, d, a, b, m[i + 15], 16, 530742520);
        b = HH(b, c, d, a, m[i + 2], 23, -995338651);
        a = II(a, b, c, d, m[i + 0], 6, -198630844);
        d = II(d, a, b, c, m[i + 7], 10, 1126891415);
        c = II(c, d, a, b, m[i + 14], 15, -1416354905);
        b = II(b, c, d, a, m[i + 5], 21, -57434055);
        a = II(a, b, c, d, m[i + 12], 6, 1700485571);
        d = II(d, a, b, c, m[i + 3], 10, -1894986606);
        c = II(c, d, a, b, m[i + 10], 15, -1051523);
        b = II(b, c, d, a, m[i + 1], 21, -2054922799);
        a = II(a, b, c, d, m[i + 8], 6, 1873313359);
        d = II(d, a, b, c, m[i + 15], 10, -30611744);
        c = II(c, d, a, b, m[i + 6], 15, -1560198380);
        b = II(b, c, d, a, m[i + 13], 21, 1309151649);
        a = II(a, b, c, d, m[i + 4], 6, -145523070);
        d = II(d, a, b, c, m[i + 11], 10, -1120210379);
        c = II(c, d, a, b, m[i + 2], 15, 718787259);
        b = II(b, c, d, a, m[i + 9], 21, -343485551);
        a = a + aa >>> 0;
        b = b + bb >>> 0;
        c = c + cc >>> 0;
        d = d + dd >>> 0;
      }
      return crypt.endian([a, b, c, d]);
    };

  // Auxiliary functions
  md5._ff = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return (n << s | n >>> 32 - s) + b;
  };
  md5._gg = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return (n << s | n >>> 32 - s) + b;
  };
  md5._hh = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return (n << s | n >>> 32 - s) + b;
  };
  md5._ii = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return (n << s | n >>> 32 - s) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;
  module.exports = function (message, options) {
    if (message === undefined || message === null) throw new Error('Illegal argument ' + message);
    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes : options && options.asString ? bin.bytesToString(digestbytes) : crypt.bytesToHex(digestbytes);
  };
})();

/***/ }),
/* 33 */
/*!*****************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypt/crypt.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
  var base64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    crypt = {
      // Bit-wise rotation left
      rotl: function rotl(n, b) {
        return n << b | n >>> 32 - b;
      },
      // Bit-wise rotation right
      rotr: function rotr(n, b) {
        return n << 32 - b | n >>> b;
      },
      // Swap big-endian to little-endian and vice versa
      endian: function endian(n) {
        // If number given, swap endian
        if (n.constructor == Number) {
          return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
        }

        // Else, assume array and swap all items
        for (var i = 0; i < n.length; i++) {
          n[i] = crypt.endian(n[i]);
        }
        return n;
      },
      // Generate an array of any length of random bytes
      randomBytes: function randomBytes(n) {
        for (var bytes = []; n > 0; n--) {
          bytes.push(Math.floor(Math.random() * 256));
        }
        return bytes;
      },
      // Convert a byte array to big-endian 32-bit words
      bytesToWords: function bytesToWords(bytes) {
        for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8) {
          words[b >>> 5] |= bytes[i] << 24 - b % 32;
        }
        return words;
      },
      // Convert big-endian 32-bit words to a byte array
      wordsToBytes: function wordsToBytes(words) {
        for (var bytes = [], b = 0; b < words.length * 32; b += 8) {
          bytes.push(words[b >>> 5] >>> 24 - b % 32 & 0xFF);
        }
        return bytes;
      },
      // Convert a byte array to a hex string
      bytesToHex: function bytesToHex(bytes) {
        for (var hex = [], i = 0; i < bytes.length; i++) {
          hex.push((bytes[i] >>> 4).toString(16));
          hex.push((bytes[i] & 0xF).toString(16));
        }
        return hex.join('');
      },
      // Convert a hex string to a byte array
      hexToBytes: function hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2) {
          bytes.push(parseInt(hex.substr(c, 2), 16));
        }
        return bytes;
      },
      // Convert a byte array to a base-64 string
      bytesToBase64: function bytesToBase64(bytes) {
        for (var base64 = [], i = 0; i < bytes.length; i += 3) {
          var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
          for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 <= bytes.length * 8) base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 0x3F));else base64.push('=');
          }
        }
        return base64.join('');
      },
      // Convert a base-64 string to a byte array
      base64ToBytes: function base64ToBytes(base64) {
        // Remove non-base-64 characters
        base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');
        for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
          if (imod4 == 0) continue;
          bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
        }
        return bytes;
      }
    };
  module.exports = crypt;
})();

/***/ }),
/* 34 */
/*!*********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/charenc/charenc.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function stringToBytes(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },
    // Convert a byte array to a string
    bytesToString: function bytesToString(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },
  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function stringToBytes(str) {
      for (var bytes = [], i = 0; i < str.length; i++) {
        bytes.push(str.charCodeAt(i) & 0xFF);
      }
      return bytes;
    },
    // Convert a byte array to a string
    bytesToString: function bytesToString(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++) {
        str.push(String.fromCharCode(bytes[i]));
      }
      return str.join('');
    }
  }
};
module.exports = charenc;

/***/ }),
/* 35 */
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 36 */
/*!**************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/utils/aes.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decryptedFun = void 0;
// ??????
// import {aesKey} from '@/util/config.js'
var CryptoJS = __webpack_require__(/*! crypto-js */ 37);
var decryptedFun = function decryptedFun(ciphertext) {
  // ??????????????????16??????
  var aesKey = '362DA87FA3E89A95';
  var keyHex = CryptoJS.enc.Utf8.parse(aesKey);

  // ??????????????????16??????
  var ciphertextHex = CryptoJS.enc.Hex.parse(ciphertext);

  // ??????
  var decrypted = CryptoJS.AES.decrypt({
    ciphertext: ciphertextHex
  }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });

  // ??????????????????????????????utf8?????????
  var plaintext = decrypted.toString(CryptoJS.enc.Utf8);

  // ????????????????????????

  return JSON.parse(plaintext);
};
exports.decryptedFun = decryptedFun;

/***/ }),
/* 37 */
/*!*********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./x64-core */ 40), __webpack_require__(/*! ./lib-typedarrays */ 41), __webpack_require__(/*! ./enc-utf16 */ 42), __webpack_require__(/*! ./enc-base64 */ 43), __webpack_require__(/*! ./enc-base64url */ 44), __webpack_require__(/*! ./md5 */ 45), __webpack_require__(/*! ./sha1 */ 46), __webpack_require__(/*! ./sha256 */ 47), __webpack_require__(/*! ./sha224 */ 48), __webpack_require__(/*! ./sha512 */ 49), __webpack_require__(/*! ./sha384 */ 50), __webpack_require__(/*! ./sha3 */ 51), __webpack_require__(/*! ./ripemd160 */ 52), __webpack_require__(/*! ./hmac */ 53), __webpack_require__(/*! ./pbkdf2 */ 54), __webpack_require__(/*! ./evpkdf */ 55), __webpack_require__(/*! ./cipher-core */ 56), __webpack_require__(/*! ./mode-cfb */ 57), __webpack_require__(/*! ./mode-ctr */ 58), __webpack_require__(/*! ./mode-ctr-gladman */ 59), __webpack_require__(/*! ./mode-ofb */ 60), __webpack_require__(/*! ./mode-ecb */ 61), __webpack_require__(/*! ./pad-ansix923 */ 62), __webpack_require__(/*! ./pad-iso10126 */ 63), __webpack_require__(/*! ./pad-iso97971 */ 64), __webpack_require__(/*! ./pad-zeropadding */ 65), __webpack_require__(/*! ./pad-nopadding */ 66), __webpack_require__(/*! ./format-hex */ 67), __webpack_require__(/*! ./aes */ 68), __webpack_require__(/*! ./tripledes */ 69), __webpack_require__(/*! ./rc4 */ 70), __webpack_require__(/*! ./rabbit */ 71), __webpack_require__(/*! ./rabbit-legacy */ 72));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./x64-core */ 40), __webpack_require__(/*! ./lib-typedarrays */ 41), __webpack_require__(/*! ./enc-utf16 */ 42), __webpack_require__(/*! ./enc-base64 */ 43), __webpack_require__(/*! ./enc-base64url */ 44), __webpack_require__(/*! ./md5 */ 45), __webpack_require__(/*! ./sha1 */ 46), __webpack_require__(/*! ./sha256 */ 47), __webpack_require__(/*! ./sha224 */ 48), __webpack_require__(/*! ./sha512 */ 49), __webpack_require__(/*! ./sha384 */ 50), __webpack_require__(/*! ./sha3 */ 51), __webpack_require__(/*! ./ripemd160 */ 52), __webpack_require__(/*! ./hmac */ 53), __webpack_require__(/*! ./pbkdf2 */ 54), __webpack_require__(/*! ./evpkdf */ 55), __webpack_require__(/*! ./cipher-core */ 56), __webpack_require__(/*! ./mode-cfb */ 57), __webpack_require__(/*! ./mode-ctr */ 58), __webpack_require__(/*! ./mode-ctr-gladman */ 59), __webpack_require__(/*! ./mode-ofb */ 60), __webpack_require__(/*! ./mode-ecb */ 61), __webpack_require__(/*! ./pad-ansix923 */ 62), __webpack_require__(/*! ./pad-iso10126 */ 63), __webpack_require__(/*! ./pad-iso97971 */ 64), __webpack_require__(/*! ./pad-zeropadding */ 65), __webpack_require__(/*! ./pad-nopadding */ 66), __webpack_require__(/*! ./format-hex */ 67), __webpack_require__(/*! ./aes */ 68), __webpack_require__(/*! ./tripledes */ 69), __webpack_require__(/*! ./rc4 */ 70), __webpack_require__(/*! ./rabbit */ 71), __webpack_require__(/*! ./rabbit-legacy */ 72)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  return CryptoJS;
});

/***/ }),
/* 38 */
/*!********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/core.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory();
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function () {
  /*globals window, global, require*/

  /**
   * CryptoJS core components.
   */
  var CryptoJS = CryptoJS || function (Math, undefined) {
    var crypto;

    // Native crypto from window (Browser)
    if (typeof window !== 'undefined' && window.crypto) {
      crypto = window.crypto;
    }

    // Native crypto in web worker (Browser)
    if (typeof self !== 'undefined' && self.crypto) {
      crypto = self.crypto;
    }

    // Native crypto from worker
    if (typeof globalThis !== 'undefined' && globalThis.crypto) {
      crypto = globalThis.crypto;
    }

    // Native (experimental IE 11) crypto from window (Browser)
    if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
      crypto = window.msCrypto;
    }

    // Native crypto from global (NodeJS)
    if (!crypto && typeof global !== 'undefined' && global.crypto) {
      crypto = global.crypto;
    }

    // Native crypto import via require (NodeJS)
    if (!crypto && "function" === 'function') {
      try {
        crypto = __webpack_require__(/*! crypto */ 39);
      } catch (err) {}
    }

    /*
     * Cryptographically secure pseudorandom number generator
     *
     * As Math.random() is cryptographically not safe to use
     */
    var cryptoSecureRandomInt = function cryptoSecureRandomInt() {
      if (crypto) {
        // Use getRandomValues method (Browser)
        if (typeof crypto.getRandomValues === 'function') {
          try {
            return crypto.getRandomValues(new Uint32Array(1))[0];
          } catch (err) {}
        }

        // Use randomBytes method (NodeJS)
        if (typeof crypto.randomBytes === 'function') {
          try {
            return crypto.randomBytes(4).readInt32LE();
          } catch (err) {}
        }
      }
      throw new Error('Native crypto module could not be used to get secure random number.');
    };

    /*
     * Local polyfill of Object.create
      */
    var create = Object.create || function () {
      function F() {}
      return function (obj) {
        var subtype;
        F.prototype = obj;
        subtype = new F();
        F.prototype = null;
        return subtype;
      };
    }();

    /**
     * CryptoJS namespace.
     */
    var C = {};

    /**
     * Library namespace.
     */
    var C_lib = C.lib = {};

    /**
     * Base object for prototypal inheritance.
     */
    var Base = C_lib.Base = function () {
      return {
        /**
         * Creates a new object that inherits from this object.
         *
         * @param {Object} overrides Properties to copy into the new object.
         *
         * @return {Object} The new object.
         *
         * @static
         *
         * @example
         *
         *     var MyType = CryptoJS.lib.Base.extend({
         *         field: 'value',
         *
         *         method: function () {
         *         }
         *     });
         */
        extend: function extend(overrides) {
          // Spawn
          var subtype = create(this);

          // Augment
          if (overrides) {
            subtype.mixIn(overrides);
          }

          // Create default initializer
          if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
            subtype.init = function () {
              subtype.$super.init.apply(this, arguments);
            };
          }

          // Initializer's prototype is the subtype object
          subtype.init.prototype = subtype;

          // Reference supertype
          subtype.$super = this;
          return subtype;
        },
        /**
         * Extends this object and runs the init method.
         * Arguments to create() will be passed to init().
         *
         * @return {Object} The new object.
         *
         * @static
         *
         * @example
         *
         *     var instance = MyType.create();
         */
        create: function create() {
          var instance = this.extend();
          instance.init.apply(instance, arguments);
          return instance;
        },
        /**
         * Initializes a newly created object.
         * Override this method to add some logic when your objects are created.
         *
         * @example
         *
         *     var MyType = CryptoJS.lib.Base.extend({
         *         init: function () {
         *             // ...
         *         }
         *     });
         */
        init: function init() {},
        /**
         * Copies properties into this object.
         *
         * @param {Object} properties The properties to mix in.
         *
         * @example
         *
         *     MyType.mixIn({
         *         field: 'value'
         *     });
         */
        mixIn: function mixIn(properties) {
          for (var propertyName in properties) {
            if (properties.hasOwnProperty(propertyName)) {
              this[propertyName] = properties[propertyName];
            }
          }

          // IE won't copy toString using the loop above
          if (properties.hasOwnProperty('toString')) {
            this.toString = properties.toString;
          }
        },
        /**
         * Creates a copy of this object.
         *
         * @return {Object} The clone.
         *
         * @example
         *
         *     var clone = instance.clone();
         */
        clone: function clone() {
          return this.init.prototype.extend(this);
        }
      };
    }();

    /**
     * An array of 32-bit words.
     *
     * @property {Array} words The array of 32-bit words.
     * @property {number} sigBytes The number of significant bytes in this word array.
     */
    var WordArray = C_lib.WordArray = Base.extend({
      /**
       * Initializes a newly created word array.
       *
       * @param {Array} words (Optional) An array of 32-bit words.
       * @param {number} sigBytes (Optional) The number of significant bytes in the words.
       *
       * @example
       *
       *     var wordArray = CryptoJS.lib.WordArray.create();
       *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
       *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
       */
      init: function init(words, sigBytes) {
        words = this.words = words || [];
        if (sigBytes != undefined) {
          this.sigBytes = sigBytes;
        } else {
          this.sigBytes = words.length * 4;
        }
      },
      /**
       * Converts this word array to a string.
       *
       * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
       *
       * @return {string} The stringified word array.
       *
       * @example
       *
       *     var string = wordArray + '';
       *     var string = wordArray.toString();
       *     var string = wordArray.toString(CryptoJS.enc.Utf8);
       */
      toString: function toString(encoder) {
        return (encoder || Hex).stringify(this);
      },
      /**
       * Concatenates a word array to this word array.
       *
       * @param {WordArray} wordArray The word array to append.
       *
       * @return {WordArray} This word array.
       *
       * @example
       *
       *     wordArray1.concat(wordArray2);
       */
      concat: function concat(wordArray) {
        // Shortcuts
        var thisWords = this.words;
        var thatWords = wordArray.words;
        var thisSigBytes = this.sigBytes;
        var thatSigBytes = wordArray.sigBytes;

        // Clamp excess bits
        this.clamp();

        // Concat
        if (thisSigBytes % 4) {
          // Copy one byte at a time
          for (var i = 0; i < thatSigBytes; i++) {
            var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
            thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
          }
        } else {
          // Copy one word at a time
          for (var j = 0; j < thatSigBytes; j += 4) {
            thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
          }
        }
        this.sigBytes += thatSigBytes;

        // Chainable
        return this;
      },
      /**
       * Removes insignificant bits.
       *
       * @example
       *
       *     wordArray.clamp();
       */
      clamp: function clamp() {
        // Shortcuts
        var words = this.words;
        var sigBytes = this.sigBytes;

        // Clamp
        words[sigBytes >>> 2] &= 0xffffffff << 32 - sigBytes % 4 * 8;
        words.length = Math.ceil(sigBytes / 4);
      },
      /**
       * Creates a copy of this word array.
       *
       * @return {WordArray} The clone.
       *
       * @example
       *
       *     var clone = wordArray.clone();
       */
      clone: function clone() {
        var clone = Base.clone.call(this);
        clone.words = this.words.slice(0);
        return clone;
      },
      /**
       * Creates a word array filled with random bytes.
       *
       * @param {number} nBytes The number of random bytes to generate.
       *
       * @return {WordArray} The random word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.lib.WordArray.random(16);
       */
      random: function random(nBytes) {
        var words = [];
        for (var i = 0; i < nBytes; i += 4) {
          words.push(cryptoSecureRandomInt());
        }
        return new WordArray.init(words, nBytes);
      }
    });

    /**
     * Encoder namespace.
     */
    var C_enc = C.enc = {};

    /**
     * Hex encoding strategy.
     */
    var Hex = C_enc.Hex = {
      /**
       * Converts a word array to a hex string.
       *
       * @param {WordArray} wordArray The word array.
       *
       * @return {string} The hex string.
       *
       * @static
       *
       * @example
       *
       *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
       */
      stringify: function stringify(wordArray) {
        // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;

        // Convert
        var hexChars = [];
        for (var i = 0; i < sigBytes; i++) {
          var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
          hexChars.push((bite >>> 4).toString(16));
          hexChars.push((bite & 0x0f).toString(16));
        }
        return hexChars.join('');
      },
      /**
       * Converts a hex string to a word array.
       *
       * @param {string} hexStr The hex string.
       *
       * @return {WordArray} The word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
       */
      parse: function parse(hexStr) {
        // Shortcut
        var hexStrLength = hexStr.length;

        // Convert
        var words = [];
        for (var i = 0; i < hexStrLength; i += 2) {
          words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
        }
        return new WordArray.init(words, hexStrLength / 2);
      }
    };

    /**
     * Latin1 encoding strategy.
     */
    var Latin1 = C_enc.Latin1 = {
      /**
       * Converts a word array to a Latin1 string.
       *
       * @param {WordArray} wordArray The word array.
       *
       * @return {string} The Latin1 string.
       *
       * @static
       *
       * @example
       *
       *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
       */
      stringify: function stringify(wordArray) {
        // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;

        // Convert
        var latin1Chars = [];
        for (var i = 0; i < sigBytes; i++) {
          var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
          latin1Chars.push(String.fromCharCode(bite));
        }
        return latin1Chars.join('');
      },
      /**
       * Converts a Latin1 string to a word array.
       *
       * @param {string} latin1Str The Latin1 string.
       *
       * @return {WordArray} The word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
       */
      parse: function parse(latin1Str) {
        // Shortcut
        var latin1StrLength = latin1Str.length;

        // Convert
        var words = [];
        for (var i = 0; i < latin1StrLength; i++) {
          words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << 24 - i % 4 * 8;
        }
        return new WordArray.init(words, latin1StrLength);
      }
    };

    /**
     * UTF-8 encoding strategy.
     */
    var Utf8 = C_enc.Utf8 = {
      /**
       * Converts a word array to a UTF-8 string.
       *
       * @param {WordArray} wordArray The word array.
       *
       * @return {string} The UTF-8 string.
       *
       * @static
       *
       * @example
       *
       *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
       */
      stringify: function stringify(wordArray) {
        try {
          return decodeURIComponent(escape(Latin1.stringify(wordArray)));
        } catch (e) {
          throw new Error('Malformed UTF-8 data');
        }
      },
      /**
       * Converts a UTF-8 string to a word array.
       *
       * @param {string} utf8Str The UTF-8 string.
       *
       * @return {WordArray} The word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
       */
      parse: function parse(utf8Str) {
        return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
      }
    };

    /**
     * Abstract buffered block algorithm template.
     *
     * The property blockSize must be implemented in a concrete subtype.
     *
     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
     */
    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
      /**
       * Resets this block algorithm's data buffer to its initial state.
       *
       * @example
       *
       *     bufferedBlockAlgorithm.reset();
       */
      reset: function reset() {
        // Initial values
        this._data = new WordArray.init();
        this._nDataBytes = 0;
      },
      /**
       * Adds new data to this block algorithm's buffer.
       *
       * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
       *
       * @example
       *
       *     bufferedBlockAlgorithm._append('data');
       *     bufferedBlockAlgorithm._append(wordArray);
       */
      _append: function _append(data) {
        // Convert string to WordArray, else assume WordArray already
        if (typeof data == 'string') {
          data = Utf8.parse(data);
        }

        // Append
        this._data.concat(data);
        this._nDataBytes += data.sigBytes;
      },
      /**
       * Processes available data blocks.
       *
       * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
       *
       * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
       *
       * @return {WordArray} The processed data.
       *
       * @example
       *
       *     var processedData = bufferedBlockAlgorithm._process();
       *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
       */
      _process: function _process(doFlush) {
        var processedWords;

        // Shortcuts
        var data = this._data;
        var dataWords = data.words;
        var dataSigBytes = data.sigBytes;
        var blockSize = this.blockSize;
        var blockSizeBytes = blockSize * 4;

        // Count blocks ready
        var nBlocksReady = dataSigBytes / blockSizeBytes;
        if (doFlush) {
          // Round up to include partial blocks
          nBlocksReady = Math.ceil(nBlocksReady);
        } else {
          // Round down to include only full blocks,
          // less the number of blocks that must remain in the buffer
          nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
        }

        // Count words ready
        var nWordsReady = nBlocksReady * blockSize;

        // Count bytes ready
        var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

        // Process blocks
        if (nWordsReady) {
          for (var offset = 0; offset < nWordsReady; offset += blockSize) {
            // Perform concrete-algorithm logic
            this._doProcessBlock(dataWords, offset);
          }

          // Remove processed words
          processedWords = dataWords.splice(0, nWordsReady);
          data.sigBytes -= nBytesReady;
        }

        // Return processed words
        return new WordArray.init(processedWords, nBytesReady);
      },
      /**
       * Creates a copy of this object.
       *
       * @return {Object} The clone.
       *
       * @example
       *
       *     var clone = bufferedBlockAlgorithm.clone();
       */
      clone: function clone() {
        var clone = Base.clone.call(this);
        clone._data = this._data.clone();
        return clone;
      },
      _minBufferSize: 0
    });

    /**
     * Abstract hasher template.
     *
     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
     */
    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
      /**
       * Configuration options.
       */
      cfg: Base.extend(),
      /**
       * Initializes a newly created hasher.
       *
       * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
       *
       * @example
       *
       *     var hasher = CryptoJS.algo.SHA256.create();
       */
      init: function init(cfg) {
        // Apply config defaults
        this.cfg = this.cfg.extend(cfg);

        // Set initial values
        this.reset();
      },
      /**
       * Resets this hasher to its initial state.
       *
       * @example
       *
       *     hasher.reset();
       */
      reset: function reset() {
        // Reset data buffer
        BufferedBlockAlgorithm.reset.call(this);

        // Perform concrete-hasher logic
        this._doReset();
      },
      /**
       * Updates this hasher with a message.
       *
       * @param {WordArray|string} messageUpdate The message to append.
       *
       * @return {Hasher} This hasher.
       *
       * @example
       *
       *     hasher.update('message');
       *     hasher.update(wordArray);
       */
      update: function update(messageUpdate) {
        // Append
        this._append(messageUpdate);

        // Update the hash
        this._process();

        // Chainable
        return this;
      },
      /**
       * Finalizes the hash computation.
       * Note that the finalize operation is effectively a destructive, read-once operation.
       *
       * @param {WordArray|string} messageUpdate (Optional) A final message update.
       *
       * @return {WordArray} The hash.
       *
       * @example
       *
       *     var hash = hasher.finalize();
       *     var hash = hasher.finalize('message');
       *     var hash = hasher.finalize(wordArray);
       */
      finalize: function finalize(messageUpdate) {
        // Final message update
        if (messageUpdate) {
          this._append(messageUpdate);
        }

        // Perform concrete-hasher logic
        var hash = this._doFinalize();
        return hash;
      },
      blockSize: 512 / 32,
      /**
       * Creates a shortcut function to a hasher's object interface.
       *
       * @param {Hasher} hasher The hasher to create a helper for.
       *
       * @return {Function} The shortcut function.
       *
       * @static
       *
       * @example
       *
       *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
       */
      _createHelper: function _createHelper(hasher) {
        return function (message, cfg) {
          return new hasher.init(cfg).finalize(message);
        };
      },
      /**
       * Creates a shortcut function to the HMAC's object interface.
       *
       * @param {Hasher} hasher The hasher to use in this HMAC helper.
       *
       * @return {Function} The shortcut function.
       *
       * @static
       *
       * @example
       *
       *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
       */
      _createHmacHelper: function _createHmacHelper(hasher) {
        return function (message, key) {
          return new C_algo.HMAC.init(hasher, key).finalize(message);
        };
      }
    });

    /**
     * Algorithm namespace.
     */
    var C_algo = C.algo = {};
    return C;
  }(Math);
  return CryptoJS;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../Downloads/HBuilderX/plugins/uniapp-cli/node_modules/webpack/buildin/global.js */ 2)))

/***/ }),
/* 39 */
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 40 */
/*!************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/x64-core.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  (function (undefined) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var X32WordArray = C_lib.WordArray;

    /**
     * x64 namespace.
     */
    var C_x64 = C.x64 = {};

    /**
     * A 64-bit word.
     */
    var X64Word = C_x64.Word = Base.extend({
      /**
       * Initializes a newly created 64-bit word.
       *
       * @param {number} high The high 32 bits.
       * @param {number} low The low 32 bits.
       *
       * @example
       *
       *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
       */
      init: function init(high, low) {
        this.high = high;
        this.low = low;
      }

      /**
       * Bitwise NOTs this word.
       *
       * @return {X64Word} A new x64-Word object after negating.
       *
       * @example
       *
       *     var negated = x64Word.not();
       */
      // not: function () {
      // var high = ~this.high;
      // var low = ~this.low;

      // return X64Word.create(high, low);
      // },

      /**
       * Bitwise ANDs this word with the passed word.
       *
       * @param {X64Word} word The x64-Word to AND with this word.
       *
       * @return {X64Word} A new x64-Word object after ANDing.
       *
       * @example
       *
       *     var anded = x64Word.and(anotherX64Word);
       */
      // and: function (word) {
      // var high = this.high & word.high;
      // var low = this.low & word.low;

      // return X64Word.create(high, low);
      // },

      /**
       * Bitwise ORs this word with the passed word.
       *
       * @param {X64Word} word The x64-Word to OR with this word.
       *
       * @return {X64Word} A new x64-Word object after ORing.
       *
       * @example
       *
       *     var ored = x64Word.or(anotherX64Word);
       */
      // or: function (word) {
      // var high = this.high | word.high;
      // var low = this.low | word.low;

      // return X64Word.create(high, low);
      // },

      /**
       * Bitwise XORs this word with the passed word.
       *
       * @param {X64Word} word The x64-Word to XOR with this word.
       *
       * @return {X64Word} A new x64-Word object after XORing.
       *
       * @example
       *
       *     var xored = x64Word.xor(anotherX64Word);
       */
      // xor: function (word) {
      // var high = this.high ^ word.high;
      // var low = this.low ^ word.low;

      // return X64Word.create(high, low);
      // },

      /**
       * Shifts this word n bits to the left.
       *
       * @param {number} n The number of bits to shift.
       *
       * @return {X64Word} A new x64-Word object after shifting.
       *
       * @example
       *
       *     var shifted = x64Word.shiftL(25);
       */
      // shiftL: function (n) {
      // if (n < 32) {
      // var high = (this.high << n) | (this.low >>> (32 - n));
      // var low = this.low << n;
      // } else {
      // var high = this.low << (n - 32);
      // var low = 0;
      // }

      // return X64Word.create(high, low);
      // },

      /**
       * Shifts this word n bits to the right.
       *
       * @param {number} n The number of bits to shift.
       *
       * @return {X64Word} A new x64-Word object after shifting.
       *
       * @example
       *
       *     var shifted = x64Word.shiftR(7);
       */
      // shiftR: function (n) {
      // if (n < 32) {
      // var low = (this.low >>> n) | (this.high << (32 - n));
      // var high = this.high >>> n;
      // } else {
      // var low = this.high >>> (n - 32);
      // var high = 0;
      // }

      // return X64Word.create(high, low);
      // },

      /**
       * Rotates this word n bits to the left.
       *
       * @param {number} n The number of bits to rotate.
       *
       * @return {X64Word} A new x64-Word object after rotating.
       *
       * @example
       *
       *     var rotated = x64Word.rotL(25);
       */
      // rotL: function (n) {
      // return this.shiftL(n).or(this.shiftR(64 - n));
      // },

      /**
       * Rotates this word n bits to the right.
       *
       * @param {number} n The number of bits to rotate.
       *
       * @return {X64Word} A new x64-Word object after rotating.
       *
       * @example
       *
       *     var rotated = x64Word.rotR(7);
       */
      // rotR: function (n) {
      // return this.shiftR(n).or(this.shiftL(64 - n));
      // },

      /**
       * Adds this word with the passed word.
       *
       * @param {X64Word} word The x64-Word to add with this word.
       *
       * @return {X64Word} A new x64-Word object after adding.
       *
       * @example
       *
       *     var added = x64Word.add(anotherX64Word);
       */
      // add: function (word) {
      // var low = (this.low + word.low) | 0;
      // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
      // var high = (this.high + word.high + carry) | 0;

      // return X64Word.create(high, low);
      // }
    });

    /**
     * An array of 64-bit words.
     *
     * @property {Array} words The array of CryptoJS.x64.Word objects.
     * @property {number} sigBytes The number of significant bytes in this word array.
     */
    var X64WordArray = C_x64.WordArray = Base.extend({
      /**
       * Initializes a newly created word array.
       *
       * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
       * @param {number} sigBytes (Optional) The number of significant bytes in the words.
       *
       * @example
       *
       *     var wordArray = CryptoJS.x64.WordArray.create();
       *
       *     var wordArray = CryptoJS.x64.WordArray.create([
       *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
       *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
       *     ]);
       *
       *     var wordArray = CryptoJS.x64.WordArray.create([
       *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
       *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
       *     ], 10);
       */
      init: function init(words, sigBytes) {
        words = this.words = words || [];
        if (sigBytes != undefined) {
          this.sigBytes = sigBytes;
        } else {
          this.sigBytes = words.length * 8;
        }
      },
      /**
       * Converts this 64-bit word array to a 32-bit word array.
       *
       * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
       *
       * @example
       *
       *     var x32WordArray = x64WordArray.toX32();
       */
      toX32: function toX32() {
        // Shortcuts
        var x64Words = this.words;
        var x64WordsLength = x64Words.length;

        // Convert
        var x32Words = [];
        for (var i = 0; i < x64WordsLength; i++) {
          var x64Word = x64Words[i];
          x32Words.push(x64Word.high);
          x32Words.push(x64Word.low);
        }
        return X32WordArray.create(x32Words, this.sigBytes);
      },
      /**
       * Creates a copy of this word array.
       *
       * @return {X64WordArray} The clone.
       *
       * @example
       *
       *     var clone = x64WordArray.clone();
       */
      clone: function clone() {
        var clone = Base.clone.call(this);

        // Clone "words" array
        var words = clone.words = this.words.slice(0);

        // Clone each X64Word object
        var wordsLength = words.length;
        for (var i = 0; i < wordsLength; i++) {
          words[i] = words[i].clone();
        }
        return clone;
      }
    });
  })();
  return CryptoJS;
});

/***/ }),
/* 41 */
/*!*******************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/lib-typedarrays.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  (function () {
    // Check if typed arrays are supported
    if (typeof ArrayBuffer != 'function') {
      return;
    }

    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;

    // Reference original init
    var superInit = WordArray.init;

    // Augment WordArray.init to handle typed arrays
    var subInit = WordArray.init = function (typedArray) {
      // Convert buffers to uint8
      if (typedArray instanceof ArrayBuffer) {
        typedArray = new Uint8Array(typedArray);
      }

      // Convert other array views to uint8
      if (typedArray instanceof Int8Array || typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) {
        typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
      }

      // Handle Uint8Array
      if (typedArray instanceof Uint8Array) {
        // Shortcut
        var typedArrayByteLength = typedArray.byteLength;

        // Extract bytes
        var words = [];
        for (var i = 0; i < typedArrayByteLength; i++) {
          words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8;
        }

        // Initialize this word array
        superInit.call(this, words, typedArrayByteLength);
      } else {
        // Else call normal init
        superInit.apply(this, arguments);
      }
    };
    subInit.prototype = WordArray;
  })();
  return CryptoJS.lib.WordArray;
});

/***/ }),
/* 42 */
/*!*************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/enc-utf16.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var C_enc = C.enc;

    /**
     * UTF-16 BE encoding strategy.
     */
    var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
      /**
       * Converts a word array to a UTF-16 BE string.
       *
       * @param {WordArray} wordArray The word array.
       *
       * @return {string} The UTF-16 BE string.
       *
       * @static
       *
       * @example
       *
       *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
       */
      stringify: function stringify(wordArray) {
        // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;

        // Convert
        var utf16Chars = [];
        for (var i = 0; i < sigBytes; i += 2) {
          var codePoint = words[i >>> 2] >>> 16 - i % 4 * 8 & 0xffff;
          utf16Chars.push(String.fromCharCode(codePoint));
        }
        return utf16Chars.join('');
      },
      /**
       * Converts a UTF-16 BE string to a word array.
       *
       * @param {string} utf16Str The UTF-16 BE string.
       *
       * @return {WordArray} The word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
       */
      parse: function parse(utf16Str) {
        // Shortcut
        var utf16StrLength = utf16Str.length;

        // Convert
        var words = [];
        for (var i = 0; i < utf16StrLength; i++) {
          words[i >>> 1] |= utf16Str.charCodeAt(i) << 16 - i % 2 * 16;
        }
        return WordArray.create(words, utf16StrLength * 2);
      }
    };

    /**
     * UTF-16 LE encoding strategy.
     */
    C_enc.Utf16LE = {
      /**
       * Converts a word array to a UTF-16 LE string.
       *
       * @param {WordArray} wordArray The word array.
       *
       * @return {string} The UTF-16 LE string.
       *
       * @static
       *
       * @example
       *
       *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
       */
      stringify: function stringify(wordArray) {
        // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;

        // Convert
        var utf16Chars = [];
        for (var i = 0; i < sigBytes; i += 2) {
          var codePoint = swapEndian(words[i >>> 2] >>> 16 - i % 4 * 8 & 0xffff);
          utf16Chars.push(String.fromCharCode(codePoint));
        }
        return utf16Chars.join('');
      },
      /**
       * Converts a UTF-16 LE string to a word array.
       *
       * @param {string} utf16Str The UTF-16 LE string.
       *
       * @return {WordArray} The word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
       */
      parse: function parse(utf16Str) {
        // Shortcut
        var utf16StrLength = utf16Str.length;

        // Convert
        var words = [];
        for (var i = 0; i < utf16StrLength; i++) {
          words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << 16 - i % 2 * 16);
        }
        return WordArray.create(words, utf16StrLength * 2);
      }
    };
    function swapEndian(word) {
      return word << 8 & 0xff00ff00 | word >>> 8 & 0x00ff00ff;
    }
  })();
  return CryptoJS.enc.Utf16;
});

/***/ }),
/* 43 */
/*!**************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/enc-base64.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var C_enc = C.enc;

    /**
     * Base64 encoding strategy.
     */
    var Base64 = C_enc.Base64 = {
      /**
       * Converts a word array to a Base64 string.
       *
       * @param {WordArray} wordArray The word array.
       *
       * @return {string} The Base64 string.
       *
       * @static
       *
       * @example
       *
       *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
       */
      stringify: function stringify(wordArray) {
        // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;
        var map = this._map;

        // Clamp excess bits
        wordArray.clamp();

        // Convert
        var base64Chars = [];
        for (var i = 0; i < sigBytes; i += 3) {
          var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
          var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 0xff;
          var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 0xff;
          var triplet = byte1 << 16 | byte2 << 8 | byte3;
          for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
            base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 0x3f));
          }
        }

        // Add padding
        var paddingChar = map.charAt(64);
        if (paddingChar) {
          while (base64Chars.length % 4) {
            base64Chars.push(paddingChar);
          }
        }
        return base64Chars.join('');
      },
      /**
       * Converts a Base64 string to a word array.
       *
       * @param {string} base64Str The Base64 string.
       *
       * @return {WordArray} The word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
       */
      parse: function parse(base64Str) {
        // Shortcuts
        var base64StrLength = base64Str.length;
        var map = this._map;
        var reverseMap = this._reverseMap;
        if (!reverseMap) {
          reverseMap = this._reverseMap = [];
          for (var j = 0; j < map.length; j++) {
            reverseMap[map.charCodeAt(j)] = j;
          }
        }

        // Ignore padding
        var paddingChar = map.charAt(64);
        if (paddingChar) {
          var paddingIndex = base64Str.indexOf(paddingChar);
          if (paddingIndex !== -1) {
            base64StrLength = paddingIndex;
          }
        }

        // Convert
        return parseLoop(base64Str, base64StrLength, reverseMap);
      },
      _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    };
    function parseLoop(base64Str, base64StrLength, reverseMap) {
      var words = [];
      var nBytes = 0;
      for (var i = 0; i < base64StrLength; i++) {
        if (i % 4) {
          var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
          var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
          var bitsCombined = bits1 | bits2;
          words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
          nBytes++;
        }
      }
      return WordArray.create(words, nBytes);
    }
  })();
  return CryptoJS.enc.Base64;
});

/***/ }),
/* 44 */
/*!*****************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/enc-base64url.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var C_enc = C.enc;

    /**
     * Base64url encoding strategy.
     */
    var Base64url = C_enc.Base64url = {
      /**
       * Converts a word array to a Base64url string.
       *
       * @param {WordArray} wordArray The word array.
       *
       * @param {boolean} urlSafe Whether to use url safe
       *
       * @return {string} The Base64url string.
       *
       * @static
       *
       * @example
       *
       *     var base64String = CryptoJS.enc.Base64url.stringify(wordArray);
       */
      stringify: function stringify(wordArray) {
        var urlSafe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;
        var map = urlSafe ? this._safe_map : this._map;

        // Clamp excess bits
        wordArray.clamp();

        // Convert
        var base64Chars = [];
        for (var i = 0; i < sigBytes; i += 3) {
          var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
          var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 0xff;
          var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 0xff;
          var triplet = byte1 << 16 | byte2 << 8 | byte3;
          for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
            base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 0x3f));
          }
        }

        // Add padding
        var paddingChar = map.charAt(64);
        if (paddingChar) {
          while (base64Chars.length % 4) {
            base64Chars.push(paddingChar);
          }
        }
        return base64Chars.join('');
      },
      /**
       * Converts a Base64url string to a word array.
       *
       * @param {string} base64Str The Base64url string.
       *
       * @param {boolean} urlSafe Whether to use url safe
       *
       * @return {WordArray} The word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Base64url.parse(base64String);
       */
      parse: function parse(base64Str) {
        var urlSafe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        // Shortcuts
        var base64StrLength = base64Str.length;
        var map = urlSafe ? this._safe_map : this._map;
        var reverseMap = this._reverseMap;
        if (!reverseMap) {
          reverseMap = this._reverseMap = [];
          for (var j = 0; j < map.length; j++) {
            reverseMap[map.charCodeAt(j)] = j;
          }
        }

        // Ignore padding
        var paddingChar = map.charAt(64);
        if (paddingChar) {
          var paddingIndex = base64Str.indexOf(paddingChar);
          if (paddingIndex !== -1) {
            base64StrLength = paddingIndex;
          }
        }

        // Convert
        return parseLoop(base64Str, base64StrLength, reverseMap);
      },
      _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
      _safe_map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
    };
    function parseLoop(base64Str, base64StrLength, reverseMap) {
      var words = [];
      var nBytes = 0;
      for (var i = 0; i < base64StrLength; i++) {
        if (i % 4) {
          var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
          var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
          var bitsCombined = bits1 | bits2;
          words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
          nBytes++;
        }
      }
      return WordArray.create(words, nBytes);
    }
  })();
  return CryptoJS.enc.Base64url;
});

/***/ }),
/* 45 */
/*!*******************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/md5.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  (function (Math) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    // Constants table
    var T = [];

    // Compute constants
    (function () {
      for (var i = 0; i < 64; i++) {
        T[i] = Math.abs(Math.sin(i + 1)) * 0x100000000 | 0;
      }
    })();

    /**
     * MD5 hash algorithm.
     */
    var MD5 = C_algo.MD5 = Hasher.extend({
      _doReset: function _doReset() {
        this._hash = new WordArray.init([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]);
      },
      _doProcessBlock: function _doProcessBlock(M, offset) {
        // Swap endian
        for (var i = 0; i < 16; i++) {
          // Shortcuts
          var offset_i = offset + i;
          var M_offset_i = M[offset_i];
          M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 0x00ff00ff | (M_offset_i << 24 | M_offset_i >>> 8) & 0xff00ff00;
        }

        // Shortcuts
        var H = this._hash.words;
        var M_offset_0 = M[offset + 0];
        var M_offset_1 = M[offset + 1];
        var M_offset_2 = M[offset + 2];
        var M_offset_3 = M[offset + 3];
        var M_offset_4 = M[offset + 4];
        var M_offset_5 = M[offset + 5];
        var M_offset_6 = M[offset + 6];
        var M_offset_7 = M[offset + 7];
        var M_offset_8 = M[offset + 8];
        var M_offset_9 = M[offset + 9];
        var M_offset_10 = M[offset + 10];
        var M_offset_11 = M[offset + 11];
        var M_offset_12 = M[offset + 12];
        var M_offset_13 = M[offset + 13];
        var M_offset_14 = M[offset + 14];
        var M_offset_15 = M[offset + 15];

        // Working varialbes
        var a = H[0];
        var b = H[1];
        var c = H[2];
        var d = H[3];

        // Computation
        a = FF(a, b, c, d, M_offset_0, 7, T[0]);
        d = FF(d, a, b, c, M_offset_1, 12, T[1]);
        c = FF(c, d, a, b, M_offset_2, 17, T[2]);
        b = FF(b, c, d, a, M_offset_3, 22, T[3]);
        a = FF(a, b, c, d, M_offset_4, 7, T[4]);
        d = FF(d, a, b, c, M_offset_5, 12, T[5]);
        c = FF(c, d, a, b, M_offset_6, 17, T[6]);
        b = FF(b, c, d, a, M_offset_7, 22, T[7]);
        a = FF(a, b, c, d, M_offset_8, 7, T[8]);
        d = FF(d, a, b, c, M_offset_9, 12, T[9]);
        c = FF(c, d, a, b, M_offset_10, 17, T[10]);
        b = FF(b, c, d, a, M_offset_11, 22, T[11]);
        a = FF(a, b, c, d, M_offset_12, 7, T[12]);
        d = FF(d, a, b, c, M_offset_13, 12, T[13]);
        c = FF(c, d, a, b, M_offset_14, 17, T[14]);
        b = FF(b, c, d, a, M_offset_15, 22, T[15]);
        a = GG(a, b, c, d, M_offset_1, 5, T[16]);
        d = GG(d, a, b, c, M_offset_6, 9, T[17]);
        c = GG(c, d, a, b, M_offset_11, 14, T[18]);
        b = GG(b, c, d, a, M_offset_0, 20, T[19]);
        a = GG(a, b, c, d, M_offset_5, 5, T[20]);
        d = GG(d, a, b, c, M_offset_10, 9, T[21]);
        c = GG(c, d, a, b, M_offset_15, 14, T[22]);
        b = GG(b, c, d, a, M_offset_4, 20, T[23]);
        a = GG(a, b, c, d, M_offset_9, 5, T[24]);
        d = GG(d, a, b, c, M_offset_14, 9, T[25]);
        c = GG(c, d, a, b, M_offset_3, 14, T[26]);
        b = GG(b, c, d, a, M_offset_8, 20, T[27]);
        a = GG(a, b, c, d, M_offset_13, 5, T[28]);
        d = GG(d, a, b, c, M_offset_2, 9, T[29]);
        c = GG(c, d, a, b, M_offset_7, 14, T[30]);
        b = GG(b, c, d, a, M_offset_12, 20, T[31]);
        a = HH(a, b, c, d, M_offset_5, 4, T[32]);
        d = HH(d, a, b, c, M_offset_8, 11, T[33]);
        c = HH(c, d, a, b, M_offset_11, 16, T[34]);
        b = HH(b, c, d, a, M_offset_14, 23, T[35]);
        a = HH(a, b, c, d, M_offset_1, 4, T[36]);
        d = HH(d, a, b, c, M_offset_4, 11, T[37]);
        c = HH(c, d, a, b, M_offset_7, 16, T[38]);
        b = HH(b, c, d, a, M_offset_10, 23, T[39]);
        a = HH(a, b, c, d, M_offset_13, 4, T[40]);
        d = HH(d, a, b, c, M_offset_0, 11, T[41]);
        c = HH(c, d, a, b, M_offset_3, 16, T[42]);
        b = HH(b, c, d, a, M_offset_6, 23, T[43]);
        a = HH(a, b, c, d, M_offset_9, 4, T[44]);
        d = HH(d, a, b, c, M_offset_12, 11, T[45]);
        c = HH(c, d, a, b, M_offset_15, 16, T[46]);
        b = HH(b, c, d, a, M_offset_2, 23, T[47]);
        a = II(a, b, c, d, M_offset_0, 6, T[48]);
        d = II(d, a, b, c, M_offset_7, 10, T[49]);
        c = II(c, d, a, b, M_offset_14, 15, T[50]);
        b = II(b, c, d, a, M_offset_5, 21, T[51]);
        a = II(a, b, c, d, M_offset_12, 6, T[52]);
        d = II(d, a, b, c, M_offset_3, 10, T[53]);
        c = II(c, d, a, b, M_offset_10, 15, T[54]);
        b = II(b, c, d, a, M_offset_1, 21, T[55]);
        a = II(a, b, c, d, M_offset_8, 6, T[56]);
        d = II(d, a, b, c, M_offset_15, 10, T[57]);
        c = II(c, d, a, b, M_offset_6, 15, T[58]);
        b = II(b, c, d, a, M_offset_13, 21, T[59]);
        a = II(a, b, c, d, M_offset_4, 6, T[60]);
        d = II(d, a, b, c, M_offset_11, 10, T[61]);
        c = II(c, d, a, b, M_offset_2, 15, T[62]);
        b = II(b, c, d, a, M_offset_9, 21, T[63]);

        // Intermediate hash value
        H[0] = H[0] + a | 0;
        H[1] = H[1] + b | 0;
        H[2] = H[2] + c | 0;
        H[3] = H[3] + d | 0;
      },
      _doFinalize: function _doFinalize() {
        // Shortcuts
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;

        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
        var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
        var nBitsTotalL = nBitsTotal;
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 0x00ff00ff | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 0xff00ff00;
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 0x00ff00ff | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 0xff00ff00;
        data.sigBytes = (dataWords.length + 1) * 4;

        // Hash final blocks
        this._process();

        // Shortcuts
        var hash = this._hash;
        var H = hash.words;

        // Swap endian
        for (var i = 0; i < 4; i++) {
          // Shortcut
          var H_i = H[i];
          H[i] = (H_i << 8 | H_i >>> 24) & 0x00ff00ff | (H_i << 24 | H_i >>> 8) & 0xff00ff00;
        }

        // Return final computed hash
        return hash;
      },
      clone: function clone() {
        var clone = Hasher.clone.call(this);
        clone._hash = this._hash.clone();
        return clone;
      }
    });
    function FF(a, b, c, d, x, s, t) {
      var n = a + (b & c | ~b & d) + x + t;
      return (n << s | n >>> 32 - s) + b;
    }
    function GG(a, b, c, d, x, s, t) {
      var n = a + (b & d | c & ~d) + x + t;
      return (n << s | n >>> 32 - s) + b;
    }
    function HH(a, b, c, d, x, s, t) {
      var n = a + (b ^ c ^ d) + x + t;
      return (n << s | n >>> 32 - s) + b;
    }
    function II(a, b, c, d, x, s, t) {
      var n = a + (c ^ (b | ~d)) + x + t;
      return (n << s | n >>> 32 - s) + b;
    }

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.MD5('message');
     *     var hash = CryptoJS.MD5(wordArray);
     */
    C.MD5 = Hasher._createHelper(MD5);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacMD5(message, key);
     */
    C.HmacMD5 = Hasher._createHmacHelper(MD5);
  })(Math);
  return CryptoJS.MD5;
});

/***/ }),
/* 46 */
/*!********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/sha1.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    // Reusable object
    var W = [];

    /**
     * SHA-1 hash algorithm.
     */
    var SHA1 = C_algo.SHA1 = Hasher.extend({
      _doReset: function _doReset() {
        this._hash = new WordArray.init([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0]);
      },
      _doProcessBlock: function _doProcessBlock(M, offset) {
        // Shortcut
        var H = this._hash.words;

        // Working variables
        var a = H[0];
        var b = H[1];
        var c = H[2];
        var d = H[3];
        var e = H[4];

        // Computation
        for (var i = 0; i < 80; i++) {
          if (i < 16) {
            W[i] = M[offset + i] | 0;
          } else {
            var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
            W[i] = n << 1 | n >>> 31;
          }
          var t = (a << 5 | a >>> 27) + e + W[i];
          if (i < 20) {
            t += (b & c | ~b & d) + 0x5a827999;
          } else if (i < 40) {
            t += (b ^ c ^ d) + 0x6ed9eba1;
          } else if (i < 60) {
            t += (b & c | b & d | c & d) - 0x70e44324;
          } else /* if (i < 80) */{
              t += (b ^ c ^ d) - 0x359d3e2a;
            }
          e = d;
          d = c;
          c = b << 30 | b >>> 2;
          b = a;
          a = t;
        }

        // Intermediate hash value
        H[0] = H[0] + a | 0;
        H[1] = H[1] + b | 0;
        H[2] = H[2] + c | 0;
        H[3] = H[3] + d | 0;
        H[4] = H[4] + e | 0;
      },
      _doFinalize: function _doFinalize() {
        // Shortcuts
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;

        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
        data.sigBytes = dataWords.length * 4;

        // Hash final blocks
        this._process();

        // Return final computed hash
        return this._hash;
      },
      clone: function clone() {
        var clone = Hasher.clone.call(this);
        clone._hash = this._hash.clone();
        return clone;
      }
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA1('message');
     *     var hash = CryptoJS.SHA1(wordArray);
     */
    C.SHA1 = Hasher._createHelper(SHA1);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA1(message, key);
     */
    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
  })();
  return CryptoJS.SHA1;
});

/***/ }),
/* 47 */
/*!**********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/sha256.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  (function (Math) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    // Initialization and round constants tables
    var H = [];
    var K = [];

    // Compute constants
    (function () {
      function isPrime(n) {
        var sqrtN = Math.sqrt(n);
        for (var factor = 2; factor <= sqrtN; factor++) {
          if (!(n % factor)) {
            return false;
          }
        }
        return true;
      }
      function getFractionalBits(n) {
        return (n - (n | 0)) * 0x100000000 | 0;
      }
      var n = 2;
      var nPrime = 0;
      while (nPrime < 64) {
        if (isPrime(n)) {
          if (nPrime < 8) {
            H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
          }
          K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));
          nPrime++;
        }
        n++;
      }
    })();

    // Reusable object
    var W = [];

    /**
     * SHA-256 hash algorithm.
     */
    var SHA256 = C_algo.SHA256 = Hasher.extend({
      _doReset: function _doReset() {
        this._hash = new WordArray.init(H.slice(0));
      },
      _doProcessBlock: function _doProcessBlock(M, offset) {
        // Shortcut
        var H = this._hash.words;

        // Working variables
        var a = H[0];
        var b = H[1];
        var c = H[2];
        var d = H[3];
        var e = H[4];
        var f = H[5];
        var g = H[6];
        var h = H[7];

        // Computation
        for (var i = 0; i < 64; i++) {
          if (i < 16) {
            W[i] = M[offset + i] | 0;
          } else {
            var gamma0x = W[i - 15];
            var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
            var gamma1x = W[i - 2];
            var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
            W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
          }
          var ch = e & f ^ ~e & g;
          var maj = a & b ^ a & c ^ b & c;
          var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
          var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
          var t1 = h + sigma1 + ch + K[i] + W[i];
          var t2 = sigma0 + maj;
          h = g;
          g = f;
          f = e;
          e = d + t1 | 0;
          d = c;
          c = b;
          b = a;
          a = t1 + t2 | 0;
        }

        // Intermediate hash value
        H[0] = H[0] + a | 0;
        H[1] = H[1] + b | 0;
        H[2] = H[2] + c | 0;
        H[3] = H[3] + d | 0;
        H[4] = H[4] + e | 0;
        H[5] = H[5] + f | 0;
        H[6] = H[6] + g | 0;
        H[7] = H[7] + h | 0;
      },
      _doFinalize: function _doFinalize() {
        // Shortcuts
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;

        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
        data.sigBytes = dataWords.length * 4;

        // Hash final blocks
        this._process();

        // Return final computed hash
        return this._hash;
      },
      clone: function clone() {
        var clone = Hasher.clone.call(this);
        clone._hash = this._hash.clone();
        return clone;
      }
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA256('message');
     *     var hash = CryptoJS.SHA256(wordArray);
     */
    C.SHA256 = Hasher._createHelper(SHA256);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA256(message, key);
     */
    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
  })(Math);
  return CryptoJS.SHA256;
});

/***/ }),
/* 48 */
/*!**********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/sha224.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./sha256 */ 47));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./sha256 */ 47)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var C_algo = C.algo;
    var SHA256 = C_algo.SHA256;

    /**
     * SHA-224 hash algorithm.
     */
    var SHA224 = C_algo.SHA224 = SHA256.extend({
      _doReset: function _doReset() {
        this._hash = new WordArray.init([0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4]);
      },
      _doFinalize: function _doFinalize() {
        var hash = SHA256._doFinalize.call(this);
        hash.sigBytes -= 4;
        return hash;
      }
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA224('message');
     *     var hash = CryptoJS.SHA224(wordArray);
     */
    C.SHA224 = SHA256._createHelper(SHA224);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA224(message, key);
     */
    C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
  })();
  return CryptoJS.SHA224;
});

/***/ }),
/* 49 */
/*!**********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/sha512.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./x64-core */ 40));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./x64-core */ 40)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Hasher = C_lib.Hasher;
    var C_x64 = C.x64;
    var X64Word = C_x64.Word;
    var X64WordArray = C_x64.WordArray;
    var C_algo = C.algo;
    function X64Word_create() {
      return X64Word.create.apply(X64Word, arguments);
    }

    // Constants
    var K = [X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd), X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc), X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019), X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118), X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe), X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2), X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1), X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694), X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3), X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65), X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483), X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5), X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210), X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4), X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725), X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70), X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926), X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df), X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8), X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b), X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001), X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30), X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910), X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8), X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53), X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8), X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb), X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3), X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60), X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec), X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9), X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b), X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207), X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178), X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6), X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b), X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493), X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c), X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a), X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)];

    // Reusable objects
    var W = [];
    (function () {
      for (var i = 0; i < 80; i++) {
        W[i] = X64Word_create();
      }
    })();

    /**
     * SHA-512 hash algorithm.
     */
    var SHA512 = C_algo.SHA512 = Hasher.extend({
      _doReset: function _doReset() {
        this._hash = new X64WordArray.init([new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b), new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1), new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f), new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)]);
      },
      _doProcessBlock: function _doProcessBlock(M, offset) {
        // Shortcuts
        var H = this._hash.words;
        var H0 = H[0];
        var H1 = H[1];
        var H2 = H[2];
        var H3 = H[3];
        var H4 = H[4];
        var H5 = H[5];
        var H6 = H[6];
        var H7 = H[7];
        var H0h = H0.high;
        var H0l = H0.low;
        var H1h = H1.high;
        var H1l = H1.low;
        var H2h = H2.high;
        var H2l = H2.low;
        var H3h = H3.high;
        var H3l = H3.low;
        var H4h = H4.high;
        var H4l = H4.low;
        var H5h = H5.high;
        var H5l = H5.low;
        var H6h = H6.high;
        var H6l = H6.low;
        var H7h = H7.high;
        var H7l = H7.low;

        // Working variables
        var ah = H0h;
        var al = H0l;
        var bh = H1h;
        var bl = H1l;
        var ch = H2h;
        var cl = H2l;
        var dh = H3h;
        var dl = H3l;
        var eh = H4h;
        var el = H4l;
        var fh = H5h;
        var fl = H5l;
        var gh = H6h;
        var gl = H6l;
        var hh = H7h;
        var hl = H7l;

        // Rounds
        for (var i = 0; i < 80; i++) {
          var Wil;
          var Wih;

          // Shortcut
          var Wi = W[i];

          // Extend message
          if (i < 16) {
            Wih = Wi.high = M[offset + i * 2] | 0;
            Wil = Wi.low = M[offset + i * 2 + 1] | 0;
          } else {
            // Gamma0
            var gamma0x = W[i - 15];
            var gamma0xh = gamma0x.high;
            var gamma0xl = gamma0x.low;
            var gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (gamma0xh >>> 8 | gamma0xl << 24) ^ gamma0xh >>> 7;
            var gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (gamma0xl >>> 8 | gamma0xh << 24) ^ (gamma0xl >>> 7 | gamma0xh << 25);

            // Gamma1
            var gamma1x = W[i - 2];
            var gamma1xh = gamma1x.high;
            var gamma1xl = gamma1x.low;
            var gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
            var gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xl >>> 6 | gamma1xh << 26);

            // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
            var Wi7 = W[i - 7];
            var Wi7h = Wi7.high;
            var Wi7l = Wi7.low;
            var Wi16 = W[i - 16];
            var Wi16h = Wi16.high;
            var Wi16l = Wi16.low;
            Wil = gamma0l + Wi7l;
            Wih = gamma0h + Wi7h + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0);
            Wil = Wil + gamma1l;
            Wih = Wih + gamma1h + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0);
            Wil = Wil + Wi16l;
            Wih = Wih + Wi16h + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0);
            Wi.high = Wih;
            Wi.low = Wil;
          }
          var chh = eh & fh ^ ~eh & gh;
          var chl = el & fl ^ ~el & gl;
          var majh = ah & bh ^ ah & ch ^ bh & ch;
          var majl = al & bl ^ al & cl ^ bl & cl;
          var sigma0h = (ah >>> 28 | al << 4) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7);
          var sigma0l = (al >>> 28 | ah << 4) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7);
          var sigma1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9);
          var sigma1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9);

          // t1 = h + sigma1 + ch + K[i] + W[i]
          var Ki = K[i];
          var Kih = Ki.high;
          var Kil = Ki.low;
          var t1l = hl + sigma1l;
          var t1h = hh + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
          var t1l = t1l + chl;
          var t1h = t1h + chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
          var t1l = t1l + Kil;
          var t1h = t1h + Kih + (t1l >>> 0 < Kil >>> 0 ? 1 : 0);
          var t1l = t1l + Wil;
          var t1h = t1h + Wih + (t1l >>> 0 < Wil >>> 0 ? 1 : 0);

          // t2 = sigma0 + maj
          var t2l = sigma0l + majl;
          var t2h = sigma0h + majh + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);

          // Update working variables
          hh = gh;
          hl = gl;
          gh = fh;
          gl = fl;
          fh = eh;
          fl = el;
          el = dl + t1l | 0;
          eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
          dh = ch;
          dl = cl;
          ch = bh;
          cl = bl;
          bh = ah;
          bl = al;
          al = t1l + t2l | 0;
          ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
        }

        // Intermediate hash value
        H0l = H0.low = H0l + al;
        H0.high = H0h + ah + (H0l >>> 0 < al >>> 0 ? 1 : 0);
        H1l = H1.low = H1l + bl;
        H1.high = H1h + bh + (H1l >>> 0 < bl >>> 0 ? 1 : 0);
        H2l = H2.low = H2l + cl;
        H2.high = H2h + ch + (H2l >>> 0 < cl >>> 0 ? 1 : 0);
        H3l = H3.low = H3l + dl;
        H3.high = H3h + dh + (H3l >>> 0 < dl >>> 0 ? 1 : 0);
        H4l = H4.low = H4l + el;
        H4.high = H4h + eh + (H4l >>> 0 < el >>> 0 ? 1 : 0);
        H5l = H5.low = H5l + fl;
        H5.high = H5h + fh + (H5l >>> 0 < fl >>> 0 ? 1 : 0);
        H6l = H6.low = H6l + gl;
        H6.high = H6h + gh + (H6l >>> 0 < gl >>> 0 ? 1 : 0);
        H7l = H7.low = H7l + hl;
        H7.high = H7h + hh + (H7l >>> 0 < hl >>> 0 ? 1 : 0);
      },
      _doFinalize: function _doFinalize() {
        // Shortcuts
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;

        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
        dataWords[(nBitsLeft + 128 >>> 10 << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
        dataWords[(nBitsLeft + 128 >>> 10 << 5) + 31] = nBitsTotal;
        data.sigBytes = dataWords.length * 4;

        // Hash final blocks
        this._process();

        // Convert hash to 32-bit word array before returning
        var hash = this._hash.toX32();

        // Return final computed hash
        return hash;
      },
      clone: function clone() {
        var clone = Hasher.clone.call(this);
        clone._hash = this._hash.clone();
        return clone;
      },
      blockSize: 1024 / 32
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA512('message');
     *     var hash = CryptoJS.SHA512(wordArray);
     */
    C.SHA512 = Hasher._createHelper(SHA512);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA512(message, key);
     */
    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
  })();
  return CryptoJS.SHA512;
});

/***/ }),
/* 50 */
/*!**********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/sha384.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./x64-core */ 40), __webpack_require__(/*! ./sha512 */ 49));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./x64-core */ 40), __webpack_require__(/*! ./sha512 */ 49)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_x64 = C.x64;
    var X64Word = C_x64.Word;
    var X64WordArray = C_x64.WordArray;
    var C_algo = C.algo;
    var SHA512 = C_algo.SHA512;

    /**
     * SHA-384 hash algorithm.
     */
    var SHA384 = C_algo.SHA384 = SHA512.extend({
      _doReset: function _doReset() {
        this._hash = new X64WordArray.init([new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507), new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939), new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511), new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)]);
      },
      _doFinalize: function _doFinalize() {
        var hash = SHA512._doFinalize.call(this);
        hash.sigBytes -= 16;
        return hash;
      }
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA384('message');
     *     var hash = CryptoJS.SHA384(wordArray);
     */
    C.SHA384 = SHA512._createHelper(SHA384);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA384(message, key);
     */
    C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
  })();
  return CryptoJS.SHA384;
});

/***/ }),
/* 51 */
/*!********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/sha3.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./x64-core */ 40));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./x64-core */ 40)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  (function (Math) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_x64 = C.x64;
    var X64Word = C_x64.Word;
    var C_algo = C.algo;

    // Constants tables
    var RHO_OFFSETS = [];
    var PI_INDEXES = [];
    var ROUND_CONSTANTS = [];

    // Compute Constants
    (function () {
      // Compute rho offset constants
      var x = 1,
        y = 0;
      for (var t = 0; t < 24; t++) {
        RHO_OFFSETS[x + 5 * y] = (t + 1) * (t + 2) / 2 % 64;
        var newX = y % 5;
        var newY = (2 * x + 3 * y) % 5;
        x = newX;
        y = newY;
      }

      // Compute pi index constants
      for (var x = 0; x < 5; x++) {
        for (var y = 0; y < 5; y++) {
          PI_INDEXES[x + 5 * y] = y + (2 * x + 3 * y) % 5 * 5;
        }
      }

      // Compute round constants
      var LFSR = 0x01;
      for (var i = 0; i < 24; i++) {
        var roundConstantMsw = 0;
        var roundConstantLsw = 0;
        for (var j = 0; j < 7; j++) {
          if (LFSR & 0x01) {
            var bitPosition = (1 << j) - 1;
            if (bitPosition < 32) {
              roundConstantLsw ^= 1 << bitPosition;
            } else /* if (bitPosition >= 32) */{
                roundConstantMsw ^= 1 << bitPosition - 32;
              }
          }

          // Compute next LFSR
          if (LFSR & 0x80) {
            // Primitive polynomial over GF(2): x^8 + x^6 + x^5 + x^4 + 1
            LFSR = LFSR << 1 ^ 0x71;
          } else {
            LFSR <<= 1;
          }
        }
        ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
      }
    })();

    // Reusable objects for temporary values
    var T = [];
    (function () {
      for (var i = 0; i < 25; i++) {
        T[i] = X64Word.create();
      }
    })();

    /**
     * SHA-3 hash algorithm.
     */
    var SHA3 = C_algo.SHA3 = Hasher.extend({
      /**
       * Configuration options.
       *
       * @property {number} outputLength
       *   The desired number of bits in the output hash.
       *   Only values permitted are: 224, 256, 384, 512.
       *   Default: 512
       */
      cfg: Hasher.cfg.extend({
        outputLength: 512
      }),
      _doReset: function _doReset() {
        var state = this._state = [];
        for (var i = 0; i < 25; i++) {
          state[i] = new X64Word.init();
        }
        this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
      },
      _doProcessBlock: function _doProcessBlock(M, offset) {
        // Shortcuts
        var state = this._state;
        var nBlockSizeLanes = this.blockSize / 2;

        // Absorb
        for (var i = 0; i < nBlockSizeLanes; i++) {
          // Shortcuts
          var M2i = M[offset + 2 * i];
          var M2i1 = M[offset + 2 * i + 1];

          // Swap endian
          M2i = (M2i << 8 | M2i >>> 24) & 0x00ff00ff | (M2i << 24 | M2i >>> 8) & 0xff00ff00;
          M2i1 = (M2i1 << 8 | M2i1 >>> 24) & 0x00ff00ff | (M2i1 << 24 | M2i1 >>> 8) & 0xff00ff00;

          // Absorb message into state
          var lane = state[i];
          lane.high ^= M2i1;
          lane.low ^= M2i;
        }

        // Rounds
        for (var round = 0; round < 24; round++) {
          // Theta
          for (var x = 0; x < 5; x++) {
            // Mix column lanes
            var tMsw = 0,
              tLsw = 0;
            for (var y = 0; y < 5; y++) {
              var lane = state[x + 5 * y];
              tMsw ^= lane.high;
              tLsw ^= lane.low;
            }

            // Temporary values
            var Tx = T[x];
            Tx.high = tMsw;
            Tx.low = tLsw;
          }
          for (var x = 0; x < 5; x++) {
            // Shortcuts
            var Tx4 = T[(x + 4) % 5];
            var Tx1 = T[(x + 1) % 5];
            var Tx1Msw = Tx1.high;
            var Tx1Lsw = Tx1.low;

            // Mix surrounding columns
            var tMsw = Tx4.high ^ (Tx1Msw << 1 | Tx1Lsw >>> 31);
            var tLsw = Tx4.low ^ (Tx1Lsw << 1 | Tx1Msw >>> 31);
            for (var y = 0; y < 5; y++) {
              var lane = state[x + 5 * y];
              lane.high ^= tMsw;
              lane.low ^= tLsw;
            }
          }

          // Rho Pi
          for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
            var tMsw;
            var tLsw;

            // Shortcuts
            var lane = state[laneIndex];
            var laneMsw = lane.high;
            var laneLsw = lane.low;
            var rhoOffset = RHO_OFFSETS[laneIndex];

            // Rotate lanes
            if (rhoOffset < 32) {
              tMsw = laneMsw << rhoOffset | laneLsw >>> 32 - rhoOffset;
              tLsw = laneLsw << rhoOffset | laneMsw >>> 32 - rhoOffset;
            } else /* if (rhoOffset >= 32) */{
                tMsw = laneLsw << rhoOffset - 32 | laneMsw >>> 64 - rhoOffset;
                tLsw = laneMsw << rhoOffset - 32 | laneLsw >>> 64 - rhoOffset;
              }

            // Transpose lanes
            var TPiLane = T[PI_INDEXES[laneIndex]];
            TPiLane.high = tMsw;
            TPiLane.low = tLsw;
          }

          // Rho pi at x = y = 0
          var T0 = T[0];
          var state0 = state[0];
          T0.high = state0.high;
          T0.low = state0.low;

          // Chi
          for (var x = 0; x < 5; x++) {
            for (var y = 0; y < 5; y++) {
              // Shortcuts
              var laneIndex = x + 5 * y;
              var lane = state[laneIndex];
              var TLane = T[laneIndex];
              var Tx1Lane = T[(x + 1) % 5 + 5 * y];
              var Tx2Lane = T[(x + 2) % 5 + 5 * y];

              // Mix rows
              lane.high = TLane.high ^ ~Tx1Lane.high & Tx2Lane.high;
              lane.low = TLane.low ^ ~Tx1Lane.low & Tx2Lane.low;
            }
          }

          // Iota
          var lane = state[0];
          var roundConstant = ROUND_CONSTANTS[round];
          lane.high ^= roundConstant.high;
          lane.low ^= roundConstant.low;
        }
      },
      _doFinalize: function _doFinalize() {
        // Shortcuts
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;
        var blockSizeBits = this.blockSize * 32;

        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x1 << 24 - nBitsLeft % 32;
        dataWords[(Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits >>> 5) - 1] |= 0x80;
        data.sigBytes = dataWords.length * 4;

        // Hash final blocks
        this._process();

        // Shortcuts
        var state = this._state;
        var outputLengthBytes = this.cfg.outputLength / 8;
        var outputLengthLanes = outputLengthBytes / 8;

        // Squeeze
        var hashWords = [];
        for (var i = 0; i < outputLengthLanes; i++) {
          // Shortcuts
          var lane = state[i];
          var laneMsw = lane.high;
          var laneLsw = lane.low;

          // Swap endian
          laneMsw = (laneMsw << 8 | laneMsw >>> 24) & 0x00ff00ff | (laneMsw << 24 | laneMsw >>> 8) & 0xff00ff00;
          laneLsw = (laneLsw << 8 | laneLsw >>> 24) & 0x00ff00ff | (laneLsw << 24 | laneLsw >>> 8) & 0xff00ff00;

          // Squeeze state to retrieve hash
          hashWords.push(laneLsw);
          hashWords.push(laneMsw);
        }

        // Return final computed hash
        return new WordArray.init(hashWords, outputLengthBytes);
      },
      clone: function clone() {
        var clone = Hasher.clone.call(this);
        var state = clone._state = this._state.slice(0);
        for (var i = 0; i < 25; i++) {
          state[i] = state[i].clone();
        }
        return clone;
      }
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA3('message');
     *     var hash = CryptoJS.SHA3(wordArray);
     */
    C.SHA3 = Hasher._createHelper(SHA3);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA3(message, key);
     */
    C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
  })(Math);
  return CryptoJS.SHA3;
});

/***/ }),
/* 52 */
/*!*************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/ripemd160.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  /** @preserve
  (c) 2012 by C??dric Mesnil. All rights reserved.
  	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
  	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
      - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
  	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  */

  (function (Math) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    // Constants table
    var _zl = WordArray.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]);
    var _zr = WordArray.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]);
    var _sl = WordArray.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]);
    var _sr = WordArray.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]);
    var _hl = WordArray.create([0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
    var _hr = WordArray.create([0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);

    /**
     * RIPEMD160 hash algorithm.
     */
    var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
      _doReset: function _doReset() {
        this._hash = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
      },
      _doProcessBlock: function _doProcessBlock(M, offset) {
        // Swap endian
        for (var i = 0; i < 16; i++) {
          // Shortcuts
          var offset_i = offset + i;
          var M_offset_i = M[offset_i];

          // Swap
          M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 0x00ff00ff | (M_offset_i << 24 | M_offset_i >>> 8) & 0xff00ff00;
        }
        // Shortcut
        var H = this._hash.words;
        var hl = _hl.words;
        var hr = _hr.words;
        var zl = _zl.words;
        var zr = _zr.words;
        var sl = _sl.words;
        var sr = _sr.words;

        // Working variables
        var al, bl, cl, dl, el;
        var ar, br, cr, dr, er;
        ar = al = H[0];
        br = bl = H[1];
        cr = cl = H[2];
        dr = dl = H[3];
        er = el = H[4];
        // Computation
        var t;
        for (var i = 0; i < 80; i += 1) {
          t = al + M[offset + zl[i]] | 0;
          if (i < 16) {
            t += f1(bl, cl, dl) + hl[0];
          } else if (i < 32) {
            t += f2(bl, cl, dl) + hl[1];
          } else if (i < 48) {
            t += f3(bl, cl, dl) + hl[2];
          } else if (i < 64) {
            t += f4(bl, cl, dl) + hl[3];
          } else {
            // if (i<80) {
            t += f5(bl, cl, dl) + hl[4];
          }
          t = t | 0;
          t = rotl(t, sl[i]);
          t = t + el | 0;
          al = el;
          el = dl;
          dl = rotl(cl, 10);
          cl = bl;
          bl = t;
          t = ar + M[offset + zr[i]] | 0;
          if (i < 16) {
            t += f5(br, cr, dr) + hr[0];
          } else if (i < 32) {
            t += f4(br, cr, dr) + hr[1];
          } else if (i < 48) {
            t += f3(br, cr, dr) + hr[2];
          } else if (i < 64) {
            t += f2(br, cr, dr) + hr[3];
          } else {
            // if (i<80) {
            t += f1(br, cr, dr) + hr[4];
          }
          t = t | 0;
          t = rotl(t, sr[i]);
          t = t + er | 0;
          ar = er;
          er = dr;
          dr = rotl(cr, 10);
          cr = br;
          br = t;
        }
        // Intermediate hash value
        t = H[1] + cl + dr | 0;
        H[1] = H[2] + dl + er | 0;
        H[2] = H[3] + el + ar | 0;
        H[3] = H[4] + al + br | 0;
        H[4] = H[0] + bl + cr | 0;
        H[0] = t;
      },
      _doFinalize: function _doFinalize() {
        // Shortcuts
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;

        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotal << 8 | nBitsTotal >>> 24) & 0x00ff00ff | (nBitsTotal << 24 | nBitsTotal >>> 8) & 0xff00ff00;
        data.sigBytes = (dataWords.length + 1) * 4;

        // Hash final blocks
        this._process();

        // Shortcuts
        var hash = this._hash;
        var H = hash.words;

        // Swap endian
        for (var i = 0; i < 5; i++) {
          // Shortcut
          var H_i = H[i];

          // Swap
          H[i] = (H_i << 8 | H_i >>> 24) & 0x00ff00ff | (H_i << 24 | H_i >>> 8) & 0xff00ff00;
        }

        // Return final computed hash
        return hash;
      },
      clone: function clone() {
        var clone = Hasher.clone.call(this);
        clone._hash = this._hash.clone();
        return clone;
      }
    });
    function f1(x, y, z) {
      return x ^ y ^ z;
    }
    function f2(x, y, z) {
      return x & y | ~x & z;
    }
    function f3(x, y, z) {
      return (x | ~y) ^ z;
    }
    function f4(x, y, z) {
      return x & z | y & ~z;
    }
    function f5(x, y, z) {
      return x ^ (y | ~z);
    }
    function rotl(x, n) {
      return x << n | x >>> 32 - n;
    }

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.RIPEMD160('message');
     *     var hash = CryptoJS.RIPEMD160(wordArray);
     */
    C.RIPEMD160 = Hasher._createHelper(RIPEMD160);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacRIPEMD160(message, key);
     */
    C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
  })(Math);
  return CryptoJS.RIPEMD160;
});

/***/ }),
/* 53 */
/*!********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/hmac.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var C_enc = C.enc;
    var Utf8 = C_enc.Utf8;
    var C_algo = C.algo;

    /**
     * HMAC algorithm.
     */
    var HMAC = C_algo.HMAC = Base.extend({
      /**
       * Initializes a newly created HMAC.
       *
       * @param {Hasher} hasher The hash algorithm to use.
       * @param {WordArray|string} key The secret key.
       *
       * @example
       *
       *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
       */
      init: function init(hasher, key) {
        // Init hasher
        hasher = this._hasher = new hasher.init();

        // Convert string to WordArray, else assume WordArray already
        if (typeof key == 'string') {
          key = Utf8.parse(key);
        }

        // Shortcuts
        var hasherBlockSize = hasher.blockSize;
        var hasherBlockSizeBytes = hasherBlockSize * 4;

        // Allow arbitrary length keys
        if (key.sigBytes > hasherBlockSizeBytes) {
          key = hasher.finalize(key);
        }

        // Clamp excess bits
        key.clamp();

        // Clone key for inner and outer pads
        var oKey = this._oKey = key.clone();
        var iKey = this._iKey = key.clone();

        // Shortcuts
        var oKeyWords = oKey.words;
        var iKeyWords = iKey.words;

        // XOR keys with pad constants
        for (var i = 0; i < hasherBlockSize; i++) {
          oKeyWords[i] ^= 0x5c5c5c5c;
          iKeyWords[i] ^= 0x36363636;
        }
        oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

        // Set initial values
        this.reset();
      },
      /**
       * Resets this HMAC to its initial state.
       *
       * @example
       *
       *     hmacHasher.reset();
       */
      reset: function reset() {
        // Shortcut
        var hasher = this._hasher;

        // Reset
        hasher.reset();
        hasher.update(this._iKey);
      },
      /**
       * Updates this HMAC with a message.
       *
       * @param {WordArray|string} messageUpdate The message to append.
       *
       * @return {HMAC} This HMAC instance.
       *
       * @example
       *
       *     hmacHasher.update('message');
       *     hmacHasher.update(wordArray);
       */
      update: function update(messageUpdate) {
        this._hasher.update(messageUpdate);

        // Chainable
        return this;
      },
      /**
       * Finalizes the HMAC computation.
       * Note that the finalize operation is effectively a destructive, read-once operation.
       *
       * @param {WordArray|string} messageUpdate (Optional) A final message update.
       *
       * @return {WordArray} The HMAC.
       *
       * @example
       *
       *     var hmac = hmacHasher.finalize();
       *     var hmac = hmacHasher.finalize('message');
       *     var hmac = hmacHasher.finalize(wordArray);
       */
      finalize: function finalize(messageUpdate) {
        // Shortcut
        var hasher = this._hasher;

        // Compute HMAC
        var innerHash = hasher.finalize(messageUpdate);
        hasher.reset();
        var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
        return hmac;
      }
    });
  })();
});

/***/ }),
/* 54 */
/*!**********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/pbkdf2.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./sha1 */ 46), __webpack_require__(/*! ./hmac */ 53));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./sha1 */ 46), __webpack_require__(/*! ./hmac */ 53)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var WordArray = C_lib.WordArray;
    var C_algo = C.algo;
    var SHA1 = C_algo.SHA1;
    var HMAC = C_algo.HMAC;

    /**
     * Password-Based Key Derivation Function 2 algorithm.
     */
    var PBKDF2 = C_algo.PBKDF2 = Base.extend({
      /**
       * Configuration options.
       *
       * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
       * @property {Hasher} hasher The hasher to use. Default: SHA1
       * @property {number} iterations The number of iterations to perform. Default: 1
       */
      cfg: Base.extend({
        keySize: 128 / 32,
        hasher: SHA1,
        iterations: 1
      }),
      /**
       * Initializes a newly created key derivation function.
       *
       * @param {Object} cfg (Optional) The configuration options to use for the derivation.
       *
       * @example
       *
       *     var kdf = CryptoJS.algo.PBKDF2.create();
       *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
       *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
       */
      init: function init(cfg) {
        this.cfg = this.cfg.extend(cfg);
      },
      /**
       * Computes the Password-Based Key Derivation Function 2.
       *
       * @param {WordArray|string} password The password.
       * @param {WordArray|string} salt A salt.
       *
       * @return {WordArray} The derived key.
       *
       * @example
       *
       *     var key = kdf.compute(password, salt);
       */
      compute: function compute(password, salt) {
        // Shortcut
        var cfg = this.cfg;

        // Init HMAC
        var hmac = HMAC.create(cfg.hasher, password);

        // Initial values
        var derivedKey = WordArray.create();
        var blockIndex = WordArray.create([0x00000001]);

        // Shortcuts
        var derivedKeyWords = derivedKey.words;
        var blockIndexWords = blockIndex.words;
        var keySize = cfg.keySize;
        var iterations = cfg.iterations;

        // Generate key
        while (derivedKeyWords.length < keySize) {
          var block = hmac.update(salt).finalize(blockIndex);
          hmac.reset();

          // Shortcuts
          var blockWords = block.words;
          var blockWordsLength = blockWords.length;

          // Iterations
          var intermediate = block;
          for (var i = 1; i < iterations; i++) {
            intermediate = hmac.finalize(intermediate);
            hmac.reset();

            // Shortcut
            var intermediateWords = intermediate.words;

            // XOR intermediate with block
            for (var j = 0; j < blockWordsLength; j++) {
              blockWords[j] ^= intermediateWords[j];
            }
          }
          derivedKey.concat(block);
          blockIndexWords[0]++;
        }
        derivedKey.sigBytes = keySize * 4;
        return derivedKey;
      }
    });

    /**
     * Computes the Password-Based Key Derivation Function 2.
     *
     * @param {WordArray|string} password The password.
     * @param {WordArray|string} salt A salt.
     * @param {Object} cfg (Optional) The configuration options to use for this computation.
     *
     * @return {WordArray} The derived key.
     *
     * @static
     *
     * @example
     *
     *     var key = CryptoJS.PBKDF2(password, salt);
     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
     */
    C.PBKDF2 = function (password, salt, cfg) {
      return PBKDF2.create(cfg).compute(password, salt);
    };
  })();
  return CryptoJS.PBKDF2;
});

/***/ }),
/* 55 */
/*!**********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/evpkdf.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./sha1 */ 46), __webpack_require__(/*! ./hmac */ 53));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./sha1 */ 46), __webpack_require__(/*! ./hmac */ 53)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var WordArray = C_lib.WordArray;
    var C_algo = C.algo;
    var MD5 = C_algo.MD5;

    /**
     * This key derivation function is meant to conform with EVP_BytesToKey.
     * www.openssl.org/docs/crypto/EVP_BytesToKey.html
     */
    var EvpKDF = C_algo.EvpKDF = Base.extend({
      /**
       * Configuration options.
       *
       * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
       * @property {Hasher} hasher The hash algorithm to use. Default: MD5
       * @property {number} iterations The number of iterations to perform. Default: 1
       */
      cfg: Base.extend({
        keySize: 128 / 32,
        hasher: MD5,
        iterations: 1
      }),
      /**
       * Initializes a newly created key derivation function.
       *
       * @param {Object} cfg (Optional) The configuration options to use for the derivation.
       *
       * @example
       *
       *     var kdf = CryptoJS.algo.EvpKDF.create();
       *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
       *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
       */
      init: function init(cfg) {
        this.cfg = this.cfg.extend(cfg);
      },
      /**
       * Derives a key from a password.
       *
       * @param {WordArray|string} password The password.
       * @param {WordArray|string} salt A salt.
       *
       * @return {WordArray} The derived key.
       *
       * @example
       *
       *     var key = kdf.compute(password, salt);
       */
      compute: function compute(password, salt) {
        var block;

        // Shortcut
        var cfg = this.cfg;

        // Init hasher
        var hasher = cfg.hasher.create();

        // Initial values
        var derivedKey = WordArray.create();

        // Shortcuts
        var derivedKeyWords = derivedKey.words;
        var keySize = cfg.keySize;
        var iterations = cfg.iterations;

        // Generate key
        while (derivedKeyWords.length < keySize) {
          if (block) {
            hasher.update(block);
          }
          block = hasher.update(password).finalize(salt);
          hasher.reset();

          // Iterations
          for (var i = 1; i < iterations; i++) {
            block = hasher.finalize(block);
            hasher.reset();
          }
          derivedKey.concat(block);
        }
        derivedKey.sigBytes = keySize * 4;
        return derivedKey;
      }
    });

    /**
     * Derives a key from a password.
     *
     * @param {WordArray|string} password The password.
     * @param {WordArray|string} salt A salt.
     * @param {Object} cfg (Optional) The configuration options to use for this computation.
     *
     * @return {WordArray} The derived key.
     *
     * @static
     *
     * @example
     *
     *     var key = CryptoJS.EvpKDF(password, salt);
     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
     */
    C.EvpKDF = function (password, salt, cfg) {
      return EvpKDF.create(cfg).compute(password, salt);
    };
  })();
  return CryptoJS.EvpKDF;
});

/***/ }),
/* 56 */
/*!***************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/cipher-core.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./evpkdf */ 55));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./evpkdf */ 55)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  /**
   * Cipher core components.
   */
  CryptoJS.lib.Cipher || function (undefined) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var WordArray = C_lib.WordArray;
    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
    var C_enc = C.enc;
    var Utf8 = C_enc.Utf8;
    var Base64 = C_enc.Base64;
    var C_algo = C.algo;
    var EvpKDF = C_algo.EvpKDF;

    /**
     * Abstract base cipher template.
     *
     * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
     * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
     * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
     * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
     */
    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
      /**
       * Configuration options.
       *
       * @property {WordArray} iv The IV to use for this operation.
       */
      cfg: Base.extend(),
      /**
       * Creates this cipher in encryption mode.
       *
       * @param {WordArray} key The key.
       * @param {Object} cfg (Optional) The configuration options to use for this operation.
       *
       * @return {Cipher} A cipher instance.
       *
       * @static
       *
       * @example
       *
       *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
       */
      createEncryptor: function createEncryptor(key, cfg) {
        return this.create(this._ENC_XFORM_MODE, key, cfg);
      },
      /**
       * Creates this cipher in decryption mode.
       *
       * @param {WordArray} key The key.
       * @param {Object} cfg (Optional) The configuration options to use for this operation.
       *
       * @return {Cipher} A cipher instance.
       *
       * @static
       *
       * @example
       *
       *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
       */
      createDecryptor: function createDecryptor(key, cfg) {
        return this.create(this._DEC_XFORM_MODE, key, cfg);
      },
      /**
       * Initializes a newly created cipher.
       *
       * @param {number} xformMode Either the encryption or decryption transormation mode constant.
       * @param {WordArray} key The key.
       * @param {Object} cfg (Optional) The configuration options to use for this operation.
       *
       * @example
       *
       *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
       */
      init: function init(xformMode, key, cfg) {
        // Apply config defaults
        this.cfg = this.cfg.extend(cfg);

        // Store transform mode and key
        this._xformMode = xformMode;
        this._key = key;

        // Set initial values
        this.reset();
      },
      /**
       * Resets this cipher to its initial state.
       *
       * @example
       *
       *     cipher.reset();
       */
      reset: function reset() {
        // Reset data buffer
        BufferedBlockAlgorithm.reset.call(this);

        // Perform concrete-cipher logic
        this._doReset();
      },
      /**
       * Adds data to be encrypted or decrypted.
       *
       * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
       *
       * @return {WordArray} The data after processing.
       *
       * @example
       *
       *     var encrypted = cipher.process('data');
       *     var encrypted = cipher.process(wordArray);
       */
      process: function process(dataUpdate) {
        // Append
        this._append(dataUpdate);

        // Process available blocks
        return this._process();
      },
      /**
       * Finalizes the encryption or decryption process.
       * Note that the finalize operation is effectively a destructive, read-once operation.
       *
       * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
       *
       * @return {WordArray} The data after final processing.
       *
       * @example
       *
       *     var encrypted = cipher.finalize();
       *     var encrypted = cipher.finalize('data');
       *     var encrypted = cipher.finalize(wordArray);
       */
      finalize: function finalize(dataUpdate) {
        // Final data update
        if (dataUpdate) {
          this._append(dataUpdate);
        }

        // Perform concrete-cipher logic
        var finalProcessedData = this._doFinalize();
        return finalProcessedData;
      },
      keySize: 128 / 32,
      ivSize: 128 / 32,
      _ENC_XFORM_MODE: 1,
      _DEC_XFORM_MODE: 2,
      /**
       * Creates shortcut functions to a cipher's object interface.
       *
       * @param {Cipher} cipher The cipher to create a helper for.
       *
       * @return {Object} An object with encrypt and decrypt shortcut functions.
       *
       * @static
       *
       * @example
       *
       *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
       */
      _createHelper: function () {
        function selectCipherStrategy(key) {
          if (typeof key == 'string') {
            return PasswordBasedCipher;
          } else {
            return SerializableCipher;
          }
        }
        return function (cipher) {
          return {
            encrypt: function encrypt(message, key, cfg) {
              return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
            },
            decrypt: function decrypt(ciphertext, key, cfg) {
              return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
            }
          };
        };
      }()
    });

    /**
     * Abstract base stream cipher template.
     *
     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
     */
    var StreamCipher = C_lib.StreamCipher = Cipher.extend({
      _doFinalize: function _doFinalize() {
        // Process partial blocks
        var finalProcessedBlocks = this._process(!!'flush');
        return finalProcessedBlocks;
      },
      blockSize: 1
    });

    /**
     * Mode namespace.
     */
    var C_mode = C.mode = {};

    /**
     * Abstract base block cipher mode template.
     */
    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
      /**
       * Creates this mode for encryption.
       *
       * @param {Cipher} cipher A block cipher instance.
       * @param {Array} iv The IV words.
       *
       * @static
       *
       * @example
       *
       *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
       */
      createEncryptor: function createEncryptor(cipher, iv) {
        return this.Encryptor.create(cipher, iv);
      },
      /**
       * Creates this mode for decryption.
       *
       * @param {Cipher} cipher A block cipher instance.
       * @param {Array} iv The IV words.
       *
       * @static
       *
       * @example
       *
       *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
       */
      createDecryptor: function createDecryptor(cipher, iv) {
        return this.Decryptor.create(cipher, iv);
      },
      /**
       * Initializes a newly created mode.
       *
       * @param {Cipher} cipher A block cipher instance.
       * @param {Array} iv The IV words.
       *
       * @example
       *
       *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
       */
      init: function init(cipher, iv) {
        this._cipher = cipher;
        this._iv = iv;
      }
    });

    /**
     * Cipher Block Chaining mode.
     */
    var CBC = C_mode.CBC = function () {
      /**
       * Abstract base CBC mode.
       */
      var CBC = BlockCipherMode.extend();

      /**
       * CBC encryptor.
       */
      CBC.Encryptor = CBC.extend({
        /**
         * Processes the data block at offset.
         *
         * @param {Array} words The data words to operate on.
         * @param {number} offset The offset where the block starts.
         *
         * @example
         *
         *     mode.processBlock(data.words, offset);
         */
        processBlock: function processBlock(words, offset) {
          // Shortcuts
          var cipher = this._cipher;
          var blockSize = cipher.blockSize;

          // XOR and encrypt
          xorBlock.call(this, words, offset, blockSize);
          cipher.encryptBlock(words, offset);

          // Remember this block to use with next block
          this._prevBlock = words.slice(offset, offset + blockSize);
        }
      });

      /**
       * CBC decryptor.
       */
      CBC.Decryptor = CBC.extend({
        /**
         * Processes the data block at offset.
         *
         * @param {Array} words The data words to operate on.
         * @param {number} offset The offset where the block starts.
         *
         * @example
         *
         *     mode.processBlock(data.words, offset);
         */
        processBlock: function processBlock(words, offset) {
          // Shortcuts
          var cipher = this._cipher;
          var blockSize = cipher.blockSize;

          // Remember this block to use with next block
          var thisBlock = words.slice(offset, offset + blockSize);

          // Decrypt and XOR
          cipher.decryptBlock(words, offset);
          xorBlock.call(this, words, offset, blockSize);

          // This block becomes the previous block
          this._prevBlock = thisBlock;
        }
      });
      function xorBlock(words, offset, blockSize) {
        var block;

        // Shortcut
        var iv = this._iv;

        // Choose mixing block
        if (iv) {
          block = iv;

          // Remove IV for subsequent blocks
          this._iv = undefined;
        } else {
          block = this._prevBlock;
        }

        // XOR blocks
        for (var i = 0; i < blockSize; i++) {
          words[offset + i] ^= block[i];
        }
      }
      return CBC;
    }();

    /**
     * Padding namespace.
     */
    var C_pad = C.pad = {};

    /**
     * PKCS #5/7 padding strategy.
     */
    var Pkcs7 = C_pad.Pkcs7 = {
      /**
       * Pads data using the algorithm defined in PKCS #5/7.
       *
       * @param {WordArray} data The data to pad.
       * @param {number} blockSize The multiple that the data should be padded to.
       *
       * @static
       *
       * @example
       *
       *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
       */
      pad: function pad(data, blockSize) {
        // Shortcut
        var blockSizeBytes = blockSize * 4;

        // Count padding bytes
        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

        // Create padding word
        var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;

        // Create padding
        var paddingWords = [];
        for (var i = 0; i < nPaddingBytes; i += 4) {
          paddingWords.push(paddingWord);
        }
        var padding = WordArray.create(paddingWords, nPaddingBytes);

        // Add padding
        data.concat(padding);
      },
      /**
       * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
       *
       * @param {WordArray} data The data to unpad.
       *
       * @static
       *
       * @example
       *
       *     CryptoJS.pad.Pkcs7.unpad(wordArray);
       */
      unpad: function unpad(data) {
        // Get number of padding bytes from last byte
        var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 0xff;

        // Remove padding
        data.sigBytes -= nPaddingBytes;
      }
    };

    /**
     * Abstract base block cipher template.
     *
     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
     */
    var BlockCipher = C_lib.BlockCipher = Cipher.extend({
      /**
       * Configuration options.
       *
       * @property {Mode} mode The block mode to use. Default: CBC
       * @property {Padding} padding The padding strategy to use. Default: Pkcs7
       */
      cfg: Cipher.cfg.extend({
        mode: CBC,
        padding: Pkcs7
      }),
      reset: function reset() {
        var modeCreator;

        // Reset cipher
        Cipher.reset.call(this);

        // Shortcuts
        var cfg = this.cfg;
        var iv = cfg.iv;
        var mode = cfg.mode;

        // Reset block mode
        if (this._xformMode == this._ENC_XFORM_MODE) {
          modeCreator = mode.createEncryptor;
        } else /* if (this._xformMode == this._DEC_XFORM_MODE) */{
            modeCreator = mode.createDecryptor;
            // Keep at least one block in the buffer for unpadding
            this._minBufferSize = 1;
          }
        if (this._mode && this._mode.__creator == modeCreator) {
          this._mode.init(this, iv && iv.words);
        } else {
          this._mode = modeCreator.call(mode, this, iv && iv.words);
          this._mode.__creator = modeCreator;
        }
      },
      _doProcessBlock: function _doProcessBlock(words, offset) {
        this._mode.processBlock(words, offset);
      },
      _doFinalize: function _doFinalize() {
        var finalProcessedBlocks;

        // Shortcut
        var padding = this.cfg.padding;

        // Finalize
        if (this._xformMode == this._ENC_XFORM_MODE) {
          // Pad data
          padding.pad(this._data, this.blockSize);

          // Process final blocks
          finalProcessedBlocks = this._process(!!'flush');
        } else /* if (this._xformMode == this._DEC_XFORM_MODE) */{
            // Process final blocks
            finalProcessedBlocks = this._process(!!'flush');

            // Unpad data
            padding.unpad(finalProcessedBlocks);
          }
        return finalProcessedBlocks;
      },
      blockSize: 128 / 32
    });

    /**
     * A collection of cipher parameters.
     *
     * @property {WordArray} ciphertext The raw ciphertext.
     * @property {WordArray} key The key to this ciphertext.
     * @property {WordArray} iv The IV used in the ciphering operation.
     * @property {WordArray} salt The salt used with a key derivation function.
     * @property {Cipher} algorithm The cipher algorithm.
     * @property {Mode} mode The block mode used in the ciphering operation.
     * @property {Padding} padding The padding scheme used in the ciphering operation.
     * @property {number} blockSize The block size of the cipher.
     * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
     */
    var CipherParams = C_lib.CipherParams = Base.extend({
      /**
       * Initializes a newly created cipher params object.
       *
       * @param {Object} cipherParams An object with any of the possible cipher parameters.
       *
       * @example
       *
       *     var cipherParams = CryptoJS.lib.CipherParams.create({
       *         ciphertext: ciphertextWordArray,
       *         key: keyWordArray,
       *         iv: ivWordArray,
       *         salt: saltWordArray,
       *         algorithm: CryptoJS.algo.AES,
       *         mode: CryptoJS.mode.CBC,
       *         padding: CryptoJS.pad.PKCS7,
       *         blockSize: 4,
       *         formatter: CryptoJS.format.OpenSSL
       *     });
       */
      init: function init(cipherParams) {
        this.mixIn(cipherParams);
      },
      /**
       * Converts this cipher params object to a string.
       *
       * @param {Format} formatter (Optional) The formatting strategy to use.
       *
       * @return {string} The stringified cipher params.
       *
       * @throws Error If neither the formatter nor the default formatter is set.
       *
       * @example
       *
       *     var string = cipherParams + '';
       *     var string = cipherParams.toString();
       *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
       */
      toString: function toString(formatter) {
        return (formatter || this.formatter).stringify(this);
      }
    });

    /**
     * Format namespace.
     */
    var C_format = C.format = {};

    /**
     * OpenSSL formatting strategy.
     */
    var OpenSSLFormatter = C_format.OpenSSL = {
      /**
       * Converts a cipher params object to an OpenSSL-compatible string.
       *
       * @param {CipherParams} cipherParams The cipher params object.
       *
       * @return {string} The OpenSSL-compatible string.
       *
       * @static
       *
       * @example
       *
       *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
       */
      stringify: function stringify(cipherParams) {
        var wordArray;

        // Shortcuts
        var ciphertext = cipherParams.ciphertext;
        var salt = cipherParams.salt;

        // Format
        if (salt) {
          wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
        } else {
          wordArray = ciphertext;
        }
        return wordArray.toString(Base64);
      },
      /**
       * Converts an OpenSSL-compatible string to a cipher params object.
       *
       * @param {string} openSSLStr The OpenSSL-compatible string.
       *
       * @return {CipherParams} The cipher params object.
       *
       * @static
       *
       * @example
       *
       *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
       */
      parse: function parse(openSSLStr) {
        var salt;

        // Parse base64
        var ciphertext = Base64.parse(openSSLStr);

        // Shortcut
        var ciphertextWords = ciphertext.words;

        // Test for salt
        if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
          // Extract salt
          salt = WordArray.create(ciphertextWords.slice(2, 4));

          // Remove salt from ciphertext
          ciphertextWords.splice(0, 4);
          ciphertext.sigBytes -= 16;
        }
        return CipherParams.create({
          ciphertext: ciphertext,
          salt: salt
        });
      }
    };

    /**
     * A cipher wrapper that returns ciphertext as a serializable cipher params object.
     */
    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
      /**
       * Configuration options.
       *
       * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
       */
      cfg: Base.extend({
        format: OpenSSLFormatter
      }),
      /**
       * Encrypts a message.
       *
       * @param {Cipher} cipher The cipher algorithm to use.
       * @param {WordArray|string} message The message to encrypt.
       * @param {WordArray} key The key.
       * @param {Object} cfg (Optional) The configuration options to use for this operation.
       *
       * @return {CipherParams} A cipher params object.
       *
       * @static
       *
       * @example
       *
       *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
       *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
       *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
       */
      encrypt: function encrypt(cipher, message, key, cfg) {
        // Apply config defaults
        cfg = this.cfg.extend(cfg);

        // Encrypt
        var encryptor = cipher.createEncryptor(key, cfg);
        var ciphertext = encryptor.finalize(message);

        // Shortcut
        var cipherCfg = encryptor.cfg;

        // Create and return serializable cipher params
        return CipherParams.create({
          ciphertext: ciphertext,
          key: key,
          iv: cipherCfg.iv,
          algorithm: cipher,
          mode: cipherCfg.mode,
          padding: cipherCfg.padding,
          blockSize: cipher.blockSize,
          formatter: cfg.format
        });
      },
      /**
       * Decrypts serialized ciphertext.
       *
       * @param {Cipher} cipher The cipher algorithm to use.
       * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
       * @param {WordArray} key The key.
       * @param {Object} cfg (Optional) The configuration options to use for this operation.
       *
       * @return {WordArray} The plaintext.
       *
       * @static
       *
       * @example
       *
       *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
       *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
       */
      decrypt: function decrypt(cipher, ciphertext, key, cfg) {
        // Apply config defaults
        cfg = this.cfg.extend(cfg);

        // Convert string to CipherParams
        ciphertext = this._parse(ciphertext, cfg.format);

        // Decrypt
        var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
        return plaintext;
      },
      /**
       * Converts serialized ciphertext to CipherParams,
       * else assumed CipherParams already and returns ciphertext unchanged.
       *
       * @param {CipherParams|string} ciphertext The ciphertext.
       * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
       *
       * @return {CipherParams} The unserialized ciphertext.
       *
       * @static
       *
       * @example
       *
       *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
       */
      _parse: function _parse(ciphertext, format) {
        if (typeof ciphertext == 'string') {
          return format.parse(ciphertext, this);
        } else {
          return ciphertext;
        }
      }
    });

    /**
     * Key derivation function namespace.
     */
    var C_kdf = C.kdf = {};

    /**
     * OpenSSL key derivation function.
     */
    var OpenSSLKdf = C_kdf.OpenSSL = {
      /**
       * Derives a key and IV from a password.
       *
       * @param {string} password The password to derive from.
       * @param {number} keySize The size in words of the key to generate.
       * @param {number} ivSize The size in words of the IV to generate.
       * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
       *
       * @return {CipherParams} A cipher params object with the key, IV, and salt.
       *
       * @static
       *
       * @example
       *
       *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
       *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
       */
      execute: function execute(password, keySize, ivSize, salt) {
        // Generate random salt
        if (!salt) {
          salt = WordArray.random(64 / 8);
        }

        // Derive key and IV
        var key = EvpKDF.create({
          keySize: keySize + ivSize
        }).compute(password, salt);

        // Separate key and IV
        var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
        key.sigBytes = keySize * 4;

        // Return params
        return CipherParams.create({
          key: key,
          iv: iv,
          salt: salt
        });
      }
    };

    /**
     * A serializable cipher wrapper that derives the key from a password,
     * and returns ciphertext as a serializable cipher params object.
     */
    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
      /**
       * Configuration options.
       *
       * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
       */
      cfg: SerializableCipher.cfg.extend({
        kdf: OpenSSLKdf
      }),
      /**
       * Encrypts a message using a password.
       *
       * @param {Cipher} cipher The cipher algorithm to use.
       * @param {WordArray|string} message The message to encrypt.
       * @param {string} password The password.
       * @param {Object} cfg (Optional) The configuration options to use for this operation.
       *
       * @return {CipherParams} A cipher params object.
       *
       * @static
       *
       * @example
       *
       *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
       *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
       */
      encrypt: function encrypt(cipher, message, password, cfg) {
        // Apply config defaults
        cfg = this.cfg.extend(cfg);

        // Derive key and other params
        var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

        // Add IV to config
        cfg.iv = derivedParams.iv;

        // Encrypt
        var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

        // Mix in derived params
        ciphertext.mixIn(derivedParams);
        return ciphertext;
      },
      /**
       * Decrypts serialized ciphertext using a password.
       *
       * @param {Cipher} cipher The cipher algorithm to use.
       * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
       * @param {string} password The password.
       * @param {Object} cfg (Optional) The configuration options to use for this operation.
       *
       * @return {WordArray} The plaintext.
       *
       * @static
       *
       * @example
       *
       *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
       *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
       */
      decrypt: function decrypt(cipher, ciphertext, password, cfg) {
        // Apply config defaults
        cfg = this.cfg.extend(cfg);

        // Convert string to CipherParams
        ciphertext = this._parse(ciphertext, cfg.format);

        // Derive key and other params
        var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);

        // Add IV to config
        cfg.iv = derivedParams.iv;

        // Decrypt
        var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
        return plaintext;
      }
    });
  }();
});

/***/ }),
/* 57 */
/*!************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/mode-cfb.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./cipher-core */ 56));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./cipher-core */ 56)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  /**
   * Cipher Feedback block mode.
   */
  CryptoJS.mode.CFB = function () {
    var CFB = CryptoJS.lib.BlockCipherMode.extend();
    CFB.Encryptor = CFB.extend({
      processBlock: function processBlock(words, offset) {
        // Shortcuts
        var cipher = this._cipher;
        var blockSize = cipher.blockSize;
        generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

        // Remember this block to use with next block
        this._prevBlock = words.slice(offset, offset + blockSize);
      }
    });
    CFB.Decryptor = CFB.extend({
      processBlock: function processBlock(words, offset) {
        // Shortcuts
        var cipher = this._cipher;
        var blockSize = cipher.blockSize;

        // Remember this block to use with next block
        var thisBlock = words.slice(offset, offset + blockSize);
        generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

        // This block becomes the previous block
        this._prevBlock = thisBlock;
      }
    });
    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
      var keystream;

      // Shortcut
      var iv = this._iv;

      // Generate keystream
      if (iv) {
        keystream = iv.slice(0);

        // Remove IV for subsequent blocks
        this._iv = undefined;
      } else {
        keystream = this._prevBlock;
      }
      cipher.encryptBlock(keystream, 0);

      // Encrypt
      for (var i = 0; i < blockSize; i++) {
        words[offset + i] ^= keystream[i];
      }
    }
    return CFB;
  }();
  return CryptoJS.mode.CFB;
});

/***/ }),
/* 58 */
/*!************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/mode-ctr.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./cipher-core */ 56));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./cipher-core */ 56)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  /**
   * Counter block mode.
   */
  CryptoJS.mode.CTR = function () {
    var CTR = CryptoJS.lib.BlockCipherMode.extend();
    var Encryptor = CTR.Encryptor = CTR.extend({
      processBlock: function processBlock(words, offset) {
        // Shortcuts
        var cipher = this._cipher;
        var blockSize = cipher.blockSize;
        var iv = this._iv;
        var counter = this._counter;

        // Generate keystream
        if (iv) {
          counter = this._counter = iv.slice(0);

          // Remove IV for subsequent blocks
          this._iv = undefined;
        }
        var keystream = counter.slice(0);
        cipher.encryptBlock(keystream, 0);

        // Increment counter
        counter[blockSize - 1] = counter[blockSize - 1] + 1 | 0;

        // Encrypt
        for (var i = 0; i < blockSize; i++) {
          words[offset + i] ^= keystream[i];
        }
      }
    });
    CTR.Decryptor = Encryptor;
    return CTR;
  }();
  return CryptoJS.mode.CTR;
});

/***/ }),
/* 59 */
/*!********************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/mode-ctr-gladman.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./cipher-core */ 56));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./cipher-core */ 56)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  /** @preserve
   * Counter block mode compatible with  Dr Brian Gladman fileenc.c
   * derived from CryptoJS.mode.CTR
   * Jan Hruby jhruby.web@gmail.com
   */
  CryptoJS.mode.CTRGladman = function () {
    var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();
    function incWord(word) {
      if ((word >> 24 & 0xff) === 0xff) {
        //overflow
        var b1 = word >> 16 & 0xff;
        var b2 = word >> 8 & 0xff;
        var b3 = word & 0xff;
        if (b1 === 0xff)
          // overflow b1
          {
            b1 = 0;
            if (b2 === 0xff) {
              b2 = 0;
              if (b3 === 0xff) {
                b3 = 0;
              } else {
                ++b3;
              }
            } else {
              ++b2;
            }
          } else {
          ++b1;
        }
        word = 0;
        word += b1 << 16;
        word += b2 << 8;
        word += b3;
      } else {
        word += 0x01 << 24;
      }
      return word;
    }
    function incCounter(counter) {
      if ((counter[0] = incWord(counter[0])) === 0) {
        // encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
        counter[1] = incWord(counter[1]);
      }
      return counter;
    }
    var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
      processBlock: function processBlock(words, offset) {
        // Shortcuts
        var cipher = this._cipher;
        var blockSize = cipher.blockSize;
        var iv = this._iv;
        var counter = this._counter;

        // Generate keystream
        if (iv) {
          counter = this._counter = iv.slice(0);

          // Remove IV for subsequent blocks
          this._iv = undefined;
        }
        incCounter(counter);
        var keystream = counter.slice(0);
        cipher.encryptBlock(keystream, 0);

        // Encrypt
        for (var i = 0; i < blockSize; i++) {
          words[offset + i] ^= keystream[i];
        }
      }
    });
    CTRGladman.Decryptor = Encryptor;
    return CTRGladman;
  }();
  return CryptoJS.mode.CTRGladman;
});

/***/ }),
/* 60 */
/*!************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/mode-ofb.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./cipher-core */ 56));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./cipher-core */ 56)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  /**
   * Output Feedback block mode.
   */
  CryptoJS.mode.OFB = function () {
    var OFB = CryptoJS.lib.BlockCipherMode.extend();
    var Encryptor = OFB.Encryptor = OFB.extend({
      processBlock: function processBlock(words, offset) {
        // Shortcuts
        var cipher = this._cipher;
        var blockSize = cipher.blockSize;
        var iv = this._iv;
        var keystream = this._keystream;

        // Generate keystream
        if (iv) {
          keystream = this._keystream = iv.slice(0);

          // Remove IV for subsequent blocks
          this._iv = undefined;
        }
        cipher.encryptBlock(keystream, 0);

        // Encrypt
        for (var i = 0; i < blockSize; i++) {
          words[offset + i] ^= keystream[i];
        }
      }
    });
    OFB.Decryptor = Encryptor;
    return OFB;
  }();
  return CryptoJS.mode.OFB;
});

/***/ }),
/* 61 */
/*!************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/mode-ecb.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./cipher-core */ 56));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./cipher-core */ 56)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  /**
   * Electronic Codebook block mode.
   */
  CryptoJS.mode.ECB = function () {
    var ECB = CryptoJS.lib.BlockCipherMode.extend();
    ECB.Encryptor = ECB.extend({
      processBlock: function processBlock(words, offset) {
        this._cipher.encryptBlock(words, offset);
      }
    });
    ECB.Decryptor = ECB.extend({
      processBlock: function processBlock(words, offset) {
        this._cipher.decryptBlock(words, offset);
      }
    });
    return ECB;
  }();
  return CryptoJS.mode.ECB;
});

/***/ }),
/* 62 */
/*!****************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/pad-ansix923.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./cipher-core */ 56));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./cipher-core */ 56)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  /**
   * ANSI X.923 padding strategy.
   */
  CryptoJS.pad.AnsiX923 = {
    pad: function pad(data, blockSize) {
      // Shortcuts
      var dataSigBytes = data.sigBytes;
      var blockSizeBytes = blockSize * 4;

      // Count padding bytes
      var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;

      // Compute last byte position
      var lastBytePos = dataSigBytes + nPaddingBytes - 1;

      // Pad
      data.clamp();
      data.words[lastBytePos >>> 2] |= nPaddingBytes << 24 - lastBytePos % 4 * 8;
      data.sigBytes += nPaddingBytes;
    },
    unpad: function unpad(data) {
      // Get number of padding bytes from last byte
      var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 0xff;

      // Remove padding
      data.sigBytes -= nPaddingBytes;
    }
  };
  return CryptoJS.pad.Ansix923;
});

/***/ }),
/* 63 */
/*!****************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/pad-iso10126.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./cipher-core */ 56));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./cipher-core */ 56)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  /**
   * ISO 10126 padding strategy.
   */
  CryptoJS.pad.Iso10126 = {
    pad: function pad(data, blockSize) {
      // Shortcut
      var blockSizeBytes = blockSize * 4;

      // Count padding bytes
      var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

      // Pad
      data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
    },
    unpad: function unpad(data) {
      // Get number of padding bytes from last byte
      var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 0xff;

      // Remove padding
      data.sigBytes -= nPaddingBytes;
    }
  };
  return CryptoJS.pad.Iso10126;
});

/***/ }),
/* 64 */
/*!****************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/pad-iso97971.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./cipher-core */ 56));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./cipher-core */ 56)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  /**
   * ISO/IEC 9797-1 Padding Method 2.
   */
  CryptoJS.pad.Iso97971 = {
    pad: function pad(data, blockSize) {
      // Add 0x80 byte
      data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));

      // Zero pad the rest
      CryptoJS.pad.ZeroPadding.pad(data, blockSize);
    },
    unpad: function unpad(data) {
      // Remove zero padding
      CryptoJS.pad.ZeroPadding.unpad(data);

      // Remove one more byte -- the 0x80 byte
      data.sigBytes--;
    }
  };
  return CryptoJS.pad.Iso97971;
});

/***/ }),
/* 65 */
/*!*******************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/pad-zeropadding.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./cipher-core */ 56));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./cipher-core */ 56)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  /**
   * Zero padding strategy.
   */
  CryptoJS.pad.ZeroPadding = {
    pad: function pad(data, blockSize) {
      // Shortcut
      var blockSizeBytes = blockSize * 4;

      // Pad
      data.clamp();
      data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
    },
    unpad: function unpad(data) {
      // Shortcut
      var dataWords = data.words;

      // Unpad
      var i = data.sigBytes - 1;
      for (var i = data.sigBytes - 1; i >= 0; i--) {
        if (dataWords[i >>> 2] >>> 24 - i % 4 * 8 & 0xff) {
          data.sigBytes = i + 1;
          break;
        }
      }
    }
  };
  return CryptoJS.pad.ZeroPadding;
});

/***/ }),
/* 66 */
/*!*****************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/pad-nopadding.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./cipher-core */ 56));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./cipher-core */ 56)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  /**
   * A noop padding strategy.
   */
  CryptoJS.pad.NoPadding = {
    pad: function pad() {},
    unpad: function unpad() {}
  };
  return CryptoJS.pad.NoPadding;
});

/***/ }),
/* 67 */
/*!**************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/format-hex.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./cipher-core */ 56));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./cipher-core */ 56)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  (function (undefined) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var CipherParams = C_lib.CipherParams;
    var C_enc = C.enc;
    var Hex = C_enc.Hex;
    var C_format = C.format;
    var HexFormatter = C_format.Hex = {
      /**
       * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
       *
       * @param {CipherParams} cipherParams The cipher params object.
       *
       * @return {string} The hexadecimally encoded string.
       *
       * @static
       *
       * @example
       *
       *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
       */
      stringify: function stringify(cipherParams) {
        return cipherParams.ciphertext.toString(Hex);
      },
      /**
       * Converts a hexadecimally encoded ciphertext string to a cipher params object.
       *
       * @param {string} input The hexadecimally encoded string.
       *
       * @return {CipherParams} The cipher params object.
       *
       * @static
       *
       * @example
       *
       *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
       */
      parse: function parse(input) {
        var ciphertext = Hex.parse(input);
        return CipherParams.create({
          ciphertext: ciphertext
        });
      }
    };
  })();
  return CryptoJS.format.Hex;
});

/***/ }),
/* 68 */
/*!*******************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/aes.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./enc-base64 */ 43), __webpack_require__(/*! ./md5 */ 45), __webpack_require__(/*! ./evpkdf */ 55), __webpack_require__(/*! ./cipher-core */ 56));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./enc-base64 */ 43), __webpack_require__(/*! ./md5 */ 45), __webpack_require__(/*! ./evpkdf */ 55), __webpack_require__(/*! ./cipher-core */ 56)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var BlockCipher = C_lib.BlockCipher;
    var C_algo = C.algo;

    // Lookup tables
    var SBOX = [];
    var INV_SBOX = [];
    var SUB_MIX_0 = [];
    var SUB_MIX_1 = [];
    var SUB_MIX_2 = [];
    var SUB_MIX_3 = [];
    var INV_SUB_MIX_0 = [];
    var INV_SUB_MIX_1 = [];
    var INV_SUB_MIX_2 = [];
    var INV_SUB_MIX_3 = [];

    // Compute lookup tables
    (function () {
      // Compute double table
      var d = [];
      for (var i = 0; i < 256; i++) {
        if (i < 128) {
          d[i] = i << 1;
        } else {
          d[i] = i << 1 ^ 0x11b;
        }
      }

      // Walk GF(2^8)
      var x = 0;
      var xi = 0;
      for (var i = 0; i < 256; i++) {
        // Compute sbox
        var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
        sx = sx >>> 8 ^ sx & 0xff ^ 0x63;
        SBOX[x] = sx;
        INV_SBOX[sx] = x;

        // Compute multiplication
        var x2 = d[x];
        var x4 = d[x2];
        var x8 = d[x4];

        // Compute sub bytes, mix columns tables
        var t = d[sx] * 0x101 ^ sx * 0x1010100;
        SUB_MIX_0[x] = t << 24 | t >>> 8;
        SUB_MIX_1[x] = t << 16 | t >>> 16;
        SUB_MIX_2[x] = t << 8 | t >>> 24;
        SUB_MIX_3[x] = t;

        // Compute inv sub bytes, inv mix columns tables
        var t = x8 * 0x1010101 ^ x4 * 0x10001 ^ x2 * 0x101 ^ x * 0x1010100;
        INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
        INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
        INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
        INV_SUB_MIX_3[sx] = t;

        // Compute next counter
        if (!x) {
          x = xi = 1;
        } else {
          x = x2 ^ d[d[d[x8 ^ x2]]];
          xi ^= d[d[xi]];
        }
      }
    })();

    // Precomputed Rcon lookup
    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

    /**
     * AES block cipher algorithm.
     */
    var AES = C_algo.AES = BlockCipher.extend({
      _doReset: function _doReset() {
        var t;

        // Skip reset of nRounds has been set before and key did not change
        if (this._nRounds && this._keyPriorReset === this._key) {
          return;
        }

        // Shortcuts
        var key = this._keyPriorReset = this._key;
        var keyWords = key.words;
        var keySize = key.sigBytes / 4;

        // Compute number of rounds
        var nRounds = this._nRounds = keySize + 6;

        // Compute number of key schedule rows
        var ksRows = (nRounds + 1) * 4;

        // Compute key schedule
        var keySchedule = this._keySchedule = [];
        for (var ksRow = 0; ksRow < ksRows; ksRow++) {
          if (ksRow < keySize) {
            keySchedule[ksRow] = keyWords[ksRow];
          } else {
            t = keySchedule[ksRow - 1];
            if (!(ksRow % keySize)) {
              // Rot word
              t = t << 8 | t >>> 24;

              // Sub word
              t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 0xff] << 16 | SBOX[t >>> 8 & 0xff] << 8 | SBOX[t & 0xff];

              // Mix Rcon
              t ^= RCON[ksRow / keySize | 0] << 24;
            } else if (keySize > 6 && ksRow % keySize == 4) {
              // Sub word
              t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 0xff] << 16 | SBOX[t >>> 8 & 0xff] << 8 | SBOX[t & 0xff];
            }
            keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
          }
        }

        // Compute inv key schedule
        var invKeySchedule = this._invKeySchedule = [];
        for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
          var ksRow = ksRows - invKsRow;
          if (invKsRow % 4) {
            var t = keySchedule[ksRow];
          } else {
            var t = keySchedule[ksRow - 4];
          }
          if (invKsRow < 4 || ksRow <= 4) {
            invKeySchedule[invKsRow] = t;
          } else {
            invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 0xff]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
          }
        }
      },
      encryptBlock: function encryptBlock(M, offset) {
        this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
      },
      decryptBlock: function decryptBlock(M, offset) {
        // Swap 2nd and 4th rows
        var t = M[offset + 1];
        M[offset + 1] = M[offset + 3];
        M[offset + 3] = t;
        this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

        // Inv swap 2nd and 4th rows
        var t = M[offset + 1];
        M[offset + 1] = M[offset + 3];
        M[offset + 3] = t;
      },
      _doCryptBlock: function _doCryptBlock(M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
        // Shortcut
        var nRounds = this._nRounds;

        // Get input, add round key
        var s0 = M[offset] ^ keySchedule[0];
        var s1 = M[offset + 1] ^ keySchedule[1];
        var s2 = M[offset + 2] ^ keySchedule[2];
        var s3 = M[offset + 3] ^ keySchedule[3];

        // Key schedule row counter
        var ksRow = 4;

        // Rounds
        for (var round = 1; round < nRounds; round++) {
          // Shift rows, sub bytes, mix columns, add round key
          var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[s1 >>> 16 & 0xff] ^ SUB_MIX_2[s2 >>> 8 & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
          var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[s2 >>> 16 & 0xff] ^ SUB_MIX_2[s3 >>> 8 & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
          var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[s3 >>> 16 & 0xff] ^ SUB_MIX_2[s0 >>> 8 & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
          var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[s0 >>> 16 & 0xff] ^ SUB_MIX_2[s1 >>> 8 & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

          // Update state
          s0 = t0;
          s1 = t1;
          s2 = t2;
          s3 = t3;
        }

        // Shift rows, sub bytes, add round key
        var t0 = (SBOX[s0 >>> 24] << 24 | SBOX[s1 >>> 16 & 0xff] << 16 | SBOX[s2 >>> 8 & 0xff] << 8 | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
        var t1 = (SBOX[s1 >>> 24] << 24 | SBOX[s2 >>> 16 & 0xff] << 16 | SBOX[s3 >>> 8 & 0xff] << 8 | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
        var t2 = (SBOX[s2 >>> 24] << 24 | SBOX[s3 >>> 16 & 0xff] << 16 | SBOX[s0 >>> 8 & 0xff] << 8 | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
        var t3 = (SBOX[s3 >>> 24] << 24 | SBOX[s0 >>> 16 & 0xff] << 16 | SBOX[s1 >>> 8 & 0xff] << 8 | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

        // Set output
        M[offset] = t0;
        M[offset + 1] = t1;
        M[offset + 2] = t2;
        M[offset + 3] = t3;
      },
      keySize: 256 / 32
    });

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
     */
    C.AES = BlockCipher._createHelper(AES);
  })();
  return CryptoJS.AES;
});

/***/ }),
/* 69 */
/*!*************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/tripledes.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./enc-base64 */ 43), __webpack_require__(/*! ./md5 */ 45), __webpack_require__(/*! ./evpkdf */ 55), __webpack_require__(/*! ./cipher-core */ 56));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./enc-base64 */ 43), __webpack_require__(/*! ./md5 */ 45), __webpack_require__(/*! ./evpkdf */ 55), __webpack_require__(/*! ./cipher-core */ 56)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var BlockCipher = C_lib.BlockCipher;
    var C_algo = C.algo;

    // Permuted Choice 1 constants
    var PC1 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];

    // Permuted Choice 2 constants
    var PC2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];

    // Cumulative bit shift constants
    var BIT_SHIFTS = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];

    // SBOXes and round permutation constants
    var SBOX_P = [{
      0x0: 0x808200,
      0x10000000: 0x8000,
      0x20000000: 0x808002,
      0x30000000: 0x2,
      0x40000000: 0x200,
      0x50000000: 0x808202,
      0x60000000: 0x800202,
      0x70000000: 0x800000,
      0x80000000: 0x202,
      0x90000000: 0x800200,
      0xa0000000: 0x8200,
      0xb0000000: 0x808000,
      0xc0000000: 0x8002,
      0xd0000000: 0x800002,
      0xe0000000: 0x0,
      0xf0000000: 0x8202,
      0x8000000: 0x0,
      0x18000000: 0x808202,
      0x28000000: 0x8202,
      0x38000000: 0x8000,
      0x48000000: 0x808200,
      0x58000000: 0x200,
      0x68000000: 0x808002,
      0x78000000: 0x2,
      0x88000000: 0x800200,
      0x98000000: 0x8200,
      0xa8000000: 0x808000,
      0xb8000000: 0x800202,
      0xc8000000: 0x800002,
      0xd8000000: 0x8002,
      0xe8000000: 0x202,
      0xf8000000: 0x800000,
      0x1: 0x8000,
      0x10000001: 0x2,
      0x20000001: 0x808200,
      0x30000001: 0x800000,
      0x40000001: 0x808002,
      0x50000001: 0x8200,
      0x60000001: 0x200,
      0x70000001: 0x800202,
      0x80000001: 0x808202,
      0x90000001: 0x808000,
      0xa0000001: 0x800002,
      0xb0000001: 0x8202,
      0xc0000001: 0x202,
      0xd0000001: 0x800200,
      0xe0000001: 0x8002,
      0xf0000001: 0x0,
      0x8000001: 0x808202,
      0x18000001: 0x808000,
      0x28000001: 0x800000,
      0x38000001: 0x200,
      0x48000001: 0x8000,
      0x58000001: 0x800002,
      0x68000001: 0x2,
      0x78000001: 0x8202,
      0x88000001: 0x8002,
      0x98000001: 0x800202,
      0xa8000001: 0x202,
      0xb8000001: 0x808200,
      0xc8000001: 0x800200,
      0xd8000001: 0x0,
      0xe8000001: 0x8200,
      0xf8000001: 0x808002
    }, {
      0x0: 0x40084010,
      0x1000000: 0x4000,
      0x2000000: 0x80000,
      0x3000000: 0x40080010,
      0x4000000: 0x40000010,
      0x5000000: 0x40084000,
      0x6000000: 0x40004000,
      0x7000000: 0x10,
      0x8000000: 0x84000,
      0x9000000: 0x40004010,
      0xa000000: 0x40000000,
      0xb000000: 0x84010,
      0xc000000: 0x80010,
      0xd000000: 0x0,
      0xe000000: 0x4010,
      0xf000000: 0x40080000,
      0x800000: 0x40004000,
      0x1800000: 0x84010,
      0x2800000: 0x10,
      0x3800000: 0x40004010,
      0x4800000: 0x40084010,
      0x5800000: 0x40000000,
      0x6800000: 0x80000,
      0x7800000: 0x40080010,
      0x8800000: 0x80010,
      0x9800000: 0x0,
      0xa800000: 0x4000,
      0xb800000: 0x40080000,
      0xc800000: 0x40000010,
      0xd800000: 0x84000,
      0xe800000: 0x40084000,
      0xf800000: 0x4010,
      0x10000000: 0x0,
      0x11000000: 0x40080010,
      0x12000000: 0x40004010,
      0x13000000: 0x40084000,
      0x14000000: 0x40080000,
      0x15000000: 0x10,
      0x16000000: 0x84010,
      0x17000000: 0x4000,
      0x18000000: 0x4010,
      0x19000000: 0x80000,
      0x1a000000: 0x80010,
      0x1b000000: 0x40000010,
      0x1c000000: 0x84000,
      0x1d000000: 0x40004000,
      0x1e000000: 0x40000000,
      0x1f000000: 0x40084010,
      0x10800000: 0x84010,
      0x11800000: 0x80000,
      0x12800000: 0x40080000,
      0x13800000: 0x4000,
      0x14800000: 0x40004000,
      0x15800000: 0x40084010,
      0x16800000: 0x10,
      0x17800000: 0x40000000,
      0x18800000: 0x40084000,
      0x19800000: 0x40000010,
      0x1a800000: 0x40004010,
      0x1b800000: 0x80010,
      0x1c800000: 0x0,
      0x1d800000: 0x4010,
      0x1e800000: 0x40080010,
      0x1f800000: 0x84000
    }, {
      0x0: 0x104,
      0x100000: 0x0,
      0x200000: 0x4000100,
      0x300000: 0x10104,
      0x400000: 0x10004,
      0x500000: 0x4000004,
      0x600000: 0x4010104,
      0x700000: 0x4010000,
      0x800000: 0x4000000,
      0x900000: 0x4010100,
      0xa00000: 0x10100,
      0xb00000: 0x4010004,
      0xc00000: 0x4000104,
      0xd00000: 0x10000,
      0xe00000: 0x4,
      0xf00000: 0x100,
      0x80000: 0x4010100,
      0x180000: 0x4010004,
      0x280000: 0x0,
      0x380000: 0x4000100,
      0x480000: 0x4000004,
      0x580000: 0x10000,
      0x680000: 0x10004,
      0x780000: 0x104,
      0x880000: 0x4,
      0x980000: 0x100,
      0xa80000: 0x4010000,
      0xb80000: 0x10104,
      0xc80000: 0x10100,
      0xd80000: 0x4000104,
      0xe80000: 0x4010104,
      0xf80000: 0x4000000,
      0x1000000: 0x4010100,
      0x1100000: 0x10004,
      0x1200000: 0x10000,
      0x1300000: 0x4000100,
      0x1400000: 0x100,
      0x1500000: 0x4010104,
      0x1600000: 0x4000004,
      0x1700000: 0x0,
      0x1800000: 0x4000104,
      0x1900000: 0x4000000,
      0x1a00000: 0x4,
      0x1b00000: 0x10100,
      0x1c00000: 0x4010000,
      0x1d00000: 0x104,
      0x1e00000: 0x10104,
      0x1f00000: 0x4010004,
      0x1080000: 0x4000000,
      0x1180000: 0x104,
      0x1280000: 0x4010100,
      0x1380000: 0x0,
      0x1480000: 0x10004,
      0x1580000: 0x4000100,
      0x1680000: 0x100,
      0x1780000: 0x4010004,
      0x1880000: 0x10000,
      0x1980000: 0x4010104,
      0x1a80000: 0x10104,
      0x1b80000: 0x4000004,
      0x1c80000: 0x4000104,
      0x1d80000: 0x4010000,
      0x1e80000: 0x4,
      0x1f80000: 0x10100
    }, {
      0x0: 0x80401000,
      0x10000: 0x80001040,
      0x20000: 0x401040,
      0x30000: 0x80400000,
      0x40000: 0x0,
      0x50000: 0x401000,
      0x60000: 0x80000040,
      0x70000: 0x400040,
      0x80000: 0x80000000,
      0x90000: 0x400000,
      0xa0000: 0x40,
      0xb0000: 0x80001000,
      0xc0000: 0x80400040,
      0xd0000: 0x1040,
      0xe0000: 0x1000,
      0xf0000: 0x80401040,
      0x8000: 0x80001040,
      0x18000: 0x40,
      0x28000: 0x80400040,
      0x38000: 0x80001000,
      0x48000: 0x401000,
      0x58000: 0x80401040,
      0x68000: 0x0,
      0x78000: 0x80400000,
      0x88000: 0x1000,
      0x98000: 0x80401000,
      0xa8000: 0x400000,
      0xb8000: 0x1040,
      0xc8000: 0x80000000,
      0xd8000: 0x400040,
      0xe8000: 0x401040,
      0xf8000: 0x80000040,
      0x100000: 0x400040,
      0x110000: 0x401000,
      0x120000: 0x80000040,
      0x130000: 0x0,
      0x140000: 0x1040,
      0x150000: 0x80400040,
      0x160000: 0x80401000,
      0x170000: 0x80001040,
      0x180000: 0x80401040,
      0x190000: 0x80000000,
      0x1a0000: 0x80400000,
      0x1b0000: 0x401040,
      0x1c0000: 0x80001000,
      0x1d0000: 0x400000,
      0x1e0000: 0x40,
      0x1f0000: 0x1000,
      0x108000: 0x80400000,
      0x118000: 0x80401040,
      0x128000: 0x0,
      0x138000: 0x401000,
      0x148000: 0x400040,
      0x158000: 0x80000000,
      0x168000: 0x80001040,
      0x178000: 0x40,
      0x188000: 0x80000040,
      0x198000: 0x1000,
      0x1a8000: 0x80001000,
      0x1b8000: 0x80400040,
      0x1c8000: 0x1040,
      0x1d8000: 0x80401000,
      0x1e8000: 0x400000,
      0x1f8000: 0x401040
    }, {
      0x0: 0x80,
      0x1000: 0x1040000,
      0x2000: 0x40000,
      0x3000: 0x20000000,
      0x4000: 0x20040080,
      0x5000: 0x1000080,
      0x6000: 0x21000080,
      0x7000: 0x40080,
      0x8000: 0x1000000,
      0x9000: 0x20040000,
      0xa000: 0x20000080,
      0xb000: 0x21040080,
      0xc000: 0x21040000,
      0xd000: 0x0,
      0xe000: 0x1040080,
      0xf000: 0x21000000,
      0x800: 0x1040080,
      0x1800: 0x21000080,
      0x2800: 0x80,
      0x3800: 0x1040000,
      0x4800: 0x40000,
      0x5800: 0x20040080,
      0x6800: 0x21040000,
      0x7800: 0x20000000,
      0x8800: 0x20040000,
      0x9800: 0x0,
      0xa800: 0x21040080,
      0xb800: 0x1000080,
      0xc800: 0x20000080,
      0xd800: 0x21000000,
      0xe800: 0x1000000,
      0xf800: 0x40080,
      0x10000: 0x40000,
      0x11000: 0x80,
      0x12000: 0x20000000,
      0x13000: 0x21000080,
      0x14000: 0x1000080,
      0x15000: 0x21040000,
      0x16000: 0x20040080,
      0x17000: 0x1000000,
      0x18000: 0x21040080,
      0x19000: 0x21000000,
      0x1a000: 0x1040000,
      0x1b000: 0x20040000,
      0x1c000: 0x40080,
      0x1d000: 0x20000080,
      0x1e000: 0x0,
      0x1f000: 0x1040080,
      0x10800: 0x21000080,
      0x11800: 0x1000000,
      0x12800: 0x1040000,
      0x13800: 0x20040080,
      0x14800: 0x20000000,
      0x15800: 0x1040080,
      0x16800: 0x80,
      0x17800: 0x21040000,
      0x18800: 0x40080,
      0x19800: 0x21040080,
      0x1a800: 0x0,
      0x1b800: 0x21000000,
      0x1c800: 0x1000080,
      0x1d800: 0x40000,
      0x1e800: 0x20040000,
      0x1f800: 0x20000080
    }, {
      0x0: 0x10000008,
      0x100: 0x2000,
      0x200: 0x10200000,
      0x300: 0x10202008,
      0x400: 0x10002000,
      0x500: 0x200000,
      0x600: 0x200008,
      0x700: 0x10000000,
      0x800: 0x0,
      0x900: 0x10002008,
      0xa00: 0x202000,
      0xb00: 0x8,
      0xc00: 0x10200008,
      0xd00: 0x202008,
      0xe00: 0x2008,
      0xf00: 0x10202000,
      0x80: 0x10200000,
      0x180: 0x10202008,
      0x280: 0x8,
      0x380: 0x200000,
      0x480: 0x202008,
      0x580: 0x10000008,
      0x680: 0x10002000,
      0x780: 0x2008,
      0x880: 0x200008,
      0x980: 0x2000,
      0xa80: 0x10002008,
      0xb80: 0x10200008,
      0xc80: 0x0,
      0xd80: 0x10202000,
      0xe80: 0x202000,
      0xf80: 0x10000000,
      0x1000: 0x10002000,
      0x1100: 0x10200008,
      0x1200: 0x10202008,
      0x1300: 0x2008,
      0x1400: 0x200000,
      0x1500: 0x10000000,
      0x1600: 0x10000008,
      0x1700: 0x202000,
      0x1800: 0x202008,
      0x1900: 0x0,
      0x1a00: 0x8,
      0x1b00: 0x10200000,
      0x1c00: 0x2000,
      0x1d00: 0x10002008,
      0x1e00: 0x10202000,
      0x1f00: 0x200008,
      0x1080: 0x8,
      0x1180: 0x202000,
      0x1280: 0x200000,
      0x1380: 0x10000008,
      0x1480: 0x10002000,
      0x1580: 0x2008,
      0x1680: 0x10202008,
      0x1780: 0x10200000,
      0x1880: 0x10202000,
      0x1980: 0x10200008,
      0x1a80: 0x2000,
      0x1b80: 0x202008,
      0x1c80: 0x200008,
      0x1d80: 0x0,
      0x1e80: 0x10000000,
      0x1f80: 0x10002008
    }, {
      0x0: 0x100000,
      0x10: 0x2000401,
      0x20: 0x400,
      0x30: 0x100401,
      0x40: 0x2100401,
      0x50: 0x0,
      0x60: 0x1,
      0x70: 0x2100001,
      0x80: 0x2000400,
      0x90: 0x100001,
      0xa0: 0x2000001,
      0xb0: 0x2100400,
      0xc0: 0x2100000,
      0xd0: 0x401,
      0xe0: 0x100400,
      0xf0: 0x2000000,
      0x8: 0x2100001,
      0x18: 0x0,
      0x28: 0x2000401,
      0x38: 0x2100400,
      0x48: 0x100000,
      0x58: 0x2000001,
      0x68: 0x2000000,
      0x78: 0x401,
      0x88: 0x100401,
      0x98: 0x2000400,
      0xa8: 0x2100000,
      0xb8: 0x100001,
      0xc8: 0x400,
      0xd8: 0x2100401,
      0xe8: 0x1,
      0xf8: 0x100400,
      0x100: 0x2000000,
      0x110: 0x100000,
      0x120: 0x2000401,
      0x130: 0x2100001,
      0x140: 0x100001,
      0x150: 0x2000400,
      0x160: 0x2100400,
      0x170: 0x100401,
      0x180: 0x401,
      0x190: 0x2100401,
      0x1a0: 0x100400,
      0x1b0: 0x1,
      0x1c0: 0x0,
      0x1d0: 0x2100000,
      0x1e0: 0x2000001,
      0x1f0: 0x400,
      0x108: 0x100400,
      0x118: 0x2000401,
      0x128: 0x2100001,
      0x138: 0x1,
      0x148: 0x2000000,
      0x158: 0x100000,
      0x168: 0x401,
      0x178: 0x2100400,
      0x188: 0x2000001,
      0x198: 0x2100000,
      0x1a8: 0x0,
      0x1b8: 0x2100401,
      0x1c8: 0x100401,
      0x1d8: 0x400,
      0x1e8: 0x2000400,
      0x1f8: 0x100001
    }, {
      0x0: 0x8000820,
      0x1: 0x20000,
      0x2: 0x8000000,
      0x3: 0x20,
      0x4: 0x20020,
      0x5: 0x8020820,
      0x6: 0x8020800,
      0x7: 0x800,
      0x8: 0x8020000,
      0x9: 0x8000800,
      0xa: 0x20800,
      0xb: 0x8020020,
      0xc: 0x820,
      0xd: 0x0,
      0xe: 0x8000020,
      0xf: 0x20820,
      0x80000000: 0x800,
      0x80000001: 0x8020820,
      0x80000002: 0x8000820,
      0x80000003: 0x8000000,
      0x80000004: 0x8020000,
      0x80000005: 0x20800,
      0x80000006: 0x20820,
      0x80000007: 0x20,
      0x80000008: 0x8000020,
      0x80000009: 0x820,
      0x8000000a: 0x20020,
      0x8000000b: 0x8020800,
      0x8000000c: 0x0,
      0x8000000d: 0x8020020,
      0x8000000e: 0x8000800,
      0x8000000f: 0x20000,
      0x10: 0x20820,
      0x11: 0x8020800,
      0x12: 0x20,
      0x13: 0x800,
      0x14: 0x8000800,
      0x15: 0x8000020,
      0x16: 0x8020020,
      0x17: 0x20000,
      0x18: 0x0,
      0x19: 0x20020,
      0x1a: 0x8020000,
      0x1b: 0x8000820,
      0x1c: 0x8020820,
      0x1d: 0x20800,
      0x1e: 0x820,
      0x1f: 0x8000000,
      0x80000010: 0x20000,
      0x80000011: 0x800,
      0x80000012: 0x8020020,
      0x80000013: 0x20820,
      0x80000014: 0x20,
      0x80000015: 0x8020000,
      0x80000016: 0x8000000,
      0x80000017: 0x8000820,
      0x80000018: 0x8020820,
      0x80000019: 0x8000020,
      0x8000001a: 0x8000800,
      0x8000001b: 0x0,
      0x8000001c: 0x20800,
      0x8000001d: 0x820,
      0x8000001e: 0x20020,
      0x8000001f: 0x8020800
    }];

    // Masks that select the SBOX input
    var SBOX_MASK = [0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000, 0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f];

    /**
     * DES block cipher algorithm.
     */
    var DES = C_algo.DES = BlockCipher.extend({
      _doReset: function _doReset() {
        // Shortcuts
        var key = this._key;
        var keyWords = key.words;

        // Select 56 bits according to PC1
        var keyBits = [];
        for (var i = 0; i < 56; i++) {
          var keyBitPos = PC1[i] - 1;
          keyBits[i] = keyWords[keyBitPos >>> 5] >>> 31 - keyBitPos % 32 & 1;
        }

        // Assemble 16 subkeys
        var subKeys = this._subKeys = [];
        for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
          // Create subkey
          var subKey = subKeys[nSubKey] = [];

          // Shortcut
          var bitShift = BIT_SHIFTS[nSubKey];

          // Select 48 bits according to PC2
          for (var i = 0; i < 24; i++) {
            // Select from the left 28 key bits
            subKey[i / 6 | 0] |= keyBits[(PC2[i] - 1 + bitShift) % 28] << 31 - i % 6;

            // Select from the right 28 key bits
            subKey[4 + (i / 6 | 0)] |= keyBits[28 + (PC2[i + 24] - 1 + bitShift) % 28] << 31 - i % 6;
          }

          // Since each subkey is applied to an expanded 32-bit input,
          // the subkey can be broken into 8 values scaled to 32-bits,
          // which allows the key to be used without expansion
          subKey[0] = subKey[0] << 1 | subKey[0] >>> 31;
          for (var i = 1; i < 7; i++) {
            subKey[i] = subKey[i] >>> (i - 1) * 4 + 3;
          }
          subKey[7] = subKey[7] << 5 | subKey[7] >>> 27;
        }

        // Compute inverse subkeys
        var invSubKeys = this._invSubKeys = [];
        for (var i = 0; i < 16; i++) {
          invSubKeys[i] = subKeys[15 - i];
        }
      },
      encryptBlock: function encryptBlock(M, offset) {
        this._doCryptBlock(M, offset, this._subKeys);
      },
      decryptBlock: function decryptBlock(M, offset) {
        this._doCryptBlock(M, offset, this._invSubKeys);
      },
      _doCryptBlock: function _doCryptBlock(M, offset, subKeys) {
        // Get input
        this._lBlock = M[offset];
        this._rBlock = M[offset + 1];

        // Initial permutation
        exchangeLR.call(this, 4, 0x0f0f0f0f);
        exchangeLR.call(this, 16, 0x0000ffff);
        exchangeRL.call(this, 2, 0x33333333);
        exchangeRL.call(this, 8, 0x00ff00ff);
        exchangeLR.call(this, 1, 0x55555555);

        // Rounds
        for (var round = 0; round < 16; round++) {
          // Shortcuts
          var subKey = subKeys[round];
          var lBlock = this._lBlock;
          var rBlock = this._rBlock;

          // Feistel function
          var f = 0;
          for (var i = 0; i < 8; i++) {
            f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
          }
          this._lBlock = rBlock;
          this._rBlock = lBlock ^ f;
        }

        // Undo swap from last round
        var t = this._lBlock;
        this._lBlock = this._rBlock;
        this._rBlock = t;

        // Final permutation
        exchangeLR.call(this, 1, 0x55555555);
        exchangeRL.call(this, 8, 0x00ff00ff);
        exchangeRL.call(this, 2, 0x33333333);
        exchangeLR.call(this, 16, 0x0000ffff);
        exchangeLR.call(this, 4, 0x0f0f0f0f);

        // Set output
        M[offset] = this._lBlock;
        M[offset + 1] = this._rBlock;
      },
      keySize: 64 / 32,
      ivSize: 64 / 32,
      blockSize: 64 / 32
    });

    // Swap bits across the left and right words
    function exchangeLR(offset, mask) {
      var t = (this._lBlock >>> offset ^ this._rBlock) & mask;
      this._rBlock ^= t;
      this._lBlock ^= t << offset;
    }
    function exchangeRL(offset, mask) {
      var t = (this._rBlock >>> offset ^ this._lBlock) & mask;
      this._lBlock ^= t;
      this._rBlock ^= t << offset;
    }

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
     */
    C.DES = BlockCipher._createHelper(DES);

    /**
     * Triple-DES block cipher algorithm.
     */
    var TripleDES = C_algo.TripleDES = BlockCipher.extend({
      _doReset: function _doReset() {
        // Shortcuts
        var key = this._key;
        var keyWords = key.words;
        // Make sure the key length is valid (64, 128 or >= 192 bit)
        if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {
          throw new Error('Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.');
        }

        // Extend the key according to the keying options defined in 3DES standard
        var key1 = keyWords.slice(0, 2);
        var key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
        var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);

        // Create DES instances
        this._des1 = DES.createEncryptor(WordArray.create(key1));
        this._des2 = DES.createEncryptor(WordArray.create(key2));
        this._des3 = DES.createEncryptor(WordArray.create(key3));
      },
      encryptBlock: function encryptBlock(M, offset) {
        this._des1.encryptBlock(M, offset);
        this._des2.decryptBlock(M, offset);
        this._des3.encryptBlock(M, offset);
      },
      decryptBlock: function decryptBlock(M, offset) {
        this._des3.decryptBlock(M, offset);
        this._des2.encryptBlock(M, offset);
        this._des1.decryptBlock(M, offset);
      },
      keySize: 192 / 32,
      ivSize: 64 / 32,
      blockSize: 64 / 32
    });

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
     */
    C.TripleDES = BlockCipher._createHelper(TripleDES);
  })();
  return CryptoJS.TripleDES;
});

/***/ }),
/* 70 */
/*!*******************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/rc4.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./enc-base64 */ 43), __webpack_require__(/*! ./md5 */ 45), __webpack_require__(/*! ./evpkdf */ 55), __webpack_require__(/*! ./cipher-core */ 56));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./enc-base64 */ 43), __webpack_require__(/*! ./md5 */ 45), __webpack_require__(/*! ./evpkdf */ 55), __webpack_require__(/*! ./cipher-core */ 56)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var StreamCipher = C_lib.StreamCipher;
    var C_algo = C.algo;

    /**
     * RC4 stream cipher algorithm.
     */
    var RC4 = C_algo.RC4 = StreamCipher.extend({
      _doReset: function _doReset() {
        // Shortcuts
        var key = this._key;
        var keyWords = key.words;
        var keySigBytes = key.sigBytes;

        // Init sbox
        var S = this._S = [];
        for (var i = 0; i < 256; i++) {
          S[i] = i;
        }

        // Key setup
        for (var i = 0, j = 0; i < 256; i++) {
          var keyByteIndex = i % keySigBytes;
          var keyByte = keyWords[keyByteIndex >>> 2] >>> 24 - keyByteIndex % 4 * 8 & 0xff;
          j = (j + S[i] + keyByte) % 256;

          // Swap
          var t = S[i];
          S[i] = S[j];
          S[j] = t;
        }

        // Counters
        this._i = this._j = 0;
      },
      _doProcessBlock: function _doProcessBlock(M, offset) {
        M[offset] ^= generateKeystreamWord.call(this);
      },
      keySize: 256 / 32,
      ivSize: 0
    });
    function generateKeystreamWord() {
      // Shortcuts
      var S = this._S;
      var i = this._i;
      var j = this._j;

      // Generate keystream word
      var keystreamWord = 0;
      for (var n = 0; n < 4; n++) {
        i = (i + 1) % 256;
        j = (j + S[i]) % 256;

        // Swap
        var t = S[i];
        S[i] = S[j];
        S[j] = t;
        keystreamWord |= S[(S[i] + S[j]) % 256] << 24 - n * 8;
      }

      // Update counters
      this._i = i;
      this._j = j;
      return keystreamWord;
    }

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
     */
    C.RC4 = StreamCipher._createHelper(RC4);

    /**
     * Modified RC4 stream cipher algorithm.
     */
    var RC4Drop = C_algo.RC4Drop = RC4.extend({
      /**
       * Configuration options.
       *
       * @property {number} drop The number of keystream words to drop. Default 192
       */
      cfg: RC4.cfg.extend({
        drop: 192
      }),
      _doReset: function _doReset() {
        RC4._doReset.call(this);

        // Drop
        for (var i = this.cfg.drop; i > 0; i--) {
          generateKeystreamWord.call(this);
        }
      }
    });

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
     */
    C.RC4Drop = StreamCipher._createHelper(RC4Drop);
  })();
  return CryptoJS.RC4;
});

/***/ }),
/* 71 */
/*!**********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/rabbit.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./enc-base64 */ 43), __webpack_require__(/*! ./md5 */ 45), __webpack_require__(/*! ./evpkdf */ 55), __webpack_require__(/*! ./cipher-core */ 56));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./enc-base64 */ 43), __webpack_require__(/*! ./md5 */ 45), __webpack_require__(/*! ./evpkdf */ 55), __webpack_require__(/*! ./cipher-core */ 56)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var StreamCipher = C_lib.StreamCipher;
    var C_algo = C.algo;

    // Reusable objects
    var S = [];
    var C_ = [];
    var G = [];

    /**
     * Rabbit stream cipher algorithm
     */
    var Rabbit = C_algo.Rabbit = StreamCipher.extend({
      _doReset: function _doReset() {
        // Shortcuts
        var K = this._key.words;
        var iv = this.cfg.iv;

        // Swap endian
        for (var i = 0; i < 4; i++) {
          K[i] = (K[i] << 8 | K[i] >>> 24) & 0x00ff00ff | (K[i] << 24 | K[i] >>> 8) & 0xff00ff00;
        }

        // Generate initial state values
        var X = this._X = [K[0], K[3] << 16 | K[2] >>> 16, K[1], K[0] << 16 | K[3] >>> 16, K[2], K[1] << 16 | K[0] >>> 16, K[3], K[2] << 16 | K[1] >>> 16];

        // Generate initial counter values
        var C = this._C = [K[2] << 16 | K[2] >>> 16, K[0] & 0xffff0000 | K[1] & 0x0000ffff, K[3] << 16 | K[3] >>> 16, K[1] & 0xffff0000 | K[2] & 0x0000ffff, K[0] << 16 | K[0] >>> 16, K[2] & 0xffff0000 | K[3] & 0x0000ffff, K[1] << 16 | K[1] >>> 16, K[3] & 0xffff0000 | K[0] & 0x0000ffff];

        // Carry bit
        this._b = 0;

        // Iterate the system four times
        for (var i = 0; i < 4; i++) {
          nextState.call(this);
        }

        // Modify the counters
        for (var i = 0; i < 8; i++) {
          C[i] ^= X[i + 4 & 7];
        }

        // IV setup
        if (iv) {
          // Shortcuts
          var IV = iv.words;
          var IV_0 = IV[0];
          var IV_1 = IV[1];

          // Generate four subvectors
          var i0 = (IV_0 << 8 | IV_0 >>> 24) & 0x00ff00ff | (IV_0 << 24 | IV_0 >>> 8) & 0xff00ff00;
          var i2 = (IV_1 << 8 | IV_1 >>> 24) & 0x00ff00ff | (IV_1 << 24 | IV_1 >>> 8) & 0xff00ff00;
          var i1 = i0 >>> 16 | i2 & 0xffff0000;
          var i3 = i2 << 16 | i0 & 0x0000ffff;

          // Modify counter values
          C[0] ^= i0;
          C[1] ^= i1;
          C[2] ^= i2;
          C[3] ^= i3;
          C[4] ^= i0;
          C[5] ^= i1;
          C[6] ^= i2;
          C[7] ^= i3;

          // Iterate the system four times
          for (var i = 0; i < 4; i++) {
            nextState.call(this);
          }
        }
      },
      _doProcessBlock: function _doProcessBlock(M, offset) {
        // Shortcut
        var X = this._X;

        // Iterate the system
        nextState.call(this);

        // Generate four keystream words
        S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
        S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
        S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
        S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
        for (var i = 0; i < 4; i++) {
          // Swap endian
          S[i] = (S[i] << 8 | S[i] >>> 24) & 0x00ff00ff | (S[i] << 24 | S[i] >>> 8) & 0xff00ff00;

          // Encrypt
          M[offset + i] ^= S[i];
        }
      },
      blockSize: 128 / 32,
      ivSize: 64 / 32
    });
    function nextState() {
      // Shortcuts
      var X = this._X;
      var C = this._C;

      // Save old counter values
      for (var i = 0; i < 8; i++) {
        C_[i] = C[i];
      }

      // Calculate new counter values
      C[0] = C[0] + 0x4d34d34d + this._b | 0;
      C[1] = C[1] + 0xd34d34d3 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
      C[2] = C[2] + 0x34d34d34 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
      C[3] = C[3] + 0x4d34d34d + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
      C[4] = C[4] + 0xd34d34d3 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
      C[5] = C[5] + 0x34d34d34 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
      C[6] = C[6] + 0x4d34d34d + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
      C[7] = C[7] + 0xd34d34d3 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
      this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;

      // Calculate the g-values
      for (var i = 0; i < 8; i++) {
        var gx = X[i] + C[i];

        // Construct high and low argument for squaring
        var ga = gx & 0xffff;
        var gb = gx >>> 16;

        // Calculate high and low result of squaring
        var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
        var gl = ((gx & 0xffff0000) * gx | 0) + ((gx & 0x0000ffff) * gx | 0);

        // High XOR low
        G[i] = gh ^ gl;
      }

      // Calculate new state values
      X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
      X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
      X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
      X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
      X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
      X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
      X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
      X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
    }

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
     */
    C.Rabbit = StreamCipher._createHelper(Rabbit);
  })();
  return CryptoJS.Rabbit;
});

/***/ }),
/* 72 */
/*!*****************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/crypto-js/rabbit-legacy.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 12);
;
(function (root, factory, undef) {
  if (( false ? undefined : _typeof(exports)) === "object") {
    // CommonJS
    module.exports = exports = factory(__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./enc-base64 */ 43), __webpack_require__(/*! ./md5 */ 45), __webpack_require__(/*! ./evpkdf */ 55), __webpack_require__(/*! ./cipher-core */ 56));
  } else if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./core */ 38), __webpack_require__(/*! ./enc-base64 */ 43), __webpack_require__(/*! ./md5 */ 45), __webpack_require__(/*! ./evpkdf */ 55), __webpack_require__(/*! ./cipher-core */ 56)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (CryptoJS) {
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var StreamCipher = C_lib.StreamCipher;
    var C_algo = C.algo;

    // Reusable objects
    var S = [];
    var C_ = [];
    var G = [];

    /**
     * Rabbit stream cipher algorithm.
     *
     * This is a legacy version that neglected to convert the key to little-endian.
     * This error doesn't affect the cipher's security,
     * but it does affect its compatibility with other implementations.
     */
    var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
      _doReset: function _doReset() {
        // Shortcuts
        var K = this._key.words;
        var iv = this.cfg.iv;

        // Generate initial state values
        var X = this._X = [K[0], K[3] << 16 | K[2] >>> 16, K[1], K[0] << 16 | K[3] >>> 16, K[2], K[1] << 16 | K[0] >>> 16, K[3], K[2] << 16 | K[1] >>> 16];

        // Generate initial counter values
        var C = this._C = [K[2] << 16 | K[2] >>> 16, K[0] & 0xffff0000 | K[1] & 0x0000ffff, K[3] << 16 | K[3] >>> 16, K[1] & 0xffff0000 | K[2] & 0x0000ffff, K[0] << 16 | K[0] >>> 16, K[2] & 0xffff0000 | K[3] & 0x0000ffff, K[1] << 16 | K[1] >>> 16, K[3] & 0xffff0000 | K[0] & 0x0000ffff];

        // Carry bit
        this._b = 0;

        // Iterate the system four times
        for (var i = 0; i < 4; i++) {
          nextState.call(this);
        }

        // Modify the counters
        for (var i = 0; i < 8; i++) {
          C[i] ^= X[i + 4 & 7];
        }

        // IV setup
        if (iv) {
          // Shortcuts
          var IV = iv.words;
          var IV_0 = IV[0];
          var IV_1 = IV[1];

          // Generate four subvectors
          var i0 = (IV_0 << 8 | IV_0 >>> 24) & 0x00ff00ff | (IV_0 << 24 | IV_0 >>> 8) & 0xff00ff00;
          var i2 = (IV_1 << 8 | IV_1 >>> 24) & 0x00ff00ff | (IV_1 << 24 | IV_1 >>> 8) & 0xff00ff00;
          var i1 = i0 >>> 16 | i2 & 0xffff0000;
          var i3 = i2 << 16 | i0 & 0x0000ffff;

          // Modify counter values
          C[0] ^= i0;
          C[1] ^= i1;
          C[2] ^= i2;
          C[3] ^= i3;
          C[4] ^= i0;
          C[5] ^= i1;
          C[6] ^= i2;
          C[7] ^= i3;

          // Iterate the system four times
          for (var i = 0; i < 4; i++) {
            nextState.call(this);
          }
        }
      },
      _doProcessBlock: function _doProcessBlock(M, offset) {
        // Shortcut
        var X = this._X;

        // Iterate the system
        nextState.call(this);

        // Generate four keystream words
        S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
        S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
        S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
        S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
        for (var i = 0; i < 4; i++) {
          // Swap endian
          S[i] = (S[i] << 8 | S[i] >>> 24) & 0x00ff00ff | (S[i] << 24 | S[i] >>> 8) & 0xff00ff00;

          // Encrypt
          M[offset + i] ^= S[i];
        }
      },
      blockSize: 128 / 32,
      ivSize: 64 / 32
    });
    function nextState() {
      // Shortcuts
      var X = this._X;
      var C = this._C;

      // Save old counter values
      for (var i = 0; i < 8; i++) {
        C_[i] = C[i];
      }

      // Calculate new counter values
      C[0] = C[0] + 0x4d34d34d + this._b | 0;
      C[1] = C[1] + 0xd34d34d3 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
      C[2] = C[2] + 0x34d34d34 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
      C[3] = C[3] + 0x4d34d34d + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
      C[4] = C[4] + 0xd34d34d3 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
      C[5] = C[5] + 0x34d34d34 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
      C[6] = C[6] + 0x4d34d34d + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
      C[7] = C[7] + 0xd34d34d3 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
      this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;

      // Calculate the g-values
      for (var i = 0; i < 8; i++) {
        var gx = X[i] + C[i];

        // Construct high and low argument for squaring
        var ga = gx & 0xffff;
        var gb = gx >>> 16;

        // Calculate high and low result of squaring
        var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
        var gl = ((gx & 0xffff0000) * gx | 0) + ((gx & 0x0000ffff) * gx | 0);

        // High XOR low
        G[i] = gh ^ gl;
      }

      // Calculate new state values
      X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
      X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
      X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
      X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
      X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
      X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
      X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
      X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
    }

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
     */
    C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
  })();
  return CryptoJS.RabbitLegacy;
});

/***/ }),
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 78 */
/*!*******************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/index.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 79));
var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 80));
var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 84));
var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 85));
var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 89));
var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 90));
var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 91));
var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 92));
var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 93));
var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 94));
var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 95));
var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 82));
var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 81));
var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 96));
var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 83));
var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 97));
var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 98));
var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 99));
var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 100));
var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 101));
var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 102);
var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 103));
var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 104));
var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 105));
var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 106));
// ????????????mixin

// ??????????????????mixin??????????????????????????????
// import wxshare from './libs/mixin/mpShare.js'
// ??????????????????http????????????????????????

function wranning(str) {
  // ??????????????????????????????,???????????????????????????
  // ?????????????????????????????????????????????,??????hx????????????????????????????????????,??????:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {
    console.warn(str);
  }
}

// ???????????????????????????/store????????????$u.mixin.js????????????uView?????????????????????????????????vuex???state??????
// HX2.6.11??????,??????try???,????????????????????????,????????????????????????
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }

// post????????????????????????get??????url??????

var $u = {
  queryParams: _queryParams.default,
  route: _route.default,
  timeFormat: _timeFormat.default,
  date: _timeFormat.default,
  // ??????date
  timeFrom: _timeFrom.default,
  colorGradient: _colorGradient.default.colorGradient,
  colorToRgba: _colorGradient.default.colorToRgba,
  guid: _guid.default,
  color: _color.default,
  sys: _sys.sys,
  os: _sys.os,
  type2icon: _type2icon.default,
  randomArray: _randomArray.default,
  wranning: wranning,
  get: _request.default.get,
  post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default,
  // uView????????????????????????????????????
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default
};

// $u?????????uni?????????
uni.$u = $u;
var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // ???????????????????????????????????????date???timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // ???????????????????????????????????????????????????
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};
var _default = {
  install: install
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),
/* 79 */
/*!******************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/mixin/mixin.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect?????????$u?????????????????????????????????in(this)?????????????????????????????????????????????????????????
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // ??????????????????
    // ?????????????????????????????????????????????????????????????????????????????????????????????bug(2020-07-21)
    // ???????????????????????????????????????????????????????????????view??????
    $uGetRect: function $uGetRect(selector, all) {
      var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().in(_this)[all ? 'selectAll' : 'select'](selector).boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).exec();
      });
    },
    getParentData: function getParentData() {
      var _this2 = this;
      var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // ?????????created????????????parent??????
      if (!this.parent) this.parent = false;
      // ??????????????????????????????????????????????????????(??????u-radio-group???this)
      // ????????????this???????????????????????????????????????(u-radio???this)???parentData????????????????????????
      // ?????????????????????????????????????????????????????????????????????????????????this.parent.xxx?????????????????????????????????
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // ??????parentData??????????????????parent???????????????????????????parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    },
    // ??????????????????
    preventEvent: function preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    }
  },
  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {
    var _this3 = this;
    // ??????????????????????????????parent???children????????????checkbox???checkbox-group????????????????????????????????????
    // ?????????????????????????????????????????????children??????????????????????????????????????????????????????
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // ???????????????????????????????????????children????????????????????????
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // ????????????????????????
        if (child === _this3) {
          childrenList.splice(index, 1);
        }
      });
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),
/* 80 */
/*!********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/request/index.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 17));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 18));
var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 81));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 83));
var Request = /*#__PURE__*/function () {
  function Request() {
    var _this = this;
    (0, _classCallCheck2.default)(this, Request);
    this.config = {
      baseUrl: '',
      // ??????????????????
      // ??????????????????
      header: {},
      method: 'POST',
      // ?????????json????????????uni.request????????????????????????JSON.parse
      dataType: 'json',
      // ??????????????????????????????5+??????????????????????????????????????????text??????
      responseType: 'text',
      showLoading: true,
      // ????????????????????????loading
      loadingText: '?????????...',
      loadingTime: 800,
      // ??????????????????????????????????????????????????????????????????????????????ms
      timer: null,
      // ?????????
      originalData: false,
      // ?????????????????????????????????????????????????????????????????????
      loadingMask: true // ??????loading???????????????????????????????????????????????????????????????
    };

    // ?????????
    this.interceptor = {
      // ??????????????????
      request: null,
      // ??????????????????
      response: null
    };

    // get??????
    this.get = function (url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this.request({
        method: 'GET',
        url: url,
        header: header,
        data: data
      });
    };

    // post??????
    this.post = function (url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this.request({
        url: url,
        method: 'POST',
        header: header,
        data: data
      });
    };

    // put????????????????????????????????????(HX2.6.15)
    this.put = function (url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data
      });
    };

    // delete?????????????????????????????????????????????(HX2.6.15)
    this.delete = function (url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data
      });
    };
  }
  (0, _createClass2.default)(Request, [{
    key: "setConfig",
    value:
    // ????????????????????????
    function setConfig(customConfig) {
      // ????????????????????????????????????????????????????????????
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // ??????????????????
  }, {
    key: "request",
    value: function request() {
      var _this2 = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // ??????????????????
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // ??????????????????pending????????????Promise???????????????promise???????????????then()??????
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;
      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // ????????????????????????loading(?????????????????????????????????????????????loading)
          uni.hideLoading();
          // ???????????????????????????????????????????????????loading
          clearTimeout(_this2.config.timer);
          _this2.config.timer = null;
          // ???????????????????????????????????????????????????originalData???true????????????????????????(response)??????????????????????????????response.data
          if (_this2.config.originalData) {
            // ???????????????????????????
            if (_this2.interceptor.response && typeof _this2.interceptor.response === 'function') {
              var resInterceptors = _this2.interceptor.response(response);
              // ????????????????????????false????????????????????????????????????this.$u.post???then??????
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // ?????????????????????false??????????????????????????????????????????????????????????????????catch??????
                reject(response);
              }
            } else {
              // ????????????????????????????????????????????????????????????????????????????????????
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this2.interceptor.response && typeof _this2.interceptor.response === 'function') {
                var _resInterceptors = _this2.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // ??????????????????????????????(originalData=false)??????????????????????????????????????????????????????then??????
                resolve(response.data);
              }
            } else {
              // ????????????????????????????????????????????????????????????200???modal????????????
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // ?????????????????????URL??????/??????,????????????,??????/??????????????????uView???test.js????????????url()??????
        options.url = _test.default.url(options.url) ? options.url : _this2.config.baseUrl + (options.url.indexOf('/') == 0 ? options.url : '/' + options.url);

        // ????????????loading
        // ?????????????????????timer?????????????????????????????????????????????????????????????????????????????????????????????id
        // ?????????????????????????????????????????????????????????????????????loading
        if (_this2.config.showLoading && !_this2.config.timer) {
          _this2.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this2.config.loadingText,
              mask: _this2.config.loadingMask
            });
            _this2.config.timer = null;
          }, _this2.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// ????????????reject()??????????????????this.$u.post().then().catch()?????????catct()
      // 	// ???????????????????????????????????????catch()???????????????????????????catch
      // 	return new Promise(()=>{});
      // })
    }
  }]);
  return Request;
}();
var _default = new Request();
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),
/* 81 */
/*!*************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/function/deepMerge.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 82));
// JS??????????????????
function deepMerge() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if ((0, _typeof2.default)(target) !== 'object' || (0, _typeof2.default)(source) !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if ((0, _typeof2.default)(target[prop]) !== 'object') {
        target[prop] = source[prop];
      } else {
        if ((0, _typeof2.default)(source[prop]) !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}
var _default = deepMerge;
exports.default = _default;

/***/ }),
/* 82 */
/*!*************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/function/deepClone.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
// ??????arr????????????????????????????????????bool???
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// ????????????
function deepClone(obj) {
  // ????????????????????????????????????????????????
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if ((0, _typeof2.default)(obj) !== "object" && typeof obj !== 'function') {
    //????????????????????????
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = (0, _typeof2.default)(obj[i]) === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}
var _default = deepClone;
exports.default = _default;

/***/ }),
/* 83 */
/*!********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/function/test.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
/**
 * ????????????????????????
 */
function email(value) {
  return /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(value);
}

/**
 * ??????????????????
 */
function mobile(value) {
  return /^1[3-9]\d{9}$/.test(value);
}

/**
 * ??????URL??????
 */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
 * ??????????????????
 */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
 * ??????ISO?????????????????????
 */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
 * ?????????????????????
 */
function number(value) {
  return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
}

/**
 * ????????????
 */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
 * ?????????????????????
 */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
}

/**
 * ???????????????
 */
function carNo(value) {
  // ???????????????
  var xreg = /^[???????????????????????????????????????????????????????????????????????????????????????????????????A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // ?????????
  var creg = /^[???????????????????????????????????????????????????????????????????????????????????????????????????A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9???????????????]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
 * ??????,?????????2?????????
 */
function amount(value) {
  //????????????????????????????????????
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
 * ??????
 */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
 * ??????????????????
 */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
 * ???????????????????????????
 */
function enOrNum(value) {
  //??????????????????
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
 * ???????????????????????????
 */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
 * ?????????????????????[min, max]
 */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
 * ????????????????????????[min, max]
 */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
 * ??????????????????
 */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
 * ??????????????????
 */
function empty(value) {
  switch ((0, _typeof2.default)(value)) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;
  }
  return false;
}

/**
 * ??????json?????????
 */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if ((0, _typeof2.default)(obj) == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}

/**
 * ????????????
 */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
 * ????????????
 */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * ?????????????????????
 */
function code(value) {
  var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}
var _default = {
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code
};
exports.default = _default;

/***/ }),
/* 84 */
/*!***************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/function/queryParams.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * ?????????url??????
 * @param {*} data,??????
 * @param {*} isPrefix,??????????????????"?"
 */
function queryParams() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';
  var _loop = function _loop(key) {
    var value = data[key];
    // ?????????????????????
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // ?????????????????????????????????
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // ??????: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // ??????: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // ??????: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // ??????: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
      }
    } else {
      _result.push(key + '=' + value);
    }
  };
  for (var key in data) {
    var _ret = _loop(key);
    if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}
var _default = queryParams;
exports.default = _default;

/***/ }),
/* 85 */
/*!*********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/function/route.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 86));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 88));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 17));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 18));
/**
 * ???????????????????????????????????????????????????uni.xxx????????????????????????????????????
 * ??????????????????????????????
 */
var Router = /*#__PURE__*/function () {
  function Router() {
    (0, _classCallCheck2.default)(this, Router);
    // ??????????????????
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1,
      // navigateBack???????????????,???????????????
      params: {},
      // ???????????????
      animationType: 'pop-in',
      // ????????????,??????APP??????
      animationDuration: 300,
      // ????????????????????????,????????????,??????APP??????
      intercept: false // ??????????????????
    };
    // ??????route????????????????????????????????????????????????????????????route???????????????this????????????route???????????????
    // ??????????????????????????????this??????
    this.route = this.route.bind(this);
  }

  // ??????url???????????????"/"?????????????????????????????????????????????
  (0, _createClass2.default)(Router, [{
    key: "addRootPath",
    value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // ??????????????????
  }, {
    key: "mixinParam",
    value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // ???????????????????????????????????????????????????"/","?","="????????????/page/index/index?name=mary"
      // ?????????url??????get??????????????????????????????"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object????????????get???????????????
        query = uni.$u.queryParams(params, false);
        // ????????????get??????,???????????????????????????????????????"&"??????
        return url += "&" + query;
      } else {
        // ?????????????????????????????????url??????????????????query?????????????????????"?/&"???????????????
        query = uni.$u.queryParams(params);
        return url += query;
      }
    }

    // ?????????????????????
  }, {
    key: "route",
    value: function () {
      var _route = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var options,
          params,
          mergeConfig,
          isNext,
          _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // ?????????????????????????????????????????????
                mergeConfig = {};
                if (typeof options === 'string') {
                  // ??????options?????????????????????route(url, params)?????????
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepClone(options, this.config);
                  // ??????????????????mergeConfig??????url???params????????????
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }
                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params????????????????????????
                mergeConfig.params = params;
                // ?????????????????????
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // ????????????????????????????????????
                if (!(typeof uni.$u.routeIntercept === 'function')) {
                  _context.next = 14;
                  break;
                }
                _context.next = 10;
                return new Promise(function (resolve, reject) {
                  uni.$u.routeIntercept(mergeConfig, resolve);
                });
              case 10:
                isNext = _context.sent;
                // ??????isNext???true????????????????????????
                isNext && this.openPage(mergeConfig);
                _context.next = 15;
                break;
              case 14:
                this.openPage(mergeConfig);
              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function route() {
        return _route.apply(this, arguments);
      }
      return route;
    }() // ??????????????????
  }, {
    key: "openPage",
    value: function openPage(config) {
      // ????????????
      var url = config.url,
        type = config.type,
        delta = config.delta,
        animationType = config.animationType,
        animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration
        });
      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url
        });
      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url
        });
      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url
        });
      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta
        });
      }
    }
  }]);
  return Router;
}();
var _default = new Router().route;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),
/* 86 */
/*!************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/@babel/runtime/regenerator/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! @babel/runtime/helpers/regeneratorRuntime */ 87)();
module.exports = runtime;

/***/ }),
/* 87 */
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 12)["default"];
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) {
              if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            }
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) {
      keys.push(key);
    }
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 88 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 89 */
/*!**************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/function/timeFormat.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// padStart ??? polyfill????????????????????????????????????????????????es7???padStart????????????????????????????????????
// ???????????????????????????polyfill???????????????
if (!String.prototype.padStart) {
  // ???????????????????????? fillString ??????ES6 ?????????????????????????????????
  String.prototype.padStart = function (maxLength) {
    var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError('fillString must be String');
    var str = this;
    // ?????? String(str) ????????????????????????????????????????????????????????????????????????????????????
    if (str.length >= maxLength) return String(str);
    var fillLength = maxLength - str.length,
      times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// ?????????????????????????????????:
// yyyy:mm:dd|yyyy:mm|yyyy???mm???dd???|yyyy???mm???dd??? hh???MM??????,??????????????????
function timeFormat() {
  var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // ?????????null,????????????????????????
  if (!dateTime) dateTime = Number(new Date());
  // ??????dateTime?????????10??????13????????????????????????????????????????????????13?????????????????????????????????
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(dateTime);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(),
    // ???
    "m+": (date.getMonth() + 1).toString(),
    // ???
    "d+": date.getDate().toString(),
    // ???
    "h+": date.getHours().toString(),
    // ???
    "M+": date.getMinutes().toString(),
    // ???
    "s+": date.getSeconds().toString() // ???
    // ???????????????????????????????????????????????????????????????????????????
  };

  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    }
    ;
  }
  ;
  return fmt;
}
var _default = timeFormat;
exports.default = _default;

/***/ }),
/* 90 */
/*!************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/function/timeFrom.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 89));
/**
 * ???????????????????????????
 * @param String timestamp ?????????
 * @param String | Boolean format ??????????????????????????????????????????????????????????????????????????????????????????
 * ??????????????????false??????????????????????????????????????????????????????
 */
function timeFrom() {
  var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // ?????????null,????????????????????????
  if (!dateTime) dateTime = Number(new Date());
  // ??????dateTime?????????10??????13????????????????????????????????????????????????13?????????????????????????????????
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var timestamp = +new Date(Number(dateTime));
  var timer = (Number(new Date()) - timestamp) / 1000;
  // ????????????5??????,?????????"??????",??????????????????
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '??????';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '?????????';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '?????????';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '??????';
      break;
    default:
      // ??????format???false???????????????????????????????????????xx??????
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '?????????';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '??????';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }
  }
  return tips;
}
var _default = timeFrom;
exports.default = _default;

/***/ }),
/* 91 */
/*!*****************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/function/colorGradient.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * ?????????????????????????????????
 * @param {string} startColor ???????????????
 * @param {string} endColor ???????????????
 * @param {number} step ?????????????????????
 * */
function colorGradient() {
  var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';
  var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //?????????rgb????????????
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];
  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];
  var sR = (endR - startR) / step; //?????????
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //??????????????????hex??? 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB * i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// ???hex?????????????????????rgb????????????(????????????rgb????????????)
function hexToRgb(sColor) {
  var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //????????????????????????
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {
      return Number(val);
    });
  } else {
    return sColor;
  }
}
;

// ???rgb?????????????????????hex????????????
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // ????????????rgb?????????2???
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}

/**
* JS???????????????????????????rgb???rgba,?????????????????? rgba???255???255???255???0.5????????????
* sHex?????????????????????????????????
* alpha???rgba????????????
*/
function colorToRgba(color) {
  var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  color = rgbToHex(color);
  // ???????????????????????????????????????
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16??????????????????RGB?????? */
  var sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // ????????????????????????
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i3, _i3 + 2)));
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else {
    return sColor;
  }
}
var _default = {
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba
};
exports.default = _default;

/***/ }),
/* 92 */
/*!********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/function/guid.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * ????????????????????????????????????????????????https://www.jianshu.com/p/fdbf293d0a85
 * ????????????????????????uuid???Globally Unique Identifier???,????????? uuid(Universally Unique IDentifier) 
 * ??????????????????????????????,??????????????????????????????,??????v-for???????????????,?????????????????????index???????????????????????????????????????
 * ?????????????????????????????????item????????????????????????"?????????"?????????????????????,?????????????????????????????????????????????
 * v-for?????????,???????????????????????????id??????????????????index
 * @param {Number} len uuid?????????
 * @param {Boolean} firstU ???????????????????????????"u"
 * @param {Number} radix ??????uuid?????????(?????????????????????????????????????????????),2-?????????,8-?????????,10-?????????,16-????????????
 */
function guid() {
  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
  var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;
  if (len) {
    // ????????????uuid??????,????????????????????????,0|x????????????,?????????x????????????,???????????????
    for (var i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix];
    }
  } else {
    var r;
    // rfc4122?????????????????????uuid???,???????????????????????????
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // ?????????????????????,??????u??????,?????????????????????????????????,???guid????????????id??????class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}
var _default = guid;
exports.default = _default;

/***/ }),
/* 93 */
/*!*********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/function/color.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// ?????????????????????????????????????????????????????????????????????????????????css??????
// ????????????????????????????????????????????????????????????????????????(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",
  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",
  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",
  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",
  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",
  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed"
};
var _default = color;
exports.default = _default;

/***/ }),
/* 94 */
/*!*************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/function/type2icon.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * ????????????type???,?????????????????????
 * @param String type ????????????,primary|info|error|warning|success
 * @param String fill ????????????fill?????????????????????  
 */
function type2icon() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';
  var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // ??????????????????,?????????success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // ??????(2019-12-12),info???primary?????????????????????
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';
  }
  // ?????????????????????,??????-fill,???icon????????????,???????????????????????????-fill???
  if (fill) iconName += '-fill';
  return iconName;
}
var _default = type2icon;
exports.default = _default;

/***/ }),
/* 95 */
/*!***************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/function/randomArray.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// ????????????
function randomArray() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // ?????????sort??????,Math.random()??????0<= x < 1????????????,?????????x-0.05??????????????????0
  return array.sort(function () {
    return Math.random() - 0.5;
  });
}
var _default = randomArray;
exports.default = _default;

/***/ }),
/* 96 */
/*!***********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/function/addUnit.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addUnit;
var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 83));
// ????????????????????????rpx???%???px???????????????????????????auto??????????????????????????????rpx????????????
function addUnit() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // ???uView????????????????????????number?????????????????????
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),
/* 97 */
/*!**********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/function/random.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}
var _default = random;
exports.default = _default;

/***/ }),
/* 98 */
/*!********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/function/trim.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function trim(str) {
  var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}
var _default = trim;
exports.default = _default;

/***/ }),
/* 99 */
/*!*********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/function/toast.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function toast(title) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration
  });
}
var _default = toast;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),
/* 100 */
/*!*************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/function/getParent.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getParent;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
// ????????????????????????????????????????????????????????????provide/inject?????????
// this.$parent??????H5????????????????????????????????????????????????H5??????????????????this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // ??????while??????????????????????????????H5???????????????????????????
  while (parent) {
    // ?????????
    if (parent.$options.name !== name) {
      // ???????????????name?????????????????????????????????
      parent = parent.$parent;
    } else {
      var _ret = function () {
        var data = {};
        // ??????keys??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // ??????????????????????????????
          for (var i in keys) {
            // ???????????????????????????????????????????????????????????????
            // ????????????????????????????????????????????????????????????????????????????????????
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // ????????????????????????????????????false?????????????????????????????????????????????????????????????????????
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return {
          v: data
        };
      }();
      if ((0, _typeof2.default)(_ret) === "object") return _ret.v;
    }
  }
  return {};
}

/***/ }),
/* 101 */
/*!***********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/function/$parent.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = $parent;
// ????????????????????????????????????????????????????????????provide/inject?????????
// this.$parent??????H5????????????????????????????????????????????????H5??????????????????this.$parent.$parent.xxx
// ?????????????????????undefined???????????????????????????????????????(??????)???$parent??????undefined??????????????????name
// ???(?????????undefined)???????????????????????????$parent
function $parent() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // ??????while??????????????????????????????H5???????????????????????????
  while (parent) {
    // ?????????
    if (parent.$options && parent.$options.name !== name) {
      // ???????????????name?????????????????????????????????
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),
/* 102 */
/*!*******************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/function/sys.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.os = os;
exports.sys = sys;
function os() {
  return uni.getSystemInfoSync().platform;
}
;
function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),
/* 103 */
/*!************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/function/debounce.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var timeout = null;

/**
 * ??????????????????????????????????????????????????????????????????wait????????????????????????
 * 
 * @param {Function} func ???????????????????????? 
 * @param {Number} wait ???????????????
 * @param {Boolean} immediate ?????????????????? 
 * @return null
 */
function debounce(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // ???????????????
  if (timeout !== null) clearTimeout(timeout);
  // ??????????????????????????????????????????
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // ?????????????????????????????????????????????timeout????????????????????????????????????wait???????????????func????????????
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}
var _default = debounce;
exports.default = _default;

/***/ }),
/* 104 */
/*!************************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/function/throttle.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var timer, flag;
/**
 * ??????????????????????????????????????????????????????
 * 
 * @param {Function} func ???????????????????????? 
 * @param {Number} wait ???????????????
 * @param {Boolean} immediate ??????????????????
 * @return null
 */
function throttle(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // ??????????????????????????????wait????????????????????????
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // ?????????????????????????????????wait???????????????????????????
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }
  }
}
;
var _default = throttle;
exports.default = _default;

/***/ }),
/* 105 */
/*!********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/config/config.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// ??????????????????2022-04-19
var version = '1.8.6';
var _default = {
  v: version,
  version: version,
  // ????????????
  type: ['primary', 'success', 'info', 'error', 'warning']
};
exports.default = _default;

/***/ }),
/* 106 */
/*!********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/uview-ui/libs/config/zIndex.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// uniapp???H5??????API???z-index????????????
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */
var _default = {
  toast: 10090,
  noNetwork: 10080,
  // popup??????popup???actionsheet???keyboard???picker??????
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965
};
exports.default = _default;

/***/ }),
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */
/*!*************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/static/index-img/17.png ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 114 */
/*!*************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/static/index-img/16.png ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 115 */
/*!************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/static/index-img/5.png ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */
/*!**************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/utils/md5.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Namespace for hashing and other cryptographic functions
 * Copyright (c) Andrew Valums
 * Licensed under the MIT license, http://valums.com/mit-license/
 */

var V = V || {};
V.Security = V.Security || {};
(function () {
  // for faster access
  var S = V.Security;

  /**
   * The highest integer value a number can go to without losing precision.
   */
  S.maxExactInt = Math.pow(2, 53);

  /**
   * Converts string from internal UTF-16 to UTF-8
   * and saves it using array of numbers (bytes), 0-255 per cell
   * @param {String} str
   * @return {Array}
   */
  S.toUtf8ByteArr = function (str) {
    var arr = [],
      code;
    for (var i = 0; i < str.length; i++) {
      code = str.charCodeAt(i);

      /*
            Note that charCodeAt will always return a value that is less than 65,536.
            This is because the higher code points are represented by a pair of (lower valued)
            "surrogate" pseudo-characters which are used to comprise the real character.
            Because of this, in order to examine or reproduce the full character for
            individual characters of value 65,536 and above, for such characters,
            it is necessary to retrieve not only charCodeAt(0), but also charCodeAt(1). 
             */
      if (0xD800 <= code && code <= 0xDBFF) {
        // UTF-16 high surrogate 
        var hi = code,
          low = str.charCodeAt(i + 1);
        code = (hi - 0xD800) * 0x400 + (low - 0xDC00) + 0x10000;
        i++;
      }
      if (code <= 127) {
        arr[arr.length] = code;
      } else if (code <= 2047) {
        arr[arr.length] = (code >>> 6) + 0xC0;
        arr[arr.length] = code & 0x3F | 0x80;
      } else if (code <= 65535) {
        arr[arr.length] = (code >>> 12) + 0xE0;
        arr[arr.length] = code >>> 6 & 0x3F | 0x80;
        arr[arr.length] = code & 0x3F | 0x80;
      } else if (code <= 1114111) {
        arr[arr.length] = (code >>> 18) + 0xF0;
        arr[arr.length] = code >>> 12 & 0x3F | 0x80;
        arr[arr.length] = code >>> 6 & 0x3F | 0x80;
        arr[arr.length] = code & 0x3F | 0x80;
      } else {
        throw 'Unicode standart supports code points up-to U+10FFFF';
      }
    }
    return arr;
  };

  /**
   * Outputs 32 integer bits of a number in hex format.
   * Preserves leading zeros.
   * @param {Number} num
   */
  S.toHex32 = function (num) {
    // if negative
    if (num & 0x80000000) {
      // convert to positive number
      num = num & ~0x80000000;
      num += Math.pow(2, 31);
    }
    var str = num.toString(16);
    while (str.length < 8) {
      str = '0' + str;
    }
    return str;
  };

  /**
   * Changes the order of 4 bytes in integer representation of number.
   * From 1234 to 4321. 
   * @param {Number} num Only 32 int bits are used.
   */
  S.reverseBytes = function (num) {
    var res = 0;
    res += num >>> 24 & 0xff;
    res += (num >>> 16 & 0xff) << 8;
    res += (num >>> 8 & 0xff) << 16;
    res += (num & 0xff) << 24;
    return res;
  };
  S.leftRotate = function (x, c) {
    return x << c | x >>> 32 - c;
  };

  /**
   * RSA Data Security, Inc. MD5 Message-Digest Algorithm
   * http://tools.ietf.org/html/rfc1321
   * http://en.wikipedia.org/wiki/MD5
   * @param {String} message
   */
  S.md5 = function (message) {
    // r specifies the per-round shift amounts
    var r = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21];

    // Use binary integer part of the sines of integers (Radians) as constants:
    var k = [];
    for (var i = 0; i <= 63; i++) {
      k[i] = Math.abs(Math.sin(i + 1)) * Math.pow(2, 32) << 0;
    }
    var h0 = 0x67452301,
      h1 = 0xEFCDAB89,
      h2 = 0x98BADCFE,
      h3 = 0x10325476,
      bytes,
      unpadded;

    //Pre-processing: 
    bytes = S.toUtf8ByteArr(message);
    message = null;
    unpadded = bytes.length;

    //append "1" bit to message
    //append "0" bits until message length in bits ??? 448 (mod 512)  
    bytes.push(0x80);
    var zeroBytes = Math.abs(448 - bytes.length * 8 % 512) / 8;
    while (zeroBytes--) {
      bytes.push(0);
    }

    //append bit length of unpadded message as 64-bit little-endian integer to message    
    bytes.push(unpadded * 8 & 0xff, unpadded * 8 >> 8 & 0xff, unpadded * 8 >> 16 & 0xff, unpadded * 8 >> 24 & 0xff);
    var i = 4;
    while (i--) {
      bytes.push(0);
    }
    var leftRotate = S.leftRotate;

    //Process the message in successive 512-bit chunks:
    var i = 0,
      w = [];
    while (i < bytes.length) {
      //break chunk into sixteen 32-bit words w[i], 0 ??? i ??? 15
      for (var j = 0; j <= 15; j++) {
        w[j] = (bytes[i + 4 * j] << 0) + (bytes[i + 4 * j + 1] << 8) + (bytes[i + 4 * j + 2] << 16) + (bytes[i + 4 * j + 3] << 24);
      }

      //Initialize hash value for this chunk:
      var a = h0,
        b = h1,
        c = h2,
        d = h3,
        f,
        g;

      //Main loop:
      for (var j = 0; j <= 63; j++) {
        if (j <= 15) {
          f = b & c | ~b & d;
          g = j;
        } else if (j <= 31) {
          f = d & b | ~d & c;
          g = (5 * j + 1) % 16;
        } else if (j <= 47) {
          f = b ^ c ^ d;
          g = (3 * j + 5) % 16;
        } else {
          f = c ^ (b | ~d);
          g = 7 * j % 16;
        }
        var temp = d;
        d = c;
        c = b;
        b = b + leftRotate(a + f + k[j] + w[g], r[j]);
        a = temp;
      }

      //Add this chunk's hash to result so far:
      h0 = h0 + a << 0;
      h1 = h1 + b << 0;
      h2 = h2 + c << 0;
      h3 = h3 + d << 0;
      i += 512 / 8;
    }

    // fix when starting with 0     
    var res = out(h0) + out(h1) + out(h2) + out(h3);
    function out(h) {
      return S.toHex32(S.reverseBytes(h));
    }
    return res;
  };
})();

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */

function hex_md5(s) {
  return rstr2hex(rstr_md5(str2rstr_utf8(s)));
}
function b64_md5(s) {
  return rstr2b64(rstr_md5(str2rstr_utf8(s)));
}
function any_md5(s, e) {
  return rstr2any(rstr_md5(str2rstr_utf8(s)), e);
}
function hex_hmac_md5(k, d) {
  return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function b64_hmac_md5(k, d) {
  return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function any_hmac_md5(k, d, e) {
  return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e);
}

/*
 * Perform a simple self-test to see if the VM is working
 */

function md5_vm_test() {
  return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of a raw string
 */

function rstr_md5(s) {
  return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

/*
 * Calculate the HMAC-MD5, of a key and some data (raw strings)
 */

function rstr_hmac_md5(key, data) {
  var bkey = rstr2binl(key);
  if (bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);
  var ipad = Array(16),
    opad = Array(16);
  for (var i = 0; i < 16; i++) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }
  var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
  return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
}

/*
 * Convert a raw string to a hex string
 */

function rstr2hex(input) {
  try {
    hexcase;
  } catch (e) {
    hexcase = 0;
  }
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for (var i = 0; i < input.length; i++) {
    x = input.charCodeAt(i);
    output += hex_tab.charAt(x >>> 4 & 0x0F) + hex_tab.charAt(x & 0x0F);
  }
  return output;
}

/*
 * Convert a raw string to a base-64 string
 */

function rstr2b64(input) {
  try {
    b64pad;
  } catch (e) {
    b64pad = '';
  }
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var output = "";
  var len = input.length;
  for (var i = 0; i < len; i += 3) {
    var triplet = input.charCodeAt(i) << 16 | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
    for (var j = 0; j < 4; j++) {
      if (i * 8 + j * 6 > input.length * 8) output += b64pad;else output += tab.charAt(triplet >>> 6 * (3 - j) & 0x3F);
    }
  }
  return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */

function rstr2any(input, encoding) {
  var divisor = encoding.length;
  var i, j, q, x, quotient;

  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  var dividend = Array(Math.ceil(input.length / 2));
  for (i = 0; i < dividend.length; i++) {
    dividend[i] = input.charCodeAt(i * 2) << 8 | input.charCodeAt(i * 2 + 1);
  }

  /*
   * Repeatedly perform a long division. The binary array forms the dividend,
   * the length of the encoding is the divisor. Once computed, the quotient
   * forms the dividend for the next step. All remainders are stored for later
   * use.
   */
  var full_length = Math.ceil(input.length * 8 / (Math.log(encoding.length) / Math.log(2)));
  var remainders = Array(full_length);
  for (j = 0; j < full_length; j++) {
    quotient = Array();
    x = 0;
    for (i = 0; i < dividend.length; i++) {
      x = (x << 16) + dividend[i];
      q = Math.floor(x / divisor);
      x -= q * divisor;
      if (quotient.length > 0 || q > 0) quotient[quotient.length] = q;
    }
    remainders[j] = x;
    dividend = quotient;
  }

  /* Convert the remainders to the output string */
  var output = "";
  for (i = remainders.length - 1; i >= 0; i--) {
    output += encoding.charAt(remainders[i]);
  }
  return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */

function str2rstr_utf8(input) {
  return unescape(encodeURI(input));
}

/*
 * Encode a string as utf-16
 */

function str2rstr_utf16le(input) {
  var output = "";
  for (var i = 0; i < input.length; i++) {
    output += String.fromCharCode(input.charCodeAt(i) & 0xFF, input.charCodeAt(i) >>> 8 & 0xFF);
  }
  return output;
}
function str2rstr_utf16be(input) {
  var output = "";
  for (var i = 0; i < input.length; i++) {
    output += String.fromCharCode(input.charCodeAt(i) >>> 8 & 0xFF, input.charCodeAt(i) & 0xFF);
  }
  return output;
}

/*
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */

function rstr2binl(input) {
  var output = Array(input.length >> 2);
  for (var i = 0; i < output.length; i++) {
    output[i] = 0;
  }
  for (var i = 0; i < input.length * 8; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << i % 32;
  }
  return output;
}

/*
 * Convert an array of little-endian words to a string
 */

function binl2rstr(input) {
  var output = "";
  for (var i = 0; i < input.length * 32; i += 8) {
    output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xFF);
  }
  return output;
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */

function binl_md5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[(len + 64 >>> 9 << 4) + 14] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;
  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */

function md5_cmn(q, a, b, x, s, t) {
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
  return md5_cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
  return md5_cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
  return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */

function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xFFFF;
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */

function bit_rol(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
function md5cycle(x, k) {
  var a = x[0],
    b = x[1],
    c = x[2],
    d = x[3];
  a = ff(a, b, c, d, k[0], 7, -680876936);
  d = ff(d, a, b, c, k[1], 12, -389564586);
  c = ff(c, d, a, b, k[2], 17, 606105819);
  b = ff(b, c, d, a, k[3], 22, -1044525330);
  a = ff(a, b, c, d, k[4], 7, -176418897);
  d = ff(d, a, b, c, k[5], 12, 1200080426);
  c = ff(c, d, a, b, k[6], 17, -1473231341);
  b = ff(b, c, d, a, k[7], 22, -45705983);
  a = ff(a, b, c, d, k[8], 7, 1770035416);
  d = ff(d, a, b, c, k[9], 12, -1958414417);
  c = ff(c, d, a, b, k[10], 17, -42063);
  b = ff(b, c, d, a, k[11], 22, -1990404162);
  a = ff(a, b, c, d, k[12], 7, 1804603682);
  d = ff(d, a, b, c, k[13], 12, -40341101);
  c = ff(c, d, a, b, k[14], 17, -1502002290);
  b = ff(b, c, d, a, k[15], 22, 1236535329);
  a = gg(a, b, c, d, k[1], 5, -165796510);
  d = gg(d, a, b, c, k[6], 9, -1069501632);
  c = gg(c, d, a, b, k[11], 14, 643717713);
  b = gg(b, c, d, a, k[0], 20, -373897302);
  a = gg(a, b, c, d, k[5], 5, -701558691);
  d = gg(d, a, b, c, k[10], 9, 38016083);
  c = gg(c, d, a, b, k[15], 14, -660478335);
  b = gg(b, c, d, a, k[4], 20, -405537848);
  a = gg(a, b, c, d, k[9], 5, 568446438);
  d = gg(d, a, b, c, k[14], 9, -1019803690);
  c = gg(c, d, a, b, k[3], 14, -187363961);
  b = gg(b, c, d, a, k[8], 20, 1163531501);
  a = gg(a, b, c, d, k[13], 5, -1444681467);
  d = gg(d, a, b, c, k[2], 9, -51403784);
  c = gg(c, d, a, b, k[7], 14, 1735328473);
  b = gg(b, c, d, a, k[12], 20, -1926607734);
  a = hh(a, b, c, d, k[5], 4, -378558);
  d = hh(d, a, b, c, k[8], 11, -2022574463);
  c = hh(c, d, a, b, k[11], 16, 1839030562);
  b = hh(b, c, d, a, k[14], 23, -35309556);
  a = hh(a, b, c, d, k[1], 4, -1530992060);
  d = hh(d, a, b, c, k[4], 11, 1272893353);
  c = hh(c, d, a, b, k[7], 16, -155497632);
  b = hh(b, c, d, a, k[10], 23, -1094730640);
  a = hh(a, b, c, d, k[13], 4, 681279174);
  d = hh(d, a, b, c, k[0], 11, -358537222);
  c = hh(c, d, a, b, k[3], 16, -722521979);
  b = hh(b, c, d, a, k[6], 23, 76029189);
  a = hh(a, b, c, d, k[9], 4, -640364487);
  d = hh(d, a, b, c, k[12], 11, -421815835);
  c = hh(c, d, a, b, k[15], 16, 530742520);
  b = hh(b, c, d, a, k[2], 23, -995338651);
  a = ii(a, b, c, d, k[0], 6, -198630844);
  d = ii(d, a, b, c, k[7], 10, 1126891415);
  c = ii(c, d, a, b, k[14], 15, -1416354905);
  b = ii(b, c, d, a, k[5], 21, -57434055);
  a = ii(a, b, c, d, k[12], 6, 1700485571);
  d = ii(d, a, b, c, k[3], 10, -1894986606);
  c = ii(c, d, a, b, k[10], 15, -1051523);
  b = ii(b, c, d, a, k[1], 21, -2054922799);
  a = ii(a, b, c, d, k[8], 6, 1873313359);
  d = ii(d, a, b, c, k[15], 10, -30611744);
  c = ii(c, d, a, b, k[6], 15, -1560198380);
  b = ii(b, c, d, a, k[13], 21, 1309151649);
  a = ii(a, b, c, d, k[4], 6, -145523070);
  d = ii(d, a, b, c, k[11], 10, -1120210379);
  c = ii(c, d, a, b, k[2], 15, 718787259);
  b = ii(b, c, d, a, k[9], 21, -343485551);
  x[0] = add32(a, x[0]);
  x[1] = add32(b, x[1]);
  x[2] = add32(c, x[2]);
  x[3] = add32(d, x[3]);
}
function cmn(q, a, b, x, s, t) {
  a = add32(add32(a, q), add32(x, t));
  return add32(a << s | a >>> 32 - s, b);
}
function ff(a, b, c, d, x, s, t) {
  return cmn(b & c | ~b & d, a, b, x, s, t);
}
function gg(a, b, c, d, x, s, t) {
  return cmn(b & d | c & ~d, a, b, x, s, t);
}
function hh(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | ~d), a, b, x, s, t);
}
function md51(s) {
  var txt = '';
  var n = s.length,
    state = [1732584193, -271733879, -1732584194, 271733878],
    i;
  for (i = 64; i <= s.length; i += 64) {
    md5cycle(state, md5blk(s.substring(i - 64, i)));
  }
  s = s.substring(i - 64);
  var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (i = 0; i < s.length; i++) {
    tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
  }
  tail[i >> 2] |= 0x80 << (i % 4 << 3);
  if (i > 55) {
    md5cycle(state, tail);
    for (i = 0; i < 16; i++) {
      tail[i] = 0;
    }
  }
  tail[14] = n * 8;
  md5cycle(state, tail);
  return state;
}

/* there needs to be support for Unicode here,
 * unless we pretend that we can redefine the MD-5
 * algorithm for multi-byte characters (perhaps
 * by adding every four 16-bit characters and
 * shortening the sum to 32 bits). Otherwise
 * I suggest performing MD-5 as if every character
 * was two bytes--e.g., 0040 0025 = @%--but then
 * how will an ordinary MD-5 sum be matched?
 * There is no way to standardize text to something
 * like UTF-8 before transformation; speed cost is
 * utterly prohibitive. The JavaScript standard
 * itself needs to look at this: it should start
 * providing access to strings as preformed UTF-8
 * 8-bit unsigned value arrays.
 */

function md5blk(s) {
  /* I figured global was faster.   */
  var md5blks = [],
    i; /* Andy King said do it this way. */
  for (i = 0; i < 64; i += 4) {
    md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
  }
  return md5blks;
}
var hex_chr = '0123456789abcdef'.split('');
function rhex(n) {
  var s = '',
    j = 0;
  for (; j < 4; j++) {
    s += hex_chr[n >> j * 8 + 4 & 0x0F] + hex_chr[n >> j * 8 & 0x0F];
  }
  return s;
}
function hex(x) {
  for (var i = 0; i < x.length; i++) {
    x[i] = rhex(x[i]);
  }
  return x.join('');
}
function md5(s) {
  return hex(md51(s));
}

/* this function is much faster,
so if possible we use it. Some IEs
are the only ones I know of that
need the idiotic second function,
generated by an if clause.  */

function add32(a, b) {
  return a + b & 0xFFFFFFFF;
}
if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
  var _add = function _add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF),
      msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xFFFF;
  };
}
(function () {
  function md5cycle(x, k) {
    var a = x[0],
      b = x[1],
      c = x[2],
      d = x[3];
    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22, 1236535329);
    a = gg(a, b, c, d, k[1], 5, -165796510);
    d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713);
    b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335);
    b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);
    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);
    b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473);
    b = gg(b, c, d, a, k[12], 20, -1926607734);
    a = hh(a, b, c, d, k[5], 4, -378558);
    d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562);
    b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);
    b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);
    d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);
    b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);
    d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520);
    b = hh(b, c, d, a, k[2], 23, -995338651);
    a = ii(a, b, c, d, k[0], 6, -198630844);
    d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905);
    b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571);
    d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523);
    b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359);
    d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380);
    b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);
    d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15, 718787259);
    b = ii(b, c, d, a, k[9], 21, -343485551);
    x[0] = add32(a, x[0]);
    x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]);
    x[3] = add32(d, x[3]);
  }
  function cmn(q, a, b, x, s, t) {
    a = add32(add32(a, q), add32(x, t));
    return add32(a << s | a >>> 32 - s, b);
  }
  function ff(a, b, c, d, x, s, t) {
    return cmn(b & c | ~b & d, a, b, x, s, t);
  }
  function gg(a, b, c, d, x, s, t) {
    return cmn(b & d | c & ~d, a, b, x, s, t);
  }
  function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function ii(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  function md51(s) {
    // Converts the string to UTF-8 "bytes" when necessary
    if (s.match(/[\x80-\xFF]/)) {
      s = unescape(encodeURI(s));
    }
    var txt = '';
    var n = s.length,
      state = [1732584193, -271733879, -1732584194, 271733878],
      i;
    for (i = 64; i <= s.length; i += 64) {
      md5cycle(state, md5blk(s.substring(i - 64, i)));
    }
    s = s.substring(i - 64);
    var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i = 0; i < s.length; i++) {
      tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
    }
    tail[i >> 2] |= 0x80 << (i % 4 << 3);
    if (i > 55) {
      md5cycle(state, tail);
      for (i = 0; i < 16; i++) {
        tail[i] = 0;
      }
    }
    tail[14] = n * 8;
    md5cycle(state, tail);
    return state;
  }

  /* there needs to be support for Unicode here,
   * unless we pretend that we can redefine the MD-5
   * algorithm for multi-byte characters (perhaps
   * by adding every four 16-bit characters and
   * shortening the sum to 32 bits). Otherwise
   * I suggest performing MD-5 as if every character
   * was two bytes--e.g., 0040 0025 = @%--but then
   * how will an ordinary MD-5 sum be matched?
   * There is no way to standardize text to something
   * like UTF-8 before transformation; speed cost is
   * utterly prohibitive. The JavaScript standard
   * itself needs to look at this: it should start
   * providing access to strings as preformed UTF-8
   * 8-bit unsigned value arrays.
   */

  function md5blk(s) {
    /* I figured global was faster.   */
    var md5blks = [],
      i; /* Andy King said do it this way. */
    for (i = 0; i < 64; i += 4) {
      md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
    }
    return md5blks;
  }
  var hex_chr = '0123456789abcdef'.split('');
  function rhex(n) {
    var s = '',
      j = 0;
    for (; j < 4; j++) {
      s += hex_chr[n >> j * 8 + 4 & 0x0F] + hex_chr[n >> j * 8 & 0x0F];
    }
    return s;
  }
  function hex(x) {
    for (var i = 0; i < x.length; i++) {
      x[i] = rhex(x[i]);
    }
    return x.join('');
  }
  var md5_utf8 = function md5_utf8(s) {
    return hex(md51(s));
  };

  /* this function is much faster,
    so if possible we use it. Some IEs
    are the only ones I know of that
    need the idiotic second function,
    generated by an if clause.  */

  function add32(a, b) {
    return a + b & 0xFFFFFFFF;
  }
  if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
    var _add2 = function _add2(x, y) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF),
        msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | lsw & 0xFFFF;
    };
  }
})();

/* md5.js - MD5 Message-Digest
 * Copyright (C) 1999,2002 Masanao Izumo <iz@onicos.co.jp>
 * Version: 2.0.0
 * LastModified: May 13 2002
 *
 * This program is free software.  You can redistribute it and/or modify
 * it without any warranty.  This library calculates the MD5 based on RFC1321.
 * See RFC1321 for more information and algorism.
 */

/* Interface:
 * md5_128bits = MD5_hash(data);
 * md5_hexstr = MD5_hexhash(data);
 */

/* ChangeLog
 * 2002/05/13: Version 2.0.0 released
 * NOTICE: API is changed.
 * 2002/04/15: Bug fix about MD5 length.
 */

//    md5_T[i] = parseInt(Math.abs(Math.sin(i)) * 4294967296.0);
var MD5_T = new Array(0x00000000, 0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8, 0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665, 0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391);
var MD5_round1 = new Array(new Array(0, 7, 1), new Array(1, 12, 2), new Array(2, 17, 3), new Array(3, 22, 4), new Array(4, 7, 5), new Array(5, 12, 6), new Array(6, 17, 7), new Array(7, 22, 8), new Array(8, 7, 9), new Array(9, 12, 10), new Array(10, 17, 11), new Array(11, 22, 12), new Array(12, 7, 13), new Array(13, 12, 14), new Array(14, 17, 15), new Array(15, 22, 16));
var MD5_round2 = new Array(new Array(1, 5, 17), new Array(6, 9, 18), new Array(11, 14, 19), new Array(0, 20, 20), new Array(5, 5, 21), new Array(10, 9, 22), new Array(15, 14, 23), new Array(4, 20, 24), new Array(9, 5, 25), new Array(14, 9, 26), new Array(3, 14, 27), new Array(8, 20, 28), new Array(13, 5, 29), new Array(2, 9, 30), new Array(7, 14, 31), new Array(12, 20, 32));
var MD5_round3 = new Array(new Array(5, 4, 33), new Array(8, 11, 34), new Array(11, 16, 35), new Array(14, 23, 36), new Array(1, 4, 37), new Array(4, 11, 38), new Array(7, 16, 39), new Array(10, 23, 40), new Array(13, 4, 41), new Array(0, 11, 42), new Array(3, 16, 43), new Array(6, 23, 44), new Array(9, 4, 45), new Array(12, 11, 46), new Array(15, 16, 47), new Array(2, 23, 48));
var MD5_round4 = new Array(new Array(0, 6, 49), new Array(7, 10, 50), new Array(14, 15, 51), new Array(5, 21, 52), new Array(12, 6, 53), new Array(3, 10, 54), new Array(10, 15, 55), new Array(1, 21, 56), new Array(8, 6, 57), new Array(15, 10, 58), new Array(6, 15, 59), new Array(13, 21, 60), new Array(4, 6, 61), new Array(11, 10, 62), new Array(2, 15, 63), new Array(9, 21, 64));
function MD5_F(x, y, z) {
  return x & y | ~x & z;
}
function MD5_G(x, y, z) {
  return x & z | y & ~z;
}
function MD5_H(x, y, z) {
  return x ^ y ^ z;
}
function MD5_I(x, y, z) {
  return y ^ (x | ~z);
}
var MD5_round = new Array(new Array(MD5_F, MD5_round1), new Array(MD5_G, MD5_round2), new Array(MD5_H, MD5_round3), new Array(MD5_I, MD5_round4));
function MD5_pack(n32) {
  return String.fromCharCode(n32 & 0xff) + String.fromCharCode(n32 >>> 8 & 0xff) + String.fromCharCode(n32 >>> 16 & 0xff) + String.fromCharCode(n32 >>> 24 & 0xff);
}
function MD5_unpack(s4) {
  return s4.charCodeAt(0) | s4.charCodeAt(1) << 8 | s4.charCodeAt(2) << 16 | s4.charCodeAt(3) << 24;
}
function MD5_number(n) {
  while (n < 0) {
    n += 4294967296;
  }
  while (n > 4294967295) {
    n -= 4294967296;
  }
  return n;
}
function MD5_apply_round(x, s, f, abcd, r) {
  var a, b, c, d;
  var kk, ss, ii;
  var t, u;
  a = abcd[0];
  b = abcd[1];
  c = abcd[2];
  d = abcd[3];
  kk = r[0];
  ss = r[1];
  ii = r[2];
  u = f(s[b], s[c], s[d]);
  t = s[a] + u + x[kk] + MD5_T[ii];
  t = MD5_number(t);
  t = t << ss | t >>> 32 - ss;
  t += s[b];
  s[a] = MD5_number(t);
}
function MD5_hash(data) {
  var abcd, x, state, s;
  var len, index, padLen, f, r;
  var i, j, k;
  var tmp;
  state = new Array(0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476);
  len = data.length;
  index = len & 0x3f;
  padLen = index < 56 ? 56 - index : 120 - index;
  if (padLen > 0) {
    data += "\x80";
    for (i = 0; i < padLen - 1; i++) {
      data += "\x00";
    }
  }
  data += MD5_pack(len * 8);
  data += MD5_pack(0);
  len += padLen + 8;
  abcd = new Array(0, 1, 2, 3);
  x = new Array(16);
  s = new Array(4);
  for (k = 0; k < len; k += 64) {
    for (i = 0, j = k; i < 16; i++, j += 4) {
      x[i] = data.charCodeAt(j) | data.charCodeAt(j + 1) << 8 | data.charCodeAt(j + 2) << 16 | data.charCodeAt(j + 3) << 24;
    }
    for (i = 0; i < 4; i++) {
      s[i] = state[i];
    }
    for (i = 0; i < 4; i++) {
      f = MD5_round[i][0];
      r = MD5_round[i][1];
      for (j = 0; j < 16; j++) {
        MD5_apply_round(x, s, f, abcd, r[j]);
        tmp = abcd[0];
        abcd[0] = abcd[3];
        abcd[3] = abcd[2];
        abcd[2] = abcd[1];
        abcd[1] = tmp;
      }
    }
    for (i = 0; i < 4; i++) {
      state[i] += s[i];
      state[i] = MD5_number(state[i]);
    }
  }
  return MD5_pack(state[0]) + MD5_pack(state[1]) + MD5_pack(state[2]) + MD5_pack(state[3]);
}
function MD5_hexhash(data) {
  var i, out, c;
  var bit128;
  bit128 = MD5_hash(data);
  out = "";
  for (i = 0; i < 16; i++) {
    c = bit128.charCodeAt(i);
    out += "0123456789abcdef".charAt(c >> 4 & 0xf);
    out += "0123456789abcdef".charAt(c & 0xf);
  }
  return out;
}
module.exports = {
  hex_md5: hex_md5
};

/***/ }),
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */
/*!***********************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/node_modules/image-tools/index.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.base64ToPath = base64ToPath;
exports.pathToBase64 = pathToBase64;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
function getLocalFilePath(path) {
  if (path.indexOf('_www') === 0 || path.indexOf('_doc') === 0 || path.indexOf('_documents') === 0 || path.indexOf('_downloads') === 0) {
    return path;
  }
  if (path.indexOf('file://') === 0) {
    return path;
  }
  if (path.indexOf('/storage/emulated/0/') === 0) {
    return path;
  }
  if (path.indexOf('/') === 0) {
    var localFilePath = plus.io.convertAbsoluteFileSystem(path);
    if (localFilePath !== path) {
      return localFilePath;
    } else {
      path = path.substr(1);
    }
  }
  return '_www/' + path;
}
function dataUrlToBase64(str) {
  var array = str.split(',');
  return array[array.length - 1];
}
var index = 0;
function getNewFileId() {
  return Date.now() + String(index++);
}
function biggerThan(v1, v2) {
  var v1Array = v1.split('.');
  var v2Array = v2.split('.');
  var update = false;
  for (var index = 0; index < v2Array.length; index++) {
    var diff = v1Array[index] - v2Array[index];
    if (diff !== 0) {
      update = diff > 0;
      break;
    }
  }
  return update;
}
function pathToBase64(path) {
  return new Promise(function (resolve, reject) {
    if ((typeof window === "undefined" ? "undefined" : (0, _typeof2.default)(window)) === 'object' && 'document' in window) {
      if (typeof FileReader === 'function') {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', path, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
          if (this.status === 200) {
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
              resolve(e.target.result);
            };
            fileReader.onerror = reject;
            fileReader.readAsDataURL(this.response);
          }
        };
        xhr.onerror = reject;
        xhr.send();
        return;
      }
      var canvas = document.createElement('canvas');
      var c2x = canvas.getContext('2d');
      var img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        c2x.drawImage(img, 0, 0);
        resolve(canvas.toDataURL());
        canvas.height = canvas.width = 0;
      };
      img.onerror = reject;
      img.src = path;
      return;
    }
    if ((typeof plus === "undefined" ? "undefined" : (0, _typeof2.default)(plus)) === 'object') {
      plus.io.resolveLocalFileSystemURL(getLocalFilePath(path), function (entry) {
        entry.file(function (file) {
          var fileReader = new plus.io.FileReader();
          fileReader.onload = function (data) {
            resolve(data.target.result);
          };
          fileReader.onerror = function (error) {
            reject(error);
          };
          fileReader.readAsDataURL(file);
        }, function (error) {
          reject(error);
        });
      }, function (error) {
        reject(error);
      });
      return;
    }
    if ((typeof wx === "undefined" ? "undefined" : (0, _typeof2.default)(wx)) === 'object' && wx.canIUse('getFileSystemManager')) {
      wx.getFileSystemManager().readFile({
        filePath: path,
        encoding: 'base64',
        success: function success(res) {
          resolve('data:image/png;base64,' + res.data);
        },
        fail: function fail(error) {
          reject(error);
        }
      });
      return;
    }
    reject(new Error('not support'));
  });
}
function base64ToPath(base64) {
  return new Promise(function (resolve, reject) {
    if ((typeof window === "undefined" ? "undefined" : (0, _typeof2.default)(window)) === 'object' && 'document' in window) {
      base64 = base64.split(',');
      var type = base64[0].match(/:(.*?);/)[1];
      var str = atob(base64[1]);
      var n = str.length;
      var array = new Uint8Array(n);
      while (n--) {
        array[n] = str.charCodeAt(n);
      }
      return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], {
        type: type
      })));
    }
    var extName = base64.split(',')[0].match(/data\:\S+\/(\S+);/);
    if (extName) {
      extName = extName[1];
    } else {
      reject(new Error('base64 error'));
    }
    var fileName = getNewFileId() + '.' + extName;
    if ((typeof plus === "undefined" ? "undefined" : (0, _typeof2.default)(plus)) === 'object') {
      var basePath = '_doc';
      var dirPath = 'uniapp_temp';
      var filePath = basePath + '/' + dirPath + '/' + fileName;
      if (!biggerThan(plus.os.name === 'Android' ? '1.9.9.80627' : '1.9.9.80472', plus.runtime.innerVersion)) {
        plus.io.resolveLocalFileSystemURL(basePath, function (entry) {
          entry.getDirectory(dirPath, {
            create: true,
            exclusive: false
          }, function (entry) {
            entry.getFile(fileName, {
              create: true,
              exclusive: false
            }, function (entry) {
              entry.createWriter(function (writer) {
                writer.onwrite = function () {
                  resolve(filePath);
                };
                writer.onerror = reject;
                writer.seek(0);
                writer.writeAsBinary(dataUrlToBase64(base64));
              }, reject);
            }, reject);
          }, reject);
        }, reject);
        return;
      }
      var bitmap = new plus.nativeObj.Bitmap(fileName);
      bitmap.loadBase64Data(base64, function () {
        bitmap.save(filePath, {}, function () {
          bitmap.clear();
          resolve(filePath);
        }, function (error) {
          bitmap.clear();
          reject(error);
        });
      }, function (error) {
        bitmap.clear();
        reject(error);
      });
      return;
    }
    if ((typeof wx === "undefined" ? "undefined" : (0, _typeof2.default)(wx)) === 'object' && wx.canIUse('getFileSystemManager')) {
      var filePath = wx.env.USER_DATA_PATH + '/' + fileName;
      wx.getFileSystemManager().writeFile({
        filePath: filePath,
        data: dataUrlToBase64(base64),
        encoding: 'base64',
        success: function success() {
          resolve(filePath);
        },
        fail: function fail(error) {
          reject(error);
        }
      });
      return;
    }
    reject(new Error('not support'));
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),
/* 136 */
/*!************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/static/index-img/7.png ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 137 */
/*!*************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/static/index-img/24.png ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 138 */
/*!*************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/static/index-img/25.png ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAAFVtJREFUeF7NXAl8VNXVP+feN5lJQhJ2JEEzGQIICFYQkCRofvqJpRUkE/Opn1XQagXaupW24mcr1q1fXYtQFxTFytaYmeBSKy6gySTKVr+2AQSSmQQImxDWZJb37unvviQw82aSeZOw9PkL+Zl3l3P/755zz/mf8x7CWbzshdN7ckFpILC/EJQDnAMXuDXE6LAFuArBEwHrRT38NaWlIQCgsyhKl4fGLvfspOPgvKKrNYTrEfAaABzNFAWA2taPCEINBgCwCQB8AFAPRHsA0Aco9msItYgtjfUVH+89G7IlOuYZBShz7NQUqzVpOSBdC4gpp0DpVCoEkFKQjmAQCPyAEESAIAHsRaCvhWA7gKtfpTYl/b2mpjSY6CK70/6MAZQ7wTlIU+BDRBzdutYzcyGyVgABARkDoYX2IdEeQbgegDYgwm7B8F9SZbkI+AOWYyHfunX+MzN729TdHcw+sfhiZORGxi8moXV3uM77I7bhxQCx9fnKOYmoEQC8BLgfUfhQsD0CaQ+C1qgC1e7yvCfvJ3ydkR3kyC+uIYQRnapU22LMqV3C6wjrcEpl5d8CutoCyB2lAdB6jeEfGipcHrMzdBugnDznI4DweCcTHgGA3QRQA0CMAY4hgB4EoCCgDYCsgKi0boVT/5iVP7F2cvchAmlivca1OxoqVm+JN0C3AHKMLckQNm0zAjiiJpI7RojFKsCCXVXuf4Xfl8c/Ca0XU/kQAsxCxgYTURYCZBHI35jJuNJTh0vaMyKQ/52p3afbNZDiicesqD73ree94x0B1S2AcvKd0xhXVgtNNY5PgPCkVzn8GKxbF3UzljCFhYXK1sNJVmu6JYmHeJKFWZUA18YjwKUgf4hGMKYM1XfAmQJNPkQSf0k5otzW0enYTYCK1iLyQiJhXPNGr8c1Lt727cr9nPxpwwTnWajilYAwmgEOI6BeoKsrJAEIKyAzrbJMsYDQAnO9leXPxZKnWwA58ouDBGQJHxgZB6GGinzV5eVdAaArfcaOHWs5aLMP5SAyiTALgbIIwIHI+hDRhYiUy7glXWjyhI12QRhXQFND031V7tXG+RMGKHPq1BTbYct9hHAHEA4xTihVoK6yLOFxuwJMp30KCxU72BV2/KQ1ZAukKsiuB+LPAEB6B1GN74SFjzq4rvRExAOPK1hhoZLTkt4HFGUCEvyaEPOQIZCIUiv9hBCC/u6rco2JO+55aVDCc/JEDTAYZjT4CKASwCyvx/WGKYCyCp2DklT8ARCNB4BpyHg//TSJtjenxmv1dEW5r8pVdF7Wb2LSzLFT+1osymeM4+jI5nq883q25fDsdWEHS5QqZE9yDmQavgZIExEgg6SPYjJ00O0Pift9lWV/NCHreWlCRPzae375dN1W71wSFLF+ItjMAvzquk2lR9uFi2iQk3/jJCDxPjDMMAtK+Cp1Y+cPfN+3fvXH52X1Jib9265dvTds/OaJtxe8M1MNhpLDuxDAPoXx0TsrSg9GAWTPL5rBkL/VHYdM7iCVxOCGyrI6E7Kelyardmz7kaqGhj/+s6d/HvD704xCWAQftL26dE8EQLmTSkZoQv0CAPt2KrXuqjMgTQsBgnRHeWR7agJVG+79+r3952X1cSZdsvOfF6YAv+fk8RZ8Zu4z9wb8wR6GLi2CweD6CtcpLgqhpITbG7XXEXFmTLXSvU2SQd8JAqokjb9KinqAE/8cgNIjtmgMHf5PAmrF9ppZjCsXeL/19nzz2TfvDgZCKQb5DjCiUbVV7gOndtDQwlv6hkKBHQCgxz6nL92qS2P1rkbwN2C2zxoql0sWEOz5zpsQYCkAWCPbw+qQYLfsri5t+U8CRsryl501uQT8ZkDkno89uX9d+dFNmqZFOLkAuAn97JoII52dV3S1olg+ixFPyUXe7PWM/gBgfoTT48grfpCQIl1zGSMJscSX1HSP2fjrXIE4f+1a5eJB/YsA2CXImPi4dM2odR9+MZ2ECDMRMsaDckhKu8W37q1ThBvaJxXPYsBejiC6WtXqE6/HNTnWInIKnM8C4C8iVLI1en/EW+V+8lwt3Ow8S7du7ZPE6T5AFIrCaPmiVVd+U/3N1ZEKo9Mgr/iqL/1p+IbAnPziXyJjfwgHSBpiQdrvfR73PKMQgyaWJFuYtgoApxpc9iAC3VnncS8zK/i5arfi2y23AWdDgUgjIXDJM2/+YOeWusvbObzTJxY9WOdxvxBhaOyTimczYH+KQZV+5fW4JhoX4fivkgzRrK1FhMsiDDTASYE4vaGy7NNztXAz8+gnl+D3EKJOu4QCAf7a068X7fE1jjT0DwHSXd5K99sRADnynONQsawXmkxNRVyHEIJj6jwfNIT/NXdSST9NqN8AYKbBqDdpAJMaPGU1ZgQ/V21Wba+ZpSEbKI2GnPNY01Hry4+/evvRw0cN8sMJIPiht8r1ZQRAbaeYpB77RQmNMNdb6YowxjIU4YSNMTIXe3v767M3bdoUhbQZMLLziiYyxBEoRLOmaV/Vr3/fa6ZfZ22W76gZiYROeXK1t/tu78HUhfMXzTEe8QRwSCCONzq58izHnHznHwHx55F+kM7cfd7SI3Xa/jV/Ptk+QU5+0bWMW9ZEnXoEW71VrhGJLkpyOYdtF30OyC5DIisByBMziIDP1HnKfpfoeO3tF+zYYe1L6kwgkYmMnSKB9vga0xf8ZuEDnEeFoY29/fV24wPWWznyi5wEuDzSrwFgkphT/UNqq9/b2T6xPa/oDq5YloQDpNMcJN72edwzElnQyMKSHs1BbT0wHG50UmVcR6o6v67K9VgiY7a3fae+ZgQP8tsB6NSRzRij6s+qHa4lq2+PAdBOr8c1xDiXDpC9sNCGod61ABChlzK2AhF6sc5T/sApgCYWvcwUZZbx1NM09fH66vLfJrIYR0HxnUS0GEAPW6IvRGAEv6r1lEmiy/T19r7/T006YZlH1GqY268kq1Vb8aflBRu+2DSZsbAdpPPc2nKfp/zWmADJP2bnOx/myJ6M5nvQ7/WUnYp6c/KdGxDx8nAbJIHUhHZ1vce11vQq5s9nOWv+8RIwnNMZcyBdDk0L5ddXr64yO/bKHdtuJRLDpN8T3iclNVl94eEXi33b67/XnnSU93UeS2gP+gxHvH6vfYDcSVP6CUo9YARI76xq83zV7t/Ltjl5zpN63j2M25XqIDT/xV7Pe9+aXcSA0ZNTU9J6uAHw2niFHfIBkAiYGv+d2q2jOOF0IDIE0gBpGWnBeTMevv/40RP9wn2gNh7rCl9l2dcd7iBd1QqKljBU7ojyiZD+6a10j86dMCWdrOlHjS6BnKCuojQhHjprfFGfJAtukJibBPUwMDHFW1G+vqP2b2zblpbMxY8ZYC+ZRTO2692vj3/21NlPkIgET3/AFv8F3s+iWYiIRQ0umD6W0LIxhtPYghpOC9ngiEVjG6LCEkE7vFWuoSYXqjfrxF3ocBgE2BMCdXxHefYVO78tAtDGAGFUgYAMMfb4GtOen7fgF0YD3VmiIQKgYfnT0oLEPwVk46OyFUC/0wiOcs6fCyfs2/R3qc/jnpkQQAXOIoUprhhBsswqHAaAi6K2u+SiSFRnWw5fGc4by3YrttdMAGQ3tOXio0SRBrry44rBriXlM8INdLxEg1Et0FHg/C0RPBpun9pm24hADYDMaTTQQhXzfNVluo0ye9nzi55mTHko8jTUA94lGsAyhtgeskTI2Hqyap+Cn9/YTkuU+bYMVEM4U0TQL5GSSAP9zkvLCjZ8sfG6KAPdSaIhym7YryiegJw+AQAjHSm3rfSSZQbz1CX1Vw2pzvpql9ssOLqx7+A0FJp6p6/K/WZ2/vQfK9z6eowQqHUagj+nZPG7Fs6ZI/YN6n87AsuOZXfaZZIG+tlfPVvi297wvRgGusNEQ0zDmpPv/AoAJ8Q7XeTkEiAeogge1wxQjoJiMoYrunMIzUPrvvxAEnhgL3DOx9bdHHXJ7HLAf+Ky51Y91580KOxItdo79uyTEfjlrQ89ePLYiQhaWTfQgdBk79duuSmi54n1x+yCG4oUZo1lH2I1PwKqenEiPHRm4dS+ySL5YAz7E/R6XGEspX6yrkDCm2OJnmXPXPzAU/c3BoPxq/JkFP/Ufb+/38hDS5UNiUBWR4a/w6M5J99ZC4iOeOkfAtoiMFjQUPmhTseauex5zpmM8zeN9oeE2OCtcstEpfS3sgFoIaAsBIWI9Iy8LwTB4JGDN9/3u5+5m0+2tBYrdHLt27U37ZUnXp0VzUN3nmjoECD7ROc8pvCnOi+p03nrT5qPnyja/481pwLaeMLm5DkXI8O7jMaeNO0JSuKLWEh9FJDP6iwFJQG66oeTVk+7bermUFCNHaq0CSJjsA1fbMwuf6v8Vk3TksLli5UsDL/fIUB6hlWALHzq3eGCdWsnFnsHKrOhtNR0caIjv3gjAY2NEETP64tqRBiJTEmPV+totdmOz3rk7tcGDLogotgglqwSoL+u/OjSir9VTIt0EvXld5po6BCg3ClTrNqx5GWAWNypmhElxENLRpJaNBmSDIi302Ldl1lwGVv+4OYpKwq+X6Ab83iXdBJXvVqat6licyTHbiLR0Gl44MibXkzIJMccYTjDBFIR6Z66SveSeEK238++wjmGMfgcEDLM9mlvxzkP9R3Y1zt9xg0fDblk6KFgIBAVb3U05tIXlk7e9s32iRE8tIlEQ6cADZpY0tvCNKlmA2NOTNAMIIq8VeVrzC42Z+L08cDwEwCMSDp21F8ew0G//9Dg4Y5teZMnbr3imok+CUw8uxM+XkuzX3ntqcUl+3fvM4ZDcRMNcQNM3eNF/lCsshciOAQi6XLfVyvlKwWmLlO2TY6k10MjBFqa//ij+2dUjRo7fJQl2aoKVcSV2SjI0cNHbK88IXnoY8YHfVIDKmrwxPaBdDHireqigh86FEiu7aAuaD9ZxMW+deWy1Nf05ch3vkCI98e2bfrJ2AxEn1MS/dy91m3ZtnPb/5iRtSMBDjQeTF00f+FPQ0HV6C4cUklM2FVVLsnCmFdcgGSvnDxnKXJ2o7GqDAFq6zyuXNPIhDXMyS9eiAx/qj8jorbXDFSZ/1+mkfrGrqr3N5Q11F0Z9PuvJERLe1aiK3Pt372vx4v/u+AX4TFY2zh7UzK5vaa04/c/TAGUXeCcwxlfRHoRZNulGzh611vlKumK0CBrCNWMsaDxm4GBgwi/YEBl3iy+W7oMq3bU/LcAlnASwCiLPOI9H1fklr/94Y+ieGgTiQZTANnzit5gnN8ZQXO0Ug+Pez2uhHjoeGC28sm2qSS0EUbKNF7fWPctSYpYvfT9MV9+VHFDFM1hItFgCqCcvKIvkfFJ4XaolYem4nrPu66uCB6rz8qtW4eSwq5lCJmCRJfya8ZxJc2x4DcLb9i5pfbySIAk1x0/0WASIGcAUBZpn77k8Rs44R+ye/PplFB3gFq5Y+tkIhqPiJbOaItE50hNSw09+pNHZzd9dzTLSHNoGlxTX1X6eWdjxgVoZElJkn8/C5wJHjpKECJ0+3wZfrVlKgAOj0dZJAqObJ/RKy04Z9q9TxoLFXQe66SaWb/pdDVZrPHjAuS4yjkOBF8fXR4jtns97mFdEVr2+UvtxgzSUsYJxHz9bR8i07Gc2TmlgT5yqMn25L3/91AUD20y0RAXoOx8512cscVGHpo0Ueatct1oVtjwdn/esWUMB7wOO6FIuzKusY8lKUlsqtg4aPmilXcbE4VgMtEQH6A85xzO2aJIgOT7GOorvmr3bLMLeXXjRkt6T+sFSPx6QZCFbeUoZvt3pV0rDy0zqRuieWihmUo0xAUoJ895G3L+tjHVTKSt8Xrc18UT/J0dO9IVCOUCwiVEOIwhaqKzcv14AyZwX/LQzz/0/I1123yXRfHQQnvA53G9GG+4uAA5JhQPQSvfbqRHZbqnruLdDvuvpbVK4/YBk5nCRqEgyQbwM3k6xVuYvN+zT6/AvBkP/+zo4SMRNQetBe/BIt/6+G8kxQVITpSTF33My5w5CvFcbZVrbruwesmJaMnhimWkEDCWIarnard05CQ+cuejc40F44kkGkwB5MgvehlYZEVHm0BqSlrK7a+U/2nT3r0HHKRqgwlpoL5TzsKpZGbXhLeRtUCLn37tnhj10KYTDaYAuqig2KEA1MZ8H54oaB9m//uMuTM/7duvT0vAH2REGibC1yS6cDPt23no1UvLb1VVAw+dQKLBFECSflWPJS9FwJti5cpaXwYi6J/Vv7Z3v14HLnRcuMsx3LEvpUdqkHNGyanJIYuFC2tyssqYzEi0LlGIxLkdM+DINhKg95d9MKZqTdX1RBRG6ut0yqfNx1On7//H6cq5jsY1BZDsnJs/daQGlnUA0OH7HHKHtb85JX9bbRa/xWLx9+jZ45DNZm1J65nelN4z7Xi/zP6HevfvdbzvgL4nB49wNMnSXFUVqMkfLcTOxO6TY73025duOdB4ILJqrLUGfKHX47rXzAdVTAOkG+v8acOQWbfFyzh09DTaCXfOuYqMaYyhJn/37tersUdGjyMDL7xgX+7I3D1DRw09mJaRGpKgSbASVVl5vL/1/FtXbfxy82RjiCHDGQF0Z73Jeu6EAGoHCUCpbH0z6Mx8o+P0rjs9XnJK8vG0nj2+y8zO9PXsk3HUMTx3T0avdL8lSdEsVqtmsymaVFnjw2hpbrZ8sOzDcevXbZocow5RNt/PuDau9svVu8yoa8IAtaubCpbfMMSbQPJCZ+F7He12LVxlFQvXklOsx2zJycdT01OPpPdMP9q7X8+m5FSbH5ki9jbsHdBQ2zCk6WDToBjsISBXAIT6h7pK16/NgCPbdAkgHaQpU6ziuC1bAD7GkLflzltdwe68lGdWcP1YIGmMUcgf+f+aJjpMQevvuZGo9npceYnM0WWAjJPkTJo+XmjscgQaCggjEPASvXqVwKZzSQRWYG3fhDjb3+iIiQA2Ma5eala12oc4YwDFkmnQxOt6c0q1Mw6DQNCFgDAQELIB0E4AOQjQl3GLtdWvPPPf6NBVRN851CQEXl9f/a7pStlzAlAs0MaO/YnlhG2fTWNWm8qBk1B7oQayoiMbCa4khEu4kjSgHbDufNiEcQtoWnANg9DdxndOzKrZWd1BZoUwtsvNnWINZdocGGTjgdP3AMEOBOMQQL4hKAPf0yobfpDqPqD+h2YA+I6AnvZ53K90VY5uGenuTNrVvrLwioeS7BYUFwjB5Dc5BhFSDhLK7xFZAMiHgI0CxEaLGvDs/PqjY12d67ypWHcFNvYfObIk6Wg6cBH0Y6PDFkikDMeMLP8G02y30MLXX0cAAAAASUVORK5CYII="

/***/ }),
/* 139 */
/*!*************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/static/index-img/23.png ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 140 */
/*!*************************************************************************************!*\
  !*** C:/Users/??????/Documents/HBuilderProjects/nianmao-tiktok/static/index-img/50.png ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-toutiao/common/vendor.js.map