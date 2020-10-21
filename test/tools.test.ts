import { expect } from 'chai'
import 'mocha'
import { isCriteriaEmpty } from '../src/tools'

describe('isCriteriaEmpty', function() {
  it('should return false if criteria is not empty', function() {
    expect(isCriteriaEmpty({ a: 'a' })).to.be.false
  })

  it('should return true if criteria is empty', function() {
    expect(isCriteriaEmpty({})).to.be.true
    expect(isCriteriaEmpty({ '@set': {} })).to.be.true
  })
})