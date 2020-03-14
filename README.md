# Express Template
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

This is an express project already configured for basic use cases so you can focus on starting adding value without dealing with a lot of configuration.

- [Features](#features)
- [Installation](#installation)
- [Examples](#examples)
- [Contributing](#contributing)

## Features
- [Typescript](https://www.npmjs.com/package/typescript)
- [Prettier](https://www.npmjs.com/package/prettier) & [ESLint](https://www.npmjs.com/package/eslint)
- [Express validator](https://www.npmjs.com/package/express-validator)
- [ ] Logging
- [ ] Swagger
- [ ] Authentication example
- [ ] Database
  - [ ] PostgreSQL
  - [ ] MongoDB
- [ ] Docker containers
- [ ] Tests examples

## Improvements
- [ ] Exception handling

## Installation
- TODO

## Examples

JSON response
```json
[
  {
    "id": 2,
    "name": "Me",
    "companies": [] // =( Soon!
  }
]
```

Error response
```json
{
  "error": "Resource Not Found",
  "statusCode": 404,
  "message": "Person not found for id 5",
  "timestamp": "2020-03-14T17:01:17-03:00",
  "path": "/people/5"
}
```

Validation error response
```json
{
  "error": "Validation Error",
  "statusCode": 422,
  "message": "There are invalid fields",
  "timestamp": "2020-03-14T17:01:17-03:00",
  "fieldErrors": [
    {    
      "field": "name",
      "message": "Name is required",
      "invalidValue": null,
    }    
  ],
  "path": "/people"
}
```

## Contributing
- TODO