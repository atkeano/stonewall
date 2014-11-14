/*!
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

!function(t,n){"function"==typeof define&&define.amd?define("widget/mediator",[],function(){return t.Mediator=n(),t.Mediator}):"undefined"!=typeof exports?exports.Mediator=n():t.Mediator=n()}(this,function(){function t(){var t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)};return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()}function n(e,i,r){return this instanceof n?(this.id=t(),this.fn=e,this.options=i,this.context=r,void(this.channel=null)):new n(e,i,r)}function e(t,n){return this instanceof e?(this.namespace=t||"",this._subscribers=[],this._channels={},this._parent=n,void(this.stopped=!1)):new e(t)}function i(){return this instanceof i?void(this._channels=new e("")):new i}return n.prototype={update:function(t){t&&(this.fn=t.fn||this.fn,this.context=t.context||this.context,this.options=t.options||this.options,this.channel&&this.options&&void 0!==this.options.priority&&this.channel.setPriority(this.id,this.options.priority))}},e.prototype={addSubscriber:function(t,e,i){var r=new n(t,e,i);return e&&void 0!==e.priority?(e.priority=e.priority>>0,e.priority<0&&(e.priority=0),e.priority>=this._subscribers.length&&(e.priority=this._subscribers.length-1),this._subscribers.splice(e.priority,0,r)):this._subscribers.push(r),r.channel=this,r},stopPropagation:function(){this.stopped=!0},getSubscriber:function(t){var n=0,e=this._subscribers.length;for(e;e>n;n++)if(this._subscribers[n].id===t||this._subscribers[n].fn===t)return this._subscribers[n]},setPriority:function(t,n){var e,i,r,s,o=0,a=0;for(a=0,s=this._subscribers.length;s>a&&(this._subscribers[a].id!==t&&this._subscribers[a].fn!==t);a++)o++;e=this._subscribers[o],i=this._subscribers.slice(0,o),r=this._subscribers.slice(o+1),this._subscribers=i.concat(r),this._subscribers.splice(n,0,e)},addChannel:function(t){this._channels[t]=new e((this.namespace?this.namespace+":":"")+t,this)},hasChannel:function(t){return this._channels.hasOwnProperty(t)},returnChannel:function(t){return this._channels[t]},removeSubscriber:function(t){var n=this._subscribers.length-1;if(!t)return void(this._subscribers=[]);for(n;n>=0;n--)(this._subscribers[n].fn===t||this._subscribers[n].id===t)&&(this._subscribers[n].channel=null,this._subscribers.splice(n,1))},publish:function(t){var n,e,i,r=0,s=this._subscribers.length,o=!1;for(s;s>r;r++)o=!1,n=this._subscribers[r],this.stopped||(e=this._subscribers.length,void 0!==n.options&&"function"==typeof n.options.predicate?n.options.predicate.apply(n.context,t)&&(o=!0):o=!0),o&&(n.options&&void 0!==n.options.calls&&(n.options.calls--,n.options.calls<1&&this.removeSubscriber(n.id)),n.fn.apply(n.context,t),i=this._subscribers.length,s=i,i===e-1&&r--);this._parent&&this._parent.publish(t),this.stopped=!1}},i.prototype={getChannel:function(t,n){var e=this._channels,i=t.split(":"),r=0,s=i.length;if(""===t)return e;if(i.length>0)for(s;s>r;r++){if(!e.hasChannel(i[r])){if(n)break;e.addChannel(i[r])}e=e.returnChannel(i[r])}return e},subscribe:function(t,n,e,i){var r=this.getChannel(t||"",!1);return e=e||{},i=i||{},r.addSubscriber(n,e,i)},once:function(t,n,e,i){return e=e||{},e.calls=1,this.subscribe(t,n,e,i)},getSubscriber:function(t,n){var e=this.getChannel(n||"",!0);return e.namespace!==n?null:e.getSubscriber(t)},remove:function(t,n){var e=this.getChannel(t||"",!0);return e.namespace!==t?!1:void e.removeSubscriber(n)},publish:function(t){var n=this.getChannel(t||"",!0);if(n.namespace!==t)return null;var e=Array.prototype.slice.call(arguments,1);e.push(n),n.publish(e)}},i.prototype.on=i.prototype.subscribe,i.prototype.bind=i.prototype.subscribe,i.prototype.emit=i.prototype.publish,i.prototype.trigger=i.prototype.publish,i.prototype.off=i.prototype.remove,i.Channel=e,i.Subscriber=n,i.version="0.9.8",i}),!function(t,n){"function"==typeof define&&define.amd?define("router/MatchBinding",n):"object"==typeof exports?module.exports=n():(t.UrlManager=t.UrlManager||{},t.UrlManager.MatchBinding=n())}(this,function(){function t(n,e){""===e?this.pattern=e=n.replace(/^\(\/\)/g,"").replace(/^\/|$/g,""):(this.pattern=n,e+=n),this.location=e.replace(/\((.*?)\)/g,"$1").replace(/^\/|$/g,"");var i=this.pattern.replace(t.ESCAPE_PARAM,"\\$&").replace(t.OPTIONAL_PARAM,"(?:$1)?").replace(t.NAMED_PARAM,function(t,n){return n?t:"([^/]+)"}).replace(t.SPLAT_PARAM,"(.*?)");this.patternRegExp=new RegExp("^"+i),this.routeHandler=[],this.leaveHandler=[],this.queryHandler=[],this.routes=[]}return t.prototype.setRoutes=function(t){return this.routes.push(t),this},t.prototype.getRoutes=function(){return this.routes},t.prototype.to=function(t){return this.routeHandler.push(t),this},t.prototype.leave=function(t){return this.leaveHandler.push(t),this},t.prototype.query=function(t){return this.queryHandler.push(t),this},t.prototype.test=function(t){return this.patternRegExp.test(t)},t.prototype.getFragment=function(t){var n=this.applyParams(t);return t.replace(n,"")},t.prototype.applyParams=function(t){var n=this.pattern.replace(/\((.*?)\)/g,"$1").split("/"),e=t.split("/");return e.splice(0,n.length).join("/")},t.prototype.extractParams=function(t){var n=this.patternRegExp.exec(t).slice(1);return n.map(function(t){return t?decodeURIComponent(t):null})},t.prototype.setSubBinder=function(t){return this.subBinder=t,t},t.prototype.getSubBinder=function(){return this.subBinder},t.prototype.getHandler=function(){return this.routeHandler},t.prototype.getLeaveHandler=function(){return this.leaveHandler},t.prototype.getQueryHandler=function(){return this.queryHandler},t.OPTIONAL_PARAM=/\((.*?)\)/g,t.NAMED_PARAM=/(\(\?)?:\w+/g,t.SPLAT_PARAM=/\*\w+/g,t.ESCAPE_PARAM=/[\-{}\[\]+?.,\\\^$|#\s]/g,t}),function(t,n){"function"==typeof define&&define.amd?define("router/MatchBinder",["./MatchBinding"],n):"object"==typeof exports?module.exports=n(require("./MatchBinding")):(t.UrlManager=t.UrlManager||{},t.UrlManager.MatchBinder=n(t.UrlManager.MatchBinding))}(this,function(t){function n(t,n,e,i){this.bindings=[],this.location=i||t||"",this.command=e,this.params=n}return n.prototype.match=function(t,n){var e=this.getMatchBinding(t,this.location);if(this.bindings.push(e),n){var i=this.getSubBinder(this.location+t);e.setSubBinder(i),n(i.match.bind(i))}return e},n.prototype.getSubBinder=function(t){return new n(t)},n.prototype.getMatchBinding=function(n,e){return new t(n,e)},n.prototype.filter=function(t){return this.bindings.filter(function(n){return n.test(t)})},n.prototype.run=function(){this.command(this)},n}),function(t,n){"function"==typeof define&&define.amd?define("router/Router",["./MatchBinder"],n):"object"==typeof exports?module.exports=n(require("./MatchBinder")):(t.UrlManager=t.UrlManager||{},t.UrlManager.Router=n(t.UrlManager.MatchBinder))}(this,function(t){function n(t){try{return decodeURIComponent(t.replace(/\+/g," "))}catch(n){return t}}function e(t,n){var e=t.split("&");e.forEach(function(t){var e=t.split("=");n(e.shift(),e.join("="))})}function i(t,n,e,i){var r,s=e.root.substring(0,e.root.length-i.length);return t=t||"",r=n===!0?this.serialize(e.query):n===!1?"":this.serialize(n),s+t+(0===r.length?"":"?"+r)}function r(){this.root=this.getBinder(),this.bindings=[]}return Array.prototype.equals=function(t){if(!t)return!1;if(this.length!=t.length)return!1;for(var n=0,e=this.length;e>n;n++)if(this[n]instanceof Array&&t[n]instanceof Array){if(!this[n].equals(t[n]))return!1}else if(this[n]!=t[n])return!1;return!0},r.prototype.getBinder=function(){return new t},r.prototype.match=function(t){t(this.root.match.bind(this.root))},r.prototype.trigger=function(t){if(this.started){var i=t.split("?",2),r={};i[1]&&e(i[1],function(t,e){e=n(e),r[t]?"string"==typeof r[t]?r[t]=[r[t],e]:r[t].push(e):r[t]=e});var s=i[0].replace(/^\/|$/g,""),o={root:s,query:r},a=[],u=!1;this.bindings.forEach(function(n){var e,i=n.pattern.replace(/\((.*?)\)/g,"$1").replace(/^\//,"").split("/"),r=n.location.split("/"),p=n.prevLoc.replace(/^\//,"").split("/"),h=function(t){var n=t.splice(r.length-i.length,i.length),e=p.splice(0,i.length);return!n.equals(e)};if(e=h(u||s.split("/"))){u=s.split("/").splice(0,r.length-i.length);var c=n.getLeaveHandler(),l=[];this.applyHandler(c,l,o,t),a.push(n)}}.bind(this)),a.forEach(function(t){this.bindings.splice(this.bindings.indexOf(t),1)}.bind(this)),this.find(this.root,s,o)}},r.prototype.find=function(t,n,e){var i=t.filter(n);i.forEach(this.onBinding.bind(this,n,e))},r.prototype.execute=function(t){var n=t.location.split("/"),e=t.params.root.split("/"),i="/"+e.splice(n.length,e.length-n.length).join("/");this.find(t,i,t.params)},r.prototype.onBinding=function(n,e,i){this.runHandler(n,e,i);var r=i.getFragment(n),s=i.getSubBinder();s&&s.bindings&&s.bindings.length>0&&this.find(s,r,e);var o=i.getRoutes();if(o&&o.length>0)for(;o.length>0;){var a=o[0],u=new t(i.getFragment(n),e,this.execute.bind(this),i.location);a(u),s.bindings=s.bindings.concat(u.bindings),o.shift()}},r.prototype.serialize=function(t){var n=[];for(var e in t)t.hasOwnProperty(e)&&n.push(encodeURIComponent(e)+"="+encodeURIComponent(t[e]));return n.join("&")},r.prototype.runHandler=function(t,n,e){if(-1===this.bindings.indexOf(e)){var i=e.getHandler(),r=e.extractParams(t);e.prevLoc=t,this.applyHandler(i,r,n,t),this.bindings.push(e)}var i=e.getQueryHandler();if(i){var r=[];this.applyHandler(i,r,n,t)}},r.prototype.applyHandler=function(t,n,e,r){t&&t.length>0&&t.forEach(function(t){t.apply(this,n.concat({getQuery:function(){return e.query},getLocation:function(t,n){return i.call(this,t,n,e,r)}.bind(this)}))}.bind(this))},r.prototype.start=function(){this.started=!0},r.prototype.stop=function(){this.started=!1},r}),define("widget/utils",[],function(){function t(t){var n=typeof t;if(!("function"===n||"object"===n&&t))return t;for(var e,i,r=1,s=arguments.length;s>r;r++){e=arguments[r];for(i in e)t[i]=e[i]}return t}function n(n,e){var i,r=this;i=n&&null!=n&&hasOwnProperty.call(n,"constructor")?n.constructor:function(){return r.apply(this,arguments)},t(i,r,e);var s=function(){this.constructor=i};return s.prototype=r.prototype,i.prototype=new s,n&&t(i.prototype,n),i.__super__=r.prototype,i}function e(t){return"[object String]"===toString.call(t)}function i(t){var n=typeof t;return"function"===n||"object"===n&&!!t}function r(t){return"[object Array]"===toString.call(t)}return{fnExtend:n,extend:t,isString:e,isObject:i,isArray:r}}),define("widget/App",["./mediator","router/Router","./utils"],function(t,n,e){function i(t){function n(){var n=window.location.href.match(/#(.*)$/);t.trigger(n?n[1]:"")}t.start(),window.addEventListener("hashchange",n,!1),n()}function r(){var r=new n;this.context=e.extend(this.setContext(),{eventBus:new t}),this.beforeInit.apply(this,arguments),void 0!==this.AppContainer&&(this.appContainer=new this.AppContainer({appContext:this.context}),void 0!==this.appContainer._match&&r.match(this.appContainer._match.bind(this.appContainer)),this.setContext(),this.el=this.appContainer.el,setTimeout(function(){this.el.classList.add("show")}.bind(this),100),i(r)),this.init.apply(this,arguments)}return r.extend=e.fnExtend,e.extend(r.prototype,{beforeInit:function(){},init:function(){},setContext:function(){return{}},start:function(t){t instanceof HTMLElement==!0&&t.appendChild(this.el)}}),r});