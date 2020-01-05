# Mega Nice SQL Query Options

## Install

`npm install mega-nice-sql-query-options`

## Overview

### SqlQueryOptions, SqlSelectOptions, SqlDeleteOptions

```typescript
import { SqlQueryOptions } from 'mega-nice-sql-query-options'

let options: SqlQueryOptions = {
  id: 1,
  name: { operator: 'LIKE', value: '%ert%' },
  job: ['student', 'teacher' ],
  age: [{ operator: '>', value: 20 }, { operator: '<', 30 }]
}  
```

Describes a query looking like this.

```
... WHERE id = 1 AND name LIKE '%ert%' AND job IN ('student', 'teacher') AND age > 20 AND age < 30
```

### SqlInsertOptions

```typescript
let options: SqlInsertOptions = {
  name: 'Josa',
  job: 'Tree cutter',
  age: 36
}
```

Describes a query looking like this.

```
... INSERT INTO table (name, job, age) VALUES ('Josa', 'Tree cutter', 36)
```

### SqlUpdateOptions

```typescript
let options = new SqlUpdateOptions({
  name: 'Josa',
  job: 'Tree cutter',
  age: 36,
  queryOptions: {
    id: 4
  }
})
```

Describes a query looking like this.

```
... UPDATE table SET name = 'Josa', job = 'Tree cutter', age = '36' WHERE id = 4
```
