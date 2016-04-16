import {expect} from 'chai'
import callbacks from '../src/callbacks'
/* global describe, it */
/* eslint-disable no-console */
describe('callbacks', ()=>{
    it('should gather straight definitions', ()=>{
        expect(callbacks([{a: function(){}, b: function(){}}], 'b').length).to.equal(1)
        expect(callbacks([{a: function(){}, b: function(){}}], 'a').length).to.equal(1)
        expect(callbacks([{a: function(){}, b: function(){}}], 'c').length).to.equal(0)
    })

    it('should gather nested definitions', ()=>{
        expect(callbacks([{a: {b: function(){}}}], 'a').length).to.equal(0)
        expect(callbacks([{a: {b: function(){}}}], 'b').length).to.equal(0)
        expect(callbacks([{a: {b: function(){}}}], 'a.b').length).to.equal(1)
        expect(typeof callbacks([{a: {b: function(){}}}], 'a.b')[0]).to.equal('function')
    })
})
