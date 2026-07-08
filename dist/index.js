#!/usr/bin/env node

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var value = generator.apply(__this, __arguments);
    function step(arg) {
      try {
        step.next(arg);
      } catch (e) {
        reject(e);
      }
    }
    function result(arg) {
      try {
        step(generator.next(arg));
      } catch (e) {
        reject(e);
      }
    }
    step(result);
  });
};

// node_modules/@actions/core/lib/core.js
var require_core = __commonJS({
  "node_modules/@actions/core/lib/core.js"(exports) {
    var __awaiter = exports.__awaiter || function(thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))((resolve, reject) => {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : new P((resolve2) => {
            resolve2(result.value);
          }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var os = require("os");
    var path = require("path");
    var util = require("util");
    var fs = require("fs");
    function getInput(name, options) {
      const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
      if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
      }
      if (options && options.trimWhitespace === false) {
        return val;
      }
      return val.trim();
    }
    exports.getInput = getInput;
    function setOutput(name, value) {
      process.env[`GITHUB_OUTPUT`] = "";
      const filePath = process.env["GITHUB_OUTPUT"] || "";
      if (filePath) {
        return issueFileCommand("OUTPUT", filePath, { name, value });
      }
      process.stdout.write(`${name}=${value}${os.EOL}`);
    }
    exports.setOutput = setOutput;
    function setFailed(message) {
      process.exitCode = 1;
      error(message);
    }
    exports.setFailed = setFailed;
    function error(message) {
      process.stdout.write(`${message}${os.EOL}`);
    }
    exports.error = error;
    function issueFileCommand(command, filePath, message) {
      return __awaiter(this, void 0, void 0, function* () {
        const delimiter = `ghadelim_${command}`;
        fs.appendFileSync(filePath, `${delimiter}${JSON.stringify(message)}${os.EOL}`);
      });
    }
  }
});

// src/joke.js
var import_request = __toESM(require("request-promise"));
var options = {
  method: "GET",
  uri: "https://icanhazdadjoke.com/",
  headers: {
    Accept: "application/json",
    "User-Agent": "Writing JavaScript action GitHub Skills exercise."
  },
  json: true
};
async function getJoke() {
  const res = await (0, import_request.default)(options);
  return res.joke;
}
var joke_default = getJoke;

// src/main.js
var core = __toESM(require_core());
async function run() {
  const joke = await joke_default();
  console.log(joke);
  core.setOutput("joke", joke);
}
run();
