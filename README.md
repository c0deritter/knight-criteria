# Mega Nice DB Query Parameter

A database independent way to describe queries for inserting, selecting, updating and deleting. This data structure can be used as a foundation for any SQL database, for any NoSQL database or for any other data store.

## Install

`npm install mega-nice-db-query-parameter`

## Overview

### DbCriteria, DbSelectParameter, DbDeleteParameter

The class `DbCriteria` describes what in SQL is a WHERE query. Both the `DbSelectParameter` and `DbDeleteParameter` are just an empty subclass of `DbCriteria` which do add nothing. Thus the following example is valid for both of them as well.

```typescript
import { DbCriteria } from 'mega-nice-db-query-parameter'

let criteria: DbCriteria = {
  id: 1,
  name: { operator: 'LIKE', value: '%ert%' },
  job: ['student', 'teacher' ],
  age: [{ operator: '>', value: 20 }, { operator: '<', value: 30 }]
}  
```

Describes a query looking like this in SQL.

```
... WHERE id = 1 AND name LIKE '%ert%' AND job IN ('student', 'teacher') AND age > 20 AND age < 30
```

### DbInsertParameter

```typescript
import { DbInsertParameter } from 'mega-nice-db-query-parameter'

let parameter: DbInsertParameter = {
  name: 'Josa',
  job: 'Tree cutter',
  age: 36
}
```

Describes a query looking like this in SQL.

```
INSERT INTO table (name, job, age) VALUES ('Josa', 'Tree cutter', 36)
```

### DbUpdateParameter

```typescript
import { DbUpdateParameter } from 'mega-nice-db-query-parameter'

let parameter: DbUpdateParameter = {
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

#### getFieldsToUpdate

The function `getFieldsToUpdate` can be used to find out which fields are to be updated, basically collecting any property of the object while ignoring the `criteria` property.

```typescript
import { DbUpdateParameter, getFieldsToUpdate } from 'mega-nice-db-query-parameter'

let parameter: DbUpdateParameter = {
  name: 'Josa',
  job: 'Tree cutter',
  age: 36,
  criteria: {
    id: 4
  }
}

let fieldsToUpdate = getFieldsToUpdate(parameter)
fieldsToUpdate == [ 'name', 'job', 'age' ]
```