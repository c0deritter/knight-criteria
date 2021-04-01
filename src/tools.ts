import { CreateCriteria, Criteria, DeleteCriteria, ReadCriteria, UpdateCriteria } from './criteria'

export function isCriteriaEmpty(criteria: Criteria|CreateCriteria|ReadCriteria|UpdateCriteria|DeleteCriteria) {
  for (let property of Object.keys(criteria)) {
    if (property[0] !== '@') {
      return false
    }
  }

  return true
}

export function isOperatorAndValue(value: any): boolean {
  if (typeof value == 'object' && value !== null) {
    let propertyCount = Object.keys(value).length 

    if (propertyCount == 1 && value.value !== undefined) {
      return true
    }

    if (propertyCount == 2 && value.value !== undefined && value.operator !== undefined) {
      return true
    }

    return false
  }

  return false
}
