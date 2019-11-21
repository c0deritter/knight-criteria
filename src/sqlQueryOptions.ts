export default interface SqlReadOptions {

  [key: string]: any | [] | { operator: string, value: any | [] } | { operator: string, value: any | [] }[]
  orderBy?: string | string[] | { column: string, direction?: string } | { column: string, direction?: string }[]
  limit?: number
  offset?: number

}
