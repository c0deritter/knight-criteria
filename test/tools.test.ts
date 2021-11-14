import { expect } from 'chai'
import 'mocha'
import { isComparison, isCriteriaEmpty, summarize } from '../src/tools'

describe('isCriteriaEmpty', function() {
  it('should return false if criteria is not empty', function() {
    expect(isCriteriaEmpty({ a: 'a' })).to.be.false
  })

  it('should return true if criteria is empty', function() {
    expect(isCriteriaEmpty({})).to.be.true
    expect(isCriteriaEmpty({ '@set': {} })).to.be.true
  })
})

describe('isComparison', function() {
  it('should return false for any value other than a non null object', function() {
    expect(isComparison(0)).to.be.false
    expect(isComparison(true)).to.be.false
    expect(isComparison(false)).to.be.false
    expect(isComparison('')).to.be.false
    expect(isComparison(null)).to.be.false
    expect(isComparison(undefined)).to.be.false
    expect(isComparison(NaN)).to.be.false
  })

  it('should return false for a wrong object', function() {
    expect(isComparison({})).to.be.false
    expect(isComparison({ value: '', a: '' })).to.be.false
    expect(isComparison({ operator: '' })).to.be.false
    expect(isComparison({ value: '', operator: '', a: ''})).to.be.false
  })

  it('should return true for a correct object', function() {
    expect(isComparison({ value: '' })).to.be.true
    expect(isComparison({ value: '', operator: '' })).to.be.true
  })
})

describe('summarize', function() {
  it('should return an empty criteria object if an empty criteria object was given', function() {
    expect(summarize({})).to.deep.equal({})
  })

  it('should return an empty criteria object if an empty array was given', function() {
    expect(summarize([])).to.deep.equal({})
  })

  it('should return the meta data of a criteria object', function() {
    expect(summarize({
      property1: 'a',
      property2: 1,
      '@orderBy': 'property1',
      '@limit': 10,
      '@offset': 20
    })).to.deep.equal({
      '@orderBy': 'property1',
      '@limit': 10,
      '@offset': 20
    })
  })

  it('should regard relationships', function() {
    expect(summarize({
      property1: 'a',
      property2: 1,
      '@orderBy': 'property1',
      '@limit': 10,
      '@offset': 20,
      object1: {
        property3: 'b',
        property4: 2,
        '@load': true,
        '@orderBy': 'property3',
        '@limit': 30,
        '@offset': 40
      }
    })).to.deep.equal({
      '@orderBy': 'property1',
      '@limit': 10,
      '@offset': 20,
      object1: {
        '@load': true,
        '@orderBy': 'property3',
        '@limit': 30,
        '@offset': 40
      }
    })
  })

  it('should return the meta data of a criteria array', function() {
    expect(summarize([[
      {
        property1: 'a',
        property2: 1,
        '@orderBy': 'property1',
        '@limit': 10,
        '@offset': 20,
        object1: {
          property3: 'b',
          property4: 2,
          '@load': true,
          '@orderBy': 'property3',
          '@limit': 30,
          '@offset': 40
        }
      }
    ]])).to.deep.equal({
      '@orderBy': 'property1',
      '@limit': 10,
      '@offset': 20,
      object1: {
        '@load': true,
        '@orderBy': 'property3',
        '@limit': 30,
        '@offset': 40
      }
    })
  })

  it('should combine meta data from multiple criteria objects but not overwrite once made settings', function() {
    expect(summarize([
      {
        '@orderBy': 'property1',
        '@limit': 10,
        '@offset': 20,
        object1: {
          '@load': true,
          '@orderBy': 'property3',
          '@limit': 30,
          '@offset': 40
        }
      },
      'AND',
      {
        '@orderBy': 'property2',
        '@limit': 11,
        '@offset': 21,
        object1: {
          '@load': false,
          '@orderBy': 'property4',
          '@limit': 31,
          '@offset': 41
        }
      }
    ])).to.deep.equal({
      '@orderBy': 'property1',
      '@limit': 10,
      '@offset': 20,
      object1: {
        '@load': true,
        '@orderBy': 'property3',
        '@limit': 30,
        '@offset': 40
      }
    })
  })

  it('should combine meta data from multiple criteria objects and add missing settings', function() {
    expect(summarize([
      {
        object1: {
        }
      },
      'AND',
      {
        '@orderBy': 'property2',
        '@limit': 11,
        '@offset': 21,
        object1: {
          '@load': false,
          '@orderBy': 'property4',
          '@limit': 31,
          '@offset': 41
        }
      }
    ])).to.deep.equal({
      '@orderBy': 'property2',
      '@limit': 11,
      '@offset': 21,
      object1: {
        '@load': false,
        '@orderBy': 'property4',
        '@limit': 31,
        '@offset': 41
      }
    })
  })
})
