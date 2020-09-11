# Mega Nice Criteria

Simple data structures to describe criteria for CRUD operations and which can be easily serialized for example to JSON.

## Install

`npm install mega-nice-criteria`

## Overview

### ReadCriteria

```typescript
import { ReadCriteria } from 'mega-nice-criteria'

let criteria: ReadCriteria = {
  id: 1,
  name: { operator: 'LIKE', value: '%ert%' },
  job: [ 'student', 'teacher' ],
  age: [{ operator: '>', value: 20 }, { operator: '<', value: 30 }],
  limit: 10,
  offset: 5,
  // order by one field
  orderBy: 'job',
  // ordery by mulitpe fields
  orderBy: [ 'job', 'age' ],
  // order by one field and specify the direction explicitly
  orderBy: {
    field: 'job',
    direction: 'DESC'
  },
  // order by multiple fields and specify their directions explicitly
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

### InsertCriteria

```typescript
import { InsertCriteria } from 'mega-nice-criteria'

let criteria: InsertCriteria = {
  name: 'Josa',
  job: 'Tree cutter',
  age: 36
}
```

Describes a query looking like this in SQL.

```
INSERT INTO table (name, job, age) VALUES ('Josa', 'Tree cutter', 36)
```

### UpdateCriteria

```typescript
import { UpdateCriteria } from 'mega-nice-criteria'

let criteria: UpdateCriteria = {
  id: 4,
  set: {
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
import { DeleteCriteria } from 'mega-nice-criteria'

let criteria: DeleteCriteria = {
  id: 4
}
```

Describes a query looking like this in SQL.

```
DELETE FROM table WHERE id = 4
```
