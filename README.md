# Web applications and Databases Teamwork  - JavaScript Alpha Aug'18

## Team 3

- Osman
- Stefka

## Project Description

Project theme: **Bus Travel Schedule System** - API that gives info for bus routes from point A to point B, opportunity to reserve a ticket for the entire bus route for a part of it
  
The application has:

- **public part** - search for a route by given start and end point
- **private part** - registered companies can add routes, preview tickets reserved for their routes; registered users can reserve a ticket
- **administrative part** - admin user can view all user groups, delete users

### Public Part

The **public part** of the project is **visible without authentication**.

This public part includes:
- the user login and user registration forms
- search for a route by given start and end point

### Private Part (Users only)

**Registered users** has private part in the web application accessible after **successful login**. There are registered companies and clients. 

*Companies can*:
- add routes, add stops, preview tickets reserved for their routes; 

*Clients can*:
- reserve a ticket

### Administration Part

**System administrators** can

- view all user groups, delete users
- system administrators does not register. They are added as modified manually in the db

## Preliminary Requirements

Before you start writing code, please take your time to write a simple project specification. Together with your team member, read the requirements below and answer the following questions in a (README in your repo) in a style of your choosing.

- Who are your team members?
- What is your project going to be about?
- What features will it consist of? Explain their purpose. (Try to be as granular as possible.)
- Create a kanban board with the following data, fill it and keep it updated:
  - Name of Feature
  - Feature Owner (who will write it?)
  - Estimated time it would take (in hours, **don't overthink it**)
  - Actual time it took (in hours)
  - Estimated time it would take to unit test (in hours)
  - Actual time it took to unit test (in hours)
- For the board you could use Trello or GitLab's project system.
  - If your selected tool does not support time estimation (for example Trello), just write it in the card's description or use an addon.

Try to adhere to this project specification and make your project as close to it as possible. As you implement each feature, write down the time it really took you and compare them with the estimate. Do not be surprised if the difference between them is great, that's completely normal when you do something like this for the first time. Also, don't go crazy on features, implement a few but implement them amazingly! 




## Should Requirements

* Should have **Administrative** part
  * Your registered users should have at least one of the two roles: **user** and **administrator**


## Installation

```bash
$ npm install
```

## Running the app

```bash
# initial DB tables create and fill usertypes 
$ npm run start-db

# development
$ npm run start

# watch mode
$ npm run start:dev

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr
```


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Available routes
 - 