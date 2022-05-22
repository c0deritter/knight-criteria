import { Criteria, CriteriaObject, ValueCriteriaField } from './criteria'

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
 * Will add every criterion given in the criteriaToAdd object into the given criteria.
 * The given criteria might either be a criteria object or an array. In the case of a
 * criteria object it will add every criterion to that object. In the case of a criteria
 * array it will add the given criteria to the last position connected by an AND operator.
 * 
 * @param criteria The criteria which additional criteria should be added to.
 * @param criteriaToAdd The criteria which are to be added.
 */
export function addCriteria(criteria: Criteria, criteriaToAdd: CriteriaObject) {
  if (criteria instanceof Array) {
    criteria.push('AND', criteriaToAdd)
  }
  else if (typeof criteria == 'object') {
    for (let key in criteriaToAdd) {
      criteria[key] = criteriaToAdd[key]
    }
  }
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
export function workUpCriterion(criteria: Criteria, criterion: string, workUpFunction: (criteriaObject: CriteriaObject) => void) {
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

/**
 * In contrast to workUpCriterion, this function will not only work up a single criterion
 * but it will give you the possibility to freely look into every found criteria object
 * and to work it up as you like, which means that you can also remove or work up more than
 * just one criterion.
 * 
 * Beware that this function will not iterate into criteria objects or array given as a criterion
 * for a relationship. If you want to achieve this you need to call workUpCriteria recursively
 * inside your workUpFunction.
 * 
 * @param criteria The criteria which should be worked up.
 * @param workUpFunction The function which will be called for each found criteria object.
 */
export function workUpCriteria(criteria: Criteria, workUpFunction: (criteriaObject: CriteriaObject) => void) {
  if (criteria instanceof Array) {
    for (let element of criteria) {
      if (element instanceof Array) {
        workUpCriteria(element, workUpFunction)
      }
      else if (typeof element == 'object') {
        workUpFunction(element)
      }
    }
  }
  else if (typeof criteria == 'object') {
    workUpFunction(criteria)
  }
}

/**
 * Similarly to workUpCriteria, this function will find every criteria object, but it will give you the
 * opportunity to replace them with completely new criteria objects. The result will be the same criteria
 * structure as before but with every criteria object replaced by a new one.
 * 
 * Also similarly to workUpCriteria, beware that this function will not iterate into the criteria given
 * as criterions for relationships. If you want to recursively go down the criteria tree you need to call
 * transformCriteria inside your transformFunction again.
 * 
 * @param criteria The criteria which are to be transformed.
 * @param transformFunction The function which transforms every found criteria object.
 * @returns The transformed criteria object which has the same structure as before but every criteria object was replaced.
 */
export function transformCriteria(criteria: Criteria, transformFunction: (criteria: CriteriaObject) => CriteriaObject): Criteria {
  if (criteria instanceof Array) {
    let transformedCriteria = []
    
    for (let element of criteria) {
      if (element instanceof Array) {
        let transformedArray = transformCriteria(element, transformFunction)
        transformedCriteria.push(transformedArray)
      }
      else if (typeof element == 'object') {
        let transformedObject = transformFunction(element)
        transformedCriteria.push(transformedObject)
      }
      else {
        transformedCriteria.push(element)
      }
    }

    return transformedCriteria
  }

  return transformFunction(criteria)
}