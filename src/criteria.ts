export type Criteria = CriteriaObject | (CriteriaObject | 'AND' | 'OR' | 'XOR')[]

export interface CriteriaObject {
  '@not'?: boolean
  '@load'?: boolean
  '@loadWithNewQuery'?: boolean

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
  { '@field': string, '@direction'?: OrderDirection } |
  { '@field': string, '@direction'?: OrderDirection }[]

  '@limit'?: number
  '@offset'?: number
}

export interface Comparison {
  '@not'?: boolean
  '@operator': Operator
  '@value'?: any | [] // a value or an array of values
}

export type Operator =
  '=' |
  '!=' |
  '<>' |
  '>' |
  '>=' |
  '<' |
  '<=' |
  'LIKE' |
  'NOT LIKE' |
  'IN' |
  'NOT IN' |
  'MAX' |
  'MIN' |
  'COUNT'

export type OrderDirection =
  'ASC' |
  'DESC'
