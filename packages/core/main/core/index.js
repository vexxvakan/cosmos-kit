"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  addStateObservers: true,
  removeStateObserver: true,
  updateState: true
};
Object.defineProperty(exports, "addStateObservers", {
  enumerable: true,
  get: function get() {
    return _state.addStateObservers;
  }
});
Object.defineProperty(exports, "removeStateObserver", {
  enumerable: true,
  get: function get() {
    return _state.removeStateObserver;
  }
});
Object.defineProperty(exports, "updateState", {
  enumerable: true,
  get: function get() {
    return _state.updateState;
  }
});

var _api = require("./api");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _api[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _api[key];
    }
  });
});

var _state = require("./state");