export default interface SqlQueryOptions {

  [key: string]: any | Array<any> | { operator: string, value: any | Array<any> } | { operator: string, value: any | Array<any> }[]
  orderBy?: string | string[] | { column: string, direction?: string } | { column: string, direction?: string }[]
  limit?: number
  offset?: number

}
