import { expect } from 'chai'
import 'mocha'
import { isOperatorAndValue } from '../src/criteria'

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