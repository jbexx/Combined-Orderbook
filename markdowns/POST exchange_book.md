# User Resources

    POST price-information

## Description
Create a row in the table with new price information

***

## Requires authentication
This endpoint requires the user to have submitted their email and password.  In order to Delete to the database, the user must have an email issued by ShapeShift.io ending in `@shapeshift.io`.  This will create a JSON Web Token with administrative access that will be used to authenticate the user.

***

## Parameters
This endpoint will accept a Jason Web Token query parameter in the url

    /api/v1/ships?token=(jwt goes here)
    
**exchange_book** - This endpoint must contain the name of an associated exchanges order book in the database

## Return format

Will return a status code of 201, along with a JSON array of objects with key-value pairs

- **id**  - Unique id
- **bid_volume** - The volume of bids at the bid price
- **bid** - The bid price
- **ask** - The ask price
- **ask_volume** - The volume of asks at the ask price
***

## Errors
This endpoint will throw a 422 and a 500 error

```
{ 
    error: 'Error message will be here.'
}
```

***

## Example

    POST /api/v1/bittrex_book

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