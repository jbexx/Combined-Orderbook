import React, { Component } from 'react';
import './Chart.css';
import { Line } from 'react-chartjs-2';
import { object } from 'prop-types';
// const autobahn = require('autobahn');
// const wsuri = "wss://api.poloniex.com";

class Chart extends Component {

  cleanBidData(bidData) {
    return bidData.map( element => element.bid);
  }

  cleanBidVolData(volData) {
    return volData.map( element => element.bid_volume); 
  }

  cleanAskData(bidData) {
    return bidData.map( element => element.ask);
  }

  cleanAskVolData(volData) {
    return volData.map( element => element.ask_volume); 
  }

  addVolData(book1, book2, auctionType) {
    const addedVolArray = [];
    if (auctionType === 'bid') {
      const book1Vol = book1.map( element => element.bid_volume);
      const book2Vol = book2.map( element => element.bid_volume);
  
      for (let i = 0; i < book1Vol.length; i++) {
        addedVolArray.push(parseFloat(book1Vol[i]) + parseFloat(book2Vol[i]))
      }
    } else {
      const book1Vol = book1.map( element => element.ask_volume);
      const book2Vol = book2.map( element => element.ask_volume);
  
      for (let i = 0; i < book1Vol.length; i++) {
        addedVolArray.push(parseFloat(book1Vol[i]) + parseFloat(book2Vol[i]))
      }
    }
    return addedVolArray;
  }

  render() {
    const { orderbooks } = this.props;
    const labels = Object.keys(orderbooks);
    let bidChartData;
    let askChartData;
    let combinedBidVolData;
    let combinedAskVolData;

    if (orderbooks.poloniex_book) {
    
      bidChartData = {
        chartData: {
          labels: this.cleanBidData(orderbooks.bittrex_book),
          datasets: [
            {
              label: labels[0].split('_').join(' '),
              fill: true,
              lineTension: 0.1,
              backgroundColor: 'rgba(34, 193, 221,0.4)',
              borderColor: 'rgba(34, 193, 221,1)',
              borderCapStyle: 'butt',
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(34, 193, 221,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(34, 193, 221,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.cleanBidVolData(orderbooks.poloniex_book) 
            },
            {
              label: labels[1].split('_').join(' '),
              fill: true,
              lineTension: 0.1,
              backgroundColor: 'rgba(139, 53, 196,0.4)',
              borderColor: 'rgba(139, 53, 196,1)',
              borderCapStyle: 'butt',
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(139, 53, 196,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(139, 53, 196,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.cleanBidVolData(orderbooks.bittrex_book)
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              scaleLabel: {
                labelString: 'Volume'
              }
            }],
            xAxes: [{
              scaleLabel: {
                labelString: 'Price'
              }
            }]
          }
        }
      }

      askChartData = {
        chartData: {
          labels: this.cleanAskData(orderbooks.bittrex_book),
          datasets: [
            {
              label: labels[0].split('_').join(' '),
              fill: true,
              lineTension: 0.1,
              backgroundColor: 'rgba(34, 193, 221,0.4)',
              borderColor: 'rgba(34, 193, 221,1)',
              borderCapStyle: 'butt',
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(34, 193, 221,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(34, 193, 221,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.cleanAskVolData(orderbooks.poloniex_book) 
            },
            {
              label: labels[1].split('_').join(' '),
              fill: true,
              lineTension: 0.1,
              backgroundColor: 'rgba(139, 53, 196,0.4)',
              borderColor: 'rgba(139, 53, 196,1)',
              borderCapStyle: 'butt',
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(139, 53, 196,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(139, 53, 196,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.cleanAskVolData(orderbooks.bittrex_book)
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Volume'
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Price'
              }
            }]
          }
        }
      }

      combinedBidVolData = {
        chartData: {
          labels: this.cleanBidData(orderbooks.bittrex_book),
          datasets: [
            {
              label: 'Combined Bid Volume Of ' + labels[0].split('_').join(' ') + ' And ' + labels[1].split('_').join(' '),
              fill: true,
              lineTension: 0.1,
              backgroundColor: 'rgba(51, 207, 147, 0.4)',
              borderColor: 'rgba(51, 207, 147, 1)',
              borderCapStyle: 'butt',
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(51, 207, 147, 1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(51, 207, 147, 1)',
              pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.addVolData(orderbooks.poloniex_book, orderbooks.bittrex_book, 'bid')
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Volume'
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Price'
              }
            }]
          }
        }
      }

      combinedAskVolData = {
        chartData: {
          labels: this.cleanAskData(orderbooks.bittrex_book),
          datasets: [
            {
              label: 'Combined Ask Volume Of ' + labels[0].split('_').join(' ') + ' And ' + labels[1].split('_').join(' '),
              fill: true,
              lineTension: 0.1,
              backgroundColor: 'rgba(51, 207, 147, 0.4)',
              borderColor: 'rgba(51, 207, 147, 1)',
              borderCapStyle: 'butt',
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(51, 207, 147, 1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(51, 207, 147, 1)',
              pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.addVolData(orderbooks.poloniex_book, orderbooks.bittrex_book, 'ask')
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Volume'
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Price'
              }
            }]
          }
        }
      }
    }

    // instead of using this websocket, look into using a cron job.
      // A cron job is a script that will run on set schedule to hit the api's I choose
      // and could run the seed again to update my database for a bit more accurate information


    // const connection = new autobahn.Connection({
    //   url: wsuri,
    //   realm: "realm1"
    // });
    
    // connection.onopen = session => {
    //   const marketEvent = (args, kwargs) => {
    //     console.log('args: ', args);
    //     args.forEach( arg => {
    //       if (arg.type !== 'newTrade') {
    //         if (arg.data.type === 'bid') {
                // this.state.chartData.datasets[0].data.push(arg.data.amount)
                // this.setState({
                //   chartData: this.state.chartData
                // })
    //         }
    //       }
    //     });
    //   }
    //   session.subscribe('BTC_ETH', marketEvent);
    // }
    
    // connection.onclose = () => {
    //   console.log("Websocket connection closed");
    // }
    
    // connection.open();
    
    return (
      <div className='chart-container'>
        <div className='chart'>
          <div className='chart-title'>Bids</div>
          <div className='combined-charts'>
            <h5 className='x-label'>Volume</h5>
            { orderbooks.poloniex_book ? <Line data={ bidChartData.chartData } /> : null }
            <h5 className='x-label'>Volume</h5>
            { orderbooks.poloniex_book ? <Line data={ combinedBidVolData.chartData } /> : null }
          </div>
          <hr className='line-break'/>
          <div className='chart-title'>Asks</div>          
          <div className='combined-charts'>
            <h5 className='x-label'>Volume</h5>            
            { orderbooks.poloniex_book ? <Line data={ askChartData.chartData } /> : null }
            <h5 className='x-label'>Volume</h5>            
            { orderbooks.poloniex_book ? <Line data={ combinedAskVolData.chartData } /> : null }
          </div>
          <hr className='line-break bottom-line'/>          
        </div>
      </div>
    );
  }
}

export default Chart;

Chart.propTypes = {
  orderbooks: object
};