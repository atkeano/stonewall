!function(e,t){"function"==typeof define&&define.amd?define("templating/utils",[],t):"object"==typeof exports?module.exports=t():(e.Templating=e.Templating||{},e.Templating.utils=t())}(this,function(){return{merge:function(e,t){Object.keys(t).forEach(function(n){e[n]=t[n]})}}}),function(e,t){"function"==typeof define&&define.amd?define("coders/component/CpDecoder",["templating/Decoder"],t):"object"==typeof exports?module.exports=t(require("./Decoder")):(e.Templating=e.Templating||{},e.Templating.componentDecoder=t(e.Templating.Decoder))}(this,function(e){var t={tagName:"cp",decode:function(e,t){var n=e.data,i={name:n.name,tmpEl:function(e,o){return i.data.instance=new n.src(n.dataset,t,o),n.instance.el},data:n||{}};return void 0!==n.dataset.bind&&(i.bind=n.dataset.bind),i}};return e&&e.addDecoder(t),t});;!function(e,n){"function"==typeof define&&define.amd?define("coders/placeholders/plDecoder",["templating/Decoder"],n):"object"==typeof exports?module.exports=n(require("./Decoder")):(e.Templating=e.Templating||{},e.Templating.componentDecoder=n(e.Templating.Decoder))}(this,function(e){var n={tagName:"pl",decode:function(e,n){var t=e.data;return{name:t.name,tmpEl:function(e){return e||document.createElement(t.tag)},parse:function(e){n&&Object.keys(n).forEach(function(t){n[t].run(e)})},data:t}}};return e&&e.addDecoder(n),n});;!function(e,t){"function"==typeof define&&define.amd?define("coders/databind/bdDecoder",["templating/Decoder"],t):"object"==typeof exports?module.exports=t(require("./Decoder")):(e.Templating=e.Templating||{},e.Templating.componentDecoder=t(e.Templating.Decoder))}(this,function(e){var t={tagName:"bd",noAttach:!0,decode:function(e){var t=this.data=e.data,n={name:t.name,tmpEl:function(){return document.createElement(t.tag)},data:t,bind:t.dataset.bind||t.name};return n}};return e&&e.addDecoder(t),t});;!function(e,t){"function"==typeof define&&define.amd?define("coders/router/RouterDecoder",["templating/Decoder"],t):"object"==typeof exports?module.exports=t(require("./Decoder")):(e.Templating=e.Templating||{},e.Templating.componentDecoder=t(e.Templating.Decoder))}(this,function(e){var t={tagName:"rt",noAttach:!0,decode:function(e,t){var n=e.data,o={name:n.name,tmpEl:function(e){return e||document.createElement(n.tag)},parse:function(e){t&&Object.keys(t).forEach(function(n){t[n].run(e)})},data:n||{},route:n.route};return o}};return e&&e.addDecoder(t),t});;!function(t,e){"function"==typeof define&&define.amd?define("templating/Decoder",["templating/utils"],e):"object"==typeof exports?module.exports=e(require("./utils")):(t.Templating=t.Templating||{},t.Templating.Decoder=e(t.Templating.utils))}(this,function(t){function e(t,e){var n;n="li"===e?"ul":"td"===e||"th"===e?"tr":"tr"===e?"tbody":"div";var i=document.createElement(n),r=document.createDocumentFragment();return i.innerHTML=t,r.appendChild(i.firstChild),r.firstChild}function n(t,n,i,r){var a=this.tmpEl(n?t:!1,r),d=this.name,o=this.data.attribs,h=e(this.template,this.data.tag);if(Object.keys(o).forEach(function(t){a.setAttribute(t,o[t])}),void 0!==h)for(;h.childNodes.length>0;)a.appendChild(h.childNodes[0]);if(void 0!==d&&a.classList.add(d),i)this.setParent(i),null!==this.parent&&this.parent.appendChild(a);else{var c=t.parentNode;this.setParent(c),null!==this.parent&&this.parent.replaceChild(a,t)}return this.el=a,void 0!==this.parse&&this.parse(a),a}function i(e,i,r){var a=e.tagName;t.merge(this,{id:e.id,template:e.template,noAttach:o[a].noAttach||e.data.tplSet.noattach,instance:n.bind(this),applyAttach:function(){delete this.noAttach},setParent:function(t){this.parent=t}.bind(this),getParent:function(){return this.parent}.bind(this),run:function(t,e,n,i){if(void 0===this.noAttach){var a=t.querySelector("#"+this.id)||t;if(a)return this.instance(a,e,n,i||r)}}}),i&&(this.children=i)}function r(t,e){e||(e={});var n=!1,d=!1;return t.children.forEach(function(t){if(t.children&&t.children.length>0){var h=e[t.data.name]?e[t.data.name]:e;d=r.call(this,t,h)}var c=t.tagName;if(c){var s=o[c].decode(t,d,a);if(s){var l=s.name;void 0!==l&&(n=n||{},n[l]=s,i.call(n[l],t,d,e[l]||e))}}d=!1}.bind(this)),n}function a(t,e){Object.keys(t).forEach(function(n){t[n].run(e)})}function d(t){this._root="string"==typeof t?JSON.parse(t):t}var o={};return t.merge(d,{addDecoder:function(t){void 0===o[t.tagName]&&(o[t.tagName]=t)}}),t.merge(d.prototype,{addDecoder:d.addDecoder,_renderFragment:function(t,n){var i={},d=e(t.template);return t.children&&t.children.length>0&&(i=r.call(this,t,n||{})),a(i,d),{fragment:d,children:i}},render:function(t){var e=this._renderFragment(this._root,t);return e}}),d});;/*!
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

!function(t,n){"function"==typeof define&&define.amd?define("widget/mediator",[],function(){return t.Mediator=n(),t.Mediator}):"undefined"!=typeof exports?exports.Mediator=n():t.Mediator=n()}(this,function(){function t(){var t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)};return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()}function n(e,i,r){return this instanceof n?(this.id=t(),this.fn=e,this.options=i,this.context=r,void(this.channel=null)):new n(e,i,r)}function e(t,n){return this instanceof e?(this.namespace=t||"",this._subscribers=[],this._channels={},this._parent=n,void(this.stopped=!1)):new e(t)}function i(){return this instanceof i?void(this._channels=new e("")):new i}return n.prototype={update:function(t){t&&(this.fn=t.fn||this.fn,this.context=t.context||this.context,this.options=t.options||this.options,this.channel&&this.options&&void 0!==this.options.priority&&this.channel.setPriority(this.id,this.options.priority))}},e.prototype={addSubscriber:function(t,e,i){var r=new n(t,e,i);return e&&void 0!==e.priority?(e.priority=e.priority>>0,e.priority<0&&(e.priority=0),e.priority>=this._subscribers.length&&(e.priority=this._subscribers.length-1),this._subscribers.splice(e.priority,0,r)):this._subscribers.push(r),r.channel=this,r},stopPropagation:function(){this.stopped=!0},getSubscriber:function(t){var n=0,e=this._subscribers.length;for(e;e>n;n++)if(this._subscribers[n].id===t||this._subscribers[n].fn===t)return this._subscribers[n]},setPriority:function(t,n){var e,i,r,s,o=0,a=0;for(a=0,s=this._subscribers.length;s>a&&(this._subscribers[a].id!==t&&this._subscribers[a].fn!==t);a++)o++;e=this._subscribers[o],i=this._subscribers.slice(0,o),r=this._subscribers.slice(o+1),this._subscribers=i.concat(r),this._subscribers.splice(n,0,e)},addChannel:function(t){this._channels[t]=new e((this.namespace?this.namespace+":":"")+t,this)},hasChannel:function(t){return this._channels.hasOwnProperty(t)},returnChannel:function(t){return this._channels[t]},removeSubscriber:function(t){var n=this._subscribers.length-1;if(!t)return void(this._subscribers=[]);for(n;n>=0;n--)(this._subscribers[n].fn===t||this._subscribers[n].id===t)&&(this._subscribers[n].channel=null,this._subscribers.splice(n,1))},publish:function(t){var n,e,i,r=0,s=this._subscribers.length,o=!1;for(s;s>r;r++)o=!1,n=this._subscribers[r],this.stopped||(e=this._subscribers.length,void 0!==n.options&&"function"==typeof n.options.predicate?n.options.predicate.apply(n.context,t)&&(o=!0):o=!0),o&&(n.options&&void 0!==n.options.calls&&(n.options.calls--,n.options.calls<1&&this.removeSubscriber(n.id)),n.fn.apply(n.context,t),i=this._subscribers.length,s=i,i===e-1&&r--);this._parent&&this._parent.publish(t),this.stopped=!1}},i.prototype={getChannel:function(t,n){var e=this._channels,i=t.split(":"),r=0,s=i.length;if(""===t)return e;if(i.length>0)for(s;s>r;r++){if(!e.hasChannel(i[r])){if(n)break;e.addChannel(i[r])}e=e.returnChannel(i[r])}return e},subscribe:function(t,n,e,i){var r=this.getChannel(t||"",!1);return e=e||{},i=i||{},r.addSubscriber(n,e,i)},once:function(t,n,e,i){return e=e||{},e.calls=1,this.subscribe(t,n,e,i)},getSubscriber:function(t,n){var e=this.getChannel(n||"",!0);return e.namespace!==n?null:e.getSubscriber(t)},remove:function(t,n){var e=this.getChannel(t||"",!0);return e.namespace!==t?!1:void e.removeSubscriber(n)},publish:function(t){var n=this.getChannel(t||"",!0);if(n.namespace!==t)return null;var e=Array.prototype.slice.call(arguments,1);e.push(n),n.publish(e)}},i.prototype.on=i.prototype.subscribe,i.prototype.bind=i.prototype.subscribe,i.prototype.emit=i.prototype.publish,i.prototype.trigger=i.prototype.publish,i.prototype.off=i.prototype.remove,i.Channel=e,i.Subscriber=n,i.version="0.9.8",i}),!function(t,n){"function"==typeof define&&define.amd?define("router/MatchBinding",n):"object"==typeof exports?module.exports=n():(t.UrlManager=t.UrlManager||{},t.UrlManager.MatchBinding=n())}(this,function(){function t(n,e){""===e?this.pattern=e=n.replace(/^\(\/\)/g,"").replace(/^\/|$/g,""):(this.pattern=n,e+=n),this.location=e.replace(/\((.*?)\)/g,"$1").replace(/^\/|$/g,"");var i=this.pattern.replace(t.ESCAPE_PARAM,"\\$&").replace(t.OPTIONAL_PARAM,"(?:$1)?").replace(t.NAMED_PARAM,function(t,n){return n?t:"([^/]+)"}).replace(t.SPLAT_PARAM,"(.*?)");this.patternRegExp=new RegExp("^"+i),this.routeHandler=[],this.leaveHandler=[],this.queryHandler=[],this.routes=[]}return t.prototype.onBind=function(){},t.prototype.setOnBind=function(t){this.onBind=t},t.prototype.rebind=function(){void 0!==this.onBind&&this.onBind()},t.prototype.setRoutes=function(t){return this.routes.push(t),this},t.prototype.getRoutes=function(){return this.routes},t.prototype.to=function(t){return this.routeHandler.push(t),this},t.prototype.leave=function(t){return this.leaveHandler.push(t),this},t.prototype.query=function(t){return this.queryHandler.push(t),this},t.prototype.test=function(t){return this.patternRegExp.test(t)},t.prototype.getFragment=function(t){var n=this.applyParams(t);return t.replace(n,"")},t.prototype.applyParams=function(t){var n=this.pattern.replace(/\((.*?)\)/g,"$1").split("/"),e=t.split("/");return e.splice(0,n.length).join("/")},t.prototype.extractParams=function(t){var n=this.patternRegExp.exec(t).slice(1);return n.map(function(t){return t?decodeURIComponent(t):null})},t.prototype.setSubBinder=function(t){return this.subBinder=t,t},t.prototype.getSubBinder=function(){return this.subBinder},t.prototype.getHandler=function(){return this.routeHandler},t.prototype.getLeaveHandler=function(){return this.leaveHandler},t.prototype.getQueryHandler=function(){return this.queryHandler},t.OPTIONAL_PARAM=/\((.*?)\)/g,t.NAMED_PARAM=/(\(\?)?:\w+/g,t.SPLAT_PARAM=/\*\w+/g,t.ESCAPE_PARAM=/[\-{}\[\]+?.,\\\^$|#\s]/g,t}),function(t,n){"function"==typeof define&&define.amd?define("router/MatchBinder",["./MatchBinding"],n):"object"==typeof exports?module.exports=n(require("./MatchBinding")):(t.UrlManager=t.UrlManager||{},t.UrlManager.MatchBinder=n(t.UrlManager.MatchBinding))}(this,function(t){function n(t,n,e,i){this.bindings=[],this.location=i||t||"",this.command=e,this.params=n}return n.prototype.match=function(t,n){var e=this.getMatchBinding(t,this.location);this.bindings.push(e);var i=this.getSubBinder(this.location+t);return e.setSubBinder(i),n&&n(i.match.bind(i)),e},n.prototype.getSubBinder=function(t){return new n(t)},n.prototype.getMatchBinding=function(n,e){return new t(n,e)},n.prototype.filter=function(t){return this.bindings.filter(function(n){return n.test(t)})},n.prototype.run=function(){this.command(this)},n}),function(t,n){"function"==typeof define&&define.amd?define("router/Router",["./MatchBinder"],n):"object"==typeof exports?module.exports=n(require("./MatchBinder")):(t.UrlManager=t.UrlManager||{},t.UrlManager.Router=n(t.UrlManager.MatchBinder))}(this,function(t){function n(t){try{return decodeURIComponent(t.replace(/\+/g," "))}catch(n){return t}}function e(t,n){var e=t.split("&");e.forEach(function(t){var e=t.split("=");n(e.shift(),e.join("="))})}function i(t,n,e,i){var r,s=e.root.substring(0,e.root.length-i.length);return t=t||"",r=n===!0?this.serialize(e.query):n===!1?"":this.serialize(n),s+t+(0===r.length?"":"?"+r)}function r(){this.root=this.getBinder(),this.bindings=[]}return Array.prototype.equals=function(t){if(!t)return!1;if(this.length!=t.length)return!1;for(var n=0,e=this.length;e>n;n++)if(this[n]instanceof Array&&t[n]instanceof Array){if(!this[n].equals(t[n]))return!1}else if(this[n]!=t[n])return!1;return!0},r.prototype.getBinder=function(){return new t},r.prototype.match=function(t){t(this.root.match.bind(this.root))},r.prototype.trigger=function(t){if(this.started){var i=t.split("?",2),r={};i[1]&&e(i[1],function(t,e){e=n(e),r[t]?"string"==typeof r[t]?r[t]=[r[t],e]:r[t].push(e):r[t]=e});var s=i[0].replace(/^\/|$/g,""),o={root:s,query:r},a=[],u=!1;this.bindings.forEach(function(n){var e,i=n.pattern.replace(/\((.*?)\)/g,"$1").replace(/^\//,"").split("/"),r=n.location.split("/"),p=n.prevLoc.replace(/^\//,"").split("/"),h=function(t){var n=t.splice(r.length-i.length,i.length),e=p.splice(0,i.length);return!n.equals(e)};if(e=h(u||s.split("/"))){u=s.split("/").splice(0,r.length-i.length);var c=n.getLeaveHandler(),l=[];n.setOnBind(),this.applyHandler(c,l,o,t),a.push(n)}}.bind(this)),a.forEach(function(t){this.bindings.splice(this.bindings.indexOf(t),1)}.bind(this)),this.find(this.root,s,o)}},r.prototype.find=function(t,n,e){var i=t.filter(n);i.forEach(this.onBinding.bind(this,n,e))},r.prototype.execute=function(t){var n=t.location.split("/"),e=t.params.root.split("/"),i="/"+e.splice(n.length,e.length-n.length).join("/");this.find(t,i,t.params)},r.prototype.onBinding=function(n,e,i){i.setOnBind(this.onBinding.bind(this,n,e,i)),this.runHandler(n,e,i);var r=i.getFragment(n),s=i.getSubBinder();s&&s.bindings&&s.bindings.length>0&&this.find(s,r,e);var o=i.getRoutes();if(o&&o.length>0)for(;o.length>0;){var a=o[0],u=new t(i.getFragment(n),e,this.execute.bind(this),i.location);a(u),s.bindings=s.bindings.concat(u.bindings),o.shift()}},r.prototype.serialize=function(t){var n=[];for(var e in t)t.hasOwnProperty(e)&&n.push(encodeURIComponent(e)+"="+encodeURIComponent(t[e]));return n.join("&")},r.prototype.runHandler=function(t,n,e){if(-1===this.bindings.indexOf(e)){var i=e.getHandler(),r=e.extractParams(t);e.prevLoc=t,this.applyHandler(i,r,n,t),this.bindings.push(e)}var i=e.getQueryHandler();if(i){var r=[];this.applyHandler(i,r,n,t)}},r.prototype.applyHandler=function(t,n,e,r){t&&t.length>0&&t.forEach(function(t){t.apply(this,n.concat({getQuery:function(){return e.query},getLocation:function(t,n){return i.call(this,t,n,e,r)}.bind(this)}))}.bind(this))},r.prototype.start=function(){this.started=!0},r.prototype.stop=function(){this.started=!1},r}),define("widget/utils",[],function(){function t(t){var n=typeof t;if(!("function"===n||"object"===n&&t))return t;for(var e,i,r=1,s=arguments.length;s>r;r++){e=arguments[r];for(i in e)t[i]=e[i]}return t}function n(n,e){var i,r=this;i=n&&null!=n&&hasOwnProperty.call(n,"constructor")?n.constructor:function(){return r.apply(this,arguments)},t(i,r,e);var s=function(){this.constructor=i};return s.prototype=r.prototype,i.prototype=new s,n&&t(i.prototype,n),i.__super__=r.prototype,i}function e(t){return"[object String]"===toString.call(t)}function i(t){var n=typeof t;return"function"===n||"object"===n&&!!t}function r(t){return"[object Array]"===toString.call(t)}return{fnExtend:n,extend:t,isString:e,isObject:i,isArray:r}}),define("widget/App",["./mediator","router/Router","./utils"],function(t,n,e){function i(t){function n(){var n=window.location.href.match(/#(.*)$/);t.trigger(n?n[1]:"")}t.start(),window.addEventListener("hashchange",n,!1),n()}function r(){var r=new n;this.context=e.extend(this.setContext(),{eventBus:new t}),this.beforeInit.apply(this,arguments),void 0!==this.AppContainer&&(this.appContainer=new this.AppContainer({appContext:this.context}),void 0!==this.appContainer._match&&r.match(this.appContainer._match.bind(this.appContainer)),this.setContext(),this.el=this.appContainer.el,setTimeout(function(){this.el.classList.add("show")}.bind(this),100),i(r)),this.init.apply(this,arguments)}return r.extend=e.fnExtend,e.extend(r.prototype,{beforeInit:function(){},init:function(){},setContext:function(){return{}},start:function(t){t instanceof HTMLElement==!0&&t.appendChild(this.el)}}),r});;define("widget/dom",["./utils"],function(t){function e(e){var n=t.extend({},e);t.extend(this,n)}var n={append:function(t,e,n){e.placeholder=t.el.querySelector("#"+e.id),e.el=e.run(t.el,!0,!1,n)},replace:function(t){t.el.innerHTML="",n.append.apply(this,arguments)},detach:function(t){t&&t.el&&t.el.parentNode&&t.el.parentNode.replaceChild(t.placeholder,t.el)},attach:function(t){t&&t.el&&t.placeholder&&t.placeholder.parentNode&&t.placeholder.parentNode.replaceChild(t.el,t.placeholder)},add:function(t,e,n,i){t.placeholder=e.querySelector("#"+t.id),t.el=t.run(e,!1,n,i)},text:function(t,e){t&&t.el&&(t.el.innerHTML=e)},setAttribute:function(e,n,i){e&&e.el&&(t.isObject(n)?Object.keys(n).forEach(function(t){e.el.setAttribute(t,n[t])}.bind(this)):e.el.setAttribute(n,i))},removeAttribute:function(t,e){t&&t.el&&t.el.removeAttribute(e)},setStyle:function(e,n,i){e&&e.el&&(t.isObject(n)?Object.keys(n).forEach(function(t){e.el.style[t]=n[t]}.bind(this)):e.el.style[n]=i)},removeStyle:function(t,e){t&&t.el&&delete t.el.style[e]},addClass:function(t,e){t&&t.el&&t.el.classList.add(e)},removeClass:function(t,e){t&&t.el&&t.el.classList.remove(e)},val:function(t,e){if(t&&t.el){var n=t.el;if(void 0===e)return n.value;n.value=e}},on:function(t,e,n,i){var a=Array.prototype.slice.call(arguments,4,arguments.length),r=t.el,c=e.split(" "),s=function(e){n.apply(i||this,[e,t].concat(a))};return c.forEach(function(t){r.addEventListener(t,s)}),{remove:function(){c.forEach(function(t){r.removeEventListener(t,s)})}}},remove:function(t){t.el.remove()},Element:e};return t.extend(e.prototype,{append:function(t){n.append(this,t)},replace:function(t,e){n.replace(this,t,e)},text:function(t){n.text(this,t)},add:function(t,e,i){n.add(this,t,e,i)},detach:function(){n.detach(this)},attach:function(){n.attach(this)},setAttribute:function(t,e){n.setAttribute(this,t,e)},removeAttribute:function(t){n.removeAttribute(this,t)},setStyle:function(t,e){n.setStyle(this,t,e)},removeStyle:function(t){n.removeStyle(this,t)},addClass:function(t){n.addClass(this,t)},removeClass:function(t){n.removeClass(this,t)},val:function(t){return n.val(this,t)},on:function(){var t=Array.prototype.slice.call(arguments,0);return n.on.apply(!1,[this].concat(t))},remove:function(){n.remove(this)}}),e.extend=t.fnExtend,n}),function(t,e){"function"==typeof define&&define.amd?define("templating/utils",[],e):"object"==typeof exports?module.exports=e():(t.Templating=t.Templating||{},t.Templating.utils=e())}(this,function(){return{merge:function(t,e){Object.keys(e).forEach(function(n){t[n]=e[n]})}}}),function(t,e){"function"==typeof define&&define.amd?define("templating/Decoder",["templating/utils"],e):"object"==typeof exports?module.exports=e(require("./utils")):(t.Templating=t.Templating||{},t.Templating.Decoder=e(t.Templating.utils))}(this,function(t){function e(t,e){var n;n="li"===e?"ul":"td"===e||"th"===e?"tr":"tr"===e?"tbody":"div";var i=document.createElement(n),a=document.createDocumentFragment();return i.innerHTML=t,a.appendChild(i.firstChild),a.firstChild}function n(t,n,i,a){var r=this.tmpEl(n?t:!1,a),c=this.name,s=this.data.attribs,o=e(this.template,this.data.tag);if(Object.keys(s).forEach(function(t){r.setAttribute(t,s[t])}),void 0!==o)for(;o.childNodes.length>0;)r.appendChild(o.childNodes[0]);if(void 0!==c&&r.classList.add(c),i)this.setParent(i),null!==this.parent&&this.parent.appendChild(r);else{var l=t.parentNode;this.setParent(l),null!==this.parent&&this.parent.replaceChild(r,t)}return this.el=r,void 0!==this.parse&&this.parse(r),r}function i(e,i,a){var r=e.tagName;t.merge(this,{id:e.id,template:e.template,noAttach:s[r].noAttach||e.data.tplSet.noattach,instance:n.bind(this),applyAttach:function(){delete this.noAttach},setParent:function(t){this.parent=t}.bind(this),getParent:function(){return this.parent}.bind(this),run:function(t,e,n,i){if(void 0===this.noAttach){var r=t.querySelector("#"+this.id)||t;if(r)return this.instance(r,e,n,i||a)}}}),i&&(this.children=i)}function a(t,e){e||(e={});var n=!1,c=!1;return t.children.forEach(function(t){if(t.children&&t.children.length>0){var o=e[t.data.name]?e[t.data.name]:e;c=a.call(this,t,o)}var l=t.tagName;if(l){var h=s[l].decode(t,c,r);if(h){var d=h.name;void 0!==d&&(n=n||{},n[d]=h,i.call(n[d],t,c,e[d]||e))}}c=!1}.bind(this)),n}function r(t,e){Object.keys(t).forEach(function(n){t[n].run(e)})}function c(t){this._root="string"==typeof t?JSON.parse(t):t}var s={};return t.merge(c,{addDecoder:function(t){void 0===s[t.tagName]&&(s[t.tagName]=t)}}),t.merge(c.prototype,{addDecoder:c.addDecoder,_renderFragment:function(t,n){var i={},c=e(t.template);return t.children&&t.children.length>0&&(i=a.call(this,t,n||{})),r(i,c),{fragment:c,children:i}},render:function(t){var e=this._renderFragment(this._root,t);return e}}),c}),function(t){"object"==typeof exports?module.exports=t():"function"==typeof define&&define.amd?define("watch",t):(window.WatchJS=t(),window.watch=window.WatchJS.watch,window.unwatch=window.WatchJS.unwatch,window.callWatchers=window.WatchJS.callWatchers)}(function(){var t={noMore:!1},e=[],n=function(t){var e={};return t&&"[object Function]"==e.toString.call(t)},i=function(t){return"[object Array]"===Object.prototype.toString.call(t)},a=function(t,e){var n=[],a=[];if("string"!=typeof t&&"string"!=typeof e){if(i(t))for(var r=0;r<t.length;r++)void 0===e[r]&&n.push(r);else for(var r in t)t.hasOwnProperty(r)&&void 0===e[r]&&n.push(r);if(i(e))for(var c=0;c<e.length;c++)void 0===t[c]&&a.push(c);else for(var c in e)e.hasOwnProperty(c)&&void 0===t[c]&&a.push(c)}return{added:n,removed:a}},r=function(t){if(null==t||"object"!=typeof t)return t;var e=t.constructor();for(var n in t)e[n]=t[n];return e},c=function(t,e,n,i){try{Object.observe(t,function(t){t.forEach(function(t){t.name===e&&i(t.object[t.name])})})}catch(a){try{Object.defineProperty(t,e,{get:n,set:i,enumerable:!0,configurable:!0})}catch(r){try{Object.prototype.__defineGetter__.call(t,e,n),Object.prototype.__defineSetter__.call(t,e,i)}catch(c){throw new Error("watchJS error: browser not supported :/")}}}},s=function(t,e,n){try{Object.defineProperty(t,e,{enumerable:!1,configurable:!0,writable:!1,value:n})}catch(i){t[e]=n}},o=function(){n(arguments[1])?l.apply(this,arguments):i(arguments[1])?h.apply(this,arguments):d.apply(this,arguments)},l=function(t,e,n,a){if("string"!=typeof t&&(t instanceof Object||i(t))){var r=[];if(i(t))for(var c=0;c<t.length;c++)r.push(c);else for(var s in t)"$val"!=s&&Object.prototype.hasOwnProperty.call(t,s)&&r.push(s);h(t,r,e,n,a),a&&E(t,"$$watchlengthsubjectroot",e,n)}},h=function(t,e,n,a,r){if("string"!=typeof t&&(t instanceof Object||i(t)))for(var c=0;c<e.length;c++){var s=e[c];d(t,s,n,a,r)}},d=function(t,e,a,r,c){"string"!=typeof t&&(t instanceof Object||i(t))&&(n(t[e])||(null!=t[e]&&(void 0===r||r>0)&&l(t[e],a,void 0!==r?r-1:r),v(t,e,a,r),c&&(void 0===r||r>0)&&E(t,e,a,r)))},u=function(){n(arguments[1])?f.apply(this,arguments):i(arguments[1])?p.apply(this,arguments):w.apply(this,arguments)},f=function(t,e){if(!(t instanceof String)&&(t instanceof Object||i(t)))if(i(t)){for(var n=[],a=0;a<t.length;a++)n.push(a);p(t,n,e)}else{var r=function(t){var n=[];for(var i in t)t.hasOwnProperty(i)&&(t[i]instanceof Object?r(t[i]):n.push(i));p(t,n,e)};r(t)}},p=function(t,e,n){for(var i in e)e.hasOwnProperty(i)&&w(t,e[i],n)},v=function(e,n,i,a){var r=e[n];g(e,n),e.watchers||s(e,"watchers",{}),e.watchers[n]||(e.watchers[n]=[]);for(var o=0;o<e.watchers[n].length;o++)if(e.watchers[n][o]===i)return;e.watchers[n].push(i);var h=function(){return r},d=function(c){var s=r;r=c,0!==a&&e[n]&&l(e[n],i,void 0===a?a:a-1),g(e,n),t.noMore||s!==c&&(b(e,n,"set",c,s),t.noMore=!1)};c(e,n,h,d)},b=function(t,e,n,i,a){if(void 0!==e)for(var r=0;r<t.watchers[e].length;r++)t.watchers[e][r].call(t,e,n,i,a);else for(var e in t)t.hasOwnProperty(e)&&b(t,e,n,i,a)},m=["pop","push","reverse","shift","sort","slice","unshift","splice"],y=function(t,e,n,i){s(t[e],i,function(){var a=n.apply(t[e],arguments);return d(t,t[e]),"slice"!==i&&b(t,e,i,arguments),a})},g=function(t,e){if(t[e]&&!(t[e]instanceof String)&&i(t[e]))for(var n,a=m.length;a--;)n=m[a],y(t,e,t[e][n],n)},w=function(t,e,n){for(var i=0;i<t.watchers[e].length;i++){var a=t.watchers[e][i];a==n&&t.watchers[e].splice(i,1)}O(t,e,n)},j=function(){for(var t=0;t<e.length;t++){var n=e[t];if("$$watchlengthsubjectroot"===n.prop){var i=a(n.obj,n.actual);(i.added.length||i.removed.length)&&(i.added.length&&h(n.obj,i.added,n.watcher,n.level-1,!0),n.watcher.call(n.obj,"root","differentattr",i,n.actual)),n.actual=r(n.obj)}else{var i=a(n.obj[n.prop],n.actual);if(i.added.length||i.removed.length){if(i.added.length)for(var c=0;c<n.obj.watchers[n.prop].length;c++)h(n.obj[n.prop],i.added,n.obj.watchers[n.prop][c],n.level-1,!0);b(n.obj,n.prop,"differentattr",i,n.actual)}n.actual=r(n.obj[n.prop])}}},E=function(t,n,i,a){var c;c=r("$$watchlengthsubjectroot"===n?t:t[n]),e.push({obj:t,prop:n,actual:c,watcher:i,level:a})},O=function(t,n,i){for(var a=0;a<e.length;a++){var r=e[a];r.obj==t&&r.prop==n&&r.watcher==i&&e.splice(a,1)}};return setInterval(j,50),t.watch=o,t.unwatch=u,t.callWatchers=b,t}),define("widget/parsers/applyAttribute",["watch"],function(t){function e(t,e){var i=t.data.tplSet.bind,a=t.data.tplSet.update;i&&Object.keys(i).forEach(function(r){var c=i[r];if(void 0!==e[c])if("class"===r){t.addClass(e[c]);var s=e[c];"true"===a&&n(e,c,function(){t.removeClass(s),t.addClass(e[c]),s=e[c]}.bind(this))}else"checked"===r?(t.el.checked=e[c],"true"===a&&n(e,c,function(){t.el.checked=e[c]}.bind(this))):(t.setAttribute(r,e[c]),"true"===a&&n(e,c,function(){t.setAttribute(r,e[c])}.bind(this)));void 0!==e.text&&(t.text(e.text),"true"===a&&n(e,"text",function(){t.text(e.text)}.bind(this)))})}{var n=t.watch;t.unwatch,t.callWatchers}return e}),define("widget/parsers/applyEvents",[],function(){function t(t,e,n){void 0!==e&&void 0!==t.el&&e.forEach(function(e){t.on(e.name,e.action,this,n)}.bind(this))}return t}),define("widget/parsers/setBinders",[],function(){function t(t){var e=!1;return Object.keys(t).forEach(function(n){e=e||{};var i=t[n];void 0!==i.bind&&(e[i.bind]=e[i.bind]||[],e[i.bind].push(i))}.bind(this)),e}return t}),define("widget/parsers/deepBindings",["./setBinders"],function(t){function e(n){return Object.keys(n).forEach(function(i){var a=n[i];a.children&&(n[i].children=e(a.children),n[i].bindings=t(a.children))}),n}return e}),define("widget/parsers/setChildren",["../dom","./applyEvents","./setBinders","./deepBindings"],function(t,e,n,i){function a(e){return Object.keys(e).forEach(function(n){e[n]instanceof t.Element!=!0&&(e[n]=new t.Element(e[n])),e[n].children&&(e[n].children=a(e[n].children))}.bind(this)),e}function r(t,c){return c=c?a(c):{},t=t?a(t):{},Object.keys(t).forEach(function(a){var s=t[a].children;void 0!==s&&(s=r.call(this,s,c.children),t[a].bindings=n(s));var o=t[a],l=c[a];void 0!==l?(void 0!==l.children&&(l.bindings=i(l.children)),void 0!==this.nodes[a]?this.nodes[a].call(this,o,l):void 0!==o&&(o.replace(l),void 0!==l.children&&(o.children=l.children))):void 0!==this.nodes[a]&&"true"===o.data.tplSet.noattach&&this.nodes[a].call(this,o),void 0!==this.elReady[a]&&void 0!==o.el&&this.elReady[a].call(this,o);var h=this.events[a];e.call(this,o,h)}.bind(this)),t}return r}),define("widget/parsers/applyBinders",["../dom","../utils","watch","./applyEvents","./applyAttribute"],function(t,e,n,i,a){function r(n,s){var o=s.bindings,l=s.el;n&&Object.keys(n).forEach(function(s){if(void 0!==o&&void 0!==o[s]){var h=function(o){var h=this.events[o.name];if(void 0!==o){var d=n[s];if(o.applyAttach(),this.nodes[s]){var u=new t.Element(o);this.nodes[s].call(this,u,l,d)}else if(e.isArray(d)||e.isObject(d)){if(e.isArray(d)){o.applyAttach();var f=function(){var e=!1,u=[],f=function(n){var c=new t.Element(o);e?c.add(l,e):(c.add(l),e=o.getParent()),this.elReady[c.name]&&this.elReady[c.name].call(this,c,n),a.call(this,c,n),r.call(this,n,c),i.call(this,c,h,n),u.push({binder:c,data:n})};d.forEach(f.bind(this));var p=o.data.tplSet.update;if("true"===p){var v=["pop","shift","splice"];c(n,s,function(t,e,i,a){void 0===a&&"push"==e?f.call(this,i[0]):-1!==v.indexOf(e)&&u.forEach(function(t,e){-1===n[s].indexOf(t.data)&&(t.binder.remove(),u.splice(e,1))}.bind(this))}.bind(this))}};f.call(this)}else if(e.isObject(d)){var u=new t.Element(o);u.add(l),this.elReady[u.name]&&this.elReady[u.name].call(this,u,d),i.call(this,u,h,d),"cp"===o.data.type?u.replace(o,d):u.data.tplSet.bind?a.call(this,u,d):r.call(this,d,u)}}else{var u=new t.Element(o);u.add(l),u.text(d),void 0!==this.elReady[u.name]&&this.elReady[u.name].call(this,u,d),"true"===u.data.tplSet.update&&c(n,s,function(){u.text(n[s])}.bind(this)),i.call(this,u,h,d)}}};void 0!==o[s].forEach?o[s].forEach(h.bind(this)):h.call(this,o[s])}}.bind(this))}{var c=n.watch;n.unwatch,n.callWatchers}return r}),define("widget/parsers/setRoutes",[],function(){function t(t){t.data.instance&&delete t.data.instance,t.el&&(t.el.remove(),delete t.el)}function e(t,e){void 0!==t&&Object.keys(t).forEach(function(n){var i=t[n];e.call(this,i,i.data.instance)}.bind(this))}function n(i,a,r){var c=Object.keys(i);c.forEach(function(c){var s=i[c],o=s.data.route;if(void 0!==o&&"cp"!==s.data.type){var l=a(o,function(t){void 0!==s.children&&n.call(this,s.children,t,r)}.bind(this));l.to(function(){var n=[].slice.call(arguments,0),i=n.pop();if(n.length>0)var a=n.join("_");void 0!==s.el&&s.sessId!==a&&void 0!==a&&(e.call(this,s.children,t),t(s)),e.call(this,s.children,function(t,e){var a=t.data,r=a.dataset;r.params=i,n.length>0&&(r.link=n,e&&e.to&&e.to.apply(e,n.concat(i)))}),void 0===s.el?(s.applyAttach(),s.add(r,!1),e.call(this,s.children,function(t,e){e&&e.to&&e.to.apply(e,n.concat(i)),!t.el&&e&&e._match&&(l.setRoutes(function(t){e._match.call(e,t.match.bind(t)),t.run()}.bind(this)),e._reRoute=function(){e._applyRoutes(l)})}),a&&(s.sessId=a)):s.attach()}.bind(this)),l.leave(function(){e.call(this,s.children,function(t,e){e&&void 0!==e.leave&&e.leave()}.bind(this)),s.detach()}.bind(this)),l.query(function(t){e.call(this,s.children,function(e,n){n&&void 0!==n.query&&n.query(t)}.bind(this))}.bind(this))}else if(void 0!==s.children&&"cp"!==s.data.type)n.call(this,s.children,a,r);else if("cp"===s.data.type&&s.data.instance){var h=s.data.instance;h._match.call(h,a)}}.bind(this))}function i(t){if(!this._match){var e=this.el;this._match=function(i){n.call(this,t,i,e),this.match&&this.match.call(this,i)}.bind(this)}}return i}),define("widget/Constructor",["./dom","./utils","./mediator","templating/Decoder","./parsers/applyAttribute","./parsers/setChildren","./parsers/applyBinders","./parsers/setBinders","./parsers/setRoutes","./parsers/applyEvents"],function(t,e,n,i,a,r,c,s,o,l){function h(t,a,c){if(this._routes=[],this.children={},this.eventBus=new n,this.context=d,void 0!==t.appContext&&e.extend(this.context,t.appContext),this.beforeInit.apply(this,arguments),this.template){var l=c?Object.keys(c):[];this.data=l.length>0?c:this.context.data[t.bind];var h=new i(this.template),u=h.render(this.data);this.el=u.fragment,this.children=e.extend(r.call(this,u.children,a),this.children),this.bindings=s.call(this,this.children),this.routes=o.call(this,this.children),this.data&&this.applyBinders(this.data,this)}else this.el=document.createElement("div");this.init.apply(this,arguments)}var d={};return e.extend(h.prototype,{nodes:{},events:{},elReady:{},init:function(){},beforeInit:function(){},applyBinders:c,destroy:function(){this.el.remove()},setRoutes:function(t){void 0!==t&&this._routes.push(t)},_applyRoutes:function(t){for(;this._routes.length>0;){var e=this._routes[0];e&&e._match&&t.setRoutes(function(t){e._match.call(e,t.match.bind(t)),t.run()}.bind(this)),this._routes.shift()}t.rebind()},_reRoute:function(){},rebind:function(){this._reRoute()},setChildren:function(e,n){var i=e.name;void 0!==this.children[i]&&void 0!==this.children[i].el&&this.children[i].detach(),e.applyAttach(),this.children[i]=new t.Element(e),this.children[i].placeholder=this.el.querySelector("#"+e.id),this.children[i].el=e.run(this.el,!1,!1,n),void 0!==this.elReady[i]&&void 0!==this.children[i].el&&this.elReady[i].call(this,this.children[i]);var a=this.events[i];l.call(this,this.children[i],a);var r=this.children[i].data.instance;this.setRoutes(r),this.rebind()}}),h.extend=e.fnExtend,h});;!function(){function e(e,t){for(var n=0;n<e.length;n++){var r=e[n];0==r.name.indexOf("data-")&&r.name.length>5&&(t[r.name.substr(5)]=r.value)}return t}function t(){var t={},n=document.getElementsByTagName("script");if(n.length>0)for(var r=0;r<n.length;r++){var a=n[r],o=a.attributes;e(o,t)}return t}function n(e){void 0!==e.name&&require([e.name],function(t){var n=e.target?document.querySelector(e.target):document.body,r=new t;r.start(n)})}document.addEventListener("DOMContentLoaded",function(){n(t())},!1)}();