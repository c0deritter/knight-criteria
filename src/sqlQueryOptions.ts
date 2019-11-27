export class SqlQueryOptions {

  [column: string]: any | [] | { operator: string, value: any | [] } | { operator: string, value: any | [] }[]
  orderBy?: string | string[] | { column: string, direction?: string } | { column: string, direction?: string }[]
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
}

export class SqlDeleteOptions extends SqlQueryOptions { }