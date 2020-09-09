# Mega Nice DB Criteria

A database independent way to describe queries for inserting, selecting, updating and deleting. This data structure can be used as a foundation for any SQL database, for any NoSQL database or for any other data store.

## Install

`npm install mega-nice-db-criteria`

## Overview

### DbReadCriteria, DbSelectCriteria, DbFindCriteria

Use on of the classes `DbReadParameter` / `DbSelectCriteria` / `DbFindCriteria` to define a criteria for a read / select / find. All of them describe exactly the same. Use the one that fits your terminology most.

```typescript
import { DbReadCriteria } from 'mega-nice-db-criteria'

let criteria: DbCriteriaCriteria = {
  id: 1,
  name: { operator: 'LIKE', value: '%ert%' },
  job: [ 'student', 'teacher' ],
  age: [{ operator: '>', value: 20 }, { operator: '<', value: 30 }],
  limit: 10,
  offset: 5,
  orderBy: 'job',
  orderBy: [ 'job', 'age' ],
  orderBy: {
    field: 'job',
    direction: 'DESC'
  },
  orderBy: [
    {
      field: 'job',
      direction: 'DESC'
    },
    {
      field: 'age',
      direction: 'DESC'
    }
  ]
}  
```

Describes a query looking like this in SQL.

```
... WHERE id = 1 AND name LIKE '%ert%' AND job IN ('student', 'teacher') AND age > 20 AND age < 30
```

### DbInsertCriteria

```typescript
import { DbInsertCriteria } from 'mega-nice-db-criteria'

let criteria: DbInsertCriteria = {
  name: 'Josa',
  job: 'Tree cutter',
  age: 36
}
```

Describes a query looking like this in SQL.

```
INSERT INTO table (name, job, age) VALUES ('Josa', 'Tree cutter', 36)
```

### DbUpdateCriteria

```typescript
import { DbUpdateCriteria } from 'mega-nice-db-criteria'

let criteria: DbUpdateCriteria = {
  name: 'Josa',
  job: 'Tree cutter',
  age: 36,
  criteria: {
    id: 4
  }
}
```

Describes a query looking like this in SQL.

```
UPDATE table SET name = 'Josa', job = 'Tree cutter', age = '36' WHERE id = 4
```

### DbDeleteCriteria

#### getColumnsToUpdate / getPropertiesToUpdate / getFieldsToUpdate

The functions `getColumnsToUpdate` / `getColumnsToUpdate` / `getFieldsToUpdate` can be used to find out which columns / properties / fields are to be updated, basically collecting any property of the object while ignoring the `criteria` property. All of them do exactly the same. Choose one that fits in your terminology most.

```typescript
import { DbUpdateCriteria, getColumnsToUpdate } from 'mega-nice-db-criteria'

let criteria: DbUpdateCriteria = {
  name: 'Josa',
  job: 'Tree cutter',
  age: 36,
  criteria: {
    id: 4
  }
}

let columnsToUpdate = getColumnsToUpdate(parameter)
columnsToUpdate == [ 'name', 'job', 'age' ]
```