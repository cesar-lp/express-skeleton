# Express Template
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

This is an express project already configured for basic use cases so you can focus on starting adding value without dealing with a lot of configuration.

- [Features](#features)
- [Installation](#installation)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Features
- [Typescript](https://www.npmjs.com/package/typescript)
- [Prettier](https://www.npmjs.com/package/prettier) & [ESLint](https://www.npmjs.com/package/eslint)
- [Express validator](https://www.npmjs.com/package/express-validator)
- [Swagger](https://swagger.io) ([Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express) & [Swagger JS DOC](https://www.npmjs.com/package/swagger-jsdoc))
- [Docker](https://www.docker.com) containers

## Installation
The following steps assume that you have [Docker](https://www.docker.com) installed on your machine.

1. Clone the repository
```shell script
 git clone git@github.com:cesar-lp/express-template.git
```

2. Move into folder
```shell script
cd express-template
```

3. Build and start containers
```shell script
docker-compose build
docker-compose up
```

## Examples

JSON response
```json
[
  {
    "id": 2,
    "name": "Cesar Palacios",
    "companies": []
  }
]
```

Bad Request
```json
{
    "error": "Bad Request",
    "statusCode": 400,
    "message": "Request URI contains invalid values",
    "timestamp": "2020-04-30T23:13:06-03:00",
    "path": "/api/people/1421360b-6ef1-43d6-9dbb-03c7b4b2a1dc9",
    "errors": [
        {
            "pathVariableName": "id",
            "error": "Value is not an UUID",
            "invalidValue": "1421360b-6ef1-43d6-9dbb-03c7b4b2a1dc9"
        }
    ]
}
```

Resource Not Found
```json
{
    "error": "Resource Not Found",
    "statusCode": 404,
    "message": "Person not found for id 1421360b-6ef1-43d6-9dbb-03c7bb2a1dc9",
    "timestamp": "2020-04-30T23:12:23-03:00",
    "path": "/api/people/1421360b-6ef1-43d6-9dbb-03c7bb2a1dc9"
}
```

Validation Error
```json
{
    "error": "Validation Error",
    "statusCode": 422,
    "message": "Request body isn't complete or contains invalid fields",
    "timestamp": "2020-04-30T23:11:38-03:00",
    "path": "/api/people/1421360b-6ef1-43d6-9dbb-03c7bb2a1dc9",
    "errors": [
        {
            "fieldName": "name",
            "error": "Name is required",
            "invalidValue": null
        }
    ]
}
```

## Contributing
Found something that needs to be fixed/improved? Feel free to submit a PR!

## License
This project is licensed under the [ISC](https://opensource.org/licenses/ISC) License.
