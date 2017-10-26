# User Resources

    GET all-books

## Description
Returns all exchange orderbooks from their tables in the database.

***

## Return format

A JSON object of key value pairs where the keys are the name of the exchange with their values as the orderbook in an array with objects for each price point.

- **id**  - Unique id
- **bid_volume** - The volume of bids at the bid price
- **bid** - The bid price
- **ask** - The ask price
- **ask_volume** - The volume of asks at the ask price

***

## Errors
This endpoint will throw a 200 and a 500 error

```
{
    error: 'Error message will be here.'
}
```

***

## Example

    /api/v1/all-books

**Return** (This is a shortened example)

```
{
	bittrex_book: [
		{
			id: 1
			bid_volume: "15.8702672"
			bid: "0.05312345"
			ask: "0.05316942"
			ask_volume: "1.81754771"
		}
	],
	poloniex_book: [
		{
			id: 1
			bid_volume: "1.4562622"
			bid: "0.05322385"
			ask: "0.05326922"
			ask_volume: "0.25754741"
		}
	]
}
```