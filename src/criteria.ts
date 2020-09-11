export interface Criteria {
  [ field: string ]: 
    any | // a value
    [] | // an array of values
    OperatorAndValue | // an operator value pair
    OperatorAndValue[] | // an array of operator value pairs
    {[ field: string ]: Criteria } // a field which contains Criteria and thus is referencing another entity
}

export interface CreateCriteria {
  [ field: string ]: any
}

export interface ReadCriteria extends Criteria {
  orderBy?: string | string[] | { field: string, direction?: OrderDirection } | { field: string, direction?: OrderDirection }[]
  limit?: number
  offset?: number
}

export interface UpdateCriteria extends Criteria {
  set: {
    [ field: string ]: any
  }
}

export interface DeleteCriteria extends Criteria {}

export interface OperatorAndValue {
  operator: string
  value: any|[]
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

export enum OrderDirection {
  ASC, DESC
}