export type Criteria = CriteriaObject | (Criteria | 'AND' | 'OR' | 'XOR')[]

export interface CriteriaObject {
  '@not'?: boolean
  '@load'?: boolean
  '@loadSeparately'?: boolean
  '@count'?: number|Comparison
  '@min'?: number|Comparison
  '@max'?: number|Comparison

  [field: string]:
    // a value
    any |

    // an array of values
    any[] |

    // a comparison
    Comparison |

    // an array of comparisons combined with logical operators
    (Comparison | 'AND' | 'OR' | 'XOR')[] |

    // a relationship
    CriteriaObject

  '@orderBy'?:
    string |
    OrderBy |
    (string | OrderBy)[]

  '@limit'?: number
  '@offset'?: number
}

export interface Comparison {
  '@not'?: boolean
  '@operator': string|Operator
  '@value'?: any | [] // a value or an array of values
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
