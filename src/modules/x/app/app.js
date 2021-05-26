import { LightningElement } from 'lwc';

export default class App extends LightningElement {
  renderedCallback() {
    const container = this.template.querySelector('.container')
    const chart = Highcharts.chart(container, {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Fruit Consumption'
      },
      xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges']
      },
      yAxis: {
        title: {
          text: 'Fruit eaten'
        }
      },
      series: [{
        name: 'Jane',
        data: [1, 0, 4]
      }, {
        name: 'John',
        data: [5, 7, 3]
      }],
      tooltip: {
        useHTML: true,
        animation: false,
        formatter: function () {
          return '<div>foo</div>';
        }
      }
    });
  }
}
