export class SqlQueryOptions {
  [column: string]: (any | []) | {operator: string, value: (any | [])} | {operator: string, value: (any | [])}[]
  orderBy?: string | string[] | {column: string, direction?: string} | {column: string, direction?: string}[]
  limit?: number
  offset?: number
}

export class SqlInsertOptions {
  [column: string]: any
}

export class SqlSelectOptions extends SqlQueryOptions { }

export class SqlUpdateOptions {
  [column: string]: any
  queryOptions?: SqlQueryOptions

  columns(): string[] {
    let columns = []

    for (let prop in this) {
      if (prop == 'queryOptions') {
        continue
      }

      if (Object.prototype.hasOwnProperty.call(this, prop)) {
        columns.push(prop)
      }
    }

    return columns
  }
}

export class SqlDeleteOptions extends SqlQueryOptions { }