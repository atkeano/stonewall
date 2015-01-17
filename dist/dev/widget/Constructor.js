/**
 * Created by guntars on 10/10/2014.
 */
//## widget/dom Class for dom manipulation
define('widget/dom',[
    './utils'
], function (utils) {
    var dom = {
        // Method to attach to DOM
        //
        //      @method append
        //      @param {dom.Element} parent
        //      @param {dom.Element} child
        //      @param {Object} data
        append: function (parent, child, data) {
            child.placeholder = parent.el.querySelector('#' + child.id);
            child.el = child.run(parent.el, true, false, data);
        },
        // Replacing element in to DOM
        //
        //      @method replace
        //      @param {dom.Element} parent
        //      @param {dom.Element} child
        //      @param {Object} data
        replace: function (parent, child, data) {
            parent.el.innerHTML = '';
            dom.append.apply(this, arguments);
        },
        detach: function (el) {
            if (el && el.el && el.el.parentNode) {
                el.el.parentNode.replaceChild(el.placeholder, el.el)
            }
        },
        attach: function (el) {
            if (el && el.el && el.placeholder && el.placeholder.parentNode) {
                el.placeholder.parentNode.replaceChild(el.el, el.placeholder)
            }
        },
        add: function (el, fragment, parent, data) {
            el.placeholder = fragment.querySelector('#' + el.id);
            el.el = el.run(fragment, false, parent, data);
        },
        // Adding text in to node
        //
        //      @method text
        //      @param {dom.Element}
        //      @param {String} text
        text: function (node, text) {
            if (node && node.el) {
                node.el.innerHTML = text;
            }
        },
        // Setting Attribute in to node
        //
        //      @method setAttribute
        //      @prop {dom.Element} node
        //      @prop {String||Object} prop
        //      @prop {String} value
        setAttribute: function (node, prop, value) {
            if (node && node.el) {
                if (utils.isObject(prop)) {
                    Object.keys(prop).forEach(function (key) {
                        node.el.setAttribute(key, prop[key]);
                    }.bind(this));
                } else {
                    node.el.setAttribute(prop, value);
                }
            }
        },
        // Removing Attribute from node
        //
        //      @method removeAttribute
        //      @prop {dom.Element} node
        //      @prop {String} prop
        removeAttribute: function (node, prop) {
            if (node && node.el) {
                node.el.removeAttribute(prop);
            }
        },
        // Setting css style in to node
        //
        //      @method setStyle
        //      @prop {dom.Element} node
        //      @prop {String||Object} prop
        //      @prop {String} value
        setStyle: function (node, prop, value) {
            if (node && node.el) {
                if (utils.isObject(prop)) {
                    Object.keys(prop).forEach(function (key) {
                        node.el.style[key] = prop[key];
                    }.bind(this));
                } else {
                    node.el.style[prop] = value;
                }
            }
        },
        // Removing css style from node
        //
        //      @method removeAttribute
        //      @prop {dom.Element} node
        //      @prop {String} prop
        removeStyle: function (node, prop) {
            if (node && node.el) {
                node.el.style[prop] = '';
            }
        },
        // Adding class in to node
        //
        //      @method addClass
        //      @param {dom.Element} node
        //      @param {String} className
        addClass: function (node, className) {
            if (node && node.el) {
                node.el.classList.add(className);
            }
        },
        // Remove class from node
        //
        //      @method removeClass
        //      @param {dom.Element} node
        //      @param {string} className
        removeClass: function (node, className) {
            if (node && node.el) {
                node.el.classList.remove(className);
            }
        },
        // Setting, Getting value to input element
        //
        //      @method val
        //      @param {dom.Element} node
        //      @param? {String} val
        //      @return {String}
        val: function (node, val) {
            if (node && node.el) {
                var el = node.el;
                if (val !== undefined) {
                    el.value = val;
                } else {
                    return el.value;
                }
            }
        },
        // Adding DOM Event in to Element
        //
        //      @method on
        //      @param {dom.Element} element
        //      @param {String} ev
        //      @param {Function} cb
        //      @param {Object} context
        //      @return {Object} { remove() }
        on: function (element, ev, cb, context) {
            var args = Array.prototype.slice.call(arguments, 4, arguments.length),
                el = element.el,
                events = ev.split(' '),
                fn = function (e) {
                    cb.apply(context || this, [e, element].concat(args));
                };

            events.forEach(function (event) {
                el.addEventListener(event, fn);
            });
            return {
                remove: function () {
                    events.forEach(function (event) {
                        el.removeEventListener(event, fn);
                    });
                }
            }
        },
        // Remove Dom Element from Dom
        //
        //      @method remove
        //      @param {dom.Element}
        remove: function (el) {
                el.el.remove();
        },
        // Element
        Element: Element
    }
    // ## widget/dom.Element
    //     @method Element
    //     @param {Object} node
    function Element(node) {
        var obj = utils.extend({}, node);
        utils.extend(this, obj);

    }

    utils.extend(Element.prototype, {
        // Shortcut to - `dom.append`
        append: function (child) {
            dom.append(this, child)
        },
        // Shortcut to - `dom.replace`
        replace: function (child, data) {
            dom.replace(this, child, data);
        },
        // Shortcut to - `dom.text`
        text: function (text) {
            dom.text(this, text);
        },
        // Shortcut to - `dom.add`
        add: function (fragment, parent, data) {
            dom.add(this, fragment, parent, data);
        },
        detach: function () {
            dom.detach(this);
        },
        attach: function () {
            dom.attach(this);
        },
        // Shortcut to - `dom.setAttribute`
        setAttribute: function (prop, value) {
            dom.setAttribute(this, prop, value);
        },
        // Shortcut to - `dom.removeAttribute`
        removeAttribute: function (prop) {
            dom.removeAttribute(this, prop);
        },
        // Shortcut to - `dom.setStyle`
        setStyle: function (prop, value) {
            dom.setStyle(this, prop, value);
        },
        // Shortcut to - `dom.removeStyle`
        removeStyle: function (prop) {
            dom.removeStyle(this, prop);
        },
        // Shortcut to - `dom.addClass`
        addClass: function (className) {
            dom.addClass(this, className);
        },
        // Shortcut to - `dom.removeClass`
        removeClass: function (className) {
            dom.removeClass(this, className);
        },
        // Shortcut to - `dom.val`
        val: function (val) {
            return dom.val(this, val);
        },
        // Shortcut to - `dom.on`
        on: function (event, cb, context) {
            var args = Array.prototype.slice.call(arguments, 0);
            return dom.on.apply(false, [this].concat(args));
        },
        // Shortcut to - `dom.remove`
        remove: function () {
            dom.remove(this);
        }

    });
    Element.extend = utils.fnExtend;
    return dom;
});
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('templating/utils',[], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.Templating = root.Templating || {};
        root.Templating.utils = factory();
    }
}(this, function () {
    return {
        merge: function (obj, dest) {
            Object.keys(dest).forEach(function (key) {
                obj[key] = dest[key];
            });
        }
    }

}));
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        // AMD. Register as an anonymous module.
        define('templating/Decoder',[
            'templating/utils'
        ], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('./utils'));
    } else {
        // Browser globals (root is window)
        root.Templating = root.Templating || {};
        root.Templating.Decoder = factory(root.Templating.utils);
    }
}(this, function (utils) {
    var _decoders = {};

    function applyFragment(template, tag) {
        var elTag;
        if (tag === 'li') {
            elTag = 'ul'

        } else if (tag === 'td' || tag === 'th') {
            elTag = 'tr'

        } else if (tag === 'tr') {
            elTag = 'tbody'

        } else {
            elTag = 'div'
        }
        var el = document.createElement(elTag),
            fragment = document.createDocumentFragment();
        el.innerHTML = template;
        fragment.appendChild(el.firstChild);
        return fragment.firstChild;
    }

    function setElement(placeholder, keep, parent, data) {
        var el = this.tmpEl((keep) ? placeholder : false, data),
            attributes = this.data.attribs,
            plFragment = applyFragment(this.template, this.data.tag);

        if (!keep) {
            Object.keys(attributes).forEach(function (key) {
                el.setAttribute(key, attributes[key]);
            });
        }

        if (plFragment !== undefined) {
            while (plFragment.childNodes.length > 0) {
                el.appendChild(plFragment.childNodes[0]);
            }
        }

        if (!parent) {
            var parentNode = placeholder.parentNode;
            this.setParent(parentNode);
            if (this.parent !== null || this.parent !== undefined) {
                this.parent.replaceChild(el, placeholder);
            }
        } else {
            this.setParent(parent);
            if (this.parent !== null) {
                this.parent.appendChild(el);
            }
        }

        this.el = el;
        if (this.parse !== undefined) {
            this.parse(el);
        }
        return el;

    }

    function setParams(node, children, obj) {
        var tagName = node.tagName,
            self = this;
        utils.merge(self, {
            id: node.id,
            template: node.template,
            noAttach: _decoders[tagName].noAttach || node.data.tplSet.noattach,
            applyAttach: function () {
                delete this.noAttach;
            },
            setParent: function (parent) {
                this.parent = parent;
            }.bind(self),
            getParent: function () {
                return this.parent;
            }.bind(self),
            run: function (fragment, keep, parent, data) {
                if (this.noAttach === undefined) {
                    var placeholder = fragment.querySelector('#' + this.id) || fragment;
                    if (placeholder) {
                        return setElement.call(self, placeholder, keep, parent, data || obj);
                    }
                }
            }
        });
        if (children) {
            this.children = children;
        }
    }

    function parseElements(root, obj) {
        if (!obj) {
            obj = {};
        }
        var context = false,
            children = false;
        root.children.forEach(function (node) {
            if (node.children &&
                node.children.length > 0) {
                var contextData = (obj[node.data.name]) ? obj[node.data.name] : obj;
                children = parseElements.call(this, node, contextData);
            }
            var tagName = node.tagName;
            if (tagName) {
                var data = _decoders[tagName].decode(node, children, runEls);
                if (data) {
                    var name = data.name;

                    if (name !== undefined) {
                        context = context || {};
                        context[name] = data;
                        setParams.call(context[name], node, children, obj[name] || obj);
                    }
                }
            }
            children = false;
        }.bind(this));

        return context;
    };
    function runEls(children, fragment) {
        Object.keys(children).forEach(function (key) {
            children[key].run(fragment);
        });
    }

    /**
     *
     * @constructor
     * @param root
     */
    function Decoder(root) {
        this._root = (typeof root === 'string') ? JSON.parse(root) : root;
    }

    utils.merge(Decoder, {
        addDecoder: function (decoder) {
            if (_decoders[decoder.tagName] === undefined) {
                _decoders[decoder.tagName] = decoder;
            }
        }
    });

    utils.merge(Decoder.prototype, {
        addDecoder: Decoder.addDecoder,
        _renderFragment: function (root, data) {
            var children = {},
                fragment = applyFragment(root.template);

            if (root.children && root.children.length > 0) {
                children = parseElements.call(this, root, data || {});

            }
            runEls(children, fragment);

            return {
                fragment: fragment,
                children: children,
                templateId: root.templateId
            };
        },

        render: function (data) {
            var fragment = this._renderFragment(this._root, data);

            return fragment;
        }
    });

    return Decoder;

}));
/**
 * DEVELOPED BY
 * GIL LOPES BUENO
 * gilbueno.mail@gmail.com
 *
 * WORKS WITH:
 * IE 9+, FF 4+, SF 5+, WebKit, CH 7+, OP 12+, BESEN, Rhino 1.7+
 *
 * FORK:
 * https://github.com/melanke/Watch.JS
 */


(function (factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('watch',factory);
    } else {
        // Browser globals
        window.WatchJS = factory();
        window.watch = window.WatchJS.watch;
        window.unwatch = window.WatchJS.unwatch;
        window.callWatchers = window.WatchJS.callWatchers;
    }
}(function () {

    var WatchJS = {
            noMore: false
        },
        lengthsubjects = [];

    var isFunction = function (functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) == '[object Function]';
    };

    var isInt = function (x) {
        return x % 1 === 0;
    };

    var isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    var getObjDiff = function(a, b){
        var aplus = [],
            bplus = [];

        if(!(typeof a == "string") && !(typeof b == "string")){

            if (isArray(a)) {
                for (var i=0; i<a.length; i++) {
                    if (b[i] === undefined) aplus.push(i);
                }
            } else {
                for(var i in a){
                    if (a.hasOwnProperty(i)) {
                        if(b[i] === undefined) {
                            aplus.push(i);
                        }
                    }
                }
            }

            if (isArray(b)) {
                for (var j=0; j<b.length; j++) {
                    if (a[j] === undefined) bplus.push(j);
                }
            } else {
                for(var j in b){
                    if (b.hasOwnProperty(j)) {
                        if(a[j] === undefined) {
                            bplus.push(j);
                        }
                    }
                }
            }
        }

        return {
            added: aplus,
            removed: bplus
        }
    };

    var clone = function(obj){

        if (null == obj || "object" != typeof obj) {
            return obj;
        }

        var copy = obj.constructor();

        for (var attr in obj) {
            copy[attr] = obj[attr];
        }

        return copy;

    }

    var defineGetAndSet = function (obj, propName, getter, setter) {
        try {


            Object.observe(obj, function(changes) {
                changes.forEach(function(change) {
                    if (change.name === propName) {
                        setter(change.object[change.name]);
                    }
                });
            });

        } catch(e) {

            try {
                Object.defineProperty(obj, propName, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                });
            } catch(e2) {
                try{
                    Object.prototype.__defineGetter__.call(obj, propName, getter);
                    Object.prototype.__defineSetter__.call(obj, propName, setter);
                } catch(e3) {
                    throw new Error("watchJS error: browser not supported :/")
                }
            }

        }
    };

    var defineProp = function (obj, propName, value) {
        try {
            Object.defineProperty(obj, propName, {
                enumerable: false,
                configurable: true,
                writable: false,
                value: value
            });
        } catch(error) {
            obj[propName] = value;
        }
    };

    var watch = function () {

        if (isFunction(arguments[1])) {
            watchAll.apply(this, arguments);
        } else if (isArray(arguments[1])) {
            watchMany.apply(this, arguments);
        } else {
            watchOne.apply(this, arguments);
        }

    };


    var watchAll = function (obj, watcher, level, addNRemove) {

        if ((typeof obj == "string") || (!(obj instanceof Object) && !isArray(obj))) { //accepts only objects and array (not string)
            return;
        }

        var props = [];


        if(isArray(obj)) {
            for (var prop = 0; prop < obj.length; prop++) { //for each item if obj is an array
                props.push(prop); //put in the props
            }
        } else {
            for (var prop2 in obj) { //for each attribute if obj is an object
                if (prop2 == "$val") {
                    continue;
                }

                if (Object.prototype.hasOwnProperty.call(obj, prop2)) {
                    props.push(prop2); //put in the props
                }
            }
        }

        watchMany(obj, props, watcher, level, addNRemove); //watch all items of the props

        if (addNRemove) {
            pushToLengthSubjects(obj, "$$watchlengthsubjectroot", watcher, level);
        }
    };


    var watchMany = function (obj, props, watcher, level, addNRemove) {

        if ((typeof obj == "string") || (!(obj instanceof Object) && !isArray(obj))) { //accepts only objects and array (not string)
            return;
        }

        for (var i=0; i<props.length; i++) { //watch each property
            var prop = props[i];
            watchOne(obj, prop, watcher, level, addNRemove);
        }

    };

    var watchOne = function (obj, prop, watcher, level, addNRemove) {
        if ((typeof obj == "string") || (!(obj instanceof Object) && !isArray(obj))) { //accepts only objects and array (not string)
            return;
        }

        if(isFunction(obj[prop])) { //dont watch if it is a function
            return;
        }
        if(obj[prop] != null && (level === undefined || level > 0)){
            watchAll(obj[prop], watcher, level!==undefined? level-1 : level); //recursively watch all attributes of this
        }

        defineWatcher(obj, prop, watcher, level);

        if(addNRemove && (level === undefined || level > 0)){
            pushToLengthSubjects(obj, prop, watcher, level);
        }

    };

    var unwatch = function () {

        if (isFunction(arguments[1])) {
            unwatchAll.apply(this, arguments);
        } else if (isArray(arguments[1])) {
            unwatchMany.apply(this, arguments);
        } else {
            unwatchOne.apply(this, arguments);
        }

    };

    var unwatchAll = function (obj, watcher) {

        if (obj instanceof String || (!(obj instanceof Object) && !isArray(obj))) { //accepts only objects and array (not string)
            return;
        }

        if (isArray(obj)) {
            var props = [];
            for (var prop = 0; prop < obj.length; prop++) { //for each item if obj is an array
                props.push(prop); //put in the props
            }
            unwatchMany(obj, props, watcher); //watch all itens of the props
        } else {
            var unwatchPropsInObject = function (obj2) {
                var props = [];
                for (var prop2 in obj2) { //for each attribute if obj is an object
                    if (obj2.hasOwnProperty(prop2)) {
                        if (obj2[prop2] instanceof Object) {
                            unwatchPropsInObject(obj2[prop2]); //recurs into object props
                        } else {
                            props.push(prop2); //put in the props
                        }
                    }
                }
                unwatchMany(obj2, props, watcher); //unwatch all of the props
            };
            unwatchPropsInObject(obj);
        }
    };


    var unwatchMany = function (obj, props, watcher) {

        for (var prop2 in props) { //watch each attribute of "props" if is an object
            if (props.hasOwnProperty(prop2)) {
                unwatchOne(obj, props[prop2], watcher);
            }
        }
    };

    var defineWatcher = function (obj, prop, watcher, level) {

        var val = obj[prop];

        watchFunctions(obj, prop);

        if (!obj.watchers) {
            defineProp(obj, "watchers", {});
        }

        var newWatcher = false;
        if (!obj.watchers[prop]) {
            obj.watchers[prop] = [];
            newWatcher = true;
        }

        for (var i=0; i<obj.watchers[prop].length; i++) {
            if(obj.watchers[prop][i] === watcher){
                return;
            }
        }


        obj.watchers[prop].push(watcher); //add the new watcher in the watchers array

        if (newWatcher) {
            var getter = function () {
                return val;
            };


            var setter = function (newval) {
                var oldval = val;
                val = newval;

                if (level !== 0 && obj[prop]){
                    // watch sub properties
                    watchAll(obj[prop], watcher, (level===undefined)?level:level-1);
                }

                watchFunctions(obj, prop);

                if (!WatchJS.noMore){
                    //if (JSON.stringify(oldval) !== JSON.stringify(newval)) {
                    if (oldval !== newval) {
                        callWatchers(obj, prop, "set", newval, oldval);
                        WatchJS.noMore = false;
                    }
                }
            };

            defineGetAndSet(obj, prop, getter, setter);
        }

    };

    var callWatchers = function (obj, prop, action, newval, oldval) {
        if (prop !== undefined) {
            for (var wr=0; wr<obj.watchers[prop].length; wr++) {
                obj.watchers[prop][wr].call(obj, prop, action, newval, oldval);
            }
        } else {
            for (var prop in obj) {//call all
                if (obj.hasOwnProperty(prop)) {
                    callWatchers(obj, prop, action, newval, oldval);
                }
            }
        }
    };

    // @todo code related to "watchFunctions" is certainly buggy
    var methodNames = ['pop', 'push', 'reverse', 'shift', 'sort', 'slice', 'unshift', 'splice'];
    var defineArrayMethodWatcher = function (obj, prop, original, methodName) {
        defineProp(obj[prop], methodName, function () {
            var response = original.apply(obj[prop], arguments);
            watchOne(obj, obj[prop]);
            if (methodName !== 'slice') {
                callWatchers(obj, prop, methodName,arguments);
            }
            return response;
        });
    };

    var watchFunctions = function(obj, prop) {

        if ((!obj[prop]) || (obj[prop] instanceof String) || (!isArray(obj[prop]))) {
            return;
        }

        for (var i = methodNames.length, methodName; i--;) {
            methodName = methodNames[i];
            defineArrayMethodWatcher(obj, prop, obj[prop][methodName], methodName);
        }

    };

    var unwatchOne = function (obj, prop, watcher) {
        for (var i=0; i<obj.watchers[prop].length; i++) {
            var w = obj.watchers[prop][i];

            if(w == watcher) {
                obj.watchers[prop].splice(i, 1);
            }
        }

        removeFromLengthSubjects(obj, prop, watcher);
    };

    var loop = function(){

        for(var i=0; i<lengthsubjects.length; i++) {

            var subj = lengthsubjects[i];

            if (subj.prop === "$$watchlengthsubjectroot") {

                var difference = getObjDiff(subj.obj, subj.actual);

                if(difference.added.length || difference.removed.length){
                    if(difference.added.length){
                        watchMany(subj.obj, difference.added, subj.watcher, subj.level - 1, true);
                    }

                    subj.watcher.call(subj.obj, "root", "differentattr", difference, subj.actual);
                }
                subj.actual = clone(subj.obj);


            } else {

                var difference = getObjDiff(subj.obj[subj.prop], subj.actual);

                if(difference.added.length || difference.removed.length){
                    if(difference.added.length){
                        for (var j=0; j<subj.obj.watchers[subj.prop].length; j++) {
                            watchMany(subj.obj[subj.prop], difference.added, subj.obj.watchers[subj.prop][j], subj.level - 1, true);
                        }
                    }

                    callWatchers(subj.obj, subj.prop, "differentattr", difference, subj.actual);
                }

                subj.actual = clone(subj.obj[subj.prop]);

            }

        }

    };

    var pushToLengthSubjects = function(obj, prop, watcher, level){

        var actual;

        if (prop === "$$watchlengthsubjectroot") {
            actual =  clone(obj);
        } else {
            actual = clone(obj[prop]);
        }

        lengthsubjects.push({
            obj: obj,
            prop: prop,
            actual: actual,
            watcher: watcher,
            level: level
        });
    };

    var removeFromLengthSubjects = function(obj, prop, watcher){

        for (var i=0; i<lengthsubjects.length; i++) {
            var subj = lengthsubjects[i];

            if (subj.obj == obj && subj.prop == prop && subj.watcher == watcher) {
                lengthsubjects.splice(i, 1);
            }
        }

    };

    setInterval(loop, 50);

    WatchJS.watch = watch;
    WatchJS.unwatch = unwatch;
    WatchJS.callWatchers = callWatchers;

    return WatchJS;

}));
/**
 * Created by guntars on 11/11/14.
 */
define('widget/parsers/applyAttribute',[
    'watch'
], function (WatchJS) {
    var watch = WatchJS.watch,
        unwatch = WatchJS.unwatch,
        callWatchers = WatchJS.callWatchers;

    function applyAttribute(childBinder, data) {
        var bind = childBinder.data.tplSet.bind,
            update = childBinder.data.tplSet.update;
        if (bind) {
            Object.keys(bind).forEach(function (bindItem) {
                var key = bind[bindItem];
                if (data[key] !== undefined) {
                    if (bindItem === 'class') {
                        childBinder.addClass(data[key]);
                        var currClass = data[key];
                        if (update === 'true') {
                            watch(data, key, function () {
                                childBinder.removeClass(currClass);
                                childBinder.addClass(data[key]);
                                currClass = data[key];
                            }.bind(this));
                        }
                    } else if (bindItem === 'checked') {
                        childBinder.el.checked = data[key];
                        if (update === 'true') {
                            watch(data, key, function () {
                                childBinder.el.checked = data[key];
                            }.bind(this));
                        }
                    } else {
                        childBinder.setAttribute(bindItem, data[key]);
                        if (update === 'true') {
                            watch(data, key, function () {
                                childBinder.setAttribute(bindItem, data[key]);
                            }.bind(this));
                        }
                    }
                }
                if (data.text !== undefined) {
                    childBinder.text(data.text);
                    if (update === 'true') {
                        watch(data, 'text', function () {
                            childBinder.text(data.text);
                        }.bind(this));
                    }
                }
            });
        }

    }

    return applyAttribute;
});
define('widget/parsers/applyEvents',[],function () {
    
    //Aplying Events to elements
    //
    //      @private applyEvents
    //      @param {dom.Element} element
    //      @param {Array} events
    //      @param {Object} data
    function applyEvents(element, events, data) {
        if (events !== undefined && element.el !== undefined) {
            events.forEach(function (event) {
                element.on(event.name, event.action, this, data);
            }.bind(this));
        }
    }

    return applyEvents;
});
/**
 * Created by guntars on 11/11/14.
 */
define('widget/parsers/setBinders',[],function () {

    function setBinders(children) {
        var bindings = false
        Object.keys(children).forEach(function (key) {
            bindings = bindings || {};
            var el = children[key];
            if (el.bind !== undefined) {
                bindings[el.bind] = bindings[el.bind] || []
                bindings[el.bind].push(el)
            }
        }.bind(this));
        return bindings;
    }

    return setBinders;
});
/**
 * Created by guntars on 11/11/14.
 */
define('widget/parsers/deepBindings',[
    './setBinders'
],function (setBinders) {
    function deepBindings(elements) {
        Object.keys(elements).forEach(function (key) {
            var element = elements[key];
            if (element.children) {
                elements[key].children = deepBindings(element.children);
                elements[key].bindings = setBinders(element.children);
            }
        });
        return elements;
    }
    return deepBindings;
});
/**
 * Created by guntars on 11/11/14.
 */
define('widget/parsers/setChildren',[
    '../dom',
    './applyEvents',
    './setBinders',
    './deepBindings'
], function (dom, applyEvents, setBinders, deepBindings) {
    //Applying dom.Element to template elements.
    //
    //      @private applyElement
    //      @param {Object} elements
    function applyElement(elements) {
        Object.keys(elements).forEach(function (key) {
            if (elements[key] instanceof  dom.Element !== true) {
                elements[key] = new dom.Element(elements[key]);
            }
            if (elements[key].children) {
                elements[key].children = applyElement(elements[key].children);
            }
        }.bind(this));
        return elements;
    }

    function setChildren(elements, parentChildren) {
        parentChildren = (parentChildren) ? applyElement(parentChildren) : {};
        elements = (elements) ? applyElement(elements) : {};
        Object.keys(elements).forEach(function (key) {
            var children = elements[key].children;
            if (children !== undefined) {
                children = setChildren.call(this, children, parentChildren.children);
                elements[key].bindings = setBinders(children);
            }

            var child = elements[key],
                parentChild = parentChildren[key];

            if (parentChild !== undefined) {
                if (parentChild.children !== undefined) {
                    parentChild.bindings = deepBindings(parentChild.children);
                }

                if (this.nodes[key] !== undefined) {
                    this.nodes[key].call(this, child, parentChild);
                } else if (child !== undefined) {
                    child.replace(parentChild);
                    if (parentChild.children !== undefined) {
                        child.children = parentChild.children
                    }
                }

            } else if (this.nodes[key] !== undefined && child.data.tplSet.noattach === 'true') {
                this.nodes[key].call(this, child);
            }

            if (this.elReady[key] !== undefined && child.el !== undefined) {
                this.elReady[key].call(this, child);
            }

            var events = this.events[key];
            applyEvents.call(this, child, events);

        }.bind(this));
        return elements
    }

    return setChildren;
});
/**
 * Created by guntars on 11/11/14.
 */
define('widget/parsers/applyBinders',[
    '../dom',
    '../utils',
    'watch',
    './applyEvents',
    './applyAttribute'
], function (dom, utils, WatchJS, applyEvents, applyAttribute) {
    var watch = WatchJS.watch,
        unwatch = WatchJS.unwatch,
        callWatchers = WatchJS.callWatchers;

    function applyBinders(obj, instance) {
        var binders = instance.bindings,
            parent = instance.el;
        if (obj) {
            Object.keys(obj).forEach(function (key) {
                if (binders !== undefined && binders[key] !== undefined) {

                    var parseBinder = function (binder) {
                        var events = this.events[binder.name];
                        if (binder !== undefined) {
                            var data = obj[key];
                            binder.applyAttach();

                            if (this.nodes[key]) {
                                var childBinder = new dom.Element(binder);
                                this.nodes[key].call(this, childBinder, parent, data);
                            } else {
                                if (!utils.isArray(data) && !utils.isObject(data)) {
                                    var childBinder = new dom.Element(binder);
                                    childBinder.add(parent);
                                    childBinder.text(data);
                                    if (this.elReady[childBinder.name] !== undefined) {
                                        this.elReady[childBinder.name].call(this, childBinder, data);
                                    }
                                    if (childBinder.data.tplSet.update === 'true') {
                                        watch(obj, key, function () {
                                            childBinder.text(obj[key]);
                                        }.bind(this));
                                    }
                                    applyEvents.call(this, childBinder, events, data);
                                } else if (utils.isArray(data)) {
                                    binder.applyAttach();

                                    var updateChildren = function () {
                                        var hasParent = false,
                                            bindedData = [],
                                            addItem = function (item) {
                                                var childBinder = new dom.Element(binder);

                                                if (!hasParent) {
                                                    childBinder.add(parent);
                                                    hasParent = binder.getParent();
                                                } else {
                                                    childBinder.add(parent, hasParent);
                                                }

                                                if (this.elReady[childBinder.name]) {
                                                    this.elReady[childBinder.name].call(this, childBinder, item);
                                                }

                                                applyAttribute.call(this, childBinder, item);
                                                applyBinders.call(this, item, childBinder);
                                                applyEvents.call(this, childBinder, events, item);
                                                bindedData.push({binder: childBinder, data: item});
                                            };
                                        data.forEach(addItem.bind(this));
                                        var update = binder.data.tplSet.update;
                                        if (update === 'true') {
                                            var methodNames = ['pop', 'shift', 'splice'];
                                            watch(obj, key, function (prop, action, newvalue, oldvalue) {
                                                if (oldvalue === undefined && action == 'push') {
                                                    addItem.call(this, newvalue[0]);
                                                } else if (methodNames.indexOf(action) !== -1) {
                                                    bindedData.forEach(function (binder, index) {
                                                        if (obj[key].indexOf(binder.data) === -1) {
                                                            binder.binder.remove();
                                                            bindedData.splice(index, 1);
                                                        }
                                                    }.bind(this));
                                                }
                                            }.bind(this));
                                        }
                                    }

                                    updateChildren.call(this);

                                } else if (utils.isObject(data)) {
                                    var childBinder = new dom.Element(binder);
                                    childBinder.add(parent);
                                    if (this.elReady[childBinder.name]) {
                                        this.elReady[childBinder.name].call(this, childBinder, data);
                                    }
                                    applyEvents.call(this, childBinder, events, data);
                                    if (binder.data.type === 'cp') {
                                        childBinder.replace(binder, data);
                                    }
                                    else if (!childBinder.data.tplSet.bind) {
                                        applyBinders.call(this, data, childBinder);
                                    } else {
                                        applyAttribute.call(this, childBinder, data);
                                    }
                                }
                            }
                        }

                    };
                    //TODO: Investigate, why not always an Array
                    if (binders[key].forEach !== undefined) {
                        binders[key].forEach(parseBinder.bind(this));
                    } else {
                        parseBinder.call(this, binders[key])
                    }
                }
            }.bind(this));
        }
    }

    return applyBinders;
});
/**
 * Created by guntars on 11/11/14.
 */
define('widget/parsers/setRoutes',[],function () {

    function destroyComponent(cp) {
        if (cp.data.instance) {
            delete cp.data.instance;
        }
        if (cp.el) {
            cp.el.remove();
            delete cp.el;
        }
    }

    function applyToChildren(children, cb) {
        if (children !== undefined) {
            Object.keys(children).forEach(function (name) {
                var cp = children[name];
                cb.call(this, cp, cp.data.instance);
            }.bind(this));
        }
    }

    function matchRoute(children, match, parent) {
        var names = Object.keys(children);
        names.forEach(function (name) {
            var child = children[name];
            var route = child.data.route;
            if (route !== undefined && child.data.type !== 'cp') {
                var matches = match(route, function (match) {
                    if (child.children !== undefined) {
                        matchRoute.call(this, child.children, match, parent);
                    }
                }.bind(this));
                matches.to(function () {
                    var args = [].slice.call(arguments, 0);
                    var params = args.pop();
                    if (args.length > 0) {
                        var id = args.join('_');
                    }

                    if (child.el !== undefined && child.sessId !== id && id !== undefined) {
                        applyToChildren.call(this, child.children, destroyComponent);
                        destroyComponent(child);
                    }

                    applyToChildren.call(this, child.children, function (cp, instance) {
                        var data = cp.data,
                            dataSet = data.dataset;

                        dataSet.params = params;

                        if (args.length > 0) {
                            dataSet.link = args;
                            if (instance && instance.to) {
                                instance.to.apply(instance, args.concat(params));

                            }
                        }

                    });

                    if (child.el === undefined) {
                        child.applyAttach();
                        child.add(parent, false);

                        applyToChildren.call(this, child.children, function (cp, instance) {
                            if (instance && instance.to) {
                                instance.to.apply(instance, args.concat(params));
                            }

                            if (!cp.el && instance && instance._match) {
                                matches.setRoutes(function (routes) {
                                    instance._match.call(instance, routes.match.bind(routes));
                                    routes.run();
                                }.bind(this));

                                instance._reRoute = function(){
                                    instance._applyRoutes(matches);
                                };
                            }
                        });
                        if (id) {
                            child.sessId = id;
                        }

                    } else {
                        child.attach();
                    }
                }.bind(this));
                matches.leave(function () {
                    applyToChildren.call(this, child.children, function (cp, instance) {
                        if (instance && instance.leave !== undefined) {
                            instance.leave();
                        }
                    }.bind(this));
                    child.detach();
                }.bind(this));

                matches.query(function (params) {
                    applyToChildren.call(this, child.children, function (cp, instance) {
                        if (instance && instance.query !== undefined) {
                            instance.query(params);
                        }
                    }.bind(this));
                }.bind(this));

            } else if (child.children !== undefined && child.data.type !== 'cp') {
                matchRoute.call(this, child.children, match, parent);
            } else if (child.data.type === 'cp' && child.data.instance) {
                var instance = child.data.instance;
                instance._match.call(instance, match);
            }

        }.bind(this));
    }

    function setRoutes(children) {
        if (!this._match) {
            var parent = this.el;
            this._match = function (match) {
                matchRoute.call(this, children, match, parent);
                if (this.match) {
                    this.match.call(this, match);
                }
            }.bind(this)
        }
    };

    return setRoutes;
});
/**
 * Created by guntars on 10/10/2014.
 */
/*globals define*/
//## widget/Constructor Class
// This is App Presenter class parse data, and apply to template. Also binding events to Element.
// Basic Usage example
//
//      define([
//          'templating/parser!widget.html',
//          'widget/Constructor'
//      ], function (template, Constructor) {
//          var Widget = Constructor.extend({
//              template: template
//          });
//          return Widget;
//      });
define('widget/Constructor',[
    './dom',
    './utils',
    './mediator',
    'templating/Decoder',
    './parsers/applyAttribute',
    './parsers/setChildren',
    './parsers/applyBinders',
    './parsers/setBinders',
    './parsers/setRoutes',
    './parsers/applyEvents'
], function (dom, utils, Mediator, Decoder, applyAttribute, setChildren, applyBinders, setBinders, setRoutes, applyEvents) {
    
    var context = {};

    // Constructor Class
    //
    //      @Constructor
    //      @param {Object} data
    //      @param {Object} children
    //      @param {Object} dataSet
    function Constructor(data, children, dataSet) {
        this._routes = [];
        this.children = {};
        this.eventBus = new Mediator();
        this.context = context;
        if (data.appContext !== undefined) {
            utils.extend(this.context, data.appContext);
        }
        this.beforeInit.apply(this, arguments);

        if (this.template) {
            var keys = (dataSet) ? Object.keys(dataSet) : [];
            this.data = (keys.length > 0) ? dataSet : this.context.data[data.bind];

            var decoder = new Decoder(this.template),
                template = decoder.render(this.data);
            this.el = template.fragment;

            this.children = utils.extend(setChildren.call(this, template.children, children), this.children);

            this.bindings = setBinders.call(this, this.children);
            this.routes = setRoutes.call(this, this.children);

            if (this.data) {
                this.applyBinders(this.data, this);
            }

        } else {

            this.el = document.createElement('div');
        }

        this.init.apply(this, arguments);
    }

    utils.extend(Constructor.prototype, {
        // `nodes` Object override default methods to Elements.
        // Usage Example
        //
        //      nodes: {
        //          listItem: function (el, parent, data) {
        //              el.add(parent);
        //              el.text(data);
        //          }
        //      }
        nodes: {},

        // `events` Object applying events to elements
        // You can apply more than one event on element
        // Usage Example
        //
        //      events: {
        //          delete: [
        //              {
        //                  name: 'click',
        //                  action: function () {
        //                      this.data.remove = true
        //                      this.destroy();
        //                  }
        //              }
        //          ]
        events: {},
        // Applying extra methods to Element
        // Usage Example
        //
        //      elReady: {
        //          links: function (el, data) {
        //              if(data.class==='active'){
        //                  el.addClass('active');
        //              }
        //          }
        //      },
        elReady: {},
        // Running when Constructor is initialised
        //
        //      @method init
        //      @param {Object} data (comes from template data attributes)
        //      @param {Object} children (comes placeholder content
        //      from template)
        //      @param {Object} datatSet (data passing if component is
        //      in template binders)
        init: function (data, children, dataSet) {
        },
        // Running before Constructor is initialised
        //
        //      @method beforeInit
        //      @param {Object} data (comes from template data attributes)
        //      @param {Object} children (comes placeholder content
        //      from template)
        //      @param {Object} datatSet (data passing if component is
        //      in template binders)
        beforeInit: function (data, children, dataSet) {
        },
        // Applying Binders manually, if use nodes function
        //
        //      @method applyBinders
        applyBinders: applyBinders,
        //Removing widget from Dom
        //
        //      @method destroy
        destroy: function () {
            this.el.remove();
        },
        setRoutes: function (instance) {
            if (instance !== undefined) {
                this._routes.push(instance);
            }
        },
        _applyRoutes: function (matches) {
            while (this._routes.length > 0) {
                var instance = this._routes[0];
                if (instance && instance._match) {
                    matches.setRoutes(function (routes) {
                        instance._match.call(instance, routes.match.bind(routes));
                        routes.run();
                    }.bind(this));
                }
                this._routes.shift();
            }
            matches.rebind();
        },
        _reRoute: function () {
        },
        rebind: function () {
            this._reRoute();
        },
        setChildren: function (el, data) {
            var name = el.name;
            if (this.children[name] !== undefined && this.children[name].el !== undefined) {
                this.children[name].detach();
            }
            el.applyAttach();
            this.children[name] = new dom.Element(el);

            this.children[name].placeholder = this.el.querySelector('#' + el.id);
            this.children[name].el = el.run(this.el, false, false, data);

            if (this.elReady[name] !== undefined && this.children[name].el !== undefined) {
                this.elReady[name].call(this, this.children[name]);
            }

            var events = this.events[name];
            applyEvents.call(this, this.children[name], events);

            var instance = this.children[name].data.instance;
            this.setRoutes(instance);
            this.rebind();
        }
    });

    Constructor.extend = utils.fnExtend;

    return Constructor;
});
