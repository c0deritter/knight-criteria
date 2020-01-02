import 'mocha'
import { expect } from 'chai'
import { SqlUpdateOptions } from '../src/sqlQueryOptions'

describe('SqlUpdateOptions', function() {
  describe('columns', function() {
    it('should list all columns', function() {
      let options = new SqlUpdateOptions()
      options.a = 'a'
      options.b = 1

      let columns = options.columns()

      expect(columns).to.deep.equal(['a', 'b'])
    })
  })
})