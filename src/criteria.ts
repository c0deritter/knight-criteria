export type Criteria<T extends CriteriaObject = CriteriaObject> = T | (Criteria<T> | 'AND' | 'OR' | 'XOR')[]

export interface CriteriaObject {
  '@not'?: boolean
  '@load'?: boolean
  '@loadSeparately'?: boolean
  '@count'?: number|Comparison
  '@min'?: number|Comparison
  '@max'?: number|Comparison

  [field: string]: ValueCriteriaField | Criteria

  '@orderBy'?:
    string |
    OrderBy |
    (string | OrderBy)[]

  '@limit'?: number
  '@offset'?: number
}

export type ValueCriteriaField<T = any> =  
  // a value
  T |

  // an array of values
  T[] |

  // a comparison
  Comparison<T> |

  // an array of comparisons combined with logical operators
  (Comparison<T> | 'AND' | 'OR' | 'XOR')[]

export interface Comparison<T = any> {
  '@not'?: boolean
  '@operator': string|Operator
  '@value'?: T | T[] // a value or an array of values
}

export interface OrderBy {
  field: string
  direction?: string|OrderDirection
}

export enum Operator {
  '=' = '=',
  '!=' = '!=',
  '<>' = '<>',
  '>' = '>',
  '>=' = '>=',
  '<' = '<',
  '<=' = '<=',
  'LIKE' = 'LIKE',
  'NOT LIKE' = 'NOT LIKE',
  'IN' = 'IN',
  'NOT IN' = 'NOT IN'
}

export enum OrderDirection {
  'ASC' = 'ASC',
  'DESC' = 'DESC'
}
