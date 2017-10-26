# User Resources

    PATCH price-information

## Description
Update a specific exchanges table with current information about a specific price

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

## Required format
Object

  -- should contain one or any combination of the following keys:

- **id**  - Unique id
- **bid_volume** - The volume of bids at the bid price
- **bid** - The bid price
- **ask** - The ask price
- **ask_volume** - The volume of asks at the ask price

  
-- example

```
{
	id: 1
	bid_volume: "15.8702672"
	bid: "0.05312345"
	ask: "0.05316942"
	ask_volume: "1.81754771"
}
```

## Return format

Will return a status code of 201, along with a JSON array of objects with key-value pairs

- **id**  - Unique id
- **bid_volume** - The volume of bids at the bid price
- **bid** - The bid price
- **ask** - The ask price
- **ask_volume** - The volume of asks at the ask price
- 
***

## Errors
This endpoint will throw a 422  and 500 error

```
{ 
	error: 'Error message will be here'
}
```

***

## Example

    /api/v1/bittrex_book/12

**Return**

``` 
[
    {
		id: 1
		bid_volume: "15.8702672"
		bid: "0.05312345"
		ask: "0.05316942"
		ask_volume: "1.81754771"
	}
]
```