(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{Ej5h:function(r,e,n){"use strict";n.r(e),n.d(e,"generateAddresses",(function(){return o})),n.d(e,"isValidPath",(function(){return s}));var i=n("vUa2"),t=n.n(i),u=n("tnHP"),a=n("tjlA"),c=u.publicToAddress,d=u.toChecksumAddress;function o(r,e){var n=r.publicKey,i=r.chainCode,u=r.path,o=new t.a;o.publicKey=new a.Buffer(n,"hex"),o.chainCode=new a.Buffer(i,"hex");for(var s=[],f=e;f<5+e;f++){var h=o.deriveChild(f),v=c(h.publicKey,!0).toString("hex");s.push({dPath:"".concat(u,"/").concat(f),address:d("0x".concat(v))})}return s}function s(r){var e=r.split("/");if("m"!==e[0])return!1;if("44'"!==e[1])return!1;if("60'"!==e[2]&&"1'"!==e[2])return!1;if(void 0===e[3])return!0;var n=Number(e[3][0]);if(isNaN(n)||n<0||"'"!==e[3][1])return!1;if(void 0===e[4])return!0;var i=Number(e[4][0]);if(isNaN(i)||i<0)return!1;if(void 0===e[5])return!0;var t=Number(e[5][0]);return!(isNaN(t)||t<0)}}}]);