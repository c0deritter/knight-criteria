# Knight Criteria by Coderitter

A data structure to describe criteria for operations on a data store. They can be serialized to JSON and thus are fitting for API calls.

## Related packages

The package [knight-orm](https://github.com/c0deritter/knight-orm) offers a criteria-based interface to load entities from databases.

If you just want to match plain JavaScript objects against criteria you can use [knight-criteria-matcher](https://github.com/c0deritter/knight-criteria-matcher). There is also an in-memory object database [knight-object-db](https://github.com/c0deritter/knight-object-db) which uses criteria for queries.

## Install

`npm install knight-criteria`

## Overview

Criteria work like this.

```typescript
import { Criteria } from 'knight-criteria'

let criteria: Criteria = {
  name: 'Josa'
}
```

Which result in an SQL query looking like this.

```sql
SELECT * FROM person WHERE name = 'Josa`
```

### Criteria object

Here is an overview of what you can do with a criteria object.

```typescript
import { Criteria } from 'knight-criteria'

let criteria: Criteria = {
  // a simple value which will default to the operator =
  // WHERE id = 1
  id: 1,

  // explicitely define an operator
  // =, ==, !=, <>, >, >=, <, <=, LIKE, NOT LIKE, IN, NOT IN
  // WHERE name LIKE '%ert%'
  name: { '@operator': 'LIKE', '@value': '%ert%' },

  // use an array of values which will equal to an SQL IN operator
  // WHERE job IN ('student', 'teacher')
  job: [ 'student', 'teacher' ],

  // use an array of explicitely defined operators which result them to be OR connected
  // WHERE (age < 20 OR age > 30)
  age: [{ '@operator': '<', '@value': 20 }, { '@operator': '>', '@value': 30 }],

  // use an array of explicitely defined operators and explicitely define a connecting logical operator
  // WHERE (age > 20 AND age < 30)
  age: [{ '@operator': '>', '@value': 20 }, 'AND', { '@operator': '<', '@value': 30 }],

  // order by a particular field in ascending direction
  '@orderBy': 'job',

  // order by multiple fields in ascending direction
  '@orderBy': [ 'job', 'age' ],

  // order by one field and specify the direction explicitly
  '@orderBy': { field: 'job', direction: 'DESC' },

  // order by multiple fields and specify their directions explicitly
  '@orderBy': [{ field: 'job', direction: 'DESC' }, { field: 'age', direction: 'DESC' }],

  // limit the number of results
  '@limit': 10,

  // offset the results
  '@offset': 5
}  
```

### Relationships

You can also define criteria on relationships.

```typescript
let criteria: Criteria = {
  // only include people which have at least one email address from Google
  emails: {
    address: { '@operator': 'LIKE', '@value': '%@gmail.com' }
  }

  // only include people which have at least one email address from Google
  // while also loading these emails
  emails: {
    '@load': true,
    address: { '@operator': 'LIKE', '@value': '%@gmail.com' }
  }  

  // include all people and load any email
  emails: { '@load': true }
```

If the criteria is translated into an SQL query it will use a `JOIN` and looks like this.

```sql
SELECT * FROM person JOIN email ON person.id = email.person_id WHERE email.address LIKE '%@gmail.com'
```

You can also define relationship criteria which will only apply to the entities in the relationship itself but not to the entities owning the relationship.

```typescript
  // include all people but load only emails which are from Google
  emails: {
    '@loadSeparately': true,
    address: { '@operator': 'LIKE', '@value': '%@gmail.com' }
  }
```

It results in two SQL queries being executed instead of one which would use a join.

```sql
SELECT * FROM person
SELECT * FROM email WHERE address LIKE '%@gmail.com'
```

It has the effect that the criteria defined for the relationship `emails` are only applied to that relationship. It will not reduce the found persons if one does not own an email address fitting the given criteria.

### Combine multiple criteria

You can also combine multiple criteria objects with one of the logical operators `AND`, `OR` or `XOR`. If you do not state one of these operators between two criteria it will default to `OR`.

```typescript
let criteria: Criteria = [
  {
    age: { '@operator': '>=', '@value': 20 },
    emails: {
      '@load': true,
      address: { '@operator': 'LIKE', '@value': '%@icloud.com' }
    }
  },
  'XOR',
  {
    age: { '@operator': '>=', '@value': 30 },
    emails: {
      '@load': true,
      address: { '@operator': 'LIKE', '@value': '%@gmail.com' }
    }
  }
]
```

Which will create an SQL query like this.

```sql
SELECT * FROM person JOIN email ON person.id = email.person_id WHERE (age >= 20 AND email.address LIKE '%@icloud.com') XOR (age >= 30 AND email.address LIKE '%@gmail.com')
```

## Tools

### isCriteriaEmpty

Checks if a given criteria object or criteria array does not define any criteria.

```typescript
import { isCriteriaEmpty } from 'knight-criteria'

isCriteriaEmpty({}) == true
isCriteriaEmpty({ '@not': true }) == true
isCriteriaEmpty({ name: 'Josa' }) == true
```

### isCriteriaComparison

This function checks if a given object implements the the `Comparison` Interface. It can be useful for more sophisticated algorithms.

```typescript
import { isCriteriaComparison } from 'knight-criteria'

isCriteriaComparison(1) == false
isCriteriaComparison({}) == false
isCriteriaComparison({ '@value': 1 }) == false
isCriteriaComparison({ '@operator': '!=', '@value': 1 }) == true
isCriteriaComparison({ '@operator': '!=' }) == true
```

### summarizeCriteria

This function will summarize every @-property which is useful if you are dealing with criteria arrays which can contain multiple conflicting @-property definitions.

```typescript
let criteria = [
  {
    '@limit': 10
  },
  {
    '@limit': 20
  }
]
```

Here there are two limit definitions which conflict with each other. `summarizeCriteria` will collect give the first occurence of an @-property the priority and thus creates a standard for dealing with these situations.

```typescript
import { summarizeCriteria } from 'knight-citeria'

let summarized = summarizeCriteria(criteria)

summarized == {
  '@limit': 10
}
```

### workUpCriterion

This function helps you with working up single criterions of the given criteria. This can be used to offer a simplified citeria interface.

Imagine you want to facilitate your interface to access your user database by providing an`age` criterion which offers to search for users by their age instead of using a birth date.

```typescript
let critera = {
  age: 30
}
```

You now would want to work up the criterion and translate it into a birth date interval.

```typescript
import { CriteriaObject, workUpCriterion } from 'knight-criteria'

workUpCriterion(criteria, 'age', async (criteria: CriteriaObject) => {
  let date = new Date
  date.setFullYear(date.getFullYear() - criteria.age)
  
  criteria.birthDate = {
    '@operator': '<',
    '@value': date
  }

  delete criteria.age
})
```

This function is especially useful when dealing with criteria arrays which might contain multiple `age` criterions in different locations.

```typescript
let criteria = [
  {
    age: 30,
    city: 'Dresden'
  },
  {
    age: 20,
    city: 'Berlin'
  }
]
```