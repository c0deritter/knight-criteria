import { expect } from 'chai'
import 'mocha'
import { DbUpdateParameter, getFieldsToUpdate } from '../src/dbQueryParameter'

describe('SqlUpdateOptions', function() {
  describe('columns', function() {
    it('should list all fields', function() {
      let options: DbUpdateParameter = {
        a: 'a',
        b: 1
      }

      let fields = getFieldsToUpdate(options)

      expect(fields).to.deep.equal(['a', 'b'])
    })
  })
})