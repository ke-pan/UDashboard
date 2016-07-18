import Ember from 'ember';

const { get, computed } = Ember;

export default Ember.Controller.extend({
  openingIssues: computed.filter('issues', function(issue) {
    return get(issue, 'status') === 'opening';
  })
});
