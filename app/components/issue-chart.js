import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  padWithZero(value) {
    if (String(value).length === 1) {
      return `0${value}`;
    } else {
      return value;
    }
  },
  seriesData: computed('period', 'issues', function() {
    const issues = this.get('issues').toArray();
    const dateData = this.get('period').split('-');
    const year = dateData[0];
    const month = dateData[1];
    const daysInMonth = new Date(year, month, 0).getDate();
    let labels = [];
    let series = [];
    for (var day=1; day<=daysInMonth; day++) {
      const dateString = `${year}-${month}-${this.padWithZero(day)}`;
      const issuesInDate = issues.filterBy('createdDate', dateString).length;
      series.push(issuesInDate);
      labels.push(day);
    }
    return {labels, series};
  }),
  chartOptions: computed('seriesData', function() {
    return {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Issues'
      },
      xAxis: {
        categories: this.get('seriesData.labels')
      },
      yAxis: {
        title: {
          text: 'Number of reported issues'
        }
      }
    }
  }),
  chartData: [
    {
      name: 'reported issues',
      data: [7, 6, 9, 14, 18, 21, 25, 26, 23, 18, 13, 9]
    }
  ]
});