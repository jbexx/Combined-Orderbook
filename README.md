## Combined Orderbooks

[Visit The Live Site Here](https://combined-orderbooks.herokuapp.com/)

#### About The Application

This application shows the orderbooks from the Bittrex and Poloniex Exchanges and compares their volumes at a specific price point.  For this application I built a backend API I've called the CombAPI (Combined Orderbook API).  It was built with data consumed from both exchange's APIs and put in seperate tables in the same database.  For live data I brought in Poloniex's Websocket to stream data on the front-end.  Implementing this feature would have been very interesting to use for updating the charts with live data, but would make hitting the CombAPI obsolete, so I left this bit of code commented out in the App.js React Component. 

#### About The API

The CombAPI provides data on cryptocurrency exchange orderbook data.

The CombAPI is a [RESTful api](http://en.wikipedia.org/wiki/Representational_State_Transfer "RESTful") and uses JSON Web Tokens ([JWTs](https://jwt.io/introduction/)) for authentication purposes.  

The return format for all endpoints is [JSON](http://json.org/ "JSON").

#### 

***

## Endpoints

- [**GET exchange_book**](https://github.com/jbexx/Combined-Orderbook/blob/master/markdowns/GET%20exchange-book.md)
- [**GET all-books**](https://github.com/jbexx/Combined-Orderbook/blob/master/markdowns/GET%20all-books.md)
- [**POST authenticate**](https://github.com/jbexx/Combined-Orderbook/blob/master/markdowns/POST%20authenticate.md)
- [**DELETE price-info**](https://github.com/jbexx/Combined-Orderbook/blob/master/markdowns/DELETE%20price-info.md)
- [**POST exchange_book**](https://github.com/jbexx/Combined-Orderbook/blob/master/markdowns/POST%20exchange_book.md)
- [**PATCH price-info**](https://github.com/jbexx/Combined-Orderbook/blob/master/markdowns/PATCH%20exchange_book.md)


### Screenshots

<img width="1280" alt="screen shot 2017-10-26 at 17 50 29" src="https://user-images.githubusercontent.com/23174736/32082053-3c95b0ae-ba76-11e7-82ce-5e0a53555a9e.png">

<img width="1279" alt="screen shot 2017-10-26 at 17 51 21" src="https://user-images.githubusercontent.com/23174736/32082062-4fe3527e-ba76-11e7-8237-5ed809ac08be.png">
