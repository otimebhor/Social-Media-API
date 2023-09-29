1. CREATE User Endpoint [http://localhost:4005/api/auth/signup](http://localhost:4005/api/auth/signup)  

Create new User (User Signup)  

    Request:  
        HTTP Method: POST  
        Endpoint: /api/auth/signup
        Request Body:
            { 
                "name": "Jane Doe", 
                "date_of_birth": "10/10/2000",
                "gender": "Female", 
                "nationality": "Nigerian",
                "address": "Sunshine road", 
                "phone_number": "0801234567", 
                "email": "janedoe@gmail.com"
            }
        Response: HTTP Status Code: 201 Created
        Response Body:
             { 
            "id": 1,
            "name": "Jane Doe", 
            "date_of_birth": "10/10/2000",
            "gender": "Female", 
            "nationality": "Nigerian",
            "address": "Sunshine road", 
            "phone_number": "0801234567", 
            "email": "janedoe@gmail.com"
         }