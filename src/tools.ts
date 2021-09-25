import { CriteriaObject } from './criteria'

export function isCriteriaEmpty(criteria: CriteriaObject) {
  for (let property of Object.keys(criteria)) {
    if (property[0] !== '@') {
      return false
    }
  }

  return true
}

export function isComparison(value: any): boolean {
  return typeof value == 'object' && value !== null && value['@operator'] != undefined
}
