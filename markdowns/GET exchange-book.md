# User Resources

    GET price-information

## Description
Returns a specific exchanges orderbook from the appropriate tables in the database.

***

## Parameters


**exchange_book** - The exchange_book parameter will select the specific exchange from the database where the name matches the given parameter

    /api/v1/book/:exchange_book

***

## Return format

A JSON array of objects with key-value pairs

- **id**  - Unique id
- **bid_volume** - The volume of bids at the bid price
- **bid** - The bid price
- **ask** - The ask price
- **ask_volume** - The volume of asks at the ask price

***

## Errors
This endpoint will throw a 404 and a 500 error

```
{
    error: 'Error message will be here.'
}
```

***

## Example

    /api/v1/book/bittrex_book

**Return** (This is a shortened example)

```
{
	id: 1
	bid_volume: "15.8702672"
	bid: "0.05312345"
	ask: "0.05316942"
	ask_volume: "1.81754771"
},
{
	id: 2
	bid_volume: "1.4562622"
	bid: "0.05322385"
	ask: "0.05326922"
	ask_volume: "0.25754741"
}
```