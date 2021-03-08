## REST API

## Requirements

    Node JS
    
    npm

    MongoDB

## Installation

Create .env file in user_blog package and set this properties

    PORT=<your port>

    DB_URI=<your db url>

    SECRET=<your secret key for jwt auth>


run ```npm init```

## Run

```npm start```

## Register new user

register new user.

### URL

    /api/v1/auth/register

### Method:

    POST

### URL Params

Required:

    None

Data Params

```JavaScript
{
    "name":"John",
    "surname":"Smith",
    "email":"jo@gmail.com",
    "password":"12345"    
}    
```

Success Response:

    Code: 201

Error response:

    Code: 409
    Code: 500

Content:

```JavaScript
{
   "id":"wd4w84d849w7884wd4"
}
```

### Error Response:

```JavaScript
{
"message": "error message"
}
```

*****************************************************

## Login

User login.

### URL

    /api/v1/auth/login

### Method:

    POST

### URL Params

Required:

    None

Data Params

```JavaScript
{
"email": "jo@gmail.com",
"password":"12345"        
}
```

Success Response:

    Code: 200

Content:

```JavaScript 
{
"token":"jwt token"       
}
```

### Error Response:

    Code: 401
    Code: 404

*****************************************************

## Create new post

User must be authenticated
Create and save new post entity

### URL

    /api/v1/users/posts

### Method:

    POST

### URL Params

Required:

    None

Request body:

```JavaScript
{
    title : "MyProject",
    text : "text", 
    images:[{id:"wefwfo78997wf7wf4", name:"image.png",content:"data:image/png;base64,..."}]
}
```

### Success Response:

    Code: 200

### Error Response:

    Code: 422 

*****************************************************

## Update post

User must be authenticated
Update existing post entity

### URL

    /api/v1/users/posts/:id

### Method:

    PUT

### URL Params

Required:

    id=[string]

Request body:
```JavaScript
{
    title : "new MyProject",
        text : "new text",
        images:[{id:"wefwfo78997wf7wf4", name:"new image.png",content:"data:image/png;base64,..."}]
}
```
```JavaScript
{
title : "MyProject", text: "text",
deletableImageId : "wwf4w987f4894wf4"               
}
```
### Success Response:

    Code: 200 

### Error Response:

    Code: 422 

    Code: 404 

*****************************************************

## Delete post

User must be authenticated
Delete existing post entity

### URL

    /api/v1/users/posts/:id

### Method:

    DELETE

### URL Params

Required:

    id=[string]

Request body:

    None

### Success Response:

    Code: 200 

### Error Response:

    Code: 404 
*****************************************************

## Delete user

User must be authenticated
Delete existing user entity

### URL

    /api/v1/users

### Method:

    DELETE

### URL Params

Required:

    None

Request body:

    None

### Success Response:

    Code: 200 

### Error Response:

    Code: 404 
*****************************************************

## Update user

User must be authenticated
Update existing user entity

### URL

    /api/v1/users

### Method:

    PUT

### URL Params

Required:

    None

Request body:

```JavaScript
{
    name : "name", 
    surname: "surname",
    password : "14524"               
}
```

### Success Response:

    Code: 200 

### Error Response:

    Code: 404 

*****************************************************

## Get users posts

User must be authenticated
Get user posts

### URL

    /api/v1/users/:uid/posts

### Method:

    GET

### URL Params

Required:

    uid=[string]

Request body:

    None

### Success Response:

    Code: 200 

*****************************************************

## Get user single post

User must be authenticated
Get user single post

### URL

    /api/v1/users/:uid/posts/:id

### Method:

    GET

### URL Params

Required:

    uid=[string]
    id=[string]

Request body:

    None

### Success Response:

    Code: 200 

*****************************************************

## Get user single post

User must be authenticated
Get user single post

### URL

    /api/v1/users/posts/:id

### Method:

    GET

### URL Params

Required:

    id=[string]

Request body:

    None

### Success Response:

    Code: 200 

Response body:
```JavaScript
{
    title : "MyProject",
    text : "text",
    images:[{id:"wefwfo78997wf7wf4", name:"new image.png",content:"data:image/png;base64,..."}]
}
```
*****************************************************

## Get user

Get user single user

### URL

    /api/v1/users/:id

### Method:

    GET

### URL Params

Required:

    id=[string]

Request body:

    None

### Success Response:

    Code: 200 

### Error Response:

    Code: 404 

Response body:
```JavaScript
{   
    name : "name", 
    surname: "surname",
    email:"jo@gmail.com"
    password : "hashed pass",               
}
```

************************************************************

## Get posts

Get all posts

### URL

    /api/v1/posts

### Method:

    GET

### URL Params

Required:

    None

Request body:

    None

### Success Response:

    Code: 200 

### Error Response:

    Code: 404 

Response body:
```JavaScript
{
    [
        title : "new MyProject",
        text : "new text",
        images:[{id:"wefwfo78997wf7wf4", name:"new image.png",content:"data:image/png;base64,..."}]
    ]
}
```

************************************************************

## Get post

Get single post

### URL

    /api/v1/posts/:id

### Method:

    GET

### URL Params

Required:

    id=[string]

Request body:

    None

### Success Response:

    Code: 200 

### Error Response:

    Code: 404 

Response body:
```JavaScript
{
    title : "new MyProject",
    text : "new text",
    images:[{id:"wefwfo78997wf7wf4", name:"new image.png",content:"data:image/png;base64,..."}]
}
```
************************************************************

## Search posts

Search posts

###URL

    /api/v1/posts/search/:token

### Method:

    GET

### URL Params

Required:

    token=[string]

Request body:

    None

### Success Response:

    Code: 200 

### Error Response:

    None

Response body:
```JavaScript
{
    [
        title : "new MyProject",
        text : "new text",
        images:[{id:"wefwfo78997wf7wf4", name:"new image.png",content:"data:image/png;base64,..."}]
    ]
}
```
************************************************************

## Search user

User must be authenticated
Search other users

###URL

    /api/v1/users/search/:token

### Method:

    GET

### URL Params

Required:

    token=[string]

Request body:

    None

### Success Response:

    Code: 200 

### Error Response:

    None

Response body:
```JavaScript
[
    {
        "name": "Arshak",
        "surname": "Papoyan",
        "email": "pap@gmail.com",
        "posts": []
    }
]
```
