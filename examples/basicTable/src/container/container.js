/**
 * Created by guntars on 12/10/2014.
 */
define([
    'templating/parser!./_container.html',
    'widget/Constructor'
], function (template, Constructor) {
    return Constructor.extend({
        template: template
    });
});