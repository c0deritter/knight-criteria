# Knight Criteria by Coderitter

A data structures to describe criteria for CRUD operations on a data store. They can be easily serialized to JSON.

## Install

`npm install knight-criteria`

## Overview

There criteria für creating (`CreateCriteria`), reading (`ReadCriteria`), updating (`UpdateCriteria`) and deleting (`DeleteCriteria`) entities from a data store.

All of them base on `BaseCriteria` which you can use to define new criteria interfaces and there is also a generic general purpose criteria interface `Criteria`.

### CreateCriteria

```typescript
import { CreateCriteria } from 'knight-criteria'

let criteria: CreateCriteria = {
  name: 'Josa',
  job: 'Tree cutter',
  age: 36
}
```

Describes a query looking like this in SQL.

```
INSERT INTO table (name, job, age) VALUES ('Josa', 'Tree cutter', 36)
```

### ReadCriteria

```typescript
import { ReadCriteria } from 'knight-criteria'

let criteria: ReadCriteria = {
  // use a simple value which will default to the operator `=`
  id: 1,

  // use a simple value and explicitely define an operator
  name: { operator: 'LIKE', value: '%ert%' },

  // use an array of simple values which will equals to a SQL IN operator
  job: [ 'student', 'teacher' ],

  // use an array of simple values with explicitely defined operator which result them to be AND connected
  age: [{ operator: '>', value: 20 }, { operator: '<', value: 30 }],

  // limit the number of results
  '@limit': 10,

  // offset the results
  '@offset': 5,

  // order by a particular field in ascending direction
  '@orderBy': 'job',

  // order by multiple fields in ascending direction
  '@orderBy': [ 'job', 'age' ],
  // order by one field and specify the direction explicitly
  orderBy: {
    field: 'job',
    direction: 'asc'
  },
  // order by multiple fields and specify their directions explicitly
  orderBy: [
    {
      field: 'job',
      direction: 'asc'
    },
    {
      field: 'age',
      direction: 'desc'
    }
  ]
}  
```

Describes a query looking like this in SQL.

```
... WHERE id = 1 AND name LIKE '%ert%' AND job IN ('student', 'teacher') AND age > 20 AND age < 30
```

### UpdateCriteria

```typescript
import { UpdateCriteria } from 'knight-criteria'

let criteria: UpdateCriteria = {
  id: 4,
  '@set': {
    name: 'Josa',
    job: 'Tree cutter',
    age: 36
  }
}
```

Describes a query looking like this in SQL.

```
UPDATE table SET name = 'Josa', job = 'Tree cutter', age = '36' WHERE id = 4
```

### DeleteCriteria

```typescript
import { DeleteCriteria } from 'knight-criteria'

let criteria: DeleteCriteria = {
  id: 4
}
```

Describes a query looking like this in SQL.

```
DELETE FROM table WHERE id = 4
```
