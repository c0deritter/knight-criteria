export class DbCriteria {
  [field: string]: (any | []) | {operator: string, value: (any | [])} | {operator: string, value: (any | [])}[]
  orderBy?: string | string[] | {field: string, direction?: string} | {field: string, direction?: string}[]
  limit?: number
  offset?: number
}

export class DbInsertOptions {
  [field: string]: any
}

export class DbSelectOptions extends DbCriteria { }

export class DbUpdateOptions {
  [field: string]: any
  criteria?: DbCriteria
}

export class DbDeleteOptions extends DbCriteria { }

export function getFieldsToUpdate(options: DbUpdateOptions): string[] {
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
