export interface DbCriteria {
  [field: string]: (any | []) | {operator: string, value: (any | [])} | {operator: string, value: (any | [])}[]
  orderBy?: string | string[] | {field: string, direction?: string} | {field: string, direction?: string}[]
  limit?: number
  offset?: number
}

export interface DbInsertParameter {
  [field: string]: any
}

export interface DbCreateParameter {
  [field: string]: any
}

export interface DbReadParameter extends DbCriteria {}

export interface DbSelectParameter extends DbCriteria {}

export interface DbFindParameter extends DbCriteria {}

export interface DbUpdateParameter {
  [field: string]: any
  criteria?: DbCriteria
}

export interface DbDeleteParameter extends DbCriteria {}

export interface DbRemoveParameter extends DbCriteria {}

export function getFieldsToUpdate(options: DbUpdateParameter): string[] {
  let fields = []

  for (let prop in options) {
    if (prop == 'criteria') {
      continue
    }

    if (Object.prototype.hasOwnProperty.call(options, prop)) {
      fields.push(prop)
    }
  }

  return fields
}
