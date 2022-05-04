import { expect } from 'chai'
import 'mocha'
import { CriteriaObject } from '../src/criteria'
import { isCriteriaComparison, isCriteriaEmpty, summarizeCriteria, workUpCriterion } from '../src/tools'

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
    expect(isCriteriaComparison(0)).to.be.false
    expect(isCriteriaComparison(true)).to.be.false
    expect(isCriteriaComparison(false)).to.be.false
    expect(isCriteriaComparison('')).to.be.false
    expect(isCriteriaComparison(null)).to.be.false
    expect(isCriteriaComparison(undefined)).to.be.false
    expect(isCriteriaComparison(NaN)).to.be.false
  })

  it('should return false for a wrong object', function() {
    expect(isCriteriaComparison({})).to.be.false
    expect(isCriteriaComparison({ '@value': '', a: '' })).to.be.false
  })

  it('should return true for a correct object', function() {
    expect(isCriteriaComparison({ '@operator': '' })).to.be.true
    expect(isCriteriaComparison({ '@operator': '', '@value': '' })).to.be.true
    expect(isCriteriaComparison({ '@value': '', '@operator': '', a: ''})).to.be.true
  })
})

describe('summarizeCriteria', function() {
  it('should return an empty criteria object if null was given', function() {
    expect(summarizeCriteria(null as any)).to.deep.equal({})
  })

  it('should return an empty criteria object if an empty criteria object was given', function() {
    expect(summarizeCriteria({})).to.deep.equal({})
  })

  it('should return an empty criteria object if an empty array was given', function() {
    expect(summarizeCriteria([])).to.deep.equal({})
  })

  it('should return the meta data of a criteria object', function() {
    expect(summarizeCriteria({
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
    expect(summarizeCriteria({
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

  it('should ignore relastionship whose values are null', function() {
    expect(summarizeCriteria({
      relationship: null
    })).to.deep.equal({})
  })

  it('should return the meta data of a criteria array', function() {
    expect(summarizeCriteria([[
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
    expect(summarizeCriteria([
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
    expect(summarizeCriteria([
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

describe('workUpCriterion', function () {
  it('should process a property in an criteria object', function() {
    let criteria = {
      criterion: 1
    }

    workUpCriterion(criteria, 'criterion', (criteria: CriteriaObject) => {
      criteria.replaced = {
        value: criteria.criterion
      }

      delete criteria.criterion
    })

    expect(criteria).to.deep.equal({
      replaced: {
        value: 1
      }
    })
  })

  it('should process a property in an criteria array', function() {
    let criteria = [
      {
        criterion: 1
      },
      'AND',
      [
        {
          criterion: 2
        }
      ]
    ]

    workUpCriterion(criteria, 'criterion', (criteria: CriteriaObject) => {
      criteria.replaced = {
        value: criteria.criterion
      }

      delete criteria.criterion
    })

    expect(criteria).to.deep.equal([
      {
        replaced: {
          value: 1
        }
      },
      'AND',
      [
        {
          replaced: {
            value: 2
          }
        }
      ]
    ])
  })
})