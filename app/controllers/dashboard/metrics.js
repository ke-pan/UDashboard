import Ember from 'ember';
import moment from 'moment';

const { get, computed } = Ember;

export default Ember.Controller.extend({
  queryParams: ['period'],
  issues: Ember.computed.alias('model.issues'),
  customers: Ember.computed.alias('model.customers'),
  period: moment().format('YYYY-MM'),
  currentMonth: moment().format('YYYY-MM'),
  openingIssues: computed.filter('issues', function(issue) {
    return get(issue, 'status') === 'opening';
  }),
  actions: {
    goPeriodBack() {
      const previousPeriod = moment(this.get('period'), 'YYYY-MM').subtract(1, "month").format("YYYY-MM");
      this.set('period', previousPeriod);
    },
    goPeriodNext() {
      const nextPeriod = moment(this.get('period'), 'YYYY-MM').add(1, "month").format("YYYY-MM");
      this.set('period', nextPeriod);
    }
  }
});
