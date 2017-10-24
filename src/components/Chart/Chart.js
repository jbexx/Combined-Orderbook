import React, { Component } from 'react';
import './Chart.css';
import { Line } from 'react-chartjs-2';

class Chart extends Component {
  constructor(){
    super()
    this.state = {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Poloniex',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [20, 40, 80, 81, 56, 55, 40]
          }
        ]
      }
    }
  }

  render() {
    
    const scales = {scales: {
      yAxes: [{
          stacked: true
      }]
  }}
    return (
      <div className='chart-container'>
        <div className='chart'>
          <Line data={ this.state.chartData } />
        </div>
      </div>
    );
      // <div className='chart-container'>
      //   <svg className='chart-axis'>
      //     <g className='axis x-axis-left'>
      //       <line x1='90' x2='90' y1='5' y2='370'></line>
      //     </g>
      //     <g className='axis x-axis-right'>
      //       <line x1='1000' x2='1000' y1='5' y2='370'></line>
      //     </g>
      //     <g className='axis y-axis'>
      //       <line x1='90' x2='1000' y1='370' y2='370'></line>
      //     </g>
      //     <g className="labels x-labels">
      //       <text x="100" y="400">5,700</text>
      //       <text x="246" y="400">5,800</text>
      //       <text x="392" y="400">5,900</text>
      //       <text x="538" y="400">6,000</text>
      //       <text x="684" y="400">6,100</text>
      //       <text x="400" y="440" className="label-title">Price</text>
      //     </g>
      //     <g className="labels y-labels">
      //       <text x="80" y="15">15</text>
      //       <text x="80" y="131">10</text>
      //       <text x="80" y="248">5</text>
      //       <text x="80" y="373">0</text>
      //       <text x="50" y="200" className="label-title">Volume</text>
      //     </g>

      //     <svg viewBox='-90 -190 1000 370' className='chart'>
      //       <polyline
      //         fill='pink'
      //         stroke='red'
      //         strokeWidth='2'
      //         points='
      //         00, 120
      //         20, 60
      //         40, 80
      //         60, 20
      //         80, 80
      //         100, 80
      //         120, 60
      //         140, 100
      //         160, 90
      //         180, 80
      //         200, 110
      //         220, 10
      //         240, 70
      //         260, 100
      //         280, 100
      //         300, 40
      //         320, 0
      //         340, 100
      //         360, 100
      //         380, 120
      //         400, 60
      //         420, 70
      //         440, 80'/>
      //     </svg>
      //   </svg>
      // </div>
  }
}

export default Chart;