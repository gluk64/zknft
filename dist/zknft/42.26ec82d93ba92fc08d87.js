(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{f1zE:function(t,e,n){"use strict";n.r(e),n("ls82");var r=n("r3g/");function o(t,e,n,r,o,i,a){try{var c=t[i](a),u=c.value}catch(s){return void n(s)}c.done?e(u):Promise.resolve(u).then(r,o)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(r,i){var a=t.apply(e,n);function c(t){o(a,r,i,c,u,"next",t)}function u(t){o(a,r,i,c,u,"throw",t)}c(void 0)}))}}n("kB5k"),n("/TMw"),n("M39V"),e.default=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.heading,n=t.description,o=t.icon,a=t.html,c=t.button;return function(){var t=i(regeneratorRuntime.mark((function t(i){var u,s,w,l,f,h;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(s=i.appNetworkId,w=i.walletSelect,l=i.exit,f=i.stateSyncStatus,h=i.stateStore,null!==(u=i.network)){t.next=5;break}if(!f.network){t.next=5;break}return t.next=5,new Promise((function(t){f.network&&f.network.then(t),setTimeout((function(){null===u&&t(void 0)}),500)}));case 5:if(h.network.get()==s){t.next=7;break}return t.abrupt("return",{heading:e||"You Must Change Networks",description:n||"We've detected that you need to switch your wallet's network from <b>".concat(Object(r.g)(u),"</b> to <b>").concat(Object(r.g)(s),'</b> for this Dapp. <br><br> <i style="font-size: inherit; font-family: inherit;">*Some wallets may not support changing networks. If you can not change networks in your wallet you may consider switching to a different wallet.</i>'),eventCode:"networkFail",button:c||{onclick:function(){l(),w()},text:"Switch Wallet"},html:a,icon:o||r.b});case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}}}]);