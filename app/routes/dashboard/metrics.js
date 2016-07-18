import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    period: {
      refreshModel: true
    }
  },
  model(params) {
    return this.store.query('issue', { filter: { period: params.period } });
    // return this.store.findAll('issue');
  }
});
