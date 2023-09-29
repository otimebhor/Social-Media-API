# Social-Media-API

A simple REST API for a simplified social media platform capable of CRUD operations on posts and comments on posts resources.

## Features

* Uses javascript
* Basic mysql/sequlize model setup

_ _ _ _

## Quick Start

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

* Set environment variables in a .env file

## Run It

```shell
node app.js
```

## Try It

* Set up your database connection
* Test endpoints with Postman

* To create a new user (POST request)

```shell
http://localhost:4005/api/auth/signup
```

CREATE User Endpoint [http://localhost:4005/api/auth/signup](http://localhost:4005/api/auth/signup)  

Create new User (User Signup)  

    Request:  
        HTTP Method: POST  
        Endpoint: /api/auth/signup
        Request Body:
            { 
                "first_name": "Jane",
                "last_name": "Doe",
                "username" : "janey",
                "email": "janedoe@gmail.com",
                "phone_number": "0801234567",
                "password": "123456",
                "date_of_birth" : "10/10/2000",
                "gender" : "female
               
            }
        Response: HTTP Status Code: 201 Created
        Response Body:
             { 
            "id": 1,
             "first_name": "Jane",
            "last_name": "Doe",
            "username" : "janey",
            "email": "janedoe@gmail.com",
            "phone_number": "0801234567",
            "password": "123456",
            "date_of_birth" : "10/10/2000",
            "gender": "female
         }

* To fetch a person's details (GET request)

```shell
http://localhost:4001/api/user_id
```

* To modify an existing person's details (PATCH request)

```shell
http://localhost:4001/api/user_id
```

* To remove person (DELETE request)

```shell
http://localhost:4001/api/user_id
```
