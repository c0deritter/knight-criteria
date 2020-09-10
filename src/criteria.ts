export interface DbCriteria {
  [field: string]: 
    any | // a value
    [] | // an array of values
    OperatorValue | // an operator value pair
    OperatorValue[] | // an array of operator value pairs
    { [ field: string ]: DbCriteria } // a field which contains DbCriteria this referencing another entity
}

export interface DbInsertCriteria {
  [ field: string ]: any
}

export interface DbCreateCriteria {
  [ field: string ]: any
}

export interface DbReadCriteria extends DbCriteria {
  orderBy?: string | string[] | { field: string, direction?: OrderDirection } | { field: string, direction?: OrderDirection }[]
  limit?: number
  offset?: number
}

export interface DbSelectCriteria extends DbCriteria {
  orderBy?: string | string[] | { field: string, direction?: OrderDirection } | { field: string, direction?: OrderDirection }[]
  limit?: number
  offset?: number
}

export interface DbFindCriteria extends DbCriteria {
  orderBy?: string | string[] | { field: string, direction?: OrderDirection } | { field: string, direction?: OrderDirection }[]
  limit?: number
  offset?: number
}

export interface DbUpdateCriteria extends DbCriteria {
  set: {
    [ field: string ]: any
  }
}

export interface DbDeleteCriteria extends DbCriteria {}

export interface DbRemoveCriteria extends DbCriteria {}

export function getColumnsToUpdate(criteria?: DbUpdateCriteria): string[] {
  if (criteria == undefined || criteria.set == undefined) {
    return []
  }

  return Object.keys(criteria.set)
}

export function getPropertiesToUpdate(criteria?: DbUpdateCriteria): string[] {
  return getColumnsToUpdate(criteria)
}

export function getFieldsToUpdate(criteria?: DbUpdateCriteria): string[] {
  return getColumnsToUpdate(criteria)
}

export interface OperatorValue {
  operator: string
  value: any|[]
}

export function isOperatorValue(value: any): boolean {
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