import { expect } from 'chai'
import 'mocha'
import { DbUpdateCriteria, getColumnsToUpdate, isOperatorValue } from '../src/criteria'

describe('SqlUpdateOptions', function() {
  describe('columns', function() {
    it('should list all fields', function() {
      let options: DbUpdateCriteria = {
        set: {
          a: 'a',
          b: 1
        }
      }

      let fields = getColumnsToUpdate(options)

      expect(fields).to.deep.equal(['a', 'b'])
    })

    it('should return an empty array if the parameter is undefined', function() {
      let fields = getColumnsToUpdate()
      expect(fields).to.deep.equal([])
    })
  })
})

describe('isValueOperator', function() {
  it('should return false for any value other than a non null object', function() {
    expect(isOperatorValue(0)).to.be.false
    expect(isOperatorValue(true)).to.be.false
    expect(isOperatorValue(false)).to.be.false
    expect(isOperatorValue('')).to.be.false
    expect(isOperatorValue(null)).to.be.false
    expect(isOperatorValue(undefined)).to.be.false
    expect(isOperatorValue(NaN)).to.be.false
  })

  it('should return false for a wrong object', function() {
    expect(isOperatorValue({})).to.be.false
    expect(isOperatorValue({ value: '', a: '' })).to.be.false
    expect(isOperatorValue({ operator: '' })).to.be.false
    expect(isOperatorValue({ value: '', operator: '', a: ''})).to.be.false
  })

  it('should return true for a correct object', function() {
    expect(isOperatorValue({ value: '' })).to.be.true
    expect(isOperatorValue({ value: '', operator: '' })).to.be.true
  })
})