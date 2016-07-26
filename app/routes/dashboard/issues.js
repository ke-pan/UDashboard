import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  model() {
    const request = this.get('ajax').request('/data/issues.json', {
      method: 'get'
    });

    return request.then((result) => JSON.parse(result));
  }
});
