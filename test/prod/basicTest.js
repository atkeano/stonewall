/* globals describe, it, expect, beforeEach */
define([
    'templating/Decoder',
    'Basic'
], function (Decoder, App) {
    var expect, container, app;

    expect = chai.expect;

    container = document.createElement('div');
    app = new App();

    app.start(container);

    describe('Basic Production Tests', function () {
        describe('Testing app rendered structure', function () {
            it('data in context defined and available', function () {
                expect(app.context.data).to.deep.equal({
                    cmp: {
                        item: 'Binded Item From App'
                    }
                });
            });
        });

    });
});