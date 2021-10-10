export type Criteria = CriteriaObject | (Criteria | 'AND' | 'OR' | 'XOR')[]

export interface CriteriaObject {
  '@not'?: boolean
  '@load'?: boolean
  '@loadSeparately'?: boolean

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
    string[] |
    { field: string, direction?: OrderDirection } |
    { field: string, direction?: OrderDirection }[]

  '@limit'?: number
  '@offset'?: number
}

export interface Comparison {
  '@not'?: boolean
  '@operator': Operator
  '@value'?: any | [] // a value or an array of values
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
  'NOT IN' = 'NOT IN',
  'MAX' = 'MAX',
  'MIN' = 'MIN',
  'COUNT' = 'COUNT'
}

export enum OrderDirection {
  'ASC' = 'ASC',
  'DESC' = 'DESC'
}
