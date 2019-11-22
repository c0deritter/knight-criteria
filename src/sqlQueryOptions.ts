export interface SqlQueryOptions {

  [column: string]: any | [] | { operator: string, value: any | [] } | { operator: string, value: any | [] }[]
  orderBy?: string | string[] | { column: string, direction?: string } | { column: string, direction?: string }[]
  limit?: number
  offset?: number

}

export interface SqlInsertOptions {
  [column: string]: any
}

export interface SqlSelectOptions extends SqlQueryOptions { }

export interface SqlUpdateOptions {
  [column: string]: any
  queryOptions?: SqlQueryOptions
}

export interface SqlDeleteOptions extends SqlQueryOptions { }