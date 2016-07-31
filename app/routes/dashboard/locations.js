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
    Ember.run.later(this, this.poll, 3000);
  },
  poll() {
    let controller = this.controller;
    if (this.get('refreshing')) {
      Ember.$.get('data/locations.csv')
      .then(this.get('csv2json').csv2json)
      .then(results => {
        let model = controller.get('model');
        if (model.length !== results.length) {
          controller.set('model', results);
          return;
        }
        for (var i=0; i<results.length; i++) {
          if (!Ember.isEqual(results[i], model[i])) {
            controller.set('model', results);
            return;
          }
        }
      });
      Ember.run.later(this, this.poll, 3000);
    }
  },
  actions: {
    willTransition() {
      this.set('refreshing', false);
    }
  }
});
