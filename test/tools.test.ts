import { expect } from 'chai'
import 'mocha'
import { isCriteriaEmpty, isOperatorAndValue } from '../src/tools'

describe('isCriteriaEmpty', function() {
  it('should return false if criteria is not empty', function() {
    expect(isCriteriaEmpty({ a: 'a' })).to.be.false
  })

  it('should return true if criteria is empty', function() {
    expect(isCriteriaEmpty({})).to.be.true
    expect(isCriteriaEmpty({ '@set': {} })).to.be.true
  })
})

describe('isValueOperator', function() {
  it('should return false for any value other than a non null object', function() {
    expect(isOperatorAndValue(0)).to.be.false
    expect(isOperatorAndValue(true)).to.be.false
    expect(isOperatorAndValue(false)).to.be.false
    expect(isOperatorAndValue('')).to.be.false
    expect(isOperatorAndValue(null)).to.be.false
    expect(isOperatorAndValue(undefined)).to.be.false
    expect(isOperatorAndValue(NaN)).to.be.false
  })

  it('should return false for a wrong object', function() {
    expect(isOperatorAndValue({})).to.be.false
    expect(isOperatorAndValue({ value: '', a: '' })).to.be.false
    expect(isOperatorAndValue({ operator: '' })).to.be.false
    expect(isOperatorAndValue({ value: '', operator: '', a: ''})).to.be.false
  })

  it('should return true for a correct object', function() {
    expect(isOperatorAndValue({ value: '' })).to.be.true
    expect(isOperatorAndValue({ value: '', operator: '' })).to.be.true
  })
})