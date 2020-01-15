import { expect } from 'chai'
import 'mocha'
import { DbUpdateOptions, getFieldsToUpdate } from '../src/dbQueryOptions'

describe('SqlUpdateOptions', function() {
  describe('columns', function() {
    it('should list all fields', function() {
      let options = new DbUpdateOptions()
      options.a = 'a'
      options.b = 1

      let fields = getFieldsToUpdate(options)

      expect(fields).to.deep.equal(['a', 'b'])
    })
  })
})