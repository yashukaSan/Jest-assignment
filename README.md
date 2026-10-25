# Jest Assignment
A TypeScript project demonstrating unit testing with [Jest](https://jestjs.io).

## Table of Contents
- [Project Structure](#structure)
- [Pre Requisites](##prerequisite)
- [Environment Set-up](##environment-setup)
- [Running Tests](##)
 
## Project Structure
```
Jest-Assignment
|---controllers
    |---authController.ts
    |---bookingController.ts
    |---salonController.ts
|---middleware
    |---auth.ts
|---models
    |---Booking.ts
    |---Salon.ts
    |---Service.ts
    |---User.ts
|---routes
    |---authRoutes.ts
    |---bookingRoutes.ts
    |---salonRoutes.ts
|---tests
    |---controllers
        |---authController.test.ts
        |---bookingController.test.ts
        |---salonController.test.ts
    |---middleware
        |---auth.test.ts
    |---routes
        |---authRoutes.test.ts
        |---bookingRoutes.test.ts
        |---salonRoutes.test.ts
|---types
    |---express
        |---index.d.ts
|---utils
|---seed.ts
|---.env.example
|---.gitignore
|---README.md
|---index.ts
|---jest.config.js
|---package.json
|---package-lock.json
|---tsconfig.json
```

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


## Environemnt Setup

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
