export interface SqlQueryOptions {

  [column: string]: any | [] | { operator: string, value: any | [] } | { operator: string, value: any | [] }[]
  orderBy?: string | string[] | { column: string, direction?: string } | { column: string, direction?: string }[]
  limit?: number
  offset?: number

}

export interface SqlInsertOptions {
  [column: string]: any
}

export interface SqlReadOptions extends SqlQueryOptions { }

export interface SqlUpdateOptions {
  [column: string]: any
  readOptions?: SqlQueryOptions
}

export interface SqlDeleteOptions extends SqlQueryOptions { }