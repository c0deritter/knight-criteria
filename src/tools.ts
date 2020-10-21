import { CreateCriteria, Criteria, DeleteCriteria, ReadCriteria, UpdateCriteria } from './criteria'

export function isCriteriaEmpty(criteria: Criteria|CreateCriteria|ReadCriteria|UpdateCriteria|DeleteCriteria) {
  for (let property of Object.keys(criteria)) {
    if (property[0] !== '@') {
      return false
    }
  }

  return true
}
