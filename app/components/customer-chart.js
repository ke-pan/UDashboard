import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  seriesData: computed('month', 'customers', function() {
    const customers = this.get('customers').toArray();
    let labels = [];
    let series = [];
    for(var i=0; i<12; i++) {
      let month = moment(this.get('month'), 'YYYY-MM').subtract(i, "month").format("YYYY-MM");
      console.log(customers.filterBy('createdMonth', month));
      const customerInMonth = customers.filterBy('createdMonth', month).length;
      labels.push(month);
      series.push(customerInMonth);
    }

    return { labels: labels.reverse(), series: series.reverse() };
  }),
  chartOptions: computed('seriesData', function() {
    return {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Customers'
      },
      xAxis: {
        categories: this.get('seriesData.labels')
      },
      yAxis: {
        minTickInterval: 1,
        title: {
          text: 'Number of reported paying customers'
        }
      }
    };
  }),
  chartData: computed('seriesData', function() {
    return [
      {
        name: 'paying customers',
        data: this.get('seriesData.series')
      }
    ];
  })
});
