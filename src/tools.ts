import { Criteria, CriteriaObject } from './criteria'

export function isCriteriaEmpty(criteria: CriteriaObject) {
  for (let property of Object.keys(criteria)) {
    if (property[0] !== '@') {
      return false
    }
  }

  return true
}

/**
 * Checks if a given value is an object and implements the interface Comparison.
 * 
 * @param value An arbitrary value.
 * @returns Returns true if the given value is an object and has the `@operator` property.
 */
export function isCriteriaComparison(value: any): boolean {
  return typeof value == 'object' && value !== null && value['@operator'] != undefined
}

/**
 * Since criteria can be an array of criteria objects, it is possible to define multiple
 * @-properties like `@limit` or `@load`. Since it is only possible to process one
 * @-property of the same kind, this function summarizes all the @-properties.
 * 
 * If there are two @-properties of the same kind but with different values, the first
 * one is taken.
 * 
 * @param criteria 
 * @param summarized 
 * @returns 
 */
export function summarizeCriteria(criteria: Criteria, summarized: any = {}): CriteriaObject {
  if (criteria instanceof Array) {
    for (let criterium of criteria) {
      if (typeof criterium == 'object') {
        summarizeCriteria(criterium, summarized)
      }
    }
  }
  
  else if (typeof criteria == 'object' && criteria !== null) {
    for (let key of Object.keys(criteria)) {
      if (! (key in summarized) && key[0] == '@') {
        summarized[key] = criteria[key]
      }
      else if (typeof criteria[key] == 'object') {
        if (! (key in summarized)) {
          summarized[key] = {}
        }

        summarizeCriteria(criteria[key], summarized[key])
      }
    }
  }

  return summarized
}