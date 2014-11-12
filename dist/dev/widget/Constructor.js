!function(t,e){"function"==typeof define&&define.amd?define("templating/utils",[],e):"object"==typeof exports?module.exports=e():(t.Templating=t.Templating||{},t.Templating.utils=e())}(this,function(){return{merge:function(t,e){Object.keys(e).forEach(function(n){t[n]=e[n]})}}}),function(t,e){"function"==typeof define&&define.amd?define("templating/Decoder",["templating/utils"],e):"object"==typeof exports?module.exports=e(require("./utils")):(t.Templating=t.Templating||{},t.Templating.Decoder=e(t.Templating.utils))}(this,function(t){function e(t,e){var n;n="li"===e?"ul":"td"===e||"th"===e?"tr":"tr"===e?"tbody":"div";var i=document.createElement(n),r=document.createDocumentFragment();return i.innerHTML=t,r.appendChild(i.firstChild),r.firstChild}function n(t,n,i,r){var a=this.tmpEl(n?t:!1,r),c=this.name,o=this.data.attribs,s=e(this.template,this.data.tag);if(Object.keys(o).forEach(function(t){a.setAttribute(t,o[t])}),void 0!==s)for(;s.childNodes.length>0;)a.appendChild(s.childNodes[0]);if(void 0!==c&&a.classList.add(c),i)this.setParent(i),null!==this.parent&&this.parent.appendChild(a);else{var l=t.parentNode;this.setParent(l),null!==this.parent&&this.parent.replaceChild(a,t)}return this.el=a,void 0!==this.parse&&this.parse(a),a}function i(e,i){var r=e.tagName;t.merge(this,{id:e.id,template:e.template,noAttach:o[r].noAttach||e.data.tplSet.noattach,instance:n.bind(this),applyAttach:function(){delete this.noAttach},setParent:function(t){this.parent=t}.bind(this),getParent:function(){return this.parent}.bind(this),run:function(t,e,n,i){if(void 0===this.noAttach){var r=t.querySelector("#"+this.id)||t;if(r)return this.instance(r,e,n,i)}}}),i&&(this.children=i)}function r(t){var e=!1,n=!1;return t.children.forEach(function(t){t.children&&t.children.length>0&&(n=r.call(this,t));var c=t.tagName;if(c){var s=o[c].decode(t,n,a);if(s){var l=s.name;void 0!==l&&(e=e||{},e[l]=s,i.call(e[l],t,n))}}n=!1}.bind(this)),e}function a(t,e){Object.keys(t).forEach(function(n){t[n].run(e)})}function c(t){this._root="string"==typeof t?JSON.parse(t):t}var o={};return t.merge(c,{addDecoder:function(t){void 0===o[t.tagName]&&(o[t.tagName]=t)}}),t.merge(c.prototype,{addDecoder:c.addDecoder,_renderFragment:function(t){var n={},i=e(t.template);return t.children&&t.children.length>0&&(n=r.call(this,t)),a(n,i),{fragment:i,children:n}},render:function(){var t=this._renderFragment(this._root);return t}}),c}),function(t){"object"==typeof exports?module.exports=t():"function"==typeof define&&define.amd?define("watch",t):(window.WatchJS=t(),window.watch=window.WatchJS.watch,window.unwatch=window.WatchJS.unwatch,window.callWatchers=window.WatchJS.callWatchers)}(function(){var t={noMore:!1},e=[],n=function(t){var e={};return t&&"[object Function]"==e.toString.call(t)},i=function(t){return"[object Array]"===Object.prototype.toString.call(t)},r=function(t,e){var n=[],r=[];if("string"!=typeof t&&"string"!=typeof e){if(i(t))for(var a=0;a<t.length;a++)void 0===e[a]&&n.push(a);else for(var a in t)t.hasOwnProperty(a)&&void 0===e[a]&&n.push(a);if(i(e))for(var c=0;c<e.length;c++)void 0===t[c]&&r.push(c);else for(var c in e)e.hasOwnProperty(c)&&void 0===t[c]&&r.push(c)}return{added:n,removed:r}},a=function(t){if(null==t||"object"!=typeof t)return t;var e=t.constructor();for(var n in t)e[n]=t[n];return e},c=function(t,e,n,i){try{Object.observe(t,function(t){t.forEach(function(t){t.name===e&&i(t.object[t.name])})})}catch(r){try{Object.defineProperty(t,e,{get:n,set:i,enumerable:!0,configurable:!0})}catch(a){try{Object.prototype.__defineGetter__.call(t,e,n),Object.prototype.__defineSetter__.call(t,e,i)}catch(c){throw new Error("watchJS error: browser not supported :/")}}}},o=function(t,e,n){try{Object.defineProperty(t,e,{enumerable:!1,configurable:!0,writable:!1,value:n})}catch(i){t[e]=n}},s=function(){n(arguments[1])?l.apply(this,arguments):i(arguments[1])?d.apply(this,arguments):h.apply(this,arguments)},l=function(t,e,n,r){if("string"!=typeof t&&(t instanceof Object||i(t))){var a=[];if(i(t))for(var c=0;c<t.length;c++)a.push(c);else for(var o in t)"$val"!=o&&Object.prototype.hasOwnProperty.call(t,o)&&a.push(o);d(t,a,e,n,r),r&&E(t,"$$watchlengthsubjectroot",e,n)}},d=function(t,e,n,r,a){if("string"!=typeof t&&(t instanceof Object||i(t)))for(var c=0;c<e.length;c++){var o=e[c];h(t,o,n,r,a)}},h=function(t,e,r,a,c){"string"!=typeof t&&(t instanceof Object||i(t))&&(n(t[e])||(null!=t[e]&&(void 0===a||a>0)&&l(t[e],r,void 0!==a?a-1:a),v(t,e,r,a),c&&(void 0===a||a>0)&&E(t,e,r,a)))},u=function(){n(arguments[1])?f.apply(this,arguments):i(arguments[1])?p.apply(this,arguments):w.apply(this,arguments)},f=function(t,e){if(!(t instanceof String)&&(t instanceof Object||i(t)))if(i(t)){for(var n=[],r=0;r<t.length;r++)n.push(r);p(t,n,e)}else{var a=function(t){var n=[];for(var i in t)t.hasOwnProperty(i)&&(t[i]instanceof Object?a(t[i]):n.push(i));p(t,n,e)};a(t)}},p=function(t,e,n){for(var i in e)e.hasOwnProperty(i)&&w(t,e[i],n)},v=function(e,n,i,r){var a=e[n];g(e,n),e.watchers||o(e,"watchers",{}),e.watchers[n]||(e.watchers[n]=[]);for(var s=0;s<e.watchers[n].length;s++)if(e.watchers[n][s]===i)return;e.watchers[n].push(i);var d=function(){return a},h=function(c){var o=a;a=c,0!==r&&e[n]&&l(e[n],i,void 0===r?r:r-1),g(e,n),t.noMore||o!==c&&(b(e,n,"set",c,o),t.noMore=!1)};c(e,n,d,h)},b=function(t,e,n,i,r){if(void 0!==e)for(var a=0;a<t.watchers[e].length;a++)t.watchers[e][a].call(t,e,n,i,r);else for(var e in t)t.hasOwnProperty(e)&&b(t,e,n,i,r)},m=["pop","push","reverse","shift","sort","slice","unshift","splice"],y=function(t,e,n,i){o(t[e],i,function(){var r=n.apply(t[e],arguments);return h(t,t[e]),"slice"!==i&&b(t,e,i,arguments),r})},g=function(t,e){if(t[e]&&!(t[e]instanceof String)&&i(t[e]))for(var n,r=m.length;r--;)n=m[r],y(t,e,t[e][n],n)},w=function(t,e,n){for(var i=0;i<t.watchers[e].length;i++){var r=t.watchers[e][i];r==n&&t.watchers[e].splice(i,1)}O(t,e,n)},j=function(){for(var t=0;t<e.length;t++){var n=e[t];if("$$watchlengthsubjectroot"===n.prop){var i=r(n.obj,n.actual);(i.added.length||i.removed.length)&&(i.added.length&&d(n.obj,i.added,n.watcher,n.level-1,!0),n.watcher.call(n.obj,"root","differentattr",i,n.actual)),n.actual=a(n.obj)}else{var i=r(n.obj[n.prop],n.actual);if(i.added.length||i.removed.length){if(i.added.length)for(var c=0;c<n.obj.watchers[n.prop].length;c++)d(n.obj[n.prop],i.added,n.obj.watchers[n.prop][c],n.level-1,!0);b(n.obj,n.prop,"differentattr",i,n.actual)}n.actual=a(n.obj[n.prop])}}},E=function(t,n,i,r){var c;c=a("$$watchlengthsubjectroot"===n?t:t[n]),e.push({obj:t,prop:n,actual:c,watcher:i,level:r})},O=function(t,n,i){for(var r=0;r<e.length;r++){var a=e[r];a.obj==t&&a.prop==n&&a.watcher==i&&e.splice(r,1)}};return setInterval(j,50),t.watch=s,t.unwatch=u,t.callWatchers=b,t}),define("widget/parsers/applyAttribute",["watch"],function(t){function e(t,e){var i=t.data.tplSet.bind,r=t.data.tplSet.update;i&&Object.keys(i).forEach(function(a){var c=i[a];if(void 0!==e[c])if("class"===a){t.addClass(e[c]);var o=e[c];"true"===r&&n(e,c,function(){t.removeClass(o),t.addClass(e[c]),o=e[c]}.bind(this))}else"checked"===a?(t.el.checked=e[c],"true"===r&&n(e,c,function(){t.el.checked=e[c]}.bind(this))):(t.setAttribute(a,e[c]),"true"===r&&n(e,c,function(){t.setAttribute(a,e[c])}.bind(this)));void 0!==e.text&&(t.text(e.text),"true"===r&&n(e,"text",function(){t.text(e.text)}.bind(this)))})}{var n=t.watch;t.unwatch,t.callWatchers}return e}),define("widget/dom",["./utils"],function(t){function e(e){var n=t.extend({},e);t.extend(this,n)}var n={append:function(t,e,n){e.placeholder=t.el.querySelector("#"+e.id),e.el=e.run(t.el,!0,!1,n)},replace:function(t){t.el.innerHTML="",n.append.apply(this,arguments)},detach:function(t){t.el.parentNode&&t.el.parentNode.replaceChild(t.placeholder,t.el)},attach:function(t){t.placeholder.parentNode&&t.placeholder.parentNode.replaceChild(t.el,t.placeholder)},add:function(t,e,n){t.placeholder=e.querySelector("#"+t.id),t.el=t.run(e,!1,n)},text:function(t,e){t.el.innerHTML=e},setAttribute:function(e,n,i){t.isObject(n)?Object.keys(n).forEach(function(t){e.el.setAttribute(t,n[t])}.bind(this)):e.el.setAttribute(n,i)},removeAttribute:function(t,e){t.el.removeAttribute(e)},setStyle:function(e,n,i){t.isObject(n)?Object.keys(n).forEach(function(t){e.el.style[t]=n[t]}.bind(this)):e.el.style[n]=i},removeStyle:function(t,e){delete t.el.style[e]},addClass:function(t,e){t.el.classList.add(e)},removeClass:function(t,e){t.el.classList.remove(e)},val:function(t,e){var n=t.el;return void 0===e?n.value:void(n.value=e)},on:function(t,e,n,i){var r=Array.prototype.slice.call(arguments,4,arguments.length),a=t.el,c=e.split(" "),o=function(e){n.apply(i||this,[e,t].concat(r))};return c.forEach(function(t){a.addEventListener(t,o)}),{remove:function(){c.forEach(function(t){a.removeEventListener(t,o)})}}},remove:function(t){t.el.remove()},Element:e};return t.extend(e.prototype,{append:function(t){n.append(this,t)},replace:function(t,e){n.replace(this,t,e)},text:function(t){n.text(this,t)},add:function(t,e){n.add(this,t,e)},detach:function(){n.detach(this)},attach:function(){n.attach(this)},setAttribute:function(t,e){n.setAttribute(this,t,e)},removeAttribute:function(t){n.removeAttribute(this,t)},setStyle:function(t,e){n.setStyle(this,t,e)},removeStyle:function(t){n.removeStyle(this,t)},addClass:function(t){n.addClass(this,t)},removeClass:function(t){n.removeClass(this,t)},val:function(t){return n.val(this,t)},on:function(){var t=Array.prototype.slice.call(arguments,0);return n.on.apply(!1,[this].concat(t))},remove:function(){n.remove(this)}}),e.extend=t.fnExtend,n}),define("widget/parsers/applyEvents",[],function(){function t(t,e,n){void 0!==e&&void 0!==t.el&&e.forEach(function(e){t.on(e.name,e.action,this,n)}.bind(this))}return t}),define("widget/parsers/setBinders",[],function(){function t(t){var e=!1;return Object.keys(t).forEach(function(n){e=e||{};var i=t[n];void 0!==i.bind&&(e[i.bind]=e[i.bind]||[],e[i.bind].push(i))}.bind(this)),e}return t}),define("widget/parsers/deepBindings",["./setBinders"],function(t){function e(n){return Object.keys(n).forEach(function(i){var r=n[i];r.children&&(n[i].children=e(r.children),n[i].bindings=t(r.children))}),n}return e}),define("widget/parsers/setChildren",["../dom","./applyEvents","./setBinders","./deepBindings"],function(t,e,n,i){function r(e){return Object.keys(e).forEach(function(n){e[n]instanceof t.Element!=!0&&(e[n]=new t.Element(e[n])),e[n].children&&(e[n].children=r(e[n].children))}.bind(this)),e}function a(t,c){return c=c?r(c):{},t=t?r(t):{},Object.keys(t).forEach(function(r){var o=t[r].children;void 0!==o&&(o=a.call(this,o,c.children),t[r].bindings=n(o));var s=t[r],l=c[r];void 0!==l&&(void 0!==l.children&&(l.bindings=i(l.children)),void 0!==this.nodes[r]?this.nodes[r].call(this,s,l):void 0!==s&&(s.replace(l),void 0!==l.children&&(s.children=l.children))),void 0!==this.elReady[r]&&void 0!==s.el&&this.elReady[r].call(this,s);var d=this.events[r];e.call(this,s,d)}.bind(this)),t}return a}),define("widget/parsers/applyBinders",["../dom","../utils","watch","./applyEvents","./applyAttribute"],function(t,e,n,i,r){function a(n,o){var s=o.bindings,l=o.el;n&&Object.keys(n).forEach(function(o){if(void 0!==s&&void 0!==s[o]){var d=function(s){var d=this.events[s.name];if(void 0!==s){var h=n[o];if(s.applyAttach(),this.nodes[o]){var u=new t.Element(s);this.nodes[o].call(this,u,l,h)}else if(e.isArray(h)||e.isObject(h)){if(e.isArray(h)){s.applyAttach();var f=function(){var e=!1,u=function(n){var c=new t.Element(s);e?c.add(l,e):(c.add(l),e=s.getParent()),this.elReady[o]&&this.elReady[o].call(this,c,n),r.call(this,c,n),a.call(this,n,c),i.call(this,c,d,n)};h.forEach(u.bind(this));var f=s.data.tplSet.update;"true"===f&&c(n,o,function(t,e,n,i){void 0===i&&"push"==e&&u.call(this,n[0])}.bind(this))};f.call(this)}else if(e.isObject(h)){var u=new t.Element(s);u.add(l),this.elReady[o]&&this.elReady[o].call(this,u,h),i.call(this,u,d,h),"cp"===s.data.type?u.replace(s,h):u.data.tplSet.bind?r.call(this,u,h):a.call(this,h,u)}}else{var u=new t.Element(s);u.add(l),u.text(h),void 0!==this.elReady[o]&&this.elReady[o].call(this,u,h),"true"===u.data.tplSet.update&&c(n,o,function(){u.text(n[o])}.bind(this)),i.call(this,u,d,h)}}};void 0!==s[o].forEach?s[o].forEach(d.bind(this)):d.call(this,s[o])}}.bind(this))}{var c=n.watch;n.unwatch,n.callWatchers}return a}),define("widget/parsers/setRoutes",[],function(){function t(t){if(!this._match){var n=this.el;this._match=function(i){e.call(this,t,i,n),this.match&&this.match.call(this,i)}.bind(this)}}function e(t,n,i){var r=Object.keys(t),a=n;r.forEach(function(r){var c=t[r],o=c.data.route;if(void 0!==o){var s=n(o,function(t){a=t}.bind(this));s.to(function(){void 0===c.el?(c.applyAttach(),c.add(i),void 0!==c.children&&Object.keys(c.children).forEach(function(t){var e=c.children[t];!e.el&&e.data.instance&&e.data.instance._match&&s.setRoutes(function(t){e.data.instance._match.call(e.data.instance,t.match.bind(t)),t.run()}.bind(this))}.bind(this))):c.attach()}.bind(this)),s.leave(function(){c.detach()}.bind(this))}void 0!==c.children&&e.call(this,c.children,a,i)}.bind(this))}return t}),define("widget/Constructor",["./utils","./mediator","templating/Decoder","./parsers/applyAttribute","./parsers/setChildren","./parsers/applyBinders","./parsers/setBinders","./parsers/setRoutes"],function(t,e,n,i,r,a,c,o){function s(i,a,s){if(this.eventBus=new e,this.context=l,void 0!==i.appContext&&t.extend(this.context,i.appContext),this.template){var d=new n(this.template),h=d.render();this.el=h.fragment,this.data=s?s:this.context.data[i.bind],this.children=r.call(this,h.children,a),this.bindings=c.call(this,this.children),this.routes=o.call(this,this.children),this.data&&this.applyBinders(this.data,this)}else this.el=document.createElement("div");this.init.apply(this,arguments)}var l={};return t.extend(s.prototype,{nodes:{},events:{},elReady:{},init:function(){},applyBinders:a,destroy:function(){this.el.remove()}}),s.extend=t.fnExtend,s});