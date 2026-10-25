# Jest Assignment
A TypeScript project demonstrating unit testing with [Jest](https://jestjs.io).

## Table of Contents
- [Pre Requisites](#prerequisite)
- [Environment Set-up](#environment-setup)
- [Running Tests](#test-run)
- 
## Pre Requesites

### Required Versions
- [Node.js](https://nodejs.org/) : v18 or later 
- [npm](http://npmjs.com/)

### Required Dependencies
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- dotenv
- jest
- ts-jest
- supertest
- typescript
- tsx
- ts-node
- ts-node-dev
- @types/bcryptjs
- @types/cors
- @types/node
- @types/express
- @types/jsonwebtoken
- @types/mongoose
- @types/jest
- @types/supertest

### Database or external service
**MongoDB** *index.ts* connects to mongodb://localhost:27017/salon-db unless MONGO_URI is set.

---
## Environemnt Setup
---
### Required Environment Variables
- PORT
- JWT_SECRET

### How to configure them
- Create the **.env** file 
- Write the following code
```
PORT=
JWT_SECRET=
```
- values should set as your private key
- confirm the **.env** file is listed in the ***.gitignore*** file
## Run Tests
- Successfully install the **jest**, **ts-jest**, **supertest**, **@types/jest**, **@types/supertest** modules 
- add the following in the script of the *package.json* file
```
"scripts":{
    "test" : "jest"
}
```
- Create the **jest.config.js** file
- Put the following in the file
```
const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
};
```

### Execution of the Tests
- Open Terminal 
- Navigate to the **Jest-assignment** folder
- run the following code
```
npm test
```
- Then the terminal starts the execution of the test suites

### Assumptions
- *Jest-Assignment* Folder opened in **VS Code** 
- Successfully run the following command in the terminal
```
npm install
```
- Successfully configure the **Jest configuration file**
