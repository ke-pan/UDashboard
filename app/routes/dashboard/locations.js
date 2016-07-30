import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  csv2json: Ember.inject.service(),
  model() {
    return Ember.$.get('data/locations.csv').then(this.get('csv2json').csv2json);
  },
  setupController(controller, model) {
    this._super(controller, model);
    this.set('refreshing', true);
    Ember.run.later(this, this.refresh, 3000);
  },
  refresh() {
    this._super();
    if (this.get('refreshing')) {
      Ember.run.later(this, this.refresh, 3000);
    }
  },
  actions: {
    willTransition() {
      this.set('refreshing', false);
    }
  }
});
