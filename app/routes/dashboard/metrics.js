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
