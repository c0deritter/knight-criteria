# Mega Nice DB Query Options

A database independent way to describe queries for inserting, selecting, updating and deleting. This data structure can be used as a foundation for any SQL database, for any NoSQL database or for any other data store.

## Install

`npm install mega-nice-db-query-options`

## Overview

### DbCriteria, DbSelectOptions, DbDeleteOptions

The class `DbCriteria` describes what in SQL is a WHERE query. Both the `DbSelectOptions` and `DbDeleteOptions` are just an empty subclass of `DbCriteria` which do add nothing. Thus the following example is valid for both of them as well.

```typescript
import { DbCriteria } from 'mega-nice-db-query-options'

let options: DbCriteria = {
  id: 1,
  name: { operator: 'LIKE', value: '%ert%' },
  job: ['student', 'teacher' ],
  age: [{ operator: '>', value: 20 }, { operator: '<', 30 }]
}  
```

Describes a query looking like this in SQL.

```
... WHERE id = 1 AND name LIKE '%ert%' AND job IN ('student', 'teacher') AND age > 20 AND age < 30
```

### DbInsertOptions

```typescript
let options: DbInsertOptions = {
  name: 'Josa',
  job: 'Tree cutter',
  age: 36
}
```

Describes a query looking like this in SQL.

```
INSERT INTO table (name, job, age) VALUES ('Josa', 'Tree cutter', 36)
```

### DbUpdateOptions

```typescript
let options = new DbUpdateOptions({
  name: 'Josa',
  job: 'Tree cutter',
  age: 36,
  criteria: {
    id: 4
  }
})
```

Describes a query looking like this in SQL.

```
UPDATE table SET name = 'Josa', job = 'Tree cutter', age = '36' WHERE id = 4
```
