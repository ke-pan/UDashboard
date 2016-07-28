import Ember from 'ember';
const { computed } = Ember;

export default Ember.Controller.extend({
  issues: computed.alias('model.issues'),
  customers: computed.alias('model.customers'),
  openingIssues: computed.alias('model.openingIssues')
});
