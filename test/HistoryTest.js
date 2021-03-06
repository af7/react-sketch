/* global expect */
/* eslint no-console: 0 */
/* eslint-env node, mocha */

'use strict';

import History from 'History';

describe('History', () => {

    it('Loads Normally', () => {
        require('../src/History')
    });

    it('Undo limit is set', ()=> {
        let instance = new History();
        let instanceWithCustomUndoSteps = new History(15);
        expect(instance.getUndoLimit()).to.equal(10);
        expect(instanceWithCustomUndoSteps.getUndoLimit()).to.equal(15);
    });

    it('Informs if can undo', ()=> {
        let instance = new History();
        expect(instance.canUndo()).to.be.false;
        instance.keep('1');
        expect(instance.canUndo()).to.be.true;
    });

    it('Can undo/redo object', ()=> {
        let instance = new History();
        instance.keep('1');
        instance.keep('2');
        expect(instance.canUndo()).to.be.true;
        expect(instance.undo()).to.equal('1');
        expect(instance.redo()).to.equal('2');
    });

    it('Multiple undo/redo of objects', ()=> {
        let instance = new History();
        instance.keep('1');
        instance.keep('2');
        instance.keep('3');
        instance.keep('4');
        instance.keep('5');
        expect(instance.canUndo()).to.be.true;
        expect(instance.undo()).to.equal('4');
        expect(instance.undo()).to.equal('3');
        expect(instance.undo()).to.equal('2');
        expect(instance.undo()).to.equal('1');
        expect(instance.redo()).to.equal('2');
        expect(instance.redo()).to.equal('3');
        expect(instance.redo()).to.equal('4');
        expect(instance.redo()).to.equal('5');
    });

    it('Redo is reset after a keep of a new object', ()=> {
        let instance = new History();
        instance.keep('1');
        instance.keep('2');
        instance.keep('3');
        expect(instance.canUndo()).to.be.true;
        expect(instance.canRedo()).to.be.false;
        expect(instance.undo()).to.equal('2');
        expect(instance.canRedo()).to.be.true;
        instance.keep('4');
        expect(instance.canRedo()).to.be.false;
        expect(instance.redo()).to.not.exist;
    });

    it('Can clear history', ()=> {
        let instance = new History();
        instance.keep('1');
        instance.keep('2');
        instance.keep('3');
        expect(instance.undo()).to.equal('2');
        expect(instance.redo()).to.equal('3');
        instance.clear();
        expect(instance.canUndo()).to.be.false;
        expect(instance.canRedo()).to.be.false;
        expect(instance.undo()).to.not.exist;
        expect(instance.redo()).to.not.exist;
    });
});