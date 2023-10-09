# Social-Media-API

A simple REST API for a simplified social media platform capable of CRUD operations on posts and comments on posts resources.

## Features

* Uses javascript
* Basic mysql/sequlize model setup
* Joi package was used for validation



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
nodemon server.js
```

## To test

```shell
npm test
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

* To login a user (POST request)

```shell
http://localhost:4005/api/auth/login
```

User Login Endpoint [http://localhost:4005/api/auth/login](http://localhost:4005/api/auth/login)  

 User Login
    Request:  
        HTTP Method: POST  
        Endpoint: /api/auth/login
        Request Body:
            { 
                "email": "janedoe@gmail.com",
                "password": "123456",
            }
        Response: HTTP Status Code: 200 OK
        Response Body:
             { 
            "id": 1,
            "first_name": "Jane",
            "last_name": "Doe",
            "username" : "janey",
            "email": "janedoe@gmail.com",
            "phone_number": "0801234567",
            "password": Hashed Password,
            "date_of_birth" : "10/10/2000",
            "gender": "female
         }

* To create a new post (POST request)

```shell
http://localhost:4005/api/posts/create-post
```
Post Creation Endpoint [http://localhost:4005/api/posts/create-post](http://localhost:4005/api/posts/create-post)  

Create Post
    Request:  
        HTTP Method: POST  
        Endpoint: /api/posts/create-post
        Request Body:
            { 
                "title": "Post Title",
                "content": "Post Content"
            }
        Response: HTTP Status Code: 201 Created
        Response Body:
            { 
                "title": "Post Title",
                "content": "Post Content"
            }


* To read all posts (GET request)

```shell
http://localhost:4005/api/posts/
```

Read all Posts Endpoint [http://localhost:4005/api/posts/](http://localhost:4005/api/posts/)  

Read all Posts
    Request:  
        HTTP Method: GET  
        Endpoint: /api/posts/
        Request Body:
            { }
        Response: HTTP Status Code: 200 OK
        Response Body:
            {
                {
                "id": 1
                "title": "Post Title",
                "content": "Post Content",
                "user_id": 2
                }, 
                {
                "id": 2
                "title": "Post Title",
                "content": "Post Content",
                "user_id": 1
                }
            }

* To read a single post (GET request)

```shell
http://localhost:4005/api/posts/{post_id}
```

Read single Post Endpoint [http://localhost:4005/api/posts/{post_id}](http://localhost:4005/api/posts/{post_id})  

Read Single Post
    Request:  
        HTTP Method: GET  
        Endpoint: /api/posts/1
        Request Body:
            { }
        Response: HTTP Status Code: 200 OK
        Response Body:
            {
               "id": 1
                "title": "Post Title",
                "content": "Post Content",
                "user_id": 2
}

* To edit a single post (PATCH request)

```shell
http://localhost:4005/api/posts/edit-post/{post_id}
```

Edit Post Endpoint [http://localhost:4005/api/posts/edit-post/{post_id}](http://localhost:4005/api/posts/edit-post/{post_id})  

Edit Single Post
    Request:  
        HTTP Method: PATCH 
        Endpoint: /api/posts/edit-post/1
        Request Body:
            {
                "title": "Updated title",
                "content": "Updated content!"
            }
        Response: HTTP Status Code: 200 OK
        Response Body:
            {
               "id": 1
                "title": "Updated title",
                "content": "Updated title",
                "user_id": 2
                }

* To delete a single post (DELETE request)

```shell
http://localhost:4005/api/posts/{post_id}
```
Delete Post Endpoint [http://localhost:4005/api/posts/{post_id}](http://localhost:4005/api/posts/{post_id})  

Delete Single Post
    Request:  
        HTTP Method: DELETE
        Endpoint: /api/posts/1
        Request Body:
            { }
        Response: HTTP Status Code: 200 OK
        Response Body:
            {
                "message" : "Post deleted successfully."
            }


* To create a comment (POST request)

```shell
http://localhost:4005/api/comments/{post_id}
```

Create Endpoint [http://localhost:4005/api/comments/{post_id}](http://localhost:4005/api/comments/{post_id})  

Create new comment 
    Request:  
        HTTP Method: POST
        Endpoint: /api/comments/1
        Request Body:
            { 
                 "content" : "This is a new comment."
            }
        Response: HTTP Status Code: 201 Created
        Response Body:
            {
                "id": 3,
                "content": "This is a new comment.",
                "post_id": "1",
                "user_id": 2,
            }

* To get all comments on a post (GET request)

```shell
http://localhost:4005/api/comments/{post_id}
```

Get All Comment Endpoint [http://localhost:4005/api/comments/{post_id}](http://localhost:4005/api/comments/{post_id})  

Get all comments 
    Request:  
        HTTP Method: GET
        Endpoint: /api/comments/1
        Request Body:
            { }
        Response: HTTP Status Code: 200 OK
        Response Body:
            {
                [
    {
        "id": 1,
        "content": "What an article.",
        "user_id": 1,
        "post_id": 1,
        "post": {
            "id": 1,
            "title": "Learn how to code.",
            "content": "Become a pro in the tech world. Enroll in our tech school now",
            "user_id": 2
        }
    },
    {
        "id": 2,
        "content": "Nice one! The article was really insightful.",
        "user_id": 1,
        "post_id": 1,,
        "post": {
            "id": 1,
            "title": "Learn how to code",
            "content": "Become a pro in the tech world. Enroll in our tech school now",
            "user_id": 2
        }
    },
    {
        "id": 3,
        "content": "Thank you for this.",
        "user_id": 2,
        "post_id": 1,
        "post": {
            "id": 1,
            "title": "Learn how to code",
            "content": "Become a pro in the tech world. Enroll in our tech school now",
            "user_id": 2
        }
    }
]
            }

* To edit comments  (PATCH request)

```shell
http://localhost:4005/api/comments/edit-comment/{post_id}/{comment_id}
```

Edit Comment Endpoint [http://localhost:4005/api/comments/edit-comment/{post_id}/{comment_id}](http://localhost:4005/api/comments/edit-comment/{post_id}/{comment_id})  

Edit a comment
    Request:  
        HTTP Method: PATCH
        Endpoint: /api/comments/edit-comment/1/3
        Request Body:
            {
                "content": "Wow. I will like to know more."
            }
        Response: HTTP Status Code: 200 OK
        Response Body:
            {
        "id": 3,
        "content": "Wow. I will like to know more.",
        "user_id": 2,
        "post_id": 1,
        "post": {
            "id": 1,
            "title": "Learn how to program",
            "content": "Become a pro in the tech world. Enroll in our tech school now",
            "user_id": 2
        }
    }

* To delete a comment (DELETE request)

```shell
http://localhost:4005/api/delete-comment/{post_id}/{comment_id}
```

Delete Comment Endpoint [http://localhost:4005/api/delete-comment/{post_id}/{comment_id}](http://localhost:4005/api/delete-comment/{post_id}/{comment_id})  

Delete Single Comment
    Request:  
        HTTP Method: DELETE
        Endpoint: /api/posts/1/3
        Request Body:
            { }
        Response: HTTP Status Code: 200 OK
        Response Body:
            {
                "message" : "Comment deleted successfully."
            }
