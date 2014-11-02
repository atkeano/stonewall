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

!function(t,i){"function"==typeof define&&define.amd?define("widget/mediator",[],function(){return t.Mediator=i(),t.Mediator}):"undefined"!=typeof exports?exports.Mediator=i():t.Mediator=i()}(this,function(){function t(){var t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)};return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()}function i(n,e,s){return this instanceof i?(this.id=t(),this.fn=n,this.options=e,this.context=s,void(this.channel=null)):new i(n,e,s)}function n(t,i){return this instanceof n?(this.namespace=t||"",this._subscribers=[],this._channels={},this._parent=i,void(this.stopped=!1)):new n(t)}function e(){return this instanceof e?void(this._channels=new n("")):new e}return i.prototype={update:function(t){t&&(this.fn=t.fn||this.fn,this.context=t.context||this.context,this.options=t.options||this.options,this.channel&&this.options&&void 0!==this.options.priority&&this.channel.setPriority(this.id,this.options.priority))}},n.prototype={addSubscriber:function(t,n,e){var s=new i(t,n,e);return n&&void 0!==n.priority?(n.priority=n.priority>>0,n.priority<0&&(n.priority=0),n.priority>=this._subscribers.length&&(n.priority=this._subscribers.length-1),this._subscribers.splice(n.priority,0,s)):this._subscribers.push(s),s.channel=this,s},stopPropagation:function(){this.stopped=!0},getSubscriber:function(t){var i=0,n=this._subscribers.length;for(n;n>i;i++)if(this._subscribers[i].id===t||this._subscribers[i].fn===t)return this._subscribers[i]},setPriority:function(t,i){var n,e,s,r,o=0,u=0;for(u=0,r=this._subscribers.length;r>u&&(this._subscribers[u].id!==t&&this._subscribers[u].fn!==t);u++)o++;n=this._subscribers[o],e=this._subscribers.slice(0,o),s=this._subscribers.slice(o+1),this._subscribers=e.concat(s),this._subscribers.splice(i,0,n)},addChannel:function(t){this._channels[t]=new n((this.namespace?this.namespace+":":"")+t,this)},hasChannel:function(t){return this._channels.hasOwnProperty(t)},returnChannel:function(t){return this._channels[t]},removeSubscriber:function(t){var i=this._subscribers.length-1;if(!t)return void(this._subscribers=[]);for(i;i>=0;i--)(this._subscribers[i].fn===t||this._subscribers[i].id===t)&&(this._subscribers[i].channel=null,this._subscribers.splice(i,1))},publish:function(t){var i,n,e,s=0,r=this._subscribers.length,o=!1;for(r;r>s;s++)o=!1,i=this._subscribers[s],this.stopped||(n=this._subscribers.length,void 0!==i.options&&"function"==typeof i.options.predicate?i.options.predicate.apply(i.context,t)&&(o=!0):o=!0),o&&(i.options&&void 0!==i.options.calls&&(i.options.calls--,i.options.calls<1&&this.removeSubscriber(i.id)),i.fn.apply(i.context,t),e=this._subscribers.length,r=e,e===n-1&&s--);this._parent&&this._parent.publish(t),this.stopped=!1}},e.prototype={getChannel:function(t,i){var n=this._channels,e=t.split(":"),s=0,r=e.length;if(""===t)return n;if(e.length>0)for(r;r>s;s++){if(!n.hasChannel(e[s])){if(i)break;n.addChannel(e[s])}n=n.returnChannel(e[s])}return n},subscribe:function(t,i,n,e){var s=this.getChannel(t||"",!1);return n=n||{},e=e||{},s.addSubscriber(i,n,e)},once:function(t,i,n,e){return n=n||{},n.calls=1,this.subscribe(t,i,n,e)},getSubscriber:function(t,i){var n=this.getChannel(i||"",!0);return n.namespace!==i?null:n.getSubscriber(t)},remove:function(t,i){var n=this.getChannel(t||"",!0);return n.namespace!==t?!1:void n.removeSubscriber(i)},publish:function(t){var i=this.getChannel(t||"",!0);if(i.namespace!==t)return null;var n=Array.prototype.slice.call(arguments,1);n.push(i),i.publish(n)}},e.prototype.on=e.prototype.subscribe,e.prototype.bind=e.prototype.subscribe,e.prototype.emit=e.prototype.publish,e.prototype.trigger=e.prototype.publish,e.prototype.off=e.prototype.remove,e.Channel=n,e.Subscriber=i,e.version="0.9.8",e}),define("widget/utils",[],function(){function t(t){var i=typeof t;if(!("function"===i||"object"===i&&t))return t;for(var n,e,s=1,r=arguments.length;r>s;s++){n=arguments[s];for(e in n)t[e]=n[e]}return t}function i(i,n){var e,s=this;e=i&&null!=i&&hasOwnProperty.call(i,"constructor")?i.constructor:function(){return s.apply(this,arguments)},t(e,s,n);var r=function(){this.constructor=e};return r.prototype=s.prototype,e.prototype=new r,i&&t(e.prototype,i),e.__super__=s.prototype,e}function n(t){return"[object String]"===toString.call(t)}function e(t){var i=typeof t;return"function"===i||"object"===i&&!!t}function s(t){return"[object Array]"===toString.call(t)}return{fnExtend:i,extend:t,isString:n,isObject:e,isArray:s}}),define("widget/App",["./mediator","./utils"],function(t,i){function n(){this.context=i.extend(this.setContext(),{eventBus:new t}),this.beforeInit.apply(this,arguments),void 0!==this.AppContainer&&(this.appContainer=new this.AppContainer({appContext:this.context}),this.setContext(),this.el=this.appContainer.el,setTimeout(function(){this.el.classList.add("show")}.bind(this),100)),this.init.apply(this,arguments)}return n.extend=i.fnExtend,i.extend(n.prototype,{beforeInit:function(){},init:function(){},setContext:function(){return{}},start:function(t){t instanceof HTMLElement==!0&&t.appendChild(this.el)}}),n});