export type Criteria = CriteriaObject | (CriteriaObject | 'AND' | 'OR' | 'XOR')[]

export interface CriteriaObject {
  '@not'?: boolean
  '@count'?: number
  '@load'?: boolean
  '@loadWithNewQuery'?: boolean

  [field: string]:
    // a value
    any |

    // an array of values
    [] |

    // an operator value object
    OperatorAndValue |

    // an array of operator value objects combined with logical operators
    (OperatorAndValue | 'AND' | 'OR' | 'XOR')[] |

    // a relationship
    CriteriaObject

  '@orderBy'?:
  string |
  string[] |
  { field: string, direction?: OrderDirection } |
  { field: string, direction?: OrderDirection }[]

  '@limit'?: number
  '@offset'?: number
}

export interface OperatorAndValue {
  operator: Operator
  value?: any | [] // a value or an array of values
}

export enum Operator {
  '=' = '=',
  '==' = '==',
  '!=' = '!=',
  '<>' = '<>',
  '>' = '>',
  '>=' = '>=',
  '<' = '<',
  '<=' = '<=',
  'LIKE' = 'LIKE',
  'NOT LIKE' = 'NOT LIKE',
  'IN' = 'IN',
  'MAX' = 'MAX',
  'MIN' = 'MIN'
}

export enum OrderDirection {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}
