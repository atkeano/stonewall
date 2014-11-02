!function(e,t){"function"==typeof define&&define.amd?define("templating/utils",[],t):"object"==typeof exports?module.exports=t():(e.Templating=e.Templating||{},e.Templating.utils=t())}(this,function(){return{merge:function(e,t){Object.keys(t).forEach(function(n){e[n]=t[n]})}}}),function(e,t){"function"==typeof define&&define.amd?define("coders/component/CpDecoder",["templating/Decoder"],t):"object"==typeof exports?module.exports=t(require("./Decoder"),require("./DataBinding"),require("./utils")):(e.Templating=e.Templating||{},e.Templating.componentDecoder=t(e.Templating.Decoder))}(this,function(e){var t={tagName:"cp",decode:function(e,t){var n=e.data,i={name:n.name,tmpEl:function(e,o){return i.data.instance=new n.src(n.dataset,t,o),n.instance.el},data:n||{}};return void 0!==n.dataset.bind&&(i.bind=n.dataset.bind),i}};return e&&e.addDecoder(t),t});;!function(e,n){"function"==typeof define&&define.amd?define("coders/placeholders/plDecoder",["templating/Decoder"],n):"object"==typeof exports?module.exports=n(require("./Decoder")):(e.Templating=e.Templating||{},e.Templating.componentDecoder=n(e.Templating.Decoder))}(this,function(e){var n={tagName:"pl",decode:function(e,n){var t=e.data;return{name:t.name,tmpEl:function(e){return e||document.createElement(t.tag)},parse:function(e){n&&Object.keys(n).forEach(function(t){n[t].run(e)})},data:t}}};return e&&e.addDecoder(n),n});;!function(e,t){"function"==typeof define&&define.amd?define("coders/databind/bdDecoder",["templating/Decoder"],t):"object"==typeof exports?module.exports=t(require("./Decoder")):(e.Templating=e.Templating||{},e.Templating.componentDecoder=t(e.Templating.Decoder))}(this,function(e){var t={tagName:"bd",noAttach:!0,decode:function(e){var t=this.data=e.data,n={name:t.name,tmpEl:function(){return document.createElement(t.tag)},data:t,bind:t.dataset.bind||t.name};return n}};return e&&e.addDecoder(t),t});;!function(t,e){"function"==typeof define&&define.amd?define("templating/Decoder",["templating/utils"],e):"object"==typeof exports?module.exports=e(require("./utils")):(t.Templating=t.Templating||{},t.Templating.Decoder=e(t.Templating.utils))}(this,function(t){function e(t,e){var n;n="li"===e?"ul":"td"===e||"th"===e?"tr":"tr"===e?"tbody":"div";var i=document.createElement(n),r=document.createDocumentFragment();return i.innerHTML=t,r.appendChild(i.firstChild),r.firstChild}function n(t,n,i,r){var a=this.tmpEl(n?t:!1,r),d=this.name,o=this.data.attribs,h=e(this.template,this.data.tag);if(Object.keys(o).forEach(function(t){a.setAttribute(t,o[t])}),void 0!==h)for(;h.childNodes.length>0;)a.appendChild(h.childNodes[0]);if(void 0!==d&&a.classList.add(d),i)this.setParent(i),null!==this.parent&&this.parent.appendChild(a);else{var c=t.parentNode;this.setParent(c),null!==this.parent&&this.parent.replaceChild(a,t)}return this.el=a,void 0!==this.parse&&this.parse(a),a}function i(e,i){var r=e.tagName;t.merge(this,{id:e.id,template:e.template,noAttach:o[r].noAttach||e.data.tplSet.noattach,instance:n.bind(this),applyAttach:function(){delete this.noAttach},setParent:function(t){this.parent=t}.bind(this),getParent:function(){return this.parent}.bind(this),run:function(t,e,n,i){if(void 0===this.noAttach){var r=t.querySelector("#"+this.id)||t;if(r)return this.instance(r,e,n,i)}}}),i&&(this.children=i)}function r(t){var e=!1,n=!1;return t.children.forEach(function(t){t.children&&t.children.length>0&&(n=r.call(this,t));var d=t.tagName;if(d){var h=o[d].decode(t,n,a);if(h){var c=h.name;void 0!==c&&(e=e||{},e[c]=h,i.call(e[c],t,n))}}n=!1}.bind(this)),e}function a(t,e){Object.keys(t).forEach(function(n){t[n].run(e)})}function d(t){this._root="string"==typeof t?JSON.parse(t):t}var o={};return t.merge(d,{addDecoder:function(t){void 0===o[t.tagName]&&(o[t.tagName]=t)}}),t.merge(d.prototype,{addDecoder:d.addDecoder,_renderFragment:function(t){var n={},i=e(t.template);return t.children&&t.children.length>0&&(n=r.call(this,t)),a(n,i),{fragment:i,children:n}},render:function(){var t=this._renderFragment(this._root);return t}}),d});;/*!
 * Mediator.js Library v0.9.8
 * https://github.com/ajacksified/Mediator.js
 *
 * Copyright 2013, Jack Lawson
 * MIT Licensed (http://www.opensource.org/licenses/mit-license.php)
 *
 * For more information: http://thejacklawson.com/2011/06/mediators-for-modularized-asynchronous-programming-in-javascript/index.html
 * Project on GitHub: https://github.com/ajacksified/Mediator.js
 *
 * Last update: October 19 2013
 */

!function(t,i){"function"==typeof define&&define.amd?define("widget/mediator",[],function(){return t.Mediator=i(),t.Mediator}):"undefined"!=typeof exports?exports.Mediator=i():t.Mediator=i()}(this,function(){function t(){var t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)};return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()}function i(n,e,s){return this instanceof i?(this.id=t(),this.fn=n,this.options=e,this.context=s,void(this.channel=null)):new i(n,e,s)}function n(t,i){return this instanceof n?(this.namespace=t||"",this._subscribers=[],this._channels={},this._parent=i,void(this.stopped=!1)):new n(t)}function e(){return this instanceof e?void(this._channels=new n("")):new e}return i.prototype={update:function(t){t&&(this.fn=t.fn||this.fn,this.context=t.context||this.context,this.options=t.options||this.options,this.channel&&this.options&&void 0!==this.options.priority&&this.channel.setPriority(this.id,this.options.priority))}},n.prototype={addSubscriber:function(t,n,e){var s=new i(t,n,e);return n&&void 0!==n.priority?(n.priority=n.priority>>0,n.priority<0&&(n.priority=0),n.priority>=this._subscribers.length&&(n.priority=this._subscribers.length-1),this._subscribers.splice(n.priority,0,s)):this._subscribers.push(s),s.channel=this,s},stopPropagation:function(){this.stopped=!0},getSubscriber:function(t){var i=0,n=this._subscribers.length;for(n;n>i;i++)if(this._subscribers[i].id===t||this._subscribers[i].fn===t)return this._subscribers[i]},setPriority:function(t,i){var n,e,s,r,o=0,u=0;for(u=0,r=this._subscribers.length;r>u&&(this._subscribers[u].id!==t&&this._subscribers[u].fn!==t);u++)o++;n=this._subscribers[o],e=this._subscribers.slice(0,o),s=this._subscribers.slice(o+1),this._subscribers=e.concat(s),this._subscribers.splice(i,0,n)},addChannel:function(t){this._channels[t]=new n((this.namespace?this.namespace+":":"")+t,this)},hasChannel:function(t){return this._channels.hasOwnProperty(t)},returnChannel:function(t){return this._channels[t]},removeSubscriber:function(t){var i=this._subscribers.length-1;if(!t)return void(this._subscribers=[]);for(i;i>=0;i--)(this._subscribers[i].fn===t||this._subscribers[i].id===t)&&(this._subscribers[i].channel=null,this._subscribers.splice(i,1))},publish:function(t){var i,n,e,s=0,r=this._subscribers.length,o=!1;for(r;r>s;s++)o=!1,i=this._subscribers[s],this.stopped||(n=this._subscribers.length,void 0!==i.options&&"function"==typeof i.options.predicate?i.options.predicate.apply(i.context,t)&&(o=!0):o=!0),o&&(i.options&&void 0!==i.options.calls&&(i.options.calls--,i.options.calls<1&&this.removeSubscriber(i.id)),i.fn.apply(i.context,t),e=this._subscribers.length,r=e,e===n-1&&s--);this._parent&&this._parent.publish(t),this.stopped=!1}},e.prototype={getChannel:function(t,i){var n=this._channels,e=t.split(":"),s=0,r=e.length;if(""===t)return n;if(e.length>0)for(r;r>s;s++){if(!n.hasChannel(e[s])){if(i)break;n.addChannel(e[s])}n=n.returnChannel(e[s])}return n},subscribe:function(t,i,n,e){var s=this.getChannel(t||"",!1);return n=n||{},e=e||{},s.addSubscriber(i,n,e)},once:function(t,i,n,e){return n=n||{},n.calls=1,this.subscribe(t,i,n,e)},getSubscriber:function(t,i){var n=this.getChannel(i||"",!0);return n.namespace!==i?null:n.getSubscriber(t)},remove:function(t,i){var n=this.getChannel(t||"",!0);return n.namespace!==t?!1:void n.removeSubscriber(i)},publish:function(t){var i=this.getChannel(t||"",!0);if(i.namespace!==t)return null;var n=Array.prototype.slice.call(arguments,1);n.push(i),i.publish(n)}},e.prototype.on=e.prototype.subscribe,e.prototype.bind=e.prototype.subscribe,e.prototype.emit=e.prototype.publish,e.prototype.trigger=e.prototype.publish,e.prototype.off=e.prototype.remove,e.Channel=n,e.Subscriber=i,e.version="0.9.8",e}),define("widget/utils",[],function(){function t(t){var i=typeof t;if(!("function"===i||"object"===i&&t))return t;for(var n,e,s=1,r=arguments.length;r>s;s++){n=arguments[s];for(e in n)t[e]=n[e]}return t}function i(i,n){var e,s=this;e=i&&null!=i&&hasOwnProperty.call(i,"constructor")?i.constructor:function(){return s.apply(this,arguments)},t(e,s,n);var r=function(){this.constructor=e};return r.prototype=s.prototype,e.prototype=new r,i&&t(e.prototype,i),e.__super__=s.prototype,e}function n(t){return"[object String]"===toString.call(t)}function e(t){var i=typeof t;return"function"===i||"object"===i&&!!t}function s(t){return"[object Array]"===toString.call(t)}return{fnExtend:i,extend:t,isString:n,isObject:e,isArray:s}}),define("widget/App",["./mediator","./utils"],function(t,i){function n(){this.context=i.extend(this.setContext(),{eventBus:new t}),this.beforeInit.apply(this,arguments),void 0!==this.AppContainer&&(this.appContainer=new this.AppContainer({appContext:this.context}),this.setContext(),this.el=this.appContainer.el,setTimeout(function(){this.el.classList.add("show")}.bind(this),100)),this.init.apply(this,arguments)}return n.extend=i.fnExtend,i.extend(n.prototype,{beforeInit:function(){},init:function(){},setContext:function(){return{}},start:function(t){t instanceof HTMLElement==!0&&t.appendChild(this.el)}}),n});;define("widget/dom",["./utils"],function(t){function e(e){var n=t.extend({},e);t.extend(this,n)}var n={append:function(t,e,n){e.el=e.run(t.el,!0,!1,n)},replace:function(t){t.el.innerHTML="",n.append.apply(this,arguments)},add:function(t,e,n){t.el=t.run(e,!1,n)},text:function(t,e){t.el.innerHTML=e},setAttribute:function(e,n,i){t.isObject(n)?Object.keys(n).forEach(function(t){e.el.setAttribute(t,n[t])}.bind(this)):e.el.setAttribute(n,i)},removeAttribute:function(t,e){t.el.removeAttribute(e)},setStyle:function(e,n,i){t.isObject(n)?Object.keys(n).forEach(function(t){e.el.style[t]=n[t]}.bind(this)):e.el.style[n]=i},removeStyle:function(t,e){delete t.el.style[e]},addClass:function(t,e){t.el.classList.add(e)},removeClass:function(t,e){t.el.classList.remove(e)},val:function(t,e){var n=t.el;return void 0===e?n.value:void(n.value=e)},on:function(t,e,n,i){var r=Array.prototype.slice.call(arguments,4,arguments.length),a=t.el,o=e.split(" "),c=function(e){n.apply(i||this,[e,t].concat(r))};return o.forEach(function(t){a.addEventListener(t,c)}),{remove:function(){o.forEach(function(t){a.removeEventListener(t,c)})}}},remove:function(t){t.el.remove()},Element:e};return t.extend(e.prototype,{append:function(t){n.append(this,t)},replace:function(t,e){n.replace(this,t,e)},text:function(t){n.text(this,t)},add:function(t,e){n.add(this,t,e)},setAttribute:function(t,e){n.setAttribute(this,t,e)},removeAttribute:function(t){n.removeAttribute(this,t)},setStyle:function(t,e){n.setStyle(this,t,e)},removeStyle:function(t){n.removeStyle(this,t)},addClass:function(t){n.addClass(this,t)},removeClass:function(t){n.removeClass(this,t)},val:function(t){return n.val(this,t)},on:function(){var t=Array.prototype.slice.call(arguments,0);return n.on.apply(!1,[this].concat(t))},remove:function(){n.remove(this)}}),e.extend=t.fnExtend,n}),function(t){"object"==typeof exports?module.exports=t():"function"==typeof define&&define.amd?define("watch",t):(window.WatchJS=t(),window.watch=window.WatchJS.watch,window.unwatch=window.WatchJS.unwatch,window.callWatchers=window.WatchJS.callWatchers)}(function(){var t={noMore:!1},e=[],n=function(t){var e={};return t&&"[object Function]"==e.toString.call(t)},i=function(t){return"[object Array]"===Object.prototype.toString.call(t)},r=function(t,e){var n=[],r=[];if("string"!=typeof t&&"string"!=typeof e){if(i(t))for(var a=0;a<t.length;a++)void 0===e[a]&&n.push(a);else for(var a in t)t.hasOwnProperty(a)&&void 0===e[a]&&n.push(a);if(i(e))for(var o=0;o<e.length;o++)void 0===t[o]&&r.push(o);else for(var o in e)e.hasOwnProperty(o)&&void 0===t[o]&&r.push(o)}return{added:n,removed:r}},a=function(t){if(null==t||"object"!=typeof t)return t;var e=t.constructor();for(var n in t)e[n]=t[n];return e},o=function(t,e,n,i){try{Object.observe(t,function(t){t.forEach(function(t){t.name===e&&i(t.object[t.name])})})}catch(r){try{Object.defineProperty(t,e,{get:n,set:i,enumerable:!0,configurable:!0})}catch(a){try{Object.prototype.__defineGetter__.call(t,e,n),Object.prototype.__defineSetter__.call(t,e,i)}catch(o){throw new Error("watchJS error: browser not supported :/")}}}},c=function(t,e,n){try{Object.defineProperty(t,e,{enumerable:!1,configurable:!0,writable:!1,value:n})}catch(i){t[e]=n}},s=function(){n(arguments[1])?l.apply(this,arguments):i(arguments[1])?h.apply(this,arguments):d.apply(this,arguments)},l=function(t,e,n,r){if("string"!=typeof t&&(t instanceof Object||i(t))){var a=[];if(i(t))for(var o=0;o<t.length;o++)a.push(o);else for(var c in t)"$val"!=c&&Object.prototype.hasOwnProperty.call(t,c)&&a.push(c);h(t,a,e,n,r),r&&E(t,"$$watchlengthsubjectroot",e,n)}},h=function(t,e,n,r,a){if("string"!=typeof t&&(t instanceof Object||i(t)))for(var o=0;o<e.length;o++){var c=e[o];d(t,c,n,r,a)}},d=function(t,e,r,a,o){"string"!=typeof t&&(t instanceof Object||i(t))&&(n(t[e])||(null!=t[e]&&(void 0===a||a>0)&&l(t[e],r,void 0!==a?a-1:a),v(t,e,r,a),o&&(void 0===a||a>0)&&E(t,e,r,a)))},u=function(){n(arguments[1])?f.apply(this,arguments):i(arguments[1])?p.apply(this,arguments):w.apply(this,arguments)},f=function(t,e){if(!(t instanceof String)&&(t instanceof Object||i(t)))if(i(t)){for(var n=[],r=0;r<t.length;r++)n.push(r);p(t,n,e)}else{var a=function(t){var n=[];for(var i in t)t.hasOwnProperty(i)&&(t[i]instanceof Object?a(t[i]):n.push(i));p(t,n,e)};a(t)}},p=function(t,e,n){for(var i in e)e.hasOwnProperty(i)&&w(t,e[i],n)},v=function(e,n,i,r){var a=e[n];y(e,n),e.watchers||c(e,"watchers",{}),e.watchers[n]||(e.watchers[n]=[]);for(var s=0;s<e.watchers[n].length;s++)if(e.watchers[n][s]===i)return;e.watchers[n].push(i);var h=function(){return a},d=function(o){var c=a;a=o,0!==r&&e[n]&&l(e[n],i,void 0===r?r:r-1),y(e,n),t.noMore||c!==o&&(b(e,n,"set",o,c),t.noMore=!1)};o(e,n,h,d)},b=function(t,e,n,i,r){if(void 0!==e)for(var a=0;a<t.watchers[e].length;a++)t.watchers[e][a].call(t,e,n,i,r);else for(var e in t)t.hasOwnProperty(e)&&b(t,e,n,i,r)},m=["pop","push","reverse","shift","sort","slice","unshift","splice"],g=function(t,e,n,i){c(t[e],i,function(){var r=n.apply(t[e],arguments);return d(t,t[e]),"slice"!==i&&b(t,e,i,arguments),r})},y=function(t,e){if(t[e]&&!(t[e]instanceof String)&&i(t[e]))for(var n,r=m.length;r--;)n=m[r],g(t,e,t[e][n],n)},w=function(t,e,n){for(var i=0;i<t.watchers[e].length;i++){var r=t.watchers[e][i];r==n&&t.watchers[e].splice(i,1)}O(t,e,n)},j=function(){for(var t=0;t<e.length;t++){var n=e[t];if("$$watchlengthsubjectroot"===n.prop){var i=r(n.obj,n.actual);(i.added.length||i.removed.length)&&(i.added.length&&h(n.obj,i.added,n.watcher,n.level-1,!0),n.watcher.call(n.obj,"root","differentattr",i,n.actual)),n.actual=a(n.obj)}else{var i=r(n.obj[n.prop],n.actual);if(i.added.length||i.removed.length){if(i.added.length)for(var o=0;o<n.obj.watchers[n.prop].length;o++)h(n.obj[n.prop],i.added,n.obj.watchers[n.prop][o],n.level-1,!0);b(n.obj,n.prop,"differentattr",i,n.actual)}n.actual=a(n.obj[n.prop])}}},E=function(t,n,i,r){var o;o=a("$$watchlengthsubjectroot"===n?t:t[n]),e.push({obj:t,prop:n,actual:o,watcher:i,level:r})},O=function(t,n,i){for(var r=0;r<e.length;r++){var a=e[r];a.obj==t&&a.prop==n&&a.watcher==i&&e.splice(r,1)}};return setInterval(j,50),t.watch=s,t.unwatch=u,t.callWatchers=b,t}),function(t,e){"function"==typeof define&&define.amd?define("templating/utils",[],e):"object"==typeof exports?module.exports=e():(t.Templating=t.Templating||{},t.Templating.utils=e())}(this,function(){return{merge:function(t,e){Object.keys(e).forEach(function(n){t[n]=e[n]})}}}),function(t,e){"function"==typeof define&&define.amd?define("templating/Decoder",["templating/utils"],e):"object"==typeof exports?module.exports=e(require("./utils")):(t.Templating=t.Templating||{},t.Templating.Decoder=e(t.Templating.utils))}(this,function(t){function e(t,e){var n;n="li"===e?"ul":"td"===e||"th"===e?"tr":"tr"===e?"tbody":"div";var i=document.createElement(n),r=document.createDocumentFragment();return i.innerHTML=t,r.appendChild(i.firstChild),r.firstChild}function n(t,n,i,r){var a=this.tmpEl(n?t:!1,r),o=this.name,c=this.data.attribs,s=e(this.template,this.data.tag);if(Object.keys(c).forEach(function(t){a.setAttribute(t,c[t])}),void 0!==s)for(;s.childNodes.length>0;)a.appendChild(s.childNodes[0]);if(void 0!==o&&a.classList.add(o),i)this.setParent(i),null!==this.parent&&this.parent.appendChild(a);else{var l=t.parentNode;this.setParent(l),null!==this.parent&&this.parent.replaceChild(a,t)}return this.el=a,void 0!==this.parse&&this.parse(a),a}function i(e,i){var r=e.tagName;t.merge(this,{id:e.id,template:e.template,noAttach:c[r].noAttach||e.data.tplSet.noattach,instance:n.bind(this),applyAttach:function(){delete this.noAttach},setParent:function(t){this.parent=t}.bind(this),getParent:function(){return this.parent}.bind(this),run:function(t,e,n,i){if(void 0===this.noAttach){var r=t.querySelector("#"+this.id)||t;if(r)return this.instance(r,e,n,i)}}}),i&&(this.children=i)}function r(t){var e=!1,n=!1;return t.children.forEach(function(t){t.children&&t.children.length>0&&(n=r.call(this,t));var o=t.tagName;if(o){var s=c[o].decode(t,n,a);if(s){var l=s.name;void 0!==l&&(e=e||{},e[l]=s,i.call(e[l],t,n))}}n=!1}.bind(this)),e}function a(t,e){Object.keys(t).forEach(function(n){t[n].run(e)})}function o(t){this._root="string"==typeof t?JSON.parse(t):t}var c={};return t.merge(o,{addDecoder:function(t){void 0===c[t.tagName]&&(c[t.tagName]=t)}}),t.merge(o.prototype,{addDecoder:o.addDecoder,_renderFragment:function(t){var n={},i=e(t.template);return t.children&&t.children.length>0&&(n=r.call(this,t)),a(n,i),{fragment:i,children:n}},render:function(){var t=this._renderFragment(this._root);return t}}),o}),define("widget/Constructor",["./utils","./dom","./mediator","watch","templating/Decoder"],function(t,e,n,i,r){function a(t){return Object.keys(t).forEach(function(n){t[n]instanceof e.Element!=!0&&(t[n]=new e.Element(t[n])),t[n].children&&(t[n].children=a(t[n].children))}.bind(this)),t}function o(t,e,n){void 0!==e&&void 0!==t.el&&e.forEach(function(e){t.on(e.name,e.action,this,n)}.bind(this))}function c(t,e){var n=t.data.tplSet.bind,i=t.data.tplSet.update;n&&Object.keys(n).forEach(function(r){var a=n[r];if(void 0!==e[a])if("class"===r){t.addClass(e[a]);var o=e[a];"true"===i&&p(e,a,function(){t.removeClass(o),t.addClass(e[a]),o=e[a]}.bind(this))}else"checked"===r?(t.el.checked=e[a],"true"===i&&p(e,a,function(){t.el.checked=e[a]}.bind(this))):(t.setAttribute(r,e[a]),"true"===i&&p(e,a,function(){t.setAttribute(r,e[a])}.bind(this)));void 0!==e.text&&(t.text(e.text),"true"===i&&p(e,"text",function(){t.text(e.text)}.bind(this)))})}function s(t,e){return e=e?a(e):{},t=t?a(t):{},Object.keys(t).forEach(function(n){var i=t[n].children;void 0!==i&&(i=s.call(this,i,e.children),t[n].bindings=h(i));var r=t[n],a=e[n];void 0!==a&&(void 0!==a.children&&(a.bindings=l(a.children)),void 0!==this.nodes[n]?this.nodes[n].call(this,r,a):void 0!==r&&(r.replace(a),void 0!==a.children&&(r.children=a.children))),void 0!==this.elReady[n]&&void 0!==r.el&&this.elReady[n].call(this,r);var c=this.events[n];o.call(this,r,c)}.bind(this)),t}function l(t){return Object.keys(t).forEach(function(e){var n=t[e];n.children&&(t[e].children=l(n.children),t[e].bindings=h(n.children))}),t}function h(t){var e=!1;return Object.keys(t).forEach(function(n){e=e||{};var i=t[n];void 0!==i.bind&&(e[i.bind]=e[i.bind]||[],e[i.bind].push(i))}.bind(this)),e}function d(n,i){var r=i.bindings,a=i.el;n&&Object.keys(n).forEach(function(i){if(void 0!==r&&void 0!==r[i]){var s=function(r){var s=this.events[r.name];if(void 0!==r){var l=n[i];if(r.applyAttach(),this.nodes[i]){var h=new e.Element(r);this.nodes[i].call(this,h,a,l)}else if(t.isArray(l)||t.isObject(l)){if(t.isArray(l)){r.applyAttach();var u=function(){var t=!1,h=function(n){var l=new e.Element(r);t?l.add(a,t):(l.add(a),t=r.getParent()),this.elReady[i]&&this.elReady[i].call(this,l,n),c.call(this,l,n),d.call(this,n,l),o.call(this,l,s,n)};l.forEach(h.bind(this));var u=r.data.tplSet.update;"true"===u&&p(n,i,function(t,e,n,i){void 0===i&&"push"==e&&h.call(this,n[0])}.bind(this))};u.call(this)}else if(t.isObject(l)){var h=new e.Element(r);h.add(a),this.elReady[i]&&this.elReady[i].call(this,h,l),o.call(this,h,s,l),"cp"===r.data.type?h.replace(r,l):h.data.tplSet.bind?c.call(this,h,l):d.call(this,l,h)}}else{var h=new e.Element(r);h.add(a),h.text(l),void 0!==this.elReady[i]&&this.elReady[i].call(this,h,l),"true"===h.data.tplSet.update&&p(n,i,function(){h.text(n[i])}.bind(this)),o.call(this,h,s,l)}}};void 0!==r[i].forEach?r[i].forEach(s.bind(this)):s.call(this,r[i])}}.bind(this))}function u(e,i,a){if(this.eventBus=new n,this.context=f,void 0!==e.appContext&&t.extend(this.context,e.appContext),this.template){var o=new r(this.template),c=o.render();this.el=c.fragment,this.data=a?a:this.context.data[e.bind],this.children=s.call(this,c.children,i),this.bindings=h.call(this,this.children),this.data&&this.applyBinders(this.data,this)}else this.el=document.createElement("div");this.init.apply(this,arguments)}{var f={},p=i.watch;i.unwatch,i.callWatchers}return t.extend(u.prototype,{nodes:{},events:{},elReady:{},init:function(){},applyBinders:d,destroy:function(){this.el.remove()}}),u.extend=t.fnExtend,u});;!function(){function e(e,t){for(var n=0;n<e.length;n++){var r=e[n];0==r.name.indexOf("data-")&&r.name.length>5&&(t[r.name.substr(5)]=r.value)}return t}function t(){var t={},n=document.getElementsByTagName("script");if(n.length>0)for(var r=0;r<n.length;r++){var a=n[r],o=a.attributes;e(o,t)}return t}function n(e){void 0!==e.name&&require([e.name],function(t){var n=e.target?document.querySelector(e.target):document.body,r=new t;r.start(n)})}document.addEventListener("DOMContentLoaded",function(){n(t())},!1)}();