# Home Library Service
__Hi student, take into account that auto-migrations are disabled, you need to run the migration yourself before the tests, how to do this is described in the item Usage__  

P.S. _Thank you for your attention_
## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Usage
After _npm install_ need you must run the migrations.

First time create container
```
docker-compose up
```

Next run migration
```
npm run migration:run
```
__And after need run test__

_See Testing below_


## Testing

After application running open new terminal and enter:

To run all tests without authorization

___Before run test need run:migration___

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## Containerization

_Must be installed Docker_

Create container:

```
docker-compose up
```
After creating the container, the app and the db will run on the ports specified in the env



