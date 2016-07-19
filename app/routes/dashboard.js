import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition) {
    this._super(...arguments);
    if (transition.targetName === 'dashboard.index') {
      transition.abort();
      this.transitionTo('dashboard.metrics');
    }
  }
});
