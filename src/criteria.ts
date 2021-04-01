export interface BaseCriteria<RelationshipType> {
  [ field: string ]:
    any | // a value
    [] | // an array of values
    OperatorAndValue | // an operator value pair
    OperatorAndValue[] | // an array of operator value pairs
    { [ field: string ]: RelationshipType } // a field which contains Criteria and thus is referencing another entity
}

export interface Criteria extends BaseCriteria<Criteria> {
  '@not'?: boolean
  '@count'?: number
}

export interface CreateCriteria {
  [ field: string ]: any
}

export interface RelationshipReadCriteria extends BaseCriteria<RelationshipReadCriteria> {
  '@filterGlobally'?: boolean
  '@doNotLoad'?: boolean

  '@orderBy'?: 
    string |
    string[] |
    {
      field: string,
      direction?: OrderDirection
    } |
    {
      field: string,
      direction?: OrderDirection
    }[]
}

export interface ReadCriteria extends BaseCriteria<RelationshipReadCriteria> {
  '@orderBy'?:
    string |
    string[] |
    {
      field: string,
      direction?: OrderDirection
    } |
    {
      field: string,
      direction?: OrderDirection
    }[]
    
  '@limit'?: number
  '@offset'?: number
}

export interface UpdateCriteria extends Criteria {
  '@set': { [ field: string ]: any }
}

export interface DeleteCriteria extends Criteria {}

export interface OperatorAndValue {
  operator: Operator
  value: any | [] // a value or an array of values
}

export enum Operator {
  '=', '==', '!=', '<>', '>', '>=', '<', '<='
}

export enum OrderDirection {
  'asc', 'desc'
}