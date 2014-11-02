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
define([
    './utils',
    './dom',
    './mediator',
    'watch',
    'templating/Decoder'
], function (utils, dom, Mediator, WatchJS, Decoder) {
    'use strict';
    var context = {},
        watch = WatchJS.watch,
        unwatch = WatchJS.unwatch,
        callWatchers = WatchJS.callWatchers;
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

            }

            if (this.elReady[key] !== undefined && child.el !== undefined) {
                this.elReady[key].call(this, child);
            }

            var events = this.events[key];
            applyEvents.call(this, child, events)

        }.bind(this));
        return elements
    }

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
                                    if (this.elReady[key] !== undefined) {
                                        this.elReady[key].call(this, childBinder, data);
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
                                            addItem = function (item) {
                                                var childBinder = new dom.Element(binder);

                                                if (!hasParent) {
                                                    childBinder.add(parent);
                                                    hasParent = binder.getParent();
                                                } else {
                                                    childBinder.add(parent, hasParent);
                                                }

                                                if (this.elReady[key]) {
                                                    this.elReady[key].call(this, childBinder, item);
                                                }

                                                applyAttribute.call(this, childBinder, item);
                                                applyBinders.call(this, item, childBinder);
                                                applyEvents.call(this, childBinder, events, item);
                                            };
                                        data.forEach(addItem.bind(this));
                                        var update = binder.data.tplSet.update;
                                        if (update === 'true') {
                                            watch(obj, key, function (prop, action, newvalue, oldvalue) {
                                                if (oldvalue === undefined && action == 'push') {
                                                    addItem.call(this, newvalue[0]);
                                                }
                                            }.bind(this));
                                        }
                                    }

                                    updateChildren.call(this);

                                } else if (utils.isObject(data)) {
                                    var childBinder = new dom.Element(binder);
                                    childBinder.add(parent);
                                    if (this.elReady[key]) {
                                        this.elReady[key].call(this, childBinder, data);
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
                    //TODO: Investigate, why not allways an Array
                    if (binders[key].forEach !== undefined) {
                        binders[key].forEach(parseBinder.bind(this));
                    } else {
                        parseBinder.call(this, binders[key])
                    }
                }
            }.bind(this));
        }
    }

    // Constructor Class
    //
    //      @Constructor
    //      @param {Object} data
    //      @param {Object} children
    //      @param {Object} dataSet
    function Constructor(data, children, dataSet) {
        this.eventBus = new Mediator();
        this.context = context;
        if (data.appContext !== undefined) {
            utils.extend(this.context, data.appContext);
        }
        if (this.template) {
            var decoder = new Decoder(this.template),
                template = decoder.render();

            this.el = template.fragment;
            this.data = (dataSet) ? dataSet : this.context.data[data.bind];
            this.children = setChildren.call(this, template.children, children);
            this.bindings = setBinders.call(this, this.children);

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
        // Applying Binders manually, if use nodes function
        //
        //      @method applyBinders
        applyBinders: applyBinders,
        //Removing widget from Dom
        //
        //      @method destroy
        destroy: function () {
            this.el.remove();
        }
    });

    Constructor.extend = utils.fnExtend;

    return Constructor;
});