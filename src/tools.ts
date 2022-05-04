import { Criteria, CriteriaObject } from './criteria'

/**
 * Goes through all properties and checks if there is at least one which is not an 
 * @-property.
 * 
 * @param criteria The criteria which are to be checked
 * @returns True if there is not one criterion defined
 */
export function isCriteriaEmpty(criteria: Criteria) {
  if (criteria instanceof Array) {
    for (let element of criteria) {
      if (typeof element == 'object') {
        if (! isCriteriaEmpty(element)) {
          return false
        }
      }
    }
  }

  else if (typeof criteria == 'object' && criteria !== null) {
    for (let property of Object.keys(criteria)) {
      if (property[0] !== '@') {
        return false
      }
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
    for (let element of criteria) {
      if (typeof element == 'object') {
        summarizeCriteria(element, summarized)
      }
    }
  }
  
  else if (typeof criteria == 'object' && criteria !== null) {
    for (let key of Object.keys(criteria)) {
      if (! (key in summarized) && key[0] == '@') {
        summarized[key] = criteria[key]
      }
      else if (typeof criteria[key] == 'object' && criteria[key] !== null) {
        if (! (key in summarized)) {
          summarized[key] = {}
        }

        summarizeCriteria(criteria[key], summarized[key])
      }
    }
  }

  return summarized
}

/**
 * Sometimes you will offer criterions which are technically not a part of your system
 * but which are for facilitating the usage of your criteria. In that case you will need
 * to work up those criterions to be expressed in the technical correct way of your 
 * application. For example, you might want to replace a criterion with one which
 * can actually processed by your application logic.
 * 
 * This function will search every criteria object and every time when it finds the 
 * specified criterion it will call your delivered function which will work the criterion 
 * up.
 * 
 * @param criteria The criteria which contains the criterion which should be worked up
 * @param criterion The criterion which should be worked up
 * @param workUpFunction The function which will work up the criterion
 */
export function workUpCriterion(criteria: Criteria, criterion: string, workUpFunction: (criteria: CriteriaObject) => void) {
  if (criteria instanceof Array) {
    for (let element of criteria) {
      if (typeof element == 'object') {
        workUpCriterion(element, criterion, workUpFunction)
      }
    }
  }

  else if (typeof criteria == 'object' && criteria !== null) {
    if (criterion in criteria) {
      workUpFunction(criteria)
    }
  }
}