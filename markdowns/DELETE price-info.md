# User Resources

    DELETE price-information

## Description
Delete information of a specific price from a specific table in the database

***

## Requires authentication
This endpoint requires the user to have submitted their email and password.  In order to Delete to the database, the user must have an email issued by ShapeShift.io ending in `@shapeshift.io`.  This will create a JSON Web Token with administrative access that will be used to authenticate the user.

***

## Parameters
This endpoint will accept a Jason Web Token query parameter in the url

    /api/v1/:exchange_book/:id?token=(jwt goes here)
    
**exchange_book** - This endpoint must contain the name of an associated exchanges order book in the database

**id** - This endpoint must contain an id that associates it with a specific price in the table

***

## Return format

Will return a status code of 204
***

## Errors
This endpoint will throw a 404  and 500 error

```
{ 
	error: 'Error message will be here'
}
```

***

## Example

    /api/v1/bittrex_book/173

**Return**

`204 No Content`
