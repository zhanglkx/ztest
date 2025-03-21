/*
Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license/
*/
(function(){
 window.CKEDITOR&&window.CKEDITOR.dom||(window.CKEDITOR||(window.CKEDITOR=function(){
 const c=/(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i, h={timestamp:'O5LA', version:'4.24.0 DEV', revision:'e8e20be47', rnd:Math.floor(900*Math.random())+100, _:{pending:[], basePathSrcPattern:c}, status:'unloaded', basePath:function(){
 let a=window.CKEDITOR_BASEPATH||'';if(!a)for(let g=document.getElementsByTagName('script'), k=0;k<g.length;k++){
 const l=g[k].src.match(c);if(l){
 a=l[1];break; 
} 
}-1==a.indexOf(':/')&&'//'!=a.slice(0,
    2)&&(a=0===a.indexOf('/')?location.href.match(/^.*?:\/\/[^\/]*/)[0]+a:location.href.match(/^[^\?]*\/(?:)/)[0]+a);if(!a)throw'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';return a; 
}(), getUrl:function(a){
 -1==a.indexOf(':/')&&0!==a.indexOf('/')&&(a=this.basePath+a);this.timestamp&&'/'!=a.charAt(a.length-1)&&!/[&?]t=/.test(a)&&(a+=`${0<=a.indexOf('?')?'\x26':'?'}t\x3d${this.timestamp}`);return a; 
},
    domReady:function(){
 function a(){
 try{
 document.addEventListener?(document.removeEventListener('DOMContentLoaded', a, !1), window.removeEventListener('load', a, !1), c()):document.attachEvent&&'complete'===document.readyState&&(document.detachEvent('onreadystatechange', a), window.detachEvent('onload', a), c()); 
}catch(l){} 
}function c(){
 for(var a;a=g.shift();)a(); 
}var g=[];return function(l){
 function b(){
 try{
 document.documentElement.doScroll('left'); 
}catch(e){
 setTimeout(b, 1);return; 
}a(); 
}g.push(l);'complete'===document.readyState&&
    setTimeout(a, 1);if(1==g.length)if(document.addEventListener)document.addEventListener('DOMContentLoaded', a, !1), window.addEventListener('load', a, !1);else if(document.attachEvent){
 document.attachEvent('onreadystatechange', a);window.attachEvent('onload', a);l=!1;try{
 l=!window.frameElement; 
}catch(d){}document.documentElement.doScroll&&l&&b(); 
} 
}; 
}()}, g=window.CKEDITOR_GETURL;if(g){
 const a=h.getUrl;h.getUrl=function(f){
 return g.call(h, f)||a.call(h, f); 
}; 
}return h; 
}()), CKEDITOR.event||(CKEDITOR.event=function(){},
    CKEDITOR.event.implementOn=function(c){
 let h=CKEDITOR.event.prototype, g;for(g in h)null==c[g]&&(c[g]=h[g]); 
}, CKEDITOR.event.prototype=function(){
 function c(a){
 const f=h(this);return f[a]||(f[a]=new g(a)); 
}var h=function(a){
 a=a.getPrivate&&a.getPrivate()||a._||(a._={});return a.events||(a.events={}); 
}, g=function(a){
 this.name=a;this.listeners=[]; 
};g.prototype={getListenerIndex:function(a){
 for(let f=0, c=this.listeners;f<c.length;f++)if(c[f].fn==a)return f;return-1; 
}};return{define:function(a, f){
 const g=c.call(this,
    a);CKEDITOR.tools.extend(g, f, !0); 
}, on:function(a, f, g, k, l){
 function b(e, n, b, l){
 e={name:a, sender:this, editor:e, data:n, listenerData:k, stop:b, cancel:l, removeListener:d};return!1===f.call(g, e)?!1:e.data; 
}function d(){
 n.removeListener(a, f); 
}let e=c.call(this, a);if(0>e.getListenerIndex(f)){
 e=e.listeners;g||(g=this);isNaN(l)&&(l=10);var n=this;b.fn=f;b.priority=l;for(let t=e.length-1;0<=t;t--)if(e[t].priority<=l)return e.splice(t+1, 0, b), {removeListener:d};e.unshift(b); 
}return{removeListener:d}; 
}, once:function(){
 const a=
    Array.prototype.slice.call(arguments), f=a[1];a[1]=function(a){
 a.removeListener();return f.apply(this, arguments); 
};return this.on.apply(this, a); 
}, capture:function(){
 CKEDITOR.event.useCapture=1;const a=this.on.apply(this, arguments);CKEDITOR.event.useCapture=0;return a; 
}, fire:function(){
 let a=0, f=function(){
 a=1; 
}, c=0, g=function(){
 c=1; 
};return function(l, b, d){
 const e=h(this)[l];l=a;const n=c;a=c=0;if(e){
 var t=e.listeners;if(t.length)for(var t=t.slice(0), x, p=0;p<t.length;p++){
 if(e.errorProof)try{
 x=t[p].call(this,
    d, b, f, g); 
}catch(q){}else x=t[p].call(this, d, b, f, g);!1===x?c=1:'undefined'!==typeof x&&(b=x);if(a||c)break; 
} 
}b=c?!1:'undefined'===typeof b?!0:b;a=l;c=n;return b; 
}; 
}(), fireOnce:function(a, f, c){
 f=this.fire(a, f, c);delete h(this)[a];return f; 
}, removeListener:function(a, f){
 const c=h(this)[a];if(c){
 const g=c.getListenerIndex(f);0<=g&&c.listeners.splice(g, 1); 
} 
}, removeAllListeners:function(){
 let a=h(this), f;for(f in a)delete a[f]; 
}, hasListeners:function(a){
 return(a=h(this)[a])&&0<a.listeners.length; 
}}; 
}()), CKEDITOR.editor||
    (CKEDITOR.editor=function(){
 CKEDITOR._.pending.push([this, arguments]);CKEDITOR.event.call(this); 
}, CKEDITOR.editor.prototype.fire=function(c, h){
 c in{instanceReady:1, loaded:1}&&(this[c]=!0);return CKEDITOR.event.prototype.fire.call(this, c, h, this); 
}, CKEDITOR.editor.prototype.fireOnce=function(c, h){
 c in{instanceReady:1, loaded:1}&&(this[c]=!0);return CKEDITOR.event.prototype.fireOnce.call(this, c, h, this); 
}, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype)), CKEDITOR.env||(CKEDITOR.env=function(){
 var c=
    navigator.userAgent.toLowerCase(), h=c.match(/edge[ \/](\d+.?\d*)/), g=-1<c.indexOf('trident/'), g=!(!h&&!g), g={ie:g, edge:!!h, webkit:!g&&-1<c.indexOf(' applewebkit/'), air:-1<c.indexOf(' adobeair/'), mac:-1<c.indexOf('macintosh'), quirks:'BackCompat'==document.compatMode&&(!document.documentMode||10>document.documentMode), mobile:-1<c.indexOf('mobile'), iOS:/(ipad|iphone|ipod)/.test(c), isCustomDomain:function(){
 if(!this.ie)return!1;const a=document.domain, c=window.location.hostname;return a!=c&&a!=`[${c}]`; 
},
    secure:'https:'==location.protocol};g.gecko='Gecko'==navigator.product&&!g.webkit&&!g.ie;g.webkit&&(-1<c.indexOf('chrome')?g.chrome=!0:g.safari=!0);let a=0;g.ie&&(a=h?parseFloat(h[1]):g.quirks||!document.documentMode?parseFloat(c.match(/msie (\d+)/)[1]):document.documentMode, g.ie9Compat=9==a, g.ie8Compat=8==a, g.ie7Compat=7==a, g.ie6Compat=7>a||g.quirks);g.gecko&&(h=c.match(/rv:([\d\.]+)/))&&(h=h[1].split('.'), a=1E4*h[0]+100*(h[1]||0)+1*(h[2]||0));g.air&&(a=parseFloat(c.match(/ adobeair\/(\d+)/)[1]));
    g.webkit&&(a=parseFloat(c.match(/ applewebkit\/(\d+)/)[1]));g.version=a;g.isCompatible=!(g.ie&&7>a)&&!(g.gecko&&4E4>a)&&!(g.webkit&&534>a);g.hidpi=2<=window.devicePixelRatio;g.needsBrFiller=g.gecko||g.webkit||g.ie&&10<a;g.needsNbspFiller=g.ie&&11>a;g.cssClass=`cke_browser_${g.ie?'ie':g.gecko?'gecko':g.webkit?'webkit':'unknown'}`;g.quirks&&(g.cssClass+=' cke_browser_quirks');g.ie&&(g.cssClass+=` cke_browser_ie${g.quirks?'6 cke_browser_iequirks':g.version}`);g.air&&(g.cssClass+=' cke_browser_air');
    g.iOS&&(g.cssClass+=' cke_browser_ios');g.hidpi&&(g.cssClass+=' cke_hidpi');return g; 
}()), 'unloaded'==CKEDITOR.status&&function(){
 CKEDITOR.event.implementOn(CKEDITOR);CKEDITOR.loadFullCore=function(){
 if('basic_ready'!=CKEDITOR.status)CKEDITOR.loadFullCore._load=1;else{
 delete CKEDITOR.loadFullCore;const c=document.createElement('script');c.type='text/javascript';c.src=`${CKEDITOR.basePath}ckeditor.js`;document.getElementsByTagName('head')[0].appendChild(c); 
} 
};CKEDITOR.loadFullCoreTimeout=0;CKEDITOR.add=
    function(c){
 (this._.pending||(this._.pending=[])).push(c); 
};(function(){
 CKEDITOR.domReady(function(){
 const c=CKEDITOR.loadFullCore, h=CKEDITOR.loadFullCoreTimeout;c&&(CKEDITOR.status='basic_ready', c&&c._load?c():h&&setTimeout(function(){
 CKEDITOR.loadFullCore&&CKEDITOR.loadFullCore(); 
}, 1E3*h)); 
}); 
})();CKEDITOR.status='basic_loaded'; 
}(), 'use strict', CKEDITOR.VERBOSITY_WARN=1, CKEDITOR.VERBOSITY_ERROR=2, CKEDITOR.verbosity=CKEDITOR.VERBOSITY_WARN|CKEDITOR.VERBOSITY_ERROR, CKEDITOR.warn=function(c, h){
 CKEDITOR.verbosity&
    CKEDITOR.VERBOSITY_WARN&&CKEDITOR.fire('log', {type:'warn', errorCode:c, additionalData:h}); 
}, CKEDITOR.error=function(c, h){
 CKEDITOR.verbosity&CKEDITOR.VERBOSITY_ERROR&&CKEDITOR.fire('log', {type:'error', errorCode:c, additionalData:h}); 
}, CKEDITOR.on('log', function(c){
 if(window.console&&window.console.log){
 const h=console[c.data.type]?c.data.type:'log', g=c.data.errorCode;if(c=c.data.additionalData)console[h](`[CKEDITOR] Error code: ${g}.`, c);else console[h](`[CKEDITOR] Error code: ${g}.`);console[h](`[CKEDITOR] For more information about this error go to https://ckeditor.com/docs/ckeditor4/latest/guide/dev_errors.html#${
    g}`); 
} 
}, null, null, 999), CKEDITOR.dom={}, function(){
 function c(e, b, a){
 this._minInterval=e;this._context=a;this._lastOutput=this._scheduledTimer=0;this._output=CKEDITOR.tools.bind(b, a||{});const d=this;this.input=function(){
 function e(){
 d._lastOutput=(new Date).getTime();d._scheduledTimer=0;d._call(); 
}if(!d._scheduledTimer||!1!==d._reschedule()){
 const n=(new Date).getTime()-d._lastOutput;n<d._minInterval?d._scheduledTimer=setTimeout(e, d._minInterval-n):e(); 
} 
}; 
}function h(e, b, a){
 c.call(this, e, b, a);this._args=[];
    const d=this;this.input=CKEDITOR.tools.override(this.input, function(e){
 return function(){
 d._args=Array.prototype.slice.call(arguments);e.call(this); 
}; 
}); 
}let g=[], a=CKEDITOR.env.gecko?'-moz-':CKEDITOR.env.webkit?'-webkit-':CKEDITOR.env.ie?'-ms-':'', f=/&/g, m=/>/g, k=/</g, l=/"/g, b=/&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g, d={lt:'\x3c', gt:'\x3e', amp:'\x26', quot:'"', nbsp:' ', shy:'­'}, e=function(e, b){
 return'#'==b[0]?String.fromCharCode(parseInt(b.slice(1), 10)):d[b]; 
};CKEDITOR.on('reset', function(){
 g=[]; 
});CKEDITOR.tools=
    {arrayCompare:function(e, b){
 if(!e&&!b)return!0;if(!e||!b||e.length!=b.length)return!1;for(let a=0;a<e.length;a++)if(e[a]!=b[a])return!1;return!0; 
}, getIndex:function(e, b){
 for(let a=0;a<e.length;++a)if(b(e[a]))return a;return-1; 
}, clone:function(e){
 let b;if(e&&e instanceof Array){
 b=[];for(var a=0;a<e.length;a++)b[a]=CKEDITOR.tools.clone(e[a]);return b; 
}if(null===e||'object'!==typeof e||e instanceof String||e instanceof Number||e instanceof Boolean||e instanceof Date||e instanceof RegExp||e.nodeType||e.window===
    e)return e;b=new e.constructor;for(a in e)b[a]=CKEDITOR.tools.clone(e[a]);return b; 
}, capitalize:function(e, b){
 return e.charAt(0).toUpperCase()+(b?e.slice(1):e.slice(1).toLowerCase()); 
}, extend:function(e){
 let b=arguments.length, a, d;'boolean'===typeof(a=arguments[b-1])?b--:'boolean'===typeof(a=arguments[b-2])&&(d=arguments[b-1], b-=2);for(let f=1;f<b;f++){
 var c=arguments[f]||{};CKEDITOR.tools.array.forEach(CKEDITOR.tools.object.keys(c), function(b){
 if(!0===a||null==e[b])if(!d||b in d)e[b]=c[b]; 
}); 
}return e; 
},
    prototypedCopy:function(e){
 const b=function(){};b.prototype=e;return new b; 
}, copy:function(e){
 let b={}, a;for(a in e)b[a]=e[a];return b; 
}, isArray:function(e){
 return'[object Array]'==Object.prototype.toString.call(e); 
}, isEmpty:function(e){
 for(const b in e)if(e.hasOwnProperty(b))return!1;return!0; 
}, cssVendorPrefix:function(e, b, d){
 if(d)return `${a+e}:${b};${e}:${b}`;d={};d[e]=b;d[a+e]=b;return d; 
}, cssStyleToDomStyle:function(){
 const e=document.createElement('div').style, b='undefined'!==typeof e.cssFloat?'cssFloat':
    'undefined'!==typeof e.styleFloat?'styleFloat':'float';return function(e){
 return'float'==e?b:e.replace(/-./g, function(e){
 return e.substr(1).toUpperCase(); 
}); 
}; 
}(), buildStyleHtml:function(e){
 e=[].concat(e);for(var b, a=[], d=0;d<e.length;d++)if(b=e[d])/@import|[{}]/.test(b)?a.push(`\x3cstyle\x3e${b}\x3c/style\x3e`):a.push(`\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"${b}"\x3e`);return a.join(''); 
}, htmlEncode:function(e){
 return void 0===e||null===e?'':String(e).replace(f, '\x26amp;').replace(m,
    '\x26gt;').replace(k, '\x26lt;'); 
}, htmlDecode:function(n){
 return n.replace(b, e); 
}, htmlEncodeAttr:function(e){
 return CKEDITOR.tools.htmlEncode(e).replace(l, '\x26quot;'); 
}, htmlDecodeAttr:function(e){
 return CKEDITOR.tools.htmlDecode(e); 
}, transformPlainTextToHtml:function(e, b){
 var a=b==CKEDITOR.ENTER_BR, d=this.htmlEncode(e.replace(/\r\n/g, '\n')), d=d.replace(/\t/g, '\x26nbsp;\x26nbsp; \x26nbsp;'), f=b==CKEDITOR.ENTER_P?'p':'div';if(!a){
 const c=/\n{2}/g;if(c.test(d))var l=`\x3c${f}\x3e`, g=`\x3c/${f}\x3e`, d=l+
    d.replace(c, function(){
 return g+l; 
})+g; 
}d=d.replace(/\n/g, '\x3cbr\x3e');a||(d=d.replace(new RegExp(`\x3cbr\x3e(?\x3d\x3c/${f}\x3e)`), function(e){
 return CKEDITOR.tools.repeat(e, 2); 
}));d=d.replace(/^ | $/g, '\x26nbsp;');return d=d.replace(/(>|\s) /g, function(e, b){
 return `${b}\x26nbsp;`; 
}).replace(/ (?=<)/g, '\x26nbsp;'); 
}, getNextNumber:function(){
 let e=0;return function(){
 return++e; 
}; 
}(), getNextId:function(){
 return`cke_${this.getNextNumber()}`; 
}, getUniqueId:function(){
 for(var e='e', b=0;8>b;b++)e+=Math.floor(65536*
    (1+Math.random())).toString(16).substring(1);return e; 
}, override:function(e, b){
 const a=b(e);a.prototype=e.prototype;return a; 
}, setTimeout:function(e, b, a, d, f){
 f||(f=window);a||(a=f);return f.setTimeout(function(){
 d?e.apply(a, [].concat(d)):e.apply(a); 
}, b||0); 
}, throttle:function(e, b, a){
 return new this.buffers.throttle(e, b, a); 
}, trim:function(){
 const e=/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;return function(b){
 return b.replace(e, ''); 
}; 
}(), ltrim:function(){
 const e=/^[ \t\n\r]+/g;return function(b){
 return b.replace(e, ''); 
}; 
}(),
    rtrim:function(){
 const e=/[ \t\n\r]+$/g;return function(b){
 return b.replace(e, ''); 
}; 
}(), indexOf:function(e, b){
 if('function'===typeof b)for(var a=0, d=e.length;a<d;a++){
 if(b(e[a]))return a; 
}else{
 if(e.indexOf)return e.indexOf(b);a=0;for(d=e.length;a<d;a++)if(e[a]===b)return a; 
}return-1; 
}, search:function(e, b){
 const a=CKEDITOR.tools.indexOf(e, b);return 0<=a?e[a]:null; 
}, bind:function(e, b){
 const a=Array.prototype.slice.call(arguments, 2);return function(){
 return e.apply(b, a.concat(Array.prototype.slice.call(arguments))); 
}; 
},
    createClass:function(e){
 var b=e.$, a=e.base, d=e.privates||e._, f=e.proto;e=e.statics;!b&&(b=function(){
 a&&this.base.apply(this, arguments); 
});if(d)var c=b, b=function(){
 let e=this._||(this._={}), b;for(b in d){
 const a=d[b];e[b]='function'===typeof a?CKEDITOR.tools.bind(a, this):a; 
}c.apply(this, arguments); 
};a&&(b.prototype=this.prototypedCopy(a.prototype), b.prototype.constructor=b, b.base=a, b.baseProto=a.prototype, b.prototype.base=function u(){
 this.base=a.prototype.base;a.apply(this, arguments);this.base=u; 
});f&&
    this.extend(b.prototype, f, !0);e&&this.extend(b, e, !0);return b; 
}, addFunction:function(e, b){
 return g.push(function(){
 return e.apply(b||this, arguments); 
})-1; 
}, removeFunction:function(e){
 g[e]=null; 
}, callFunction:function(e){
 const b=g[e];return b&&b.apply(window, Array.prototype.slice.call(arguments, 1)); 
}, cssLength:function(){
 let e=/^-?\d+\.?\d*px$/, b;return function(a){
 b=`${CKEDITOR.tools.trim(`${a}`)}px`;return e.test(b)?b:a||''; 
}; 
}(), convertToPx:function(){
 let e;return function(b){
 e||(e=CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"\x3e\x3c/div\x3e',
    CKEDITOR.document), CKEDITOR.document.getBody().append(e));if(!/%$/.test(b)){
 const a=0>parseFloat(b);a&&(b=b.replace('-', ''));e.setStyle('width', b);b=e.$.clientWidth;return a?-b:b; 
}return b; 
}; 
}(), repeat:function(e, b){
 return Array(b+1).join(e); 
}, tryThese:function(){
 for(var e, b=0, a=arguments.length;b<a;b++){
 const d=arguments[b];try{
 e=d();break; 
}catch(f){} 
}return e; 
}, genKey:function(){
 return Array.prototype.slice.call(arguments).join('-'); 
}, defer:function(e){
 return function(){
 const b=arguments, a=this;window.setTimeout(function(){
 e.apply(a,
    b); 
}, 0); 
}; 
}, normalizeCssText:function(e, b){
 let a=[], d, f=CKEDITOR.tools.parseCssText(e, !0, b);for(d in f)a.push(`${d}:${f[d]}`);a.sort();return a.length?`${a.join(';')};`:''; 
}, convertRgbToHex:function(e){
 return e.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function(e, b, a, n){
 e=[b, a, n];for(b=0;3>b;b++)e[b]=(`0${parseInt(e[b], 10).toString(16)}`).slice(-2);return`#${e.join('')}`; 
}); 
}, normalizeHex:function(e){
 return e.replace(/#(([0-9a-f]{3}){1,2})($|;|\s+)/gi, function(e, b, a, n){
 e=b.toLowerCase();3==e.length&&
    (e=e.split(''), e=[e[0], e[0], e[1], e[1], e[2], e[2]].join(''));return`#${e}${n}`; 
}); 
}, parseCssText:function(e, b, a){
 const d={};a&&(e=(new CKEDITOR.dom.element('span')).setAttribute('style', e).getAttribute('style')||'');e&&(e=CKEDITOR.tools.normalizeHex(CKEDITOR.tools.convertRgbToHex(e)));if(!e||';'==e)return d;e.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(e, a, n){
 b&&(a=a.toLowerCase(), 'font-family'==a&&(n=n.replace(/\s*,\s*/g, ',')), n=CKEDITOR.tools.trim(n));d[a]=n; 
});return d; 
},
    writeCssText:function(e, b){
 let a, d=[];for(a in e)d.push(`${a}:${e[a]}`);b&&d.sort();return d.join('; '); 
}, objectCompare:function(e, b, a){
 let d;if(!e&&!b)return!0;if(!e||!b)return!1;for(d in e)if(e[d]!=b[d])return!1;if(!a)for(d in b)if(e[d]!=b[d])return!1;return!0; 
}, objectKeys:function(e){
 return CKEDITOR.tools.object.keys(e); 
}, convertArrayToObject:function(e, b){
 const a={};1==arguments.length&&(b=!0);for(let d=0, f=e.length;d<f;++d)a[e[d]]=b;return a; 
}, getStyledSpans:function(e, b){
 var a=CKEDITOR.env.ie&&8==CKEDITOR.env.version?
    e.toUpperCase():e, a=b.find(`span[style*\x3d${a}]`).toArray();return CKEDITOR.tools.array.filter(a, function(b){
 return!!b.getStyle(e); 
}); 
}, fixDomain:function(){
 for(var e;;)try{
 e=window.parent.document.domain;break; 
}catch(b){
 e=e?e.replace(/.+?(?:\.|$)/, ''):document.domain;if(!e)break;document.domain=e; 
}return!!e; 
}, eventsBuffer:function(e, b, a){
 return new this.buffers.event(e, b, a); 
}, enableHtml5Elements:function(e, b){
 for(var a='abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video'.split(' '),
    d=a.length, f;d--;)f=e.createElement(a[d]), b&&e.appendChild(f); 
}, checkIfAnyArrayItemMatches:function(e, b){
 for(let a=0, d=e.length;a<d;++a)if(e[a].match(b))return!0;return!1; 
}, checkIfAnyObjectPropertyMatches:function(e, b){
 for(const a in e)if(a.match(b))return!0;return!1; 
}, keystrokeToString:function(e, b){
 const a=this.keystrokeToArray(e, b);a.display=a.display.join('+');a.aria=a.aria.join('+');return a; 
}, keystrokeToArray:function(e, b){
 const a=b&16711680, d=b&65535, f=CKEDITOR.env.mac, c=[], l=[];a&CKEDITOR.CTRL&&(c.push(f?
    '⌘':e[17]), l.push(f?e[224]:e[17]));a&CKEDITOR.ALT&&(c.push(f?'⌥':e[18]), l.push(e[18]));a&CKEDITOR.SHIFT&&(c.push(f?'⇧':e[16]), l.push(e[16]));d&&(e[d]?(c.push(e[d]), l.push(e[d])):(c.push(String.fromCharCode(d)), l.push(String.fromCharCode(d))));return{display:c, aria:l}; 
}, transparentImageData:'data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw\x3d\x3d', getCookie:function(e){
 e=e.toLowerCase();for(var b=document.cookie.split(';'), a, d, f=0;f<b.length;f++)if(a=b[f].split('\x3d'),
    d=decodeURIComponent(CKEDITOR.tools.trim(a[0]).toLowerCase()), d===e)return decodeURIComponent(1<a.length?a[1]:'');return null; 
}, setCookie:function(e, b){
 document.cookie=`${encodeURIComponent(e)}\x3d${encodeURIComponent(b)};path\x3d/`; 
}, getCsrfToken:function(){
 var e=CKEDITOR.tools.getCookie('ckCsrfToken');if(!e||40!=e.length){
 var e=[], b='';if(window.crypto&&window.crypto.getRandomValues)e=new Uint8Array(40), window.crypto.getRandomValues(e);else for(var a=0;40>a;a++)e.push(Math.floor(256*Math.random()));
    for(a=0;a<e.length;a++)var d='abcdefghijklmnopqrstuvwxyz0123456789'.charAt(e[a]%36), b=b+(.5<Math.random()?d.toUpperCase():d);e=b;CKEDITOR.tools.setCookie('ckCsrfToken', e); 
}return e; 
}, escapeCss:function(e){
 return e?window.CSS&&CSS.escape?CSS.escape(e):isNaN(parseInt(e.charAt(0), 10))?e:`\\3${e.charAt(0)} ${e.substring(1, e.length)}`:''; 
}, getMouseButton:function(e){
 return(e=e&&e.data?e.data.$:e)?CKEDITOR.tools.normalizeMouseButton(e.button):!1; 
}, normalizeMouseButton:function(e, b){
 if(!CKEDITOR.env.ie||9<=CKEDITOR.env.version&&
    !CKEDITOR.env.ie6Compat)return e;for(let a=[[CKEDITOR.MOUSE_BUTTON_LEFT, 1], [CKEDITOR.MOUSE_BUTTON_MIDDLE, 4], [CKEDITOR.MOUSE_BUTTON_RIGHT, 2]], d=0;d<a.length;d++){
 const f=a[d];if(f[0]===e&&b)return f[1];if(!b&&f[1]===e)return f[0]; 
} 
}, convertHexStringToBytes:function(e){
 let b=[], a=e.length/2, d;for(d=0;d<a;d++)b.push(parseInt(e.substr(2*d, 2), 16));return b; 
}, convertBytesToBase64:function(e){
 let b='', a=e.length, d;for(d=0;d<a;d+=3){
 var f=e.slice(d, d+3), c=f.length, l=[], g;if(3>c)for(g=c;3>g;g++)f[g]=0;l[0]=(f[0]&
    252)>>2;l[1]=(f[0]&3)<<4|f[1]>>4;l[2]=(f[1]&15)<<2|(f[2]&192)>>6;l[3]=f[2]&63;for(g=0;4>g;g++)b=g<=c?b+'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(l[g]):`${b}\x3d`; 
}return b; 
}, style:{parse:{_colors:{aliceblue:'#F0F8FF', antiquewhite:'#FAEBD7', aqua:'#00FFFF', aquamarine:'#7FFFD4', azure:'#F0FFFF', beige:'#F5F5DC', bisque:'#FFE4C4', black:'#000000', blanchedalmond:'#FFEBCD', blue:'#0000FF', blueviolet:'#8A2BE2', brown:'#A52A2A', burlywood:'#DEB887', cadetblue:'#5F9EA0', chartreuse:'#7FFF00',
    chocolate:'#D2691E', coral:'#FF7F50', cornflowerblue:'#6495ED', cornsilk:'#FFF8DC', crimson:'#DC143C', cyan:'#00FFFF', darkblue:'#00008B', darkcyan:'#008B8B', darkgoldenrod:'#B8860B', darkgray:'#A9A9A9', darkgreen:'#006400', darkgrey:'#A9A9A9', darkkhaki:'#BDB76B', darkmagenta:'#8B008B', darkolivegreen:'#556B2F', darkorange:'#FF8C00', darkorchid:'#9932CC', darkred:'#8B0000', darksalmon:'#E9967A', darkseagreen:'#8FBC8F', darkslateblue:'#483D8B', darkslategray:'#2F4F4F', darkslategrey:'#2F4F4F', darkturquoise:'#00CED1', darkviolet:'#9400D3',
    deeppink:'#FF1493', deepskyblue:'#00BFFF', dimgray:'#696969', dimgrey:'#696969', dodgerblue:'#1E90FF', firebrick:'#B22222', floralwhite:'#FFFAF0', forestgreen:'#228B22', fuchsia:'#FF00FF', gainsboro:'#DCDCDC', ghostwhite:'#F8F8FF', gold:'#FFD700', goldenrod:'#DAA520', gray:'#808080', green:'#008000', greenyellow:'#ADFF2F', grey:'#808080', honeydew:'#F0FFF0', hotpink:'#FF69B4', indianred:'#CD5C5C', indigo:'#4B0082', ivory:'#FFFFF0', khaki:'#F0E68C', lavender:'#E6E6FA', lavenderblush:'#FFF0F5', lawngreen:'#7CFC00', lemonchiffon:'#FFFACD',
    lightblue:'#ADD8E6', lightcoral:'#F08080', lightcyan:'#E0FFFF', lightgoldenrodyellow:'#FAFAD2', lightgray:'#D3D3D3', lightgreen:'#90EE90', lightgrey:'#D3D3D3', lightpink:'#FFB6C1', lightsalmon:'#FFA07A', lightseagreen:'#20B2AA', lightskyblue:'#87CEFA', lightslategray:'#778899', lightslategrey:'#778899', lightsteelblue:'#B0C4DE', lightyellow:'#FFFFE0', lime:'#00FF00', limegreen:'#32CD32', linen:'#FAF0E6', magenta:'#FF00FF', maroon:'#800000', mediumaquamarine:'#66CDAA', mediumblue:'#0000CD', mediumorchid:'#BA55D3', mediumpurple:'#9370DB',
    mediumseagreen:'#3CB371', mediumslateblue:'#7B68EE', mediumspringgreen:'#00FA9A', mediumturquoise:'#48D1CC', mediumvioletred:'#C71585', midnightblue:'#191970', mintcream:'#F5FFFA', mistyrose:'#FFE4E1', moccasin:'#FFE4B5', navajowhite:'#FFDEAD', navy:'#000080', oldlace:'#FDF5E6', olive:'#808000', olivedrab:'#6B8E23', orange:'#FFA500', orangered:'#FF4500', orchid:'#DA70D6', palegoldenrod:'#EEE8AA', palegreen:'#98FB98', paleturquoise:'#AFEEEE', palevioletred:'#DB7093', papayawhip:'#FFEFD5', peachpuff:'#FFDAB9', peru:'#CD853F',
    pink:'#FFC0CB', plum:'#DDA0DD', powderblue:'#B0E0E6', purple:'#800080', rebeccapurple:'#663399', red:'#FF0000', rosybrown:'#BC8F8F', royalblue:'#4169E1', saddlebrown:'#8B4513', salmon:'#FA8072', sandybrown:'#F4A460', seagreen:'#2E8B57', seashell:'#FFF5EE', sienna:'#A0522D', silver:'#C0C0C0', skyblue:'#87CEEB', slateblue:'#6A5ACD', slategray:'#708090', slategrey:'#708090', snow:'#FFFAFA', springgreen:'#00FF7F', steelblue:'#4682B4', tan:'#D2B48C', teal:'#008080', thistle:'#D8BFD8', tomato:'#FF6347', turquoise:'#40E0D0', violet:'#EE82EE',
    windowtext:'windowtext', wheat:'#F5DEB3', white:'#FFFFFF', whitesmoke:'#F5F5F5', yellow:'#FFFF00', yellowgreen:'#9ACD32'}, _borderStyle:'none hidden dotted dashed solid double groove ridge inset outset'.split(' '), _widthRegExp:/^(thin|medium|thick|[\+-]?\d+(\.\d+)?[a-z%]+|[\+-]?0+(\.0+)?|\.\d+[a-z%]+)$/, _rgbaRegExp:/rgba?\(\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*(?:,\s*[0-9.]+\s*)?\)/gi, _hslaRegExp:/hsla?\(\s*[0-9.]+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[0-9.]+\s*)?\)/gi, background:function(e){
 const b={}, a=this._findColor(e);
    a.length&&(b.color=a[0], CKEDITOR.tools.array.forEach(a, function(b){
 e=e.replace(b, ''); 
}));if(e=CKEDITOR.tools.trim(e))b.unprocessed=e;return b; 
}, margin:function(e){
 return CKEDITOR.tools.style.parse.sideShorthand(e, function(e){
 return e.match(/(?:\-?[\.\d]+(?:%|\w*)|auto|inherit|initial|unset|revert)/g)||['0px']; 
}); 
}, sideShorthand:function(e, b){
 function a(e){
 d.top=f[e[0]];d.right=f[e[1]];d.bottom=f[e[2]];d.left=f[e[3]]; 
}var d={}, f=b?b(e):e.split(/\s+/);switch(f.length){
 case 1:a([0, 0, 0, 0]);break;case 2:a([0,
    1, 0, 1]);break;case 3:a([0, 1, 2, 1]);break;case 4:a([0, 1, 2, 3]); 
}return d; 
}, border:function(e){
 return CKEDITOR.tools.style.border.fromCssRule(e); 
}, _findColor:function(e){
 var b=[], a=CKEDITOR.tools.array, b=b.concat(e.match(this._rgbaRegExp)||[]), b=b.concat(e.match(this._hslaRegExp)||[]);return b=b.concat(a.filter(e.split(/\s+/), function(e){
 return e.match(/^\#[a-f0-9]{3}(?:[a-f0-9]{3})?$/gi)?!0:e.toLowerCase()in CKEDITOR.tools.style.parse._colors; 
})); 
}}}, array:{filter:function(e, b, a){
 const d=[];this.forEach(e,
    function(f, c){
 b.call(a, f, c, e)&&d.push(f); 
});return d; 
}, find:function(e, b, a){
 for(let d=e.length, f=0;f<d;){
 if(b.call(a, e[f], f, e))return e[f];f++; 
} 
}, forEach:function(e, b, a){
 let d=e.length, f;for(f=0;f<d;f++)b.call(a, e[f], f, e); 
}, map:function(e, b, a){
 for(var d=[], f=0;f<e.length;f++)d.push(b.call(a, e[f], f, e));return d; 
}, reduce:function(e, b, a, d){
 for(let f=0;f<e.length;f++)a=b.call(d, a, e[f], f, e);return a; 
}, every:function(e, b, a){
 if(!e.length)return!0;b=this.filter(e, b, a);return e.length===b.length; 
}, some:function(e,
    b, a){
 for(let d=0;d<e.length;d++)if(b.call(a, e[d], d, e))return!0;return!1; 
}, zip:function(e, b){
 return CKEDITOR.tools.array.map(e, function(e, a){
 return[e, b[a]]; 
}); 
}}, object:{DONT_ENUMS:'toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor'.split(' '), entries:function(e){
 return CKEDITOR.tools.array.map(CKEDITOR.tools.object.keys(e), function(b){
 return[b, e[b]]; 
}); 
}, values:function(e){
 return CKEDITOR.tools.array.map(CKEDITOR.tools.object.keys(e), function(b){
 return e[b]; 
}); 
},
    keys:function(e){
 let b=Object.prototype.hasOwnProperty, a=[], d=CKEDITOR.tools.object.DONT_ENUMS;if(CKEDITOR.env.ie&&9>CKEDITOR.env.version&&(!e||'object'!==typeof e)){
 b=[];if('string'===typeof e)for(a=0;a<e.length;a++)b.push(String(a));return b; 
}for(var f in e)a.push(f);if(CKEDITOR.env.ie&&9>CKEDITOR.env.version)for(f=0;f<d.length;f++)b.call(e, d[f])&&a.push(d[f]);return a; 
}, findKey:function(e, b){
 if('object'!==typeof e)return null;for(const a in e)if(e[a]===b)return a;return null; 
}, merge:function(e, b){
 const a=
    CKEDITOR.tools, d=a.clone(e), f=a.clone(b);a.array.forEach(a.object.keys(f), function(e){
 d[e]='object'===typeof f[e]&&'object'===typeof d[e]?a.object.merge(d[e], f[e]):f[e]; 
});return d; 
}}, getAbsoluteRectPosition:function(e, b){
 function a(e){
 if(e){
 const b=e.getClientRect();d.top+=b.top;d.left+=b.left;'x'in d&&'y'in d&&(d.x+=b.x, d.y+=b.y);a(e.getWindow().getFrame()); 
} 
}var d=CKEDITOR.tools.copy(b);a(e.getFrame());const f=CKEDITOR.document.getWindow().getScrollPosition();d.top+=f.y;d.left+=f.x;'x'in d&&'y'in d&&
    (d.y+=f.y, d.x+=f.x);d.right=d.left+d.width;d.bottom=d.top+d.height;return d; 
}};c.prototype={reset:function(){
 this._lastOutput=0;this._clearTimer(); 
}, _reschedule:function(){
 return!1; 
}, _call:function(){
 this._output(); 
}, _clearTimer:function(){
 this._scheduledTimer&&clearTimeout(this._scheduledTimer);this._scheduledTimer=0; 
}};h.prototype=CKEDITOR.tools.prototypedCopy(c.prototype);h.prototype._reschedule=function(){
 this._scheduledTimer&&this._clearTimer(); 
};h.prototype._call=function(){
 this._output.apply(this._context,
    this._args); 
};CKEDITOR.tools.buffers={};CKEDITOR.tools.buffers.event=c;CKEDITOR.tools.buffers.throttle=h;CKEDITOR.tools.style.border=CKEDITOR.tools.createClass({$:function(e){
 e=e||{};this.width=e.width;this.style=e.style;this.color=e.color;this._.normalize(); 
}, _:{normalizeMap:{color:[[/windowtext/g, 'black']]}, normalize:function(){
 for(const e in this._.normalizeMap){
 const b=this[e];b&&(this[e]=CKEDITOR.tools.array.reduce(this._.normalizeMap[e], function(e, b){
 return e.replace(b[0], b[1]); 
}, b)); 
} 
}}, proto:{toString:function(){
 return CKEDITOR.tools.array.filter([this.width,
    this.style, this.color], function(e){
 return!!e; 
}).join(' '); 
}}, statics:{fromCssRule:function(e){
 const b={}, a=e.split(/\s+/g);e=CKEDITOR.tools.style.parse._findColor(e);e.length&&(b.color=e[0]);CKEDITOR.tools.array.forEach(a, function(e){
 b.style||-1===CKEDITOR.tools.indexOf(CKEDITOR.tools.style.parse._borderStyle, e)?!b.width&&CKEDITOR.tools.style.parse._widthRegExp.test(e)&&(b.width=e):b.style=e; 
});return new CKEDITOR.tools.style.border(b); 
}, splitCssValues:function(e, b){
 b=b||{};const a=CKEDITOR.tools.array.reduce(['width',
    'style', 'color'], function(a, d){
 const f=e[`border-${d}`]||b[d];a[d]=f?CKEDITOR.tools.style.parse.sideShorthand(f):null;return a; 
}, {});return CKEDITOR.tools.array.reduce(['top', 'right', 'bottom', 'left'], function(b, d){
 let f={}, c;for(c in a){
 const l=e[`border-${d}-${c}`];f[c]=l?l:a[c]&&a[c][d]; 
}b[`border-${d}`]=new CKEDITOR.tools.style.border(f);return b; 
}, {}); 
}}});CKEDITOR.tools.array.indexOf=CKEDITOR.tools.indexOf;CKEDITOR.tools.array.isArray=CKEDITOR.tools.isArray;CKEDITOR.MOUSE_BUTTON_LEFT=0;CKEDITOR.MOUSE_BUTTON_MIDDLE=
    1;CKEDITOR.MOUSE_BUTTON_RIGHT=2; 
}(), CKEDITOR.dtd=function(){
 let c=CKEDITOR.tools.extend, h=function(b, e){
 for(var a=CKEDITOR.tools.clone(b), f=1;f<arguments.length;f++){
 e=arguments[f];for(const c in e)delete a[c]; 
}return a; 
}, g={}, a={}, f={address:1, article:1, aside:1, blockquote:1, details:1, div:1, dl:1, fieldset:1, figure:1, footer:1, form:1, h1:1, h2:1, h3:1, h4:1, h5:1, h6:1, header:1, hgroup:1, hr:1, main:1, menu:1, nav:1, ol:1, p:1, pre:1, section:1, table:1, ul:1}, m={command:1, link:1, meta:1, noscript:1, script:1, style:1}, k={},
    l={'#':1}, b={center:1, dir:1, noframes:1};c(g, {a:1, abbr:1, area:1, audio:1, b:1, bdi:1, bdo:1, br:1, button:1, canvas:1, cite:1, code:1, command:1, datalist:1, del:1, dfn:1, em:1, embed:1, i:1, iframe:1, img:1, input:1, ins:1, kbd:1, keygen:1, label:1, map:1, mark:1, meter:1, noscript:1, object:1, output:1, progress:1, q:1, ruby:1, s:1, samp:1, script:1, select:1, small:1, span:1, strong:1, sub:1, sup:1, textarea:1, time:1, u:1, 'var':1, video:1, wbr:1}, l, {acronym:1, applet:1, basefont:1, big:1, font:1, isindex:1, strike:1, style:1, tt:1});c(a, f, g, b);h=
    {a:h(g, {a:1, button:1}), abbr:g, address:a, area:k, article:a, aside:a, audio:c({source:1, track:1}, a), b:g, base:k, bdi:g, bdo:g, blockquote:a, body:a, br:k, button:h(g, {a:1, button:1}), canvas:g, caption:a, cite:g, code:g, col:k, colgroup:{col:1}, command:k, datalist:c({option:1}, g), dd:a, del:g, details:c({summary:1}, a), dfn:g, div:a, dl:{dt:1, dd:1}, dt:a, em:g, embed:k, fieldset:c({legend:1}, a), figcaption:a, figure:c({figcaption:1}, a), footer:a, form:a, h1:g, h2:g, h3:g, h4:g, h5:g, h6:g, head:c({title:1, base:1}, m), header:a, hgroup:{h1:1,
    h2:1, h3:1, h4:1, h5:1, h6:1}, hr:k, html:c({head:1, body:1}, a, m), i:g, iframe:l, img:k, input:k, ins:g, kbd:g, keygen:k, label:g, legend:g, li:a, link:k, main:a, map:a, mark:g, menu:c({li:1}, a), meta:k, meter:h(g, {meter:1}), nav:a, noscript:c({link:1, meta:1, style:1}, g), object:c({param:1}, g), ol:{li:1}, optgroup:{option:1}, option:l, output:g, p:g, param:k, pre:g, progress:h(g, {progress:1}), q:g, rp:g, rt:g, ruby:c({rp:1, rt:1}, g), s:g, samp:g, script:l, section:a, select:{optgroup:1, option:1}, small:g, source:k, span:g, strong:g, style:l, sub:g,
    summary:c({h1:1, h2:1, h3:1, h4:1, h5:1, h6:1}, g), sup:g, table:{caption:1, colgroup:1, thead:1, tfoot:1, tbody:1, tr:1}, tbody:{tr:1}, td:a, textarea:l, tfoot:{tr:1}, th:a, thead:{tr:1}, time:h(g, {time:1}), title:l, tr:{th:1, td:1}, track:k, u:g, ul:{li:1}, 'var':g, video:c({source:1, track:1}, a), wbr:k, acronym:g, applet:c({param:1}, a), basefont:k, big:g, center:a, dialog:k, dir:{li:1}, font:g, isindex:k, noframes:a, strike:g, tt:g};c(h, {$block:c({audio:1, dd:1, dt:1, figcaption:1, li:1, video:1}, f, b), $blockLimit:{article:1, aside:1, audio:1,
    body:1, caption:1, details:1, dir:1, div:1, dl:1, fieldset:1, figcaption:1, figure:1, footer:1, form:1, header:1, hgroup:1, main:1, menu:1, nav:1, ol:1, section:1, table:1, td:1, th:1, tr:1, ul:1, video:1}, $cdata:{script:1, style:1}, $editable:{address:1, article:1, aside:1, blockquote:1, body:1, details:1, div:1, fieldset:1, figcaption:1, footer:1, form:1, h1:1, h2:1, h3:1, h4:1, h5:1, h6:1, header:1, hgroup:1, main:1, nav:1, p:1, pre:1, section:1}, $empty:{area:1, base:1, basefont:1, br:1, col:1, command:1, dialog:1, embed:1, hr:1, img:1, input:1, isindex:1,
    keygen:1, link:1, meta:1, param:1, source:1, track:1, wbr:1}, $inline:g, $list:{dl:1, ol:1, ul:1}, $listItem:{dd:1, dt:1, li:1}, $nonBodyContent:c({body:1, head:1, html:1}, h.head), $nonEditable:{applet:1, audio:1, button:1, embed:1, iframe:1, map:1, object:1, option:1, param:1, script:1, textarea:1, video:1}, $object:{applet:1, audio:1, button:1, hr:1, iframe:1, img:1, input:1, object:1, select:1, table:1, textarea:1, video:1}, $removeEmpty:{abbr:1, acronym:1, b:1, bdi:1, bdo:1, big:1, cite:1, code:1, del:1, dfn:1, em:1, font:1, i:1, ins:1, label:1, kbd:1,
    mark:1, meter:1, output:1, q:1, ruby:1, s:1, samp:1, small:1, span:1, strike:1, strong:1, sub:1, sup:1, time:1, tt:1, u:1, 'var':1}, $tabIndex:{a:1, area:1, button:1, input:1, object:1, select:1, textarea:1}, $tableContent:{caption:1, col:1, colgroup:1, tbody:1, td:1, tfoot:1, th:1, thead:1, tr:1}, $transparent:{a:1, audio:1, canvas:1, del:1, ins:1, map:1, noscript:1, object:1, video:1}, $intermediate:{caption:1, colgroup:1, dd:1, dt:1, figcaption:1, legend:1, li:1, optgroup:1, option:1, rp:1, rt:1, summary:1, tbody:1, td:1, tfoot:1, th:1, thead:1, tr:1}});
    return h; 
}(), CKEDITOR.dom.event=function(c){
 this.$=c; 
}, CKEDITOR.dom.event.prototype={getKey:function(){
 return this.$.keyCode||this.$.which; 
}, getKeystroke:function(){
 let c=this.getKey();if(this.$.ctrlKey||this.$.metaKey)c+=CKEDITOR.CTRL;this.$.shiftKey&&(c+=CKEDITOR.SHIFT);this.$.altKey&&(c+=CKEDITOR.ALT);return c; 
}, preventDefault:function(c){
 const h=this.$;h.preventDefault?h.preventDefault():h.returnValue=!1;c&&this.stopPropagation(); 
}, stopPropagation:function(){
 const c=this.$;c.stopPropagation?c.stopPropagation():
    c.cancelBubble=!0; 
}, getTarget:function(){
 const c=this.$.target||this.$.srcElement;return c?new CKEDITOR.dom.node(c):null; 
}, getPhase:function(){
 return this.$.eventPhase||2; 
}, getPageOffset:function(){
 const c=this.getTarget().getDocument().$;return{x:this.$.pageX||this.$.clientX+(c.documentElement.scrollLeft||c.body.scrollLeft), y:this.$.pageY||this.$.clientY+(c.documentElement.scrollTop||c.body.scrollTop)}; 
}}, CKEDITOR.CTRL=1114112, CKEDITOR.SHIFT=2228224, CKEDITOR.ALT=4456448, CKEDITOR.EVENT_PHASE_CAPTURING=1,
    CKEDITOR.EVENT_PHASE_AT_TARGET=2, CKEDITOR.EVENT_PHASE_BUBBLING=3, CKEDITOR.dom.domObject=function(c){
 c&&(this.$=c); 
}, CKEDITOR.dom.domObject.prototype=function(){
 const c=function(c, g){
 return function(a){
 'undefined'!==typeof CKEDITOR&&c.fire(g, new CKEDITOR.dom.event(a)); 
}; 
};return{getPrivate:function(){
 let c;(c=this.getCustomData('_'))||this.setCustomData('_', c={});return c; 
}, on:function(h){
 let g=this.getCustomData('_cke_nativeListeners');g||(g={}, this.setCustomData('_cke_nativeListeners', g));g[h]||(g=g[h]=
    c(this, h), this.$.addEventListener?this.$.addEventListener(h, g, !!CKEDITOR.event.useCapture):this.$.attachEvent&&this.$.attachEvent(`on${h}`, g));return CKEDITOR.event.prototype.on.apply(this, arguments); 
}, removeListener:function(c){
 CKEDITOR.event.prototype.removeListener.apply(this, arguments);if(!this.hasListeners(c)){
 const g=this.getCustomData('_cke_nativeListeners'), a=g&&g[c];a&&(this.$.removeEventListener?this.$.removeEventListener(c, a, !1):this.$.detachEvent&&this.$.detachEvent(`on${c}`, a), delete g[c]); 
} 
},
    removeAllListeners:function(){
 try{
 let c=this.getCustomData('_cke_nativeListeners'), g;for(g in c){
 const a=c[g];this.$.detachEvent?this.$.detachEvent(`on${g}`, a):this.$.removeEventListener&&this.$.removeEventListener(g, a, !1);delete c[g]; 
} 
}catch(f){
 if(!CKEDITOR.env.edge||-2146828218!==f.number)throw f; 
}CKEDITOR.event.prototype.removeAllListeners.call(this); 
}}; 
}(), function(c){
 let h={};CKEDITOR.on('reset', function(){
 h={}; 
});c.equals=function(c){
 try{
 return c&&c.$===this.$; 
}catch(a){
 return!1; 
} 
};c.setCustomData=function(c,
    a){
 const f=this.getUniqueId();(h[f]||(h[f]={}))[c]=a;return this; 
};c.getCustomData=function(c){
 let a=this.$['data-cke-expando'];return(a=a&&h[a])&&c in a?a[c]:null; 
};c.removeCustomData=function(c){
 var a=this.$['data-cke-expando'], a=a&&h[a], f, m;a&&(f=a[c], m=c in a, delete a[c]);return m?f:null; 
};c.clearCustomData=function(){
 this.removeAllListeners();const c=this.getUniqueId();c&&delete h[c]; 
};c.getUniqueId=function(){
 return this.$['data-cke-expando']||(this.$['data-cke-expando']=CKEDITOR.tools.getNextNumber()); 
};
    CKEDITOR.event.implementOn(c); 
}(CKEDITOR.dom.domObject.prototype), CKEDITOR.dom.node=function(c){
 return c?new CKEDITOR.dom[c.nodeType==CKEDITOR.NODE_DOCUMENT?'document':c.nodeType==CKEDITOR.NODE_ELEMENT?'element':c.nodeType==CKEDITOR.NODE_TEXT?'text':c.nodeType==CKEDITOR.NODE_COMMENT?'comment':c.nodeType==CKEDITOR.NODE_DOCUMENT_FRAGMENT?'documentFragment':'domObject'](c):this; 
}, CKEDITOR.dom.node.prototype=new CKEDITOR.dom.domObject, CKEDITOR.NODE_ELEMENT=1, CKEDITOR.NODE_DOCUMENT=9, CKEDITOR.NODE_TEXT=
    3, CKEDITOR.NODE_COMMENT=8, CKEDITOR.NODE_DOCUMENT_FRAGMENT=11, CKEDITOR.POSITION_IDENTICAL=0, CKEDITOR.POSITION_DISCONNECTED=1, CKEDITOR.POSITION_FOLLOWING=2, CKEDITOR.POSITION_PRECEDING=4, CKEDITOR.POSITION_IS_CONTAINED=8, CKEDITOR.POSITION_CONTAINS=16, CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {appendTo:function(c, h){
 c.append(this, h);return c; 
}, clone:function(c, h){
 function g(a){
 a['data-cke-expando']&&(a['data-cke-expando']=!1);if(a.nodeType==CKEDITOR.NODE_ELEMENT||a.nodeType==CKEDITOR.NODE_DOCUMENT_FRAGMENT)if(h||
    a.nodeType!=CKEDITOR.NODE_ELEMENT||a.removeAttribute('id', !1), c){
 a=a.childNodes;for(let f=0;f<a.length;f++)g(a[f]); 
} 
}function a(f){
 if(f.type==CKEDITOR.NODE_ELEMENT||f.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT){
 if(f.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT){
 var g=f.getName();':'==g[0]&&f.renameNode(g.substring(1)); 
}if(c)for(g=0;g<f.getChildCount();g++)a(f.getChild(g)); 
} 
}let f=this.$.cloneNode(c);g(f);f=new CKEDITOR.dom.node(f);CKEDITOR.env.ie&&9>CKEDITOR.env.version&&(this.type==CKEDITOR.NODE_ELEMENT||this.type==
    CKEDITOR.NODE_DOCUMENT_FRAGMENT)&&a(f);return f; 
}, hasPrevious:function(){
 return!!this.$.previousSibling; 
}, hasNext:function(){
 return!!this.$.nextSibling; 
}, insertAfter:function(c){
 c.$.parentNode.insertBefore(this.$, c.$.nextSibling);return c; 
}, insertBefore:function(c){
 c.$.parentNode.insertBefore(this.$, c.$);return c; 
}, insertBeforeMe:function(c){
 this.$.parentNode.insertBefore(c.$, this.$);return c; 
}, getAddress:function(c){
 for(var h=[], g=this.getDocument().$.documentElement, a=this;a&&a!=g;){
 const f=a.getParent();
    f&&h.unshift(this.getIndex.call(a, c));a=f; 
}return h; 
}, getDocument:function(){
 return new CKEDITOR.dom.document(this.$.ownerDocument||this.$.parentNode.ownerDocument); 
}, getIndex:function(c){
 function h(a, f){
 const c=f?a.getNext():a.getPrevious();return c&&c.type==CKEDITOR.NODE_TEXT?c.isEmpty()?h(c, f):c:null; 
}let g=this, a=-1, f;if(!this.getParent()||c&&g.type==CKEDITOR.NODE_TEXT&&g.isEmpty()&&!h(g)&&!h(g, !0))return-1;do if(!c||g.equals(this)||g.type!=CKEDITOR.NODE_TEXT||!f&&!g.isEmpty())a++, f=g.type==CKEDITOR.NODE_TEXT;
    while(g=g.getPrevious());return a; 
}, getNextSourceNode:function(c, h, g){
 if(g&&!g.call){
 const a=g;g=function(f){
 return!f.equals(a); 
}; 
}c=!c&&this.getFirst&&this.getFirst();let f;if(!c){
 if(this.type==CKEDITOR.NODE_ELEMENT&&g&&!1===g(this, !0))return null;c=this.getNext(); 
}for(;!c&&(f=(f||this).getParent());){
 if(g&&!1===g(f, !0))return null;c=f.getNext(); 
}return!c||g&&!1===g(c)?null:h&&h!=c.type?c.getNextSourceNode(!1, h, g):c; 
}, getPreviousSourceNode:function(c, h, g){
 if(g&&!g.call){
 const a=g;g=function(f){
 return!f.equals(a); 
}; 
}c=
    !c&&this.getLast&&this.getLast();let f;if(!c){
 if(this.type==CKEDITOR.NODE_ELEMENT&&g&&!1===g(this, !0))return null;c=this.getPrevious(); 
}for(;!c&&(f=(f||this).getParent());){
 if(g&&!1===g(f, !0))return null;c=f.getPrevious(); 
}return!c||g&&!1===g(c)?null:h&&c.type!=h?c.getPreviousSourceNode(!1, h, g):c; 
}, getPrevious:function(c){
 let h=this.$, g;do g=(h=h.previousSibling)&&10!=h.nodeType&&new CKEDITOR.dom.node(h);while(g&&c&&!c(g));return g; 
}, getNext:function(c){
 let h=this.$, g;do g=(h=h.nextSibling)&&new CKEDITOR.dom.node(h);
    while(g&&c&&!c(g));return g; 
}, getParent:function(c){
 const h=this.$.parentNode;return h&&(h.nodeType==CKEDITOR.NODE_ELEMENT||c&&h.nodeType==CKEDITOR.NODE_DOCUMENT_FRAGMENT)?new CKEDITOR.dom.node(h):null; 
}, getParents:function(c){
 let h=this, g=[];do g[c?'push':'unshift'](h);while(h=h.getParent());return g; 
}, getCommonAncestor:function(c){
 if(c.equals(this))return this;if(c.contains&&c.contains(this))return c;let h=this.contains?this:this.getParent();do if(h.contains(c))return h;while(h=h.getParent());return null; 
},
    getPosition:function(c){
 var h=this.$, g=c.$;if(h.compareDocumentPosition)return h.compareDocumentPosition(g);if(h==g)return CKEDITOR.POSITION_IDENTICAL;if(this.type==CKEDITOR.NODE_ELEMENT&&c.type==CKEDITOR.NODE_ELEMENT){
 if(h.contains){
 if(h.contains(g))return CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_PRECEDING;if(g.contains(h))return CKEDITOR.POSITION_IS_CONTAINED+CKEDITOR.POSITION_FOLLOWING; 
}if('sourceIndex'in h)return 0>h.sourceIndex||0>g.sourceIndex?CKEDITOR.POSITION_DISCONNECTED:h.sourceIndex<
    g.sourceIndex?CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_FOLLOWING; 
}h=this.getAddress();c=c.getAddress();for(var g=Math.min(h.length, c.length), a=0;a<g;a++)if(h[a]!=c[a])return h[a]<c[a]?CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_FOLLOWING;return h.length<c.length?CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_IS_CONTAINED+CKEDITOR.POSITION_FOLLOWING; 
}, getAscendant:function(c, h){
 let g=this.$, a, f;h||(g=g.parentNode);'function'===typeof c?(f=!0, a=c):(f=!1, a=function(a){
 a=
    'string'===typeof a.nodeName?a.nodeName.toLowerCase():'';return'string'===typeof c?a==c:a in c; 
});for(;g;){
 if(a(f?new CKEDITOR.dom.node(g):g))return new CKEDITOR.dom.node(g);try{
 g=g.parentNode; 
}catch(m){
 g=null; 
} 
}return null; 
}, hasAscendant:function(c, h){
 let g=this.$;h||(g=g.parentNode);for(;g;){
 if(g.nodeName&&g.nodeName.toLowerCase()==c)return!0;g=g.parentNode; 
}return!1; 
}, move:function(c, h){
 c.append(this.remove(), h); 
}, remove:function(c){
 const h=this.$, g=h.parentNode;if(g){
 if(c)for(;c=h.firstChild;)g.insertBefore(h.removeChild(c),
    h);g.removeChild(h); 
}return this; 
}, replace:function(c){
 this.insertBefore(c);c.remove(); 
}, trim:function(){
 this.ltrim();this.rtrim(); 
}, ltrim:function(){
 for(var c;this.getFirst&&(c=this.getFirst());){
 if(c.type==CKEDITOR.NODE_TEXT){
 const h=CKEDITOR.tools.ltrim(c.getText()), g=c.getLength();if(h)h.length<g&&(c.split(g-h.length), this.$.removeChild(this.$.firstChild));else{
 c.remove();continue; 
} 
}break; 
} 
}, rtrim:function(){
 for(var c;this.getLast&&(c=this.getLast());){
 if(c.type==CKEDITOR.NODE_TEXT){
 const h=CKEDITOR.tools.rtrim(c.getText()),
    g=c.getLength();if(h)h.length<g&&(c.split(h.length), this.$.lastChild.parentNode.removeChild(this.$.lastChild));else{
 c.remove();continue; 
} 
}break; 
}CKEDITOR.env.needsBrFiller&&(c=this.$.lastChild)&&1==c.type&&'br'==c.nodeName.toLowerCase()&&c.parentNode.removeChild(c); 
}, isReadOnly:function(c){
 let h=this;this.type!=CKEDITOR.NODE_ELEMENT&&(h=this.getParent());CKEDITOR.env.edge&&h&&h.is('textarea', 'input')&&(c=!0);if(!c&&h&&'undefined'!==typeof h.$.isContentEditable)return!(h.$.isContentEditable||h.data('cke-editable'));
    for(;h;){
 if(h.data('cke-editable'))return!1;if(h.hasAttribute('contenteditable'))return'false'==h.getAttribute('contenteditable');h=h.getParent(); 
}return!0; 
}}), CKEDITOR.dom.window=function(c){
 CKEDITOR.dom.domObject.call(this, c); 
}, CKEDITOR.dom.window.prototype=new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {focus:function(){
 this.$.focus(); 
}, getViewPaneSize:function(){
 const c=this.$.document, h='CSS1Compat'==c.compatMode;return{width:(h?c.documentElement.clientWidth:c.body.clientWidth)||
    0, height:(h?c.documentElement.clientHeight:c.body.clientHeight)||0}; 
}, getScrollPosition:function(){
 let c=this.$;if('pageXOffset'in c)return{x:c.pageXOffset||0, y:c.pageYOffset||0};c=c.document;return{x:c.documentElement.scrollLeft||c.body.scrollLeft||0, y:c.documentElement.scrollTop||c.body.scrollTop||0}; 
}, getFrame:function(){
 const c=this.$.frameElement;return c?new CKEDITOR.dom.element.get(c):null; 
}}), CKEDITOR.dom.document=function(c){
 CKEDITOR.dom.domObject.call(this, c); 
}, CKEDITOR.dom.document.prototype=
    new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {type:CKEDITOR.NODE_DOCUMENT, appendStyleSheet:function(c){
 if(this.$.createStyleSheet)this.$.createStyleSheet(c);else{
 const h=new CKEDITOR.dom.element('link');h.setAttributes({rel:'stylesheet', type:'text/css', href:c});this.getHead().append(h); 
} 
}, appendStyleText:function(c){
 if(this.$.createStyleSheet){
 var h=this.$.createStyleSheet('');h.cssText=c; 
}else{
 var g=new CKEDITOR.dom.element('style', this);g.append(new CKEDITOR.dom.text(c,
    this));this.getHead().append(g); 
}return h||g.$.sheet; 
}, createElement:function(c, h){
 const g=new CKEDITOR.dom.element(c, this);h&&(h.attributes&&g.setAttributes(h.attributes), h.styles&&g.setStyles(h.styles));return g; 
}, createText:function(c){
 return new CKEDITOR.dom.text(c, this); 
}, focus:function(){
 this.getWindow().focus(); 
}, getActive:function(){
 let c;try{
 c=this.$.activeElement; 
}catch(h){
 return null; 
}return new CKEDITOR.dom.element(c); 
}, getById:function(c){
 return(c=this.$.getElementById(c))?new CKEDITOR.dom.element(c):
    null; 
}, getByAddress:function(c, h){
 for(var g=this.$.documentElement, a=0;g&&a<c.length;a++){
 const f=c[a];if(h)for(let m=-1, k=0;k<g.childNodes.length;k++){
 const l=g.childNodes[k];if(!0!==h||3!=l.nodeType||!l.previousSibling||3!=l.previousSibling.nodeType)if(m++, m==f){
 g=l;break; 
} 
}else g=g.childNodes[f]; 
}return g?new CKEDITOR.dom.node(g):null; 
}, getElementsByTag:function(c, h){
 CKEDITOR.env.ie&&8>=document.documentMode||!h||(c=`${h}:${c}`);return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(c)); 
}, getHead:function(){
 let c=
    this.$.getElementsByTagName('head')[0];return c=c?new CKEDITOR.dom.element(c):this.getDocumentElement().append(new CKEDITOR.dom.element('head'), !0); 
}, getBody:function(){
 return new CKEDITOR.dom.element(this.$.body); 
}, getDocumentElement:function(){
 return new CKEDITOR.dom.element(this.$.documentElement); 
}, getWindow:function(){
 return new CKEDITOR.dom.window(this.$.parentWindow||this.$.defaultView); 
}, write:function(c){
 this.$.open('text/html', 'replace');CKEDITOR.env.ie&&(c=c.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i,
    `$\x26\n\x3cscript data-cke-temp\x3d"1"\x3e(${CKEDITOR.tools.fixDomain})();\x3c/script\x3e`));this.$.write(c);this.$.close(); 
}, find:function(c){
 return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(c)); 
}, findOne:function(c){
 return(c=this.$.querySelector(c))?new CKEDITOR.dom.element(c):null; 
}, _getHtml5ShivFrag:function(){
 let c=this.getCustomData('html5ShivFrag');c||(c=this.$.createDocumentFragment(), CKEDITOR.tools.enableHtml5Elements(c, !0), this.setCustomData('html5ShivFrag', c));return c; 
}}), CKEDITOR.dom.nodeList=
    function(c){
 this.$=c; 
}, CKEDITOR.dom.nodeList.prototype={count:function(){
 return this.$.length; 
}, getItem:function(c){
 return 0>c||c>=this.$.length?null:(c=this.$[c])?new CKEDITOR.dom.node(c):null; 
}, toArray:function(){
 return CKEDITOR.tools.array.map(this.$, function(c){
 return new CKEDITOR.dom.node(c); 
}); 
}}, CKEDITOR.dom.element=function(c, h){
 'string'===typeof c&&(c=(h?h.$:document).createElement(c));CKEDITOR.dom.domObject.call(this, c); 
}, CKEDITOR.dom.element.get=function(c){
 return(c='string'===typeof c?document.getElementById(c)||
    document.getElementsByName(c)[0]:c)&&(c.$?c:new CKEDITOR.dom.element(c)); 
}, CKEDITOR.dom.element.prototype=new CKEDITOR.dom.node, CKEDITOR.dom.element.createFromHtml=function(c, h){
 const g=new CKEDITOR.dom.element('div', h);g.setHtml(c);return g.getFirst().remove(); 
}, CKEDITOR.dom.element.setMarker=function(c, h, g, a){
 const f=h.getCustomData('list_marker_id')||h.setCustomData('list_marker_id', CKEDITOR.tools.getNextNumber()).getCustomData('list_marker_id'), m=h.getCustomData('list_marker_names')||h.setCustomData('list_marker_names',
    {}).getCustomData('list_marker_names');c[f]=h;m[g]=1;return h.setCustomData(g, a); 
}, CKEDITOR.dom.element.clearAllMarkers=function(c){
 for(const h in c)CKEDITOR.dom.element.clearMarkers(c, c[h], 1); 
}, CKEDITOR.dom.element.clearMarkers=function(c, h, g){
 let a=h.getCustomData('list_marker_names'), f=h.getCustomData('list_marker_id'), m;for(m in a)h.removeCustomData(m);h.removeCustomData('list_marker_names');g&&(h.removeCustomData('list_marker_id'), delete c[f]); 
}, function(){
 function c(a, b){
 return-1<(` ${a} `).replace(m,
    ' ').indexOf(` ${b} `); 
}function h(a){
 let b=!0;a.$.id||(a.$.id=`cke_tmp_${CKEDITOR.tools.getNextNumber()}`, b=!1);return function(){
 b||a.removeAttribute('id'); 
}; 
}function g(a, b){
 const d=CKEDITOR.tools.escapeCss(a.$.id);return`#${d} ${b.split(/,\s*/).join(`, #${d} `)}`; 
}function a(a){
 for(var b=0, d=0, e=k[a].length;d<e;d++)b+=parseFloat(this.getComputedStyle(k[a][d])||0, 10)||0;return b; 
}var f=document.createElement('_').classList, f='undefined'!==typeof f&&null!==String(f.add).match(/\[Native code\]/gi), m=/[\n\t\r]/g;
    CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {type:CKEDITOR.NODE_ELEMENT, addClass:f?function(a){
 this.$.classList.add(a);return this; 
}:function(a){
 let b=this.$.className;b&&(c(b, a)||(b+=` ${a}`));this.$.className=b||a;return this; 
}, removeClass:f?function(a){
 const b=this.$;b.classList.remove(a);b.className||b.removeAttribute('class');return this; 
}:function(a){
 let b=this.getAttribute('class');b&&c(b, a)&&((b=b.replace(new RegExp(`(?:^|\\s+)${a}(?\x3d\\s|$)`), '').replace(/^\s+/, ''))?this.setAttribute('class',
    b):this.removeAttribute('class'));return this; 
}, hasClass:function(a){
 return c(this.$.className, a); 
}, append:function(a, b){
 'string'===typeof a&&(a=this.getDocument().createElement(a));b?this.$.insertBefore(a.$, this.$.firstChild):this.$.appendChild(a.$);return a; 
}, appendHtml:function(a){
 if(this.$.childNodes.length){
 const b=new CKEDITOR.dom.element('div', this.getDocument());b.setHtml(a);b.moveChildren(this); 
}else this.setHtml(a); 
}, appendText:function(a){
 null!=this.$.text&&CKEDITOR.env.ie&&9>CKEDITOR.env.version?
    this.$.text+=a:this.append(new CKEDITOR.dom.text(a)); 
}, appendBogus:function(a){
 if(a||CKEDITOR.env.needsBrFiller){
 for(a=this.getLast();a&&a.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.rtrim(a.getText());)a=a.getPrevious();a&&a.is&&a.is('br')||(a=this.getDocument().createElement('br'), CKEDITOR.env.gecko&&a.setAttribute('type', '_moz'), this.append(a)); 
} 
}, breakParent:function(a, b){
 let d=new CKEDITOR.dom.range(this.getDocument());d.setStartAfter(this);d.setEndAfter(a);let e=d.extractContents(!1, b||!1), f;d.insertNode(this.remove());
    if(CKEDITOR.env.ie&&!CKEDITOR.env.edge){
 for(d=new CKEDITOR.dom.element('div');f=e.getFirst();)f.$.style.backgroundColor&&(f.$.style.backgroundColor=f.$.style.backgroundColor), d.append(f);d.insertAfter(this);d.remove(!0); 
}else e.insertAfterNode(this); 
}, contains:document.compareDocumentPosition?function(a){
 return!!(this.$.compareDocumentPosition(a.$)&16); 
}:function(a){
 const b=this.$;return a.type!=CKEDITOR.NODE_ELEMENT?b.contains(a.getParent().$):b!=a.$&&b.contains(a.$); 
}, focus:function(){
 function a(){
 try{
 this.$.focus(); 
}catch(b){} 
}
    return function(b){
 b?CKEDITOR.tools.setTimeout(a, 100, this):a.call(this); 
}; 
}(), getHtml:function(){
 const a=this.$.innerHTML;return CKEDITOR.env.ie?a.replace(/<\?[^>]*>/g, ''):a; 
}, getOuterHtml:function(){
 if(this.$.outerHTML)return this.$.outerHTML.replace(/<\?[^>]*>/, '');const a=this.$.ownerDocument.createElement('div');a.appendChild(this.$.cloneNode(!0));return a.innerHTML; 
}, getClientRect:function(a){
 const b=CKEDITOR.tools.extend({}, this.$.getBoundingClientRect());!b.width&&(b.width=b.right-b.left);!b.height&&
    (b.height=b.bottom-b.top);return a?CKEDITOR.tools.getAbsoluteRectPosition(this.getWindow(), b):b; 
}, setHtml:CKEDITOR.env.ie&&9>CKEDITOR.env.version?function(a){
 try{
 var b=this.$;if(this.getParent())return b.innerHTML=a;const d=this.getDocument()._getHtml5ShivFrag();d.appendChild(b);b.innerHTML=a;d.removeChild(b);return a; 
}catch(e){
 this.$.innerHTML='';b=new CKEDITOR.dom.element('body', this.getDocument());b.$.innerHTML=a;for(b=b.getChildren();b.count();)this.append(b.getItem(0));return a; 
} 
}:function(a){
 return this.$.innerHTML=
    a; 
}, setText:function(){
 let a=document.createElement('p');a.innerHTML='x';a=a.textContent;return function(b){
 this.$[a?'textContent':'innerText']=b; 
}; 
}(), getAttribute:function(){
 const a=function(a){
 return this.$.getAttribute(a, 2); 
};return CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(a){
 switch(a){
 case 'class':a='className';break;case 'http-equiv':a='httpEquiv';break;case 'name':return this.$.name;case 'tabindex':return a=this.$.getAttribute(a, 2), 0!==a&&0===this.$.tabIndex&&(a=null),
    a;case 'checked':return a=this.$.attributes.getNamedItem(a), (a.specified?a.nodeValue:this.$.checked)?'checked':null;case 'hspace':case 'value':return this.$[a];case 'style':return this.$.style.cssText;case 'contenteditable':case 'contentEditable':return this.$.attributes.getNamedItem('contentEditable').specified?this.$.getAttribute('contentEditable'):null; 
}return this.$.getAttribute(a, 2); 
}:a; 
}(), getAttributes:function(a){
 let b={}, d=this.$.attributes, e;a=CKEDITOR.tools.isArray(a)?a:[];for(e=0;e<d.length;e++)-1===
    CKEDITOR.tools.indexOf(a, d[e].name)&&(b[d[e].name]=d[e].value);return b; 
}, getChildren:function(){
 return new CKEDITOR.dom.nodeList(this.$.childNodes); 
}, getClientSize:function(){
 return{width:this.$.clientWidth, height:this.$.clientHeight}; 
}, getComputedStyle:document.defaultView&&document.defaultView.getComputedStyle?function(a){
 const b=this.getWindow().$.getComputedStyle(this.$, null);return b?b.getPropertyValue(a):''; 
}:function(a){
 return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)]; 
}, getDtd:function(){
 const a=
    CKEDITOR.dtd[this.getName()];this.getDtd=function(){
 return a; 
};return a; 
}, getElementsByTag:CKEDITOR.dom.document.prototype.getElementsByTag, getTabIndex:function(){
 const a=this.$.tabIndex;return 0!==a||CKEDITOR.dtd.$tabIndex[this.getName()]||0===parseInt(this.getAttribute('tabindex'), 10)?a:-1; 
}, getText:function(){
 return this.$.textContent||this.$.innerText||''; 
}, getWindow:function(){
 return this.getDocument().getWindow(); 
}, getId:function(){
 return this.$.id||null; 
}, getNameAtt:function(){
 return this.$.name||
    null; 
}, getName:function(){
 let a=this.$.nodeName.toLowerCase();if(CKEDITOR.env.ie&&8>=document.documentMode){
 const b=this.$.scopeName;'HTML'!=b&&(a=`${b.toLowerCase()}:${a}`); 
}this.getName=function(){
 return a; 
};return this.getName(); 
}, getValue:function(){
 return this.$.value; 
}, getFirst:function(a){
 let b=this.$.firstChild;(b=b&&new CKEDITOR.dom.node(b))&&a&&!a(b)&&(b=b.getNext(a));return b; 
}, getLast:function(a){
 let b=this.$.lastChild;(b=b&&new CKEDITOR.dom.node(b))&&a&&!a(b)&&(b=b.getPrevious(a));return b; 
}, getStyle:function(a){
 return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)]; 
},
    is:function(){
 const a=this.getName();if('object'===typeof arguments[0])return!!arguments[0][a];for(let b=0;b<arguments.length;b++)if(arguments[b]==a)return!0;return!1; 
}, isEditable:function(a){
 const b=this.getName();return this.isReadOnly()||'none'==this.getComputedStyle('display')||'hidden'==this.getComputedStyle('visibility')||CKEDITOR.dtd.$nonEditable[b]||CKEDITOR.dtd.$empty[b]||this.is('a')&&(this.data('cke-saved-name')||this.hasAttribute('name'))&&!this.getChildCount()?!1:!1!==a?(a=CKEDITOR.dtd[b]||
    CKEDITOR.dtd.span, !(!a||!a['#'])):!0; 
}, isIdentical:function(a){
 let b=this.clone(0, 1);a=a.clone(0, 1);b.removeAttributes(['_moz_dirty', 'data-cke-expando', 'data-cke-saved-href', 'data-cke-saved-name']);a.removeAttributes(['_moz_dirty', 'data-cke-expando', 'data-cke-saved-href', 'data-cke-saved-name']);if(b.$.isEqualNode)return b.$.style.cssText=CKEDITOR.tools.normalizeCssText(b.$.style.cssText), a.$.style.cssText=CKEDITOR.tools.normalizeCssText(a.$.style.cssText), b.$.isEqualNode(a.$);b=b.getOuterHtml();a=
    a.getOuterHtml();if(CKEDITOR.env.ie&&9>CKEDITOR.env.version&&this.is('a')){
 let d=this.getParent();d.type==CKEDITOR.NODE_ELEMENT&&(d=d.clone(), d.setHtml(b), b=d.getHtml(), d.setHtml(a), a=d.getHtml()); 
}return b==a; 
}, isVisible:function(){
 let a=(this.$.offsetHeight||this.$.offsetWidth)&&'hidden'!=this.getComputedStyle('visibility'), b, d;a&&CKEDITOR.env.webkit&&(b=this.getWindow(), !b.equals(CKEDITOR.document.getWindow())&&(d=b.$.frameElement)&&(a=(new CKEDITOR.dom.element(d)).isVisible()));return!!a; 
}, isEmptyInlineRemoveable:function(){
 if(!CKEDITOR.dtd.$removeEmpty[this.getName()])return!1;
    for(let a=this.getChildren(), b=0, d=a.count();b<d;b++){
 const e=a.getItem(b);if(e.type!=CKEDITOR.NODE_ELEMENT||!e.data('cke-bookmark'))if(e.type==CKEDITOR.NODE_ELEMENT&&!e.isEmptyInlineRemoveable()||e.type==CKEDITOR.NODE_TEXT&&CKEDITOR.tools.trim(e.getText()))return!1; 
}return!0; 
}, hasAttributes:CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(){
 for(let a=this.$.attributes, b=0;b<a.length;b++){
 const d=a[b];switch(d.nodeName){
 case 'class':if(this.getAttribute('class'))return!0;case 'data-cke-expando':continue;
    default:if(d.specified)return!0; 
} 
}return!1; 
}:function(){
 const a=this.$.attributes, b=a.length, d={'data-cke-expando':1, _moz_dirty:1};return 0<b&&(2<b||!d[a[0].nodeName]||2==b&&!d[a[1].nodeName]); 
}, hasAttribute:function(){
 function a(b){
 const d=this.$.attributes.getNamedItem(b);if('input'==this.getName())switch(b){
 case 'class':return 0<this.$.className.length;case 'checked':return!!this.$.checked;case 'value':return b=this.getAttribute('type'), 'checkbox'==b||'radio'==b?'on'!=this.$.value:!!this.$.value; 
}return d?
    d.specified:!1; 
}return CKEDITOR.env.ie?8>CKEDITOR.env.version?function(b){
 return'name'==b?!!this.$.name:a.call(this, b); 
}:a:function(a){
 return!!this.$.attributes.getNamedItem(a); 
}; 
}(), hide:function(){
 this.setStyle('display', 'none'); 
}, moveChildren:function(a, b){
 const d=this.$;a=a.$;if(d!=a){
 let e;if(b)for(;e=d.lastChild;)a.insertBefore(d.removeChild(e), a.firstChild);else for(;e=d.firstChild;)a.appendChild(d.removeChild(e)); 
} 
}, mergeSiblings:function(){
 function a(b, d, e){
 if(d&&d.type==CKEDITOR.NODE_ELEMENT){
 for(var f=
    [];d.data('cke-bookmark')||d.isEmptyInlineRemoveable();)if(f.push(d), d=e?d.getNext():d.getPrevious(), !d||d.type!=CKEDITOR.NODE_ELEMENT)return;if(b.isIdentical(d)){
 for(var c=e?b.getLast():b.getFirst();f.length;)f.shift().move(b, !e);d.moveChildren(b, !e);d.remove();c&&c.type==CKEDITOR.NODE_ELEMENT&&c.mergeSiblings(); 
} 
} 
}return function(b){
 if(!1===b||CKEDITOR.dtd.$removeEmpty[this.getName()]||this.is('a'))a(this, this.getNext(), !0), a(this, this.getPrevious()); 
}; 
}(), show:function(){
 this.setStyles({display:'',
    visibility:''}); 
}, setAttribute:function(){
 const a=function(a, d){
 this.$.setAttribute(a, d);return this; 
};return CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(b, d){
 'class'==b?this.$.className=d:'style'==b?this.$.style.cssText=d:'tabindex'==b?this.$.tabIndex=d:'checked'==b?this.$.checked=d:'contenteditable'==b?a.call(this, 'contentEditable', d):a.apply(this, arguments);return this; 
}:CKEDITOR.env.ie8Compat&&CKEDITOR.env.secure?function(b, d){
 if('src'==b&&d.match(/^http:\/\//))try{
 a.apply(this,
    arguments); 
}catch(e){}else a.apply(this, arguments);return this; 
}:a; 
}(), setAttributes:function(a){
 for(const b in a)this.setAttribute(b, a[b]);return this; 
}, setValue:function(a){
 this.$.value=a;return this; 
}, removeAttribute:function(){
 const a=function(a){
 this.$.removeAttribute(a); 
};return CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(a){
 'class'==a?a='className':'tabindex'==a?a='tabIndex':'contenteditable'==a&&(a='contentEditable');this.$.removeAttribute(a); 
}:a; 
}(), removeAttributes:function(a){
 if(CKEDITOR.tools.isArray(a))for(var b=
    0;b<a.length;b++)this.removeAttribute(a[b]);else for(b in a=a||this.getAttributes(), a)a.hasOwnProperty(b)&&this.removeAttribute(b); 
}, removeStyle:function(a){
 var b=this.$.style;if(b.removeProperty||'border'!=a&&'margin'!=a&&'padding'!=a)b.removeProperty?b.removeProperty(a):b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a)), this.$.style.cssText||this.removeAttribute('style');else{
 let d=['top', 'left', 'right', 'bottom'], e;'border'==a&&(e=['color', 'style', 'width']);for(var b=[], f=0;f<d.length;f++)if(e)for(let c=
    0;c<e.length;c++)b.push([a, d[f], e[c]].join('-'));else b.push([a, d[f]].join('-'));for(a=0;a<b.length;a++)this.removeStyle(b[a]); 
} 
}, setStyle:function(a, b){
 this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)]=b;return this; 
}, setStyles:function(a){
 for(const b in a)this.setStyle(b, a[b]);return this; 
}, setOpacity:function(a){
 CKEDITOR.env.ie&&9>CKEDITOR.env.version?(a=Math.round(100*a), this.setStyle('filter', 100<=a?'':`progid:DXImageTransform.Microsoft.Alpha(opacity\x3d${a})`)):this.setStyle('opacity', a); 
}, unselectable:function(){
 this.setStyles(CKEDITOR.tools.cssVendorPrefix('user-select',
    'none'));if(CKEDITOR.env.ie){
 this.setAttribute('unselectable', 'on');for(var a, b=this.getElementsByTag('*'), d=0, e=b.count();d<e;d++)a=b.getItem(d), a.setAttribute('unselectable', 'on'); 
} 
}, getPositionedAncestor:function(){
 for(let a=this;'html'!=a.getName();){
 if('static'!=a.getComputedStyle('position'))return a;a=a.getParent(); 
}return null; 
}, getDocumentPosition:function(a){
 let b=0, d=0, e=this.getDocument(), f=e.getBody(), c='BackCompat'==e.$.compatMode;if(document.documentElement.getBoundingClientRect&&(CKEDITOR.env.ie?
    8!==CKEDITOR.env.version:1)){
 var g=this.$.getBoundingClientRect(), k=e.$.documentElement, h=k.clientTop||f.$.clientTop||0, m=k.clientLeft||f.$.clientLeft||0, w=!0;CKEDITOR.env.ie&&(w=e.getDocumentElement().contains(this), e=e.getBody().contains(this), w=c&&e||!c&&w);w&&(CKEDITOR.env.webkit||CKEDITOR.env.ie&&12<=CKEDITOR.env.version?(b=f.$.scrollLeft||k.scrollLeft, d=f.$.scrollTop||k.scrollTop):(d=c?f.$:k, b=d.scrollLeft, d=d.scrollTop), b=g.left+b-m, d=g.top+d-h); 
}else for(h=this, m=null;h&&'body'!=h.getName()&&
    'html'!=h.getName();){
 b+=h.$.offsetLeft-h.$.scrollLeft;d+=h.$.offsetTop-h.$.scrollTop;h.equals(this)||(b+=h.$.clientLeft||0, d+=h.$.clientTop||0);for(;m&&!m.equals(h);)b-=m.$.scrollLeft, d-=m.$.scrollTop, m=m.getParent();m=h;h=(g=h.$.offsetParent)?new CKEDITOR.dom.element(g):null; 
}a&&(g=this.getWindow(), h=a.getWindow(), !g.equals(h)&&g.$.frameElement&&(a=(new CKEDITOR.dom.element(g.$.frameElement)).getDocumentPosition(a), b+=a.x, d+=a.y));document.documentElement.getBoundingClientRect||!CKEDITOR.env.gecko||
    c||(b+=this.$.clientLeft?1:0, d+=this.$.clientTop?1:0);return{x:b, y:d}; 
}, scrollIntoView:function(a){
 let b=this.getParent();if(b){
 do if((b.$.clientWidth&&b.$.clientWidth<b.$.scrollWidth||b.$.clientHeight&&b.$.clientHeight<b.$.scrollHeight)&&!b.is('body')&&this.scrollIntoParent(b, a, 1), b.is('html')){
 const d=b.getWindow();try{
 const e=d.$.frameElement;e&&(b=new CKEDITOR.dom.element(e)); 
}catch(f){} 
}while(b=b.getParent()); 
} 
}, scrollIntoParent:function(a, b, d){
 let e, f, c, g;function k(e, b){
 /body|html/.test(a.getName())?
    a.getWindow().$.scrollBy(e, b):(a.$.scrollLeft+=e, a.$.scrollTop+=b); 
}function h(e, a){
 const b={x:0, y:0};if(!e.is(w?'body':'html')){
 var d=e.$.getBoundingClientRect();b.x=d.left;b.y=d.top; 
}d=e.getWindow();d.equals(a)||(d=h(CKEDITOR.dom.element.get(d.$.frameElement), a), b.x+=d.x, b.y+=d.y);return b; 
}function m(e, a){
 return parseInt(e.getComputedStyle(`margin-${a}`)||0, 10)||0; 
}!a&&(a=this.getWindow());c=a.getDocument();var w='BackCompat'==c.$.compatMode;a instanceof CKEDITOR.dom.window&&(a=w?c.getBody():c.getDocumentElement());
    CKEDITOR.env.webkit&&(c=this.getEditor(!1))&&(c._.previousScrollTop=null);c=a.getWindow();f=h(this, c);const u=h(a, c), A=this.$.offsetHeight;e=this.$.offsetWidth;const r=a.$.clientHeight, y=a.$.clientWidth;c=f.x-m(this, 'left')-u.x||0;g=f.y-m(this, 'top')-u.y||0;e=f.x+e+m(this, 'right')-(u.x+y)||0;f=f.y+A+m(this, 'bottom')-(u.y+r)||0;(0>g||0<f)&&k(0, !0===b?g:!1===b?f:0>g?g:f);d&&(0>c||0<e)&&k(0>c?c:e, 0); 
}, setState:function(a, b, d){
 b=b||'cke';switch(a){
 case CKEDITOR.TRISTATE_ON:this.addClass(`${b}_on`);this.removeClass(`${b
    }_off`);this.removeClass(`${b}_disabled`);d&&this.setAttribute('aria-pressed', !0);d&&this.removeAttribute('aria-disabled');break;case CKEDITOR.TRISTATE_DISABLED:this.addClass(`${b}_disabled`);this.removeClass(`${b}_off`);this.removeClass(`${b}_on`);d&&this.setAttribute('aria-disabled', !0);d&&this.removeAttribute('aria-pressed');break;default:this.addClass(`${b}_off`), this.removeClass(`${b}_on`), this.removeClass(`${b}_disabled`), d&&this.removeAttribute('aria-pressed'), d&&this.removeAttribute('aria-disabled'); 
} 
},
    getFrameDocument:function(){
 const a=this.$;try{
 a.contentWindow.document; 
}catch(b){
 a.src=a.src; 
}return a&&new CKEDITOR.dom.document(a.contentWindow.document); 
}, copyAttributes:function(a, b){
 const d=this.$.attributes;b=b||{};for(let e=0;e<d.length;e++){
 var f=d[e], c=f.nodeName.toLowerCase(), g;if(!(c in b))if('checked'==c&&(g=this.getAttribute(c)))a.setAttribute(c, g);else if(!CKEDITOR.env.ie||this.hasAttribute(c))g=this.getAttribute(c), null===g&&(g=f.nodeValue), a.setAttribute(c, g); 
}''!==this.$.style.cssText&&
    (a.$.style.cssText=this.$.style.cssText); 
}, renameNode:function(a){
 if(this.getName()!=a){
 const b=this.getDocument();a=new CKEDITOR.dom.element(a, b);this.copyAttributes(a);this.moveChildren(a);this.getParent(!0)&&this.$.parentNode.replaceChild(a.$, this.$);a.$['data-cke-expando']=this.$['data-cke-expando'];this.$=a.$;delete this.getName; 
} 
}, getChild:function(){
 function a(b, d){
 const e=b.childNodes;if(0<=d&&d<e.length)return e[d]; 
}return function(b){
 let d=this.$;if(b.slice)for(b=b.slice();0<b.length&&d;)d=a(d,
    b.shift());else d=a(d, b);return d?new CKEDITOR.dom.node(d):null; 
}; 
}(), getChildCount:function(){
 return this.$.childNodes.length; 
}, disableContextMenu:function(){
 function a(b){
 return b.type==CKEDITOR.NODE_ELEMENT&&b.hasClass('cke_enable_context_menu'); 
}this.on('contextmenu', function(b){
 b.data.getTarget().getAscendant(a, !0)||b.data.preventDefault(); 
}); 
}, getDirection:function(a){
 return a?this.getComputedStyle('direction')||this.getDirection()||this.getParent()&&this.getParent().getDirection(1)||this.getDocument().$.dir||
    'ltr':this.getStyle('direction')||this.getAttribute('dir'); 
}, data:function(a, b){
 a=`data-${a}`;if(void 0===b)return this.getAttribute(a);!1===b?this.removeAttribute(a):this.setAttribute(a, b);return null; 
}, getEditor:function(a){
 let b=CKEDITOR.instances, d, e, f;a=a||void 0===a;for(d in b)if(e=b[d], e.element.equals(this)&&e.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO||!a&&(f=e.editable())&&(f.equals(this)||f.contains(this)))return e;return null; 
}, find:function(a){
 const b=h(this);a=new CKEDITOR.dom.nodeList(this.$.querySelectorAll(g(this,
    a)));b();return a; 
}, findOne:function(a){
 const b=h(this);a=this.$.querySelector(g(this, a));b();return a?new CKEDITOR.dom.element(a):null; 
}, forEach:function(a, b, d){
 if(!(d||b&&this.type!=b))var e=a(this);if(!1!==e){
 d=this.getChildren();for(let f=0;f<d.count();f++)e=d.getItem(f), e.type==CKEDITOR.NODE_ELEMENT?e.forEach(a, b):b&&e.type!=b||a(e); 
} 
}, fireEventHandler:function(a, b){
 const d=`on${a}`, e=this.$;if(CKEDITOR.env.ie&&9>CKEDITOR.env.version){
 let f=e.ownerDocument.createEventObject(), c;for(c in b)f[c]=b[c];e.fireEvent(d,
    f); 
}else e[e[a]?a:d](b); 
}, isDetached:function(){
 const a=this.getDocument(), b=a.getDocumentElement();return b.equals(this)||b.contains(this)?!CKEDITOR.env.ie||8<CKEDITOR.env.version&&!CKEDITOR.env.quirks?!a.$.defaultView:!1:!0; 
}});var k={width:['border-left-width', 'border-right-width', 'padding-left', 'padding-right'], height:['border-top-width', 'border-bottom-width', 'padding-top', 'padding-bottom']};CKEDITOR.dom.element.prototype.setSize=function(f, b, d){
 'number'===typeof b&&(!d||CKEDITOR.env.ie&&CKEDITOR.env.quirks||
    (b-=a.call(this, f)), this.setStyle(f, `${b}px`)); 
};CKEDITOR.dom.element.prototype.getSize=function(f, b){
 let d=Math.max(this.$[`offset${CKEDITOR.tools.capitalize(f)}`], this.$[`client${CKEDITOR.tools.capitalize(f)}`])||0;b&&(d-=a.call(this, f));return d; 
}; 
}(), CKEDITOR.dom.documentFragment=function(c){
 c=c||CKEDITOR.document;this.$=c.type==CKEDITOR.NODE_DOCUMENT?c.$.createDocumentFragment():c; 
}, CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, {type:CKEDITOR.NODE_DOCUMENT_FRAGMENT,
    insertAfterNode:function(c){
 c=c.$;c.parentNode.insertBefore(this.$, c.nextSibling); 
}, getHtml:function(){
 const c=new CKEDITOR.dom.element('div');this.clone(1, 1).appendTo(c);return c.getHtml().replace(/\s*data-cke-expando=".*?"/g, ''); 
}}, !0, {append:1, appendBogus:1, clone:1, getFirst:1, getHtml:1, getLast:1, getParent:1, getNext:1, getPrevious:1, appendTo:1, moveChildren:1, insertBefore:1, insertAfterNode:1, replace:1, trim:1, type:1, ltrim:1, rtrim:1, getDocument:1, getChildCount:1, getChild:1, getChildren:1}), CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype,
    CKEDITOR.dom.document.prototype, !0, {find:1, findOne:1}), function(){
 function c(a, e){
 const b=this.range;if(this._.end)return null;if(!this._.start){
 this._.start=1;if(b.collapsed)return this.end(), null;b.optimize(); 
}let d, f=b.startContainer;d=b.endContainer;let c=b.startOffset, g=b.endOffset, n, k=this.guard, h=this.type, l=a?'getPreviousSourceNode':'getNextSourceNode';if(!a&&!this._.guardLTR){
 const m=d.type==CKEDITOR.NODE_ELEMENT?d:d.getParent(), C=d.type==CKEDITOR.NODE_ELEMENT?d.getChild(g):d.getNext();this._.guardLTR=
    function(a, e){
 return(!e||!m.equals(a))&&(!C||!a.equals(C))&&(a.type!=CKEDITOR.NODE_ELEMENT||!e||!a.equals(b.root)); 
}; 
}if(a&&!this._.guardRTL){
 const E=f.type==CKEDITOR.NODE_ELEMENT?f:f.getParent(), F=f.type==CKEDITOR.NODE_ELEMENT?c?f.getChild(c-1):null:f.getPrevious();this._.guardRTL=function(a, e){
 return(!e||!E.equals(a))&&(!F||!a.equals(F))&&(a.type!=CKEDITOR.NODE_ELEMENT||!e||!a.equals(b.root)); 
}; 
}const I=a?this._.guardRTL:this._.guardLTR;n=k?function(a, e){
 return!1===I(a, e)?!1:k(a, e); 
}:I;this.current?d=this.current[l](!1,
    h, n):(a?d.type==CKEDITOR.NODE_ELEMENT&&(d=0<g?d.getChild(g-1):!1===n(d, !0)?null:d.getPreviousSourceNode(!0, h, n)):(d=f, d.type==CKEDITOR.NODE_ELEMENT&&((d=d.getChild(c))||(d=!1===n(f, !0)?null:f.getNextSourceNode(!0, h, n)))), d&&!1===n(d)&&(d=null));for(;d&&!this._.end;){
 this.current=d;if(!this.evaluator||!1!==this.evaluator(d)){
 if(!e)return d; 
}else if(e&&this.evaluator)return!1;d=d[l](!1, h, n); 
}this.end();return this.current=null; 
}function h(a){
 for(var e, b=null;e=c.call(this, a);)b=e;return b; 
}CKEDITOR.dom.walker=
    CKEDITOR.tools.createClass({$:function(a){
 this.range=a;this._={}; 
}, proto:{end:function(){
 this._.end=1; 
}, next:function(){
 return c.call(this); 
}, previous:function(){
 return c.call(this, 1); 
}, checkForward:function(){
 return!1!==c.call(this, 0, 1); 
}, checkBackward:function(){
 return!1!==c.call(this, 1, 1); 
}, lastForward:function(){
 return h.call(this); 
}, lastBackward:function(){
 return h.call(this, 1); 
}, reset:function(){
 delete this.current;this._={}; 
}}});const g={block:1, 'list-item':1, table:1, 'table-row-group':1, 'table-header-group':1,
    'table-footer-group':1, 'table-row':1, 'table-column-group':1, 'table-column':1, 'table-cell':1, 'table-caption':1}, a={absolute:1, fixed:1};CKEDITOR.dom.element.prototype.isBlockBoundary=function(e){
 return'none'!=this.getComputedStyle('float')||this.getComputedStyle('position')in a||!g[this.getComputedStyle('display')]?!!(this.is(CKEDITOR.dtd.$block)||e&&this.is(e)):!0; 
};CKEDITOR.dom.walker.blockBoundary=function(a){
 return function(e){
 return!(e.type==CKEDITOR.NODE_ELEMENT&&e.isBlockBoundary(a)); 
}; 
};CKEDITOR.dom.walker.listItemBoundary=
    function(){
 return this.blockBoundary({br:1}); 
};CKEDITOR.dom.walker.bookmark=function(a, e){
 function b(a){
 return a&&a.getName&&'span'==a.getName()&&a.data('cke-bookmark'); 
}return function(d){
 let f, c;f=d&&d.type!=CKEDITOR.NODE_ELEMENT&&(c=d.getParent())&&b(c);f=a?f:f||b(d);return!!(e^f); 
}; 
};CKEDITOR.dom.walker.whitespaces=function(a){
 return function(e){
 let b;e&&e.type==CKEDITOR.NODE_TEXT&&(b=!CKEDITOR.tools.trim(e.getText())||CKEDITOR.env.webkit&&e.getText()==CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE);
    return!!(a^b); 
}; 
};CKEDITOR.dom.walker.invisible=function(a){
 const e=CKEDITOR.dom.walker.whitespaces(), b=CKEDITOR.env.webkit?1:0;return function(d){
 e(d)?d=1:(d.type==CKEDITOR.NODE_TEXT&&(d=d.getParent()), d=d.$.offsetWidth<=b);return!!(a^d); 
}; 
};CKEDITOR.dom.walker.nodeType=function(a, e){
 return function(b){
 return!!(e^b.type==a); 
}; 
};CKEDITOR.dom.walker.bogus=function(a){
 function e(a){
 return!m(a)&&!k(a); 
}return function(b){
 let d=CKEDITOR.env.needsBrFiller?b.is&&b.is('br'):b.getText&&f.test(b.getText());d&&(d=b.getParent(),
    b=b.getNext(e), d=d.isBlockBoundary()&&(!b||b.type==CKEDITOR.NODE_ELEMENT&&b.isBlockBoundary()));return!!(a^d); 
}; 
};CKEDITOR.dom.walker.temp=function(a){
 return function(e){
 e.type!=CKEDITOR.NODE_ELEMENT&&(e=e.getParent());e=e&&e.hasAttribute('data-cke-temp');return!!(a^e); 
}; 
};var f=/^[\t\r\n ]*(?:&nbsp;|\xa0)$/, m=CKEDITOR.dom.walker.whitespaces(), k=CKEDITOR.dom.walker.bookmark(), l=CKEDITOR.dom.walker.temp(), b=function(a){
 return k(a)||m(a)||a.type==CKEDITOR.NODE_ELEMENT&&a.is(CKEDITOR.dtd.$inline)&&!a.is(CKEDITOR.dtd.$empty); 
};
    CKEDITOR.dom.walker.ignored=function(a){
 return function(e){
 e=m(e)||k(e)||l(e);return!!(a^e); 
}; 
};const d=CKEDITOR.dom.walker.ignored();CKEDITOR.dom.walker.empty=function(a){
 return function(e){
 for(let b=0, f=e.getChildCount();b<f;++b)if(!d(e.getChild(b)))return!!a;return!a; 
}; 
};const e=CKEDITOR.dom.walker.empty(), n=CKEDITOR.dom.walker.validEmptyBlockContainers=CKEDITOR.tools.extend(function(a){
 let e={}, b;for(b in a)CKEDITOR.dtd[b]['#']&&(e[b]=1);return e; 
}(CKEDITOR.dtd.$block), {caption:1, td:1, th:1});CKEDITOR.dom.walker.editable=
    function(a){
 return function(b){
 b=d(b)?!1:b.type==CKEDITOR.NODE_TEXT||b.type==CKEDITOR.NODE_ELEMENT&&(b.is(CKEDITOR.dtd.$inline)||b.is('hr')||'false'==b.getAttribute('contenteditable')||!CKEDITOR.env.needsBrFiller&&b.is(n)&&e(b))?!0:!1;return!!(a^b); 
}; 
};CKEDITOR.dom.element.prototype.getBogus=function(){
 let a=this;do a=a.getPreviousSourceNode();while(b(a));return a&&(CKEDITOR.env.needsBrFiller?a.is&&a.is('br'):a.getText&&f.test(a.getText()))?a:!1; 
}; 
}(), CKEDITOR.dom.range=function(c){
 this.endOffset=this.endContainer=
    this.startOffset=this.startContainer=null;this.collapsed=!0;const h=c instanceof CKEDITOR.dom.document;this.document=h?c:c.getDocument();this.root=h?c.getBody():c; 
}, function(){
 function c(a){
 a.collapsed=a.startContainer&&a.endContainer&&a.startContainer.equals(a.endContainer)&&a.startOffset==a.endOffset; 
}function h(a, b, d, f, c){
 function g(a, e, b, d){
 const f=b?a.getPrevious():a.getNext();if(d&&l)return f;r||d?e.append(a.clone(!0, c), b):(a.remove(), m&&e.append(a, b));return f; 
}function k(){
 let a, e, b, d=Math.min(J.length,
    L.length);for(a=0;a<d;a++)if(e=J[a], b=L[a], !e.equals(b))return a;return a-1; 
}function h(){
 let b=Q-1, d=I&&K&&!y.equals(z);b<M-1||b<H-1||d?(d?a.moveToPosition(z, CKEDITOR.POSITION_BEFORE_START):H==b+1&&F?a.moveToPosition(L[b], CKEDITOR.POSITION_BEFORE_END):a.moveToPosition(L[b+1], CKEDITOR.POSITION_BEFORE_START), f&&(b=J[b+1])&&b.type==CKEDITOR.NODE_ELEMENT&&(d=CKEDITOR.dom.element.createFromHtml('\x3cspan data-cke-bookmark\x3d"1" style\x3d"display:none"\x3e\x26nbsp;\x3c/span\x3e', a.document), d.insertAfter(b),
    b.mergeSiblings(!1), a.moveToBookmark({startNode:d}))):a.collapse(!0); 
}a.optimizeBookmark();var l=0===b, m=1==b, r=2==b;b=r||m;var y=a.startContainer, z=a.endContainer, B=a.startOffset, C=a.endOffset, E, F, I, K, D, N;if(r&&z.type==CKEDITOR.NODE_TEXT&&(y.equals(z)||y.type===CKEDITOR.NODE_ELEMENT&&y.getFirst().equals(z)))d.append(a.document.createText(z.substring(B, C)));else{
 z.type==CKEDITOR.NODE_TEXT?r?N=!0:z=z.split(C):0<z.getChildCount()?C>=z.getChildCount()?(z=z.getChild(C-1), F=!0):z=z.getChild(C):K=F=!0;y.type==
    CKEDITOR.NODE_TEXT?r?D=!0:y.split(B):0<y.getChildCount()?0===B?(y=y.getChild(B), E=!0):y=y.getChild(B-1):I=E=!0;for(var J=y.getParents(), L=z.getParents(), Q=k(), M=J.length-1, H=L.length-1, O=d, X, T, Y, ha=-1, W=Q;W<=M;W++){
 T=J[W];Y=T.getNext();for(W!=M||T.equals(L[W])&&M<H?b&&(X=O.append(T.clone(0, c))):E?g(T, O, !1, I):D&&O.append(a.document.createText(T.substring(B)));Y;){
 if(Y.equals(L[W])){
 ha=W;break; 
}Y=g(Y, O); 
}O=X; 
}O=d;for(W=Q;W<=H;W++)if(d=L[W], Y=d.getPrevious(), d.equals(J[W]))b&&(O=O.getChild(0));else{
 W!=
    H||d.equals(J[W])&&H<M?b&&(X=O.append(d.clone(0, c))):F?g(d, O, !1, K):N&&O.append(a.document.createText(d.substring(0, C)));if(W>ha)for(;Y;)Y=g(Y, O, !0);O=X; 
}r||h(); 
} 
}function g(){
 let a=!1, b=CKEDITOR.dom.walker.whitespaces(), d=CKEDITOR.dom.walker.bookmark(!0), f=CKEDITOR.dom.walker.bogus();return function(c){
 return d(c)||b(c)?!0:f(c)&&!a?a=!0:c.type==CKEDITOR.NODE_TEXT&&(c.hasAscendant('pre')||CKEDITOR.tools.trim(c.getText()).length)||c.type==CKEDITOR.NODE_ELEMENT&&!c.is(m)?!1:!0; 
}; 
}function a(a){
 const b=CKEDITOR.dom.walker.whitespaces(),
    d=CKEDITOR.dom.walker.bookmark(1);return function(f){
 return d(f)||b(f)?!0:!a&&k(f)||f.type==CKEDITOR.NODE_ELEMENT&&f.is(CKEDITOR.dtd.$removeEmpty); 
}; 
}function f(a){
 return function(){
 let f;return this[a?'getPreviousNode':'getNextNode'](function(a){
 !f&&d(a)&&(f=a);return b(a)&&!(k(a)&&a.equals(f)); 
}); 
}; 
}var m={abbr:1, acronym:1, b:1, bdo:1, big:1, cite:1, code:1, del:1, dfn:1, em:1, font:1, i:1, ins:1, label:1, kbd:1, q:1, samp:1, small:1, span:1, strike:1, strong:1, sub:1, sup:1, tt:1, u:1, 'var':1}, k=CKEDITOR.dom.walker.bogus(),
    l=/^[\t\r\n ]*(?:&nbsp;|\xa0)$/, b=CKEDITOR.dom.walker.editable(), d=CKEDITOR.dom.walker.ignored(!0);CKEDITOR.dom.range.prototype={clone:function(){
 const a=new CKEDITOR.dom.range(this.root);a._setStartContainer(this.startContainer);a.startOffset=this.startOffset;a._setEndContainer(this.endContainer);a.endOffset=this.endOffset;a.collapsed=this.collapsed;return a; 
}, collapse:function(a){
 a?(this._setEndContainer(this.startContainer), this.endOffset=this.startOffset):(this._setStartContainer(this.endContainer),
    this.startOffset=this.endOffset);this.collapsed=!0; 
}, cloneContents:function(a){
 const b=new CKEDITOR.dom.documentFragment(this.document);this.collapsed||h(this, 2, b, !1, 'undefined'===typeof a?!0:a);return b; 
}, deleteContents:function(a){
 this.collapsed||h(this, 0, null, a); 
}, extractContents:function(a, b){
 const d=new CKEDITOR.dom.documentFragment(this.document);this.collapsed||h(this, 1, d, a, 'undefined'===typeof b?!0:b);return d; 
}, equals:function(a){
 return this.startOffset===a.startOffset&&this.endOffset===a.endOffset&&
    this.startContainer.equals(a.startContainer)&&this.endContainer.equals(a.endContainer); 
}, createBookmark:function(a){
 function b(a){
 return a.getAscendant(function(a){
 let e;if(e=a.data&&a.data('cke-temp'))e=-1===CKEDITOR.tools.array.indexOf(['cke_copybin', 'cke_pastebin'], a.getAttribute('id'));return e; 
}, !0); 
}let d=this.startContainer, f=this.endContainer, c=this.collapsed, g, k, h, l;g=this.document.createElement('span');g.data('cke-bookmark', 1);g.setStyle('display', 'none');g.setHtml('\x26nbsp;');a&&(h=`cke_bm_${
    CKEDITOR.tools.getNextNumber()}`, g.setAttribute('id', h+(c?'C':'S')));c||(k=g.clone(), k.setHtml('\x26nbsp;'), a&&k.setAttribute('id', `${h}E`), l=this.clone(), b(f)&&(f=b(f), l.moveToPosition(f, CKEDITOR.POSITION_AFTER_END)), l.collapse(), l.insertNode(k));l=this.clone();b(d)&&(f=b(d), l.moveToPosition(f, CKEDITOR.POSITION_BEFORE_START));l.collapse(!0);l.insertNode(g);k?(this.setStartAfter(g), this.setEndBefore(k)):this.moveToPosition(g, CKEDITOR.POSITION_AFTER_END);return{startNode:a?h+(c?'C':'S'):g, endNode:a?`${h
    }E`:k, serializable:a, collapsed:c}; 
}, createBookmark2:function(){
 function a(e){
 let b=e.container, f=e.offset, c;c=b;let g=f;c=c.type!=CKEDITOR.NODE_ELEMENT||0===g||g==c.getChildCount()?0:c.getChild(g-1).type==CKEDITOR.NODE_TEXT&&c.getChild(g).type==CKEDITOR.NODE_TEXT;c&&(b=b.getChild(f-1), f=b.getLength());if(b.type==CKEDITOR.NODE_ELEMENT&&0<f){
 a:{
 for(c=b;f--;)if(g=c.getChild(f).getIndex(!0), 0<=g){
 f=g;break a; 
}f=-1; 
}f+=1; 
}if(b.type==CKEDITOR.NODE_TEXT){
 c=b;for(g=0;(c=c.getPrevious())&&c.type==CKEDITOR.NODE_TEXT;)g+=
    c.getText().replace(CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE, '').length;c=g;b.isEmpty()?(g=b.getPrevious(d), c?(f=c, b=g?g.getNext():b.getParent().getFirst()):(b=b.getParent(), f=g?g.getIndex(!0)+1:0)):f+=c; 
}e.container=b;e.offset=f; 
}function b(a, e){
 const d=e.getCustomData('cke-fillingChar');if(d){
 const f=a.container;d.equals(f)&&(a.offset-=CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE.length, 0>=a.offset&&(a.offset=f.getIndex(), a.container=f.getParent())); 
} 
}var d=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT,
    !0);return function(d){
 const f=this.collapsed, c={container:this.startContainer, offset:this.startOffset}, g={container:this.endContainer, offset:this.endOffset};d&&(a(c), b(c, this.root), f||(a(g), b(g, this.root)));return{start:c.container.getAddress(d), end:f?null:g.container.getAddress(d), startOffset:c.offset, endOffset:g.offset, normalized:d, collapsed:f, is2:!0}; 
}; 
}(), moveToBookmark:function(a){
 if(a.is2){
 var b=this.document.getByAddress(a.start, a.normalized), d=a.startOffset, f=a.end&&this.document.getByAddress(a.end,
    a.normalized);a=a.endOffset;this.setStart(b, d);f?this.setEnd(f, a):this.collapse(!0); 
}else b=(d=a.serializable)?this.document.getById(a.startNode):a.startNode, a=d?this.document.getById(a.endNode):a.endNode, this.setStartBefore(b), b.remove(), a?(this.setEndBefore(a), a.remove()):this.collapse(!0); 
}, getBoundaryNodes:function(){
 let a=this.startContainer, b=this.endContainer, d=this.startOffset, f=this.endOffset, c;if(a.type==CKEDITOR.NODE_ELEMENT)if(c=a.getChildCount(), c>d)a=a.getChild(d);else if(1>c)a=a.getPreviousSourceNode();
    else{
 for(a=a.$;a.lastChild;)a=a.lastChild;a=new CKEDITOR.dom.node(a);a=a.getNextSourceNode()||a; 
}if(b.type==CKEDITOR.NODE_ELEMENT)if(c=b.getChildCount(), c>f)b=b.getChild(f).getPreviousSourceNode(!0);else if(1>c)b=b.getPreviousSourceNode();else{
 for(b=b.$;b.lastChild;)b=b.lastChild;b=new CKEDITOR.dom.node(b); 
}a.getPosition(b)&CKEDITOR.POSITION_FOLLOWING&&(a=b);return{startNode:a, endNode:b}; 
}, getCommonAncestor:function(a, b){
 var d=this.startContainer, f=this.endContainer, d=d.equals(f)?a&&d.type==CKEDITOR.NODE_ELEMENT&&
    this.startOffset==this.endOffset-1?d.getChild(this.startOffset):d:d.getCommonAncestor(f);return b&&!d.is?d.getParent():d; 
}, optimize:function(){
 let a=this.startContainer, b=this.startOffset;a.type!=CKEDITOR.NODE_ELEMENT&&(b?b>=a.getLength()&&this.setStartAfter(a):this.setStartBefore(a));a=this.endContainer;b=this.endOffset;a.type!=CKEDITOR.NODE_ELEMENT&&(b?b>=a.getLength()&&this.setEndAfter(a):this.setEndBefore(a)); 
}, optimizeBookmark:function(){
 const a=this.startContainer, b=this.endContainer;a.is&&a.is('span')&&
    a.data('cke-bookmark')&&this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START);b&&b.is&&b.is('span')&&b.data('cke-bookmark')&&this.setEndAt(b, CKEDITOR.POSITION_AFTER_END); 
}, trim:function(a, b){
 var d=this.startContainer, f=this.startOffset, c=this.collapsed;if((!a||c)&&d&&d.type==CKEDITOR.NODE_TEXT){
 if(f)if(f>=d.getLength())f=d.getIndex()+1, d=d.getParent();else{
 var g=d.split(f), f=d.getIndex()+1, d=d.getParent();this.startContainer.equals(this.endContainer)?this.setEnd(g, this.endOffset-this.startOffset):d.equals(this.endContainer)&&
    (this.endOffset+=1); 
}else f=d.getIndex(), d=d.getParent();this.setStart(d, f);if(c){
 this.collapse(!0);return; 
} 
}d=this.endContainer;f=this.endOffset;b||c||!d||d.type!=CKEDITOR.NODE_TEXT||(f?(f>=d.getLength()||d.split(f), f=d.getIndex()+1):f=d.getIndex(), d=d.getParent(), this.setEnd(d, f)); 
}, enlarge:function(a, b){
 function d(a){
 return a&&a.type==CKEDITOR.NODE_ELEMENT&&a.hasAttribute('contenteditable')?null:a; 
}const f=new RegExp(/[^\s\ufeff]/);switch(a){
 case CKEDITOR.ENLARGE_INLINE:var c=1;case CKEDITOR.ENLARGE_ELEMENT:var g=
    function(a, e){
 var b=new CKEDITOR.dom.range(h);b.setStart(a, e);b.setEndAt(h, CKEDITOR.POSITION_BEFORE_END);var b=new CKEDITOR.dom.walker(b), d;for(b.guard=function(a){
 return!(a.type==CKEDITOR.NODE_ELEMENT&&a.isBlockBoundary()); 
};d=b.next();){
 if(d.type!=CKEDITOR.NODE_TEXT)return!1;E=d!=a?d.getText():d.substring(e);if(f.test(E))return!1; 
}return!0; 
};if(this.collapsed)break;var k=this.getCommonAncestor(), h=this.root, l, m, r, y, z, B=!1, C, E;C=this.startContainer;var F=this.startOffset;C.type==CKEDITOR.NODE_TEXT?
    (F&&(C=!CKEDITOR.tools.trim(C.substring(0, F)).length&&C, B=!!C), C&&((y=C.getPrevious())||(r=C.getParent()))):(F&&(y=C.getChild(F-1)||C.getLast()), y||(r=C));for(r=d(r);r||y;){
 if(r&&!y){
 !z&&r.equals(k)&&(z=!0);if(c?r.isBlockBoundary():!h.contains(r))break;B&&'inline'==r.getComputedStyle('display')||(B=!1, z?l=r:this.setStartBefore(r));y=r.getPrevious(); 
}for(;y;)if(C=!1, y.type==CKEDITOR.NODE_COMMENT)y=y.getPrevious();else{
 if(y.type==CKEDITOR.NODE_TEXT)E=y.getText(), f.test(E)&&(y=null), C=/[\s\ufeff]$/.test(E);
    else if((y.$.offsetWidth>(CKEDITOR.env.webkit?1:0)||b&&y.is('br'))&&!y.data('cke-bookmark'))if(B&&CKEDITOR.dtd.$removeEmpty[y.getName()]){
 E=y.getText();if(f.test(E))y=null;else for(var F=y.$.getElementsByTagName('*'), I=0, K;K=F[I++];)if(!CKEDITOR.dtd.$removeEmpty[K.nodeName.toLowerCase()]){
 y=null;break; 
}y&&(C=!!E.length); 
}else y=null;C&&(B?z?l=r:r&&this.setStartBefore(r):B=!0);if(y){
 C=y.getPrevious();if(!r&&!C){
 r=y;y=null;break; 
}y=C; 
}else r=null; 
}r&&(r=d(r.getParent())); 
}C=this.endContainer;F=this.endOffset;
    r=y=null;z=B=!1;C.type==CKEDITOR.NODE_TEXT?CKEDITOR.tools.trim(C.substring(F)).length?B=!0:(B=!C.getLength(), F==C.getLength()?(y=C.getNext())||(r=C.getParent()):g(C, F)&&(r=C.getParent())):(y=C.getChild(F))||(r=C);for(;r||y;){
 if(r&&!y){
 !z&&r.equals(k)&&(z=!0);if(c?r.isBlockBoundary():!h.contains(r))break;B&&'inline'==r.getComputedStyle('display')||(B=!1, z?m=r:r&&this.setEndAfter(r));y=r.getNext(); 
}for(;y;){
 C=!1;if(y.type==CKEDITOR.NODE_TEXT)E=y.getText(), g(y, 0)||(y=null), C=/^[\s\ufeff]/.test(E);else if(y.type==
    CKEDITOR.NODE_ELEMENT){
 if((0<y.$.offsetWidth||b&&y.is('br'))&&!y.data('cke-bookmark'))if(B&&CKEDITOR.dtd.$removeEmpty[y.getName()]){
 E=y.getText();if(f.test(E))y=null;else for(F=y.$.getElementsByTagName('*'), I=0;K=F[I++];)if(!CKEDITOR.dtd.$removeEmpty[K.nodeName.toLowerCase()]){
 y=null;break; 
}y&&(C=!!E.length); 
}else y=null; 
}else C=1;C&&B&&(z?m=r:this.setEndAfter(r));if(y){
 C=y.getNext();if(!r&&!C){
 r=y;y=null;break; 
}y=C; 
}else r=null; 
}r&&(r=d(r.getParent())); 
}l&&m&&(k=l.contains(m)?m:l, this.setStartBefore(k),
    this.setEndAfter(k));break;case CKEDITOR.ENLARGE_BLOCK_CONTENTS:case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:r=new CKEDITOR.dom.range(this.root);h=this.root;r.setStartAt(h, CKEDITOR.POSITION_AFTER_START);r.setEnd(this.startContainer, this.startOffset);r=new CKEDITOR.dom.walker(r);var D, N, J=CKEDITOR.dom.walker.blockBoundary(a==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS?{br:1}:null), L=null, Q=function(a){
 if(a.type==CKEDITOR.NODE_ELEMENT&&'false'==a.getAttribute('contenteditable'))if(L){
 if(L.equals(a)){
 L=null;return; 
} 
}else L=
    a;else if(L)return;const e=J(a);e||(D=a);return e; 
}, c=function(a){
 const e=Q(a);!e&&a.is&&a.is('br')&&(N=a);return e; 
};r.guard=Q;r=r.lastBackward();D=D||h;this.setStartAt(D, !D.is('br')&&(!r&&this.checkStartOfBlock()||r&&D.contains(r))?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_AFTER_END);if(a==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS){
 r=this.clone();r=new CKEDITOR.dom.walker(r);const M=CKEDITOR.dom.walker.whitespaces(), H=CKEDITOR.dom.walker.bookmark();r.evaluator=function(a){
 return!M(a)&&!H(a); 
};if((r=r.previous())&&
    r.type==CKEDITOR.NODE_ELEMENT&&r.is('br'))break; 
}r=this.clone();r.collapse();r.setEndAt(h, CKEDITOR.POSITION_BEFORE_END);r=new CKEDITOR.dom.walker(r);r.guard=a==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS?c:Q;D=L=N=null;r=r.lastForward();D=D||h;this.setEndAt(D, !r&&this.checkEndOfBlock()||r&&D.contains(r)?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_BEFORE_START);N&&this.setEndAfter(N); 
} 
}, shrink:function(a, b, d){
 const f='boolean'===typeof d?d:d&&'boolean'===typeof d.shrinkOnBlockBoundary?d.shrinkOnBlockBoundary:
    !0, c=d&&d.skipBogus;if(!this.collapsed){
 a=a||CKEDITOR.SHRINK_TEXT;var g=this.clone(), k=this.startContainer, h=this.endContainer, l=this.startOffset, m=this.endOffset, r=d=1;k&&k.type==CKEDITOR.NODE_TEXT&&(l?l>=k.getLength()?g.setStartAfter(k):(g.setStartBefore(k), d=0):g.setStartBefore(k));h&&h.type==CKEDITOR.NODE_TEXT&&(m?m>=h.getLength()?g.setEndAfter(h):(g.setEndAfter(h), r=0):g.setEndBefore(h));var g=new CKEDITOR.dom.walker(g), y=CKEDITOR.dom.walker.bookmark(), z=CKEDITOR.dom.walker.bogus();g.evaluator=
    function(b){
 return b.type==(a==CKEDITOR.SHRINK_ELEMENT?CKEDITOR.NODE_ELEMENT:CKEDITOR.NODE_TEXT); 
};let B;g.guard=function(b, d){
 if(c&&z(b)||y(b))return!0;if(a==CKEDITOR.SHRINK_ELEMENT&&b.type==CKEDITOR.NODE_TEXT||d&&b.equals(B)||!1===f&&b.type==CKEDITOR.NODE_ELEMENT&&b.isBlockBoundary()||b.type==CKEDITOR.NODE_ELEMENT&&b.hasAttribute('contenteditable'))return!1;d||b.type!=CKEDITOR.NODE_ELEMENT||(B=b);return!0; 
};d&&(k=g[a==CKEDITOR.SHRINK_ELEMENT?'lastForward':'next']())&&this.setStartAt(k, b?CKEDITOR.POSITION_AFTER_START:
    CKEDITOR.POSITION_BEFORE_START);r&&(g.reset(), (g=g[a==CKEDITOR.SHRINK_ELEMENT?'lastBackward':'previous']())&&this.setEndAt(g, b?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_AFTER_END));return!(!d&&!r); 
} 
}, insertNode:function(a){
 this.optimizeBookmark();this.trim(!1, !0);const b=this.startContainer, d=b.getChild(this.startOffset);d?a.insertBefore(d):b.append(a);a.getParent()&&a.getParent().equals(this.endContainer)&&this.endOffset++;this.setStartBefore(a); 
}, moveToPosition:function(a, b){
 this.setStartAt(a,
    b);this.collapse(!0); 
}, moveToRange:function(a){
 this.setStart(a.startContainer, a.startOffset);this.setEnd(a.endContainer, a.endOffset); 
}, selectNodeContents:function(a){
 this.setStart(a, 0);this.setEnd(a, a.type==CKEDITOR.NODE_TEXT?a.getLength():a.getChildCount()); 
}, setStart:function(a, b){
 a.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$empty[a.getName()]&&(b=a.getIndex(), a=a.getParent());this._setStartContainer(a);this.startOffset=b;this.endContainer||(this._setEndContainer(a), this.endOffset=b);c(this); 
}, setEnd:function(a,
    b){
 a.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$empty[a.getName()]&&(b=a.getIndex()+1, a=a.getParent());this._setEndContainer(a);this.endOffset=b;this.startContainer||(this._setStartContainer(a), this.startOffset=b);c(this); 
}, setStartAfter:function(a){
 this.setStart(a.getParent(), a.getIndex()+1); 
}, setStartBefore:function(a){
 this.setStart(a.getParent(), a.getIndex()); 
}, setEndAfter:function(a){
 this.setEnd(a.getParent(), a.getIndex()+1); 
}, setEndBefore:function(a){
 this.setEnd(a.getParent(), a.getIndex()); 
}, setStartAt:function(a,
    b){
 switch(b){
 case CKEDITOR.POSITION_AFTER_START:this.setStart(a, 0);break;case CKEDITOR.POSITION_BEFORE_END:a.type==CKEDITOR.NODE_TEXT?this.setStart(a, a.getLength()):this.setStart(a, a.getChildCount());break;case CKEDITOR.POSITION_BEFORE_START:this.setStartBefore(a);break;case CKEDITOR.POSITION_AFTER_END:this.setStartAfter(a); 
}c(this); 
}, setEndAt:function(a, b){
 switch(b){
 case CKEDITOR.POSITION_AFTER_START:this.setEnd(a, 0);break;case CKEDITOR.POSITION_BEFORE_END:a.type==CKEDITOR.NODE_TEXT?this.setEnd(a,
    a.getLength()):this.setEnd(a, a.getChildCount());break;case CKEDITOR.POSITION_BEFORE_START:this.setEndBefore(a);break;case CKEDITOR.POSITION_AFTER_END:this.setEndAfter(a); 
}c(this); 
}, fixBlock:function(a, b){
 const d=this.createBookmark(), f=this.document.createElement(b);this.collapse(a);this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);this.extractContents().appendTo(f);f.trim();this.insertNode(f);const c=f.getBogus();c&&c.remove();f.appendBogus();this.moveToBookmark(d);return f; 
}, splitBlock:function(a, b){
 let d=
    new CKEDITOR.dom.elementPath(this.startContainer, this.root), f=new CKEDITOR.dom.elementPath(this.endContainer, this.root), c=d.block, g=f.block, k=null;if(!d.blockLimit.equals(f.blockLimit))return null;'br'!=a&&(c||(c=this.fixBlock(!0, a), g=(new CKEDITOR.dom.elementPath(this.endContainer, this.root)).block), g||(g=this.fixBlock(!1, a)));d=c&&this.checkStartOfBlock();f=g&&this.checkEndOfBlock();this.deleteContents();c&&c.equals(g)&&(f?(k=new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(g,
    CKEDITOR.POSITION_AFTER_END), g=null):d?(k=new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(c, CKEDITOR.POSITION_BEFORE_START), c=null):(g=this.splitElement(c, b||!1), c.is('ul', 'ol')||c.appendBogus()));return{previousBlock:c, nextBlock:g, wasStartOfBlock:d, wasEndOfBlock:f, elementPath:k}; 
}, splitElement:function(a, b){
 if(!this.collapsed)return null;this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END);const d=this.extractContents(!1, b||!1), f=a.clone(!1, b||!1);d.appendTo(f);f.insertAfter(a);
    this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END);return f; 
}, removeEmptyBlocksAtEnd:function(){
 function a(e){
 return function(a){
 return b(a)||d(a)||a.type==CKEDITOR.NODE_ELEMENT&&a.isEmptyInlineRemoveable()||e.is('table')&&a.is('caption')?!1:!0; 
}; 
}var b=CKEDITOR.dom.walker.whitespaces(), d=CKEDITOR.dom.walker.bookmark(!1);return function(b){
 for(var d=this.createBookmark(), f=this[b?'endPath':'startPath'](), c=f.block||f.blockLimit, g;c&&!c.equals(f.root)&&!c.getFirst(a(c));)g=c.getParent(), this[b?'setEndAt':
    'setStartAt'](c, CKEDITOR.POSITION_AFTER_END), c.remove(1), c=g;this.moveToBookmark(d); 
}; 
}(), startPath:function(){
 return new CKEDITOR.dom.elementPath(this.startContainer, this.root); 
}, endPath:function(){
 return new CKEDITOR.dom.elementPath(this.endContainer, this.root); 
}, checkBoundaryOfElement:function(b, d){
 let f=d==CKEDITOR.START, c=this.clone();c.collapse(f);c[f?'setStartAt':'setEndAt'](b, f?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_END);c=new CKEDITOR.dom.walker(c);c.evaluator=a(f);return c[f?
    'checkBackward':'checkForward'](); 
}, checkStartOfBlock:function(){
 let a=this.startContainer, b=this.startOffset;CKEDITOR.env.ie&&b&&a.type==CKEDITOR.NODE_TEXT&&(a=CKEDITOR.tools.ltrim(a.substring(0, b)), l.test(a)&&this.trim(0, 1));this.trim();a=new CKEDITOR.dom.elementPath(this.startContainer, this.root);b=this.clone();b.collapse(!0);b.setStartAt(a.block||a.blockLimit, CKEDITOR.POSITION_AFTER_START);a=new CKEDITOR.dom.walker(b);a.evaluator=g();return a.checkBackward(); 
}, checkEndOfBlock:function(){
 let a=this.endContainer,
    b=this.endOffset;CKEDITOR.env.ie&&a.type==CKEDITOR.NODE_TEXT&&(a=CKEDITOR.tools.rtrim(a.substring(b)), l.test(a)&&this.trim(1, 0));this.trim();a=new CKEDITOR.dom.elementPath(this.endContainer, this.root);b=this.clone();b.collapse(!1);b.setEndAt(a.block||a.blockLimit, CKEDITOR.POSITION_BEFORE_END);a=new CKEDITOR.dom.walker(b);a.evaluator=g();return a.checkForward(); 
}, getPreviousNode:function(a, b, d){
 const f=this.clone();f.collapse(1);f.setStartAt(d||this.root, CKEDITOR.POSITION_AFTER_START);d=new CKEDITOR.dom.walker(f);
    d.evaluator=a;d.guard=b;return d.previous(); 
}, getNextNode:function(a, b, d){
 const f=this.clone();f.collapse();f.setEndAt(d||this.root, CKEDITOR.POSITION_BEFORE_END);d=new CKEDITOR.dom.walker(f);d.evaluator=a;d.guard=b;return d.next(); 
}, checkReadOnly:function(){
 function a(b, e){
 for(;b;){
 if(b.type==CKEDITOR.NODE_ELEMENT){
 if('false'==b.getAttribute('contentEditable')&&!b.data('cke-editable'))return 0;if(b.is('html')||'true'==b.getAttribute('contentEditable')&&(b.contains(e)||b.equals(e)))break; 
}b=b.getParent(); 
}return 1; 
}
    return function(){
 const b=this.startContainer, d=this.endContainer;return!(a(b, d)&&a(d, b)); 
}; 
}(), moveToElementEditablePosition:function(a, b){
 if(a.type==CKEDITOR.NODE_ELEMENT&&!a.isEditable(!1))return this.moveToPosition(a, b?CKEDITOR.POSITION_AFTER_END:CKEDITOR.POSITION_BEFORE_START), !0;for(var f=0;a;){
 if(a.type==CKEDITOR.NODE_TEXT){
 b&&this.endContainer&&this.checkEndOfBlock()&&l.test(a.getText())?this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START):this.moveToPosition(a, b?CKEDITOR.POSITION_AFTER_END:
    CKEDITOR.POSITION_BEFORE_START);f=1;break; 
}if(a.type==CKEDITOR.NODE_ELEMENT)if(a.isEditable())this.moveToPosition(a, b?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_AFTER_START), f=1;else if(b&&a.is('br')&&this.endContainer&&this.checkEndOfBlock())this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START);else if('false'==a.getAttribute('contenteditable')&&a.is(CKEDITOR.dtd.$block))return this.setStartBefore(a), this.setEndAfter(a), !0;let c=a, g=f, k=void 0;c.type==CKEDITOR.NODE_ELEMENT&&c.isEditable(!1)&&
    (k=c[b?'getLast':'getFirst'](d));g||k||(k=c[b?'getPrevious':'getNext'](d));a=k; 
}return!!f; 
}, moveToClosestEditablePosition:function(a, b){
 let d, f=0, c, g, k=[CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START];a?(d=new CKEDITOR.dom.range(this.root), d.moveToPosition(a, k[b?0:1])):d=this.clone();if(a&&!a.is(CKEDITOR.dtd.$block))f=1;else if(c=d[b?'getNextEditableNode':'getPreviousEditableNode']())f=1, (g=c.type==CKEDITOR.NODE_ELEMENT)&&c.is(CKEDITOR.dtd.$block)&&'false'==c.getAttribute('contenteditable')?
    (d.setStartAt(c, CKEDITOR.POSITION_BEFORE_START), d.setEndAt(c, CKEDITOR.POSITION_AFTER_END)):!CKEDITOR.env.needsBrFiller&&g&&c.is(CKEDITOR.dom.walker.validEmptyBlockContainers)?(d.setEnd(c, 0), d.collapse()):d.moveToPosition(c, k[b?1:0]);f&&this.moveToRange(d);return!!f; 
}, moveToElementEditStart:function(a){
 return this.moveToElementEditablePosition(a); 
}, moveToElementEditEnd:function(a){
 return this.moveToElementEditablePosition(a, !0); 
}, getEnclosedNode:function(){
 var a=this.clone();a.optimize();if(a.startContainer.type!=
    CKEDITOR.NODE_ELEMENT||a.endContainer.type!=CKEDITOR.NODE_ELEMENT)return null;var a=new CKEDITOR.dom.walker(a), b=CKEDITOR.dom.walker.bookmark(!1, !0), d=CKEDITOR.dom.walker.whitespaces(!0);a.evaluator=function(a){
 return d(a)&&b(a); 
};const f=a.next();a.reset();return f&&f.equals(a.previous())?f:null; 
}, getTouchedStartNode:function(){
 const a=this.startContainer;return this.collapsed||a.type!=CKEDITOR.NODE_ELEMENT?a:a.getChild(this.startOffset)||a; 
}, getTouchedEndNode:function(){
 const a=this.endContainer;return this.collapsed||
    a.type!=CKEDITOR.NODE_ELEMENT?a:a.getChild(this.endOffset-1)||a; 
}, getNextEditableNode:f(), getPreviousEditableNode:f(1), _getTableElement:function(a){
 a=a||{td:1, th:1, tr:1, tbody:1, thead:1, tfoot:1, table:1};var b=this.getTouchedStartNode(), d=this.getTouchedEndNode(), f=b.getAscendant('table', !0), d=d.getAscendant('table', !0);return f&&!this.root.contains(f)?null:this.getEnclosedNode()?this.getEnclosedNode().getAscendant(a, !0):f&&d&&(f.equals(d)||f.contains(d)||d.contains(f))?b.getAscendant(a, !0):null; 
}, scrollIntoView:function(){
 let a=
    new CKEDITOR.dom.element.createFromHtml('\x3cspan\x3e\x26nbsp;\x3c/span\x3e', this.document), b, d, f, c=this.clone();c.optimize();(f=c.startContainer.type==CKEDITOR.NODE_TEXT)?(d=c.startContainer.getText(), b=c.startContainer.split(c.startOffset), a.insertAfter(c.startContainer)):c.insertNode(a);a.scrollIntoView();f&&(c.startContainer.setText(d), b.remove());a.remove(); 
}, getClientRects:function(){
 function a(b, e){
 let d=CKEDITOR.tools.array.map(b, function(a){
 return a; 
}), f=new CKEDITOR.dom.range(e.root), c, g,
    k;e.startContainer instanceof CKEDITOR.dom.element&&(g=0===e.startOffset&&e.startContainer.hasAttribute('data-widget'));e.endContainer instanceof CKEDITOR.dom.element&&(k=(k=e.endOffset===(e.endContainer.getChildCount?e.endContainer.getChildCount():e.endContainer.length))&&e.endContainer.hasAttribute('data-widget'));g&&f.setStart(e.startContainer.getParent(), e.startContainer.getIndex());k&&f.setEnd(e.endContainer.getParent(), e.endContainer.getIndex()+1);if(g||k)e=f;f=e.cloneContents().find('[data-cke-widget-id]').toArray();
    if(f=CKEDITOR.tools.array.map(f, function(a){
 const b=e.root.editor;a=a.getAttribute('data-cke-widget-id');return b.widgets.instances[a].element; 
}))return f=CKEDITOR.tools.array.map(f, function(a){
 let b;b=a.getParent().hasClass('cke_widget_wrapper')?a.getParent():a;c=this.root.getDocument().$.createRange();c.setStart(b.getParent().$, b.getIndex());c.setEnd(b.getParent().$, b.getIndex()+1);b=c.getClientRects();b.widgetRect=a.getClientRect();return b; 
}, e), CKEDITOR.tools.array.forEach(f, function(a){
 function b(f){
 CKEDITOR.tools.array.forEach(d,
    function(b, c){
 let g=CKEDITOR.tools.objectCompare(a[f], b);g||(g=CKEDITOR.tools.objectCompare(a.widgetRect, b));g&&(Array.prototype.splice.call(d, c, a.length-f, a.widgetRect), e=!0); 
});e||(f<d.length-1?b(f+1):d.push(a.widgetRect)); 
}let e;b(0); 
}), d; 
}function b(a, e, d){
 let c;e.collapsed?d.startContainer instanceof CKEDITOR.dom.element?(a=d.checkStartOfBlock(), c=new CKEDITOR.dom.text('​'), a?d.startContainer.append(c, !0):0===d.startOffset?c.insertBefore(d.startContainer.getFirst()):(d=d.startContainer.getChildren().getItem(d.startOffset-
    1), c.insertAfter(d)), e.setStart(c.$, 0), e.setEnd(c.$, 0), a=e.getClientRects(), c.remove()):d.startContainer instanceof CKEDITOR.dom.text&&(''===d.startContainer.getText()?(d.startContainer.setText('​'), a=e.getClientRects(), d.startContainer.setText('')):a=[f(d.createBookmark())]):a=[f(d.createBookmark())];return a; 
}function d(a, b, e){
 a=CKEDITOR.tools.extend({}, a);b&&(a=CKEDITOR.tools.getAbsoluteRectPosition(e.document.getWindow(), a));!a.width&&(a.width=a.right-a.left);!a.height&&(a.height=a.bottom-a.top);
    return a; 
}function f(a){
 const b=a.startNode;a=a.endNode;let e;b.setText('​');b.removeStyle('display');a?(a.setText('​'), a.removeStyle('display'), e=[b.getClientRect(), a.getClientRect()], a.remove()):e=[b.getClientRect(), b.getClientRect()];b.remove();return{right:Math.max(e[0].right, e[1].right), bottom:Math.max(e[0].bottom, e[1].bottom), left:Math.min(e[0].left, e[1].left), top:Math.min(e[0].top, e[1].top), width:Math.abs(e[0].left-e[1].left), height:Math.max(e[0].bottom, e[1].bottom)-Math.min(e[0].top, e[1].top)}; 
}
    return void 0!==this.document.getSelection?function(f){
 let c=this.root.getDocument().$.createRange(), g;c.setStart(this.startContainer.$, this.startOffset);c.setEnd(this.endContainer.$, this.endOffset);g=c.getClientRects();g=a(g, this);g.length||(g=b(g, c, this));return CKEDITOR.tools.array.map(g, function(a){
 return d(a, f, this); 
}, this); 
}:function(a){
 return[d(f(this.createBookmark()), a, this)]; 
}; 
}(), _setStartContainer:function(a){
 this.startContainer=a; 
}, _setEndContainer:function(a){
 this.endContainer=a; 
}, _find:function(a,
    b){
 let d=this.getCommonAncestor(), f=this.getBoundaryNodes(), c=[], g, k, h, l;if(d&&d.find)for(k=d.find(a), g=0;g<k.count();g++)if(d=k.getItem(g), b||!d.isReadOnly())h=d.getPosition(f.startNode)&CKEDITOR.POSITION_FOLLOWING||f.startNode.equals(d), l=d.getPosition(f.endNode)&CKEDITOR.POSITION_PRECEDING+CKEDITOR.POSITION_IS_CONTAINED||f.endNode.equals(d), h&&l&&c.push(d);return c; 
}};CKEDITOR.dom.range.mergeRanges=function(a){
 return CKEDITOR.tools.array.reduce(a, function(a, b){
 var e=a[a.length-1], d=!1;b=b.clone();
    b.enlarge(CKEDITOR.ENLARGE_ELEMENT);if(e){
 var f=new CKEDITOR.dom.range(b.root), d=new CKEDITOR.dom.walker(f), c=CKEDITOR.dom.walker.whitespaces();f.setStart(e.endContainer, e.endOffset);f.setEnd(b.startContainer, b.startOffset);for(f=d.next();c(f)||b.endContainer.equals(f);)f=d.next();d=!f; 
}d?e.setEnd(b.endContainer, b.endOffset):a.push(b);return a; 
}, []); 
}; 
}(), CKEDITOR.POSITION_AFTER_START=1, CKEDITOR.POSITION_BEFORE_END=2, CKEDITOR.POSITION_BEFORE_START=3, CKEDITOR.POSITION_AFTER_END=4, CKEDITOR.ENLARGE_ELEMENT=
    1, CKEDITOR.ENLARGE_BLOCK_CONTENTS=2, CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS=3, CKEDITOR.ENLARGE_INLINE=4, CKEDITOR.START=1, CKEDITOR.END=2, CKEDITOR.SHRINK_ELEMENT=1, CKEDITOR.SHRINK_TEXT=2, 'use strict', function(){
 function c(a){
 1>arguments.length||(this.range=a, this.forceBrBreak=0, this.enlargeBr=1, this.enforceRealBlocks=0, this._||(this._={})); 
}function h(a){
 const b=[];a.forEach(function(a){
 if('true'==a.getAttribute('contenteditable'))return b.push(a), !1; 
}, CKEDITOR.NODE_ELEMENT, !0);return b; 
}function g(a, b, f, c){
 a:{
 null==
    c&&(c=h(f));for(var k;k=c.shift();)if(k.getDtd().p){
 c={element:k, remaining:c};break a; 
}c=null; 
}if(!c)return 0;if((k=CKEDITOR.filter.instances[c.element.data('cke-filter')])&&!k.check(b))return g(a, b, f, c.remaining);b=new CKEDITOR.dom.range(c.element);b.selectNodeContents(c.element);b=b.createIterator();b.enlargeBr=a.enlargeBr;b.enforceRealBlocks=a.enforceRealBlocks;b.activeFilter=b.filter=k;a._.nestedEditable={element:c.element, container:f, remaining:c.remaining, iterator:b};return 1; 
}function a(a, b, f){
 if(!b)return!1;
    a=a.clone();a.collapse(!f);return a.checkBoundaryOfElement(b, f?CKEDITOR.START:CKEDITOR.END); 
}const f=/^[\r\n\t ]+$/, m=CKEDITOR.dom.walker.bookmark(!1, !0), k=CKEDITOR.dom.walker.whitespaces(!0), l=function(a){
 return m(a)&&k(a); 
}, b={dd:1, dt:1, li:1};c.prototype={getNextParagraph:function(d){
 let e, c, k, h, p;d=d||'p';if(this._.nestedEditable){
 if(e=this._.nestedEditable.iterator.getNextParagraph(d))return this.activeFilter=this._.nestedEditable.iterator.activeFilter, e;this.activeFilter=this.filter;if(g(this, d,
    this._.nestedEditable.container, this._.nestedEditable.remaining))return this.activeFilter=this._.nestedEditable.iterator.activeFilter, this._.nestedEditable.iterator.getNextParagraph(d);this._.nestedEditable=null; 
}if(!this.range.root.getDtd()[d])return null;if(!this._.started){
 var q=this.range.clone();c=q.startPath();var v=q.endPath(), w=!q.collapsed&&a(q, c.block), u=!q.collapsed&&a(q, v.block, 1);q.shrink(CKEDITOR.SHRINK_ELEMENT, !0);w&&q.setStartAt(c.block, CKEDITOR.POSITION_BEFORE_END);u&&q.setEndAt(v.block,
    CKEDITOR.POSITION_AFTER_START);c=q.endContainer.hasAscendant('pre', !0)||q.startContainer.hasAscendant('pre', !0);q.enlarge(this.forceBrBreak&&!c||!this.enlargeBr?CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:CKEDITOR.ENLARGE_BLOCK_CONTENTS);q.collapsed||(c=new CKEDITOR.dom.walker(q.clone()), v=CKEDITOR.dom.walker.bookmark(!0, !0), c.evaluator=v, this._.nextNode=c.next(), c=new CKEDITOR.dom.walker(q.clone()), c.evaluator=v, c=c.previous(), this._.lastNode=c.getNextSourceNode(!0, null, q.root), this._.lastNode&&this._.lastNode.type==
    CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.trim(this._.lastNode.getText())&&this._.lastNode.getParent().isBlockBoundary()&&(v=this.range.clone(), v.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END), v.checkEndOfBlock()&&(v=new CKEDITOR.dom.elementPath(v.endContainer, v.root), this._.lastNode=(v.block||v.blockLimit).getNextSourceNode(!0))), this._.lastNode&&q.root.contains(this._.lastNode)||(this._.lastNode=this._.docEndMarker=q.document.createText(''), this._.lastNode.insertAfter(c)), q=null);this._.started=
    1;c=q; 
}v=this._.nextNode;q=this._.lastNode;for(this._.nextNode=null;v;){
 var w=0, u=v.hasAscendant('pre'), A=v.type!=CKEDITOR.NODE_ELEMENT, r=0;if(A)v.type==CKEDITOR.NODE_TEXT&&f.test(v.getText())&&(A=0);else{
 var y=v.getName();if(CKEDITOR.dtd.$block[y]&&'false'==v.getAttribute('contenteditable')){
 e=v;g(this, d, e);break; 
}else if(v.isBlockBoundary(this.forceBrBreak&&!u&&{br:1})){
 if('br'==y)A=1;else if(!c&&!v.getChildCount()&&'hr'!=y){
 e=v;k=v.equals(q);break; 
}c&&(c.setEndAt(v, CKEDITOR.POSITION_BEFORE_START),
    'br'!=y&&(this._.nextNode=v));w=1; 
}else{
 if(v.getFirst()){
 c||(c=this.range.clone(), c.setStartAt(v, CKEDITOR.POSITION_BEFORE_START));v=v.getFirst();continue; 
}A=1; 
} 
}A&&!c&&(c=this.range.clone(), c.setStartAt(v, CKEDITOR.POSITION_BEFORE_START));k=(!w||A)&&v.equals(q);if(c&&!w)for(;!v.getNext(l)&&!k;){
 y=v.getParent();if(y.isBlockBoundary(this.forceBrBreak&&!u&&{br:1})){
 w=1;A=0;k||y.equals(q);c.setEndAt(y, CKEDITOR.POSITION_BEFORE_END);break; 
}v=y;A=1;k=v.equals(q);r=1; 
}A&&c.setEndAt(v, CKEDITOR.POSITION_AFTER_END);
    v=this._getNextSourceNode(v, r, q);if((k=!v)||w&&c)break; 
}if(!e){
 if(!c)return this._.docEndMarker&&this._.docEndMarker.remove(), this._.nextNode=null;e=new CKEDITOR.dom.elementPath(c.startContainer, c.root);v=e.blockLimit;w={div:1, th:1, td:1};e=e.block;!e&&v&&!this.enforceRealBlocks&&w[v.getName()]&&c.checkStartOfBlock()&&c.checkEndOfBlock()&&!v.equals(c.root)?e=v:!e||this.enforceRealBlocks&&e.is(b)?(e=this.range.document.createElement(d), c.extractContents().appendTo(e), e.trim(), c.insertNode(e), h=p=!0):
    'li'!=e.getName()?c.checkStartOfBlock()&&c.checkEndOfBlock()||(e=e.clone(!1), c.extractContents().appendTo(e), e.trim(), p=c.splitBlock(), h=!p.wasStartOfBlock, p=!p.wasEndOfBlock, c.insertNode(e)):k||(this._.nextNode=e.equals(q)?null:this._getNextSourceNode(c.getBoundaryNodes().endNode, 1, q)); 
}h&&(h=e.getPrevious())&&h.type==CKEDITOR.NODE_ELEMENT&&('br'==h.getName()?h.remove():h.getLast()&&'br'==h.getLast().$.nodeName.toLowerCase()&&h.getLast().remove());p&&(h=e.getLast())&&h.type==CKEDITOR.NODE_ELEMENT&&
    'br'==h.getName()&&(!CKEDITOR.env.needsBrFiller||h.getPrevious(m)||h.getNext(m))&&h.remove();this._.nextNode||(this._.nextNode=k||e.equals(q)||!q?null:this._getNextSourceNode(e, 1, q));return e; 
}, _getNextSourceNode:function(a, b, f){
 function c(a){
 return!(a.equals(f)||a.equals(g)); 
}var g=this.range.root;for(a=a.getNextSourceNode(b, null, c);!m(a);)a=a.getNextSourceNode(b, null, c);return a; 
}};CKEDITOR.dom.range.prototype.createIterator=function(){
 return new c(this); 
}; 
}(), CKEDITOR.command=function(c, h){
 this.uiItems=
    [];this.exec=function(a){
 if(this.state==CKEDITOR.TRISTATE_DISABLED||!this.checkAllowed())return!1;this.editorFocus&&c.focus();return!1===this.fire('exec')?!0:!1!==h.exec.call(this, c, a); 
};this.refresh=function(a, f){
 if(!this.readOnly&&a.readOnly)return!0;if(this.context&&!f.isContextFor(this.context)||!this.checkAllowed(!0))return this.disable(), !0;this.startDisabled||this.enable();this.modes&&!this.modes[a.mode]&&this.disable();return!1===this.fire('refresh', {editor:a, path:f})?!0:h.refresh&&!1!==h.refresh.apply(this,
    arguments); 
};let g;this.checkAllowed=function(a){
 return a||'boolean'!==typeof g?g=c.activeFilter.checkFeature(this):g; 
};CKEDITOR.tools.extend(this, h, {modes:{wysiwyg:1}, editorFocus:1, contextSensitive:!!h.context, state:CKEDITOR.TRISTATE_DISABLED});CKEDITOR.event.call(this); 
}, CKEDITOR.command.prototype={enable:function(){
 this.state==CKEDITOR.TRISTATE_DISABLED&&this.checkAllowed()&&this.setState(this.preserveState&&'undefined'!==typeof this.previousState?this.previousState:CKEDITOR.TRISTATE_OFF); 
}, disable:function(){
 this.setState(CKEDITOR.TRISTATE_DISABLED); 
},
    setState:function(c){
 if(this.state==c||c!=CKEDITOR.TRISTATE_DISABLED&&!this.checkAllowed())return!1;this.previousState=this.state;this.state=c;this.fire('state');return!0; 
}, toggleState:function(){
 this.state==CKEDITOR.TRISTATE_OFF?this.setState(CKEDITOR.TRISTATE_ON):this.state==CKEDITOR.TRISTATE_ON&&this.setState(CKEDITOR.TRISTATE_OFF); 
}}, CKEDITOR.event.implementOn(CKEDITOR.command.prototype), CKEDITOR.ENTER_P=1, CKEDITOR.ENTER_BR=2, CKEDITOR.ENTER_DIV=3, CKEDITOR.config={customConfig:'config.js', autoUpdateElement:!0,
    language:'', defaultLanguage:'en', contentsLangDirection:'', enterMode:CKEDITOR.ENTER_P, forceEnterMode:!1, shiftEnterMode:CKEDITOR.ENTER_BR, docType:'\x3c!DOCTYPE html\x3e', bodyId:'', bodyClass:'', fullPage:!1, height:200, contentsCss:CKEDITOR.getUrl('contents.css'), extraPlugins:'', removePlugins:'', protectedSource:[], tabIndex:0, width:'', baseFloatZIndex:1E4, blockedKeystrokes:[CKEDITOR.CTRL+66, CKEDITOR.CTRL+73, CKEDITOR.CTRL+85]}, function(){
 function c(a, b, e, d, f){
 let c, g;a=[];for(c in b){
 g=b[c];g='boolean'===typeof g?
    {}:'function'===typeof g?{match:g}:I(g);'$'!=c.charAt(0)&&(g.elements=c);e&&(g.featureName=e.toLowerCase());var h=g;h.elements=k(h.elements, /\s+/)||null;h.propertiesOnly=h.propertiesOnly||!0===h.elements;var l=/\s*,\s*/, m=void 0;for(m in N){
 h[m]=k(h[m], l)||null;var n=h, y=J[m], v=k(h[J[m]], l), H=h[m], z=[], t=!0, u=void 0;v?t=!1:v={};for(u in H)'!'==u.charAt(0)&&(u=u.slice(1), z.push(u), v[u]=!0, t=!1);for(;u=z.pop();)H[u]=H[`!${u}`], delete H[`!${u}`];n[y]=(t?!1:v)||null; 
}h.match=h.match||null;d.push(g);a.push(g); 
}b=
    f.elements;f=f.generic;let M;e=0;for(d=a.length;e<d;++e){
 c=I(a[e]);g=!0===c.classes||!0===c.styles||!0===c.attributes;h=c;m=y=l=void 0;for(l in N)h[l]=w(h[l]);n=!0;for(m in J){
 l=J[m];y=h[l];v=[];H=void 0;for(H in y)-1<H.indexOf('*')?v.push(new RegExp(`^${H.replace(/\*/g, '.*')}$`)):v.push(H);y=v;y.length&&(h[l]=y, n=!1); 
}h.nothingRequired=n;h.noProperties=!(h.attributes||h.classes||h.styles);if(!0===c.elements||null===c.elements)f[g?'unshift':'push'](c);else for(M in h=c.elements, delete c.elements,
    h)if(b[M])b[M][g?'unshift':'push'](c);else b[M]=[c]; 
} 
}function h(a, b, e, d){
 if(!a.match||a.match(b))if(d||l(a, b))if(a.propertiesOnly||(e.valid=!0), e.allAttributes||(e.allAttributes=g(a.attributes, b.attributes, e.validAttributes)), e.allStyles||(e.allStyles=g(a.styles, b.styles, e.validStyles)), !e.allClasses){
 a=a.classes;b=b.classes;d=e.validClasses;if(a)if(!0===a)a=!0;else{
 for(var f=0, c=b.length, k;f<c;++f)k=b[f], d[k]||(d[k]=a(k));a=!1; 
}else a=!1;e.allClasses=a; 
} 
}function g(a, b, e){
 if(!a)return!1;if(!0===a)return!0;
    for(const d in b)e[d]||(e[d]=a(d));return!1; 
}function a(a, b, e){
 if(!a.match||a.match(b)){
 if(a.noProperties)return!1;e.hadInvalidAttribute=f(a.attributes, b.attributes)||e.hadInvalidAttribute;e.hadInvalidStyle=f(a.styles, b.styles)||e.hadInvalidStyle;a=a.classes;b=b.classes;if(a){
 for(var d=!1, c=!0===a, g=b.length;g--;)if(c||a(b[g]))b.splice(g, 1), d=!0;a=d; 
}else a=!1;e.hadInvalidClass=a||e.hadInvalidClass; 
} 
}function f(a, b){
 if(!a)return!1;let e=!1, d=!0===a, f;for(f in b)if(d||a(f))delete b[f], e=!0;return e; 
}function m(a,
    b, e){
 if(a.disabled||a.customConfig&&!e||!b)return!1;a._.cachedChecks={};return!0; 
}function k(a, b){
 if(!a)return!1;if(!0===a)return a;if('string'===typeof a)return a=K(a), '*'==a?!0:CKEDITOR.tools.convertArrayToObject(a.split(b));if(CKEDITOR.tools.isArray(a))return a.length?CKEDITOR.tools.convertArrayToObject(a):!1;let e={}, d=0, f;for(f in a)e[f]=a[f], d++;return d?e:!1; 
}function l(a, e){
 if(a.nothingRequired)return!0;let d, f, c, g;if(c=a.requiredClasses)for(g=e.classes, d=0;d<c.length;++d)if(f=c[d], 'string'===
    typeof f){
 if(-1==CKEDITOR.tools.indexOf(g, f))return!1; 
}else if(!CKEDITOR.tools.checkIfAnyArrayItemMatches(g, f))return!1;return b(e.styles, a.requiredStyles)&&b(e.attributes, a.requiredAttributes); 
}function b(a, b){
 if(!b)return!0;for(var e=0, d;e<b.length;++e)if(d=b[e], 'string'===typeof d){
 if(!(d in a))return!1; 
}else if(!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(a, d))return!1;return!0; 
}function d(a){
 if(!a)return{};a=a.split(/\s*,\s*/).sort();for(var b={};a.length;)b[a.shift()]='cke-test';return b; 
}function e(a){
 let b,
    e, d, f, c={}, g=1;for(a=K(a);b=a.match(L);)(e=b[2])?(d=n(e, 'styles'), f=n(e, 'attrs'), e=n(e, 'classes')):d=f=e=null, c[`$${g++}`]={elements:b[1], classes:e, styles:d, attributes:f}, a=a.slice(b[0].length);return c; 
}function n(a, b){
 const e=a.match(Q[b]);return e?K(e[1]):null; 
}function t(a){
 const b=a.styleBackup=a.attributes.style, e=a.classBackup=a.attributes['class'];a.styles||(a.styles=CKEDITOR.tools.parseCssText(b||'', 1));a.classes||(a.classes=e?e.split(/\s+/):[]); 
}function x(b, e, d, f){
 let c=0, g;f.toHtml&&(e.name=e.name.replace(M,
    '$1'));if(f.doCallbacks&&b.elementCallbacks){
 a:{
 g=b.elementCallbacks;for(var k=0, l=g.length, m;k<l;++k)if(m=g[k](e)){
 g=m;break a; 
}g=void 0; 
}if(g)return g; 
}if(f.doTransform&&(g=b._.transformations[e.name])){
 t(e);for(k=0;k<g.length;++k)y(b, e, g[k]);q(e); 
}if(f.doFilter){
 a:{
 k=e.name;l=b._;b=l.allowedRules.elements[k];g=l.allowedRules.generic;k=l.disallowedRules.elements[k];l=l.disallowedRules.generic;m=f.skipRequired;var n={valid:!1, validAttributes:{}, validClasses:{}, validStyles:{}, allAttributes:!1, allClasses:!1,
    allStyles:!1, hadInvalidAttribute:!1, hadInvalidClass:!1, hadInvalidStyle:!1}, z, u;if(b||g){
 t(e);if(k)for(z=0, u=k.length;z<u;++z)if(!1===a(k[z], e, n)){
 b=null;break a; 
}if(l)for(z=0, u=l.length;z<u;++z)a(l[z], e, n);if(b)for(z=0, u=b.length;z<u;++z)h(b[z], e, n, m);if(g)for(z=0, u=g.length;z<u;++z)h(g[z], e, n, m);b=n; 
}else b=null; 
}if(!b||!b.valid)return d.push(e), 1;u=b.validAttributes;const w=b.validStyles;g=b.validClasses;var k=e.attributes, K=e.styles, l=e.classes;m=e.classBackup;var B=e.styleBackup, P, F, x=[], n=[], r=/^data-cke-/;
    z=!1;delete k.style;delete k['class'];delete e.classBackup;delete e.styleBackup;if(!b.allAttributes)for(P in k)u[P]||(r.test(P)?P==(F=P.replace(/^data-cke-saved-/, ''))||u[F]||(delete k[P], z=!0):(delete k[P], z=!0));if(!b.allStyles||b.hadInvalidStyle){
 for(P in K)b.allStyles||w[P]?x.push(`${P}:${K[P]}`):z=!0;x.length&&(k.style=x.sort().join('; ')); 
}else B&&(k.style=B);if(!b.allClasses||b.hadInvalidClass){
 for(P=0;P<l.length;++P)(b.allClasses||g[l[P]])&&n.push(l[P]);n.length&&(k['class']=n.sort().join(' '));
    m&&n.length<m.split(/\s+/).length&&(z=!0); 
}else m&&(k['class']=m);z&&(c=1);if(!f.skipFinalValidation&&!v(e))return d.push(e), 1; 
}f.toHtml&&(e.name=e.name.replace(H, 'cke:$1'));return c; 
}function p(a){
 let b=[], e;for(e in a)-1<e.indexOf('*')&&b.push(e.replace(/\*/g, '.*'));return b.length?new RegExp(`^(?:${b.join('|')})$`):null; 
}function q(a){
 let b=a.attributes, e;delete b.style;delete b['class'];if(e=CKEDITOR.tools.writeCssText(a.styles, !0))b.style=e;a.classes.length&&(b['class']=a.classes.sort().join(' ')); 
}
    function v(a){
 switch(a.name){
 case 'a':if(!(a.children.length||a.attributes.name||a.attributes.id))return!1;break;case 'img':if(!a.attributes.src)return!1; 
}return!0; 
}function w(a){
 if(!a)return!1;if(!0===a)return!0;const b=p(a);return function(e){
 return e in a||b&&e.match(b); 
}; 
}function u(){
 return new CKEDITOR.htmlParser.element('br'); 
}function A(a){
 return a.type==CKEDITOR.NODE_ELEMENT&&('br'==a.name||F.$block[a.name]); 
}function r(a, b, e){
 var d=a.name;if(F.$empty[d]||!a.children.length)'hr'==d&&'br'==b?a.replaceWith(u()):
    (a.parent&&e.push({check:'it', el:a.parent}), a.remove());else if(F.$block[d]||'tr'==d)if('br'==b)a.previous&&!A(a.previous)&&(b=u(), b.insertBefore(a)), a.next&&!A(a.next)&&(b=u(), b.insertAfter(a)), a.replaceWithChildren();else{
 var d=a.children, f;b:{
 f=F[b];for(var c=0, g=d.length, k;c<g;++c)if(k=d[c], k.type==CKEDITOR.NODE_ELEMENT&&!f[k.name]){
 f=!1;break b; 
}f=!0; 
}if(f)a.name=b, a.attributes={}, e.push({check:'parent-down', el:a});else{
 f=a.parent;for(var c=f.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||'body'==f.name,
    h, l, g=d.length;0<g;)k=d[--g], c&&(k.type==CKEDITOR.NODE_TEXT||k.type==CKEDITOR.NODE_ELEMENT&&F.$inline[k.name])?(h||(h=new CKEDITOR.htmlParser.element(b), h.insertAfter(a), e.push({check:'parent-down', el:h})), h.add(k, 0)):(h=null, l=F[f.name]||F.span, k.insertAfter(a), f.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||k.type!=CKEDITOR.NODE_ELEMENT||l[k.name]||e.push({check:'el-up', el:k}));a.remove(); 
} 
}else d in{style:1, script:1}?a.remove():(a.parent&&e.push({check:'it', el:a.parent}), a.replaceWithChildren()); 
}function y(a,
    b, e){
 let d, f;for(d=0;d<e.length;++d)if(f=e[d], !(f.check&&!a.check(f.check, !1)||f.left&&!f.left(b))){
 f.right(b, O);break; 
} 
}function z(a, b){
 let e=b.getDefinition(), d=e.attributes, f=e.styles, c, g, k, h;if(a.name!=e.element)return!1;for(c in d)if('class'==c)for(e=d[c].split(/\s+/), k=a.classes.join('|');h=e.pop();){
 if(-1==k.indexOf(h))return!1; 
}else if(a.attributes[c]!=d[c])return!1;for(g in f)if(a.styles[g]!=f[g])return!1;return!0; 
}function B(a, b){
 let e, d;'string'===typeof a?e=a:a instanceof CKEDITOR.style?d=
    a:(e=a[0], d=a[1]);return[{element:e, left:d, right:function(a, e){
 e.transform(a, b); 
}}]; 
}function C(a){
 return function(b){
 return z(b, a); 
}; 
}function E(a){
 return function(b, e){
 e[a](b); 
}; 
}var F=CKEDITOR.dtd, I=CKEDITOR.tools.copy, K=CKEDITOR.tools.trim, D=['', 'p', 'br', 'div'];CKEDITOR.FILTER_SKIP_TREE=2;CKEDITOR.filter=function(a, b){
 this.allowedContent=[];this.disallowedContent=[];this.elementCallbacks=null;this.disabled=!1;this.editor=null;this.id=CKEDITOR.tools.getNextNumber();this._={allowedRules:{elements:{},
    generic:[]}, disallowedRules:{elements:{}, generic:[]}, transformations:{}, cachedTests:{}, cachedChecks:{}};CKEDITOR.filter.instances[this.id]=this;const e=this.editor=a instanceof CKEDITOR.editor?a:null;if(e&&!b){
 this.customConfig=!0;const d=e.config.allowedContent;!0===d?this.disabled=!0:(d||(this.customConfig=!1), this.allow(d, 'config', 1), this.allow(e.config.extraAllowedContent, 'extra', 1), this.allow(`${D[e.enterMode]} ${D[e.shiftEnterMode]}`, 'default', 1), this.disallow(e.config.disallowedContent)); 
}else this.customConfig=
    !1, this.allow(b||a, 'default', 1); 
};CKEDITOR.filter.instances={};CKEDITOR.filter.prototype={allow:function(a, b, d){
 if(!m(this, a, d))return!1;let f, g;if('string'===typeof a)a=e(a);else if(a instanceof CKEDITOR.style){
 if(a.toAllowedContentRules)return this.allow(a.toAllowedContentRules(this.editor), b, d);f=a.getDefinition();a={};d=f.attributes;a[f.element]=f={styles:f.styles, requiredStyles:f.styles&&CKEDITOR.tools.object.keys(f.styles)};d&&(d=I(d), f.classes=d['class']?d['class'].split(/\s+/):null, f.requiredClasses=
    f.classes, delete d['class'], f.attributes=d, f.requiredAttributes=d&&CKEDITOR.tools.object.keys(d)); 
}else if(CKEDITOR.tools.isArray(a)){
 for(f=0;f<a.length;++f)g=this.allow(a[f], b, d);return g; 
}c(this, a, b, this.allowedContent, this._.allowedRules);return!0; 
}, applyTo:function(a, b, e, d){
 if(this.disabled)return!1;let f=this, c=[], g=this.editor&&this.editor.config.protectedSource, k, h=!1, l={doFilter:!e, doTransform:!0, doCallbacks:!0, toHtml:b};a.forEach(function(a){
 if(a.type==CKEDITOR.NODE_ELEMENT){
 if('off'==a.attributes['data-cke-filter'])return!1;
    if(!b||'span'!=a.name||!~CKEDITOR.tools.object.keys(a.attributes).join('|').indexOf('data-cke-'))if(k=x(f, a, c, l), k&1)h=!0;else if(k&2)return!1; 
}else if(a.type==CKEDITOR.NODE_COMMENT&&a.value.match(/^\{cke_protected\}(?!\{C\})/)){
 let e;a:{
 let d=decodeURIComponent(a.value.replace(/^\{cke_protected\}/, ''));e=[];let m, n, y;if(g)for(n=0;n<g.length;++n)if((y=d.match(g[n]))&&y[0].length==d.length){
 e=!0;break a; 
}d=CKEDITOR.htmlParser.fragment.fromHtml(d);1==d.children.length&&(m=d.children[0]).type==CKEDITOR.NODE_ELEMENT&&
    x(f, m, e, l);e=!e.length; 
}e||c.push(a); 
} 
}, null, !0);c.length&&(h=!0);let m;a=[];d=D[d||(this.editor?this.editor.enterMode:CKEDITOR.ENTER_P)];for(var n;e=c.pop();)e.type==CKEDITOR.NODE_ELEMENT?r(e, d, a):e.remove();for(;m=a.pop();)if(e=m.el, e.parent)switch(n=F[e.parent.name]||F.span, m.check){
 case 'it':F.$removeEmpty[e.name]&&!e.children.length?r(e, d, a):v(e)||r(e, d, a);break;case 'el-up':e.parent.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||n[e.name]||r(e, d, a);break;case 'parent-down':e.parent.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||
    n[e.name]||r(e.parent, d, a); 
}return h; 
}, checkFeature:function(a){
 if(this.disabled||!a)return!0;a.toFeature&&(a=a.toFeature(this.editor));return!a.requiredContent||this.check(a.requiredContent); 
}, disable:function(){
 this.disabled=!0; 
}, disallow:function(a){
 if(!m(this, a, !0))return!1;'string'===typeof a&&(a=e(a));c(this, a, null, this.disallowedContent, this._.disallowedRules);return!0; 
}, addContentForms:function(a){
 if(!this.disabled&&a){
 let b, e, d=[], f;for(b=0;b<a.length&&!f;++b)e=a[b], ('string'===typeof e||e instanceof
    CKEDITOR.style)&&this.check(e)&&(f=e);if(f){
 for(b=0;b<a.length;++b)d.push(B(a[b], f));this.addTransformations(d); 
} 
} 
}, addElementCallback:function(a){
 this.elementCallbacks||(this.elementCallbacks=[]);this.elementCallbacks.push(a); 
}, addFeature:function(a){
 if(this.disabled||!a)return!0;a.toFeature&&(a=a.toFeature(this.editor));this.allow(a.allowedContent, a.name);this.addTransformations(a.contentTransformations);this.addContentForms(a.contentForms);return a.requiredContent&&(this.customConfig||this.disallowedContent.length)?
    this.check(a.requiredContent):!0; 
}, addTransformations:function(a){
 let b, e;if(!this.disabled&&a){
 let d=this._.transformations, f;for(f=0;f<a.length;++f){
 b=a[f];let c=void 0, g=void 0, k=void 0, h=void 0, l=void 0, m=void 0;e=[];for(g=0;g<b.length;++g)k=b[g], 'string'===typeof k?(k=k.split(/\s*:\s*/), h=k[0], l=null, m=k[1]):(h=k.check, l=k.left, m=k.right), c||(c=k, c=c.element?c.element:h?h.match(/^([a-z0-9]+)/i)[0]:c.left.getDefinition().element), l instanceof CKEDITOR.style&&(l=C(l)), e.push({check:h==c?null:h, left:l,
    right:'string'===typeof m?E(m):m});b=c;d[b]||(d[b]=[]);d[b].push(e); 
} 
} 
}, check:function(a, b, f){
 if(this.disabled)return!0;if(CKEDITOR.tools.isArray(a)){
 for(var c=a.length;c--;)if(this.check(a[c], b, f))return!0;return!1; 
}let g, k;if('string'===typeof a){
 k=`${a}\x3c${!1===b?'0':'1'}${f?'1':'0'}\x3e`;if(k in this._.cachedChecks)return this._.cachedChecks[k];g=e(a).$1;var h=g.styles, c=g.classes;g.name=g.elements;g.classes=c=c?c.split(/\s*,\s*/):[];g.styles=d(h);g.attributes=d(g.attributes);g.children=[];c.length&&
    (g.attributes['class']=c.join(' '));h&&(g.attributes.style=CKEDITOR.tools.writeCssText(g.styles)); 
}else g=a.getDefinition(), h=g.styles, c=g.attributes||{}, h&&!CKEDITOR.tools.isEmpty(h)?(h=I(h), c.style=CKEDITOR.tools.writeCssText(h, !0)):h={}, g={name:g.element, attributes:c, classes:c['class']?c['class'].split(/\s+/):[], styles:h, children:[]};var h=CKEDITOR.tools.clone(g), l=[], m;if(!1!==b&&(m=this._.transformations[g.name])){
 for(c=0;c<m.length;++c)y(this, g, m[c]);q(g); 
}x(this, h, l, {doFilter:!0, doTransform:!1!==
    b, skipRequired:!f, skipFinalValidation:!f});0<l.length?f=!1:((b=g.attributes['class'])&&(g.attributes['class']=g.attributes['class'].split(' ').sort().join(' ')), f=CKEDITOR.tools.objectCompare(g.attributes, h.attributes, !0), b&&(g.attributes['class']=b));'string'===typeof a&&(this._.cachedChecks[k]=f);return f; 
}, getAllowedEnterMode:function(){
 const a=['p', 'div', 'br'], b={p:CKEDITOR.ENTER_P, div:CKEDITOR.ENTER_DIV, br:CKEDITOR.ENTER_BR};return function(e, d){
 let f=a.slice(), c;if(this.check(D[e]))return e;for(d||
    (f=f.reverse());c=f.pop();)if(this.check(c))return b[c];return CKEDITOR.ENTER_BR; 
}; 
}(), clone:function(){
 const a=new CKEDITOR.filter, b=CKEDITOR.tools.clone;a.allowedContent=b(this.allowedContent);a._.allowedRules=b(this._.allowedRules);a.disallowedContent=b(this.disallowedContent);a._.disallowedRules=b(this._.disallowedRules);a._.transformations=b(this._.transformations);a.disabled=this.disabled;a.editor=this.editor;return a; 
}, destroy:function(){
 delete CKEDITOR.filter.instances[this.id];delete this._;delete this.allowedContent;
    delete this.disallowedContent; 
}};var N={styles:1, attributes:1, classes:1}, J={styles:'requiredStyles', attributes:'requiredAttributes', classes:'requiredClasses'}, L=/^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i, Q={styles:/{([^}]+)}/, attrs:/\[([^\]]+)\]/, classes:/\(([^\)]+)\)/}, M=/^cke:(object|embed|param)$/, H=/^(object|embed|param)$/, O;O=CKEDITOR.filter.transformationsTools={sizeToStyle:function(a){
 this.lengthToStyle(a, 'width');this.lengthToStyle(a,
    'height'); 
}, sizeToAttribute:function(a){
 this.lengthToAttribute(a, 'width');this.lengthToAttribute(a, 'height'); 
}, lengthToStyle:function(a, b, e){
 e=e||b;if(!(e in a.styles)){
 let d=a.attributes[b];d&&(/^\d+$/.test(d)&&(d+='px'), a.styles[e]=d); 
}delete a.attributes[b]; 
}, lengthToAttribute:function(a, b, e){
 e=e||b;if(!(e in a.attributes)){
 const d=a.styles[b], f=d&&d.match(/^(\d+)(?:\.\d*)?px$/);f?a.attributes[e]=f[1]:'cke-test'==d&&(a.attributes[e]='cke-test'); 
}delete a.styles[b]; 
}, alignmentToStyle:function(a){
 if(!('float'in
    a.styles)){
 const b=a.attributes.align;if('left'==b||'right'==b)a.styles['float']=b; 
}delete a.attributes.align; 
}, alignmentToAttribute:function(a){
 if(!('align'in a.attributes)){
 const b=a.styles['float'];if('left'==b||'right'==b)a.attributes.align=b; 
}delete a.styles['float']; 
}, splitBorderShorthand:function(a){
 if(a.styles.border){
 const b=CKEDITOR.tools.style.parse.border(a.styles.border);b.color&&(a.styles['border-color']=b.color);b.style&&(a.styles['border-style']=b.style);b.width&&(a.styles['border-width']=b.width);
    delete a.styles.border; 
} 
}, listTypeToStyle:function(a){
 if(a.attributes.type)switch(a.attributes.type){
 case 'a':a.styles['list-style-type']='lower-alpha';break;case 'A':a.styles['list-style-type']='upper-alpha';break;case 'i':a.styles['list-style-type']='lower-roman';break;case 'I':a.styles['list-style-type']='upper-roman';break;case '1':a.styles['list-style-type']='decimal';break;default:a.styles['list-style-type']=a.attributes.type; 
} 
}, splitMarginShorthand:function(a){
 function b(d){
 a.styles['margin-top']=
    e[d[0]];a.styles['margin-right']=e[d[1]];a.styles['margin-bottom']=e[d[2]];a.styles['margin-left']=e[d[3]]; 
}if(a.styles.margin){
 var e=a.styles.margin.match(/(auto|0|(?:\-?[\.\d]+(?:\w+|%)))/g)||['0px'];switch(e.length){
 case 1:b([0, 0, 0, 0]);break;case 2:b([0, 1, 0, 1]);break;case 3:b([0, 1, 2, 1]);break;case 4:b([0, 1, 2, 3]); 
}delete a.styles.margin; 
} 
}, matchesStyle:z, transform:function(a, b){
 if('string'===typeof b)a.name=b;else{
 let e=b.getDefinition(), d=e.styles, f=e.attributes, c, g, k, h;a.name=e.element;for(c in f)if('class'==
    c)for(e=a.classes.join('|'), k=f[c].split(/\s+/);h=k.pop();)-1==e.indexOf(h)&&a.classes.push(h);else a.attributes[c]=f[c];for(g in d)a.styles[g]=d[g]; 
} 
}}; 
}(), function(){
 CKEDITOR.focusManager=function(c){
 if(c.focusManager)return c.focusManager;this.hasFocus=!1;this.currentActive=null;this._={editor:c};return this; 
};CKEDITOR.focusManager._={blurDelay:200};CKEDITOR.focusManager.prototype={focus:function(c){
 this._.timer&&clearTimeout(this._.timer);c&&(this.currentActive=c);this.hasFocus||this._.locked||((c=
    CKEDITOR.currentInstance)&&c.focusManager.blur(1), this.hasFocus=!0, (c=this._.editor.container)&&c.addClass('cke_focus'), this._.editor.fire('focus')); 
}, lock:function(){
 this._.locked=1; 
}, unlock:function(){
 delete this._.locked; 
}, blur:function(c){
 function h(){
 if(this.hasFocus){
 this.hasFocus=!1;const a=this._.editor.container;a&&a.removeClass('cke_focus');this._.editor.fire('blur'); 
} 
}if(!this._.locked){
 this._.timer&&clearTimeout(this._.timer);const g=CKEDITOR.focusManager._.blurDelay;c||!g?h.call(this):this._.timer=
    CKEDITOR.tools.setTimeout(function(){
 delete this._.timer;h.call(this); 
}, g, this); 
} 
}, add:function(c, h){
 var g=c.getCustomData('focusmanager');if(!g||g!=this){
 g&&g.remove(c);var g='focus', a='blur';h&&(CKEDITOR.env.ie?(g='focusin', a='focusout'):CKEDITOR.event.useCapture=1);const f={blur:function(){
 c.equals(this.currentActive)&&this.blur(); 
}, focus:function(){
 this.focus(c); 
}};c.on(g, f.focus, this);c.on(a, f.blur, this);h&&(CKEDITOR.event.useCapture=0);c.setCustomData('focusmanager', this);c.setCustomData('focusmanager_handlers',
    f); 
} 
}, remove:function(c){
 c.removeCustomData('focusmanager');const h=c.removeCustomData('focusmanager_handlers');c.removeListener('blur', h.blur);c.removeListener('focus', h.focus); 
}}; 
}(), CKEDITOR.keystrokeHandler=function(c){
 if(c.keystrokeHandler)return c.keystrokeHandler;this.keystrokes={};this.blockedKeystrokes={};this._={editor:c};return this; 
}, function(){
 let c, h=function(a){
 a=a.data;const f=a.getKeystroke(), g=this.keystrokes[f], k=this._.editor;c=!1===k.fire('key', {keyCode:f, domEvent:a});c||(g&&(c=!1!==
    k.execCommand(g, {from:'keystrokeHandler'})), c||(c=!!this.blockedKeystrokes[f]));c&&a.preventDefault(!0);return!c; 
}, g=function(a){
 c&&(c=!1, a.data.preventDefault(!0)); 
};CKEDITOR.keystrokeHandler.prototype={attach:function(a){
 a.on('keydown', h, this);if(CKEDITOR.env.gecko&&CKEDITOR.env.mac)a.on('keypress', g, this); 
}}; 
}(), function(){
 CKEDITOR.lang={languages:{af:1, ar:1, az:1, bg:1, bn:1, bs:1, ca:1, cs:1, cy:1, da:1, de:1, 'de-ch':1, el:1, 'en-au':1, 'en-ca':1, 'en-gb':1, en:1, eo:1, es:1, 'es-mx':1, et:1, eu:1, fa:1, fi:1, fo:1, 'fr-ca':1,
    fr:1, gl:1, gu:1, he:1, hi:1, hr:1, hu:1, id:1, is:1, it:1, ja:1, ka:1, km:1, ko:1, ku:1, lt:1, lv:1, mk:1, mn:1, ms:1, nb:1, nl:1, no:1, oc:1, pl:1, 'pt-br':1, pt:1, ro:1, ru:1, si:1, sk:1, sl:1, sq:1, 'sr-latn':1, sr:1, sv:1, th:1, tr:1, tt:1, ug:1, uk:1, vi:1, 'zh-cn':1, zh:1}, rtl:{ar:1, fa:1, he:1, ku:1, ug:1}, load:function(c, h, g){
 c&&CKEDITOR.lang.languages[c]||(c=this.detect(h, c));const a=this;h=function(){
 a[c].dir=a.rtl[c]?'rtl':'ltr';g(c, a[c]); 
};this[c]?h():CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(`lang/${c}.js`), h, this); 
}, detect:function(c,
    h){
 const g=this.languages;h=h||navigator.userLanguage||navigator.language||c;var a=h.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/), f=a[1], a=a[2];g[`${f}-${a}`]?f=`${f}-${a}`:g[f]||(f=null);CKEDITOR.lang.detect=f?function(){
 return f; 
}:function(a){
 return a; 
};return f||c; 
}}; 
}(), CKEDITOR.scriptLoader=function(){
 const c={}, h={};return{load:function(g, a, f, m){
 const k='string'===typeof g;k&&(g=[g]);f||(f=CKEDITOR);let l=g.length, b=l, d=[], e=[], n=function(b){
 a&&(k?a.call(f, b):a.call(f, d, e)); 
};if(0===b)n(!0);else{
 const t=function(a,
    f){
 (f?d:e).push(a);0>=--b&&(m&&CKEDITOR.document.getDocumentElement().removeStyle('cursor'), n(f)); 
}, x=function(a, b){
 c[a]=1;const e=h[a];delete h[a];for(let d=0;d<e.length;d++)e[d](a, b); 
}, p=function(b){
 if(c[b])t(b, !0);else{
 const e=h[b]||(h[b]=[]);e.push(t);if(!(1<e.length)){
 const d=new CKEDITOR.dom.element('script');d.setAttributes({type:'text/javascript', src:b});a&&(CKEDITOR.env.ie&&(8>=CKEDITOR.env.version||CKEDITOR.env.ie9Compat)?d.$.onreadystatechange=function(){
 if('loaded'==d.$.readyState||'complete'==
    d.$.readyState)d.$.onreadystatechange=null, x(b, !0); 
}:(d.$.onload=function(){
 setTimeout(function(){
 d.$.onload=null;d.$.onerror=null;x(b, !0); 
}, 0); 
}, d.$.onerror=function(){
 d.$.onload=null;d.$.onerror=null;x(b, !1); 
}));d.appendTo(CKEDITOR.document.getHead()); 
} 
} 
};m&&CKEDITOR.document.getDocumentElement().setStyle('cursor', 'wait');for(let q=0;q<l;q++)p(g[q]); 
} 
}, queue:function(){
 function c(){
 let f;(f=a[0])&&this.load(f.scriptUrl, f.callback, CKEDITOR, 0); 
}var a=[];return function(f, h){
 const k=this;a.push({scriptUrl:f,
    callback:function(){
 h&&h.apply(this, arguments);a.shift();c.call(k); 
}});1==a.length&&c.call(this); 
}; 
}()}; 
}(), CKEDITOR.resourceManager=function(c, h){
 this.basePath=c;this.fileName=h;this.registered={};this.loaded={};this.externals={};this._={waitingList:{}}; 
}, CKEDITOR.resourceManager.prototype={add:function(c, h){
 if(this.registered[c])throw Error(`[CKEDITOR.resourceManager.add] The resource name "${c}" is already registered.`);const g=this.registered[c]=h||{};g.name=c;g.path=this.getPath(c);CKEDITOR.fire(`${c+
    CKEDITOR.tools.capitalize(this.fileName)}Ready`, g);return this.get(c); 
}, get:function(c){
 return this.registered[c]||null; 
}, getPath:function(c){
 const h=this.externals[c];return CKEDITOR.getUrl(h&&h.dir||`${this.basePath+c}/`); 
}, getFilePath:function(c){
 const h=this.externals[c];return CKEDITOR.getUrl(this.getPath(c)+(h?h.file:`${this.fileName}.js`)); 
}, addExternal:function(c, h, g){
 g||(h=h.replace(/[^\/]+$/, function(a){
 g=a;return''; 
}));g=g||`${this.fileName}.js`;c=c.split(',');for(let a=0;a<c.length;a++)this.externals[c[a]]=
    {dir:h, file:g}; 
}, load:function(c, h, g){
 CKEDITOR.tools.isArray(c)||(c=c?[c]:[]);for(var a=this.loaded, f=this.registered, m=[], k={}, l={}, b=0;b<c.length;b++){
 const d=c[b];if(d)if(a[d]||f[d])l[d]=this.get(d);else{
 const e=this.getFilePath(d);m.push(e);e in k||(k[e]=[]);k[e].push(d); 
} 
}CKEDITOR.scriptLoader.load(m, function(b, e){
 if(e.length)throw Error(`[CKEDITOR.resourceManager.load] Resource name "${k[e[0]].join(',')}" was not found at "${e[0]}".`);for(let d=0;d<b.length;d++)for(let f=k[b[d]], c=0;c<f.length;c++){
 const m=
    f[c];l[m]=this.get(m);a[m]=1; 
}h.call(g, l); 
}, this); 
}}, CKEDITOR.plugins=new CKEDITOR.resourceManager('plugins/', 'plugin'), CKEDITOR.plugins.load=CKEDITOR.tools.override(CKEDITOR.plugins.load, function(c){
 const h={};return function(g, a, f){
 const m={}, k=function(g){
 c.call(this, g, function(b){
 CKEDITOR.tools.extend(m, b);let d=[], e;for(e in b){
 var c=b[e], g=c&&c.requires;if(!h[e]){
 if(c.icons)for(let l=c.icons.split(','), p=l.length;p--;)CKEDITOR.skin.addIcon(l[p], `${c.path}icons/${CKEDITOR.env.hidpi&&c.hidpi?'hidpi/':
    ''}${l[p]}.png`);c.isSupportedEnvironment=c.isSupportedEnvironment||function(){
 return!0; 
};h[e]=1; 
}if(g)for(g.split&&(g=g.split(',')), c=0;c<g.length;c++)m[g[c]]||d.push(g[c]); 
}if(d.length)k.call(this, d);else{
 for(e in m)c=m[e], c.onLoad&&!c.onLoad._called&&(!1===c.onLoad()&&delete m[e], c.onLoad._called=1);a&&a.call(f||window, m); 
} 
}, this); 
};k.call(this, g); 
}; 
}), CKEDITOR.plugins.setLang=function(c, h, g){
 let a=this.get(c);c=a.langEntries||(a.langEntries={});a=a.lang||(a.lang=[]);a.split&&(a=a.split(','));-1==CKEDITOR.tools.indexOf(a,
    h)&&a.push(h);c[h]=g; 
}, CKEDITOR.ui=function(c){
 if(c.ui)return c.ui;this.items={};this.instances={};this.editor=c;this._={handlers:{}};return this; 
}, CKEDITOR.ui.prototype={add:function(c, h, g){
 g.name=c.toLowerCase();const a=this.items[c]={type:h, command:g.command||null, args:Array.prototype.slice.call(arguments, 2)};CKEDITOR.tools.extend(a, g); 
}, get:function(c){
 return this.instances[c]; 
}, create:function(c){
 var h=this.items[c], g=h&&this._.handlers[h.type], a=h&&h.command&&this.editor.getCommand(h.command), g=g&&
    g.create.apply(this, h.args);this.instances[c]=g;a&&a.uiItems.push(g);g&&!g.type&&(g.type=h.type);return g; 
}, addHandler:function(c, h){
 this._.handlers[c]=h; 
}, space:function(c){
 return CKEDITOR.document.getById(this.spaceId(c)); 
}, spaceId:function(c){
 return `${this.editor.id}_${c}`; 
}}, CKEDITOR.event.implementOn(CKEDITOR.ui), function(){
 function c(b, e, d){
 CKEDITOR.event.call(this);b=b&&CKEDITOR.tools.clone(b);if(void 0!==e){
 if(!(e instanceof CKEDITOR.dom.element))throw Error('Expect element of type CKEDITOR.dom.element.');
    if(!d)throw Error('One of the element modes must be specified.');if(CKEDITOR.env.ie&&CKEDITOR.env.quirks&&d==CKEDITOR.ELEMENT_MODE_INLINE)throw Error('Inline element mode is not supported on IE quirks.');if(!g(e, d))throw Error(`The specified element mode is not supported on element: "${e.getName()}".`);this.element=e;this.elementMode=d;this.name=this.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO&&(e.getId()||e.getNameAtt()); 
}else this.elementMode=CKEDITOR.ELEMENT_MODE_NONE;this._={};this.commands={};
    this.templates={};this.name=this.name||h();this.id=CKEDITOR.tools.getNextId();this.status='unloaded';this.config=CKEDITOR.tools.prototypedCopy(CKEDITOR.config);this.ui=new CKEDITOR.ui(this);this.focusManager=new CKEDITOR.focusManager(this);this.keystrokeHandler=new CKEDITOR.keystrokeHandler(this);this.on('readOnly', a);this.on('selectionChange', function(a){
 m(this, a.data.path); 
});this.on('activeFilterChange', function(){
 m(this, this.elementPath(), !0); 
});this.on('mode', a);CKEDITOR.dom.selection.setupEditorOptimization(this);
    this.on('instanceReady', function(){
 if(this.config.startupFocus){
 if('end'===this.config.startupFocus){
 const a=this.createRange();a.selectNodeContents(this.editable());a.shrink(CKEDITOR.SHRINK_ELEMENT, !0);a.collapse();this.getSelection().selectRanges([a]); 
}this.focus(); 
} 
});CKEDITOR.fire('instanceCreated', null, this);CKEDITOR.add(this);CKEDITOR.tools.setTimeout(function(){
 this.isDestroyed()||this.isDetached()||l(this, b); 
}, 0, this); 
}function h(){
 do var a=`editor${ ++p}`;while(CKEDITOR.instances[a]);return a; 
}function g(a,
    b){
 return b==CKEDITOR.ELEMENT_MODE_INLINE?a.is(CKEDITOR.dtd.$editable)||a.is('textarea'):b==CKEDITOR.ELEMENT_MODE_REPLACE?!a.is(CKEDITOR.dtd.$nonBodyContent):1; 
}function a(){
 let a=this.commands, b;for(b in a)f(this, a[b]); 
}function f(a, b){
 b[b.startDisabled?'disable':a.readOnly&&!b.readOnly?'disable':b.modes[a.mode]?'enable':'disable'](); 
}function m(a, b, e){
 if(b){
 let d, f, c=a.commands;for(f in c)d=c[f], (e||d.contextSensitive)&&d.refresh(a, b); 
} 
}function k(a){
 var b=a.config.customConfig;if(!b)return!1;var b=
    CKEDITOR.getUrl(b), e=q[b]||(q[b]={});e.fn?(e.fn.call(a, a.config), CKEDITOR.getUrl(a.config.customConfig)!=b&&k(a)||a.fireOnce('customConfigLoaded')):CKEDITOR.scriptLoader.queue(b, function(){
 e.fn=e.fn||CKEDITOR.editorConfig||function(){};k(a); 
});return!0; 
}function l(a, e){
 a.on('customConfigLoaded', function(){
 if(e){
 if(e.on)for(var d in e.on)a.on(d, e.on[d]);CKEDITOR.tools.extend(a.config, e, !0);delete a.config.on; 
}d=a.config;a.readOnly=d.readOnly?!0:a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?a.element.is('textarea')?
    a.element.hasAttribute('disabled')||a.element.hasAttribute('readonly'):a.element.isReadOnly():a.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE?a.element.hasAttribute('disabled')||a.element.hasAttribute('readonly'):!1;a.blockless=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?!(a.element.is('textarea')||CKEDITOR.dtd[a.element.getName()].p):!1;a.tabIndex=d.tabIndex||a.element&&a.element.getAttribute('tabindex')||0;a.activeEnterMode=a.enterMode=a.blockless?CKEDITOR.ENTER_BR:d.enterMode;a.activeShiftEnterMode=
    a.shiftEnterMode=a.blockless?CKEDITOR.ENTER_BR:d.shiftEnterMode;d.skin&&(CKEDITOR.skinName=d.skin);a.fireOnce('configLoaded');a.dataProcessor=new CKEDITOR.htmlDataProcessor(a);a.filter=a.activeFilter=new CKEDITOR.filter(a);b(a); 
});e&&null!=e.customConfig&&(a.config.customConfig=e.customConfig);k(a)||a.fireOnce('customConfigLoaded'); 
}function b(a){
 CKEDITOR.skin.loadPart('editor', function(){
 d(a); 
}); 
}function d(a){
 CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function(b, d){
 const f=a.config.title;
    a.langCode=b;a.lang=CKEDITOR.tools.prototypedCopy(d);a.title='string'===typeof f||!1===f?f:[a.lang.editor, a.name].join(', ');a.config.contentsLangDirection||(a.config.contentsLangDirection=a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?a.element.getDirection(1):a.lang.dir);a.fire('langLoaded');e(a); 
}); 
}function e(a){
 a.getStylesSet(function(b){
 a.once('loaded', function(){
 a.fire('stylesSet', {styles:b}); 
}, null, null, 1);n(a); 
}); 
}function n(a){
 function b(a){
 if(!a)return'';CKEDITOR.tools.isArray(a)&&(a=a.join(','));
    return a.replace(/\s/g, ''); 
}var e=a.config, d=b(e.plugins), f=b(e.extraPlugins), c=b(e.removePlugins);if(f)var g=new RegExp(`(?:^|,)(?:${f.replace(/,/g, '|')})(?\x3d,|$)`, 'g'), d=d.replace(g, ''), d=`${d},${f}`;if(c)var k=new RegExp(`(?:^|,)(?:${c.replace(/,/g, '|')})(?\x3d,|$)`, 'g'), d=d.replace(k, '');CKEDITOR.env.air&&(d+=',adobeair');CKEDITOR.plugins.load(d.split(','), function(b){
 const d=[], f=[], c=[];a.plugins=CKEDITOR.tools.extend({}, a.plugins, b);for(const g in b){
 var h=b[g], l=h.lang, m=null, n=h.requires, y;
    CKEDITOR.tools.isArray(n)&&(n=n.join(','));if(n&&(y=n.match(k)))for(;n=y.pop();)CKEDITOR.error('editor-plugin-required', {plugin:n.replace(',', ''), requiredBy:g});l&&!a.lang[g]&&(l.split&&(l=l.split(',')), 0<=CKEDITOR.tools.indexOf(l, a.langCode)?m=a.langCode:(m=a.langCode.replace(/-.*/, ''), m=m!=a.langCode&&0<=CKEDITOR.tools.indexOf(l, m)?m:0<=CKEDITOR.tools.indexOf(l, 'en')?'en':l[0]), h.langEntries&&h.langEntries[m]?(a.lang[g]=h.langEntries[m], m=null):c.push(CKEDITOR.getUrl(`${h.path}lang/${m}.js`)));f.push(m);
    d.push(h); 
}CKEDITOR.scriptLoader.load(c, function(){
 if(!a.isDestroyed()&&!a.isDetached()){
 for(let b=['beforeInit', 'init', 'afterInit'], c=0;c<b.length;c++)for(var g=0;g<d.length;g++){
 const k=d[g];0===c&&f[g]&&k.lang&&k.langEntries&&(a.lang[k.name]=k.langEntries[f[g]]);if(k[b[c]])k[b[c]](a); 
}a.fireOnce('pluginsLoaded');e.keystrokes&&a.setKeystroke(a.config.keystrokes);for(g=0;g<a.config.blockedKeystrokes.length;g++)a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[g]]=1;a.status='loaded';a.fireOnce('loaded');
    CKEDITOR.fire('instanceLoaded', null, a); 
} 
}); 
}); 
}function t(){
 const a=this.element;if(a&&this.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO){
 let b=this.getData();this.config.htmlEncodeOutput&&(b=CKEDITOR.tools.htmlEncode(b));a.is('textarea')?a.setValue(b):a.setHtml(b);return!0; 
}return!1; 
}function x(a, b){
 function e(a){
 const b=a.startContainer, d=a.endContainer;return b.is&&(b.is('tr')||b.is('td')&&b.equals(d)&&a.endOffset===b.getChildCount())?!0:!1; 
}function d(a){
 const b=a.startContainer;return b.is('tr')?a.cloneContents():
    b.clone(!0); 
}for(var f=new CKEDITOR.dom.documentFragment, c, g, k, h=0;h<a.length;h++){
 const l=a[h], m=l.startContainer.getAscendant('tr', !0);e(l)?(c||(c=m.getAscendant('table').clone(), c.append(m.getAscendant({thead:1, tbody:1, tfoot:1}).clone()), f.append(c), c=c.findOne('thead, tbody, tfoot')), g&&g.equals(m)||(g=m, k=m.clone(), c.append(k)), k.append(d(l))):f.append(l.cloneContents()); 
}return c?f:b.getHtmlFromRange(a[0]); 
}c.prototype=CKEDITOR.editor.prototype;CKEDITOR.editor=c;var p=0, q={};CKEDITOR.tools.extend(CKEDITOR.editor.prototype,
    {plugins:{detectConflict:function(a, b){
 for(let e=0;e<b.length;e++){
 const d=b[e];if(this[d])return CKEDITOR.warn('editor-plugin-conflict', {plugin:a, replacedWith:d}), !0; 
}return!1; 
}}, addCommand:function(a, b){
 b.name=a.toLowerCase();const e=b instanceof CKEDITOR.command?b:new CKEDITOR.command(this, b);this.mode&&f(this, e);return this.commands[a]=e; 
}, _attachToForm:function(){
 function a(b){
 e.updateElement();e._.required&&!d.getValue()&&!1===e.fire('required')&&b.data.preventDefault(); 
}function b(a){
 return!!(a&&a.call&&
    a.apply); 
}var e=this, d=e.element, f=new CKEDITOR.dom.element(d.$.form);d.is('textarea')&&f&&(f.on('submit', a), b(f.$.submit)&&(f.$.submit=CKEDITOR.tools.override(f.$.submit, function(b){
 return function(){
 a();b.apply?b.apply(this):b(); 
}; 
})), e.on('destroy', function(){
 f.removeListener('submit', a); 
})); 
}, destroy:function(a){
 const b=CKEDITOR.filter.instances, e=this;this.fire('beforeDestroy');!a&&t.call(this);this.editable(null);this.filter&&delete this.filter;CKEDITOR.tools.array.forEach(CKEDITOR.tools.object.keys(b),
    function(a){
 a=b[a];e===a.editor&&a.destroy(); 
});delete this.activeFilter;this.status='destroyed';this.fire('destroy');this.removeAllListeners();CKEDITOR.remove(this);CKEDITOR.fire('instanceDestroyed', null, this); 
}, elementPath:function(a){
 if(!a){
 a=this.getSelection();if(!a)return null;a=a.getStartElement(); 
}return a?new CKEDITOR.dom.elementPath(a, this.editable()):null; 
}, createRange:function(){
 const a=this.editable();return a?new CKEDITOR.dom.range(a):null; 
}, execCommand:function(a, b){
 const e=this.getCommand(a),
    d={name:a, commandData:b||{}, command:e};return e&&e.state!=CKEDITOR.TRISTATE_DISABLED&&!1!==this.fire('beforeCommandExec', d)&&(d.returnValue=e.exec(d.commandData), !e.async&&!1!==this.fire('afterCommandExec', d))?d.returnValue:!1; 
}, getCommand:function(a){
 return this.commands[a]; 
}, getData:function(a){
 !a&&this.fire('beforeGetData');let b=this._.data;'string'!==typeof b&&(b=(b=this.element)&&this.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE?b.is('textarea')?b.getValue():b.getHtml():'');b={dataValue:b};!a&&this.fire('getData',
    b);return b.dataValue; 
}, getSnapshot:function(){
 let a=this.fire('getSnapshot');'string'!==typeof a&&(a=(a=this.element)&&this.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE?a.is('textarea')?a.getValue():a.getHtml():'');return a; 
}, loadSnapshot:function(a){
 this.fire('loadSnapshot', a); 
}, setData:function(a, b, e){
 let d=!0, f=b;b&&'object'===typeof b&&(e=b.internal, f=b.callback, d=!b.noSnapshot);!e&&d&&this.fire('saveSnapshot');if(f||!e)this.once('dataReady', function(a){
 !e&&d&&this.fire('saveSnapshot');f&&f.call(a.editor); 
});
    a={dataValue:a};!e&&this.fire('setData', a);this._.data=a.dataValue;!e&&this.fire('afterSetData', a); 
}, setReadOnly:function(a){
 a=null==a||a;this.readOnly!=a&&(this.readOnly=a, this.keystrokeHandler.blockedKeystrokes[8]=+a, this.editable().setReadOnly(a), this.fire('readOnly')); 
}, insertHtml:function(a, b, e){
 this.fire('insertHtml', {dataValue:a, mode:b, range:e}); 
}, insertText:function(a){
 this.fire('insertText', a); 
}, insertElement:function(a){
 this.fire('insertElement', a); 
}, getSelectedHtml:function(a){
 var b=this.editable(),
    e=this.getSelection(), e=e&&e.getRanges();if(!b||!e||0===e.length)return null;b=x(e, b);return a?b.getHtml():b; 
}, extractSelectedHtml:function(a, b){
 let e=this.editable(), d=this.getSelection().getRanges(), f=new CKEDITOR.dom.documentFragment, c;if(!e||0===d.length)return null;for(c=0;c<d.length;c++)f.append(e.extractHtmlFromRange(d[c], b));b||this.getSelection().selectRanges([d[0]]);return a?f.getHtml():f; 
}, focus:function(){
 this.fire('beforeFocus'); 
}, checkDirty:function(){
 return'ready'==this.status&&this._.previousValue!==
    this.getSnapshot(); 
}, resetDirty:function(){
 this._.previousValue=this.getSnapshot(); 
}, updateElement:function(){
 return t.call(this); 
}, setKeystroke:function(){
 for(var a=this.keystrokeHandler.keystrokes, b=CKEDITOR.tools.isArray(arguments[0])?arguments[0]:[[].slice.call(arguments, 0)], e, d, f=b.length;f--;)e=b[f], d=0, CKEDITOR.tools.isArray(e)&&(d=e[1], e=e[0]), d?a[e]=d:delete a[e]; 
}, getCommandKeystroke:function(a, b){
 const e='string'===typeof a?this.getCommand(a):a, d=[];if(e){
 const f=CKEDITOR.tools.object.findKey(this.commands,
    e), c=this.keystrokeHandler.keystrokes;if(e.fakeKeystroke)d.push(e.fakeKeystroke);else for(const g in c)c[g]===f&&d.push(g); 
}return b?d:d[0]||null; 
}, addFeature:function(a){
 return this.filter.addFeature(a); 
}, setActiveFilter:function(a){
 a||(a=this.filter);this.activeFilter!==a&&(this.activeFilter=a, this.fire('activeFilterChange'), a===this.filter?this.setActiveEnterMode(null, null):this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode), a.getAllowedEnterMode(this.shiftEnterMode, !0))); 
}, setActiveEnterMode:function(a,
    b){
 a=a?this.blockless?CKEDITOR.ENTER_BR:a:this.enterMode;b=b?this.blockless?CKEDITOR.ENTER_BR:b:this.shiftEnterMode;if(this.activeEnterMode!=a||this.activeShiftEnterMode!=b)this.activeEnterMode=a, this.activeShiftEnterMode=b, this.fire('activeEnterModeChange'); 
}, showNotification:function(a){
 alert(a); 
}, isDetached:function(){
 return!!this.container&&this.container.isDetached(); 
}, isDestroyed:function(){
 return'destroyed'===this.status; 
}});CKEDITOR.editor._getEditorElement=function(a){
 if(!CKEDITOR.env.isCompatible)return null;
    const b=CKEDITOR.dom.element.get(a);return b?b.getEditor()?(CKEDITOR.error('editor-element-conflict', {editorName:b.getEditor().name}), null):b:(CKEDITOR.error('editor-incorrect-element', {element:a}), null); 
}; 
}(), CKEDITOR.ELEMENT_MODE_NONE=0, CKEDITOR.ELEMENT_MODE_REPLACE=1, CKEDITOR.ELEMENT_MODE_APPENDTO=2, CKEDITOR.ELEMENT_MODE_INLINE=3, CKEDITOR.htmlParser=function(){
 this._={htmlPartsRegex:/<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g}; 
},
    function(){
 const c=/([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g, h={checked:1, compact:1, declare:1, defer:1, disabled:1, ismap:1, multiple:1, nohref:1, noresize:1, noshade:1, nowrap:1, readonly:1, selected:1};CKEDITOR.htmlParser.prototype={onTagOpen:function(){}, onTagClose:function(){}, onText:function(){}, onCDATA:function(){}, onComment:function(){}, parse:function(g){
 for(var a, f, m=0, k;a=this._.htmlPartsRegex.exec(g);){
 f=a.index;if(f>m)if(m=g.substring(m, f), k)k.push(m);else this.onText(m);
    m=this._.htmlPartsRegex.lastIndex;if(f=a[1])if(f=f.toLowerCase(), k&&CKEDITOR.dtd.$cdata[f]&&(this.onCDATA(k.join('')), k=null), !k){
 this.onTagClose(f);continue; 
}if(k)k.push(a[0]);else if(f=a[3]){
 if(f=f.toLowerCase(), !/="/.test(f)){
 var l={}, b, d=a[4];a=!!a[5];if(d)for(;b=c.exec(d);){
 const e=b[1].toLowerCase();b=b[2]||b[3]||b[4]||'';l[e]=!b&&h[e]?e:CKEDITOR.tools.htmlDecodeAttr(b); 
}this.onTagOpen(f, l, a);!k&&CKEDITOR.dtd.$cdata[f]&&(k=[]); 
} 
}else if(f=a[2])this.onComment(f); 
}if(g.length>m)this.onText(g.substring(m,
    g.length)); 
}}; 
}(), CKEDITOR.htmlParser.basicWriter=CKEDITOR.tools.createClass({$:function(){
 this._={output:[]}; 
}, proto:{openTag:function(c){
 this._.output.push('\x3c', c); 
}, openTagClose:function(c, h){
 h?this._.output.push(' /\x3e'):this._.output.push('\x3e'); 
}, attribute:function(c, h){
 'string'===typeof h&&(h=CKEDITOR.tools.htmlEncodeAttr(h));this._.output.push(' ', c, '\x3d"', h, '"'); 
}, closeTag:function(c){
 this._.output.push('\x3c/', c, '\x3e'); 
}, text:function(c){
 this._.output.push(c); 
}, comment:function(c){
 this._.output.push('\x3c!--',
    c, '--\x3e'); 
}, write:function(c){
 this._.output.push(c); 
}, reset:function(){
 this._.output=[];this._.indent=!1; 
}, getHtml:function(c){
 const h=this._.output.join('');c&&this.reset();return h; 
}}}), 'use strict', function(){
 CKEDITOR.htmlParser.node=function(){};CKEDITOR.htmlParser.node.prototype={remove:function(){
 const c=this.parent.children, h=CKEDITOR.tools.indexOf(c, this), g=this.previous, a=this.next;g&&(g.next=a);a&&(a.previous=g);c.splice(h, 1);this.parent=null; 
}, replaceWith:function(c){
 const h=this.parent.children,
    g=CKEDITOR.tools.indexOf(h, this), a=c.previous=this.previous, f=c.next=this.next;a&&(a.next=c);f&&(f.previous=c);h[g]=c;c.parent=this.parent;this.parent=null; 
}, insertAfter:function(c){
 const h=c.parent.children, g=CKEDITOR.tools.indexOf(h, c), a=c.next;h.splice(g+1, 0, this);this.next=c.next;this.previous=c;c.next=this;a&&(a.previous=this);this.parent=c.parent; 
}, insertBefore:function(c){
 const h=c.parent.children, g=CKEDITOR.tools.indexOf(h, c);h.splice(g, 0, this);this.next=c;(this.previous=c.previous)&&(c.previous.next=
    this);c.previous=this;this.parent=c.parent; 
}, getAscendant:function(c){
 let h='function'===typeof c?c:'string'===typeof c?function(a){
 return a.name==c; 
}:function(a){
 return a.name in c; 
}, g=this.parent;for(;g&&g.type==CKEDITOR.NODE_ELEMENT;){
 if(h(g))return g;g=g.parent; 
}return null; 
}, wrapWith:function(c){
 this.replaceWith(c);c.add(this);return c; 
}, getIndex:function(){
 return CKEDITOR.tools.indexOf(this.parent.children, this); 
}, getFilterContext:function(c){
 return c||{}; 
}}; 
}(), 'use strict', CKEDITOR.htmlParser.comment=
    function(c){
 this.value=c;this._={isBlockLike:!1}; 
}, CKEDITOR.htmlParser.comment.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {type:CKEDITOR.NODE_COMMENT, filter:function(c, h){
 let g=this.value;if(!(g=c.onComment(h, g, this)))return this.remove(), !1;if('string'!==typeof g)return this.replaceWith(g), !1;this.value=g;return!0; 
}, writeHtml:function(c, h){
 h&&this.filter(h);c.comment(this.value); 
}}), 'use strict', function(){
 CKEDITOR.htmlParser.text=function(c){
 this.value=c;this._={isBlockLike:!1}; 
};CKEDITOR.htmlParser.text.prototype=
    CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {type:CKEDITOR.NODE_TEXT, filter:function(c, h){
 if(!(this.value=c.onText(h, this.value, this)))return this.remove(), !1; 
}, writeHtml:function(c, h){
 h&&this.filter(h);c.text(this.value); 
}}); 
}(), 'use strict', function(){
 CKEDITOR.htmlParser.cdata=function(c){
 this.value=c; 
};CKEDITOR.htmlParser.cdata.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {type:CKEDITOR.NODE_TEXT, filter:function(){}, writeHtml:function(c){
 c.write(this.value); 
}}); 
}(), 'use strict',
    CKEDITOR.htmlParser.fragment=function(){
 this.children=[];this.parent=null;this._={isBlockLike:!0, hasInlineStarted:!1}; 
}, function(){
 function c(a){
 return a.attributes['data-cke-survive']?!1:'a'==a.name&&a.attributes.href||CKEDITOR.dtd.$removeEmpty[a.name]; 
}const h=CKEDITOR.tools.extend({table:1, ul:1, ol:1, dl:1}, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl), g={ol:1, ul:1}, a=CKEDITOR.tools.extend({}, {html:1}, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, {style:1, script:1}), f={ul:'li',
    ol:'li', dl:'dd', table:'tbody', tbody:'tr', thead:'tr', tfoot:'tr', tr:'td'};CKEDITOR.htmlParser.fragment.fromHtml=function(m, k, l){
 function b(a){
 let b;if(0<v.length)for(let e=0;e<v.length;e++){
 let f=v[e], c=f.name, g=CKEDITOR.dtd[c], k=u.name&&CKEDITOR.dtd[u.name];k&&!k[c]||a&&g&&!g[a]&&CKEDITOR.dtd[a]?c==u.name&&(n(u, u.parent, 1), e--):(b||(d(), b=1), f=f.clone(), f.parent=u, u=f, v.splice(e, 1), e--); 
} 
}function d(){
 for(;w.length;)n(w.shift(), u); 
}function e(a){
 if(a._.isBlockLike&&'pre'!=a.name&&'textarea'!=a.name){
 let b=
    a.children.length, e=a.children[b-1], d;e&&e.type==CKEDITOR.NODE_TEXT&&((d=CKEDITOR.tools.rtrim(e.value))?e.value=d:a.children.length=b-1); 
} 
}function n(a, b, d){
 b=b||u||q;const f=u;void 0===a.previous&&(t(b, a)&&(u=b, p.onTagOpen(l, {}), a.returnPoint=b=u), e(a), c(a)&&!a.children.length||b.add(a), 'pre'==a.name&&(r=!1), 'textarea'==a.name&&(A=!1));a.returnPoint?(u=a.returnPoint, delete a.returnPoint):u=d?b:f; 
}function t(a, b){
 if((a==q||'body'==a.name)&&l&&(!a.name||CKEDITOR.dtd[a.name][l])){
 let e, d;return(e=b.attributes&&
    (d=b.attributes['data-cke-real-element-type'])?d:b.name)&&e in CKEDITOR.dtd.$inline&&!(e in CKEDITOR.dtd.head)&&!b.isOrphan||b.type==CKEDITOR.NODE_TEXT; 
} 
}function x(a, b){
 return a in CKEDITOR.dtd.$listItem||a in CKEDITOR.dtd.$tableContent?a==b||'dt'==a&&'dd'==b||'dd'==a&&'dt'==b:!1; 
}var p=new CKEDITOR.htmlParser, q=k instanceof CKEDITOR.htmlParser.element?k:'string'===typeof k?new CKEDITOR.htmlParser.element(k):new CKEDITOR.htmlParser.fragment, v=[], w=[], u=q, A='textarea'==q.name, r='pre'==q.name;p.onTagOpen=
    function(e, f, k, l){
 f=new CKEDITOR.htmlParser.element(e, f);f.isUnknown&&k&&(f.isEmpty=!0);f.isOptionalClose=l;if(c(f))v.push(f);else{
 if('pre'==e)r=!0;else{
 if('br'==e&&r){
 u.add(new CKEDITOR.htmlParser.text('\n'));return; 
}'textarea'==e&&(A=!0); 
}if('br'==e)w.push(f);else{
 for(;!(l=(k=u.name)?CKEDITOR.dtd[k]||(u._.isBlockLike?CKEDITOR.dtd.div:CKEDITOR.dtd.span):a, f.isUnknown||u.isUnknown||l[e]);)if(u.isOptionalClose)p.onTagClose(k);else if(e in g&&k in g)k=u.children, (k=k[k.length-1])&&'li'==k.name||n(k=new CKEDITOR.htmlParser.element('li'),
    u), !f.returnPoint&&(f.returnPoint=u), u=k;else if(e in CKEDITOR.dtd.$listItem&&!x(e, k))p.onTagOpen('li'==e?'ul':'dl', {}, 0, 1);else if(k in h&&!x(e, k))!f.returnPoint&&(f.returnPoint=u), u=u.parent;else if(k in CKEDITOR.dtd.$inline&&v.unshift(u), u.parent)n(u, u.parent, 1);else{
 f.isOrphan=1;break; 
}b(e);d();f.parent=u;f.isEmpty?n(f):u=f; 
} 
} 
};p.onTagClose=function(a){
 for(var b=v.length-1;0<=b;b--)if(a==v[b].name){
 v.splice(b, 1);return; 
}for(var e=[], f=[], c=u;c!=q&&c.name!=a;)c._.isBlockLike||f.unshift(c), e.push(c),
    c=c.returnPoint||c.parent;if(c!=q){
 for(b=0;b<e.length;b++){
 const g=e[b];n(g, g.parent); 
}u=c;c._.isBlockLike&&d();n(c, c.parent);c==u&&(u=u.parent);v=v.concat(f); 
}'body'==a&&(l=!1); 
};p.onText=function(e){
 if(!(u._.hasInlineStarted&&!w.length||r||A)&&(e=CKEDITOR.tools.ltrim(e), 0===e.length))return;const c=u.name, g=c?CKEDITOR.dtd[c]||(u._.isBlockLike?CKEDITOR.dtd.div:CKEDITOR.dtd.span):a;if(!A&&!g['#']&&c in h)p.onTagOpen(f[c]||''), p.onText(e);else{
 d();b();r||A||(e=e.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, ' '));e=
    new CKEDITOR.htmlParser.text(e);if(t(u, e))this.onTagOpen(l, {}, 0, 1);u.add(e); 
} 
};p.onCDATA=function(a){
 u.add(new CKEDITOR.htmlParser.cdata(a)); 
};p.onComment=function(a){
 d();b();u.add(new CKEDITOR.htmlParser.comment(a)); 
};p.parse(m);for(d();u!=q;)n(u, u.parent, 1);e(q);return q; 
};CKEDITOR.htmlParser.fragment.prototype={type:CKEDITOR.NODE_DOCUMENT_FRAGMENT, add:function(a, f){
 isNaN(f)&&(f=this.children.length);const c=0<f?this.children[f-1]:null;if(c){
 if(a._.isBlockLike&&c.type==CKEDITOR.NODE_TEXT&&(c.value=CKEDITOR.tools.rtrim(c.value),
    0===c.value.length)){
 this.children.pop();this.add(a);return; 
}c.next=a; 
}a.previous=c;a.parent=this;this.children.splice(f, 0, a);this._.hasInlineStarted||(this._.hasInlineStarted=a.type==CKEDITOR.NODE_TEXT||a.type==CKEDITOR.NODE_ELEMENT&&!a._.isBlockLike); 
}, filter:function(a, f){
 f=this.getFilterContext(f);a.onRoot(f, this);this.filterChildren(a, !1, f); 
}, filterChildren:function(a, f, c){
 if(this.childrenFilteredBy!=a.id){
 c=this.getFilterContext(c);if(f&&!this.parent)a.onRoot(c, this);this.childrenFilteredBy=a.id;
    for(f=0;f<this.children.length;f++)!1===this.children[f].filter(a, c)&&f--; 
} 
}, writeHtml:function(a, f){
 f&&this.filter(f);this.writeChildrenHtml(a); 
}, writeChildrenHtml:function(a, f, c){
 let b=this.getFilterContext();if(c&&!this.parent&&f)f.onRoot(b, this);f&&this.filterChildren(f, !1, b);f=0;c=this.children;for(b=c.length;f<b;f++)c[f].writeHtml(a); 
}, forEach:function(a, f, c){
 if(!(c||f&&this.type!=f))var b=a(this);if(!1!==b){
 c=this.children;for(let d=0;d<c.length;d++)b=c[d], b.type==CKEDITOR.NODE_ELEMENT?b.forEach(a,
    f):f&&b.type!=f||a(b); 
} 
}, getFilterContext:function(a){
 return a||{}; 
}}; 
}(), 'use strict', function(){
 function c(){
 this.rules=[]; 
}function h(g, a, f, h){
 let k, l;for(k in a)(l=g[k])||(l=g[k]=new c), l.add(a[k], f, h); 
}CKEDITOR.htmlParser.filter=CKEDITOR.tools.createClass({$:function(g){
 this.id=CKEDITOR.tools.getNextNumber();this.elementNameRules=new c;this.attributeNameRules=new c;this.elementsRules={};this.attributesRules={};this.textRules=new c;this.commentRules=new c;this.rootRules=new c;g&&this.addRules(g, 10); 
},
    proto:{addRules:function(c, a){
 let f;'number'===typeof a?f=a:a&&'priority'in a&&(f=a.priority);'number'!==typeof f&&(f=10);'object'!==typeof a&&(a={});c.elementNames&&this.elementNameRules.addMany(c.elementNames, f, a);c.attributeNames&&this.attributeNameRules.addMany(c.attributeNames, f, a);c.elements&&h(this.elementsRules, c.elements, f, a);c.attributes&&h(this.attributesRules, c.attributes, f, a);c.text&&this.textRules.add(c.text, f, a);c.comment&&this.commentRules.add(c.comment, f, a);c.root&&this.rootRules.add(c.root,
    f, a); 
}, applyTo:function(c){
 c.filter(this); 
}, onElementName:function(c, a){
 return this.elementNameRules.execOnName(c, a); 
}, onAttributeName:function(c, a){
 return this.attributeNameRules.execOnName(c, a); 
}, onText:function(c, a, f){
 return this.textRules.exec(c, a, f); 
}, onComment:function(c, a, f){
 return this.commentRules.exec(c, a, f); 
}, onRoot:function(c, a){
 return this.rootRules.exec(c, a); 
}, onElement:function(c, a){
 for(var f=[this.elementsRules['^'], this.elementsRules[a.name], this.elementsRules.$], h, k=0;3>k;k++)if(h=f[k]){
 h=
    h.exec(c, a, this);if(!1===h)return null;if(h&&h!=a)return this.onNode(c, h);if(a.parent&&!a.name)break; 
}return a; 
}, onNode:function(c, a){
 const f=a.type;return f==CKEDITOR.NODE_ELEMENT?this.onElement(c, a):f==CKEDITOR.NODE_TEXT?new CKEDITOR.htmlParser.text(this.onText(c, a.value, a)):f==CKEDITOR.NODE_COMMENT?new CKEDITOR.htmlParser.comment(this.onComment(c, a.value, a)):null; 
}, onAttribute:function(c, a, f, h){
 return(f=this.attributesRules[f])?f.exec(c, h, a, this):h; 
}}});CKEDITOR.htmlParser.filterRulesGroup=c;c.prototype=
    {add:function(c, a, f){
 this.rules.splice(this.findIndex(a), 0, {value:c, priority:a, options:f}); 
}, addMany:function(c, a, f){
 for(var h=[this.findIndex(a), 0], k=0, l=c.length;k<l;k++)h.push({value:c[k], priority:a, options:f});this.rules.splice.apply(this.rules, h); 
}, findIndex:function(c){
 for(var a=this.rules, f=a.length-1;0<=f&&c<a[f].priority;)f--;return f+1; 
}, exec:function(c, a){
 let f=a instanceof CKEDITOR.htmlParser.node||a instanceof CKEDITOR.htmlParser.fragment, h=Array.prototype.slice.call(arguments, 1), k=this.rules,
    l=k.length, b, d, e, n;for(n=0;n<l;n++)if(f&&(b=a.type, d=a.name), e=k[n], !(c.nonEditable&&!e.options.applyToAll||c.nestedEditable&&e.options.excludeNestedEditable)){
 e=e.value.apply(null, h);if(!1===e||f&&e&&(e.name!=d||e.type!=b))return e;null!=e&&(h[0]=a=e); 
}return a; 
}, execOnName:function(c, a){
 for(var f=0, h=this.rules, k=h.length, l;a&&f<k;f++)l=h[f], c.nonEditable&&!l.options.applyToAll||c.nestedEditable&&l.options.excludeNestedEditable||(a=a.replace(l.value[0], l.value[1]));return a; 
}}; 
}(), function(){
 function c(b,
    e){
 function d(a){
 return a||CKEDITOR.env.needsNbspFiller?new CKEDITOR.htmlParser.text(' '):new CKEDITOR.htmlParser.element('br', {'data-cke-bogus':1}); 
}function c(b, e){
 return function(f){
 if(f.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT){
 let c=[], k=g(f), l, H;if(k)for(h(k, 1)&&c.push(k);k;)m(k)&&(l=a(k))&&h(l)&&((H=a(l))&&!m(H)?c.push(l):(d(n).insertAfter(l), l.remove())), k=k.previous;for(k=0;k<c.length;k++)c[k].remove();if(c=!b||!1!==('function'===typeof e?e(f):e))n||CKEDITOR.env.needsBrFiller||f.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT?
    n||CKEDITOR.env.needsBrFiller||!(7<document.documentMode||f.name in CKEDITOR.dtd.tr||f.name in CKEDITOR.dtd.$listItem)?(c=g(f), c=!c||'form'==f.name&&'input'==c.name):c=!1:c=!1;c&&f.add(d(b)); 
} 
}; 
}function h(a, b){
 if((!n||CKEDITOR.env.needsBrFiller)&&a.type==CKEDITOR.NODE_ELEMENT&&'br'==a.name&&!a.attributes['data-cke-eol'])return!0;let e;return a.type==CKEDITOR.NODE_TEXT&&(e=a.value.match(w))&&(e.index&&((new CKEDITOR.htmlParser.text(a.value.substring(0, e.index))).insertBefore(a), a.value=e[0]), !CKEDITOR.env.needsBrFiller&&
    n&&(!b||a.parent.name in t)||!n&&((e=a.previous)&&'br'==e.name||!e||m(e)))?!0:!1; 
}var l={elements:{}}, n='html'==e, t=CKEDITOR.tools.extend({}, y), z;for(z in t)'#'in A[z]||delete t[z];for(z in t)l.elements[z]=c(n, b.config.fillEmptyBlocks);l.root=c(n, !1);l.elements.br=function(b){
 return function(e){
 if(e.parent.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT){
 let c=e.attributes;if('data-cke-bogus'in c||'data-cke-eol'in c)delete c['data-cke-bogus'];else{
 for(c=e.next;c&&f(c);)c=c.next;const g=a(e);!c&&m(e.parent)?k(e.parent,
    d(b)):m(c)&&g&&!m(g)&&d(b).insertBefore(c); 
} 
} 
}; 
}(n);return l; 
}function h(a, b){
 return a!=CKEDITOR.ENTER_BR&&!1!==b?a==CKEDITOR.ENTER_DIV?'div':'p':!1; 
}function g(a){
 for(a=a.children[a.children.length-1];a&&f(a);)a=a.previous;return a; 
}function a(a){
 for(a=a.previous;a&&f(a);)a=a.previous;return a; 
}function f(a){
 return a.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.trim(a.value)||a.type==CKEDITOR.NODE_ELEMENT&&a.attributes['data-cke-bookmark']; 
}function m(a){
 return a&&(a.type==CKEDITOR.NODE_ELEMENT&&a.name in
    y||a.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT); 
}function k(a, b){
 const e=a.children[a.children.length-1];a.children.push(b);b.parent=a;e&&(e.next=b, b.previous=e); 
}function l(a){
 a=a.attributes;'false'!=a.contenteditable&&(a['data-cke-editable']=a.contenteditable?'true':1);a.contenteditable='false'; 
}function b(a){
 a=a.attributes;switch(a['data-cke-editable']){
 case 'true':a.contenteditable='true';break;case '1':delete a.contenteditable; 
} 
}function d(a){
 return a.replace(F, function(a, b, e){
 return`\x3c${b}${e.replace(I,
    function(a, b){
 return K.test(b)&&-1==e.indexOf(`data-cke-saved-${b}`)?` data-cke-saved-${a} data-cke-${CKEDITOR.rnd}-${a}`:a; 
})}\x3e`; 
}); 
}function e(a, b){
 return a.replace(b, function(a, b, e){
 0===a.indexOf('\x3ctextarea')&&(a=`${b+x(e).replace(/</g, '\x26lt;').replace(/>/g, '\x26gt;')}\x3c/textarea\x3e`);return`\x3ccke:encoded\x3e${encodeURIComponent(a)}\x3c/cke:encoded\x3e`; 
}); 
}function n(a){
 return a.replace(J, function(a, b){
 return decodeURIComponent(b); 
}); 
}function t(a){
 return a.replace(/\x3c!--(?!{cke_protected})[\s\S]+?--\x3e/g,
    function(a){
 return`\x3c!--${u}{C}${encodeURIComponent(a).replace(/--/g, '%2D%2D')}--\x3e`; 
}); 
}function x(a){
 return a.replace(/\x3c!--\{cke_protected\}\{C\}([\s\S]+?)--\x3e/g, function(a, b){
 return decodeURIComponent(b); 
}); 
}function p(a, b){
 const e=b._.dataStore;return a.replace(/\x3c!--\{cke_protected\}([\s\S]+?)--\x3e/g, function(a, b){
 return decodeURIComponent(b); 
}).replace(/\{cke_protected_(\d+)\}/g, function(a, b){
 return e&&e[b]||''; 
}); 
}function q(a, b){
 var e=[], d=b.config.protectedSource, f=b._.dataStore||(b._.dataStore=
    {id:1}), c=/<\!--\{cke_temp(comment)?\}(\d*?)--\x3e/g, d=[/<script[\s\S]*?(<\/script>|$)/gi, /<noscript[\s\S]*?<\/noscript>/gi, /<meta[\s\S]*?\/?>/gi].concat(d);a=a.replace(/\x3c!--[\s\S]*?--\x3e/g, function(a){
 return`\x3c!--{cke_tempcomment}${e.push(a)-1}--\x3e`; 
});for(let g=0;g<d.length;g++)a=a.replace(d[g], function(a){
 a=a.replace(c, function(a, b, d){
 return e[d]; 
});return/cke_temp(comment)?/.test(a)?a:`\x3c!--{cke_temp}${e.push(a)-1}--\x3e`; 
});a=a.replace(c, function(a, b, d){
 return`\x3c!--${u}${b?'{C}':
    ''}${encodeURIComponent(e[d]).replace(/--/g, '%2D%2D')}--\x3e`; 
});a=a.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g, function(a){
 return a.replace(/\x3c!--\{cke_protected\}([^>]*)--\x3e/g, function(a, b){
 f[f.id]=decodeURIComponent(b);return`{cke_protected_${f.id++ }}`; 
}); 
});return a=a.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g, function(a, e, d, f){
 return`\x3c${e}${d}\x3e${p(x(f), b)}\x3c/${e}\x3e`; 
}); 
}let v;CKEDITOR.htmlDataProcessor=function(a){
 let b,
    f, g=this;this.editor=a;this.dataFilter=b=new CKEDITOR.htmlParser.filter;this.htmlFilter=f=new CKEDITOR.htmlParser.filter;this.writer=new CKEDITOR.htmlParser.basicWriter;b.addRules(z);b.addRules(B, {applyToAll:!0});b.addRules(c(a, 'data'), {applyToAll:!0});f.addRules(C);f.addRules(E, {applyToAll:!0});f.addRules(c(a, 'html'), {applyToAll:!0});a.on('toHtml', function(b){
 b=b.data;var f=b.dataValue, c, f=v(f), f=q(f, a), f=e(f, N), f=d(f), f=e(f, D), f=f.replace(L, '$1cke:$2'), f=f.replace(M, '\x3ccke:$1$2\x3e\x3c/cke:$1\x3e'),
    f=f.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, '$1$2$2'), f=f.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi, `$1data-cke-${CKEDITOR.rnd}-$2`);c=b.context||a.editable().getName();let g;CKEDITOR.env.ie&&9>CKEDITOR.env.version&&'pre'==c&&(c='div', f=`\x3cpre\x3e${f}\x3c/pre\x3e`, g=1);c=a.document.createElement(c);c.setHtml(`a${f}`);f=c.getHtml().substr(1);f=f.replace(new RegExp(`data-cke-${CKEDITOR.rnd}-`, 'ig'), '');g&&(f=f.replace(/^<pre>|<\/pre>$/gi, ''));f=f.replace(Q, '$1$2');f=n(f);f=x(f);c=!1===b.fixForBody?!1:
    h(b.enterMode, a.config.autoParagraph);f=CKEDITOR.htmlParser.fragment.fromHtml(f, b.context, c);c&&(g=f, !g.children.length&&CKEDITOR.dtd[g.name][c]&&(c=new CKEDITOR.htmlParser.element(c), g.add(c)));b.dataValue=f; 
}, null, null, 5);a.on('toHtml', function(b){
 b.data.filter.applyTo(b.data.dataValue, !0, b.data.dontFilter, b.data.enterMode)&&a.fire('dataFiltered'); 
}, null, null, 6);a.on('toHtml', function(a){
 a.data.dataValue.filterChildren(g.dataFilter, !0); 
}, null, null, 10);a.on('toHtml', function(a){
 a=a.data;let b=a.dataValue,
    e=new CKEDITOR.htmlParser.basicWriter;b.writeChildrenHtml(e);b=e.getHtml(!0);a.dataValue=t(b); 
}, null, null, 15);a.on('toDataFormat', function(b){
 let e=b.data.dataValue;b.data.enterMode!=CKEDITOR.ENTER_BR&&(e=e.replace(/^<br *\/?>/i, ''));b.data.dataValue=CKEDITOR.htmlParser.fragment.fromHtml(e, b.data.context, h(b.data.enterMode, a.config.autoParagraph)); 
}, null, null, 5);a.on('toDataFormat', function(a){
 a.data.dataValue.filterChildren(g.htmlFilter, !0); 
}, null, null, 10);a.on('toDataFormat', function(a){
 a.data.filter.applyTo(a.data.dataValue,
    !1, !0); 
}, null, null, 11);a.on('toDataFormat', function(b){
 let e=b.data.dataValue, d=g.writer;d.reset();e.writeChildrenHtml(d);e=d.getHtml(!0);e=x(e);e=p(e, a);b.data.dataValue=e; 
}, null, null, 15); 
};CKEDITOR.htmlDataProcessor.prototype={toHtml:function(a, b, e, d){
 let f=this.editor, c, g, k, h;b&&'object'===typeof b?(c=b.context, e=b.fixForBody, d=b.dontFilter, g=b.filter, k=b.enterMode, h=b.protectedWhitespaces):c=b;c||null===c||(c=f.editable().getName());return f.fire('toHtml', {dataValue:a, context:c, fixForBody:e, dontFilter:d,
    filter:g||f.filter, enterMode:k||f.enterMode, protectedWhitespaces:h}).dataValue; 
}, toDataFormat:function(a, b){
 let e, d, f;b&&(e=b.context, d=b.filter, f=b.enterMode);e||null===e||(e=this.editor.editable().getName());return this.editor.fire('toDataFormat', {dataValue:a, filter:d||this.editor.filter, context:e, enterMode:f||this.editor.enterMode}).dataValue; 
}};var w=/(?:&nbsp;|\xa0)$/, u='{cke_protected}', A=CKEDITOR.dtd, r='caption colgroup col thead tfoot tbody'.split(' '), y=CKEDITOR.tools.extend({}, A.$blockLimit,
    A.$block), z={elements:{input:l, textarea:l}}, B={attributeNames:[[/^on/, 'data-cke-pa-on'], [/^srcdoc/, 'data-cke-pa-srcdoc'], [/^data-cke-expando$/, '']], elements:{iframe:function(a){
 if(a.attributes&&a.attributes.src){
 const b=a.attributes.src.toLowerCase().replace(/[^a-z]/gi, '');if(0===b.indexOf('javascript')||0===b.indexOf('data'))a.attributes['data-cke-pa-src']=a.attributes.src, delete a.attributes.src; 
} 
}}}, C={elements:{embed:function(a){
 var b=a.parent;if(b&&'object'==b.name){
 var e=b.attributes.width, b=b.attributes.height;
    e&&(a.attributes.width=e);b&&(a.attributes.height=b); 
} 
}, a:function(a){
 const b=a.attributes;if(!(a.children.length||b.name||b.id||a.attributes['data-cke-saved-name']))return!1; 
}}}, E={elementNames:[[/^cke:/, ''], [/^\?xml:namespace$/, '']], attributeNames:[[/^data-cke-(saved|pa)-/, ''], [/^data-cke-.*/, ''], ['hidefocus', '']], elements:{$:function(a){
 const b=a.attributes;if(b){
 if(b['data-cke-temp'])return!1;for(var e=['name', 'href', 'src'], d, f=0;f<e.length;f++)d=`data-cke-saved-${e[f]}`, d in b&&delete b[e[f]]; 
}return a; 
},
    table:function(a){
 a.children.slice(0).sort(function(a, b){
 let e, d;a.type==CKEDITOR.NODE_ELEMENT&&b.type==a.type&&(e=CKEDITOR.tools.indexOf(r, a.name), d=CKEDITOR.tools.indexOf(r, b.name));-1<e&&-1<d&&e!=d||(e=a.parent?a.getIndex():-1, d=b.parent?b.getIndex():-1);return e>d?1:-1; 
}); 
}, param:function(a){
 a.children=[];a.isEmpty=!0;return a; 
}, span:function(a){
 'Apple-style-span'==a.attributes['class']&&delete a.name; 
}, html:function(a){
 delete a.attributes.contenteditable;delete a.attributes['class']; 
}, body:function(a){
 delete a.attributes.spellcheck;
    delete a.attributes.contenteditable; 
}, style:function(a){
 const b=a.children[0];b&&b.value&&(b.value=CKEDITOR.tools.trim(b.value));a.attributes.type||(a.attributes.type='text/css'); 
}, title:function(a){
 let b=a.children[0];!b&&k(a, b=new CKEDITOR.htmlParser.text);b.value=a.attributes['data-cke-title']||''; 
}, input:b, textarea:b}, attributes:{'class':function(a){
 return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, ''))||!1; 
}}};CKEDITOR.env.ie&&(E.attributes.style=function(a){
 return a.replace(/(^|;)([^\:]+)/g,
    function(a){
 return a.toLowerCase(); 
}); 
});var F=/<(a|area|img|input|source)\b([^>]*)>/gi, I=/([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi, K=/^(href|src|name)$/i, D=/(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi, N=/(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi, J=/<cke:encoded>([^<]*)<\/cke:encoded>/gi, L=/(<\/?)((?:object|embed|param|html|body|head|title)([\s][^>]*)?>)/gi, Q=/(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi, M=/<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi;
    v=function(){
 function a(e){
 return CKEDITOR.tools.array.reduce(e.split(''), function(a, e){
 let d=e.toLowerCase(), f=e.toUpperCase(), c=b(d);d!==f&&(c+=`|${b(f)}`);return `${a}(${c})`; 
}, ''); 
}function b(a){
 let e;e=a.charCodeAt(0);const d=e.toString(16);e={htmlCode:`\x26#${e};?`, hex:`\x26#x0*${d};?`, entity:{'\x3c':'\x26lt;', '\x3e':'\x26gt;', ':':'\x26colon;'}[a]};for(const f in e)e[f]&&(a+=`|${e[f]}`);return a; 
}const e=new RegExp(`(${a('\x3ccke:encoded\x3e')}(.*?)${a('\x3c/cke:encoded\x3e')})|(${a('\x3c')}${a('/')
    }?${a('cke:encoded\x3e')})`, 'gi'), d=new RegExp(`((${a('{cke_protected')})(_[0-9]*)?${a('}')})`, 'gi');return function(a){
 return a.replace(e, '').replace(d, ''); 
}; 
}(); 
}(), 'use strict', CKEDITOR.htmlParser.element=function(c, h){
 this.name=c;this.attributes=h||{};this.children=[];let g=c||'', a=g.match(/^cke:(.*)/);a&&(g=a[1]);g=!!(CKEDITOR.dtd.$nonBodyContent[g]||CKEDITOR.dtd.$block[g]||CKEDITOR.dtd.$listItem[g]||CKEDITOR.dtd.$tableContent[g]||CKEDITOR.dtd.$nonEditable[g]||'br'==g);this.isEmpty=!!CKEDITOR.dtd.$empty[c];
    this.isUnknown=!CKEDITOR.dtd[c];this._={isBlockLike:g, hasInlineStarted:this.isEmpty||!g}; 
}, CKEDITOR.htmlParser.cssStyle=function(c){
 const h={};((c instanceof CKEDITOR.htmlParser.element?c.attributes.style:c)||'').replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(c, a, f){
 'font-family'==a&&(f=f.replace(/["']/g, ''));h[a.toLowerCase()]=f; 
});return{rules:h, populate:function(c){
 const a=this.toString();a&&(c instanceof CKEDITOR.dom.element?c.setAttribute('style', a):c instanceof CKEDITOR.htmlParser.element?
    c.attributes.style=a:c.style=a); 
}, toString:function(){
 let c=[], a;for(a in h)h[a]&&c.push(a, ':', h[a], ';');return c.join(''); 
}}; 
}, function(){
 function c(a){
 return function(f){
 return f.type==CKEDITOR.NODE_ELEMENT&&('string'===typeof a?f.name==a:f.name in a); 
}; 
}const h=function(a, f){
 a=a[0];f=f[0];return a<f?-1:a>f?1:0; 
}, g=CKEDITOR.htmlParser.fragment.prototype;CKEDITOR.htmlParser.element.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {type:CKEDITOR.NODE_ELEMENT, add:g.add, clone:function(){
 return new CKEDITOR.htmlParser.element(this.name,
    this.attributes); 
}, filter:function(a, f){
 let c=this, g, h;f=c.getFilterContext(f);if(!c.parent)a.onRoot(f, c);for(;;){
 g=c.name;if(!(h=a.onElementName(f, g)))return this.remove(), !1;c.name=h;if(!(c=a.onElement(f, c)))return this.remove(), !1;if(c!==this)return this.replaceWith(c), !1;if(c.name==g)break;if(c.type!=CKEDITOR.NODE_ELEMENT)return this.replaceWith(c), !1;if(!c.name)return this.replaceWithChildren(), !1; 
}g=c.attributes;let b, d;for(b in g){
 for(h=g[b];;)if(d=a.onAttributeName(f, b))if(d!=b)delete g[b],
    b=d;else break;else{
 delete g[b];break; 
}d&&(!1===(h=a.onAttribute(f, c, d, h))?delete g[d]:g[d]=h); 
}c.isEmpty||this.filterChildren(a, !1, f);return!0; 
}, filterChildren:g.filterChildren, writeHtml:function(a, f){
 f&&this.filter(f);let c=this.name, g=[], l=this.attributes, b, d;a.openTag(c, l);for(b in l)g.push([b, l[b]]);a.sortAttributes&&g.sort(h);b=0;for(d=g.length;b<d;b++)l=g[b], a.attribute(l[0], l[1]);a.openTagClose(c, this.isEmpty);this.writeChildrenHtml(a);this.isEmpty||a.closeTag(c); 
}, writeChildrenHtml:g.writeChildrenHtml,
    replaceWithChildren:function(){
 for(let a=this.children, f=a.length;f;)a[--f].insertAfter(this);this.remove(); 
}, forEach:g.forEach, getFirst:function(a){
 if(!a)return this.children.length?this.children[0]:null;'function'!==typeof a&&(a=c(a));for(let f=0, g=this.children.length;f<g;++f)if(a(this.children[f]))return this.children[f];return null; 
}, getHtml:function(){
 const a=new CKEDITOR.htmlParser.basicWriter;this.writeChildrenHtml(a);return a.getHtml(); 
}, setHtml:function(a){
 a=this.children=CKEDITOR.htmlParser.fragment.fromHtml(a).children;
    for(let f=0, c=a.length;f<c;++f)a[f].parent=this; 
}, getOuterHtml:function(){
 const a=new CKEDITOR.htmlParser.basicWriter;this.writeHtml(a);return a.getHtml(); 
}, split:function(a){
 for(var f=this.children.splice(a, this.children.length-a), c=this.clone(), g=0;g<f.length;++g)f[g].parent=c;c.children=f;f[0]&&(f[0].previous=null);0<a&&(this.children[a-1].next=null);this.parent.add(c, this.getIndex()+1);return c; 
}, find:function(a, f){
 void 0===f&&(f=!1);let c=[], g;for(g=0;g<this.children.length;g++){
 const h=this.children[g];
    'function'===typeof a&&a(h)?c.push(h):'string'===typeof a&&h.name===a&&c.push(h);f&&h.find&&(c=c.concat(h.find(a, f))); 
}return c; 
}, findOne:function(a, f){
 let c=null, g=CKEDITOR.tools.array.find(this.children, function(g){
 const b='function'===typeof a?a(g):g.name===a;if(b||!f)return b;g.children&&g.findOne&&(c=g.findOne(a, !0));return!!c; 
});return c||g||null; 
}, addClass:function(a){
 if(!this.hasClass(a)){
 const f=this.attributes['class']||'';this.attributes['class']=f+(f?' ':'')+a; 
} 
}, removeClass:function(a){
 let f=this.attributes['class'];
    f&&((f=CKEDITOR.tools.trim(f.replace(new RegExp(`(?:\\s+|^)${a}(?:\\s+|$)`), ' ')))?this.attributes['class']=f:delete this.attributes['class']); 
}, hasClass:function(a){
 const f=this.attributes['class'];return f?(new RegExp(`(?:^|\\s)${a}(?\x3d\\s|$)`)).test(f):!1; 
}, getFilterContext:function(a){
 const f=[];a||(a={nonEditable:!1, nestedEditable:!1});a.nonEditable||'false'!=this.attributes.contenteditable?a.nonEditable&&!a.nestedEditable&&'true'==this.attributes.contenteditable&&f.push('nestedEditable', !0):f.push('nonEditable',
    !0);if(f.length){
 a=CKEDITOR.tools.copy(a);for(let c=0;c<f.length;c+=2)a[f[c]]=f[c+1]; 
}return a; 
}}, !0); 
}(), function(){
 const c=/{([^}]+)}/g;CKEDITOR.template=function(c){
 this.source='function'===typeof c?c:String(c); 
};CKEDITOR.template.prototype.output=function(h, g){
 const a=('function'===typeof this.source?this.source(h):this.source).replace(c, function(a, c){
 return void 0!==h[c]?h[c]:a; 
});return g?g.push(a):a; 
}; 
}(), delete CKEDITOR.loadFullCore, CKEDITOR.instances={}, CKEDITOR.document=new CKEDITOR.dom.document(document),
    CKEDITOR.add=function(c){
 function h(){
 CKEDITOR.currentInstance==c&&(CKEDITOR.currentInstance=null, CKEDITOR.fire('currentInstance')); 
}CKEDITOR.instances[c.name]=c;c.on('focus', function(){
 CKEDITOR.currentInstance!=c&&(CKEDITOR.currentInstance=c, CKEDITOR.fire('currentInstance')); 
});c.on('blur', h);c.on('destroy', h);CKEDITOR.fire('instance', null, c); 
}, CKEDITOR.remove=function(c){
 delete CKEDITOR.instances[c.name]; 
}, function(){
 const c={};CKEDITOR.addTemplate=function(h, g){
 let a=c[h];if(a)return a;a={name:h, source:g};
    CKEDITOR.fire('template', a);return c[h]=new CKEDITOR.template(a.source); 
};CKEDITOR.getTemplate=function(h){
 return c[h]; 
}; 
}(), function(){
 const c=[];CKEDITOR.addCss=function(h){
 c.push(h); 
};CKEDITOR.getCss=function(){
 return c.join('\n'); 
}; 
}(), CKEDITOR.on('instanceDestroyed', function(){
 CKEDITOR.tools.isEmpty(this.instances)&&CKEDITOR.fire('reset'); 
}), CKEDITOR.TRISTATE_ON=1, CKEDITOR.TRISTATE_OFF=2, CKEDITOR.TRISTATE_DISABLED=0, function(){
 CKEDITOR.inline=function(c, h){
 c=CKEDITOR.editor._getEditorElement(c);if(!c)return null;
    const g=new CKEDITOR.editor(h, c, CKEDITOR.ELEMENT_MODE_INLINE), a=c.is('textarea')?c:null;a?(g.setData(a.getValue(), null, !0), c=CKEDITOR.dom.element.createFromHtml(`\x3cdiv contenteditable\x3d"${!!g.readOnly}" class\x3d"cke_textarea_inline"\x3e${a.getValue()}\x3c/div\x3e`, CKEDITOR.document), c.insertAfter(a), a.hide(), a.$.form&&g._attachToForm()):(h&&'undefined'!==typeof h.readOnly&&!h.readOnly&&c.setAttribute('contenteditable', 'true'), g.setData(c.getHtml(), null, !0));g.on('loaded', function(){
 g.fire('uiReady');
    g.editable(c);g.container=c;g.ui.contentsElement=c;g.setData(g.getData(1));g.resetDirty();g.fire('contentDom');g.mode='wysiwyg';g.fire('mode');g.status='ready';g.fireOnce('instanceReady');CKEDITOR.fire('instanceReady', null, g); 
}, null, null, 1E4);g.on('destroy', function(){
 const f=g.container;a&&f&&(f.clearCustomData(), f.remove());a&&a.show();g.element.clearCustomData();delete g.element; 
});return g; 
};CKEDITOR.inlineAll=function(){
 let c, h, g;for(g in CKEDITOR.dtd.$editable)for(let a=CKEDITOR.document.getElementsByTag(g),
    f=0, m=a.count();f<m;f++)c=a.getItem(f), 'true'!=c.getAttribute('contenteditable')||c.getEditor()||(h={element:c, config:{}}, !1!==CKEDITOR.fire('inline', h)&&CKEDITOR.inline(c, h.config)); 
};CKEDITOR.domReady(function(){
 !CKEDITOR.disableAutoInline&&CKEDITOR.inlineAll(); 
}); 
}(), CKEDITOR.replaceClass='ckeditor', function(){
 function c(a, f, c, k){
 a=CKEDITOR.editor._getEditorElement(a);if(!a)return null;const l=new CKEDITOR.editor(f, a, k);k==CKEDITOR.ELEMENT_MODE_REPLACE&&(a.setStyle('visibility', 'hidden'), l._.required=
    a.hasAttribute('required'), a.removeAttribute('required'));c&&l.setData(c, null, !0);l.on('loaded', function(){
 l.isDestroyed()||l.isDetached()||(g(l), k==CKEDITOR.ELEMENT_MODE_REPLACE&&l.config.autoUpdateElement&&a.$.form&&l._attachToForm(), l.setMode(l.config.startupMode, function(){
 l.resetDirty();l.status='ready';l.fireOnce('instanceReady');CKEDITOR.fire('instanceReady', null, l); 
})); 
});l.on('destroy', h);return l; 
}function h(){
 const a=this.container, f=this.element;a&&(a.clearCustomData(), a.remove());f&&(f.clearCustomData(),
    this.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE&&(f.show(), this._.required&&f.setAttribute('required', 'required')), delete this.element); 
}function g(a){
 var f=a.name, c=a.element, g=a.elementMode, h=a.fire('uiSpace', {space:'top', html:''}).html, b=a.fire('uiSpace', {space:'bottom', html:''}).html, d=new CKEDITOR.template(`\x3c{outerEl} id\x3d"cke_{name}" class\x3d"{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ${CKEDITOR.env.cssClass}"  dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"application"${
    a.title?' aria-labelledby\x3d"cke_{name}_arialbl"':''}\x3e${a.title?'\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e':''}\x3c{outerEl} class\x3d"cke_inner cke_reset" role\x3d"presentation"\x3e{topHtml}\x3c{outerEl} id\x3d"{contentId}" class\x3d"cke_contents cke_reset" role\x3d"presentation"\x3e\x3c/{outerEl}\x3e{bottomHtml}\x3c/{outerEl}\x3e\x3c/{outerEl}\x3e`), f=CKEDITOR.dom.element.createFromHtml(d.output({id:a.id, name:f, langDir:a.lang.dir, langCode:a.langCode,
    voiceLabel:a.title, topHtml:h?`\x3cspan id\x3d"${a.ui.spaceId('top')}" class\x3d"cke_top cke_reset_all" role\x3d"presentation" style\x3d"height:auto"\x3e${h}\x3c/span\x3e`:'', contentId:a.ui.spaceId('contents'), bottomHtml:b?`\x3cspan id\x3d"${a.ui.spaceId('bottom')}" class\x3d"cke_bottom cke_reset_all" role\x3d"presentation"\x3e${b}\x3c/span\x3e`:'', outerEl:CKEDITOR.env.ie?'span':'div'}));g==CKEDITOR.ELEMENT_MODE_REPLACE?(c.hide(), f.insertAfter(c)):c.append(f);a.container=f;a.ui.contentsElement=
    a.ui.space('contents');h&&a.ui.space('top').unselectable();b&&a.ui.space('bottom').unselectable();c=a.config.width;g=a.config.height;c&&f.setStyle('width', CKEDITOR.tools.cssLength(c));g&&a.ui.space('contents').setStyle('height', CKEDITOR.tools.cssLength(g));f.disableContextMenu();CKEDITOR.env.webkit&&f.on('focus', function(){
 a.focus(); 
});a.fireOnce('uiReady'); 
}CKEDITOR.replace=function(a, f){
 return c(a, f, null, CKEDITOR.ELEMENT_MODE_REPLACE); 
};CKEDITOR.appendTo=function(a, f, g){
 return c(a, f, g, CKEDITOR.ELEMENT_MODE_APPENDTO); 
};
    CKEDITOR.replaceAll=function(){
 for(let a=document.getElementsByTagName('textarea'), f=0;f<a.length;f++){
 let c=null, g=a[f];if(g.name||g.id){
 if('string'===typeof arguments[0]){
 if(!(new RegExp(`(?:^|\\s)${arguments[0]}(?:$|\\s)`)).test(g.className))continue; 
}else if('function'===typeof arguments[0]&&(c={}, !1===arguments[0](g, c)))continue;this.replace(g, c); 
} 
} 
};CKEDITOR.editor.prototype.addMode=function(a, f){
 (this._.modes||(this._.modes={}))[a]=f; 
};CKEDITOR.editor.prototype.setMode=function(a, f){
 var c=this,
    g=this._.modes;if(a!=c.mode&&g&&g[a]){
 c.fire('beforeSetMode', a);if(c.mode){
 var h=c.checkDirty(), g=c._.previousModeData, b, d=0;c.fire('beforeModeUnload');c.editable(0);c._.previousMode=c.mode;c._.previousModeData=b=c.getData(1);'source'==c.mode&&g==b&&(c.fire('lockSnapshot', {forceUpdate:!0}), d=1);c.ui.space('contents').setHtml('');c.mode=''; 
}else c._.previousModeData=c.getData(1);this._.modes[a](function(){
 c.mode=a;void 0!==h&&!h&&c.resetDirty();d?c.fire('unlockSnapshot'):'wysiwyg'==a&&c.fire('saveSnapshot');
    setTimeout(function(){
 c.isDestroyed()||c.isDetached()||(c.fire('mode'), f&&f.call(c)); 
}, 0); 
}); 
} 
};CKEDITOR.editor.prototype.resize=function(a, f, c, g){
 var h=this.container, b=this.ui.space('contents'), d=CKEDITOR.env.webkit&&this.document&&this.document.getWindow().$.frameElement;g=g?this.container.getFirst(function(a){
 return a.type==CKEDITOR.NODE_ELEMENT&&a.hasClass('cke_inner'); 
}):h;if(a||0===a)a=CKEDITOR.tools.convertToPx(CKEDITOR.tools.cssLength(a));g.setSize('width', a, !0);d&&(d.style.width='1%');f=CKEDITOR.tools.convertToPx(CKEDITOR.tools.cssLength(f));
    var e=(g.$.offsetHeight||0)-(b.$.clientHeight||0), h=Math.max(f-(c?0:e), 0);f=c?f+e:f;b.setStyle('height', CKEDITOR.tools.cssLength(h));d&&(d.style.width='100%');this.fire('resize', {outerHeight:f, contentsHeight:h, outerWidth:a||g.getSize('width')}); 
};CKEDITOR.editor.prototype.getResizable=function(a){
 return a?this.ui.space('contents'):this.container; 
};CKEDITOR.domReady(function(){
 CKEDITOR.replaceClass&&CKEDITOR.replaceAll(CKEDITOR.replaceClass); 
}); 
}(), CKEDITOR.config.startupMode='wysiwyg', function(){
 function c(b){
 let e=
    b.editor, d=b.data.path, f=d.blockLimit, c=b.data.selection, g=c.getRanges()[0], l;if(CKEDITOR.env.gecko||CKEDITOR.env.ie&&CKEDITOR.env.needsBrFiller)if(c=h(c, d))c.appendBogus(), l=CKEDITOR.env.ie&&!CKEDITOR.env.edge||CKEDITOR.env.edge&&e._.previousActive;k(e, d.block, f)&&g.collapsed&&!g.getCommonAncestor().isReadOnly()&&(d=g.clone(), d.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), f=new CKEDITOR.dom.walker(d), f.guard=function(b){
 return!a(b)||b.type==CKEDITOR.NODE_COMMENT||b.isReadOnly(); 
}, !f.checkForward()||d.checkStartOfBlock()&&
    d.checkEndOfBlock())&&(e=g.fixBlock(!0, e.activeEnterMode==CKEDITOR.ENTER_DIV?'div':'p'), CKEDITOR.env.needsBrFiller||(e=e.getFirst(a))&&e.type==CKEDITOR.NODE_TEXT&&CKEDITOR.tools.trim(e.getText()).match(/^(?:&nbsp;|\xa0)$/)&&e.remove(), l=1, b.cancel());l&&g.select(); 
}function h(b, e){
 if(b.isFake)return 0;const d=e.block||e.blockLimit, f=d&&d.getLast(a);if(!(!d||!d.isBlockBoundary()||f&&f.type==CKEDITOR.NODE_ELEMENT&&f.isBlockBoundary()||d.is('pre')||d.getBogus()))return d; 
}function g(a){
 let b=a.data.getTarget();
    b.is('input')&&(b=b.getAttribute('type'), 'submit'!=b&&'reset'!=b||a.data.preventDefault()); 
}function a(a){
 return n(a)&&t(a); 
}function f(a, b){
 return function(e){
 let d=e.data.$.toElement||e.data.$.fromElement||e.data.$.relatedTarget;(d=d&&d.nodeType==CKEDITOR.NODE_ELEMENT?new CKEDITOR.dom.element(d):null)&&(b.equals(d)||b.contains(d))||a.call(this, e); 
}; 
}function m(b){
 function e(b){
 return function(e, f){
 f&&e.type==CKEDITOR.NODE_ELEMENT&&e.is(c)&&(d=e);if(!(f||!a(e)||b&&p(e)))return!1; 
}; 
}let d, f=b.getRanges()[0];
    b=b.root;var c={table:1, ul:1, ol:1, dl:1};if(f.startPath().contains(c)){
 let g=f.clone();g.collapse(1);g.setStartAt(b, CKEDITOR.POSITION_AFTER_START);b=new CKEDITOR.dom.walker(g);b.guard=e();b.checkBackward();if(d)return g=f.clone(), g.collapse(), g.setEndAt(d, CKEDITOR.POSITION_AFTER_END), b=new CKEDITOR.dom.walker(g), b.guard=e(!0), d=!1, b.checkForward(), d; 
}return null; 
}function k(a, b, e){
 return!1!==a.config.autoParagraph&&a.activeEnterMode!=CKEDITOR.ENTER_BR&&(a.editable().equals(e)&&!b||b&&'true'==b.getAttribute('contenteditable')); 
}
    function l(a){
 return a.activeEnterMode!=CKEDITOR.ENTER_BR&&!1!==a.config.autoParagraph?a.activeEnterMode==CKEDITOR.ENTER_DIV?'div':'p':!1; 
}function b(a){
 a&&a.isEmptyInlineRemoveable()&&a.remove(); 
}function d(a){
 const b=a.editor;b.getSelection().scrollIntoView();setTimeout(function(){
 b.fire('saveSnapshot'); 
}, 0); 
}function e(a, b, e){
 const d=a.getCommonAncestor(b);for(b=a=e?b:a;(a=a.getParent())&&!d.equals(a)&&1==a.getChildCount();)b=a;b.remove(); 
}let n, t, x, p, q, v, w, u, A, r;CKEDITOR.editable=CKEDITOR.tools.createClass({base:CKEDITOR.dom.element,
    $:function(a, b){
 this.base(b.$||b);this.editor=a;this.status='unloaded';this.hasFocus=!1;this.setup(); 
}, proto:{focus:function(){
 let a;if(CKEDITOR.env.webkit&&!this.hasFocus&&(a=this.editor._.previousActive||this.getDocument().getActive(), this.contains(a))){
 a.focus();return; 
}CKEDITOR.env.edge&&14<CKEDITOR.env.version&&!this.hasFocus&&this.getDocument().equals(CKEDITOR.document)&&(this.editor._.previousScrollTop=this.$.scrollTop);try{
 if(!CKEDITOR.env.ie||CKEDITOR.env.edge&&14<CKEDITOR.env.version||!this.getDocument().equals(CKEDITOR.document))if(CKEDITOR.env.chrome){
 const b=
    this.$.scrollTop;this.$.focus();this.$.scrollTop=b; 
}else this.$.focus();else this.$.setActive(); 
}catch(e){
 if(!CKEDITOR.env.ie)throw e; 
}CKEDITOR.env.safari&&!this.isInline()&&(a=CKEDITOR.document.getActive(), a.equals(this.getWindow().getFrame())||this.getWindow().focus()); 
}, on:function(a, b){
 const e=Array.prototype.slice.call(arguments, 0);CKEDITOR.env.ie&&/^focus|blur$/.exec(a)&&(a='focus'==a?'focusin':'focusout', b=f(b, this), e[0]=a, e[1]=b);return CKEDITOR.dom.element.prototype.on.apply(this, e); 
}, attachListener:function(a){
 !this._.listeners&&
    (this._.listeners=[]);var b=Array.prototype.slice.call(arguments, 1), b=a.on.apply(a, b);this._.listeners.push(b);return b; 
}, clearListeners:function(){
 const a=this._.listeners;try{
 for(;a.length;)a.pop().removeListener(); 
}catch(b){} 
}, restoreAttrs:function(){
 let a=this._.attrChanges, b, e;for(e in a)a.hasOwnProperty(e)&&(b=a[e], null!==b?this.setAttribute(e, b):this.removeAttribute(e)); 
}, attachClass:function(a){
 let b=this.getCustomData('classes');this.hasClass(a)||(!b&&(b=[]), b.push(a), this.setCustomData('classes',
    b), this.addClass(a)); 
}, changeAttr:function(a, b){
 const e=this.getAttribute(a);b!==e&&(!this._.attrChanges&&(this._.attrChanges={}), a in this._.attrChanges||(this._.attrChanges[a]=e), this.setAttribute(a, b)); 
}, insertText:function(a){
 this.editor.focus();this.insertHtml(this.transformPlainTextToHtml(a), 'text'); 
}, transformPlainTextToHtml:function(a){
 const b=this.editor.getSelection().getStartElement().hasAscendant('pre', !0)?CKEDITOR.ENTER_BR:this.editor.activeEnterMode;return CKEDITOR.tools.transformPlainTextToHtml(a,
    b); 
}, insertHtml:function(a, b, e){
 const f=this.editor;f.focus();f.fire('saveSnapshot');e||(e=f.getSelection().getRanges()[0]);v(this, b||'html', a, e);e.select();d(this);this.editor.fire('afterInsertHtml', {}); 
}, insertHtmlIntoRange:function(a, b, e){
 v(this, e||'html', a, b);this.editor.fire('afterInsertHtml', {intoRange:b}); 
}, insertElement:function(b, e){
 var f=this.editor;f.focus();f.fire('saveSnapshot');var c=f.activeEnterMode, f=f.getSelection(), g=b.getName(), g=CKEDITOR.dtd.$block[g];e||(e=f.getRanges()[0]);this.insertElementIntoRange(b,
    e)&&(e.moveToPosition(b, CKEDITOR.POSITION_AFTER_END), g&&((g=b.getNext(function(b){
 return a(b)&&!p(b); 
}))&&g.type==CKEDITOR.NODE_ELEMENT&&g.is(CKEDITOR.dtd.$block)?g.getDtd()['#']?e.moveToElementEditStart(g):e.moveToElementEditEnd(b):g||c==CKEDITOR.ENTER_BR||(g=e.fixBlock(!0, c==CKEDITOR.ENTER_DIV?'div':'p'), e.moveToElementEditStart(g))));f.selectRanges([e]);d(this); 
}, insertElementIntoSelection:function(a){
 this.insertElement(a); 
}, insertElementIntoRange:function(a, e){
 var d=this.editor, f=d.config.enterMode,
    c=a.getName(), g=CKEDITOR.dtd.$block[c];if(e.checkReadOnly())return!1;e.deleteContents(1);e.startContainer.type==CKEDITOR.NODE_ELEMENT&&(e.startContainer.is({tr:1, table:1, tbody:1, thead:1, tfoot:1})?w(e):e.startContainer.is(CKEDITOR.dtd.$list)&&u(e));let h, k;if(g)for(;(h=e.getCommonAncestor(0, 1))&&(k=CKEDITOR.dtd[h.getName()])&&(!k||!k[c]);)if(h.getName()in CKEDITOR.dtd.span){
 var g=e.splitElement(h), l=e.createBookmark();b(h);b(g);e.moveToBookmark(l); 
}else e.checkStartOfBlock()&&e.checkEndOfBlock()?(e.setStartBefore(h),
    e.collapse(!0), h.remove()):e.splitBlock(f==CKEDITOR.ENTER_DIV?'div':'p', d.editable());e.insertNode(a);return!0; 
}, setData:function(a, b){
 b||(a=this.editor.dataProcessor.toHtml(a));this.setHtml(a);this.fixInitialSelection();'unloaded'==this.status&&(this.status='ready');this.editor.fire('dataReady'); 
}, getData:function(a){
 let b=this.getHtml();a||(b=this.editor.dataProcessor.toDataFormat(b));return b; 
}, setReadOnly:function(a){
 this.setAttribute('contenteditable', !a); 
}, detach:function(){
 this.status='detached';
    this.editor.setData(this.editor.getData(), {internal:!0});this.clearListeners();try{
 this._.cleanCustomData(); 
}catch(a){
 if(!CKEDITOR.env.ie||-2146828218!==a.number)throw a; 
}this.editor.fire('contentDomUnload');delete this.editor.document;delete this.editor.window;delete this.editor; 
}, isInline:function(){
 return this.getDocument().equals(CKEDITOR.document); 
}, fixInitialSelection:function(){
 function a(){
 let b=e.getDocument().$, d=b.getSelection(), f;a:if(d.anchorNode&&d.anchorNode==e.$)f=!0;else{
 if(CKEDITOR.env.webkit&&
    (f=e.getDocument().getActive())&&f.equals(e)&&!d.anchorNode){
 f=!0;break a; 
}f=void 0; 
}f&&(f=new CKEDITOR.dom.range(e), f.moveToElementEditStart(e), b=b.createRange(), b.setStart(f.startContainer.$, f.startOffset), b.collapse(!0), d.removeAllRanges(), d.addRange(b)); 
}function b(){
 let a=e.getDocument().$, d=a.selection, f=e.getDocument().getActive();'None'==d.type&&f.equals(e)&&(d=new CKEDITOR.dom.range(e), a=a.body.createTextRange(), d.moveToElementEditStart(e), d=d.startContainer, d.type!=CKEDITOR.NODE_ELEMENT&&(d=
    d.getParent()), a.moveToElementText(d.$), a.collapse(!0), a.select()); 
}var e=this;if(CKEDITOR.env.ie&&(9>CKEDITOR.env.version||CKEDITOR.env.quirks))this.hasFocus&&(this.focus(), b());else if(this.hasFocus)this.focus(), a();else this.once('focus', function(){
 a(); 
}, null, null, -999); 
}, getHtmlFromRange:function(a){
 if(a.collapsed)return new CKEDITOR.dom.documentFragment(a.document);a={doc:this.getDocument(), range:a.clone()};A.eol.detect(a, this);A.bogus.exclude(a);A.cell.shrink(a);a.fragment=a.range.cloneContents();
    A.tree.rebuild(a, this);A.eol.fix(a, this);return new CKEDITOR.dom.documentFragment(a.fragment.$); 
}, extractHtmlFromRange:function(a, b){
 var e=r, d={range:a, doc:a.document}, f=this.getHtmlFromRange(a);if(a.collapsed)return a.optimize(), f;a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);e.table.detectPurge(d);d.bookmark=a.createBookmark();delete d.range;var c=this.editor.createRange();c.moveToPosition(d.bookmark.startNode, CKEDITOR.POSITION_BEFORE_START);d.targetBookmark=c.createBookmark();e.list.detectMerge(d, this);
    e.table.detectRanges(d, this);e.block.detectMerge(d, this);d.tableContentsRanges?(e.table.deleteRanges(d), a.moveToBookmark(d.bookmark), d.range=a):(a.moveToBookmark(d.bookmark), d.range=a, a.extractContents(e.detectExtractMerge(d)));a.moveToBookmark(d.targetBookmark);a.optimize();e.fixUneditableRangePosition(a);e.list.merge(d, this);e.table.purge(d, this);e.block.merge(d, this);if(b){
 e=a.startPath();if(d=a.checkStartOfBlock()&&a.checkEndOfBlock()&&e.block&&!a.root.equals(e.block)){
 a:{
 var d=e.block.getElementsByTag('span'),
    c=0, g;if(d)for(;g=d.getItem(c++);)if(!t(g)){
 d=!0;break a; 
}d=!1; 
}d=!d; 
}d&&(a.moveToPosition(e.block, CKEDITOR.POSITION_BEFORE_START), e.block.remove()); 
}else e.autoParagraph(this.editor, a), x(a.startContainer)&&a.startContainer.appendBogus();a.startContainer.mergeSiblings();return f; 
}, setup:function(){
 const b=this.editor;this.attachListener(b, 'beforeGetData', function(){
 let a=this.getData();this.is('textarea')||!1!==b.config.ignoreEmptyParagraph&&(a=a.replace(q, function(a, b){
 return b; 
}));b.setData(a, null, 1); 
},
    this);this.attachListener(b, 'getSnapshot', function(a){
 a.data=this.getData(1); 
}, this);this.attachListener(b, 'afterSetData', function(){
 this.setData(b.getData(1)); 
}, this);this.attachListener(b, 'loadSnapshot', function(a){
 this.setData(a.data, 1); 
}, this);this.attachListener(b, 'beforeFocus', function(){
 let a=b.getSelection();(a=a&&a.getNative())&&'Control'==a.type||this.focus(); 
}, this);this.attachListener(b, 'insertHtml', function(a){
 this.insertHtml(a.data.dataValue, a.data.mode, a.data.range); 
}, this);this.attachListener(b,
    'insertElement', function(a){
 this.insertElement(a.data); 
}, this);this.attachListener(b, 'insertText', function(a){
 this.insertText(a.data); 
}, this);this.setReadOnly(b.readOnly);this.attachClass('cke_editable');b.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?this.attachClass('cke_editable_inline'):b.elementMode!=CKEDITOR.ELEMENT_MODE_REPLACE&&b.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO||this.attachClass('cke_editable_themed');this.attachClass(`cke_contents_${b.config.contentsLangDirection}`);b.keystrokeHandler.blockedKeystrokes[8]=
    +b.readOnly;b.keystrokeHandler.attach(this);this.on('blur', function(){
 this.hasFocus=!1; 
}, null, null, -1);this.on('focus', function(){
 this.hasFocus=!0; 
}, null, null, -1);if(CKEDITOR.env.webkit)this.on('scroll', function(){
 b._.previousScrollTop=b.editable().$.scrollTop; 
}, null, null, -1);if(CKEDITOR.env.edge&&14<CKEDITOR.env.version){
 const d=function(){
 const a=b.editable();null!=b._.previousScrollTop&&a.getDocument().equals(CKEDITOR.document)&&(a.$.scrollTop=b._.previousScrollTop, b._.previousScrollTop=null, this.removeListener('scroll',
    d)); 
};this.on('scroll', d); 
}b.focusManager.add(this);this.equals(CKEDITOR.document.getActive())&&(this.hasFocus=!0, b.once('contentDom', function(){
 b.focusManager.focus(this); 
}, this));this.isInline()&&this.changeAttr('tabindex', b.tabIndex);if(!this.is('textarea')){
 b.document=this.getDocument();b.window=this.getWindow();const f=b.document;this.changeAttr('spellcheck', !b.config.disableNativeSpellChecker);var c=b.config.contentsLangDirection;this.getDirection(1)!=c&&this.changeAttr('dir', c);let h=CKEDITOR.getCss();
    if(h){
 var c=f.getHead(), k=c.getCustomData('stylesheet');k?h!=k.getText()&&(CKEDITOR.env.ie&&9>CKEDITOR.env.version?k.$.styleSheet.cssText=h:k.setText(h)):(h=f.appendStyleText(h), h=new CKEDITOR.dom.element(h.ownerNode||h.owningElement), c.setCustomData('stylesheet', h), h.data('cke-temp', 1)); 
}c=f.getCustomData('stylesheet_ref')||0;f.setCustomData('stylesheet_ref', c+1);this.setCustomData('cke_includeReadonly', !b.config.disableReadonlyStyling);this.attachListener(this, 'click', function(a){
 a=a.data;const b=
    (new CKEDITOR.dom.elementPath(a.getTarget(), this)).contains('a');b&&2!=a.$.button&&b.isReadOnly()&&a.preventDefault(); 
});const l={8:1, 46:1};this.attachListener(b, 'key', function(a){
 if(b.readOnly)return!0;var e=a.data.domEvent.getKey(), d;a=b.getSelection();if(0!==a.getRanges().length){
 if(e in l){
 var f, c=a.getRanges()[0], g=c.startPath(), h, k, t, e=8==e;CKEDITOR.env.ie&&11>CKEDITOR.env.version&&(f=a.getSelectedElement())||(f=m(a))?(b.fire('saveSnapshot'), c.moveToPosition(f, CKEDITOR.POSITION_BEFORE_START), f.remove(),
    c.select(), b.fire('saveSnapshot'), d=1):c.collapsed&&((h=g.block)&&(t=h[e?'getPrevious':'getNext'](n))&&t.type==CKEDITOR.NODE_ELEMENT&&t.is('table')&&c[e?'checkStartOfBlock':'checkEndOfBlock']()?(b.fire('saveSnapshot'), c[e?'checkEndOfBlock':'checkStartOfBlock']()&&h.remove(), c[`moveToElementEdit${e?'End':'Start'}`](t), c.select(), b.fire('saveSnapshot'), d=1):g.blockLimit&&g.blockLimit.is('td')&&(k=g.blockLimit.getAscendant('table'))&&c.checkBoundaryOfElement(k, e?CKEDITOR.START:CKEDITOR.END)&&(t=k[e?
    'getPrevious':'getNext'](n))?(b.fire('saveSnapshot'), c[`moveToElementEdit${e?'End':'Start'}`](t), c.checkStartOfBlock()&&c.checkEndOfBlock()?t.remove():c.select(), b.fire('saveSnapshot'), d=1):(k=g.contains(['td', 'th', 'caption']))&&c.checkBoundaryOfElement(k, e?CKEDITOR.START:CKEDITOR.END)&&(d=1)); 
}return!d; 
} 
});b.blockless&&CKEDITOR.env.ie&&CKEDITOR.env.needsBrFiller&&this.attachListener(this, 'keyup', function(e){
 e.data.getKeystroke()in l&&!this.getFirst(a)&&(this.appendBogus(), e=b.createRange(), e.moveToPosition(this,
    CKEDITOR.POSITION_AFTER_START), e.select()); 
});this.attachListener(this, 'dblclick', function(a){
 if(b.readOnly)return!1;a={element:a.data.getTarget()};b.fire('doubleclick', a); 
});CKEDITOR.env.ie&&this.attachListener(this, 'click', g);CKEDITOR.env.ie&&!CKEDITOR.env.edge||this.attachListener(this, 'mousedown', function(a){
 const e=a.data.getTarget();e.is('img', 'hr', 'input', 'textarea', 'select')&&!e.isReadOnly()&&(b.getSelection().selectElement(e), e.is('input', 'textarea', 'select')&&a.data.preventDefault()); 
});CKEDITOR.env.edge&&
    this.attachListener(this, 'mouseup', function(a){
 (a=a.data.getTarget())&&a.is('img')&&!a.isReadOnly()&&b.getSelection().selectElement(a); 
});CKEDITOR.env.gecko&&this.attachListener(this, 'mouseup', function(a){
 if(2==a.data.$.button&&(a=a.data.getTarget(), !a.getAscendant('table')&&!a.getOuterHtml().replace(q, ''))){
 const e=b.createRange();e.moveToElementEditStart(a);e.select(!0); 
} 
});CKEDITOR.env.webkit&&(this.attachListener(this, 'click', function(a){
 a.data.getTarget().is('input', 'select')&&a.data.preventDefault(); 
}),
    this.attachListener(this, 'mouseup', function(a){
 a.data.getTarget().is('input', 'textarea')&&a.data.preventDefault(); 
}));CKEDITOR.env.webkit&&this.attachListener(b, 'key', function(a){
 if(b.readOnly)return!0;var d=a.data.domEvent.getKey();if(d in l&&(a=b.getSelection(), 0!==a.getRanges().length)){
 var d=8==d, f=a.getRanges()[0];a=f.startPath();if(f.collapsed)a:{
 var c=a.block;if(c&&f[d?'checkStartOfBlock':'checkEndOfBlock']()&&f.moveToClosestEditablePosition(c, !d)&&f.collapsed){
 if(f.startContainer.type==CKEDITOR.NODE_ELEMENT){
 var g=
    f.startContainer.getChild(f.startOffset-(d?1:0));if(g&&g.type==CKEDITOR.NODE_ELEMENT&&g.is('hr')){
 b.fire('saveSnapshot');g.remove();a=!0;break a; 
} 
}f=f.startPath().block;if(!f||f&&f.contains(c))a=void 0;else{
 b.fire('saveSnapshot');var h;(h=(d?f:c).getBogus())&&h.remove();h=b.getSelection();g=h.createBookmarks();(d?c:f).moveChildren(d?f:c, !1);a.lastElement.mergeSiblings();e(c, f, !d);h.selectBookmarks(g);a=!0; 
} 
}else a=!1; 
}else d=f, h=a.block, f=d.endPath().block, h&&f&&!h.equals(f)?(b.fire('saveSnapshot'),
    (c=h.getBogus())&&c.remove(), d.enlarge(CKEDITOR.ENLARGE_INLINE), d.deleteContents(), f.getParent()&&(f.moveChildren(h, !1), a.lastElement.mergeSiblings(), e(h, f, !0)), d=b.getSelection().getRanges()[0], d.collapse(1), d.optimize(), ''===d.startContainer.getHtml()&&d.startContainer.appendBogus(), d.select(), a=!0):a=!1;if(!a)return;b.getSelection().scrollIntoView();b.fire('saveSnapshot');return!1; 
} 
}, this, null, 100); 
} 
}, getUniqueId:function(){
 let a;try{
 this._.expandoNumber=a=CKEDITOR.dom.domObject.prototype.getUniqueId.call(this); 
}catch(b){
 a=
    this._&&this._.expandoNumber; 
}return a; 
}}, _:{cleanCustomData:function(){
 this.removeClass('cke_editable');this.restoreAttrs();for(var a=this.removeCustomData('classes');a&&a.length;)this.removeClass(a.pop());if(!this.is('textarea')){
 var a=this.getDocument(), b=a.getHead();if(b.getCustomData('stylesheet')){
 let e=a.getCustomData('stylesheet_ref');--e?a.setCustomData('stylesheet_ref', e):(a.removeCustomData('stylesheet_ref'), b.removeCustomData('stylesheet').remove()); 
} 
} 
}}});CKEDITOR.editor.prototype.editable=
    function(a){
 let b=this._.editable;if(b&&a)return 0;if(!arguments.length)return b;a?b=a instanceof CKEDITOR.editable?a:new CKEDITOR.editable(this, a):(b&&b.detach(), b=null);return this._.editable=b; 
};CKEDITOR.on('instanceLoaded', function(a){
 const b=a.editor;b.on('insertElement', function(a){
 a=a.data;a.type==CKEDITOR.NODE_ELEMENT&&(a.is('input')||a.is('textarea'))&&('false'!=a.getAttribute('contentEditable')&&a.data('cke-editable', a.hasAttribute('contenteditable')?'true':'1'), a.setAttribute('contentEditable',
    !1)); 
});b.on('selectionChange', function(a){
 if(!b.readOnly){
 let e=b.getSelection();e&&!e.isLocked&&(e=b.checkDirty(), b.fire('lockSnapshot'), c(a), b.fire('unlockSnapshot'), !e&&b.resetDirty()); 
} 
}); 
});CKEDITOR.on('instanceCreated', function(a){
 const b=a.editor;b.on('mode', function(){
 const a=b.editable();if(a&&a.isInline()){
 let e=b.title;a.changeAttr('role', 'textbox');a.changeAttr('aria-multiline', 'true');a.changeAttr('aria-label', e);e&&a.changeAttr('title', e);var d=b.fire('ariaEditorHelpLabel', {}).label;if(d&&
    (e=this.ui.space(this.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?'top':'contents'))){
 var f=CKEDITOR.tools.getNextId(), d=CKEDITOR.dom.element.createFromHtml(`\x3cspan id\x3d"${f}" class\x3d"cke_voice_label"\x3e${d}\x3c/span\x3e`);e.append(d);a.changeAttr('aria-describedby', f); 
} 
} 
}); 
});CKEDITOR.addCss('.cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}');n=CKEDITOR.dom.walker.whitespaces(!0);t=CKEDITOR.dom.walker.bookmark(!1, !0);x=CKEDITOR.dom.walker.empty();
    p=CKEDITOR.dom.walker.bogus();q=/(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi;v=function(){
 function e(a){
 return a.type==CKEDITOR.NODE_ELEMENT; 
}function d(a, b){
 var f, c, g, h, k=[], l=b.range.startContainer;f=b.range.startPath();for(var l=m[l.getName()], n=0, t=a.getChildren(), v=t.count(), u=-1, x=-1, w=0, r=f.contains(m.$list);n<v;++n)f=t.getItem(n), e(f)?(g=f.getName(), r&&g in CKEDITOR.dtd.$list?k=k.concat(d(f, b)):(h=!!l[g],
    'br'!=g||!f.data('cke-eol')||n&&n!=v-1||(w=(c=n?k[n-1].node:t.getItem(n+1))&&(!e(c)||!c.is('br')), c=c&&e(c)&&m.$block[c.getName()]), -1!=u||h||(u=n), h||(x=n), k.push({isElement:1, isLineBreak:w, isBlock:f.isBlockBoundary(), hasBlockSibling:c, node:f, name:g, allowed:h}), c=w=0)):k.push({isElement:0, node:f, allowed:1});-1<u&&(k[u].firstNotAllowed=1);-1<x&&(k[x].lastNotAllowed=1);return k; 
}function f(a, b){
 let d=[], c=a.getChildren(), g=c.count(), h, k=0, l=m[b], n=!a.is(m.$inline)||a.is('br');for(n&&d.push(' ');k<g;k++)h=
    c.getItem(k), e(h)&&!h.is(l)?d=d.concat(f(h, b)):d.push(h);n&&d.push(' ');return d; 
}function c(a){
 return e(a.startContainer)&&a.startContainer.getChild(a.startOffset-1); 
}function g(a){
 return a&&e(a)&&(a.is(m.$removeEmpty)||a.is('a')&&!a.isBlockBoundary()); 
}function h(a, b, d, f){
 let c=a.clone(), g, k;c.setEndAt(b, CKEDITOR.POSITION_BEFORE_END);(g=(new CKEDITOR.dom.walker(c)).next())&&e(g)&&t[g.getName()]&&(k=g.getPrevious())&&e(k)&&!k.getParent().equals(a.startContainer)&&d.contains(k)&&f.contains(g)&&g.isIdentical(k)&&
    (g.moveChildren(k), g.remove(), h(a, b, d, f)); 
}function n(a, b){
 function d(a, b){
 if(b.isBlock&&b.isElement&&!b.node.is('br')&&e(a)&&a.is('br'))return a.remove(), 1; 
}const f=b.endContainer.getChild(b.endOffset), c=b.endContainer.getChild(b.endOffset-1);f&&d(f, a[a.length-1]);c&&d(c, a[0])&&(b.setEnd(b.endContainer, b.endOffset-1), b.collapse()); 
}var m=CKEDITOR.dtd, t={p:1, div:1, h1:1, h2:1, h3:1, h4:1, h5:1, h6:1, ul:1, ol:1, li:1, pre:1, dl:1, blockquote:1}, v={p:1, div:1, h1:1, h2:1, h3:1, h4:1, h5:1, h6:1}, u=CKEDITOR.tools.extend({},
    m.$inline);delete u.br;return function(t, x, M, H){
 var w=t.editor, r=!1;'unfiltered_html'==x&&(x='html', r=!0);if(!H.checkReadOnly()){
 var q=(new CKEDITOR.dom.elementPath(H.startContainer, H.root)).blockLimit||H.root;x={type:x, dontFilter:r, editable:t, editor:w, range:H, blockLimit:q, mergeCandidates:[], zombies:[]};var r=x.range, q=x.mergeCandidates, p='html'===x.type, A, D, U, aa, ba, V;'text'==x.type&&r.shrink(CKEDITOR.SHRINK_ELEMENT, !0, !1)&&(D=CKEDITOR.dom.element.createFromHtml('\x3cspan\x3e\x26nbsp;\x3c/span\x3e',
    r.document), r.insertNode(D), r.setStartAfter(D));U=new CKEDITOR.dom.elementPath(r.startContainer);x.endPath=aa=new CKEDITOR.dom.elementPath(r.endContainer);if(!r.collapsed){
 A=aa.block||aa.blockLimit;var ca=r.getCommonAncestor();A&&!A.equals(ca)&&!A.contains(ca)&&r.checkEndOfBlock()&&x.zombies.push(A);r.deleteContents(); 
}for(;(ba=c(r))&&e(ba)&&ba.isBlockBoundary()&&U.contains(ba);)r.moveToPosition(ba, CKEDITOR.POSITION_BEFORE_END);h(r, x.blockLimit, U, aa);D&&(r.setEndBefore(D), r.collapse(), D.remove());
    D=r.startPath();if(A=D.contains(g, !1, 1))V=r.splitElement(A), x.inlineStylesRoot=A, x.inlineStylesPeak=D.lastElement;D=r.createBookmark();p&&(b(A), b(V));(A=D.startNode.getPrevious(a))&&e(A)&&g(A)&&q.push(A);(A=D.startNode.getNext(a))&&e(A)&&g(A)&&q.push(A);for(A=D.startNode;(A=A.getParent())&&g(A);)q.push(A);r.moveToBookmark(D);w.enterMode===CKEDITOR.ENTER_DIV&&''===w.getData(!0)&&((w=t.getFirst())&&w.remove(), H.setStartAt(t, CKEDITOR.POSITION_AFTER_START), H.collapse(!0));if(t=M){
 t=x.range;if('text'==
    x.type&&x.inlineStylesRoot){
 H=x.inlineStylesPeak;w=H.getDocument().createText('{cke-peak}');for(V=x.inlineStylesRoot.getParent();!H.equals(V);)w=w.appendTo(H.clone()), H=H.getParent();M=w.getOuterHtml().split('{cke-peak}').join(M); 
}H=x.blockLimit.getName();if(/^\s+|\s+$/.test(M)&&'span'in CKEDITOR.dtd[H]){
 var Z='\x3cspan data-cke-marker\x3d"1"\x3e\x26nbsp;\x3c/span\x3e';M=Z+M+Z; 
}M=x.editor.dataProcessor.toHtml(M, {context:null, fixForBody:!1, protectedWhitespaces:!!Z, dontFilter:x.dontFilter, filter:x.editor.activeFilter,
    enterMode:x.editor.activeEnterMode});H=t.document.createElement('body');H.setHtml(M);Z&&(H.getFirst().remove(), H.getLast().remove());if((Z=t.startPath().block)&&(1!=Z.getChildCount()||!Z.getBogus()))a:{
 var R;if(1==H.getChildCount()&&e(R=H.getFirst())&&R.is(v)&&!R.hasAttribute('contenteditable')){
 Z=R.getElementsByTag('*');t=0;for(V=Z.count();t<V;t++)if(w=Z.getItem(t), !w.is(u))break a;R.moveChildren(R.getParent(1));R.remove(); 
} 
}x.dataWrapper=H;t=M; 
}if(t){
 R=x.range;t=R.document;H=x.blockLimit;V=0;var S,
    Z=[], ea, G;M=D=0;var P, w=R.startContainer;ba=x.endPath.elements[0];var da, r=ba.getPosition(w), q=!!ba.getCommonAncestor(w)&&r!=CKEDITOR.POSITION_IDENTICAL&&!(r&CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_IS_CONTAINED), w=d(x.dataWrapper, x);for(n(w, R);V<w.length;V++){
 r=w[V];if(p=r.isLineBreak)p=R, A=H, aa=U=void 0, r.hasBlockSibling?p=1:(U=p.startContainer.getAscendant(m.$block, 1))&&U.is({div:1, p:1})?(aa=U.getPosition(A), aa==CKEDITOR.POSITION_IDENTICAL||aa==CKEDITOR.POSITION_CONTAINS?p=0:(A=p.splitElement(U),
    p.moveToPosition(A, CKEDITOR.POSITION_AFTER_START), p=1)):p=0;if(p)M=0<V;else{
 p=R.startPath();!r.isBlock&&k(x.editor, p.block, p.blockLimit)&&(G=l(x.editor))&&(G=t.createElement(G), G.appendBogus(), R.insertNode(G), CKEDITOR.env.needsBrFiller&&(S=G.getBogus())&&S.remove(), R.moveToPosition(G, CKEDITOR.POSITION_BEFORE_END));if((p=R.startPath().block)&&!p.equals(ea)){
 if(S=p.getBogus())S.remove(), Z.push(p);ea=p; 
}r.firstNotAllowed&&(D=1);if(D&&r.isElement){
 p=R.startContainer;for(A=null;p&&!m[p.getName()][r.name];){
 if(p.equals(H)){
 p=
    null;break; 
}A=p;p=p.getParent(); 
}if(p)A&&(P=R.splitElement(A), x.zombies.push(P), x.zombies.push(A));else{
 A=H.getName();da=!V;p=V==w.length-1;A=f(r.node, A);U=[];aa=A.length;for(var ca=0, ga=void 0, fa=0, ja=-1;ca<aa;ca++)ga=A[ca], ' '==ga?(fa||da&&!ca||(U.push(new CKEDITOR.dom.text(' ')), ja=U.length), fa=1):(U.push(ga), fa=0);p&&ja==U.length&&U.pop();da=U; 
} 
}if(da){
 for(;p=da.pop();)R.insertNode(p);da=0; 
}else R.insertNode(r.node);r.lastNotAllowed&&V<w.length-1&&((P=q?ba:P)&&R.setEndAt(P, CKEDITOR.POSITION_AFTER_START),
    D=0);R.collapse(); 
} 
}1!=w.length?S=!1:(S=w[0], S=S.isElement&&'false'==S.node.getAttribute('contenteditable'));S&&(M=!0, p=w[0].node, R.setStartAt(p, CKEDITOR.POSITION_BEFORE_START), R.setEndAt(p, CKEDITOR.POSITION_AFTER_END));x.dontMoveCaret=M;x.bogusNeededBlocks=Z; 
}S=x.range;let ia;da=x.bogusNeededBlocks;for(ea=S.createBookmark();G=x.zombies.pop();)G.getParent()&&(P=S.clone(), P.moveToElementEditStart(G), P.removeEmptyBlocksAtEnd());if(da)for(;G=da.pop();)CKEDITOR.env.needsBrFiller?G.appendBogus():G.append(S.document.createText(' '));
    for(;G=x.mergeCandidates.pop();)G.mergeSiblings();CKEDITOR.env.webkit&&S.startPath()&&(G=S.startPath(), G.block?G.block.$.normalize():G.blockLimit&&G.blockLimit.$.normalize());S.moveToBookmark(ea);if(!x.dontMoveCaret){
 for(G=c(S);G&&e(G)&&!G.is(m.$empty);){
 if(G.isBlockBoundary())S.moveToPosition(G, CKEDITOR.POSITION_BEFORE_END);else{
 if(g(G)&&G.getHtml().match(/(\s|&nbsp;)$/g)){
 ia=null;break; 
}ia=S.clone();ia.moveToPosition(G, CKEDITOR.POSITION_BEFORE_END); 
}G=G.getLast(a); 
}ia&&S.moveToRange(ia); 
} 
} 
}; 
}();w=function(){
 function a(b){
 b=
    new CKEDITOR.dom.walker(b);b.guard=function(a, b){
 if(b)return!1;if(a.type==CKEDITOR.NODE_ELEMENT)return a.is(CKEDITOR.dtd.$tableContent); 
};b.evaluator=function(a){
 return a.type==CKEDITOR.NODE_ELEMENT; 
};return b; 
}function b(a, e, d){
 e=a.getDocument().createElement(e);a.append(e, d);return e; 
}function e(a){
 let b=a.count(), d;for(b;0<b--;)d=a.getItem(b), CKEDITOR.tools.trim(d.getHtml())||(d.appendBogus(), CKEDITOR.env.ie&&9>CKEDITOR.env.version&&d.getChildCount()&&d.getFirst().remove()); 
}return function(d){
 let f=
    d.startContainer, c=f.getAscendant('table', 1), g=!1;e(c.getElementsByTag('td'));e(c.getElementsByTag('th'));c=d.clone();c.setStart(f, 0);c=a(c).lastBackward();c||(c=d.clone(), c.setEndAt(f, CKEDITOR.POSITION_BEFORE_END), c=a(c).lastForward(), g=!0);c||(c=f);c.is('table')?(d.setStartAt(c, CKEDITOR.POSITION_BEFORE_START), d.collapse(!0), c.remove()):(c.is({tbody:1, thead:1, tfoot:1})&&(c=b(c, 'tr', g)), c.is('tr')&&(c=b(c, c.getParent().is('thead')?'th':'td', g)), (f=c.getBogus())&&f.remove(), d.moveToPosition(c, g?CKEDITOR.POSITION_AFTER_START:
    CKEDITOR.POSITION_BEFORE_END)); 
}; 
}();u=function(){
 function a(b){
 b=new CKEDITOR.dom.walker(b);b.guard=function(a, b){
 if(b)return!1;if(a.type==CKEDITOR.NODE_ELEMENT)return a.is(CKEDITOR.dtd.$list)||a.is(CKEDITOR.dtd.$listItem); 
};b.evaluator=function(a){
 return a.type==CKEDITOR.NODE_ELEMENT&&a.is(CKEDITOR.dtd.$listItem); 
};return b; 
}return function(b){
 let e=b.startContainer, d=!1, f;f=b.clone();f.setStart(e, 0);f=a(f).lastBackward();f||(f=b.clone(), f.setEndAt(e, CKEDITOR.POSITION_BEFORE_END), f=a(f).lastForward(),
    d=!0);f||(f=e);f.is(CKEDITOR.dtd.$list)?(b.setStartAt(f, CKEDITOR.POSITION_BEFORE_START), b.collapse(!0), f.remove()):((e=f.getBogus())&&e.remove(), b.moveToPosition(f, d?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_END), b.select()); 
}; 
}();A={eol:{detect:function(a, b){
 const e=a.range, d=e.clone(), f=e.clone(), c=new CKEDITOR.dom.elementPath(e.startContainer, b), g=new CKEDITOR.dom.elementPath(e.endContainer, b);d.collapse(1);f.collapse();c.block&&d.checkBoundaryOfElement(c.block, CKEDITOR.END)&&(e.setStartAfter(c.block),
    a.prependEolBr=1);g.block&&f.checkBoundaryOfElement(g.block, CKEDITOR.START)&&(e.setEndBefore(g.block), a.appendEolBr=1); 
}, fix:function(a, b){
 let e=b.getDocument(), d;a.appendEolBr&&(d=this.createEolBr(e), a.fragment.append(d));!a.prependEolBr||d&&!d.getPrevious()||a.fragment.append(this.createEolBr(e), 1); 
}, createEolBr:function(a){
 return a.createElement('br', {attributes:{'data-cke-eol':1}}); 
}}, bogus:{exclude:function(a){
 var b=a.range.getBoundaryNodes(), e=b.startNode, b=b.endNode;!b||!p(b)||e&&e.equals(b)||
    a.range.setEndBefore(b); 
}}, tree:{rebuild:function(a, b){
 var e=a.range, d=e.getCommonAncestor(), f=new CKEDITOR.dom.elementPath(d, b), c=new CKEDITOR.dom.elementPath(e.startContainer, b), e=new CKEDITOR.dom.elementPath(e.endContainer, b), g;d.type==CKEDITOR.NODE_TEXT&&(d=d.getParent());if(f.blockLimit.is({tr:1, table:1})){
 const h=f.contains('table').getParent();g=function(a){
 return!a.equals(h); 
}; 
}else if(f.block&&f.block.is(CKEDITOR.dtd.$listItem)&&(c=c.contains(CKEDITOR.dtd.$list), e=e.contains(CKEDITOR.dtd.$list),
    !c.equals(e))){
 const k=f.contains(CKEDITOR.dtd.$list).getParent();g=function(a){
 return!a.equals(k); 
}; 
}g||(g=function(a){
 return!a.equals(f.block)&&!a.equals(f.blockLimit); 
});this.rebuildFragment(a, b, d, g); 
}, rebuildFragment:function(a, b, e, d){
 for(var f;e&&!e.equals(b)&&d(e);)f=e.clone(0, 1), a.fragment.appendTo(f), a.fragment=f, e=e.getParent(); 
}}, cell:{shrink:function(a){
 a=a.range;let b=a.startContainer, e=a.endContainer, d=a.startOffset, f=a.endOffset;b.type==CKEDITOR.NODE_ELEMENT&&b.equals(e)&&b.is('tr')&&++d==
    f&&a.shrink(CKEDITOR.SHRINK_TEXT); 
}}};r=function(){
 function a(b, e){
 const d=b.getParent();if(d.is(CKEDITOR.dtd.$inline))b[e?'insertBefore':'insertAfter'](d); 
}function b(e, d, f){
 a(d);a(f, 1);for(var c;c=f.getNext();)c.insertAfter(d), d=c;x(e)&&e.remove(); 
}function e(a, b){
 const d=new CKEDITOR.dom.range(a);d.setStartAfter(b.startNode);d.setEndBefore(b.endNode);return d; 
}return{list:{detectMerge:function(a, b){
 let d=e(b, a.bookmark), f=d.startPath(), c=d.endPath(), g=f.contains(CKEDITOR.dtd.$list), h=c.contains(CKEDITOR.dtd.$list);
    a.mergeList=g&&h&&g.getParent().equals(h.getParent())&&!g.equals(h);a.mergeListItems=f.block&&c.block&&f.block.is(CKEDITOR.dtd.$listItem)&&c.block.is(CKEDITOR.dtd.$listItem);if(a.mergeList||a.mergeListItems)d=d.clone(), d.setStartBefore(a.bookmark.startNode), d.setEndAfter(a.bookmark.endNode), a.mergeListBookmark=d.createBookmark(); 
}, merge:function(a, e){
 if(a.mergeListBookmark){
 let d=a.mergeListBookmark.startNode, f=a.mergeListBookmark.endNode, c=new CKEDITOR.dom.elementPath(d, e), g=new CKEDITOR.dom.elementPath(f,
    e);if(a.mergeList){
 const h=c.contains(CKEDITOR.dtd.$list), k=g.contains(CKEDITOR.dtd.$list);h.equals(k)||(k.moveChildren(h), k.remove()); 
}a.mergeListItems&&(c=c.contains(CKEDITOR.dtd.$listItem), g=g.contains(CKEDITOR.dtd.$listItem), c.equals(g)||b(g, d, f));d.remove();f.remove(); 
} 
}}, block:{detectMerge:function(a, b){
 if(!a.tableContentsRanges&&!a.mergeListBookmark){
 const e=new CKEDITOR.dom.range(b);e.setStartBefore(a.bookmark.startNode);e.setEndAfter(a.bookmark.endNode);a.mergeBlockBookmark=e.createBookmark(); 
} 
},
    merge:function(a, e){
 if(a.mergeBlockBookmark&&!a.purgeTableBookmark){
 var d=a.mergeBlockBookmark.startNode, f=a.mergeBlockBookmark.endNode, c=new CKEDITOR.dom.elementPath(d, e), g=new CKEDITOR.dom.elementPath(f, e), c=c.block, g=g.block;c&&g&&!c.equals(g)&&b(g, d, f);d.remove();f.remove(); 
} 
}}, table:function(){
 function a(e){
 let f=[], c, g=new CKEDITOR.dom.walker(e), h=e.startPath().contains(d), k=e.endPath().contains(d), l={};g.guard=function(a, g){
 if(a.type==CKEDITOR.NODE_ELEMENT){
 var n=`visited_${g?'out':'in'}`;if(a.getCustomData(n))return;
    CKEDITOR.dom.element.setMarker(l, a, n, 1); 
}if(g&&h&&a.equals(h))c=e.clone(), c.setEndAt(h, CKEDITOR.POSITION_BEFORE_END), f.push(c);else if(!g&&k&&a.equals(k))c=e.clone(), c.setStartAt(k, CKEDITOR.POSITION_AFTER_START), f.push(c);else{
 if(n=!g)n=a.type==CKEDITOR.NODE_ELEMENT&&a.is(d)&&(!h||b(a, h))&&(!k||b(a, k));if(!n&&(n=g))if(a.is(d))var n=h&&h.getAscendant('table', !0), m=k&&k.getAscendant('table', !0), t=a.getAscendant('table', !0), n=n&&n.contains(t)||m&&m.contains(t);else n=void 0;n&&(c=e.clone(), c.selectNodeContents(a),
    f.push(c)); 
} 
};g.lastForward();CKEDITOR.dom.element.clearAllMarkers(l);return f; 
}function b(a, e){
 const d=CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_IS_CONTAINED, f=a.getPosition(e);return f===CKEDITOR.POSITION_IDENTICAL?!1:0===(f&d); 
}var d={td:1, th:1, caption:1};return{detectPurge:function(a){
 var b=a.range, e=b.clone();e.enlarge(CKEDITOR.ENLARGE_ELEMENT);var e=new CKEDITOR.dom.walker(e), f=0;e.evaluator=function(a){
 a.type==CKEDITOR.NODE_ELEMENT&&a.is(d)&&++f; 
};e.checkForward();if(1<f){
 var e=b.startPath().contains('table'),
    c=b.endPath().contains('table');e&&c&&b.checkBoundaryOfElement(e, CKEDITOR.START)&&b.checkBoundaryOfElement(c, CKEDITOR.END)&&(b=a.range.clone(), b.setStartBefore(e), b.setEndAfter(c), a.purgeTableBookmark=b.createBookmark()); 
} 
}, detectRanges:function(f, c){
 let g=e(c, f.bookmark), h=g.clone(), k, l, n=g.getCommonAncestor();n.is(CKEDITOR.dtd.$tableContent)&&!n.is(d)&&(n=n.getAscendant('table', !0));l=n;n=new CKEDITOR.dom.elementPath(g.startContainer, l);l=new CKEDITOR.dom.elementPath(g.endContainer, l);n=n.contains('table');
    l=l.contains('table');if(n||l)n&&l&&b(n, l)?(f.tableSurroundingRange=h, h.setStartAt(n, CKEDITOR.POSITION_AFTER_END), h.setEndAt(l, CKEDITOR.POSITION_BEFORE_START), h=g.clone(), h.setEndAt(n, CKEDITOR.POSITION_AFTER_END), k=g.clone(), k.setStartAt(l, CKEDITOR.POSITION_BEFORE_START), k=a(h).concat(a(k))):n?l||(f.tableSurroundingRange=h, h.setStartAt(n, CKEDITOR.POSITION_AFTER_END), g.setEndAt(n, CKEDITOR.POSITION_AFTER_END)):(f.tableSurroundingRange=h, h.setEndAt(l, CKEDITOR.POSITION_BEFORE_START), g.setStartAt(l, CKEDITOR.POSITION_AFTER_START)),
    f.tableContentsRanges=k?k:a(g); 
}, deleteRanges:function(a){
 for(var b;b=a.tableContentsRanges.pop();)b.extractContents(), x(b.startContainer)&&b.startContainer.appendBogus();a.tableSurroundingRange&&a.tableSurroundingRange.extractContents(); 
}, purge:function(a){
 if(a.purgeTableBookmark){
 var b=a.doc, e=a.range.clone(), b=b.createElement('p');b.insertBefore(a.purgeTableBookmark.startNode);e.moveToBookmark(a.purgeTableBookmark);e.deleteContents();a.range.moveToPosition(b, CKEDITOR.POSITION_AFTER_START); 
} 
}}; 
}(),
    detectExtractMerge:function(a){
 return!(a.range.startPath().contains(CKEDITOR.dtd.$listItem)&&a.range.endPath().contains(CKEDITOR.dtd.$listItem)); 
}, fixUneditableRangePosition:function(a){
 a.startContainer.getDtd()['#']||a.moveToClosestEditablePosition(null, !0); 
}, autoParagraph:function(a, b){
 let e=b.startPath(), d;k(a, e.block, e.blockLimit)&&(d=l(a))&&(d=b.document.createElement(d), d.appendBogus(), b.insertNode(d), b.moveToPosition(d, CKEDITOR.POSITION_AFTER_START)); 
}}; 
}(); 
}(), function(){
 function c(a){
 return CKEDITOR.plugins.widget&&
    CKEDITOR.plugins.widget.isDomWidget(a); 
}function h(a, b){
 if(0===a.length||c(a[0].getEnclosedNode()))return!1;let e, d;if((e=!b&&1===a.length)&&!(e=a[0].collapsed)){
 let f=a[0];e=f.startContainer.getAscendant({td:1, th:1}, !0);const g=f.endContainer.getAscendant({td:1, th:1}, !0);d=CKEDITOR.tools.trim;e&&e.equals(g)&&!e.findOne('td, th, tr, tbody, table')?(f=f.cloneContents(), e=f.getFirst()?d(f.getFirst().getText())!==d(e.getText()):!0):e=!1; 
}if(e)return!1;for(d=0;d<a.length;d++)if(e=a[d]._getTableElement(),
    !e)return!1;return!0; 
}function g(a){
 function b(a){
 a=a.find('td, th');let e=[], d;for(d=0;d<a.count();d++)e.push(a.getItem(d));return e; 
}let e=[], d, f;for(f=0;f<a.length;f++)d=a[f]._getTableElement(), d.is&&d.is({td:1, th:1})?e.push(d):e=e.concat(b(d));return e; 
}function a(a){
 a=g(a);let b='', e=[], d, f;for(f=0;f<a.length;f++)d&&!d.equals(a[f].getAscendant('tr'))?(b+=`${e.join('\t')}\n`, d=a[f].getAscendant('tr'), e=[]):0===f&&(d=a[f].getAscendant('tr')), e.push(a[f].getText());return b+=e.join('\t'); 
}function f(b){
 let e=
    this.root.editor, d=e.getSelection(1);this.reset();r=!0;d.root.once('selectionchange', function(a){
 a.cancel(); 
}, null, null, 0);d.selectRanges([b[0]]);d=this._.cache;d.ranges=new CKEDITOR.dom.rangeList(b);d.type=CKEDITOR.SELECTION_TEXT;d.selectedElement=b[0]._getTableElement();d.selectedText=a(b);d.nativeSel=null;this.isFake=1;this.rev=w++;e._.fakeSelection=this;r=!1;this.root.fire('selectionchange'); 
}function m(){
 let a=this._.fakeSelection, b;if(a){
 b=this.getSelection(1);var e;if(!(e=!b)&&(e=!b.isHidden())){
 e=
    a;var d=b.getRanges(), f=e.getRanges(), g=d.length&&d[0]._getTableElement()&&d[0]._getTableElement().getAscendant('table', !0), k=f.length&&f[0]._getTableElement()&&f[0]._getTableElement().getAscendant('table', !0), l=1===d.length&&d[0]._getTableElement()&&d[0]._getTableElement().is('table'), n=1===f.length&&f[0]._getTableElement()&&f[0]._getTableElement().is('table');if(c(e.getSelectedElement()))e=!1;else{
 var m=1===d.length&&d[0].collapsed, f=h(d, !!CKEDITOR.env.webkit)&&h(f);g=g&&k?g.equals(k)||k.contains(g):
    !1;g&&(m||f)?(l&&!n&&e.selectRanges(d), e=!0):e=!1; 
}e=!e; 
}e&&(a.reset(), a=0); 
}if(!a&&(a=b||this.getSelection(1), !a||a.getType()==CKEDITOR.SELECTION_NONE))return;this.fire('selectionCheck', a);b=this.elementPath();b.compare(this._.selectionPreviousPath)||(e=this._.selectionPreviousPath&&this._.selectionPreviousPath.blockLimit.equals(b.blockLimit), !CKEDITOR.env.webkit&&!CKEDITOR.env.gecko||e||(this._.previousActive=this.document.getActive()), this._.selectionPreviousPath=b, this.fire('selectionChange', {selection:a,
    path:b})); 
}function k(){
 z=!0;y||(l.call(this), y=CKEDITOR.tools.setTimeout(l, 200, this)); 
}function l(){
 y=null;z&&(CKEDITOR.tools.setTimeout(m, 0, this), z=!1); 
}function b(a){
 return B(a)||a.type==CKEDITOR.NODE_ELEMENT&&!a.is(CKEDITOR.dtd.$empty)?!0:!1; 
}function d(a){
 function e(b, d){
 return b&&b.type!=CKEDITOR.NODE_TEXT?a.clone()[`moveToElementEdit${d?'End':'Start'}`](b):!1; 
}if(!(a.root instanceof CKEDITOR.editable))return!1;const d=a.startContainer, f=a.getPreviousNode(b, null, d), c=a.getNextNode(b, null, d);return e(f)||
    e(c, 1)||!(f||c||d.type==CKEDITOR.NODE_ELEMENT&&d.isBlockBoundary()&&d.getBogus())?!0:!1; 
}function e(a){
 n(a, !1);const b=a.getDocument().createText(u);a.setCustomData('cke-fillingChar', b);return b; 
}function n(a, b){
 let e=a&&a.removeCustomData('cke-fillingChar');if(e){
 if(!1!==b){
 var d=a.getDocument().getSelection().getNative(), f=d&&'None'!=d.type&&d.getRangeAt(0), c=u.length;if(e.getLength()>c&&f&&f.intersectsNode(e.$)){
 var g=[{node:d.anchorNode, offset:d.anchorOffset}, {node:d.focusNode, offset:d.focusOffset}];
    d.anchorNode==e.$&&d.anchorOffset>c&&(g[0].offset-=c);d.focusNode==e.$&&d.focusOffset>c&&(g[1].offset-=c); 
} 
}e.setText(t(e.getText(), 1));g&&(e=a.getDocument().$, d=e.getSelection(), e=e.createRange(), e.setStart(g[0].node, g[0].offset), e.collapse(!0), d.removeAllRanges(), d.addRange(e), d.extend(g[1].node, g[1].offset)); 
} 
}function t(a, b){
 return b?a.replace(A, function(a, b){
 return b?' ':''; 
}):a.replace(u, ''); 
}function x(a, b){
 var e=b&&CKEDITOR.tools.htmlEncode(b)||'\x26nbsp;', e=CKEDITOR.dom.element.createFromHtml(`\x3cdiv data-cke-hidden-sel\x3d"1" data-cke-temp\x3d"1" style\x3d"${
    CKEDITOR.env.ie&&14>CKEDITOR.env.version?'display:none':'position:fixed;top:0;left:-1000px;width:0;height:0;overflow:hidden;'}"\x3e${e}\x3c/div\x3e`, a.document);a.fire('lockSnapshot');a.editable().append(e);const d=a.getSelection(1), f=a.createRange(), c=d.root.on('selectionchange', function(a){
 a.cancel(); 
}, null, null, 0);f.setStartAt(e, CKEDITOR.POSITION_AFTER_START);f.setEndAt(e, CKEDITOR.POSITION_BEFORE_END);d.selectRanges([f]);c.removeListener();a.fire('unlockSnapshot');a._.hiddenSelectionContainer=
    e; 
}function p(a){
 const b={37:1, 39:1, 8:1, 46:1};return function(e){
 let d=e.data.getKeystroke();if(b[d]){
 const f=a.getSelection(), c=f.getRanges(), g=c[0];1==c.length&&g.collapsed&&((d=g[38>d?'getPreviousEditableNode':'getNextEditableNode']())&&d.type==CKEDITOR.NODE_ELEMENT&&'false'==d.getAttribute('contenteditable')?f._&&f._.cache&&f._.cache.nativeSel&&f._.cache.nativeSel.baseNode&&'P'===f._.cache.nativeSel.baseNode.nodeName?('span'!==d.getName()&&g.endContainer.$.remove(), a.getSelection().fake(d), e.data.preventDefault(),
    e.cancel(), d.$.click()):'#text'===g.endContainer.$.nodeName&&'P'===g.endContainer.$.parentNode.nodeName?(''===g.endContainer.$&&g.endContainer.$.parentNode.remove(), a.getSelection().fake(d), e.data.preventDefault(), e.cancel(), d.$.click()):(0===g.endOffset&&'LI'===g.endContainer.$.nodeName&&(console.log('here delete li'), g.endContainer.$.remove()), a.getSelection().fake(d), e.data.preventDefault(), e.cancel()):0===g.endOffset&&'P'===g.endContainer.$.nodeName&&!$.trim($(g.endContainer.$).text())&&$(g.endContainer.$).next()[0]&&
    $(g.endContainer.$).next()); 
} 
}; 
}function q(a){
 for(var b=0;b<a.length;b++){
 var e=a[b];e.getCommonAncestor().isReadOnly()&&a.splice(b, 1);if(!e.collapsed){
 if(e.startContainer.isReadOnly())for(var d=e.startContainer, f;d&&!((f=d.type==CKEDITOR.NODE_ELEMENT)&&d.is('body')||!d.isReadOnly());)f&&'false'==d.getAttribute('contentEditable')&&e.setStartAfter(d), d=d.getParent();d=e.startContainer;f=e.endContainer;var c=e.startOffset, g=e.endOffset, h=e.clone();d&&d.type==CKEDITOR.NODE_TEXT&&(c>=d.getLength()?h.setStartAfter(d):
    h.setStartBefore(d));f&&f.type==CKEDITOR.NODE_TEXT&&(g?h.setEndAfter(f):h.setEndBefore(f));d=new CKEDITOR.dom.walker(h);d.evaluator=function(d){
 if(d.type==CKEDITOR.NODE_ELEMENT&&d.isReadOnly()){
 const f=e.clone();e.setEndBefore(d);e.collapsed&&a.splice(b--, 1);d.getPosition(h.endContainer)&CKEDITOR.POSITION_CONTAINS||(f.setStartAfter(d), f.collapsed||a.splice(b+1, 0, f));return!0; 
}return!1; 
};d.next(); 
} 
}return a; 
}var v='function'!==typeof window.getSelection, w=1, u=CKEDITOR.tools.repeat('​', 7), A=new RegExp(`${u}( )?`,
    'g'), r, y, z, B=CKEDITOR.dom.walker.invisible(1), C=function(){
 function a(b){
 return function(a){
 const e=a.editor.createRange();e.moveToClosestEditablePosition(a.selected, b)&&a.editor.getSelection().selectRanges([e]);return!1; 
}; 
}function b(a){
 return function(b){
 let e=b.editor, d=e.createRange(), f;if(!e.readOnly)return(f=d.moveToClosestEditablePosition(b.selected, a))||(f=d.moveToClosestEditablePosition(b.selected, !a)), f&&e.getSelection().selectRanges([d]), e.fire('saveSnapshot'), b.selected.remove(), f||(d.moveToElementEditablePosition(e.editable()),
    e.getSelection().selectRanges([d])), e.fire('saveSnapshot'), !1; 
}; 
}const e=a(), d=a(1);return{37:e, 38:e, 39:d, 40:d, 8:b(), 46:b(1)}; 
}();CKEDITOR.on('instanceCreated', function(a){
 function b(){
 const a=e.getSelection();a&&a.removeAllRanges(); 
}var e=a.editor;e.on('contentDom', function(){
 function a(){
 w=new CKEDITOR.dom.selection(e.getSelection());w.lock(); 
}function b(){
 g.removeListener('mouseup', b);t.removeListener('mouseup', b);const a=CKEDITOR.document.$.selection, e=a.createRange();'None'!=a.type&&e.parentElement()&&
    e.parentElement().ownerDocument==c.$&&e.select(); 
}function d(a){
 let b, e;b=(b=this.document.getActive())?'input'===b.getName()||'textarea'===b.getName():!1;b||(b=this.getSelection(1), (e=f(b))&&!e.equals(h)&&(b.selectElement(e), a.data.preventDefault())); 
}function f(a){
 a=a.getRanges()[0];return a?(a=a.startContainer.getAscendant(function(a){
 return a.type==CKEDITOR.NODE_ELEMENT&&a.hasAttribute('contenteditable'); 
}, !0))&&'false'===a.getAttribute('contenteditable')?a:null:null; 
}var c=e.document, g=CKEDITOR.document,
    h=e.editable(), l=c.getBody(), t=c.getDocumentElement(), x=h.isInline(), u, w;CKEDITOR.env.gecko&&h.attachListener(h, 'focus', function(a){
 a.removeListener();0!==u&&(a=e.getSelection().getNative())&&a.isCollapsed&&a.anchorNode==h.$&&(a=e.createRange(), a.moveToElementEditStart(h), a.select()); 
}, null, null, -2);h.attachListener(h, CKEDITOR.env.webkit||CKEDITOR.env.gecko?'focusin':'focus', function(){
 if(u&&(CKEDITOR.env.webkit||CKEDITOR.env.gecko)){
 u=e._.previousActive&&e._.previousActive.equals(c.getActive());const a=
    null!=e._.previousScrollTop&&e._.previousScrollTop!=h.$.scrollTop;CKEDITOR.env.webkit&&u&&a&&(h.$.scrollTop=e._.previousScrollTop); 
}e.unlockSelection(u);u=0; 
}, null, null, -1);h.attachListener(h, 'mousedown', function(){
 u=0; 
});if(CKEDITOR.env.ie||CKEDITOR.env.gecko||x)v?h.attachListener(h, 'beforedeactivate', a, null, null, -1):h.attachListener(e, 'selectionCheck', a, null, null, -1), h.attachListener(h, CKEDITOR.env.webkit||CKEDITOR.env.gecko?'focusout':'blur', function(){
 const a=w&&(w.isFake||2>w.getRanges().length);
    CKEDITOR.env.gecko&&!x&&a||(e.lockSelection(w), u=1); 
}, null, null, -1), h.attachListener(h, 'mousedown', function(){
 u=0; 
});if(CKEDITOR.env.ie&&!x){
 let r;h.attachListener(h, 'mousedown', function(a){
 2==a.data.$.button&&((a=e.document.getSelection())&&a.getType()!=CKEDITOR.SELECTION_NONE||(r=e.window.getScrollPosition())); 
});h.attachListener(h, 'mouseup', function(a){
 2==a.data.$.button&&r&&(e.document.$.documentElement.scrollLeft=r.x, e.document.$.documentElement.scrollTop=r.y);r=null; 
});if('BackCompat'!=c.$.compatMode){
 if(CKEDITOR.env.ie7Compat||
    CKEDITOR.env.ie6Compat){
 let z, q;t.on('mousedown', function(a){
 function b(a){
 a=a.data.$;if(z){
 const e=l.$.createTextRange();try{
 e.moveToPoint(a.clientX, a.clientY); 
}catch(d){}z.setEndPoint(0>q.compareEndPoints('StartToStart', e)?'EndToEnd':'StartToStart', e);z.select(); 
} 
}function e(){
 t.removeListener('mousemove', b);g.removeListener('mouseup', e);t.removeListener('mouseup', e);z.select(); 
}a=a.data;if(a.getTarget().is('html')&&a.$.y<t.$.clientHeight&&a.$.x<t.$.clientWidth){
 z=l.$.createTextRange();try{
 z.moveToPoint(a.$.clientX,
    a.$.clientY); 
}catch(d){}q=z.duplicate();t.on('mousemove', b);g.on('mouseup', e);t.on('mouseup', e); 
} 
}); 
}if(7<CKEDITOR.env.version&&11>CKEDITOR.env.version)t.on('mousedown', function(a){
 a.data.getTarget().is('html')&&(g.on('mouseup', b), t.on('mouseup', b)); 
}); 
} 
}h.attachListener(h, 'selectionchange', m, e);h.attachListener(h, 'keyup', k, e);h.attachListener(h, 'touchstart', k, e);h.attachListener(h, 'touchend', k, e);CKEDITOR.env.ie&&h.attachListener(h, 'keydown', d, e);h.attachListener(h, CKEDITOR.env.webkit||CKEDITOR.env.gecko?
    'focusin':'focus', function(){
 e.forceNextSelectionCheck();e.selectionChange(1); 
});if(x&&(CKEDITOR.env.webkit||CKEDITOR.env.gecko)){
 let A;h.attachListener(h, 'mousedown', function(){
 A=1; 
});h.attachListener(c.getDocumentElement(), 'mouseup', function(){
 A&&k.call(e);A=0; 
}); 
}else h.attachListener(CKEDITOR.env.ie?h:c.getDocumentElement(), 'mouseup', k, e);CKEDITOR.env.webkit&&h.attachListener(c, 'keydown', function(a){
 switch(a.data.getKey()){
 case 13:case 33:case 34:case 35:case 36:case 37:case 39:case 8:case 45:case 46:h.hasFocus&&
    n(h); 
} 
}, null, null, -1);h.attachListener(h, 'keydown', p(e), null, null, -1); 
});e.on('setData', function(){
 e.unlockSelection();CKEDITOR.env.webkit&&b(); 
});e.on('contentDomUnload', function(){
 e.unlockSelection(); 
});if(CKEDITOR.env.ie9Compat)e.on('beforeDestroy', b, null, null, 9);e.on('dataReady', function(){
 delete e._.fakeSelection;delete e._.hiddenSelectionContainer;e.selectionChange(1); 
});e.on('loadSnapshot', function(){
 let a=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT), b=e.editable().getLast(a);b&&b.hasAttribute('data-cke-hidden-sel')&&
    (b.remove(), CKEDITOR.env.gecko&&(a=e.editable().getFirst(a))&&a.is('br')&&a.getAttribute('_moz_editor_bogus_node')&&a.remove()); 
}, null, null, 100);e.on('key', function(a){
 if('wysiwyg'==e.mode){
 const b=e.getSelection();if(b.isFake){
 const d=C[a.data.keyCode];if(d)return d({editor:e, selected:b.getSelectedElement(), selection:b, keyEvent:a}); 
} 
} 
}); 
});if(CKEDITOR.env.webkit)CKEDITOR.on('instanceReady', function(a){
 const b=a.editor;b.on('selectionChange', function(){
 const a=b.editable(), e=a.getCustomData('cke-fillingChar');
    e&&(e.getCustomData('ready')?(n(a), a.editor.fire('selectionCheck')):e.setCustomData('ready', 1)); 
}, null, null, -1);b.on('beforeSetMode', function(){
 n(b.editable()); 
}, null, null, -1);b.on('getSnapshot', function(a){
 a.data&&(a.data=t(a.data)); 
}, b, null, 20);b.on('toDataFormat', function(a){
 a.data.dataValue=t(a.data.dataValue); 
}, null, null, 0); 
});CKEDITOR.editor.prototype.selectionChange=function(a){
 (a?m:k).call(this); 
};CKEDITOR.editor.prototype.getSelection=function(a){
 return!this._.savedSelection&&!this._.fakeSelection||
    a?(a=this.editable())&&'wysiwyg'==this.mode?new CKEDITOR.dom.selection(a):null:this._.savedSelection||this._.fakeSelection; 
};CKEDITOR.editor.prototype.getSelectedRanges=function(a){
 const b=this.getSelection();return b&&b.getRanges(a)||[]; 
};CKEDITOR.editor.prototype.lockSelection=function(a){
 a=a||this.getSelection(1);return a.getType()!=CKEDITOR.SELECTION_NONE?(!a.isLocked&&a.lock(), this._.savedSelection=a, !0):!1; 
};CKEDITOR.editor.prototype.unlockSelection=function(a){
 const b=this._.savedSelection;return b?
    (b.unlock(a), delete this._.savedSelection, !0):!1; 
};CKEDITOR.editor.prototype.forceNextSelectionCheck=function(){
 delete this._.selectionPreviousPath; 
};CKEDITOR.dom.document.prototype.getSelection=function(){
 return new CKEDITOR.dom.selection(this); 
};CKEDITOR.dom.range.prototype.select=function(){
 const a=this.root instanceof CKEDITOR.editable?this.root.editor.getSelection():new CKEDITOR.dom.selection(this.root);a.selectRanges([this]);return a; 
};CKEDITOR.SELECTION_NONE=1;CKEDITOR.SELECTION_TEXT=2;CKEDITOR.SELECTION_ELEMENT=
    3;CKEDITOR.dom.selection=function(a){
 if(a instanceof CKEDITOR.dom.selection){
 var b=a;a=a.root; 
}const e=a instanceof CKEDITOR.dom.element;this.rev=b?b.rev:w++;this.document=a instanceof CKEDITOR.dom.document?a:a.getDocument();this.root=e?a:this.document.getBody();this.isLocked=0;this._={cache:{}};if(b)return CKEDITOR.tools.extend(this._.cache, b._.cache), this.isFake=b.isFake, this.isLocked=b.isLocked, this;a=this.getNative();let d, f;if(a)if(a.getRangeAt)d=(f=a.rangeCount&&a.getRangeAt(0))&&new CKEDITOR.dom.node(f.commonAncestorContainer);
    else{
 try{
 f=a.createRange(); 
}catch(c){}d=f&&CKEDITOR.dom.element.get(f.item&&f.item(0)||f.parentElement()); 
}if(!d||d.type!=CKEDITOR.NODE_ELEMENT&&d.type!=CKEDITOR.NODE_TEXT||!this.root.equals(d)&&!this.root.contains(d))this._.cache.type=CKEDITOR.SELECTION_NONE, this._.cache.startElement=null, this._.cache.selectedElement=null, this._.cache.selectedText='', this._.cache.ranges=new CKEDITOR.dom.rangeList;return this; 
};const E={img:1, hr:1, li:1, table:1, tr:1, td:1, th:1, embed:1, object:1, ol:1, ul:1, a:1, input:1, form:1,
    select:1, textarea:1, button:1, fieldset:1, thead:1, tfoot:1};CKEDITOR.tools.extend(CKEDITOR.dom.selection, {_removeFillingCharSequenceString:t, _createFillingCharSequenceNode:e, FILLING_CHAR_SEQUENCE:u});CKEDITOR.dom.selection.prototype={getNative:function(){
 return void 0!==this._.cache.nativeSel?this._.cache.nativeSel:this._.cache.nativeSel=v?this.document.$.selection:this.document.getWindow().$.getSelection(); 
}, getType:v?function(){
 const a=this._.cache;if(a.type)return a.type;let b=CKEDITOR.SELECTION_NONE;
    try{
 const e=this.getNative(), d=e.type;'Text'==d&&(b=CKEDITOR.SELECTION_TEXT);'Control'==d&&(b=CKEDITOR.SELECTION_ELEMENT);e.createRange().parentElement()&&(b=CKEDITOR.SELECTION_TEXT); 
}catch(f){}return a.type=b; 
}:function(){
 const a=this._.cache;if(a.type)return a.type;var b=CKEDITOR.SELECTION_TEXT, e=this.getNative();if(!e||!e.rangeCount)b=CKEDITOR.SELECTION_NONE;else if(1==e.rangeCount){
 var e=e.getRangeAt(0), d=e.startContainer;d==e.endContainer&&1==d.nodeType&&1==e.endOffset-e.startOffset&&E[d.childNodes[e.startOffset].nodeName.toLowerCase()]&&
    (b=CKEDITOR.SELECTION_ELEMENT); 
}return a.type=b; 
}, getRanges:function(){
 const a=v?function(){
 function a(b){
 return(new CKEDITOR.dom.node(b)).getIndex(); 
}const b=function(b, e){
 b=b.duplicate();b.collapse(e);let d=b.parentElement();if(!d.hasChildNodes())return{container:d, offset:0};for(var f=d.children, c, g, h=b.duplicate(), k=0, l=f.length-1, n=-1, m, t;k<=l;)if(n=Math.floor((k+l)/2), c=f[n], h.moveToElementText(c), m=h.compareEndPoints('StartToStart', b), 0<m)l=n-1;else if(0>m)k=n+1;else return{container:d, offset:a(c)};
    if(-1==n||n==f.length-1&&0>m){
 h.moveToElementText(d);h.setEndPoint('StartToStart', b);h=h.text.replace(/(\r\n|\r)/g, '\n').length;f=d.childNodes;if(!h)return c=f[f.length-1], c.nodeType!=CKEDITOR.NODE_TEXT?{container:d, offset:f.length}:{container:c, offset:c.nodeValue.length};for(d=f.length;0<h&&0<d;)g=f[--d], g.nodeType==CKEDITOR.NODE_TEXT&&(t=g, h-=g.nodeValue.length);return{container:t, offset:-h}; 
}h.collapse(0<m?!0:!1);h.setEndPoint(0<m?'StartToStart':'EndToStart', b);h=h.text.replace(/(\r\n|\r)/g, '\n').length;
    if(!h)return{container:d, offset:a(c)+(0<m?0:1)};for(;0<h;)try{
 g=c[0<m?'previousSibling':'nextSibling'], g.nodeType==CKEDITOR.NODE_TEXT&&(h-=g.nodeValue.length, t=g), c=g; 
}catch(x){
 return{container:d, offset:a(c)}; 
}return{container:t, offset:0<m?-h:t.nodeValue.length+h}; 
};return function(){
 var a=this.getNative(), e=a&&a.createRange(), d=this.getType();if(!a)return[];if(d==CKEDITOR.SELECTION_TEXT)return a=new CKEDITOR.dom.range(this.root), d=b(e, !0), a.setStart(new CKEDITOR.dom.node(d.container), d.offset), d=b(e),
    a.setEnd(new CKEDITOR.dom.node(d.container), d.offset), a.endContainer.getPosition(a.startContainer)&CKEDITOR.POSITION_PRECEDING&&a.endOffset<=a.startContainer.getIndex()&&a.collapse(), [a];if(d==CKEDITOR.SELECTION_ELEMENT){
 for(var d=[], f=0;f<e.length;f++){
 for(var c=e.item(f), g=c.parentNode, h=0, a=new CKEDITOR.dom.range(this.root);h<g.childNodes.length&&g.childNodes[h]!=c;h++);a.setStart(new CKEDITOR.dom.node(g), h);a.setEnd(new CKEDITOR.dom.node(g), h+1);d.push(a); 
}return d; 
}return[]; 
}; 
}():function(){
 let a=
    [], b, e=this.getNative();if(!e)return a;for(let d=0;d<e.rangeCount;d++){
 const f=e.getRangeAt(d);b=new CKEDITOR.dom.range(this.root);b.setStart(new CKEDITOR.dom.node(f.startContainer), f.startOffset);b.setEnd(new CKEDITOR.dom.node(f.endContainer), f.endOffset);a.push(b); 
}return a; 
};return function(b){
 let e=this._.cache, d=e.ranges;d||(e.ranges=d=new CKEDITOR.dom.rangeList(a.call(this)));return b?q(new CKEDITOR.dom.rangeList(d.slice())):d; 
}; 
}(), getStartElement:function(){
 const a=this._.cache;if(void 0!==a.startElement)return a.startElement;
    let b;switch(this.getType()){
 case CKEDITOR.SELECTION_ELEMENT:return this.getSelectedElement();case CKEDITOR.SELECTION_TEXT:var e=this.getRanges()[0];if(e){
 if(e.collapsed)b=e.startContainer, b.type!=CKEDITOR.NODE_ELEMENT&&(b=b.getParent());else{
 for(e.optimize();b=e.startContainer, e.startOffset==(b.getChildCount?b.getChildCount():b.getLength())&&!b.isBlockBoundary();)e.setStartAfter(b);b=e.startContainer;if(b.type!=CKEDITOR.NODE_ELEMENT)return b.getParent();if((b=b.getChild(e.startOffset))&&b.type==
    CKEDITOR.NODE_ELEMENT)for(e=b.getFirst();e&&e.type==CKEDITOR.NODE_ELEMENT;)b=e, e=e.getFirst();else b=e.startContainer; 
}b=b.$; 
} 
}return a.startElement=b?new CKEDITOR.dom.element(b):null; 
}, getSelectedElement:function(){
 const a=this._.cache;if(void 0!==a.selectedElement)return a.selectedElement;const b=this, e=CKEDITOR.tools.tryThese(function(){
 return b.getNative().createRange().item(0); 
}, function(){
 for(var a=b.getRanges()[0].clone(), e, d, f=2;f&&!((e=a.getEnclosedNode())&&e.type==CKEDITOR.NODE_ELEMENT&&E[e.getName()]&&
    (d=e));f--)a.shrink(CKEDITOR.SHRINK_ELEMENT);return d&&d.$; 
});return a.selectedElement=e?new CKEDITOR.dom.element(e):null; 
}, getSelectedText:function(){
 const a=this._.cache;if(void 0!==a.selectedText)return a.selectedText;var b=this.getNative(), b=v?'Control'==b.type?'':b.createRange().text:b.toString();return a.selectedText=b; 
}, lock:function(){
 this.getRanges();this.getStartElement();this.getSelectedElement();this.getSelectedText();this._.cache.nativeSel=null;this.isLocked=1; 
}, unlock:function(a){
 if(this.isLocked){
 if(a)var b=
    this.getSelectedElement(), e=this.getRanges(), d=this.isFake;this.isLocked=0;this.reset();a&&(a=b||e[0]&&e[0].getCommonAncestor())&&a.getAscendant('body', 1)&&((a=this.root.editor)&&a.plugins.tableselection&&a.plugins.tableselection.isSupportedEnvironment(a)&&h(e)?f.call(this, e):d?this.fake(b):b&&2>e.length?this.selectElement(b):this.selectRanges(e)); 
} 
}, reset:function(){
 this._.cache={};this.isFake=0;const a=this.root.editor;if(a&&a._.fakeSelection)if(this.rev==a._.fakeSelection.rev){
 delete a._.fakeSelection;
    const b=a._.hiddenSelectionContainer;if(b){
 const e=a.checkDirty();a.fire('lockSnapshot');b.remove();a.fire('unlockSnapshot');!e&&a.resetDirty(); 
}delete a._.hiddenSelectionContainer; 
}else CKEDITOR.warn('selection-fake-reset');this.rev=w++; 
}, selectElement:function(a){
 const b=new CKEDITOR.dom.range(this.root);b.setStartBefore(a);b.setEndAfter(a);this.selectRanges([b]); 
}, selectRanges:function(a){
 var b=this.root.editor, c=b&&b._.hiddenSelectionContainer;this.reset();if(c)for(var c=this.root, g, k=0;k<a.length;++k)g=
    a[k], g.endContainer.equals(c)&&(g.endOffset=Math.min(g.endOffset, c.getChildCount()));if(a.length)if(this.isLocked){
 var l=CKEDITOR.document.getActive();this.unlock();this.selectRanges(a);this.lock();l&&!l.equals(this.root)&&l.focus(); 
}else{
 let m;a:{
 var t, x;if(1==a.length&&!(x=a[0]).collapsed&&(m=x.getEnclosedNode())&&m.type==CKEDITOR.NODE_ELEMENT&&(x=x.clone(), x.shrink(CKEDITOR.SHRINK_ELEMENT, !0), (t=x.getEnclosedNode())&&t.type==CKEDITOR.NODE_ELEMENT&&(m=t), 'false'==m.getAttribute('contenteditable')))break a;
    m=void 0; 
}if(m)this.fake(m);else if(b&&b.plugins.tableselection&&b.plugins.tableselection.isSupportedEnvironment(b)&&h(a)&&!r&&!a[0]._getTableElement({table:1}).hasAttribute('data-cke-tableselection-ignored'))f.call(this, a);else{
 if(v){
 t=CKEDITOR.dom.walker.whitespaces(!0);m=/\ufeff|\u00a0/;x={table:1, tbody:1, tr:1};1<a.length&&(b=a[a.length-1], a[0].setEnd(b.endContainer, b.endOffset));b=a[0];a=b.collapsed;var u, w, p;if((c=b.getEnclosedNode())&&c.type==CKEDITOR.NODE_ELEMENT&&c.getName()in E&&(!c.is('a')||
    !c.getText()))try{
 p=c.$.createControlRange();p.addElement(c.$);p.select();return; 
}catch(z){}if(b.startContainer.type==CKEDITOR.NODE_ELEMENT&&b.startContainer.getName()in x||b.endContainer.type==CKEDITOR.NODE_ELEMENT&&b.endContainer.getName()in x)b.shrink(CKEDITOR.NODE_ELEMENT, !0), a=b.collapsed;p=b.createBookmark();x=p.startNode;a||(l=p.endNode);p=b.document.$.body.createTextRange();p.moveToElementText(x.$);p.moveStart('character', 1);l?(m=b.document.$.body.createTextRange(), m.moveToElementText(l.$),
    p.setEndPoint('EndToEnd', m), p.moveEnd('character', -1)):(u=x.getNext(t), w=x.hasAscendant('pre'), u=!(u&&u.getText&&u.getText().match(m))&&(w||!x.hasPrevious()||x.getPrevious().is&&x.getPrevious().is('br')), w=b.document.createElement('span'), w.setHtml('\x26#65279;'), w.insertBefore(x), u&&b.document.createText('﻿').insertBefore(x));b.setStartBefore(x);x.remove();a?(u?(p.moveStart('character', -1), p.select(), b.document.$.selection.clear()):p.select(), b.moveToPosition(w, CKEDITOR.POSITION_BEFORE_START), w.remove()):
    (b.setEndBefore(l), l.remove(), p.select()); 
}else{
 l=this.getNative();if(!l)return;this.removeAllRanges();for(p=0;p<a.length;p++){
 if(p<a.length-1&&(u=a[p], w=a[p+1], m=u.clone(), m.setStart(u.endContainer, u.endOffset), m.setEnd(w.startContainer, w.startOffset), !m.collapsed&&(m.shrink(CKEDITOR.NODE_ELEMENT, !0), b=m.getCommonAncestor(), m=m.getEnclosedNode(), b.isReadOnly()||m&&m.isReadOnly()))){
 w.setStart(u.startContainer, u.startOffset);a.splice(p--, 1);continue; 
}b=a[p];w=this.document.$.createRange();b.collapsed&&
    CKEDITOR.env.webkit&&d(b)&&(m=e(this.root), b.insertNode(m), (u=m.getNext())&&!m.getPrevious()&&u.type==CKEDITOR.NODE_ELEMENT&&'br'==u.getName()?(n(this.root), b.moveToPosition(u, CKEDITOR.POSITION_BEFORE_START)):b.moveToPosition(m, CKEDITOR.POSITION_AFTER_END));w.setStart(b.startContainer.$, b.startOffset);try{
 w.setEnd(b.endContainer.$, b.endOffset); 
}catch(q){
 if(0<=q.toString().indexOf('NS_ERROR_ILLEGAL_VALUE'))b.collapse(1), w.setEnd(b.endContainer.$, b.endOffset);else throw q; 
}l.addRange(w); 
} 
}this.reset();
    this.root.fire('selectionchange'); 
} 
} 
}, fake:function(a, b){
 const e=this.root.editor;void 0===b&&a.hasAttribute('aria-label')&&(b=a.getAttribute('aria-label'));this.reset();x(e, b);const d=this._.cache, f=new CKEDITOR.dom.range(this.root);f.setStartBefore(a);f.setEndAfter(a);d.ranges=new CKEDITOR.dom.rangeList(f);d.selectedElement=d.startElement=a;d.type=CKEDITOR.SELECTION_ELEMENT;d.selectedText=d.nativeSel=null;this.isFake=1;this.rev=w++;e._.fakeSelection=this;this.root.fire('selectionchange'); 
}, isHidden:function(){
 let a=
    this.getCommonAncestor();a&&a.type==CKEDITOR.NODE_TEXT&&(a=a.getParent());return!(!a||!a.data('cke-hidden-sel')); 
}, isInTable:function(a){
 return h(this.getRanges(), a); 
}, isCollapsed:function(){
 const a=this.getRanges();return 1===a.length&&a[0].collapsed; 
}, createBookmarks:function(a){
 a=this.getRanges().createBookmarks(a);this.isFake&&(a.isFake=1);return a; 
}, createBookmarks2:function(a){
 a=this.getRanges().createBookmarks2(a);this.isFake&&(a.isFake=1);return a; 
}, selectBookmarks:function(a){
 for(var b=[], e, d=0;d<
    a.length;d++){
 const f=new CKEDITOR.dom.range(this.root);f.moveToBookmark(a[d]);b.push(f); 
}a.isFake&&(e=h(b)?b[0]._getTableElement():b[0].getEnclosedNode(), e&&e.type==CKEDITOR.NODE_ELEMENT||(CKEDITOR.warn('selection-not-fake'), a.isFake=0));a.isFake&&!h(b)?this.fake(e):this.selectRanges(b);return this; 
}, getCommonAncestor:function(){
 const a=this.getRanges();return a.length?a[0].startContainer.getCommonAncestor(a[a.length-1].endContainer):null; 
}, scrollIntoView:function(){
 this.getType()!=CKEDITOR.SELECTION_NONE&&
    this.getRanges()[0].scrollIntoView(); 
}, removeAllRanges:function(){
 if(this.getType()!=CKEDITOR.SELECTION_NONE){
 const a=this.getNative();try{
 a&&a[v?'empty':'removeAllRanges'](); 
}catch(b){}this.reset(); 
} 
}}; 
}(), 'use strict', CKEDITOR.STYLE_BLOCK=1, CKEDITOR.STYLE_INLINE=2, CKEDITOR.STYLE_OBJECT=3, function(){
 function c(a, b){
 for(var e, d;(a=a.getParent())&&!a.equals(b);)if(a.getAttribute('data-nostyle'))e=a;else if(!d){
 const f=a.getAttribute('contentEditable');'false'==f?e=a:'true'==f&&(d=1); 
}return e; 
}function h(a,
    b, e, d){
 return(a.getPosition(b)|d)==d&&(!e.childRule||e.childRule(a)); 
}function g(a){
 let b=a.document;if(a.collapsed)b=w(this, b), a.insertNode(b), a.moveToPosition(b, CKEDITOR.POSITION_BEFORE_END);else{
 var e=this.element, d=this._.definition, k, l=d.ignoreReadonly, n=l||d.includeReadonly;null==n&&(n=a.root.getCustomData('cke_includeReadonly'));let m=CKEDITOR.dtd[e];m||(k=!0, m=CKEDITOR.dtd.span);a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);a.trim();let t=a.createBookmark(), x=t.startNode, u=t.endNode, v=x, r;if(!l){
 var z=
    a.getCommonAncestor(), l=c(x, z), z=c(u, z);l&&(v=l.getNextSourceNode(!0));z&&(u=z); 
}for(v.getPosition(u)==CKEDITOR.POSITION_FOLLOWING&&(v=0);v;){
 l=!1;if(v.equals(u))v=null, l=!0;else{
 var q=v.type==CKEDITOR.NODE_ELEMENT?v.getName():null, z=q&&'false'==v.getAttribute('contentEditable'), A=q&&-1!==CKEDITOR.tools.array.indexOf(CKEDITOR.style.unstylableElements, q), A=q&&(v.getAttribute('data-nostyle')||A);if(q&&v.data('cke-bookmark')||v.type===CKEDITOR.NODE_COMMENT){
 v=v.getNextSourceNode(!0);continue; 
}if(z&&n&&
    CKEDITOR.dtd.$block[q])for(var y=v, B=f(y), E=void 0, G=B.length, P=0, y=G&&new CKEDITOR.dom.range(y.getDocument());P<G;++P){
 var E=B[P], da=CKEDITOR.filter.instances[E.data('cke-filter')];if(da?da.check(this):1)y.selectNodeContents(E), g.call(this, y); 
}B=q?!m[q]||A?0:z&&!n?0:h(v, u, d, N):1;if(B)if(E=v.getParent(), B=d, G=e, P=k, !E||!(E.getDtd()||CKEDITOR.dtd.span)[G]&&!P||B.parentRule&&!B.parentRule(E))l=!0;else{
 if(r||q&&CKEDITOR.dtd.$removeEmpty[q]&&(v.getPosition(u)|N)!=N||(r=a.clone(), r.setStartBefore(v)), q=
    v.type, q==CKEDITOR.NODE_TEXT||z||q==CKEDITOR.NODE_ELEMENT&&!v.getChildCount()){
 for(var q=v, ga;(l=!q.getNext(K))&&(ga=q.getParent(), m[ga.getName()])&&h(ga, x, d, J);)q=ga;r.setEndAfter(q); 
} 
}else l=!0;v=v.getNextSourceNode(A||z); 
}if(l&&r&&!r.collapsed){
 for(var l=w(this, b), z=l.hasAttributes(), A=r.getCommonAncestor(), q={}, B={}, E={}, G={}, fa, C, D;l&&A;){
 if(A.getName()==e){
 for(fa in d.attributes)!G[fa]&&(D=A.getAttribute(C))&&(l.getAttribute(fa)==D?B[fa]=1:G[fa]=1);for(C in d.styles)!E[C]&&(D=A.getStyle(C))&&
    (l.getStyle(C)==D?q[C]=1:E[C]=1); 
}A=A.getParent(); 
}for(fa in B)l.removeAttribute(fa);for(C in q)l.removeStyle(C);z&&!l.hasAttributes()&&(l=null);l?(r.extractContents().appendTo(l), r.insertNode(l), p.call(this, l), l.mergeSiblings(), CKEDITOR.env.ie||l.$.normalize()):(l=new CKEDITOR.dom.element('span'), r.extractContents().appendTo(l), r.insertNode(l), p.call(this, l), l.remove(!0));r=null; 
} 
}a.moveToBookmark(t);a.shrink(CKEDITOR.SHRINK_TEXT);a.shrink(CKEDITOR.NODE_ELEMENT, !0); 
} 
}function a(a){
 function b(){
 for(var a=
    new CKEDITOR.dom.elementPath(d.getParent()), e=new CKEDITOR.dom.elementPath(n.getParent()), f=null, c=null, g=0;g<a.elements.length;g++){
 var h=a.elements[g];if(h==a.block||h==a.blockLimit)break;m.checkElementRemovable(h, !0)&&(f=h); 
}for(g=0;g<e.elements.length;g++){
 h=e.elements[g];if(h==e.block||h==e.blockLimit)break;m.checkElementRemovable(h, !0)&&(c=h); 
}c&&n.breakParent(c);f&&d.breakParent(f); 
}a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);var e=a.createBookmark(), d=e.startNode, f=this._.definition.alwaysRemoveElement;
    if(a.collapsed){
 for(var c=new CKEDITOR.dom.elementPath(d.getParent(), a.root), g, h=0, k;h<c.elements.length&&(k=c.elements[h])&&k!=c.block&&k!=c.blockLimit;h++)if(this.checkElementRemovable(k)){
 var l;!f&&a.collapsed&&(a.checkBoundaryOfElement(k, CKEDITOR.END)||(l=a.checkBoundaryOfElement(k, CKEDITOR.START)))?(g=k, g.match=l?'start':'end'):(k.mergeSiblings(), k.is(this.element)?x.call(this, k):q(k, r(this)[k.getName()])); 
}if(g){
 f=d;for(h=0;;h++){
 k=c.elements[h];if(k.equals(g))break;else if(k.match)continue;
    else k=k.clone();k.append(f);f=k; 
}f['start'==g.match?'insertBefore':'insertAfter'](g); 
} 
}else{
 var n=e.endNode, m=this;b();for(c=d;!c.equals(n);)g=c.getNextSourceNode(), c.type==CKEDITOR.NODE_ELEMENT&&this.checkElementRemovable(c)&&(c.getName()==this.element?x.call(this, c):q(c, r(this)[c.getName()]), g.type==CKEDITOR.NODE_ELEMENT&&g.contains(d)&&(b(), g=d.getNext())), c=g; 
}a.moveToBookmark(e);a.shrink(CKEDITOR.NODE_ELEMENT, !0); 
}function f(a){
 const b=[];a.forEach(function(a){
 if('true'==a.getAttribute('contenteditable'))return b.push(a),
    !1; 
}, CKEDITOR.NODE_ELEMENT, !0);return b; 
}function m(a){
 const b=a.getEnclosedNode()||a.getCommonAncestor(!1, !0);(a=(new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1))&&!a.isReadOnly()&&u(a, this); 
}function k(a){
 var b=a.getCommonAncestor(!0, !0);if(a=(new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)){
 var b=this._.definition, e=b.attributes;if(e)for(const d in e)a.removeAttribute(d, e[d]);if(b.styles)for(const f in b.styles)b.styles.hasOwnProperty(f)&&a.removeStyle(f); 
} 
}function l(a){
 const b=
    a.createBookmark(!0), e=a.createIterator();e.enforceRealBlocks=!0;this._.enterMode&&(e.enlargeBr=this._.enterMode!=CKEDITOR.ENTER_BR);for(var f, c=a.document, g;f=e.getNextParagraph();)!f.isReadOnly()&&(e.activeFilter?e.activeFilter.check(this):1)&&(g=w(this, c, f), d(f, g));a.moveToBookmark(b); 
}function b(a){
 const b=a.createBookmark(1), e=a.createIterator();e.enforceRealBlocks=!0;e.enlargeBr=this._.enterMode!=CKEDITOR.ENTER_BR;for(var f, c;f=e.getNextParagraph();)this.checkElementRemovable(f)&&(f.is('pre')?
    ((c=this._.enterMode==CKEDITOR.ENTER_BR?null:a.document.createElement(this._.enterMode==CKEDITOR.ENTER_P?'p':'div'))&&f.copyAttributes(c), d(f, c)):x.call(this, f));a.moveToBookmark(b); 
}function d(a, b){
 var d=!b;d&&(b=a.getDocument().createElement('div'), a.copyAttributes(b));let f=b&&b.is('pre'), c=a.is('pre'), g=!f&&c;if(f&&!c){
 c=b;(g=a.getBogus())&&g.remove();g=a.getHtml();g=n(g, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, '');g=g.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, '$1');g=g.replace(/([ \t\n\r]+|&nbsp;)/g,
    ' ');g=g.replace(/<br\b[^>]*>/gi, '\n');if(CKEDITOR.env.ie){
 const h=a.getDocument().createElement('div');h.append(c);c.$.outerHTML=`\x3cpre\x3e${g}\x3c/pre\x3e`;c.copyAttributes(h.getFirst());c=h.getFirst().remove(); 
}else c.setHtml(g);b=c; 
}else g?b=t(d?[a.getHtml()]:e(a), b):a.moveChildren(b);b.replace(a);if(f){
 var d=b, k;(k=d.getPrevious(D))&&k.type==CKEDITOR.NODE_ELEMENT&&k.is('pre')&&(f=`${n(k.getHtml(), /\n$/, '')}\n\n${n(d.getHtml(), /^\n/, '')}`, CKEDITOR.env.ie?d.$.outerHTML=`\x3cpre\x3e${f}\x3c/pre\x3e`:
    d.setHtml(f), k.remove()); 
}else d&&v(b); 
}function e(a){
 const b=[];n(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function(a, b, e){
 return `${b}\x3c/pre\x3e${e}\x3cpre\x3e`; 
}).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function(a, e){
 b.push(e); 
});return b; 
}function n(a, b, e){
 let d='', f='';a=a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function(a, b, e){
 b&&(d=b);e&&(f=e);return''; 
});return d+a.replace(b, e)+f; 
}function t(a, b){
 let e;
    1<a.length&&(e=new CKEDITOR.dom.documentFragment(b.getDocument()));for(let d=0;d<a.length;d++){
 var f=a[d], f=f.replace(/(\r\n|\r)/g, '\n'), f=n(f, /^[ \t]*\n/, ''), f=n(f, /\n$/, ''), f=n(f, /^[ \t]+|[ \t]+$/g, function(a, b){
 return 1==a.length?'\x26nbsp;':b?` ${CKEDITOR.tools.repeat('\x26nbsp;', a.length-1)}`:`${CKEDITOR.tools.repeat('\x26nbsp;', a.length-1)} `; 
}), f=f.replace(/\n/g, '\x3cbr\x3e'), f=f.replace(/[ \t]{2,}/g, function(a){
 return `${CKEDITOR.tools.repeat('\x26nbsp;', a.length-1)} `; 
});if(e){
 const c=b.clone();c.setHtml(f);
    e.append(c); 
}else b.setHtml(f); 
}return e||b; 
}function x(a, b){
 var e=this._.definition, d=e.attributes, e=e.styles, f=r(this)[a.getName()], c=CKEDITOR.tools.isEmpty(d)&&CKEDITOR.tools.isEmpty(e), g;for(g in d)if('class'!=g&&!this._.definition.fullMatch||a.getAttribute(g)==y(g, d[g]))b&&'data-'==g.slice(0, 5)||(c=a.hasAttribute(g), a.removeAttribute(g));for(const h in e)this._.definition.fullMatch&&a.getStyle(h)!=y(h, e[h], !0)||(c=c||!!a.getStyle(h), a.removeStyle(h));q(a, f, C[a.getName()]);c&&(this._.definition.alwaysRemoveElement?
    v(a, 1):!CKEDITOR.dtd.$block[a.getName()]||this._.enterMode==CKEDITOR.ENTER_BR&&!a.hasAttributes()?v(a):a.renameNode(this._.enterMode==CKEDITOR.ENTER_P?'p':'div')); 
}function p(a){
 for(var b=r(this), e=a.getElementsByTag(this.element), d, f=e.count();0<=--f;)d=e.getItem(f), d.isReadOnly()||x.call(this, d, !0);for(const c in b)if(c!=this.element)for(e=a.getElementsByTag(c), f=e.count()-1;0<=f;f--)d=e.getItem(f), d.isReadOnly()||q(d, b[c]); 
}function q(a, b, e){
 if(b=b&&b.attributes)for(let d=0;d<b.length;d++){
 var f=b[d][0],
    c;if(c=a.getAttribute(f)){
 const g=b[d][1];(null===g||g.test&&g.test(c)||'string'===typeof g&&c==g)&&a.removeAttribute(f); 
} 
}e||v(a); 
}function v(a, b){
 if(!a.hasAttributes()||b)if(CKEDITOR.dtd.$block[a.getName()]){
 var e=a.getPrevious(D), d=a.getNext(D);!e||e.type!=CKEDITOR.NODE_TEXT&&e.isBlockBoundary({br:1})||a.append('br', 1);!d||d.type!=CKEDITOR.NODE_TEXT&&d.isBlockBoundary({br:1})||a.append('br');a.remove(!0); 
}else e=a.getFirst(), d=a.getLast(), a.remove(!0), e&&(e.type==CKEDITOR.NODE_ELEMENT&&e.mergeSiblings(),
    d&&!e.equals(d)&&d.type==CKEDITOR.NODE_ELEMENT&&d.mergeSiblings()); 
}function w(a, b, e){
 let d;d=a.element;'*'==d&&(d='span');d=new CKEDITOR.dom.element(d, b);e&&e.copyAttributes(d);d=u(d, a);b.getCustomData('doc_processing_style')&&d.hasAttribute('id')?d.removeAttribute('id'):b.setCustomData('doc_processing_style', 1);return d; 
}function u(a, b){
 var e=b._.definition, d=e.attributes, e=CKEDITOR.style.getStyleText(e);if(d)for(const f in d)a.setAttribute(f, d[f]);e&&a.setAttribute('style', e);a.getDocument().removeCustomData('doc_processing_style');
    return a; 
}function A(a, b){
 for(const e in a)a[e]=a[e].replace(I, function(a, e){
 return b[e]; 
}); 
}function r(a){
 if(a._.overrides)return a._.overrides;let b=a._.overrides={}, e=a._.definition.overrides;if(e){
 CKEDITOR.tools.isArray(e)||(e=[e]);for(let d=0;d<e.length;d++){
 var f=e[d], c, g;'string'===typeof f?c=f.toLowerCase():(c=f.element?f.element.toLowerCase():a.element, g=f.attributes);f=b[c]||(b[c]={});if(g){
 var f=f.attributes=f.attributes||[], h;for(h in g)f.push([h.toLowerCase(), g[h]]); 
} 
} 
}return b; 
}function y(a,
    b, e){
 const d=new CKEDITOR.dom.element('span');d[e?'setStyle':'setAttribute'](a, b);return d[e?'getStyle':'getAttribute'](a); 
}function z(a, b){
 function e(a, b){
 return'font-family'==b.toLowerCase()?a.replace(/["']/g, ''):a; 
}'string'===typeof a&&(a=CKEDITOR.tools.parseCssText(a));'string'===typeof b&&(b=CKEDITOR.tools.parseCssText(b, !0));for(const d in a)if(!(d in b)||e(b[d], d)!=e(a[d], d)&&'inherit'!=a[d]&&'inherit'!=b[d])return!1;return!0; 
}function B(a, b, e){
 const d=a.getRanges();b=b?this.removeFromRange:this.applyToRange;
    for(var f, c=d.createIterator();f=c.getNextRange();)b.call(this, f, e);a.selectRanges(d); 
}var C={address:1, div:1, h1:1, h2:1, h3:1, h4:1, h5:1, h6:1, p:1, pre:1, section:1, header:1, footer:1, nav:1, article:1, aside:1, figure:1, dialog:1, hgroup:1, time:1, meter:1, menu:1, command:1, keygen:1, output:1, progress:1, details:1, datagrid:1, datalist:1}, E={a:1, blockquote:1, embed:1, hr:1, img:1, li:1, object:1, ol:1, table:1, td:1, tr:1, th:1, ul:1, dl:1, dt:1, dd:1, form:1, audio:1, video:1}, F=/\s*(?:;\s*|$)/, I=/#\((.+?)\)/g, K=CKEDITOR.dom.walker.bookmark(0,
    1), D=CKEDITOR.dom.walker.whitespaces(1);CKEDITOR.style=function(a, b){
 if('string'===typeof a.type)return new CKEDITOR.style.customHandlers[a.type](a);let e=a.attributes;e&&e.style&&(a.styles=CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(e.style)), delete e.style);b&&(a=CKEDITOR.tools.clone(a), A(a.attributes, b), A(a.styles, b));e=this.element=a.element?'string'===typeof a.element?a.element.toLowerCase():a.element:'*';this.type=a.type||(C[e]?CKEDITOR.STYLE_BLOCK:E[e]?CKEDITOR.STYLE_OBJECT:
    CKEDITOR.STYLE_INLINE);'object'===typeof this.element&&(this.type=CKEDITOR.STYLE_OBJECT);this._={definition:a}; 
};CKEDITOR.style.prototype={apply:function(a){
 if(a instanceof CKEDITOR.dom.document)return B.call(this, a.getSelection());if(this.checkApplicable(a.elementPath(), a)){
 const b=this._.enterMode;b||(this._.enterMode=a.activeEnterMode);B.call(this, a.getSelection(), 0, a);this._.enterMode=b; 
} 
}, remove:function(a){
 if(a instanceof CKEDITOR.dom.document)return B.call(this, a.getSelection(), 1);if(this.checkApplicable(a.elementPath(),
    a)){
 const b=this._.enterMode;b||(this._.enterMode=a.activeEnterMode);B.call(this, a.getSelection(), 1, a);this._.enterMode=b; 
} 
}, applyToRange:function(a){
 this.applyToRange=this.type==CKEDITOR.STYLE_INLINE?g:this.type==CKEDITOR.STYLE_BLOCK?l:this.type==CKEDITOR.STYLE_OBJECT?m:null;return this.applyToRange(a); 
}, removeFromRange:function(e){
 this.removeFromRange=this.type==CKEDITOR.STYLE_INLINE?a:this.type==CKEDITOR.STYLE_BLOCK?b:this.type==CKEDITOR.STYLE_OBJECT?k:null;return this.removeFromRange(e); 
}, applyToObject:function(a){
 u(a,
    this); 
}, checkActive:function(a, b){
 switch(this.type){
 case CKEDITOR.STYLE_BLOCK:return this.checkElementRemovable(a.block||a.blockLimit, !0, b);case CKEDITOR.STYLE_OBJECT:case CKEDITOR.STYLE_INLINE:for(var e=a.elements, d=0, f;d<e.length;d++)if(f=e[d], this.type!=CKEDITOR.STYLE_INLINE||f!=a.block&&f!=a.blockLimit){
 if(this.type==CKEDITOR.STYLE_OBJECT){
 const c=f.getName();if(!('string'===typeof this.element?c==this.element:c in this.element))continue; 
}if(this.checkElementRemovable(f, !0, b))return!0; 
} 
}return!1; 
}, checkApplicable:function(a,
    b, e){
 b&&b instanceof CKEDITOR.filter&&(e=b);if(e&&!e.check(this))return!1;switch(this.type){
 case CKEDITOR.STYLE_OBJECT:return!!a.contains(this.element);case CKEDITOR.STYLE_BLOCK:return!!a.blockLimit.getDtd()[this.element]; 
}return!0; 
}, checkElementMatch:function(a, b){
 let e=this._.definition;if(!a||!e.ignoreReadonly&&a.isReadOnly())return!1;var d=a.getName();if('string'===typeof this.element?d==this.element:d in this.element){
 if(!b&&!a.hasAttributes())return!0;if(d=e._AC)e=d;else{
 var d={}, f=0, c=e.attributes;
    if(c)for(var g in c)f++, d[g]=c[g];if(g=CKEDITOR.style.getStyleText(e))d.style||f++, d.style=g;d._length=f;e=e._AC=d; 
}if(e._length){
 for(const h in e)if('_length'!=h)if(d=a.getAttribute(h)||'', 'style'==h?z(e[h], d):e[h]==d){
 if(!b)return!0; 
}else if(b)return!1;if(b)return!0; 
}else return!0; 
}return!1; 
}, checkElementRemovable:function(a, b, e){
 if(this.checkElementMatch(a, b, e))return!0;if(b=r(this)[a.getName()]){
 let d;if(!(b=b.attributes))return!0;for(e=0;e<b.length;e++)if(d=b[e][0], d=a.getAttribute(d)){
 const f=b[e][1];
    if(null===f)return!0;if('string'===typeof f){
 if(d==f)return!0; 
}else if(f.test(d))return!0; 
} 
}return!1; 
}, buildPreview:function(a){
 var b=this._.definition, e=[], d=b.element;'bdo'==d&&(d='span');var e=['\x3c', d], f=b.attributes;if(f)for(const c in f)e.push(' ', c, '\x3d"', f[c], '"');(f=CKEDITOR.style.getStyleText(b))&&e.push(' style\x3d"', f, '"');e.push('\x3e', a||b.name, '\x3c/', d, '\x3e');return e.join(''); 
}, getDefinition:function(){
 return this._.definition; 
}};CKEDITOR.style.getStyleText=function(a){
 var b=a._ST;if(b)return b;
    var b=a.styles, e=a.attributes&&a.attributes.style||'', d='';e.length&&(e=e.replace(F, ';'));for(const f in b){
 const c=b[f], g=(`${f}:${c}`).replace(F, ';');'inherit'==c?d+=g:e+=g; 
}e.length&&(e=CKEDITOR.tools.normalizeCssText(e, !0));return a._ST=e+d; 
};CKEDITOR.style.customHandlers={};CKEDITOR.style.unstylableElements=[];CKEDITOR.style.addCustomHandler=function(a){
 const b=function(a){
 this._={definition:a};this.setup&&this.setup(a); 
};b.prototype=CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype),
    {assignedTo:CKEDITOR.STYLE_OBJECT}, a, !0);return this.customHandlers[a.type]=b; 
};var N=CKEDITOR.POSITION_PRECEDING|CKEDITOR.POSITION_IDENTICAL|CKEDITOR.POSITION_IS_CONTAINED, J=CKEDITOR.POSITION_FOLLOWING|CKEDITOR.POSITION_IDENTICAL|CKEDITOR.POSITION_IS_CONTAINED; 
}(), CKEDITOR.styleCommand=function(c, h){
 this.requiredContent=this.allowedContent=this.style=c;CKEDITOR.tools.extend(this, h, !0); 
}, CKEDITOR.styleCommand.prototype.exec=function(c){
 c.focus();this.state==CKEDITOR.TRISTATE_OFF?c.applyStyle(this.style):
    this.state==CKEDITOR.TRISTATE_ON&&c.removeStyle(this.style); 
}, CKEDITOR.stylesSet=new CKEDITOR.resourceManager('', 'stylesSet'), CKEDITOR.addStylesSet=CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet), CKEDITOR.loadStylesSet=function(c, h, g){
 CKEDITOR.stylesSet.addExternal(c, h, '');CKEDITOR.stylesSet.load(c, g); 
}, CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {attachStyleStateChange:function(c, h){
 let g=this._.styleStateChangeCallbacks;g||(g=this._.styleStateChangeCallbacks=[], this.on('selectionChange',
    function(a){
 for(let f=0;f<g.length;f++){
 const c=g[f], h=c.style.checkActive(a.data.path, this)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF;c.fn.call(this, h); 
} 
}));g.push({style:c, fn:h}); 
}, applyStyle:function(c){
 c.apply(this); 
}, removeStyle:function(c){
 c.remove(this); 
}, getStylesSet:function(c){
 if(this._.stylesDefinitions)c(this._.stylesDefinitions);else{
 var h=this, g=h.config.stylesCombo_stylesSet||h.config.stylesSet;if(!1===g)c(null);else if(g instanceof Array)h._.stylesDefinitions=g, c(g);else{
 g||(g='default');
    var g=g.split(':'), a=g[0];CKEDITOR.stylesSet.addExternal(a, g[1]?g.slice(1).join(':'):CKEDITOR.getUrl('styles.js'), '');CKEDITOR.stylesSet.load(a, function(f){
 h._.stylesDefinitions=f[a];c(h._.stylesDefinitions); 
}); 
} 
} 
}}), function(){
 if(window.Promise)CKEDITOR.tools.promise=Promise;else{
 const c=CKEDITOR.getUrl('vendor/promise.js');if('function'===typeof window.define&&window.define.amd&&'function'===typeof window.require)return window.require([c], function(c){
 CKEDITOR.tools.promise=c; 
});CKEDITOR.scriptLoader.load(c,
    function(h){
 if(!h)return CKEDITOR.error('no-vendor-lib', {path:c});if('undefined'!==typeof window.ES6Promise)return CKEDITOR.tools.promise=ES6Promise; 
}); 
} 
}(), function(){
 function c(a, f, c){
 a.once('selectionCheck', function(a){
 if(!h){
 const l=a.data.getRanges()[0];c.equals(l)?a.cancel():f.equals(l)&&(g=!0); 
} 
}, null, null, -1); 
}var h=!0, g=!1;CKEDITOR.dom.selection.setupEditorOptimization=function(a){
 a.on('selectionCheck', function(a){
 a.data&&!g&&a.data.optimizeInElementEnds();g=!1; 
});a.on('contentDom', function(){
 const f=
    a.editable();f&&(f.attachListener(f, 'keydown', function(a){
 this._.shiftPressed=a.data.$.shiftKey; 
}, this), f.attachListener(f, 'keyup', function(a){
 this._.shiftPressed=a.data.$.shiftKey; 
}, this)); 
}); 
};CKEDITOR.dom.selection.prototype.optimizeInElementEnds=function(){
 let a=this.getRanges()[0], f=this.root.editor, g;if(this.root.editor._.shiftPressed||this.isFake||a.isCollapsed||a.startContainer.equals(a.endContainer))g=!1;else if(0===a.endOffset)g=!0;else{
 g=a.startContainer.type===CKEDITOR.NODE_TEXT;const k=a.endContainer.type===
    CKEDITOR.NODE_TEXT, l=g?a.startContainer.getLength():a.startContainer.getChildCount();g=a.startOffset===l||g^k; 
}g&&(g=a.clone(), a.shrink(CKEDITOR.SHRINK_TEXT, !1, {skipBogus:!CKEDITOR.env.webkit}), h=!1, c(f, a, g), a.select(), h=!0); 
}; 
}(), CKEDITOR.dom.comment=function(c, h){
 'string'===typeof c&&(c=(h?h.$:document).createComment(c));CKEDITOR.dom.domObject.call(this, c); 
}, CKEDITOR.dom.comment.prototype=new CKEDITOR.dom.node, CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, {type:CKEDITOR.NODE_COMMENT, getOuterHtml:function(){
 return`\x3c!--${
    this.$.nodeValue}--\x3e`; 
}}), 'use strict', function(){
 let c={}, h={}, g;for(g in CKEDITOR.dtd.$blockLimit)g in CKEDITOR.dtd.$list||(c[g]=1);for(g in CKEDITOR.dtd.$block)g in CKEDITOR.dtd.$blockLimit||g in CKEDITOR.dtd.$empty||(h[g]=1);CKEDITOR.dom.elementPath=function(a, f){
 let g=null, k=null, l=[], b=a, d;f=f||a.getDocument().getBody();b||(b=f);do if(b.type==CKEDITOR.NODE_ELEMENT){
 l.push(b);if(!this.lastElement&&(this.lastElement=b, b.is(CKEDITOR.dtd.$object)||'false'==b.getAttribute('contenteditable')))continue;
    if(b.equals(f))break;if(!k&&(d=b.getName(), 'true'==b.getAttribute('contenteditable')?k=b:!g&&h[d]&&(g=b), c[d])){
 if(d=!g&&'div'==d){
 a:{
 d=b.getChildren();for(let e=0, n=d.count();e<n;e++){
 const t=d.getItem(e);if(t.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$block[t.getName()]){
 d=!0;break a; 
} 
}d=!1; 
}d=!d; 
}d?g=b:k=b; 
} 
}while(b=b.getParent());k||(k=f);this.block=g;this.blockLimit=k;this.root=f;this.elements=l; 
}; 
}(), CKEDITOR.dom.elementPath.prototype={compare:function(c){
 const h=this.elements;c=c&&c.elements;if(!c||
    h.length!=c.length)return!1;for(let g=0;g<h.length;g++)if(!h[g].equals(c[g]))return!1;return!0; 
}, contains:function(c, h, g){
 let a=0, f;'string'===typeof c&&(f=function(a){
 return a.getName()==c; 
});c instanceof CKEDITOR.dom.element?f=function(a){
 return a.equals(c); 
}:CKEDITOR.tools.isArray(c)?f=function(a){
 return-1<CKEDITOR.tools.indexOf(c, a.getName()); 
}:'function'===typeof c?f=c:'object'===typeof c&&(f=function(a){
 return a.getName()in c; 
});let m=this.elements, k=m.length;h&&(g?a+=1:--k);g&&(m=Array.prototype.slice.call(m,
    0), m.reverse());for(;a<k;a++)if(f(m[a]))return m[a];return null; 
}, isContextFor:function(c){
 let h;return c in CKEDITOR.dtd.$block?(h=this.contains(CKEDITOR.dtd.$intermediate)||this.root.equals(this.block)&&this.block||this.blockLimit, !!h.getDtd()[c]):!0; 
}, direction:function(){
 return(this.block||this.blockLimit||this.root).getDirection(1); 
}}, CKEDITOR.dom.text=function(c, h){
 'string'===typeof c&&(c=(h?h.$:document).createTextNode(c));this.$=c; 
}, CKEDITOR.dom.text.prototype=new CKEDITOR.dom.node, CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype,
    {type:CKEDITOR.NODE_TEXT, getLength:function(){
 return this.$.nodeValue.length; 
}, getText:function(){
 return this.$.nodeValue; 
}, setText:function(c){
 this.$.nodeValue=c; 
}, isEmpty:function(c){
 let h=this.getText();c&&(h=CKEDITOR.tools.trim(h));return!h||h===CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE; 
}, split:function(c){
 let h=this.$.parentNode, g=h.childNodes.length, a=this.getLength(), f=this.getDocument(), m=new CKEDITOR.dom.text(this.$.splitText(c), f);h.childNodes.length==g&&(c>=a?(m=f.createText(''), m.insertAfter(this)):
    (c=f.createText(''), c.insertAfter(m), c.remove()));return m; 
}, substring:function(c, h){
 return'number'!==typeof h?this.$.nodeValue.substr(c):this.$.nodeValue.substring(c, h); 
}}), function(){
 function c(c, a, f){
 let h=c.serializable, k=a[f?'endContainer':'startContainer'], l=f?'endOffset':'startOffset', b=h?a.document.getById(c.startNode):c.startNode;c=h?a.document.getById(c.endNode):c.endNode;k.equals(b.getPrevious())?(a.startOffset=a.startOffset-k.getLength()-c.getPrevious().getLength(), k=c.getNext()):k.equals(c.getPrevious())&&
    (a.startOffset-=k.getLength(), k=c.getNext());k.equals(b.getParent())&&a[l]++;k.equals(c.getParent())&&a[l]++;a[f?'endContainer':'startContainer']=k;return a; 
}CKEDITOR.dom.rangeList=function(c){
 if(c instanceof CKEDITOR.dom.rangeList)return c;c?c instanceof CKEDITOR.dom.range&&(c=[c]):c=[];return CKEDITOR.tools.extend(c, h); 
};var h={createIterator:function(){
 let c=this, a=CKEDITOR.dom.walker.bookmark(), f=[], h;return{getNextRange:function(k){
 h=void 0===h?0:h+1;const l=c[h];if(l&&1<c.length){
 if(!h)for(var b=
    c.length-1;0<=b;b--)f.unshift(c[b].createBookmark(!0));if(k)for(var d=0;c[h+d+1];){
 let e=l.document;k=0;b=e.getById(f[d].endNode);for(e=e.getById(f[d+1].startNode);;){
 b=b.getNextSourceNode(!1);if(e.equals(b))k=1;else if(a(b)||b.type==CKEDITOR.NODE_ELEMENT&&b.isBlockBoundary())continue;break; 
}if(!k)break;d++; 
}for(l.moveToBookmark(f.shift());d--;)b=c[++h], b.moveToBookmark(f.shift()), l.setEnd(b.endContainer, b.endOffset); 
}return l; 
}}; 
}, createBookmarks:function(g){
 for(var a=[], f, h=0;h<this.length;h++){
 a.push(f=
    this[h].createBookmark(g, !0));for(let k=h+1;k<this.length;k++)this[k]=c(f, this[k]), this[k]=c(f, this[k], !0); 
}return a; 
}, createBookmarks2:function(c){
 for(var a=[], f=0;f<this.length;f++)a.push(this[f].createBookmark2(c));return a; 
}, moveToBookmarks:function(c){
 for(let a=0;a<this.length;a++)this[a].moveToBookmark(c[a]); 
}}; 
}(), function(){
 function c(){
 return CKEDITOR.getUrl(CKEDITOR.skinName.split(',')[1]||`skins/${CKEDITOR.skinName.split(',')[0]}/`); 
}function h(a){
 var b=CKEDITOR.skin[`ua_${a}`], f=CKEDITOR.env;
    if(b)for(var b=b.split(',').sort(function(a, b){
 return a>b?-1:1; 
}), g=0, h;g<b.length;g++)if(h=b[g], f.ie&&(h.replace(/^ie/, '')==f.version||f.quirks&&'iequirks'==h)&&(h='ie'), f[h]){
 a+=`_${b[g]}`;break; 
}return CKEDITOR.getUrl(`${c()+a}.css`); 
}function g(a, b){
 m[a]||(CKEDITOR.document.appendStyleSheet(h(a)), m[a]=1);b&&b(); 
}function a(a){
 let b=a.getById(k);b||(b=a.getHead().append('style'), b.setAttribute('id', k), b.setAttribute('type', 'text/css'));return b; 
}function f(a, b, f){
 let c, g, h;if(CKEDITOR.env.webkit)for(b=
    b.split('}').slice(0, -1), g=0;g<b.length;g++)b[g]=b[g].split('{');for(let k=0;k<a.length;k++)if(CKEDITOR.env.webkit)for(g=0;g<b.length;g++){
 h=b[g][1];for(c=0;c<f.length;c++)h=h.replace(f[c][0], f[c][1]);a[k].$.sheet.addRule(b[g][0], h); 
}else{
 h=b;for(c=0;c<f.length;c++)h=h.replace(f[c][0], f[c][1]);CKEDITOR.env.ie&&11>CKEDITOR.env.version?a[k].$.styleSheet.cssText+=h:a[k].$.innerHTML+=h; 
} 
}var m={};CKEDITOR.skin={path:c, loadPart:function(a, b){
 CKEDITOR.skin.name!=CKEDITOR.skinName.split(',')[0]?CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(`${c()
    }skin.js`), function(){
 g(a, b); 
}):g(a, b); 
}, getPath:function(a){
 return CKEDITOR.getUrl(h(a)); 
}, icons:{}, addIcon:function(a, b, f, c){
 a=a.toLowerCase();this.icons[a]||(this.icons[a]={path:b, offset:f||0, bgsize:c||'16px'}); 
}, getIconStyle:function(a, b, f, c, g){
 let h;a&&(a=a.toLowerCase(), b&&(h=this.icons[`${a}-rtl`]), h||(h=this.icons[a]));a=f||h&&h.path||'';c=c||h&&h.offset;g=g||h&&h.bgsize||'16px';a&&(a=a.replace(/'/g, '\\\''));return a&&`background-image:url('${CKEDITOR.getUrl(a)}');background-position:0 ${c}px;background-size:${
    g};`; 
}};CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {getUiColor:function(){
 return this.uiColor; 
}, setUiColor:function(d){
 const e=a(CKEDITOR.document);return(this.setUiColor=function(a){
 this.uiColor=a;let d=CKEDITOR.skin.chameleon, c='', g='';'function'===typeof d&&(c=d(this, 'editor'), g=d(this, 'panel'));a=[[b, a]];f([e], c, a);f(l, g, a); 
}).call(this, d); 
}});var k='cke_ui_color', l=[], b=/\$color/g;CKEDITOR.on('instanceLoaded', function(d){
 if(!CKEDITOR.env.ie||!CKEDITOR.env.quirks){
 const e=d.editor;d=function(d){
 d=
    (d.data[0]||d.data).element.getElementsByTag('iframe').getItem(0).getFrameDocument();if(!d.getById('cke_ui_color')){
 const c=a(d);l.push(c);e.on('destroy', function(){
 l=CKEDITOR.tools.array.filter(l, function(a){
 return c!==a; 
}); 
});(d=e.getUiColor())&&f([c], CKEDITOR.skin.chameleon(e, 'panel'), [[b, d]]); 
} 
};e.on('panelShow', d);e.on('menuShow', d);e.config.uiColor&&e.setUiColor(e.config.uiColor); 
} 
}); 
}(), function(){
 if(CKEDITOR.env.webkit)CKEDITOR.env.hc=!1;else{
 var c=CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"\x3e\x3c/div\x3e',
    CKEDITOR.document);c.appendTo(CKEDITOR.document.getHead());try{
 var h=c.getComputedStyle('border-top-color'), g=c.getComputedStyle('border-right-color');CKEDITOR.env.hc=!(!h||h!=g); 
}catch(a){
 CKEDITOR.env.hc=!1; 
}c.remove(); 
}CKEDITOR.env.hc&&(CKEDITOR.env.cssClass+=' cke_hc');CKEDITOR.document.appendStyleText('.cke{visibility:hidden;}');CKEDITOR.status='loaded';CKEDITOR.fireOnce('loaded');if(c=CKEDITOR._.pending)for(delete CKEDITOR._.pending, h=0;h<c.length;h++)CKEDITOR.editor.prototype.constructor.apply(c[h][0],
    c[h][1]), CKEDITOR.add(c[h][0]); 
}(), CKEDITOR.skin.name='moono-lisa', CKEDITOR.skin.ua_editor='ie,iequirks,ie8,gecko', CKEDITOR.skin.ua_dialog='ie,iequirks,ie8', CKEDITOR.skin.chameleon=function(){
 const c=function(){
 return function(c, a){
 for(var f=c.match(/[^#]./g), h=0;3>h;h++){
 var k=h, l;l=parseInt(f[h], 16);l=(`0${(0>a?0|l*(1+a):0|l+(255-l)*a).toString(16)}`).slice(-2);f[k]=l; 
}return`#${f.join('')}`; 
}; 
}(), h={editor:new CKEDITOR.template('{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_bottom [background-color:{defaultBackground};border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [background-color:{defaultBackground};outline-color:{defaultBorder};] {id} .cke_dialog_tab [background-color:{dialogTab};border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [background-color:{lightBackground};] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} a.cke_button_off:hover,{id} a.cke_button_off:focus,{id} a.cke_button_off:active [background-color:{darkBackground};border-color:{toolbarElementsBorder};] {id} .cke_button_on [background-color:{ckeButtonOn};border-color:{toolbarElementsBorder};] {id} .cke_toolbar_separator,{id} .cke_toolgroup a.cke_button:last-child:after,{id} .cke_toolgroup a.cke_button.cke_button_disabled:hover:last-child:after [background-color: {toolbarElementsBorder};border-color: {toolbarElementsBorder};] {id} a.cke_combo_button:hover,{id} a.cke_combo_button:focus,{id} .cke_combo_on a.cke_combo_button [border-color:{toolbarElementsBorder};background-color:{darkBackground};] {id} .cke_combo:after [border-color:{toolbarElementsBorder};] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover,{id} a.cke_path_item:focus,{id} a.cke_path_item:active [background-color:{darkBackground};] {id}.cke_panel [border-color:{defaultBorder};] '),
    panel:new CKEDITOR.template('.cke_panel_grouptitle [background-color:{lightBackground};border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover,.cke_menubutton:focus,.cke_menubutton:active [background-color:{menubuttonHover};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menubutton_disabled:hover .cke_menubutton_icon,.cke_menubutton_disabled:focus .cke_menubutton_icon,.cke_menubutton_disabled:active .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ')};
    return function(g, a){
 var f=c(g.uiColor, .4), f={id:`.${g.id}`, defaultBorder:c(f, -.2), toolbarElementsBorder:c(f, -.25), defaultBackground:f, lightBackground:c(f, .8), darkBackground:c(f, -.15), ckeButtonOn:c(f, .4), ckeResizer:c(f, -.4), ckeColorauto:c(f, .8), dialogBody:c(f, .7), dialogTab:c(f, .65), dialogTabSelected:'#FFF', dialogTabSelectedBorder:'#FFF', elementsPathColor:c(f, -.6), menubuttonHover:c(f, .1), menubuttonIcon:c(f, .5), menubuttonIconHover:c(f, .3)};return h[a].output(f).replace(/\[/g, '{').replace(/\]/g, '}'); 
}; 
}(),
    CKEDITOR.plugins.add('dialogui', {onLoad:function(){
 const c=function(a){
 this._||(this._={});this._['default']=this._.initValue=a['default']||'';this._.required=a.required||!1;for(var d=[this._], e=1;e<arguments.length;e++)d.push(arguments[e]);d.push(!0);CKEDITOR.tools.extend.apply(CKEDITOR.tools, d);return this._; 
}, h={build:function(a, d, e){
 return new CKEDITOR.ui.dialog.textInput(a, d, e); 
}}, g={build:function(a, d, e){
 return new CKEDITOR.ui.dialog[d.type](a, d, e); 
}}, a={isChanged:function(){
 return this.getValue()!=
    this.getInitValue(); 
}, reset:function(a){
 this.setValue(this.getInitValue(), a); 
}, setInitValue:function(){
 this._.initValue=this.getValue(); 
}, resetInitValue:function(){
 this._.initValue=this._['default']; 
}, getInitValue:function(){
 return this._.initValue; 
}}, f=CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {onChange:function(a, d){
 this._.domOnChangeRegistered||(a.on('load', function(){
 this.getInputElement().on('change', function(){
 a.parts.dialog.isVisible()&&this.fire('change', {value:this.getValue()}); 
},
    this); 
}, this), this._.domOnChangeRegistered=!0);this.on('change', d); 
}}, !0), m=/^on([A-Z]\w+)/, k=function(a){
 for(const d in a)(m.test(d)||'title'==d||'type'==d)&&delete a[d];return a; 
}, l=function(a){
 a=a.data.getKeystroke();a==CKEDITOR.SHIFT+CKEDITOR.ALT+36?this.setDirectionMarker('ltr'):a==CKEDITOR.SHIFT+CKEDITOR.ALT+35&&this.setDirectionMarker('rtl'); 
};CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {labeledElement:function(a, d, e, f){
 if(!(4>arguments.length)){
 const g=c.call(this, d);g.labelId=`${CKEDITOR.tools.getNextId()
    }_label`;this._.children=[];const h={role:d.role||'presentation'};d.includeLabel&&(h['aria-labelledby']=g.labelId);CKEDITOR.ui.dialog.uiElement.call(this, a, d, e, 'div', null, h, function(){
 let e=[], c=d.required?' cke_required':'';'horizontal'!=d.labelLayout?e.push(`\x3clabel class\x3d"cke_dialog_ui_labeled_label${c}" `, ` id\x3d"${g.labelId}"`, g.inputId?` for\x3d"${g.inputId}"`:'', `${d.labelStyle?` style\x3d"${d.labelStyle}"`:''}\x3e`, d.label, '\x3c/label\x3e', '\x3cdiv class\x3d"cke_dialog_ui_labeled_content"',
    d.controlStyle?` style\x3d"${d.controlStyle}"`:'', ' role\x3d"presentation"\x3e', f.call(this, a, d), '\x3c/div\x3e'):(c={type:'hbox', widths:d.widths, padding:0, children:[{type:'html', html:`\x3clabel class\x3d"cke_dialog_ui_labeled_label${c}" id\x3d"${g.labelId}" for\x3d"${g.inputId}"${d.labelStyle?` style\x3d"${d.labelStyle}"`:''}\x3e${CKEDITOR.tools.htmlEncode(d.label)}\x3c/label\x3e`}, {type:'html', html:`\x3cspan class\x3d"cke_dialog_ui_labeled_content"${d.controlStyle?` style\x3d"${d.controlStyle
    }"`:''}\x3e${f.call(this, a, d)}\x3c/span\x3e`}]}, CKEDITOR.dialog._.uiElementBuilders.hbox.build(a, c, e));return e.join(''); 
}); 
} 
}, textInput:function(a, d, e){
 if(!(3>arguments.length)){
 c.call(this, d);const f=this._.inputId=`${CKEDITOR.tools.getNextId()}_textInput`, g={'class':`cke_dialog_ui_input_${d.type}`, id:f, type:d.type};d.validate&&(this.validate=d.validate);d.maxLength&&(g.maxlength=d.maxLength);d.size&&(g.size=d.size);d.inputStyle&&(g.style=d.inputStyle);let h=this, k=!1;a.on('load', function(){
 h.getInputElement().on('keydown',
    function(a){
 13==a.data.getKeystroke()&&(k=!0); 
});h.getInputElement().on('keyup', function(e){
 13==e.data.getKeystroke()&&k&&(a.getButton('ok')&&setTimeout(function(){
 a.getButton('ok').click(); 
}, 0), k=!1);h.bidi&&l.call(h, e); 
}, null, null, 1E3); 
});CKEDITOR.ui.dialog.labeledElement.call(this, a, d, e, function(){
 const a=['\x3cdiv class\x3d"cke_dialog_ui_input_', d.type, '" role\x3d"presentation"'];d.width&&a.push(`style\x3d"width:${d.width}" `);a.push('\x3e\x3cinput ');g['aria-labelledby']=this._.labelId;this._.required&&
    (g['aria-required']=this._.required);for(const b in g)a.push(`${b}\x3d"${g[b]}" `);a.push(' /\x3e\x3c/div\x3e');return a.join(''); 
}); 
} 
}, textarea:function(a, d, e){
 if(!(3>arguments.length)){
 c.call(this, d);const f=this, g=this._.inputId=`${CKEDITOR.tools.getNextId()}_textarea`, h={};d.validate&&(this.validate=d.validate);h.rows=d.rows||5;h.cols=d.cols||20;h['class']=`cke_dialog_ui_input_textarea ${d['class']||''}`;'undefined'!==typeof d.inputStyle&&(h.style=d.inputStyle);d.dir&&(h.dir=d.dir);if(f.bidi)a.on('load',
    function(){
 f.getInputElement().on('keyup', l); 
}, f);CKEDITOR.ui.dialog.labeledElement.call(this, a, d, e, function(){
 h['aria-labelledby']=this._.labelId;this._.required&&(h['aria-required']=this._.required);let a=['\x3cdiv class\x3d"cke_dialog_ui_input_textarea" role\x3d"presentation"\x3e\x3ctextarea id\x3d"', g, '" '], b;for(b in h)a.push(`${b}\x3d"${CKEDITOR.tools.htmlEncode(h[b])}" `);a.push('\x3e', CKEDITOR.tools.htmlEncode(f._['default']), '\x3c/textarea\x3e\x3c/div\x3e');return a.join(''); 
}); 
} 
}, checkbox:function(a,
    d, e){
 if(!(3>arguments.length)){
 const f=c.call(this, d, {'default':!!d['default']});d.validate&&(this.validate=d.validate);CKEDITOR.ui.dialog.uiElement.call(this, a, d, e, 'span', null, null, function(){
 const e=CKEDITOR.tools.extend({}, d, {id:d.id?`${d.id}_checkbox`:`${CKEDITOR.tools.getNextId()}_checkbox`}, !0), c=[], g=`${CKEDITOR.tools.getNextId()}_label`, h={'class':'cke_dialog_ui_checkbox_input', type:'checkbox', 'aria-labelledby':g};k(e);d['default']&&(h.checked='checked');'undefined'!==typeof e.inputStyle&&(e.style=e.inputStyle);
    f.checkbox=new CKEDITOR.ui.dialog.uiElement(a, e, c, 'input', null, h);c.push(' \x3clabel id\x3d"', g, '" for\x3d"', h.id, `"${d.labelStyle?` style\x3d"${d.labelStyle}"`:''}\x3e`, CKEDITOR.tools.htmlEncode(d.label), '\x3c/label\x3e');return c.join(''); 
}); 
} 
}, radio:function(a, d, e){
 if(!(3>arguments.length)){
 c.call(this, d);this._['default']||(this._['default']=this._.initValue=d.items[0][1]);d.validate&&(this.validate=d.validate);const f=[], g=this;d.role='radiogroup';d.includeLabel=!0;CKEDITOR.ui.dialog.labeledElement.call(this,
    a, d, e, function(){
 for(var e=[], c=[], h=`${d.id?d.id:CKEDITOR.tools.getNextId()}_radio`, l=0;l<d.items.length;l++){
 var m=d.items[l], u=void 0!==m[2]?m[2]:m[0], A=void 0!==m[1]?m[1]:m[0], r=`${CKEDITOR.tools.getNextId()}_radio_input`, y=`${r}_label`, r=CKEDITOR.tools.extend({}, d, {id:r, title:null, type:null}, !0), u=CKEDITOR.tools.extend({}, r, {title:u}, !0), z={type:'radio', 'class':'cke_dialog_ui_radio_input', name:h, value:A, 'aria-labelledby':y}, B=[];g._['default']==A&&(z.checked='checked');k(r);k(u);'undefined'!==typeof r.inputStyle&&
    (r.style=r.inputStyle);r.keyboardFocusable=!0;f.push(new CKEDITOR.ui.dialog.uiElement(a, r, B, 'input', null, z));B.push(' ');new CKEDITOR.ui.dialog.uiElement(a, u, B, 'label', null, {id:y, 'for':z.id}, m[0]);e.push(B.join('')); 
}new CKEDITOR.ui.dialog.hbox(a, f, e, c);return c.join(''); 
});this._.children=f; 
} 
}, button:function(a, d, e){
 if(arguments.length){
 'function'===typeof d&&(d=d(a.getParentEditor()));c.call(this, d, {disabled:d.disabled||!1});CKEDITOR.event.implementOn(this);const f=this;a.on('load', function(){
 const a=this.getElement();
    (function(){
 a.on('click', function(a){
 f.click();a.data.preventDefault(); 
});a.on('keydown', function(a){
 a.data.getKeystroke()in{32:1}&&(f.click(), a.data.preventDefault()); 
}); 
})();a.unselectable(); 
}, this);const g=CKEDITOR.tools.extend({}, d);delete g.style;const h=`${CKEDITOR.tools.getNextId()}_label`;CKEDITOR.ui.dialog.uiElement.call(this, a, g, e, 'a', null, {style:d.style, href:'javascript:void(0)', title:d.label, hidefocus:'true', 'class':d['class'], role:'button', 'aria-labelledby':h}, `\x3cspan id\x3d"${h}" class\x3d"cke_dialog_ui_button"\x3e${
    CKEDITOR.tools.htmlEncode(d.label)}\x3c/span\x3e`); 
} 
}, select:function(a, d, e){
 if(!(3>arguments.length)){
 const f=c.call(this, d);d.validate&&(this.validate=d.validate);f.inputId=`${CKEDITOR.tools.getNextId()}_select`;CKEDITOR.ui.dialog.labeledElement.call(this, a, d, e, function(){
 const e=CKEDITOR.tools.extend({}, d, {id:d.id?`${d.id}_select`:`${CKEDITOR.tools.getNextId()}_select`}, !0), c=[], g=[], h={id:f.inputId, 'class':'cke_dialog_ui_input_select', 'aria-labelledby':this._.labelId};c.push('\x3cdiv class\x3d"cke_dialog_ui_input_',
    d.type, '" role\x3d"presentation"');d.width&&c.push(`style\x3d"width:${d.width}" `);c.push('\x3e');void 0!==d.size&&(h.size=d.size);void 0!==d.multiple&&(h.multiple=d.multiple);k(e);for(var l=0, m;l<d.items.length&&(m=d.items[l]);l++)g.push('\x3coption value\x3d"', CKEDITOR.tools.htmlEncode(void 0!==m[1]?m[1]:m[0]).replace(/"/g, '\x26quot;'), '" /\x3e ', CKEDITOR.tools.htmlEncode(m[0]));'undefined'!==typeof e.inputStyle&&(e.style=e.inputStyle);f.select=new CKEDITOR.ui.dialog.uiElement(a, e, c, 'select', null,
    h, g.join(''));c.push('\x3c/div\x3e');return c.join(''); 
}); 
} 
}, file:function(a, d, e){
 if(!(3>arguments.length)){
 void 0===d['default']&&(d['default']='');const f=CKEDITOR.tools.extend(c.call(this, d), {definition:d, buttons:[]});d.validate&&(this.validate=d.validate);a.on('load', function(){
 CKEDITOR.document.getById(f.frameId).getParent().addClass('cke_dialog_ui_input_file'); 
});CKEDITOR.ui.dialog.labeledElement.call(this, a, d, e, function(){
 f.frameId=`${CKEDITOR.tools.getNextId()}_fileInput`;const a=['\x3ciframe frameborder\x3d"0" allowtransparency\x3d"0" class\x3d"cke_dialog_ui_input_file" role\x3d"presentation" id\x3d"',
    f.frameId, '" title\x3d"', d.label, '" src\x3d"javascript:void('];a.push(CKEDITOR.env.ie?`(function(){${encodeURIComponent(`document.open();(${CKEDITOR.tools.fixDomain})();document.close();`)}})()`:'0');a.push(')"\x3e\x3c/iframe\x3e');return a.join(''); 
}); 
} 
}, fileButton:function(a, d, e){
 const f=this;if(!(3>arguments.length)){
 c.call(this, d);d.validate&&(this.validate=d.validate);const g=CKEDITOR.tools.extend({}, d), h=g.onClick;g.className=`${g.className?`${g.className} `:''}cke_dialog_ui_button`;g.onClick=function(e){
 const f=
    d['for'];e=h?h.call(this, e):!1;!1!==e&&('xhr'!==e&&a.getContentElement(f[0], f[1]).submit(), this.disable()); 
};a.on('load', function(){
 a.getContentElement(d['for'][0], d['for'][1])._.buttons.push(f); 
});CKEDITOR.ui.dialog.button.call(this, a, g, e); 
} 
}, html:function(){
 const a=/^\s*<[\w:]+\s+([^>]*)?>/, d=/^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/, e=/\/$/;return function(f, c, g){
 if(!(3>arguments.length)){
 let h=[], k=c.html;'\x3c'!=k.charAt(0)&&(k=`\x3cspan\x3e${k}\x3c/span\x3e`);const l=c.focus;if(l){
 const m=this.focus;
    this.focus=function(){
 ('function'===typeof l?l:m).call(this);this.fire('focus'); 
};c.isFocusable&&(this.isFocusable=this.isFocusable);this.keyboardFocusable=!0; 
}CKEDITOR.ui.dialog.uiElement.call(this, f, c, h, 'span', null, null, '');h=h.join('').match(a);k=k.match(d)||['', '', ''];e.test(k[1])&&(k[1]=k[1].slice(0, -1), k[2]=`/${k[2]}`);g.push([k[1], ' ', h[1]||'', k[2]].join('')); 
} 
}; 
}(), fieldset:function(a, d, e, f, c){
 const g=c.label;this._={children:d};CKEDITOR.ui.dialog.uiElement.call(this, a, c, f, 'fieldset', null, null, function(){
 const a=
    [];g&&a.push(`\x3clegend${c.labelStyle?` style\x3d"${c.labelStyle}"`:''}\x3e${g}\x3c/legend\x3e`);for(let b=0;b<e.length;b++)a.push(e[b]);return a.join(''); 
}); 
}}, !0);CKEDITOR.ui.dialog.html.prototype=new CKEDITOR.ui.dialog.uiElement;CKEDITOR.ui.dialog.labeledElement.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {setLabel:function(a){
 const d=CKEDITOR.document.getById(this._.labelId);1>d.getChildCount()?(new CKEDITOR.dom.text(a, CKEDITOR.document)).appendTo(d):d.getChild(0).$.nodeValue=
    a;return this; 
}, getLabel:function(){
 const a=CKEDITOR.document.getById(this._.labelId);return!a||1>a.getChildCount()?'':a.getChild(0).getText(); 
}, eventProcessors:f}, !0);CKEDITOR.ui.dialog.button.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {click:function(){
 return this._.disabled?!1:this.fire('click', {dialog:this._.dialog}); 
}, enable:function(){
 this._.disabled=!1;const a=this.getElement();a&&a.removeClass('cke_disabled'); 
}, disable:function(){
 this._.disabled=!0;this.getElement().addClass('cke_disabled'); 
},
    isVisible:function(){
 return this.getElement().getFirst().isVisible(); 
}, isEnabled:function(){
 return!this._.disabled; 
}, eventProcessors:CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {onClick:function(a, d){
 this.on('click', function(){
 d.apply(this, arguments); 
}); 
}}, !0), accessKeyUp:function(){
 this.click(); 
}, accessKeyDown:function(){
 this.focus(); 
}, keyboardFocusable:!0}, !0);CKEDITOR.ui.dialog.textInput.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {getInputElement:function(){
 return CKEDITOR.document.getById(this._.inputId); 
},
    focus:function(){
 const a=this.selectParentTab();setTimeout(function(){
 const d=a.getInputElement();d&&d.$.focus(); 
}, 0); 
}, select:function(){
 const a=this.selectParentTab();setTimeout(function(){
 const d=a.getInputElement();d&&(d.$.focus(), d.$.select()); 
}, 0); 
}, accessKeyUp:function(){
 this.select(); 
}, setValue:function(a){
 if(this.bidi){
 let d=a&&a.charAt(0);(d='‪'==d?'ltr':'‫'==d?'rtl':null)&&(a=a.slice(1));this.setDirectionMarker(d); 
}a||(a='');return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments); 
},
    getValue:function(){
 let a=CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this);if(this.bidi&&a){
 const d=this.getDirectionMarker();d&&(a=('ltr'==d?'‪':'‫')+a); 
}return a; 
}, setDirectionMarker:function(a){
 const d=this.getInputElement();a?d.setAttributes({dir:a, 'data-cke-dir-marker':a}):this.getDirectionMarker()&&d.removeAttributes(['dir', 'data-cke-dir-marker']); 
}, getDirectionMarker:function(){
 return this.getInputElement().data('cke-dir-marker'); 
}, keyboardFocusable:!0}, a, !0);CKEDITOR.ui.dialog.textarea.prototype=
    new CKEDITOR.ui.dialog.textInput;CKEDITOR.ui.dialog.select.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {getInputElement:function(){
 return this._.select.getElement(); 
}, add:function(a, d, e){
 const f=new CKEDITOR.dom.element('option', this.getDialog().getParentEditor().document), c=this.getInputElement().$;f.$.text=a;f.$.value=void 0===d||null===d?a:d;void 0===e||null===e?CKEDITOR.env.ie?c.add(f.$):c.add(f.$, null):c.add(f.$, e);return this; 
}, remove:function(a){
 this.getInputElement().$.remove(a);
    return this; 
}, clear:function(){
 for(let a=this.getInputElement().$;0<a.length;)a.remove(0);return this; 
}, keyboardFocusable:!0}, a, !0);CKEDITOR.ui.dialog.checkbox.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {getInputElement:function(){
 return this._.checkbox.getElement(); 
}, setValue:function(a, d){
 this.getInputElement().$.checked=a;!d&&this.fire('change', {value:a}); 
}, getValue:function(){
 return this.getInputElement().$.checked; 
}, accessKeyUp:function(){
 this.setValue(!this.getValue()); 
}, eventProcessors:{onChange:function(a,
    d){
 if(!CKEDITOR.env.ie||8<CKEDITOR.env.version)return f.onChange.apply(this, arguments);a.on('load', function(){
 const a=this._.checkbox.getElement();a.on('propertychange', function(b){
 b=b.data.$;'checked'==b.propertyName&&this.fire('change', {value:a.$.checked}); 
}, this); 
}, this);this.on('change', d);return null; 
}}, keyboardFocusable:!0}, a, !0);CKEDITOR.ui.dialog.radio.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {setValue:function(a, d){
 for(var e=this._.children, f, c=0;c<e.length&&(f=e[c]);c++)f.getElement().$.checked=
    f.getValue()==a;!d&&this.fire('change', {value:a}); 
}, getValue:function(){
 for(let a=this._.children, d=0;d<a.length;d++)if(a[d].getElement().$.checked)return a[d].getValue();return null; 
}, accessKeyUp:function(){
 let a=this._.children, d;for(d=0;d<a.length;d++)if(a[d].getElement().$.checked){
 a[d].getElement().focus();return; 
}a[0].getElement().focus(); 
}, eventProcessors:{onChange:function(a, d){
 if(!CKEDITOR.env.ie||8<CKEDITOR.env.version)return f.onChange.apply(this, arguments);a.on('load', function(){
 for(var a=
    this._.children, b=this, d=0;d<a.length;d++)a[d].getElement().on('propertychange', function(a){
 a=a.data.$;'checked'==a.propertyName&&this.$.checked&&b.fire('change', {value:this.getAttribute('value')}); 
}); 
}, this);this.on('change', d);return null; 
}}}, a, !0);CKEDITOR.ui.dialog.file.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, a, {getInputElement:function(){
 const a=CKEDITOR.document.getById(this._.frameId).getFrameDocument();return 0<a.$.forms.length?new CKEDITOR.dom.element(a.$.forms[0].elements[0]):
    this.getElement(); 
}, submit:function(){
 this.getInputElement().getParent().$.submit();return this; 
}, getAction:function(){
 return this.getInputElement().getParent().$.action; 
}, registerEvents:function(a){
 let d=/^on([A-Z]\w+)/, e, f=function(a, b, e, d){
 a.on('formLoaded', function(){
 a.getInputElement().on(e, d, a); 
}); 
}, c;for(c in a)if(e=c.match(d))this.eventProcessors[c]?this.eventProcessors[c].call(this, this._.dialog, a[c]):f(this, this._.dialog, e[1].toLowerCase(), a[c]);return this; 
}, reset:function(){
 function a(){
 e.$.open();
    let b='';f.size&&(b=f.size-(CKEDITOR.env.ie?7:0));const m=`${d.frameId}_input`;e.$.write([`\x3chtml dir\x3d"${k}" lang\x3d"${l}"\x3e\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e\x3cbody style\x3d"margin: 0; overflow: hidden; background: transparent;"\x3e`, `\x3cform enctype\x3d"multipart/form-data" method\x3d"POST" dir\x3d"${k}" lang\x3d"${l}" action\x3d"`, CKEDITOR.tools.htmlEncode(f.action), '"\x3e\x3clabel id\x3d"', d.labelId, '" for\x3d"', m, '" style\x3d"display:none"\x3e', CKEDITOR.tools.htmlEncode(f.label),
    '\x3c/label\x3e\x3cinput style\x3d"width:100%" id\x3d"', m, '" aria-labelledby\x3d"', d.labelId, '" type\x3d"file" name\x3d"', CKEDITOR.tools.htmlEncode(f.id||'cke_upload'), '" size\x3d"', CKEDITOR.tools.htmlEncode(0<b?b:''), '" /\x3e\x3c/form\x3e\x3c/body\x3e\x3c/html\x3e\x3cscript\x3e', CKEDITOR.env.ie?`(${CKEDITOR.tools.fixDomain})();`:'', `window.parent.CKEDITOR.tools.callFunction(${g});`, `window.onbeforeunload \x3d function() {window.parent.CKEDITOR.tools.callFunction(${h})}`, '\x3c/script\x3e'].join(''));
    e.$.close();for(b=0;b<c.length;b++)c[b].enable(); 
}var d=this._, e=CKEDITOR.document.getById(d.frameId).getFrameDocument(), f=d.definition, c=d.buttons, g=this.formLoadedNumber, h=this.formUnloadNumber, k=d.dialog._.editor.lang.dir, l=d.dialog._.editor.langCode;g||(g=this.formLoadedNumber=CKEDITOR.tools.addFunction(function(){
 this.fire('formLoaded'); 
}, this), h=this.formUnloadNumber=CKEDITOR.tools.addFunction(function(){
 this.getInputElement().clearCustomData(); 
}, this), this.getDialog()._.editor.on('destroy', function(){
 CKEDITOR.tools.removeFunction(g);
    CKEDITOR.tools.removeFunction(h); 
}));CKEDITOR.env.gecko?setTimeout(a, 500):a(); 
}, getValue:function(){
 return this.getInputElement().$.value||''; 
}, setInitValue:function(){
 this._.initValue=''; 
}, eventProcessors:{onChange:function(a, d){
 this._.domOnChangeRegistered||(this.on('formLoaded', function(){
 this.getInputElement().on('change', function(){
 this.fire('change', {value:this.getValue()}); 
}, this); 
}, this), this._.domOnChangeRegistered=!0);this.on('change', d); 
}}, keyboardFocusable:!0}, !0);CKEDITOR.ui.dialog.fileButton.prototype=
    new CKEDITOR.ui.dialog.button;CKEDITOR.ui.dialog.fieldset.prototype=CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype);CKEDITOR.dialog.addUIElement('text', h);CKEDITOR.dialog.addUIElement('password', h);CKEDITOR.dialog.addUIElement('tel', h);CKEDITOR.dialog.addUIElement('textarea', g);CKEDITOR.dialog.addUIElement('checkbox', g);CKEDITOR.dialog.addUIElement('radio', g);CKEDITOR.dialog.addUIElement('button', g);CKEDITOR.dialog.addUIElement('select', g);CKEDITOR.dialog.addUIElement('file', g);CKEDITOR.dialog.addUIElement('fileButton',
    g);CKEDITOR.dialog.addUIElement('html', g);CKEDITOR.dialog.addUIElement('fieldset', {build:function(a, d, e){
 for(var f=d.children, c, g=[], h=[], k=0;k<f.length&&(c=f[k]);k++){
 const l=[];g.push(l);h.push(CKEDITOR.dialog._.uiElementBuilders[c.type].build(a, c, l)); 
}return new CKEDITOR.ui.dialog[d.type](a, h, g, e, d); 
}}); 
}}), CKEDITOR.DIALOG_RESIZE_NONE=0, CKEDITOR.DIALOG_RESIZE_WIDTH=1, CKEDITOR.DIALOG_RESIZE_HEIGHT=2, CKEDITOR.DIALOG_RESIZE_BOTH=3, CKEDITOR.DIALOG_STATE_IDLE=1, CKEDITOR.DIALOG_STATE_BUSY=2, function(){
 function c(a){
 a._.tabBarMode=
    !0;a._.tabs[a._.currentTabId][0].focus();a._.currentFocusIndex=-1; 
}function h(){
 for(let a=this._.tabIdList.length, b=CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId)+a, e=b-1;e>b-a;e--)if(this._.tabs[this._.tabIdList[e%a]][0].$.offsetHeight)return this._.tabIdList[e%a];return null; 
}function g(){
 for(let a=this._.tabIdList.length, b=CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), e=b+1;e<b+a;e++)if(this._.tabs[this._.tabIdList[e%a]][0].$.offsetHeight)return this._.tabIdList[e%a];
    return null; 
}function a(a, b){
 for(let e=a.$.getElementsByTagName('input'), d=0, f=e.length;d<f;d++){
 const c=new CKEDITOR.dom.element(e[d]);'text'==c.getAttribute('type').toLowerCase()&&(b?(c.setAttribute('value', c.getCustomData('fake_value')||''), c.removeCustomData('fake_value')):(c.setCustomData('fake_value', c.getAttribute('value')), c.setAttribute('value', ''))); 
} 
}function f(a, b){
 const e=this.getInputElement();e&&(a?e.removeAttribute('aria-invalid'):e.setAttribute('aria-invalid', !0));a||(this.select?this.select():
    this.focus());b&&alert(b);this.fire('validated', {valid:a, msg:b}); 
}function m(){
 const a=this.getInputElement();a&&a.removeAttribute('aria-invalid'); 
}function k(a){
 const b=CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate('dialog', K).output({id:CKEDITOR.tools.getNextNumber(), editorId:a.id, langDir:a.lang.dir, langCode:a.langCode, editorDialogClass:`cke_editor_${a.name.replace(/\./g, '\\.')}_dialog`, closeTitle:a.lang.common.close, hidpi:CKEDITOR.env.hidpi?'cke_hidpi':''})), e=b.getChild([0, 0, 0, 0, 0]), d=e.getChild(0),
    f=e.getChild(1);a.plugins.clipboard&&CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(e);!CKEDITOR.env.ie||CKEDITOR.env.quirks||CKEDITOR.env.edge||(a=`javascript:void(function(){${encodeURIComponent(`document.open();(${CKEDITOR.tools.fixDomain})();document.close();`)}}())`, CKEDITOR.dom.element.createFromHtml(`\x3ciframe frameBorder\x3d"0" class\x3d"cke_iframe_shim" src\x3d"${a}" tabIndex\x3d"-1"\x3e\x3c/iframe\x3e`).appendTo(e.getParent()));d.unselectable();f.unselectable();return{element:b,
    parts:{dialog:b.getChild(0), title:d, close:f, tabs:e.getChild(2), contents:e.getChild([3, 0, 0, 0]), footer:e.getChild([3, 0, 1, 0])}}; 
}function l(a, b, e){
 this.element=b;this.focusIndex=e;this.tabIndex=0;this.isFocusable=function(){
 return!b.getAttribute('disabled')&&b.isVisible(); 
};this.focus=function(){
 a._.currentFocusIndex=this.focusIndex;this.element.focus(); 
};b.on('keydown', function(a){
 a.data.getKeystroke()in{32:1, 13:1}&&this.fire('click'); 
});b.on('focus', function(){
 this.fire('mouseover'); 
});b.on('blur', function(){
 this.fire('mouseout'); 
}); 
}
    function b(a){
 function b(){
 a.layout(); 
}const e=CKEDITOR.document.getWindow();e.on('resize', b);a.on('hide', function(){
 e.removeListener('resize', b); 
}); 
}function d(a, b){
 this.dialog=a;for(var d=b.contents, f=0, c;c=d[f];f++)d[f]=c&&new e(a, c);CKEDITOR.tools.extend(this, b); 
}function e(a, b){
 this._={dialog:a};CKEDITOR.tools.extend(this, b); 
}function n(a){
 function b(e){
 let k=a.getSize(), l=a.parts.dialog.getParent().getClientSize(), n=e.data.$.screenX, m=e.data.$.screenY, t=n-d.x, u=m-d.y;d={x:n, y:m};f.x+=t;f.y+=u;n=f.x+
    h[3]<g?-h[3]:f.x-h[1]>l.width-k.width-g?l.width-k.width+('rtl'==c.lang.dir?0:h[1]):f.x;k=f.y+h[0]<g?-h[0]:f.y-h[2]>l.height-k.height-g?l.height-k.height+h[2]:f.y;n=Math.floor(n);k=Math.floor(k);a.move(n, k, 1);e.data.preventDefault(); 
}function e(){
 CKEDITOR.document.removeListener('mousemove', b);CKEDITOR.document.removeListener('mouseup', e);if(CKEDITOR.env.ie6Compat){
 const a=E.getChild(0).getFrameDocument();a.removeListener('mousemove', b);a.removeListener('mouseup', e); 
} 
}var d=null, f=null, c=a.getParentEditor(),
    g=c.config.dialog_magnetDistance, h=CKEDITOR.skin.margins||[0, 0, 0, 0];'undefined'===typeof g&&(g=20);a.parts.title.on('mousedown', function(c){
 if(!a._.moved){
 var g=a._.element;g.getFirst().setStyle('position', 'absolute');g.removeStyle('display');a._.moved=!0;a.layout(); 
}d={x:c.data.$.screenX, y:c.data.$.screenY};CKEDITOR.document.on('mousemove', b);CKEDITOR.document.on('mouseup', e);f=a.getPosition();CKEDITOR.env.ie6Compat&&(g=E.getChild(0).getFrameDocument(), g.on('mousemove', b), g.on('mouseup', e));c.data.preventDefault(); 
},
    a); 
}function t(a){
 function b(e){
 var m='rtl'==c.lang.dir, t=n.width, u=n.height, v=t+(e.data.$.screenX-l.x)*(m?-1:1)*(a._.moved?1:2), P=u+(e.data.$.screenY-l.y)*(a._.moved?1:2), w=a._.element.getFirst(), w=m&&parseInt(w.getComputedStyle('right'), 10), r=a.getPosition();r.x=r.x||0;r.y=r.y||0;r.y+P>k.height&&(P=k.height-r.y);(m?w:r.x)+v>k.width&&(v=k.width-(m?w:r.x));P=Math.floor(P);v=Math.floor(v);if(f==CKEDITOR.DIALOG_RESIZE_WIDTH||f==CKEDITOR.DIALOG_RESIZE_BOTH)t=Math.max(d.minWidth||0, v-g);if(f==CKEDITOR.DIALOG_RESIZE_HEIGHT||
    f==CKEDITOR.DIALOG_RESIZE_BOTH)u=Math.max(d.minHeight||0, P-h);a.resize(t, u);a._.moved&&x(a, a._.position.x, a._.position.y);a._.moved||a.layout();e.data.preventDefault(); 
}function e(){
 CKEDITOR.document.removeListener('mouseup', e);CKEDITOR.document.removeListener('mousemove', b);m&&(m.remove(), m=null);if(CKEDITOR.env.ie6Compat){
 const a=E.getChild(0).getFrameDocument();a.removeListener('mouseup', e);a.removeListener('mousemove', b); 
} 
}var d=a.definition, f=d.resizable;if(f!=CKEDITOR.DIALOG_RESIZE_NONE){
 var c=
    a.getParentEditor(), g, h, k, l, n, m, t=CKEDITOR.tools.addFunction(function(d){
 function f(a){
 return a.isVisible(); 
}n=a.getSize();let c=a.parts.contents, t=c.$.getElementsByTagName('iframe').length, u=!(CKEDITOR.env.gecko||CKEDITOR.env.ie&&CKEDITOR.env.quirks);t&&(m=CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_dialog_resize_cover" style\x3d"height: 100%; position: absolute; width: 100%; left:0; top:0;"\x3e\x3c/div\x3e'), c.append(m));h=n.height-a.parts.contents.getFirst(f).getSize('height', u);
    g=n.width-a.parts.contents.getFirst(f).getSize('width', 1);l={x:d.screenX, y:d.screenY};k=CKEDITOR.document.getWindow().getViewPaneSize();CKEDITOR.document.on('mousemove', b);CKEDITOR.document.on('mouseup', e);CKEDITOR.env.ie6Compat&&(c=E.getChild(0).getFrameDocument(), c.on('mousemove', b), c.on('mouseup', e));d.preventDefault&&d.preventDefault(); 
});a.on('load', function(){
 let b='';f==CKEDITOR.DIALOG_RESIZE_WIDTH?b=' cke_resizer_horizontal':f==CKEDITOR.DIALOG_RESIZE_HEIGHT&&(b=' cke_resizer_vertical');b=CKEDITOR.dom.element.createFromHtml(`\x3cdiv class\x3d"cke_resizer${
    b} cke_resizer_${c.lang.dir}" title\x3d"${CKEDITOR.tools.htmlEncode(c.lang.common.resize)}" onmousedown\x3d"CKEDITOR.tools.callFunction(${t}, event )"\x3e${'ltr'==c.lang.dir?'◢':'◣'}\x3c/div\x3e`);a.parts.footer.append(b, 1); 
});c.on('destroy', function(){
 CKEDITOR.tools.removeFunction(t); 
}); 
} 
}function x(a, b, e){
 var d=a.parts.dialog.getParent().getClientSize(), f=a.getSize(), c=a._.viewportRatio, g=Math.max(d.width-f.width, 0), d=Math.max(d.height-f.height, 0);c.width=g?b/g:c.width;c.height=d?e/d:c.height;
    a._.viewportRatio=c; 
}function p(a){
 a.data.preventDefault(1); 
}function q(a){
 var b=a.config, e=CKEDITOR.skinName||a.config.skin, d=b.dialog_backgroundCoverColor||('moono-lisa'==e?'black':'white'), e=b.dialog_backgroundCoverOpacity, f=b.baseFloatZIndex, b=CKEDITOR.tools.genKey(d, e, f), c=L[b];CKEDITOR.document.getBody().addClass('cke_dialog_open');c?c.show():(f=['\x3cdiv tabIndex\x3d"-1" style\x3d"position: ', CKEDITOR.env.ie6Compat?'absolute':'fixed', '; z-index: ', f, '; top: 0px; left: 0px; ', '; width: 100%; height: 100%;',
    CKEDITOR.env.ie6Compat?'':`background-color: ${d}`, '" class\x3d"cke_dialog_background_cover"\x3e'], CKEDITOR.env.ie6Compat&&(d=`\x3chtml\x3e\x3cbody style\x3d\\'background-color:${d};\\'\x3e\x3c/body\x3e\x3c/html\x3e`, f.push('\x3ciframe hidefocus\x3d"true" frameborder\x3d"0" id\x3d"cke_dialog_background_iframe" src\x3d"javascript:'), f.push(`void((function(){${encodeURIComponent(`document.open();(${CKEDITOR.tools.fixDomain})();document.write( '${d}' );document.close();`)}})())`), f.push('" style\x3d"position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity\x3d0)"\x3e\x3c/iframe\x3e')),
    f.push('\x3c/div\x3e'), c=CKEDITOR.dom.element.createFromHtml(f.join('')), c.setOpacity(void 0!==e?e:.5), c.on('keydown', p), c.on('keypress', p), c.on('keyup', p), c.appendTo(CKEDITOR.document.getBody()), L[b]=c);a.focusManager.add(c);E=c;CKEDITOR.env.mac&&CKEDITOR.env.webkit||c.focus(); 
}function v(a){
 CKEDITOR.document.getBody().removeClass('cke_dialog_open');E&&(a.focusManager.remove(E), E.hide()); 
}function w(a){
 let b=a.data.$.ctrlKey||a.data.$.metaKey, e=a.data.$.altKey, d=a.data.$.shiftKey, f=String.fromCharCode(a.data.$.keyCode);
    (b=Q[(b?'CTRL+':'')+(e?'ALT+':'')+(d?'SHIFT+':'')+f])&&b.length&&(b=b[b.length-1], b.keydown&&b.keydown.call(b.uiElement, b.dialog, b.key), a.data.preventDefault()); 
}function u(a){
 let b=a.data.$.ctrlKey||a.data.$.metaKey, e=a.data.$.altKey, d=a.data.$.shiftKey, f=String.fromCharCode(a.data.$.keyCode);(b=Q[(b?'CTRL+':'')+(e?'ALT+':'')+(d?'SHIFT+':'')+f])&&b.length&&(b=b[b.length-1], b.keyup&&(b.keyup.call(b.uiElement, b.dialog, b.key), a.data.preventDefault())); 
}function A(a, b, e, d, f){
 (Q[e]||(Q[e]=[])).push({uiElement:a,
    dialog:b, key:e, keyup:f||a.accessKeyUp, keydown:d||a.accessKeyDown}); 
}function r(a){
 for(const b in Q){
 for(var e=Q[b], d=e.length-1;0<=d;d--)e[d].dialog!=a&&e[d].uiElement!=a||e.splice(d, 1);0===e.length&&delete Q[b]; 
} 
}function y(a, b){
 a._.accessKeyMap[b]&&a.selectPage(a._.accessKeyMap[b]); 
}function z(){}var B=CKEDITOR.tools.cssLength, C, E, F=!1, I=!CKEDITOR.env.ie||CKEDITOR.env.edge, K=`\x3cdiv class\x3d"cke_reset_all cke_dialog_container {editorId} {editorDialogClass} {hidpi}" dir\x3d"{langDir}" style\x3d"${I?
    'display:flex':''}" lang\x3d"{langCode}" role\x3d"dialog" aria-labelledby\x3d"cke_dialog_title_{id}"\x3e\x3ctable class\x3d"cke_dialog ${CKEDITOR.env.cssClass} cke_{langDir}" style\x3d"${I?'margin:auto':'position:absolute'}" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd role\x3d"presentation"\x3e\x3cdiv class\x3d"cke_dialog_body" role\x3d"presentation"\x3e\x3cdiv id\x3d"cke_dialog_title_{id}" class\x3d"cke_dialog_title" role\x3d"presentation"\x3e\x3c/div\x3e\x3ca id\x3d"cke_dialog_close_button_{id}" class\x3d"cke_dialog_close_button" href\x3d"javascript:void(0)" title\x3d"{closeTitle}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e\x3cdiv id\x3d"cke_dialog_tabs_{id}" class\x3d"cke_dialog_tabs" role\x3d"tablist"\x3e\x3c/div\x3e\x3ctable class\x3d"cke_dialog_contents" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_contents_{id}" class\x3d"cke_dialog_contents_body" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_footer_{id}" class\x3d"cke_dialog_footer" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e`;
    CKEDITOR.dialog=function(a, b){
 function e(){
 const a=B._.focusList;a.sort(function(a, b){
 return a.tabIndex!=b.tabIndex?b.tabIndex-a.tabIndex:a.focusIndex-b.focusIndex; 
});for(let b=a.length, d=0;d<b;d++)a[d].focusIndex=d; 
}function l(a){
 const b=B._.focusList;a=a||0;if(!(1>b.length)){
 let e=B._.currentFocusIndex;B._.tabBarMode&&0>a&&(e=0);try{
 b[e].getInputElement().$.blur(); 
}catch(d){}let f=e, c=1<B._.pageCount;do{
 f+=a;if(c&&!B._.tabBarMode&&(f==b.length||-1==f)){
 B._.tabBarMode=!0;B._.tabs[B._.currentTabId][0].focus();
    B._.currentFocusIndex=-1;return; 
}f=(f+b.length)%b.length;if(f==e)break; 
}while(a&&!b[f].isFocusable());b[f].focus();'text'==b[f].type&&b[f].select(); 
} 
}function u(b){
 if(B==CKEDITOR.dialog._.currentTop){
 let e=b.data.getKeystroke(), d='rtl'==a.lang.dir, f=[37, 38, 39, 40];p=q=0;if(9==e||e==CKEDITOR.SHIFT+9)l(e==CKEDITOR.SHIFT+9?-1:1), p=1;else if(e==CKEDITOR.ALT+121&&!B._.tabBarMode&&1<B.getPageCount())c(B), p=1;else if(-1!=CKEDITOR.tools.indexOf(f, e)&&B._.tabBarMode)e=-1!=CKEDITOR.tools.indexOf([d?39:37, 38], e)?
    h.call(B):g.call(B), B.selectPage(e), B._.tabs[e][0].focus(), p=1;else if(13!=e&&32!=e||!B._.tabBarMode)if(13==e)e=b.data.getTarget(), e.is('a', 'button', 'select', 'textarea')||e.is('input')&&'button'==e.$.type||((e=this.getButton('ok'))&&CKEDITOR.tools.setTimeout(e.click, 0, e), p=1), q=1;else if(27==e)(e=this.getButton('cancel'))?CKEDITOR.tools.setTimeout(e.click, 0, e):!1!==this.fire('cancel', {hide:!0}).hide&&this.hide(), q=1;else return;else this.selectPage(this._.currentTabId), this._.tabBarMode=!1, this._.currentFocusIndex=
    -1, l(1), p=1;v(b); 
} 
}function v(a){
 p?a.data.preventDefault(1):q&&a.data.stopPropagation(); 
}let w=CKEDITOR.dialog._.dialogDefinitions[b], r=CKEDITOR.tools.clone(C), x=a.config.dialog_buttonsOrder||'OS', z=a.lang.dir, A={}, p, q;('OS'==x&&CKEDITOR.env.mac||'rtl'==x&&'ltr'==z||'ltr'==x&&'rtl'==z)&&r.buttons.reverse();w=CKEDITOR.tools.extend(w(a), r);w=CKEDITOR.tools.clone(w);w=new d(this, w);r=k(a);this._={editor:a, element:r.element, name:b, model:null, contentSize:{width:0, height:0}, size:{width:0, height:0}, contents:{},
    buttons:{}, accessKeyMap:{}, viewportRatio:{width:.5, height:.5}, tabs:{}, tabIdList:[], currentTabId:null, currentTabIndex:null, pageCount:0, lastTab:null, tabBarMode:!1, focusList:[], currentFocusIndex:0, hasFocus:!1};this.parts=r.parts;CKEDITOR.tools.setTimeout(function(){
 a.fire('ariaWidget', this.parts.contents); 
}, 0, this);r={top:0, visibility:'hidden'};CKEDITOR.env.ie6Compat&&(r.position='absolute');r['rtl'==z?'right':'left']=0;this.parts.dialog.setStyles(r);CKEDITOR.event.call(this);this.definition=w=CKEDITOR.fire('dialogDefinition',
    {name:b, definition:w, dialog:this}, a).definition;if(!('removeDialogTabs'in a._)&&a.config.removeDialogTabs){
 r=a.config.removeDialogTabs.split(';');for(z=0;z<r.length;z++)if(x=r[z].split(':'), 2==x.length){
 const y=x[0];A[y]||(A[y]=[]);A[y].push(x[1]); 
}a._.removeDialogTabs=A; 
}if(a._.removeDialogTabs&&(A=a._.removeDialogTabs[b]))for(z=0;z<A.length;z++)w.removeContents(A[z]);if(w.onLoad)this.on('load', w.onLoad);if(w.onShow)this.on('show', w.onShow);if(w.onHide)this.on('hide', w.onHide);if(w.onOk)this.on('ok',
    function(b){
 a.fire('saveSnapshot');setTimeout(function(){
 a.fire('saveSnapshot'); 
}, 0);!1===w.onOk.call(this, b)&&(b.data.hide=!1); 
});this.state=CKEDITOR.DIALOG_STATE_IDLE;if(w.onCancel)this.on('cancel', function(a){
 !1===w.onCancel.call(this, a)&&(a.data.hide=!1); 
});var B=this, E=function(a){
 let b=B._.contents, e=!1, d;for(d in b)for(const f in b[d])if(e=a.call(this, b[d][f]))return; 
};this.on('ok', function(a){
 E(function(b){
 if(b.validate){
 const e=b.validate(this), d='string'===typeof e||!1===e;d&&(a.data.hide=!1, a.stop());
    f.call(b, !d, 'string'===typeof e?e:void 0);return d; 
} 
}); 
}, this, null, 0);this.on('cancel', function(b){
 E(function(e){
 if(e.isChanged())return a.config.dialog_noConfirmCancel||confirm(a.lang.common.confirmCancel)||(b.data.hide=!1), !0; 
}); 
}, this, null, 0);this.parts.close.on('click', function(a){
 !1!==this.fire('cancel', {hide:!0}).hide&&this.hide();a.data.preventDefault(); 
}, this);this.changeFocus=l;const K=this._.element;a.focusManager.add(K, 1);this.on('show', function(){
 K.on('keydown', u, this);if(CKEDITOR.env.gecko)K.on('keypress',
    v, this); 
});this.on('hide', function(){
 K.removeListener('keydown', u);CKEDITOR.env.gecko&&K.removeListener('keypress', v);E(function(a){
 m.apply(a); 
}); 
});this.on('iframeAdded', function(a){
 (new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on('keydown', u, this, null, 0); 
});this.on('show', function(){
 e();let b=1<B._.pageCount;a.config.dialog_startupFocusTab&&b?(B._.tabBarMode=!0, B._.tabs[B._.currentTabId][0].focus(), B._.currentFocusIndex=-1):this._.hasFocus||(this._.currentFocusIndex=b?-1:this._.focusList.length-
    1, w.onFocus?(b=w.onFocus.call(this))&&b.focus():l(1)); 
}, this, null, 4294967295);if(CKEDITOR.env.ie6Compat)this.on('load', function(){
 const a=this.getElement(), b=a.getFirst();b.remove();b.appendTo(a); 
}, this);n(this);t(this);(new CKEDITOR.dom.text(w.title, CKEDITOR.document)).appendTo(this.parts.title);for(z=0;z<w.contents.length;z++)(A=w.contents[z])&&this.addPage(A);this.parts.tabs.on('click', function(a){
 let b=a.data.getTarget();b.hasClass('cke_dialog_tab')&&(b=b.$.id, this.selectPage(b.substring(4, b.lastIndexOf('_'))),
    c(this), a.data.preventDefault()); 
}, this);z=[];A=CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, {type:'hbox', className:'cke_dialog_footer_buttons', widths:[], children:w.buttons}, z).getChild();this.parts.footer.setHtml(z.join(''));for(z=0;z<A.length;z++)this._.buttons[A[z].id]=A[z]; 
};CKEDITOR.dialog.prototype={destroy:function(){
 this.hide();this._.element.remove(); 
}, resize:function(a, b){
 if(!this._.contentSize||this._.contentSize.width!=a||this._.contentSize.height!=b){
 CKEDITOR.dialog.fire('resize',
    {dialog:this, width:a, height:b}, this._.editor);this.fire('resize', {width:a, height:b}, this._.editor);this.parts.contents.setStyles({width:`${a}px`, height:`${b}px`});if('rtl'==this._.editor.lang.dir&&this._.position){
 const e=this.parts.dialog.getParent().getClientSize().width;this._.position.x=e-this._.contentSize.width-parseInt(this._.element.getFirst().getStyle('right'), 10); 
}this._.contentSize={width:a, height:b}; 
} 
}, getSize:function(){
 const a=this._.element.getFirst();return{width:a.$.offsetWidth||0, height:a.$.offsetHeight||
    0}; 
}, move:function(a, b, e){
 const d=this._.element.getFirst(), f='rtl'==this._.editor.lang.dir;CKEDITOR.env.ie&&d.setStyle('zoom', '100%');var c=this.parts.dialog.getParent().getClientSize(), g=this.getSize(), h=this._.viewportRatio, k=Math.max(c.width-g.width, 0), c=Math.max(c.height-g.height, 0);this._.position&&this._.position.x==a&&this._.position.y==b?(a=Math.floor(k*h.width), b=Math.floor(c*h.height)):x(this, a, b);this._.position={x:a, y:b};f&&(a=k-a);b={top:`${0<b?b:0}px`};b[f?'right':'left']=`${0<a?a:0}px`;
    d.setStyles(b);e&&(this._.moved=1); 
}, getPosition:function(){
 return CKEDITOR.tools.extend({}, this._.position); 
}, show:function(){
 var a=this._.element, e=this.definition, d=CKEDITOR.document.getBody(), f=this._.editor.config.baseFloatZIndex;a.getParent()&&a.getParent().equals(d)?a.setStyle('display', I?'flex':'block'):a.appendTo(d);this.resize(this._.contentSize&&this._.contentSize.width||e.width||e.minWidth, this._.contentSize&&this._.contentSize.height||e.height||e.minHeight);this.reset();null===this._.currentTabId&&
    this.selectPage(this.definition.contents[0].id);null===CKEDITOR.dialog._.currentZIndex&&(CKEDITOR.dialog._.currentZIndex=f);this._.element.getFirst().setStyle('z-index', CKEDITOR.dialog._.currentZIndex+=10);this.getElement().setStyle('z-index', CKEDITOR.dialog._.currentZIndex);null===CKEDITOR.dialog._.currentTop?(CKEDITOR.dialog._.currentTop=this, this._.parentDialog=null, q(this._.editor)):(this._.parentDialog=CKEDITOR.dialog._.currentTop, d=this._.parentDialog.getElement().getFirst(), d.$.style.zIndex-=
    Math.floor(f/2), this._.parentDialog.getElement().setStyle('z-index', d.$.style.zIndex), CKEDITOR.dialog._.currentTop=this);a.on('keydown', w);a.on('keyup', u);this._.hasFocus=!1;for(const c in e.contents)if(e.contents[c]){
 var a=e.contents[c], f=this._.tabs[a.id], d=a.requiredContent, g=0;if(f){
 for(const h in this._.contents[a.id]){
 const k=this._.contents[a.id][h];'hbox'!=k.type&&'vbox'!=k.type&&k.getInputElement()&&(k.requiredContent&&!this._.editor.activeFilter.check(k.requiredContent)?k.disable():(k.enable(),
    g++)); 
}!g||d&&!this._.editor.activeFilter.check(d)?f[0].addClass('cke_dialog_tab_disabled'):f[0].removeClass('cke_dialog_tab_disabled'); 
} 
}CKEDITOR.tools.setTimeout(function(){
 this.layout();b(this);this.parts.dialog.setStyle('visibility', '');this.fireOnce('load', {});CKEDITOR.ui.fire('ready', this);this.fire('show', {});this._.editor.fire('dialogShow', this);this._.parentDialog||this._.editor.focusManager.lock();this.foreach(function(a){
 a.setInitValue&&a.setInitValue(); 
}); 
}, 100, this); 
}, layout:function(){
 const a=
    this.parts.dialog;if(this._.moved||!I){
 let b=this.getSize(), e=CKEDITOR.document.getWindow().getViewPaneSize(), d;this._.moved&&this._.position?(d=this._.position.x, b=this._.position.y):(d=(e.width-b.width)/2, b=(e.height-b.height)/2);CKEDITOR.env.ie6Compat||(a.setStyle('position', 'absolute'), a.removeStyle('margin'));d=Math.floor(d);b=Math.floor(b);this.move(d, b); 
} 
}, foreach:function(a){
 for(const b in this._.contents)for(const e in this._.contents[b])a.call(this, this._.contents[b][e]);return this; 
}, reset:function(){
 const a=
    function(a){
 a.reset&&a.reset(1); 
};return function(){
 this.foreach(a);return this; 
}; 
}(), setupContent:function(){
 const a=arguments;this.foreach(function(b){
 b.setup&&b.setup.apply(b, a); 
}); 
}, commitContent:function(){
 const a=arguments;this.foreach(function(b){
 CKEDITOR.env.ie&&this._.currentFocusIndex==b.focusIndex&&b.getInputElement().$.blur();b.commit&&b.commit.apply(b, a); 
}); 
}, hide:function(){
 if(this.parts.dialog.isVisible()){
 this.fire('hide', {});this._.editor.fire('dialogHide', this);this.selectPage(this._.tabIdList[0]);
    const a=this._.element;a.setStyle('display', 'none');this.parts.dialog.setStyle('visibility', 'hidden');for(r(this);CKEDITOR.dialog._.currentTop!=this;)CKEDITOR.dialog._.currentTop.hide();if(this._.parentDialog){
 const b=this._.parentDialog.getElement().getFirst();this._.parentDialog.getElement().removeStyle('z-index');b.setStyle('z-index', parseInt(b.$.style.zIndex, 10)+Math.floor(this._.editor.config.baseFloatZIndex/2)); 
}else v(this._.editor);if(CKEDITOR.dialog._.currentTop=this._.parentDialog)CKEDITOR.dialog._.currentZIndex-=
    10;else{
 CKEDITOR.dialog._.currentZIndex=null;a.removeListener('keydown', w);a.removeListener('keyup', u);const e=this._.editor;e.focus();setTimeout(function(){
 e.focusManager.unlock();CKEDITOR.env.iOS&&e.window.focus(); 
}, 0); 
}delete this._.parentDialog;this.foreach(function(a){
 a.resetInitValue&&a.resetInitValue(); 
});this.setState(CKEDITOR.DIALOG_STATE_IDLE); 
} 
}, addPage:function(a){
 if(!a.requiredContent||this._.editor.filter.check(a.requiredContent)){
 for(var b=[], e=a.label?` title\x3d"${CKEDITOR.tools.htmlEncode(a.label)
    }"`:'', d=CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, {type:'vbox', className:'cke_dialog_page_contents', children:a.elements, expand:!!a.expand, padding:a.padding, style:a.style||'width: 100%;'}, b), f=this._.contents[a.id]={}, c=d.getChild(), g=0;d=c.shift();)d.notAllowed||'hbox'==d.type||'vbox'==d.type||g++, f[d.id]=d, 'function'===typeof d.getChild&&c.push.apply(c, d.getChild());g||(a.hidden=!0);b=CKEDITOR.dom.element.createFromHtml(b.join(''));b.setAttribute('role', 'tabpanel');b.setStyle('min-height',
    '100%');d=CKEDITOR.env;f=`cke_${a.id}_${CKEDITOR.tools.getNextNumber()}`;e=CKEDITOR.dom.element.createFromHtml(['\x3ca class\x3d"cke_dialog_tab"', 0<this._.pageCount?' cke_last':'cke_first', e, a.hidden?' style\x3d"display:none"':'', ' id\x3d"', f, '"', d.gecko&&!d.hc?'':' href\x3d"javascript:void(0)"', ' tabIndex\x3d"-1" hidefocus\x3d"true" role\x3d"tab"\x3e', a.label, '\x3c/a\x3e'].join(''));b.setAttribute('aria-labelledby', f);this._.tabs[a.id]=[e, b];this._.tabIdList.push(a.id);!a.hidden&&this._.pageCount++;
    this._.lastTab=e;this.updateStyle();b.setAttribute('name', a.id);b.appendTo(this.parts.contents);e.unselectable();this.parts.tabs.append(e);a.accessKey&&(A(this, this, `CTRL+${a.accessKey}`, z, y), this._.accessKeyMap[`CTRL+${a.accessKey}`]=a.id); 
} 
}, selectPage:function(b){
 if(this._.currentTabId!=b&&!this._.tabs[b][0].hasClass('cke_dialog_tab_disabled')&&!1!==this.fire('selectPage', {page:b, currentPage:this._.currentTabId})){
 for(const e in this._.tabs){
 const d=this._.tabs[e][0], f=this._.tabs[e][1];e!=b&&(d.removeClass('cke_dialog_tab_selected'),
    d.removeAttribute('aria-selected'), f.hide());f.setAttribute('aria-hidden', e!=b); 
}const c=this._.tabs[b];c[0].addClass('cke_dialog_tab_selected');c[0].setAttribute('aria-selected', !0);CKEDITOR.env.ie6Compat||CKEDITOR.env.ie7Compat?(a(c[1]), c[1].show(), setTimeout(function(){
 a(c[1], 1); 
}, 0)):c[1].show();this._.currentTabId=b;this._.currentTabIndex=CKEDITOR.tools.indexOf(this._.tabIdList, b); 
} 
}, updateStyle:function(){
 this.parts.dialog[`${1===this._.pageCount?'add':'remove'}Class`]('cke_single_page'); 
}, hidePage:function(a){
 const b=
    this._.tabs[a]&&this._.tabs[a][0];b&&1!=this._.pageCount&&b.isVisible()&&(a==this._.currentTabId&&this.selectPage(h.call(this)), b.hide(), this._.pageCount--, this.updateStyle()); 
}, showPage:function(a){
 if(a=this._.tabs[a]&&this._.tabs[a][0])a.show(), this._.pageCount++, this.updateStyle(); 
}, getElement:function(){
 return this._.element; 
}, getName:function(){
 return this._.name; 
}, getContentElement:function(a, b){
 const e=this._.contents[a];return e&&e[b]; 
}, getValueOf:function(a, b){
 return this.getContentElement(a, b).getValue(); 
},
    setValueOf:function(a, b, e){
 return this.getContentElement(a, b).setValue(e); 
}, getButton:function(a){
 return this._.buttons[a]; 
}, click:function(a){
 return this._.buttons[a].click(); 
}, disableButton:function(a){
 return this._.buttons[a].disable(); 
}, enableButton:function(a){
 return this._.buttons[a].enable(); 
}, getPageCount:function(){
 return this._.pageCount; 
}, getParentEditor:function(){
 return this._.editor; 
}, getSelectedElement:function(){
 return this.getParentEditor().getSelection().getSelectedElement(); 
}, addFocusable:function(a,
    b){
 if('undefined'===typeof b)b=this._.focusList.length, this._.focusList.push(new l(this, a, b));else{
 this._.focusList.splice(b, 0, new l(this, a, b));for(let e=b+1;e<this._.focusList.length;e++)this._.focusList[e].focusIndex++; 
} 
}, setState:function(a){
 if(this.state!=a){
 this.state=a;if(a==CKEDITOR.DIALOG_STATE_BUSY){
 if(!this.parts.spinner){
 const b=this.getParentEditor().lang.dir, e={attributes:{'class':'cke_dialog_spinner'}, styles:{'float':'rtl'==b?'right':'left'}};e.styles[`margin-${'rtl'==b?'left':'right'}`]=
    '8px';this.parts.spinner=CKEDITOR.document.createElement('div', e);this.parts.spinner.setHtml('\x26#8987;');this.parts.spinner.appendTo(this.parts.title, 1); 
}this.parts.spinner.show();this.getButton('ok').disable(); 
}else a==CKEDITOR.DIALOG_STATE_IDLE&&(this.parts.spinner&&this.parts.spinner.hide(), this.getButton('ok').enable());this.fire('state', a); 
} 
}, getModel:function(a){
 return this._.model?this._.model:this.definition.getModel?this.definition.getModel(a):null; 
}, setModel:function(a){
 this._.model=a; 
}, getMode:function(a){
 if(this.definition.getMode)return this.definition.getMode(a);
    a=this.getModel(a);return!a||a instanceof CKEDITOR.dom.element&&!a.getParent()?CKEDITOR.dialog.CREATION_MODE:CKEDITOR.dialog.EDITING_MODE; 
}};CKEDITOR.tools.extend(CKEDITOR.dialog, {CREATION_MODE:0, EDITING_MODE:1, add:function(a, b){
 this._.dialogDefinitions[a]&&'function'!==typeof b||(this._.dialogDefinitions[a]=b); 
}, exists:function(a){
 return!!this._.dialogDefinitions[a]; 
}, getCurrent:function(){
 return CKEDITOR.dialog._.currentTop; 
}, isTabEnabled:function(a, b, e){
 a=a.config.removeDialogTabs;return!(a&&a.match(new RegExp(`(?:^|;)${
    b}:${e}(?:$|;)`, 'i'))); 
}, okButton:function(){
 const a=function(a, b){
 b=b||{};return CKEDITOR.tools.extend({id:'ok', type:'button', label:a.lang.common.ok, 'class':'cke_dialog_ui_button_ok', onClick:function(a){
 a=a.data.dialog;!1!==a.fire('ok', {hide:!0}).hide&&a.hide(); 
}}, b, !0); 
};a.type='button';a.override=function(b){
 return CKEDITOR.tools.extend(function(e){
 return a(e, b); 
}, {type:'button'}, !0); 
};return a; 
}(), cancelButton:function(){
 const a=function(a, b){
 b=b||{};return CKEDITOR.tools.extend({id:'cancel', type:'button',
    label:a.lang.common.cancel, 'class':'cke_dialog_ui_button_cancel', onClick:function(a){
 a=a.data.dialog;!1!==a.fire('cancel', {hide:!0}).hide&&a.hide(); 
}}, b, !0); 
};a.type='button';a.override=function(b){
 return CKEDITOR.tools.extend(function(e){
 return a(e, b); 
}, {type:'button'}, !0); 
};return a; 
}(), addUIElement:function(a, b){
 this._.uiElementBuilders[a]=b; 
}});CKEDITOR.dialog._={uiElementBuilders:{}, dialogDefinitions:{}, currentTop:null, currentZIndex:null};CKEDITOR.event.implementOn(CKEDITOR.dialog);CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
    C={resizable:CKEDITOR.DIALOG_RESIZE_BOTH, minWidth:600, minHeight:400, buttons:[CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton]};const D=function(a, b, e){
 for(var d=0, f;f=a[d];d++)if(f.id==b||e&&f[e]&&(f=D(f[e], b, e)))return f;return null; 
}, N=function(a, b, e, d, f){
 if(e){
 for(var c=0, g;g=a[c];c++){
 if(g.id==e)return a.splice(c, 0, b), b;if(d&&g[d]&&(g=N(g[d], b, e, d, !0)))return g; 
}if(f)return null; 
}a.push(b);return b; 
}, J=function(a, b, e){
 for(var d=0, f;f=a[d];d++){
 if(f.id==b)return a.splice(d, 1);if(e&&f[e]&&(f=J(f[e],
    b, e)))return f; 
}return null; 
};d.prototype={getContents:function(a){
 return D(this.contents, a); 
}, getButton:function(a){
 return D(this.buttons, a); 
}, addContents:function(a, b){
 return N(this.contents, a, b); 
}, addButton:function(a, b){
 return N(this.buttons, a, b); 
}, removeContents:function(a){
 J(this.contents, a); 
}, removeButton:function(a){
 J(this.buttons, a); 
}};e.prototype={get:function(a){
 return D(this.elements, a, 'children'); 
}, add:function(a, b){
 return N(this.elements, a, b, 'children'); 
}, remove:function(a){
 J(this.elements, a,
    'children'); 
}};var L={}, Q={};(function(){
 CKEDITOR.ui.dialog={uiElement:function(a, b, e, d, f, c, g){
 if(!(4>arguments.length)){
 var h=(d.call?d(b):d)||'div', k=['\x3c', h, ' '], l=(f&&f.call?f(b):f)||{}, n=(c&&c.call?c(b):c)||{}, m=(g&&g.call?g.call(this, a, b):g)||'', t=this.domId=n.id||`${CKEDITOR.tools.getNextId()}_uiElement`;b.requiredContent&&!a.getParentEditor().filter.check(b.requiredContent)&&(l.display='none', this.notAllowed=!0);n.id=t;let u={};b.type&&(u[`cke_dialog_ui_${b.type}`]=1);b.className&&(u[b.className]=
    1);b.disabled&&(u.cke_disabled=1);for(var v=n['class']&&n['class'].split?n['class'].split(' '):[], t=0;t<v.length;t++)v[t]&&(u[v[t]]=1);v=[];for(t in u)v.push(t);n['class']=v.join(' ');b.title&&(n.title=b.title);u=(b.style||'').split(';');b.align&&(v=b.align, l['margin-left']='left'==v?0:'auto', l['margin-right']='right'==v?0:'auto');for(t in l)u.push(`${t}:${l[t]}`);b.hidden&&u.push('display:none');for(t=u.length-1;0<=t;t--)''===u[t]&&u.splice(t, 1);0<u.length&&(n.style=(n.style?`${n.style}; `:'')+u.join('; '));
    for(t in n)k.push(`${t}\x3d"${CKEDITOR.tools.htmlEncode(n[t])}" `);k.push('\x3e', m, '\x3c/', h, '\x3e');e.push(k.join(''));(this._||(this._={})).dialog=a;'boolean'===typeof b.isChanged&&(this.isChanged=function(){
 return b.isChanged; 
});'function'===typeof b.isChanged&&(this.isChanged=b.isChanged);'function'===typeof b.setValue&&(this.setValue=CKEDITOR.tools.override(this.setValue, function(a){
 return function(e){
 a.call(this, b.setValue.call(this, e)); 
}; 
}));'function'===typeof b.getValue&&(this.getValue=CKEDITOR.tools.override(this.getValue,
    function(a){
 return function(){
 return b.getValue.call(this, a.call(this)); 
}; 
}));CKEDITOR.event.implementOn(this);this.registerEvents(b);this.accessKeyUp&&this.accessKeyDown&&b.accessKey&&A(this, a, `CTRL+${b.accessKey}`);const w=this;a.on('load', function(){
 const b=w.getInputElement();if(b){
 const e=w.type in{checkbox:1, ratio:1}&&CKEDITOR.env.ie&&8>CKEDITOR.env.version?'cke_dialog_ui_focused':'';b.on('focus', function(){
 a._.tabBarMode=!1;a._.hasFocus=!0;w.fire('focus');e&&this.addClass(e); 
});b.on('blur', function(){
 w.fire('blur');
    e&&this.removeClass(e); 
}); 
} 
});CKEDITOR.tools.extend(this, b);this.keyboardFocusable&&(this.tabIndex=b.tabIndex||0, this.focusIndex=a._.focusList.push(this)-1, this.on('focus', function(){
 a._.currentFocusIndex=w.focusIndex; 
})); 
} 
}, hbox:function(a, b, e, d, f){
 if(!(4>arguments.length)){
 this._||(this._={});let c=this._.children=b, g=f&&f.widths||null, h=f&&f.height||null, k, l={role:'presentation'};f&&f.align&&(l.align=f.align);CKEDITOR.ui.dialog.uiElement.call(this, a, f||{type:'hbox'}, d, 'table', {}, l, function(){
 const a=
    ['\x3ctbody\x3e\x3ctr class\x3d"cke_dialog_ui_hbox"\x3e'];for(k=0;k<e.length;k++){
 let b='cke_dialog_ui_hbox_child', d=[];0===k&&(b='cke_dialog_ui_hbox_first');k==e.length-1&&(b='cke_dialog_ui_hbox_last');a.push('\x3ctd class\x3d"', b, '" role\x3d"presentation" ');g?g[k]&&d.push(`width:${B(g[k])}`):d.push(`width:${Math.floor(100/e.length)}%`);h&&d.push(`height:${B(h)}`);f&&void 0!==f.padding&&d.push(`padding:${B(f.padding)}`);CKEDITOR.env.ie&&CKEDITOR.env.quirks&&c[k].align&&d.push(`text-align:${c[k].align}`);
    0<d.length&&a.push(`style\x3d"${d.join('; ')}" `);a.push('\x3e', e[k], '\x3c/td\x3e'); 
}a.push('\x3c/tr\x3e\x3c/tbody\x3e');return a.join(''); 
}); 
} 
}, vbox:function(a, b, e, d, f){
 if(!(3>arguments.length)){
 this._||(this._={});const c=this._.children=b, g=f&&f.width||null, h=f&&f.heights||null;CKEDITOR.ui.dialog.uiElement.call(this, a, f||{type:'vbox'}, d, 'div', null, {role:'presentation'}, function(){
 const b=['\x3ctable role\x3d"presentation" cellspacing\x3d"0" border\x3d"0" '];b.push('style\x3d"');f&&f.expand&&b.push('height:100%;');
    b.push(`width:${B(g||'100%')}`, ';');CKEDITOR.env.webkit&&b.push('float:none;');b.push('"');b.push('align\x3d"', CKEDITOR.tools.htmlEncode(f&&f.align||('ltr'==a.getParentEditor().lang.dir?'left':'right')), '" ');b.push('\x3e\x3ctbody\x3e');for(let d=0;d<e.length;d++){
 const k=[];b.push('\x3ctr\x3e\x3ctd role\x3d"presentation" ');g&&k.push(`width:${B(g||'100%')}`);h?k.push(`height:${B(h[d])}`):f&&f.expand&&k.push(`height:${Math.floor(100/e.length)}%`);f&&void 0!==f.padding&&k.push(`padding:${B(f.padding)}`);CKEDITOR.env.ie&&
    CKEDITOR.env.quirks&&c[d].align&&k.push(`text-align:${c[d].align}`);0<k.length&&b.push('style\x3d"', k.join('; '), '" ');b.push(' class\x3d"cke_dialog_ui_vbox_child"\x3e', e[d], '\x3c/td\x3e\x3c/tr\x3e'); 
}b.push('\x3c/tbody\x3e\x3c/table\x3e');return b.join(''); 
}); 
} 
}}; 
})();CKEDITOR.ui.dialog.uiElement.prototype={getElement:function(){
 return CKEDITOR.document.getById(this.domId); 
}, getInputElement:function(){
 return this.getElement(); 
}, getDialog:function(){
 return this._.dialog; 
}, setValue:function(a, b){
 this.getInputElement().setValue(a);
    !b&&this.fire('change', {value:a});return this; 
}, getValue:function(){
 return this.getInputElement().getValue(); 
}, isChanged:function(){
 return!1; 
}, selectParentTab:function(){
 for(var a=this.getInputElement();(a=a.getParent())&&-1==a.$.className.search('cke_dialog_page_contents'););if(!a)return this;a=a.getAttribute('name');this._.dialog._.currentTabId!=a&&this._.dialog.selectPage(a);return this; 
}, focus:function(){
 this.selectParentTab().getInputElement().focus();return this; 
}, registerEvents:function(a){
 let b=
    /^on([A-Z]\w+)/, e, d=function(a, b, e, d){
 b.on('load', function(){
 a.getInputElement().on(e, d, a); 
}); 
}, f;for(f in a)if(e=f.match(b))this.eventProcessors[f]?this.eventProcessors[f].call(this, this._.dialog, a[f]):d(this, this._.dialog, e[1].toLowerCase(), a[f]);return this; 
}, eventProcessors:{onLoad:function(a, b){
 a.on('load', b, this); 
}, onShow:function(a, b){
 a.on('show', b, this); 
}, onHide:function(a, b){
 a.on('hide', b, this); 
}}, accessKeyDown:function(){
 this.focus(); 
}, accessKeyUp:function(){}, disable:function(){
 const a=this.getElement();
    this.getInputElement().setAttribute('disabled', 'true');a.addClass('cke_disabled'); 
}, enable:function(){
 const a=this.getElement();this.getInputElement().removeAttribute('disabled');a.removeClass('cke_disabled'); 
}, isEnabled:function(){
 return!this.getElement().hasClass('cke_disabled'); 
}, isVisible:function(){
 return this.getInputElement().isVisible(); 
}, isFocusable:function(){
 return this.isEnabled()&&this.isVisible()?!0:!1; 
}};CKEDITOR.ui.dialog.hbox.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement,
    {getChild:function(a){
 if(1>arguments.length)return this._.children.concat();a.splice||(a=[a]);return 2>a.length?this._.children[a[0]]:this._.children[a[0]]&&this._.children[a[0]].getChild?this._.children[a[0]].getChild(a.slice(1, a.length)):null; 
}}, !0);CKEDITOR.ui.dialog.vbox.prototype=new CKEDITOR.ui.dialog.hbox;(function(){
 const a={build:function(a, b, e){
 for(var d=b.children, f, c=[], g=[], h=0;h<d.length&&(f=d[h]);h++){
 const k=[];c.push(k);g.push(CKEDITOR.dialog._.uiElementBuilders[f.type].build(a, f, k)); 
}return new CKEDITOR.ui.dialog[b.type](a,
    g, c, e, b); 
}};CKEDITOR.dialog.addUIElement('hbox', a);CKEDITOR.dialog.addUIElement('vbox', a); 
})();CKEDITOR.dialogCommand=function(a, b){
 this.dialogName=a;CKEDITOR.tools.extend(this, b, !0); 
};CKEDITOR.dialogCommand.prototype={exec:function(a){
 const b=this.tabId;a.openDialog(this.dialogName, function(a){
 b&&a.selectPage(b); 
}); 
}, canUndo:!1, editorFocus:1};(function(){
 const a=/^([a]|[^a])+$/, b=/^\d*$/, e=/^\d*(?:\.\d+)?$/, d=/^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/, f=/^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
    c=/^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;CKEDITOR.VALIDATE_OR=1;CKEDITOR.VALIDATE_AND=2;CKEDITOR.dialog.validate={functions:function(){
 const a=arguments;return function(){
 let b=this&&this.getValue?this.getValue():a[0], e, d=CKEDITOR.VALIDATE_AND, f=[], c;for(c=0;c<a.length;c++)if('function'===typeof a[c])f.push(a[c]);else break;c<a.length&&'string'===typeof a[c]&&(e=a[c], c++);c<a.length&&'number'===typeof a[c]&&(d=a[c]);let g=d==CKEDITOR.VALIDATE_AND?!0:!1;for(c=0;c<f.length;c++)g=d==CKEDITOR.VALIDATE_AND?g&&
    f[c](b):g||f[c](b);return g?!0:e; 
}; 
}, regex:function(a, b){
 return function(e){
 e=this&&this.getValue?this.getValue():e;return a.test(e)?!0:b; 
}; 
}, notEmpty:function(b){
 return this.regex(a, b); 
}, integer:function(a){
 return this.regex(b, a); 
}, number:function(a){
 return this.regex(e, a); 
}, cssLength:function(a){
 return this.functions(function(a){
 return f.test(CKEDITOR.tools.trim(a)); 
}, a); 
}, htmlLength:function(a){
 return this.functions(function(a){
 return d.test(CKEDITOR.tools.trim(a)); 
}, a); 
}, inlineStyle:function(a){
 return this.functions(function(a){
 return c.test(CKEDITOR.tools.trim(a)); 
},
    a); 
}, equals:function(a, b){
 return this.functions(function(b){
 return b==a; 
}, b); 
}, notEqual:function(a, b){
 return this.functions(function(b){
 return b!=a; 
}, b); 
}};CKEDITOR.on('instanceDestroyed', function(a){
 if(CKEDITOR.tools.isEmpty(CKEDITOR.instances)){
 for(var b;b=CKEDITOR.dialog._.currentTop;)b.hide();for(const e in L)L[e].remove();L={}; 
}a=a.editor._.storedDialogs;for(const d in a)a[d].destroy(); 
}); 
})();CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {openDialog:function(a, b, e){
 let d=null, f=CKEDITOR.dialog._.dialogDefinitions[a];
    null===CKEDITOR.dialog._.currentTop&&q(this);if('function'===typeof f)f=this._.storedDialogs||(this._.storedDialogs={}), d=f[a]||(f[a]=new CKEDITOR.dialog(this, a)), d.setModel(e), b&&b.call(d, d), d.show();else{
 if('failed'==f)throw v(this), Error(`[CKEDITOR.dialog.openDialog] Dialog "${a}" failed when loading definition.`);'string'===typeof f&&CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(f), function(){
 'function'!==typeof CKEDITOR.dialog._.dialogDefinitions[a]&&(CKEDITOR.dialog._.dialogDefinitions[a]='failed');
    this.openDialog(a, b, e); 
}, this, 0, 1); 
}CKEDITOR.skin.loadPart('dialog');if(d)d.once('hide', function(){
 d.setModel(null); 
}, null, null, 999);return d; 
}});CKEDITOR.plugins.add('dialog', {requires:'dialogui', init:function(a){
 F||(CKEDITOR.document.appendStyleSheet(`${this.path}styles/dialog.css`), F=!0);a.on('doubleclick', function(b){
 b.data.dialog&&a.openDialog(b.data.dialog); 
}, null, null, 999); 
}}); 
}(), function(){
 CKEDITOR.plugins.add('a11yhelp', {requires:'dialog', availableLangs:{af:1, ar:1, az:1, bg:1, ca:1, cs:1, cy:1, da:1, de:1,
    'de-ch':1, el:1, en:1, 'en-au':1, 'en-gb':1, eo:1, es:1, 'es-mx':1, et:1, eu:1, fa:1, fi:1, fo:1, fr:1, 'fr-ca':1, gl:1, gu:1, he:1, hi:1, hr:1, hu:1, id:1, it:1, ja:1, km:1, ko:1, ku:1, lt:1, lv:1, mk:1, mn:1, nb:1, nl:1, no:1, oc:1, pl:1, pt:1, 'pt-br':1, ro:1, ru:1, si:1, sk:1, sl:1, sq:1, sr:1, 'sr-latn':1, sv:1, th:1, tr:1, tt:1, ug:1, uk:1, vi:1, zh:1, 'zh-cn':1}, init:function(c){
 const h=this;c.addCommand('a11yHelp', {exec:function(){
 var g=c.langCode, g=h.availableLangs[g]?g:h.availableLangs[g.replace(/-.*/, '')]?g.replace(/-.*/, ''):'en';CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(`${h.path
    }dialogs/lang/${g}.js`), function(){
 c.lang.a11yhelp=h.langEntries[g];c.openDialog('a11yHelp'); 
}); 
}, modes:{wysiwyg:1, source:1}, readOnly:1, canUndo:!1});c.setKeystroke(CKEDITOR.ALT+48, 'a11yHelp');CKEDITOR.dialog.add('a11yHelp', `${this.path}dialogs/a11yhelp.js`);c.on('ariaEditorHelpLabel', function(g){
 g.data.label=c.lang.common.editorHelp; 
}); 
}}); 
}(), CKEDITOR.plugins.add('about', {requires:'dialog', init:function(c){
 const h=c.addCommand('about', new CKEDITOR.dialogCommand('about'));h.modes={wysiwyg:1, source:1};h.canUndo=
    !1;h.readOnly=1;c.ui.addButton&&c.ui.addButton('About', {label:c.lang.about.dlgTitle, command:'about', toolbar:'about'});CKEDITOR.dialog.add('about', `${this.path}dialogs/about.js`); 
}}), CKEDITOR.plugins.add('basicstyles', {init:function(c){
 var h=0, g=function(f, g, b, d){
 if(d){
 d=new CKEDITOR.style(d);const e=a[b];e.unshift(d);c.attachStyleStateChange(d, function(a){
 !c.readOnly&&c.getCommand(b).setState(a); 
});c.addCommand(b, new CKEDITOR.styleCommand(d, {contentForms:e}));c.ui.addButton&&c.ui.addButton(f, {label:g, command:b,
    toolbar:`basicstyles,${h+=10}`}); 
} 
}, a={bold:['strong', 'b', ['span', function(a){
 a=a.styles['font-weight'];return'bold'==a||700<=+a; 
}]], italic:['em', 'i', ['span', function(a){
 return'italic'==a.styles['font-style']; 
}]], underline:['u', ['span', function(a){
 return'underline'==a.styles['text-decoration']; 
}]], strike:['s', 'strike', ['span', function(a){
 return'line-through'==a.styles['text-decoration']; 
}]], subscript:['sub'], superscript:['sup']}, f=c.config, m=c.lang.basicstyles;g('Bold', m.bold, 'bold', f.coreStyles_bold);
    g('Italic', m.italic, 'italic', f.coreStyles_italic);g('Underline', m.underline, 'underline', f.coreStyles_underline);g('Strike', m.strike, 'strike', f.coreStyles_strike);g('Subscript', m.subscript, 'subscript', f.coreStyles_subscript);g('Superscript', m.superscript, 'superscript', f.coreStyles_superscript);c.setKeystroke([[CKEDITOR.CTRL+66, 'bold'], [CKEDITOR.CTRL+73, 'italic'], [CKEDITOR.CTRL+85, 'underline']]); 
}}), CKEDITOR.config.coreStyles_bold={element:'strong', overrides:'b'}, CKEDITOR.config.coreStyles_italic={element:'em',
    overrides:'i'}, CKEDITOR.config.coreStyles_underline={element:'u'}, CKEDITOR.config.coreStyles_strike={element:'s', overrides:'strike'}, CKEDITOR.config.coreStyles_subscript={element:'sub'}, CKEDITOR.config.coreStyles_superscript={element:'sup'}, function(){
 function c(a, b, d, f){
 if(!a.isReadOnly()&&!a.equals(d.editable())){
 CKEDITOR.dom.element.setMarker(f, a, 'bidi_processed', 1);f=a;for(let c=d.editable();(f=f.getParent())&&!f.equals(c);)if(f.getCustomData('bidi_processed')){
 a.removeStyle('direction');a.removeAttribute('dir');
    return; 
}f='useComputedState'in d.config?d.config.useComputedState:1;(f?a.getComputedStyle('direction'):a.getStyle('direction')||a.hasAttribute('dir'))!=b&&(a.removeStyle('direction'), f?(a.removeAttribute('dir'), b!=a.getComputedStyle('direction')&&a.setAttribute('dir', b)):a.setAttribute('dir', b), d.forceNextSelectionCheck()); 
} 
}function h(a, b, d){
 let f=a.getCommonAncestor(!1, !0);a=a.clone();a.enlarge(d==CKEDITOR.ENTER_BR?CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:CKEDITOR.ENLARGE_BLOCK_CONTENTS);if(a.checkBoundaryOfElement(f,
    CKEDITOR.START)&&a.checkBoundaryOfElement(f, CKEDITOR.END)){
 for(var c;f&&f.type==CKEDITOR.NODE_ELEMENT&&(c=f.getParent())&&1==c.getChildCount()&&!(f.getName()in b);)f=c;return f.type==CKEDITOR.NODE_ELEMENT&&f.getName()in b&&f; 
} 
}function g(a){
 return{context:'p', allowedContent:{'h1 h2 h3 h4 h5 h6 table ul ol blockquote div tr p div li td':{propertiesOnly:!0, attributes:'dir'}}, requiredContent:'p[dir]', refresh:function(a, b){
 var e=a.config.useComputedState, d, e=void 0===e||e;if(!e){
 d=b.lastElement;for(var f=
    a.editable();d&&!(d.getName()in k||d.equals(f));){
 const c=d.getParent();if(!c)break;d=c; 
} 
}d=d||b.block||b.blockLimit;d.equals(a.editable())&&(f=a.getSelection().getRanges()[0].getEnclosedNode())&&f.type==CKEDITOR.NODE_ELEMENT&&(d=f);d&&(e=e?d.getComputedStyle('direction'):d.getStyle('direction')||d.getAttribute('dir'), a.getCommand('bidirtl').setState('rtl'==e?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF), a.getCommand('bidiltr').setState('ltr'==e?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF));e=(b.block||
    b.blockLimit||a.editable()).getDirection(1);e!=(a._.selDir||a.lang.dir)&&(a._.selDir=e, a.fire('contentDirChanged', e)); 
}, exec:function(b){
 var d=b.getSelection(), g=b.config.enterMode, k=d.getRanges();if(k&&k.length){
 for(var l={}, v=d.createBookmarks(), k=k.createIterator(), w, u=0;w=k.getNextRange(1);){
 let A=w.getEnclosedNode();A&&(!A||A.type==CKEDITOR.NODE_ELEMENT&&A.getName()in m)||(A=h(w, f, g));A&&c(A, a, b, l);var r=new CKEDITOR.dom.walker(w), y=v[u].startNode, z=v[u++].endNode;r.evaluator=function(a){
 let b=
    g==CKEDITOR.ENTER_P?'p':'div', e;if(e=(a?a.type==CKEDITOR.NODE_ELEMENT:!1)&&a.getName()in f){
 if(b=a.is(b))b=(b=a.getParent())?b.type==CKEDITOR.NODE_ELEMENT:!1;e=!(b&&a.getParent().is('blockquote')); 
}return!!(e&&a.getPosition(y)&CKEDITOR.POSITION_FOLLOWING&&(a.getPosition(z)&CKEDITOR.POSITION_PRECEDING+CKEDITOR.POSITION_CONTAINS)==CKEDITOR.POSITION_PRECEDING); 
};for(;A=r.next();)c(A, a, b, l);w=w.createIterator();for(w.enlargeBr=g!=CKEDITOR.ENTER_BR;A=w.getNextParagraph(g==CKEDITOR.ENTER_P?'p':'div');)c(A,
    a, b, l); 
}CKEDITOR.dom.element.clearAllMarkers(l);b.forceNextSelectionCheck();d.selectBookmarks(v);b.focus(); 
} 
}}; 
}function a(a){
 const b=a==l.setAttribute, d=a==l.removeAttribute, f=/\bdirection\s*:\s*(.*?)\s*(:?$|;)/;return function(c, g){
 if(!this.isReadOnly()){
 let h;if(h=c==(b||d?'dir':'direction')||'style'==c&&(d||f.test(g))){
 a:{
 h=this;for(var k=h.getDocument().getBody().getParent();h;){
 if(h.equals(k)){
 h=!1;break a; 
}h=h.getParent(); 
}h=!0; 
}h=!h; 
}if(h&&(h=this.getDirection(1), k=a.apply(this, arguments), h!=this.getDirection(1)))return this.getDocument().fire('dirChanged',
    this), k; 
}return a.apply(this, arguments); 
}; 
}var f={table:1, ul:1, ol:1, blockquote:1, div:1}, m={}, k={};CKEDITOR.tools.extend(m, f, {tr:1, p:1, div:1, li:1});CKEDITOR.tools.extend(k, m, {td:1});CKEDITOR.plugins.add('bidi', {init:function(a){
 function b(d, f, c, g, h){
 a.addCommand(c, new CKEDITOR.command(a, g));a.ui.addButton&&a.ui.addButton(d, {label:f, command:c, toolbar:`bidi,${h}`}); 
}if(!a.blockless){
 const d=a.lang.bidi;b('BidiLtr', d.ltr, 'bidiltr', g('ltr'), 10);b('BidiRtl', d.rtl, 'bidirtl', g('rtl'), 20);a.on('contentDom', function(){
 a.document.on('dirChanged',
    function(b){
 a.fire('dirChanged', {node:b.data, dir:b.data.getDirection(1)}); 
}); 
});a.on('contentDirChanged', function(b){
 b=`${a.lang.dir!=b.data?'add':'remove'}Class`;const d=a.ui.space(a.config.toolbarLocation);if(d)d[b]('cke_mixed_dir_content'); 
}); 
} 
}});for(var l=CKEDITOR.dom.element.prototype, b=['setStyle', 'removeStyle', 'setAttribute', 'removeAttribute'], d=0;d<b.length;d++)l[b[d]]=CKEDITOR.tools.override(l[b[d]], a); 
}(), function(){
 const c={exec:function(c){
 let g=c.getCommand('blockquote').state, a=c.getSelection(),
    f=a&&a.getRanges()[0];if(f){
 const m=a.createBookmarks();if(CKEDITOR.env.ie){
 var k=m[0].startNode, l=m[0].endNode, b;if(k&&'blockquote'==k.getParent().getName())for(b=k;b=b.getNext();)if(b.type==CKEDITOR.NODE_ELEMENT&&b.isBlockBoundary()){
 k.move(b, !0);break; 
}if(l&&'blockquote'==l.getParent().getName())for(b=l;b=b.getPrevious();)if(b.type==CKEDITOR.NODE_ELEMENT&&b.isBlockBoundary()){
 l.move(b);break; 
} 
}var d=f.createIterator();d.enlargeBr=c.config.enterMode!=CKEDITOR.ENTER_BR;if(g==CKEDITOR.TRISTATE_OFF){
 for(k=
    [];g=d.getNextParagraph();)k.push(g);1>k.length&&(g=c.document.createElement(c.config.enterMode==CKEDITOR.ENTER_P?'p':'div'), l=m.shift(), f.insertNode(g), g.append(new CKEDITOR.dom.text('﻿', c.document)), f.moveToBookmark(l), f.selectNodeContents(g), f.collapse(!0), l=f.createBookmark(), k.push(g), m.unshift(l));b=k[0].getParent();f=[];for(l=0;l<k.length;l++)g=k[l], b=b.getCommonAncestor(g.getParent());for(g={table:1, tbody:1, tr:1, ol:1, ul:1};g[b.getName()];)b=b.getParent();for(l=null;0<k.length;){
 for(g=k.shift();!g.getParent().equals(b);)g=
    g.getParent();g.equals(l)||f.push(g);l=g; 
}for(;0<f.length;)if(g=f.shift(), 'blockquote'==g.getName()){
 for(l=new CKEDITOR.dom.documentFragment(c.document);g.getFirst();)l.append(g.getFirst().remove()), k.push(l.getLast());l.replace(g); 
}else k.push(g);f=c.document.createElement('blockquote');for(f.insertBefore(k[0]);0<k.length;)g=k.shift(), f.append(g); 
}else if(g==CKEDITOR.TRISTATE_ON){
 l=[];for(b={};g=d.getNextParagraph();){
 for(k=f=null;g.getParent();){
 if('blockquote'==g.getParent().getName()){
 f=g.getParent();
    k=g;break; 
}g=g.getParent(); 
}f&&k&&!k.getCustomData('blockquote_moveout')&&(l.push(k), CKEDITOR.dom.element.setMarker(b, k, 'blockquote_moveout', !0)); 
}CKEDITOR.dom.element.clearAllMarkers(b);g=[];k=[];for(b={};0<l.length;)d=l.shift(), f=d.getParent(), d.getPrevious()?d.getNext()?(d.breakParent(d.getParent()), k.push(d.getNext())):d.remove().insertAfter(f):d.remove().insertBefore(f), f.getCustomData('blockquote_processed')||(k.push(f), CKEDITOR.dom.element.setMarker(b, f, 'blockquote_processed', !0)), g.push(d);CKEDITOR.dom.element.clearAllMarkers(b);
    for(l=k.length-1;0<=l;l--){
 f=k[l];a:{
 b=f;for(var d=0, e=b.getChildCount(), n=void 0;d<e&&(n=b.getChild(d));d++)if(n.type==CKEDITOR.NODE_ELEMENT&&n.isBlockBoundary()){
 b=!1;break a; 
}b=!0; 
}b&&f.remove(); 
}if(c.config.enterMode==CKEDITOR.ENTER_BR)for(f=!0;g.length;)if(d=g.shift(), 'div'==d.getName()){
 l=new CKEDITOR.dom.documentFragment(c.document);!f||!d.getPrevious()||d.getPrevious().type==CKEDITOR.NODE_ELEMENT&&d.getPrevious().isBlockBoundary()||l.append(c.document.createElement('br'));for(f=d.getNext()&&
    !(d.getNext().type==CKEDITOR.NODE_ELEMENT&&d.getNext().isBlockBoundary());d.getFirst();)d.getFirst().remove().appendTo(l);f&&l.append(c.document.createElement('br'));l.replace(d);f=!1; 
} 
}a.selectBookmarks(m);c.focus(); 
} 
}, refresh:function(c, g){
 this.setState(c.elementPath(g.block||g.blockLimit).contains('blockquote', 1)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF); 
}, context:'blockquote', allowedContent:'blockquote', requiredContent:'blockquote'};CKEDITOR.plugins.add('blockquote', {init:function(h){
 h.blockless||
    (h.addCommand('blockquote', c), h.ui.addButton&&h.ui.addButton('Blockquote', {label:h.lang.blockquote.toolbar, command:'blockquote', toolbar:'blocks,10'})); 
}}); 
}(), 'use strict', function(){
 function c(c, a){
 CKEDITOR.tools.extend(this, a, {editor:c, id:`cke-${CKEDITOR.tools.getUniqueId()}`, area:c._.notificationArea});a.type||(this.type='info');this.element=this._createElement();c.plugins.clipboard&&CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(this.element); 
}function h(c){
 const a=this;this.editor=c;this.notifications=
    [];this.element=this._createElement();this._uiBuffer=CKEDITOR.tools.eventsBuffer(10, this._layout, this);this._changeBuffer=CKEDITOR.tools.eventsBuffer(500, this._layout, this);c.on('destroy', function(){
 a._removeListeners();a.element.remove(); 
}); 
}CKEDITOR.plugins.add('notification', {init:function(c){
 function a(a){
 const c=new CKEDITOR.dom.element('div');c.setStyles({position:'fixed', 'margin-left':'-9999px'});c.setAttributes({'aria-live':'assertive', 'aria-atomic':'true'});c.setText(a);CKEDITOR.document.getBody().append(c);
    setTimeout(function(){
 c.remove(); 
}, 100); 
}c._.notificationArea=new h(c);c.showNotification=function(a, h, k){
 let l, b;'progress'==h?l=k:b=k;a=new CKEDITOR.plugins.notification(c, {message:a, type:h, progress:l, duration:b});a.show();return a; 
};c.on('key', function(f){
 if(27==f.data.keyCode){
 const h=c._.notificationArea.notifications;h.length&&(a(c.lang.notification.closed), h[h.length-1].hide(), f.cancel()); 
} 
}); 
}});c.prototype={show:function(){
 !1!==this.editor.fire('notificationShow', {notification:this})&&(this.area.add(this),
    this._hideAfterTimeout()); 
}, update:function(c){
 let a=!0;!1===this.editor.fire('notificationUpdate', {notification:this, options:c})&&(a=!1);let f=this.element, h=f.findOne('.cke_notification_message'), k=f.findOne('.cke_notification_progress'), l=c.type;f.removeAttribute('role');c.progress&&'progress'!=this.type&&(l='progress');l&&(f.removeClass(this._getClass()), f.removeAttribute('aria-label'), this.type=l, f.addClass(this._getClass()), f.setAttribute('aria-label', this.type), 'progress'!=this.type||k?'progress'!=
    this.type&&k&&k.remove():(k=this._createProgressElement(), k.insertBefore(h)));void 0!==c.message&&(this.message=c.message, h.setHtml(this.message));void 0!==c.progress&&(this.progress=c.progress, k&&k.setStyle('width', this._getPercentageProgress()));a&&c.important&&(f.setAttribute('role', 'alert'), this.isVisible()||this.area.add(this));this.duration=c.duration;this._hideAfterTimeout(); 
}, hide:function(){
 !1!==this.editor.fire('notificationHide', {notification:this})&&this.area.remove(this); 
}, isVisible:function(){
 return 0<=
    CKEDITOR.tools.indexOf(this.area.notifications, this); 
}, _createElement:function(){
 let c=this, a, f, h=this.editor.lang.common.close;a=new CKEDITOR.dom.element('div');a.addClass('cke_notification');a.addClass(this._getClass());a.setAttributes({id:this.id, role:'alert', 'aria-label':this.type});'progress'==this.type&&a.append(this._createProgressElement());f=new CKEDITOR.dom.element('p');f.addClass('cke_notification_message');f.setHtml(this.message);a.append(f);f=CKEDITOR.dom.element.createFromHtml(`\x3ca class\x3d"cke_notification_close" href\x3d"javascript:void(0)" title\x3d"${
    h}" role\x3d"button" tabindex\x3d"-1"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e`);a.append(f);f.on('click', function(){
 c.editor.focus();c.hide(); 
});return a; 
}, _getClass:function(){
 return'progress'==this.type?'cke_notification_info':`cke_notification_${this.type}`; 
}, _createProgressElement:function(){
 const c=new CKEDITOR.dom.element('span');c.addClass('cke_notification_progress');c.setStyle('width', this._getPercentageProgress());return c; 
}, _getPercentageProgress:function(){
 return `${Math.round(100*
    (this.progress||0))}%`; 
}, _hideAfterTimeout:function(){
 let c=this, a;this._hideTimeoutId&&clearTimeout(this._hideTimeoutId);if('number'===typeof this.duration)a=this.duration;else if('info'==this.type||'success'==this.type)a='number'===typeof this.editor.config.notification_duration?this.editor.config.notification_duration:5E3;a&&(c._hideTimeoutId=setTimeout(function(){
 c.hide(); 
}, a)); 
}};h.prototype={add:function(c){
 this.notifications.push(c);this.element.append(c.element);1==this.element.getChildCount()&&
    (CKEDITOR.document.getBody().append(this.element), this._attachListeners());this._layout(); 
}, remove:function(c){
 const a=CKEDITOR.tools.indexOf(this.notifications, c);0>a||(this.notifications.splice(a, 1), c.element.remove(), this.element.getChildCount()||(this._removeListeners(), this.element.remove())); 
}, _createElement:function(){
 const c=this.editor, a=c.config, f=new CKEDITOR.dom.element('div');f.addClass('cke_notifications_area');f.setAttribute('id', `cke_notifications_area_${c.name}`);f.setStyle('z-index', a.baseFloatZIndex-
    2);return f; 
}, _attachListeners:function(){
 const c=CKEDITOR.document.getWindow(), a=this.editor;c.on('scroll', this._uiBuffer.input);c.on('resize', this._uiBuffer.input);a.on('change', this._changeBuffer.input);a.on('floatingSpaceLayout', this._layout, this, null, 20);a.on('blur', this._layout, this, null, 20); 
}, _removeListeners:function(){
 const c=CKEDITOR.document.getWindow(), a=this.editor;c.removeListener('scroll', this._uiBuffer.input);c.removeListener('resize', this._uiBuffer.input);a.removeListener('change', this._changeBuffer.input);
    a.removeListener('floatingSpaceLayout', this._layout);a.removeListener('blur', this._layout); 
}, _layout:function(){
 function c(){
 a.setStyle('left', w(u+h.width-n-t)); 
}var a=this.element, f=this.editor, h=f.ui.contentsElement.getClientRect(), k=f.ui.contentsElement.getDocumentPosition(), l, b, d=a.getClientRect(), e, n=this._notificationWidth, t=this._notificationMargin;e=CKEDITOR.document.getWindow();var x=e.getScrollPosition(), p=e.getViewPaneSize(), q=CKEDITOR.document.getBody(), v=q.getDocumentPosition(), w=CKEDITOR.tools.cssLength;
    n&&t||(e=this.element.getChild(0), n=this._notificationWidth=e.getClientRect().width, t=this._notificationMargin=parseInt(e.getComputedStyle('margin-left'), 10)+parseInt(e.getComputedStyle('margin-right'), 10));f.toolbar&&(l=f.ui.space(f.config.toolbarLocation), b=l.getClientRect());l&&l.isVisible()&&b.bottom>h.top&&b.bottom<h.bottom-d.height?a.setStyles({position:'fixed', top:w(b.bottom)}):0<h.top?a.setStyles({position:'absolute', top:w(k.y)}):k.y+h.height-d.height>x.y?a.setStyles({position:'fixed', top:0}):
    a.setStyles({position:'absolute', top:w(k.y+h.height-d.height)});var u='fixed'==a.getStyle('position')?h.left:'static'!=q.getComputedStyle('position')?k.x-v.x:k.x;h.width<n+t?k.x+n+t>x.x+p.width?c():a.setStyle('left', w(u)):k.x+n+t>x.x+p.width?a.setStyle('left', w(u)):k.x+h.width/2+n/2+t>x.x+p.width?a.setStyle('left', w(u-k.x+x.x+p.width-n-t)):0>h.left+h.width-n-t?c():0>h.left+h.width/2-n/2?a.setStyle('left', w(u-k.x+x.x)):a.setStyle('left', w(u+h.width/2-n/2-t/2)); 
}};CKEDITOR.plugins.notification=c; 
}(),
    function(){
 var c=`\x3ca id\x3d"{id}" class\x3d"cke_button cke_button__{name} cke_button_{state} {cls}"${CKEDITOR.env.gecko&&!CKEDITOR.env.hc?'':' href\x3d"javascript:void(\'{titleJs}\')"'} title\x3d"{title}" tabindex\x3d"-1" hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasArrow}" aria-disabled\x3d"{ariaDisabled}"`;CKEDITOR.env.gecko&&CKEDITOR.env.mac&&(c+=' onkeypress\x3d"return false;"');CKEDITOR.env.gecko&&(c+=
    ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');let h='';CKEDITOR.env.ie&&(h='return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26');var c=`${c} onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" onclick\x3d"${h}CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{style}"`+
    '\x3e\x26nbsp;\x3c/span\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_button_label cke_button__{name}_label" aria-hidden\x3d"false"\x3e{label}\x3c/span\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_button_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e{arrowHtml}\x3c/a\x3e', g=CKEDITOR.addTemplate('buttonArrow', `\x3cspan class\x3d"cke_button_arrow"\x3e${CKEDITOR.env.hc?'\x26#9660;':''}\x3c/span\x3e`), a=CKEDITOR.addTemplate('button', c);CKEDITOR.plugins.add('button', {beforeInit:function(a){
 a.ui.addHandler(CKEDITOR.UI_BUTTON,
    CKEDITOR.ui.button.handler); 
}});CKEDITOR.UI_BUTTON='button';CKEDITOR.ui.button=function(a){
 CKEDITOR.tools.extend(this, a, {title:a.label, click:a.click||function(c){
 c.execCommand(a.command); 
}});this._={}; 
};CKEDITOR.ui.button.handler={create:function(a){
 return new CKEDITOR.ui.button(a); 
}};CKEDITOR.ui.button.prototype={render:function(f, c){
 function h(){
 let a=f.mode;a&&(a=this.modes[a]?void 0!==l[a]?l[a]:CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED, a=f.readOnly&&!this.readOnly?CKEDITOR.TRISTATE_DISABLED:
    a, this.setState(a), this.refresh&&this.refresh()); 
}var l=null, b=CKEDITOR.env, d=this._.id=CKEDITOR.tools.getNextId(), e='', n=this.command, t, x, p;this._.editor=f;let q={id:d, button:this, editor:f, focus:function(){
 CKEDITOR.document.getById(d).focus(); 
}, execute:function(){
 this.button.click(f); 
}, attach:function(a){
 this.button.attach(a); 
}}, v=CKEDITOR.tools.addFunction(function(a){
 if(q.onkey)return a=new CKEDITOR.dom.event(a), !1!==q.onkey(q, a.getKeystroke()); 
}), w=CKEDITOR.tools.addFunction(function(a){
 let b;q.onfocus&&
    (b=!1!==q.onfocus(q, new CKEDITOR.dom.event(a)));return b; 
}), u=0;q.clickFn=t=CKEDITOR.tools.addFunction(function(){
 u&&(f.unlockSelection(1), u=0);q.execute();b.iOS&&f.focus(); 
});this.modes?(l={}, f.on('beforeModeUnload', function(){
 f.mode&&this._.state!=CKEDITOR.TRISTATE_DISABLED&&(l[f.mode]=this._.state); 
}, this), f.on('activeFilterChange', h, this), f.on('mode', h, this), !this.readOnly&&f.on('readOnly', h, this)):n&&(n=f.getCommand(n))&&(n.on('state', function(){
 this.setState(n.state); 
}, this), e+=n.state==CKEDITOR.TRISTATE_ON?
    'on':n.state==CKEDITOR.TRISTATE_DISABLED?'disabled':'off');let A;if(this.directional)f.on('contentDirChanged', function(a){
 const b=CKEDITOR.document.getById(this._.id), e=b.getFirst();a=a.data;a!=f.lang.dir?b.addClass(`cke_${a}`):b.removeClass('cke_ltr').removeClass('cke_rtl');e.setAttribute('style', CKEDITOR.skin.getIconStyle(A, 'rtl'==a, this.icon, this.iconOffset)); 
}, this);n?(x=f.getCommandKeystroke(n))&&(p=CKEDITOR.tools.keystrokeToString(f.lang.common.keyboard, x)):e+='off';x=this.name||this.command;let r=
    null, y=this.icon;A=x;this.icon&&!/\./.test(this.icon)?(A=this.icon, y=null):(this.icon&&(r=this.icon), CKEDITOR.env.hidpi&&this.iconHiDpi&&(r=this.iconHiDpi));r?(CKEDITOR.skin.addIcon(r, r), y=null):r=A;e={id:d, name:x, iconName:A, label:this.label, cls:(this.hasArrow?'cke_button_expandable ':'')+(this.className||''), state:e, ariaDisabled:'disabled'==e?'true':'false', title:this.title+(p?` (${p.display})`:''), ariaShortcut:p?`${f.lang.common.keyboardShortcut} ${p.aria}`:'', titleJs:b.gecko&&!b.hc?'':(this.title||
    '').replace('\'', ''), hasArrow:'string'===typeof this.hasArrow&&this.hasArrow||(this.hasArrow?'true':'false'), keydownFn:v, focusFn:w, clickFn:t, style:CKEDITOR.skin.getIconStyle(r, 'rtl'==f.lang.dir, y, this.iconOffset), arrowHtml:this.hasArrow?g.output():''};a.output(e, c);if(this.onRender)this.onRender();return q; 
}, setState:function(a){
 if(this._.state==a)return!1;this._.state=a;const c=CKEDITOR.document.getById(this._.id);return c?(c.setState(a, 'cke_button'), c.setAttribute('aria-disabled', a==CKEDITOR.TRISTATE_DISABLED),
    this.hasArrow?c.setAttribute('aria-expanded', a==CKEDITOR.TRISTATE_ON):a===CKEDITOR.TRISTATE_ON?c.setAttribute('aria-pressed', !0):c.removeAttribute('aria-pressed'), !0):!1; 
}, getState:function(){
 return this._.state; 
}, toFeature:function(a){
 if(this._.feature)return this._.feature;let c=this;this.allowedContent||this.requiredContent||!this.command||(c=a.getCommand(this.command)||c);return this._.feature=c; 
}};CKEDITOR.ui.prototype.addButton=function(a, c){
 this.add(a, CKEDITOR.UI_BUTTON, c); 
}; 
}(), function(){
 function c(a){
 function c(){
 for(var b=
    g(), e=CKEDITOR.tools.clone(a.config.toolbarGroups)||h(a), d=0;d<e.length;d++){
 let m=e[d];if('/'!=m){
 'string'===typeof m&&(m=e[d]={name:m});var q, v=m.groups;if(v)for(let w=0;w<v.length;w++)q=v[w], (q=b[q])&&l(m, q);(q=b[m.name])&&l(m, q); 
} 
}return e; 
}function g(){
 let b={}, e, d, c;for(e in a.ui.items)d=a.ui.items[e], c=d.toolbar||'others', c=c.split(','), d=c[0], c=parseInt(c[1]||-1, 10), b[d]||(b[d]=[]), b[d].push({name:e, order:c});for(d in b)b[d]=b[d].sort(function(a, b){
 return a.order==b.order?0:0>b.order?-1:0>a.order?
    1:a.order<b.order?-1:1; 
});return b; 
}function l(b, e){
 if(e.length){
 b.items?b.items.push(a.ui.create('-')):b.items=[];for(var c;c=e.shift();)c='string'===typeof c?c:c.name, d&&-1!=CKEDITOR.tools.indexOf(d, c)||(c=a.ui.create(c))&&a.addFeature(c)&&b.items.push(c); 
} 
}function b(a){
 let b=[], e, d, c;for(e=0;e<a.length;++e)d=a[e], c={}, '/'==d?b.push(d):CKEDITOR.tools.isArray(d)?(l(c, CKEDITOR.tools.clone(d)), b.push(c)):d.items&&(l(c, CKEDITOR.tools.clone(d.items)), c.name=d.name, b.push(c));return b; 
}var d=a.config.removeButtons,
    d=d&&d.split(','), e=a.config.toolbar;'string'===typeof e&&(e=a.config[`toolbar_${e}`]);return a.toolbar=e?b(e):c(); 
}function h(a){
 return a._.toolbarGroups||(a._.toolbarGroups=[{name:'document', groups:['mode', 'document', 'doctools']}, {name:'clipboard', groups:['clipboard', 'undo']}, {name:'editing', groups:['find', 'selection', 'spellchecker']}, {name:'forms'}, '/', {name:'basicstyles', groups:['basicstyles', 'cleanup']}, {name:'paragraph', groups:['list', 'indent', 'blocks', 'align', 'bidi']}, {name:'links'}, {name:'insert'},
    '/', {name:'styles'}, {name:'colors'}, {name:'tools'}, {name:'others'}, {name:'about'}]); 
}const g=function(){
 this.toolbars=[];this.focusCommandExecuted=!1; 
};g.prototype.focus=function(){
 for(var a=0, c;c=this.toolbars[a++];)for(var g=0, h;h=c.items[g++];)if(h.focus){
 h.focus();return; 
} 
};const a={modes:{wysiwyg:1, source:1}, readOnly:1, exec:function(a){
 a.toolbox&&(a.toolbox.focusCommandExecuted=!0, CKEDITOR.env.ie||CKEDITOR.env.air?setTimeout(function(){
 a.toolbox.focus(); 
}, 100):a.toolbox.focus()); 
}};CKEDITOR.plugins.add('toolbar',
    {requires:'button', init:function(f){
 let h, k=function(a, b){
 var d, e='rtl'==f.lang.dir, c=f.config.toolbarGroupCycling, g=e?37:39, e=e?39:37, c=void 0===c||c;switch(b){
 case 9:case CKEDITOR.SHIFT+9:for(;!d||!d.items.length;)if(d=9==b?(d?d.next:a.toolbar.next)||f.toolbox.toolbars[0]:(d?d.previous:a.toolbar.previous)||f.toolbox.toolbars[f.toolbox.toolbars.length-1], d.items.length)for(a=d.items[h?d.items.length-1:0];a&&!a.focus;)(a=h?a.previous:a.next)||(d=0);a&&a.focus();return!1;case g:d=a;do d=d.next, !d&&
    c&&(d=a.toolbar.items[0]);while(d&&!d.focus);d?d.focus():k(a, 9);return!1;case 40:return a.button&&a.button.hasArrow?a.execute():k(a, 40==b?g:e), !1;case e:case 38:d=a;do d=d.previous, !d&&c&&(d=a.toolbar.items[a.toolbar.items.length-1]);while(d&&!d.focus);d?d.focus():(h=1, k(a, CKEDITOR.SHIFT+9), h=0);return!1;case 27:return f.focus(), !1;case 13:case 32:return a.execute(), !1; 
}return!0; 
};f.on('uiSpace', function(a){
 if(a.data.space==f.config.toolbarLocation){
 a.removeListener();f.toolbox=new g;var b=CKEDITOR.tools.getNextId(),
    d=['\x3cspan id\x3d"', b, '" class\x3d"cke_voice_label"\x3e', f.lang.toolbar.toolbars, '\x3c/span\x3e', `\x3cspan id\x3d"${f.ui.spaceId('toolbox')}" class\x3d"cke_toolbox" role\x3d"group" aria-labelledby\x3d"`, b, '" onmousedown\x3d"return false;"\x3e'], b=!1!==f.config.toolbarStartupExpanded, e, h;f.config.toolbarCanCollapse&&f.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE&&d.push(`\x3cspan class\x3d"cke_toolbox_main"${b?'\x3e':' style\x3d"display:none"\x3e'}`);for(let m=f.toolbox.toolbars, x=c(f), p=x.length,
    q=0;q<p;q++){
 var v, w=0, u, A=x[q], r='/'!==A&&('/'===x[q+1]||q==p-1), y;if(A)if(e&&(d.push('\x3c/span\x3e'), h=e=0), '/'===A)d.push('\x3cspan class\x3d"cke_toolbar_break"\x3e\x3c/span\x3e');else{
 y=A.items||A;for(let z=0;z<y.length;z++){
 var B=y[z], C;if(B){
 const E=function(a){
 a=a.render(f, d);F=w.items.push(a)-1;0<F&&(a.previous=w.items[F-1], a.previous.next=a);a.toolbar=w;a.onkey=k;a.onfocus=function(){
 f.toolbox.focusCommandExecuted||f.focus(); 
}; 
};if(B.type==CKEDITOR.UI_SEPARATOR)h=e&&B;else{
 C=!1!==B.canGroup;
    if(!w){
 v=CKEDITOR.tools.getNextId();w={id:v, items:[]};u=A.name&&(f.lang.toolbar.toolbarGroups[A.name]||A.name);d.push('\x3cspan id\x3d"', v, `" class\x3d"cke_toolbar${r?' cke_toolbar_last"':'"'}`, u?` aria-labelledby\x3d"${v}_label"`:'', ' role\x3d"toolbar"\x3e');u&&d.push('\x3cspan id\x3d"', v, '_label" class\x3d"cke_voice_label"\x3e', u, '\x3c/span\x3e');d.push('\x3cspan class\x3d"cke_toolbar_start"\x3e\x3c/span\x3e');var F=m.push(w)-1;0<F&&(w.previous=m[F-1], w.previous.next=w); 
}C?e||(d.push('\x3cspan class\x3d"cke_toolgroup" role\x3d"presentation"\x3e'),
    e=1):e&&(d.push('\x3c/span\x3e'), e=0);h&&(E(h), h=0);E(B); 
} 
} 
}e&&(d.push('\x3c/span\x3e'), h=e=0);w&&d.push('\x3cspan class\x3d"cke_toolbar_end"\x3e\x3c/span\x3e\x3c/span\x3e'); 
} 
}f.config.toolbarCanCollapse&&d.push('\x3c/span\x3e');if(f.config.toolbarCanCollapse&&f.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE){
 const I=CKEDITOR.tools.addFunction(function(){
 f.execCommand('toolbarCollapse'); 
});f.on('destroy', function(){
 CKEDITOR.tools.removeFunction(I); 
});f.addCommand('toolbarCollapse', {readOnly:1, exec:function(a){
 const b=
    a.ui.space('toolbar_collapser'), e=b.getPrevious(), d=a.ui.space('contents'), c=e.getParent(), f=parseInt(d.$.style.height, 10), g=c.$.offsetHeight, h=b.hasClass('cke_toolbox_collapser_min');h?(e.show(), b.removeClass('cke_toolbox_collapser_min'), b.setAttribute('title', a.lang.toolbar.toolbarCollapse)):(e.hide(), b.addClass('cke_toolbox_collapser_min'), b.setAttribute('title', a.lang.toolbar.toolbarExpand));b.getFirst().setText(h?'▲':'◀');d.setStyle('height', `${f-(c.$.offsetHeight-g)}px`);a.fire('resize', {outerHeight:a.container.$.offsetHeight,
    contentsHeight:d.$.offsetHeight, outerWidth:a.container.$.offsetWidth}); 
}, modes:{wysiwyg:1, source:1}});f.setKeystroke(CKEDITOR.ALT+(CKEDITOR.env.ie||CKEDITOR.env.webkit?189:109), 'toolbarCollapse');d.push(`\x3ca title\x3d"${b?f.lang.toolbar.toolbarCollapse:f.lang.toolbar.toolbarExpand}" id\x3d"${f.ui.spaceId('toolbar_collapser')}" tabIndex\x3d"-1" class\x3d"cke_toolbox_collapser`);b||d.push(' cke_toolbox_collapser_min');d.push(`" onclick\x3d"CKEDITOR.tools.callFunction(${I})"\x3e`, '\x3cspan class\x3d"cke_arrow"\x3e\x26#9650;\x3c/span\x3e',
    '\x3c/a\x3e'); 
}d.push('\x3c/span\x3e');a.data.html+=d.join(''); 
} 
});f.on('destroy', function(){
 if(this.toolbox){
 let a, b=0, d, e, c;for(a=this.toolbox.toolbars;b<a.length;b++)for(e=a[b].items, d=0;d<e.length;d++)c=e[d], c.clickFn&&CKEDITOR.tools.removeFunction(c.clickFn), c.keyDownFn&&CKEDITOR.tools.removeFunction(c.keyDownFn); 
} 
});f.on('uiReady', function(){
 const a=f.ui.space('toolbox');a&&f.focusManager.add(a, 1); 
});f.addCommand('toolbarFocus', a);f.setKeystroke(CKEDITOR.ALT+121, 'toolbarFocus');f.ui.add('-', CKEDITOR.UI_SEPARATOR,
    {});f.ui.addHandler(CKEDITOR.UI_SEPARATOR, {create:function(){
 return{render:function(a, b){
 b.push('\x3cspan class\x3d"cke_toolbar_separator" role\x3d"separator"\x3e\x3c/span\x3e');return{}; 
}}; 
}}); 
}});CKEDITOR.ui.prototype.addToolbarGroup=function(a, c, g){
 const l=h(this.editor), b=0===c, d={name:a};if(g){
 if(g=CKEDITOR.tools.search(l, function(a){
 return a.name==g; 
})){
 !g.groups&&(g.groups=[]);if(c&&(c=CKEDITOR.tools.indexOf(g.groups, c), 0<=c)){
 g.groups.splice(c+1, 0, a);return; 
}b?g.groups.splice(0, 0, a):g.groups.push(a);
    return; 
}c=null; 
}c&&(c=CKEDITOR.tools.indexOf(l, function(a){
 return a.name==c; 
}));b?l.splice(0, 0, a):'number'===typeof c?l.splice(c+1, 0, d):l.push(a); 
}; 
}(), CKEDITOR.UI_SEPARATOR='separator', CKEDITOR.config.toolbarLocation='top', 'use strict', function(){
 function c(a, b, d){
 b.type||(b.type='auto');if(d&&!1===a.fire('beforePaste', b)||!b.dataValue&&b.dataTransfer.isEmpty())return!1;b.dataValue||(b.dataValue='');if(CKEDITOR.env.gecko&&'drop'==b.method&&a.toolbox)a.once('afterPaste', function(){
 a.toolbox.focus(); 
});return a.fire('paste',
    b); 
}function h(a){
 function b(){
 const d=a.editable();if(CKEDITOR.plugins.clipboard.isCustomCopyCutSupported){
 const c=function(b){
 a.getSelection().isCollapsed()||(a.readOnly&&'cut'==b.name||C.initPasteDataTransfer(b, a), b.data.preventDefault()); 
};d.on('copy', c);d.on('cut', c);d.on('cut', function(){
 a.readOnly||a.extractSelectedHtml(); 
}, null, null, 999); 
}d.on(C.mainPasteEvent, function(a){
 'beforepaste'==C.mainPasteEvent&&E||y(a); 
});'beforepaste'==C.mainPasteEvent&&(d.on('paste', function(a){
 F||(g(), a.data.preventDefault(),
    y(a), k('paste')); 
}), d.on('contextmenu', h, null, null, 0), d.on('beforepaste', function(a){
 !a.data||a.data.$.ctrlKey||a.data.$.shiftKey||h(); 
}, null, null, 0));d.on('beforecut', function(){
 !E&&l(a); 
});let f;d.attachListener(CKEDITOR.env.ie?d:a.document.getDocumentElement(), 'mouseup', function(){
 f=setTimeout(z, 0); 
});a.on('destroy', function(){
 clearTimeout(f); 
});d.on('keyup', z); 
}function d(b){
 return{type:b, canUndo:'cut'==b, startDisabled:!0, fakeKeystroke:'cut'==b?CKEDITOR.CTRL+88:CKEDITOR.CTRL+67, exec:function(){
 'cut'==
    this.type&&l();let b;const d=this.type;if(CKEDITOR.env.ie)b=k(d);else try{
 b=a.document.$.execCommand(d, !1, null); 
}catch(c){
 b=!1; 
}b||a.showNotification(a.lang.clipboard[`${this.type}Error`]);return b; 
}}; 
}function f(){
 return{canUndo:!1, async:!0, fakeKeystroke:CKEDITOR.CTRL+86, exec:function(a, b){
 function e(b, g){
 g='undefined'!==typeof g?g:!0;b?(b.method='paste', b.dataTransfer||(b.dataTransfer=C.initPasteDataTransfer()), c(a, b, g)):f&&!a._.forcePasteDialog&&a.showNotification(k, 'info', a.config.clipboard_notificationDuration);
    a._.forcePasteDialog=!1;a.fire('afterCommandExec', {name:'paste', command:d, returnValue:!!b}); 
}b='undefined'!==typeof b&&null!==b?b:{};var d=this, f='undefined'!==typeof b.notification?b.notification:!0, g=b.type, h=CKEDITOR.tools.keystrokeToString(a.lang.common.keyboard, a.getCommandKeystroke(this)), k='string'===typeof f?f:a.lang.clipboard.pasteNotification.replace(/%1/, `\x3ckbd aria-label\x3d"${h.aria}"\x3e${h.display}\x3c/kbd\x3e`), h='string'===typeof b?b:b.dataValue;g&&!0!==a.config.forcePasteAsPlainText&&
    'allow-word'!==a.config.forcePasteAsPlainText?a._.nextPasteType=g:delete a._.nextPasteType;'string'===typeof h?e({dataValue:h}):a.getClipboardData(e); 
}}; 
}function g(){
 F=1;setTimeout(function(){
 F=0; 
}, 100); 
}function h(){
 E=1;setTimeout(function(){
 E=0; 
}, 10); 
}function k(b){
 let d=a.document, c=d.getBody(), f=!1, g=function(){
 f=!0; 
};c.on(b, g);7<CKEDITOR.env.version?d.$.execCommand(b):d.$.selection.createRange().execCommand(b);c.removeListener(b, g);return f; 
}function l(){
 if(CKEDITOR.env.ie&&!CKEDITOR.env.quirks){
 let b=
    a.getSelection(), d, c, f;b.getType()==CKEDITOR.SELECTION_ELEMENT&&(d=b.getSelectedElement())&&(c=b.getRanges()[0], f=a.document.createText(''), f.insertBefore(d), c.setStartBefore(f), c.setEndAfter(d), b.selectRanges([c]), setTimeout(function(){
 d.getParent()&&(f.remove(), b.selectElement(d)); 
}, 0)); 
} 
}function m(b, d){
 var c=a.document, f=a.editable(), g=function(a){
 a.cancel(); 
}, h;if(!c.getById('cke_pastebin')){
 const k=a.getSelection(), l=k.createBookmarks();CKEDITOR.env.ie&&k.root.fire('selectionchange');let n=new CKEDITOR.dom.element(!CKEDITOR.env.webkit&&
    !f.is('body')||CKEDITOR.env.ie?'div':'body', c);n.setAttributes({id:'cke_pastebin', 'data-cke-temp':'1'});var u=0, c=c.getWindow();CKEDITOR.env.webkit?(f.append(n), n.addClass('cke_editable'), f.is('body')||(u='static'!=f.getComputedStyle('position')?f:CKEDITOR.dom.element.get(f.$.offsetParent), u=u.getDocumentPosition().y)):f.getAscendant(CKEDITOR.env.ie?'body':'html', 1).append(n);n.setStyles({position:'absolute', top:`${c.getScrollPosition().y-u+10}px`, width:'1px', height:`${Math.max(1, c.getViewPaneSize().height-
    20)}px`, overflow:'hidden', margin:0, padding:0});CKEDITOR.env.safari&&n.setStyles(CKEDITOR.tools.cssVendorPrefix('user-select', 'text'));(u=n.getParent().isReadOnly())?(n.setOpacity(0), n.setAttribute('contenteditable', !0)):n.setStyle('ltr'==a.config.contentsLangDirection?'left':'right', '-10000px');a.on('selectionChange', g, null, null, 0);if(CKEDITOR.env.webkit||CKEDITOR.env.gecko)h=f.once('blur', g, null, null, -100);u&&n.focus();u=new CKEDITOR.dom.range(n);u.selectNodeContents(n);const t=u.select();CKEDITOR.env.ie&&
    (h=f.once('blur', function(){
 a.lockSelection(t); 
}));const w=CKEDITOR.document.getWindow().getScrollPosition().y;setTimeout(function(){
 CKEDITOR.env.webkit&&(CKEDITOR.document.getBody().$.scrollTop=w);h&&h.removeListener();CKEDITOR.env.ie&&f.focus();k.selectBookmarks(l);n.remove();let b;CKEDITOR.env.webkit&&(b=n.getFirst())&&b.is&&b.hasClass('Apple-style-span')&&(n=b);a.removeListener('selectionChange', g);d(n.getHtml()); 
}, 0); 
} 
}function A(){
 if('paste'==C.mainPasteEvent)return a.fire('beforePaste', {type:'auto',
    method:'paste'}), !1;a.focus();g();const b=a.focusManager;b.lock();if(a.editable().fire(C.mainPasteEvent)&&!k('paste'))return b.unlock(), !1;b.unlock();return!0; 
}function r(b){
 if('wysiwyg'==a.mode)switch(b.data.keyCode){
 case CKEDITOR.CTRL+86:case CKEDITOR.SHIFT+45:b=a.editable();g();'paste'==C.mainPasteEvent&&b.fire('beforepaste');break;case CKEDITOR.CTRL+88:case CKEDITOR.SHIFT+46:a.fire('saveSnapshot'), setTimeout(function(){
 a.fire('saveSnapshot'); 
}, 50); 
} 
}function y(b){
 const d={type:'auto', method:'paste',
    dataTransfer:C.initPasteDataTransfer(b)};d.dataTransfer.cacheData();const f=!1!==a.fire('beforePaste', d);f&&C.canClipboardApiBeTrusted(d.dataTransfer, a)?(b.data.preventDefault(), setTimeout(function(){
 c(a, d); 
}, 0)):m(b, function(b){
 d.dataValue=b.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig, '');f&&c(a, d); 
}); 
}function z(){
 if('wysiwyg'==a.mode){
 const b=B('paste');a.getCommand('cut').setState(B('cut'));a.getCommand('copy').setState(B('copy'));a.getCommand('paste').setState(b);a.fire('pasteState', b); 
} 
}function B(b){
 var d=
    a.getSelection(), d=d&&d.getRanges()[0];if((a.readOnly||d&&d.checkReadOnly())&&b in{paste:1, cut:1})return CKEDITOR.TRISTATE_DISABLED;if('paste'==b)return CKEDITOR.TRISTATE_OFF;b=a.getSelection();d=b.getRanges();return b.getType()==CKEDITOR.SELECTION_NONE||1==d.length&&d[0].collapsed?CKEDITOR.TRISTATE_DISABLED:CKEDITOR.TRISTATE_OFF; 
}var C=CKEDITOR.plugins.clipboard, E=0, F=0;(function(){
 a.on('key', r);a.on('contentDom', b);a.on('selectionChange', z);if(a.contextMenu){
 a.contextMenu.addListener(function(){
 return{cut:B('cut'),
    copy:B('copy'), paste:B('paste')}; 
});let d=null;a.on('menuShow', function(){
 d&&(d.removeListener(), d=null);const b=a.contextMenu.findItemByCommandName('paste');b&&b.element&&(d=b.element.on('touchend', function(){
 a._.forcePasteDialog=!0; 
})); 
}); 
}if(a.ui.addButton)a.once('instanceReady', function(){
 a._.pasteButtons&&CKEDITOR.tools.array.forEach(a._.pasteButtons, function(b){
 if(b=a.ui.get(b))if(b=CKEDITOR.document.getById(b._.id))b.on('touchend', function(){
 a._.forcePasteDialog=!0; 
}); 
}); 
}); 
})();(function(){
 function b(d,
    c, f, g, h){
 const k=a.lang.clipboard[c];a.addCommand(c, f);a.ui.addButton&&a.ui.addButton(d, {label:k, command:c, toolbar:`clipboard,${g}`});a.addMenuItems&&a.addMenuItem(c, {label:k, command:c, group:'clipboard', order:h}); 
}b('Cut', 'cut', d('cut'), 10, 1);b('Copy', 'copy', d('copy'), 20, 4);b('Paste', 'paste', f(), 30, 8);a._.pasteButtons||(a._.pasteButtons=[]);a._.pasteButtons.push('Paste'); 
})();a.getClipboardData=function(b, d){
 function c(a){
 a.removeListener();a.cancel();d(a.data); 
}function f(a){
 a.removeListener();a.cancel();
    d({type:h, dataValue:a.data.dataValue, dataTransfer:a.data.dataTransfer, method:'paste'}); 
}var g=!1, h='auto';d||(d=b, b=null);a.on('beforePaste', function(a){
 a.removeListener();g=!0;h=a.data.type; 
}, null, null, 1E3);a.on('paste', c, null, null, 0);!1===A()&&(a.removeListener('paste', c), a._.forcePasteDialog&&g&&a.fire('pasteDialog')?(a.on('pasteDialogCommit', f), a.on('dialogHide', function(a){
 a.removeListener();a.data.removeListener('pasteDialogCommit', f);a.data._.committed||d(null); 
})):d(null)); 
}; 
}function g(a){
 if(CKEDITOR.env.webkit){
 if(!a.match(/^[^<]*$/g)&&
    !a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi))return'html'; 
}else if(CKEDITOR.env.ie){
 if(!a.match(/^([^<]|<br( ?\/)?>)*$/gi)&&!a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi))return'html'; 
}else if(CKEDITOR.env.gecko){
 if(!a.match(/^([^<]|<br( ?\/)?>)*$/gi))return'html'; 
}else return'html';return'htmlifiedtext'; 
}function a(a, b){
 function d(a){
 return CKEDITOR.tools.repeat('\x3c/p\x3e\x3cp\x3e', ~~(a/2))+(1==a%2?'\x3cbr\x3e':''); 
}b=b.replace(/(?!\u3000)\s+/g, ' ').replace(/> +</g, '\x3e\x3c').replace(/<br ?\/>/gi,
    '\x3cbr\x3e');b=b.replace(/<\/?[A-Z]+>/g, function(a){
 return a.toLowerCase(); 
});if(b.match(/^[^<]$/))return b;CKEDITOR.env.webkit&&-1<b.indexOf('\x3cdiv\x3e')&&(b=b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, '\x3cbr\x3e').replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, '\x3cdiv\x3e\x3c/div\x3e'), b.match(/<div>(<br>|)<\/div>/)&&(b=`\x3cp\x3e${b.replace(/(<div>(<br>|)<\/div>)+/g, function(a){
 return d(a.split('\x3c/div\x3e\x3cdiv\x3e').length+1); 
})}\x3c/p\x3e`), b=b.replace(/<\/div><div>/g, '\x3cbr\x3e'),
    b=b.replace(/<\/?div>/g, ''));CKEDITOR.env.gecko&&a.enterMode!=CKEDITOR.ENTER_BR&&(CKEDITOR.env.gecko&&(b=b.replace(/^<br><br>$/, '\x3cbr\x3e')), -1<b.indexOf('\x3cbr\x3e\x3cbr\x3e')&&(b=`\x3cp\x3e${b.replace(/(<br>){2,}/g, function(a){
 return d(a.length/4); 
})}\x3c/p\x3e`));return k(a, b); 
}function f(a){
 function b(){
 let a={}, e;for(e in CKEDITOR.dtd)'$'!=e.charAt(0)&&'div'!=e&&'span'!=e&&(a[e]=1);return a; 
}const d={};return{get:function(c){
 return'plain-text'==c?d.plainText||(d.plainText=new CKEDITOR.filter(a,
    'br')):'semantic-content'==c?((c=d.semanticContent)||(c=new CKEDITOR.filter(a, {}), c.allow({$1:{elements:b(), attributes:!0, styles:!1, classes:!1}}), c=d.semanticContent=c), c):c?new CKEDITOR.filter(a, c):null; 
}}; 
}function m(a, b, d){
 b=CKEDITOR.htmlParser.fragment.fromHtml(b);const c=new CKEDITOR.htmlParser.basicWriter;d.applyTo(b, !0, !1, a.activeEnterMode);b.writeHtml(c);return c.getHtml(); 
}function k(a, b){
 a.enterMode==CKEDITOR.ENTER_BR?b=b.replace(/(<\/p><p>)+/g, function(a){
 return CKEDITOR.tools.repeat('\x3cbr\x3e',
    a.length/7*2); 
}).replace(/<\/?p>/g, ''):a.enterMode==CKEDITOR.ENTER_DIV&&(b=b.replace(/<(\/)?p>/g, '\x3c$1div\x3e'));return b; 
}function l(a){
 a.data.preventDefault();a.data.$.dataTransfer.dropEffect='none'; 
}function b(a){
 const b=CKEDITOR.plugins.clipboard;a.on('contentDom', function(){
 function d(b, f, g){
 f.select();c(a, {dataTransfer:g, method:'drop'}, 1);g.sourceEditor.fire('saveSnapshot');g.sourceEditor.editable().extractHtmlFromRange(b);g.sourceEditor.getSelection().selectRanges([b]);g.sourceEditor.fire('saveSnapshot'); 
}
    function f(d, g){
 d.select();c(a, {dataTransfer:g, method:'drop'}, 1);b.resetDragDataTransfer(); 
}function g(b, d, c){
 const f={$:b.data.$, target:b.data.getTarget()};d&&(f.dragRange=d);c&&(f.dropRange=c);!1===a.fire(b.name, f)&&b.data.preventDefault(); 
}function h(a){
 a.type!=CKEDITOR.NODE_ELEMENT&&(a=a.getParent());return a.getChildCount(); 
}const k=a.editable(), l=CKEDITOR.plugins.clipboard.getDropTarget(a), m=a.ui.space('top'), A=a.ui.space('bottom');b.preventDefaultDropOnElement(m);b.preventDefaultDropOnElement(A);
    k.attachListener(l, 'dragstart', g);k.attachListener(a, 'dragstart', b.resetDragDataTransfer, b, null, 1);k.attachListener(a, 'dragstart', function(d){
 b.initDragDataTransfer(d, a); 
}, null, null, 2);k.attachListener(a, 'dragstart', function(){
 const d=b.dragRange=a.getSelection().getRanges()[0];CKEDITOR.env.ie&&10>CKEDITOR.env.version&&(b.dragStartContainerChildCount=d?h(d.startContainer):null, b.dragEndContainerChildCount=d?h(d.endContainer):null); 
}, null, null, 100);k.attachListener(l, 'dragend', g);k.attachListener(a, 'dragend',
    b.initDragDataTransfer, b, null, 1);k.attachListener(a, 'dragend', b.resetDragDataTransfer, b, null, 100);k.attachListener(l, 'dragover', function(a){
 if(CKEDITOR.env.edge)a.data.preventDefault();else{
 const b=a.data.getTarget();b&&b.is&&b.is('html')?a.data.preventDefault():CKEDITOR.env.ie&&CKEDITOR.plugins.clipboard.isFileApiSupported&&a.data.$.dataTransfer.types.contains('Files')&&a.data.preventDefault(); 
} 
});k.attachListener(l, 'drop', function(d){
 if(!d.data.$.defaultPrevented&&(d.data.preventDefault(), !a.readOnly)){
 var c=
    d.data.getTarget();if(!c.isReadOnly()||c.type==CKEDITOR.NODE_ELEMENT&&c.is('html')){
 var c=b.getRangeAtDropPosition(d, a), f=b.dragRange;c&&g(d, f, c); 
} 
} 
}, null, null, 9999);k.attachListener(a, 'drop', b.initDragDataTransfer, b, null, 1);k.attachListener(a, 'drop', function(c){
 if(c=c.data){
 const g=c.dropRange, h=c.dragRange, k=c.dataTransfer;k.getTransferType(a)==CKEDITOR.DATA_TRANSFER_INTERNAL?setTimeout(function(){
 b.internalDrop(h, g, k, a); 
}, 0):k.getTransferType(a)==CKEDITOR.DATA_TRANSFER_CROSS_EDITORS?d(h, g, k):f(g, k); 
} 
},
    null, null, 9999); 
}); 
}let d;CKEDITOR.plugins.add('clipboard', {requires:'dialog,notification,toolbar', init:function(e){
 function d(a){
 if(!a||q===a.id)return!1;var b=a.getTypes(), b=1===b.length&&'Files'===b[0];a=1===a.getFilesCount();return b&&a; 
}let c, k=f(e);e.config.forcePasteAsPlainText?c='plain-text':e.config.pasteFilter?c=e.config.pasteFilter:!CKEDITOR.env.webkit||'pasteFilter'in e.config||(c='semantic-content');e.pasteFilter=k.get(c);h(e);b(e);CKEDITOR.dialog.add('paste', CKEDITOR.getUrl(`${this.path}dialogs/paste.js`));
    if(CKEDITOR.env.gecko){
 var l=['image/png', 'image/jpeg', 'image/gif'], q;e.on('paste', function(a){
 let b=a.data, c=b.dataTransfer;if(!b.dataValue&&'paste'==b.method&&d(c)&&(c=c.getFile(0), -1!=CKEDITOR.tools.indexOf(l, c.type))){
 const f=new FileReader;f.addEventListener('load', function(){
 a.data.dataValue=`\x3cimg src\x3d"${f.result}" /\x3e`;e.fire('paste', a.data); 
}, !1);f.addEventListener('abort', function(){
 e.fire('paste', a.data); 
}, !1);f.addEventListener('error', function(){
 e.fire('paste', a.data); 
}, !1);f.readAsDataURL(c);
    q=b.dataTransfer.id;a.stop(); 
} 
}, null, null, 1); 
}e.on('paste', function(a){
 a.data.dataTransfer||(a.data.dataTransfer=new CKEDITOR.plugins.clipboard.dataTransfer);if(!a.data.dataValue){
 let b=a.data.dataTransfer, d=b.getData('text/html');if(d)a.data.dataValue=d, a.data.type='html';else if(d=b.getData('text/plain'))a.data.dataValue=e.editable().transformPlainTextToHtml(d), a.data.type='text'; 
} 
}, null, null, 1);e.on('paste', function(a){
 let b=a.data.dataValue, e=CKEDITOR.dtd.$block;-1<b.indexOf('Apple-')&&(b=b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi,
    ' '), 'html'!=a.data.type&&(b=b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function(a, b){
 return b.replace(/\t/g, '\x26nbsp;\x26nbsp; \x26nbsp;'); 
})), -1<b.indexOf('\x3cbr class\x3d"Apple-interchange-newline"\x3e')&&(a.data.startsWithEOL=1, a.data.preSniffing='html', b=b.replace(/<br class="Apple-interchange-newline">/, '')), b=b.replace(/(<[^>]+) class="Apple-[^"]*"/gi, '$1'));if(b.match(/^<[^<]+cke_(editable|contents)/i)){
 let d, c, f=new CKEDITOR.dom.element('div');for(f.setHtml(b);1==f.getChildCount()&&
    (d=f.getFirst())&&d.type==CKEDITOR.NODE_ELEMENT&&(d.hasClass('cke_editable')||d.hasClass('cke_contents'));)f=c=d;c&&(b=c.getHtml().replace(/<br>$/i, '')); 
}CKEDITOR.env.ie?b=b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function(b, d){
 return d.toLowerCase()in e?(a.data.preSniffing='html', `\x3c${d}`):b; 
}):CKEDITOR.env.webkit?b=b.replace(/<\/(\w+)><div><br><\/div>$/, function(b, d){
 return d in e?(a.data.endsWithEOL=1, `\x3c/${d}\x3e`):b; 
}):CKEDITOR.env.gecko&&(b=b.replace(/(\s)<br>$/, '$1'));a.data.dataValue=b; 
}, null,
    null, 3);e.on('paste', function(b){
 b=b.data;let d=e._.nextPasteType||b.type, c=b.dataValue, f, h=e.config.clipboard_defaultContentType||'html', l=b.dataTransfer.getTransferType(e)==CKEDITOR.DATA_TRANSFER_EXTERNAL, n=!0===e.config.forcePasteAsPlainText;f='html'==d||'html'==b.preSniffing?'html':g(c);delete e._.nextPasteType;'htmlifiedtext'==f&&(c=a(e.config, c));if('text'==d&&'html'==f)c=m(e, c, k.get('plain-text'));else if(l&&e.pasteFilter&&!b.dontFilter||n)c=m(e, c, e.pasteFilter);b.startsWithEOL&&(c=`\x3cbr data-cke-eol\x3d"1"\x3e${
    c}`);b.endsWithEOL&&(c+='\x3cbr data-cke-eol\x3d"1"\x3e');'auto'==d&&(d='html'==f||'html'==h?'html':'text');b.type=d;b.dataValue=c;delete b.preSniffing;delete b.startsWithEOL;delete b.endsWithEOL; 
}, null, null, 6);e.on('paste', function(a){
 a=a.data;a.dataValue&&(e.insertHtml(a.dataValue, a.type, a.range), setTimeout(function(){
 e.fire('afterPaste'); 
}, 0)); 
}, null, null, 1E3);e.on('pasteDialog', function(a){
 setTimeout(function(){
 e.openDialog('paste', a.data); 
}, 0); 
}); 
}});CKEDITOR.plugins.clipboard={isCustomCopyCutSupported:CKEDITOR.env.ie&&
    16>CKEDITOR.env.version||CKEDITOR.env.iOS&&605>CKEDITOR.env.version?!1:!0, isCustomDataTypesSupported:!CKEDITOR.env.ie||16<=CKEDITOR.env.version, isFileApiSupported:!CKEDITOR.env.ie||9<CKEDITOR.env.version, mainPasteEvent:CKEDITOR.env.ie&&!CKEDITOR.env.edge?'beforepaste':'paste', addPasteButton:function(a, b, d){
 a.ui.addButton&&(a.ui.addButton(b, d), a._.pasteButtons||(a._.pasteButtons=[]), a._.pasteButtons.push(b)); 
}, canClipboardApiBeTrusted:function(a, b){
 return a.getTransferType(b)!=CKEDITOR.DATA_TRANSFER_EXTERNAL||
    CKEDITOR.env.chrome&&!a.isEmpty()||CKEDITOR.env.gecko&&(a.getData('text/html')||a.getFilesCount())||CKEDITOR.env.safari&&603<=CKEDITOR.env.version&&!CKEDITOR.env.iOS||CKEDITOR.env.iOS&&605<=CKEDITOR.env.version||CKEDITOR.env.edge&&16<=CKEDITOR.env.version?!0:!1; 
}, getDropTarget:function(a){
 const b=a.editable();return CKEDITOR.env.ie&&9>CKEDITOR.env.version||b.isInline()?b:a.document; 
}, fixSplitNodesAfterDrop:function(a, b, d, c){
 function f(a, e, d){
 let c=a;c.type==CKEDITOR.NODE_TEXT&&(c=a.getParent());if(c.equals(e)&&
    d!=e.getChildCount())return a=b.startContainer.getChild(b.startOffset-1), e=b.startContainer.getChild(b.startOffset), a&&a.type==CKEDITOR.NODE_TEXT&&e&&e.type==CKEDITOR.NODE_TEXT&&(d=a.getLength(), a.setText(a.getText()+e.getText()), e.remove(), b.setStart(a, d), b.collapse(!0)), !0; 
}const g=b.startContainer;'number'===typeof c&&'number'===typeof d&&g.type==CKEDITOR.NODE_ELEMENT&&(f(a.startContainer, g, d)||f(a.endContainer, g, c)); 
}, isDropRangeAffectedByDragRange:function(a, b){
 const d=b.startContainer, c=b.endOffset;
    return a.endContainer.equals(d)&&a.endOffset<=c||a.startContainer.getParent().equals(d)&&a.startContainer.getIndex()<c||a.endContainer.getParent().equals(d)&&a.endContainer.getIndex()<c?!0:!1; 
}, internalDrop:function(a, b, d, f){
 let g=CKEDITOR.plugins.clipboard, h=f.editable(), k, l;f.fire('saveSnapshot');f.fire('lockSnapshot', {dontUpdate:1});CKEDITOR.env.ie&&10>CKEDITOR.env.version&&this.fixSplitNodesAfterDrop(a, b, g.dragStartContainerChildCount, g.dragEndContainerChildCount);(l=this.isDropRangeAffectedByDragRange(a,
    b))||(k=a.createBookmark(!1));g=b.clone().createBookmark(!1);l&&(k=a.createBookmark(!1));a=k.startNode;b=k.endNode;l=g.startNode;b&&a.getPosition(l)&CKEDITOR.POSITION_PRECEDING&&b.getPosition(l)&CKEDITOR.POSITION_FOLLOWING&&l.insertBefore(a);a=f.createRange();a.moveToBookmark(k);h.extractHtmlFromRange(a, 1);b=f.createRange();g.startNode.getCommonAncestor(h)||(g=f.getSelection().createBookmarks()[0]);b.moveToBookmark(g);c(f, {dataTransfer:d, method:'drop', range:b}, 1);f.fire('unlockSnapshot'); 
}, getRangeAtDropPosition:function(a,
    b){
 let d=a.data.$, c=d.clientX, f=d.clientY, g=b.getSelection(!0).getRanges()[0], h=b.createRange();if(a.data.testRange)return a.data.testRange;if(document.caretRangeFromPoint&&b.document.$.caretRangeFromPoint(c, f))d=b.document.$.caretRangeFromPoint(c, f), h.setStart(CKEDITOR.dom.node(d.startContainer), d.startOffset), h.collapse(!0);else if(d.rangeParent)h.setStart(CKEDITOR.dom.node(d.rangeParent), d.rangeOffset), h.collapse(!0);else{
 if(CKEDITOR.env.ie&&8<CKEDITOR.env.version&&g&&b.editable().hasFocus)return g;
    if(document.body.createTextRange){
 b.focus();d=b.document.getBody().$.createTextRange();try{
 for(var k=!1, l=0;20>l&&!k;l++){
 if(!k)try{
 d.moveToPoint(c, f-l), k=!0; 
}catch(m){}if(!k)try{
 d.moveToPoint(c, f+l), k=!0; 
}catch(r){} 
}if(k){
 const y=`cke-temp-${(new Date).getTime()}`;d.pasteHTML(`\x3cspan id\x3d"${y}"\x3e​\x3c/span\x3e`);const z=b.document.getById(y);h.moveToPosition(z, CKEDITOR.POSITION_BEFORE_START);z.remove(); 
}else{
 let B=b.document.$.elementFromPoint(c, f), C=new CKEDITOR.dom.element(B), E;if(C.equals(b.editable())||
    'html'==C.getName())return g&&g.startContainer&&!g.startContainer.equals(b.editable())?g:null;E=C.getClientRect();c<E.left?h.setStartAt(C, CKEDITOR.POSITION_AFTER_START):h.setStartAt(C, CKEDITOR.POSITION_BEFORE_END);h.collapse(!0); 
} 
}catch(F){
 return null; 
} 
}else return null; 
}return h; 
}, initDragDataTransfer:function(a, b){
 let d=a.data.$?a.data.$.dataTransfer:null, c=new this.dataTransfer(d, b);'dragstart'===a.name&&c.storeId();d?this.dragData&&c.id==this.dragData.id?c=this.dragData:this.dragData=c:this.dragData?
    c=this.dragData:this.dragData=c;a.data.dataTransfer=c; 
}, resetDragDataTransfer:function(){
 this.dragData=null; 
}, initPasteDataTransfer:function(a, b){
 if(this.isCustomCopyCutSupported){
 if(a&&a.data&&a.data.$){
 let d=a.data.$.clipboardData, c=new this.dataTransfer(d, b);'copy'!==a.name&&'cut'!==a.name||c.storeId();this.copyCutData&&c.id==this.copyCutData.id?(c=this.copyCutData, c.$=d):this.copyCutData=c;return c; 
}return new this.dataTransfer(null, b); 
}return new this.dataTransfer(CKEDITOR.env.edge&&a&&a.data.$&&
    a.data.$.clipboardData||null, b); 
}, preventDefaultDropOnElement:function(a){
 a&&a.on('dragover', l); 
}};d=CKEDITOR.plugins.clipboard.isCustomDataTypesSupported?'cke/id':'Text';CKEDITOR.plugins.clipboard.dataTransfer=function(a, b){
 a&&(this.$=a);this._={metaRegExp:/^<meta.*?>/i, bodyRegExp:/<body(?:[\s\S]*?)>([\s\S]*)<\/body>/i, fragmentRegExp:/\s*\x3c!--StartFragment--\x3e|\x3c!--EndFragment--\x3e\s*/g, data:{}, files:[], nativeHtmlCache:'', normalizeType:function(a){
 a=a.toLowerCase();return'text'==a||'text/plain'==
    a?'Text':'url'==a?'URL':a; 
}};this._.fallbackDataTransfer=new CKEDITOR.plugins.clipboard.fallbackDataTransfer(this);this.id=this.getData(d);this.id||(this.id='Text'==d?'':`cke-${CKEDITOR.tools.getUniqueId()}`);b&&(this.sourceEditor=b, this.setData('text/html', b.getSelectedHtml(1)), 'Text'==d||this.getData('text/plain')||this.setData('text/plain', b.getSelection().getSelectedText())); 
};CKEDITOR.DATA_TRANSFER_INTERNAL=1;CKEDITOR.DATA_TRANSFER_CROSS_EDITORS=2;CKEDITOR.DATA_TRANSFER_EXTERNAL=3;CKEDITOR.plugins.clipboard.dataTransfer.prototype=
    {getData:function(a, b){
 a=this._.normalizeType(a);var d='text/html'==a&&b?this._.nativeHtmlCache:this._.data[a];if(void 0===d||null===d||''===d){
 if(this._.fallbackDataTransfer.isRequired())d=this._.fallbackDataTransfer.getData(a, b);else try{
 d=this.$.getData(a)||''; 
}catch(c){
 d=''; 
}'text/html'!=a||b||(d=this._stripHtml(d)); 
}'Text'==a&&CKEDITOR.env.gecko&&this.getFilesCount()&&'file://'==d.substring(0, 7)&&(d='');if('string'===typeof d)var f=d.indexOf('\x3c/html\x3e'), d=-1!==f?d.substring(0, f+7):d;return d; 
},
    setData:function(a, b){
 a=this._.normalizeType(a);'text/html'==a?(this._.data[a]=this._stripHtml(b), this._.nativeHtmlCache=b):this._.data[a]=b;if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported||'URL'==a||'Text'==a)if('Text'==d&&'Text'==a&&(this.id=b), this._.fallbackDataTransfer.isRequired())this._.fallbackDataTransfer.setData(a, b);else try{
 this.$.setData(a, b); 
}catch(c){} 
}, storeId:function(){
 'Text'!==d&&this.setData(d, this.id); 
}, getTransferType:function(a){
 return this.sourceEditor?this.sourceEditor==
    a?CKEDITOR.DATA_TRANSFER_INTERNAL:CKEDITOR.DATA_TRANSFER_CROSS_EDITORS:CKEDITOR.DATA_TRANSFER_EXTERNAL; 
}, cacheData:function(){
 function a(d){
 d=b._.normalizeType(d);let e=b.getData(d);'text/html'==d&&(b._.nativeHtmlCache=b.getData(d, !0), e=b._stripHtml(e));e&&(b._.data[d]=e); 
}if(this.$){
 var b=this, d, c;if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported){
 if(this.$.types)for(d=0;d<this.$.types.length;d++)a(this.$.types[d]); 
}else a('Text'), a('URL');c=this._getImageFromClipboard();if(this.$&&this.$.files||
    c){
 this._.files=[];if(this.$.files&&this.$.files.length)for(d=0;d<this.$.files.length;d++)this._.files.push(this.$.files[d]);0===this._.files.length&&c&&this._.files.push(c); 
} 
} 
}, getFilesCount:function(){
 return this._.files.length?this._.files.length:this.$&&this.$.files&&this.$.files.length?this.$.files.length:this._getImageFromClipboard()?1:0; 
}, getFile:function(a){
 return this._.files.length?this._.files[a]:this.$&&this.$.files&&this.$.files.length?this.$.files[a]:0===a?this._getImageFromClipboard():
    void 0; 
}, isEmpty:function(){
 let a={}, b;if(this.getFilesCount())return!1;CKEDITOR.tools.array.forEach(CKEDITOR.tools.object.keys(this._.data), function(b){
 a[b]=1; 
});if(this.$)if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported){
 if(this.$.types)for(let c=0;c<this.$.types.length;c++)a[this.$.types[c]]=1; 
}else a.Text=1, a.URL=1;'Text'!=d&&(a[d]=0);for(b in a)if(a[b]&&''!==this.getData(b))return!1;return!0; 
}, getTypes:function(){
 return this.$&&this.$.types?[].slice.call(this.$.types):[]; 
}, _getImageFromClipboard:function(){
 let a;
    try{
 if(this.$&&this.$.items&&this.$.items[0]&&(a=this.$.items[0].getAsFile())&&a.type)return a; 
}catch(b){} 
}, _stripHtml:function(a){
 if(a&&a.length){
 a=a.replace(this._.metaRegExp, '');const b=this._.bodyRegExp.exec(a);b&&b.length&&(a=b[1], a=a.replace(this._.fragmentRegExp, '')); 
}return a; 
}};CKEDITOR.plugins.clipboard.fallbackDataTransfer=function(a){
 this._dataTransfer=a;this._customDataFallbackType='text/html'; 
};CKEDITOR.plugins.clipboard.fallbackDataTransfer._isCustomMimeTypeSupported=null;CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes=
    [];CKEDITOR.plugins.clipboard.fallbackDataTransfer.prototype={isRequired:function(){
 const a=CKEDITOR.plugins.clipboard.fallbackDataTransfer, b=this._dataTransfer.$;if(null===a._isCustomMimeTypeSupported)if(b){
 a._isCustomMimeTypeSupported=!1;if(CKEDITOR.env.edge&&17<=CKEDITOR.env.version)return!0;try{
 b.setData('cke/mimetypetest', 'cke test value'), a._isCustomMimeTypeSupported='cke test value'===b.getData('cke/mimetypetest'), b.clearData('cke/mimetypetest'); 
}catch(d){} 
}else return!1;return!a._isCustomMimeTypeSupported; 
},
    getData:function(a, b){
 var d=this._getData(this._customDataFallbackType, !0);if(b)return d;var d=this._extractDataComment(d), c=null, c=a===this._customDataFallbackType?d.content:d.data&&d.data[a]?d.data[a]:this._getData(a, !0);return null!==c?c:''; 
}, setData:function(a, b){
 var d=a===this._customDataFallbackType;d&&(b=this._applyDataComment(b, this._getFallbackTypeData()));let c=b, f=this._dataTransfer.$;try{
 f.setData(a, c), d&&(this._dataTransfer._.nativeHtmlCache=c); 
}catch(g){
 if(this._isUnsupportedMimeTypeError(g)){
 d=
    CKEDITOR.plugins.clipboard.fallbackDataTransfer;-1===CKEDITOR.tools.indexOf(d._customTypes, a)&&d._customTypes.push(a);var d=this._getFallbackTypeContent(), h=this._getFallbackTypeData();h[a]=c;try{
 c=this._applyDataComment(d, h), f.setData(this._customDataFallbackType, c), this._dataTransfer._.nativeHtmlCache=c; 
}catch(k){
 c=''; 
} 
} 
}return c; 
}, _getData:function(a, b){
 const d=this._dataTransfer._.data;if(!b&&d[a])return d[a];try{
 return this._dataTransfer.$.getData(a); 
}catch(c){
 return null; 
} 
}, _getFallbackTypeContent:function(){
 let a=
    this._dataTransfer._.data[this._customDataFallbackType];a||(a=this._extractDataComment(this._getData(this._customDataFallbackType, !0)).content);return a; 
}, _getFallbackTypeData:function(){
 const a=CKEDITOR.plugins.clipboard.fallbackDataTransfer._customTypes, b=this._extractDataComment(this._getData(this._customDataFallbackType, !0)).data||{}, d=this._dataTransfer._.data;CKEDITOR.tools.array.forEach(a, function(a){
 void 0!==d[a]?b[a]=d[a]:void 0!==b[a]&&(b[a]=b[a]); 
}, this);return b; 
}, _isUnsupportedMimeTypeError:function(a){
 return a.message&&
    -1!==a.message.search(/element not found/gi); 
}, _extractDataComment:function(a){
 const b={data:null, content:a||''};if(a&&16<a.length){
 let d;(d=/\x3c!--cke-data:(.*?)--\x3e/g.exec(a))&&d[1]&&(b.data=JSON.parse(decodeURIComponent(d[1])), b.content=a.replace(d[0], '')); 
}return b; 
}, _applyDataComment:function(a, b){
 let d='';b&&CKEDITOR.tools.object.keys(b).length&&(d=`\x3c!--cke-data:${encodeURIComponent(JSON.stringify(b))}--\x3e`);return d+(a&&a.length?a:''); 
}}; 
}(), CKEDITOR.config.clipboard_notificationDuration=
    1E4, CKEDITOR.plugins.add('panelbutton', {requires:'button', onLoad:function(){
 function c(c){
 const g=this._;g.state!=CKEDITOR.TRISTATE_DISABLED&&(this.createPanel(c), g.on?g.panel.hide():g.panel.showBlock(this._.id, this.document.getById(this._.id), 4)); 
}CKEDITOR.ui.panelButton=CKEDITOR.tools.createClass({base:CKEDITOR.ui.button, $:function(h){
 const g=h.panel||{};delete h.panel;this.base(h);this.document=g.parent&&g.parent.getDocument()||CKEDITOR.document;g.block={attributes:g.attributes};g.toolbarRelated=!0;
    this.hasArrow='listbox';this.click=c;this._={panelDefinition:g}; 
}, statics:{handler:{create:function(c){
 return new CKEDITOR.ui.panelButton(c); 
}}}, proto:{createPanel:function(c){
 const g=this._;if(!g.panel){
 var a=this._.panelDefinition, f=this._.panelDefinition.block, m=a.parent||CKEDITOR.document.getBody(), k=this._.panel=new CKEDITOR.ui.floatPanel(c, m, a), a=k.addBlock(g.id, f), l=this, b=c.getCommand(this.command);k.onShow=function(){
 l.className&&this.element.addClass(`${l.className}_panel`);l.setState(CKEDITOR.TRISTATE_ON);
    g.on=1;l.editorFocus&&c.focus();if(l.onOpen)l.onOpen(); 
};k.onHide=function(a){
 l.className&&this.element.getFirst().removeClass(`${l.className}_panel`);!l.modes&&b?l.setStateFromCommand(b):l.setState(l.modes&&l.modes[c.mode]?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);g.on=0;if(!a&&l.onClose)l.onClose(); 
};k.onEscape=function(){
 k.hide(1);l.document.getById(g.id).focus(); 
};if(this.onBlock)this.onBlock(k, a);a.onHide=function(){
 g.on=0;!l.modes&&l.command?l.setStateFromCommand(b):l.setState(CKEDITOR.TRISTATE_OFF); 
}; 
} 
},
    setStateFromCommand:function(c){
 this.setState(c.state); 
}}}); 
}, beforeInit:function(c){
 c.ui.addHandler(CKEDITOR.UI_PANELBUTTON, CKEDITOR.ui.panelButton.handler); 
}}), CKEDITOR.UI_PANELBUTTON='panelbutton', function(){
 CKEDITOR.plugins.add('panel', {beforeInit:function(a){
 a.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler); 
}});CKEDITOR.UI_PANEL='panel';CKEDITOR.ui.panel=function(a, c){
 c&&CKEDITOR.tools.extend(this, c);CKEDITOR.tools.extend(this, {className:'', css:[]});this.id=CKEDITOR.tools.getNextId();
    this.document=a;this.isFramed=this.forceIFrame||this.css.length;this._={blocks:{}}; 
};CKEDITOR.ui.panel.handler={create:function(a){
 return new CKEDITOR.ui.panel(a); 
}};const c=CKEDITOR.addTemplate('panel', '\x3cdiv lang\x3d"{langCode}" id\x3d"{id}" dir\x3d{dir} class\x3d"cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style\x3d"z-index:{z-index}" role\x3d"presentation"\x3e{frame}\x3c/div\x3e'), h=CKEDITOR.addTemplate('panel-frame', '\x3ciframe id\x3d"{id}" class\x3d"cke_panel_frame" role\x3d"presentation" frameborder\x3d"0" src\x3d"{src}"\x3e\x3c/iframe\x3e'),
    g=CKEDITOR.addTemplate('panel-frame-inner', '\x3c!DOCTYPE html\x3e\x3chtml class\x3d"cke_panel_container {env}" dir\x3d"{dir}" lang\x3d"{langCode}"\x3e\x3chead\x3e{css}\x3c/head\x3e\x3cbody class\x3d"cke_{dir}" style\x3d"margin:0;padding:0" onload\x3d"{onload}"\x3e\x3c/body\x3e\x3c/html\x3e');CKEDITOR.ui.panel.prototype={render:function(a, f){
 const m={editorId:a.id, id:this.id, langCode:a.langCode, dir:a.lang.dir, cls:this.className, frame:'', env:CKEDITOR.env.cssClass, 'z-index':a.config.baseFloatZIndex+1};
    this.getHolderElement=function(){
 var a=this._.holder;if(!a){
 if(this.isFramed){
 var a=this.document.getById(`${this.id}_frame`), b=a.getParent(), a=a.getFrameDocument();CKEDITOR.env.iOS&&b.setStyles({overflow:'scroll', '-webkit-overflow-scrolling':'touch'});b=CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function(){
 this.isLoaded=!0;if(this.onLoad)this.onLoad(); 
}, this));a.write(g.output(CKEDITOR.tools.extend({css:CKEDITOR.tools.buildStyleHtml(this.css), onload:`window.parent.CKEDITOR.tools.callFunction(${
    b});`}, m)));a.getWindow().$.CKEDITOR=CKEDITOR;a.on('keydown', function(a){
 const b=a.data.getKeystroke(), c=this.document.getById(this.id).getAttribute('dir');if('input'!==a.data.getTarget().getName()||37!==b&&39!==b)this._.onKeyDown&&!1===this._.onKeyDown(b)?'input'===a.data.getTarget().getName()&&32===b||a.data.preventDefault():(27==b||b==('rtl'==c?39:37))&&this.onEscape&&!1===this.onEscape(b)&&a.data.preventDefault(); 
}, this);a=a.getBody();a.unselectable();CKEDITOR.env.air&&CKEDITOR.tools.callFunction(b); 
}else a=
    this.document.getById(this.id);this._.holder=a; 
}return a; 
};if(this.isFramed){
 var k=CKEDITOR.env.air?'javascript:void(0)':CKEDITOR.env.ie&&!CKEDITOR.env.edge?`javascript:void(function(){${encodeURIComponent(`document.open();(${CKEDITOR.tools.fixDomain})();document.close();`)}}())`:'';m.frame=h.output({id:`${this.id}_frame`, src:k}); 
}k=c.output(m);f&&f.push(k);return k; 
}, addBlock:function(a, c){
 c=this._.blocks[a]=c instanceof CKEDITOR.ui.panel.block?c:new CKEDITOR.ui.panel.block(this.getHolderElement(), c);
    this._.currentBlock||this.showBlock(a);return c; 
}, getBlock:function(a){
 return this._.blocks[a]; 
}, showBlock:function(a){
 a=this._.blocks[a];const c=this._.currentBlock, g=!this.forceIFrame||CKEDITOR.env.ie?this._.holder:this.document.getById(`${this.id}_frame`);c&&c.hide();this._.currentBlock=a;CKEDITOR.fire('ariaWidget', g);a._.focusIndex=-1;this._.onKeyDown=a.onKeyDown&&CKEDITOR.tools.bind(a.onKeyDown, a);a.show();return a; 
}, destroy:function(){
 this.element&&this.element.remove(); 
}};CKEDITOR.ui.panel.block=CKEDITOR.tools.createClass({$:function(a,
    c){
 this.element=a.append(a.getDocument().createElement('div', {attributes:{tabindex:-1, 'class':'cke_panel_block'}, styles:{display:'none'}}));c&&CKEDITOR.tools.extend(this, c);this.element.setAttributes({role:this.attributes.role||'presentation', 'aria-label':this.attributes['aria-label'], title:this.attributes.title||this.attributes['aria-label']});this.keys={};this._.focusIndex=-1;this.element.disableContextMenu(); 
}, _:{markItem:function(a){
 -1!=a&&(a=this._.getItems().getItem(this._.focusIndex=a), CKEDITOR.env.webkit&&
    a.getDocument().getWindow().focus(), a.focus(), this.onMark&&this.onMark(a)); 
}, markFirstDisplayed:function(a){
 for(var c=function(a){
 return a.type==CKEDITOR.NODE_ELEMENT&&'none'==a.getStyle('display'); 
}, g=this._.getItems(), h, l, b=g.count()-1;0<=b;b--)if(h=g.getItem(b), h.getAscendant(c)||(l=h, this._.focusIndex=b), 'true'==h.getAttribute('aria-selected')){
 l=h;this._.focusIndex=b;break; 
}l&&(a&&a(), CKEDITOR.env.webkit&&l.getDocument().getWindow().focus(), l.focus(), this.onMark&&this.onMark(l)); 
}, getItems:function(){
 return this.element.find('a,input'); 
}},
    proto:{show:function(){
 this.element.setStyle('display', ''); 
}, hide:function(){
 this.onHide&&!0===this.onHide.call(this)||this.element.setStyle('display', 'none'); 
}, onKeyDown:function(a, c){
 var g=this.keys[a];switch(g){
 case 'next':for(var h=this._.focusIndex, g=this._.getItems(), l;l=g.getItem(++h);)if(l.getAttribute('_cke_focus')&&l.$.offsetWidth){
 this._.focusIndex=h;l.focus(!0);break; 
}return l||c?!1:(this._.focusIndex=-1, this.onKeyDown(a, 1));case 'prev':h=this._.focusIndex;for(g=this._.getItems();0<h&&(l=
    g.getItem(--h));){
 if(l.getAttribute('_cke_focus')&&l.$.offsetWidth){
 this._.focusIndex=h;l.focus(!0);break; 
}l=null; 
}return l||c?!1:(this._.focusIndex=g.count(), this.onKeyDown(a, 1));case 'click':case 'mouseup':return h=this._.focusIndex, (l=0<=h&&this._.getItems().getItem(h))&&l.fireEventHandler(g, {button:CKEDITOR.tools.normalizeMouseButton(CKEDITOR.MOUSE_BUTTON_LEFT, !0)}), !1; 
}return!0; 
}}}); 
}(), CKEDITOR.plugins.add('floatpanel', {requires:'panel'}), function(){
 function c(c, a, f, m, k){
 k=CKEDITOR.tools.genKey(a.getUniqueId(),
    f.getUniqueId(), c.lang.dir, c.uiColor||'', m.css||'', k||'');let l=h[k];l||(l=h[k]=new CKEDITOR.ui.panel(a, m), l.element=f.append(CKEDITOR.dom.element.createFromHtml(l.render(c), a)), l.element.setStyles({display:'none', position:'absolute'}));return l; 
}var h={};CKEDITOR.ui.floatPanel=CKEDITOR.tools.createClass({$:function(g, a, f, h){
 function k(){
 e.hide(); 
}f.forceIFrame=1;f.toolbarRelated&&g.elementMode==CKEDITOR.ELEMENT_MODE_INLINE&&(a=CKEDITOR.document.getById(`cke_${g.name}`));const l=a.getDocument();h=c(g, l,
    a, f, h||0);var b=h.element, d=b.getFirst(), e=this;b.disableContextMenu();this.element=b;this._={editor:g, panel:h, parentElement:a, definition:f, document:l, iframe:d, children:[], dir:g.lang.dir, showBlockParams:null, markFirst:void 0!==f.markFirst?f.markFirst:!0};g.on('mode', k);g.on('resize', k);l.getWindow().on('resize', function(){
 this.reposition(); 
}, this); 
}, proto:{addBlock:function(c, a){
 return this._.panel.addBlock(c, a); 
}, addListBlock:function(c, a){
 return this._.panel.addListBlock(c, a); 
}, getBlock:function(c){
 return this._.panel.getBlock(c); 
},
    showBlock:function(c, a, f, h, k, l){
 const b=this._.panel, d=b.showBlock(c);this._.showBlockParams=[].slice.call(arguments);this.allowBlur(!1);var e=this._.editor.editable();this._.returnFocus=e.hasFocus?e:new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement);this._.hideTimeout=0;var n=this.element, e=this._.iframe, e=CKEDITOR.env.ie&&!CKEDITOR.env.edge?e:new CKEDITOR.dom.window(e.$.contentWindow), t=n.getDocument(), x=this._.parentElement.getPositionedAncestor(), p=a.getDocumentPosition(t), t=x?x.getDocumentPosition(t):
    {x:0, y:0}, q='rtl'==this._.dir, v=p.x+(h||0)-t.x, w=p.y+(k||0)-t.y;!q||1!=f&&4!=f?q||2!=f&&3!=f||(v+=a.$.offsetWidth-1):v+=a.$.offsetWidth;if(3==f||4==f)w+=a.$.offsetHeight-1;this._.panel._.offsetParentId=a.getId();n.setStyles({top:`${w}px`, left:0, display:''});n.setOpacity(0);n.getFirst().removeStyle('width');this._.editor.focusManager.add(e);this._.blurSet||(CKEDITOR.event.useCapture=!0, e.on('blur', function(a){
 function b(){
 delete this._.returnFocus;this.hide(); 
}this.allowBlur()&&a.data.getPhase()==CKEDITOR.EVENT_PHASE_AT_TARGET&&
    this.visible&&!this._.activeChild&&(CKEDITOR.env.iOS?this._.hideTimeout||(this._.hideTimeout=CKEDITOR.tools.setTimeout(b, 0, this)):b.call(this)); 
}, this), e.on('focus', function(){
 this._.focused=!0;this.hideChild();this.allowBlur(!0); 
}, this), CKEDITOR.env.iOS&&(e.on('touchstart', function(){
 clearTimeout(this._.hideTimeout); 
}, this), e.on('touchend', function(){
 this._.hideTimeout=0;this.focus(); 
}, this)), CKEDITOR.event.useCapture=!1, this._.blurSet=1);b.onEscape=CKEDITOR.tools.bind(function(a){
 if(this.onEscape&&
    !1===this.onEscape(a))return!1; 
}, this);CKEDITOR.tools.setTimeout(function(){
 const a=CKEDITOR.tools.bind(function(){
 var a=n;a.removeStyle('width');if(d.autoSize){
 var c=d.element.getDocument(), c=(CKEDITOR.env.webkit||CKEDITOR.env.edge?d.element:c.getBody()).$.scrollWidth;CKEDITOR.env.ie&&CKEDITOR.env.quirks&&0<c&&(c+=(a.$.offsetWidth||0)-(a.$.clientWidth||0)+3);a.setStyle('width', `${c+10}px`);c=d.element.$.scrollHeight;CKEDITOR.env.ie&&CKEDITOR.env.quirks&&0<c&&(c+=(a.$.offsetHeight||0)-(a.$.clientHeight||
    0)+3);a.setStyle('height', `${c}px`);b._.currentBlock.element.setStyle('display', 'none').removeStyle('display'); 
}else a.removeStyle('height');q&&(v-=n.$.offsetWidth);n.setStyle('left', `${v}px`);var c=b.element.getWindow(), a=n.$.getBoundingClientRect(), c=c.getViewPaneSize(), e=a.width||a.right-a.left, f=a.height||a.bottom-a.top, g=q?a.right:c.width-a.left, h=q?c.width-a.right:a.left;q?g<e&&(v=h>e?v+e:c.width>e?v-a.left:v-a.right+c.width):g<e&&(v=h>e?v-e:c.width>e?v-a.right+c.width:v-a.left);e=a.top;c.height-
    a.top<f&&(w=e>f?w-f:c.height>f?w-a.bottom+c.height:w-a.top);CKEDITOR.env.ie&&!CKEDITOR.env.edge&&((c=a=n.$.offsetParent&&new CKEDITOR.dom.element(n.$.offsetParent))&&'html'==c.getName()&&(c=c.getDocument().getBody()), c&&'rtl'==c.getComputedStyle('direction')&&(v=CKEDITOR.env.ie8Compat?v-2*n.getDocument().getDocumentElement().$.scrollLeft:v-(a.$.scrollWidth-a.$.clientWidth)));var a=n.getFirst(), k;(k=a.getCustomData('activePanel'))&&k.onHide&&k.onHide.call(this, 1);a.setCustomData('activePanel', this);
    n.setStyles({top:`${w}px`, left:`${v}px`});n.setOpacity(1);l&&l(); 
}, this);b.isLoaded?a():b.onLoad=a;CKEDITOR.tools.setTimeout(function(){
 const a=CKEDITOR.env.webkit&&CKEDITOR.document.getWindow().getScrollPosition().y;this.focus();d.element.focus();CKEDITOR.env.webkit&&(CKEDITOR.document.getBody().$.scrollTop=a);this.allowBlur(!0);this._.markFirst&&(CKEDITOR.env.ie?CKEDITOR.tools.setTimeout(function(){
 d.markFirstDisplayed?d.markFirstDisplayed():d._.markFirstDisplayed(); 
}, 0):d.markFirstDisplayed?d.markFirstDisplayed():
    d._.markFirstDisplayed());this._.editor.fire('panelShow', this); 
}, 0, this); 
}, CKEDITOR.env.air?200:0, this);this.visible=1;this.onShow&&this.onShow.call(this); 
}, reposition:function(){
 const c=this._.showBlockParams;this.visible&&this._.showBlockParams&&(this.hide(), this.showBlock.apply(this, c)); 
}, focus:function(){
 if(CKEDITOR.env.webkit){
 const c=CKEDITOR.document.getActive();c&&!c.equals(this._.iframe)&&c.$.blur(); 
}(this._.lastFocused||this._.iframe.getFrameDocument().getWindow()).focus(); 
}, blur:function(){
 const c=
    this._.iframe.getFrameDocument().getActive();c&&c.is('a')&&(this._.lastFocused=c); 
}, hide:function(c){
 if(this.visible&&(!this.onHide||!0!==this.onHide.call(this))){
 this.hideChild();CKEDITOR.env.gecko&&this._.iframe.getFrameDocument().$.activeElement.blur();this.element.setStyle('display', 'none');this.visible=0;this.element.getFirst().removeCustomData('activePanel');if(c=c&&this._.returnFocus)CKEDITOR.env.webkit&&c.type&&c.getWindow().$.focus(), c.focus();delete this._.lastFocused;this._.showBlockParams=
    null;this._.editor.fire('panelHide', this); 
} 
}, allowBlur:function(c){
 const a=this._.panel;void 0!==c&&(a.allowBlur=c);return a.allowBlur; 
}, showAsChild:function(c, a, f, h, k, l){
 if(this._.activeChild!=c||c._.panel._.offsetParentId!=f.getId())this.hideChild(), c.onHide=CKEDITOR.tools.bind(function(){
 CKEDITOR.tools.setTimeout(function(){
 this._.focused||this.hide(); 
}, 0, this); 
}, this), this._.activeChild=c, this._.focused=!1, c.showBlock(a, f, h, k, l), this.blur(), (CKEDITOR.env.ie7Compat||CKEDITOR.env.ie6Compat)&&setTimeout(function(){
 c.element.getChild(0).$.style.cssText+=
    ''; 
}, 100); 
}, hideChild:function(c){
 const a=this._.activeChild;a&&(delete a.onHide, delete this._.activeChild, a.hide(), c&&this.focus()); 
}}});CKEDITOR.on('instanceDestroyed', function(){
 let c=CKEDITOR.tools.isEmpty(CKEDITOR.instances), a;for(a in h){
 const f=h[a];c?f.destroy():f.element.hide(); 
}c&&(h={}); 
}); 
}(), function(){
 let c, h, g;CKEDITOR.plugins.add('colorbutton', {requires:'panelbutton,floatpanel', init:function(a){
 function f(c){
 function f(){
 const b=a.config[`colorButton_${w}Style`];b.childRule='back'==w?function(a){
 return k(a); 
}:
    function(a){
 return!(a.is('a')||a.getElementsByTag('a').count())||k(a); 
};return b; 
}function n(b, d, c){
 const e={};b&&(e.color=b);d&&(e.colorName=d);d=!CKEDITOR.tools.isEmpty(e)&&new CKEDITOR.style(f(), e);a.execCommand(r, {newStyle:d});if(b&&c)for(c.addColor(b.substr(1).toUpperCase()), b=I.element.find('[role\x3doption]').toArray(), c=0;c<b.length;c++)b[c].setAttributes({'aria-posinset':c+1, 'aria-setsize':b.length}); 
}var t=c.name, w=c.type, u=c.title, A=c.order, r=c.commandName;c=c.contentTransformations||{};var y=
    new CKEDITOR.style(d[`colorButton_${w}Style`]), z=`${CKEDITOR.tools.getNextId()}_colorBox`, B={type:w}, C=new CKEDITOR.style(d[`colorButton_${w}Style`], {color:'inherit'}), E=function(){
 return CKEDITOR.tools.addFunction(function(b, d, c){
 a.focus();a.fire('saveSnapshot');'?'==b?a.getColorFromDialog(function(a){
 a&&n(a, d, F); 
}, null, B):n(b&&`#${b}`, d, F);c&&(c.setAttribute('cke_colorlast', !0), a.once('selectionChange', function(){
 c.removeAttribute('cke_colorlast'); 
})); 
}); 
}(), F=g.getRowLimit(a)?new g(a, 'back'==w?'background-color':
    'color', E):void 0, I;a.addCommand(r, {contextSensitive:!0, exec:function(a, b){
 if(!a.readOnly){
 const d=b.newStyle;a.removeStyle(C);a.focus();d&&a.applyStyle(d);a.fire('saveSnapshot'); 
} 
}, refresh:function(a, b){
 C.checkApplicable(b, a, a.activeFilter)?C.checkActive(b, a)?this.setState(CKEDITOR.TRISTATE_ON):this.setState(CKEDITOR.TRISTATE_OFF):this.setState(CKEDITOR.TRISTATE_DISABLED); 
}});a.ui.add(t, CKEDITOR.UI_PANELBUTTON, {label:u, title:u, command:r, editorFocus:0, toolbar:`colors,${A}`, allowedContent:y, requiredContent:y,
    contentTransformations:c, panel:{css:CKEDITOR.skin.getPath('editor'), attributes:{role:'listbox', 'aria-label':e.panelTitle}}, select:function(a){
 const c=d.colorButton_colors.split(',');a=CKEDITOR.tools.array.find(c, a);a=b(a);l(I, a);I._.markFirstDisplayed(); 
}, onBlock:function(b, d){
 I=d;d.autoSize=!0;d.element.addClass('cke_colorblock');d.element.setHtml(h(z, E, F?F.getLength():0));d.element.getDocument().getBody().setStyle('overflow', 'hidden');CKEDITOR.ui.fire('ready', this);const c=d.keys, e='rtl'==a.lang.dir;
    c[e?37:39]='next';c[40]='next';c[9]='next';c[e?39:37]='prev';c[38]='prev';c[CKEDITOR.SHIFT+9]='prev';c[32]='click';F&&F.setContainer(d.element.findOne('.cke_colorhistory')); 
}, onOpen:function(){
 var c=a.getSelection(), e=c&&c.getStartElement(), f=a.elementPath(e), g='back'==w?'background-color':'color';if(f){
 e=f.block||f.blockLimit||a.document.getBody();do f=e&&e.getComputedStyle(g)||'transparent';while('back'==w&&'transparent'==f&&e&&(e=e.getParent()));f&&'transparent'!=f||(f='#ffffff');d.colorButton_enableAutomatic&&
    I.element.findOne(`#${z}`).setStyle('background-color', f);if(e=c&&c.getRanges()[0]){
 for(var c=new CKEDITOR.dom.walker(e), h=e.collapsed?e.startContainer:c.next(), e='';h;){
 h.type!==CKEDITOR.NODE_ELEMENT&&(h=h.getParent());h=b(h.getComputedStyle(g));e=e||h;if(e!==h){
 e='';break; 
}h=c.next(); 
}'transparent'==e&&(e='');'fore'==w&&(B.automaticTextColor=`#${b(f)}`);B.selectionColor=e?`#${e}`:'';l(I, e); 
}return f; 
} 
}}); 
}function h(b, f, k){
 const l=[], m=d.colorButton_colors.split(','), n=a.plugins.colordialog&&d.colorButton_enableMore;
    k=m.length+k+(n?1:0);let t=1;d.colorButton_enableAutomatic&&(k+=1, t+=1, l.push('\x3ca class\x3d"cke_colorauto" _cke_focus\x3d1 hidefocus\x3dtrue', ' title\x3d"', e.auto, '"', ' draggable\x3d"false"', ' ondragstart\x3d"return false;"', ' onclick\x3d"CKEDITOR.tools.callFunction(', f, ',null);return false;"', ' href\x3d"javascript:void(\'', e.auto, '\')"', ' role\x3d"option" aria-posinset\x3d"1" aria-setsize\x3d"', k, '"\x3e', '\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e',
    '\x3ctr\x3e', '\x3ctd colspan\x3d"', a.config.colorButton_colorsPerRow, '" align\x3d"center"\x3e', '\x3cspan class\x3d"cke_colorbox" id\x3d"', b, '"\x3e\x3c/span\x3e', e.auto, '\x3c/td\x3e', '\x3c/tr\x3e', '\x3c/table\x3e', '\x3c/a\x3e'));l.push('\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e\x3ctbody\x3e');for(b=0;b<m.length;b++){
 0===b%a.config.colorButton_colorsPerRow&&l.push('\x3c/tr\x3e\x3ctr\x3e');var r=m[b].split('/'), y=r[0], r=new c(a, {color:r[1]||y, label:r[1]?y:
    void 0}, f);r.setPositionIndex(t+b, k);l.push(r.getHtml()); 
}g.getRowLimit(a)&&g.renderContainer(l, a);n&&l.push('\x3c/tr\x3e', '\x3ctr\x3e', '\x3ctd colspan\x3d"', a.config.colorButton_colorsPerRow, '" align\x3d"center"\x3e', '\x3ca class\x3d"cke_colormore" _cke_focus\x3d1 hidefocus\x3dtrue', ' title\x3d"', e.more, '"', ' draggable\x3d"false"', ' ondragstart\x3d"return false;"', ' onclick\x3d"CKEDITOR.tools.callFunction(', f, ',\'?\');return false;"', ' href\x3d"javascript:void(\'', e.more, '\')"', ' role\x3d"option" aria-posinset\x3d"',
    k, '" aria-setsize\x3d"', k, '"\x3e', e.more, '\x3c/a\x3e', '\x3c/td\x3e');l.push('\x3c/tr\x3e\x3c/tbody\x3e\x3c/table\x3e');return l.join(''); 
}function k(a){
 return'false'==a.getAttribute('contentEditable')||a.getAttribute('data-nostyle'); 
}function l(a, d){
 let c=a._.getItems(), e=a.element.findOne('[aria-selected]'), f=a.element.findOne('[cke_colorlast]');e&&e.removeAttribute('aria-selected');if(f)f.setAttribute('aria-selected', !0);else for(e=0;e<c.count();e++)if(f=c.getItem(e), d&&d==b(f.getAttribute('data-value'))){
 f.setAttribute('aria-selected',
    !0);break; 
} 
}function b(a){
 return CKEDITOR.tools.normalizeHex(`#${CKEDITOR.tools.convertRgbToHex(a||'')}`).replace(/#/g, ''); 
}var d=a.config, e=a.lang.colorbutton;if(!CKEDITOR.env.hc){
 f({name:'TextColor', type:'fore', commandName:'textColor', title:e.textColorTitle, order:10, contentTransformations:[[{element:'font', check:'span{color}', left:function(a){
 return!!a.attributes.color; 
}, right:function(a){
 a.name='span';a.attributes.color&&(a.styles.color=a.attributes.color);delete a.attributes.color; 
}}]]});let n, t=a.config.colorButton_normalizeBackground;
    if(void 0===t||t)n=[[{element:'span', left:function(a){
 const b=CKEDITOR.tools;if('span'!=a.name||!a.styles||!a.styles.background)return!1;a=b.style.parse.background(a.styles.background);return a.color&&1===b.object.keys(a).length; 
}, right:function(b){
 const d=(new CKEDITOR.style(a.config.colorButton_backStyle, {color:b.styles.background})).getDefinition();b.name=d.element;b.styles=d.styles;b.attributes=d.attributes||{};return b; 
}}]];f({name:'BGColor', type:'back', commandName:'bgColor', title:e.bgColorTitle, order:20,
    contentTransformations:n}); 
} 
}});c=CKEDITOR.tools.createClass({$:function(a, f, g){
 this.$=new CKEDITOR.dom.element('td');this.color=f.color;this.clickFn=g;this.label=f.label||c.colorNames(a)[this.color]||this.color;this.setHtml(); 
}, statics:{colorNames:function(a){
 return a.lang.colorbutton.colors; 
}}, proto:{getElement:function(){
 return this.$; 
}, getHtml:function(){
 return this.getElement().getOuterHtml(); 
}, setHtml:function(){
 this.getElement().setHtml(`\x3ca class\x3d"cke_colorbox" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"${
    this.label}" draggable\x3d"false" ondragstart\x3d"return false;" onclick\x3d"CKEDITOR.tools.callFunction(${this.clickFn},'${this.color}','${this.label}', this); return false;" href\x3d"javascript:void('${this.color}')" data-value\x3d"${this.color}" role\x3d"option"\x3e\x3cspan class\x3d"cke_colorbox" style\x3d"background-color:#${this.color}"\x3e\x3c/span\x3e\x3c/a\x3e`); 
}, setPositionIndex:function(a, c){
 this.getElement().getChild(0).setAttributes({'aria-posinset':a, 'aria-setsize':c}); 
}}});
    h=CKEDITOR.tools.createClass({$:function(){
 this.$=new CKEDITOR.dom.element('tr');this.$.addClass('cke_colorhistory_row');this.boxes=[]; 
}, proto:{getElement:function(){
 return this.$; 
}, removeLastColor:function(){
 this.getElement().getLast().remove();return this.boxes.pop(); 
}, addNewColor:function(a){
 this.boxes.unshift(a);this.getElement().append(a.getElement(), !0); 
}, extractColorBox:function(a){
 const c=CKEDITOR.tools.getIndex(this.boxes, function(c){
 return c.color===a; 
});if(0>c)return null;this.boxes[c].getElement().remove();
    return this.boxes.splice(c, 1)[0]; 
}}});g=CKEDITOR.tools.createClass({$:function(a, c, g){
 this.editor=a;this.cssProperty=c;this.clickFn=g;this.rows=[];this._.addNewRow();if(this.editor.config.colorButton_renderContentColors)this.editor.once('instanceReady', function(){
 this.renderContentColors(); 
}, this); 
}, statics:{renderContainer:function(a, c){
 a.push('\x3c/tbody\x3e\x3ctbody class\x3d"cke_colorhistory" style\x3d"display:none;"\x3e', '\x3ctr\x3e', '\x3ctd colspan\x3d"', c.config.colorButton_colorsPerRow, '" align\x3d"center"\x3e',
    '\x3cspan\x3e\x3chr\x3e\x3c/span\x3e', '\x3c/td\x3e', '\x3c/tr\x3e', '\x3c/tbody\x3e\x3ctbody\x3e'); 
}, getRowLimit:function(a){
 return a.config.colorButton_historyRowLimit; 
}, getCapacity:function(a){
 return g.getRowLimit(a)*a.config.colorButton_colorsPerRow; 
}, colorList:CKEDITOR.tools.style.parse._colors}, _:{countColors:function(){
 const a=CKEDITOR.tools.getStyledSpans(this.cssProperty, this.editor.editable());return CKEDITOR.tools.array.reduce(a, function(a, c){
 const h=this._.getHexCode(c, this.cssProperty, g.colorList);
    a[h]=a[h]||0;a[h]+=1;return a; 
}, {}, this); 
}, getHexCode:function(a, c, g){
 const h=a.getStyle(c);return h in g?g[h].substr(1):this._.normalizeColor(a.getComputedStyle(c)).toUpperCase(); 
}, sortByOccurrencesAscending:function(a, c){
 let g=[], h;for(h in a){
 const l={};l[c]=h;l.frequency=a[h];g.push(l); 
}g.sort(function(a, d){
 return d.frequency-a.frequency; 
});this._.trimToCapacity(g);return g.reverse(); 
}, trimToCapacity:function(a){
 a.splice(g.getCapacity(this.editor)); 
}, addColors:function(a){
 CKEDITOR.tools.array.forEach(a,
    function(a){
 this.addColor(a.colorCode); 
}, this); 
}, extractColorBox:function(a){
 for(let c=0;c<this.rows.length;c++){
 const g=this.rows[c].extractColorBox(a);if(g)return g; 
}return null; 
}, moveToBeginning:function(a){
 this.rows[0].addNewColor(a); 
}, createAtBeginning:function(a){
 this._.moveToBeginning(new c(this.editor, {color:a}, this.clickFn)); 
}, addNewRow:function(){
 this.rows.push(new h);this.container&&this.container.append(this.rows[this.rows.length-1].getElement()); 
}, alignRows:function(){
 for(let a=0;a<g.getRowLimit(this.editor)&&
    !(this.rows[a].boxes.length<=this.editor.config.colorButton_colorsPerRow);a++)this.rows[a+1]?this._.moveLastBoxToNextRow(a):a<g.getRowLimit(this.editor)-1?(this._.addNewRow(), this._.moveLastBoxToNextRow(a)):this.rows[a].removeLastColor(); 
}, moveLastBoxToNextRow:function(a){
 this.rows[a+1].addNewColor(this.rows[a].removeLastColor()); 
}, refreshPositions:function(){
 let a=this._.countPanelElements(), c=this._.calculateFirstPosition(a);CKEDITOR.tools.array.forEach(this.rows, function(g){
 CKEDITOR.tools.array.forEach(g.boxes,
    function(g){
 g.setPositionIndex(c, a);c+=1; 
}); 
}); 
}, countPanelElements:function(){
 let a=this.editor.config.colorButton_colors.split(',').length+this.getLength();this.editor.plugins.colordialog&&this.editor.config.colorButton_enableMore&&(a+=1);this.editor.config.colorButton_enableAutomatic&&(a+=1);return a; 
}, calculateFirstPosition:function(a){
 return this.editor.plugins.colordialog&&this.editor.config.colorButton_enableMore?a-this.getLength():a-this.getLength()+1; 
}, attachRows:function(){
 CKEDITOR.tools.array.forEach(this.rows,
    function(a){
 this.container.append(a.getElement()); 
}, this); 
}, normalizeColor:function(a){
 return CKEDITOR.tools.normalizeHex(`#${CKEDITOR.tools.convertRgbToHex(a||'')}`).replace(/#/g, ''); 
}}, proto:{setContainer:function(a){
 this.container=a;this._.attachRows();this.getLength()&&this.show(); 
}, show:function(){
 this.container&&this.container.show(); 
}, renderContentColors:function(){
 let a=this._.countColors();CKEDITOR.tools.isEmpty(a)||(a=this._.sortByOccurrencesAscending(a, 'colorCode'), this._.addColors(a), this._.refreshPositions()); 
},
    addColor:function(a){
 const c=this._.extractColorBox(a);this.container&&!this.container.isVisible()&&this.show();c?this._.moveToBeginning(c):this._.createAtBeginning(a);this._.alignRows(); 
}, getLength:function(){
 return CKEDITOR.tools.array.reduce(this.rows, function(a, c){
 return a+c.boxes.length; 
}, 0); 
}}}); 
}(), CKEDITOR.config.colorButton_enableMore=!0, CKEDITOR.config.colorButton_colors='1ABC9C,2ECC71,3498DB,9B59B6,4E5F70,F1C40F,16A085,27AE60,2980B9,8E44AD,2C3E50,F39C12,E67E22,E74C3C,ECF0F1,95A5A6,DDD,FFF,D35400,C0392B,BDC3C7,7F8C8D,999,000',
    CKEDITOR.config.colorButton_foreStyle={element:'span', styles:{color:'#(color)'}, overrides:[{element:'font', attributes:{color:null}}]}, CKEDITOR.config.colorButton_backStyle={element:'span', styles:{'background-color':'#(color)'}}, CKEDITOR.config.colorButton_enableAutomatic=!0, CKEDITOR.config.colorButton_colorsPerRow=6, CKEDITOR.config.colorButton_historyRowLimit=1, CKEDITOR.config.colorButton_renderContentColors=!0, CKEDITOR.plugins.colordialog={requires:'dialog', init:function(c){
 const h=new CKEDITOR.dialogCommand('colordialog');
    h.editorFocus=!1;c.addCommand('colordialog', h);CKEDITOR.dialog.add('colordialog', `${this.path}dialogs/colordialog.js`);c.getColorFromDialog=function(g, a, f){
 let h, k, l, b;h=function(b){
 l(this);b='ok'==b.name?this.getValueOf('picker', 'selectedColor'):null;/^[0-9a-f]{3}([0-9a-f]{3})?$/i.test(b)&&(b=`#${b}`);g.call(a, b); 
};k=function(a){
 f&&(a.data=f); 
};l=function(a){
 a.removeListener('ok', h);a.removeListener('cancel', h);a.removeListener('show', k); 
};b=function(a){
 a.on('ok', h);a.on('cancel', h);a.on('show', k, null,
    null, 5); 
};c.execCommand('colordialog');if(c._.storedDialogs&&c._.storedDialogs.colordialog)b(c._.storedDialogs.colordialog);else CKEDITOR.on('dialogDefinition', function(a){
 if('colordialog'==a.data.name){
 const c=a.data.definition;a.removeListener();c.onLoad=CKEDITOR.tools.override(c.onLoad, function(a){
 return function(){
 b(this);c.onLoad=a;'function'===typeof a&&a.call(this); 
}; 
}); 
} 
}); 
}; 
}}, CKEDITOR.plugins.add('colordialog', CKEDITOR.plugins.colordialog), function(){
 function c(a, c, b, d){
 const e=new CKEDITOR.dom.walker(a);
    if(a=a.startContainer.getAscendant(c, !0)||a.endContainer.getAscendant(c, !0))if(b(a), d)return;for(;a=e.next();)if(a=a.getAscendant(c, !0))if(b(a), d)break; 
}function h(c, f){
 const b={ul:'ol', ol:'ul'};return-1!==a(f, function(a){
 return a.element===c||a.element===b[c]; 
}); 
}function g(a){
 this.styles=null;this.sticky=!1;this.editor=a;this.filter=new CKEDITOR.filter(a, a.config.copyFormatting_allowRules);!0===a.config.copyFormatting_allowRules&&(this.filter.disabled=!0);a.config.copyFormatting_disallowRules&&this.filter.disallow(a.config.copyFormatting_disallowRules); 
}
    var a=CKEDITOR.tools.indexOf, f=CKEDITOR.tools.getMouseButton, m=!1;CKEDITOR.plugins.add('copyformatting', {lang:'ar,az,bg,cs,da,de,el,en,en-au,eo,es-mx,et,eu,fa,fr,gl,hr,hu,it,ja,ko,ku,lv,nb,nl,oc,pl,pt,pt-br,ro,ru,sk,sq,sr,sr-latn,sv,tr,uk,vi,zh,zh-cn', icons:'copyformatting', hidpi:!0, init:function(c){
 const g=CKEDITOR.plugins.copyformatting;g._addScreenReaderContainer();m||(CKEDITOR.document.appendStyleSheet(`${this.path}styles/copyformatting.css`), m=!0);c.addContentsCss&&c.addContentsCss(`${this.path}styles/copyformatting.css`);
    c.copyFormatting=new g.state(c);c.addCommand('copyFormatting', g.commands.copyFormatting);c.addCommand('applyFormatting', g.commands.applyFormatting);c.ui.addButton('CopyFormatting', {label:c.lang.copyformatting.label, command:'copyFormatting', toolbar:'cleanup,0'});c.on('contentDom', function(){
 let a=c.getCommand('copyFormatting'), d=c.editable(), e=d.isInline()?d:c.document, g=c.ui.get('CopyFormatting');d.attachListener(e, 'mouseup', function(d){
 f(d)===CKEDITOR.MOUSE_BUTTON_LEFT&&a.state===CKEDITOR.TRISTATE_ON&&
    c.execCommand('applyFormatting'); 
});d.attachListener(CKEDITOR.document, 'mouseup', function(e){
 f(e)!==CKEDITOR.MOUSE_BUTTON_LEFT||a.state!==CKEDITOR.TRISTATE_ON||d.contains(e.data.getTarget())||c.execCommand('copyFormatting'); 
});g&&(e=CKEDITOR.document.getById(g._.id), d.attachListener(e, 'dblclick', function(){
 c.execCommand('copyFormatting', {sticky:!0}); 
}), d.attachListener(e, 'mouseup', function(a){
 a.data.stopPropagation(); 
})); 
});c.config.copyFormatting_keystrokeCopy&&c.setKeystroke(c.config.copyFormatting_keystrokeCopy,
    'copyFormatting');c.on('key', function(a){
 const d=c.getCommand('copyFormatting');a=a.data.domEvent;a.getKeystroke&&27===a.getKeystroke()&&d.state===CKEDITOR.TRISTATE_ON&&c.execCommand('copyFormatting'); 
});c.copyFormatting.on('extractFormatting', function(a){
 let d=a.data.element;if(d.contains(c.editable())||d.equals(c.editable()))return a.cancel();d=g._convertElementToStyleDef(d);if(!c.copyFormatting.filter.check(new CKEDITOR.style(d), !0, !0))return a.cancel();a.data.styleDef=d; 
});c.copyFormatting.on('applyFormatting',
    function(b){
 if(!b.data.preventFormatStripping){
 let d=b.data.range, e=g._extractStylesFromRange(c, d), f=g._determineContext(d), m, x;if(c.copyFormatting._isContextAllowed(f))for(x=0;x<e.length;x++)f=e[x], m=d.createBookmark(), -1===a(g.preservedElements, f.element)?CKEDITOR.env.webkit&&!CKEDITOR.env.chrome?e[x].removeFromRange(b.data.range, b.editor):e[x].remove(b.editor):h(f.element, b.data.styles)&&g._removeStylesFromElementInRange(d, f.element), d.moveToBookmark(m); 
} 
});c.copyFormatting.on('applyFormatting',
    function(a){
 const d=CKEDITOR.plugins.copyformatting, e=d._determineContext(a.data.range);'list'===e&&c.copyFormatting._isContextAllowed('list')?d._applyStylesToListContext(a.editor, a.data.range, a.data.styles):'table'===e&&c.copyFormatting._isContextAllowed('table')?d._applyStylesToTableContext(a.editor, a.data.range, a.data.styles):c.copyFormatting._isContextAllowed('text')&&d._applyStylesToTextContext(a.editor, a.data.range, a.data.styles); 
}, null, null, 999); 
}});g.prototype._isContextAllowed=function(c){
 const f=
    this.editor.config.copyFormatting_allowedContexts;return!0===f||-1!==a(f, c); 
};CKEDITOR.event.implementOn(g.prototype);CKEDITOR.plugins.copyformatting={state:g, inlineBoundary:'h1 h2 h3 h4 h5 h6 p div'.split(' '), excludedAttributes:['id', 'style', 'href', 'data-cke-saved-href', 'dir'], elementsForInlineTransform:['li'], excludedElementsFromInlineTransform:['table', 'thead', 'tbody', 'ul', 'ol'], excludedAttributesFromInlineTransform:['value', 'type'], preservedElements:'ul ol li td th tr thead tbody table'.split(' '),
    breakOnElements:['ul', 'ol', 'table'], _initialKeystrokePasteCommand:null, commands:{copyFormatting:{exec:function(a, c){
 const b=CKEDITOR.plugins.copyformatting, d=a.copyFormatting, e=c?'keystrokeHandler'==c.from:!1, f=c?c.sticky||e:!1, g=b._getCursorContainer(a), h=CKEDITOR.document.getDocumentElement();if(this.state===CKEDITOR.TRISTATE_ON)return d.styles=null, d.sticky=!1, g.removeClass('cke_copyformatting_active'), h.removeClass('cke_copyformatting_disabled'), h.removeClass('cke_copyformatting_tableresize_cursor'),
    b._putScreenReaderMessage(a, 'canceled'), b._detachPasteKeystrokeHandler(a), this.setState(CKEDITOR.TRISTATE_OFF);d.styles=b._extractStylesFromElement(a, a.elementPath().lastElement);this.setState(CKEDITOR.TRISTATE_ON);e||(g.addClass('cke_copyformatting_active'), h.addClass('cke_copyformatting_tableresize_cursor'), a.config.copyFormatting_outerCursor&&h.addClass('cke_copyformatting_disabled'));d.sticky=f;b._putScreenReaderMessage(a, 'copied');b._attachPasteKeystrokeHandler(a); 
}}, applyFormatting:{editorFocus:CKEDITOR.env.ie&&
    !CKEDITOR.env.edge?!1:!0, exec:function(a, c){
 let b=a.getCommand('copyFormatting'), d=c?'keystrokeHandler'==c.from:!1, e=CKEDITOR.plugins.copyformatting, f=a.copyFormatting, g=e._getCursorContainer(a), h=CKEDITOR.document.getDocumentElement();if(d&&!f.styles)return e._putScreenReaderMessage(a, 'failed'), e._detachPasteKeystrokeHandler(a), !1;d=e._applyFormat(a, f.styles);f.sticky||(f.styles=null, g.removeClass('cke_copyformatting_active'), h.removeClass('cke_copyformatting_disabled'), h.removeClass('cke_copyformatting_tableresize_cursor'),
    b.setState(CKEDITOR.TRISTATE_OFF), e._detachPasteKeystrokeHandler(a));e._putScreenReaderMessage(a, d?'applied':'canceled'); 
}}}, _getCursorContainer:function(a){
 return a.elementMode===CKEDITOR.ELEMENT_MODE_INLINE?a.editable():a.editable().getParent(); 
}, _convertElementToStyleDef:function(a){
 var c=CKEDITOR.tools, b=a.getAttributes(CKEDITOR.plugins.copyformatting.excludedAttributes), c=c.parseCssText(a.getAttribute('style'), !0, !0);return{element:a.getName(), type:CKEDITOR.STYLE_INLINE, attributes:b, styles:c}; 
},
    _extractStylesFromElement:function(c, f){
 const b={}, d=[];do if(f.type===CKEDITOR.NODE_ELEMENT&&!f.hasAttribute('data-cke-bookmark')&&(b.element=f, c.copyFormatting.fire('extractFormatting', b, c)&&b.styleDef&&d.push(new CKEDITOR.style(b.styleDef)), f.getName&&-1!==a(CKEDITOR.plugins.copyformatting.breakOnElements, f.getName())))break;while((f=f.getParent())&&f.type===CKEDITOR.NODE_ELEMENT);return d; 
}, _extractStylesFromRange:function(a, c){
 for(var b=[], d=new CKEDITOR.dom.walker(c), e;e=d.next();)b=b.concat(CKEDITOR.plugins.copyformatting._extractStylesFromElement(a,
    e));return b; 
}, _removeStylesFromElementInRange:function(c, f){
 for(var b=-1!==a(['ol', 'ul', 'table'], f), d=new CKEDITOR.dom.walker(c), e;e=d.next();)if(e=e.getAscendant(f, !0))if(e.removeAttributes(e.getAttributes()), b)break; 
}, _getSelectedWordOffset:function(c){
 function f(a, b){
 return a[b?'getPrevious':'getNext'](function(a){
 return a.type!==CKEDITOR.NODE_COMMENT; 
}); 
}function b(a){
 return a.type==CKEDITOR.NODE_ELEMENT?(a=a.getHtml().replace(/<span.*?>&nbsp;<\/span>/g, ''), a.replace(/<.*?>/g, '')):a.getText(); 
}function d(c,
    e){
 let g=c, h=/\s/g, k='p br ol ul li td th div caption body'.split(' '), m=!1, n=!1, t, q;do{
 for(t=f(g, e);!t&&g.getParent();){
 g=g.getParent();if(-1!==a(k, g.getName())){
 n=m=!0;break; 
}t=f(g, e); 
}if(t&&t.getName&&-1!==a(k, t.getName())){
 m=!0;break; 
}g=t; 
}while(g&&g.getStyle&&('none'==g.getStyle('display')||!g.getText()));for(g||(g=c);g.type!==CKEDITOR.NODE_TEXT;)g=!m||e||n?g.getChild(0):g.getChild(g.getChildCount()-1);for(k=b(g);null!=(n=h.exec(k))&&(q=n.index, e););if('number'!==typeof q&&!m)return d(g, e);if(m)e?
    q=0:(h=/([\.\b]*$)/, q=(n=h.exec(k))?n.index:k.length);else if(e&&(q+=1, q>k.length))return d(g);return{node:g, offset:q}; 
}let e=/\b\w+\b/ig, g, h, m, p, q;m=p=q=c.startContainer;for(g=b(m);null!=(h=e.exec(g));)if(h.index+h[0].length>=c.startOffset)return c=h.index, e=h.index+h[0].length, 0===h.index&&(h=d(m, !0), p=h.node, c=h.offset), e>=g.length&&(g=d(m), q=g.node, e=g.offset), {startNode:p, startOffset:c, endNode:q, endOffset:e};return null; 
}, _filterStyles:function(a){
 let c=CKEDITOR.tools.isEmpty, b=[], d, e;for(e=0;e<
    a.length;e++)d=a[e]._.definition, -1!==CKEDITOR.tools.indexOf(CKEDITOR.plugins.copyformatting.inlineBoundary, d.element)&&(d.element=a[e].element='span'), 'span'===d.element&&c(d.attributes)&&c(d.styles)||b.push(a[e]);return b; 
}, _determineContext:function(a){
 function c(b){
 let d=new CKEDITOR.dom.walker(a), e;if(a.startContainer.getAscendant(b, !0)||a.endContainer.getAscendant(b, !0))return!0;for(;e=d.next();)if(e.getAscendant(b, !0))return!0; 
}return c({ul:1, ol:1})?'list':c('table')?'table':'text'; 
}, _applyStylesToTextContext:function(c,
    f, b){
 let d=CKEDITOR.plugins.copyformatting, e=d.excludedAttributesFromInlineTransform, g, h;CKEDITOR.env.webkit&&!CKEDITOR.env.chrome&&c.getSelection().selectRanges([f]);for(g=0;g<b.length;g++)if(f=b[g], -1===a(d.excludedElementsFromInlineTransform, f.element)){
 if(-1!==a(d.elementsForInlineTransform, f.element))for(f.element=f._.definition.element='span', h=0;h<e.length;h++)f._.definition.attributes[e[h]]&&delete f._.definition.attributes[e[h]];f.apply(c); 
} 
}, _applyStylesToListContext:function(a, f, b){
 let d,
    e, g;for(g=0;g<b.length;g++)d=b[g], e=f.createBookmark(), 'ol'===d.element||'ul'===d.element?c(f, {ul:1, ol:1}, function(a){
 const b=d;a.getName()!==b.element&&a.renameNode(b.element);b.applyToObject(a); 
}, !0):'li'===d.element?c(f, 'li', function(a){
 d.applyToObject(a); 
}):CKEDITOR.plugins.copyformatting._applyStylesToTextContext(a, f, [d]), f.moveToBookmark(e); 
}, _applyStylesToTableContext:function(f, g, b){
 function d(a, b){
 a.getName()!==b.element&&(b=b.getDefinition(), b.element=a.getName(), b=new CKEDITOR.style(b));b.applyToObject(a); 
}
    let e, h, m;for(m=0;m<b.length;m++)e=b[m], h=g.createBookmark(), -1!==a(['table', 'tr'], e.element)?c(g, e.element, function(a){
 e.applyToObject(a); 
}):-1!==a(['td', 'th'], e.element)?c(g, {td:1, th:1}, function(a){
 d(a, e); 
}):-1!==a(['thead', 'tbody'], e.element)?c(g, {thead:1, tbody:1}, function(a){
 d(a, e); 
}):CKEDITOR.plugins.copyformatting._applyStylesToTextContext(f, g, [e]), g.moveToBookmark(h); 
}, _applyFormat:function(a, c){
 let b=a.getSelection().getRanges()[0], d=CKEDITOR.plugins.copyformatting, e, f;if(!b)return!1;if(b.collapsed){
 f=
    a.getSelection().createBookmarks();if(!(e=d._getSelectedWordOffset(b)))return;b=a.createRange();b.setStart(e.startNode, e.startOffset);b.setEnd(e.endNode, e.endOffset);b.select(); 
}c=d._filterStyles(c);if(!a.copyFormatting.fire('applyFormatting', {styles:c, range:b, preventFormatStripping:!1}, a))return!1;f&&a.getSelection().selectBookmarks(f);return!0; 
}, _putScreenReaderMessage:function(a, c){
 const b=this._getScreenReaderContainer();b&&b.setText(a.lang.copyformatting.notification[c]); 
}, _addScreenReaderContainer:function(){
 if(this._getScreenReaderContainer())return this._getScreenReaderContainer();
    if(!CKEDITOR.env.ie6Compat&&!CKEDITOR.env.ie7Compat)return CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_screen_reader_only cke_copyformatting_notification"\x3e\x3cdiv aria-live\x3d"polite"\x3e\x3c/div\x3e\x3c/div\x3e')).getChild(0); 
}, _getScreenReaderContainer:function(){
 if(!CKEDITOR.env.ie6Compat&&!CKEDITOR.env.ie7Compat)return CKEDITOR.document.getBody().findOne('.cke_copyformatting_notification div[aria-live]'); 
}, _attachPasteKeystrokeHandler:function(a){
 const c=
    a.config.copyFormatting_keystrokePaste;c&&(this._initialKeystrokePasteCommand=a.keystrokeHandler.keystrokes[c], a.setKeystroke(c, 'applyFormatting')); 
}, _detachPasteKeystrokeHandler:function(a){
 const c=a.config.copyFormatting_keystrokePaste;c&&a.setKeystroke(c, this._initialKeystrokePasteCommand||!1); 
}};CKEDITOR.config.copyFormatting_outerCursor=!0;CKEDITOR.config.copyFormatting_allowRules='b s u i em strong span p div td th ol ul li(*)[*]{*}';CKEDITOR.config.copyFormatting_disallowRules='*[data-cke-widget*,data-widget*,data-cke-realelement](cke_widget*)';
    CKEDITOR.config.copyFormatting_allowedContexts=!0;CKEDITOR.config.copyFormatting_keystrokeCopy=CKEDITOR.CTRL+CKEDITOR.SHIFT+67;CKEDITOR.config.copyFormatting_keystrokePaste=CKEDITOR.CTRL+CKEDITOR.SHIFT+86; 
}(), CKEDITOR.plugins.add('menu', {requires:'floatpanel', beforeInit:function(c){
 for(var h=c.config.menu_groups.split(','), g=c._.menuGroups={}, a=c._.menuItems={}, f=0;f<h.length;f++)g[h[f]]=f+1;c.addMenuGroup=function(a, c){
 g[a]=c||100; 
};c.addMenuItem=function(c, f){
 g[f.group]&&(a[c]=new CKEDITOR.menuItem(this,
    c, f)); 
};c.addMenuItems=function(a){
 for(const c in a)this.addMenuItem(c, a[c]); 
};c.getMenuItem=function(c){
 return a[c]; 
};c.removeMenuItem=function(c){
 delete a[c]; 
}; 
}}), function(){
 function c(a){
 a.sort(function(a, b){
 return a.group<b.group?-1:a.group>b.group?1:a.order<b.order?-1:a.order>b.order?1:0; 
}); 
}var h='\x3cspan class\x3d"cke_menuitem"\x3e\x3ca id\x3d"{id}" class\x3d"cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href\x3d"{href}" title\x3d"{title}" tabindex\x3d"-1" _cke_focus\x3d1 hidefocus\x3d"true" role\x3d"{role}" aria-label\x3d"{attrLabel}" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasPopup}" aria-disabled\x3d"{disabled}" {ariaChecked} draggable\x3d"false"',
    g='';CKEDITOR.env.gecko&&CKEDITOR.env.mac&&(h+=' onkeypress\x3d"return false;"');CKEDITOR.env.gecko&&(h+=' onblur\x3d"this.style.cssText \x3d this.style.cssText;" ondragstart\x3d"return false;"');CKEDITOR.env.ie&&(g='return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26');var h=`${h} onmouseover\x3d"CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout\x3d"CKEDITOR.tools.callFunction({moveOutFn},{index});" onclick\x3d"${g}CKEDITOR.tools.callFunction({clickFn},{index}); return false;"\x3e`+
    '\x3cspan class\x3d"cke_menubutton_inner"\x3e\x3cspan class\x3d"cke_menubutton_icon"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{iconStyle}"\x3e\x3c/span\x3e\x3c/span\x3e\x3cspan class\x3d"cke_menubutton_label"\x3e{label}\x3c/span\x3e{shortcutHtml}{arrowHtml}\x3c/span\x3e\x3c/a\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_voice_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e\x3c/span\x3e', a=CKEDITOR.addTemplate('menuItem', h), f=CKEDITOR.addTemplate('menuArrow',
    '\x3cspan class\x3d"cke_menuarrow"\x3e\x3cspan\x3e{label}\x3c/span\x3e\x3c/span\x3e'), m=CKEDITOR.addTemplate('menuShortcut', '\x3cspan class\x3d"cke_menubutton_label cke_menubutton_shortcut"\x3e{shortcut}\x3c/span\x3e');CKEDITOR.menu=CKEDITOR.tools.createClass({$:function(a, c){
 c=this._.definition=c||{};this.id=CKEDITOR.tools.getNextId();this.editor=a;this.items=[];this._.listeners=[];this._.level=c.level||1;const b=CKEDITOR.tools.extend({}, c.panel, {css:[CKEDITOR.skin.getPath('editor')], level:this._.level-
    1, block:{}}), d=b.block.attributes=b.attributes||{};!d.role&&(d.role='menu');this._.panelDefinition=b; 
}, _:{onShow:function(){
 const a=this.editor.getSelection(), c=a&&a.getStartElement(), b=this.editor.elementPath(), d=this._.listeners;this.removeAll();for(let e=0;e<d.length;e++){
 const f=d[e](c, a, b);if(f)for(const g in f){
 const h=this.editor.getMenuItem(g);!h||h.command&&!this.editor.getCommand(h.command).state||(h.state=f[g], this.add(h)); 
} 
} 
}, onClick:function(a){
 this.hide();if(a.onClick)a.onClick();else a.command&&
    this.editor.execCommand(a.command); 
}, onEscape:function(a){
 const c=this.parent;c?c._.panel.hideChild(1):27==a&&this.hide(1);return!1; 
}, onHide:function(){
 this.onHide&&this.onHide(); 
}, showSubMenu:function(a){
 let c=this._.subMenu, b=this.items[a];if(b=b.getItems&&b.getItems()){
 c?c.removeAll():(c=this._.subMenu=new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, {level:this._.level+1}, !0)), c.parent=this, c._.onClick=CKEDITOR.tools.bind(this._.onClick, this));for(const d in b){
 const e=this.editor.getMenuItem(d);
    e&&(e.state=b[d], c.add(e)); 
}const f=this._.panel.getBlock(this.id).element.getDocument().getById(this.id+String(a));setTimeout(function(){
 c.show(f, 2); 
}, 0); 
}else this._.panel.hideChild(1); 
}}, proto:{add:function(a){
 a.order||(a.order=this.items.length);this.items.push(a); 
}, removeAll:function(){
 this.items=[]; 
}, show:function(a, f, b, d){
 if(!this.parent&&(this._.onShow(), !this.items.length))return;f=f||('rtl'==this.editor.lang.dir?2:1);let e=this.items, g=this.editor, h=this._.panel, m=this._.element;if(!h){
 h=this._.panel=
    new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level);h.onEscape=CKEDITOR.tools.bind(function(a){
 if(!1===this._.onEscape(a))return!1; 
}, this);h.onShow=function(){
 h._.panel.getHolderElement().getParent().addClass('cke').addClass('cke_reset_all'); 
};h.onHide=CKEDITOR.tools.bind(function(){
 this._.onHide&&this._.onHide(); 
}, this);m=h.addBlock(this.id, this._.panelDefinition.block);m.autoSize=!0;var p=m.keys;p[40]='next';p[9]='next';p[38]='prev';p[CKEDITOR.SHIFT+
    9]='prev';p['rtl'==g.lang.dir?37:39]=CKEDITOR.env.ie?'mouseup':'click';p[32]=CKEDITOR.env.ie?'mouseup':'click';CKEDITOR.env.ie&&(p[13]='mouseup');m=this._.element=m.element;p=m.getDocument();p.getBody().setStyle('overflow', 'hidden');p.getElementsByTag('html').getItem(0).setStyle('overflow', 'hidden');this._.itemOverFn=CKEDITOR.tools.addFunction(function(a){
 clearTimeout(this._.showSubTimeout);this._.showSubTimeout=CKEDITOR.tools.setTimeout(this._.showSubMenu, g.config.menu_subMenuDelay||400, this, [a]); 
},
    this);this._.itemOutFn=CKEDITOR.tools.addFunction(function(){
 clearTimeout(this._.showSubTimeout); 
}, this);this._.itemClickFn=CKEDITOR.tools.addFunction(function(a){
 const b=this.items[a];if(b.state==CKEDITOR.TRISTATE_DISABLED)this.hide(1);else if(b.getItems)this._.showSubMenu(a);else this._.onClick(b); 
}, this); 
}c(e);for(var p=g.elementPath(), p=[`\x3cdiv class\x3d"cke_menu${p&&p.direction()!=g.lang.dir?' cke_mixed_dir_content':''}" role\x3d"presentation"\x3e`], q=e.length, v=q&&e[0].group, w=0;w<q;w++){
 const u=
    e[w];v!=u.group&&(p.push('\x3cdiv class\x3d"cke_menuseparator" role\x3d"separator"\x3e\x3c/div\x3e'), v=u.group);u.render(this, w, p); 
}p.push('\x3c/div\x3e');m.setHtml(p.join(''));CKEDITOR.ui.fire('ready', this);this.parent?this.parent._.panel.showAsChild(h, this.id, a, f, b, d):h.showBlock(this.id, a, f, b, d);g.fire('menuShow', [h]); 
}, addListener:function(a){
 this._.listeners.push(a); 
}, hide:function(a){
 this._.onHide&&this._.onHide();this._.panel&&this._.panel.hide(a); 
}, findItemByCommandName:function(a){
 let c=CKEDITOR.tools.array.filter(this.items,
    function(b){
 return a===b.command; 
});return c.length?(c=c[0], {item:c, element:this._.element.findOne(`.${c.className}`)}):null; 
}}});CKEDITOR.menuItem=CKEDITOR.tools.createClass({$:function(a, c, b){
 CKEDITOR.tools.extend(this, b, {order:0, className:`cke_menubutton__${c}`});this.group=a._.menuGroups[this.group];this.editor=a;this.name=c; 
}, proto:{render:function(c, g, b){
 let d=c.id+String(g), e='undefined'===typeof this.state?CKEDITOR.TRISTATE_OFF:this.state, h='', t=this.editor, x, p, q=e==CKEDITOR.TRISTATE_ON?'on':e==CKEDITOR.TRISTATE_DISABLED?
    'disabled':'off';this.role in{menuitemcheckbox:1, menuitemradio:1}&&(h=` aria-checked\x3d"${e==CKEDITOR.TRISTATE_ON?'true':'false'}"`);let v=this.getItems, w=`\x26#${'rtl'==this.editor.lang.dir?'9668':'9658'};`, u=this.name;this.icon&&!/\./.test(this.icon)&&(u=this.icon);this.command&&(x=t.getCommand(this.command), (x=t.getCommandKeystroke(x))&&(p=CKEDITOR.tools.keystrokeToString(t.lang.common.keyboard, x)));x=CKEDITOR.tools.htmlEncodeAttr(this.label);c={id:d, name:this.name, iconName:u, label:this.label,
    attrLabel:x, cls:this.className||'', state:q, hasPopup:v?'true':'false', disabled:e==CKEDITOR.TRISTATE_DISABLED, title:x+(p?` (${p.display})`:''), ariaShortcut:p?`${t.lang.common.keyboardShortcut} ${p.aria}`:'', href:`javascript:void('${(x||'').replace('\'')}')`, hoverFn:c._.itemOverFn, moveOutFn:c._.itemOutFn, clickFn:c._.itemClickFn, index:g, iconStyle:CKEDITOR.skin.getIconStyle(u, 'rtl'==this.editor.lang.dir, u==this.icon?null:this.icon, this.iconOffset), shortcutHtml:p?m.output({shortcut:p.display}):'', arrowHtml:v?
    f.output({label:w}):'', role:this.role?this.role:'menuitem', ariaChecked:h};a.output(c, b); 
}}}); 
}(), CKEDITOR.config.menu_groups='clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div', CKEDITOR.plugins.add('contextmenu', {requires:'menu', onLoad:function(){
 CKEDITOR.plugins.contextMenu=CKEDITOR.tools.createClass({base:CKEDITOR.menu, $:function(c){
 this.base.call(this, c, {panel:{css:c.config.contextmenu_contentsCss,
    className:'cke_menu_panel', attributes:{'aria-label':c.lang.contextmenu.options}}}); 
}, proto:{addTarget:function(c, h){
 function g(){
 f=!1; 
}let a, f;c.on('contextmenu', function(c){
 c=c.data;var g=CKEDITOR.env.webkit?a:CKEDITOR.env.mac?c.$.metaKey:c.$.ctrlKey;if(!h||!g)if(c.preventDefault(), !f){
 if(CKEDITOR.env.mac&&CKEDITOR.env.webkit){
 var g=this.editor, b=(new CKEDITOR.dom.elementPath(c.getTarget(), g.editable())).contains(function(a){
 return a.hasAttribute('contenteditable'); 
}, !0);b&&'false'==b.getAttribute('contenteditable')&&
    g.getSelection().fake(b); 
}var b=c.getTarget().getDocument(), d=c.getTarget().getDocument().getDocumentElement(), g=!b.equals(CKEDITOR.document), b=b.getWindow().getScrollPosition(), e=g?c.$.clientX:c.$.pageX||b.x+c.$.clientX, m=g?c.$.clientY:c.$.pageY||b.y+c.$.clientY;CKEDITOR.tools.setTimeout(function(){
 this.open(d, null, e, m); 
}, CKEDITOR.env.ie?200:0, this); 
} 
}, this);if(CKEDITOR.env.webkit){
 const m=function(){
 a=0; 
};c.on('keydown', function(c){
 a=CKEDITOR.env.mac?c.data.$.metaKey:c.data.$.ctrlKey; 
});c.on('keyup', m);
    c.on('contextmenu', m); 
}CKEDITOR.env.gecko&&!CKEDITOR.env.mac&&(c.on('keydown', function(a){
 a.data.$.shiftKey&&121===a.data.$.keyCode&&(f=!0); 
}, null, null, 0), c.on('keyup', g), c.on('contextmenu', g)); 
}, open:function(c, h, g, a){
 !1!==this.editor.config.enableContextMenu&&this.editor.getSelection().getType()!==CKEDITOR.SELECTION_NONE&&(this.editor.focus(), c=c||CKEDITOR.document.getDocumentElement(), this.editor.selectionChange(1), this.show(c, h, g, a)); 
}}}); 
}, beforeInit:function(c){
 const h=c.contextMenu=new CKEDITOR.plugins.contextMenu(c);
    c.on('contentDom', function(){
 h.addTarget(c.editable(), !1!==c.config.browserContextMenuOnCtrl); 
});c.addCommand('contextMenu', {exec:function(c){
 var a=0, f=0, h=c.getSelection().getRanges(), h=h[h.length-1].getClientRects(c.editable().isInline());if(h=h[h.length-1])a=h['rtl'===c.lang.dir?'left':'right'], f=h.bottom;c.contextMenu.open(c.document.getBody().getParent(), null, a, f); 
}});c.setKeystroke(CKEDITOR.SHIFT+121, 'contextMenu');c.setKeystroke(CKEDITOR.CTRL+CKEDITOR.SHIFT+121, 'contextMenu'); 
}}), function(){
 function c(a){
 const c=
    this.att;a=a&&a.hasAttribute(c)&&a.getAttribute(c)||'';void 0!==a&&this.setValue(a); 
}function h(){
 for(var a, c=0;c<arguments.length;c++)if(arguments[c]instanceof CKEDITOR.dom.element){
 a=arguments[c];break; 
}if(a){
 var c=this.att, g=this.getValue();g?a.setAttribute(c, g):a.removeAttribute(c, g); 
} 
}const g={id:1, dir:1, classes:1, styles:1};CKEDITOR.plugins.add('dialogadvtab', {requires:'dialog', allowedContent:function(a){
 a||(a=g);const c=[];a.id&&c.push('id');a.dir&&c.push('dir');let h='';c.length&&(h+=`[${c.join(',')
    }]`);a.classes&&(h+='(*)');a.styles&&(h+='{*}');return h; 
}, createAdvancedTab:function(a, f, m){
 f||(f=g);let k=a.lang.common, l={id:'advanced', label:k.advancedTab, title:k.advancedTab, elements:[{type:'vbox', padding:1, children:[]}]}, b=[];if(f.id||f.dir)f.id&&b.push({id:'advId', att:'id', type:'text', requiredContent:m?`${m}[id]`:null, label:k.id, setup:c, commit:h}), f.dir&&b.push({id:'advLangDir', att:'dir', type:'select', requiredContent:m?`${m}[dir]`:null, label:k.langDir, 'default':'', style:'width:100%', items:[[k.notSet,
    ''], [k.langDirLTR, 'ltr'], [k.langDirRTL, 'rtl']], setup:c, commit:h}), l.elements[0].children.push({type:'hbox', widths:['50%', '50%'], children:[].concat(b)});if(f.styles||f.classes)b=[], f.styles&&b.push({id:'advStyles', att:'style', type:'text', requiredContent:m?`${m}{cke-xyz}`:null, label:k.styles, 'default':'', validate:CKEDITOR.dialog.validate.inlineStyle(k.invalidInlineStyle), onChange:function(){}, getStyle:function(a, b){
 const c=this.getValue().match(new RegExp(`(?:^|;)\\s*${a}\\s*:\\s*([^;]*)`, 'i'));return c?
    c[1]:b; 
}, updateStyle:function(b, c){
 let f=this.getValue(), g=a.document.createElement('span');g.setAttribute('style', f);g.setStyle(b, c);f=CKEDITOR.tools.normalizeCssText(g.getAttribute('style'));this.setValue(f, 1); 
}, setup:c, commit:h}), f.classes&&b.push({type:'hbox', widths:['45%', '55%'], children:[{id:'advCSSClasses', att:'class', type:'text', requiredContent:m?`${m}(cke-xyz)`:null, label:k.cssClasses, 'default':'', setup:c, commit:h}]}), l.elements[0].children.push({type:'hbox', widths:['50%', '50%'], children:[].concat(b)});
    return l; 
}}); 
}(), function(){
 CKEDITOR.plugins.add('div', {requires:'dialog', init:function(c){
 if(!c.blockless){
 let h=c.lang.div, g='div(*)';CKEDITOR.dialog.isTabEnabled(c, 'editdiv', 'advanced')&&(g+=';div[dir,id,lang,title]{*}');c.addCommand('creatediv', new CKEDITOR.dialogCommand('creatediv', {allowedContent:g, requiredContent:'div', contextSensitive:!0, contentTransformations:[['div: alignmentToStyle']], refresh:function(a, c){
 this.setState('div'in(a.config.div_wrapTable?c.root:c.blockLimit).getDtd()?CKEDITOR.TRISTATE_OFF:
    CKEDITOR.TRISTATE_DISABLED); 
}}));c.addCommand('editdiv', new CKEDITOR.dialogCommand('editdiv', {requiredContent:'div'}));c.addCommand('removediv', {requiredContent:'div', exec:function(a){
 function c(b){
 (b=CKEDITOR.plugins.div.getSurroundDiv(a, b))&&!b.data('cke-div-added')&&(d.push(b), b.data('cke-div-added')); 
}for(var g=a.getSelection(), h=g&&g.getRanges(), l, b=g.createBookmarks(), d=[], e=0;e<h.length;e++)l=h[e], l.collapsed?c(g.getStartElement()):(l=new CKEDITOR.dom.walker(l), l.evaluator=c, l.lastForward());
    for(e=0;e<d.length;e++)d[e].remove(!0);g.selectBookmarks(b); 
}});c.ui.addButton&&c.ui.addButton('CreateDiv', {label:h.toolbar, command:'creatediv', toolbar:'blocks,50'});c.addMenuItems&&(c.addMenuItems({editdiv:{label:h.edit, command:'editdiv', group:'div', order:1}, removediv:{label:h.remove, command:'removediv', group:'div', order:5}}), c.contextMenu&&c.contextMenu.addListener(function(a){
 return!a||a.isReadOnly()?null:CKEDITOR.plugins.div.getSurroundDiv(c)?{editdiv:CKEDITOR.TRISTATE_OFF, removediv:CKEDITOR.TRISTATE_OFF}:
    null; 
}));CKEDITOR.dialog.add('creatediv', `${this.path}dialogs/div.js`);CKEDITOR.dialog.add('editdiv', `${this.path}dialogs/div.js`); 
} 
}});CKEDITOR.plugins.div={getSurroundDiv:function(c, h){
 const g=c.elementPath(h);return c.elementPath(g.blockLimit).contains(function(a){
 return a.is('div')&&!a.isReadOnly(); 
}, 1); 
}}; 
}(), function(){
 function c(c, g){
 function k(a){
 a=e.list[a];let b;a.equals(c.editable())||'true'==a.getAttribute('contenteditable')?(b=c.createRange(), b.selectNodeContents(a), b=b.select()):(b=c.getSelection(),
    b.selectElement(a));CKEDITOR.env.ie&&c.fire('selectionChange', {selection:b, path:new CKEDITOR.dom.elementPath(a)});c.focus(); 
}function l(){
 d&&d.setHtml('\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e');delete e.list; 
}var b=c.ui.spaceId('path'), d, e=c._.elementsPath, n=e.idBase;g.html+=`\x3cspan id\x3d"${b}_label" class\x3d"cke_voice_label"\x3e${c.lang.elementspath.eleLabel}\x3c/span\x3e\x3cspan id\x3d"${b}" class\x3d"cke_path" role\x3d"group" aria-labelledby\x3d"${b}_label"\x3e\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e\x3c/span\x3e`;
    c.on('uiReady', function(){
 const a=c.ui.space('path');a&&c.focusManager.add(a, 1); 
});e.onClick=k;const t=CKEDITOR.tools.addFunction(k), x=CKEDITOR.tools.addFunction(function(a, b){
 let d=e.idBase, g;b=new CKEDITOR.dom.event(b);g='rtl'==c.lang.dir;switch(b.getKeystroke()){
 case g?39:37:case 9:return(g=CKEDITOR.document.getById(d+(a+1)))||(g=CKEDITOR.document.getById(`${d}0`)), g.focus(), !1;case g?37:39:case CKEDITOR.SHIFT+9:return(g=CKEDITOR.document.getById(d+(a-1)))||(g=CKEDITOR.document.getById(d+(e.list.length-
    1))), g.focus(), !1;case 27:return c.focus(), !1;case 13:case 32:return k(a), !1; 
}return!0; 
});c.on('selectionChange', function(g){
 for(var h=[], k=e.list=[], l=[], m=e.filters, A=!0, r=g.data.path.elements, y=r.length;y--;){
 let z=r[y], B=0;g=z.data('cke-display-name')?z.data('cke-display-name'):z.data('cke-real-element-type')?z.data('cke-real-element-type'):z.getName();(A=z.hasAttribute('contenteditable')?'true'==z.getAttribute('contenteditable'):A)||z.hasAttribute('contenteditable')||(B=1);for(let C=0;C<m.length;C++){
 const E=
    m[C](z, g);if(!1===E){
 B=1;break; 
}g=E||g; 
}B||(k.unshift(z), l.unshift(g)); 
}k=k.length;for(m=0;m<k;m++)g=l[m], A=c.lang.elementspath.eleTitle.replace(/%1/, g), g=a.output({id:n+m, label:A, text:g, jsTitle:`javascript:void('${g}')`, index:m, keyDownFn:x, clickFn:t}), h.unshift(g);d||(d=CKEDITOR.document.getById(b));l=d;l.setHtml(`${h.join('')}\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e`);c.fire('elementsPathUpdate', {space:l}); 
});c.on('readOnly', l);c.on('contentDomUnload', l);c.addCommand('elementsPathFocus',
    h.toolbarFocus);c.setKeystroke(CKEDITOR.ALT+122, 'elementsPathFocus'); 
}var h={toolbarFocus:{editorFocus:!1, readOnly:1, exec:function(a){
 (a=CKEDITOR.document.getById(`${a._.elementsPath.idBase}0`))&&a.focus(CKEDITOR.env.ie||CKEDITOR.env.air); 
}}}, g='';CKEDITOR.env.gecko&&CKEDITOR.env.mac&&(g+=' onkeypress\x3d"return false;"');CKEDITOR.env.gecko&&(g+=' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');var a=CKEDITOR.addTemplate('pathItem', `\x3ca id\x3d"{id}" href\x3d"{jsTitle}" tabindex\x3d"-1" class\x3d"cke_path_item" title\x3d"{label}"${
    g} hidefocus\x3d"true"  draggable\x3d"false"  ondragstart\x3d"return false;" onkeydown\x3d"return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role\x3d"button" aria-label\x3d"{label}"\x3e{text}\x3c/a\x3e`);CKEDITOR.plugins.add('elementspath', {init:function(a){
 a._.elementsPath={idBase:`cke_elementspath_${CKEDITOR.tools.getNextNumber()}_`, filters:[]};a.on('uiSpace', function(g){
 'bottom'==g.data.space&&c(a, g.data); 
}); 
}}); 
}(),
    function(){
 function c(a, b, c){
 c=a.config.forceEnterMode||c;if('wysiwyg'==a.mode){
 b||(b=a.activeEnterMode);const f=a.elementPath();f&&!f.isContextFor('p')&&(b=CKEDITOR.ENTER_BR, c=1);a.fire('saveSnapshot');b==CKEDITOR.ENTER_BR?k(a, b, null, c):l(a, b, null, c);a.fire('saveSnapshot'); 
} 
}function h(a){
 a=a.getSelection().getRanges(!0);for(let b=a.length-1;0<b;b--)a[b].deleteContents();return a[0]; 
}function g(a){
 let b=a.startContainer.getAscendant(function(a){
 return a.type==CKEDITOR.NODE_ELEMENT&&'true'==a.getAttribute('contenteditable'); 
},
    !0);if(a.root.equals(b))return a;b=new CKEDITOR.dom.range(b);b.moveToRange(a);return b; 
}CKEDITOR.plugins.add('enterkey', {init:function(a){
 a.addCommand('enter', {modes:{wysiwyg:1}, editorFocus:!1, exec:function(a){
 c(a); 
}});a.addCommand('shiftEnter', {modes:{wysiwyg:1}, editorFocus:!1, exec:function(a){
 c(a, a.activeShiftEnterMode, 1); 
}});a.setKeystroke([[13, 'enter'], [CKEDITOR.SHIFT+13, 'shiftEnter']]); 
}});let a=CKEDITOR.dom.walker.whitespaces(), f=CKEDITOR.dom.walker.bookmark(), m, k, l, b;CKEDITOR.plugins.enterkey=
    {enterBlock:function(c, e, l, m){
 function x(a){
 let b;if(a===CKEDITOR.ENTER_BR||-1===CKEDITOR.tools.indexOf(['td', 'th'], w.lastElement.getName())||1!==w.lastElement.getChildCount())return!1;a=w.lastElement.getChild(0).clone(!0);(b=a.getBogus())&&b.remove();return a.getText().length?!1:!0; 
}if(l=l||h(c)){
 l=g(l);var p=l.document, q=l.checkStartOfBlock(), v=l.checkEndOfBlock(), w=c.elementPath(l.startContainer), u=w.block, A=e==CKEDITOR.ENTER_DIV?'div':'p', r;if(u&&q&&v){
 q=u.getParent();if(q.is('li')&&1<q.getChildCount()){
 p=
    new CKEDITOR.dom.element('li');r=c.createRange();p.insertAfter(q);u.remove();r.setStart(p, 0);c.getSelection().selectRanges([r]);return; 
}if(u.is('li')||u.getParent().is('li')){
 u.is('li')||(u=u.getParent(), q=u.getParent());r=q.getParent();l=!u.hasPrevious();var y=!u.hasNext();m=c.getSelection();var A=m.createBookmarks(), z=u.getDirection(1), v=u.getAttribute('class'), B=u.getAttribute('style'), C=r.getDirection(1)!=z;c=c.enterMode!=CKEDITOR.ENTER_BR||C||B||v;if(r.is('li'))l||y?(l&&y&&q.remove(), u[y?'insertAfter':
    'insertBefore'](r)):u.breakParent(r);else{
 if(c)if(w.block.is('li')?(r=p.createElement(e==CKEDITOR.ENTER_P?'p':'div'), C&&r.setAttribute('dir', z), B&&r.setAttribute('style', B), v&&r.setAttribute('class', v), u.moveChildren(r)):r=w.block, l||y)r[l?'insertBefore':'insertAfter'](q);else u.breakParent(q), r.insertAfter(q);else if(u.appendBogus(!0), l||y)for(;p=u[l?'getFirst':'getLast']();)p[l?'insertBefore':'insertAfter'](q);else for(u.breakParent(q);p=u.getLast();)p.insertAfter(q);u.remove(); 
}m.selectBookmarks(A);
    return; 
}if(u&&u.getParent().is('blockquote')){
 u.breakParent(u.getParent());u.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1))||u.getPrevious().remove();u.getNext().getFirst(CKEDITOR.dom.walker.invisible(1))||u.getNext().remove();l.moveToElementEditStart(u);l.select();return; 
} 
}else if(u&&u.is('pre')&&!v){
 k(c, e, l, m);return; 
}if(B=l.splitBlock(A)){
 c=B.previousBlock;u=B.nextBlock;q=B.wasStartOfBlock;v=B.wasEndOfBlock;u?(y=u.getParent(), y.is('li')&&(u.breakParent(y), u.move(u.getNext(), 1))):c&&(y=c.getParent())&&
    y.is('li')&&(c.breakParent(y), y=c.getNext(), l.moveToElementEditStart(y), c.move(c.getPrevious()));if(q||v)if(x(e))l.moveToElementEditStart(l.getTouchedStartNode());else{
 if(c){
 if(c.is('li')||!b.test(c.getName())&&!c.is('pre'))r=c.clone(); 
}else u&&(r=u.clone());r?m&&!r.is('li')&&r.renameNode(A):y&&y.is('li')?r=y:(r=p.createElement(A), c&&(z=c.getDirection())&&r.setAttribute('dir', z));if(p=B.elementPath)for(e=0, m=p.elements.length;e<m;e++){
 A=p.elements[e];if(A.equals(p.block)||A.equals(p.blockLimit))break;
    CKEDITOR.dtd.$removeEmpty[A.getName()]&&(A=A.clone(), r.moveChildren(A), r.append(A)); 
}r.appendBogus();r.getParent()||l.insertNode(r);r.is('li')&&r.removeAttribute('value');!CKEDITOR.env.ie||!q||v&&c.getChildCount()||(l.moveToElementEditStart(v?c:r), l.select());l.moveToElementEditStart(q&&!v?u:r); 
}else u.is('li')&&(r=l.clone(), r.selectNodeContents(u), r=new CKEDITOR.dom.walker(r), r.evaluator=function(b){
 return!(f(b)||a(b)||b.type==CKEDITOR.NODE_ELEMENT&&b.getName()in CKEDITOR.dtd.$inline&&!(b.getName()in
    CKEDITOR.dtd.$empty)); 
}, (y=r.next())&&y.type==CKEDITOR.NODE_ELEMENT&&y.is('ul', 'ol')&&(CKEDITOR.env.needsBrFiller?p.createElement('br'):p.createText(' ')).insertBefore(y)), u&&l.moveToElementEditStart(u);l.select();l.scrollIntoView(); 
} 
} 
}, enterBr:function(a, c, f, g){
 if(f=f||h(a)){
 let k=f.document, m=f.checkEndOfBlock(), q=new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()), v=q.block, w=v&&q.block.getName();g||'li'!=w?(!g&&m&&b.test(w)?(m=v.getDirection())?(k=k.createElement('div'), k.setAttribute('dir',
    m), k.insertAfter(v), f.setStart(k, 0)):(k.createElement('br').insertAfter(v), CKEDITOR.env.gecko&&k.createText('').insertAfter(v), f.setStartAt(v.getNext(), CKEDITOR.env.ie?CKEDITOR.POSITION_BEFORE_START:CKEDITOR.POSITION_AFTER_START)):(a='pre'==w&&CKEDITOR.env.ie&&8>CKEDITOR.env.version?k.createText('\r'):k.createElement('br'), f.deleteContents(), f.insertNode(a), CKEDITOR.env.needsBrFiller?(k.createText('﻿').insertAfter(a), m&&(v||q.blockLimit).appendBogus(), a.getNext().$.nodeValue='', f.setStartAt(a.getNext(),
    CKEDITOR.POSITION_AFTER_START)):f.setStartAt(a, CKEDITOR.POSITION_AFTER_END)), f.collapse(!0), f.select(), f.scrollIntoView()):l(a, c, f, g); 
} 
}};m=CKEDITOR.plugins.enterkey;k=m.enterBr;l=m.enterBlock;b=/^h[1-6]$/; 
}(), function(){
 function c(c, g){
 const a={}, f=[], m={nbsp:' ', shy:'­', gt:'\x3e', lt:'\x3c', amp:'\x26', apos:'\'', quot:'"'};c=c.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function(b, c){
 const h=g?`\x26${c};`:m[c];a[h]=g?m[c]:`\x26${c};`;f.push(h);return''; 
});c=c.replace(/,$/, '');if(!g&&c){
 c=c.split(',');
    let k=document.createElement('div'), l;k.innerHTML=`\x26${c.join(';\x26')};`;l=k.innerHTML;k=null;for(k=0;k<l.length;k++){
 const b=l.charAt(k);a[b]=`\x26${c[k]};`;f.push(b); 
} 
}a.regex=f.join(g?'|':'');return a; 
}CKEDITOR.plugins.add('entities', {afterInit:function(h){
 function g(a){
 return b[a]; 
}function a(a){
 return'force'!=f.entities_processNumerical&&k[a]?k[a]:`\x26#${a.charCodeAt(0)};`; 
}var f=h.config;if(h=(h=h.dataProcessor)&&h.htmlFilter){
 const m=[];!1!==f.basicEntities&&m.push('nbsp,gt,lt,amp');f.entities&&
    (m.length&&m.push('quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro'),
    f.entities_latin&&m.push('Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml'), f.entities_greek&&m.push('Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv'),
    f.entities_additional&&m.push(f.entities_additional));var k=c(m.join(',')), l=k.regex?`[${k.regex}]`:'a^';delete k.regex;f.entities&&f.entities_processNumerical&&(l=`[^ -~]|${l}`);var l=new RegExp(l, 'g'), b=c('nbsp,gt,lt,amp,shy', !0), d=new RegExp(b.regex, 'g');h.addRules({text:function(b){
 return b.replace(d, g).replace(l, a); 
}}, {applyToAll:!0, excludeNestedEditable:!0}); 
} 
}}); 
}(), CKEDITOR.config.basicEntities=!0, CKEDITOR.config.entities=!0, CKEDITOR.config.entities_latin=!0, CKEDITOR.config.entities_greek=!0,
    CKEDITOR.config.entities_additional='#39', CKEDITOR.plugins.add('popup'), CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {popup:function(c, h, g, a){
 h=h||'80%';g=g||'70%';'string'===typeof h&&1<h.length&&'%'==h.substr(h.length-1, 1)&&(h=parseInt(window.screen.width*parseInt(h, 10)/100, 10));'string'===typeof g&&1<g.length&&'%'==g.substr(g.length-1, 1)&&(g=parseInt(window.screen.height*parseInt(g, 10)/100, 10));640>h&&(h=640);420>g&&(g=420);const f=parseInt((window.screen.height-g)/2, 10), m=parseInt((window.screen.width-
    h)/2, 10);a=`${a||'location\x3dno,menubar\x3dno,toolbar\x3dno,dependent\x3dyes,minimizable\x3dno,modal\x3dyes,alwaysRaised\x3dyes,resizable\x3dyes,scrollbars\x3dyes'},width\x3d${h},height\x3d${g},top\x3d${f},left\x3d${m}`;const k=window.open('', null, a, !0);if(!k)return!1;try{
 -1==navigator.userAgent.toLowerCase().indexOf(' chrome/')&&(k.moveTo(m, f), k.resizeTo(h, g)), k.focus(), k.location.href=c; 
}catch(l){
 window.open(c, null, a, !0); 
}return!0; 
}}), 'use strict', function(){
 function c(a){
 this.editor=a;this.loaders=
    []; 
}function h(a, c, h){
 const l=a.config.fileTools_defaultFileName;this.editor=a;this.lang=a.lang;'string'===typeof c?(this.data=c, this.file=g(this.data), this.loaded=this.total=this.file.size):(this.data=null, this.file=c, this.total=this.file.size, this.loaded=0);h?this.fileName=h:this.file.name?this.fileName=this.file.name:(a=this.file.type.split('/'), l&&(a[0]=l), this.fileName=a.join('.'));this.uploaded=0;this.responseData=this.uploadTotal=null;this.status='created';this.abort=function(){
 this.changeStatus('abort'); 
}; 
}
    function g(c){
 const g=c.match(a)[1];c=c.replace(a, '');c=atob(c);let h=[], l, b, d, e;for(l=0;l<c.length;l+=512){
 b=c.slice(l, l+512);d=Array(b.length);for(e=0;e<b.length;e++)d[e]=b.charCodeAt(e);b=new Uint8Array(d);h.push(b); 
}return new Blob(h, {type:g}); 
}CKEDITOR.plugins.add('filetools', {beforeInit:function(a){
 a.uploadRepository=new c(a);a.on('fileUploadRequest', function(a){
 const c=a.data.fileLoader;c.xhr.open('POST', c.uploadUrl, !0);a.data.requestData.upload={file:c.file, name:c.fileName}; 
}, null, null, 5);a.on('fileUploadRequest',
    function(c){
 const g=c.data.fileLoader, h=new FormData;c=c.data.requestData;let b=a.config.fileTools_requestHeaders, d, e;for(e in c){
 const n=c[e];'object'===typeof n&&n.file?h.append(e, n.file, n.name):h.append(e, n); 
}h.append('ckCsrfToken', CKEDITOR.tools.getCsrfToken());if(b)for(d in b)g.xhr.setRequestHeader(d, b[d]);g.xhr.send(h); 
}, null, null, 999);a.on('fileUploadResponse', function(a){
 const c=a.data.fileLoader, f=c.xhr, b=a.data;try{
 const d=JSON.parse(f.responseText);d.error&&d.error.message&&(b.message=d.error.message);
    if(d.uploaded)for(const e in d)b[e]=d[e];else a.cancel(); 
}catch(g){
 b.message=c.lang.filetools.responseError, CKEDITOR.warn('filetools-response-error', {responseText:f.responseText}), a.cancel(); 
} 
}, null, null, 999); 
}});c.prototype={create:function(a, c, g){
 g=g||h;const l=this.loaders.length;a=new g(this.editor, a, c);a.id=l;this.loaders[l]=a;this.fire('instanceCreated', a);return a; 
}, isFinished:function(){
 for(let a=0;a<this.loaders.length;++a)if(!this.loaders[a].isFinished())return!1;return!0; 
}};h.prototype={loadAndUpload:function(a,
    c){
 const g=this;this.once('loaded', function(h){
 h.cancel();g.once('update', function(a){
 a.cancel(); 
}, null, null, 0);g.upload(a, c); 
}, null, null, 0);this.load(); 
}, load:function(){
 const a=this, c=this.reader=new FileReader;a.changeStatus('loading');this.abort=function(){
 a.reader.abort(); 
};c.onabort=function(){
 a.changeStatus('abort'); 
};c.onerror=function(){
 a.message=a.lang.filetools.loadError;a.changeStatus('error'); 
};c.onprogress=function(c){
 a.loaded=c.loaded;a.update(); 
};c.onload=function(){
 a.loaded=a.total;a.data=c.result;
    a.changeStatus('loaded'); 
};c.readAsDataURL(this.file); 
}, upload:function(a, c){
 const g=c||{};a?(this.uploadUrl=a, this.xhr=new XMLHttpRequest, this.attachRequestListeners(), this.editor.fire('fileUploadRequest', {fileLoader:this, requestData:g})&&this.changeStatus('uploading')):(this.message=this.lang.filetools.noUrlError, this.changeStatus('error')); 
}, attachRequestListeners:function(){
 function a(){
 'error'!=g.status&&(g.message=g.lang.filetools.networkError, g.changeStatus('error')); 
}function c(){
 'abort'!=g.status&&
    g.changeStatus('abort'); 
}var g=this, h=this.xhr;g.abort=function(){
 h.abort();c(); 
};h.onerror=a;h.onabort=c;h.upload?(h.upload.onprogress=function(a){
 a.lengthComputable&&(g.uploadTotal||(g.uploadTotal=a.total), g.uploaded=a.loaded, g.update()); 
}, h.upload.onerror=a, h.upload.onabort=c):(g.uploadTotal=g.total, g.update());h.onload=function(){
 g.update();if('abort'!=g.status)if(g.uploaded=g.uploadTotal, 200>h.status||299<h.status)g.message=g.lang.filetools[`httpError${h.status}`], g.message||(g.message=g.lang.filetools.httpError.replace('%1',
    h.status)), g.changeStatus('error');else{
 for(var a={fileLoader:g}, c=['message', 'fileName', 'url'], e=g.editor.fire('fileUploadResponse', a), f=0;f<c.length;f++){
 const m=c[f];'string'===typeof a[m]&&(g[m]=a[m]); 
}g.responseData=a;delete g.responseData.fileLoader;!1===e?g.changeStatus('error'):g.changeStatus('uploaded'); 
} 
}; 
}, changeStatus:function(a){
 this.status=a;if('error'==a||'abort'==a||'loaded'==a||'uploaded'==a)this.abort=function(){};this.fire(a);this.update(); 
}, update:function(){
 this.fire('update'); 
}, isFinished:function(){
 return!!this.status.match(/^(?:loaded|uploaded|error|abort)$/); 
}};
    CKEDITOR.event.implementOn(c.prototype);CKEDITOR.event.implementOn(h.prototype);var a=/^data:(\S*?);base64,/;CKEDITOR.fileTools||(CKEDITOR.fileTools={});CKEDITOR.tools.extend(CKEDITOR.fileTools, {uploadRepository:c, fileLoader:h, getUploadUrl:function(a, c){
 const g=CKEDITOR.tools.capitalize;return c&&a[`${c}UploadUrl`]?a[`${c}UploadUrl`]:a.uploadUrl?a.uploadUrl:c&&a[`filebrowser${g(c, 1)}UploadUrl`]?`${a[`filebrowser${g(c, 1)}UploadUrl`]}\x26responseType\x3djson`:a.filebrowserUploadUrl?`${a.filebrowserUploadUrl
    }\x26responseType\x3djson`:null; 
}, isTypeSupported:function(a, c){
 return!!a.type.match(c); 
}, isFileUploadSupported:'function'===typeof FileReader&&'function'===typeof(new FileReader).readAsDataURL&&'function'===typeof FormData&&'function'===typeof(new FormData).append&&'function'===typeof XMLHttpRequest&&'function'===typeof Blob}); 
}(), function(){
 function c(a, b){
 const c=[];if(b)for(const d in b)c.push(`${d}\x3d${encodeURIComponent(b[d])}`);else return a;return a+(-1!=a.indexOf('?')?'\x26':'?')+c.join('\x26'); 
}function h(a){
 return!a.match(/command=QuickUpload/)||
    a.match(/(\?|&)responseType=json/)?a:c(a, {responseType:'json'}); 
}function g(a){
 a+='';return a.charAt(0).toUpperCase()+a.substr(1); 
}function a(){
 var a=this.getDialog(), b=a.getParentEditor();b._.filebrowserSe=this;var d=b.config[`filebrowser${g(a.getName())}WindowWidth`]||b.config.filebrowserWindowWidth||'80%', a=b.config[`filebrowser${g(a.getName())}WindowHeight`]||b.config.filebrowserWindowHeight||'70%', e=this.filebrowser.params||{};e.CKEditor=b.name;e.CKEditorFuncNum=b._.filebrowserFn;e.langCode||
    (e.langCode=b.langCode);e=c(this.filebrowser.url, e);b.popup(e, d, a, b.config.filebrowserWindowFeatures||b.config.fileBrowserWindowFeatures); 
}function f(a){
 const b=new CKEDITOR.dom.element(a.$.form);b&&((a=b.$.elements.ckCsrfToken)?a=new CKEDITOR.dom.element(a):(a=new CKEDITOR.dom.element('input'), a.setAttributes({name:'ckCsrfToken', type:'hidden'}), b.append(a)), a.setAttribute('value', CKEDITOR.tools.getCsrfToken())); 
}function m(){
 const a=this.getDialog();a.getParentEditor()._.filebrowserSe=this;return a.getContentElement(this['for'][0],
    this['for'][1]).getInputElement().$.value&&a.getContentElement(this['for'][0], this['for'][1]).getAction()?!0:!1; 
}function k(a, b, d){
 const e=d.params||{};e.CKEditor=a.name;e.CKEditorFuncNum=a._.filebrowserFn;e.langCode||(e.langCode=a.langCode);b.action=c(d.url, e);b.filebrowser=d; 
}function l(c, d, x, p){
 if(p&&p.length)for(var q, v=p.length;v--;)if(q=p[v], 'hbox'!=q.type&&'vbox'!=q.type&&'fieldset'!=q.type||l(c, d, x, q.children), q.filebrowser)if('string'===typeof q.filebrowser&&(q.filebrowser={action:'fileButton'==
    q.type?'QuickUpload':'Browse', target:q.filebrowser}), 'Browse'==q.filebrowser.action){
 var w=q.filebrowser.url;void 0===w&&(w=c.config[`filebrowser${g(d)}BrowseUrl`], void 0===w&&(w=c.config.filebrowserBrowseUrl));w&&(q.onClick=a, q.filebrowser.url=w, q.hidden=!1); 
}else if('QuickUpload'==q.filebrowser.action&&q['for']&&(w=q.filebrowser.url, void 0===w&&(w=c.config[`filebrowser${g(d)}UploadUrl`], void 0===w&&(w=c.config.filebrowserUploadUrl)), w)){
 var u=q.onClick;q.onClick=function(a){
 const d=a.sender, g=d.getDialog().getContentElement(this['for'][0],
    this['for'][1]).getInputElement(), k=CKEDITOR.fileTools&&CKEDITOR.fileTools.isFileUploadSupported;if(u&&!1===u.call(d, a))return!1;if(m.call(d, a)){
 if('form'!==c.config.filebrowserUploadMethod&&k)return a=c.uploadRepository.create(g.$.files[0]), a.on('uploaded', function(a){
 const b=a.sender.responseData;e.call(a.sender.editor, b.url, b.message); 
}), a.on('error', b.bind(this)), a.on('abort', b.bind(this)), a.loadAndUpload(h(w)), 'xhr';f(g);return!0; 
}return!1; 
};q.filebrowser.url=w;q.hidden=!1;k(c, x.getContents(q['for'][0]).get(q['for'][1]),
    q.filebrowser); 
} 
}function b(a){
 let b={};try{
 b=JSON.parse(a.sender.xhr.response)||{}; 
}catch(c){}this.enable();alert(b.error?b.error.message:a.sender.message); 
}function d(a, b, c){
 if(-1!==c.indexOf(';')){
 c=c.split(';');for(let e=0;e<c.length;e++)if(d(a, b, c[e]))return!0;return!1; 
}return(a=a.getContents(b).get(c).filebrowser)&&a.url; 
}function e(a, b){
 let c=this._.filebrowserSe.getDialog(), d=this._.filebrowserSe['for'], e=this._.filebrowserSe.filebrowser.onSelect;d&&c.getContentElement(d[0], d[1]).reset();if('function'!==
    typeof b||!1!==b.call(this._.filebrowserSe))if(!e||!1!==e.call(this._.filebrowserSe, a, b))if('string'===typeof b&&b&&alert(b), a&&(d=this._.filebrowserSe, c=d.getDialog(), d=d.filebrowser.target||null))if(d=d.split(':'), e=c.getContentElement(d[0], d[1]))e.setValue(a), c.selectPage(d[0]); 
}CKEDITOR.plugins.add('filebrowser', {requires:'popup,filetools', init:function(a){
 a._.filebrowserFn=CKEDITOR.tools.addFunction(e, a);a.on('destroy', function(){
 CKEDITOR.tools.removeFunction(this._.filebrowserFn); 
}); 
}});CKEDITOR.on('dialogDefinition',
    function(a){
 if(a.editor.plugins.filebrowser)for(var b=a.data.definition, c, e=0;e<b.contents.length;++e)if(c=b.contents[e])l(a.editor, a.data.name, b, c.elements), c.hidden&&c.filebrowser&&(c.hidden=!d(b, c.id, c.filebrowser)); 
}); 
}(), CKEDITOR.plugins.add('find', {requires:'dialog', init:function(c){
 const h=c.addCommand('find', new CKEDITOR.dialogCommand('find')), g=c.addCommand('replace', new CKEDITOR.dialogCommand('find', {tabId:'replace'}));h.canUndo=!1;h.readOnly=1;g.canUndo=!1;c.ui.addButton&&(c.ui.addButton('Find',
    {label:c.lang.find.find, command:'find', toolbar:'find,10'}), c.ui.addButton('Replace', {label:c.lang.find.replace, command:'replace', toolbar:'find,20'}));CKEDITOR.dialog.add('find', `${this.path}dialogs/find.js`); 
}}), CKEDITOR.config.find_highlight={element:'span', styles:{'background-color':'#004', color:'#fff'}}, function(){
 function c(a){
 var c=a.config, m=a.fire('uiSpace', {space:'top', html:''}).html, k=function(){
 function d(a, c, e){
 b.setStyle(c, g(e));b.setStyle('position', a); 
}function e(a){
 const b=m.getDocumentPosition();
    switch(a){
 case 'top':d('absolute', 'top', b.y-u-y);break;case 'pin':d('fixed', 'top', B);break;case 'bottom':d('absolute', 'top', b.y+(v.height||v.bottom-v.top)+y); 
}l=a; 
}var l, m, q, v, w, u, A, r=c.floatSpaceDockedOffsetX||0, y=c.floatSpaceDockedOffsetY||0, z=c.floatSpacePinnedOffsetX||0, B=c.floatSpacePinnedOffsetY||0;return function(d){
 if(m=a.editable()){
 let n=d&&'focus'==d.name;n&&b.show();a.fire('floatingSpaceLayout', {show:n});b.removeStyle('left');b.removeStyle('right');q=b.getClientRect();v=m.getClientRect();
    w=h.getViewPaneSize();u=q.height;A='pageXOffset'in h.$?h.$.pageXOffset:CKEDITOR.document.$.documentElement.scrollLeft;l?(u+y<=v.top?e('top'):u+y>w.height-v.bottom?e('pin'):e('bottom'), d=w.width/2, d=c.floatSpacePreferRight?'right':0<v.left&&v.right<w.width&&v.width>q.width?'rtl'==c.contentsLangDirection?'right':'left':d-v.left>v.right-d?'left':'right', q.width>w.width?(d='left', n=0):(n='left'==d?0<v.left?v.left:0:v.right<w.width?w.width-v.right:0, n+q.width>w.width&&(d='left'==d?'right':'left', n=0)),
    b.setStyle(d, g(('pin'==l?z:r)+n+('pin'==l?0:'left'==d?A:-A)))):(l='pin', e('pin'), k(d)); 
} 
}; 
}();if(m){
 var l=new CKEDITOR.template(`\x3cdiv id\x3d"cke_{name}" class\x3d"cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ${CKEDITOR.env.cssClass}" dir\x3d"{langDir}" title\x3d"${CKEDITOR.env.gecko?' ':''}" lang\x3d"{langCode}" role\x3d"application" style\x3d"{style}"${a.title?' aria-labelledby\x3d"cke_{name}_arialbl"':' '}\x3e${a.title?'\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e':
    ' '}\x3cdiv class\x3d"cke_inner"\x3e\x3cdiv id\x3d"{topId}" class\x3d"cke_top" role\x3d"presentation"\x3e{content}\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e`), b=CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(l.output({content:m, id:a.id, langDir:a.lang.dir, langCode:a.langCode, name:a.name, style:`display:none;z-index:${c.baseFloatZIndex-1}`, topId:a.ui.spaceId('top'), voiceLabel:a.title}))), d=CKEDITOR.tools.eventsBuffer(500, k), e=CKEDITOR.tools.eventsBuffer(100, k);b.unselectable();b.on('mousedown',
    function(a){
 a=a.data;a.getTarget().hasAscendant('a', 1)||a.preventDefault(); 
});a.on('focus', function(b){
 k(b);a.on('change', d.input);h.on('scroll', e.input);h.on('resize', e.input); 
});a.on('blur', function(){
 b.hide();a.removeListener('change', d.input);h.removeListener('scroll', e.input);h.removeListener('resize', e.input); 
});a.on('destroy', function(){
 h.removeListener('scroll', e.input);h.removeListener('resize', e.input);b.clearCustomData();b.remove(); 
});a.focusManager.hasFocus&&b.show();a.focusManager.add(b,
    1); 
} 
}var h=CKEDITOR.document.getWindow(), g=CKEDITOR.tools.cssLength;CKEDITOR.plugins.add('floatingspace', {init:function(a){
 a.on('loaded', function(){
 c(this); 
}, null, null, 20); 
}}); 
}(), CKEDITOR.plugins.add('listblock', {requires:'panel', onLoad:function(){
 const c=CKEDITOR.addTemplate('panel-list', '\x3cul role\x3d"presentation" class\x3d"cke_panel_list"\x3e{items}\x3c/ul\x3e'), h=CKEDITOR.addTemplate('panel-list-item', '\x3cli id\x3d"{id}" class\x3d"cke_panel_listItem" role\x3dpresentation\x3e\x3ca id\x3d"{id}_option" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"{title}" draggable\x3d"false" ondragstart\x3d"return false;" href\x3d"javascript:void(\'{val}\')"  onclick\x3d"{onclick}CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role\x3d"option"\x3e{text}\x3c/a\x3e\x3c/li\x3e'),
    g=CKEDITOR.addTemplate('panel-list-group', '\x3ch1 id\x3d"{id}" draggable\x3d"false" ondragstart\x3d"return false;" class\x3d"cke_panel_grouptitle" role\x3d"presentation" \x3e{label}\x3c/h1\x3e'), a=/\'/g;CKEDITOR.ui.panel.prototype.addListBlock=function(a, c){
 return this.addBlock(a, new CKEDITOR.ui.listBlock(this.getHolderElement(), c)); 
};CKEDITOR.ui.listBlock=CKEDITOR.tools.createClass({base:CKEDITOR.ui.panel.block, $:function(a, c){
 c=c||{};let g=c.attributes||(c.attributes={});(this.multiSelect=!!c.multiSelect)&&
    (g['aria-multiselectable']=!0);!g.role&&(g.role='listbox');this.base.apply(this, arguments);this.element.setAttribute('role', g.role);g=this.keys;g[40]='next';g[9]='next';g[38]='prev';g[CKEDITOR.SHIFT+9]='prev';g[32]=CKEDITOR.env.ie?'mouseup':'click';CKEDITOR.env.ie&&(g[13]='mouseup');this._.pendingHtml=[];this._.pendingList=[];this._.items={};this._.groups={}; 
}, _:{close:function(){
 if(this._.started){
 const a=c.output({items:this._.pendingList.join('')});this._.pendingList=[];this._.pendingHtml.push(a);
    delete this._.started; 
} 
}, getClick:function(){
 this._.click||(this._.click=CKEDITOR.tools.addFunction(function(a){
 const c=this.toggle(a);if(this.onClick)this.onClick(a, c); 
}, this));return this._.click; 
}}, proto:{add:function(c, g, k){
 const l=CKEDITOR.tools.getNextId();this._.started||(this._.started=1, this._.size=this._.size||0);this._.items[c]=l;let b;b=CKEDITOR.tools.htmlEncodeAttr(c).replace(a, '\\\'');c={id:l, val:b, onclick:CKEDITOR.env.ie?'return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26':
    '', clickFn:this._.getClick(), title:CKEDITOR.tools.htmlEncodeAttr(k||c), text:g||c};this._.pendingList.push(h.output(c)); 
}, startGroup:function(a){
 this._.close();const c=CKEDITOR.tools.getNextId();this._.groups[a]=c;this._.pendingHtml.push(g.output({id:c, label:a})); 
}, commit:function(){
 this._.close();this.element.appendHtml(this._.pendingHtml.join(''));delete this._.size;this._.pendingHtml=[]; 
}, toggle:function(a){
 const c=this.isMarked(a);c?this.unmark(a):this.mark(a);return!c; 
}, hideGroup:function(a){
 const c=(a=
    this.element.getDocument().getById(this._.groups[a]))&&a.getNext();a&&(a.setStyle('display', 'none'), c&&'ul'==c.getName()&&c.setStyle('display', 'none')); 
}, hideItem:function(a){
 this.element.getDocument().getById(this._.items[a]).setStyle('display', 'none'); 
}, showAll:function(){
 let a=this._.items, c=this._.groups, g=this.element.getDocument(), h;for(h in a)g.getById(a[h]).setStyle('display', '');for(const b in c)a=g.getById(c[b]), h=a.getNext(), a.setStyle('display', ''), h&&'ul'==h.getName()&&h.setStyle('display',
    ''); 
}, mark:function(a){
 this.multiSelect||this.unmarkAll();a=this._.items[a];const c=this.element.getDocument().getById(a);c.addClass('cke_selected');this.element.getDocument().getById(`${a}_option`).setAttribute('aria-selected', !0);this.onMark&&this.onMark(c); 
}, markFirstDisplayed:function(){
 const a=this;this._.markFirstDisplayed(function(){
 a.multiSelect||a.unmarkAll(); 
}); 
}, unmark:function(a){
 const c=this.element.getDocument();a=this._.items[a];const g=c.getById(a);g.removeClass('cke_selected');c.getById(`${a}_option`).removeAttribute('aria-selected');
    this.onUnmark&&this.onUnmark(g); 
}, unmarkAll:function(){
 let a=this._.items, c=this.element.getDocument(), g;for(g in a){
 const h=a[g];c.getById(h).removeClass('cke_selected');c.getById(`${h}_option`).removeAttribute('aria-selected'); 
}this.onUnmark&&this.onUnmark(); 
}, isMarked:function(a){
 return this.element.getDocument().getById(this._.items[a]).hasClass('cke_selected'); 
}, focus:function(a){
 this._.focusIndex=-1;let c=this.element.getElementsByTag('a'), g, h=-1;if(a)for(g=this.element.getDocument().getById(this._.items[a]).getFirst();a=
    c.getItem(++h);){
 if(a.equals(g)){
 this._.focusIndex=h;break; 
} 
}else this.element.focus();g&&setTimeout(function(){
 g.focus(); 
}, 0); 
}}}); 
}}), CKEDITOR.plugins.add('richcombo', {requires:'floatpanel,listblock,button', beforeInit:function(c){
 c.ui.addHandler(CKEDITOR.UI_RICHCOMBO, CKEDITOR.ui.richCombo.handler); 
}}), function(){
 var c=`\x3cspan id\x3d"{id}" class\x3d"cke_combo cke_combo__{name} {cls}" role\x3d"presentation"\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_combo_label"\x3e{label}\x3c/span\x3e\x3ca class\x3d"cke_combo_button" title\x3d"{title}" tabindex\x3d"-1"${
    CKEDITOR.env.gecko&&!CKEDITOR.env.hc?'':' href\x3d"javascript:void(\'{titleJs}\')"'} hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-haspopup\x3d"listbox"`, h='';CKEDITOR.env.gecko&&CKEDITOR.env.mac&&(c+=' onkeypress\x3d"return false;"');CKEDITOR.env.gecko&&(c+=' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');CKEDITOR.env.ie&&(h='return false;" onmouseup\x3d"CKEDITOR.tools.getMouseButton(event)\x3d\x3dCKEDITOR.MOUSE_BUTTON_LEFT\x26\x26');var c=`${c} onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" onclick\x3d"${
    h}CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan id\x3d"{id}_text" class\x3d"cke_combo_text cke_combo_inlinelabel"\x3e{label}\x3c/span\x3e\x3cspan class\x3d"cke_combo_open"\x3e\x3cspan class\x3d"cke_combo_arrow"\x3e${CKEDITOR.env.hc?'\x26#9660;':CKEDITOR.env.air?'\x26nbsp;':''}\x3c/span\x3e\x3c/span\x3e\x3c/a\x3e\x3c/span\x3e`, g=CKEDITOR.addTemplate('combo', c);CKEDITOR.UI_RICHCOMBO='richcombo';CKEDITOR.ui.richCombo=CKEDITOR.tools.createClass({$:function(a){
 CKEDITOR.tools.extend(this,
    a, {canGroup:!1, title:a.label, modes:{wysiwyg:1}, editorFocus:1});a=this.panel||{};delete this.panel;this.id=CKEDITOR.tools.getNextNumber();this.document=a.parent&&a.parent.getDocument()||CKEDITOR.document;a.className='cke_combopanel';a.block={multiSelect:a.multiSelect, attributes:a.attributes};a.toolbarRelated=!0;this._={panelDefinition:a, items:{}, listeners:[]}; 
}, proto:{renderHtml:function(a){
 const c=[];this.render(a, c);return c.join(''); 
}, render:function(a, c){
 function h(){
 if(this.getState()!=CKEDITOR.TRISTATE_ON){
 let b=
    this.modes[a.mode]?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED;a.readOnly&&!this.readOnly&&(b=CKEDITOR.TRISTATE_DISABLED);this.setState(b);this.setValue('');b!=CKEDITOR.TRISTATE_DISABLED&&this.refresh&&this.refresh(); 
} 
}let k=CKEDITOR.env, l, b, d=`cke_${this.id}`, e=CKEDITOR.tools.addFunction(function(c){
 b&&(a.unlockSelection(1), b=0);l.execute(c); 
}, this), n=this;l={id:d, combo:this, focus:function(){
 CKEDITOR.document.getById(d).getChild(1).focus(); 
}, execute:function(b){
 const c=n._;if(c.state!=CKEDITOR.TRISTATE_DISABLED)if(n.createPanel(a),
    c.on)c.panel.hide();else{
 n.commit();const d=n.getValue();d?c.list.mark(d):c.list.unmarkAll();c.panel.showBlock(n.id, new CKEDITOR.dom.element(b), 4); 
} 
}, clickFn:e};this._.listeners.push(a.on('activeFilterChange', h, this));this._.listeners.push(a.on('mode', h, this));this._.listeners.push(a.on('selectionChange', h, this));!this.readOnly&&this._.listeners.push(a.on('readOnly', h, this));const t=CKEDITOR.tools.addFunction(function(a, b){
 a=new CKEDITOR.dom.event(a);const c=a.getKeystroke();switch(c){
 case 13:case 32:case 40:CKEDITOR.tools.callFunction(e,
    b);break;default:l.onkey(l, c); 
}a.preventDefault(); 
}), x=CKEDITOR.tools.addFunction(function(){
 l.onfocus&&l.onfocus(); 
});b=0;l.keyDownFn=t;k={id:d, name:this.name||this.command, label:this.label, title:this.title, cls:this.className||'', titleJs:k.gecko&&!k.hc?'':(this.title||'').replace('\'', ''), keydownFn:t, focusFn:x, clickFn:e};g.output(k, c);if(this.onRender)this.onRender();return l; 
}, createPanel:function(a){
 if(!this._.panel){
 var c=this._.panelDefinition, g=this._.panelDefinition.block, h=c.parent||CKEDITOR.document.getBody(),
    l=`cke_combopanel__${this.name}`, b=new CKEDITOR.ui.floatPanel(a, h, c), c=b.addListBlock(this.id, g), d=this;b.onShow=function(){
 this.element.addClass(l);d.setState(CKEDITOR.TRISTATE_ON);d._.on=1;d.editorFocus&&!a.focusManager.hasFocus&&a.focus();if(d.onOpen)d.onOpen(); 
};b.onHide=function(b){
 this.element.removeClass(l);d.setState(d.modes&&d.modes[a.mode]?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);d._.on=0;if(!b&&d.onClose)d.onClose(); 
};b.onEscape=function(){
 b.hide(1); 
};c.onClick=function(a, c){
 d.onClick&&
    d.onClick.call(d, a, c);b.hide(); 
};this._.panel=b;this._.list=c;b.getBlock(this.id).onHide=function(){
 d._.on=0;d.setState(CKEDITOR.TRISTATE_OFF); 
};this.init&&this.init(); 
} 
}, setValue:function(a, c){
 this._.value=a;const g=this.document.getById(`cke_${this.id}_text`);g&&(a||c?g.removeClass('cke_combo_inlinelabel'):(c=this.label, g.addClass('cke_combo_inlinelabel')), g.setText('undefined'!==typeof c?c:a)); 
}, getValue:function(){
 return this._.value||''; 
}, unmarkAll:function(){
 this._.list.unmarkAll(); 
}, mark:function(a){
 this._.list.mark(a); 
},
    hideItem:function(a){
 this._.list.hideItem(a); 
}, hideGroup:function(a){
 this._.list.hideGroup(a); 
}, showAll:function(){
 this._.list.showAll(); 
}, add:function(a, c, g){
 this._.items[a]=g||a;this._.list.add(a, c, g); 
}, startGroup:function(a){
 this._.list.startGroup(a); 
}, commit:function(){
 this._.committed||(this._.list.commit(), this._.committed=1, CKEDITOR.ui.fire('ready', this));this._.committed=1; 
}, setState:function(a){
 if(this._.state!=a){
 const c=this.document.getById(`cke_${this.id}`), g=c.getElementsByTag('a').getItem(0);
    c.setState(a, 'cke_combo');a==CKEDITOR.TRISTATE_DISABLED?c.setAttribute('aria-disabled', !0):c.removeAttribute('aria-disabled');g&&g.setAttribute('aria-expanded', a==CKEDITOR.TRISTATE_ON);this._.state=a; 
} 
}, getState:function(){
 return this._.state; 
}, enable:function(){
 this._.state==CKEDITOR.TRISTATE_DISABLED&&this.setState(this._.lastState); 
}, disable:function(){
 this._.state!=CKEDITOR.TRISTATE_DISABLED&&(this._.lastState=this._.state, this.setState(CKEDITOR.TRISTATE_DISABLED)); 
}, destroy:function(){
 CKEDITOR.tools.array.forEach(this._.listeners,
    function(a){
 a.removeListener(); 
});this._.listeners=[]; 
}, select:function(a){
 if(!CKEDITOR.tools.isEmpty(this._.items))for(const c in this._.items)if(a({value:c, text:this._.items[c]})){
 this.setValue(c);break; 
} 
}}, statics:{handler:{create:function(a){
 return new CKEDITOR.ui.richCombo(a); 
}}}});CKEDITOR.ui.prototype.addRichCombo=function(a, c){
 this.add(a, CKEDITOR.UI_RICHCOMBO, c); 
}; 
}(), function(){
 function c(c, g){
 let k=c.config, l=g.lang, b=new CKEDITOR.style(g.styleDefinition), d=new a({entries:g.entries, styleVariable:g.styleVariable,
    styleDefinition:g.styleDefinition}), e;c.addCommand(g.commandName, {exec:function(a, b){
 let c=b.newStyle, d=b.oldStyle, e=a.getSelection().getRanges()[0], f=void 0===c;if(d||c)if(d&&e.collapsed&&h({editor:a, range:e, style:d}), f)a.removeStyle(d);else{
 if(e=d)e=d instanceof CKEDITOR.style&&c instanceof CKEDITOR.style?CKEDITOR.style.getStyleText(d.getDefinition())===CKEDITOR.style.getStyleText(c.getDefinition()):!1, e=!e;e&&a.removeStyle(d);a.applyStyle(c); 
} 
}, refresh:function(a, c){
 b.checkApplicable(c, a, a.activeFilter)||
    this.setState(CKEDITOR.TRISTATE_DISABLED); 
}});e=c.getCommand(g.commandName);c.ui.addRichCombo(g.comboName, {label:l.label, title:l.panelTitle, command:g.commandName, toolbar:`styles,${g.order}`, defaultValue:'cke-default', allowedContent:b, requiredContent:b, contentTransformations:'span'===g.styleDefinition.element?[[{element:'font', check:'span', left:function(a){
 return!!a.attributes.size||!!a.attributes.align||!!a.attributes.face; 
}, right:function(a){
 const b=' x-small small medium large x-large xx-large 48px'.split(' ');
    a.name='span';a.attributes.size&&(a.styles['font-size']=b[a.attributes.size], delete a.attributes.size);a.attributes.align&&(a.styles['text-align']=a.attributes.align, delete a.attributes.align);a.attributes.face&&(a.styles['font-family']=a.attributes.face, delete a.attributes.face); 
}}]]:null, panel:{css:[CKEDITOR.skin.getPath('editor')].concat(k.contentsCss), multiSelect:!1, attributes:{'aria-label':l.panelTitle}}, init:function(){
 const a=`(${c.lang.common.optionDefault})`;this.startGroup(l.panelTitle);this.add(this.defaultValue,
    a, a);d.addToCombo(this); 
}, onClick:function(a){
 const b=this.getValue();c.focus();c.fire('saveSnapshot');c.execCommand(g.commandName, {newStyle:d.getStyle(a), oldStyle:d.getStyle(b)});c.fire('saveSnapshot'); 
}, onRender:function(){
 c.on('selectionChange', function(a){
 const b=this.getValue();(a=d.getMatchingValue(c, a.data.path))?a!=b&&this.setValue(a):this.setValue('', g.defaultLabel); 
}, this);e.on('state', function(){
 this.setState(e.state); 
}, this); 
}, refresh:function(){
 this.setState(e.state); 
}}); 
}function h(a){
 let c=a.editor,
    h=a.range, l=a.style, b, d, e;b=c.elementPath();if(a=b.contains(function(a){
 return l.checkElementRemovable(a); 
})){
 d=h.checkBoundaryOfElement(a, CKEDITOR.START);e=h.checkBoundaryOfElement(a, CKEDITOR.END);if(d&&e){
 for(d=h.createBookmark();b=a.getFirst();)b.insertBefore(a);a.remove();h.moveToBookmark(d); 
}else d||e?h.moveToPosition(a, d?CKEDITOR.POSITION_BEFORE_START:CKEDITOR.POSITION_AFTER_END):(h.splitElement(a), h.moveToPosition(a, CKEDITOR.POSITION_AFTER_END)), g(h, b.elements.slice(), a);c.getSelection().selectRanges([h]); 
} 
}
    function g(a, c, h){
 const l=c.pop();if(l){
 if(h)return g(a, c, l.equals(h)?null:h);h=l.clone();a.insertNode(h);a.moveToPosition(h, CKEDITOR.POSITION_AFTER_START);g(a, c); 
} 
}var a=CKEDITOR.tools.createClass({$:function(a){
 const c=a.entries.split(';');this._.data={};this._.names=[];for(let g=0;g<c.length;g++){
 var h=c[g], b, d;h?(h=h.split('/'), b=h[0], h=h[1], d={}, d[a.styleVariable]=h||b, this._.data[b]=new CKEDITOR.style(a.styleDefinition, d), this._.data[b]._.definition.name=b, this._.names.push(b)):(c.splice(g, 1), g--); 
} 
},
    proto:{getStyle:function(a){
 return this._.data[a]; 
}, addToCombo:function(a){
 for(let c=0;c<this._.names.length;c++){
 const g=this._.names[c];a.add(g, this.getStyle(g).buildPreview(), g); 
} 
}, getMatchingValue:function(a, c){
 for(var g=c.elements, h=0, b;h<g.length;h++)if(b=g[h], b=this._.findMatchingStyleName(a, b))return b;return null; 
}}, _:{findMatchingStyleName:function(a, c){
 return CKEDITOR.tools.array.find(this._.names, function(g){
 return this.getStyle(g).checkElementMatch(c, !0, a); 
}, this); 
}}});CKEDITOR.plugins.add('font',
    {requires:'richcombo', init:function(a){
 const g=a.config;c(a, {comboName:'Font', commandName:'font', styleVariable:'family', lang:a.lang.font, entries:g.font_names, defaultLabel:g.font_defaultLabel, styleDefinition:g.font_style, order:30});c(a, {comboName:'FontSize', commandName:'fontSize', styleVariable:'size', lang:a.lang.font.fontSize, entries:g.fontSize_sizes, defaultLabel:g.fontSize_defaultLabel, styleDefinition:g.fontSize_style, order:40}); 
}}); 
}(), CKEDITOR.config.font_names='Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif',
    CKEDITOR.config.font_defaultLabel='', CKEDITOR.config.font_style={element:'span', styles:{'font-family':'#(family)'}, overrides:[{element:'font', attributes:{face:null}}]}, CKEDITOR.config.fontSize_sizes='8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px', CKEDITOR.config.fontSize_defaultLabel='', CKEDITOR.config.fontSize_style={element:'span', styles:{'font-size':'#(size)'}, overrides:[{element:'font', attributes:{size:null}}]}, CKEDITOR.plugins.add('format',
    {requires:'richcombo', init:function(c){
 if(!c.blockless){
 for(var h=c.config, g=c.lang.format, a=h.format_tags.split(';'), f={}, m=0, k=[], l=0;l<a.length;l++){
 const b=a[l], d=new CKEDITOR.style(h[`format_${b}`]);if(!c.filter.customConfig||c.filter.check(d))m++, f[b]=d, f[b]._.enterMode=c.config.enterMode, k.push(d); 
}0!==m&&c.ui.addRichCombo('Format', {label:g.label, title:g.panelTitle, toolbar:'styles,20', allowedContent:k, panel:{css:[CKEDITOR.skin.getPath('editor')].concat(h.contentsCss), multiSelect:!1, attributes:{'aria-label':g.panelTitle}},
    init:function(){
 this.startGroup(g.panelTitle);for(const a in f){
 const b=g[`tag_${a}`];this.add(a, f[a].buildPreview(b), b); 
} 
}, onClick:function(a){
 c.focus();c.fire('saveSnapshot');a=f[a];const b=c.elementPath();c.fire('stylesRemove', {type:CKEDITOR.STYLE_BLOCK});a.checkActive(b, c)||c.applyStyle(a);setTimeout(function(){
 c.fire('saveSnapshot'); 
}, 0); 
}, onRender:function(){
 c.on('selectionChange', function(a){
 const b=this.getValue();a=a.data.path;this.refresh();for(const d in f)if(f[d].checkActive(a, c)){
 d!=b&&this.setValue(d,
    c.lang.format[`tag_${d}`]);return; 
}this.setValue(''); 
}, this); 
}, onOpen:function(){
 this.showAll();for(const a in f)c.activeFilter.check(f[a])||this.hideItem(a); 
}, refresh:function(){
 const a=c.elementPath();if(a){
 if(a.isContextFor('p'))for(const b in f)if(c.activeFilter.check(f[b]))return;this.setState(CKEDITOR.TRISTATE_DISABLED); 
} 
}}); 
} 
}}), CKEDITOR.config.format_tags='p;h1;h2;h3;h4;h5;h6;pre;address;div', CKEDITOR.config.format_p={element:'p'}, CKEDITOR.config.format_div={element:'div'}, CKEDITOR.config.format_pre={element:'pre'},
    CKEDITOR.config.format_address={element:'address'}, CKEDITOR.config.format_h1={element:'h1', attributes:{style:'font-size: 30px; line-height: 1.6;'}}, CKEDITOR.config.format_h2={element:'h2', attributes:{style:'font-size: 24px; line-height: 1.6;'}}, CKEDITOR.config.format_h3={element:'h3', attributes:{style:'font-size: 20px; line-height: 1.6;'}}, CKEDITOR.config.format_h4={element:'h4', attributes:{style:'font-size: 18px; line-height: 1.6;'}}, CKEDITOR.config.format_h5={element:'h5', attributes:{style:'font-size: 16px; line-height: 1.6;'}},
    CKEDITOR.config.format_h6={element:'h6', attributes:{style:'font-size: 15px; line-height: 1.6;'}}, function(){
 function c(c, f){
 const g=a.exec(c), b=a.exec(f);if(g){
 if(!g[2]&&'px'==b[2])return b[1];if('px'==g[2]&&!b[2])return `${b[1]}px`; 
}return f; 
}var h=CKEDITOR.htmlParser.cssStyle, g=CKEDITOR.tools.cssLength, a=/^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i, f={elements:{$:function(a){
 let f=a.attributes;if((f=(f=(f=f&&f['data-cke-realelement'])&&new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(f)))&&f.children[0])&&
    a.attributes['data-cke-resizable']){
 var g=(new h(a)).rules;a=f.attributes;var b=g.width, g=g.height;b&&(a.width=c(a.width, b));g&&(a.height=c(a.height, g)); 
}return f; 
}}};CKEDITOR.plugins.add('fakeobjects', {init:function(a){
 a.filter.allow('img[!data-cke-realelement,src,alt,title](*){*}', 'fakeobjects'); 
}, afterInit:function(a){
 (a=(a=a.dataProcessor)&&a.htmlFilter)&&a.addRules(f, {applyToAll:!0}); 
}});CKEDITOR.editor.prototype.createFakeElement=function(a, c, f, b){
 var d=this.lang.fakeobjects, d=d[f]||d.unknown;c=
    {'class':c, 'data-cke-realelement':encodeURIComponent(a.getOuterHtml()), 'data-cke-real-node-type':a.type, alt:d, title:d, align:a.getAttribute('align')||''};CKEDITOR.env.hc||(c.src=CKEDITOR.tools.transparentImageData);f&&(c['data-cke-real-element-type']=f);b&&(c['data-cke-resizable']=b, f=new h, b=a.getAttribute('width'), a=a.getAttribute('height'), b&&(f.rules.width=g(b)), a&&(f.rules.height=g(a)), f.populate(c));return this.document.createElement('img', {attributes:c}); 
};CKEDITOR.editor.prototype.createFakeParserElement=
    function(a, c, f, b){
 var d=this.lang.fakeobjects, d=d[f]||d.unknown, e;e=new CKEDITOR.htmlParser.basicWriter;a.writeHtml(e);e=e.getHtml();c={'class':c, 'data-cke-realelement':encodeURIComponent(e), 'data-cke-real-node-type':a.type, alt:d, title:d, align:a.attributes.align||''};CKEDITOR.env.hc||(c.src=CKEDITOR.tools.transparentImageData);f&&(c['data-cke-real-element-type']=f);b&&(c['data-cke-resizable']=b, b=a.attributes, a=new h, f=b.width, b=b.height, void 0!==f&&(a.rules.width=g(f)), void 0!==b&&(a.rules.height=
    g(b)), a.populate(c));return new CKEDITOR.htmlParser.element('img', c); 
};CKEDITOR.editor.prototype.restoreRealElement=function(a){
 if(a.data('cke-real-node-type')!=CKEDITOR.NODE_ELEMENT)return null;const f=CKEDITOR.dom.element.createFromHtml(decodeURIComponent(a.data('cke-realelement')), this.document);if(a.data('cke-resizable')){
 const g=a.getStyle('width');a=a.getStyle('height');g&&f.setAttribute('width', c(f.getAttribute('width'), g));a&&f.setAttribute('height', c(f.getAttribute('height'), a)); 
}return f; 
}; 
}(),
    CKEDITOR.plugins.add('forms', {requires:'dialog,fakeobjects', onLoad:function(){
 CKEDITOR.addCss('.cke_editable form{border: 1px dotted #FF0000;padding: 2px;}\n');CKEDITOR.addCss(`img.cke_hidden{background-image: url(${CKEDITOR.getUrl(`${this.path}images/hiddenfield.gif`)});background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 16px !important;height: 16px !important;}`);CKEDITOR.style.unstylableElements.push('select', 'option'); 
}, init:function(c){
 let h=c.lang,
    g=0, a={email:1, password:1, search:1, tel:1, text:1, url:1}, f={checkbox:'input[type,name,checked,required]', radio:'input[type,name,checked,required]', textfield:'input[type,name,value,size,maxlength,required]', textarea:'textarea[cols,rows,name,required]', select:'select[name,size,multiple,required]; option[value,selected]', button:'input[type,name,value]', form:'form[action,name,id,enctype,target,method]', hiddenfield:'input[type,name,value]', imagebutton:'input[type,alt,src]{width,height,border,border-width,border-style,margin,float}'},
    m={checkbox:'input', radio:'input', textfield:'input', textarea:'textarea', select:'select', button:'input', form:'form', hiddenfield:'input', imagebutton:'input'}, k=function(a, b, k){
 const l={allowedContent:f[b], requiredContent:m[b]};'form'==b&&(l.context='form');c.addCommand(b, new CKEDITOR.dialogCommand(b, l));c.ui.addButton&&c.ui.addButton(a, {label:h.common[a.charAt(0).toLowerCase()+a.slice(1)], command:b, toolbar:`forms,${g+=10}`});CKEDITOR.dialog.add(b, k); 
}, l=`${this.path}dialogs/`;!c.blockless&&k('Form', 'form',
    `${l}form.js`);k('Checkbox', 'checkbox', `${l}checkbox.js`);k('Radio', 'radio', `${l}radio.js`);k('TextField', 'textfield', `${l}textfield.js`);k('Textarea', 'textarea', `${l}textarea.js`);k('Select', 'select', `${l}select.js`);k('Button', 'button', `${l}button.js`);const b=c.plugins.image;b&&!c.plugins.image2&&k('ImageButton', 'imagebutton', `${CKEDITOR.plugins.getPath('image')}dialogs/image.js`);k('HiddenField', 'hiddenfield', `${l}hiddenfield.js`);c.addMenuItems&&(k={checkbox:{label:h.forms.checkboxAndRadio.checkboxTitle, command:'checkbox',
    group:'checkbox'}, radio:{label:h.forms.checkboxAndRadio.radioTitle, command:'radio', group:'radio'}, textfield:{label:h.forms.textfield.title, command:'textfield', group:'textfield'}, hiddenfield:{label:h.forms.hidden.title, command:'hiddenfield', group:'hiddenfield'}, button:{label:h.forms.button.title, command:'button', group:'button'}, select:{label:h.forms.select.title, command:'select', group:'select'}, textarea:{label:h.forms.textarea.title, command:'textarea', group:'textarea'}}, b&&(k.imagebutton={label:h.image.titleButton,
    command:'imagebutton', group:'imagebutton'}), !c.blockless&&(k.form={label:h.forms.form.menu, command:'form', group:'form'}), c.addMenuItems(k));c.contextMenu&&(!c.blockless&&c.contextMenu.addListener(function(a, b, c){
 if((a=c.contains('form', 1))&&!a.isReadOnly())return{form:CKEDITOR.TRISTATE_OFF}; 
}), c.contextMenu.addListener(function(c){
 if(c&&!c.isReadOnly()){
 const e=c.getName();if('select'==e)return{select:CKEDITOR.TRISTATE_OFF};if('textarea'==e)return{textarea:CKEDITOR.TRISTATE_OFF};if('input'==e){
 const f=
    c.getAttribute('type')||'text';switch(f){
 case 'button':case 'submit':case 'reset':return{button:CKEDITOR.TRISTATE_OFF};case 'checkbox':return{checkbox:CKEDITOR.TRISTATE_OFF};case 'radio':return{radio:CKEDITOR.TRISTATE_OFF};case 'image':return b?{imagebutton:CKEDITOR.TRISTATE_OFF}:null; 
}if(a[f])return{textfield:CKEDITOR.TRISTATE_OFF}; 
}if('img'==e&&'hiddenfield'==c.data('cke-real-element-type'))return{hiddenfield:CKEDITOR.TRISTATE_OFF}; 
} 
}));c.on('doubleclick', function(b){
 let e=b.data.element;if(!c.blockless&&
    e.is('form'))b.data.dialog='form';else if(e.is('select'))b.data.dialog='select';else if(e.is('textarea'))b.data.dialog='textarea';else if(e.is('img')&&'hiddenfield'==e.data('cke-real-element-type'))b.data.dialog='hiddenfield';else if(e.is('input')){
 e=e.getAttribute('type')||'text';switch(e){
 case 'button':case 'submit':case 'reset':b.data.dialog='button';break;case 'checkbox':b.data.dialog='checkbox';break;case 'radio':b.data.dialog='radio';break;case 'image':b.data.dialog='imagebutton'; 
}a[e]&&(b.data.dialog=
    'textfield'); 
} 
}); 
}, afterInit:function(c){
 var h=c.dataProcessor, g=h&&h.htmlFilter, h=h&&h.dataFilter;CKEDITOR.env.ie&&g&&g.addRules({elements:{input:function(a){
 a=a.attributes;const c=a.type;c||(a.type='text');'checkbox'!=c&&'radio'!=c||'on'!=a.value||delete a.value; 
}}}, {applyToAll:!0});h&&h.addRules({elements:{input:function(a){
 if('hidden'==a.attributes.type)return c.createFakeParserElement(a, 'cke_hidden', 'hiddenfield'); 
}}}, {applyToAll:!0}); 
}}), CKEDITOR.plugins.forms={_setupRequiredAttribute:function(c){
 this.setValue(c.hasAttribute('required')); 
}},
    function(){
 const c={canUndo:!1, exec:function(c){
 const g=c.document.createElement('hr');c.insertElement(g); 
}, allowedContent:'hr', requiredContent:'hr'};CKEDITOR.plugins.add('horizontalrule', {init:function(h){
 h.blockless||(h.addCommand('horizontalrule', c), h.ui.addButton&&h.ui.addButton('HorizontalRule', {label:h.lang.horizontalrule.toolbar, command:'horizontalrule', toolbar:'insert,40'})); 
}}); 
}(), CKEDITOR.plugins.add('htmlwriter', {init:function(c){
 const h=new CKEDITOR.htmlWriter;h.forceSimpleAmpersand=c.config.forceSimpleAmpersand;
    h.indentationChars='string'===typeof c.config.dataIndentationChars?c.config.dataIndentationChars:'\t';c.dataProcessor.writer=h; 
}}), CKEDITOR.htmlWriter=CKEDITOR.tools.createClass({base:CKEDITOR.htmlParser.basicWriter, $:function(){
 this.base();this.indentationChars='\t';this.selfClosingEnd=' /\x3e';this.lineBreakChars='\n';this.sortAttributes=1;this._.indent=0;this._.indentation='';this._.inPre=0;this._.rules={};let c=CKEDITOR.dtd, h;for(h in CKEDITOR.tools.extend({}, c.$nonBodyContent, c.$block, c.$listItem,
    c.$tableContent))this.setRules(h, {indent:!c[h]['#'], breakBeforeOpen:1, breakBeforeClose:!c[h]['#'], breakAfterClose:1, needsSpace:h in c.$block&&!(h in{li:1, dt:1, dd:1})});this.setRules('br', {breakAfterOpen:1});this.setRules('title', {indent:0, breakAfterOpen:0});this.setRules('style', {indent:0, breakBeforeClose:1});this.setRules('pre', {breakAfterOpen:1, indent:0}); 
}, proto:{openTag:function(c){
 const h=this._.rules[c];this._.afterCloser&&h&&h.needsSpace&&this._.needsSpace&&this._.output.push('\n');this._.indent?
    this.indentation():h&&h.breakBeforeOpen&&(this.lineBreak(), this.indentation());this._.output.push('\x3c', c);this._.afterCloser=0; 
}, openTagClose:function(c, h){
 const g=this._.rules[c];h?(this._.output.push(this.selfClosingEnd), g&&g.breakAfterClose&&(this._.needsSpace=g.needsSpace)):(this._.output.push('\x3e'), g&&g.indent&&(this._.indentation+=this.indentationChars));g&&g.breakAfterOpen&&this.lineBreak();'pre'==c&&(this._.inPre=1); 
}, attribute:function(c, h){
 'string'===typeof h&&(h=CKEDITOR.tools.htmlEncodeAttr(h),
    this.forceSimpleAmpersand&&(h=h.replace(/&amp;/g, '\x26')));this._.output.push(' ', c, '\x3d"', h, '"'); 
}, closeTag:function(c){
 const h=this._.rules[c];h&&h.indent&&(this._.indentation=this._.indentation.substr(this.indentationChars.length));this._.indent?this.indentation():h&&h.breakBeforeClose&&(this.lineBreak(), this.indentation());this._.output.push('\x3c/', c, '\x3e');'pre'==c&&(this._.inPre=0);h&&h.breakAfterClose&&(this.lineBreak(), this._.needsSpace=h.needsSpace);this._.afterCloser=1; 
}, text:function(c){
 this._.indent&&
    (this.indentation(), !this._.inPre&&(c=CKEDITOR.tools.ltrim(c)));this._.output.push(c); 
}, comment:function(c){
 this._.indent&&this.indentation();this._.output.push('\x3c!--', c, '--\x3e'); 
}, lineBreak:function(){
 !this._.inPre&&0<this._.output.length&&this._.output.push(this.lineBreakChars);this._.indent=1; 
}, indentation:function(){
 !this._.inPre&&this._.indentation&&this._.output.push(this._.indentation);this._.indent=0; 
}, reset:function(){
 this._.output=[];this._.indent=0;this._.indentation='';this._.afterCloser=
    0;this._.inPre=0;this._.needsSpace=0; 
}, setRules:function(c, h){
 const g=this._.rules[c];g?CKEDITOR.tools.extend(g, h, !0):this._.rules[c]=h; 
}}}), function(){
 CKEDITOR.plugins.add('iframe', {requires:'dialog,fakeobjects', onLoad:function(){
 CKEDITOR.addCss(`img.cke_iframe{background-image: url(${CKEDITOR.getUrl(`${this.path}images/placeholder.png`)});background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}`); 
}, init:function(c){
 let h=c.lang.iframe, g='iframe[align,longdesc,frameborder,height,name,scrolling,src,title,width]';
    c.plugins.dialogadvtab&&(g+=`;iframe${c.plugins.dialogadvtab.allowedContent({id:1, classes:1, styles:1})}`);CKEDITOR.dialog.add('iframe', `${this.path}dialogs/iframe.js`);c.addCommand('iframe', new CKEDITOR.dialogCommand('iframe', {allowedContent:g, requiredContent:'iframe'}));c.ui.addButton&&c.ui.addButton('Iframe', {label:h.toolbar, command:'iframe', toolbar:'insert,80'});c.on('doubleclick', function(a){
 const c=a.data.element;c.is('img')&&'iframe'==c.data('cke-real-element-type')&&(a.data.dialog='iframe'); 
});c.addMenuItems&&
    c.addMenuItems({iframe:{label:h.title, command:'iframe', group:'image'}});c.contextMenu&&c.contextMenu.addListener(function(a){
 if(a&&a.is('img')&&'iframe'==a.data('cke-real-element-type'))return{iframe:CKEDITOR.TRISTATE_OFF}; 
}); 
}, afterInit:function(c){
 let h=c.dataProcessor;(h=h&&h.dataFilter)&&h.addRules({elements:{iframe:function(g){
 return c.createFakeParserElement(g, 'cke_iframe', 'iframe', !0); 
}}}); 
}}); 
}(), function(){
 function c(c, a){
 a||(a=c.getSelection().getSelectedElement());if(a&&a.is('img')&&!a.data('cke-realelement')&&
    !a.isReadOnly())return a; 
}function h(c){
 let a=c.getStyle('float');if('inherit'==a||'none'==a)a=0;a||(a=c.getAttribute('align'));return a; 
}CKEDITOR.plugins.add('image', {requires:'dialog', init:function(g){
 if(!g.plugins.detectConflict('image', ['easyimage', 'image2'])){
 CKEDITOR.dialog.add('image', `${this.path}dialogs/image.js`);let a='img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}';CKEDITOR.dialog.isTabEnabled(g, 'image', 'advanced')&&(a=
    'img[alt,dir,id,lang,longdesc,!src,title]{*}(*)');g.addCommand('image', new CKEDITOR.dialogCommand('image', {allowedContent:a, requiredContent:'img[alt,src]', contentTransformations:[['img{width}: sizeToStyle', 'img[width]: sizeToAttribute'], ['img{float}: alignmentToStyle', 'img[align]: alignmentToAttribute']]}));g.ui.addButton&&g.ui.addButton('Image', {label:g.lang.common.image, command:'image', toolbar:'insert,10'});g.on('doubleclick', function(a){
 const c=a.data.element;!c.is('img')||c.data('cke-realelement')||
    c.isReadOnly()||(a.data.dialog='image'); 
});g.addMenuItems&&g.addMenuItems({image:{label:g.lang.image.menu, command:'image', group:'image'}});g.contextMenu&&g.contextMenu.addListener(function(a){
 if(c(g, a))return{image:CKEDITOR.TRISTATE_OFF}; 
}); 
} 
}, afterInit:function(g){
 function a(a){
 const m=g.getCommand(`justify${a}`);if(m){
 if('left'==a||'right'==a)m.on('exec', function(k){
 let l=c(g), b;l&&(b=h(l), b==a?(l.removeStyle('float'), a==h(l)&&l.removeAttribute('align')):l.setStyle('float', a), k.cancel()); 
});m.on('refresh',
    function(k){
 let l=c(g);l&&(l=h(l), this.setState(l==a?CKEDITOR.TRISTATE_ON:'right'==a||'left'==a?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED), k.cancel()); 
}); 
} 
}g.plugins.image2||(a('left'), a('right'), a('center'), a('block')); 
}}); 
}(), CKEDITOR.config.image_removeLinkByEmptyURL=!0, function(){
 function c(a, c){
 let m, k;c.on('refresh', function(a){
 let b=[h], c;for(c in a.data.states)b.push(a.data.states[c]);this.setState(CKEDITOR.tools.search(b, g)?g:h); 
}, c, null, 100);c.on('exec', function(c){
 m=a.getSelection();
    k=m.createBookmarks(1);c.data||(c.data={});c.data.done=!1; 
}, c, null, 0);c.on('exec', function(){
 a.forceNextSelectionCheck();m.selectBookmarks(k); 
}, c, null, 100); 
}var h=CKEDITOR.TRISTATE_DISABLED, g=CKEDITOR.TRISTATE_OFF;CKEDITOR.plugins.add('indent', {init:function(a){
 const f=CKEDITOR.plugins.indent.genericDefinition;c(a, a.addCommand('indent', new f(!0)));c(a, a.addCommand('outdent', new f));a.ui.addButton&&(a.ui.addButton('Indent', {label:a.lang.indent.indent, command:'indent', directional:!0, toolbar:'indent,20'}),
    a.ui.addButton('Outdent', {label:a.lang.indent.outdent, command:'outdent', directional:!0, toolbar:'indent,10'}));a.on('dirChanged', function(c){
 const f=a.createRange(), g=c.data.node;f.setStartBefore(g);f.setEndAfter(g);for(var b=new CKEDITOR.dom.walker(f), d;d=b.next();)if(d.type==CKEDITOR.NODE_ELEMENT)if(!d.equals(g)&&d.getDirection())f.setStartAfter(d), b=new CKEDITOR.dom.walker(f);else{
 let e=a.config.indentClasses;if(e)for(var h='ltr'==c.data.dir?['_rtl', '']:['', '_rtl'], t=0;t<e.length;t++)d.hasClass(e[t]+
    h[0])&&(d.removeClass(e[t]+h[0]), d.addClass(e[t]+h[1]));e=d.getStyle('margin-right');h=d.getStyle('margin-left');e?d.setStyle('margin-left', e):d.removeStyle('margin-left');h?d.setStyle('margin-right', h):d.removeStyle('margin-right'); 
} 
}); 
}});CKEDITOR.plugins.indent={genericDefinition:function(a){
 this.isIndent=!!a;this.startDisabled=!this.isIndent; 
}, specificDefinition:function(a, c, g){
 this.name=c;this.editor=a;this.jobs={};this.enterBr=a.config.enterMode==CKEDITOR.ENTER_BR;this.isIndent=!!g;this.relatedGlobal=
    g?'indent':'outdent';this.indentKey=g?9:CKEDITOR.SHIFT+9;this.database={}; 
}, registerCommands:function(a, c){
 a.on('pluginsLoaded', function(){
 for(const a in c)(function(a, c){
 let b=a.getCommand(c.relatedGlobal), d;for(d in c.jobs)b.on('exec', function(b){
 b.data.done||(a.fire('lockSnapshot'), c.execJob(a, d)&&(b.data.done=!0), a.fire('unlockSnapshot'), CKEDITOR.dom.element.clearAllMarkers(c.database)); 
}, this, null, d), b.on('refresh', function(b){
 b.data.states||(b.data.states={});b.data.states[`${c.name}@${d}`]=c.refreshJob(a,
    d, b.data.path); 
}, this, null, d);a.addFeature(c); 
})(this, c[a]); 
}); 
}};CKEDITOR.plugins.indent.genericDefinition.prototype={context:'p', exec:function(){}};CKEDITOR.plugins.indent.specificDefinition.prototype={execJob:function(a, c){
 const g=this.jobs[c];if(g.state!=h)return g.exec.call(this, a); 
}, refreshJob:function(a, c, g){
 c=this.jobs[c];a.activeFilter.checkFeature(this)?c.state=c.refresh.call(this, a, g):c.state=h;return c.state; 
}, getContext:function(a){
 return a.contains(this.context); 
}}; 
}(), function(){
 function c(a){
 function b(b){
 for(var h=
    k.startContainer, m=k.endContainer;h&&!h.getParent().equals(b);)h=h.getParent();for(;m&&!m.getParent().equals(b);)m=m.getParent();if(!h||!m)return!1;for(var A=[], r=!1;!r;)h.equals(m)&&(r=!0), A.push(h), h=h.getNext();if(1>A.length)return!1;h=b.getParents(!0);for(m=0;m<h.length;m++)if(h[m].getName&&f[h[m].getName()]){
 b=h[m];break; 
}for(var h=c.isIndent?1:-1, m=A[0], A=A[A.length-1], r=CKEDITOR.plugins.list.listToArray(b, e), y=r[A.getCustomData('listarray_index')].indent, m=m.getCustomData('listarray_index');m<=
    A.getCustomData('listarray_index');m++)if(r[m].indent+=h, 0<h){
 for(var z=r[m].parent, q=m-1;0<=q;q--)if(r[q].indent===h){
 z=r[q].parent;break; 
}r[m].parent=new CKEDITOR.dom.element(z.getName(), z.getDocument()); 
}for(m=A.getCustomData('listarray_index')+1;m<r.length&&r[m].indent>y;m++)r[m].indent+=h;h=CKEDITOR.plugins.list.arrayToList(r, e, null, a.config.enterMode, b.getDirection());if(!c.isIndent){
 var C;if((C=b.getParent())&&C.is('li'))for(var A=h.listNode.getChildren(), E=[], p, m=A.count()-1;0<=m;m--)(p=A.getItem(m))&&
    p.is&&p.is('li')&&E.push(p); 
}h&&h.listNode.replace(b);if(E&&E.length)for(m=0;m<E.length;m++){
 for(p=b=E[m];(p=p.getNext())&&p.is&&p.getName()in f;)CKEDITOR.env.needsNbspFiller&&!b.getFirst(g)&&b.append(k.document.createText(' ')), b.append(p);b.insertAfter(C); 
}h&&a.fire('contentDomInvalidated');return!0; 
}for(var c=this, e=this.database, f=this.context, k, m=a.getSelection(), m=(m&&m.getRanges()).createIterator();k=m.getNextRange();){
 for(var p=k.getCommonAncestor();p&&(p.type!=CKEDITOR.NODE_ELEMENT||!f[p.getName()]);){
 if(a.editable().equals(p)){
 p=
    !1;break; 
}p=p.getParent(); 
}p||(p=k.startPath().contains(f))&&k.setEndAt(p, CKEDITOR.POSITION_BEFORE_END);if(!p){
 var q=k.getEnclosedNode();q&&q.type==CKEDITOR.NODE_ELEMENT&&q.getName()in f&&(k.setStartAt(q, CKEDITOR.POSITION_AFTER_START), k.setEndAt(q, CKEDITOR.POSITION_BEFORE_END), p=q); 
}p&&k.startContainer.type==CKEDITOR.NODE_ELEMENT&&k.startContainer.getName()in f&&(q=new CKEDITOR.dom.walker(k), q.evaluator=h, k.startContainer=q.next());p&&k.endContainer.type==CKEDITOR.NODE_ELEMENT&&k.endContainer.getName()in
    f&&(q=new CKEDITOR.dom.walker(k), q.evaluator=h, k.endContainer=q.previous());if(p)return b(p); 
}return 0; 
}function h(a){
 return a.type==CKEDITOR.NODE_ELEMENT&&a.is('li'); 
}function g(c){
 return a(c)&&f(c); 
}var a=CKEDITOR.dom.walker.whitespaces(!0), f=CKEDITOR.dom.walker.bookmark(!1, !0), m=CKEDITOR.TRISTATE_DISABLED, k=CKEDITOR.TRISTATE_OFF;CKEDITOR.plugins.add('indentlist', {requires:'indent', init:function(a){
 function b(a){
 d.specificDefinition.apply(this, arguments);this.requiredContent=['ul', 'ol'];a.on('key',
    function(b){
 const c=a.elementPath();if('wysiwyg'==a.mode&&b.data.keyCode==this.indentKey&&c){
 const d=this.getContext(c);!d||this.isIndent&&CKEDITOR.plugins.indentList.firstItemInPath(this.context, c, d)||(a.execCommand(this.relatedGlobal), b.cancel()); 
} 
}, this);this.jobs[this.isIndent?10:30]={refresh:this.isIndent?function(a, b){
 const c=this.getContext(b), d=CKEDITOR.plugins.indentList.firstItemInPath(this.context, b, c);return c&&this.isIndent&&!d?k:m; 
}:function(a, b){
 return!this.getContext(b)||this.isIndent?m:k; 
},
    exec:CKEDITOR.tools.bind(c, this)}; 
}var d=CKEDITOR.plugins.indent;d.registerCommands(a, {indentlist:new b(a, 'indentlist', !0), outdentlist:new b(a, 'outdentlist')});CKEDITOR.tools.extend(b.prototype, d.specificDefinition.prototype, {context:{ol:1, ul:1}}); 
}});CKEDITOR.plugins.indentList={};CKEDITOR.plugins.indentList.firstItemInPath=function(a, b, c){
 const e=b.contains(h);c||(c=b.contains(a));return c&&e&&e.equals(c.getFirst(h)); 
}; 
}(), function(){
 function c(a, c, b){
 if(!a.getCustomData('indent_processed')){
 let d=this.editor,
    e=this.isIndent;if(c){
 d=a.$.className.match(this.classNameRegex);b=0;d&&(d=d[1], b=CKEDITOR.tools.indexOf(c, d)+1);if(0>(b+=e?1:-1))return;b=Math.min(b, c.length);b=Math.max(b, 0);a.$.className=CKEDITOR.tools.ltrim(a.$.className.replace(this.classNameRegex, ''));0<b&&a.addClass(c[b-1]); 
}else{
 c=h(a, b);b=parseInt(a.getStyle(c), 10);const f=d.config.indentOffset||40;isNaN(b)&&(b=0);b+=(e?1:-1)*f;if(0>b)return;b=Math.max(b, 0);b=Math.ceil(b/f)*f;a.setStyle(c, b?b+(d.config.indentUnit||'px'):'');''===a.getAttribute('style')&&
    a.removeAttribute('style'); 
}CKEDITOR.dom.element.setMarker(this.database, a, 'indent_processed', 1); 
} 
}function h(a, c){
 return'ltr'==(c||a.getComputedStyle('direction'))?'margin-left':'margin-right'; 
}const g=CKEDITOR.dtd.$listItem, a=CKEDITOR.dtd.$list, f=CKEDITOR.TRISTATE_DISABLED, m=CKEDITOR.TRISTATE_OFF;CKEDITOR.plugins.add('indentblock', {requires:'indent', init:function(k){
 function l(){
 b.specificDefinition.apply(this, arguments);this.allowedContent={'div h1 h2 h3 h4 h5 h6 ol p pre ul':{propertiesOnly:!0, styles:d?
    null:'margin-left,margin-right', classes:d||null}};this.contentTransformations=[['div: splitMarginShorthand'], ['h1: splitMarginShorthand'], ['h2: splitMarginShorthand'], ['h3: splitMarginShorthand'], ['h4: splitMarginShorthand'], ['h5: splitMarginShorthand'], ['h6: splitMarginShorthand'], ['ol: splitMarginShorthand'], ['p: splitMarginShorthand'], ['pre: splitMarginShorthand'], ['ul: splitMarginShorthand']];this.enterBr&&(this.allowedContent.div=!0);this.requiredContent=(this.enterBr?'div':'p')+(d?`(${d.join(',')
    })`:'{margin-left}');this.jobs={20:{refresh:function(a, b){
 var c=b.block||b.blockLimit;if(!c.is(g))var k=c.getAscendant(g), c=k&&b.contains(k)||c;c.is(g)&&(c=c.getParent());if(this.enterBr||this.getContext(b)){
 if(d){
 var k=d, c=c.$.className.match(this.classNameRegex), l=this.isIndent, k=c?l?c[1]!=k.slice(-1):!0:l;return k?m:f; 
}return this.isIndent?m:c?CKEDITOR[0>=(parseInt(c.getStyle(h(c)), 10)||0)?'TRISTATE_DISABLED':'TRISTATE_OFF']:f; 
}return f; 
}, exec:function(b){
 var f=b.getSelection(), f=f&&f.getRanges()[0],
    g;if(g=b.elementPath().contains(a))c.call(this, g, d);else for(f=f.createIterator(), b=b.config.enterMode, f.enforceRealBlocks=!0, f.enlargeBr=b!=CKEDITOR.ENTER_BR;g=f.getNextParagraph(b==CKEDITOR.ENTER_P?'p':'div');)g.isReadOnly()||c.call(this, g, d);return!0; 
}}}; 
}var b=CKEDITOR.plugins.indent, d=k.config.indentClasses;b.registerCommands(k, {indentblock:new l(k, 'indentblock', !0), outdentblock:new l(k, 'outdentblock')});CKEDITOR.tools.extend(l.prototype, b.specificDefinition.prototype, {context:{div:1, dl:1, h1:1,
    h2:1, h3:1, h4:1, h5:1, h6:1, ul:1, ol:1, p:1, pre:1, table:1}, classNameRegex:d?new RegExp(`(?:^|\\s+)(${d.join('|')})(?\x3d$|\\s)`):null}); 
}}); 
}(), function(){
 function c(a, c){
 c=void 0===c||c;let g;if(c)g=a.getComputedStyle('text-align');else{
 for(;!a.hasAttribute||!a.hasAttribute('align')&&!a.getStyle('text-align');){
 g=a.getParent();if(!g)break;a=g; 
}g=a.getStyle('text-align')||a.getAttribute('align')||''; 
}g&&(g=g.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i, ''));!g&&c&&(g='rtl'==a.getComputedStyle('direction')?
    'right':'left');return g; 
}function h(a, c, g){
 this.editor=a;this.name=c;this.value=g;this.context='p';c=a.config.justifyClasses;const h=a.config.enterMode==CKEDITOR.ENTER_P?'p':'div';if(c){
 switch(g){
 case 'left':this.cssClassName=c[0];break;case 'center':this.cssClassName=c[1];break;case 'right':this.cssClassName=c[2];break;case 'justify':this.cssClassName=c[3]; 
}this.cssClassRegex=new RegExp(`(?:^|\\s+)(?:${c.join('|')})(?\x3d$|\\s)`);this.requiredContent=`${h}(${this.cssClassName})`; 
}else this.requiredContent=
    `${h}{text-align}`;this.allowedContent={'caption div h1 h2 h3 h4 h5 h6 p pre td th li':{propertiesOnly:!0, styles:this.cssClassName?null:'text-align', classes:this.cssClassName||null}};a.config.enterMode==CKEDITOR.ENTER_BR&&(this.allowedContent.div=!0); 
}function g(a){
 const c=a.editor, g=c.createRange();g.setStartBefore(a.data.node);g.setEndAfter(a.data.node);for(var h=new CKEDITOR.dom.walker(g), l;l=h.next();)if(l.type==CKEDITOR.NODE_ELEMENT)if(!l.equals(a.data.node)&&l.getDirection())g.setStartAfter(l), h=
    new CKEDITOR.dom.walker(g);else{
 let b=c.config.justifyClasses;b&&(l.hasClass(b[0])?(l.removeClass(b[0]), l.addClass(b[2])):l.hasClass(b[2])&&(l.removeClass(b[2]), l.addClass(b[0])));b=l.getStyle('text-align');'left'==b?l.setStyle('text-align', 'right'):'right'==b&&l.setStyle('text-align', 'left'); 
} 
}h.prototype={exec:function(a){
 const f=a.getSelection(), g=a.config.enterMode;if(f){
 for(var h=f.createBookmarks(), l=f.getRanges(), b=this.cssClassName, d, e, n=a.config.useComputedState, n=void 0===n||n, t=l.length-1;0<=
    t;t--)for(d=l[t].createIterator(), d.enlargeBr=g!=CKEDITOR.ENTER_BR;e=d.getNextParagraph(g==CKEDITOR.ENTER_P?'p':'div');)if(!e.isReadOnly()){
 var x=e.getName(), p;p=a.activeFilter.check(`${x}{text-align}`);if((x=a.activeFilter.check(`${x}(${b})`))||p){
 e.removeAttribute('align');e.removeStyle('text-align');const q=b&&(e.$.className=CKEDITOR.tools.ltrim(e.$.className.replace(this.cssClassRegex, ''))), v=this.state==CKEDITOR.TRISTATE_OFF&&(!n||c(e, !0)!=this.value);b&&x?v?e.addClass(b):q||e.removeAttribute('class'):
    v&&p&&e.setStyle('text-align', this.value); 
} 
}a.focus();a.forceNextSelectionCheck();f.selectBookmarks(h); 
} 
}, refresh:function(a, f){
 var g=f.block||f.blockLimit, h=g.getName(), l=g.equals(a.editable()), h=this.cssClassName?a.activeFilter.check(`${h}(${this.cssClassName})`):a.activeFilter.check(`${h}{text-align}`);l&&!CKEDITOR.dtd.$list[f.lastElement.getName()]?this.setState(CKEDITOR.TRISTATE_OFF):!l&&h?this.setState(c(g, this.editor.config.useComputedState)==this.value?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF):
    this.setState(CKEDITOR.TRISTATE_DISABLED); 
}};CKEDITOR.plugins.add('justify', {init:function(a){
 if(!a.blockless){
 const c=new h(a, 'justifyleft', 'left'), m=new h(a, 'justifycenter', 'center'), k=new h(a, 'justifyright', 'right'), l=new h(a, 'justifyblock', 'justify');a.addCommand('justifyleft', c);a.addCommand('justifycenter', m);a.addCommand('justifyright', k);a.addCommand('justifyblock', l);a.ui.addButton&&(a.ui.addButton('JustifyLeft', {label:a.lang.common.alignLeft, command:'justifyleft', toolbar:'align,10'}), a.ui.addButton('JustifyCenter',
    {label:a.lang.common.center, command:'justifycenter', toolbar:'align,20'}), a.ui.addButton('JustifyRight', {label:a.lang.common.alignRight, command:'justifyright', toolbar:'align,30'}), a.ui.addButton('JustifyBlock', {label:a.lang.common.justify, command:'justifyblock', toolbar:'align,40'}));a.on('dirChanged', g); 
} 
}}); 
}(), CKEDITOR.plugins.add('menubutton', {requires:'button,menu', onLoad:function(){
 const c=function(c){
 let g=this._, a=CKEDITOR.document.getById(g.id), f=g.menu;g.state!==CKEDITOR.TRISTATE_DISABLED&&(g.on&&
    f?f.hide():(g.previousState=g.state, f||(f=g.menu=new CKEDITOR.menu(c, {panel:{className:'cke_menu_panel', attributes:{'aria-label':c.lang.common.options}}}), f.onHide=CKEDITOR.tools.bind(function(){
 const f=this.command?c.getCommand(this.command).modes:this.modes;this.setState(!f||f[c.mode]?g.previousState:CKEDITOR.TRISTATE_DISABLED);g.on=0;a.setAttribute('aria-expanded', 'false'); 
}, this), this.onMenu&&f.addListener(this.onMenu)), this.setState(CKEDITOR.TRISTATE_ON), g.on=1, a.setAttribute('aria-expanded', 'true'),
    setTimeout(function(){
 f.show(CKEDITOR.document.getById(g.id), 4); 
}, 0))); 
};CKEDITOR.ui.menuButton=CKEDITOR.tools.createClass({base:CKEDITOR.ui.button, $:function(h){
 delete h.panel;this.base(h);this.hasArrow='menu';this.click=c; 
}, statics:{handler:{create:function(c){
 return new CKEDITOR.ui.menuButton(c); 
}}}}); 
}, beforeInit:function(c){
 c.ui.addHandler(CKEDITOR.UI_MENUBUTTON, CKEDITOR.ui.menuButton.handler); 
}}), CKEDITOR.UI_MENUBUTTON='menubutton', 'use strict', function(){
 CKEDITOR.plugins.add('language', {requires:'menubutton',
    init:function(c){
 let h=c.config.language_list||['ar:Arabic:rtl', 'fr:French', 'es:Spanish'], g=this, a=c.lang.language, f={}, m, k, l, b;c.addCommand('language', {allowedContent:'span[!lang,!dir]', requiredContent:'span[lang,dir]', contextSensitive:!0, exec:function(a, b){
 const c=f[`language_${b}`];if(c)a[c.style.checkActive(a.elementPath(), a)?'removeStyle':'applyStyle'](c.style); 
}, refresh:function(a){
 this.setState(g.getCurrentLangElement(a)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF); 
}});for(b=0;b<h.length;b++)m=h[b].split(':'),
    k=m[0], l=`language_${k}`, f[l]={label:m[1], langId:k, group:'language', order:b, ltr:'rtl'!=(`${m[2]}`).toLowerCase(), onClick:function(){
 c.execCommand('language', this.langId); 
}, role:'menuitemcheckbox'}, f[l].style=new CKEDITOR.style({element:'span', attributes:{lang:k, dir:f[l].ltr?'ltr':'rtl'}});f.language_remove={label:a.remove, group:'language_remove', state:CKEDITOR.TRISTATE_DISABLED, order:f.length, onClick:function(){
 const a=g.getCurrentLangElement(c);a&&c.execCommand('language', a.getAttribute('lang')); 
}};c.addMenuGroup('language',
    1);c.addMenuGroup('language_remove');c.addMenuItems(f);c.ui.add('Language', CKEDITOR.UI_MENUBUTTON, {label:a.button, allowedContent:'span[!lang,!dir]', requiredContent:'span[lang,dir]', toolbar:'bidi,30', command:'language', onMenu:function(){
 let a={}, b=g.getCurrentLangElement(c), h;for(h in f)a[h]=CKEDITOR.TRISTATE_OFF;a.language_remove=b?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED;b&&(a[`language_${b.getAttribute('lang')}`]=CKEDITOR.TRISTATE_ON);return a; 
}});c.addRemoveFormatFilter&&c.addRemoveFormatFilter(function(a){
 return!(a.is('span')&&
    a.getAttribute('dir')&&a.getAttribute('lang')); 
}); 
}, getCurrentLangElement:function(c){
 let h=c.elementPath();c=h&&h.elements;let g;if(h)for(let a=0;a<c.length;a++)h=c[a], !g&&'span'==h.getName()&&h.hasAttribute('dir')&&h.hasAttribute('lang')&&(g=h);return g; 
}}); 
}(), 'use strict', function(){
 function c(a){
 return a.replace(/'/g, '\\$\x26'); 
}function h(a){
 for(var b=a.length, c=[], d, e=0;e<b;e++)d=a.charCodeAt(e), c.push(d);return`String.fromCharCode(${c.join(',')})`; 
}function g(a, b){
 for(var d=a.plugins.link, e=d.compiledProtectionFunction.params,
    d=[d.compiledProtectionFunction.name, '('], f, g, h=0;h<e.length;h++)f=e[h].toLowerCase(), g=b[f], 0<h&&d.push(','), d.push('\'', g?c(encodeURIComponent(b[f])):'', '\'');d.push(')');return d.join(''); 
}function a(a){
 a=a.config.emailProtection||'';let b;a&&'encode'!=a&&(b={}, a.replace(/^([^(]+)\(([^)]+)\)$/, function(a, c, d){
 b.name=c;b.params=[];d.replace(/[^,\s]+/g, function(a){
 b.params.push(a); 
}); 
}));return b; 
}CKEDITOR.plugins.add('link', {requires:'dialog,fakeobjects', onLoad:function(){
 function a(b){
 return c.replace(/%1/g,
    'rtl'==b?'right':'left').replace(/%2/g, `cke_contents_${b}`); 
}var b=`background:url(${CKEDITOR.getUrl(`${this.path}images${CKEDITOR.env.hidpi?'/hidpi':''}/anchor.png`)}) no-repeat %1 center;border:1px dotted #00f;background-size:16px;`, c=`.%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{${b}padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{${b}width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}`;CKEDITOR.addCss(a('ltr')+a('rtl')); 
},
    init:function(b){
 let c='a[!href]';CKEDITOR.dialog.isTabEnabled(b, 'link', 'advanced')&&(c=c.replace(']', ',accesskey,charset,dir,id,lang,name,rel,tabindex,title,type,download]{*}(*)'));CKEDITOR.dialog.isTabEnabled(b, 'link', 'target')&&(c=c.replace(']', ',target,onclick]'));b.addCommand('link', new CKEDITOR.dialogCommand('link', {allowedContent:c, requiredContent:'a[href]'}));b.addCommand('anchor', new CKEDITOR.dialogCommand('anchor', {allowedContent:'a[!name,id]', requiredContent:'a[name]'}));b.addCommand('unlink',
    new CKEDITOR.unlinkCommand);b.addCommand('removeAnchor', new CKEDITOR.removeAnchorCommand);b.setKeystroke(CKEDITOR.CTRL+76, 'link');b.setKeystroke(CKEDITOR.CTRL+75, 'link');b.ui.addButton&&(b.ui.addButton('Link', {label:b.lang.link.toolbar, command:'link', toolbar:'links,10'}), b.ui.addButton('Unlink', {label:b.lang.link.unlink, command:'unlink', toolbar:'links,20'}), b.ui.addButton('Anchor', {label:b.lang.link.anchor.toolbar, command:'anchor', toolbar:'links,30'}));CKEDITOR.dialog.add('link', `${this.path}dialogs/link.js`);
    CKEDITOR.dialog.add('anchor', `${this.path}dialogs/anchor.js`);b.on('doubleclick', function(a){
 const c=a.data.element.getAscendant({a:1, img:1}, !0);c&&!c.isReadOnly()&&(c.is('a')?(a.data.dialog=!c.getAttribute('name')||c.getAttribute('href')&&c.getChildCount()?'link':'anchor', a.data.link=c):CKEDITOR.plugins.link.tryRestoreFakeAnchor(b, c)&&(a.data.dialog='anchor')); 
}, null, null, 0);b.on('doubleclick', function(a){
 a.data.dialog in{link:1, anchor:1}&&a.data.link&&b.getSelection().selectElement(a.data.link); 
}, null,
    null, 20);b.addMenuItems&&b.addMenuItems({anchor:{label:b.lang.link.anchor.menu, command:'anchor', group:'anchor', order:1}, removeAnchor:{label:b.lang.link.anchor.remove, command:'removeAnchor', group:'anchor', order:5}, link:{label:b.lang.link.menu, command:'link', group:'link', order:1}, unlink:{label:b.lang.link.unlink, command:'unlink', group:'link', order:5}});b.contextMenu&&b.contextMenu.addListener(function(a){
 if(!a||a.isReadOnly())return null;a=CKEDITOR.plugins.link.tryRestoreFakeAnchor(b, a);if(!a&&!(a=
    CKEDITOR.plugins.link.getSelectedLink(b)))return null;let c={};a.getAttribute('href')&&a.getChildCount()&&(c={link:CKEDITOR.TRISTATE_OFF, unlink:CKEDITOR.TRISTATE_OFF});a&&a.hasAttribute('name')&&(c.anchor=c.removeAnchor=CKEDITOR.TRISTATE_OFF);return c; 
});this.compiledProtectionFunction=a(b); 
}, afterInit:function(a){
 a.dataProcessor.dataFilter.addRules({elements:{a:function(b){
 return b.attributes.name?b.children.length?null:a.createFakeParserElement(b, 'cke_anchor', 'anchor'):null; 
}}});const b=a._.elementsPath&&
    a._.elementsPath.filters;b&&b.push(function(b, c){
 if('a'==c&&(CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, b)||b.getAttribute('name')&&(!b.getAttribute('href')||!b.getChildCount())))return'anchor'; 
}); 
}});const f=/^javascript:/, m=/^(?:mailto)(?:(?!\?(subject|body)=).)+/i, k=/subject=([^;?:@&=$,\/]*)/i, l=/body=([^;?:@&=$,\/]*)/i, b=/^#(.*)$/, d=/^((?:http|https|ftp|news):\/\/)?(.*)$/, e=/^(_(?:self|top|parent|blank))$/, n=/^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/,
    t=/^javascript:([^(]+)\(([^)]+)\)$/, x=/\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/, p=/(?:^|,)([^=]+)=(\d+|yes|no)/gi, q=/^tel:(.*)$/, v={id:'advId', dir:'advLangDir', accessKey:'advAccessKey', name:'advName', lang:'advLangCode', tabindex:'advTabIndex', title:'advTitle', type:'advContentType', 'class':'advCSSClasses', charset:'advCharset', style:'advStyles', rel:'advRel'};CKEDITOR.plugins.link={getSelectedLink:function(a, b){
 let c=a.getSelection(), d=c.getSelectedElement(),
    e=c.getRanges(), f=[], g;if(!b&&d&&d.is('a'))return d;for(d=0;d<e.length;d++)if(g=c.getRanges()[d], g.shrink(CKEDITOR.SHRINK_ELEMENT, !0, {skipBogus:!0}), (g=a.elementPath(g.getCommonAncestor()).contains('a', 1))&&b)f.push(g);else if(g)return g;return b?f:null; 
}, getEditorAnchors:function(a){
 for(var b=a.editable(), c=b.isInline()&&!a.plugins.divarea?a.document:b, b=c.getElementsByTag('a'), c=c.getElementsByTag('img'), d=[], e=0, f;f=b.getItem(e++);)(f.data('cke-saved-name')||f.hasAttribute('name'))&&d.push({name:f.data('cke-saved-name')||
    f.getAttribute('name'), id:f.getAttribute('id')});for(e=0;f=c.getItem(e++);)(f=this.tryRestoreFakeAnchor(a, f))&&d.push({name:f.getAttribute('name'), id:f.getAttribute('id')});return d; 
}, fakeAnchor:!0, tryRestoreFakeAnchor:function(a, b){
 if(b&&b.data('cke-real-element-type')&&'anchor'==b.data('cke-real-element-type')){
 const c=a.restoreRealElement(b);if(c.data('cke-saved-name'))return c; 
} 
}, parseLinkAttributes:function(a, c){
 var g=c&&(c.data('cke-saved-href')||c.getAttribute('href'))||'', h=a.plugins.link.compiledProtectionFunction,
    y=a.config.emailProtection, z={}, B;g.match(f)&&('encode'==y?g=g.replace(n, function(a, b, c){
 c=c||'';return`mailto:${String.fromCharCode.apply(String, b.split(','))}${c.replace(/\\'/g, '\'')}`; 
}):y&&g.replace(t, function(a, b, c){
 if(b==h.name){
 z.type='email';a=z.email={};b=/(^')|('$)/g;c=c.match(/[^,\s]+/g);for(var d=c.length, e, f, g=0;g<d;g++)e=decodeURIComponent, f=c[g].replace(b, '').replace(/\\'/g, '\''), f=e(f), e=h.params[g].toLowerCase(), a[e]=f;a.address=[a.name, a.domain].join('@'); 
} 
}));if(!z.type)if(y=g.match(b))z.type=
    'anchor', z.anchor={}, z.anchor.name=z.anchor.id=y[1];else if(y=g.match(q))z.type='tel', z.tel=y[1];else if(y=g.match(m)){
 B=g.match(k);var g=g.match(l), C=z.email={};z.type='email';C.address=y[0].replace('mailto:', '');B&&(C.subject=decodeURIComponent(B[1]));g&&(C.body=decodeURIComponent(g[1])); 
}else g&&(B=g.match(d))&&(z.type='url', z.url={}, z.url.protocol=B[1], z.url.url=B[2]);if(c){
 if(g=c.getAttribute('target'))z.target={type:g.match(e)?g:'frame', name:g};else if(g=(g=c.data('cke-pa-onclick')||c.getAttribute('onclick'))&&
    g.match(x))for(z.target={type:'popup', name:g[1]};y=p.exec(g[2]);)'yes'!=y[2]&&'1'!=y[2]||y[1]in{height:1, width:1, top:1, left:1}?isFinite(y[2])&&(z.target[y[1]]=y[2]):z.target[y[1]]=!0;null!==c.getAttribute('download')&&(z.download=!0);var g={}, E;for(E in v)(y=c.getAttribute(E))&&(g[v[E]]=y);if(E=c.data('cke-saved-name')||g.advName)g.advName=E;CKEDITOR.tools.isEmpty(g)||(z.advanced=g); 
}return z; 
}, getLinkAttributes:function(a, b){
 var d=a.config.emailProtection||'', e={};switch(b.type){
 case 'url':var d=b.url&&
    void 0!==b.url.protocol?b.url.protocol:'http://', f=b.url&&CKEDITOR.tools.trim(b.url.url)||'';e['data-cke-saved-href']=0===f.indexOf('/')?f:d+f;break;case 'anchor':d=b.anchor&&b.anchor.id;e['data-cke-saved-href']=`#${b.anchor&&b.anchor.name||d||''}`;break;case 'email':var k=b.email, f=k.address;switch(d){
 case '':case 'encode':var l=encodeURIComponent(k.subject||''), m=encodeURIComponent(k.body||''), k=[];l&&k.push(`subject\x3d${l}`);m&&k.push(`body\x3d${m}`);k=k.length?`?${k.join('\x26')}`:'';'encode'==d?(d=
    ['javascript:void(location.href\x3d\'mailto:\'+', h(f)], k&&d.push('+\'', c(k), '\''), d.push(')')):d=['mailto:', f, k];break;default:d=f.split('@', 2), k.name=d[0], k.domain=d[1], d=['javascript:', g(a, k)]; 
}e['data-cke-saved-href']=d.join('');break;case 'tel':e['data-cke-saved-href']=`tel:${b.tel}`; 
}if(b.target)if('popup'==b.target.type){
 for(var d=['window.open(this.href, \'', b.target.name||'', '\', \''], n='resizable status location toolbar menubar fullscreen scrollbars dependent'.split(' '), f=n.length, l=function(a){
 b.target[a]&&
    n.push(`${a}\x3d${b.target[a]}`); 
}, k=0;k<f;k++)n[k]+=b.target[n[k]]?'\x3dyes':'\x3dno';l('width');l('left');l('height');l('top');d.push(n.join(','), '\'); return false;');e['data-cke-pa-onclick']=d.join(''); 
}else'notSet'!=b.target.type&&b.target.name&&(e.target=b.target.name);b.download&&(e.download='');if(b.advanced){
 for(var q in v)(d=b.advanced[v[q]])&&(e[q]=d);e.name&&(e['data-cke-saved-name']=e.name); 
}e['data-cke-saved-href']&&(e.href=e['data-cke-saved-href']);q={target:1, onclick:1, 'data-cke-pa-onclick':1,
    'data-cke-saved-name':1, download:1};b.advanced&&CKEDITOR.tools.extend(q, v);for(const t in e)delete q[t];return{set:e, removed:CKEDITOR.tools.object.keys(q)}; 
}, showDisplayTextForElement:function(a, b){
 const c={img:1, table:1, tbody:1, thead:1, tfoot:1, input:1, select:1, textarea:1}, d=b.getSelection();return b.widgets&&b.widgets.focused||d&&1<d.getRanges().length?!1:!a||!a.getName||!a.is(c); 
}};CKEDITOR.unlinkCommand=function(){};CKEDITOR.unlinkCommand.prototype={exec:function(a){
 if(CKEDITOR.env.ie){
 var b=a.getSelection().getRanges()[0],
    c=b.getPreviousEditableNode()&&b.getPreviousEditableNode().getAscendant('a', !0)||b.getNextEditableNode()&&b.getNextEditableNode().getAscendant('a', !0), d;b.collapsed&&c&&(d=b.createBookmark(), b.selectNodeContents(c), b.select()); 
}c=new CKEDITOR.style({element:'a', type:CKEDITOR.STYLE_INLINE, alwaysRemoveElement:1});a.removeStyle(c);d&&(b.moveToBookmark(d), b.select()); 
}, refresh:function(a, b){
 const c=b.lastElement&&b.lastElement.getAscendant('a', !0);c&&'a'==c.getName()&&c.getAttribute('href')&&c.getChildCount()?
    this.setState(CKEDITOR.TRISTATE_OFF):this.setState(CKEDITOR.TRISTATE_DISABLED); 
}, contextSensitive:1, startDisabled:1, requiredContent:'a[href]', editorFocus:1};CKEDITOR.removeAnchorCommand=function(){};CKEDITOR.removeAnchorCommand.prototype={exec:function(a){
 let b=a.getSelection(), c=b.createBookmarks(), d;if(b&&(d=b.getSelectedElement())&&(d.getChildCount()?d.is('a'):CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, d)))d.remove(1);else if(d=CKEDITOR.plugins.link.getSelectedLink(a))d.hasAttribute('href')?(d.removeAttributes({name:1,
    'data-cke-saved-name':1}), d.removeClass('cke_anchor')):d.remove(1);b.selectBookmarks(c); 
}, requiredContent:'a[name]'};CKEDITOR.tools.extend(CKEDITOR.config, {linkShowAdvancedTab:!0, linkShowTargetTab:!0, linkDefaultProtocol:'http://'}); 
}(), function(){
 function c(a, b, c, d){
 for(var e=CKEDITOR.plugins.list.listToArray(b.root, c), f=[], g=0;g<b.contents.length;g++){
 var h=b.contents[g];(h=h.getAscendant('li', !0))&&!h.getCustomData('list_item_processed')&&(f.push(h), CKEDITOR.dom.element.setMarker(c, h, 'list_item_processed',
    !0)); 
}for(var h=b.root.getDocument(), k, l, g=0;g<f.length;g++){
 const m=f[g].getCustomData('listarray_index');k=e[m].parent;k.is(this.type)||(l=h.createElement(this.type), k.copyAttributes(l, {start:1, type:1}), l.removeStyle('list-style-type'), e[m].parent=l); 
}c=CKEDITOR.plugins.list.arrayToList(e, c, null, a.config.enterMode);for(var n, e=c.listNode.getChildCount(), g=0;g<e&&(n=c.listNode.getChild(g));g++)n.getName()==this.type&&d.push(n);c.listNode.replace(b.root);a.fire('contentDomInvalidated'); 
}function h(a, b,
    c){
 let d=b.contents, e=b.root.getDocument(), f=[];if(1==d.length&&d[0].equals(b.root)){
 var g=e.createElement('div');d[0].moveChildren&&d[0].moveChildren(g);d[0].append(g);d[0]=g; 
}b=b.contents[0].getParent();for(g=0;g<d.length;g++)b=b.getCommonAncestor(d[g].getParent());a=a.config.useComputedState;let h, k;a=void 0===a||a;for(g=0;g<d.length;g++)for(var l=d[g], m;m=l.getParent();){
 if(m.equals(b)){
 f.push(l);!k&&l.getDirection()&&(k=1);l=l.getDirection(a);null!==h&&(h=h&&h!=l?null:l);break; 
}l=m; 
}if(!(1>f.length)){
 d=
    f[f.length-1].getNext();g=e.createElement(this.type);for(c.push(g);f.length;)c=f.shift(), a=e.createElement('li'), l=c, l.is('pre')||p.test(l.getName())||'false'==l.getAttribute('contenteditable')?c.appendTo(a):(c.copyAttributes(a), h&&c.getDirection()&&(a.removeStyle('direction'), a.removeAttribute('dir')), c.moveChildren(a), c.remove()), a.appendTo(g);h&&k&&g.setAttribute('dir', h);d?g.insertBefore(d):g.appendTo(b); 
} 
}function g(a, b, c){
 function d(c){
 if(!(!(l=k[c?'getFirst':'getLast']())||l.is&&l.isBlockBoundary()||
    !(m=b.root[c?'getPrevious':'getNext'](CKEDITOR.dom.walker.invisible(!0)))||m.is&&m.isBlockBoundary({br:1})))a.document.createElement('br')[c?'insertBefore':'insertAfter'](l); 
}for(var e=CKEDITOR.plugins.list.listToArray(b.root, c), f=[], g=0;g<b.contents.length;g++){
 var h=b.contents[g];(h=h.getAscendant('li', !0))&&!h.getCustomData('list_item_processed')&&(f.push(h), CKEDITOR.dom.element.setMarker(c, h, 'list_item_processed', !0)); 
}h=null;for(g=0;g<f.length;g++)h=f[g].getCustomData('listarray_index'), e[h].indent=
    -1;for(g=h+1;g<e.length;g++)if(e[g].indent>e[g-1].indent+1){
 f=e[g-1].indent+1-e[g].indent;for(h=e[g].indent;e[g]&&e[g].indent>=h;)e[g].indent+=f, g++;g--; 
}var k=CKEDITOR.plugins.list.arrayToList(e, c, null, a.config.enterMode, b.root.getAttribute('dir')).listNode, l, m;d(!0);d();k.replace(b.root);a.fire('contentDomInvalidated'); 
}function a(a, b){
 this.name=a;this.context=this.type=b;this.allowedContent=`${b} li`;this.requiredContent=b; 
}function f(a, b, c, d){
 for(var e, f;e=a[d?'getLast':'getFirst'](q);)(f=e.getDirection(1))!==
    b.getDirection(1)&&e.setAttribute('dir', f), e.remove(), c?e[d?'insertBefore':'insertAfter'](c):b.append(e, d), c=e; 
}function m(a){
 function b(c){
 const d=a[c?'getPrevious':'getNext'](t);d&&d.type==CKEDITOR.NODE_ELEMENT&&d.is(a.getName())&&(f(a, d, null, !c), a.remove(), a=d); 
}b();b(1); 
}function k(a){
 return a.type==CKEDITOR.NODE_ELEMENT&&(a.getName()in CKEDITOR.dtd.$block||a.getName()in CKEDITOR.dtd.$listItem)&&CKEDITOR.dtd[a.getName()]['#']; 
}function l(a, c, d){
 a.fire('saveSnapshot');d.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);
    let e=d.extractContents();c.trim(!1, !0);var g=c.createBookmark(), h=new CKEDITOR.dom.elementPath(c.startContainer), k=h.block, h=h.lastElement.getAscendant('li', 1)||k, l=new CKEDITOR.dom.elementPath(d.startContainer), n=l.contains(CKEDITOR.dtd.$listItem), l=l.contains(CKEDITOR.dtd.$list);k?(k=k.getBogus())&&k.remove():l&&(k=l.getPrevious(t))&&x(k)&&k.remove();(k=e.getLast())&&k.type==CKEDITOR.NODE_ELEMENT&&k.is('br')&&k.remove();(k=c.startContainer.getChild(c.startOffset))?e.insertBefore(k):c.startContainer.append(e);
    n&&(e=b(n))&&(h.contains(n)?(f(e, n.getParent(), n), e.remove()):h.append(e));for(;d.checkStartOfBlock()&&d.checkEndOfBlock();){
 l=d.startPath();e=l.block;if(!e)break;e.is('li')&&(h=e.getParent(), e.equals(h.getLast(t))&&e.equals(h.getFirst(t))&&(e=h));d.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START);e.remove(); 
}d=d.clone();e=a.editable();d.setEndAt(e, CKEDITOR.POSITION_BEFORE_END);d=new CKEDITOR.dom.walker(d);d.evaluator=function(a){
 return t(a)&&!x(a); 
};(d=d.next())&&d.type==CKEDITOR.NODE_ELEMENT&&d.getName()in
    CKEDITOR.dtd.$list&&m(d);c.moveToBookmark(g);c.select();a.fire('saveSnapshot'); 
}function b(a){
 return(a=a.getLast(t))&&a.type==CKEDITOR.NODE_ELEMENT&&a.getName()in d?a:null; 
}var d={ol:1, ul:1}, e=CKEDITOR.dom.walker.whitespaces(), n=CKEDITOR.dom.walker.bookmark(), t=function(a){
 return!(e(a)||n(a)); 
}, x=CKEDITOR.dom.walker.bogus();CKEDITOR.plugins.list={listToArray:function(a, b, c, e, f){
 if(!d[a.getName()])return[];e||(e=0);c||(c=[]);for(let g=0, h=a.getChildCount();g<h;g++){
 const k=a.getChild(g);k.type==CKEDITOR.NODE_ELEMENT&&
    k.getName()in CKEDITOR.dtd.$list&&CKEDITOR.plugins.list.listToArray(k, b, c, e+1);if('li'==k.$.nodeName.toLowerCase()){
 const l={parent:a, indent:e, element:k, contents:[]};f?l.grandparent=f:(l.grandparent=a.getParent(), l.grandparent&&'li'==l.grandparent.$.nodeName.toLowerCase()&&(l.grandparent=l.grandparent.getParent()));b&&CKEDITOR.dom.element.setMarker(b, k, 'listarray_index', c.length);c.push(l);for(var m=0, n=k.getChildCount(), q;m<n;m++)q=k.getChild(m), q.type==CKEDITOR.NODE_ELEMENT&&d[q.getName()]?CKEDITOR.plugins.list.listToArray(q,
    b, c, e+1, l.grandparent):l.contents.push(q); 
} 
}return c; 
}, arrayToList:function(a, b, c, e, f){
 c||(c=0);if(!a||a.length<c+1)return null;for(var g, h=a[c].parent.getDocument(), k=new CKEDITOR.dom.documentFragment(h), l=null, m=c, q=Math.max(a[c].indent, 0), p=null, x, D, N=e==CKEDITOR.ENTER_P?'p':'div';;){
 let J=a[m];g=J.grandparent;x=J.element.getDirection(1);if(J.indent==q){
 l&&a[m].parent.getName()==l.getName()||(l=a[m].parent.clone(!1, 1), f&&l.setAttribute('dir', f), k.append(l));p=l.append(J.element.clone(0, 1));x!=l.getDirection(1)&&
    p.setAttribute('dir', x);for(g=0;g<J.contents.length;g++)p.append(J.contents[g].clone(1, 1));m++; 
}else if(J.indent==Math.max(q, 0)+1)J=a[m-1].element.getDirection(1), m=CKEDITOR.plugins.list.arrayToList(a, null, m, e, J!=x?x:null), !p.getChildCount()&&CKEDITOR.env.needsNbspFiller&&7>=h.$.documentMode&&p.append(h.createText(' ')), p.append(m.listNode), m=m.nextIndex;else if(-1==J.indent&&!c&&g){
 d[g.getName()]?(p=J.element.clone(!1, !0), x!=g.getDirection(1)&&p.setAttribute('dir', x)):p=new CKEDITOR.dom.documentFragment(h);
    var l=g.getDirection(1)!=x, L=J.element, Q=L.getAttribute('class'), M=L.getAttribute('style'), H=p.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT&&(e!=CKEDITOR.ENTER_BR||l||M||Q), O, X=J.contents.length, T;for(g=0;g<X;g++)if(O=J.contents[g], n(O)&&1<X)H?T=O.clone(1, 1):p.append(O.clone(1, 1));else if(O.type==CKEDITOR.NODE_ELEMENT&&O.isBlockBoundary()){
 l&&!O.getDirection()&&O.setAttribute('dir', x);D=O;const Y=L.getAttribute('style');Y&&D.setAttribute('style', Y.replace(/([^;])$/, '$1;')+(D.getAttribute('style')||''));Q&&
    O.addClass(Q);D=null;T&&(p.append(T), T=null);p.append(O.clone(1, 1)); 
}else H?(D||(D=h.createElement(N), p.append(D), l&&D.setAttribute('dir', x)), M&&D.setAttribute('style', M), Q&&D.setAttribute('class', Q), T&&(D.append(T), T=null), D.append(O.clone(1, 1))):p.append(O.clone(1, 1));T&&((D||p).append(T), T=null);p.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT&&m!=a.length-1&&(CKEDITOR.env.needsBrFiller&&(x=p.getLast())&&x.type==CKEDITOR.NODE_ELEMENT&&x.is('br')&&x.remove(), (x=p.getLast(t))&&x.type==CKEDITOR.NODE_ELEMENT&&
    x.is(CKEDITOR.dtd.$block)||p.append(h.createElement('br')));x=p.$.nodeName.toLowerCase();'div'!=x&&'p'!=x||p.appendBogus();k.append(p);l=null;m++; 
}else return null;D=null;if(a.length<=m||Math.max(a[m].indent, 0)<q)break; 
}if(b)for(a=k.getFirst();a;){
 if(a.type==CKEDITOR.NODE_ELEMENT&&(CKEDITOR.dom.element.clearMarkers(b, a), a.getName()in CKEDITOR.dtd.$listItem&&(c=a, h=f=e=void 0, e=c.getDirection()))){
 for(f=c.getParent();f&&!(h=f.getDirection());)f=f.getParent();e==h&&c.removeAttribute('dir'); 
}a=a.getNextSourceNode(); 
}return{listNode:k,
    nextIndex:m}; 
}};var p=/^h[1-6]$/, q=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);a.prototype={exec:function(a){
 function b(a){
 return d[a.root.getName()]&&!e(a.root, [CKEDITOR.NODE_COMMENT]); 
}function e(a, b){
 return CKEDITOR.tools.array.filter(a.getChildren().toArray(), function(a){
 return-1===CKEDITOR.tools.array.indexOf(b, a.type); 
}).length; 
}function f(a){
 let b=!0;if(0===a.getChildCount())return!1;a.forEach(function(a){
 if(a.type!==CKEDITOR.NODE_COMMENT)return b=!1; 
}, null, !0);return b; 
}this.refresh(a, a.elementPath());
    var k=a.config, l=a.getSelection(), n=l&&l.getRanges();if(this.state==CKEDITOR.TRISTATE_OFF){
 var q=a.editable();if(q.getFirst(t)){
 var p=1==n.length&&n[0];(k=p&&p.getEnclosedNode())&&k.is&&this.type==k.getName()&&this.setState(CKEDITOR.TRISTATE_ON); 
}else k.enterMode==CKEDITOR.ENTER_BR?q.appendBogus():n[0].fixBlock(1, k.enterMode==CKEDITOR.ENTER_P?'p':'div'), l.selectRanges(n); 
}for(var k=l.createBookmarks(!0), q=[], E={}, n=n.createIterator(), x=0;(p=n.getNextRange())&&++x;){
 var I=p.getBoundaryNodes(), K=I.startNode,
    D=I.endNode;K.type==CKEDITOR.NODE_ELEMENT&&'td'==K.getName()&&p.setStartAt(I.startNode, CKEDITOR.POSITION_AFTER_START);D.type==CKEDITOR.NODE_ELEMENT&&'td'==D.getName()&&p.setEndAt(I.endNode, CKEDITOR.POSITION_BEFORE_END);p=p.createIterator();for(p.forceBrBreak=this.state==CKEDITOR.TRISTATE_OFF;I=p.getNextParagraph();)if(!I.getCustomData('list_block')&&!f(I)){
 CKEDITOR.dom.element.setMarker(E, I, 'list_block', 1);for(var N=a.elementPath(I), K=N.elements, D=0, N=N.blockLimit, J, L=K.length-1;0<=L&&(J=K[L]);L--)if(d[J.getName()]&&
    N.contains(J)){
 N.removeCustomData(`list_group_object_${x}`);(K=J.getCustomData('list_group_object'))?K.contents.push(I):(K={root:J, contents:[I]}, q.push(K), CKEDITOR.dom.element.setMarker(E, J, 'list_group_object', K));D=1;break; 
}D||(D=N, D.getCustomData(`list_group_object_${x}`)?D.getCustomData(`list_group_object_${x}`).contents.push(I):(K={root:D, contents:[I]}, CKEDITOR.dom.element.setMarker(E, D, `list_group_object_${x}`, K), q.push(K))); 
} 
}for(J=[];0<q.length;)K=q.shift(), this.state==CKEDITOR.TRISTATE_OFF?b(K)||(d[K.root.getName()]?
    c.call(this, a, K, E, J):h.call(this, a, K, J)):this.state==CKEDITOR.TRISTATE_ON&&d[K.root.getName()]&&!b(K)&&g.call(this, a, K, E);for(L=0;L<J.length;L++)m(J[L]);CKEDITOR.dom.element.clearAllMarkers(E);l.selectBookmarks(k);a.focus(); 
}, refresh:function(a, b){
 const c=b.contains(d, 1), e=b.blockLimit||b.root;c&&e.contains(c)?this.setState(c.is(this.type)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF):this.setState(CKEDITOR.TRISTATE_OFF); 
}};CKEDITOR.plugins.add('list', {requires:'indentlist', init:function(c){
 c.blockless||
    (c.addCommand('numberedlist', new a('numberedlist', 'ol')), c.addCommand('bulletedlist', new a('bulletedlist', 'ul')), c.ui.addButton&&(c.ui.addButton('NumberedList', {label:c.lang.list.numberedlist, command:'numberedlist', directional:!0, toolbar:'list,10'}), c.ui.addButton('BulletedList', {label:c.lang.list.bulletedlist, command:'bulletedlist', directional:!0, toolbar:'list,20'})), c.on('key', function(a){
 let e=a.data.domEvent.getKey(), f;if('wysiwyg'==c.mode&&e in{8:1, 46:1}){
 let g=c.getSelection().getRanges()[0],
    h=g&&g.startPath();if(g&&g.collapsed){
 let m=8==e, n=c.editable(), q=new CKEDITOR.dom.walker(g.clone());q.evaluator=function(a){
 return t(a)&&!x(a); 
};q.guard=function(a, b){
 return!(b&&a.type==CKEDITOR.NODE_ELEMENT&&a.is('table')); 
};e=g.clone();if(m){
 var p;(p=h.contains(d))&&g.checkBoundaryOfElement(p, CKEDITOR.START)&&(p=p.getParent())&&p.is('li')&&(p=b(p))?(f=p, p=p.getPrevious(t), e.moveToPosition(p&&x(p)?p:f, CKEDITOR.POSITION_BEFORE_START)):(q.range.setStartAt(n, CKEDITOR.POSITION_AFTER_START), q.range.setEnd(g.startContainer,
    g.startOffset), (p=q.previous())&&p.type==CKEDITOR.NODE_ELEMENT&&(p.getName()in d||p.is('li'))&&(p.is('li')||(q.range.selectNodeContents(p), q.reset(), q.evaluator=k, p=q.previous()), f=p, e.moveToElementEditEnd(f), e.moveToPosition(e.endPath().block, CKEDITOR.POSITION_BEFORE_END)));if(f)l(c, e, g), a.cancel();else{
 var F=h.contains(d);F&&g.checkBoundaryOfElement(F, CKEDITOR.START)&&(f=F.getFirst(t), g.checkBoundaryOfElement(f, CKEDITOR.START)&&(p=F.getPrevious(t), b(f)?p&&(g.moveToElementEditEnd(p), g.select()):
    c.execCommand('outdent'), a.cancel())); 
} 
}else if(f=h.contains('li')){
 if(q.range.setEndAt(n, CKEDITOR.POSITION_BEFORE_END), m=(n=f.getLast(t))&&k(n)?n:f, h=0, (p=q.next())&&p.type==CKEDITOR.NODE_ELEMENT&&p.getName()in d&&p.equals(n)?(h=1, p=q.next()):g.checkBoundaryOfElement(m, CKEDITOR.END)&&(h=2), h&&p){
 g=g.clone();g.moveToElementEditStart(p);if(1==h&&(e.optimize(), !e.startContainer.equals(f))){
 for(f=e.startContainer;f.is(CKEDITOR.dtd.$inline);)F=f, f=f.getParent();F&&e.moveToPosition(F, CKEDITOR.POSITION_AFTER_END); 
}2==
    h&&(e.moveToPosition(e.endPath().block, CKEDITOR.POSITION_BEFORE_END), g.endPath().block&&g.moveToPosition(g.endPath().block, CKEDITOR.POSITION_AFTER_START));l(c, e, g);a.cancel(); 
} 
}else q.range.setEndAt(n, CKEDITOR.POSITION_BEFORE_END), (p=q.next())&&p.type==CKEDITOR.NODE_ELEMENT&&p.is(d)&&(p=p.getFirst(t), h.block&&g.checkStartOfBlock()&&g.checkEndOfBlock()?(h.block.remove(), g.moveToElementEditStart(p), g.select()):b(p)?(g.moveToElementEditStart(p), g.select()):(g=g.clone(), g.moveToElementEditStart(p), l(c,
    e, g)), a.cancel());setTimeout(function(){
 c.selectionChange(1); 
}); 
} 
} 
})); 
}}); 
}(), function(){
 CKEDITOR.plugins.liststyle={requires:'dialog,contextmenu', init:function(c){
 if(!c.blockless){
 let h;h=new CKEDITOR.dialogCommand('numberedListStyle', {requiredContent:'ol', allowedContent:'ol{list-style-type}[start]; li{list-style-type}[value]', contentTransformations:[['ol: listTypeToStyle']]});h=c.addCommand('numberedListStyle', h);c.addFeature(h);CKEDITOR.dialog.add('numberedListStyle', `${this.path}dialogs/liststyle.js`);
    h=new CKEDITOR.dialogCommand('bulletedListStyle', {requiredContent:'ul', allowedContent:'ul{list-style-type}', contentTransformations:[['ul: listTypeToStyle']]});h=c.addCommand('bulletedListStyle', h);c.addFeature(h);CKEDITOR.dialog.add('bulletedListStyle', `${this.path}dialogs/liststyle.js`);c.addMenuGroup('list', 108);c.addMenuItems({numberedlist:{label:c.lang.liststyle.numberedTitle, group:'list', command:'numberedListStyle'}, bulletedlist:{label:c.lang.liststyle.bulletedTitle, group:'list', command:'bulletedListStyle'}});
    c.contextMenu.addListener(function(c){
 if(!c||c.isReadOnly())return null;for(;c;){
 const a=c.getName();if('ol'==a)return{numberedlist:CKEDITOR.TRISTATE_OFF};if('ul'==a)return{bulletedlist:CKEDITOR.TRISTATE_OFF};c=c.getParent(); 
}return null; 
}); 
} 
}};CKEDITOR.plugins.add('liststyle', CKEDITOR.plugins.liststyle); 
}(), 'use strict', function(){
 function c(a, b, c){
 return n(b)&&n(c)&&c.equals(b.getNext(function(a){
 return!(R(a)||S(a)||t(a)); 
})); 
}function h(a){
 this.upper=a[0];this.lower=a[1];this.set.apply(this, a.slice(2)); 
}
    function g(a){
 let b=a.element;if(b&&n(b)&&(b=b.getAscendant(a.triggers, !0))&&a.editable.contains(b)){
 const c=k(b);if('true'==c.getAttribute('contenteditable'))return b;if(c.is(a.triggers))return c; 
}return null; 
}function a(a, b, c){
 r(a, b);r(a, c);a=b.size.bottom;c=c.size.top;return a&&c?0|(a+c)/2:a||c; 
}function f(a, b, c){
 return b=b[c?'getPrevious':'getNext'](function(b){
 return b&&b.type==CKEDITOR.NODE_TEXT&&!R(b)||n(b)&&!t(b)&&!e(a, b); 
}); 
}function m(a, b, c){
 return a>b&&a<c; 
}function k(a, b){
 if(a.data('cke-editable'))return null;
    for(b||(a=a.getParent());a&&!a.data('cke-editable');){
 if(a.hasAttribute('contenteditable'))return a;a=a.getParent(); 
}return null; 
}function l(a){
 let c=a.doc, d=F(`\x3cspan contenteditable\x3d"false" data-cke-magic-line\x3d"1" style\x3d"${ba}position:absolute;"\x3e\x3c/span\x3e`, c);CKEDITOR.getUrl(`${this.path}images/${I.hidpi?'hidpi/':''}icon${a.rtl?'-rtl':''}.png`);C(d, {attach:function(){
 this.wrap.getParent()||this.wrap.appendTo(a.editable, !0);return this; 
}, lineChildren:[C(F(`\x3cspan title\x3d"${
    a.editor.lang.magicline.title}" contenteditable\x3d"false"\x3e\x26#8629;\x3c/span\x3e`, c), {base:`${ba}height:20px;width:100%;${a.rtl?'left':'right'}:17px;${I.hc?'font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;':''}${I.hidpi?'background-size: 9px 10px;':''}`, looks:['top:-8px; border-radius: 2px;', 'top:-17px; border-radius: 2px 2px 0px 0px;', 'top:-1px; border-radius: 0px 0px 2px 2px;']}), C(F(ca, c), {base:`${V}left:0px;`, looks:['border-width:8px 0 8px 8px;top:-8px', 'border-width:8px 0 0 8px;top:-8px',
    'border-width:0 0 8px 8px;top:0px']}), C(F(ca, c), {base:`${V}right:0px;`, looks:['border-width:8px 8px 8px 0;top:-8px', 'border-width:8px 8px 0 0;top:-8px', 'border-width:0 8px 8px 0;top:0px']})], detach:function(){
 this.wrap.getParent()&&this.wrap.remove();return this; 
}, mouseNear:function(){
 r(a, this);const b=a.holdDistance, c=this.size;return c&&m(a.mouse.y, c.top-b, c.bottom+b)&&m(a.mouse.x, c.left-b, c.right+b)?!0:!1; 
}, place:function(){
 const b=a.view, c=a.editable, d=a.trigger, e=d.upper, f=d.lower, g=e||f, h=g.getParent(),
    k={};this.trigger=d;e&&r(a, e, !0);f&&r(a, f, !0);r(a, h, !0);a.inInlineMode&&y(a, !0);h.equals(c)?(k.left=b.scroll.x, k.right=-b.scroll.x, k.width=''):(k.left=g.size.left-g.size.margin.left+b.scroll.x-(a.inInlineMode?b.editable.left+b.editable.border.left:0), k.width=g.size.outerWidth+g.size.margin.left+g.size.margin.right+b.scroll.x, k.right='');e&&f?k.top=e.size.margin.bottom===f.size.margin.top?0|e.size.bottom+e.size.margin.bottom/2:e.size.margin.bottom<f.size.margin.top?e.size.bottom+e.size.margin.bottom:
    e.size.bottom+e.size.margin.bottom-f.size.margin.top:e?f||(k.top=e.size.bottom+e.size.margin.bottom):k.top=f.size.top-f.size.margin.top;d.is(H)||m(k.top, b.scroll.y-15, b.scroll.y+5)?(k.top=a.inInlineMode?0:b.scroll.y, this.look(H)):d.is(O)||m(k.top, b.pane.bottom-5, b.pane.bottom+15)?(k.top=a.inInlineMode?b.editable.height+b.editable.padding.top+b.editable.padding.bottom:b.pane.bottom-1, this.look(O)):(a.inInlineMode&&(k.top-=b.editable.top+b.editable.border.top), this.look(X));a.inInlineMode&&(k.top--,
    k.top+=b.editable.scroll.top, k.left+=b.editable.scroll.left);for(const l in k)k[l]=CKEDITOR.tools.cssLength(k[l]);this.setStyles(k); 
}, look:function(a){
 if(this.oldLook!=a){
 for(var b=this.lineChildren.length, c;b--;)(c=this.lineChildren[b]).setAttribute('style', c.base+c.looks[0|a/2]);this.oldLook=a; 
} 
}, wrap:new E('span', a.doc)});for(c=d.lineChildren.length;c--;)d.lineChildren[c].appendTo(d);d.look(X);d.appendTo(d.wrap);d.unselectable();d.lineChildren[0].on('mouseup', function(c){
 d.detach();b(a, function(b){
 const c=
    a.line.trigger;b[c.is(J)?'insertBefore':'insertAfter'](c.is(J)?c.lower:c.upper); 
}, !0);a.editor.focus();I.ie||a.enterMode==CKEDITOR.ENTER_BR||a.hotNode.scrollIntoView();c.data.preventDefault(!0); 
});d.on('mousedown', function(a){
 a.data.preventDefault(!0); 
});a.line=d; 
}function b(a, b, c){
 let d=new CKEDITOR.dom.range(a.doc), e=a.editor, f;I.ie&&a.enterMode==CKEDITOR.ENTER_BR?f=a.doc.createText(T):(f=(f=k(a.element, !0))&&f.data('cke-enter-mode')||a.enterMode, f=new E(N[f], a.doc), f.is('br')||a.doc.createText(T).appendTo(f));
    c&&e.fire('saveSnapshot');b(f);d.moveToPosition(f, CKEDITOR.POSITION_AFTER_START);e.getSelection().selectRanges([d]);a.hotNode=f;c&&e.fire('saveSnapshot'); 
}function d(a, c){
 return{canUndo:!0, modes:{wysiwyg:1}, exec:function(){
 function d(e){
 const f=I.ie&&9>I.version?' ':T, g=a.hotNode&&a.hotNode.getText()==f&&a.element.equals(a.hotNode)&&a.lastCmdDirection===!!c;b(a, function(b){
 g&&a.hotNode&&a.hotNode.remove();b[c?'insertAfter':'insertBefore'](e);b.setAttributes({'data-cke-magicline-hot':1, 'data-cke-magicline-dir':!!c});
    a.lastCmdDirection=!!c; 
});I.ie||a.enterMode==CKEDITOR.ENTER_BR||a.hotNode.scrollIntoView();a.line.detach(); 
}return function(b){
 b=b.getSelection().getStartElement();let e;b=b.getAscendant(U, 1);if(!q(a, b)&&b&&!b.equals(a.editable)&&!b.contains(a.editable)){
 (e=k(b))&&'false'==e.getAttribute('contenteditable')&&(b=e);a.element=b;e=f(a, b, !c);let h;n(e)&&e.is(a.triggers)&&e.is(W)&&(!f(a, e, !c)||(h=f(a, e, !c))&&n(h)&&h.is(a.triggers))?d(e):(h=g(a, b), n(h)&&(f(a, h, !c)?(b=f(a, h, !c))&&n(b)&&b.is(a.triggers)&&d(h):
    d(h))); 
} 
}; 
}()}; 
}function e(a, b){
 if(!b||b.type!=CKEDITOR.NODE_ELEMENT||!b.$)return!1;const c=a.line;return c.wrap.equals(b)||c.wrap.contains(b); 
}function n(a){
 return a&&a.type==CKEDITOR.NODE_ELEMENT&&a.$; 
}function t(a){
 if(!n(a))return!1;let b;(b=x(a))||(n(a)?(b={left:1, right:1, center:1}, b=!(!b[a.getComputedStyle('float')]&&!b[a.getAttribute('align')])):b=!1);return b; 
}function x(a){
 return!!{absolute:1, fixed:1}[a.getComputedStyle('position')]; 
}function p(a, b){
 return n(b)?b.is(a.triggers):null; 
}function q(a, b){
 if(!b)return!1;
    for(let c=b.getParents(1), d=c.length;d--;)for(let e=a.tabuList.length;e--;)if(c[d].hasAttribute(a.tabuList[e]))return!0;return!1; 
}function v(a, b, c){
 b=b[c?'getLast':'getFirst'](function(b){
 return a.isRelevant(b)&&!b.is(ha); 
});if(!b)return!1;r(a, b);return c?b.size.top>a.mouse.y:b.size.bottom<a.mouse.y; 
}function w(a){
 var b=a.editable, c=a.mouse, d=a.view, f=a.triggerOffset;y(a);var g=c.y>(a.inInlineMode?d.editable.top+d.editable.height/2:Math.min(d.editable.height, d.pane.height)/2), b=b[g?'getLast':'getFirst'](function(a){
 return!(R(a)||
    S(a)); 
});if(!b)return null;e(a, b)&&(b=a.line.wrap[g?'getPrevious':'getNext'](function(a){
 return!(R(a)||S(a)); 
}));if(!n(b)||t(b)||!p(a, b))return null;r(a, b);return!g&&0<=b.size.top&&m(c.y, 0, b.size.top+f)?(a=a.inInlineMode||0===d.scroll.y?H:X, new h([null, b, J, M, a])):g&&b.size.bottom<=d.pane.height&&m(c.y, b.size.bottom-f, d.pane.height)?(a=a.inInlineMode||m(b.size.bottom, d.pane.height-f, d.pane.height)?O:X, new h([b, null, L, M, a])):null; 
}function u(a){
 var b=a.mouse, c=a.view, d=a.triggerOffset, e=g(a);if(!e)return null;
    r(a, e);var d=Math.min(d, 0|e.size.outerHeight/2), k=[], l, G;if(m(b.y, e.size.top-1, e.size.top+d))G=!1;else if(m(b.y, e.size.bottom-d, e.size.bottom+1))G=!0;else return null;if(t(e)||v(a, e, G)||e.getParent().is(Y))return null;const q=f(a, e, !G);if(q){
 if(q&&q.type==CKEDITOR.NODE_TEXT)return null;if(n(q)){
 if(t(q)||!p(a, q)||q.getParent().is(Y))return null;k=[q, e][G?'reverse':'concat']().concat([Q, M]); 
} 
}else e.equals(a.editable[G?'getLast':'getFirst'](a.isRelevant))?(y(a), G&&m(b.y, e.size.bottom-d, c.pane.height)&&
    m(e.size.bottom, c.pane.height-d, c.pane.height)?l=O:m(b.y, 0, e.size.top+d)&&(l=H)):l=X, k=[null, e][G?'reverse':'concat']().concat([G?L:J, M, l, e.equals(a.editable[G?'getLast':'getFirst'](a.isRelevant))?G?O:H:X]);return 0 in k?new h(k):null; 
}function A(a, b, c, d){
 for(var e=b.getDocumentPosition(), f={}, g={}, h={}, k={}, l=G.length;l--;)f[G[l]]=parseInt(b.getComputedStyle.call(b, `border-${G[l]}-width`), 10)||0, h[G[l]]=parseInt(b.getComputedStyle.call(b, `padding-${G[l]}`), 10)||0, g[G[l]]=parseInt(b.getComputedStyle.call(b,
    `margin-${G[l]}`), 10)||0;c&&!d||z(a, d);k.top=e.y-(c?0:a.view.scroll.y);k.left=e.x-(c?0:a.view.scroll.x);k.outerWidth=b.$.offsetWidth;k.outerHeight=b.$.offsetHeight;k.height=k.outerHeight-(h.top+h.bottom+f.top+f.bottom);k.width=k.outerWidth-(h.left+h.right+f.left+f.right);k.bottom=k.top+k.outerHeight;k.right=k.left+k.outerWidth;a.inInlineMode&&(k.scroll={top:b.$.scrollTop, left:b.$.scrollLeft});return C({border:f, padding:h, margin:g, ignoreScroll:c}, k, !0); 
}function r(a, b, c){
 if(!n(b))return b.size=null;if(!b.size)b.size=
    {};else if(b.size.ignoreScroll==c&&b.size.date>new Date-aa)return null;return C(b.size, A(a, b, c), {date:+new Date}, !0); 
}function y(a, b){
 a.view.editable=A(a, a.editable, b, !0); 
}function z(a, b){
 a.view||(a.view={});var c=a.view;if(!(!b&&c&&c.date>new Date-aa)){
 var d=a.win, c=d.getScrollPosition(), d=d.getViewPaneSize();C(a.view, {scroll:{x:c.x, y:c.y, width:a.doc.$.documentElement.scrollWidth-d.width, height:a.doc.$.documentElement.scrollHeight-d.height}, pane:{width:d.width, height:d.height, bottom:d.height+c.y},
    date:+new Date}, !0); 
} 
}function B(a, b, c, d){
 for(var e=d, f=d, g=0, k=!1, l=!1, m=a.view.pane.height, n=a.mouse;n.y+g<m&&0<n.y-g;){
 k||(k=b(e, d));l||(l=b(f, d));!k&&0<n.y-g&&(e=c(a, {x:n.x, y:n.y-g}));!l&&n.y+g<m&&(f=c(a, {x:n.x, y:n.y+g}));if(k&&l)break;g+=2; 
}return new h([e, f, null, null]); 
}CKEDITOR.plugins.add('magicline', {init:function(a){
 let c=a.config, k=c.magicline_triggerOffset||30, m={editor:a, enterMode:c.enterMode, triggerOffset:k, holdDistance:0|k*(c.magicline_holdDistance||.5), boxColor:c.magicline_color||'#ff0000',
    rtl:'rtl'==c.contentsLangDirection, tabuList:['data-cke-hidden-sel'].concat(c.magicline_tabuList||[]), triggers:c.magicline_everywhere?U:{table:1, hr:1, div:1, ul:1, ol:1, dl:1, form:1, blockquote:1}}, G, p, r;m.isRelevant=function(a){
 return n(a)&&!e(m, a)&&!t(a); 
};a.on('contentDom', function(){
 const k=a.editable(), n=a.document, t=a.window;C(m, {editable:k, inInlineMode:k.isInline(), doc:n, win:t, hotNode:null}, !0);m.boundary=m.inInlineMode?m.editable:m.doc.getDocumentElement();k.is(D.$inline)||(m.inInlineMode&&!x(k)&&
    k.setStyles({position:'relative', top:null, left:null}), l.call(this, m), z(m), k.attachListener(a, 'beforeUndoImage', function(){
 m.line.detach(); 
}), k.attachListener(a, 'beforeGetData', function(){
 m.line.wrap.getParent()&&(m.line.detach(), a.once('getData', function(){
 m.line.attach(); 
}, null, null, 1E3)); 
}, null, null, 0), k.attachListener(m.inInlineMode?n:n.getWindow().getFrame(), 'mouseout', function(b){
 if('wysiwyg'==a.mode)if(m.inInlineMode){
 const c=b.data.$.clientX;b=b.data.$.clientY;z(m);y(m, !0);const d=m.view.editable,
    e=m.view.scroll;c>d.left-e.x&&c<d.right-e.x&&b>d.top-e.y&&b<d.bottom-e.y||(clearTimeout(r), r=null, m.line.detach()); 
}else clearTimeout(r), r=null, m.line.detach(); 
}), k.attachListener(k, 'keyup', function(){
 m.hiddenMode=0; 
}), k.attachListener(k, 'keydown', function(b){
 if('wysiwyg'==a.mode)switch(b.data.getKeystroke()){
 case 2228240:case 16:m.hiddenMode=1, m.line.detach(); 
} 
}), k.attachListener(m.inInlineMode?k:n, 'mousemove', function(b){
 p=!0;if('wysiwyg'==a.mode&&!a.readOnly&&!r){
 const c={x:b.data.$.clientX, y:b.data.$.clientY};
    r=setTimeout(function(){
 m.mouse=c;r=m.trigger=null;z(m);p&&!m.hiddenMode&&a.focusManager.hasFocus&&!m.line.mouseNear()&&(m.element=Z(m, !0))&&((m.trigger=w(m)||u(m)||ea(m))&&!q(m, m.trigger.upper||m.trigger.lower)?m.line.attach().place():(m.trigger=null, m.line.detach()), p=!1); 
}, 30); 
} 
}), k.attachListener(t, 'scroll', function(){
 'wysiwyg'==a.mode&&(m.line.detach(), I.webkit&&(m.hiddenMode=1, clearTimeout(G), G=setTimeout(function(){
 m.mouseDown||(m.hiddenMode=0); 
}, 50))); 
}), k.attachListener(K?n:t, 'mousedown', function(){
 'wysiwyg'==
    a.mode&&(m.line.detach(), m.hiddenMode=1, m.mouseDown=1); 
}), k.attachListener(K?n:t, 'mouseup', function(){
 m.hiddenMode=0;m.mouseDown=0; 
}), a.addCommand('accessPreviousSpace', d(m)), a.addCommand('accessNextSpace', d(m, !0)), a.setKeystroke([[c.magicline_keystrokePrevious, 'accessPreviousSpace'], [c.magicline_keystrokeNext, 'accessNextSpace']]), a.on('loadSnapshot', function(){
 let b, c, d, e;for(e in{p:1, br:1, div:1})for(b=a.document.getElementsByTag(e), d=b.count();d--;)if((c=b.getItem(d)).data('cke-magicline-hot')){
 m.hotNode=
    c;m.lastCmdDirection='true'===c.data('cke-magicline-dir')?!0:!1;return; 
} 
}), a._.magiclineBackdoor={accessFocusSpace:b, boxTrigger:h, isLine:e, getAscendantTrigger:g, getNonEmptyNeighbour:f, getSize:A, that:m, triggerEdge:u, triggerEditable:w, triggerExpand:ea}); 
}, this); 
}});var C=CKEDITOR.tools.extend, E=CKEDITOR.dom.element, F=E.createFromHtml, I=CKEDITOR.env, K=CKEDITOR.env.ie&&9>CKEDITOR.env.version, D=CKEDITOR.dtd, N={}, J=128, L=64, Q=32, M=16, H=4, O=2, X=1, T=' ', Y=D.$listItem, ha=D.$tableContent, W=C({}, D.$nonEditable,
    D.$empty), U=D.$block, aa=100, ba='width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;', V=`${ba}border-color:transparent;display:block;border-style:solid;`, ca=`\x3cspan\x3e${T}\x3c/span\x3e`;N[CKEDITOR.ENTER_BR]='br';N[CKEDITOR.ENTER_P]='p';N[CKEDITOR.ENTER_DIV]='div';h.prototype={set:function(a, b, c){
 this.properties=a+b+(c||X);return this; 
}, is:function(a){
 return(this.properties&a)==a; 
}};var Z=function(){
 function a(b, c){
 const d=
    b.$.elementFromPoint(c.x, c.y);return d&&d.nodeType?new CKEDITOR.dom.element(d):null; 
}return function(b, c, d){
 if(!b.mouse)return null;const f=b.doc, g=b.line.wrap;d=d||b.mouse;let h=a(f, d);c&&e(b, h)&&(g.hide(), h=a(f, d), g.show());return!h||h.type!=CKEDITOR.NODE_ELEMENT||!h.$||I.ie&&9>I.version&&!b.boundary.equals(h)&&!b.boundary.contains(h)?null:h; 
}; 
}(), R=CKEDITOR.dom.walker.whitespaces(), S=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT), ea=function(){
 function b(e){
 var f=e.element, g, h, k;if(!n(f)||f.contains(e.editable)||
    f.isReadOnly())return null;k=B(e, function(a, b){
 return!b.equals(a); 
}, function(a, b){
 return Z(a, !0, b); 
}, f);g=k.upper;h=k.lower;if(c(e, g, h))return k.set(Q, 8);if(g&&f.contains(g))for(;!g.getParent().equals(f);)g=g.getParent();else g=f.getFirst(function(a){
 return d(e, a); 
});if(h&&f.contains(h))for(;!h.getParent().equals(f);)h=h.getParent();else h=f.getLast(function(a){
 return d(e, a); 
});if(!g||!h)return null;r(e, g);r(e, h);if(!m(e.mouse.y, g.size.top, h.size.bottom))return null;for(var f=Number.MAX_VALUE, l, G, q, z;h&&
    !h.equals(g)&&(G=g.getNext(e.isRelevant));)l=Math.abs(a(e, g, G)-e.mouse.y), l<f&&(f=l, q=g, z=G), g=G, r(e, g);if(!q||!z||!m(e.mouse.y, q.size.top, z.size.bottom))return null;k.upper=q;k.lower=z;return k.set(Q, 8); 
}function d(a, b){
 return!(b&&b.type==CKEDITOR.NODE_TEXT||S(b)||t(b)||e(a, b)||b.type==CKEDITOR.NODE_ELEMENT&&b.$&&b.is('br')); 
}return function(a){
 let d=b(a), e;if(e=d){
 e=d.upper;const f=d.lower;e=!e||!f||t(f)||t(e)||f.equals(e)||e.equals(f)||f.contains(e)||e.contains(f)?!1:p(a, e)&&p(a, f)&&c(a, e, f)?!0:!1; 
}return e?
    d:null; 
}; 
}(), G=['top', 'left', 'right', 'bottom']; 
}(), CKEDITOR.config.magicline_keystrokePrevious=CKEDITOR.CTRL+CKEDITOR.SHIFT+51, CKEDITOR.config.magicline_keystrokeNext=CKEDITOR.CTRL+CKEDITOR.SHIFT+52, function(){
 function c(a){
 if(!a||a.type!=CKEDITOR.NODE_ELEMENT||'form'!=a.getName())return[];for(var c=[], f=['style', 'className'], b=0;b<f.length;b++){
 let d=a.$.elements.namedItem(f[b]);d&&(d=new CKEDITOR.dom.element(d), c.push([d, d.nextSibling]), d.remove()); 
}return c; 
}function h(a, c){
 if(a&&a.type==CKEDITOR.NODE_ELEMENT&&
    'form'==a.getName()&&0<c.length)for(let f=c.length-1;0<=f;f--){
 const b=c[f][0], d=c[f][1];d?b.insertBefore(d):b.appendTo(a); 
} 
}function g(a, f){
 const g=c(a), b={}, d=a.$;f||(b['class']=d.className||'', d.className='');b.inline=d.style.cssText||'';f||(d.style.cssText='position: static; overflow: visible');h(g);return b; 
}function a(a, f){
 const g=c(a), b=a.$;'class'in f&&(b.className=f['class']);'inline'in f&&(b.style.cssText=f.inline);h(g); 
}function f(a){
 if(!a.editable().isInline()){
 let c=CKEDITOR.instances, f;for(f in c){
 let b=
    c[f];'wysiwyg'!=b.mode||b.readOnly||(b=b.document.getBody(), b.setAttribute('contentEditable', !1), b.setAttribute('contentEditable', !0)); 
}a.editable().hasFocus&&(a.toolbox.focus(), a.focus()); 
} 
}CKEDITOR.plugins.add('maximize', {init:function(c){
 function h(){
 const a=d.getViewPaneSize();c.resize(a.width, a.height, null, !0); 
}if(c.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE){
 var l=c.lang, b=CKEDITOR.document, d=b.getWindow(), e, n, t, x=CKEDITOR.TRISTATE_OFF;c.addCommand('maximize', {modes:{wysiwyg:!CKEDITOR.env.iOS, source:!CKEDITOR.env.iOS},
    readOnly:1, editorFocus:!1, exec:function(){
 let p=c.container.getFirst(function(a){
 return a.type==CKEDITOR.NODE_ELEMENT&&a.hasClass('cke_inner'); 
}), q=c.ui.space('contents');if('wysiwyg'==c.mode){
 var v=c.getSelection();e=v&&v.getRanges();n=d.getScrollPosition(); 
}else{
 var w=c.editable().$;e=!CKEDITOR.env.ie&&[w.selectionStart, w.selectionEnd];n=[w.scrollLeft, w.scrollTop]; 
}if(this.state==CKEDITOR.TRISTATE_OFF){
 d.on('resize', h);t=d.getScrollPosition();for(v=c.container;v=v.getParent();)v.setCustomData('maximize_saved_styles',
    g(v)), v.setStyle('z-index', c.config.baseFloatZIndex-5);q.setCustomData('maximize_saved_styles', g(q, !0));p.setCustomData('maximize_saved_styles', g(p, !0));q={overflow:CKEDITOR.env.webkit?'':'hidden', width:0, height:0};b.getDocumentElement().setStyles(q);!CKEDITOR.env.gecko&&b.getDocumentElement().setStyle('position', 'fixed');CKEDITOR.env.gecko&&CKEDITOR.env.quirks||b.getBody().setStyles(q);CKEDITOR.env.ie?setTimeout(function(){
 d.$.scrollTo(0, 0); 
}, 0):d.$.scrollTo(0, 0);p.setStyle('position', CKEDITOR.env.gecko&&
    CKEDITOR.env.quirks?'fixed':'absolute');p.$.offsetLeft;p.setStyles({'z-index':c.config.baseFloatZIndex-5, left:'0px', top:'0px'});p.addClass('cke_maximized');h();q=p.getDocumentPosition();p.setStyles({left:`${-1*q.x}px`, top:`${-1*q.y}px`});CKEDITOR.env.gecko&&f(c); 
}else if(this.state==CKEDITOR.TRISTATE_ON){
 d.removeListener('resize', h);for(var v=[q, p], u=0;u<v.length;u++)a(v[u], v[u].getCustomData('maximize_saved_styles')), v[u].removeCustomData('maximize_saved_styles');for(v=c.container;v=v.getParent();)a(v,
    v.getCustomData('maximize_saved_styles')), v.removeCustomData('maximize_saved_styles');CKEDITOR.env.ie?setTimeout(function(){
 d.$.scrollTo(t.x, t.y); 
}, 0):d.$.scrollTo(t.x, t.y);p.removeClass('cke_maximized');CKEDITOR.env.webkit&&(p.setStyle('display', 'inline'), setTimeout(function(){
 p.setStyle('display', 'block'); 
}, 0));c.fire('resize', {outerHeight:c.container.$.offsetHeight, contentsHeight:q.$.offsetHeight, outerWidth:c.container.$.offsetWidth}); 
}this.toggleState();if(v=this.uiItems[0])q=this.state==CKEDITOR.TRISTATE_OFF?
    l.maximize.maximize:l.maximize.minimize, v=CKEDITOR.document.getById(v._.id), v.getChild(1).setHtml(q), v.setAttribute('title', q), v.setAttribute('href', `javascript:void("${q}");`);'wysiwyg'==c.mode?e?(CKEDITOR.env.gecko&&f(c), c.getSelection().selectRanges(e), (w=c.getSelection().getStartElement())&&w.scrollIntoView(!0)):d.$.scrollTo(n.x, n.y):(e&&(w.selectionStart=e[0], w.selectionEnd=e[1]), w.scrollLeft=n[0], w.scrollTop=n[1]);e=n=null;x=this.state;c.fire('maximize', this.state); 
}, canUndo:!1});c.ui.addButton&&
    c.ui.addButton('Maximize', {label:l.maximize.maximize, command:'maximize', toolbar:'tools,10'});c.on('mode', function(){
 const a=c.getCommand('maximize');a.setState(a.state==CKEDITOR.TRISTATE_DISABLED?CKEDITOR.TRISTATE_DISABLED:x); 
}, null, null, 100); 
} 
}}); 
}(), CKEDITOR.plugins.add('newpage', {init:function(c){
 c.addCommand('newpage', {modes:{wysiwyg:1, source:1}, exec:function(c){
 const g=this;c.setData(c.config.newpage_html||'', function(){
 c.focus();setTimeout(function(){
 c.fire('afterCommandExec', {name:'newpage', command:g});
    c.selectionChange(); 
}, 200); 
}); 
}, async:!0});c.ui.addButton&&c.ui.addButton('NewPage', {label:c.lang.newpage.toolbar, command:'newpage', toolbar:'document,20'}); 
}}), 'use strict', function(){
 function c(c){
 return{'aria-label':c, 'class':'cke_pagebreak', contenteditable:'false', 'data-cke-display-name':'pagebreak', 'data-cke-pagebreak':1, style:'page-break-after: always', title:c}; 
}CKEDITOR.plugins.add('pagebreak', {requires:'fakeobjects', onLoad:function(){
 const c=(`background:url(${CKEDITOR.getUrl(`${this.path}images/pagebreak.gif`)
    }) no-repeat center center;clear:both;width:100%;border-top:#999 1px dotted;border-bottom:#999 1px dotted;padding:0;height:7px;cursor:default;`).replace(/;/g, ' !important;');CKEDITOR.addCss(`div.cke_pagebreak{${c}}`); 
}, init:function(c){
 c.blockless||(c.addCommand('pagebreak', CKEDITOR.plugins.pagebreakCmd), c.ui.addButton&&c.ui.addButton('PageBreak', {label:c.lang.pagebreak.toolbar, command:'pagebreak', toolbar:'insert,70'}), CKEDITOR.env.webkit&&c.on('contentDom', function(){
 c.document.on('click', function(g){
 g=
    g.data.getTarget();g.is('div')&&g.hasClass('cke_pagebreak')&&c.getSelection().selectElement(g); 
}); 
})); 
}, afterInit:function(h){
 function g(a){
 CKEDITOR.tools.extend(a.attributes, c(h.lang.pagebreak.alt), !0);a.children.length=0; 
}var a=h.dataProcessor, f=a&&a.dataFilter, a=a&&a.htmlFilter, m=/page-break-after\s*:\s*always/i, k=/display\s*:\s*none/i;a&&a.addRules({attributes:{'class':function(a, b){
 const c=a.replace('cke_pagebreak', '');if(c!=a){
 let e=CKEDITOR.htmlParser.fragment.fromHtml('\x3cspan style\x3d"display: none;"\x3e\x26nbsp;\x3c/span\x3e').children[0];
    b.children.length=0;b.add(e);e=b.attributes;delete e['aria-label'];delete e.contenteditable;delete e.title; 
}return c; 
}}}, {applyToAll:!0, priority:5});f&&f.addRules({elements:{div:function(a){
 if(a.attributes['data-cke-pagebreak'])g(a);else if(m.test(a.attributes.style)){
 const b=a.children[0];b&&'span'==b.name&&k.test(b.attributes.style)&&g(a); 
} 
}}}); 
}});CKEDITOR.plugins.pagebreakCmd={exec:function(c){
 c.insertElement(CKEDITOR.plugins.pagebreak.createElement(c)); 
}, context:'div', allowedContent:{div:{styles:'!page-break-after'},
    span:{match:function(c){
 return(c=c.parent)&&'div'==c.name&&c.styles&&c.styles['page-break-after']; 
}, styles:'display'}}, requiredContent:'div{page-break-after}'};CKEDITOR.plugins.pagebreak={createElement:function(h){
 return h.document.createElement('div', {attributes:c(h.lang.pagebreak.alt)}); 
}}; 
}(), function(){
 function c(a, c){
 return CKEDITOR.tools.array.filter(a, function(a){
 return a.canHandle(c); 
}).sort(function(a, c){
 return a.priority===c.priority?0:a.priority-c.priority; 
}); 
}function h(a, c){
 const b=a.shift();
    b&&b.handle(c, function(){
 h(a, c); 
}); 
}function g(a){
 const c=CKEDITOR.tools.array.reduce(a, function(a, c){
 return CKEDITOR.tools.array.isArray(c.filters)?a.concat(c.filters):a; 
}, []);return CKEDITOR.tools.array.filter(c, function(a, d){
 return CKEDITOR.tools.array.indexOf(c, a)===d; 
}); 
}function a(a, c){
 let b=0, d, e;if(!CKEDITOR.tools.array.isArray(a)||0===a.length)return!0;d=CKEDITOR.tools.array.filter(a, function(a){
 return-1===CKEDITOR.tools.array.indexOf(f, a); 
});if(0<d.length)for(e=0;e<d.length;e++)(function(a){
 CKEDITOR.scriptLoader.queue(a,
    function(e){
 e&&f.push(a);++b===d.length&&c(); 
}); 
})(d[e]);return 0===d.length; 
}var f=[], m=CKEDITOR.tools.createClass({$:function(){
 this.handlers=[]; 
}, proto:{register:function(a){
 'number'!==typeof a.priority&&(a.priority=10);this.handlers.push(a); 
}, addPasteListener:function(f){
 f.on('paste', function(l){
 let b=c(this.handlers, l), d;if(0!==b.length){
 d=g(b);d=a(d, function(){
 return f.fire('paste', l.data); 
});if(!d)return l.cancel();h(b, l); 
} 
}, this, null, 3); 
}}});CKEDITOR.plugins.add('pastetools', {requires:'clipboard',
    beforeInit:function(a){
 a.pasteTools=new m;a.pasteTools.addPasteListener(a); 
}});CKEDITOR.plugins.pastetools={filters:{}, loadFilters:a, createFilter:function(a){
 const c=CKEDITOR.tools.array.isArray(a.rules)?a.rules:[a.rules], b=a.additionalTransforms;return function(a, e){
 let f=new CKEDITOR.htmlParser.basicWriter, g=new CKEDITOR.htmlParser.filter, h;b&&(a=b(a, e));CKEDITOR.tools.array.forEach(c, function(b){
 g.addRules(b(a, e, g)); 
});h=CKEDITOR.htmlParser.fragment.fromHtml(a);g.applyTo(h);h.writeHtml(f);return f.getHtml(); 
}; 
},
    getClipboardData:function(a, c){
 let b;return CKEDITOR.plugins.clipboard.isCustomDataTypesSupported||'text/html'===c?(b=a.dataTransfer.getData(c, !0))||'text/html'!==c?b:a.dataValue:null; 
}, getConfigValue:function(a, c){
 if(a&&a.config){
 var b=CKEDITOR.tools, d=a.config, e=b.object.keys(d), f=[`pasteTools_${c}`, `pasteFromWord_${c}`, `pasteFromWord${b.capitalize(c, !0)}`], f=b.array.find(f, function(a){
 return-1!==b.array.indexOf(e, a); 
});return d[f]; 
} 
}, getContentGeneratorName:function(a){
 if((a=/<meta\s+name=["']?generator["']?\s+content=["']?(\w+)/gi.exec(a))&&
    a.length)return a=a[1].toLowerCase(), 0===a.indexOf('microsoft')?'microsoft':0===a.indexOf('libreoffice')?'libreoffice':'unknown'; 
}};CKEDITOR.pasteFilters=CKEDITOR.plugins.pastetools.filters; 
}(), function(){
 CKEDITOR.plugins.add('pastefromlibreoffice', {requires:'pastetools', isSupportedEnvironment:function(){
 const c=CKEDITOR.env.ie&&11>=CKEDITOR.env.version;return!(CKEDITOR.env.webkit&&!CKEDITOR.env.chrome)&&!c; 
}, init:function(c){
 if(this.isSupportedEnvironment()){
 const h=CKEDITOR.plugins.getPath('pastetools'),
    g=this.path;c.pasteTools.register({priority:100, filters:[CKEDITOR.getUrl(`${h}filter/common.js`), CKEDITOR.getUrl(`${h}filter/image.js`), CKEDITOR.getUrl(`${g}filter/default.js`)], canHandle:function(a){
 a=a.data;return(a=a.dataTransfer.getData('text/html', !0)||a.dataValue)?'libreoffice'===CKEDITOR.plugins.pastetools.getContentGeneratorName(a):!1; 
}, handle:function(a, f){
 let g=a.data, h=g.dataValue||CKEDITOR.plugins.pastetools.getClipboardData(g, 'text/html');g.dontFilter=!0;h=CKEDITOR.pasteFilters.image(h, c, CKEDITOR.plugins.pastetools.getClipboardData(g,
    'text/rtf'));g.dataValue=CKEDITOR.pasteFilters.libreoffice(h, c);!0===c.config.forcePasteAsPlainText&&(g.type='text');f(); 
}}); 
} 
}}); 
}(), function(){
 CKEDITOR.plugins.add('pastefromword', {requires:'pastetools', init:function(c){
 var h=0, g=CKEDITOR.plugins.getPath('pastetools'), a=this.path, f=void 0===c.config.pasteFromWord_inlineImages?!0:c.config.pasteFromWord_inlineImages, g=[CKEDITOR.getUrl(`${g}filter/common.js`), CKEDITOR.getUrl(`${g}filter/image.js`), CKEDITOR.getUrl(`${a}filter/default.js`)];c.addCommand('pastefromword',
    {canUndo:!1, async:!0, exec:function(a, c){
 h=1;a.execCommand('paste', {type:'html', notification:c&&'undefined'!==typeof c.notification?c.notification:!0}); 
}});CKEDITOR.plugins.clipboard.addPasteButton(c, 'PasteFromWord', {label:c.lang.pastefromword.toolbar, command:'pastefromword', toolbar:'clipboard,50'});c.pasteTools.register({filters:c.config.pasteFromWordCleanupFile?[c.config.pasteFromWordCleanupFile]:g, canHandle:function(a){
 a=CKEDITOR.plugins.pastetools.getClipboardData(a.data, 'text/html');var c=CKEDITOR.plugins.pastetools.getContentGeneratorName(a),
    f=/(class="?Mso|style=["'][^"]*?\bmso\-|w:WordDocument|<o:\w+>|<\/font>)/, c=c?'microsoft'===c:f.test(a);return a&&(h||c); 
}, handle:function(a, g){
 var l=a.data, b=CKEDITOR.plugins.pastetools.getClipboardData(l, 'text/html'), d=CKEDITOR.plugins.pastetools.getClipboardData(l, 'text/rtf'), b={dataValue:b, dataTransfer:{'text/rtf':d}};if(!1!==c.fire('pasteFromWord', b)||h){
 l.dontFilter=!0;if(h||!c.config.pasteFromWordPromptCleanup||confirm(c.lang.pastefromword.confirmCleanup))b.dataValue=CKEDITOR.cleanWord(b.dataValue,
    c), CKEDITOR.plugins.clipboard.isCustomDataTypesSupported&&f&&CKEDITOR.pasteFilters.image&&(b.dataValue=CKEDITOR.pasteFilters.image(b.dataValue, c, d)), c.fire('afterPasteFromWord', b), l.dataValue=b.dataValue, !0===c.config.forcePasteAsPlainText?l.type='text':CKEDITOR.plugins.clipboard.isCustomCopyCutSupported||'allow-word'!==c.config.forcePasteAsPlainText||(l.type='html');h=0;g(); 
} 
}}); 
}}); 
}(), function(){
 const c={canUndo:!1, async:!0, exec:function(c, g){
 var a=c.lang, f=CKEDITOR.tools.keystrokeToString(a.common.keyboard,
    c.getCommandKeystroke(CKEDITOR.env.ie?c.commands.paste:this)), m=g&&'undefined'!==typeof g.notification?g.notification:!g||!g.from||'keystrokeHandler'===g.from&&CKEDITOR.env.ie, a=m&&'string'===typeof m?m:a.pastetext.pasteNotification.replace(/%1/, `\x3ckbd aria-label\x3d"${f.aria}"\x3e${f.display}\x3c/kbd\x3e`);c.execCommand('paste', {type:'text', notification:m?a:!1}); 
}};CKEDITOR.plugins.add('pastetext', {requires:'clipboard', init:function(h){
 const g=CKEDITOR.env.safari?CKEDITOR.CTRL+CKEDITOR.ALT+CKEDITOR.SHIFT+
    86:CKEDITOR.CTRL+CKEDITOR.SHIFT+86;h.addCommand('pastetext', c);h.setKeystroke(g, 'pastetext');CKEDITOR.plugins.clipboard.addPasteButton(h, 'PasteText', {label:h.lang.pastetext.button, command:'pastetext', toolbar:'clipboard,40'});if(h.config.forcePasteAsPlainText)h.on('beforePaste', function(a){
 'html'!=a.data.type&&(a.data.type='text'); 
});h.on('pasteState', function(a){
 h.getCommand('pastetext').setState(a.data); 
}); 
}}); 
}(), function(){
 function c(a, c){
 CKEDITOR.tools.array.forEach(c, function(c){
 a.on(c, h, null, {editor:a}); 
}); 
}
    function h(a){
 var c=a.listenerData.editor;a=c.focusManager.hasFocus;var h=c.editable(), k=c.config.editorplaceholder, l=/<body.*?>((?:.|[\n\r])*?)<\/body>/i, b=c.config.fullPage, c=c.getData();b&&(c=c.match(l)[1]);if(0!==c.length||a)return h.removeAttribute(g);h.setAttribute(g, k); 
}CKEDITOR.plugins.add('editorplaceholder', {isSupportedEnvironment:function(){
 return!CKEDITOR.env.ie||9<=CKEDITOR.env.version; 
}, onLoad:function(){
 CKEDITOR.addCss(CKEDITOR.plugins.editorplaceholder.styles); 
}, init:function(a){
 this.isSupportedEnvironment()&&
    a.config.editorplaceholder&&c(a, ['contentDom', 'focus', 'blur', 'change']); 
}});var g='data-cke-editorplaceholder';CKEDITOR.plugins.editorplaceholder={styles:`[${g}]::before {position: absolute;opacity: .8;color: #aaa;content: attr( ${g} );}.cke_wysiwyg_div[${g}]::before {margin-top: 1em;}`};CKEDITOR.config.editorplaceholder=''; 
}(), function(){
 function c(c){
 const g=CKEDITOR.plugins.getPath('preview'), a=c.config, f=c.lang.preview.preview, m=function(){
 let c=location.origin, f=location.pathname;if(!a.baseHref&&
    !CKEDITOR.env.gecko)return'';if(a.baseHref)return'\x3cbase href\x3d"{HREF}"\x3e'.replace('{HREF}', a.baseHref);f=f.split('/');f.pop();f=f.join('/');return'\x3cbase href\x3d"{HREF}"\x3e'.replace('{HREF}', `${c+f}/`); 
}();return a.fullPage?c.getData().replace(/<head>/, `$\x26${m}`).replace(/[^>]*(?=<\/title>)/, `$\x26 \x26mdash; ${f}`):`${a.docType}\x3chtml dir\x3d"${a.contentsLangDirection}"\x3e\x3chead\x3e${m}\x3ctitle\x3e${f}\x3c/title\x3e${CKEDITOR.tools.buildStyleHtml(a.contentsCss)}\x3clink rel\x3d"stylesheet" media\x3d"screen" href\x3d"${
    g}styles/screen.css"\x3e\x3c/head\x3e${function(){
 let a='\x3cbody\x3e', f=c.document&&c.document.getBody();if(!f)return a;f.getAttribute('id')&&(a=a.replace('\x3e', ` id\x3d"${f.getAttribute('id')}"\x3e`));f.getAttribute('class')&&(a=a.replace('\x3e', ` class\x3d"${f.getAttribute('class')}"\x3e`));return a; 
}()}${c.getData()}\x3c/body\x3e\x3c/html\x3e`; 
}CKEDITOR.plugins.add('preview', {init:function(c){
 c.addCommand('preview', {modes:{wysiwyg:1}, canUndo:!1, readOnly:1, exec:CKEDITOR.plugins.preview.createPreview});
    c.ui.addButton&&c.ui.addButton('Preview', {label:c.lang.preview.preview, command:'preview', toolbar:'document,40'}); 
}});CKEDITOR.plugins.preview={createPreview:function(h){
 let g, a, f, m={dataValue:c(h)}, k=window.screen;g=Math.round(.8*k.width);a=Math.round(.7*k.height);f=Math.round(.1*k.width);k=CKEDITOR.env.ie?`javascript:void( (function(){document.open();${(`(${CKEDITOR.tools.fixDomain})();`).replace(/\/\/.*?\n/g, '').replace(/parent\./g, 'window.opener.')}document.write( window.opener._cke_htmlToLoad );document.close();window.opener._cke_htmlToLoad \x3d null;})() )`:
    null;let l;l=CKEDITOR.plugins.getPath('preview');l=CKEDITOR.env.gecko?CKEDITOR.getUrl(`${l}preview.html`):'';if(!1===h.fire('contentPreview', m))return!1;if(k||l)window._cke_htmlToLoad=m.dataValue;h=window.open(l, null, ['toolbar\x3dyes,location\x3dno,status\x3dyes,menubar\x3dyes,scrollbars\x3dyes,resizable\x3dyes', `width\x3d${g}`, `height\x3d${a}`, `left\x3d${f}`].join());k&&h&&(h.location=k);window._cke_htmlToLoad||(g=h.document, g.open(), g.write(m.dataValue), g.close());return new CKEDITOR.dom.window(h); 
}}; 
}(),
    function(){
 CKEDITOR.plugins.add('print', {requires:'preview', init:function(c){
 c.addCommand('print', CKEDITOR.plugins.print);c.ui.addButton&&c.ui.addButton('Print', {label:c.lang.print.toolbar, command:'print', toolbar:'document,50'}); 
}});CKEDITOR.plugins.print={exec:function(c){
 function h(){
 CKEDITOR.env.gecko?g.print():g.document.execCommand('Print');g.close(); 
}c=CKEDITOR.plugins.preview.createPreview(c);let g;if(c){
 g=c.$;if('complete'===g.document.readyState)return h();c.once('load', h); 
} 
}, canUndo:!1, readOnly:1,
    modes:{wysiwyg:1}}; 
}(), CKEDITOR.plugins.add('removeformat', {init:function(c){
 c.addCommand('removeFormat', CKEDITOR.plugins.removeformat.commands.removeformat);c.ui.addButton&&c.ui.addButton('RemoveFormat', {label:c.lang.removeformat.toolbar, command:'removeFormat', toolbar:'cleanup,10'}); 
}}), CKEDITOR.plugins.removeformat={commands:{removeformat:{exec:function(c){
 for(var h=c._.removeFormatRegex||(c._.removeFormatRegex=new RegExp(`^(?:${c.config.removeFormatTags.replace(/,/g, '|')})$`, 'i')), g=c._.removeAttributes||
    (c._.removeAttributes=c.config.removeFormatAttributes.split(',')), a=CKEDITOR.plugins.removeformat.filter, f=c.getSelection().getRanges(), m=f.createIterator(), k=function(a){
 return a.type==CKEDITOR.NODE_ELEMENT; 
}, l;l=m.getNextRange();){
 l.enlarge(CKEDITOR.ENLARGE_INLINE);let b=l.createBookmark(), d=b.startNode, e=b.endNode, n=function(b){
 for(var d=c.elementPath(b), e=d.elements, f=1, g;(g=e[f])&&!g.equals(d.block)&&!g.equals(d.blockLimit);f++)h.test(g.getName())&&a(c, g)&&b.breakParent(g); 
};n(d);if(e)for(n(e),
    d=d.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT);d&&!d.equals(e);)if(d.isReadOnly()){
 if(d.getPosition(e)&CKEDITOR.POSITION_CONTAINS)break;d=d.getNext(k); 
}else n=d.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT), 'img'==d.getName()&&d.data('cke-realelement')||!a(c, d)||(h.test(d.getName())?d.remove(1):(d.removeAttributes(g), c.fire('removeFormatCleanup', d))), d=n;l.moveToBookmark(b); 
}c.forceNextSelectionCheck();c.getSelection().selectRanges(f); 
}}}, filter:function(c, h){
 for(let g=c._.removeFormatFilters||[], a=0;a<
    g.length;a++)if(!1===g[a](h))return!1;return!0; 
}}, CKEDITOR.editor.prototype.addRemoveFormatFilter=function(c){
 this._.removeFormatFilters||(this._.removeFormatFilters=[]);this._.removeFormatFilters.push(c); 
}, CKEDITOR.config.removeFormatTags='b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var', CKEDITOR.config.removeFormatAttributes='class,style,lang,width,height,align,hspace,valign', CKEDITOR.plugins.add('resize', {init:function(c){
 function h(f){
 let g=b.width, h=
    b.height, k=g+(f.data.$.screenX-l.x)*('rtl'==m?-1:1);f=h+(f.data.$.screenY-l.y);d&&(g=Math.max(a.resize_minWidth, Math.min(k, a.resize_maxWidth)));e&&(h=Math.max(a.resize_minHeight, Math.min(f, a.resize_maxHeight)));c.resize(d?g:null, h); 
}function g(){
 CKEDITOR.document.removeListener('mousemove', h);CKEDITOR.document.removeListener('mouseup', g);c.document&&(c.document.removeListener('mousemove', h), c.document.removeListener('mouseup', g)); 
}var a=c.config, f=c.ui.spaceId('resizer'), m=c.element?c.element.getDirection(1):
    'ltr';!a.resize_dir&&(a.resize_dir='vertical');void 0===a.resize_maxWidth&&(a.resize_maxWidth=3E3);void 0===a.resize_maxHeight&&(a.resize_maxHeight=3E3);void 0===a.resize_minWidth&&(a.resize_minWidth=750);void 0===a.resize_minHeight&&(a.resize_minHeight=250);if(!1!==a.resize_enabled){
 var k=null, l, b, d=('both'==a.resize_dir||'horizontal'==a.resize_dir)&&a.resize_minWidth!=a.resize_maxWidth, e=('both'==a.resize_dir||'vertical'==a.resize_dir)&&a.resize_minHeight!=a.resize_maxHeight, n=CKEDITOR.tools.addFunction(function(d){
 k||
    (k=c.getResizable());b={width:k.$.offsetWidth||0, height:k.$.offsetHeight||0};l={x:d.screenX, y:d.screenY};a.resize_minWidth>b.width&&(a.resize_minWidth=b.width);a.resize_minHeight>b.height&&(a.resize_minHeight=b.height);CKEDITOR.document.on('mousemove', h);CKEDITOR.document.on('mouseup', g);c.document&&(c.document.on('mousemove', h), c.document.on('mouseup', g));d.preventDefault&&d.preventDefault(); 
});c.on('destroy', function(){
 CKEDITOR.tools.removeFunction(n); 
});c.on('uiSpace', function(a){
 if('bottom'==a.data.space){
 let b=
    '';d&&!e&&(b=' cke_resizer_horizontal');!d&&e&&(b=' cke_resizer_vertical');const g=`\x3cspan id\x3d"${f}" class\x3d"cke_resizer${b} cke_resizer_${m}" title\x3d"${CKEDITOR.tools.htmlEncode(c.lang.common.resize)}" onmousedown\x3d"CKEDITOR.tools.callFunction(${n}, event)"\x3e${'ltr'==m?'◢':'◣'}\x3c/span\x3e`;'ltr'==m&&'ltr'==b?a.data.html+=g:a.data.html=g+a.data.html; 
} 
}, c, null, 100);c.on('maximize', function(a){
 c.ui.space('resizer')[a.data==CKEDITOR.TRISTATE_ON?'hide':'show'](); 
}); 
} 
}}), function(){
 const c=
    {readOnly:1, modes:{wysiwyg:1, source:1}, exec:function(c){
 if(c.fire('save')&&(c=c.element.$.form))try{
 c.submit(); 
}catch(g){
 c.submit.click&&c.submit.click(); 
} 
}};CKEDITOR.plugins.add('save', {init:function(h){
 h.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE&&(h.addCommand('save', c).startDisabled=!h.element.$.form, h.ui.addButton&&h.ui.addButton('Save', {label:h.lang.save.toolbar, command:'save', toolbar:'document,10'})); 
}}); 
}(), function(){
 CKEDITOR.plugins.add('selectall', {init:function(c){
 c.addCommand('selectAll',
    {modes:{wysiwyg:1, source:1}, exec:function(c){
 const g=c.editable();if(g.is('textarea'))c=g.$, CKEDITOR.env.ie&&c.createTextRange?c.createTextRange().execCommand('SelectAll'):(c.selectionStart=0, c.selectionEnd=c.value.length), c.focus();else{
 if(g.is('body'))c.document.$.execCommand('SelectAll', !1, null);else{
 const a=c.createRange();a.selectNodeContents(g);a.select(); 
}c.forceNextSelectionCheck();c.selectionChange(); 
} 
}, canUndo:!1});c.ui.addButton&&c.ui.addButton('SelectAll', {label:c.lang.selectall.toolbar, command:'selectAll',
    toolbar:'selection,10'}); 
}}); 
}(), function(){
 const c={readOnly:1, preserveState:!0, editorFocus:!1, exec:function(c){
 this.toggleState();this.refresh(c); 
}, refresh:function(c){
 if(c.document){
 const g=this.state!=CKEDITOR.TRISTATE_ON||c.elementMode==CKEDITOR.ELEMENT_MODE_INLINE&&!c.focusManager.hasFocus?'removeClass':'attachClass';c.editable()[g]('cke_show_blocks'); 
} 
}};CKEDITOR.plugins.add('showblocks', {onLoad:function(){
 let c='p div pre address blockquote h1 h2 h3 h4 h5 h6'.split(' '), g, a, f, m, k=CKEDITOR.getUrl(this.path),
    l=!(CKEDITOR.env.ie&&9>CKEDITOR.env.version), b=l?':not([contenteditable\x3dfalse]):not(.cke_show_blocks_off)':'', d, e;for(g=a=f=m='';d=c.pop();)e=c.length?',':'', g+=`.cke_show_blocks ${d}${b}${e}`, f+=`.cke_show_blocks.cke_contents_ltr ${d}${b}${e}`, m+=`.cke_show_blocks.cke_contents_rtl ${d}${b}${e}`, a+=`.cke_show_blocks ${d}${b}{background-image:url(${CKEDITOR.getUrl(`${k}images/block_${d}.png`)})}`;CKEDITOR.addCss((`${g}{background-repeat:no-repeat;border:1px dotted gray;padding-top:8px}`).concat(a, `${f}{background-position:top left;padding-left:8px}`,
    `${m}{background-position:top right;padding-right:8px}`));l||CKEDITOR.addCss('.cke_show_blocks [contenteditable\x3dfalse],.cke_show_blocks .cke_show_blocks_off{border:none;padding-top:0;background-image:none}.cke_show_blocks.cke_contents_rtl [contenteditable\x3dfalse],.cke_show_blocks.cke_contents_rtl .cke_show_blocks_off{padding-right:0}.cke_show_blocks.cke_contents_ltr [contenteditable\x3dfalse],.cke_show_blocks.cke_contents_ltr .cke_show_blocks_off{padding-left:0}'); 
}, init:function(h){
 function g(){
 a.refresh(h); 
}
    if(!h.blockless){
 var a=h.addCommand('showblocks', c);a.canUndo=!1;h.config.startupOutlineBlocks&&a.setState(CKEDITOR.TRISTATE_ON);h.ui.addButton&&h.ui.addButton('ShowBlocks', {label:h.lang.showblocks.toolbar, command:'showblocks', toolbar:'tools,20'});h.on('mode', function(){
 a.state!=CKEDITOR.TRISTATE_DISABLED&&a.refresh(h); 
});h.elementMode==CKEDITOR.ELEMENT_MODE_INLINE&&(h.on('focus', g), h.on('blur', g));h.on('contentDom', function(){
 a.state!=CKEDITOR.TRISTATE_DISABLED&&a.refresh(h); 
}); 
} 
}}); 
}(), function(){
 const c=
    {preserveState:!0, editorFocus:!1, readOnly:1, exec:function(c){
 this.toggleState();this.refresh(c); 
}, refresh:function(c){
 if(c.document){
 const g=this.state==CKEDITOR.TRISTATE_ON?'attachClass':'removeClass';c.editable()[g]('cke_show_borders'); 
} 
}};CKEDITOR.plugins.add('showborders', {modes:{wysiwyg:1}, onLoad:function(){
 let c;c=(CKEDITOR.env.ie6Compat?['.%1 table.%2,', '.%1 table.%2 td, .%1 table.%2 th', '{', 'border : #e1e1e1 1px solid', '}']:'.%1 table.%2,;.%1 table.%2 \x3e tr \x3e td, .%1 table.%2 \x3e tr \x3e th,;.%1 table.%2 \x3e tbody \x3e tr \x3e td, .%1 table.%2 \x3e tbody \x3e tr \x3e th,;.%1 table.%2 \x3e thead \x3e tr \x3e td, .%1 table.%2 \x3e thead \x3e tr \x3e th,;.%1 table.%2 \x3e tfoot \x3e tr \x3e td, .%1 table.%2 \x3e tfoot \x3e tr \x3e th;{;border : #e1e1e1 1px solid;}'.split(';')).join('').replace(/%2/g,
    'cke_show_border').replace(/%1/g, 'cke_show_borders ');CKEDITOR.addCss(c); 
}, init:function(h){
 const g=h.addCommand('showborders', c);g.canUndo=!1;!1!==h.config.startupShowBorders&&g.setState(CKEDITOR.TRISTATE_ON);h.on('mode', function(){
 g.state!=CKEDITOR.TRISTATE_DISABLED&&g.refresh(h); 
}, null, null, 100);h.on('contentDom', function(){
 g.state!=CKEDITOR.TRISTATE_DISABLED&&g.refresh(h); 
});h.on('removeFormatCleanup', function(a){
 a=a.data;h.getCommand('showborders').state==CKEDITOR.TRISTATE_ON&&a.is('table')&&(!a.hasAttribute('border')||
    0>=parseInt(a.getAttribute('border'), 10))&&a.addClass('cke_show_border'); 
}); 
}, afterInit:function(c){
 let g=c.dataProcessor;c=g&&g.dataFilter;g=g&&g.htmlFilter;c&&c.addRules({elements:{table:function(a){
 a=a.attributes;const c=a['class'], g=parseInt(a.border, 10);g&&!(0>=g)||c&&-1!=c.indexOf('cke_show_border')||(a['class']=`${c||''} cke_show_border`); 
}}});g&&g.addRules({elements:{table:function(a){
 a=a.attributes;const c=a['class'];c&&(a['class']=c.replace('cke_show_border', '').replace(/\s{2}/, ' ').replace(/^\s+|\s+$/,
    '')); 
}}}); 
}});CKEDITOR.on('dialogDefinition', function(c){
 let g=c.data.name;if('table'==g||'tableProperties'==g)if(c=c.data.definition, g=c.getContents('info').get('txtBorder'), g.commit=CKEDITOR.tools.override(g.commit, function(a){
 return function(c, g){
 a.apply(this, arguments);const h=parseInt(this.getValue(), 10);g[!h||0>=h?'addClass':'removeClass']('cke_show_border'); 
}; 
}), c=(c=c.getContents('advanced'))&&c.get('advCSSClasses'))c.setup=CKEDITOR.tools.override(c.setup, function(a){
 return function(){
 a.apply(this,
    arguments);this.setValue(this.getValue().replace(/cke_show_border/, '')); 
}; 
}), c.commit=CKEDITOR.tools.override(c.commit, function(a){
 return function(c, g){
 a.apply(this, arguments);parseInt(g.getAttribute('border'), 10)||g.addClass('cke_show_border'); 
}; 
}); 
}); 
}(), CKEDITOR.plugins.add('smiley', {requires:'dialog', init:function(c){
 c.config.smiley_path=c.config.smiley_path||`${this.path}images/`;c.addCommand('smiley', new CKEDITOR.dialogCommand('smiley', {allowedContent:'img[alt,height,!src,title,width]', requiredContent:'img'}));
    c.ui.addButton&&c.ui.addButton('Smiley', {label:c.lang.smiley.toolbar, command:'smiley', toolbar:'insert,50'});CKEDITOR.dialog.add('smiley', `${this.path}dialogs/smiley.js`); 
}}), CKEDITOR.config.smiley_images='regular_smile.png sad_smile.png wink_smile.png teeth_smile.png confused_smile.png tongue_smile.png embarrassed_smile.png omg_smile.png whatchutalkingabout_smile.png angry_smile.png angel_smile.png shades_smile.png devil_smile.png cry_smile.png lightbulb.png thumbs_down.png thumbs_up.png heart.png broken_heart.png kiss.png envelope.png'.split(' '),
    CKEDITOR.config.smiley_descriptions='smiley;sad;wink;laugh;frown;cheeky;blush;surprise;indecision;angry;angel;cool;devil;crying;enlightened;no;yes;heart;broken heart;kiss;mail'.split(';'), function(){
 CKEDITOR.plugins.add('sourcearea', {init:function(h){
 function g(){
 const a=f&&this.equals(CKEDITOR.document.getActive());this.hide();this.setStyle('height', `${this.getParent().$.clientHeight}px`);this.setStyle('width', `${this.getParent().$.clientWidth}px`);this.show();a&&this.focus(); 
}if(h.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE){
 const a=
    CKEDITOR.plugins.sourcearea;h.addMode('source', function(a){
 let f=h.ui.space('contents').getDocument().createElement('textarea');f.setStyles(CKEDITOR.tools.extend({width:CKEDITOR.env.ie7Compat?'99%':'100%', height:'100%', resize:'none', outline:'none', 'text-align':'left'}, CKEDITOR.tools.cssVendorPrefix('tab-size', h.config.sourceAreaTabSize||4)));f.setAttribute('dir', 'ltr');f.addClass('cke_source').addClass('cke_reset').addClass('cke_enable_context_menu');h.ui.space('contents').append(f);f=h.editable(new c(h,
    f));f.setData(h.getData(1));CKEDITOR.env.ie&&(f.attachListener(h, 'resize', g, f), f.attachListener(CKEDITOR.document.getWindow(), 'resize', g, f), CKEDITOR.tools.setTimeout(g, 0, f));h.fire('ariaWidget', this);a(); 
});h.addCommand('source', a.commands.source);h.ui.addButton&&h.ui.addButton('Source', {label:h.lang.sourcearea.toolbar, command:'source', toolbar:'mode,10'});h.on('mode', function(){
 h.getCommand('source').setState('source'==h.mode?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF); 
});var f=CKEDITOR.env.ie&&9==
    CKEDITOR.env.version; 
} 
}});var c=CKEDITOR.tools.createClass({base:CKEDITOR.editable, proto:{setData:function(c){
 this.setValue(c);this.status='ready';this.editor.fire('dataReady'); 
}, getData:function(){
 return this.getValue(); 
}, insertHtml:function(){}, insertElement:function(){}, insertText:function(){}, setReadOnly:function(c){
 this[`${c?'set':'remove'}Attribute`]('readOnly', 'readonly'); 
}, detach:function(){
 c.baseProto.detach.call(this);this.clearCustomData();this.remove(); 
}}}); 
}(), CKEDITOR.plugins.sourcearea={commands:{source:{modes:{wysiwyg:1,
    source:1}, editorFocus:!1, readOnly:1, exec:function(c){
 'wysiwyg'==c.mode&&c.fire('saveSnapshot');c.getCommand('source').setState(CKEDITOR.TRISTATE_DISABLED);c.setMode('source'==c.mode?'wysiwyg':'source'); 
}, canUndo:!1}}}, CKEDITOR.plugins.add('specialchar', {availableLangs:{af:1, ar:1, az:1, bg:1, ca:1, cs:1, cy:1, da:1, de:1, 'de-ch':1, el:1, en:1, 'en-au':1, 'en-ca':1, 'en-gb':1, eo:1, es:1, 'es-mx':1, et:1, eu:1, fa:1, fi:1, fr:1, 'fr-ca':1, gl:1, he:1, hr:1, hu:1, id:1, it:1, ja:1, km:1, ko:1, ku:1, lt:1, lv:1, nb:1, nl:1, no:1, oc:1, pl:1,
    pt:1, 'pt-br':1, ro:1, ru:1, si:1, sk:1, sl:1, sq:1, sr:1, 'sr-latn':1, sv:1, th:1, tr:1, tt:1, ug:1, uk:1, vi:1, zh:1, 'zh-cn':1}, requires:'dialog', init:function(c){
 const h=this;CKEDITOR.dialog.add('specialchar', `${this.path}dialogs/specialchar.js`);c.addCommand('specialchar', {exec:function(){
 var g=c.langCode, g=h.availableLangs[g]?g:h.availableLangs[g.replace(/-.*/, '')]?g.replace(/-.*/, ''):'en';CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(`${h.path}dialogs/lang/${g}.js`), function(){
 CKEDITOR.tools.extend(c.lang.specialchar,
    h.langEntries[g]);c.openDialog('specialchar'); 
}); 
}, modes:{wysiwyg:1}, canUndo:!1});c.ui.addButton&&c.ui.addButton('SpecialChar', {label:c.lang.specialchar.toolbar, command:'specialchar', toolbar:'insert,50'}); 
}}), CKEDITOR.config.specialChars='! \x26quot; # $ % \x26amp; \' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; \x26lt; \x3d \x26gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ \x26euro; \x26lsquo; \x26rsquo; \x26ldquo; \x26rdquo; \x26ndash; \x26mdash; \x26iexcl; \x26cent; \x26pound; \x26curren; \x26yen; \x26brvbar; \x26sect; \x26uml; \x26copy; \x26ordf; \x26laquo; \x26not; \x26reg; \x26macr; \x26deg; \x26sup2; \x26sup3; \x26acute; \x26micro; \x26para; \x26middot; \x26cedil; \x26sup1; \x26ordm; \x26raquo; \x26frac14; \x26frac12; \x26frac34; \x26iquest; \x26Agrave; \x26Aacute; \x26Acirc; \x26Atilde; \x26Auml; \x26Aring; \x26AElig; \x26Ccedil; \x26Egrave; \x26Eacute; \x26Ecirc; \x26Euml; \x26Igrave; \x26Iacute; \x26Icirc; \x26Iuml; \x26ETH; \x26Ntilde; \x26Ograve; \x26Oacute; \x26Ocirc; \x26Otilde; \x26Ouml; \x26times; \x26Oslash; \x26Ugrave; \x26Uacute; \x26Ucirc; \x26Uuml; \x26Yacute; \x26THORN; \x26szlig; \x26agrave; \x26aacute; \x26acirc; \x26atilde; \x26auml; \x26aring; \x26aelig; \x26ccedil; \x26egrave; \x26eacute; \x26ecirc; \x26euml; \x26igrave; \x26iacute; \x26icirc; \x26iuml; \x26eth; \x26ntilde; \x26ograve; \x26oacute; \x26ocirc; \x26otilde; \x26ouml; \x26divide; \x26oslash; \x26ugrave; \x26uacute; \x26ucirc; \x26uuml; \x26yacute; \x26thorn; \x26yuml; \x26OElig; \x26oelig; \x26#372; \x26#374 \x26#373 \x26#375; \x26sbquo; \x26#8219; \x26bdquo; \x26hellip; \x26trade; \x26#9658; \x26bull; \x26rarr; \x26rArr; \x26hArr; \x26diams; \x26asymp;'.split(' '),
    function(){
 CKEDITOR.plugins.add('stylescombo', {requires:'richcombo', init:function(c){
 let h=c.config, g=c.lang.stylescombo, a={}, f=[], m=[];c.on('stylesSet', function(g){
 if(g=g.data.styles){
 for(var l, b, d, e=0, n=g.length;e<n;e++)(l=g[e], c.blockless&&l.element in CKEDITOR.dtd.$block||'string'===typeof l.type&&!CKEDITOR.style.customHandlers[l.type]||(b=l.name, l=new CKEDITOR.style(l), c.filter.customConfig&&!c.filter.check(l)))||(l._name=b, l._.enterMode=h.enterMode, l._.type=d=l.assignedTo||l.type, l._.weight=
    e+1E3*(d==CKEDITOR.STYLE_OBJECT?1:d==CKEDITOR.STYLE_BLOCK?2:3), a[b]=l, f.push(l), m.push(l));f.sort(function(a, b){
 return a._.weight-b._.weight; 
}); 
} 
});c.on('stylesRemove', function(f){
 f=f.data&&f.data.type;let g=void 0===f, b;for(b in a){
 const d=a[b];(g||d.type===f)&&c.removeStyle(d); 
} 
});c.ui.addRichCombo('Styles', {label:g.label, title:g.panelTitle, toolbar:'styles,10', allowedContent:m, panel:{css:[CKEDITOR.skin.getPath('editor')].concat(h.contentsCss), multiSelect:!0, attributes:{'aria-label':g.panelTitle}}, init:function(){
 let a,
    c, b, d, e, h;e=0;for(h=f.length;e<h;e++)a=f[e], c=a._name, d=a._.type, d!=b&&(this.startGroup(g[`panelTitle${String(d)}`]), b=d), this.add(c, a.type==CKEDITOR.STYLE_OBJECT?c:a.buildPreview(), c);this.commit(); 
}, onClick:function(f){
 c.focus();c.fire('saveSnapshot');f=a[f];const g=c.elementPath();if(f.group&&f.removeStylesFromSameGroup(c))c.applyStyle(f);else c[f.checkActive(g, c)?'removeStyle':'applyStyle'](f);c.fire('saveSnapshot'); 
}, onRender:function(){
 c.on('selectionChange', function(f){
 const g=this.getValue();f=f.data.path.elements;
    for(var b=0, d=f.length, e;b<d;b++){
 e=f[b];for(const h in a)if(a[h].checkElementRemovable(e, !0, c)){
 h!=g&&this.setValue(h);return; 
} 
}this.setValue(''); 
}, this); 
}, onOpen:function(){
 var f=c.getSelection(), f=f.getSelectedElement()||f.getStartElement()||c.editable(), f=c.elementPath(f), h=[0, 0, 0, 0];this.showAll();this.unmarkAll();for(const b in a){
 const d=a[b], e=d._.type;d.checkApplicable(f, c, c.activeFilter)?h[e]++:this.hideItem(b);d.checkActive(f, c)&&this.mark(b); 
}h[CKEDITOR.STYLE_BLOCK]||this.hideGroup(g[`panelTitle${
    String(CKEDITOR.STYLE_BLOCK)}`]);h[CKEDITOR.STYLE_INLINE]||this.hideGroup(g[`panelTitle${String(CKEDITOR.STYLE_INLINE)}`]);h[CKEDITOR.STYLE_OBJECT]||this.hideGroup(g[`panelTitle${String(CKEDITOR.STYLE_OBJECT)}`]); 
}, refresh:function(){
 const f=c.elementPath();if(f){
 for(const g in a)if(a[g].checkApplicable(f, c, c.activeFilter))return;this.setState(CKEDITOR.TRISTATE_DISABLED); 
} 
}, reset:function(){
 a={};f=[]; 
}}); 
}}); 
}(), function(){
 function c(a){
 return{editorFocus:!1, canUndo:!1, modes:{wysiwyg:1}, exec:function(c){
 if(c.editable().hasFocus){
 var g=
    c.getSelection(), h;if(h=(new CKEDITOR.dom.elementPath(g.getCommonAncestor(), g.root)).contains({td:1, th:1}, 1)){
 var g=c.createRange(), b=CKEDITOR.tools.tryThese(function(){
 const b=h.getParent().$.cells[h.$.cellIndex+(a?-1:1)];b.parentNode.parentNode;return b; 
}, function(){
 var b=h.getParent(), b=b.getAscendant('table').$.rows[b.$.rowIndex+(a?-1:1)];return b.cells[a?b.cells.length-1:0]; 
});if(b||a)if(b)b=new CKEDITOR.dom.element(b), g.moveToElementEditStart(b), g.checkStartOfBlock()&&g.checkEndOfBlock()||g.selectNodeContents(b);
    else return!0;else{
 for(var d=h.getAscendant('table').$, b=h.getParent().$.cells, d=new CKEDITOR.dom.element(d.insertRow(-1), c.document), e=0, n=b.length;e<n;e++)d.append((new CKEDITOR.dom.element(b[e], c.document)).clone(!1, !1)).appendBogus();g.moveToElementEditStart(d); 
}g.select(!0);return!0; 
} 
}return!1; 
}}; 
}const h={editorFocus:!1, modes:{wysiwyg:1, source:1}}, g={exec:function(a){
 a.container.focusNext(!0, a.tabIndex); 
}}, a={exec:function(a){
 a.container.focusPrevious(!0, a.tabIndex); 
}};CKEDITOR.plugins.add('tab', {init:function(f){
 for(var m=
    !1!==f.config.enableTabKeyTools, k=f.config.tabSpaces||0, l='';k--;)l+=' ';if(l)f.on('key', function(a){
 9==a.data.keyCode&&(f.insertText(l), a.cancel()); 
});if(m)f.on('key', function(a){
 (9==a.data.keyCode&&f.execCommand('selectNextCell')||a.data.keyCode==CKEDITOR.SHIFT+9&&f.execCommand('selectPreviousCell'))&&a.cancel(); 
});f.addCommand('blur', CKEDITOR.tools.extend(g, h));f.addCommand('blurBack', CKEDITOR.tools.extend(a, h));f.addCommand('selectNextCell', c());f.addCommand('selectPreviousCell', c(!0)); 
}}); 
}(), CKEDITOR.dom.element.prototype.focusNext=
    function(c, h){
 let g=void 0===h?this.getTabIndex():h, a, f, m, k, l, b;if(0>=g)for(l=this.getNextSourceNode(c, CKEDITOR.NODE_ELEMENT);l;){
 if(l.isVisible()&&0===l.getTabIndex()){
 m=l;break; 
}l=l.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT); 
}else for(l=this.getDocument().getBody().getFirst();l=l.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT);){
 if(!a)if(!f&&l.equals(this)){
 if(f=!0, c){
 if(!(l=l.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT)))break;a=1; 
} 
}else f&&!this.contains(l)&&(a=1);if(l.isVisible()&&!(0>(b=l.getTabIndex()))){
 if(a&&
    b==g){
 m=l;break; 
}b>g&&(!m||!k||b<k)?(m=l, k=b):m||0!==b||(m=l, k=b); 
} 
}m&&m.focus(); 
}, CKEDITOR.dom.element.prototype.focusPrevious=function(c, h){
 for(var g=void 0===h?this.getTabIndex():h, a, f, m, k=0, l, b=this.getDocument().getBody().getLast();b=b.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT);){
 if(!a)if(!f&&b.equals(this)){
 if(f=!0, c){
 if(!(b=b.getPreviousSourceNode(!0, CKEDITOR.NODE_ELEMENT)))break;a=1; 
} 
}else f&&!this.contains(b)&&(a=1);if(b.isVisible()&&!(0>(l=b.getTabIndex())))if(0>=g){
 if(a&&0===l){
 m=b;break; 
}l>
    k&&(m=b, k=l); 
}else{
 if(a&&l==g){
 m=b;break; 
}l<g&&(!m||l>k)&&(m=b, k=l); 
} 
}m&&m.focus(); 
}, CKEDITOR.plugins.add('table', {requires:'dialog', init:function(c){
 function h(a){
 return CKEDITOR.tools.extend(a||{}, {contextSensitive:1, refresh:function(a, c){
 this.setState(c.contains('table', 1)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED); 
}}); 
}if(!c.blockless){
 const g=c.lang.table;c.addCommand('table', new CKEDITOR.dialogCommand('table', {context:'table', allowedContent:`table{width,height,border-collapse}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];td{border*,background-color,vertical-align,width,height}[colspan,rowspan];${
    c.plugins.dialogadvtab?`table${c.plugins.dialogadvtab.allowedContent()}`:''}`, requiredContent:'table', contentTransformations:[['table{width}: sizeToStyle', 'table[width]: sizeToAttribute'], ['td: splitBorderShorthand'], [{element:'table', right:function(a){
 if(a.styles){
 let c;if(a.styles.border)c=CKEDITOR.tools.style.parse.border(a.styles.border);else if(CKEDITOR.env.ie&&8===CKEDITOR.env.version){
 const g=a.styles;g['border-left']&&g['border-left']===g['border-right']&&g['border-right']===g['border-top']&&
    g['border-top']===g['border-bottom']&&(c=CKEDITOR.tools.style.parse.border(g['border-top'])); 
}c&&c.style&&'solid'===c.style&&c.width&&0!==parseFloat(c.width)&&(a.attributes.border=1);'collapse'==a.styles['border-collapse']&&(a.attributes.cellspacing=0); 
} 
}}]]}));c.addCommand('tableProperties', new CKEDITOR.dialogCommand('tableProperties', h()));c.addCommand('tableDelete', h({exec:function(a){
 let c=a.elementPath().contains('table', 1);if(c){
 const g=c.getParent(), h=a.editable();1!=g.getChildCount()||g.is('td',
    'th')||g.equals(h)||(c=g);a=a.createRange();a.moveToPosition(c, CKEDITOR.POSITION_BEFORE_START);c.remove();a.select(); 
} 
}}));c.ui.addButton&&c.ui.addButton('Table', {label:g.toolbar, command:'table', toolbar:'insert,30'});CKEDITOR.dialog.add('table', `${this.path}dialogs/table.js`);CKEDITOR.dialog.add('tableProperties', `${this.path}dialogs/table.js`);c.addMenuItems&&c.addMenuItems({table:{label:g.menu, command:'tableProperties', group:'table', order:5}, tabledelete:{label:g.deleteTable, command:'tableDelete', group:'table',
    order:1}});c.on('doubleclick', function(a){
 a.data.element.is('table')&&(a.data.dialog='tableProperties'); 
});c.contextMenu&&c.contextMenu.addListener(function(){
 return{tabledelete:CKEDITOR.TRISTATE_OFF, table:CKEDITOR.TRISTATE_OFF}; 
}); 
} 
}}), function(){
 function c(a, b){
 function c(a){
 return b?b.contains(a)&&a.getAscendant('table', !0).equals(b):!0; 
}function d(a){
 const b=/^(?:td|th)$/;0<e.length||a.type!=CKEDITOR.NODE_ELEMENT||!b.test(a.getName())||a.getCustomData('selected_cell')||(CKEDITOR.dom.element.setMarker(f,
    a, 'selected_cell', !0), e.push(a)); 
}var e=[], f={};if(!a)return e;for(let g=a.getRanges(), h=0;h<g.length;h++){
 var k=g[h];if(k.collapsed)(k=k.getCommonAncestor().getAscendant({td:1, th:1}, !0))&&c(k)&&e.push(k);else{
 var k=new CKEDITOR.dom.walker(k), l;for(k.guard=d;l=k.next();)l.type==CKEDITOR.NODE_ELEMENT&&l.is(CKEDITOR.dtd.table)||(l=l.getAscendant({td:1, th:1}, !0))&&!l.getCustomData('selected_cell')&&c(l)&&(CKEDITOR.dom.element.setMarker(f, l, 'selected_cell', !0), e.push(l)); 
} 
}CKEDITOR.dom.element.clearAllMarkers(f);
    return e; 
}function h(a, b){
 for(var d=p(a)?a:c(a), e=d[0], f=e.getAscendant('table'), e=e.getDocument(), g=d[0].getParent(), h=g.$.rowIndex, d=d[d.length-1], k=d.getParent().$.rowIndex+d.$.rowSpan-1, d=new CKEDITOR.dom.element(f.$.rows[k]), h=b?h:k, g=b?g:d, d=CKEDITOR.tools.buildTableMap(f), f=d[h], h=b?d[h-1]:d[h+1], d=d[0].length, e=e.createElement('tr'), k=0;f[k]&&k<d;k++){
 var l;1<f[k].rowSpan&&h&&f[k]==h[k]?(l=f[k], l.rowSpan+=1):(l=(new CKEDITOR.dom.element(f[k])).clone(), l.removeAttribute('rowSpan'), l.appendBogus(),
    e.append(l), l=l.$);k+=l.colSpan-1; 
}b?e.insertBefore(g):e.insertAfter(g);return e; 
}function g(a){
 if(a instanceof CKEDITOR.dom.selection){
 var b=a.getRanges(), d=c(a), e=d[0].getAscendant('table'), f=CKEDITOR.tools.buildTableMap(e), h=d[0].getParent().$.rowIndex, d=d[d.length-1], k=d.getParent().$.rowIndex+d.$.rowSpan-1, d=[];a.reset();for(a=h;a<=k;a++){
 for(var l=f[a], m=new CKEDITOR.dom.element(e.$.rows[a]), n=0;n<l.length;n++){
 let p=new CKEDITOR.dom.element(l[n]), t=p.getParent().$.rowIndex;1==p.$.rowSpan?p.remove():
    (--p.$.rowSpan, t==a&&(t=f[a+1], t[n-1]?p.insertAfter(new CKEDITOR.dom.element(t[n-1])):(new CKEDITOR.dom.element(e.$.rows[a+1])).append(p, 1)));n+=p.$.colSpan-1; 
}d.push(m); 
}f=e.$.rows;b[0].moveToPosition(e, CKEDITOR.POSITION_BEFORE_START);h=new CKEDITOR.dom.element(f[k+1]||(0<h?f[h-1]:null)||e.$.parentNode);for(a=d.length;0<=a;a--)g(d[a]);return e.$.parentNode?h:(b[0].select(), null); 
}a instanceof CKEDITOR.dom.element&&(e=a.getAscendant('table'), 1==e.$.rows.length?e.remove():a.remove());return null; 
}function a(a){
 for(var b=
    a.getParent().$.cells, c=0, d=0;d<b.length;d++){
 var e=b[d], c=c+e.colSpan;if(e==a.$)break; 
}return c-1; 
}function f(b, c){
 for(var d=c?Infinity:0, e=0;e<b.length;e++){
 const f=a(b[e]);if(c?f<d:f>d)d=f; 
}return d; 
}function m(a, b){
 for(var d=p(a)?a:c(a), e=d[0].getAscendant('table'), g=f(d, 1), d=f(d), h=b?g:d, k=CKEDITOR.tools.buildTableMap(e), e=[], g=[], d=[], l=k.length, m=0;m<l;m++){
 const n=b?k[m][h-1]:k[m][h+1];e.push(k[m][h]);g.push(n); 
}for(m=0;m<l;m++)e[m]&&(1<e[m].colSpan&&g[m]==e[m]?(k=e[m], k.colSpan+=1):(h=new CKEDITOR.dom.element(e[m]),
    k=h.clone(), k.removeAttribute('colSpan'), k.appendBogus(), k[b?'insertBefore':'insertAfter'].call(k, h), d.push(k), k=k.$), m+=k.rowSpan-1);return d; 
}function k(a){
 function b(a){
 let c=a.getRanges(), d, e;if(1!==c.length)return a;c=c[0];if(c.collapsed||0!==c.endOffset)return a;d=c.endContainer;e=d.getName().toLowerCase();if('td'!==e&&'th'!==e)return a;for((e=d.getPrevious())||(e=d.getParent().getPrevious().getLast());e.type!==CKEDITOR.NODE_TEXT&&'br'!==e.getName().toLowerCase();)if(e=e.getLast(), !e)return a;
    c.setEndAt(e, CKEDITOR.POSITION_BEFORE_END);return c.select(); 
}CKEDITOR.env.webkit&&!a.isFake&&(a=b(a));var d=a.getRanges(), e=c(a), f=e[0], g=e[e.length-1], e=f.getAscendant('table'), h=CKEDITOR.tools.buildTableMap(e), k, l, m=[];a.reset();let n=0;for(a=h.length;n<a;n++)for(var p=0, t=h[n].length;p<t;p++)void 0===k&&h[n][p]==f.$&&(k=p), h[n][p]==g.$&&(l=p);for(n=k;n<=l;n++)for(p=0;p<h.length;p++)g=h[p], f=new CKEDITOR.dom.element(e.$.rows[p]), g=new CKEDITOR.dom.element(g[n]), g.$&&(1==g.$.colSpan?g.remove():--g.$.colSpan,
    p+=g.$.rowSpan-1, f.$.cells.length||m.push(f));k=h[0].length-1>l?new CKEDITOR.dom.element(h[0][l+1]):k&&-1!==h[0][k-1].cellIndex?new CKEDITOR.dom.element(h[0][k-1]):new CKEDITOR.dom.element(e.$.parentNode);m.length==a&&(d[0].moveToPosition(e, CKEDITOR.POSITION_AFTER_END), d[0].select(), e.remove());return k; 
}function l(a, b){
 const c=a.getStartElement().getAscendant({td:1, th:1}, !0);if(c){
 const d=c.clone();d.appendBogus();b?d.insertBefore(c):d.insertAfter(c); 
} 
}function b(a){
 if(a instanceof CKEDITOR.dom.selection){
 var e=
    a.getRanges(), f=c(a), g=f[0]&&f[0].getAscendant('table'), h;a:{
 let k=0;h=f.length-1;for(var l={}, m, n;m=f[k++];)CKEDITOR.dom.element.setMarker(l, m, 'delete_cell', !0);for(k=0;m=f[k++];)if((n=m.getPrevious())&&!n.getCustomData('delete_cell')||(n=m.getNext())&&!n.getCustomData('delete_cell')){
 CKEDITOR.dom.element.clearAllMarkers(l);h=n;break a; 
}CKEDITOR.dom.element.clearAllMarkers(l);k=f[0].getParent();(k=k.getPrevious())?h=k.getLast():(k=f[h].getParent(), h=(k=k.getNext())?k.getChild(0):null); 
}a.reset();for(a=
    f.length-1;0<=a;a--)b(f[a]);h?d(h, !0):g&&(e[0].moveToPosition(g, CKEDITOR.POSITION_BEFORE_START), e[0].select(), g.remove()); 
}else a instanceof CKEDITOR.dom.element&&(e=a.getParent(), 1==e.getChildCount()?e.remove():a.remove()); 
}function d(a, b){
 let c=a.getDocument(), d=CKEDITOR.document;CKEDITOR.env.ie&&10==CKEDITOR.env.version&&(d.focus(), c.focus());c=new CKEDITOR.dom.range(c);c[`moveToElementEdit${b?'End':'Start'}`](a)||(c.selectNodeContents(a), c.collapse(b?!1:!0));c.select(!0); 
}function e(a, b, c){
 a=a[b];
    if('undefined'===typeof c)return a;for(b=0;a&&b<a.length;b++){
 if(c.is&&a[b]==c.$)return b;if(b==c)return new CKEDITOR.dom.element(a[b]); 
}return c.is?-1:null; 
}function n(a, b, d){
 let f=c(a), g;if((b?1!=f.length:2>f.length)||(g=a.getCommonAncestor())&&g.type==CKEDITOR.NODE_ELEMENT&&g.is('table'))return!1;a=f[0];g=a.getAscendant('table');let h=CKEDITOR.tools.buildTableMap(g), k=h.length, l=h[0].length, m=a.getParent().$.rowIndex, n=e(h, m, a), p;if(b){
 var t;try{
 var x=parseInt(a.getAttribute('rowspan'), 10)||1;p=parseInt(a.getAttribute('colspan'),
    10)||1;t=h['up'==b?m-x:'down'==b?m+x:m]['left'==b?n-p:'right'==b?n+p:n]; 
}catch(K){
 return!1; 
}if(!t||a.$==t)return!1;f['up'==b||'left'==b?'unshift':'push'](new CKEDITOR.dom.element(t)); 
}b=a.getDocument();var D=m, x=t=0, N=!d&&new CKEDITOR.dom.documentFragment(b), J=0;for(b=0;b<f.length;b++){
 p=f[b];var L=p.getParent(), Q=p.getFirst(), M=p.$.colSpan, H=p.$.rowSpan, L=L.$.rowIndex, O=e(h, L, p), J=J+M*H, x=Math.max(x, O-n+M);t=Math.max(t, L-m+H);d||(M=p, (H=M.getBogus())&&H.remove(), M.trim(), p.getChildren().count()&&(L==
    D||!Q||Q.isBlockBoundary&&Q.isBlockBoundary({br:1})||(D=N.getLast(CKEDITOR.dom.walker.whitespaces(!0)), !D||D.is&&D.is('br')||N.append('br')), p.moveChildren(N)), b?p.remove():p.setHtml(''));D=L; 
}if(d)return t*x==J;N.moveChildren(a);a.appendBogus();x>=l?a.removeAttribute('rowSpan'):a.$.rowSpan=t;t>=k?a.removeAttribute('colSpan'):a.$.colSpan=x;d=new CKEDITOR.dom.nodeList(g.$.rows);f=d.count();for(b=f-1;0<=b;b--)g=d.getItem(b), g.$.cells.length||(g.remove(), f++);return a; 
}function t(a, b){
 var d=c(a);if(1<
    d.length)return!1;if(b)return!0;var d=d[0], f=d.getParent(), g=f.getAscendant('table'), h=CKEDITOR.tools.buildTableMap(g), k=f.$.rowIndex, l=e(h, k, d), m=d.$.rowSpan, n;if(1<m){
 n=Math.ceil(m/2);for(var m=Math.floor(m/2), f=k+n, g=new CKEDITOR.dom.element(g.$.rows[f]), h=e(h, f), p, f=d.clone(), k=0;k<h.length;k++)if(p=h[k], p.parentNode==g.$&&k>l){
 f.insertBefore(new CKEDITOR.dom.element(p));break; 
}else p=null;p||g.append(f); 
}else for(m=n=1, g=f.clone(), g.insertAfter(f), g.append(f=d.clone()), p=e(h, k), l=0;l<p.length;l++)p[l].rowSpan++;
    f.appendBogus();d.$.rowSpan=n;f.$.rowSpan=m;1==n&&d.removeAttribute('rowSpan');1==m&&f.removeAttribute('rowSpan');return f; 
}function x(a, b){
 var d=c(a);if(1<d.length)return!1;if(b)return!0;var d=d[0], f=d.getParent(), g=f.getAscendant('table'), g=CKEDITOR.tools.buildTableMap(g), h=e(g, f.$.rowIndex, d), k=d.$.colSpan;if(1<k)f=Math.ceil(k/2), k=Math.floor(k/2);else{
 for(var k=f=1, l=[], m=0;m<g.length;m++){
 const n=g[m];l.push(n[h]);1<n[h].rowSpan&&(m+=n[h].rowSpan-1); 
}for(g=0;g<l.length;g++)l[g].colSpan++; 
}g=d.clone();
    g.insertAfter(d);g.appendBogus();d.$.colSpan=f;g.$.colSpan=k;1==f&&d.removeAttribute('colSpan');1==k&&g.removeAttribute('colSpan');return g; 
}var p=CKEDITOR.tools.isArray;CKEDITOR.plugins.tabletools={requires:'table,dialog,contextmenu', init:function(a){
 function e(a){
 return CKEDITOR.tools.extend(a||{}, {contextSensitive:1, refresh:function(a, b){
 this.setState(b.contains({td:1, th:1}, 1)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED); 
}}); 
}function f(b, c){
 const d=a.addCommand(b, c);a.addFeature(d); 
}const p=a.lang.table,
    A=CKEDITOR.tools.style.parse, r='td{width} td{height} td{border-color} td{background-color} td{white-space} td{vertical-align} td{text-align} td[colspan] td[rowspan] th'.split(' ');f('cellProperties', new CKEDITOR.dialogCommand('cellProperties', e({allowedContent:'td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]', requiredContent:r, contentTransformations:[[{element:'td', left:function(a){
 return a.styles.background&&A.background(a.styles.background).color; 
},
    right:function(a){
 a.styles['background-color']=A.background(a.styles.background).color; 
}}, {element:'td', check:'td{vertical-align}', left:function(a){
 return a.attributes&&a.attributes.valign; 
}, right:function(a){
 a.styles['vertical-align']=a.attributes.valign;delete a.attributes.valign; 
}}], [{element:'tr', check:'td{height}', left:function(a){
 return a.styles&&a.styles.height; 
}, right:function(a){
 CKEDITOR.tools.array.forEach(a.children, function(b){
 b.name in{td:1, th:1}&&(b.attributes['cke-row-height']=a.styles.height); 
});
    delete a.styles.height; 
}}], [{element:'td', check:'td{height}', left:function(a){
 return(a=a.attributes)&&a['cke-row-height']; 
}, right:function(a){
 a.styles.height=a.attributes['cke-row-height'];delete a.attributes['cke-row-height']; 
}}]]})));CKEDITOR.dialog.add('cellProperties', `${this.path}dialogs/tableCell.js`);f('rowDelete', e({requiredContent:'table', exec:function(a){
 a=a.getSelection();(a=g(a))&&d(a); 
}}));f('rowInsertBefore', e({requiredContent:'table', exec:function(a){
 a=a.getSelection();a=c(a);h(a, !0); 
}}));
    f('rowInsertAfter', e({requiredContent:'table', exec:function(a){
 a=a.getSelection();a=c(a);h(a); 
}}));f('columnDelete', e({requiredContent:'table', exec:function(a){
 a=a.getSelection();(a=k(a))&&d(a, !0); 
}}));f('columnInsertBefore', e({requiredContent:'table', exec:function(a){
 a=a.getSelection();a=c(a);m(a, !0); 
}}));f('columnInsertAfter', e({requiredContent:'table', exec:function(a){
 a=a.getSelection();a=c(a);m(a); 
}}));f('cellDelete', e({requiredContent:'table', exec:function(a){
 a=a.getSelection();b(a); 
}}));f('cellMerge',
    e({allowedContent:'td[colspan,rowspan]', requiredContent:'td[colspan,rowspan]', exec:function(a, b){
 b.cell=n(a.getSelection());d(b.cell, !0); 
}}));f('cellMergeRight', e({allowedContent:'td[colspan]', requiredContent:'td[colspan]', exec:function(a, b){
 b.cell=n(a.getSelection(), 'right');d(b.cell, !0); 
}}));f('cellMergeDown', e({allowedContent:'td[rowspan]', requiredContent:'td[rowspan]', exec:function(a, b){
 b.cell=n(a.getSelection(), 'down');d(b.cell, !0); 
}}));f('cellVerticalSplit', e({allowedContent:'td[rowspan]', requiredContent:'td[rowspan]',
    exec:function(a){
 d(x(a.getSelection())); 
}}));f('cellHorizontalSplit', e({allowedContent:'td[colspan]', requiredContent:'td[colspan]', exec:function(a){
 d(t(a.getSelection())); 
}}));f('cellInsertBefore', e({requiredContent:'table', exec:function(a){
 a=a.getSelection();l(a, !0); 
}}));f('cellInsertAfter', e({requiredContent:'table', exec:function(a){
 a=a.getSelection();l(a); 
}}));a.addMenuItems&&a.addMenuItems({tablecell:{label:p.cell.menu, group:'tablecell', order:1, getItems:function(){
 var b=a.getSelection(), d=c(b), b=
    {tablecell_insertBefore:CKEDITOR.TRISTATE_OFF, tablecell_insertAfter:CKEDITOR.TRISTATE_OFF, tablecell_delete:CKEDITOR.TRISTATE_OFF, tablecell_merge:n(b, null, !0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED, tablecell_merge_right:n(b, 'right', !0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED, tablecell_merge_down:n(b, 'down', !0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED, tablecell_split_vertical:x(b, !0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED, tablecell_split_horizontal:t(b, !0)?CKEDITOR.TRISTATE_OFF:
    CKEDITOR.TRISTATE_DISABLED};a.filter.check(r)&&(b.tablecell_properties=0<d.length?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);return b; 
}}, tablecell_insertBefore:{label:p.cell.insertBefore, group:'tablecell', command:'cellInsertBefore', order:5}, tablecell_insertAfter:{label:p.cell.insertAfter, group:'tablecell', command:'cellInsertAfter', order:10}, tablecell_delete:{label:p.cell.deleteCell, group:'tablecell', command:'cellDelete', order:15}, tablecell_merge:{label:p.cell.merge, group:'tablecell', command:'cellMerge',
    order:16}, tablecell_merge_right:{label:p.cell.mergeRight, group:'tablecell', command:'cellMergeRight', order:17}, tablecell_merge_down:{label:p.cell.mergeDown, group:'tablecell', command:'cellMergeDown', order:18}, tablecell_split_horizontal:{label:p.cell.splitHorizontal, group:'tablecell', command:'cellHorizontalSplit', order:19}, tablecell_split_vertical:{label:p.cell.splitVertical, group:'tablecell', command:'cellVerticalSplit', order:20}, tablecell_properties:{label:p.cell.title, group:'tablecellproperties', command:'cellProperties',
    order:21}, tablerow:{label:p.row.menu, group:'tablerow', order:1, getItems:function(){
 return{tablerow_insertBefore:CKEDITOR.TRISTATE_OFF, tablerow_insertAfter:CKEDITOR.TRISTATE_OFF, tablerow_delete:CKEDITOR.TRISTATE_OFF}; 
}}, tablerow_insertBefore:{label:p.row.insertBefore, group:'tablerow', command:'rowInsertBefore', order:5}, tablerow_insertAfter:{label:p.row.insertAfter, group:'tablerow', command:'rowInsertAfter', order:10}, tablerow_delete:{label:p.row.deleteRow, group:'tablerow', command:'rowDelete', order:15},
    tablecolumn:{label:p.column.menu, group:'tablecolumn', order:1, getItems:function(){
 return{tablecolumn_insertBefore:CKEDITOR.TRISTATE_OFF, tablecolumn_insertAfter:CKEDITOR.TRISTATE_OFF, tablecolumn_delete:CKEDITOR.TRISTATE_OFF}; 
}}, tablecolumn_insertBefore:{label:p.column.insertBefore, group:'tablecolumn', command:'columnInsertBefore', order:5}, tablecolumn_insertAfter:{label:p.column.insertAfter, group:'tablecolumn', command:'columnInsertAfter', order:10}, tablecolumn_delete:{label:p.column.deleteColumn, group:'tablecolumn',
    command:'columnDelete', order:15}});a.contextMenu&&a.contextMenu.addListener(function(a, b, c){
 return(a=c.contains({td:1, th:1}, 1))&&!a.isReadOnly()?{tablecell:CKEDITOR.TRISTATE_OFF, tablerow:CKEDITOR.TRISTATE_OFF, tablecolumn:CKEDITOR.TRISTATE_OFF}:null; 
}); 
}, getCellColIndex:a, insertRow:h, insertColumn:m, getSelectedCells:c};CKEDITOR.plugins.add('tabletools', CKEDITOR.plugins.tabletools); 
}(), CKEDITOR.tools.buildTableMap=function(c, h, g, a, f){
 c=c.$.rows;g=g||0;a='number'===typeof a?a:c.length-1;f='number'===typeof f?
    f:-1;let m=-1, k=[];for(h=h||0;h<=a;h++){
 m++;!k[m]&&(k[m]=[]);for(let l=-1, b=g;b<=(-1===f?c[h].cells.length-1:f);b++){
 var d=c[h].cells[b];if(!d)break;for(l++;k[m][l];)l++;for(var e=isNaN(d.colSpan)?1:d.colSpan, d=isNaN(d.rowSpan)?1:d.rowSpan, n=0;n<d&&!(h+n>a);n++){
 k[m+n]||(k[m+n]=[]);for(let t=0;t<e;t++)k[m+n][l+t]=c[h].cells[b]; 
}l+=e-1;if(-1!==f&&l>=f)break; 
} 
}return k; 
}, function(){
 function c(a){
 return CKEDITOR.plugins.widget&&CKEDITOR.plugins.widget.isDomWidget(a); 
}function h(a, c){
 let d=a.getAscendant('table'),
    e=c.getAscendant('table'), f=CKEDITOR.tools.buildTableMap(d), g=b(a), h=b(c), k=[], l={}, m, n;d.contains(e)&&(c=c.getAscendant({td:1, th:1}), h=b(c));g>h&&(d=g, g=h, h=d, d=a, a=c, c=d);for(d=0;d<f[g].length;d++)if(a.$===f[g][d]){
 m=d;break; 
}for(d=0;d<f[h].length;d++)if(c.$===f[h][d]){
 n=d;break; 
}m>n&&(d=m, m=n, n=d);for(d=g;d<=h;d++)for(g=m;g<=n;g++)e=new CKEDITOR.dom.element(f[d][g]), e.$&&!e.getCustomData('selected_cell')&&(k.push(e), CKEDITOR.dom.element.setMarker(l, e, 'selected_cell', !0));CKEDITOR.dom.element.clearAllMarkers(l);
    return k; 
}function g(a){
 return(a=a.editable().findOne('.cke_table-faked-selection'))&&a.getAscendant('table'); 
}function a(a, b){
 let c=a.editable().find('.cke_table-faked-selection'), d=a.editable().findOne('[data-cke-table-faked-selection-table]'), e;a.fire('lockSnapshot');a.editable().removeClass('cke_table-faked-selection-editor');for(e=0;e<c.count();e++)c.getItem(e).removeClass('cke_table-faked-selection');d&&d.data('cke-table-faked-selection-table', !1);a.fire('unlockSnapshot');b&&(q={active:!1}, a.getSelection().isInTable()&&
    a.getSelection().reset()); 
}function f(a, b){
 let c=[], d, e;for(e=0;e<b.length;e++)d=a.createRange(), d.setStartBefore(b[e]), d.setEndAfter(b[e]), c.push(d);a.getSelection().selectRanges(c); 
}function m(a){
 let b=a.editable().find('.cke_table-faked-selection');1>b.count()||(b=h(b.getItem(0), b.getItem(b.count()-1)), f(a, b)); 
}function k(b, d, e){
 let g=w(b.getSelection(!0));d=d.is('table')?null:d;let k;(k=q.active&&!q.first)&&!(k=d)&&(k=b.getSelection().getRanges(), k=1<g.length||k[0]&&!k[0].collapsed?!0:!1);if(k)q.first=
    d||g[0], q.dirty=d?!1:1!==g.length;else if(q.active&&d&&q.first.getAscendant('table').equals(d.getAscendant('table'))){
 g=h(q.first, d);if(!q.dirty&&1===g.length&&!c(e.data.getTarget()))return a(b, 'mouseup'===e.name);q.dirty=!0;q.last=d;f(b, g); 
} 
}function l(b){
 var c=(b=b.editor||b.sender.editor)&&b.getSelection(), d=c&&c.getRanges()||[], e=d&&d[0].getEnclosedNode(), e=e&&e.type==CKEDITOR.NODE_ELEMENT&&e.is('img'), f;if(c&&(a(b), c.isInTable()&&c.isFake))if(e)b.getSelection().reset();else if(!d[0]._getTableElement({table:1}).hasAttribute('data-cke-tableselection-ignored')){
 1===
    d.length&&d[0]._getTableElement()&&d[0]._getTableElement().is('table')&&(f=d[0]._getTableElement());f=w(c, f);b.fire('lockSnapshot');for(c=0;c<f.length;c++)f[c].addClass('cke_table-faked-selection');0<f.length&&(b.editable().addClass('cke_table-faked-selection-editor'), f[0].getAscendant('table').data('cke-table-faked-selection-table', ''));b.fire('unlockSnapshot'); 
} 
}function b(a){
 return a.getAscendant('tr', !0).$.rowIndex; 
}function d(b){
 function e(a, b){
 return a&&b?a.equals(b)||a.contains(b)||b.contains(a)||
    a.getCommonAncestor(b).is(u):!1; 
}function f(a){
 return!a.getAscendant('table', !0)&&a.getDocument().equals(l.document); 
}function h(a, b, c, d){
 if('mousedown'===a.name&&(CKEDITOR.tools.getMouseButton(a)===CKEDITOR.MOUSE_BUTTON_LEFT||!d))return!0;if(b=a.name===(CKEDITOR.env.gecko?'mousedown':'mouseup')&&!f(a.data.getTarget()))a=a.data.getTarget().getAscendant({td:1, th:1}, !0), b=!(a&&a.hasClass('cke_table-faked-selection'));return b; 
}if(b.data.getTarget().getName&&('mouseup'===b.name||!c(b.data.getTarget()))){
 var l=
    b.editor||b.listenerData.editor, n=l.getSelection(1), p=g(l), t=b.data.getTarget(), r=t&&t.getAscendant({td:1, th:1}, !0), t=t&&t.getAscendant('table', !0), u={table:1, thead:1, tbody:1, tfoot:1, tr:1, td:1, th:1};t&&t.hasAttribute('data-cke-tableselection-ignored')||(h(b, n, p, t)&&a(l, !0), !q.active&&'mousedown'===b.name&&CKEDITOR.tools.getMouseButton(b)===CKEDITOR.MOUSE_BUTTON_LEFT&&t&&(q={active:!0}, CKEDITOR.document.on('mouseup', d, null, {editor:l})), (r||t)&&k(l, r||t, b), 'mouseup'===b.name&&(CKEDITOR.tools.getMouseButton(b)===
    CKEDITOR.MOUSE_BUTTON_LEFT&&(f(b.data.getTarget())||e(p, t))&&m(l), q={active:!1}, CKEDITOR.document.removeListener('mouseup', d))); 
} 
}function e(a){
 let b=a.data.getTarget().getAscendant('table', !0);b&&b.hasAttribute('data-cke-tableselection-ignored')||(b=a.data.getTarget().getAscendant({td:1, th:1}, !0))&&!b.hasClass('cke_table-faked-selection')&&(a.cancel(), a.data.preventDefault()); 
}function n(a, b){
 function c(a){
 a.cancel(); 
}let d=a.getSelection(), e=d.createBookmarks(), f=a.document, g=a.createRange(), h=f.getDocumentElement().$,
    k=CKEDITOR.env.ie&&9>CKEDITOR.env.version, l=a.blockless||CKEDITOR.env.ie?'span':'div', m, n, p, t;f.getById('cke_table_copybin')||(m=f.createElement(l), n=f.createElement(l), n.setAttributes({id:'cke_table_copybin', 'data-cke-temp':'1'}), m.setStyles({position:'absolute', width:'1px', height:'1px', overflow:'hidden'}), m.setStyle('ltr'==a.config.contentsLangDirection?'left':'right', '-5000px'), m.setHtml(a.getSelectedHtml(!0)), a.fire('lockSnapshot'), n.append(m), a.editable().append(n), t=a.on('selectionChange', c,
    null, null, 0), k&&(p=h.scrollTop), g.selectNodeContents(m), g.select(), k&&(h.scrollTop=p), setTimeout(function(){
 n.remove();d.selectBookmarks(e);t.removeListener();a.fire('unlockSnapshot');b&&(a.extractSelectedHtml(), a.fire('saveSnapshot')); 
}, 100)); 
}function t(a){
 const b=a.editor||a.sender.editor, c=b.getSelection();c.isInTable()&&(c.getRanges()[0]._getTableElement({table:1}).hasAttribute('data-cke-tableselection-ignored')||n(b, 'cut'===a.name)); 
}function x(a){
 this._reset();a&&this.setSelectedCells(a); 
}function p(a,
    b, c){
 a.on('beforeCommandExec', function(c){
 -1!==CKEDITOR.tools.array.indexOf(b, c.data.name)&&(c.data.selectedCells=w(a.getSelection())); 
});a.on('afterCommandExec', function(d){
 -1!==CKEDITOR.tools.array.indexOf(b, d.data.name)&&c(a, d.data); 
}); 
}var q={active:!1}, v, w, u, A, r;x.prototype={};x.prototype._reset=function(){
 this.cells={first:null, last:null, all:[]};this.rows={first:null, last:null}; 
};x.prototype.setSelectedCells=function(a){
 this._reset();a=a.slice(0);this._arraySortByDOMOrder(a);this.cells.all=a;this.cells.first=
    a[0];this.cells.last=a[a.length-1];this.rows.first=a[0].getAscendant('tr');this.rows.last=this.cells.last.getAscendant('tr'); 
};x.prototype.getTableMap=function(){
 let a=u(this.cells.first), c;a:{
 c=this.cells.last;var d=c.getAscendant('table'), e=b(c), d=CKEDITOR.tools.buildTableMap(d), f;for(f=0;f<d[e].length;f++)if((new CKEDITOR.dom.element(d[e][f])).equals(c)){
 c=f;break a; 
}c=void 0; 
}return CKEDITOR.tools.buildTableMap(this._getTable(), b(this.rows.first), a, b(this.rows.last), c); 
};x.prototype._getTable=function(){
 return this.rows.first.getAscendant('table'); 
};
    x.prototype.insertRow=function(a, b, c){
 if('undefined'===typeof a)a=1;else if(0>=a)return;for(var d=this.cells.first.$.cellIndex, e=this.cells.last.$.cellIndex, f=c?[]:this.cells.all, g, h=0;h<a;h++)g=A(c?this.cells.all:f, b), g=CKEDITOR.tools.array.filter(g.find('td, th').toArray(), function(a){
 return c?!0:a.$.cellIndex>=d&&a.$.cellIndex<=e; 
}), f=b?g.concat(f):f.concat(g);this.setSelectedCells(f); 
};x.prototype.insertColumn=function(a){
 function c(a){
 a=b(a);return a>=f&&a<=g; 
}if('undefined'===typeof a)a=1;else if(0>=
    a)return;for(var d=this.cells, e=d.all, f=b(d.first), g=b(d.last), d=0;d<a;d++)e=e.concat(CKEDITOR.tools.array.filter(r(e), c));this.setSelectedCells(e); 
};x.prototype.emptyCells=function(a){
 a=a||this.cells.all;for(let b=0;b<a.length;b++)a[b].setHtml(''); 
};x.prototype._arraySortByDOMOrder=function(a){
 a.sort(function(a, b){
 return a.getPosition(b)&CKEDITOR.POSITION_PRECEDING?-1:1; 
}); 
};const y={onPaste:function(a){
 function b(a){
 const c=d.createRange();c.selectNodeContents(a);c.select(); 
}function c(a){
 return Math.max.apply(null,
    CKEDITOR.tools.array.map(a, function(a){
 return a.length; 
}, 0)); 
}var d=a.editor, e=d.getSelection(), g=w(e), k=e.isInTable(!0)&&this.isBoundarySelection(e), l=this.findTableInPastedContent(d, a.data.dataValue), m, n;(function(a, b, c, d){
 a=a.getRanges();const e=a.length&&a[0]._getTableElement({table:1});if(!b.length||e&&e.hasAttribute('data-cke-tableselection-ignored')||d&&!c)return!1;if(b=!d)(b=a[0])?(b=b.clone(), b.enlarge(CKEDITOR.ENLARGE_ELEMENT), b=(b=b.getEnclosedNode())&&b.is&&b.is(CKEDITOR.dtd.$tableContent)):
    b=void 0, b=!b;return b?!1:!0; 
})(e, g, l, k)&&(g=g[0].getAscendant('table'), m=new x(w(e, g)), d.once('afterPaste', function(){
 let a;if(n){
 a=new CKEDITOR.dom.element(n[0][0]);const b=n[n.length-1];a=h(a, new CKEDITOR.dom.element(b[b.length-1])); 
}else a=m.cells.all;f(d, a); 
}), l?(a.stop(), k?(m.insertRow(1, 1===k, !0), e.selectElement(m.rows.first)):(m.emptyCells(), f(d, m.cells.all)), a=m.getTableMap(), n=CKEDITOR.tools.buildTableMap(l), m.insertRow(n.length-a.length), m.insertColumn(c(n)-c(a)), a=m.getTableMap(), this.pasteTable(m,
    a, n), d.fire('saveSnapshot'), setTimeout(function(){
 d.fire('afterPaste'); 
}, 0)):(b(m.cells.first), d.once('afterPaste', function(){
 d.fire('lockSnapshot');m.emptyCells(m.cells.all.slice(1));f(d, m.cells.all);d.fire('unlockSnapshot'); 
}))); 
}, isBoundarySelection:function(a){
 a=a.getRanges()[0];const b=a.endContainer.getAscendant('tr', !0);if(b&&a.collapsed){
 if(a.checkBoundaryOfElement(b, CKEDITOR.START))return 1;if(a.checkBoundaryOfElement(b, CKEDITOR.END))return 2; 
}return 0; 
}, findTableInPastedContent:function(a, b){
 let c=
    a.dataProcessor, d=new CKEDITOR.dom.element('body');c||(c=new CKEDITOR.htmlDataProcessor(a));d.setHtml(c.toHtml(b), {fixForBody:!1});return 1<d.getChildCount()?null:d.findOne('table'); 
}, pasteTable:function(a, b, c){
 let d, e=u(a.cells.first), f=a._getTable(), g={}, h, k, l, m;for(l=0;l<c.length;l++)for(h=new CKEDITOR.dom.element(f.$.rows[a.rows.first.$.rowIndex+l]), m=0;m<c[l].length;m++)if(k=new CKEDITOR.dom.element(c[l][m]), d=b[l]&&b[l][m]?new CKEDITOR.dom.element(b[l][m]):null, k&&!k.getCustomData('processed')){
 if(d&&
    d.getParent())k.replace(d);else if(0===m||c[l][m-1])(d=0!==m?new CKEDITOR.dom.element(c[l][m-1]):null)&&h.equals(d.getParent())?k.insertAfter(d):0<e?h.$.cells[e]?k.insertAfter(new CKEDITOR.dom.element(h.$.cells[e])):h.append(k):h.append(k, !0);CKEDITOR.dom.element.setMarker(g, k, 'processed', !0); 
}else k.getCustomData('processed')&&d&&d.remove();CKEDITOR.dom.element.clearAllMarkers(g); 
}};CKEDITOR.plugins.tableselection={getCellsBetween:h, keyboardIntegration:function(a){
 function b(a){
 const c=a.getEnclosedNode();
    c&&'function'===typeof c.is&&c.is({td:1, th:1})?c.setText(''):a.deleteContents();CKEDITOR.tools.array.forEach(a._find('td'), function(a){
 a.appendBogus(); 
}); 
}const c=a.editable();c.attachListener(c, 'keydown', function(a){
 function c(b, d){
 if(!d.length)return null;const f=a.createRange(), g=CKEDITOR.dom.range.mergeRanges(d);CKEDITOR.tools.array.forEach(g, function(a){
 a.enlarge(CKEDITOR.ENLARGE_ELEMENT); 
});var h=g[0].getBoundaryNodes(), k=h.startNode, h=h.endNode;if(k&&k.is&&k.is(e)){
 for(var l=k.getAscendant('table',
    !0), m=k.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, l), n=!1, p=function(a){
 return!k.contains(a)&&a.is&&a.is('td', 'th'); 
};m&&!p(m);)m=m.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, l);!m&&h&&h.is&&!h.is('table')&&h.getNext()&&(m=h.getNext().findOne('td, th'), n=!0);if(m)f[`moveToElementEdit${n?'Start':'End'}`](m);else f.setStartBefore(k.getAscendant('table', !0)), f.collapse(!0);g[0].deleteContents();return[f]; 
}if(k)return f.moveToElementEditablePosition(k), [f]; 
}var d={37:1, 38:1, 39:1, 40:1, 8:1, 46:1, 13:1},
    e=CKEDITOR.tools.extend({table:1}, CKEDITOR.dtd.$tableContent);delete e.td;delete e.th;return function(e){
 let f=e.data.getKey(), g=e.data.getKeystroke(), h, k=37===f||38==f, l, m, n;if(d[f]&&!a.readOnly&&(h=a.getSelection())&&h.isInTable()&&h.isFake){
 l=h.getRanges();m=l[0]._getTableElement();n=l[l.length-1]._getTableElement();if(13!==f||a.plugins.enterkey)e.data.preventDefault(), e.cancel();if(36<f&&41>f)l[0].moveToElementEditablePosition(k?m:n, !k), h.selectRanges([l[0]]);else if(13!==f||13===g||g===CKEDITOR.SHIFT+
    13){
 for(e=0;e<l.length;e++)b(l[e]);(e=c(m, l))?l=e:l[0].moveToElementEditablePosition(m);h.selectRanges(l);13===f&&a.plugins.enterkey?(a.fire('lockSnapshot'), 13===g?a.execCommand('enter'):a.execCommand('shiftEnter'), a.fire('unlockSnapshot'), a.fire('saveSnapshot')):13!==f&&a.fire('saveSnapshot'); 
} 
} 
}; 
}(a), null, null, -1);c.attachListener(c, 'keypress', function(c){
 let d=a.getSelection(), e=c.data.$.charCode||13===c.data.getKey(), f;if(!a.readOnly&&d&&d.isInTable()&&d.isFake&&e&&!(c.data.getKeystroke()&CKEDITOR.CTRL)){
 c=
    d.getRanges();e=c[0].getEnclosedNode().getAscendant({td:1, th:1}, !0);for(f=0;f<c.length;f++)b(c[f]);e&&(c[0].moveToElementEditablePosition(e), d.selectRanges([c[0]])); 
} 
}, null, null, -1); 
}};CKEDITOR.plugins.add('tableselection', {requires:'clipboard,tabletools', isSupportedEnvironment:function(){
 return!(CKEDITOR.env.ie&&11>CKEDITOR.env.version); 
}, onLoad:function(){
 v=CKEDITOR.plugins.tabletools;w=v.getSelectedCells;u=v.getCellColIndex;A=v.insertRow;r=v.insertColumn;CKEDITOR.document.appendStyleSheet(`${this.path
    }styles/tableselection.css`); 
}, init:function(b){
 this.isSupportedEnvironment()&&(b.addContentsCss&&b.addContentsCss(`${this.path}styles/tableselection.css`), b.on('contentDom', function(){
 const a=b.editable(), c=a.isInline()?a:b.document, f={editor:b};a.attachListener(c, 'mousedown', d, null, f);a.attachListener(c, 'mousemove', d, null, f);a.attachListener(c, 'mouseup', d, null, f);a.attachListener(a, 'dragstart', e);a.attachListener(b, 'selectionCheck', l);CKEDITOR.plugins.tableselection.keyboardIntegration(b);CKEDITOR.plugins.clipboard&&
    !CKEDITOR.plugins.clipboard.isCustomCopyCutSupported&&(a.attachListener(a, 'cut', t), a.attachListener(a, 'copy', t)); 
}), b.on('paste', y.onPaste, y), p(b, 'rowInsertBefore rowInsertAfter columnInsertBefore columnInsertAfter cellInsertBefore cellInsertAfter'.split(' '), function(a, b){
 f(a, b.selectedCells); 
}), p(b, ['cellMerge', 'cellMergeRight', 'cellMergeDown'], function(a, b){
 f(a, [b.commandData.cell]); 
}), p(b, ['cellDelete'], function(b){
 a(b, !0); 
})); 
}}); 
}(), function(){
 CKEDITOR.plugins.add('templates', {requires:'dialog', init:function(c){
 CKEDITOR.dialog.add('templates',
    CKEDITOR.getUrl(`${this.path}dialogs/templates.js`));c.addCommand('templates', new CKEDITOR.dialogCommand('templates'));c.ui.addButton&&c.ui.addButton('Templates', {label:c.lang.templates.button, command:'templates', toolbar:'doctools,10'}); 
}});const c={}, h={};CKEDITOR.addTemplates=function(g, a){
 c[g]=a; 
};CKEDITOR.getTemplates=function(g){
 return c[g]; 
};CKEDITOR.loadTemplates=function(c, a){
 for(var f=[], m=0, k=c.length;m<k;m++)h[c[m]]||(f.push(c[m]), h[c[m]]=1);f.length?CKEDITOR.scriptLoader.load(f, a):setTimeout(a,
    0); 
}; 
}(), CKEDITOR.config.templates_files=[CKEDITOR.getUrl('plugins/templates/templates/default.js')], CKEDITOR.config.templates_replaceContent=!0, 'use strict', function(){
 function c(a, c){
 return CKEDITOR.tools.array.reduce(c, function(a, b){
 return b(a); 
}, a); 
}const h=[CKEDITOR.CTRL+90, CKEDITOR.CTRL+89, CKEDITOR.CTRL+CKEDITOR.SHIFT+90], g={8:1, 46:1};CKEDITOR.plugins.add('undo', {init:function(b){
 function c(a){
 f.enabled&&!1!==a.data.command.canUndo&&f.save(); 
}function e(){
 f.enabled=b.readOnly?!1:'wysiwyg'==b.mode;
    f.onChange(); 
}var f=b.undoManager=new a(b), g=f.editingHandler=new k(f), l=b.addCommand('undo', {exec:function(){
 f.undo()&&(b.selectionChange(), this.fire('afterUndo')); 
}, startDisabled:!0, canUndo:!1}), m=b.addCommand('redo', {exec:function(){
 f.redo()&&(b.selectionChange(), this.fire('afterRedo')); 
}, startDisabled:!0, canUndo:!1});b.setKeystroke([[h[0], 'undo'], [h[1], 'redo'], [h[2], 'redo']]);f.onChange=function(){
 l.setState(f.undoable()?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);m.setState(f.redoable()?CKEDITOR.TRISTATE_OFF:
    CKEDITOR.TRISTATE_DISABLED); 
};b.on('beforeCommandExec', c);b.on('afterCommandExec', c);b.on('saveSnapshot', function(a){
 f.save(a.data&&a.data.contentOnly); 
});b.on('contentDom', g.attachListeners, g);b.on('instanceReady', function(){
 b.fire('saveSnapshot'); 
});b.on('beforeModeUnload', function(){
 'wysiwyg'==b.mode&&f.save(!0); 
});b.on('mode', e);b.on('readOnly', e);b.ui.addButton&&(b.ui.addButton('Undo', {label:b.lang.undo.undo, command:'undo', toolbar:'undo,10'}), b.ui.addButton('Redo', {label:b.lang.undo.redo, command:'redo',
    toolbar:'undo,20'}));b.resetUndo=function(){
 f.reset();b.fire('saveSnapshot'); 
};b.on('updateSnapshot', function(){
 f.currentImage&&f.update(); 
});b.on('lockSnapshot', function(a){
 a=a.data;f.lock(a&&a.dontUpdate, a&&a.forceUpdate); 
});b.on('unlockSnapshot', f.unlock, f); 
}});CKEDITOR.plugins.undo={};var a=CKEDITOR.plugins.undo.UndoManager=function(a){
 this.strokesRecorded=[0, 0];this.locked=null;this.previousKeyGroup=-1;this.limit=a.config.undoStackSize||20;this.strokesLimit=25;this._filterRules=[];this.editor=a;
    this.reset();CKEDITOR.env.ie&&this.addFilterRule(function(a){
 return a.replace(/\s+data-cke-expando=".*?"/g, ''); 
}); 
};a.prototype={type:function(b, c){
 let e=a.getKeyGroup(b), f=this.strokesRecorded[e]+1;c=c||f>=this.strokesLimit;this.typing||(this.hasUndo=this.typing=!0, this.hasRedo=!1, this.onChange());c?(f=0, this.editor.fire('saveSnapshot')):this.editor.fire('change');this.strokesRecorded[e]=f;this.previousKeyGroup=e; 
}, keyGroupChanged:function(b){
 return a.getKeyGroup(b)!=this.previousKeyGroup; 
}, reset:function(){
 this.snapshots=
    [];this.index=-1;this.currentImage=null;this.hasRedo=this.hasUndo=!1;this.locked=null;this.resetType(); 
}, resetType:function(){
 this.strokesRecorded=[0, 0];this.typing=!1;this.previousKeyGroup=-1; 
}, refreshState:function(){
 this.hasUndo=!!this.getNextImage(!0);this.hasRedo=!!this.getNextImage(!1);this.resetType();this.onChange(); 
}, save:function(a, c, e){
 const g=this.editor;if(this.locked||'ready'!=g.status||'wysiwyg'!=g.mode)return!1;let h=g.editable();if(!h||'ready'!=h.status)return!1;h=this.snapshots;c||(c=
    new f(g));if(!1===c.contents)return!1;if(this.currentImage)if(c.equalsContent(this.currentImage)){
 if(a||c.equalsSelection(this.currentImage))return!1; 
}else!1!==e&&g.fire('change');h.splice(this.index+1, h.length-this.index-1);h.length==this.limit&&h.shift();this.index=h.push(c)-1;this.currentImage=c;!1!==e&&this.refreshState();return!0; 
}, restoreImage:function(a){
 let c=this.editor, e;a.bookmarks&&(c.focus(), e=c.getSelection());this.locked={level:999};this.editor.loadSnapshot(a.contents);a.bookmarks?e.selectBookmarks(a.bookmarks):
    CKEDITOR.env.ie&&(e=this.editor.document.getBody().$.createTextRange(), e.collapse(!0), e.select());this.locked=null;this.index=a.index;this.currentImage=this.snapshots[this.index];this.update();this.refreshState();c.fire('change'); 
}, getNextImage:function(a){
 let c=this.snapshots, e=this.currentImage, f;if(e)if(a)for(f=this.index-1;0<=f;f--){
 if(a=c[f], !e.equalsContent(a))return a.index=f, a; 
}else for(f=this.index+1;f<c.length;f++)if(a=c[f], !e.equalsContent(a))return a.index=f, a;return null; 
}, redoable:function(){
 return this.enabled&&
    this.hasRedo; 
}, undoable:function(){
 return this.enabled&&this.hasUndo; 
}, undo:function(){
 if(this.undoable()){
 this.save(!0);const a=this.getNextImage(!0);if(a)return this.restoreImage(a), !0; 
}return!1; 
}, redo:function(){
 if(this.redoable()&&(this.save(!0), this.redoable())){
 const a=this.getNextImage(!1);if(a)return this.restoreImage(a), !0; 
}return!1; 
}, update:function(a){
 if(!this.locked){
 a||(a=new f(this.editor));for(var c=this.index, e=this.snapshots;0<c&&this.currentImage.equalsContent(e[c-1]);)--c;e.splice(c, this.index-
    c+1, a);this.index=c;this.currentImage=a; 
} 
}, updateSelection:function(a){
 if(!this.snapshots.length)return!1;const c=this.snapshots, e=c[c.length-1];return e.equalsContent(a)&&!e.equalsSelection(a)?(this.currentImage=c[c.length-1]=a, !0):!1; 
}, lock:function(a, c){
 if(this.locked)this.locked.level++;else if(a)this.locked={level:1};else{
 let e=null;if(c)e=!0;else{
 const g=new f(this.editor, !0);this.currentImage&&this.currentImage.equalsContent(g)&&(e=g); 
}this.locked={update:e, level:1}; 
} 
}, unlock:function(){
 if(this.locked&&
    !--this.locked.level){
 const a=this.locked.update;this.locked=null;if(!0===a)this.update();else if(a){
 const c=new f(this.editor, !0);a.equalsContent(c)||this.update(); 
} 
} 
}, addFilterRule:function(a){
 this._filterRules.push(a); 
}};a.navigationKeyCodes={37:1, 38:1, 39:1, 40:1, 36:1, 35:1, 33:1, 34:1};a.keyGroups={PRINTABLE:0, FUNCTIONAL:1};a.isNavigationKey=function(b){
 return!!a.navigationKeyCodes[b]; 
};a.getKeyGroup=function(b){
 const c=a.keyGroups;return g[b]?c.FUNCTIONAL:c.PRINTABLE; 
};a.getOppositeKeyGroup=function(b){
 const c=
    a.keyGroups;return b==c.FUNCTIONAL?c.PRINTABLE:c.FUNCTIONAL; 
};a.ieFunctionalKeysBug=function(b){
 return CKEDITOR.env.ie&&a.getKeyGroup(b)==a.keyGroups.FUNCTIONAL; 
};var f=CKEDITOR.plugins.undo.Image=function(a, d){
 this.editor=a;a.fire('beforeUndoImage');let e=a.getSnapshot();e&&(this.contents=c(e, a.undoManager._filterRules));d||(this.bookmarks=(e=e&&a.getSelection())&&e.createBookmarks2(!0));a.fire('afterUndoImage'); 
}, m=/\b(?:href|src|name)="[^"]*?"/gi;f.prototype={equalsContent:function(a){
 let c=this.contents;
    a=a.contents;CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)&&(c=c.replace(m, ''), a=a.replace(m, ''));return c!=a?!1:!0; 
}, equalsSelection:function(a){
 const c=this.bookmarks;a=a.bookmarks;if(c||a){
 if(!c||!a||c.length!=a.length)return!1;for(let e=0;e<c.length;e++){
 const f=c[e], g=a[e];if(f.startOffset!=g.startOffset||f.endOffset!=g.endOffset||!CKEDITOR.tools.arrayCompare(f.start, g.start)||!CKEDITOR.tools.arrayCompare(f.end, g.end))return!1; 
} 
}return!0; 
}};var k=CKEDITOR.plugins.undo.NativeEditingHandler=
    function(a){
 this.undoManager=a;this.ignoreInputEvent=!1;this.keyEventsStack=new l;this.lastKeydownImage=null; 
};k.prototype={onKeydown:function(b){
 const c=b.data.getKey();if(229!==c)if(-1<CKEDITOR.tools.indexOf(h, b.data.getKeystroke()))b.data.preventDefault();else if(this.keyEventsStack.cleanUp(b), b=this.undoManager, this.keyEventsStack.getLast(c)||this.keyEventsStack.push(c), this.lastKeydownImage=new f(b.editor), a.isNavigationKey(c)||this.undoManager.keyGroupChanged(c))if(b.strokesRecorded[0]||b.strokesRecorded[1])b.save(!1,
    this.lastKeydownImage, !1), b.resetType(); 
}, onInput:function(){
 if(this.ignoreInputEvent)this.ignoreInputEvent=!1;else{
 let a=this.keyEventsStack.getLast();a||(a=this.keyEventsStack.push(0));this.keyEventsStack.increment(a.keyCode);this.keyEventsStack.getTotalInputs()>=this.undoManager.strokesLimit&&(this.undoManager.type(a.keyCode, !0), this.keyEventsStack.resetInputs()); 
} 
}, onKeyup:function(b){
 const c=this.undoManager;b=b.data.getKey();const e=this.keyEventsStack.getTotalInputs();this.keyEventsStack.remove(b);
    if(!(a.ieFunctionalKeysBug(b)&&this.lastKeydownImage&&this.lastKeydownImage.equalsContent(new f(c.editor, !0))))if(0<e)c.type(b);else if(a.isNavigationKey(b))this.onNavigationKey(!0); 
}, onNavigationKey:function(a){
 const c=this.undoManager;!a&&c.save(!0, null, !1)||c.updateSelection(new f(c.editor));c.resetType(); 
}, ignoreInputEventListener:function(){
 this.ignoreInputEvent=!0; 
}, activateInputEventListener:function(){
 this.ignoreInputEvent=!1; 
}, attachListeners:function(){
 const b=this.undoManager.editor, c=b.editable(),
    e=this;c.attachListener(c, 'keydown', function(b){
 e.onKeydown(b);if(a.ieFunctionalKeysBug(b.data.getKey()))e.onInput(); 
}, null, null, 999);c.attachListener(c, CKEDITOR.env.ie?'keypress':'input', e.onInput, e, null, 999);c.attachListener(c, 'keyup', e.onKeyup, e, null, 999);c.attachListener(c, 'paste', e.ignoreInputEventListener, e, null, 999);c.attachListener(c, 'drop', e.ignoreInputEventListener, e, null, 999);b.on('afterPaste', e.activateInputEventListener, e, null, 999);c.attachListener(c.isInline()?c:b.document.getDocumentElement(),
    'click', function(){
 e.onNavigationKey(); 
}, null, null, 999);c.attachListener(this.undoManager.editor, 'blur', function(){
 e.keyEventsStack.remove(9); 
}, null, null, 999); 
}};var l=CKEDITOR.plugins.undo.KeyEventsStack=function(){
 this.stack=[]; 
};l.prototype={push:function(a){
 a=this.stack.push({keyCode:a, inputs:0});return this.stack[a-1]; 
}, getLastIndex:function(a){
 if('number'!==typeof a)return this.stack.length-1;for(let c=this.stack.length;c--;)if(this.stack[c].keyCode==a)return c;return-1; 
}, getLast:function(a){
 a=this.getLastIndex(a);
    return-1!=a?this.stack[a]:null; 
}, increment:function(a){
 this.getLast(a).inputs++; 
}, remove:function(a){
 a=this.getLastIndex(a);-1!=a&&this.stack.splice(a, 1); 
}, resetInputs:function(a){
 if('number'===typeof a)this.getLast(a).inputs=0;else for(a=this.stack.length;a--;)this.stack[a].inputs=0; 
}, getTotalInputs:function(){
 for(var a=this.stack.length, c=0;a--;)c+=this.stack[a].inputs;return c; 
}, cleanUp:function(a){
 a=a.data.$;a.ctrlKey||a.metaKey||this.remove(17);a.shiftKey||this.remove(16);a.altKey||this.remove(18); 
}}; 
}(),
    'use strict', function(){
 function c(a, c){
 CKEDITOR.tools.extend(this, {editor:a, editable:a.editable(), doc:a.document, win:a.window}, c, !0);this.inline=this.editable.isInline();this.inline||(this.frame=this.win.getFrame());this.target=this[this.inline?'editable':'doc']; 
}function h(a, c){
 CKEDITOR.tools.extend(this, c, {editor:a}, !0); 
}function g(a, c){
 const e=a.editable();CKEDITOR.tools.extend(this, {editor:a, editable:e, inline:e.isInline(), doc:a.document, win:a.window, container:CKEDITOR.document.getBody(), winTop:CKEDITOR.document.getWindow()},
    c, !0);this.hidden={};this.visible={};this.inline||(this.frame=this.win.getFrame());this.queryViewport();const g=CKEDITOR.tools.bind(this.queryViewport, this), h=CKEDITOR.tools.bind(this.hideVisible, this), k=CKEDITOR.tools.bind(this.removeAll, this);e.attachListener(this.winTop, 'resize', g);e.attachListener(this.winTop, 'scroll', g);e.attachListener(this.winTop, 'resize', h);e.attachListener(this.win, 'scroll', h);e.attachListener(this.inline?e:this.frame, 'mouseout', function(a){
 const b=a.data.$.clientX;a=a.data.$.clientY;
    this.queryViewport();(b<=this.rect.left||b>=this.rect.right||a<=this.rect.top||a>=this.rect.bottom)&&this.hideVisible();(0>=b||b>=this.winTopPane.width||0>=a||a>=this.winTopPane.height)&&this.hideVisible(); 
}, this);e.attachListener(a, 'resize', g);e.attachListener(a, 'mode', k);a.on('destroy', k);this.lineTpl=(new CKEDITOR.template('\x3cdiv data-cke-lineutils-line\x3d"1" class\x3d"cke_reset_all" style\x3d"{lineStyle}"\x3e\x3cspan style\x3d"{tipLeftStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3cspan style\x3d"{tipRightStyle}"\x3e\x26nbsp;\x3c/span\x3e\x3c/div\x3e')).output({lineStyle:CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({},
    m, this.lineStyle, !0)), tipLeftStyle:CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({}, f, {left:'0px', 'border-left-color':'red', 'border-width':'6px 0 6px 6px'}, this.tipCss, this.tipLeftStyle, !0)), tipRightStyle:CKEDITOR.tools.writeCssText(CKEDITOR.tools.extend({}, f, {right:'0px', 'border-right-color':'red', 'border-width':'6px 6px 6px 0'}, this.tipCss, this.tipRightStyle, !0))}); 
}function a(a){
 let c;if(c=a&&a.type==CKEDITOR.NODE_ELEMENT)c=!(k[a.getComputedStyle('float')]||k[a.getAttribute('align')]);return c&&
    !l[a.getComputedStyle('position')]; 
}CKEDITOR.plugins.add('lineutils');CKEDITOR.LINEUTILS_BEFORE=1;CKEDITOR.LINEUTILS_AFTER=2;CKEDITOR.LINEUTILS_INSIDE=4;c.prototype={start:function(a){
 let c=this, e=this.editor, f=this.doc, g, h, k, l, m=CKEDITOR.tools.eventsBuffer(50, function(){
 e.readOnly||'wysiwyg'!=e.mode||(c.relations={}, (h=f.$.elementFromPoint(k, l))&&h.nodeType&&(g=new CKEDITOR.dom.element(h), c.traverseSearch(g), isNaN(k+l)||c.pixelSearch(g, k, l), a&&a(c.relations, k, l))); 
});this.listener=this.editable.attachListener(this.target,
    'mousemove', function(a){
 k=a.data.$.clientX;l=a.data.$.clientY;m.input(); 
});this.editable.attachListener(this.inline?this.editable:this.frame, 'mouseout', function(){
 m.reset(); 
}); 
}, stop:function(){
 this.listener&&this.listener.removeListener(); 
}, getRange:function(){
 const a={};a[CKEDITOR.LINEUTILS_BEFORE]=CKEDITOR.POSITION_BEFORE_START;a[CKEDITOR.LINEUTILS_AFTER]=CKEDITOR.POSITION_AFTER_END;a[CKEDITOR.LINEUTILS_INSIDE]=CKEDITOR.POSITION_AFTER_START;return function(c){
 const e=this.editor.createRange();e.moveToPosition(this.relations[c.uid].element,
    a[c.type]);return e; 
}; 
}(), store:function(){
 function b(a, b, c){
 const f=a.getUniqueId();f in c?c[f].type|=b:c[f]={element:a, type:b}; 
}return function(c, e){
 let f;e&CKEDITOR.LINEUTILS_AFTER&&a(f=c.getNext())&&f.isVisible()&&(b(f, CKEDITOR.LINEUTILS_BEFORE, this.relations), e^=CKEDITOR.LINEUTILS_AFTER);e&CKEDITOR.LINEUTILS_INSIDE&&a(f=c.getFirst())&&f.isVisible()&&(b(f, CKEDITOR.LINEUTILS_BEFORE, this.relations), e^=CKEDITOR.LINEUTILS_INSIDE);b(c, e, this.relations); 
}; 
}(), traverseSearch:function(b){
 let c, e, f;do if(f=b.$['data-cke-expando'],
    !(f&&f in this.relations)){
 if(b.equals(this.editable))break;if(a(b))for(c in this.lookups)(e=this.lookups[c](b))&&this.store(b, e); 
}while((!b||b.type!=CKEDITOR.NODE_ELEMENT||'true'!=b.getAttribute('contenteditable'))&&(b=b.getParent())); 
}, pixelSearch:function(){
 function b(b, f, g, h, k){
 for(var l=0, m;k(g);){
 g+=h;if(25==++l)break;if(m=this.doc.$.elementFromPoint(f, g))if(m==b)l=0;else if(c(b, m)&&(l=0, a(m=new CKEDITOR.dom.element(m))))return m; 
} 
}var c=CKEDITOR.env.ie||CKEDITOR.env.webkit?function(a, b){
 return a.contains(b); 
}:
    function(a, b){
 return!!(a.compareDocumentPosition(b)&16); 
};return function(c, d, f){
 let g=this.win.getViewPaneSize().height, h=b.call(this, c.$, d, f, -1, function(a){
 return 0<a; 
});d=b.call(this, c.$, d, f, 1, function(a){
 return a<g; 
});if(h)for(this.traverseSearch(h);!h.getParent().equals(c);)h=h.getParent();if(d)for(this.traverseSearch(d);!d.getParent().equals(c);)d=d.getParent();for(;h||d;){
 h&&(h=h.getNext(a));if(!h||h.equals(d))break;this.traverseSearch(h);d&&(d=d.getPrevious(a));if(!d||d.equals(h))break;this.traverseSearch(d); 
} 
}; 
}(),
    greedySearch:function(){
 this.relations={};for(var b=this.editable.getElementsByTag('*'), c=0, e, f, g;e=b.getItem(c++);)if(!e.equals(this.editable)&&e.type==CKEDITOR.NODE_ELEMENT&&(e.hasAttribute('contenteditable')||!e.isReadOnly())&&a(e)&&e.isVisible())for(g in this.lookups)(f=this.lookups[g](e))&&this.store(e, f);return this.relations; 
}};h.prototype={locate:function(){
 function b(b, c){
 const f=b.element[c===CKEDITOR.LINEUTILS_BEFORE?'getPrevious':'getNext']();return f&&a(f)?(b.siblingRect=f.getClientRect(),
    c==CKEDITOR.LINEUTILS_BEFORE?(b.siblingRect.bottom+b.elementRect.top)/2:(b.elementRect.bottom+b.siblingRect.top)/2):c==CKEDITOR.LINEUTILS_BEFORE?b.elementRect.top:b.elementRect.bottom; 
}return function(a){
 let c;this.locations={};for(const f in a)c=a[f], c.elementRect=c.element.getClientRect(), c.type&CKEDITOR.LINEUTILS_BEFORE&&this.store(f, CKEDITOR.LINEUTILS_BEFORE, b(c, CKEDITOR.LINEUTILS_BEFORE)), c.type&CKEDITOR.LINEUTILS_AFTER&&this.store(f, CKEDITOR.LINEUTILS_AFTER, b(c, CKEDITOR.LINEUTILS_AFTER)), c.type&
    CKEDITOR.LINEUTILS_INSIDE&&this.store(f, CKEDITOR.LINEUTILS_INSIDE, (c.elementRect.top+c.elementRect.bottom)/2);return this.locations; 
}; 
}(), sort:function(){
 let a, c, e, f;return function(g, h){
 a=this.locations;c=[];for(const k in a)for(const l in a[k])if(e=Math.abs(g-a[k][l]), c.length){
 for(f=0;f<c.length;f++)if(e<c[f].dist){
 c.splice(f, 0, {uid:+k, type:l, dist:e});break; 
}f==c.length&&c.push({uid:+k, type:l, dist:e}); 
}else c.push({uid:+k, type:l, dist:e});return'undefined'!==typeof h?c.slice(0, h):c; 
}; 
}(), store:function(a,
    c, e){
 this.locations[a]||(this.locations[a]={});this.locations[a][c]=e; 
}};var f={display:'block', width:'0px', height:'0px', 'border-color':'transparent', 'border-style':'solid', position:'absolute', top:'-6px'}, m={height:'0px', 'border-top':'1px dashed red', position:'absolute', 'z-index':9999};g.prototype={removeAll:function(){
 for(var a in this.hidden)this.hidden[a].remove(), delete this.hidden[a];for(a in this.visible)this.visible[a].remove(), delete this.visible[a]; 
}, hideLine:function(a){
 const c=a.getUniqueId();
    a.hide();this.hidden[c]=a;delete this.visible[c]; 
}, showLine:function(a){
 const c=a.getUniqueId();a.show();this.visible[c]=a;delete this.hidden[c]; 
}, hideVisible:function(){
 for(const a in this.visible)this.hideLine(this.visible[a]); 
}, placeLine:function(a, c){
 let e, f, g;if(e=this.getStyle(a.uid, a.type)){
 for(g in this.visible)if(this.visible[g].getCustomData('hash')!==this.hash){
 f=this.visible[g];break; 
}if(!f)for(g in this.hidden)if(this.hidden[g].getCustomData('hash')!==this.hash){
 this.showLine(f=this.hidden[g]);
    break; 
}f||this.showLine(f=this.addLine());f.setCustomData('hash', this.hash);this.visible[f.getUniqueId()]=f;f.setStyles(e);c&&c(f); 
} 
}, getStyle:function(a, c){
 let e=this.relations[a], f=this.locations[a][c], g={};g.width=e.siblingRect?Math.max(e.siblingRect.width, e.elementRect.width):e.elementRect.width;g.top=this.inline?f+this.winTopScroll.y-this.rect.relativeY:this.rect.top+this.winTopScroll.y+f;if(g.top-this.winTopScroll.y<this.rect.top||g.top-this.winTopScroll.y>this.rect.bottom)return!1;this.inline?
    g.left=e.elementRect.left-this.rect.relativeX:(0<e.elementRect.left?g.left=this.rect.left+e.elementRect.left:(g.width+=e.elementRect.left, g.left=this.rect.left), 0<(e=g.left+g.width-(this.rect.left+this.winPane.width))&&(g.width-=e));g.left+=this.winTopScroll.x;for(const h in g)g[h]=CKEDITOR.tools.cssLength(g[h]);return g; 
}, addLine:function(){
 const a=CKEDITOR.dom.element.createFromHtml(this.lineTpl);a.appendTo(this.container);return a; 
}, prepare:function(a, c){
 this.relations=a;this.locations=c;this.hash=Math.random(); 
},
    cleanup:function(){
 let a, c;for(c in this.visible)a=this.visible[c], a.getCustomData('hash')!==this.hash&&this.hideLine(a); 
}, queryViewport:function(){
 this.winPane=this.win.getViewPaneSize();this.winTopScroll=this.winTop.getScrollPosition();this.winTopPane=this.winTop.getViewPaneSize();this.rect=this.getClientRect(this.inline?this.editable:this.frame); 
}, getClientRect:function(a){
 a=a.getClientRect();const c=this.container.getDocumentPosition(), e=this.container.getComputedStyle('position');a.relativeX=a.relativeY=
    0;'static'!=e&&(a.relativeY=c.y, a.relativeX=c.x, a.top-=a.relativeY, a.bottom-=a.relativeY, a.left-=a.relativeX, a.right-=a.relativeX);return a; 
}};var k={left:1, right:1, center:1}, l={absolute:1, fixed:1};CKEDITOR.plugins.lineutils={finder:c, locator:h, liner:g}; 
}(), function(){
 function c(c){
 return c.getName&&!c.hasAttribute('data-cke-temp'); 
}CKEDITOR.plugins.add('widgetselection', {init:function(c){
 if(CKEDITOR.env.webkit){
 const g=CKEDITOR.plugins.widgetselection;c.on('contentDom', function(a){
 a=a.editor;const c=a.editable();
    c.attachListener(c, 'keydown', function(a){
 a.data.getKeystroke()==CKEDITOR.CTRL+65&&CKEDITOR.tools.setTimeout(function(){
 g.addFillers(c)||g.removeFillers(c); 
}, 0); 
}, null, null, -1);a.on('selectionCheck', function(a){
 g.removeFillers(a.editor.editable()); 
});a.on('paste', function(a){
 a.data.dataValue=g.cleanPasteData(a.data.dataValue); 
});'selectall'in a.plugins&&g.addSelectAllIntegration(a); 
}); 
} 
}});CKEDITOR.plugins.widgetselection={startFiller:null, endFiller:null, fillerAttribute:'data-cke-filler-webkit', fillerContent:'\x26nbsp;',
    fillerTagName:'div', addFillers:function(h){
 let g=h.editor;if(!this.isWholeContentSelected(h)&&0<h.getChildCount()){
 const a=h.getFirst(c), f=h.getLast(c);a&&a.type==CKEDITOR.NODE_ELEMENT&&!a.isEditable()&&(this.startFiller=this.createFiller(), h.append(this.startFiller, 1));f&&f.type==CKEDITOR.NODE_ELEMENT&&!f.isEditable()&&(this.endFiller=this.createFiller(!0), h.append(this.endFiller, 0));if(this.hasFiller(h))return g=g.createRange(), g.selectNodeContents(h), g.select(), !0; 
}return!1; 
}, removeFillers:function(c){
 if(this.hasFiller(c)&&
    !this.isWholeContentSelected(c)){
 const g=c.findOne(`${this.fillerTagName}[${this.fillerAttribute}\x3dstart]`), a=c.findOne(`${this.fillerTagName}[${this.fillerAttribute}\x3dend]`);this.startFiller&&g&&this.startFiller.equals(g)?this.removeFiller(this.startFiller, c):this.startFiller=g;this.endFiller&&a&&this.endFiller.equals(a)?this.removeFiller(this.endFiller, c):this.endFiller=a; 
} 
}, cleanPasteData:function(c){
 c&&c.length&&(c=c.replace(this.createFillerRegex(), '').replace(this.createFillerRegex(!0), ''));
    return c; 
}, isWholeContentSelected:function(c){
 let g=c.editor.getSelection().getRanges()[0];return!g||g&&g.collapsed?!1:(g=g.clone(), g.enlarge(CKEDITOR.ENLARGE_ELEMENT), !!(g&&c&&g.startContainer&&g.endContainer&&0===g.startOffset&&g.endOffset===c.getChildCount()&&g.startContainer.equals(c)&&g.endContainer.equals(c))); 
}, hasFiller:function(c){
 return 0<c.find(`${this.fillerTagName}[${this.fillerAttribute}]`).count(); 
}, createFiller:function(c){
 const g=new CKEDITOR.dom.element(this.fillerTagName);g.setHtml(this.fillerContent);
    g.setAttribute(this.fillerAttribute, c?'end':'start');g.setAttribute('data-cke-temp', 1);g.setStyles({display:'block', width:0, height:0, padding:0, border:0, margin:0, position:'absolute', top:0, left:'-9999px', opacity:0, overflow:'hidden'});return g; 
}, removeFiller:function(c, g){
 if(c){
 let a=g.editor, f=g.editor.getSelection().getRanges()[0].startPath(), m=a.createRange(), k, l;f.contains(c)&&(k=c.getHtml(), l=!0);f='start'==c.getAttribute(this.fillerAttribute);c.remove();k&&0<k.length&&k!=this.fillerContent?(g.insertHtmlIntoRange(k,
    a.getSelection().getRanges()[0]), m.setStartAt(g.getChild(g.getChildCount()-1), CKEDITOR.POSITION_BEFORE_END), a.getSelection().selectRanges([m])):l&&(f?m.setStartAt(g.getFirst().getNext(), CKEDITOR.POSITION_AFTER_START):m.setEndAt(g.getLast().getPrevious(), CKEDITOR.POSITION_BEFORE_END), g.editor.getSelection().selectRanges([m])); 
} 
}, createFillerRegex:function(c){
 const g=this.createFiller(c).getOuterHtml().replace(/style="[^"]*"/gi, 'style\x3d"[^"]*"').replace(/>[^<]*</gi, '\x3e[^\x3c]*\x3c');return new RegExp((c?
    '':'^')+g+(c?'$':'')); 
}, addSelectAllIntegration:function(c){
 const g=this;c.editable().attachListener(c, 'beforeCommandExec', function(a){
 const f=c.editable();'selectAll'==a.data.name&&f&&g.addFillers(f); 
}, null, null, 9999); 
}}; 
}(), 'use strict', function(){
 function c(a){
 this.editor=a;this.registered={};this.instances={};this.selected=[];this.widgetHoldingFocusedEditable=this.focused=null;this._={nextId:0, upcasts:[], upcastCallbacks:[], filters:{}};E(this);C(this);this.on('checkWidgets', k);this.editor.on('contentDomInvalidated',
    this.checkWidgets, this);B(this);r(this);y(this);A(this);z(this); 
}function h(a, b, c, d, e){
 const f=a.editor;CKEDITOR.tools.extend(this, d, {editor:f, id:b, inline:'span'==c.getParent().getName(), element:c, data:CKEDITOR.tools.extend({}, 'function'===typeof d.defaults?d.defaults():d.defaults), dataReady:!1, inited:!1, ready:!1, edit:h.prototype.edit, focusedEditable:null, definition:d, repository:a, draggable:!1!==d.draggable, _:{downcastFn:d.downcast&&'string'===typeof d.downcast?d.downcasts[d.downcast]:d.downcast}}, !0);
    a.fire('instanceCreated', this);H(this, d);this.init&&this.init();this.inited=!0;(a=this.element.data('cke-widget-data'))&&this.setData(JSON.parse(decodeURIComponent(a)));e&&this.setData(e);this.data.classes||this.setData('classes', this.getClasses());this.dataReady=!0;ca(this);this.fire('data', this.data);this.isInited()&&f.editable().contains(this.wrapper)&&(this.ready=!0, this.fire('ready')); 
}function g(a, b, c){
 CKEDITOR.dom.element.call(this, b.$);this.editor=a;this._={};b=this.filter=c.filter;CKEDITOR.dtd[this.getName()].p?
    (this.enterMode=b?b.getAllowedEnterMode(a.enterMode):a.enterMode, this.shiftEnterMode=b?b.getAllowedEnterMode(a.shiftEnterMode, !0):a.shiftEnterMode):this.enterMode=this.shiftEnterMode=CKEDITOR.ENTER_BR; 
}function a(a, b){
 a.addCommand(b.name, {exec:function(a, c){
 function d(){
 a.widgets.finalizeCreation(h); 
}var e=a.widgets.focused;if(e&&e.name==b.name)e.edit();else if(b.insert)b.insert({editor:a, commandData:c});else if(b.template){
 var e='function'===typeof b.defaults?b.defaults():b.defaults, e=CKEDITOR.dom.element.createFromHtml(b.template.output(e),
    a.document), f, g=a.widgets.wrapElement(e, b.name), h=new CKEDITOR.dom.documentFragment(g.getDocument());h.append(g);(f=a.widgets.initOn(e, b, c&&c.startupData))?(e=f.once('edit', function(b){
 if(b.data.dialog)f.once('dialog', function(b){
 b=b.data;let c, e;c=b.once('ok', d, null, null, 20);e=b.once('cancel', function(b){
 b.data&&!1===b.data.hide||a.widgets.destroy(f, !0); 
});b.once('hide', function(){
 c.removeListener();e.removeListener(); 
}); 
});else d(); 
}, null, null, 999), f.edit(), e.removeListener()):d(); 
} 
}, allowedContent:b.allowedContent,
    requiredContent:b.requiredContent, contentForms:b.contentForms, contentTransformations:b.contentTransformations}); 
}function f(a, b){
 function c(a, d){
 let e=b.upcast.split(','), f, g;for(g=0;g<e.length;g++)if(f=e[g], f===a.name)return b.upcasts[f].call(this, a, d);return!1; 
}function d(b, c, e){
 let f=CKEDITOR.tools.getIndex(a._.upcasts, function(a){
 return a[2]>e; 
});0>f&&(f=a._.upcasts.length);a._.upcasts.splice(f, 0, [CKEDITOR.tools.bind(b, c), c.name, e]); 
}const e=b.upcast, f=b.upcastPriority||10;e&&('string'===typeof e?d(c,
    b, f):d(e, b, f)); 
}function m(a, b){
 a.focused=null;if(b.isInited()){
 const c=b.editor.checkDirty();a.fire('widgetBlurred', {widget:b});b.setFocused(!1);!c&&b.editor.resetDirty(); 
} 
}function k(a){
 a=a.data;if('wysiwyg'==this.editor.mode){
 var b=this.editor.editable(), c=this.instances, d, e, f, g;if(b){
 for(d in c)c[d].isReady()&&!b.contains(c[d].wrapper)&&this.destroy(c[d], !0);if(a&&a.initOnlyNew)c=this.initOnAll();else{
 var k=b.find('.cke_widget_wrapper'), c=[];d=0;for(e=k.count();d<e;d++){
 f=k.getItem(d);if(g=!this.getByElement(f,
    !0)){
 a:{
 g=q;for(let l=f;l=l.getParent();)if(g(l)){
 g=!0;break a; 
}g=!1; 
}g=!g; 
}g&&b.contains(f)&&(f.addClass('cke_widget_new'), c.push(this.initOn(f.getFirst(h.isDomWidgetElement)))); 
} 
}a&&a.focusInited&&1==c.length&&c[0].focus(); 
} 
} 
}function l(a){
 if('undefined'!==typeof a.attributes&&a.attributes['data-widget']){
 let c=b(a), e=d(a), f=!1;c&&c.value&&c.value.match(/^\s/g)&&(c.parent.attributes['data-cke-white-space-first']=1, c.value=c.value.replace(/^\s/g, '\x26nbsp;'), f=!0);e&&e.value&&e.value.match(/\s$/g)&&(e.parent.attributes['data-cke-white-space-last']=
    1, e.value=e.value.replace(/\s$/g, '\x26nbsp;'), f=!0);f&&(a.attributes['data-cke-widget-white-space']=1); 
} 
}function b(a){
 return a.find(function(a){
 return 3===a.type; 
}, !0).shift(); 
}function d(a){
 return a.find(function(a){
 return 3===a.type; 
}, !0).pop(); 
}function e(a, b, c){
 if(!c.allowedContent&&!c.disallowedContent)return null;let d=this._.filters[a];d||(this._.filters[a]=d={});a=d[b];a||(a=c.allowedContent?new CKEDITOR.filter(c.allowedContent):this.editor.filter.clone(), d[b]=a, c.disallowedContent&&a.disallow(c.disallowedContent));
    return a; 
}function n(a){
 const b=[], c=a._.upcasts, d=a._.upcastCallbacks;return{toBeWrapped:b, iterator:function(a){
 let e, f, g, k, l;if('data-cke-widget-wrapper'in a.attributes)return(a=a.getFirst(h.isParserWidgetElement))&&b.push([a]), !1;if('data-widget'in a.attributes)return b.push([a]), !1;if(l=c.length){
 if(a.attributes['data-cke-widget-upcasted'])return!1;k=0;for(e=d.length;k<e;++k)if(!1===d[k](a))return;for(k=0;k<l;++k)if(e=c[k], g={}, f=e[0](a, g))return f instanceof CKEDITOR.htmlParser.element&&(a=f), a.attributes['data-cke-widget-data']=
    encodeURIComponent(JSON.stringify(g)), a.attributes['data-cke-widget-upcasted']=1, b.push([a, e[1]]), !1; 
} 
}}; 
}function t(a, b){
 return{tabindex:-1, contenteditable:'false', 'data-cke-widget-wrapper':1, 'data-cke-filter':'off', 'class':`cke_widget_wrapper cke_widget_new cke_widget_${a?'inline':'block'}${b?` cke_widget_${b}`:''}`}; 
}function x(a, b, c){
 if(a.type==CKEDITOR.NODE_ELEMENT){
 var d=CKEDITOR.dtd[a.name];if(d&&!d[c.name]){
 var d=a.split(b), e=a.parent;b=d.getIndex();a.children.length||(--b, a.remove());d.children.length||
    d.remove();return x(e, b, c); 
} 
}a.add(c, b); 
}function p(a, b){
 return'boolean'===typeof a.inline?a.inline:!!CKEDITOR.dtd.$inline[b]; 
}function q(a){
 return a.hasAttribute('data-cke-temp'); 
}function v(a, b, c, d){
 const e=a.editor;e.fire('lockSnapshot');c?(d=c.data('cke-widget-editable'), d=b.editables[d], a.widgetHoldingFocusedEditable=b, b.focusedEditable=d, c.addClass('cke_widget_editable_focused'), d&&d.filter&&e.setActiveFilter(d.filter), d&&e.setActiveEnterMode(d.enterMode, d.shiftEnterMode)):(!d&&b.focusedEditable&&
    b.focusedEditable.removeClass('cke_widget_editable_focused'), b.focusedEditable=null, a.widgetHoldingFocusedEditable=null, e.setActiveFilter(null), e.setActiveEnterMode(null, null));e.fire('unlockSnapshot'); 
}function w(a){
 a.contextMenu&&a.contextMenu.addListener(function(b){
 if(b=a.widgets.getByElement(b, !0))return b.fire('contextMenu', {}); 
}); 
}function u(a, b){
 return CKEDITOR.tools.trim(b); 
}function A(a){
 const b=a.editor, c=CKEDITOR.plugins.lineutils;b.on('dragstart', function(c){
 let d=c.data.target;h.isDomDragHandler(d)&&
    (d=a.getByElement(d), c.data.dataTransfer.setData('cke/widget-id', d.id), b.focus(), d.focus()); 
});b.on('drop', function(c){
 var d=c.data.dataTransfer, e=d.getData('cke/widget-id'), f=d.getTransferType(b), d=b.createRange();if(''!==e&&f===CKEDITOR.DATA_TRANSFER_CROSS_EDITORS)c.cancel();else if(f==CKEDITOR.DATA_TRANSFER_INTERNAL)if(''===e&&0<b.widgets.selected.length)c.data.dataTransfer.setData('text/html', M(b));else if(e=a.instances[e])d.setStartBefore(e.wrapper), d.setEndAfter(e.wrapper), c.data.dragRange=d,
    delete CKEDITOR.plugins.clipboard.dragStartContainerChildCount, delete CKEDITOR.plugins.clipboard.dragEndContainerChildCount, c.data.dataTransfer.setData('text/html', e.getClipboardHtml()), b.widgets.destroy(e, !0); 
});b.on('contentDom', function(){
 const d=b.editable();CKEDITOR.tools.extend(a, {finder:new c.finder(b, {lookups:{'default':function(b){
 if(!b.is(CKEDITOR.dtd.$listItem)&&b.is(CKEDITOR.dtd.$block)&&!h.isDomNestedEditable(b)&&!a._.draggedWidget.wrapper.contains(b)){
 let c=h.getNestedEditable(d, b);if(c){
 b=
    a._.draggedWidget;if(a.getByElement(c)==b)return;c=CKEDITOR.filter.instances[c.data('cke-filter')];b=b.requiredContent;if(c&&b&&!c.check(b))return; 
}return CKEDITOR.LINEUTILS_BEFORE|CKEDITOR.LINEUTILS_AFTER; 
} 
}}}), locator:new c.locator(b), liner:new c.liner(b, {lineStyle:{cursor:'move !important', 'border-top-color':'#666'}, tipLeftStyle:{'border-left-color':'#666'}, tipRightStyle:{'border-right-color':'#666'}})}, !0); 
}); 
}function r(a){
 const b=a.editor;b.on('contentDom', function(){
 let c=b.editable(), d=c.isInline()?
    c:b.document, e, f;c.attachListener(d, 'mousedown', function(c){
 const d=c.data.getTarget();e=d instanceof CKEDITOR.dom.element?a.getByElement(d):null;f=0;e&&(e.inline&&d.type==CKEDITOR.NODE_ELEMENT&&d.hasAttribute('data-cke-widget-drag-handler')?(f=1, a.focused!=e&&b.getSelection().removeAllRanges()):h.getNestedEditable(e.wrapper, d)?e=null:(c.data.preventDefault(), CKEDITOR.env.ie||e.focus())); 
});c.attachListener(d, 'mouseup', function(){
 f&&e&&e.wrapper&&(f=0, e.focus()); 
});CKEDITOR.env.ie&&c.attachListener(d,
    'mouseup', function(){
 setTimeout(function(){
 e&&e.wrapper&&c.contains(e.wrapper)&&(e.focus(), e=null); 
}); 
}); 
});b.on('doubleclick', function(b){
 const c=a.getByElement(b.data.element);if(c&&!h.getNestedEditable(c.wrapper, b.data.element))return c.fire('doubleclick', {element:b.data.element}); 
}, null, null, 1); 
}function y(a){
 a.editor.on('key', function(b){
 let c=a.focused, d=a.widgetHoldingFocusedEditable, e;c?e=c.fire('key', {keyCode:b.data.keyCode}):d&&(c=b.data.keyCode, b=d.focusedEditable, c==CKEDITOR.CTRL+65?(c=b.getBogus(),
    d=d.editor.createRange(), d.selectNodeContents(b), c&&d.setEndAt(c, CKEDITOR.POSITION_BEFORE_START), d.select(), e=!1):8==c||46==c?(e=d.editor.getSelection().getRanges(), d=e[0], e=!(1==e.length&&d.collapsed&&d.checkBoundaryOfElement(b, CKEDITOR[8==c?'START':'END']))):e=void 0);return e; 
}, null, null, 1); 
}function z(a){
 function b(d){
 1>a.selected.length||N(c, 'cut'===d.name); 
}var c=a.editor;c.on('contentDom', function(){
 const a=c.editable();a.attachListener(a, 'copy', b);a.attachListener(a, 'cut', b); 
}); 
}function B(a){
 function b(){
 let a=
    e.getSelection();if(a&&(a=a.getRanges()[0])&&!a.collapsed){
 const d=c(a.startContainer), f=c(a.endContainer);!d&&f?(a.setEndBefore(f.wrapper), a.select()):d&&!f&&(a.setStartAfter(d.wrapper), a.select()); 
} 
}function c(a){
 return a?a.type==CKEDITOR.NODE_TEXT?c(a.getParent()):e.widgets.getByElement(a):null; 
}function d(){
 a.fire('checkSelection'); 
}var e=a.editor;e.on('selectionCheck', d);e.on('contentDom', function(){
 e.editable().attachListener(e, 'key', function(){
 setTimeout(d, 10); 
}); 
});if(!CKEDITOR.env.ie)a.on('checkSelection',
    b);a.on('checkSelection', a.checkSelection, a);e.on('selectionChange', function(b){
 const c=(b=h.getNestedEditable(e.editable(), b.data.selection.getStartElement()))&&a.getByElement(b), d=a.widgetHoldingFocusedEditable;if(d){
 if(d!==c||d.focusedEditable&&!d.focusedEditable.equals(b))v(a, d, null), c&&b&&v(a, c, b); 
}else c&&b&&v(a, c, b); 
});e.on('dataReady', function(){
 F(a).commit(); 
});e.on('blur', function(){
 let b;(b=a.focused)&&m(a, b);(b=a.widgetHoldingFocusedEditable)&&v(a, b, null); 
}); 
}function C(a){
 const c=a.editor, e={};
    c.on('toDataFormat', function(c){
 const f=CKEDITOR.tools.getNextNumber(), g=[];c.data.downcastingSessionId=f;e[f]=g;c.data.dataValue.forEach(function(c){
 let e=c.attributes, f;if('data-cke-widget-white-space'in e){
 f=b(c);const k=d(c);f.parent.attributes['data-cke-white-space-first']&&(f.value=f.value.replace(/^&nbsp;/g, ' '));k.parent.attributes['data-cke-white-space-last']&&(k.value=k.value.replace(/&nbsp;$/g, ' ')); 
}if('data-cke-widget-id'in e){
 if(e=a.instances[e['data-cke-widget-id']])f=c.getFirst(h.isParserWidgetElement),
    g.push({wrapper:c, element:f, widget:e, editables:{}}), '1'!=f.attributes['data-cke-widget-keep-attr']&&delete f.attributes['data-widget']; 
}else if('data-cke-widget-editable'in e)return 0<g.length&&(g[g.length-1].editables[e['data-cke-widget-editable']]=c), !1; 
}, CKEDITOR.NODE_ELEMENT, !0); 
}, null, null, 8);c.on('toDataFormat', function(a){
 if(a.data.downcastingSessionId)for(var b=e[a.data.downcastingSessionId], c, d, f, g, h, k;c=b.shift();){
 d=c.widget;f=c.element;g=d._.downcastFn&&d._.downcastFn.call(d, f);a.data.widgetsCopy&&
    d.getClipboardHtml&&(g=CKEDITOR.htmlParser.fragment.fromHtml(d.getClipboardHtml()), g=g.children[0]);for(k in c.editables)h=c.editables[k], delete h.attributes.contenteditable, d.editables[k]&&h.setHtml(d.editables[k].getData());g||(g=f);c.wrapper.replaceWith(g); 
} 
}, null, null, 13);c.on('contentDomUnload', function(){
 a.destroyAll(!0); 
}); 
}function E(a){
 let b=a.editor, c, d;b.on('toHtml', function(b){
 let d=n(a), e;for(b.data.dataValue.forEach(d.iterator, CKEDITOR.NODE_ELEMENT, !0);e=d.toBeWrapped.pop();){
 const f=e[0],
    g=f.parent;g.type==CKEDITOR.NODE_ELEMENT&&g.attributes['data-cke-widget-wrapper']&&g.replaceWith(f);a.wrapElement(e[0], e[1]); 
}c=b.data.protectedWhitespaces?3==b.data.dataValue.children.length&&h.isParserWidgetWrapper(b.data.dataValue.children[1]):1==b.data.dataValue.children.length&&h.isParserWidgetWrapper(b.data.dataValue.children[0]); 
}, null, null, 8);b.on('dataReady', function(){
 if(d)for(var c=b.editable().find('.cke_widget_wrapper'), e, f, g=0, k=c.count();g<k;++g)e=c.getItem(g), f=e.getFirst(h.isDomWidgetElement),
    f.type==CKEDITOR.NODE_ELEMENT&&f.data('widget')?(f.replace(e), a.wrapElement(f)):e.remove();d=0;a.destroyAll(!0);a.initOnAll(); 
});b.on('loadSnapshot', function(b){
 /data-cke-widget/.test(b.data)&&(d=1);a.destroyAll(!0); 
}, null, null, 9);b.on('paste', function(a){
 a=a.data;a.dataValue=a.dataValue.replace(R, u);a.range&&(a=h.getNestedEditable(b.editable(), a.range.startContainer))&&(a=CKEDITOR.filter.instances[a.data('cke-filter')])&&b.setActiveFilter(a); 
});b.on('afterInsertHtml', function(d){
 d.data.intoRange?a.checkWidgets({initOnlyNew:!0}):
    (b.fire('lockSnapshot'), a.checkWidgets({initOnlyNew:!0, focusInited:c}), b.fire('unlockSnapshot')); 
}); 
}function F(a){
 let b=a.selected, c=[], d=b.slice(0), e=null;return{select:function(a){
 0>CKEDITOR.tools.indexOf(b, a)&&c.push(a);a=CKEDITOR.tools.indexOf(d, a);0<=a&&d.splice(a, 1);return this; 
}, focus:function(a){
 e=a;return this; 
}, commit:function(){
 let f=a.focused!==e, g, h;a.editor.fire('lockSnapshot');for(f&&(g=a.focused)&&m(a, g);g=d.pop();)b.splice(CKEDITOR.tools.indexOf(b, g), 1), g.isInited()&&(h=g.editor.checkDirty(),
    g.setSelected(!1), !h&&g.editor.resetDirty());f&&e&&(h=a.editor.checkDirty(), a.focused=e, a.fire('widgetFocused', {widget:e}), e.setFocused(!0), !h&&a.editor.resetDirty());for(;g=c.pop();)b.push(g), g.setSelected(!0);a.editor.fire('unlockSnapshot'); 
}}; 
}function I(a){
 a&&a.addFilterRule(function(a){
 return a.replace(/\s*cke_widget_selected/g, '').replace(/\s*cke_widget_focused/g, '').replace(/<span[^>]*cke_widget_drag_handler_container[^>]*.*?<\/span>/gmi, ''); 
}); 
}function K(a, b, c){
 let d=0;b=J(b);let e=a.data.classes||
    {}, f;if(b){
 for(e=CKEDITOR.tools.clone(e);f=b.pop();)c?e[f]||(d=e[f]=1):e[f]&&(delete e[f], d=1);d&&a.setData('classes', e); 
} 
}function D(a){
 a.cancel(); 
}function N(a, b){
 let c=a.widgets.focused, d, e, f;ea.hasCopyBin(a)||(e=new ea(a, {beforeDestroy:function(){
 !b&&c&&c.focus();f&&a.getSelection().selectBookmarks(f);d&&CKEDITOR.plugins.widgetselection.addFillers(a.editable()); 
}, afterDestroy:function(){
 b&&!a.readOnly&&(c?a.widgets.del(c):a.extractSelectedHtml(), a.fire('saveSnapshot')); 
}}), c||(d=CKEDITOR.env.webkit&&
    CKEDITOR.plugins.widgetselection.isWholeContentSelected(a.editable()), f=a.getSelection().createBookmarks(!0)), e.handle(M(a))); 
}function J(a){
 return(a=(a=a.getDefinition().attributes)&&a['class'])?a.split(/\s+/):null; 
}function L(){
 const a=CKEDITOR.document.getActive(), b=this.editor, c=b.editable();(c.isInline()?c:b.document.getWindow().getFrame()).equals(a)&&b.focusManager.focus(c); 
}function Q(){
 CKEDITOR.env.gecko&&this.editor.unlockSelection();CKEDITOR.env.webkit||(this.editor.forceNextSelectionCheck(),
    this.editor.selectionChange(1)); 
}function M(a){
 const b=a.getSelectedHtml(!0);if(a.widgets.focused)return a.widgets.focused.getClipboardHtml();a.once('toDataFormat', function(a){
 a.data.widgetsCopy=!0; 
}, null, null, -1);return a.dataProcessor.toDataFormat(b); 
}function H(a, b){
 O(a);X(a);T(a);Y(a);U(a);ba(a);V(a);if(CKEDITOR.env.ie&&9>CKEDITOR.env.version)a.wrapper.on('dragstart', function(b){
 const c=b.data.getTarget();h.getNestedEditable(a, c)||a.inline&&h.isDomDragHandler(c)||b.data.preventDefault(); 
});a.wrapper.removeClass('cke_widget_new');
    a.element.addClass('cke_widget_element');a.on('key', function(b){
 b=b.data.keyCode;if(13==b)a.edit();else{
 if(b==CKEDITOR.CTRL+67||b==CKEDITOR.CTRL+88){
 N(a.editor, b==CKEDITOR.CTRL+88);return; 
}if(b in S||CKEDITOR.CTRL&b||CKEDITOR.ALT&b)return; 
}return!1; 
}, null, null, 999);a.on('doubleclick', function(b){
 a.edit()&&b.cancel(); 
});if(b.data)a.on('data', b.data);if(b.edit)a.on('edit', b.edit); 
}function O(a){
 (a.wrapper=a.element.getParent()).setAttribute('data-cke-widget-id', a.id); 
}function X(a, b){
 a.partSelectors||(a.partSelectors=
    a.parts);if(a.parts){
 let c={}, d, e;for(e in a.partSelectors)b||!a.parts[e]||'string'===typeof a.parts[e]?(d=a.wrapper.findOne(a.partSelectors[e]), c[e]=d):c[e]=a.parts[e];a.parts=c; 
} 
}function T(a){
 let b=a.editables, c, d;a.editables={};if(a.editables)for(c in b)d=b[c], a.initEditable(c, 'string'===typeof d?{selector:d}:d); 
}function Y(a){
 if(!0===a.mask)ha(a);else if(a.mask){
 let b=new CKEDITOR.tools.buffers.throttle(250, W, a), c=CKEDITOR.env.gecko?300:0, d, e;a.on('focus', function(){
 b.input();d=a.editor.on('change',
    b.input);e=a.on('blur', function(){
 d.removeListener();e.removeListener(); 
}); 
});a.editor.on('instanceReady', function(){
 setTimeout(function(){
 b.input(); 
}, c); 
});a.editor.on('mode', function(){
 setTimeout(function(){
 b.input(); 
}, c); 
});if(CKEDITOR.env.gecko){
 const f=a.element.find('img');CKEDITOR.tools.array.forEach(f.toArray(), function(a){
 a.on('load', function(){
 b.input(); 
}); 
}); 
}for(const g in a.editables)a.editables[g].on('focus', function(){
 a.editor.on('change', b.input);e&&e.removeListener(); 
}), a.editables[g].on('blur',
    function(){
 a.editor.removeListener('change', b.input); 
});b.input(); 
} 
}function ha(a){
 let b=a.wrapper.findOne('.cke_widget_mask');b||(b=new CKEDITOR.dom.element('img', a.editor.document), b.setAttributes({src:CKEDITOR.tools.transparentImageData, 'class':'cke_reset cke_widget_mask'}), a.wrapper.append(b));a.mask=b; 
}function W(){
 if(this.wrapper){
 this.maskPart=this.maskPart||this.mask;let a=this.parts[this.maskPart], b;if(a&&'string'!==typeof a){
 b=this.wrapper.findOne('.cke_widget_partial_mask');b||(b=new CKEDITOR.dom.element('img',
    this.editor.document), b.setAttributes({src:CKEDITOR.tools.transparentImageData, 'class':'cke_reset cke_widget_partial_mask'}), this.wrapper.append(b));this.mask=b;let c=b.$, d=a.$, e=!(c.offsetTop==d.offsetTop&&c.offsetLeft==d.offsetLeft);if(c.offsetWidth!=d.offsetWidth||c.offsetHeight!=d.offsetHeight||e)c=a.getParent(), d=CKEDITOR.plugins.widget.isDomWidget(c), b.setStyles({top:`${a.$.offsetTop+(d?0:c.$.offsetTop)}px`, left:`${a.$.offsetLeft+(d?0:c.$.offsetLeft)}px`, width:`${a.$.offsetWidth}px`, height:`${a.$.offsetHeight
    }px`}); 
} 
} 
}function U(a){
 if(a.draggable){
 let b=a.editor, c=a.wrapper.getLast(h.isDomDragHandlerContainer), d;c?d=c.findOne('img'):(c=new CKEDITOR.dom.element('span', b.document), c.setAttributes({'class':'cke_reset cke_widget_drag_handler_container', style:`background:rgba(220,220,220,0.5);background-image:url(${b.plugins.widget.path}images/handle.png);display:none;`}), d=new CKEDITOR.dom.element('img', b.document), d.setAttributes({'class':'cke_reset cke_widget_drag_handler', 'data-cke-widget-drag-handler':'1',
    src:CKEDITOR.tools.transparentImageData, width:15, title:b.lang.widget.move, height:15, role:'presentation'}), a.inline&&d.setAttribute('draggable', 'true'), c.append(d), a.wrapper.append(c));a.wrapper.on('dragover', function(a){
 a.data.preventDefault(); 
});a.wrapper.on('mouseenter', a.updateDragHandlerPosition, a);setTimeout(function(){
 a.on('data', a.updateDragHandlerPosition, a); 
}, 50);if(!a.inline&&(d.on('mousedown', aa, a), CKEDITOR.env.ie&&9>CKEDITOR.env.version))d.on('dragstart', function(a){
 a.data.preventDefault(!0); 
});
    a.dragHandlerContainer=c; 
} 
}function aa(a){
 function b(){
 let c;for(p.reset();c=h.pop();)c.removeListener();let d=k;c=a.sender;const e=this.repository.finder, f=this.repository.liner, g=this.editor, l=this.editor.editable();CKEDITOR.tools.isEmpty(f.visible)||(d=e.getRange(d[0]), this.focus(), g.fire('drop', {dropRange:d, target:d.startContainer}));l.removeClass('cke_widget_dragging');f.hideVisible();g.fire('dragend', {target:c}); 
}if(CKEDITOR.tools.getMouseButton(a)===CKEDITOR.MOUSE_BUTTON_LEFT){
 var c=this.repository.finder,
    d=this.repository.locator, e=this.repository.liner, f=this.editor, g=f.editable(), h=[], k=[], l, m;this.repository._.draggedWidget=this;var n=c.greedySearch(), p=CKEDITOR.tools.eventsBuffer(50, function(){
 l=d.locate(n);k=d.sort(m, 1);k.length&&(e.prepare(n, l), e.placeLine(k[0]), e.cleanup()); 
});g.addClass('cke_widget_dragging');h.push(g.on('mousemove', function(a){
 m=a.data.$.clientY;p.input(); 
}));f.fire('dragstart', {target:a.sender});h.push(f.document.once('mouseup', b, this));g.isInline()||h.push(CKEDITOR.document.once('mouseup',
    b, this)); 
} 
}function ba(a){
 let b=null;a.on('data', function(){
 let a=this.data.classes, c;if(b!=a){
 for(c in b)a&&a[c]||this.removeClass(c);for(c in a)this.addClass(c);b=a; 
} 
}); 
}function V(a){
 a.on('data', function(){
 if(a.wrapper){
 const b=this.getLabel?this.getLabel():this.editor.lang.widget.label.replace(/%1/, this.pathName||this.element.getName());a.wrapper.setAttribute('role', 'region');a.wrapper.setAttribute('aria-label', b); 
} 
}, null, null, 9999); 
}function ca(a){
 a.element.data('cke-widget-data', encodeURIComponent(JSON.stringify(a.data))); 
}
    function Z(){
 function a(){}function b(a, c, d){
 return d&&this.checkElement(a)?(a=d.widgets.getByElement(a, !0))&&a.checkStyleActive(this):!1; 
}function c(a){
 function b(a, c, d){
 for(let e=a.length, f=0;f<e;){
 if(c.call(d, a[f], f, a))return a[f];f++; 
} 
}function e(a){
 function b(a, c){
 const d=CKEDITOR.tools.object.keys(a), e=CKEDITOR.tools.object.keys(c);if(d.length!==e.length)return!1;for(const f in a)if(('object'!==typeof a[f]||'object'!==typeof c[f]||!b(a[f], c[f]))&&a[f]!==c[f])return!1;return!0; 
}return function(c){
 return b(a.getDefinition(),
    c.getDefinition()); 
}; 
}let f=a.widget, g;d[f]||(d[f]={});for(let h=0, k=a.group.length;h<k;h++)g=a.group[h], d[f][g]||(d[f][g]=[]), g=d[f][g], b(g, e(a))||g.push(a); 
}var d={};CKEDITOR.style.addCustomHandler({type:'widget', setup:function(a){
 this.widget=a.widget;(this.group='string'===typeof a.group?[a.group]:a.group)&&c(this); 
}, apply:function(a){
 let b;a instanceof CKEDITOR.editor&&this.checkApplicable(a.elementPath(), a)&&(b=a.widgets.focused, this.group&&this.removeStylesFromSameGroup(a), b.applyStyle(this)); 
}, remove:function(a){
 a instanceof
    CKEDITOR.editor&&this.checkApplicable(a.elementPath(), a)&&a.widgets.focused.removeStyle(this); 
}, removeStylesFromSameGroup:function(a){
 let b=!1, c, e;if(!(a instanceof CKEDITOR.editor))return!1;e=a.elementPath();if(this.checkApplicable(e, a))for(let f=0, g=this.group.length;f<g;f++){
 c=d[this.widget][this.group[f]];for(let h=0;h<c.length;h++)c[h]!==this&&c[h].checkActive(e, a)&&(a.widgets.focused.removeStyle(c[h]), b=!0); 
}return b; 
}, checkActive:function(a, b){
 return this.checkElementMatch(a.lastElement, 0, b); 
},
    checkApplicable:function(a, b){
 return b instanceof CKEDITOR.editor?this.checkElement(a.lastElement):!1; 
}, checkElementMatch:b, checkElementRemovable:b, checkElement:function(a){
 return h.isDomWidgetWrapper(a)?(a=a.getFirst(h.isDomWidgetElement))&&a.data('widget')==this.widget:!1; 
}, buildPreview:function(a){
 return a||this._.definition.name; 
}, toAllowedContentRules:function(a){
 if(!a)return null;a=a.widgets.registered[this.widget];let b, c={};if(!a)return null;if(a.styleableElements){
 b=this.getClassesArray();if(!b)return null;
    c[a.styleableElements]={classes:b, propertiesOnly:!0};return c; 
}return a.styleToAllowedContentRules?a.styleToAllowedContentRules(this):null; 
}, getClassesArray:function(){
 const a=this._.definition.attributes&&this._.definition.attributes['class'];return a?CKEDITOR.tools.trim(a).split(/\s+/):null; 
}, applyToRange:a, removeFromRange:a, applyToObject:a}); 
}CKEDITOR.plugins.add('widget', {requires:'lineutils,clipboard,widgetselection', onLoad:function(){
 void 0!==CKEDITOR.document.$.querySelectorAll&&(CKEDITOR.addCss('.cke_widget_wrapper{position:relative;outline:none}.cke_widget_inline{display:inline-block}.cke_widget_wrapper:hover\x3e.cke_widget_element{outline:2px solid #ffd25c;cursor:default}.cke_widget_wrapper:hover .cke_widget_editable{outline:2px solid #ffd25c}.cke_widget_wrapper.cke_widget_focused\x3e.cke_widget_element,.cke_widget_wrapper .cke_widget_editable.cke_widget_editable_focused{outline:2px solid #47a4f5}.cke_widget_editable{cursor:text}.cke_widget_drag_handler_container{position:absolute;width:15px;height:0;display:block;opacity:0.75;transition:height 0s 0.2s;line-height:0}.cke_widget_wrapper:hover\x3e.cke_widget_drag_handler_container{height:15px;transition:none}.cke_widget_drag_handler_container:hover{opacity:1}.cke_editable[contenteditable\x3d"false"] .cke_widget_drag_handler_container{display:none;}img.cke_widget_drag_handler{cursor:move;width:15px;height:15px;display:inline-block}.cke_widget_mask{position:absolute;top:0;left:0;width:100%;height:100%;display:block}.cke_widget_partial_mask{position:absolute;display:block}.cke_editable.cke_widget_dragging, .cke_editable.cke_widget_dragging *{cursor:move !important}'),
    Z()); 
}, beforeInit:function(a){
 void 0!==CKEDITOR.document.$.querySelectorAll&&(a.widgets=new c(a)); 
}, afterInit:function(a){
 if(void 0!==CKEDITOR.document.$.querySelectorAll){
 let b=a.widgets.registered, c, d, e;for(d in b)c=b[d], (e=c.button)&&a.ui.addButton&&a.ui.addButton(CKEDITOR.tools.capitalize(c.name, !0), {label:e, command:c.name, toolbar:'insert,10'});w(a);I(a.undoManager); 
} 
}});c.prototype={MIN_SELECTION_CHECK_INTERVAL:500, add:function(b, c){
 const d=this.editor;c=CKEDITOR.tools.prototypedCopy(c);c.name=b;
    c._=c._||{};d.fire('widgetDefinition', c);c.template&&(c.template=new CKEDITOR.template(c.template));a(d, c);f(this, c);this.registered[b]=c;if(c.dialog&&d.plugins.dialog)var e=CKEDITOR.on('dialogDefinition', function(a){
 a=a.data.definition;const b=a.dialog;a.getMode||b.getName()!==c.dialog||(a.getMode=function(){
 const a=b.getModel(d);return a&&a instanceof CKEDITOR.plugins.widget&&a.ready?CKEDITOR.dialog.EDITING_MODE:CKEDITOR.dialog.CREATION_MODE; 
});e.removeListener(); 
});return c; 
}, addUpcastCallback:function(a){
 this._.upcastCallbacks.push(a); 
},
    checkSelection:function(){
 if(this.editor.getSelection()){
 let a=this.editor.getSelection(), b=a.getSelectedElement(), c=F(this), d;if(b&&(d=this.getByElement(b, !0)))return c.focus(d).select(d).commit();a=a.getRanges()[0];if(!a||a.collapsed)return c.commit();a=new CKEDITOR.dom.walker(a);for(a.evaluator=h.isDomWidgetWrapper;b=a.next();)c.select(this.getByElement(b));c.commit(); 
} 
}, checkWidgets:function(a){
 this.fire('checkWidgets', CKEDITOR.tools.copy(a||{})); 
}, del:function(a){
 if(this.focused===a){
 let b=a.editor,
    c=b.createRange(), d;(d=c.moveToClosestEditablePosition(a.wrapper, !0))||(d=c.moveToClosestEditablePosition(a.wrapper, !1));d&&b.getSelection().selectRanges([c]); 
}a.wrapper.remove();this.destroy(a, !0); 
}, destroy:function(a, b){
 this.widgetHoldingFocusedEditable===a&&v(this, a, null, b);a.destroy(b);delete this.instances[a.id];this.fire('instanceDestroyed', a); 
}, destroyAll:function(a, b){
 var c, d, e=this.instances;if(b&&!a){
 d=b.find('.cke_widget_wrapper');for(var e=d.count(), f=0;f<e;++f)(c=this.getByElement(d.getItem(f),
    !0))&&this.destroy(c); 
}else for(d in e)c=e[d], this.destroy(c, a); 
}, finalizeCreation:function(a){
 (a=a.getFirst())&&h.isDomWidgetWrapper(a)&&(this.editor.insertElement(a), a=this.getByElement(a), a.ready=!0, a.fire('ready'), a.focus()); 
}, getByElement:function(){
 function a(c){
 return c.is(b)&&c.data('cke-widget-id'); 
}var b={div:1, span:1};return function(b, c){
 if(!b)return null;let d=a(b);if(!c&&!d){
 const e=this.editor.editable();do b=b.getParent();while(b&&!b.equals(e)&&!(d=a(b))); 
}return this.instances[d]||null; 
}; 
}(),
    initOn:function(a, b, c){
 b?'string'===typeof b&&(b=this.registered[b]):b=this.registered[a.data('widget')];if(!b)return null;const d=this.wrapElement(a, b.name);return d?d.hasClass('cke_widget_new')?(a=new h(this, this._.nextId++, a, b, c), a.isInited()?this.instances[a.id]=a:null):this.getByElement(a):null; 
}, initOnAll:function(a){
 a=(a||this.editor.editable()).find('.cke_widget_new');for(var b=[], c, d=a.count();d--;)(c=this.initOn(a.getItem(d).getFirst(h.isDomWidgetElement)))&&b.push(c);return b; 
}, onWidget:function(a){
 const b=
    Array.prototype.slice.call(arguments);b.shift();for(const c in this.instances){
 const d=this.instances[c];d.name==a&&d.on.apply(d, b); 
}this.on('instanceCreated', function(c){
 c=c.data;c.name==a&&c.on.apply(c, b); 
}); 
}, parseElementClasses:function(a){
 if(!a)return null;a=CKEDITOR.tools.trim(a).split(/\s+/);for(var b, c={}, d=0;b=a.pop();)-1==b.indexOf('cke_')&&(c[b]=d=1);return d?c:null; 
}, wrapElement:function(a, b){
 let c=null, d, e;if(a instanceof CKEDITOR.dom.element){
 b=b||a.data('widget');d=this.registered[b];if(!d)return null;
    if((c=a.getParent())&&c.type==CKEDITOR.NODE_ELEMENT&&c.data('cke-widget-wrapper'))return c;a.hasAttribute('data-cke-widget-keep-attr')||a.data('cke-widget-keep-attr', a.data('widget')?1:0);a.data('widget', b);(e=p(d, a.getName()))&&l(a);c=new CKEDITOR.dom.element(e?'span':'div', a.getDocument());c.setAttributes(t(e, b));c.data('cke-display-name', d.pathName?d.pathName:a.getName());a.getParent(!0)&&c.replace(a);a.appendTo(c); 
}else if(a instanceof CKEDITOR.htmlParser.element){
 b=b||a.attributes['data-widget'];
    d=this.registered[b];if(!d)return null;if((c=a.parent)&&c.type==CKEDITOR.NODE_ELEMENT&&c.attributes['data-cke-widget-wrapper'])return c;'data-cke-widget-keep-attr'in a.attributes||(a.attributes['data-cke-widget-keep-attr']=a.attributes['data-widget']?1:0);b&&(a.attributes['data-widget']=b);(e=p(d, a.name))&&l(a);c=new CKEDITOR.htmlParser.element(e?'span':'div', t(e, b));c.attributes['data-cke-display-name']=d.pathName?d.pathName:a.name;d=a.parent;let f;d&&(f=a.getIndex(), a.remove());c.add(a);d&&x(d,
    f, c); 
}return c; 
}, _tests_createEditableFilter:e};CKEDITOR.event.implementOn(c.prototype);h.prototype={addClass:function(a){
 this.element.addClass(a);this.wrapper.addClass(h.WRAPPER_CLASS_PREFIX+a); 
}, applyStyle:function(a){
 K(this, a, 1); 
}, checkStyleActive:function(a){
 a=J(a);let b;if(!a)return!1;for(;b=a.pop();)if(!this.hasClass(b))return!1;return!0; 
}, destroy:function(a){
 this.fire('destroy');if(this.editables)for(const b in this.editables)this.destroyEditable(b, a);a||('0'==this.element.data('cke-widget-keep-attr')&&
    this.element.removeAttribute('data-widget'), this.element.removeAttributes(['data-cke-widget-data', 'data-cke-widget-keep-attr']), this.element.removeClass('cke_widget_element'), this.element.replace(this.wrapper));this.wrapper=null; 
}, destroyEditable:function(a, b){
 let c=this.editables[a], d=!0;c.removeListener('focus', Q);c.removeListener('blur', L);this.editor.focusManager.remove(c);if(c.filter){
 for(const e in this.repository.instances){
 let f=this.repository.instances[e];f.editables&&(f=f.editables[a])&&f!==
    c&&c.filter===f.filter&&(d=!1); 
}d&&(c.filter.destroy(), (d=this.repository._.filters[this.name])&&delete d[a]); 
}b||(this.repository.destroyAll(!1, c), c.removeClass('cke_widget_editable'), c.removeClass('cke_widget_editable_focused'), c.removeAttributes(['contenteditable', 'data-cke-widget-editable', 'data-cke-enter-mode']));delete this.editables[a]; 
}, edit:function(){
 const a={dialog:this.dialog}, b=this;if(!1===this.fire('edit', a)||!a.dialog)return!1;this.editor.openDialog(a.dialog, function(a){
 let c, d;!1!==b.fire('dialog',
    a)&&(c=a.on('show', function(){
 a.setupContent(b); 
}), d=a.on('ok', function(){
 let c, d=b.on('data', function(a){
 c=1;a.cancel(); 
}, null, null, 0);b.editor.fire('saveSnapshot');a.commitContent(b);d.removeListener();c&&(b.fire('data', b.data), b.editor.fire('saveSnapshot')); 
}), a.once('hide', function(){
 c.removeListener();d.removeListener(); 
})); 
}, b);return!0; 
}, getClasses:function(){
 return this.repository.parseElementClasses(this.element.getAttribute('class')); 
}, getClipboardHtml:function(){
 const a=this.editor.createRange();
    a.setStartBefore(this.wrapper);a.setEndAfter(this.wrapper);return this.editor.editable().getHtmlFromRange(a).getHtml(); 
}, hasClass:function(a){
 return this.element.hasClass(a); 
}, initEditable:function(a, b){
 let c=this._findOneNotNested(b.selector);return c&&c.is(CKEDITOR.dtd.$editable)?(c=new g(this.editor, c, {filter:e.call(this.repository, this.name, a, b)}), this.editables[a]=c, c.setAttributes({contenteditable:'true', 'data-cke-widget-editable':a, 'data-cke-enter-mode':c.enterMode}), c.filter&&c.data('cke-filter',
    c.filter.id), c.addClass('cke_widget_editable'), c.removeClass('cke_widget_editable_focused'), b.pathName&&c.data('cke-display-name', b.pathName), this.editor.focusManager.add(c), c.on('focus', Q, this), CKEDITOR.env.ie&&c.on('blur', L, this), c._.initialSetData=!0, c.setData(c.getHtml()), !0):!1; 
}, _findOneNotNested:function(a){
 a=this.wrapper.find(a);for(var b, c, d=0;d<a.count();d++)if(b=a.getItem(d), c=b.getAscendant(h.isDomWidgetWrapper), this.wrapper.equals(c))return b;return null; 
}, isInited:function(){
 return!(!this.wrapper||
    !this.inited); 
}, isReady:function(){
 return this.isInited()&&this.ready; 
}, focus:function(){
 const a=this.editor.getSelection();if(a){
 const b=this.editor.checkDirty();a.fake(this.wrapper);!b&&this.editor.resetDirty(); 
}this.editor.focus(); 
}, refreshMask:function(){
 Y(this); 
}, refreshParts:function(a){
 X(this, 'undefined'!==typeof a?a:!0); 
}, removeClass:function(a){
 this.element.removeClass(a);this.wrapper.removeClass(h.WRAPPER_CLASS_PREFIX+a); 
}, removeStyle:function(a){
 K(this, a, 0); 
}, setData:function(a, b){
 let c=this.data,
    d=0;if('string'===typeof a)c[a]!==b&&(c[a]=b, d=1);else{
 const e=a;for(a in e)c[a]!==e[a]&&(d=1, c[a]=e[a]); 
}d&&this.dataReady&&(ca(this), this.fire('data', c));return this; 
}, setFocused:function(a){
 this.wrapper[a?'addClass':'removeClass']('cke_widget_focused');this.fire(a?'focus':'blur');return this; 
}, setSelected:function(a){
 this.wrapper[a?'addClass':'removeClass']('cke_widget_selected');this.fire(a?'select':'deselect');return this; 
}, updateDragHandlerPosition:function(){
 var a=this.editor, b=this.element.$, c=this._.dragHandlerOffset,
    b={x:b.offsetLeft, y:b.offsetTop-15};c&&b.x==c.x&&b.y==c.y||(c=a.checkDirty(), a.fire('lockSnapshot'), this.dragHandlerContainer.setStyles({top:`${b.y}px`, left:`${b.x}px`}), this.dragHandlerContainer.removeStyle('display'), a.fire('unlockSnapshot'), !c&&a.resetDirty(), this._.dragHandlerOffset=b); 
}};CKEDITOR.event.implementOn(h.prototype);h.getNestedEditable=function(a, b){
 return!b||b.equals(a)?null:h.isDomNestedEditable(b)?b:h.getNestedEditable(a, b.getParent()); 
};h.isDomDragHandler=function(a){
 return a.type==
    CKEDITOR.NODE_ELEMENT&&a.hasAttribute('data-cke-widget-drag-handler'); 
};h.isDomDragHandlerContainer=function(a){
 return a.type==CKEDITOR.NODE_ELEMENT&&a.hasClass('cke_widget_drag_handler_container'); 
};h.isDomNestedEditable=function(a){
 return a.type==CKEDITOR.NODE_ELEMENT&&a.hasAttribute('data-cke-widget-editable'); 
};h.isDomWidgetElement=function(a){
 return a.type==CKEDITOR.NODE_ELEMENT&&a.hasAttribute('data-widget'); 
};h.isDomWidgetWrapper=function(a){
 return a.type==CKEDITOR.NODE_ELEMENT&&a.hasAttribute('data-cke-widget-wrapper'); 
};
    h.isDomWidget=function(a){
 return a?this.isDomWidgetWrapper(a)||this.isDomWidgetElement(a):!1; 
};h.isParserWidgetElement=function(a){
 return a.type==CKEDITOR.NODE_ELEMENT&&!!a.attributes['data-widget']; 
};h.isParserWidgetWrapper=function(a){
 return a.type==CKEDITOR.NODE_ELEMENT&&!!a.attributes['data-cke-widget-wrapper']; 
};h.WRAPPER_CLASS_PREFIX='cke_widget_wrapper_';g.prototype=CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.dom.element.prototype), {setData:function(a){
 this._.initialSetData||
    this.editor.widgets.destroyAll(!1, this);this._.initialSetData=!1;a=this.editor.dataProcessor.toDataFormat(a, {context:this.getName(), filter:this.filter, enterMode:this.enterMode});a=this.editor.dataProcessor.toHtml(a, {context:this.getName(), filter:this.filter, enterMode:this.enterMode});this.setHtml(a);this.editor.widgets.initOnAll(this); 
}, getData:function(){
 return this.editor.dataProcessor.toDataFormat(this.getHtml(), {context:this.getName(), filter:this.filter, enterMode:this.enterMode}); 
}});var R=/^(?:<(?:div|span)(?: data-cke-temp="1")?(?: id="cke_copybin")?(?: data-cke-temp="1")?>)?(?:<(?:div|span)(?: style="[^"]+")?>)?<span [^>]*data-cke-copybin-start="1"[^>]*>.?<\/span>([\s\S]+)<span [^>]*data-cke-copybin-end="1"[^>]*>.?<\/span>(?:<\/(?:div|span)>)?(?:<\/(?:div|span)>)?$/i,
    S={37:1, 38:1, 39:1, 40:1, 8:1, 46:1};S[CKEDITOR.SHIFT+121]=1;var ea=CKEDITOR.tools.createClass({$:function(a, b){
 this._.createCopyBin(a, b);this._.createListeners(b); 
}, _:{createCopyBin:function(a){
 var b=a.document, c=CKEDITOR.env.edge&&16<=CKEDITOR.env.version, d=!a.blockless&&!CKEDITOR.env.ie||c?'div':'span', c=b.createElement(d), b=b.createElement(d);b.setAttributes({id:'cke_copybin', 'data-cke-temp':'1'});c.setStyles({position:'absolute', width:'1px', height:'1px', overflow:'hidden'});c.setStyle('ltr'==a.config.contentsLangDirection?
    'left':'right', '-5000px');this.editor=a;this.copyBin=c;this.container=b; 
}, createListeners:function(a){
 a&&(a.beforeDestroy&&(this.beforeDestroy=a.beforeDestroy), a.afterDestroy&&(this.afterDestroy=a.afterDestroy)); 
}}, proto:{handle:function(a){
 let b=this.copyBin, c=this.editor, d=this.container, e=CKEDITOR.env.ie&&9>CKEDITOR.env.version, f=c.document.getDocumentElement().$, g=c.createRange(), h=this, k=CKEDITOR.env.mac&&CKEDITOR.env.webkit, l=k?100:0, m=window.requestAnimationFrame&&!k?requestAnimationFrame:setTimeout,
    n, p, q;b.setHtml(`\x3cspan data-cke-copybin-start\x3d"1"\x3e​\x3c/span\x3e${a}\x3cspan data-cke-copybin-end\x3d"1"\x3e​\x3c/span\x3e`);c.fire('lockSnapshot');d.append(b);c.editable().append(d);n=c.on('selectionChange', D, null, null, 0);p=c.widgets.on('checkSelection', D, null, null, 0);e&&(q=f.scrollTop);g.selectNodeContents(b);g.select();e&&(f.scrollTop=q);return new CKEDITOR.tools.promise(function(a){
 m(function(){
 h.beforeDestroy&&h.beforeDestroy();d.remove();n.removeListener();p.removeListener();c.fire('unlockSnapshot');
    h.afterDestroy&&h.afterDestroy();a(); 
}, l); 
}); 
}}, statics:{hasCopyBin:function(a){
 return!!ea.getCopyBin(a); 
}, getCopyBin:function(a){
 return a.document.getById('cke_copybin'); 
}}});CKEDITOR.plugins.widget=h;h.repository=c;h.nestedEditable=g; 
}(), function(){
 function c(c, a, f){
 this.editor=c;this.notification=null;this._message=new CKEDITOR.template(a);this._singularMessage=f?new CKEDITOR.template(f):null;this._tasks=[];this._doneTasks=this._doneWeights=this._totalWeights=0; 
}function h(c){
 this._weight=c||1;this._doneWeight=
    0;this._isCanceled=!1; 
}CKEDITOR.plugins.add('notificationaggregator', {requires:'notification'});c.prototype={createTask:function(c){
 c=c||{};let a=!this.notification, f;a&&(this.notification=this._createNotification());f=this._addTask(c);f.on('updated', this._onTaskUpdate, this);f.on('done', this._onTaskDone, this);f.on('canceled', function(){
 this._removeTask(f); 
}, this);this.update();a&&this.notification.show();return f; 
}, update:function(){
 this._updateNotification();this.isFinished()&&this.fire('finished'); 
},
    getPercentage:function(){
 return 0===this.getTaskCount()?1:this._doneWeights/this._totalWeights; 
}, isFinished:function(){
 return this.getDoneTaskCount()===this.getTaskCount(); 
}, getTaskCount:function(){
 return this._tasks.length; 
}, getDoneTaskCount:function(){
 return this._doneTasks; 
}, _updateNotification:function(){
 this.notification.update({message:this._getNotificationMessage(), progress:this.getPercentage()}); 
}, _getNotificationMessage:function(){
 const c=this.getTaskCount(), a={current:this.getDoneTaskCount(), max:c,
    percentage:Math.round(100*this.getPercentage())};return(1==c&&this._singularMessage?this._singularMessage:this._message).output(a); 
}, _createNotification:function(){
 return new CKEDITOR.plugins.notification(this.editor, {type:'progress'}); 
}, _addTask:function(c){
 c=new h(c.weight);this._tasks.push(c);this._totalWeights+=c._weight;return c; 
}, _removeTask:function(c){
 const a=CKEDITOR.tools.indexOf(this._tasks, c);-1!==a&&(c._doneWeight&&(this._doneWeights-=c._doneWeight), this._totalWeights-=c._weight, this._tasks.splice(a,
    1), this.update()); 
}, _onTaskUpdate:function(c){
 this._doneWeights+=c.data;this.update(); 
}, _onTaskDone:function(){
 this._doneTasks+=1;this.update(); 
}};CKEDITOR.event.implementOn(c.prototype);h.prototype={done:function(){
 this.update(this._weight); 
}, update:function(c){
 if(!this.isDone()&&!this.isCanceled()){
 c=Math.min(this._weight, c);const a=c-this._doneWeight;this._doneWeight=c;this.fire('updated', a);this.isDone()&&this.fire('done'); 
} 
}, cancel:function(){
 this.isDone()||this.isCanceled()||(this._isCanceled=!0, this.fire('canceled')); 
},
    isDone:function(){
 return this._weight===this._doneWeight; 
}, isCanceled:function(){
 return this._isCanceled; 
}};CKEDITOR.event.implementOn(h.prototype);CKEDITOR.plugins.notificationAggregator=c;CKEDITOR.plugins.notificationAggregator.task=h; 
}(), 'use strict', function(){
 CKEDITOR.plugins.add('uploadwidget', {requires:'widget,clipboard,filetools,notificationaggregator', init:function(c){
 c.filter.allow('*[!data-widget,!data-cke-upload-id]'); 
}, isSupportedEnvironment:function(){
 return CKEDITOR.plugins.clipboard.isFileApiSupported; 
}});
    CKEDITOR.fileTools||(CKEDITOR.fileTools={});CKEDITOR.tools.extend(CKEDITOR.fileTools, {addUploadWidget:function(c, h, g){
 const a=CKEDITOR.fileTools, f=c.uploadRepository, m=g.supportedTypes?10:20;if(g.fileToElement)c.on('paste', function(g){
 g=g.data;let l=c.widgets.registered[h], b=g.dataTransfer, d=b.getFilesCount(), e=l.loadMethod||'loadAndUpload', m, t;if(!g.dataValue&&d)for(t=0;t<d;t++)if(m=b.getFile(t), !l.supportedTypes||a.isTypeSupported(m, l.supportedTypes)){
 const x=l.fileToElement(m);m=f.create(m, void 0,
    l.loaderType);x&&(m[e](l.uploadUrl, l.additionalRequestParameters), CKEDITOR.fileTools.markElement(x, h, m.id), 'loadAndUpload'!=e&&'upload'!=e||l.skipNotifications||CKEDITOR.fileTools.bindNotifications(c, m), g.dataValue+=x.getOuterHtml()); 
} 
}, null, null, m);CKEDITOR.tools.extend(g, {downcast:function(){
 return new CKEDITOR.htmlParser.text(''); 
}, init:function(){
 let a=this, g=this.wrapper.findOne('[data-cke-upload-id]').data('cke-upload-id'), b=f.loaders[g], d=CKEDITOR.tools.capitalize, e, h;b.on('update', function(f){
 if('abort'===
    b.status&&'function'===typeof a.onAbort)a.onAbort(b);if(a.wrapper&&a.wrapper.getParent()){
 c.fire('lockSnapshot');f=`on${d(b.status)}`;if('abort'===b.status||'function'!==typeof a[f]||!1!==a[f](b))h=`cke_upload_${b.status}`, a.wrapper&&h!=e&&(e&&a.wrapper.removeClass(e), a.wrapper.addClass(h), e=h), 'error'!=b.status&&'abort'!=b.status||c.widgets.del(a);c.fire('unlockSnapshot'); 
}else CKEDITOR.instances[c.name]&&c.editable().find(`[data-cke-upload-id\x3d"${g}"]`).count()||b.abort(), f.removeListener(); 
});b.update(); 
},
    replaceWith:function(a, f){
 if(''===a.trim())c.widgets.del(this);else{
 let b=this==c.widgets.focused, d=c.editable(), e=c.createRange(), g, h;b||(h=c.getSelection().createBookmarks());e.setStartBefore(this.wrapper);e.setEndAfter(this.wrapper);b&&(g=e.createBookmark());d.insertHtmlIntoRange(a, e, f);c.widgets.checkWidgets({initOnlyNew:!0});c.widgets.destroy(this, !0);b?(e.moveToBookmark(g), e.select()):c.getSelection().selectBookmarks(h); 
} 
}, _getLoader:function(){
 const a=this.wrapper.findOne('[data-cke-upload-id]');
    return a?this.editor.uploadRepository.loaders[a.data('cke-upload-id')]:null; 
}});c.widgets.add(h, g); 
}, markElement:function(c, h, g){
 c.setAttributes({'data-cke-upload-id':g, 'data-widget':h}); 
}, bindNotifications:function(c, h){
 function g(){
 a=c._.uploadWidgetNotificaionAggregator;if(!a||a.isFinished())a=c._.uploadWidgetNotificaionAggregator=new CKEDITOR.plugins.notificationAggregator(c, c.lang.uploadwidget.uploadMany, c.lang.uploadwidget.uploadOne), a.once('finished', function(){
 const f=a.getTaskCount();0===f?a.notification.hide():
    a.notification.update({message:1==f?c.lang.uploadwidget.doneOne:c.lang.uploadwidget.doneMany.replace('%1', f), type:'success', important:1}); 
}); 
}let a, f=null;h.on('update', function(){
 !f&&h.uploadTotal&&(g(), f=a.createTask({weight:h.uploadTotal}));f&&'uploading'==h.status&&f.update(h.uploaded); 
});h.on('uploaded', function(){
 f&&f.done(); 
});h.on('error', function(){
 f&&f.cancel();c.showNotification(h.message, 'warning'); 
});h.on('abort', function(){
 f&&f.cancel();CKEDITOR.instances[c.name]&&c.showNotification(c.lang.uploadwidget.abort,
    'info'); 
}); 
}}); 
}(), 'use strict', function(){
 function c(a){
 9>=a&&(a=`0${a}`);return String(a); 
}function h(a){
 var f=new Date, f=[f.getFullYear(), f.getMonth()+1, f.getDate(), f.getHours(), f.getMinutes(), f.getSeconds()];g+=1;return`image-${CKEDITOR.tools.array.map(f, c).join('')}-${g}.${a}`; 
}var g=0;CKEDITOR.plugins.add('uploadimage', {requires:'uploadwidget', onLoad:function(){
 CKEDITOR.addCss('.cke_upload_uploading img{opacity: 0.3}'); 
}, isSupportedEnvironment:function(){
 return CKEDITOR.plugins.clipboard.isFileApiSupported; 
},
    init:function(a){
 if(this.isSupportedEnvironment()){
 const c=CKEDITOR.fileTools, g=c.getUploadUrl(a.config, 'image');g&&(c.addUploadWidget(a, 'uploadimage', {supportedTypes:/image\/(jpeg|png|gif|bmp)/, uploadUrl:g, fileToElement:function(){
 const a=new CKEDITOR.dom.element('img');a.setAttribute('src', 'data:image/gif;base64,R0lGODlhDgAOAIAAAAAAAP///yH5BAAAAAAALAAAAAAOAA4AAAIMhI+py+0Po5y02qsKADs\x3d');return a; 
}, parts:{img:'img'}, onUploading:function(a){
 this.parts.img.setAttribute('src', a.data); 
}, onUploaded:function(a){
 const c=
    this.parts.img.$;this.replaceWith(`\x3cimg src\x3d"${a.url}" width\x3d"${a.responseData.width||c.naturalWidth}" height\x3d"${a.responseData.height||c.naturalHeight}"\x3e`); 
}}), a.on('paste', function(k){
 if(k.data.dataValue.match(/<img[\s\S]+data:/i)){
 k=k.data;var l=document.implementation.createHTMLDocument(''), l=new CKEDITOR.dom.element(l.body), b, d, e;l.data('cke-editable', 1);l.appendHtml(k.dataValue);b=l.find('img');for(e=0;e<b.count();e++){
 d=b.getItem(e);let n=d.getAttribute('src'), t=n&&'data:'==
    n.substring(0, 5), x=null===d.data('cke-realelement');t&&x&&!d.data('cke-upload-id')&&!d.isReadOnly(1)&&(t=(t=n.match(/image\/([a-z]+?);/i))&&t[1]||'jpg', n=a.uploadRepository.create(n, h(t)), n.upload(g), c.markElement(d, 'uploadimage', n.id), c.bindNotifications(a, n)); 
}k.dataValue=l.getHtml(); 
} 
})); 
} 
}}); 
}(), function(){
 function c(a){
 function c(a){
 let b=!1;e.attachListener(e, 'keydown', function(){
 const c=l.getBody().getElementsByTag(a);if(!b){
 for(let d=0;d<c.count();d++)c.getItem(d).setCustomData('retain', !0);b=!0; 
} 
},
    null, null, 1);e.attachListener(e, 'keyup', function(){
 const c=l.getElementsByTag(a);b&&(1==c.count()&&!c.getItem(0).getCustomData('retain')&&CKEDITOR.tools.isEmpty(c.getItem(0).getAttributes())&&c.getItem(0).remove(1), b=!1); 
}); 
}const g=this.editor;if(g&&!g.isDetached()){
 var l=a.document, b=l.body, d=l.getElementById('cke_actscrpt');d&&d.parentNode.removeChild(d);(d=l.getElementById('cke_shimscrpt'))&&d.parentNode.removeChild(d);(d=l.getElementById('cke_basetagscrpt'))&&d.parentNode.removeChild(d);b.contentEditable=
    !0;CKEDITOR.env.ie&&(b.hideFocus=!0, b.disabled=!0, b.removeAttribute('disabled'));delete this._.isLoadingData;this.$=b;l=new CKEDITOR.dom.document(l);this.setup();this.fixInitialSelection();var e=this;CKEDITOR.env.ie&&!CKEDITOR.env.edge&&l.getDocumentElement().addClass(l.$.compatMode);CKEDITOR.env.ie&&!CKEDITOR.env.edge&&g.enterMode!=CKEDITOR.ENTER_P?c('p'):CKEDITOR.env.edge&&15>CKEDITOR.env.version&&g.enterMode!=CKEDITOR.ENTER_DIV&&c('div');if(CKEDITOR.env.webkit||CKEDITOR.env.ie&&10<CKEDITOR.env.version)l.getDocumentElement().on('mousedown',
    function(a){
 a.data.getTarget().is('html')&&setTimeout(function(){
 g.editable().focus(); 
}); 
});h(g);try{
 g.document.$.execCommand('2D-position', !1, !0); 
}catch(n){}(CKEDITOR.env.gecko||CKEDITOR.env.ie&&'CSS1Compat'==g.document.$.compatMode)&&this.attachListener(this, 'keydown', function(a){
 const b=a.data.getKeystroke();if(33==b||34==b)if(CKEDITOR.env.ie)setTimeout(function(){
 g.getSelection().scrollIntoView(); 
}, 0);else if(g.window.$.innerHeight>this.$.offsetHeight){
 const c=g.createRange();c[33==b?'moveToElementEditStart':
    'moveToElementEditEnd'](this);c.select();a.data.preventDefault(); 
} 
});CKEDITOR.env.ie&&this.attachListener(l, 'blur', function(){
 try{
 l.$.selection.empty(); 
}catch(a){} 
});CKEDITOR.env.iOS&&this.attachListener(l, 'touchend', function(){
 a.focus(); 
});b=g.document.getElementsByTag('title').getItem(0);b.data('cke-title', b.getText());CKEDITOR.env.ie&&(g.document.$.title=this._.docTitle);CKEDITOR.tools.setTimeout(function(){
 'unloaded'==this.status&&(this.status='ready');g.fire('contentDom');this._.isPendingFocus&&
    (g.focus(), this._.isPendingFocus=!1);setTimeout(function(){
 g.fire('dataReady'); 
}, 0); 
}, 0, this); 
} 
}function h(a){
 function c(){
 let b;a.editable().attachListener(a, 'selectionChange', function(){
 const c=a.getSelection().getSelectedElement();c&&(b&&(b.detachEvent('onresizestart', g), b=null), c.$.attachEvent('onresizestart', g), b=c.$); 
}); 
}function g(a){
 a.returnValue=!1; 
}if(CKEDITOR.env.gecko)try{
 const h=a.document.$;h.execCommand('enableObjectResizing', !1, !a.config.disableObjectResizing);h.execCommand('enableInlineTableEditing',
    !1, !a.config.disableNativeTableHandles); 
}catch(b){}else CKEDITOR.env.ie&&11>CKEDITOR.env.version&&a.config.disableObjectResizing&&c(a); 
}function g(){
 const a=[];if(8<=CKEDITOR.document.$.documentMode){
 a.push('html.CSS1Compat [contenteditable\x3dfalse]{min-height:0 !important}');let c=[], g;for(g in CKEDITOR.dtd.$removeEmpty)c.push(`html.CSS1Compat ${g}[contenteditable\x3dfalse]`);a.push(`${c.join(',')}{display:inline-block}`); 
}else CKEDITOR.env.gecko&&(a.push('html{height:100% !important}'), a.push('img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}'));
    a.push('html{cursor:text;*cursor:auto}');a.push('img,input,textarea{cursor:default}');return a.join('\n'); 
}let a;CKEDITOR.plugins.add('wysiwygarea', {init:function(c){
 c.config.fullPage&&c.addFeature({allowedContent:'html head title; style [media,type]; body (*)[id]; meta link [*]', requiredContent:'body'});c.addMode('wysiwyg', function(g){
 function h(d){
 d&&d.removeListener();c.isDestroyed()||c.isDetached()||(c.editable(new a(c, b.$.contentWindow.document.body)), c.setData(c.getData(1), g)); 
}var l=`document.open();${
    CKEDITOR.env.ie?`(${CKEDITOR.tools.fixDomain})();`:''}document.close();`, l=CKEDITOR.env.air?'javascript:void(0)':CKEDITOR.env.ie&&!CKEDITOR.env.edge?`javascript:void(function(){${encodeURIComponent(l)}}())`:'', b=CKEDITOR.dom.element.createFromHtml(`\x3ciframe src\x3d"${l}" frameBorder\x3d"0"\x3e\x3c/iframe\x3e`);b.setStyles({width:'100%', height:'100%'});b.addClass('cke_wysiwyg_frame').addClass('cke_reset');l=c.ui.space('contents');l.append(b);const d=CKEDITOR.env.ie&&!CKEDITOR.env.edge||CKEDITOR.env.gecko;
    if(d)b.on('load', h);var e=c.title, n=c.fire('ariaEditorHelpLabel', {}).label;e&&(CKEDITOR.env.ie&&n&&(e+=`, ${n}`), b.setAttribute('title', e));if(n){
 var e=CKEDITOR.tools.getNextId(), t=CKEDITOR.dom.element.createFromHtml(`\x3cspan id\x3d"${e}" class\x3d"cke_voice_label"\x3e${n}\x3c/span\x3e`);l.append(t, 1);b.setAttribute('aria-describedby', e); 
}c.on('beforeModeUnload', function(a){
 a.removeListener();t&&t.remove(); 
});b.setAttributes({tabIndex:c.tabIndex, allowTransparency:'true'});!d&&h();c.fire('ariaWidget',
    b); 
}); 
}});CKEDITOR.editor.prototype.addContentsCss=function(a){
 const c=this.config, g=c.contentsCss;CKEDITOR.tools.isArray(g)||(c.contentsCss=g?[g]:[]);c.contentsCss.push(a); 
};a=CKEDITOR.tools.createClass({$:function(){
 this.base.apply(this, arguments);this._.frameLoadedHandler=CKEDITOR.tools.addFunction(function(a){
 CKEDITOR.tools.setTimeout(c, 0, this, a); 
}, this);this._.docTitle=this.getWindow().getFrame().getAttribute('title'); 
}, base:CKEDITOR.editable, proto:{setData:function(a, c){
 const h=this.editor;if(c)this.setHtml(a),
    this.fixInitialSelection(), h.fire('dataReady');else{
 this._.isLoadingData=!0;h._.dataStore={id:1};let l=h.config, b=l.fullPage, d=l.docType, e=CKEDITOR.tools.buildStyleHtml(g()).replace(/<style>/, '\x3cstyle data-cke-temp\x3d"1"\x3e');b||(e+=CKEDITOR.tools.buildStyleHtml(h.config.contentsCss));const n=l.baseHref?`\x3cbase href\x3d"${l.baseHref}" data-cke-temp\x3d"1" /\x3e`:'';b&&(a=a.replace(/<!DOCTYPE[^>]*>/i, function(a){
 h.docType=d=a;return''; 
}).replace(/<\?xml\s[^\?]*\?>/i, function(a){
 h.xmlDeclaration=
    a;return''; 
}));a=h.dataProcessor.toHtml(a);b?(/<body[\s|>]/.test(a)||(a=`\x3cbody\x3e${a}`), /<html[\s|>]/.test(a)||(a=`\x3chtml\x3e${a}\x3c/html\x3e`), /<head[\s|>]/.test(a)?/<title[\s|>]/.test(a)||(a=a.replace(/<head[^>]*>/, '$\x26\x3ctitle\x3e\x3c/title\x3e')):a=a.replace(/<html[^>]*>/, '$\x26\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e'), n&&(a=a.replace(/<head[^>]*?>/, `$\x26${n}`)), a=a.replace(/<\/head\s*>/, `${e}$\x26`), a=d+a):a=`${l.docType}\x3chtml dir\x3d"${l.contentsLangDirection}" lang\x3d"${
    l.contentsLanguage||h.langCode}"\x3e\x3chead\x3e\x3ctitle\x3e${this._.docTitle}\x3c/title\x3e${n}${e}\x3c/head\x3e\x3cbody${l.bodyId?` id\x3d"${l.bodyId}"`:''}${l.bodyClass?` class\x3d"${l.bodyClass}"`:''}\x3e${a}\x3c/body\x3e\x3c/html\x3e`;CKEDITOR.env.gecko&&(a=a.replace(/<body/, '\x3cbody contenteditable\x3d"true" '), 2E4>CKEDITOR.env.version&&(a=a.replace(/<body[^>]*>/, '$\x26\x3c!-- cke-content-start --\x3e')));l=`\x3cscript id\x3d"cke_actscrpt" type\x3d"text/javascript"${CKEDITOR.env.ie?
    ' defer\x3d"defer" ':''}\x3evar wasLoaded\x3d0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(${this._.frameLoadedHandler},window);wasLoaded\x3d1;}${CKEDITOR.env.ie?'onload();':'document.addEventListener("DOMContentLoaded", onload, false );'}\x3c/script\x3e`;CKEDITOR.env.ie&&9>CKEDITOR.env.version&&(l+='\x3cscript id\x3d"cke_shimscrpt"\x3ewindow.parent.CKEDITOR.tools.enableHtml5Elements(document)\x3c/script\x3e');n&&CKEDITOR.env.ie&&10>CKEDITOR.env.version&&(l+='\x3cscript id\x3d"cke_basetagscrpt"\x3evar baseTag \x3d document.querySelector( "base" );baseTag.href \x3d baseTag.href;\x3c/script\x3e');
    a=a.replace(/(?=\s*<\/(:?head)>)/, l);this.clearCustomData();this.clearListeners();h.fire('contentDomUnload');const t=this.getDocument();try{
 t.write(a); 
}catch(x){
 setTimeout(function(){
 t.write(a); 
}, 0); 
} 
} 
}, getData:function(a){
 if(a)return this.getHtml();a=this.editor;var c=a.config, g=c.fullPage, h=g&&a.docType, b=g&&a.xmlDeclaration, d=this.getDocument(), g=g?d.getDocumentElement().getOuterHtml():d.getBody().getHtml();CKEDITOR.env.gecko&&c.enterMode!=CKEDITOR.ENTER_BR&&(g=g.replace(/<br>(?=\s*(:?$|<\/body>))/,
    ''));g=a.dataProcessor.toDataFormat(g);b&&(g=`${b}\n${g}`);h&&(g=`${h}\n${g}`);return g; 
}, focus:function(){
 this._.isLoadingData?this._.isPendingFocus=!0:a.baseProto.focus.call(this); 
}, detach:function(){
 var c=this.editor, g=c.document, c=c.container.findOne('iframe.cke_wysiwyg_frame');a.baseProto.detach.call(this);this.clearCustomData(this._.expandoNumber);g.getDocumentElement().clearCustomData();CKEDITOR.tools.removeFunction(this._.frameLoadedHandler);c&&(c.clearCustomData(), (g=c.removeCustomData('onResize'))&&
    g.removeListener(), c.isDetached()||c.remove()); 
}}}); 
}(), CKEDITOR.config.disableObjectResizing=!1, CKEDITOR.config.disableNativeTableHandles=!0, CKEDITOR.config.disableNativeSpellChecker=!0, CKEDITOR.config.plugins='dialogui,dialog,a11yhelp,about,basicstyles,bidi,blockquote,notification,button,toolbar,clipboard,panelbutton,panel,floatpanel,colorbutton,colordialog,copyformatting,menu,contextmenu,dialogadvtab,div,elementspath,enterkey,entities,popup,filetools,filebrowser,find,floatingspace,listblock,richcombo,font,format,fakeobjects,forms,horizontalrule,htmlwriter,iframe,image,indent,indentlist,indentblock,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastetools,pastefromlibreoffice,pastefromword,pastetext,editorplaceholder,preview,print,removeformat,resize,save,selectall,showblocks,showborders,smiley,sourcearea,specialchar,stylescombo,tab,table,tabletools,tableselection,templates,undo,lineutils,widgetselection,widget,notificationaggregator,uploadwidget,uploadimage,wysiwygarea',
    CKEDITOR.config.skin='moono-lisa', function(){
 const c=function(c, g){
 const a=CKEDITOR.getUrl(`plugins/${g}`);c=c.split(',');for(let f=0;f<c.length;f++)CKEDITOR.skin.icons[c[f]]={path:a, offset:-c[++f], bgsize:c[++f]}; 
};CKEDITOR.env.hidpi?c('about,0,24px,bold,32,24px,italic,64,24px,strike,96,24px,subscript,128,24px,superscript,160,24px,underline,192,24px,bidiltr,224,24px,bidirtl,256,24px,blockquote,288,24px,copy-rtl,320,24px,copy,352,24px,cut-rtl,384,24px,cut,416,24px,paste-rtl,448,24px,paste,480,24px,codesnippet,512,24px,bgcolor,544,24px,textcolor,576,24px,copyformatting,608,24px,creatediv,640,24px,docprops-rtl,672,24px,docprops,704,24px,easyimagealigncenter,736,24px,easyimagealignleft,768,24px,easyimagealignright,800,24px,easyimagealt,832,24px,easyimagefull,864,24px,easyimageside,896,24px,easyimageupload,928,24px,embed,960,24px,embedsemantic,992,24px,emojipanel,1024,24px,find-rtl,1056,24px,find,1088,24px,replace,1120,24px,flash,1152,24px,button,1184,24px,checkbox,1216,24px,form,1248,24px,hiddenfield,1280,24px,imagebutton,1312,24px,radio,1344,24px,select-rtl,1376,24px,select,1408,24px,textarea-rtl,1440,24px,textarea,1472,24px,textfield-rtl,1504,24px,textfield,1536,24px,hllink,1568,24px,horizontalrule,1600,24px,iframe,1632,24px,image,1664,24px,indent-rtl,1696,24px,indent,1728,24px,outdent-rtl,1760,24px,outdent,1792,24px,justifyblock,1824,24px,justifycenter,1856,24px,justifyleft,1888,24px,justifyright,1920,24px,language,1952,24px,anchor-rtl,1984,24px,anchor,2016,24px,link,2048,24px,unlink,2080,24px,bulletedlist-rtl,2112,24px,bulletedlist,2144,24px,numberedlist-rtl,2176,24px,numberedlist,2208,24px,mathjax,2240,24px,maximize,2272,24px,newpage-rtl,2304,24px,newpage,2336,24px,pagebreak-rtl,2368,24px,pagebreak,2400,24px,pastefromword-rtl,2432,24px,pastefromword,2464,24px,pastetext-rtl,2496,24px,pastetext,2528,24px,placeholder,2560,24px,preview-rtl,2592,24px,preview,2624,24px,print,2656,24px,removeformat,2688,24px,save,2720,24px,search,5504,auto,selectall,2784,24px,showblocks-rtl,2816,24px,showblocks,2848,24px,smiley,2880,24px,source-rtl,2912,24px,source,2944,24px,sourcedialog-rtl,2976,24px,sourcedialog,3008,24px,specialchar,3040,24px,table,3072,24px,templates-rtl,3104,24px,templates,3136,24px,uicolor,3168,24px,redo-rtl,3200,24px,redo,3232,24px,undo-rtl,3264,24px,undo,3296,24px,simplebox,6656,auto',
    'icons_hidpi.png'):c('about,0,auto,bold,56,auto,italic,112,auto,strike,168,auto,subscript,224,auto,superscript,280,auto,underline,336,auto,bidiltr,392,auto,bidirtl,448,auto,blockquote,504,auto,copy-rtl,560,auto,copy,616,auto,cut-rtl,672,auto,cut,728,auto,paste-rtl,784,auto,paste,840,auto,codesnippet,896,auto,bgcolor,952,auto,textcolor,1008,auto,copyformatting,1064,auto,creatediv,1120,auto,docprops-rtl,1176,auto,docprops,1232,auto,easyimagealigncenter,1288,auto,easyimagealignleft,1344,auto,easyimagealignright,1400,auto,easyimagealt,1456,auto,easyimagefull,1512,auto,easyimageside,1568,auto,easyimageupload,1624,auto,embed,1680,auto,embedsemantic,1736,auto,emojipanel,1792,auto,find-rtl,1848,auto,find,1904,auto,replace,1960,auto,flash,2016,auto,button,2072,auto,checkbox,2128,auto,form,2184,auto,hiddenfield,2240,auto,imagebutton,2296,auto,radio,2352,auto,select-rtl,2408,auto,select,2464,auto,textarea-rtl,2520,auto,textarea,2576,auto,textfield-rtl,2632,auto,textfield,2688,auto,hllink,2744,auto,horizontalrule,2800,auto,iframe,2856,auto,image,2912,auto,indent-rtl,2968,auto,indent,3024,auto,outdent-rtl,3080,auto,outdent,3136,auto,justifyblock,3192,auto,justifycenter,3248,auto,justifyleft,3304,auto,justifyright,3360,auto,language,3416,auto,anchor-rtl,3472,auto,anchor,3528,auto,link,3584,auto,unlink,3640,auto,bulletedlist-rtl,3696,auto,bulletedlist,3752,auto,numberedlist-rtl,3808,auto,numberedlist,3864,auto,mathjax,3920,auto,maximize,3976,auto,newpage-rtl,4032,auto,newpage,4088,auto,pagebreak-rtl,4144,auto,pagebreak,4200,auto,pastefromword-rtl,4256,auto,pastefromword,4312,auto,pastetext-rtl,4368,auto,pastetext,4424,auto,placeholder,4480,auto,preview-rtl,4536,auto,preview,4592,auto,print,4648,auto,removeformat,4704,auto,save,4760,auto,search,4816,auto,selectall,4872,auto,showblocks-rtl,4928,auto,showblocks,4984,auto,smiley,5040,auto,source-rtl,5096,auto,source,5152,auto,sourcedialog-rtl,5208,auto,sourcedialog,5264,auto,specialchar,5320,auto,table,5376,auto,templates-rtl,5432,auto,templates,5488,auto,uicolor,5544,auto,redo-rtl,5600,auto,redo,5656,auto,undo-rtl,5712,auto,undo,5768,auto,simplebox,5824,auto',
    'icons.png'); 
}()); 
})();