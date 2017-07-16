/* global describe, it, expect */
(function () {
    'use strict';

    describe('A cat', function () {
        it('has four legs', function () {
            expect(window.CATS.cat.numLegs).toBe(4);
        });

        it('meows', function() {
            var meow = window.CATS.cat.meow();
            expect(meow).toBe('meow');
        });
    });

    describe('A main coon', function () {
        it('meows LOUDER', function () {
            var meow = window.CATS.mainCoon.meow();
            
            expect(meow).toBe('MEW');
        });

        it('has four legs', function () {
            expect(window.CATS.mainCoon.numLegs).toBe(4);
        });
    });

}());
