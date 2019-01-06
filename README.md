# Web applications and Databases Teamwork  - JavaScript Alpha Aug'18

## Team 3

- Osman Yumer [telerikacademy.com/Users/GeorgeLevov](https://my.telerikacademy.com/Users/oyumer)
- Stefka Marinova [telerikacademy.com/Users/GeorgeLevov](https://my.telerikacademy.com/Users/jibonita)

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


```


## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Available routes
 | Routes                            |    Admin       |    Company     |    Client    |     Public    |  
| :---                              |     :---:      |         :---:   |         ---: |         ---: |
| auth/register   (POST)            |   ✔️           |    ✔️          |     ✔️       |     ✔️       | 
| auth/login   (POST)               |   ✔️           |    ✔️          |     ✔️       |    ✔️       |
| /users                            |   ✔️           |    ✘          |     ✘        |    ✘        |
| /users/clients                    |   ✔️           |    ✘          |     ✘        |    ✘        |
| /users/companies                  |   ✔️           |    ✘           |     ✘        |    ✘        |
| /users (DELETE)                   |   ✔️           |    ✘          |     ✘        |    ✘        |
| /routes                           |   ✔️           |    ✔️           |     ✘        |    ✘        |
| /routes  (POST)                   |   ✘           |    ✔️           |     ✘        |    ✘        |
| /routes/search?query-params       |   ✔️           |    ✔️          |     ✔️        |    ✔️        |
| /routes/:id                        |   ✔️           |    ✔️          |     ✔️        |    ✔️        |
| /routes/:id/details               |   ✔️           |    ✔️           |     ✔️        |    ✘        |
| /routes/id   (DELETE)             |   ✘           |    ✔️           |     ✘        |    ✘        |
| /stops                           |   ✔️           |    ✘           |     ✘        |    ✘        |
| /stops  (POST)                   |   ✔️           |    ✔️           |     ✘        |    ✘        |
| /tickets/userid                    |   ✘           |    ✘           |     ✔️        |    ✘        |
| /tickets/route/:id                   |   ✘           |    ✔️           |     ✘        |    ✘        |
| /tickets   (POST)                 |   ✘️           |    ✘           |     ✔️        |    ✘        |
| /tickets/:id (DELETE)                   |   ✘           |    ✔️           |     ✔️        |    ✘        |

 Trello link: https://trello.com/b/Hg776xwe/travel-schedule