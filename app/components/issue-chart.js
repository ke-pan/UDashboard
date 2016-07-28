import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  chartOptions: computed('issues', function() {
    return {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Issues'
      },
      xAxis: {
        categories: this.get('issues').map(issue => issue.month)
      },
      yAxis: {
        min: 1,
        minTickInterval: 1,
        title: {
          text: 'Number of reported issues'
        }
      }
    };
  }),
  chartData: computed('issues', function() {
    console.log(this.get('issues'));
    return [
      {
        name: 'reported issues',
        data: this.get('issues').map(issue => parseInt(issue.issueCount))
      }
    ];
  })
});
