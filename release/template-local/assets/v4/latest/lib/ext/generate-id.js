/*! SWE 4.0.0 2020065T1430 */
!function(t){function e(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var r={};e.m=t,e.c=r,e.i=function(t){return t},e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e){!function(t){"use strict";t.fn.generateId=function(e){var r=1;return e=e?t.trim(e.toLowerCase().replace(/[^a-z0-9_]+/g," ")).replace(/\s+/g,"-"):"id",this.each(function(){var t;if(!this.getAttribute("id")){for(t=e;document.getElementById(t);)t=e+String(r),r++;this.setAttribute("id",t)}})}}(jQuery)}]);