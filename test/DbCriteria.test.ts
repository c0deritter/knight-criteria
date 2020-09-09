import { expect } from 'chai'
import 'mocha'
import { DbUpdateCriteria, getColumnsToUpdate } from '../src'

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