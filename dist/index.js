(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Calc"] = factory();
	else
		root["Calc"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 判断是否为整数，字符整数也返回true
 *
 * @param num
 * @returns
 */
function isInteger(num) {
  return Math.floor(num) === Number(num);
}

/** 
  * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
  * @param num 
  * @returns {object}
  *   {times:100, num: 314}
  */
function toInteger(num) {
  var ret = {
    times: 1, // 小数部分，10的长度次幂
    num: 0 // 数字去掉小数点后的值
  };

  if (isInteger(num)) {
    ret.num = num;
    return ret;
  }

  var snum = num + '';
  var len = snum.split('.')[1].length; // 小数点长度

  ret.times = Math.pow(10, len);
  ret.num = Number(snum.replace('.', ''));

  return ret;
}

/*
  * 核心方法，实现加减乘除运算，确保不丢失精度
  * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
  *
  * @param a {number} 运算数1
  * @param b {number} 运算数2
  * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
  * @param op {string} 运算类型，有加减乘除（add/sub/mul/div）
  *
  */
function core(a, b, digits, op) {
  var o1 = toInteger(a);
  var o2 = toInteger(b);

  var n1 = o1.num;
  var n2 = o2.num;
  var max = Math.max(n1, n2);
  var min = Math.min(n1, n2);

  var t1 = o1.times;
  var t2 = o2.times;
  var maxt = Math.max(t1, t2);
  var mint = Math.min(t1, t2);

  var result = 0;

  switch (op) {
    case 'add':
      // if (t1 === t2) { // 两个小数位数相同
      //   result = n1 + n2
      // } else if (t1 > t2) { // o1 小数位 大于 o2
      //   result = n1 + n2 * (t1 / t2)
      // } else { // o1 小数位 小于 o2
      //   result = n1 * (t2 / t1) + n2
      // }
      // result = result / maxt
      // 等同于:
      result = (min * (maxt / mint) + max) / maxt;
      break;
    case 'sub':
      // if (t1 === t2) {
      //   result = n1 - n2
      // } else if (t1 > t2) {
      //   result = n1 - n2 * (t1 / t2)
      // } else {
      //   result = n1 * (t2 / t1) - n2
      // }
      // result = result / maxt
      // 等同于:
      result = (t1 > t2 ? n1 - n2 * (t1 / t2) : n1 * (t2 / t1) - n2) / maxt;
      break;
    case 'mul':
      result = n1 * n2 / (t1 * t2);
      break;
    case 'div':
      result = n1 / n2 * (t2 / t1);
      break;
  }

  // 小数位数处理
  if (digits) {
    return Number(result).toFixed(digits);
  } else {
    return Number(result);
  }
}

// 加减乘除的四个接口
function add(a, b, digits) {
  return core(a, b, digits, 'add');
}
function sub(a, b, digits) {
  return core(a, b, digits, 'sub');
}
function mul(a, b, digits) {
  return core(a, b, digits, 'mul');
}
function div(a, b, digits) {
  return core(a, b, digits, 'div');
}

exports.add = add;
exports.sub = sub;
exports.mul = mul;
exports.div = div;

/*
测试：
  add(0.1, 0.2)
  add(2.1, 2.2)

  sub(0.24, 0.1)
  sub(2.2, 1.9)

  mul(7, 0.8)
  mul(2.2, 2.2)

  div(2.1, 0.3)
*/

// -----------------toFixed重写---------------------

var oldToFixed = Number.prototype.toFixed;

// 重写toFixed方法
Number.prototype.toFixed = function (len) {
  if (len > 20 || len < 0) {
    // 0 - 20位
    throw new RangeError('toFixed() digits argument must be between 0 and 20');
  }

  // 不是数字 或 数值大于等于1e+21
  if (isNaN(this) || this >= Math.pow(10, 21)) {
    return this.toString();
  }

  if (!len) len = 0;

  if (typeof len == 'string') {
    len = Number(len);
  }

  // len为0
  if (len === 0) {
    // Math.round(-12.5) ---> -12
    // (-12.5).toFixed(0) ---> '-13'
    // return (Math.round(number)).toString(); 

    return oldToFixed.call(this, 0);
  }

  var snum = this.toString(),
      arr = snum.split('.');

  // 整数的情况
  if (arr.length < 2) {
    return padNum(snum, len, arr);
  }

  var intNum = arr[0],
      // 整数部分
  deciNum = arr[1],
      // 小数部分
  nextNum = deciNum.substr(len, 1); // 精度的下一位数字

  //需要截取的长度等于当前长度
  if (deciNum.length == len) {
    return snum;
  }

  //需要截取的长度大于当前长度 1.3.toFixed(2)
  if (deciNum.length < len) {
    return padNum(snum, len, arr);
  }

  //需要截取的长度小于当前长度，需要判断精度的下一位数字 1.335.toFixed(2)
  snum = intNum + '.' + deciNum.substr(0, len);

  if (parseInt(nextNum, 10) >= 5) {
    // 精度的下一位数字大于等于5，要进位
    var times = Math.pow(10, len); //需要放大的倍数
    var changedInt = Number(snum.replace('.', '')); //截取后转为整数
    changedInt++; //整数进位
    changedInt /= times; //整数转为小数，注：有可能还是整数
    // snum = padNum(changedInt + '', len, arr);
    snum = changedInt + '';
  }

  return snum;
};

//对数字末尾加0
function padNum(snum, len, arr) {
  if (arr.length < 2) {
    //整数的情况
    snum += '.';
    snum += new Array(len + 1).join('0'); // new Array(3).join("0") ---> '00'
    return snum;
  } else {
    //小数的情况
    var need = len - arr[1].length;
    snum += new Array(need + 1).join('0');
    return snum;
  }
}

/**
  1.335.toFixed(2)
  
  (-12.5).toFixed(0)
  
  (1).toFixed(2)
 */

/***/ })
/******/ ]);
});