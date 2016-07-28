import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  chartOptions: computed('customers', function() {
    return {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Customers'
      },
      xAxis: {
        categories: this.get('customers').map(customer => customer.month)
      },
      yAxis: {
        minTickInterval: 1,
        title: {
          text: 'Number of reported paying customers'
        }
      }
    };
  }),
  chartData: computed('customers', function() {
    return [
      {
        name: 'paying customers',
        data: this.get('customers').map(customer => parseInt(customer.customerCount))
      }
    ];
  })
});
