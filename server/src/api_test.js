###

GET http://localhost:3000/health

###

GET http://localhost:3000/api/users

###

GET http://localhost:3000/api/seed/users

###

DELETE http://localhost:3000/api/users/69429e0d8af2fd732f579400

###


POST http://localhost:3000/api/users/register HTTP/1.1
Content - Type: application / json

{
    "last_name": "Doe",
        "email": "jhondoe@test.com",
            "password": "Hello123"
}