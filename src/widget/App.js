/**
 * Created by guntars on 11/10/2014.
 */
/*globals setTimeout*/
define([
    './mediator',
    './utils'
], function (Mediator, utils) {
    'use strict';
    function App() {
        this.context = utils.extend(this.setContext(), {
            eventBus: new Mediator()
        });
        this.beforeInit.apply(this, arguments);
        if (this.AppContainer !== undefined) {
            this.appContainer = new this.AppContainer({
                appContext: this.context
            });
            this.setContext();
            this.el = this.appContainer.el;
            setTimeout(function () {
                this.el.classList.add('show');
            }.bind(this), 100);

        }
        this.init.apply(this, arguments);
    }

    App.extend = utils.fnExtend;

    utils.extend(App.prototype, {
        init: function () {
        },
        beforeInit: function () {
        },
        setContext: function () {
            return {};
        },
        start: function (container) {
            if (container instanceof HTMLElement === true) {
                container.appendChild(this.el);
            }
        }
    });
    return App;
});