var chai = require('chai');
var _ = require('lodash');

var anagramBuilder = require('../engines/anagram')

chai.should();

describe('This full app', function () {
    it('One letter word should have only one anagram', function () {
        anagramBuilder('a').should.have.lengthOf(1);
    });

    it('two different characters word should have 2 anagrams', function () {
        anagramBuilder('ab').should.have.lengthOf(2);
    });
    it('throws error if input is not a word', function () {
        chai.expect(function () {
            anagramBuilder('a a')
        }).to.throw()
    });
    it('should not contain repeated anagrams', function () {
        var x = anagramBuilder("abab")
        var y = _.uniq(x)
        x.length.should.equal(y.length)
    });
});