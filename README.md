# authapi-experiment
An experiment of an authentication API RESTful

## Running DB

Install MongoDB and run ```mongod```

## Instaling and run the project

```npm install```

```npm start```

## Using API

### Create user

POST ```localhost:3000/api/user/create```

BODY (JSON)

```
{
	"nome": String,
	"email": String,
	"senha": String,
	"telefones": [{
		"numero": Number,
		"ddd": Number
	}]
}
```

### Login user

POST ```localhost:3000/api/user/login```

BODY (JSON)

```
{
	"email": String,
	"senha": String
}
```

### Get user (just use it after login)

GET ```localhost:3000/api/user```

HEADER

```
{
  "key":"Authorization",
   "value":"Bearer [User Key Generated at Login]"
}
```
