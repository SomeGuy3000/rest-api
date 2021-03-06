# rest-api app

## Main api file:

	app.js


## Setup database config in file:

	config.json

## Example setup:
```json
{
    "host": 	"localhost",
    "user": 	"root",
    "password": "root-passwd",
    "database": "dbname"
}
```

host 	 - 	hostname
user 	 - 	database username
password - 	database password
database - 	database name




## To run app.js type in cmd:
*************************************************************
	node app
*************************************************************
Express listen on port "3000"

## Allowed queries


| Function 		| Request method 	| Request URL 		|
| ------------- 	| ------------- 	| ------------- 	|
| Get title by id  	| GET 	 		| /api/titles/:id  	|
| Get all titles  	| GET  			| /api/titles  		|
| Add new title  	| POST 	 		| /api/titles  		|
| Edit title by id  	| PUT  			| /api/titles/:id  	|
| Delete user by id  	| DELETE 		| /api/titles/:id  	|


In request URL " :id " mean title id from database



## Sample query:
	using POST method on URL:

		"http://localhost:3000/api/titles/"
	
	with JSON data:
		```json
		{
        		"title": "Some title",
       		 	"lead": "some lead",
        		"content": "Some content"
		}
		```

	Create new row!
	
	
## How to send request?

	You may send request using postman! Try it!
