import Ember from 'ember';

export default Ember.Route.extend({
  csv2json: Ember.inject.service(),
  model() {
    return Ember.RSVP.hash({
      issues: Ember.$.get('data/monthly_issue_count.csv').then(this.get('csv2json').csv2json),
      customers: Ember.$.get('data/monthly_customer_count.csv').then(this.get('csv2json').csv2json),
      openingIssues: Ember.$.getJSON('data/opening_issue.json')
    });
  },
  setupController(controller, model) {
    this._super(controller, model);
    this.set('refreshing', true);
    Ember.run.later(this, this.pollIssues, 3000);
    Ember.run.later(this, this.pollOpeningIssues, 3000);
    Ember.run.later(this, this.pollCustomers, 3000);
  },
  pollIssues() {
    let controller = this.controller;
    if (this.get('refreshing')) {
      Ember.$.get('data/monthly_issue_count.csv')
      .then(this.get('csv2json').csv2json)
      .then(results => {
        let model = controller.get('issues');
        if (model.length !== results.length) {
          controller.set('issues', results);
          return;
        }
        for (var i=0; i<results.length; i++) {
          if (!Ember.isEqual(results[i], model[i])) {
            controller.set('issues', results);
            return;
          }
        }
      });
      Ember.run.later(this, this.pollIssues, 3000);
    }
  },
  pollCustomers() {
    let controller = this.controller;
    if (this.get('refreshing')) {
      Ember.$.get('data/monthly_customer_count.csv')
      .then(this.get('csv2json').csv2json)
      .then(results => {
        let model = controller.get('customers');
        if (model.length !== results.length) {
          controller.set('customers', results);
          return;
        }
        for (var i=0; i<results.length; i++) {
          if (!Ember.isEqual(results[i], model[i])) {
            controller.set('customers', results);
            return;
          }
        }
      });
      Ember.run.later(this, this.pollCustomers, 3000);
    }
  },
  pollOpeningIssues() {
    let controller = this.controller;
    if (this.get('refreshing')) {
      Ember.$.getJSON('data/opening_issue.json')
      .then(results => {
        if (!Ember.isEqual(results, controller.get('openingIssues'))) {
          controller.set('openingIssues', results);
        }
      });
      Ember.run.later(this, this.pollOpeningIssues, 3000);
    }
  },
  actions: {
    willTransition() {
      this.set('refreshing', false);
    }
  }
});
