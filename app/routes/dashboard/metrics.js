import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    period: {
      refreshModel: true
    }
  },
  model(params) {
    return Ember.RSVP.hash({
      issues: this.store.query('issue', { period: params.period }),
      customers: this.store.findAll('customer')
    });
  }
});
