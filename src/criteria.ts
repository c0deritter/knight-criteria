export interface DbCriteria {
  [field: string]: 
    any | // a value
    [] | // an array of values
    { operator: string, value: ( any | [] )} | // an operator value pair
    { operator: string, value: ( any | [] )}[] | // an array of operator value pairs
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

export enum OrderDirection {
  ASC, DESC
}