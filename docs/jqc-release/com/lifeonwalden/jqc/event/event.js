"use strict";!function(){var c={},r={},f={};function o(n){if("string"!=typeof n||""===n)throw new Error("jqcEvent: 事件名称须为字符串且不能为''");var t=n.split(".");if(2<t.length)throw new Error("jqcEvent: 参数eventName格式错误，参照“eventName”或者“eventName.nameSpace”。");return 1===t.length&&t.push("default"),t}function i(n){if(f[n[1]]&&f[n[1]][n[0]]){var t=[].concat(f[n[1]][n[0]]),e=!1;if(c[n[1]]&&c[n[1]][n[0]]&&(e=!0,t.forEach(function(t){c[n[1]][n[0]].forEach(function(n){n.apply(null,t)})})),r[n[1]]&&r[n[1]][n[0]]){e=!0;var o=[].concat(r[n[1]][n[0]]);delete r[n[1]][n[0]],t.forEach(function(t){o.forEach(function(n){n.apply(null,t)})})}e&&delete f[n[1]][n[0]]}}var n={on:function(n,t){var e=o(n);if("function"!=typeof t)throw new Error("jqcEvent: 方法on回调函数必须为function");c[e[1]]||(c[e[1]]={}),c[e[1]][e[0]]||(c[e[1]][e[0]]=[]),c[e[1]][e[0]].push(t),i(e)},once:function(n,t){var e=o(n);if("function"!=typeof t)throw new Error("jqcEvent: 方法once回调函数必须为function");r[e[1]]||(r[e[1]]={}),r[e[1]][e[0]]||(r[e[1]][e[0]]=[]),r[e[1]][e[0]].push(t),i(e)},emit:function(n){var t=o(n),e=Array.prototype.slice.call(arguments,1);f[t[1]]||(f[t[1]]={}),f[t[1]][t[0]]||(f[t[1]][t[0]]=[]),f[t[1]][t[0]].push(e),i(t)},off:function(n,t){var e=o(n);try{delete c[e[1]][e[0]]}catch(n){}try{delete r[e[1]][e[0]]}catch(n){}t&&t()}};window.jqcEvent=n,"function"==typeof jQuery&&(jQuery.jqcEvent=n)}();